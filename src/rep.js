import * as THREE from 'three';
import { ROLES, DIFFICULTY, AWAY_442, GOAL, PITCH } from './config.js';
import { evaluateOptions, scoreDecision, laneMargin, shotAim, LOFT_OVER, PASS_SPEED } from './eval.js';

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const angDiff = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
const heading = (from, to) => Math.atan2(to.x - from.x, to.z - from.z);
const DEG = Math.PI / 180;
const _dir = new THREE.Vector3();

// scan detector (research A1)
const SCAN_ON = 58 * DEG, SCAN_OFF = 35 * DEG, SCAN_FROM_ANCHOR = 40 * DEG, WAGGLE = 45 * DEG;
const MIN_SCAN = 0.18, MIN_DWELL = 0.1, MIN_SCAN_AT_TOUCH = 0.08;
// "saw it": the gaze cone is +-20 deg, held 0.12 s (cumulative, gaps up to 0.35 s forgiven)
export const GAZE_CONE = 20 * DEG, GAZE_HOLD = 0.12, GAZE_GAP = 0.35;
const RING = 512; // head-yaw history, about 4+ s at 120 Hz

// A3: a scan is BAD if it overlaps [touch - 0.10 s, touch + 0.15 s]
export const TOUCH_BEFORE = 0.1, TOUCH_AFTER = 0.15;
// A4: critical scan for a reception
export const CRIT_MIN_FLIGHT = 0.9, CRIT_AFTER_RELEASE = 0.15, CRIT_BEFORE_ARRIVAL = 0.25, PRIME_EARLY = 0.8, PRIME_LATE = 0.35;
// A2: scans per 10 s, windows under 3 s are not rated
export const RATE_WINDOW = 10, MIN_RATE_WINDOW = 3;
// no published keeper benchmark: keepers in build-up look up less often than outfielders
export const PAR = { CM: 5, CDM: 5, CB: 4.5, W: 4, CAM: 4, FB: 3.5, ST: 3, GK: 3 };
// seeing the presser buys a little time
export const AWARE_BONUS = 0.4;
const PRESS_SLOT = /^(RM|RCM|LCM|LM|ST1|ST2)$/;

// ---------------------------------------------------------------------------------------------
// Pure metric helpers (no world needed; rep.test.ts covers them)
// ---------------------------------------------------------------------------------------------

// Marks scan.bad / scan.hits on every scan and returns {timing: good/all x100 or null, good, bad}.
export function timingScore(scans, touches) {
  let good = 0, bad = 0;
  for (let i = 0; i < scans.length; i++) {
    const s = scans[i];
    let hits = 0;
    for (let k = 0; k < touches.length; k++) {
      const tt = touches[k].t;
      if (s.t < tt + TOUCH_AFTER && s.end > tt - TOUCH_BEFORE) hits++;
    }
    s.hits = hits;
    s.bad = hits > 0;
    if (hits) bad++; else good++;
  }
  const n = good + bad;
  return { timing: n ? Math.round((good / n) * 100) : null, good, bad };
}

// 'prime' | 'critical' | 'late' | 'none' | null (null = flight under 0.9 s, not scorable).
// LATE EYES (any scan in the last 0.25 s) cancels CRITICAL. PRIME: a critical scan peaking 0.35-0.80 s out.
export function classifyCritical(scans, releaseT, arrivalT) {
  if (!(arrivalT - releaseT >= CRIT_MIN_FLIGHT)) return null;
  let critical = false, prime = false;
  for (let i = 0; i < scans.length; i++) {
    const s = scans[i];
    if (s.end > arrivalT - CRIT_BEFORE_ARRIVAL && s.t < arrivalT) return 'late';
    if (s.t >= releaseT + CRIT_AFTER_RELEASE && s.end <= arrivalT - CRIT_BEFORE_ARRIVAL) {
      critical = true;
      const pk = s.peakT ?? (s.t + s.end) / 2;
      if (pk >= arrivalT - PRIME_EARLY && pk <= arrivalT - PRIME_LATE) prime = true;
    }
  }
  return prime ? 'prime' : critical ? 'critical' : 'none';
}

export function criticalScore(c) {
  return c === 'prime' ? 100 : c === 'critical' ? 80 : c === 'none' ? 20 : c === 'late' ? 0 : null;
}

// Scans per 10 s in the 10 s before reception (or since the rep began if that is shorter); null under 3 s.
export function scanRate10(scans, receiveT, startT = 0) {
  const ws = Math.max(startT, receiveT - RATE_WINDOW), w = receiveT - ws;
  if (w < MIN_RATE_WINDOW) return null;
  let n = 0;
  for (let i = 0; i < scans.length; i++) if (scans[i].t >= ws && scans[i].t < receiveT) n++;
  return (n / w) * 10;
}

// 100 at par, linear to 0 at no scans
export function rateScore(rate10, par) {
  return rate10 == null ? null : Math.round(clamp(rate10 / par, 0, 1) * 100);
}

// A6. facing / passerHeading / attackHeading / presserHeading are atan2(x, z) headings in radians.
// a = facing vs the passer, g = facing vs the attack direction (+x). A half-turn must open the body
// away from the presser (when there is one).  CLOSED covers square-on (a < 30) and back-to-goal (g > 110).
export function bodyShape(facing, passerHeading, attackHeading = Math.PI / 2, presserHeading = null) {
  const a = angDiff(facing, passerHeading) / DEG, g = angDiff(facing, attackHeading) / DEG;
  let shape;
  if (a < 30 || g > 110) shape = 'CLOSED';
  else {
    let openSide = true;
    if (presserHeading != null) {
      const sp = Math.sin(presserHeading - passerHeading), sf = Math.sin(facing - passerHeading);
      if (Math.abs(sp) > 0.17 && Math.sign(sp) === Math.sign(sf)) openSide = false;
    }
    shape = a >= 40 && a <= 70 && g <= 90 && openSide ? 'HALF-TURN' : 'OPEN';
  }
  return { shape, score: shape === 'HALF-TURN' ? 100 : shape === 'OPEN' ? 70 : 30, a, g };
}

const INFO_W = { presser: 35, exit: 30, blind: 20, both: 15 };
// A5. Each flag is true / false, or null when it does not apply (no presser, no pass option): the
// maximum shrinks accordingly so the score stays 0-100.
export function informationScore(f) {
  let earned = 0, avail = 0;
  for (const k in INFO_W) {
    if (f[k] == null) continue;
    avail += INFO_W[k];
    if (f[k]) earned += INFO_W[k];
  }
  return avail ? Math.round((earned / avail) * 100) : 0;
}

const COMP_W = { rate: 0.35, info: 0.25, timing: 0.2, critical: 0.2 };
// 0.35 rate + 0.25 info + 0.2 timing + 0.2 critical; a null part drops out and the rest are renormalised.
export function scanComposite(parts) {
  let sum = 0, avail = 0;
  for (const k in COMP_W) {
    const v = parts[k];
    if (v == null) continue;
    sum += COMP_W[k] * v;
    avail += COMP_W[k];
  }
  return avail ? sum / avail : 0;
}

// 1.0 at 1.0 s or less to release, down to 0.6 at 2.2 s or more
export function speedFactor(sec) {
  return 1 - 0.4 * clamp(((sec ?? 0) - 1.0) / 1.2, 0, 1);
}

// decision x speed x (0.35 + 0.65 x scanning); a quiz blends memory in at 20%
export function totalScore(decision, speedF, composite, memory = null) {
  const base = decision * speedF * (0.35 + (0.65 * composite) / 100);
  return Math.round(memory != null ? base * 0.8 + memory * 0.2 : base);
}

// The offside line is the second-last opponent: the deepest (highest x) outfield player. The home side attacks +x.
export function offsideLine(away) {
  let m = -Infinity;
  for (let i = 0; i < away.length; i++) {
    const o = away[i];
    if (o.slot === 'GK') continue;
    if (o.pos.x > m) m = o.pos.x;
  }
  return m;
}

function offsideTargetX(bx, bz) {
  let m = -Infinity;
  for (let i = 1; i < AWAY_442.length; i++) m = Math.max(m, awayTarget(AWAY_442[i], bx, bz).x);
  return m;
}

// shift moves the outfield block upfield of a deep ball (the keeper's recycle starts at x -40,
// but the defenders must not stand on the goal line); the GK slot itself follows the real ball.
// out: an optional Vector3 to write into, so the per-frame callers allocate nothing.
function homeTarget(slotDef, bx, bz, offsideX, shift = 0, out = new THREE.Vector3()) {
  const [name, sx, sz] = slotDef;
  if (name === 'GK') return out.set(clamp(-47 + (bx + 52) * 0.06, -49.5, -40), 0, clamp(bz * 0.12, -4, 4));
  let x = sx + (bx + shift) * 0.5, z = sz * 0.9 + bz * 0.3;
  if (x > offsideX - 0.6 && bx < offsideX) x = offsideX - 0.6;
  return out.set(clamp(x, -50, 50), 0, clamp(z, -32, 32));
}

function awayTarget(slotDef, bx, bz, out = new THREE.Vector3()) {
  const [name, sx, sz] = slotDef;
  if (name === 'GK') return out.set(49 - Math.max(0, bx - 15) * 0.05, 0, bz * 0.12);
  const x = sx + bx * 0.55, z = sz * 0.75 + bz * 0.4;
  return out.set(clamp(x, -48, 48), 0, clamp(z, -32, 32));
}

// One repetition: build-up passes, the ball arrives, you decide, it plays out.
export class Rep {
  constructor(world, { role, difficulty, quiz, motion, fx, speed }) {
    this.world = world;
    this.roleKey = role;
    this.role = ROLES[role];
    this.diff = DIFFICULTY[difficulty];
    this.quizWanted = quiz;
    this.motion = motion;
    this.fx = fx || {};
    this.speed = clamp(Number.isFinite(speed) ? speed : 1, 0.5, 1.2); // game speed: passes, pressers, windows
    this.state = 'setup';
    this.t = 0;
    this.drillKey = 'match';
    this.shift = this.role.anchor || 0;
    this.keeper = role === 'GK';
    this.windowScale = 1;
    this.outcomeLen = 2.2;
    this.holdRange = [0.7, 1.3];
    this.freeChance = 0.75; // one rep in four has nobody deliberately free
    this.minFlight = 0; // scenarios: the final pass is slowed so it flies at least this long (seconds)
  }

  ht(i, bx, bz, offside, out) { return homeTarget(this.F[i], bx, bz, offside, this.shift, out); }

  // pass scoring; drills with their own geometry override this
  evaluate(from) { return evaluateOptions(from, this.mates, this.away, this.role.group, { keeper: this.keeper }); }

  // --- hooks for scenarios (drills.js / scenarios.js subclasses)
  setupScenario() {}
  scenarioValue(option) { return 0; }
  scenarioResult(result) {}

  // evaluate() plus the scenario's bonus or malus on each option, best first
  rank(from) {
    const options = this.evaluate(from);
    let moved = false;
    for (const o of options) {
      const extra = this.scenarioValue(o) || 0;
      if (extra) { o.value += extra; o.scenario = extra; moved = true; }
    }
    if (moved) options.sort((a, b) => b.value - a.value);
    return options;
  }

  start() {
    const w = this.world, role = this.role, d = this.diff;
    w.useFormation(role.formation);
    w.clearOverlays();
    this.outcomeArrived = false;
    this.touchT = 0;
    w.snapTurned = false; // a snap turn made on a menu is not a scan
    this.F = role.formation;
    this.home = w.home;
    this.away = w.away;
    this.slotName = pick(role.slots);
    this.userIdx = this.F.findIndex((s) => s[0] === this.slotName);
    this.userBody = this.home[this.userIdx];
    this.userBody.setVisible(false);
    this.mates = this.home.filter((_, i) => i !== this.userIdx);
    this.opps = this.away;

    const side = this.slotName.startsWith('L') ? -1 : this.slotName.startsWith('R') ? 1 : (Math.random() < 0.5 ? -1 : 1);
    const centre = role.slots.length === 1 && !['W'].includes(this.roleKey);
    let bx = role.ballX + rand(-4, 4);
    let bz = centre ? rand(-12, 12) : side * rand(5, 16);

    const allowGK = this.roleKey === 'CB';
    let pool = this.mates.filter((p) => allowGK || p.slot !== 'GK');
    // the keeper's recycle always comes from a centre back or full back
    if (this.keeper) pool = pool.filter((p) => /CB|LB|RB/.test(p.slot));
    const offside0 = offsideTargetX(bx, bz);
    const startTargets = this.F.map((s, i) => this.ht(i, bx, bz, offside0));
    const carrierCand = pool
      .map((p) => ({ p, d: startTargets[this.home.indexOf(p)].distanceTo(new THREE.Vector3(bx, 0, bz)) }))
      .sort((a, b) => a.d - b.d);
    this.carrier = carrierCand[Math.random() < 0.7 ? 0 : 1].p;
    const ct = startTargets[this.home.indexOf(this.carrier)];
    bx = ct.x; bz = ct.z;

    const offside = offsideTargetX(bx, bz);
    this.home.forEach((p, i) => {
      const t = this.ht(i, bx, bz, offside);
      p.place(t.x + rand(-1, 1) * d.jitter, t.z + rand(-1, 1) * d.jitter);
      p.maxSpeed = 6.2;
      p.wobble = Math.random() * 100;
    });
    this.away.forEach((p, i) => {
      const t = awayTarget(AWAY_442[i], bx, bz);
      p.place(t.x + rand(-1, 1) * d.jitter, t.z + rand(-1, 1) * d.jitter);
      p.maxSpeed = 6.2;
      p.role = null;
      p.stalk = null;
      p.pressV = 0;
    });

    // the viewer stands where their slot is and faces the ball
    const up = this.userBody.pos.clone();
    this.ballAt(this.carrier);
    w.placeUser(up, heading(up, this.carrier.pos));
    this.userStart = up.clone();
    this.userTarget = up.clone();
    this.runOffset = this.keeper ? new THREE.Vector3(rand(-1, 2), 0, rand(-2, 2)) : new THREE.Vector3(rand(-2, 3), 0, rand(-3, 3));

    const toBall = heading(up, this.carrier.pos);

    // A free teammate, in front, beside or behind; one rep in four nobody is deliberately free.
    const cand = this.mates.filter((p) => p !== this.carrier && p.slot !== 'GK' && p.pos.distanceTo(up) > 8 && p.pos.distanceTo(up) < 30);
    this.free = cand.length && Math.random() < this.freeChance ? pick(cand) : null;
    this.freeDrift = new THREE.Vector3();
    if (this.free) {
      const near = this.nearestOpp(this.free.pos);
      if (near) this.freeDrift.copy(this.free.pos).sub(near.pos).setY(0).setLength(3);
    }

    this.pressers = this.choosePressers(up, toBall);

    // build-up passes
    this.passesLeft = Math.round(rand(d.passes[0], d.passes[1]));
    this.hold = rand(0.9, 1.4) / this.speed;
    this.receiver = null;
    this.finalStruck = false;
    this.passer = null;
    this.strikeT = null;

    this.scans = [];
    this.inScan = false;
    this.scanPeak = 0;
    this.scanDwell = 0;
    this.anchorYaw = null;
    this.sawPresser = this.pressers.map(() => -99);
    this.lastSawFree = -99;
    this.watchedStrike = null;
    this.watchedTouch = null;
    this.buildupStart = 0;
    this.touches = [];
    this.m = null;
    this._mInit = false; // gaze trackers are sized on the first tick, after any scenario has changed the cast
    this.events = [];
    this.frames = [];
    this.frameClock = 0;
    this.pending = null;
    this.aimed = null;
    this.result = null;
    this.t = 0;
    this._kickFx = [];
    this.snapThisFrame = false;
    this.setupScenario?.();
    this.state = 'buildup';
    this.fx.whistle?.();
  }

  // Pressers keep their real place in the shape and jog in towards the viewer; the press itself is
  // triggered when the final pass is struck. Lower levels press from the ball side; higher levels
  // flip a coin, and a second presser takes the other side. The keeper is pressed from the front.
  choosePressers(up, toBall) {
    const d = this.diff;
    const cands = this.away.filter((p) => PRESS_SLOT.test(p.slot))
      .sort((p, q) => p.pos.distanceTo(up) - q.pos.distanceTo(up));
    const high = d.pressers >= 2 || d.window <= 1.6;
    const firstBlind = high && Math.random() < 0.5;
    const out = [];
    for (let i = 0; i < d.pressers && cands.length; i++) {
      const wantBlind = i === 0 ? firstBlind : !firstBlind;
      let idx = this.keeper ? 0 : cands.findIndex((p) => (angDiff(heading(up, p.pos), toBall) >= 90 * DEG) === wantBlind);
      if (idx < 0) idx = 0;
      const o = cands.splice(idx, 1)[0];
      const dist = o.pos.distanceTo(up);
      const ring = rand(d.presserDist[0], d.presserDist[1]) + i * 2 + (this.keeper ? 7 + i * 4 : 0);
      o.role = 'presser';
      o.pressV = 0;
      o.stalk = new THREE.Vector3(o.pos.x - up.x, 0, o.pos.z - up.z);
      if (dist > 0.01) o.stalk.setLength(Math.min(dist, ring));
      out.push(o);
    }
    return out;
  }

  ballAt(p) {
    this.world.ball.set(p.pos.x + Math.sin(p.heading) * 0.45, p.pos.z + Math.cos(p.heading) * 0.45);
  }

  nearestOpp(pos, exclude) {
    let best = null, bd = Infinity;
    for (const o of this.away) {
      if (o === exclude) continue;
      const dd = Math.hypot(o.pos.x - pos.x, o.pos.z - pos.z);
      if (dd < bd) { bd = dd; best = o; }
    }
    return best;
  }

  // Everything runs on the dt it is given (never the wall clock); a long frame is cut into
  // 50 ms slices so a test calling app.frame(1) plays out the same as twenty real frames.
  update(dt) {
    while (dt > 0.05) { this.tick(0.05); dt -= 0.05; }
    if (dt > 0) this.tick(dt);
  }

  // Gaze trackers, the head-yaw history and the touch log. Sized lazily so a scenario (or a drill that
  // never calls Rep.start) can set up its own cast first.
  initMetrics() {
    this._mInit = true;
    if (!this.touches) this.touches = [];
    this.scanDwell = this.scanDwell || 0;
    this.sawMate = this.mates.map(() => -99);
    this.sawPresser = this.pressers.map(() => -99);
    this.lastSawFree = -99;
    this._gm = new Float32Array(this.mates.length * 2);
    this._gp = new Float32Array(this.pressers.length * 2);
    this._freeIdx = this.free ? this.mates.indexOf(this.free) : -1;
    this._ry = new Float32Array(RING);
    this._rd = new Float32Array(RING);
    this._rh = 0;
    this._rn = 0;
    this._flightRef = this.world.ball.flight;
  }

  // A touch by the viewer's team: type 'kick' | 'receive'. mine marks the viewer's own.
  logTouch(type, mine = false) {
    if (!this.touches) this.touches = [];
    this.touches.push({ t: this.t, type, mine });
  }

  // The boot meets the ball `delay` s after ball.kick (Ball.kick holds the ball for the kicker's swing), so
  // the sound waits too. Sim time, not the wall clock: it runs inside tick.
  kickSound(vol, delay = 0) {
    if (!(delay > 0.001)) { this.fx.kick?.(vol); return; }
    (this._kickFx || (this._kickFx = [])).push({ at: this.t + delay, vol });
  }

  flushKickFx() {
    const q = this._kickFx;
    if (!q || !q.length) return;
    for (let i = 0; i < q.length;) {
      if (q[i].at <= this.t + 1e-9) { this.fx.kick?.(q[i].vol); q.splice(i, 1); } else i++;
    }
  }

  tick(dt) {
    if (this.state === 'quiz' || this.state === 'done' || this.state === 'setup') return;
    if (!this._mInit) this.initMetrics();
    this.t += dt;
    this._dtLast = dt;
    const w = this.world, ball = w.ball;
    const user = w.userPos();

    // --- ball events
    if (this.state === 'buildup') {
      if (!ball.flight) {
        this.hold -= dt;
        this.ballAt(this.carrier);
        if (this.hold <= 0) this.nextPass(user);
      }
    }
    if (ball.flight) {
      const arrived = ball.update(dt);
      if (arrived) this.onArrive();
    }
    this.flushKickFx();
    // every ball struck while the viewer's team has it is a touch (catches drills that override nextPass)
    if (ball.flight !== this._flightRef) {
      if (ball.flight && (this.state === 'buildup' || this.state === 'incoming')) this.logTouch('kick');
      this._flightRef = ball.flight;
    }

    this.moveActors(dt, user);
    this.userBody.pos.copy(w.userPos());
    this.userBody.heading = w.headYaw();

    // --- scanning
    if (this.state === 'buildup' || this.state === 'incoming') this.trackScan(user, ball);

    // --- decision window
    if (this.state === 'decide') {
      this.decideT += dt;
      this.updateAimGlow();
      if (this.decideT > this.window) this.timeout(user);
    } else if (this.state === 'incoming') {
      this.updateAimGlow();
    }

    if (this.state === 'outcome') {
      this.outcomeT -= dt;
      this.outcomeAge += dt;
      if (this.outcomeT <= 0) this.finish();
    }

    this.record(dt);
  }

  // No release inside the window: the nearest presser closes and wins the ball.
  timeout(user) {
    let p = null, bd = Infinity;
    for (const o of this.pressers) {
      const dd = o.pos.distanceTo(user);
      if (dd < bd) { bd = dd; p = o; }
    }
    this.lose(p || this.nearestOpp(user));
  }

  // Sets every player's target and moves them. Drills with another layout override this.
  // Scalar maths and scratch vectors only: this runs every frame.
  moveActors(dt, user) {
    const w = this.world, ball = w.ball, d = this.diff, sp = this.speed, st = this.state;
    const tt = this._tt || (this._tt = new THREE.Vector3());
    // --- targets
    const bp = ball.flight ? ball.flight.to : ball.pos;
    const offside = offsideLine(this.away);
    for (let i = 0; i < this.home.length; i++) {
      if (i === this.userIdx) continue;
      const p = this.home[i];
      const t = this.ht(i, bp.x, bp.z, offside, tt);
      t.x += Math.sin(this.t * 0.6 + p.wobble) * 1.2;
      t.z += Math.cos(this.t * 0.5 + p.wobble) * 1.2;
      if (p === this.free) t.add(this.freeDrift);
      p.maxSpeed = 6.2;
      if (p === this.carrier && !ball.flight && st === 'buildup') { p.maxSpeed = 2.4; }
      if (this.receiver === p && ball.flight) t.copy(ball.flight.to);
      if (st === 'outcome' && this.outcomeTarget === p) t.copy(ball.flight ? ball.flight.to : ball.pos);
      p.target.copy(t);
    }

    // teammates an opponent may pick up (rebuilt only when the cast changes), plus the viewer
    if (this._mkFree !== this.free || this._mkMates !== this.mates) {
      this._mkFree = this.free;
      this._mkMates = this.mates;
      this._markMates = this.mates.filter((p) => p !== this.free && p.slot !== 'GK');
    }
    const markable = this._markMates;
    const carrierPos = st === 'buildup' ? this.carrier.pos : user;
    let closer = null, cd = Infinity;
    for (let i = 0; i < this.away.length; i++) {
      const o = this.away[i];
      if (o.role === 'presser' || o.slot === 'GK') continue;
      const dd = o.pos.distanceTo(carrierPos);
      if (dd < cd) { cd = dd; closer = o; }
    }
    const fp = this.free ? this.free.pos : null;
    for (let i = 0; i < this.away.length; i++) {
      const o = this.away[i];
      if (st === 'outcome' && o === this.outcomeTarget) {
        o.target.copy(ball.flight ? ball.flight.to : ball.pos);
        o.maxSpeed = 7;
        continue;
      }
      if (o.role === 'presser') {
        if (!o.stalk) o.stalk = new THREE.Vector3(o.pos.x - user.x, 0, o.pos.z - user.z);
        if (!this.finalStruck) {
          // jog in from the real position towards a ring round the viewer
          const k = this.keeper ? Math.max(0.55, 1 - this.t * 0.07) : 1;
          o.target.set(user.x + o.stalk.x * k, 0, user.z + o.stalk.z * k);
          o.maxSpeed = 4.6 * sp;
        } else {
          // the press: close down at the speed that gets there as the window runs out, then jockey a yard off
          const dx = o.pos.x - user.x, dz = o.pos.z - user.z, l = Math.hypot(dx, dz) || 1;
          const hold = st === 'decide' ? 1.0 : st === 'incoming' ? 2.0 : 2.5;
          o.target.set(user.x + (dx / l) * hold, 0, user.z + (dz / l) * hold);
          o.maxSpeed = st === 'outcome' ? 3.5 * sp
            : st === 'decide' ? Math.max(o.pressV || 0, d.presserSpeed * sp * 0.6)
              : o.pressV || d.presserSpeed * sp;
        }
        continue;
      }
      const t = awayTarget(AWAY_442[i], bp.x, bp.z, tt);
      if (o === closer && st === 'buildup' && !ball.flight) {
        const dx = o.pos.x - carrierPos.x, dz = o.pos.z - carrierPos.z;
        const l = Math.hypot(dx, dz) || 1;
        t.set(carrierPos.x + (dx / l) * 2.2, 0, carrierPos.z + (dz / l) * 2.2);
      } else if (o.slot !== 'GK') {
        let nx = 0, nz = 0, nd = 9, found = false;
        for (let k = 0; k <= markable.length; k++) {
          const hp = k < markable.length ? markable[k].pos : user;
          const dd = Math.hypot(hp.x - t.x, hp.z - t.z);
          if (dd < nd) { nd = dd; nx = hp.x; nz = hp.z; found = true; }
        }
        if (found) { t.x += (nx + 1.6 - t.x) * 0.45; t.z += (nz - t.z) * 0.45; }
        if (fp) {
          const ax = t.x - fp.x, az = t.z - fp.z, al = Math.hypot(ax, az);
          if (al < 6.5) { if (al > 1e-6) t.set(fp.x + (ax / al) * 6.5, 0, fp.z + (az / al) * 6.5); else t.set(fp.x, 0, fp.z); }
        }
      }
      o.target.copy(t);
      o.maxSpeed = 6;
    }

    this.reactions();
    for (const p of this.home) if (p !== this.userBody) p.step(dt, ball.pos);
    for (const o of this.away) o.step(dt, ball.pos);

    // --- the viewer's run
    if (st === 'buildup' && this.motion) {
      const t = this.ht(this.userIdx, bp.x, bp.z, offside, tt).add(this.runOffset);
      const dx = t.x - user.x, dz = t.z - user.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 0.3) {
        const k = Math.min(dist, 2.2 * dt) / dist;
        w.moveUser(dx * k, dz * k);
      }
    }
  }

  // Where the receiver turns and where a winner runs, written into scratch fields (no allocation).
  afterTouchDirs(p) {
    if (p.team === 'home') {
      // touch and turn upfield, towards the middle of the pitch
      this._tdx = 3.5; this._tdz = p.pos.z > 0 ? -2 : 2;
    } else {
      // an opponent who won it runs off the other way
      this._tdx = -14; this._tdz = -p.pos.z * 0.3;
    }
  }

  // Outcome feel. Runs after targets are set and before anyone steps; scalars only, no allocation.
  reactions() {
    if (this.state !== 'outcome') return;
    const o = this.outcome, tg = this.outcomeTarget, age = this.outcomeAge, ball = this.world.ball;
    const ux = this.userBody.pos.x, uz = this.userBody.pos.z;
    if (o === 'goal') {
      if (age < 0.45) return;
      for (let i = 0; i < this.home.length; i++) {
        const p = this.home[i];
        if (i === this.userIdx) continue;
        const dx = p.pos.x - ux, dz = p.pos.z - uz;
        if (dx * dx + dz * dz > 784) { p.mood = 0; continue; }
        const a = i * 0.9, r = 2 + (i % 3) * 0.8;
        p.target.set(ux + Math.sin(a) * r, 0, uz + Math.cos(a) * r);
        p.maxSpeed = 7;
        p.mood = 1;
      }
      return;
    }
    if ((o === 'completed' || o === 'tight') && tg && this.outcomeArrived) {
      // take a touch (stand still on the ball), then turn away with it
      this.touchT += this._dtLast || 0;
      if (this.touchT < 0.25) { tg.target.copy(tg.pos); tg.maxSpeed = 1; }
      else { tg.target.set(tg.pos.x + this._tdx, 0, tg.pos.z + this._tdz); tg.maxSpeed = 3.4; }
      this.ballAt(tg);
      return;
    }
    if (o === 'intercepted' || o === 'lost') {
      if (tg && this.outcomeArrived) {
        tg.target.set(tg.pos.x + this._tdx, 0, tg.pos.z + this._tdz);
        tg.maxSpeed = 7.2;
        this.ballAt(tg);
      }
      if (age < 0.35) return;
      // heads drop, slow walk
      for (let i = 0; i < this.home.length; i++) {
        const p = this.home[i];
        if (i === this.userIdx) continue;
        const dx = p.pos.x - ux, dz = p.pos.z - uz;
        if (dx * dx + dz * dz > 900) { p.mood = 0; continue; }
        p.mood = 2;
        p.maxSpeed = 1.5;
      }
    }
  }

  nextPass(user) {
    const ball = this.world.ball;
    const from = this.carrier;
    let to;
    if (this.passesLeft <= 1) {
      to = null;
    } else {
      const cands = this.mates.filter((p) => p !== from && (this.roleKey === 'CB' || p.slot !== 'GK') && p.slot !== 'GK')
        .map((p) => {
          const dd = p.pos.distanceTo(from.pos), du = p.pos.distanceTo(user);
          const m = Math.min(...this.away.map((o) => laneMargin(from.pos, p.pos, o.pos, 16, false)));
          let s = 0;
          if (dd > 7 && dd < 26) s += 2;
          if (du > 9 && du < 24) s += 2;
          s += clamp(m, -2, 3);
          if (p === this.free) s -= 4;
          return { p, s: s + Math.random() };
        })
        .sort((a, b) => b.s - a.s);
      to = cands.length ? cands[0].p : null;
    }
    this.passesLeft--;
    from.turnTo?.(to ? heading(from.pos, to.pos) : heading(from.pos, user)); // Ball.kick swings him round: no heading pop
    this.ballAt(from);
    if (to) {
      const dist = to.pos.distanceTo(from.pos);
      const land = to.pos.clone().addScaledVector(to.vel, dist / 16 * 0.6);
      ball.kick(ball.pos, land, rand(15, 19) * this.speed, dist > LOFT_OVER ? dist * 0.1 : 0);
      this.receiver = to;
      this.events.push({ t: this.t, type: 'pass' });
      this.kickSound(0.7, ball.flight?.wait);
    } else {
      this.finalBall(from, user);
    }
  }

  // the last pass of the build-up: to the viewer
  finalBall(from, user) {
    const ball = this.world.ball;
    const dir = from.pos.clone().sub(user).setY(0).normalize();
    const land = user.clone().addScaledVector(dir, 0.6);
    const dist = land.distanceTo(from.pos);
    let spd = rand(15, 19);
    if (this.minFlight > 0) spd = Math.min(spd, Math.hypot(land.x - ball.pos.x, land.z - ball.pos.z) / this.minFlight);
    ball.kick(ball.pos, land, Math.max(spd, 5) * this.speed, dist > LOFT_OVER ? dist * 0.08 : 0);
    this.receiver = null;
    this.passer = from;
    this.finalStruck = true;
    this.state = 'incoming';
    this.strikeT = this.t;
    this.finalFlight = ball.flight ? ball.flight.dur : dist / spd;
    this.events.push({ t: this.t, type: 'final' });
    const toBall = heading(user, this.world.ball.pos);
    this.watchedStrike = angDiff(this.world.headYaw(), toBall) < 38 * DEG;
    this.strikeWatchUntil = this.t + 0.3;
    this.triggerPress(user);
    this.kickSound(0.8, ball.flight?.wait);
  }

  // The press starts at the strike, from wherever each presser stands. His speed is set so he reaches
  // the viewer as the decision window runs out (capped at a sprint), so a close presser is a tackle
  // waiting to happen and a far one a slow threat.
  triggerPress(user) {
    const T = (this.finalFlight || 1) + (this.diff.window * this.windowScale) / this.speed;
    const vmax = this.diff.presserSpeed * this.speed * 1.12;
    for (const o of this.pressers) {
      const D = Math.hypot(o.pos.x - user.x, o.pos.z - user.z) - 1.0;
      o.pressV = clamp(D / (T * 0.92), 3.2 * this.speed, vmax);
    }
  }

  onArrive() {
    if (this.state === 'buildup' && this.receiver) {
      this.logTouch('receive');
      this.carrier = this.receiver;
      this.receiver = null;
      this.hold = rand(this.holdRange[0], this.holdRange[1]) / this.speed;
      this.fx.touch?.();
      return;
    }
    if (this.state === 'incoming') {
      const user = this.world.userPos();
      this.receiveT = this.t;
      this.logTouch('receive', true);
      this.events.push({ t: this.t, type: 'receive' });
      this.watchedTouch = angDiff(this.world.headYaw(), heading(user, this.world.ball.pos)) < 45 * DEG;
      this.fx.touch?.();
      if (this.inScan) this.closeScan(true);
      this.scanWindow = Math.max(0.5, this.receiveT - this.buildupStart);
      this.decideT = 0;
      this.receiveMetrics(user);
      this.knewPressure = this.m.presserSeen !== false;
      this.window = this.decisionWindow(this.m.presserDist, this.knewPressure);
      if (this.quizWanted) {
        this.snapshot = this.takeSnapshot(user);
        this.state = 'quiz';
        return;
      }
      this.enterDecide();
      return;
    }
    if (this.state === 'outcome' && !this.outcomeArrived) {
      this.outcomeArrived = true;
      this.touchT = 0;
      const tg = this.outcomeTarget;
      if (tg) this.afterTouchDirs(tg);
    }
  }

  // How long the viewer has on the ball. A presser covers (distance - 0.8 m) at his closing speed, so a man at
  // 1.2 m tackles at once: the window is that time, kept between 0.5 s and the difficulty's window, plus a
  // little for having seen him coming. No presser on the pitch: the difficulty's window.
  decisionWindow(presserDist, aware) {
    const cap = (this.diff.window * this.windowScale) / this.speed;
    let w = cap;
    if (presserDist != null && this.pressers.length) {
      const u = this.world.userPos();
      let near = null, bd = Infinity;
      for (const o of this.pressers) {
        const dd = Math.hypot(o.pos.x - u.x, o.pos.z - u.z);
        if (dd < bd) { bd = dd; near = o; }
      }
      const v = Math.max(this.diff.presserSpeed * this.speed * 0.6, near?.pressV || 0);
      w = clamp((presserDist - 0.8) / v, Math.min(0.5, cap), cap);
    }
    return w + (aware ? (AWARE_BONUS * this.windowScale) / this.speed : 0);
  }

  // Everything measured about the approach, taken at the first touch (research A2-A6).
  receiveMetrics(user) {
    const t = this.t, m = {};
    m.receiveT = t;
    const tm = timingScore(this.scans, this.touches);
    m.timing = tm.timing; m.badScans = tm.bad;
    // critical scan: the actual arrival time, not the planned one (the ball is re-aimed at a moving viewer)
    m.flight = this.strikeT != null ? t - this.strikeT : null;
    m.critical = this.strikeT != null ? classifyCritical(this.scans, this.strikeT, t) : null;
    m.criticalScore = criticalScore(m.critical);
    // scan rate against the role's par
    m.par = PAR[this.roleKey] ?? 4;
    m.rateWindow = Math.max(0, Math.min(RATE_WINDOW, t - this.buildupStart));
    m.scanRate10 = scanRate10(this.scans, t, this.buildupStart);
    m.rateScore = rateScore(m.scanRate10, m.par);

    // the nearest presser and the best pass out
    let pi = -1, pd = Infinity;
    for (let i = 0; i < this.pressers.length; i++) {
      const dd = Math.hypot(this.pressers[i].pos.x - user.x, this.pressers[i].pos.z - user.z);
      if (dd < pd) { pd = dd; pi = i; }
    }
    const passer = this.passer || this.carrier;
    const passerH = heading(user, passer.pos);
    m.presserDist = pi >= 0 ? pd : null;
    m.presserSide = pi >= 0 ? (angDiff(heading(user, this.pressers[pi].pos), passerH) >= 90 * DEG ? 'BLIND' : 'BALL') : null;
    m.presserSeen = pi >= 0 ? this.sawPresser[pi] >= t - 1.5 : null;
    const opts = this.rank(this.world.ball.pos);
    const exit = opts.find((o) => o.kind === 'pass') || null;
    const mi = exit ? this.mates.indexOf(exit.target) : -1;
    m.exitSeen = exit ? mi >= 0 && this.sawMate[mi] >= t - 1.5 : null;
    m.sawBest = !opts.length || opts[0].kind === 'shot' ? true : m.exitSeen;

    // the blind side and both sides, from the head-yaw history. Body shape is the head yaw during the flight
    // up to 0.25 s before the touch: eyes off the ball at the touch are not a half-turn.
    const facing = this.smoothedYaw(m.flight != null ? clamp(m.flight - 0.25, 0.2, 0.5) : 0.5, 0.25);
    m.blindSeen = this.blindSeen(facing);
    const ws = Math.max(this.buildupStart, t - RATE_WINDOW);
    let left = false, right = false;
    for (let i = 0; i < this.scans.length; i++) {
      const s = this.scans[i];
      if (s.t < ws) continue;
      if (s.side < 0) left = true; else if (s.side > 0) right = true;
    }
    m.bothSides = left && right;
    m.info = informationScore({ presser: m.presserSeen, exit: m.exitSeen, blind: m.blindSeen, both: m.bothSides });

    // body shape at the first touch
    const bs = bodyShape(facing, passerH, Math.PI / 2, pi >= 0 ? heading(user, this.pressers[pi].pos) : null);
    m.body = bs.shape; m.bodyScore = bs.score;
    this.m = m;
    return m;
  }

  // circular mean of the head yaw over the `span` seconds before now - skip
  smoothedYaw(span, skip = 0) {
    let sx = 0, cz = 0, acc = 0, skipped = 0, i = this._rh;
    for (let k = 0; k < this._rn && acc < span; k++) {
      i = (i - 1 + RING) % RING;
      const dt = this._rd[i] || 1e-4;
      if (skipped < skip) { skipped += dt; continue; }
      sx += Math.sin(this._ry[i]) * dt;
      cz += Math.cos(this._ry[i]) * dt;
      acc += dt;
    }
    return acc > 0 ? Math.atan2(sx, cz) : this.world.headYaw();
  }

  // were the eyes more than 120 deg off the facing for at least 0.12 s in the last 3 s?
  blindSeen(facing) {
    let dwell = 0, acc = 0, i = this._rh;
    for (let k = 0; k < this._rn && acc < 3; k++) {
      i = (i - 1 + RING) % RING;
      const dt = this._rd[i];
      acc += dt;
      if (angDiff(this._ry[i], facing) > 120 * DEG) dwell += dt;
    }
    return dwell >= GAZE_HOLD;
  }

  enterDecide() {
    this.state = 'decide';
    if (this.pending) {
      const p = this.pending;
      this.pending = null;
      this.execute(p, true);
    }
  }

  endQuiz(score) {
    this.memory = score;
    this.enterDecide();
  }

  takeSnapshot(user) {
    const fwd = this.world.headYaw();
    const opps = this.away.filter((o) => o.slot !== 'GK').map((o) => o.pos.clone());
    const mates = this.mates.map((m) => ({ pos: m.pos.clone(), number: m.number, slot: m.slot }));
    const nearest = opps.reduce((a, b) => (a.distanceTo(user) < b.distanceTo(user) ? a : b));
    const within = opps.filter((o) => o.distanceTo(user) < 10).length;
    let freest = null, fd = -1;
    const cands = mates.filter((m) => m.slot !== 'GK' && m.pos.distanceTo(user) < 32);
    for (const m of cands) {
      const nd = Math.min(...opps.map((o) => o.distanceTo(m.pos)));
      m.space = nd;
      if (nd > fd) { fd = nd; freest = m; }
    }
    return { user: user.clone(), fwd, toBall: heading(user, this.world.ball.pos), opps, mates: cands, nearest, within, freest };
  }

  // Scan detector (A1) plus the gaze trackers. A scan is the head turning away from the ball and back,
  // lasting 0.18 s or more with the head dwelling beyond 45 deg off the ball for 0.1 s: a waggle is not
  // a scan, and a snap turn (the rig rotating, not the head) never is.
  trackScan(user, ball) {
    const w = this.world, t = this.t, dt = this._dtLast || 0;
    const yaw = w.headYaw();
    const toBall = Math.atan2(ball.pos.x - user.x, ball.pos.z - user.z);
    const off = angDiff(yaw, toBall);
    const i = this._rh;
    this._ry[i] = yaw; this._rd[i] = dt; this._rh = (i + 1) % RING;
    if (this._rn < RING) this._rn++;

    const snap = !!w.snapTurned;
    this.snapThisFrame = snap; // scenarios and drills read this: a snap-turn frame never counts as a look
    if (snap) {
      // the jump in yaw was the controller: drop any scan in progress and start measuring from here
      w.snapTurned = false;
      this.anchorYaw = yaw;
      this.inScan = false;
      this.scanDwell = 0;
    } else {
      if (this.anchorYaw == null) this.anchorYaw = yaw;
      if (!this.inScan) {
        if (off < SCAN_OFF) this.anchorYaw = yaw;
        if (off > SCAN_ON && angDiff(yaw, this.anchorYaw) > SCAN_FROM_ANCHOR) {
          this.inScan = true;
          this.scanStart = t;
          this.scanPeak = off;
          this.scanPeakYaw = yaw;
          this.scanPeakT = t;
          this.scanDwell = dt;
          this.scanSide = Math.sign(Math.sin(yaw - toBall));
          this.scanBall = ball.flight ? (ball.flight.loft ? 'air' : 'ground') : 'held';
          this.scanSaw = this.lookingAtPlay(yaw, user);
          this.fx.tick?.();
        }
      } else {
        if (off > this.scanPeak) { this.scanPeak = off; this.scanPeakYaw = yaw; this.scanPeakT = t; }
        if (off > WAGGLE) this.scanDwell += dt;
        if (!this.scanSaw) this.scanSaw = this.lookingAtPlay(yaw, user);
        const cameBack = angDiff(yaw, this.scanPeakYaw) > 40 * DEG && angDiff(yaw, this.anchorYaw) < 25 * DEG;
        if (off < SCAN_OFF || cameBack) { this.closeScan(); this.anchorYaw = yaw; }
      }
    }
    if (this.strikeWatchUntil && t < this.strikeWatchUntil && off < 38 * DEG) this.watchedStrike = true;

    // who was actually looked at (gaze cone, held); the frame a snap turn swung the view looks at nobody
    if (snap) return;
    const ux = user.x, uz = user.z;
    for (let k = 0; k < this.mates.length; k++) this.gaze(this._gm, k, this.sawMate, yaw, this.mates[k].pos, ux, uz, dt);
    for (let k = 0; k < this.pressers.length; k++) this.gaze(this._gp, k, this.sawPresser, yaw, this.pressers[k].pos, ux, uz, dt);
    if (this._freeIdx >= 0) this.lastSawFree = this.sawMate[this._freeIdx];
  }

  // a scan has to take in the game: a player in view, or open pitch at eye level, not the stands or the sky
  lookingAtPlay(yaw, user) {
    const cam = this.world.camera;
    const dy = cam && cam.getWorldDirection ? cam.getWorldDirection(_dir).y : 0; // no camera (offline tests): level
    if (dy < -0.57 || dy > 0.42) return false;
    for (const p of this.home) if (p !== this.userBody && angDiff(yaw, Math.atan2(p.pos.x - user.x, p.pos.z - user.z)) < 25 * DEG) return true;
    for (const p of this.away) if (angDiff(yaw, Math.atan2(p.pos.x - user.x, p.pos.z - user.z)) < 25 * DEG) return true;
    const px = user.x + Math.sin(yaw) * 15, pz = user.z + Math.cos(yaw) * 15;
    return Math.abs(px) < PITCH.HL && Math.abs(pz) < PITCH.HW;
  }

  gaze(acc, k, seen, yaw, p, ux, uz, dt) {
    const j = k * 2;
    if (angDiff(yaw, Math.atan2(p.x - ux, p.z - uz)) < GAZE_CONE) {
      acc[j] += dt;
      acc[j + 1] = 0;
      if (acc[j] >= GAZE_HOLD) seen[k] = this.t;
    } else {
      acc[j + 1] += dt;
      if (acc[j + 1] > GAZE_GAP) acc[j] = 0;
    }
  }

  // atTouch: the scan is cut off by the ball arriving, so a shorter look still counts (eyes off the ball at the touch)
  closeScan(atTouch = false) {
    this.inScan = false;
    const dur = this.t - this.scanStart;
    if (dur < (atTouch ? MIN_SCAN_AT_TOUCH : MIN_SCAN) || this.scanDwell < (atTouch ? MIN_DWELL * 0.6 : MIN_DWELL)) return;
    if (!this.scanSaw) return;
    this.scans.push({
      t: this.scanStart, end: this.t, dur, peak: this.scanPeak, peakT: this.scanPeakT, peakYaw: this.scanPeakYaw,
      side: this.scanSide, shoulder: this.scanPeak > 100 * DEG, ball: this.scanBall, ballMoving: this.scanBall !== 'held',
      bad: false, hits: 0,
    });
  }

  // origin + dir of the pointing ray in world space
  aim(origin, dir) {
    if (this.state !== 'incoming' && this.state !== 'decide') { this.aimed = null; return; }
    const user = this.world.userPos();
    let best = null, ba = Infinity;
    for (const m of this.mates) {
      const c = m.pos.clone().setY(1);
      const to = c.sub(origin);
      const dist = to.length();
      if (m.pos.distanceTo(user) < 3) continue;
      const a = to.normalize().angleTo(dir);
      const tol = Math.max(5 * DEG, Math.atan(1.1 / dist));
      if (a < tol && a < ba) { ba = a; best = { kind: 'pass', target: m }; }
    }
    if (this.role.group === 'att' && user.x > 20 && Math.hypot(GOAL.x - user.x, user.z) < 30) {
      const g = new THREE.Vector3(GOAL.x, 1.2, 0).sub(origin);
      const dist = g.length();
      const a = g.normalize().angleTo(dir);
      if (a < Math.atan(4.2 / dist) + 2 * DEG && a < ba) best = { kind: 'shot' };
    }
    this.aimed = best;
  }

  updateAimGlow() {
    for (const m of this.mates) {
      const on = this.aimed?.kind === 'pass' && this.aimed.target === m;
      const queued = this.pending?.kind === 'pass' && this.pending.target === m;
      m.highlight(queued ? 0xff7a1a : 0xffffff, on || queued ? 0.9 : 0);
    }
    this.world.goalGlow.visible = this.aimed?.kind === 'shot' || this.pending?.kind === 'shot';
  }

  select() {
    if (!this.aimed) return false;
    if (this.state === 'incoming') { this.pending = this.aimed; this.fx.ui?.(); return true; }
    if (this.state === 'decide') { this.execute(this.aimed, false); return true; }
    return false;
  }

  execute(choice, oneTouch) {
    const w = this.world, ball = w.ball;
    const from = ball.pos.clone();
    const options = this.rank(from);
    const chosen = options.find((o) => o.kind === choice.kind && (o.kind === 'shot' || o.target === choice.target))
      || { kind: choice.kind, target: choice.target, value: 0 };
    this.options = options;
    this.chosen = chosen;
    this.decisionScore = scoreDecision(chosen, options);
    this.oneTouch = oneTouch;
    this.decideTime = this.decideT;
    this.events.push({ t: this.t, type: 'decide' });
    this.logTouch('kick', true);
    this.world.clearOverlays();

    let outcome, target;
    if (chosen.kind === 'pass') {
      const t = chosen.target;
      const dist = t.pos.distanceTo(from);
      const lofted = dist > LOFT_OVER;
      const speed = lofted ? 21 : PASS_SPEED; // game time: margins use this, the ball on screen uses speed x game speed
      const vis = speed * this.speed;
      let worst = null, wm = Infinity, nearest = null, nd = Infinity;
      for (const o of this.away) {
        const m = laneMargin(from, t.pos, o.pos, speed, lofted);
        if (m < wm) { wm = m; worst = o; }
        const dd = Math.hypot(o.pos.x - t.pos.x, o.pos.z - t.pos.z);
        if (dd < nd) { nd = dd; nearest = o; }
      }
      // played into feet with a defender on the receiver is a risk even down a clear lane
      let snatch = null;
      if (wm >= 0 && nearest) {
        const feet = (t.vel ? Math.hypot(t.vel.x, t.vel.z) : 0) < 2.5;
        if (Math.random() < clamp((3.2 - nd) / 3.2, 0, 1) * (feet ? 0.35 : 0.12)) snatch = nearest;
      }
      if (snatch) {
        outcome = 'intercepted';
        ball.kick(from, t.pos.clone(), vis, lofted ? dist * 0.09 : 0);
        target = snatch;
      } else if (wm < 0 && worst) {
        outcome = 'intercepted';
        // ball meets the defender on the line
        const dx = t.pos.x - from.x, dz = t.pos.z - from.z, len2 = dx * dx + dz * dz;
        let k = ((worst.pos.x - from.x) * dx + (worst.pos.z - from.z) * dz) / len2;
        k = clamp(k, lofted ? 0.8 : 0.08, 1);
        const pt = new THREE.Vector3(from.x + dx * k, 0, from.z + dz * k);
        ball.kick(from, pt, vis, lofted ? dist * 0.09 * k : 0);
        target = worst;
      } else {
        outcome = (chosen.space < 0.25 || (this.keeper && lofted && chosen.space < 0.4)) ? 'tight' : 'completed';
        const land = t.pos.clone().addScaledVector(t.vel, dist / speed * 0.5);
        ball.kick(from, land, vis, lofted ? dist * 0.09 : 0);
        target = t;
      }
    } else {
      const gk = this.away.find((o) => o.slot === 'GK');
      const aim = chosen.aim || shotAim(from, gk?.pos);
      const open = chosen.open ?? 1;
      const pGoal = clamp((chosen.xg ?? 0.2) * 1.5 + 0.1, 0.1, 0.85);
      const sv = 27 * this.speed;
      if (open < 0.3) {
        outcome = 'blocked';
        const blocker = this.away.filter((o) => o.slot !== 'GK').sort((a, b) => a.pos.distanceTo(from) - b.pos.distanceTo(from))[0];
        ball.kick(from, blocker.pos.clone(), sv, 0.4);
        target = blocker;
      } else if (pGoal >= 0.4) { // a good chance goes in, a poor one is saved: skill, not dice
        outcome = 'goal';
        ball.kick(from, new THREE.Vector3(GOAL.x + 1.2, 0, aim.z), sv, rand(0.3, 1.4));
        target = null;
      } else {
        outcome = 'saved';
        const kz = gk ? clamp(gk.pos.z, -GOAL.halfWidth, GOAL.halfWidth) : aim.z * 0.5;
        ball.kick(from, new THREE.Vector3(GOAL.x - 0.6, 0, kz), sv, 0.6);
        target = gk;
      }
    }
    this.kickSound(1, ball.flight?.wait);
    this.outcome = outcome;
    this.outcomeTarget = target;
    this.state = 'outcome';
    this.outcomeT = this.outcomeLen;
    this.outcomeAge = 0;
    w.setLine(w.choiceLine, null, null);
  }

  loseSpot(presser) { return presser.pos.clone().add(new THREE.Vector3(-8, 0, rand(-4, 4))); }

  lose(presser) {
    this.options = this.rank(this.world.ball.pos);
    this.chosen = null;
    this.decisionScore = 0;
    this.decideTime = this.decideT;
    this.outcome = 'lost';
    this.outcomeTarget = presser;
    const ball = this.world.ball;
    const away = this.loseSpot(presser);
    ball.kick(ball.pos.clone(), away, 7, 0);
    presser.target.copy(away);
    this.events.push({ t: this.t, type: 'lost' });
    this.state = 'outcome';
    this.outcomeT = this.outcomeLen - 0.2;
    this.outcomeAge = 0;
    this.world.clearOverlays();
    this.fx.groan?.();
  }

  // One short fact on why the best option was best.
  reasonFor(best) {
    if (!best) return null;
    if (best.kind === 'shot') return `XG ${best.xg.toFixed(2)}`;
    const m = this.m, pd = m?.presserDist;
    if (best.switch) return `SWITCH ${Math.round(Math.abs(best.dz))} M`;
    if (pd != null && pd < 6 && this.beatsPress(best)) return 'BEHIND THE PRESS';
    if (pd != null && pd < 2.5) return `PRESSER ${pd.toFixed(1)} M`;
    if (best.margin >= 1.5) return `LANE ${Math.min(best.margin, 9.9).toFixed(1)} M OPEN`;
    if (best.dx >= 15) return `FORWARD ${Math.round(best.dx)} M`;
    if (best.near >= 6) return `SPACE ${best.near.toFixed(1)} M`;
    return 'SAFEST LANE';
  }

  // does the pass go past the nearest presser (he sits between passer and receiver, within 8 m of the line)?
  beatsPress(best) {
    const u = this.world.userPos(), tp = best.target.pos;
    let p = null, pd = Infinity;
    for (const o of this.pressers) {
      const dd = Math.hypot(o.pos.x - u.x, o.pos.z - u.z);
      if (dd < pd) { pd = dd; p = o; }
    }
    if (!p || tp.x <= u.x + 4 || p.pos.x <= u.x + 1 || p.pos.x >= tp.x - 1) return false;
    const dx = tp.x - u.x, dz = tp.z - u.z, k = clamp(((p.pos.x - u.x) * dx + (p.pos.z - u.z) * dz) / (dx * dx + dz * dz || 1), 0, 1);
    return Math.hypot(p.pos.x - (u.x + dx * k), p.pos.z - (u.z + dz * k)) <= 8;
  }

  finish() {
    if (this.inScan) this.closeScan();
    if (!this._mInit) this.initMetrics();
    const m = this.m || this.receiveMetrics(this.world.userPos());
    const d = this.diff;
    const recvT = this.receiveT ?? this.t;
    const before = this.scans.filter((s) => s.t < recvT);
    const quiz = this.memory != null;
    const decision = this.decisionScore || 0;
    const oneTouch = !!this.oneTouch;
    const decisionSpeed = this.chosen && oneTouch ? 0 : this.decideTime || 0;
    const sf = speedFactor(decisionSpeed);
    const parts = { rate: m.rateScore, info: m.info, timing: m.timing, critical: m.criticalScore };
    const composite = scanComposite(parts);
    const total = totalScore(decision, sf, composite, quiz ? this.memory : null);
    const out = this.outcome;
    // the crowd reacts to the quality of the decision, not just the result
    const q = 0.4 + 0.6 * ((this.decisionScore || 0) / 100);
    if (out === 'goal') this.fx.cheer?.(q);
    else if (out === 'tight') this.fx.cheer?.(0.7 * q); // completing under the press is the trained skill
    else if (out === 'completed') this.fx.cheer?.(0.4 * q);
    else if (out === 'intercepted' || out === 'blocked') this.fx.groan?.();
    const best = this.options?.[0] || null;
    this.result = {
      role: this.roleKey,
      drill: this.drillKey,
      scans: before.length,
      scanTarget: m.scanRate10 != null ? Math.max(1, Math.round((m.par * m.rateWindow) / 10)) : d.scanTarget,
      scanRate: before.length / (this.scanWindow || 1),
      shoulder: before.filter((s) => s.shoulder).length,
      watchedStrike: this.watchedStrike,
      watchedTouch: this.watchedTouch,
      sawPresser: m.presserSeen !== false,
      sawFree: !this.free || m.sawBest !== false,
      scanScore: Math.round(composite),
      decision,
      memory: quiz ? this.memory : null,
      total,
      outcome: out,
      oneTouch,
      decideTime: this.decideTime,
      chosen: this.chosen,
      best,
      // research A: scan metrics
      timing: m.timing,
      badScans: m.badScans,
      critical: m.critical,
      info: m.info,
      body: m.body,
      bodyScore: m.bodyScore,
      scanRate10: m.scanRate10,
      par: m.par,
      parts,
      // the decision
      decisionSpeed,
      speedFactor: sf,
      bestNumber: best ? (best.kind === 'shot' ? 'SHOT' : best.target.number) : null,
      reason: this.reasonFor(best),
      sawBest: m.sawBest,
      presserDist: m.presserDist,
      presserSide: m.presserSide,
      flight: m.flight,
      speed: this.speed,
    };
    const extra = this.scenarioResult(this.result);
    if (extra && typeof extra === 'object') Object.assign(this.result, extra);
    this.state = 'done';
  }

  record(dt) {
    this.frameClock -= dt;
    if (this.frameClock > 0) return;
    this.frameClock = 1 / 20;
    const w = this.world, u = w.userPos();
    const f = new Float32Array(6 + 22 * 3);
    f[0] = u.x; f[1] = u.z; f[2] = w.headYaw();
    f[3] = w.ball.pos.x; f[4] = w.ball.pos.y; f[5] = w.ball.pos.z;
    let k = 6;
    const put = (p) => {
      f[k++] = p === this.userBody ? u.x : p.pos.x;
      f[k++] = p === this.userBody ? u.z : p.pos.z;
      f[k++] = p === this.userBody ? w.headYaw() : p.heading;
    };
    for (let i = 0; i < this.home.length; i++) put(this.home[i]);
    for (let i = 0; i < this.away.length; i++) put(this.away[i]);
    this.frames.push({ t: this.t, f });
  }
}

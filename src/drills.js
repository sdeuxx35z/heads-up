import * as THREE from 'three';
import { ROLES } from './config.js';
import { evaluateRondo, laneMargin } from './eval.js';
import { Rep, AWARE_BONUS, GAZE_CONE, GAZE_HOLD, GAZE_GAP } from './rep.js';
import { PALETTE, SCENARIOS, SCENARIO_NAMES, SCENARIO_ROLES } from './scenarios.js';

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const angDiff = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
const heading = (from, to) => Math.atan2(to.x - from.x, to.z - from.z);
const DEG = Math.PI / 180;

const SQ = 12; // rondo square, metres
const HALF = SQ / 2;
const PER = 4 * SQ; // perimeter length

// point on the square's edge, s metres along the perimeter (0..48)
export function perimeterPoint(s, cx, cz, out = { x: 0, z: 0 }) {
  s = ((s % PER) + PER) % PER;
  const side = Math.floor(s / SQ), f = s - side * SQ;
  if (side === 0) { out.x = cx - HALF + f; out.z = cz - HALF; }
  else if (side === 1) { out.x = cx + HALF; out.z = cz - HALF + f; }
  else if (side === 2) { out.x = cx + HALF - f; out.z = cz + HALF; }
  else { out.x = cx - HALF; out.z = cz + HALF - f; }
  return out;
}

// shortest way round the perimeter between two positions on it
const perDist = (a, b) => { const d = Math.abs(a - b) % PER; return Math.min(d, PER - d); };

// ---------------------------------------------------------------------------------------------
// 5v2 rondo. The viewer is one of five on the edge of a 12 m square; two defenders hunt the ball.
// The four mates slide along the edges to open angles, the ball runs round 2-3 times before it
// reaches you, and the windows are short, so it keeps moving.
// ---------------------------------------------------------------------------------------------
export class RondoDrill extends Rep {
  constructor(world, opts) {
    super(world, { ...opts, role: ROLES[opts.role] ? opts.role : 'CM', quiz: false, motion: false });
    this.drillKey = 'rondo';
    this.windowScale = 0.5; // short windows: 1.8 s easy ... 0.9 s elite (Rep divides by the game speed)
    this.outcomeLen = 1.7;
    this.holdRange = [0.3, 0.5]; // Rep divides by the game speed
    this.quizWanted = false;
    this._pp = { x: 0, z: 0 };
    this._cand = { x: 0, z: 0 };
  }

  start() {
    this._setupDone = false;
    super.start();
    // Rep.start() calls setupScenario() itself once S1's hook is in; this covers the older Rep
    if (!this._setupDone) this.setupScenario();
  }

  setupScenario() {
    this._setupDone = true;
    super.setupScenario?.();
    const w = this.world, d = this.diff, gs = this.speed;
    w.clearOverlays();
    this.home.forEach((p) => p.setVisible(true));
    this.away.forEach((p) => p.setVisible(true));

    const cx = rand(-22, 22), cz = rand(-12, 12);
    this.centre = new THREE.Vector3(cx, 0, cz);
    this.focus = { x: cx, z: cz, radius: 10 };
    w.showRondo(true, cx, cz, SQ);

    // five on the edge, evenly spread round the perimeter with a little jitter
    const off = rand(0, 9.6), jit = d.jitter * 0.5;
    const ss = [];
    for (let k = 0; k < 5; k++) ss.push(off + k * 9.6 + rand(-jit, jit));
    const uk = (Math.random() * 5) | 0;
    const userSpot = perimeterPoint(ss[uk], cx, cz);
    this.userS = ss[uk];
    this.mateS = ss.filter((_, k) => k !== uk);
    this.homeS = this.mateS.slice();
    this.slideTo = this.mateS.slice();
    this.slideClock = this.mateS.map((_, i) => 0.15 + i * 0.17);

    this.slotName = 'EDGE';
    this.userIdx = 0;
    this.userBody = this.home[0];
    this.userBody.setVisible(false);
    this.userBody.place(userSpot.x, userSpot.z);
    this.mates = this.home.slice(1, 5);
    this.mates.forEach((p, i) => {
      const sp = perimeterPoint(this.mateS[i], cx, cz);
      p.place(sp.x, sp.z, heading(sp, this.centre));
      p.sync();
      p.wobble = Math.random() * 100;
      p.maxSpeed = 2.5;
    });
    this.defenders = [this.away[1], this.away[2]];
    this.opps = this.defenders;
    this.pressers = this.defenders;
    this.defenders.forEach((p, i) => {
      p.place(cx + (i ? 1.4 : -1.4) + rand(-0.5, 0.5), cz + rand(-1, 1));
      p.role = null;
    });
    // everyone else idles far away and unseen
    this.home.forEach((p, i) => { if (i > 4) { p.setVisible(false); p.place(300 + i * 3, 300); } });
    this.away.forEach((p, i) => { if (i !== 1 && i !== 2) { p.setVisible(false); p.place(-300 - i * 3, 300); } });

    this.carrier = this.mates[(Math.random() * 4) | 0];
    const up = userSpot;
    this.ballAt(this.carrier);
    w.placeUser(new THREE.Vector3(up.x, 0, up.z), heading(up, this.carrier.pos));
    this.userStart = new THREE.Vector3(up.x, 0, up.z);
    this.userTarget = this.userStart.clone();
    this.runOffset = new THREE.Vector3();
    this.free = null;
    this.freeDrift = new THREE.Vector3();

    this.passesLeft = Math.round(rand(3, 4)); // two or three passes round the edge, then the viewer
    this.hold = rand(0.35, 0.5) / gs;
    this.receiver = null;
    this.finalStruck = false;
    this.closer = this.defenders[0];
    this.cutter = this.defenders[1];
    this.cutMate = this.mates[0];
    this.pending = null;
    this.aimed = null;
    this.memory = null;
    this.sawPresser = this.pressers.map(() => -99);
    this.lastSawFree = -99;
  }

  evaluate(from) { return evaluateRondo(from, this.mates, this.defenders); }

  // the rondo has its own short windows (the defenders hold a yard off; nobody tackles from 1.2 m)
  decisionWindow(presserDist, aware) { return ((this.diff.window + (aware ? AWARE_BONUS : 0)) * this.windowScale) / this.speed; }

  nextPass(user) {
    const ball = this.world.ball, from = this.carrier;
    this.passesLeft--;
    if (this.passesLeft < 1) {
      from.turnTo?.(heading(from.pos, user));
      this.ballAt(from);
      this.finalBall(from, user);
      return;
    }
    // zip it to the teammate with the cleanest lane, a little randomly
    let to = null, bs = -Infinity;
    for (const p of this.mates) {
      if (p === from) continue;
      let m = Infinity;
      for (const o of this.defenders) m = Math.min(m, laneMargin(from.pos, p.pos, o.pos, 16, false));
      const s = m + rand(0, 1.2);
      if (s > bs) { bs = s; to = p; }
    }
    from.turnTo?.(heading(from.pos, to.pos));
    this.ballAt(from);
    ball.kick(ball.pos, to.pos, rand(14, 17) * this.speed, 0);
    this.receiver = to;
    this.events.push({ t: this.t, type: 'pass' });
    this.kickSound(0.7, ball.flight?.wait);
  }

  finalBall(from, user) {
    super.finalBall(from, user);
    // one defender closes the viewer, the other cuts the lane to the teammate nearest him
    const [a, b] = this.defenders;
    const da = Math.hypot(a.pos.x - user.x, a.pos.z - user.z), db = Math.hypot(b.pos.x - user.x, b.pos.z - user.z);
    this.closer = da <= db ? a : b;
    this.cutter = this.closer === a ? b : a;
    let best = Infinity;
    for (const m of this.mates) {
      const dd = Math.hypot(m.pos.x - this.cutter.pos.x, m.pos.z - this.cutter.pos.z);
      if (dd < best) { best = dd; this.cutMate = m; }
    }
  }

  loseSpot(p) {
    const u = this.userBody.pos;
    const dx = p.pos.x - u.x, dz = p.pos.z - u.z, l = Math.hypot(dx, dz) || 1;
    return new THREE.Vector3(p.pos.x + dx / l * 7, 0, p.pos.z + dz / l * 7);
  }

  afterTouchDirs(p) {
    if (p.team === 'home') {
      const dx = this.centre.x - p.pos.x, dz = this.centre.z - p.pos.z, l = Math.hypot(dx, dz) || 1;
      this._tdx = dx / l * 1.3; this._tdz = dz / l * 1.3;
    } else {
      const u = this.userBody.pos;
      const dx = p.pos.x - u.x, dz = p.pos.z - u.z, l = Math.hypot(dx, dz) || 1;
      this._tdx = dx / l * 10; this._tdz = dz / l * 10;
    }
  }

  // The edge position (0..48) mate i should drift to: the spot within a few metres of where he
  // started that gives the ball holder the widest lane past both defenders, and keeps a gap to his
  // neighbours and to the viewer.
  bestSlide(i) {
    const c = this.centre, ball = this.world.ball;
    const ref = this.state === 'incoming' || this.state === 'decide' ? this.userBody.pos : (ball.flight ? ball.flight.from : this.carrier.pos);
    const cur = this.mateS[i], cand = this._cand;
    let best = cur, bs = -Infinity;
    for (let k = -4; k <= 4; k += 1) {
      const s = cur + k;
      if (perDist(s, this.homeS[i]) > 5) continue;
      perimeterPoint(s, c.x, c.z, cand);
      let m = Infinity;
      for (const o of this.defenders) m = Math.min(m, laneMargin(ref, cand, o.pos, 16, false));
      let gap = perDist(s, this.userS);
      for (let j = 0; j < this.mateS.length; j++) if (j !== i) gap = Math.min(gap, perDist(s, this.mateS[j]));
      const score = clamp(m, -3, 4) + Math.min(gap, 4) * 0.6 - Math.abs(k) * 0.06;
      if (score > bs) { bs = score; best = s; }
    }
    return best;
  }

  moveActors(dt, user) {
    const ball = this.world.ball, st = this.state, c = this.centre;
    const outcome = st === 'outcome';
    const pp = this._pp;
    for (let i = 0; i < this.mates.length; i++) {
      const p = this.mates[i];
      // slide along the edge unless he holds the ball or the ball is coming to him
      if (!outcome && p !== this.carrier && p !== this.receiver) {
        this.slideClock[i] -= dt;
        if (this.slideClock[i] <= 0) { this.slideClock[i] = rand(0.45, 0.8); this.slideTo[i] = this.bestSlide(i); }
        const k = this.slideTo[i] - this.mateS[i], step = 1.7 * dt;
        this.mateS[i] += clamp(k, -step, step);
      }
      perimeterPoint(this.mateS[i], c.x, c.z, pp);
      p.target.set(pp.x + Math.sin(this.t * 1.1 + p.wobble) * 0.15, 0, pp.z + Math.cos(this.t * 0.9 + p.wobble) * 0.15);
      p.maxSpeed = 2.5;
      if (outcome && this.outcomeTarget === p) p.target.copy(ball.flight ? ball.flight.to : ball.pos);
    }
    const sp = this.diff.presserSpeed * 0.8 * this.speed;
    const [d0, d1] = this.defenders;
    if (outcome) {
      for (const o of this.defenders) {
        if (o === this.outcomeTarget) { o.target.copy(ball.flight ? ball.flight.to : ball.pos); o.maxSpeed = 7; }
        else { o.target.copy(c); o.maxSpeed = 2; }
      }
    } else if (this.finalStruck) {
      const a = this.closer, b = this.cutter, cm = this.cutMate;
      const dx = a.pos.x - user.x, dz = a.pos.z - user.z, l = Math.hypot(dx, dz) || 1;
      const hold = st === 'decide' ? 1.8 : 3;
      a.target.set(user.x + dx / l * hold, 0, user.z + dz / l * hold);
      a.maxSpeed = st === 'decide' ? this.diff.presserSpeed * this.speed : sp;
      b.target.set(user.x + (cm.pos.x - user.x) * 0.45, 0, user.z + (cm.pos.z - user.z) * 0.45);
      b.maxSpeed = sp;
    } else {
      const fx = ball.flight ? ball.flight.to.x : this.carrier.pos.x;
      const fz = ball.flight ? ball.flight.to.z : this.carrier.pos.z;
      const near0 = Math.hypot(d0.pos.x - fx, d0.pos.z - fz) <= Math.hypot(d1.pos.x - fx, d1.pos.z - fz);
      const a = near0 ? d0 : d1, b = near0 ? d1 : d0;
      // a leans on the ball from the middle side; b shades the next pass
      const cx = c.x - fx, cz = c.z - fz, cl = Math.hypot(cx, cz) || 1;
      a.target.set(fx + cx / cl * 2.2, 0, fz + cz / cl * 2.2);
      const nx = this.receiver ? this.receiver.pos.x : user.x, nz = this.receiver ? this.receiver.pos.z : user.z;
      b.target.set(c.x + (nx - c.x) * 0.4, 0, c.z + (nz - c.z) * 0.4);
      a.maxSpeed = b.maxSpeed = sp;
    }
    if (!outcome) {
      for (const o of this.defenders) {
        o.target.x = clamp(o.target.x, c.x - 5.7, c.x + 5.7);
        o.target.z = clamp(o.target.z, c.z - 5.7, c.z + 5.7);
      }
    }
    this.reactions();
    for (const p of this.mates) p.step(dt, ball.pos);
    for (const o of this.defenders) o.step(dt, ball.pos);
  }
}

// ---------------------------------------------------------------------------------------------
// Awareness: a pure scanning test. One player behind the viewer flashes a coloured ring; after the
// pass the viewer is asked about it later (blackout quiz). Half the time the question is the
// colour (one of five), half the time where the flashing player stood (one of four map spots).
// ---------------------------------------------------------------------------------------------
export const CUE_COLORS = PALETTE.map((c) => c.css);
export const CUE_HEX = PALETTE.map((c) => c.hex);
export const CUE_NAMES = PALETTE.map((c) => c.name);
const CUE_TIME = 0.8;

// 100 for the right colour, 0 otherwise
export function cueScore(snap, guess) { return guess === snap.cueColor ? 100 : 0; }

export class AwarenessDrill extends Rep {
  constructor(world, opts) {
    super(world, { ...opts, role: ROLES[opts.role] ? opts.role : 'CM' });
    this.drillKey = 'awareness';
    this.quizWanted = true;
  }

  start() {
    super.start();
    this.quizWanted = true;
    this.passesLeft = Math.max(this.passesLeft, 3); // long enough for the cue to run its course
    this.cueAt = rand(0.5, 1.1);
    this.cueState = 0; // 0 waiting, 1 showing, 2 finished
    this.cueP = null;
    this.cueColor = (Math.random() * CUE_COLORS.length) | 0;
    this.cueMode = Math.random() < 0.5 ? 'colour' : 'spot';
    this.cueSpots = null;
    this.cueSpot = -1;
    this.cueSeen = false;
    this.cueHold = 0;
    this.cueGap = 0;
    this.cueLeft = 0;
    this._cu = new THREE.Vector3();
  }

  tick(dt) {
    super.tick(dt);
    if (this.state === 'buildup' || this.state === 'incoming') this.cueStep(dt);
  }

  cueStep(dt) {
    const w = this.world;
    if (this.cueState === 0) {
      if (this.state === 'buildup' && this.t >= this.cueAt) this.fireCue();
    } else if (this.cueState === 1) {
      const user = w.userPos(this._cu);
      // the same look Rep credits: inside the 20 degree cone, held 0.12 s (gaps under 0.35 s forgiven); a snap turn is no look
      if (!this.snapThisFrame && !this.cueSeen) {
        if (angDiff(w.headYaw(), heading(user, this.cueP.pos)) < GAZE_CONE) {
          this.cueHold += dt; this.cueGap = 0;
          if (this.cueHold >= GAZE_HOLD) this.cueSeen = true;
        } else if ((this.cueGap += dt) > GAZE_GAP) this.cueHold = 0;
      }
      this.cueLeft -= dt;
      if (this.cueLeft <= 0) this.endCue();
    }
  }

  fireCue() {
    const w = this.world, user = w.userPos(this._cu);
    const toBall = heading(user, w.ball.pos);
    const all = this.mates.concat(this.away.filter((o) => o.slot !== 'GK'));
    // the position question needs the player inside the quiz map (22 m square around the viewer)
    const far = this.cueMode === 'spot' ? 20 : 32;
    let pool = [], widest = null, wa = -1;
    for (const p of all) {
      if (p === this.carrier) continue;
      const a = angDiff(heading(user, p.pos), toBall), dist = Math.hypot(p.pos.x - user.x, p.pos.z - user.z);
      if (dist < 3) continue;
      if (a > 100 * DEG && dist > 4 && dist < far) pool.push(p);
      if (a > wa && dist < far + 8) { wa = a; widest = p; }
    }
    this.cueP = pool.length ? pool[(Math.random() * pool.length) | 0] : widest || all.find((p) => p !== this.carrier);
    this.cueP.highlight(CUE_HEX[this.cueColor], 0.95);
    this.cueState = 1;
    this.cueLeft = CUE_TIME;
    if (this.cueMode === 'spot') this.pickSpots(user, all);
    this.events.push({ t: this.t, type: 'cue' });
  }

  // Four spots for the map question: where the cued player stood, plus three places other players
  // stood at that moment (or, if the pitch is thin there, the same distance round the viewer).
  pickSpots(user, all) {
    const truth = { x: this.cueP.pos.x, z: this.cueP.pos.z };
    const spots = [truth];
    const far = (q) => spots.every((s) => Math.hypot(s.x - q.x, s.z - q.z) >= 7);
    const inMap = (q) => Math.hypot(q.x - user.x, q.z - user.z) > 4 && Math.abs(q.x - user.x) < 20 && Math.abs(q.z - user.z) < 20;
    const shuffled = all.filter((p) => p !== this.cueP).sort(() => Math.random() - 0.5);
    for (const p of shuffled) {
      if (spots.length >= 4) break;
      const q = { x: p.pos.x, z: p.pos.z };
      if (inMap(q) && far(q)) spots.push(q);
    }
    const ang = Math.atan2(truth.x - user.x, truth.z - user.z), r = Math.max(6, Math.hypot(truth.x - user.x, truth.z - user.z));
    for (const deg of [80, -80, 140, -140, 50, -50, 110, -110, 170]) {
      if (spots.length >= 4) break;
      const a = ang + deg * DEG;
      const q = { x: user.x + Math.sin(a) * r, z: user.z + Math.cos(a) * r };
      if (far(q)) spots.push(q);
    }
    this.cueSpots = spots.sort(() => Math.random() - 0.5);
    this.cueSpot = this.cueSpots.indexOf(truth);
  }

  endCue() {
    if (this.cueState === 1 && this.cueP) this.cueP.highlight(0xffffff, 0);
    this.cueState = 2;
  }

  onArrive() {
    // the ball reaching the viewer closes the cue window, shown or not
    if (this.state === 'incoming') this.endCue();
    super.onArrive();
  }

  updateAimGlow() {
    const cp = this.cueState === 1 ? this.cueP : null;
    if (!cp) { super.updateAimGlow(); return; }
    const c = cp.ringMat.color.getHex(), o = cp.ringMat.opacity;
    super.updateAimGlow();
    cp.highlight(c, o);
  }

  // Everyone drifts a bit more than in a normal rep so there is something to look at.
  reactions() {
    if (this.state === 'outcome') { super.reactions(); return; }
    const t = this.t;
    for (let i = 0; i < this.home.length; i++) {
      const p = this.home[i];
      if (i === this.userIdx || p === this.carrier || p === this.receiver || p.slot === 'GK') continue;
      p.target.x += Math.sin(t * 0.8 + p.wobble) * 2.4;
      p.target.z += Math.cos(t * 0.7 + p.wobble * 1.3) * 2.4;
    }
    for (let i = 0; i < this.away.length; i++) {
      const o = this.away[i];
      if (o.role === 'presser' || o.slot === 'GK') continue;
      o.target.x += Math.sin(t * 0.7 + o.wobble) * 2.2;
      o.target.z += Math.cos(t * 0.9 + o.wobble) * 2.2;
    }
  }

  // Quiz data. snap.cueColor / snap.cueSeen as asked; snap.cue is the same plus the palette and,
  // for the position question, the four map spots (snap.cue.spot is the right one).
  takeSnapshot(user) {
    const s = super.takeSnapshot(user);
    s.cueColor = this.cueColor;
    s.cueSeen = this.cueSeen;
    s.cue = {
      color: this.cueColor, colors: CUE_COLORS.slice(), hexes: CUE_HEX.slice(), names: CUE_NAMES.slice(), seen: this.cueSeen,
      mode: this.cueMode, spots: this.cueSpots, spot: this.cueSpot,
    };
    return s;
  }

  finish() {
    super.finish();
    if (this.result) {
      this.result.cueColor = this.cueColor;
      this.result.cueSeen = this.cueSeen;
      this.result.cueMode = this.cueMode;
    }
  }
}

export const DRILLS = { match: Rep, rondo: RondoDrill, awareness: AwarenessDrill, ...SCENARIOS };
export const DRILL_NAMES = { match: 'MATCH SITUATION', rondo: 'RONDO 5V2', awareness: 'AWARENESS', ...SCENARIO_NAMES };
export const DRILL_KEYS = Object.keys(DRILLS);
export { SCENARIOS, SCENARIO_NAMES, SCENARIO_ROLES };

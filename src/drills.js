import * as THREE from 'three';
import { ROLES } from './config.js';
import { evaluateRondo, laneMargin } from './eval.js';
import { Rep } from './rep.js';

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const angDiff = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
const heading = (from, to) => Math.atan2(to.x - from.x, to.z - from.z);
const DEG = Math.PI / 180;
const SEEN = 48 * DEG; // same head-angle test Rep uses for "saw it"

const SQ = 12; // rondo square, metres
const HALF = SQ / 2;

// point on the square's edge, s metres along the perimeter (0..48)
export function perimeterPoint(s, cx, cz, out = { x: 0, z: 0 }) {
  s = ((s % (4 * SQ)) + 4 * SQ) % (4 * SQ);
  const side = Math.floor(s / SQ), f = s - side * SQ;
  if (side === 0) { out.x = cx - HALF + f; out.z = cz - HALF; }
  else if (side === 1) { out.x = cx + HALF; out.z = cz - HALF + f; }
  else if (side === 2) { out.x = cx + HALF - f; out.z = cz + HALF; }
  else { out.x = cx - HALF; out.z = cz + HALF - f; }
  return out;
}

// ---------------------------------------------------------------------------------------------
// 5v2 rondo. The viewer is one of five on the edge of a 12 m square; two defenders hunt the ball.
// ---------------------------------------------------------------------------------------------
export class RondoDrill extends Rep {
  constructor(world, opts) {
    super(world, { ...opts, role: ROLES[opts.role] ? opts.role : 'CM', quiz: false, motion: false });
    this.drillKey = 'rondo';
    this.windowScale = 0.55; // short windows: 2.0 s easy ... 1.0 s elite
    this.outcomeLen = 1.7;
    this.holdRange = [0.3, 0.5];
    this.quizWanted = false;
  }

  start() {
    const w = this.world, role = this.role, d = this.diff;
    w.useFormation(role.formation);
    w.clearOverlays();
    this.F = role.formation;
    this.home = w.home;
    this.away = w.away;
    this.outcomeArrived = false;
    this.touchT = 0;
    this.outcomeAge = 0;

    const cx = rand(-22, 22), cz = rand(-12, 12);
    this.centre = new THREE.Vector3(cx, 0, cz);
    this.focus = { x: cx, z: cz, radius: 10 };
    w.showRondo(true, cx, cz, SQ);

    // five on the edge, evenly spread round the perimeter with a little jitter
    const off = rand(0, 9.6), jit = d.jitter * 0.5;
    const pts = [];
    for (let k = 0; k < 5; k++) pts.push(perimeterPoint(off + k * 9.6 + rand(-jit, jit), cx, cz));
    const uk = (Math.random() * 5) | 0;
    const userSpot = pts[uk];
    const mateSpots = pts.filter((_, k) => k !== uk);

    this.slotName = 'EDGE';
    this.userIdx = 0;
    this.userBody = this.home[0];
    this.userBody.setVisible(false);
    this.userBody.place(userSpot.x, userSpot.z);
    this.mates = this.home.slice(1, 5);
    this.spots = mateSpots;
    this.mates.forEach((p, i) => {
      p.place(mateSpots[i].x, mateSpots[i].z);
      p.heading = heading(p.pos, this.centre);
      p.sync();
      p.wobble = Math.random() * 100;
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

    this.passesLeft = Math.round(rand(2, 3)); // one or two passes round the edge, then the viewer
    this.hold = rand(0.35, 0.5);
    this.receiver = null;
    this.finalStruck = false;
    this.closer = this.defenders[0];
    this.cutter = this.defenders[1];
    this.cutMate = this.mates[0];

    this.scans = [];
    this.inScan = false;
    this.scanPeak = 0;
    this.anchorYaw = null;
    this.sawPresser = this.pressers.map(() => -99);
    this.lastSawFree = -99;
    this.watchedStrike = null;
    this.watchedTouch = null;
    this.buildupStart = 0;
    this.events = [];
    this.frames = [];
    this.frameClock = 0;
    this.pending = null;
    this.aimed = null;
    this.result = null;
    this.memory = null;
    this.t = 0;
    this.state = 'buildup';
  }

  evaluate(from) { return evaluateRondo(from, this.mates, this.defenders); }

  nextPass(user) {
    const ball = this.world.ball, from = this.carrier;
    this.passesLeft--;
    if (this.passesLeft < 1) {
      from.heading = heading(from.pos, user);
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
    from.heading = heading(from.pos, to.pos);
    this.ballAt(from);
    ball.kick(ball.pos, to.pos, rand(14, 17), 0);
    this.receiver = to;
    this.events.push({ t: this.t, type: 'pass' });
    this.fx.kick?.(0.7);
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

  moveActors(dt, user) {
    const ball = this.world.ball, st = this.state, c = this.centre;
    const outcome = st === 'outcome';
    for (let i = 0; i < this.mates.length; i++) {
      const p = this.mates[i], sp = this.spots[i];
      p.target.set(sp.x + Math.sin(this.t * 1.1 + p.wobble) * 0.3, 0, sp.z + Math.cos(this.t * 0.9 + p.wobble) * 0.3);
      p.maxSpeed = 2.5;
      if (outcome && this.outcomeTarget === p) p.target.copy(ball.flight ? ball.flight.to : ball.pos);
    }
    const sp = this.diff.presserSpeed * 0.8;
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
      a.maxSpeed = st === 'decide' ? this.diff.presserSpeed : sp;
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
// pass the viewer is asked what colour it was (quiz type 'cue'), then makes a normal pass decision.
// ---------------------------------------------------------------------------------------------
export const CUE_COLORS = ['#ff3b3b', '#b04bff', '#22e0e0'];
export const CUE_HEX = [0xff3b3b, 0xb04bff, 0x22e0e0];
export const CUE_NAMES = ['RED', 'PURPLE', 'CYAN'];
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
    this.cueColor = (Math.random() * 3) | 0;
    this.cueSeen = false;
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
      if (angDiff(w.headYaw(), heading(user, this.cueP.pos)) < SEEN) this.cueSeen = true;
      this.cueLeft -= dt;
      if (this.cueLeft <= 0) this.endCue();
    }
  }

  fireCue() {
    const w = this.world, user = w.userPos(this._cu);
    const toBall = heading(user, w.ball.pos);
    const all = this.mates.concat(this.away.filter((o) => o.slot !== 'GK'));
    let pool = [], widest = null, wa = -1;
    for (const p of all) {
      if (p === this.carrier) continue;
      const a = angDiff(heading(user, p.pos), toBall), dist = Math.hypot(p.pos.x - user.x, p.pos.z - user.z);
      if (dist < 3) continue;
      if (a > 100 * DEG && dist > 4 && dist < 32) pool.push(p);
      if (a > wa) { wa = a; widest = p; }
    }
    this.cueP = pool.length ? pool[(Math.random() * pool.length) | 0] : widest;
    this.cueP.highlight(CUE_HEX[this.cueColor], 0.95);
    this.cueState = 1;
    this.cueLeft = CUE_TIME;
    this.events.push({ t: this.t, type: 'cue' });
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

  // Quiz data. snap.cueColor / snap.cueSeen as asked; snap.cue is the same plus the palette.
  takeSnapshot(user) {
    const s = super.takeSnapshot(user);
    s.cueColor = this.cueColor;
    s.cueSeen = this.cueSeen;
    s.cue = { color: this.cueColor, colors: CUE_COLORS.slice(), hexes: CUE_HEX.slice(), names: CUE_NAMES.slice(), seen: this.cueSeen };
    return s;
  }

  finish() {
    super.finish();
    if (this.result) {
      this.result.cueColor = this.cueColor;
      this.result.cueSeen = this.cueSeen;
    }
  }
}

export const DRILLS = { match: Rep, rondo: RondoDrill, awareness: AwarenessDrill };
export const DRILL_NAMES = { match: 'MATCH SITUATION', rondo: 'RONDO 5V2', awareness: 'AWARENESS' };
export const DRILL_KEYS = Object.keys(DRILLS);

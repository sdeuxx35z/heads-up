import * as THREE from 'three';
import { AWAY_442, PITCH } from './config.js';
import { laneMargin } from './eval.js';
import { Rep, offsideLine } from './rep.js';

// ---------------------------------------------------------------------------------------------
// Scenario reps: one believable football situation each (research D1-D12). Every class extends Rep,
// re-lays the pitch around the viewer in build(), scripts the opposition in script(), says which
// pass is right in answer(), and adds its own fact to the result in describe().
// They talk to Rep only through the S1/S2 contract: setupScenario / scenarioValue / scenarioResult,
// the contract fields, and the methods start, update, nextPass, onArrive, execute, finish.
// ---------------------------------------------------------------------------------------------

const rand = (a, b) => a + Math.random() * (b - a);
const sign = () => (Math.random() < 0.5 ? -1 : 1);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const angDiff = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
const heading = (from, to) => Math.atan2(to.x - from.x, to.z - from.z);
const dist2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const DEG = Math.PI / 180;
const BONUS = 0.55; // extra value for the right pass
const f1 = (v) => v.toFixed(1);

// point at angle deg (positive = the viewer's right, 180 = directly behind) and distance d from o,
// for a viewer facing heading h
const polar = (o, h, deg, d) => {
  const a = h - deg * DEG;
  return { x: o.x + Math.sin(a) * d, z: o.z + Math.cos(a) * d };
};

// ring colours shared by the colour call and the awareness cue
export const PALETTE = [
  { name: 'RED', hex: 0xff3b3b, css: '#ff3b3b' },
  { name: 'YELLOW', hex: 0xffd93b, css: '#ffd93b' },
  { name: 'GREEN', hex: 0x35e07a, css: '#35e07a' },
  { name: 'CYAN', hex: 0x22e0e0, css: '#22e0e0' },
  { name: 'PURPLE', hex: 0xb04bff, css: '#b04bff' },
];

// where a slot stands for a block that has shifted with the ball (the formations are drawn for the centre spot)
function shapeHome(def, bx, bz) {
  const [name, sx, sz] = def;
  if (name === 'GK') return [clamp(-47 + (bx + 52) * 0.06, -49.5, -40), clamp(bz * 0.12, -4, 4)];
  return [clamp(sx + bx * 0.5, -49, 49), clamp(sz * 0.9 + bz * 0.3, -32, 32)];
}
function shapeAway(def, bx, bz) {
  const [name, sx, sz] = def;
  if (name === 'GK') return [49 - Math.max(0, bx - 15) * 0.05, bz * 0.12];
  return [clamp(sx + bx * 0.55, -47, 47), clamp(sz * 0.75 + bz * 0.4, -31, 31)];
}

export class Scenario extends Rep {
  static key = 'scenario';
  static roles = ['CM'];
  static flight = 1.3; // seconds the last pass takes to reach the viewer
  static quizOK = false; // a blackout quiz would break the timing of most scenarios
  static window = 1; // multiplier on the decision window
  static minWindow = 1; // seconds on the ball whatever the presser's distance (the dynamic window can run shorter)

  constructor(world, opts = {}) {
    const C = new.target;
    super(world, { ...opts, role: C.roles.includes(opts.role) ? opts.role : C.roles[0] });
    this.drillKey = C.key;
    this.gameSpeed = this.speed; // Rep clamps opts.speed to 0.5-1.2
    this.flightT = C.flight;
    this.quizWanted = !!(C.quizOK && opts.quiz);
    this.windowScale = C.window;
    this.slow = 1; // time scale (inhibition slows the world)
    this.rawT = 0; // seconds of real time, unaffected by the slow-down
    this._u = new THREE.Vector3();
  }

  // ---- lifecycle -------------------------------------------------------------------------------

  start() {
    this._setupDone = false;
    this.slow = 1;
    this.rawT = 0;
    super.start();
    // Rep.start() calls setupScenario() itself once S1's hook is in; this covers the older Rep
    if (!this._setupDone) this.setupScenario();
  }

  setupScenario() {
    this._setupDone = true;
    super.setupScenario?.();
    this.slow = 1;
    this.rawT = 0;
    this.base = new Map(); // where each player holds when the script does not move him
    this.placed = new Set();
    this.pinned = new Set(); // opposition the lane/area clearing must not nudge
    this.stalk = new Map(); // offsets from the viewer that stalkers keep
    this.rules = [];
    this.plans = new Map(); // presser -> his plan for this rep
    this.watch = {};
    this.saw = {};
    this.sawAt = {};
    this._wacc = null; // gaze accumulators for the watch list, sized on first use
    this._wseen = null;
    this.chain = [];
    this.away.forEach((o) => { o.role = null; o.stalk = null; });
    this.home.forEach((p) => p.highlight?.(0xffffff, 0));
    this.free = null;
    this.pressers = [];
    this.build();
    this.seal();
  }

  build() {}

  // the tail of every build: carrier, passes, bookkeeping
  seal() {
    const w = this.world;
    // the clearing passes may have walked someone onto someone: the pinned and the home cast stay, the rest give way
    if (this.scriptedSet) this.spread(new Set([...this.scriptedSet].filter((p) => p.team === 'home' || this.pinned.has(p))));
    for (const rule of this.rules) rule();
    if (this.scriptedSet) this.declump();
    if (!this.chain.length) this.chain = [this.mates.find((m) => m.slot !== 'GK')];
    this.carrier = this.chain[0];
    this.passesLeft = this.chain.length;
    this.hold = rand(0.9, 1.3) / this.speed;
    this.receiver = null;
    this.finalStruck = false;
    this.pending = null;
    this.aimed = null;
    if (!this.pressers.length) {
      const o = this.away.find((p) => p.slot !== 'GK' && !this.pinned.has(p)) || this.away[1];
      this.pressers = [o];
    }
    for (const o of this.pressers) o.role = 'presser';
    this.sawPresser = this.pressers.map(() => -99);
    this.lastSawFree = -99;
    this.freeDrift = new THREE.Vector3();
    const next = this.chain[1], cp = this.carrier.pos;
    this.carrier.place(cp.x, cp.z, heading(cp, next ? next.pos : this.U));
    this.ballAt(this.carrier);
    w.placeUser(this.U, heading(this.U, this.carrier.pos)); // the viewer starts on the first carrier
    w.clearOverlays?.();
    this.afterSeal?.();
  }

  // ---- placement helpers -----------------------------------------------------------------------

  // the viewer's spot and view; U stays the design point even if he walks
  userAt(x, z, fx, fz) {
    const up = new THREE.Vector3(x, 0, z);
    this.U = up;
    this.userBody.place(x, z);
    this.userBody.setVisible(false);
    this.world.placeUser(up, heading(up, { x: fx, z: fz }));
    this.userStart = up.clone();
    this.userTarget = up.clone();
    this.runOffset = new THREE.Vector3();
  }

  put(p, x, z) {
    x = clamp(x, -PITCH.HL + 1.5, PITCH.HL - 1.5);
    z = clamp(z, -PITCH.HW + 1.5, PITCH.HW - 1.5);
    p.place(x, z, Math.atan2(this.U.x - x, this.U.z - z)); // everyone starts looking at the viewer's patch
    p.maxSpeed = 4;
    this.base.set(p, new THREE.Vector3(x, 0, z));
    this.placed.add(p);
    return p;
  }

  pickMate(slots) {
    for (const s of slots) {
      const p = this.mates.find((m) => m.slot === s && !this.placed.has(m));
      if (p) return p;
    }
    return this.mates.find((m) => m.slot !== 'GK' && !this.placed.has(m)) || this.mates[0];
  }

  pickOpp(slots) {
    for (const s of slots) {
      const o = this.away.find((p) => p.slot === s && !this.placed.has(p));
      if (o) return o;
    }
    return this.away.find((p) => p.slot !== 'GK' && !this.placed.has(p)) || this.away[1];
  }

  // everyone not scripted takes the formation shape for a block around (bx, bz)
  fillRest(bx, bz) {
    this.scriptedSet = new Set(this.placed);
    const j = this.diff.jitter * 0.6, F = this.role.formation;
    this.home.forEach((p, i) => {
      if (p === this.userBody || this.placed.has(p)) return;
      const [x, z] = shapeHome(F[i], bx, bz);
      this.put(p, x + rand(-j, j), z + rand(-j, j));
    });
    this.away.forEach((o, i) => {
      if (this.placed.has(o)) return;
      const [x, z] = shapeAway(AWAY_442[i], bx, bz);
      this.put(o, x + rand(-j, j), z + rand(-j, j));
    });
    this.spread();
  }

  // nobody stands on anybody (players in `fixed` never move)
  spread(fixed = this.scriptedSet) {
    const all = [...this.home.filter((p) => p !== this.userBody), ...this.away];
    for (let pass = 0; pass < 3; pass++) {
      for (const p of all) {
        if (fixed.has(p)) continue;
        for (const q of all) {
          if (q === p) continue;
          const dd = dist2(p.pos, q.pos);
          if (dd >= 2.2) continue;
          const dx = dd < 0.01 ? 1 : (p.pos.x - q.pos.x) / dd, dz = dd < 0.01 ? 0 : (p.pos.z - q.pos.z) / dd;
          this.put(p, p.pos.x + dx * 2.6, p.pos.z + dz * 2.6);
        }
        const du = dist2(p.pos, this.U);
        if (du < 2.6) {
          const dx = du < 0.01 ? 1 : (p.pos.x - this.U.x) / du, dz = du < 0.01 ? 0 : (p.pos.z - this.U.z) / du;
          this.put(p, this.U.x + dx * 3, this.U.z + dz * 3);
        }
      }
    }
  }

  movable(except) {
    return this.away.filter((o) => o.slot !== 'GK' && !this.pinned.has(o) && !(except && except.includes(o)));
  }

  // opposition nobody scripted stays out of a circle
  clearArea(cx, cz, r, except) {
    for (const o of this.movable(except)) {
      let dx = o.pos.x - cx, dz = o.pos.z - cz, dd = Math.hypot(dx, dz);
      if (dd >= r) continue;
      if (dd < 0.01) { dx = 1; dz = 0; dd = 1; }
      this.put(o, cx + (dx / dd) * (r + 0.3), cz + (dz / dd) * (r + 0.3));
    }
  }

  // ... and out of a ground pass's way (lane margin at least `margin` metres)
  clearLane(a, b, margin, { speed = 17, lofted = false, except } = {}) {
    for (let it = 0; it < 6; it++) {
      let moved = false;
      for (const o of this.movable(except)) {
        const m = laneMargin(a, b, o.pos, speed, lofted);
        if (m >= margin) continue;
        const dx = b.x - a.x, dz = b.z - a.z, len2 = dx * dx + dz * dz || 1;
        let t = clamp(((o.pos.x - a.x) * dx + (o.pos.z - a.z) * dz) / len2, 0, 1);
        if (lofted && t < 0.8) t = 0.8;
        const cx = a.x + dx * t, cz = a.z + dz * t;
        let px = o.pos.x - cx, pz = o.pos.z - cz, pd = Math.hypot(px, pz);
        if (pd < 0.01) { px = -dz; pz = dx; pd = Math.hypot(px, pz) || 1; }
        const k = (margin - m + 0.5) / pd;
        this.put(o, o.pos.x + px * k, o.pos.z + pz * k);
        moved = true;
      }
      if (!moved) break;
    }
  }

  // ... and a metre-count away from a running line
  clearSeg(a, b, r, except) {
    const dx = b.x - a.x, dz = b.z - a.z, len2 = dx * dx + dz * dz || 1;
    for (const o of this.movable(except)) {
      const t = clamp(((o.pos.x - a.x) * dx + (o.pos.z - a.z) * dz) / len2, 0, 1);
      const cx = a.x + dx * t, cz = a.z + dz * t;
      let px = o.pos.x - cx, pz = o.pos.z - cz, pd = Math.hypot(px, pz);
      if (pd >= r) continue;
      if (pd < 0.01) { px = -dz; pz = dx; pd = Math.hypot(px, pz) || 1; }
      this.put(o, cx + (px / pd) * (r + 0.3), cz + (pz / pd) * (r + 0.3));
    }
  }

  // teammates nobody scripted keep off a running line too, so the viewer's ray cannot hit one by accident
  clearMatesSeg(a, b, r) {
    const dx = b.x - a.x, dz = b.z - a.z, len2 = dx * dx + dz * dz || 1;
    for (const m of this.mates) {
      if (m.slot === 'GK' || this.scriptedSet.has(m)) continue;
      const t = clamp(((m.pos.x - a.x) * dx + (m.pos.z - a.z) * dz) / len2, 0, 1);
      const cx = a.x + dx * t, cz = a.z + dz * t;
      let px = m.pos.x - cx, pz = m.pos.z - cz, pd = Math.hypot(px, pz);
      if (pd >= r) continue;
      if (pd < 0.01) { px = -dz; pz = dx; pd = Math.hypot(px, pz) || 1; }
      this.put(m, cx + (px / pd) * (r + 0.3), cz + (pz / pd) * (r + 0.3));
    }
  }

  // last tidy-up: nobody inside anybody (the pinned and the scripted home cast stay where they were put)
  declump() {
    const all = [...this.home.filter((p) => p !== this.userBody), ...this.away];
    const still = (p) => this.pinned.has(p) || (p.team === 'home' && this.scriptedSet?.has(p));
    for (let pass = 0; pass < 4; pass++) {
      let moved = false;
      for (const p of all) {
        if (still(p)) continue;
        for (const q of all) {
          if (q === p) continue;
          const dd = dist2(p.pos, q.pos);
          if (dd >= 1.5) continue;
          const dx = dd < 0.01 ? 1 : (p.pos.x - q.pos.x) / dd, dz = dd < 0.01 ? 0 : (p.pos.z - q.pos.z) / dd;
          this.put(p, p.pos.x + dx * 1.9, p.pos.z + dz * 1.9);
          moved = true;
        }
        const du = dist2(p.pos, this.U);
        if (du < 1.7) {
          const dx = du < 0.01 ? 1 : (p.pos.x - this.U.x) / du, dz = du < 0.01 ? 0 : (p.pos.z - this.U.z) / du;
          this.put(p, this.U.x + dx * 2.1, this.U.z + dz * 2.1);
          moved = true;
        }
      }
      if (!moved) break;
    }
  }

  // The same clearing, remembered: seal() runs it again after the last tidy-up so the final cast still obeys it.
  keepArea(...a) { this.rules.push(() => this.clearArea(...a)); this.clearArea(...a); }
  keepLane(...a) { this.rules.push(() => this.clearLane(...a)); this.clearLane(...a); }
  keepSeg(...a) { this.rules.push(() => this.clearSeg(...a)); this.clearSeg(...a); }

  // build-up passes ending at `final`: the nearest unscripted mates, farthest first. They stay on the
  // passer's side of the viewer (within 45 degrees), so following the ball never means looking behind.
  chainTo(final, n) {
    const L = clamp(n, 1, 3);
    const hf = heading(this.U, final.pos);
    const cand = this.mates
      .filter((m) => m !== final && m.slot !== 'GK' && !this.scriptedSet.has(m) && dist2(m.pos, final.pos) > 4
        && dist2(m.pos, this.U) > 8 && angDiff(heading(this.U, m.pos), hf) < 45 * DEG)
      .sort((a, b) => dist2(a.pos, final.pos) - dist2(b.pos, final.pos));
    this.chain = [...cand.slice(0, L - 1).reverse(), final];
  }

  // ---- opposition choreography ------------------------------------------------------------------

  stalkUser(o, user, speed) {
    const s = this.stalk.get(o);
    if (!s) return;
    o.target.set(user.x + s.x, 0, user.z + s.z);
    o.maxSpeed = speed;
  }

  // The press. From the strike o follows a straight plan that brings him to dA metres from the viewer as the
  // ball arrives, nudging his speed for whatever his legs actually did (reaction time, acceleration, the
  // per-player top speed), and after the touch he keeps closing to `standoff` metres.
  closeIn(o, user, dA, standoff) {
    if (!this.finalStruck || (this.state !== 'incoming' && this.state !== 'decide')) return false;
    let p = this.plans.get(o);
    if (!p) {
      const d0 = Math.hypot(o.pos.x - user.x, o.pos.z - user.z);
      const T = Math.max(0.6, this.finalFlight || this.flightT / this.speed);
      p = { t0: this.t, d0, T, v: Math.max(0, d0 - dA) / T };
      this.plans.set(o, p);
      o.anticipate?.(T + 1.5); // no reaction delay: he is already moving
    }
    const dx = o.pos.x - user.x, dz = o.pos.z - user.z, d = Math.hypot(dx, dz) || 1;
    const sp = this.diff.presserSpeed * this.speed, vcap = sp * 1.15;
    const v = this.state === 'incoming'
      ? clamp(p.v + 2.2 * (d - (p.d0 - p.v * (this.t - p.t0))), 0, vcap)
      : clamp(Math.max(p.v, sp * 0.6), 0, vcap);
    o.target.set(user.x + (dx / d) * standoff, 0, user.z + (dz / d) * standoff);
    o.maxSpeed = Math.max(0.6, v / (o.speedMul || 1));
    return true;
  }

  // how far a presser can really close in the flight (metres), for planning where he starts
  reach() { return Math.min(0.62 * this.diff.presserSpeed * this.speed * 1.15 * (this.flightT / this.speed), 7); }

  // Everyone holds their spot with a little sway; script() then moves the scripted ones.
  moveActors(dt, user) {
    const w = this.world, ball = w.ball, st = this.state, t = this.t;
    for (const p of this.home) {
      if (p === this.userBody) continue;
      const b = this.base.get(p) || p.pos;
      p.target.set(b.x + Math.sin(t * 0.6 + p.wobble) * 0.7, 0, b.z + Math.cos(t * 0.5 + p.wobble) * 0.7);
      p.maxSpeed = 3;
    }
    for (const o of this.away) {
      const b = this.base.get(o) || o.pos;
      o.target.set(b.x + Math.sin(t * 0.55 + o.wobble) * 0.7, 0, b.z + Math.cos(t * 0.45 + o.wobble) * 0.7);
      o.maxSpeed = 3;
    }
    if (this.receiver && ball.flight && st === 'buildup') { this.receiver.target.copy(ball.flight.to); this.receiver.maxSpeed = 5; }
    this.script(dt, user);
    if (st === 'outcome' && this.outcomeTarget && this.outcomeTarget !== this.userBody) {
      this.outcomeTarget.target.copy(ball.flight ? ball.flight.to : ball.pos);
      this.outcomeTarget.maxSpeed = 7;
    }
    this.reactions();
    for (const p of this.home) if (p !== this.userBody) p.step(dt, ball.pos);
    for (const o of this.away) o.step(dt, ball.pos);
  }

  script() {}

  // ---- time -------------------------------------------------------------------------------------

  update(dt) {
    while (dt > 1e-9) {
      const s = Math.min(dt, 0.05);
      dt -= s;
      if (this.state === 'done' || this.state === 'setup' || this.state === 'quiz') { super.update(s); continue; }
      this.rawT += s;
      this.pre(s);
      super.update(s * this.slow);
      this.post(s);
    }
  }

  // runs on real time before the world moves. "Saw it" is Rep's own look: inside the 20 degree gaze cone, held
  // 0.12 s (gaps under 0.35 s forgiven). The frame a snap turn swung the view looks at nobody (Rep clears
  // world.snapTurned in trackScan, which runs after this, so it is still set here).
  pre(s) {
    const st = this.state;
    if (st !== 'buildup' && st !== 'incoming') return;
    const w = this.world;
    if (w.snapTurned) return;
    const keys = Object.keys(this.watch);
    if (!keys.length) return;
    if (!this._wacc || this._wacc.length !== keys.length * 2) {
      this._wacc = new Float32Array(keys.length * 2);
      this._wseen = keys.map(() => -99);
    }
    const user = w.userPos(this._u), yaw = w.headYaw();
    for (let i = 0; i < keys.length; i++) {
      const e = this.watch[keys[i]];
      if (e.when && !e.when()) continue;
      this.gaze(this._wacc, i, this._wseen, yaw, e.p.pos, user.x, user.z, s || 0);
      if (this._wseen[i] > -90) { this.saw[keys[i]] = true; this.sawAt[keys[i]] = this._wseen[i]; }
    }
  }

  // runs after the world moved
  post() {}

  // Rep's dynamic window (a close presser tackles quickly), but a scenario that needs a protocol time keeps it
  decisionWindow(presserDist, aware) {
    return Math.max(super.decisionWindow(presserDist, aware), (this.constructor.minWindow ?? 1) / this.speed);
  }

  // ---- the ball ---------------------------------------------------------------------------------

  // the build-up follows `chain`: Rep still does the kick (and its bookkeeping), we only choose who gets it
  nextPass(user) {
    const next = this.chain[this.chain.indexOf(this.carrier) + 1];
    if (!next) {
      this.passesLeft = Math.min(this.passesLeft, 1);
      super.nextPass(user);
      return;
    }
    const keep = this.mates;
    this.mates = [next];
    if (this.passesLeft < 2) this.passesLeft = 2;
    try { super.nextPass(user); } finally { this.mates = keep; }
  }

  // the last pass flies for exactly flightT seconds (scaled by the game speed)
  finalBall(from, user) {
    const ball = this.world.ball, own = Object.prototype.hasOwnProperty.call(ball, 'kick'), orig = ball.kick;
    const T = this.flightT / this.gameSpeed;
    ball.kick = (a, b, speed, loft) => orig.call(ball, a, b, Math.max(1.5, Math.hypot(b.x - a.x, b.z - a.z) / T), loft);
    try { super.finalBall(from, user); } finally { if (own) ball.kick = orig; else delete ball.kick; }
    this.strikeAt = this.t;
    this.onFinal?.(from, user);
  }

  onArrive() {
    if (this.state === 'incoming') { this.arriveAt = this.t; this.atArrival(); }
    super.onArrive();
  }

  atArrival() {}

  execute(choice, oneTouch) {
    this._ot = !!oneTouch;
    this.touchDelay = oneTouch ? 0 : (this.decideT || 0);
    this.slow = 1;
    super.execute(choice, oneTouch);
  }

  lose(p) {
    this.slow = 1;
    super.lose(p);
  }

  // ---- scoring ----------------------------------------------------------------------------------

  // The right pass for what is on the pitch right now: { target, one } or null.
  answer() { return null; }
  // passes that look right but are not (tests, hints)
  wrongs() { return []; }
  // extra value (+/-) for one evaluated option; subclasses override
  valueOf(o) {
    const a = this.answer();
    if (!a) return 0;
    if (o.kind !== 'pass') return -0.3;
    return o.target === a.target ? BONUS : -0.15;
  }

  // Idempotent: S1's Rep may call this while evaluating, evaluate() below calls it when Rep did not.
  scenarioValue(o) {
    if (o.scen !== undefined) return 0;
    const d = this.valueOf(o) || 0;
    o.scen = d;
    return d;
  }

  evaluate(from) {
    const options = super.evaluate(from);
    let touched = false;
    for (const o of options) {
      if (o.scen !== undefined) continue;
      const d = this.scenarioValue(o);
      if (d) { o.value += d; touched = true; }
    }
    // the right pass always ranks first, however the lanes have closed since
    const a = this.answer();
    const top = a && a.target ? options.find((o) => o.kind === 'pass' && o.target === a.target) : null;
    if (top) {
      let other = 0;
      for (const o of options) if (o !== top && o.value > other) other = o.value;
      if (top.value < other + 0.04) { top.value = other + 0.04; touched = true; }
    }
    if (touched) options.sort((x, y) => y.value - x.value);
    return options;
  }

  // Adds the scenario's own fields to the result: scenario, scenarioScore, fact, expected, expectedNumber,
  // correct (always a boolean), oneTouchBack (the viewer played the scenario's one-touch answer first time)
  // and reason (the card's one short fact: the scenario's own, not Rep's generic "lane open").
  scenarioResult(r) {
    const a = this.answer(), ch = this.chosen?.target;
    const generic = r.reason;
    r.scenario = this.drillKey;
    r.scenarioScore = 0;
    r.fact = '';
    r.correct = false;
    r.expectedNumber = a?.target?.number ?? null;
    r.oneTouchBack = !!(a?.one && ch && ch === a.target && (this.oneTouch ?? this._ot));
    this.describe(r);
    r.correct = !!r.correct;
    r.oneTouchBack = !!r.oneTouchBack;
    r.scenarioScore = Math.round(clamp(r.scenarioScore, 0, 100));
    if (r.reason === generic) r.reason = [r.fact, r.expected].filter(Boolean).join(' · ') || generic;
  }

  describe() {}

  finish() {
    super.finish();
    if (this.result && this.result.scenario === undefined) this.scenarioResult(this.result);
    this.cleanup();
  }

  cleanup() {}
}

// ---------------------------------------------------------------------------------------------
// D1 Blind-side press. A centre back plays it into you, a presser closes from behind. Under
// 3.5 m at arrival: one touch to the free man. Otherwise: half-turn and play forward.
// ---------------------------------------------------------------------------------------------
export class PressScenario extends Scenario {
  static key = 'press';
  static roles = ['CM', 'CDM'];
  static flight = 1.3;
  static quizOK = true;

  build() {
    const d = this.diff, cdm = this.roleKey === 'CDM';
    const ux = (cdm ? -19 : -9) + rand(-2, 2), uz = rand(-7, 7);
    const cbx = Math.max(-42, ux - rand(18, 21)), cbz = clamp(uz * 0.4 + rand(-6, 6), -14, 14);
    this.userAt(ux, uz, cbx, cbz);
    const U = this.U, h = heading(U, { x: cbx, z: cbz }), rsn = sign();
    const cb = this.pickMate(cbz >= 0 ? ['RCB', 'LCB'] : ['LCB', 'RCB']);
    this.put(cb, cbx, cbz);
    const fp = polar(U, h, rsn * 115, rand(9, 11));
    const freeMan = this.pickMate(fp.z > uz ? ['RB', 'RDM', 'RCM', 'RW'] : ['LB', 'LDM', 'LCM', 'LW']);
    this.put(freeMan, fp.x, fp.z);
    const f2 = polar(U, h, rsn * 168, rand(15, 19));
    const fwd = this.pickMate(f2.z > uz ? ['RW', 'ST', 'CAM'] : ['LW', 'ST', 'CAM']);
    this.put(fwd, f2.x, f2.z);

    // the presser starts in the blind spot and closes so that he is near or far at arrival
    const close = Math.random() < 0.5, dA = close ? rand(1.2, 2.8) : rand(4.4, 6.0);
    const D0 = dA + this.reach() * (close ? rand(0.55, 1.0) : rand(0.15, 0.4));
    this.dA = dA;
    const pp = polar(U, h, -rsn * 150, D0);
    const pr = this.pickOpp(['ST1', 'ST2', 'LCM', 'RCM']);
    this.put(pr, pp.x, pp.z);
    this.pinned.add(pr);
    this.stalk.set(pr, new THREE.Vector3(pp.x - ux, 0, pp.z - uz));

    this.fillRest(ux, uz * 0.5);
    this.keepArea(ux, uz, 9.5);
    this.keepArea(fp.x, fp.z, 6.5);
    this.keepArea(f2.x, f2.z, 5);
    this.keepLane(U, fp, 1.7);
    this.keepLane(U, f2, 1.5);
    this.keepLane(U, { x: cbx, z: cbz }, 1.7);
    this.chainTo(cb, Math.round(rand(d.passes[0], d.passes[1])));

    this.freeMan = freeMan; this.fwdMan = fwd; this.passer = cb; this.presser = pr;
    this.free = freeMan; this.pressers = [pr];
    this.watch = { presser: { p: pr }, free: { p: freeMan } };
  }

  script(dt, user) {
    if (!this.closeIn(this.presser, user, this.dA, 1.0)) this.stalkUser(this.presser, user, 4);
  }

  atArrival() { this.presserDist = dist2(this.presser.pos, this.world.userPos(this._u)); }

  answer() {
    const dd = this.presserDist ?? dist2(this.presser.pos, this.world.userPos(this._u));
    return dd < 3.5 ? { target: this.freeMan, one: true } : { target: this.fwdMan, one: false };
  }

  wrongs() { return [this.answer().target === this.freeMan ? this.fwdMan : this.freeMan]; }

  valueOf(o) {
    const a = this.answer();
    if (o.kind !== 'pass') return -0.3;
    if (o.target === a.target) return BONUS;
    if (o.target === this.fwdMan) return -0.3; // turned into the press
    return o.target === this.freeMan ? -0.1 : -0.2;
  }

  describe(r) {
    const ch = this.chosen?.target, a = this.answer(), seen = !!this.saw.presser;
    r.correct = !!ch && ch === a.target;
    r.sawPresserBehind = seen;
    r.fact = `PRESSER ${f1(this.presserDist ?? 0)} M`;
    r.expected = a.one ? 'ONE TOUCH' : 'HALF-TURN';
    r.reason = `PRESSER ${f1(this.presserDist ?? 0)} M · ${r.expected}`;
    r.scenarioScore = r.correct ? (seen ? 100 : 65) : (seen ? 30 : 0);
  }
}

// ---------------------------------------------------------------------------------------------
// D2 Weak-side switch. Three opponents on your flank, the far winger a long way off. Switch when
// the lane margin is 1.5 m or more, else recycle to the midfielder.
// ---------------------------------------------------------------------------------------------
export class SwitchScenario extends Scenario {
  static key = 'switch';
  static roles = ['FB', 'W'];
  static flight = 1.6;
  static quizOK = true;

  build() {
    const d = this.diff, fb = this.roleKey === 'FB';
    const slot = this.userBody.slot || '';
    const side = /^L/.test(slot) ? -1 : /^R/.test(slot) ? 1 : sign();
    const ux = (fb ? -22 : 10) + rand(-3, 3), uz = side * rand(16, 19);
    const cz = -side * rand(0, 8), D = rand(24, 27), dzu = Math.abs(uz - cz);
    const cx = ux - Math.sqrt(Math.max(9, D * D - dzu * dzu));
    this.userAt(ux, uz, cx, cz);
    const U = this.U;
    const carrier = this.pickMate(fb ? (cz >= 0 ? ['RCB', 'LCB', 'CDM'] : ['LCB', 'RCB', 'CDM']) : ['CDM', 'LCM', 'RCM', 'LDM', 'RDM']);
    this.put(carrier, cx, cz);
    const wx = ux + rand(0, 8), wz = -side * rand(15, 18);
    const winger = this.pickMate(side > 0 ? ['LW'] : ['RW']);
    this.put(winger, wx, wz);
    const rc = this.pickMate(['CDM', 'LCM', 'RCM', 'LDM', 'RDM']);
    const rcp = { x: ux - rand(4, 8), z: uz - side * rand(10, 13) };
    this.put(rc, rcp.x, rcp.z);

    // three on the ball side; the one outside and behind is the presser
    const o1 = this.pickOpp(['RM', 'LM', 'RCM', 'LCM']);
    this.put(o1, ux - rand(2, 4), uz - side * rand(3, 5));
    const o2 = this.pickOpp(['LCM', 'RCM', 'ST1', 'ST2']);
    this.put(o2, ux + rand(3, 5), uz - side * rand(1, 3));
    const pr = this.pickOpp(['LM', 'RM', 'ST2', 'ST1']);
    const pp = { x: ux + rand(2, 4), z: uz + side * rand(2, 3) };
    this.put(pr, pp.x, pp.z);
    this.pinned.add(pr);
    this.stalk.set(pr, new THREE.Vector3(pp.x - ux, 0, pp.z - uz));

    this.fillRest(ux, uz * 0.4);

    // the far flank: empty (switch is on) or one man tucked in (recycle)
    this.switchPlanned = Math.random() < 0.55;
    const wd = { x: wx, z: wz };
    const far = this.away.filter((o) => o.slot !== 'GK' && !this.pinned.has(o) && o !== o1 && o !== o2)
      .sort((a, b) => dist2(a.pos, wd) - dist2(b.pos, wd));
    if (this.switchPlanned) {
      // a lofted ball is only playable near where it lands: nobody within 11.5 m of the last fifth of it
      const p80 = { x: ux + (wx - ux) * 0.8, z: uz + (wz - uz) * 0.8 };
      this.keepSeg(p80, wd, 11.5, [o1, o2]);
      this.keepArea(wx, wz, 12, [o1, o2]);
    } else {
      const guard = far[0];
      const gp = polar(wd, heading(wd, U), rand(-30, 30), rand(5, 7.5));
      this.put(guard, gp.x, gp.z);
      this.pinned.add(guard);
    }
    this.keepLane(U, rcp, 1.7);
    this.chainTo(carrier, Math.round(rand(d.passes[0], d.passes[1])));

    this.winger = winger; this.recycler = rc; this.presser = pr;
    this.free = winger; this.pressers = [pr];
    this.watch = { far: { p: winger }, press: { p: pr } };
  }

  script(dt, user) {
    if (!this.closeIn(this.presser, user, 3.4, 1.5)) this.stalkUser(this.presser, user, 4);
  }

  // lofted lane margin of the switch from where the ball is (or will be)
  switchMargin() {
    const w = this.world;
    const from = this.state === 'decide' || this.state === 'outcome' ? w.ball.pos : w.userPos(this._u);
    let m = Infinity;
    for (const o of this.away) m = Math.min(m, laneMargin(from, this.winger.pos, o.pos, 21, true));
    return m;
  }

  atArrival() {
    this.arriveMargin = this.switchMargin();
    this.arriveDist = dist2(this.world.userPos(this._u), this.winger.pos);
  }

  answer() {
    const m = this.arriveMargin ?? this.switchMargin();
    return m >= 1.5 ? { target: this.winger, one: false, margin: m } : { target: this.recycler, one: false, margin: m };
  }

  wrongs() { return [this.answer().target === this.winger ? this.recycler : this.winger]; }

  valueOf(o) {
    const a = this.answer();
    if (o.kind !== 'pass') return -0.3;
    if (o.target === a.target) return BONUS + (o.target === this.winger ? 0.1 : 0);
    if (o.target === this.winger) return -0.45; // a long ball into a shut lane
    return o.target === this.recycler ? -0.1 : -0.2;
  }

  describe(r) {
    const ch = this.chosen?.target, a = this.answer();
    const m = this.arriveMargin ?? a.margin;
    r.correct = !!ch && ch === a.target;
    r.laneMargin = m;
    r.switchDist = this.arriveDist ?? dist2(this.U, this.winger.pos);
    r.sawFar = !!this.saw.far;
    r.fact = `LANE ${f1(Math.max(-9.9, m))} M ${m >= 1.5 ? 'OPEN' : 'TIGHT'}`;
    r.expected = a.target === this.winger ? 'SWITCH' : 'RECYCLE';
    r.reason = `${r.fact} · ${r.expected}`;
    r.scenarioScore = r.correct ? (r.sawFar ? 100 : 70) : (r.sawFar ? 30 : 0);
  }
}

// ---------------------------------------------------------------------------------------------
// D3 Third-man wall. The centre back plays into you with a marker on your back. A midfielder starts
// his run while the ball is in the air. One touch into his path, not to his feet.
// ---------------------------------------------------------------------------------------------
export class ThirdManScenario extends Scenario {
  static key = 'thirdman';
  static roles = ['CAM', 'ST'];
  static flight = 1.3;
  static quizOK = false;

  build() {
    const d = this.diff, cam = this.roleKey === 'CAM';
    const ux = (cam ? 3 : 12) + rand(-2, 2), uz = rand(-6, 6);
    const cbx = ux - rand(19, 22), cbz = clamp(uz * 0.5 + rand(-7, 7), -12, 12);
    this.userAt(ux, uz, cbx, cbz);
    const U = this.U, h = heading(U, { x: cbx, z: cbz }), rsn = sign();
    const cb = this.pickMate(cbz >= 0 ? ['RCB', 'LCB'] : ['LCB', 'RCB']);
    this.put(cb, cbx, cbz);

    const mk = this.pickOpp(['LCM', 'RCM', 'ST1', 'ST2']);
    const mp = polar(U, h, -rsn * 150, 1.8); // on his back, on the side away from the run
    this.put(mk, mp.x, mp.z);
    this.pinned.add(mk);
    this.stalk.set(mk, new THREE.Vector3(mp.x - ux, 0, mp.z - uz));

    const start = polar(U, h, rsn * 60, rand(9, 11));
    const end = polar(U, h, rsn * 150, rand(16, 19));
    const runner = this.pickMate(start.z > uz ? ['RCM', 'RDM', 'LCM', 'LDM'] : ['LCM', 'LDM', 'RCM', 'RDM']);
    this.put(runner, start.x, start.z);
    // the direct lane from the centre back to the runner is shut by a midfielder dropping in
    const bl = this.pickOpp(['RCM', 'LCM', 'RM', 'LM']);
    this.put(bl, cbx + (start.x - cbx) * 0.55, cbz + (start.z - cbz) * 0.55);
    this.pinned.add(bl);

    this.fillRest(ux, uz * 0.5);
    this.keepArea(ux, uz, 8, [mk]);
    this.keepSeg(start, end, 6.4);
    const rmid = { x: (start.x + end.x) / 2, z: (start.z + end.z) / 2 };
    this.rules.push(() => { this.clearMatesSeg(start, end, 4.5); this.clearMatesSeg(U, rmid, 3.2); });
    this.clearMatesSeg(start, end, 4.5);
    this.clearMatesSeg(U, rmid, 3.2);
    const mid = { x: (start.x + end.x) / 2, z: (start.z + end.z) / 2 };
    this.keepLane(U, mid, 1.6);
    this.chainTo(cb, Math.round(rand(d.passes[0], d.passes[1])));

    this.passer = cb; this.runner = runner; this.marker = mk; this.blocker = bl;
    this.S = start; this.E = end;
    const len = dist2(start, end) || 1;
    this.runDir = { x: (end.x - start.x) / len, z: (end.z - start.z) / len };
    this.runV = 6.5 * this.speed;
    this.runStarted = false;
    this.free = runner; this.pressers = [mk];
    this.watch = { runner: { p: runner, when: () => this.runStarted } };
  }

  script(dt, user) {
    const r = this.runner;
    if (!this.runStarted && this.state === 'incoming' && this.t - this.strikeAt >= 0.25) {
      this.runStarted = true;
      this.events.push({ t: this.t, type: 'run' });
    }
    if (this.runStarted && !(this.state === 'outcome' && this.outcomeTarget === r)) {
      r.target.set(this.E.x, 0, this.E.z);
      r.maxSpeed = this.runV;
    }
    if (!this.closeIn(this.marker, user, 1.8, 1.8)) this.stalkUser(this.marker, user, 4);
  }

  // where the runner is tau seconds from now
  runnerAt(tau, out) {
    const r = this.runner, rem = dist2(r.pos, this.E), k = Math.min(rem, this.runV * tau);
    out.x = r.pos.x + this.runDir.x * k;
    out.z = r.pos.z + this.runDir.z * k;
    return out;
  }

  // Aiming ahead of the runner counts: the ray's point on the grass, if it is near his path, becomes the lead.
  aim(origin, dir) {
    super.aim(origin, dir);
    if (this._leadLine) { this._leadLine = false; this.world.setLine?.(this.world.choiceLine, null, null); }
    if (!this.runStarted || (this.state !== 'incoming' && this.state !== 'decide')) return;
    if (dir.y > -0.02) return;
    const k = (0.5 - origin.y) / dir.y;
    if (k <= 0 || k > 70) return;
    const px = origin.x + dir.x * k, pz = origin.z + dir.z * k;
    const r = this.runner, ax = r.pos.x, az = r.pos.z, bx = this.E.x, bz = this.E.z;
    const dx = bx - ax, dz = bz - az, len2 = dx * dx + dz * dz || 1;
    const t = clamp(((px - ax) * dx + (pz - az) * dz) / len2, 0, 1);
    const qx = ax + dx * t, qz = az + dz * t;
    if (Math.hypot(px - qx, pz - qz) > 2.8 || t * Math.sqrt(len2) < 0.8) return;
    // a mate standing in front of that point on the ray still wins
    if (this.aimed && this.aimed.target !== r) {
      const m = this.aimed.target.pos;
      if (Math.hypot(m.x - origin.x, m.z - origin.z) < Math.hypot(px - origin.x, pz - origin.z) - 1) return;
    }
    this.aimed = { kind: 'pass', target: r, lead: { x: qx, z: qz } };
    this.world.setLine?.(this.world.choiceLine, this.world.userPos(this._u), { x: qx, z: qz }); // shows where the ball will go
    this._leadLine = true;
  }

  execute(choice, oneTouch) {
    super.execute(choice, oneTouch);
    this.leadErr = null;
    if (choice.kind !== 'pass' || choice.target !== this.runner) return;
    const ball = this.world.ball, r = this.runner, vis = 17 * this.speed;
    const from = ball.flight ? ball.flight.from.clone() : ball.pos.clone();
    // to his feet unless he was led
    const L = choice.lead
      ? new THREE.Vector3(choice.lead.x, 0, choice.lead.z)
      : new THREE.Vector3(r.pos.x + this.runDir.x * 0.6, 0, r.pos.z + this.runDir.z * 0.6);
    const T = dist2(from, L) / vis, at = this.runnerAt(T, {});
    const err = dist2(L, at);
    this.leadErr = err;
    // the lane to where the ball is going, not to where he stands now
    let wm = Infinity, worst = null;
    for (const o of this.away) {
      const m = laneMargin(from, L, o.pos, 17, false) + rand(-0.15, 0.15);
      if (m < wm) { wm = m; worst = o; }
    }
    if (wm < 0 && worst) {
      const dx = L.x - from.x, dz = L.z - from.z, len2 = dx * dx + dz * dz || 1;
      const k = clamp(((worst.pos.x - from.x) * dx + (worst.pos.z - from.z) * dz) / len2, 0.08, 1);
      ball.kick(from, new THREE.Vector3(from.x + dx * k, 0, from.z + dz * k), vis, 0);
      this.outcome = 'intercepted';
      this.outcomeTarget = worst;
      return;
    }
    ball.kick(from, L, vis, 0);
    if (err > 4.5) {
      this.outcome = 'intercepted'; // overhit or underhit: whoever is nearest collects it
      this.outcomeTarget = this.away.filter((o) => o.slot !== 'GK').sort((a, b) => dist2(a.pos, L) - dist2(b.pos, L))[0];
    } else {
      this.outcome = err <= 2 && this.outcome !== 'tight' ? 'completed' : 'tight';
      this.outcomeTarget = r;
    }
  }

  answer() { return { target: this.runner, one: true }; }
  wrongs() { return [this.passer]; }

  valueOf(o) {
    if (o.kind !== 'pass') return -0.3;
    return o.target === this.runner ? BONUS : -0.2;
  }

  describe(r) {
    const ch = this.chosen?.target, toRunner = ch === this.runner;
    const seen = !!this.saw.runner, quick = (this.oneTouch ?? this._ot) || (this.touchDelay ?? 9) <= 0.6;
    const lead = this.leadErr;
    r.runnerSeen = seen;
    r.quick = !!quick;
    r.leadErr = lead;
    r.correct = toRunner && lead != null && lead <= 2.0 && !!quick;
    r.fact = !toRunner ? 'RUNNER MISSED' : lead == null ? 'PASS LOST' : lead <= 2 ? `INTO THE RUN ${f1(lead)} M` : `OFF THE RUN ${f1(lead)} M`;
    r.expected = 'ONE TOUCH INTO THE RUN';
    r.reason = 'MARKER ON YOUR BACK · ONE TOUCH INTO THE RUN';
    r.scenarioScore = (seen ? 30 : 0) + (quick && toRunner ? 30 : 0) + (toRunner && lead != null ? Math.round(40 * clamp(1 - lead / 4.5, 0, 1)) : 0);
  }
}

// ---------------------------------------------------------------------------------------------
// D4 Hand-signal trap. A covered teammate waves for it, a quiet one is free. Ignore the wave.
// ---------------------------------------------------------------------------------------------
export class SignalScenario extends Scenario {
  static key = 'signal';
  static roles = ['CM', 'CAM', 'W', 'ST', 'CDM'];
  static flight = 1.2;
  static quizOK = true;

  build() {
    const d = this.diff;
    const ux = ({ CM: -9, CDM: -19, CAM: 2, W: 10, ST: 13 }[this.roleKey] ?? -9) + rand(-2, 2), uz = rand(-6, 6);
    const cbx = ux - rand(18, 21), cbz = clamp(uz * 0.5 + rand(-7, 7), -13, 13);
    this.userAt(ux, uz, cbx, cbz);
    const U = this.U, h = heading(U, { x: cbx, z: cbz }), rsn = sign();
    const cb = this.pickMate(cbz >= 0 ? ['RCB', 'LCB'] : ['LCB', 'RCB']);
    this.put(cb, cbx, cbz);

    const wp = polar(U, h, rsn * 38, rand(10, 13));
    const waver = this.pickMate(wp.z > uz ? ['RW', 'RCM', 'RDM', 'RB'] : ['LW', 'LCM', 'LDM', 'LB']);
    this.put(waver, wp.x, wp.z);
    const ma = rand(0, Math.PI * 2);
    const wm = this.pickOpp(['LCM', 'RCM', 'LB', 'RB']);
    this.put(wm, wp.x + Math.sin(ma) * 1.4, wp.z + Math.cos(ma) * 1.4);
    this.pinned.add(wm);
    this.marks = [[wm, waver, new THREE.Vector3(Math.sin(ma) * 1.4, 0, Math.cos(ma) * 1.4)]];

    const qp = polar(U, h, -rsn * 118, rand(9, 12));
    const quiet = this.pickMate(qp.z > uz ? ['RB', 'RDM', 'RCM', 'RW'] : ['LB', 'LDM', 'LCM', 'LW']);
    this.put(quiet, qp.x, qp.z);

    const cp = polar(U, h, rsn * 150, rand(12, 15));
    const covered = this.pickMate(cp.z > uz ? ['RDM', 'RCM', 'RW', 'ST'] : ['LDM', 'LCM', 'LW', 'ST']);
    this.put(covered, cp.x, cp.z);
    const cm = this.pickOpp(['RCM', 'LCM', 'LM', 'RM']);
    this.put(cm, cp.x + 1.3, cp.z - 1.3);
    this.pinned.add(cm);
    this.marks.push([cm, covered, new THREE.Vector3(1.3, 0, -1.3)]);

    const pr = this.pickOpp(['ST1', 'ST2', 'LM', 'RM']);
    const pp = polar(U, h, 180 + rand(-20, 20), 3.5 + this.reach() * rand(0.5, 0.8));
    this.put(pr, pp.x, pp.z);
    this.pinned.add(pr);
    this.stalk.set(pr, new THREE.Vector3(pp.x - ux, 0, pp.z - uz));

    this.fillRest(ux, uz * 0.5);
    this.keepArea(ux, uz, 8.5, []);
    this.keepArea(qp.x, qp.z, 9);
    this.keepLane(U, qp, 2);
    this.chainTo(cb, Math.round(rand(d.passes[0], d.passes[1])));

    this.waver = waver; this.quiet = quiet; this.covered = covered; this.passer = cb; this.presser = pr;
    this.free = quiet; this.pressers = [pr];
    this.watch = { quiet: { p: quiet }, press: { p: pr } };
  }

  script(dt, user) {
    // the markers stay glued to their men
    for (const [o, p, off] of this.marks) {
      if (this.state === 'outcome' && this.outcomeTarget === o) continue;
      o.target.set(p.pos.x + off.x, 0, p.pos.z + off.z);
      o.maxSpeed = 5;
    }
    if (!this.closeIn(this.presser, user, 3.5, 2.2)) this.stalkUser(this.presser, user, 4);
  }

  // the wave: the right arm goes up and shakes (after the players' own animation has run)
  post() {
    const arm = this.waver?.arms?.[1];
    if (!arm || this.state === 'outcome' || this.state === 'done') return;
    arm.rotation.x = -2.85 + Math.sin(this.rawT * 7) * 0.12;
    arm.rotation.z = 0.55 + Math.sin(this.rawT * 9) * 0.4;
  }

  answer() { return { target: this.quiet, one: true }; }
  wrongs() { return [this.waver]; }

  valueOf(o) {
    if (o.kind !== 'pass') return -0.3;
    if (o.target === this.waver) return -o.value; // the waver is worth nothing
    return o.target === this.quiet ? BONUS : -0.1;
  }

  describe(r) {
    const ch = this.chosen?.target, followed = ch === this.waver;
    r.followedWave = followed;
    r.sawQuiet = !!this.saw.quiet;
    r.correct = !!ch && ch === this.quiet || (!followed && (r.decision ?? 0) >= 70);
    r.fact = followed ? 'FOLLOWED THE WAVE' : 'WAVE IGNORED';
    r.expected = 'IGNORE THE WAVE';
    r.reason = `#${this.waver.number} WAVING, COVERED · #${this.quiet.number} FREE`;
    r.scenarioScore = followed ? 0 : r.correct ? (r.sawQuiet ? 100 : 70) : 40;
  }
}

// ---------------------------------------------------------------------------------------------
// D5 Colour call. Three teammates wear a ring colour; a colour is flashed on the ball while it is
// in the air. First-time pass to that colour within a second of the ball arriving.
// ---------------------------------------------------------------------------------------------
export class ColourScenario extends Scenario {
  static key = 'colour';
  static roles = ['CM', 'CDM', 'CAM', 'W', 'ST'];
  static flight = 1.5;
  static quizOK = false;
  static window = 0.8; // about 1.5 s on the ball at MEDIUM: the pass is due within 1.0 s
  static minWindow = 1.5;

  build() {
    const d = this.diff;
    const ux = ({ CM: -9, CDM: -19, CAM: 2, W: 10, ST: 13 }[this.roleKey] ?? -9) + rand(-2, 2), uz = rand(-6, 6);
    const cbx = ux - rand(19, 22), cbz = clamp(uz * 0.5 + rand(-7, 7), -13, 13);
    this.userAt(ux, uz, cbx, cbz);
    const U = this.U, h = heading(U, { x: cbx, z: cbz }), rsn = sign();
    const cb = this.pickMate(cbz >= 0 ? ['RCB', 'LCB'] : ['LCB', 'RCB']);
    this.put(cb, cbx, cbz);

    // one in front of you, one to the side, one behind: you cannot read all three without turning
    const spots = [polar(U, h, rsn * 40, rand(10, 13)), polar(U, h, -rsn * 115, rand(9, 12)), polar(U, h, rsn * 140, rand(12, 15))];
    const pool = this.mates.filter((m) => m !== cb && m.slot !== 'GK');
    const mates = spots.map((s) => {
      const p = pool.filter((m) => !this.placed.has(m)).sort((a, b) => dist2(a.pos, s) - dist2(b.pos, s))[0];
      this.put(p, s.x, s.z);
      return p;
    });
    const pr = this.pickOpp(['ST1', 'ST2', 'LM', 'RM']);
    const pp = polar(U, h, 180 + rand(-8, 8), 4 + this.reach() * rand(0.5, 0.8));
    this.put(pr, pp.x, pp.z);
    this.pinned.add(pr);
    this.stalk.set(pr, new THREE.Vector3(pp.x - ux, 0, pp.z - uz));

    this.fillRest(ux, uz * 0.5);
    this.keepArea(ux, uz, 8.5);
    for (let pass = 0; pass < 2; pass++) spots.forEach((s) => { this.keepArea(s.x, s.z, 6.5); this.keepLane(U, s, 2.2); });
    this.chainTo(cb, Math.round(rand(d.passes[0], d.passes[1])));

    const cols = [...PALETTE].sort(() => Math.random() - 0.5).slice(0, 3);
    this.cmap = new Map(mates.map((p, i) => [p, cols[i]]));
    this.calledIdx = (Math.random() * 3) | 0;
    this.calledPlayer = mates[this.calledIdx];
    this.called = false;
    this.callLeft = 0;
    this.callAfter = 0.3 * this.flightT / this.gameSpeed;
    this.passer = cb; this.presser = pr; this.coloured = mates;
    this.pressers = [pr];
    this.watch = { a: { p: mates[0] }, b: { p: mates[1] }, c: { p: mates[2] } };
  }

  afterSeal() { this.paintRings(); }

  paintRings(aimedOn) {
    for (const [p, c] of this.cmap) p.highlight(c.hex, aimedOn === p ? 1 : 0.85);
  }

  script(dt, user) {
    if (!this.closeIn(this.presser, user, 4, 2.6)) this.stalkUser(this.presser, user, 4);
  }

  pre(s) {
    super.pre(s);
    if (this.state === 'incoming' && !this.called && this.t - this.strikeAt >= this.callAfter) this.fireCall();
    if (this.callLeft > 0) {
      this.callLeft -= s;
      if (this.callLeft <= 0) this.hideHalo();
    }
  }

  post() {
    const h = this.world.callHalo;
    if (h && h.visible) h.position.set(this.world.ball.pos.x, this.world.ball.pos.y + 0.3, this.world.ball.pos.z);
    if (this.state === 'buildup' || this.state === 'incoming') this.paintRings();
  }

  fireCall() {
    this.called = true;
    this.callT = this.t;
    this.callLeft = 0.4;
    this.events.push({ t: this.t, type: 'call' });
    const c = this.cmap.get(this.calledPlayer);
    const sc = this.world.scene;
    if (sc) {
      let h = this.world.callHalo;
      if (!h) {
        h = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.6, depthWrite: false }));
        h.renderOrder = 8;
        sc.add(h);
        this.world.callHalo = h;
      }
      h.material.color.setHex(c.hex);
      h.position.set(this.world.ball.pos.x, this.world.ball.pos.y + 0.3, this.world.ball.pos.z);
      h.visible = true;
    }
    this.fx.flash?.(c.hex, 0.4);
    if (this.fx.alert) this.fx.alert(); else this.fx.ui?.();
  }

  hideHalo() { if (this.world.callHalo) this.world.callHalo.visible = false; }
  cleanup() { this.hideHalo(); }

  updateAimGlow() {
    super.updateAimGlow();
    this.paintRings(this.aimed?.kind === 'pass' ? this.aimed.target : null);
  }

  answer() { return { target: this.calledPlayer, one: true }; }
  wrongs() { return this.coloured.filter((p) => p !== this.calledPlayer); }

  valueOf(o) {
    if (o.kind !== 'pass') return -0.3;
    const late = !this._ot && (this.decideT || 0) > 1.0;
    if (o.target === this.calledPlayer) return late ? 0.25 : BONUS;
    return this.cmap.has(o.target) ? -0.25 : -0.2;
  }

  describe(r) {
    const ch = this.chosen?.target, c = this.cmap.get(this.calledPlayer);
    const rt = this.touchDelay ?? null;
    r.calledColour = c.name;
    r.pickedColour = this.cmap.get(ch)?.name ?? null;
    r.onTime = rt != null && rt <= 1.0;
    r.reaction = rt;
    r.correct = ch === this.calledPlayer;
    r.fact = r.correct ? `CALLED ${c.name}${rt != null ? ` ${rt.toFixed(1)} S` : ''}` : `CALLED ${c.name}, PLAYED ${r.pickedColour ?? 'OTHER'}`;
    r.expected = `FIRST TIME TO ${c.name}`;
    r.reason = `${c.name} CALLED · FIRST TIME`;
    r.scenarioScore = r.correct ? (r.onTime ? 100 : 60) : 0;
  }
}

// ---------------------------------------------------------------------------------------------
// Colour memory. The same three teammates as the colour call, but their colours only flash one at
// a time during the build-up (an opponent flashes one too), then go dark. While the ball is in
// flight a colour is called: pass first time to whoever wore it. The fakes: a colour nobody wore,
// the opponent's colour, or a grey call (no colour). Then nobody is on: play it back to the passer.
// ---------------------------------------------------------------------------------------------
export const NO_COLOUR = { name: 'NO COLOUR', hex: 0x8f9592, css: '#8f9592' };

export class MemoryScenario extends ColourScenario {
  static key = 'memory';
  static roles = ['CM', 'CDM', 'CAM', 'W', 'ST'];
  static flight = 1.5;
  static window = 0.9;
  static minWindow = 1.6;

  build() {
    super.build();
    const U = this.U, cols = new Set([...this.cmap.values()]);
    const spare = PALETTE.filter((c) => !cols.has(c)).sort(() => Math.random() - 0.5);
    // the decoy: the nearest free opponent off to the side or behind, never the presser
    const toPasser = heading(U, this.passer.pos);
    const decoy = this.away.filter((o) => o.slot !== 'GK' && o !== this.presser)
      .map((o) => ({ o, d: dist2(o.pos, U), a: angDiff(heading(U, o.pos), toPasser) }))
      .filter((x) => x.a > 60 * DEG && x.d < 26)
      .sort((x, y) => x.d - y.d)[0]?.o
      || this.away.find((o) => o.slot !== 'GK' && o !== this.presser);
    this.decoy = decoy;
    this.decoyColour = spare[0];
    this.unusedColour = spare[1];
    // what gets called: two reps in three a teammate's colour, the rest a fake
    const r = Math.random();
    this.callKind = r < 0.62 ? 'mate' : r < 0.8 ? 'decoy' : 'none';
    this.callColour = this.callKind === 'mate' ? this.cmap.get(this.calledPlayer)
      : this.callKind === 'decoy' ? this.decoyColour
      : Math.random() < 0.5 ? NO_COLOUR : this.unusedColour;
    if (this.callKind !== 'mate') this.calledPlayer = null;
    // one flash each, in a random order, spaced through the build-up
    const len = (0.25 + 0.3 * this.diff.window) / this.gameSpeed; // about 1 s easy, 0.6 s elite
    const order = [...this.coloured, decoy].sort(() => Math.random() - 0.5);
    let at = rand(0.45, 0.7) / this.gameSpeed;
    this.flashes = order.map((p) => {
      const f = { p, colour: p === decoy ? this.decoyColour : this.cmap.get(p), at, len, seen: false, acc: 0, gap: 0 };
      at += len + rand(0.35, 0.6) / this.gameSpeed;
      return f;
    });
    this.flashesDone = false;
    this.chainTo(this.passer, 3);
  }

  afterSeal() { this.paintRings(); }

  // rings only show while flashing
  paintRings() {
    const live = new Set();
    if (this.state === 'buildup' || this.state === 'incoming' || this.state === 'setup') {
      for (const f of this.flashes || []) {
        if (this.t >= f.at && this.t < f.at + f.len) { f.p.highlight(f.colour.hex, 0.95); live.add(f.p); }
      }
    }
    for (const p of [...this.coloured, this.decoy]) if (p && !live.has(p)) p.highlight(0xffffff, 0);
  }

  pre(s) {
    super.pre(s);
    if (this.state !== 'buildup' && this.state !== 'incoming') return;
    // "saw the flash": the gaze cone on him for 0.12 s while it was lit (a snap turn is no look)
    const w = this.world;
    if (w.snapTurned) return;
    const user = w.userPos(this._u), yaw = w.headYaw();
    for (const f of this.flashes) {
      if (f.seen || this.t < f.at || this.t >= f.at + f.len) continue;
      if (angDiff(yaw, heading(user, f.p.pos)) < 10 * DEG) {
        f.acc += s; f.gap = 0;
        if (f.acc >= 0.12) f.seen = true;
      } else if ((f.gap += s) > 0.35) f.acc = 0;
    }
    const last = this.flashes[this.flashes.length - 1];
    this.flashesDone = this.t >= last.at + last.len;
  }

  // the last pass waits until every flash has been shown
  nextPass(user) {
    const next = this.chain[this.chain.indexOf(this.carrier) + 1];
    if (!next && !this.flashesDone) { this.hold = 0.15; return; }
    super.nextPass(user);
  }

  fireCall() {
    this.called = true;
    this.callT = this.t;
    this.callLeft = 0.45;
    this.events.push({ t: this.t, type: 'call' });
    const c = this.callColour, sc = this.world.scene;
    if (sc) {
      let h = this.world.callHalo;
      if (!h) {
        h = new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.6, depthWrite: false }));
        h.renderOrder = 8;
        sc.add(h);
        this.world.callHalo = h;
      }
      h.material.color.setHex(c.hex);
      h.position.set(this.world.ball.pos.x, this.world.ball.pos.y + 0.3, this.world.ball.pos.z);
      h.visible = true;
    }
    if (this.fx.alert) this.fx.alert(); else this.fx.ui?.();
  }

  updateAimGlow() {
    Scenario.prototype.updateAimGlow.call(this);
    if (this.state === 'buildup') this.paintRings();
  }

  answer() {
    if (this.callKind === 'mate') return { target: this.calledPlayer, one: true };
    return { target: this.passer, one: true };
  }
  wrongs() { return this.callKind === 'mate' ? this.coloured.filter((p) => p !== this.calledPlayer) : this.coloured; }

  valueOf(o) {
    if (o.kind !== 'pass') return -0.3;
    const late = !this._ot && (this.decideT || 0) > 1.1;
    const a = this.answer().target;
    if (o.target === a) return late ? 0.25 : BONUS;
    return this.coloured.includes(o.target) ? -0.35 : -0.2;
  }

  describe(r) {
    const ch = this.chosen?.target, c = this.callColour, rt = this.touchDelay ?? null;
    const fake = this.callKind !== 'mate';
    const missed = this.flashes.filter((f) => !f.seen && f.p !== this.decoy).length;
    r.calledColour = c.name;
    r.callKind = this.callKind;
    r.flashesSeen = this.flashes.filter((f) => f.seen).length;
    r.flashesMissed = missed;
    r.onTime = rt != null && rt <= 1.1;
    r.reaction = rt;
    r.correct = ch === this.answer().target;
    r.fakedOut = fake && ch != null && ch !== this.passer;
    const wore = (p) => (p === this.decoy ? this.decoyColour : this.cmap.get(p))?.name;
    r.fact = r.correct
      ? (fake ? `NOBODY WORE ${c.name} · BACK` : `${c.name} = #${this.calledPlayer.number}`)
      : r.fakedOut ? `FAKED: NOBODY WORE ${c.name}` : `${c.name} WAS #${this.calledPlayer?.number ?? '?'}`;
    r.expected = fake ? (this.callKind === 'decoy' ? `${c.name} WAS AN OPPONENT · PLAY IT BACK` : `NOBODY WORE ${c.name} · PLAY IT BACK`) : `FIRST TIME TO ${c.name}`;
    r.reason = missed ? `MISSED ${missed} OF 3 FLASHES` : `SAW ALL 3 FLASHES${wore(ch) ? ` · #${ch.number} WORE ${wore(ch)}` : ''}`;
    r.scenarioScore = r.correct ? (r.onTime ? 100 : 65) - missed * 10 : 0;
  }
}

// ---------------------------------------------------------------------------------------------
// D6 Receive and turn. Your back to the goal, a presser behind you, a free midfielder ahead of the
// presser. A shoulder scan earns the turn and the forward pass; without it, one touch back.
// ---------------------------------------------------------------------------------------------
export class TurnScenario extends Scenario {
  static key = 'turn';
  static roles = ['CDM', 'CM'];
  static flight = 1.3;
  static quizOK = false;

  build() {
    const d = this.diff, cm = this.roleKey === 'CM';
    const ux = (cm ? -9 : -19) + rand(-2, 2), uz = rand(-5, 5);
    const cbx = Math.max(-42, ux - rand(18, 21)), cbz = clamp(uz * 0.4 + rand(-6, 6), -12, 12);
    this.userAt(ux, uz, cbx, cbz);
    const U = this.U, h = heading(U, { x: cbx, z: cbz }), rsn = sign();
    const cb = this.pickMate(cbz >= 0 ? ['RCB', 'LCB'] : ['LCB', 'RCB']);
    this.put(cb, cbx, cbz);
    const cb2 = this.pickMate(cbz >= 0 ? ['LCB', 'RCB'] : ['RCB', 'LCB']);
    this.put(cb2, cbx + rand(-2, 2), cbz >= 0 ? cbz - rand(14, 18) : cbz + rand(14, 18));

    const D0 = 4.4;
    this.dA = rand(2.2, 3.0);
    const pp = polar(U, h, rsn * 165, D0);
    const pr = this.pickOpp(['ST1', 'ST2', 'LCM', 'RCM']);
    this.put(pr, pp.x, pp.z);
    this.pinned.add(pr);
    this.stalk.set(pr, new THREE.Vector3(pp.x - ux, 0, pp.z - uz));
    const mp = polar(U, h, -rsn * 155, rand(10, 11));
    const mid = this.pickMate(mp.z > uz ? ['RCM', 'RDM', 'CAM', 'LCM'] : ['LCM', 'LDM', 'CAM', 'RCM']);
    this.put(mid, mp.x, mp.z);

    this.fillRest(ux, uz * 0.5);
    this.keepArea(ux, uz, 8.5);
    this.keepArea(mp.x, mp.z, 6.5);
    this.keepLane(U, mp, 1.9);
    this.keepLane(U, { x: cbx, z: cbz }, 1.9);
    this.chainTo(cb, Math.round(rand(d.passes[0], d.passes[1])));

    this.passer = cb; this.otherCB = cb2; this.freeMid = mid; this.presser = pr;
    this.free = mid; this.pressers = [pr];
    this.watch = { mid: { p: mid }, presser: { p: pr } };
  }

  script(dt, user) {
    if (!this.closeIn(this.presser, user, this.dA, 1.1)) this.stalkUser(this.presser, user, 3.2);
  }

  // A shoulder check is one of Rep's own scans: the head went past 100 degrees off the ball, held, over play (a
  // player in view or open pitch), never a snap turn. One in the last 3.5 s counts, or one still going.
  shoulderNow() {
    const t = this.t;
    for (const sc of this.scans) if (sc.shoulder && sc.end > t - 3.5) return true;
    return !!(this.inScan && this.scanPeak > 100 * DEG && this.scanSaw && t - this.scanStart >= 0.18 && this.scanDwell >= 0.1);
  }

  atArrival() { this.shoulder = this.shoulderNow(); }

  hasShoulder() { return this.shoulder ?? this.shoulderNow(); }

  answer() { return this.hasShoulder() ? { target: this.freeMid, one: false } : { target: this.passer, one: true }; }
  wrongs() { return this.hasShoulder() ? [this.passer] : [this.freeMid]; }

  valueOf(o) {
    if (o.kind !== 'pass') return -0.3;
    const sh = this.hasShoulder();
    if (sh) return o.target === this.freeMid ? BONUS : o.target === this.passer ? -0.15 : -0.2;
    if (o.target === this.passer) return BONUS;
    if (o.target === this.otherCB) return 0.3;
    return o.target === this.freeMid ? -0.4 : -0.2; // a blind turn into the press
  }

  describe(r) {
    const ch = this.chosen?.target, sh = this.hasShoulder();
    const forward = ch === this.freeMid;
    r.shoulderScan = sh;
    r.turned = forward;
    r.correct = !!ch && (sh ? forward : (ch === this.passer || ch === this.otherCB));
    r.fact = sh ? 'SHOULDER SCAN' : 'NO SCAN BEHIND';
    r.expected = sh ? 'TURN AND PLAY FORWARD' : 'ONE TOUCH BACK';
    r.reason = sh ? 'SHOULDER CHECK · TURN AND PLAY FORWARD' : 'NO SHOULDER CHECK · BOUNCE IT BACK';
    // the shoulder check carries the score (40), the right pass 35, the body shape 25; without the check, or
    // with the wrong pass, 55 is the ceiling, so the 60 mark needs both
    const body = r.body === 'HALF-TURN' ? 25 : r.body === 'OPEN' ? 17 : r.body === 'CLOSED' ? 5 : 10;
    r.scenarioScore = Math.min((sh ? 40 : 0) + (r.correct ? 35 : 0) + body, sh && r.correct ? 100 : 55);
  }
}

// ---------------------------------------------------------------------------------------------
// D8 Inhibition. Aim at a free teammate and a tone sounds 0.4-0.9 s later: an opponent steps into
// that lane and time slows. Switch target within 0.8 s; do not repeat the pass.
// ---------------------------------------------------------------------------------------------
export class InhibitScenario extends Scenario {
  static key = 'inhibit';
  static roles = ['CM', 'CDM', 'CAM'];
  static flight = 1.3;
  static quizOK = false;
  static window = 1.3;
  static minWindow = 2.2; // the tone comes 0.5-1 s into the aim, then 0.8 s (half speed) to switch

  build() {
    const d = this.diff;
    const ux = ({ CM: -9, CDM: -19, CAM: 2 }[this.roleKey] ?? -9) + rand(-2, 2), uz = rand(-6, 6);
    const cbx = ux - rand(18, 21), cbz = clamp(uz * 0.5 + rand(-7, 7), -13, 13);
    this.userAt(ux, uz, cbx, cbz);
    const U = this.U, h = heading(U, { x: cbx, z: cbz }), rsn = sign();
    const cb = this.pickMate(cbz >= 0 ? ['RCB', 'LCB'] : ['LCB', 'RCB']);
    this.put(cb, cbx, cbz);

    const ap = polar(U, h, rsn * 30, rand(11, 13)), bp = polar(U, h, -rsn * 105, rand(10, 12));
    const A = this.pickMate(ap.z > uz ? ['RCM', 'RDM', 'RW', 'RB'] : ['LCM', 'LDM', 'LW', 'LB']);
    this.put(A, ap.x, ap.z);
    const B = this.pickMate(bp.z > uz ? ['RB', 'RDM', 'RCM', 'RW'] : ['LB', 'LDM', 'LCM', 'LW']);
    this.put(B, bp.x, bp.z);
    // one defender hovers beside each lane, ready to step into it
    const side = (p, q, k) => {
      const dx = q.x - p.x, dz = q.z - p.z, l = Math.hypot(dx, dz) || 1;
      return { x: (p.x + q.x) / 2 + (-dz / l) * k, z: (p.z + q.z) / 2 + (dx / l) * k };
    };
    const oa = this.pickOpp(['LCM', 'RCM', 'LM', 'RM']), oap = side(U, ap, 5.5);
    this.put(oa, oap.x, oap.z);
    this.pinned.add(oa);
    const ob = this.pickOpp(['RCM', 'LCM', 'RM', 'LM']), obp = side(U, bp, -5.5);
    this.put(ob, obp.x, obp.z);
    this.pinned.add(ob);
    const pr = this.pickOpp(['ST1', 'ST2']);
    const pp = polar(U, h, 180 + rand(-15, 15), 4.5 + this.reach() * rand(0.5, 0.8));
    this.put(pr, pp.x, pp.z);
    this.pinned.add(pr);
    this.stalk.set(pr, new THREE.Vector3(pp.x - ux, 0, pp.z - uz));

    this.fillRest(ux, uz * 0.5);
    this.keepArea(ux, uz, 8);
    this.keepArea(ap.x, ap.z, 6);
    this.keepArea(bp.x, bp.z, 6);
    this.keepLane(U, ap, 2.2);
    this.keepLane(U, bp, 2.2);
    this.chainTo(cb, Math.round(rand(d.passes[0], d.passes[1])));

    this.A = A; this.B = B; this.stepper = new Map([[A, oa], [B, ob]]);
    this.freeSet = new Set([A, B]);
    this.passer = cb; this.presser = pr;
    this.free = B; this.pressers = [pr];
    this.lock = null; this.lockT = 0; this.cueAt = null;
    this.cueFired = false; this.closed = null; this.cueRaw = 0;
    this.early = false; this.repeated = false; this.switchDelay = null;
    this.watch = { A: { p: A }, B: { p: B } };
  }

  script(dt, user) {
    if (!this.closeIn(this.presser, user, 4, 2.6)) this.stalkUser(this.presser, user, 4);
    if (this.cueFired) {
      const o = this.stepper.get(this.closed), lane = this.laneMid;
      if (!(this.state === 'outcome' && this.outcomeTarget === o)) {
        o.target.set(lane.x, 0, lane.z);
        o.maxSpeed = 16; // in half-speed time he moves at 8 m/s
      }
    }
  }

  pre(s) {
    super.pre(s);
    if (this.cueFired || (this.state !== 'incoming' && this.state !== 'decide')) return;
    const a = this.aimed?.kind === 'pass' ? this.aimed.target : null;
    if (a && this.freeSet.has(a)) {
      if (this.lock !== a) { this.lock = a; this.lockT = this.rawT; this.cueAt = null; }
      else if (this.cueAt == null && this.rawT - this.lockT >= 0.12) this.cueAt = this.rawT + rand(0.4, 0.9);
    }
    if (this.cueAt != null && this.rawT >= this.cueAt) this.fireCue();
  }

  fireCue() {
    this.cueFired = true;
    this.cueRaw = this.rawT;
    this.closed = this.lock;
    const U = this.world.userPos(this._u), p = this.closed.pos;
    this.laneMid = { x: (U.x + p.x) / 2, z: (U.z + p.z) / 2 };
    this.slow = 0.5;
    this.events.push({ t: this.t, type: 'cue' });
    this.closed.highlight(0xff3b3b, 0.95);
    if (this.fx.alert) this.fx.alert(); else this.fx.ui?.();
  }

  // a trigger pulled before the tone is withheld: the tone comes, the pass does not go
  select() {
    if (!this.aimed || (this.state !== 'incoming' && this.state !== 'decide')) return false;
    const tg = this.aimed.kind === 'pass' ? this.aimed.target : null;
    if (!this.cueFired) {
      if (tg && this.freeSet.has(tg)) {
        this.early = true;
        if (this.lock !== tg) { this.lock = tg; this.lockT = this.rawT; this.cueAt = null; }
        if (this.cueAt == null) this.cueAt = this.rawT + rand(0.4, 0.9);
        this.fx.ui?.();
        return true;
      }
      return super.select();
    }
    if (tg === this.closed) this.repeated = true;
    else if (this.switchDelay == null) this.switchDelay = this.rawT - this.cueRaw;
    return super.select();
  }

  updateAimGlow() {
    super.updateAimGlow();
    if (this.cueFired && this.closed && this.state !== 'outcome') this.closed.highlight(0xff3b3b, 0.95);
  }

  answer() {
    if (this.cueFired) return { target: this.closed === this.A ? this.B : this.A, one: false };
    return { target: this.A, one: false };
  }
  wrongs() { return this.cueFired ? [this.closed] : [this.passer]; }

  valueOf(o) {
    if (o.kind !== 'pass') return -0.3;
    if (this.cueFired) {
      if (o.target === this.closed) return -0.7;
      return this.freeSet.has(o.target) ? BONUS : -0.2;
    }
    return this.freeSet.has(o.target) ? 0.3 : -0.1;
  }

  describe(r) {
    const ch = this.chosen?.target, dl = this.switchDelay;
    const ok = this.cueFired && !this.repeated && ch && ch !== this.closed && this.freeSet.has(ch) && dl != null && dl <= 0.8;
    r.inhibition = { cued: this.cueFired, early: this.early, repeated: this.repeated, delay: dl };
    r.correct = !!ok;
    r.fact = !this.cueFired ? 'NO TONE' : this.repeated ? 'REPEATED THE PASS' : dl == null ? 'NO SWITCH' : dl <= 0.8 ? `SWITCHED ${dl.toFixed(2)} S` : `SLOW ${dl.toFixed(2)} S`;
    r.expected = 'SWITCH ON THE TONE';
    r.reason = this.cueFired ? 'TONE · LANE SHUT · SWITCH WITHIN 0.8 S' : 'NO TONE · LANE STAYED OPEN';
    r.scenarioScore = !this.cueFired ? 50 : this.repeated ? 0 : dl == null ? 0 : dl <= 0.8 ? Math.round(100 - (dl / 0.8) * 20) : dl <= 1.6 ? 50 : 25;
  }
}

// ---------------------------------------------------------------------------------------------
// D12 Sandwich. Pressers close from both sides with one lane between them. One touch back to the
// centre back who played it.
// ---------------------------------------------------------------------------------------------
export class SandwichScenario extends Scenario {
  static key = 'sandwich';
  static roles = ['CM', 'CDM', 'CAM'];
  static flight = 1.3;
  static quizOK = true;

  build() {
    const d = this.diff;
    const ux = ({ CM: -9, CDM: -19, CAM: 2 }[this.roleKey] ?? -9) + rand(-2, 2), uz = rand(-6, 6);
    const cbx = ux - rand(18, 21), cbz = clamp(uz * 0.4 + rand(-6, 6), -12, 12);
    this.userAt(ux, uz, cbx, cbz);
    const U = this.U, h = heading(U, { x: cbx, z: cbz });
    const cb = this.pickMate(cbz >= 0 ? ['RCB', 'LCB'] : ['LCB', 'RCB']);
    this.put(cb, cbx, cbz);

    const gp = polar(U, h, 180 + rand(-8, 8), rand(15, 18));
    const gap = this.pickMate(['ST', 'CAM', 'RW', 'LW']);
    this.put(gap, gp.x, gp.z);
    const D0 = 2.3 + this.reach() * rand(0.7, 0.95);
    const p1 = polar(U, h, 105, D0), p2 = polar(U, h, -105, D0 + rand(-0.4, 0.4));
    const a = this.pickOpp(['LCM', 'RCM', 'ST1', 'ST2']), b = this.pickOpp(['RCM', 'LCM', 'ST2', 'ST1']);
    this.put(a, p1.x, p1.z); this.put(b, p2.x, p2.z);
    this.pinned.add(a); this.pinned.add(b);
    this.stalk.set(a, new THREE.Vector3(p1.x - ux, 0, p1.z - uz));
    this.stalk.set(b, new THREE.Vector3(p2.x - ux, 0, p2.z - uz));

    this.fillRest(ux, uz * 0.5);
    this.keepArea(ux, uz, 9);
    this.keepArea(gp.x, gp.z, 6);
    this.keepLane(U, gp, 1.8);
    this.keepLane(U, { x: cbx, z: cbz }, 1.8);
    this.chainTo(cb, Math.round(rand(d.passes[0], d.passes[1])));

    this.passer = cb; this.gapMan = gap; this.pA = a; this.pB = b;
    this.free = gap; this.pressers = [a, b];
    this.dA = rand(2.0, 2.6); this.dB = rand(2.0, 2.6);
    this.watch = { a: { p: a }, b: { p: b } };
  }

  script(dt, user) {
    if (!this.closeIn(this.pA, user, this.dA, 1.1)) this.stalkUser(this.pA, user, 4);
    if (!this.closeIn(this.pB, user, this.dB, 1.1)) this.stalkUser(this.pB, user, 4);
  }

  answer() { return { target: this.passer, one: true }; }
  wrongs() { return [this.gapMan]; }

  valueOf(o) {
    if (o.kind !== 'pass') return -0.3;
    if (o.target === this.passer) return BONUS + (this._ot ? 0.1 : 0);
    return o.target === this.gapMan ? -0.2 : -0.15;
  }

  describe(r) {
    const ch = this.chosen?.target, back = ch === this.passer;
    const kept = ['completed', 'tight', 'goal'].includes(r.outcome);
    const both = !!this.saw.a && !!this.saw.b;
    const one = !!(this.oneTouch ?? this._ot);
    r.bothPressersSeen = both;
    r.oneTouchBack = back && one;
    r.kept = kept;
    r.correct = back && kept;
    r.fact = back ? (one ? 'ONE TOUCH BACK' : 'SECOND TOUCH BACK') : ch === this.gapMan ? 'THROUGH THE GAP' : 'OTHER PASS';
    r.expected = 'ONE TOUCH BACK';
    r.reason = 'PRESSERS BOTH SIDES · ONE TOUCH BACK';
    r.scenarioScore = (back ? 40 : 0) + (back && one ? 25 : 0) + (kept ? 20 : 0) + (both ? 15 : 0);
  }
}

// ---------------------------------------------------------------------------------------------
// D11 Line steps up. The back four step up together as the ball comes to you and a forward runs. Half the
// reps the line catches him: he is beyond the second-last defender when the ball is played, so a pass to
// him is offside and the answer is to recycle. The other half he is timed onside: a through ball into his
// run, within a second and within 1.5 m of the line he runs. The offside line is read at the moment of the
// pass, from the pitch as it is then.
// ---------------------------------------------------------------------------------------------
export class ThroughScenario extends ThirdManScenario {
  static key = 'through';
  static roles = ['W', 'ST'];
  static flight = 1.3;
  static quizOK = false;

  build() {
    const d = this.diff, wing = this.roleKey === 'W';
    const slot = this.userBody.slot || '';
    const side = wing ? (/^L/.test(slot) ? -1 : 1) : sign();
    const ux = (wing ? 9 : 8) + rand(-2, 2), uz = wing ? side * rand(14, 19) : rand(-4, 4); // the striker has dropped in to receive
    const cx = ux - rand(18, 21), cz = clamp(uz * 0.5 + rand(-6, 6), -13, 13);
    this.userAt(ux, uz, cx, cz);
    const U = this.U;
    const carrier = this.pickMate(['LCM', 'RCM', 'CDM', 'LDM', 'RDM', 'LCB', 'RCB']);
    this.put(carrier, cx, cz);

    // The line steps `step` m up the pitch from xl. Trap: it steps far, and the runner (who left early) is
    // beyond it when the ball arrives. On: it barely moves and the runner starts late, so he is still behind it.
    // The start spot is worked back from where he should be at the arrival (0.88: acceleration and the angle).
    this.trap = Math.random() < 0.5;
    const T = this.flightT / this.gameSpeed, runV = 6.5 * this.speed;
    const xl = ux + 8.5;
    const ex = Math.min(ux + 24, 33), ez0 = clamp(uz * 0.6 + rand(-5, 5), -26, 26);
    const zl = uz + (ez0 - uz) * (xl - ux) / (ex - ux); // where he crosses the line: through the middle of the gap
    const step = this.trap ? rand(3.6, 4.4) : rand(0.8, 1.5);
    const margin = this.trap ? rand(2.4, 3.4) : -rand(3.4, 4.2); // runner minus line, metres, at the arrival
    const runFor = this.trap ? Math.max(0.5, T - 0.25) : clamp(0.4 * T, 0.35, Math.max(0.4, T - 0.25));
    const lat = (zl >= uz ? 1 : -1) * rand(3.2, 4.0); // wide of the viewer's line, so he does not start on top of him
    let sx = xl - step + margin - runFor * runV * 0.88;
    for (let k = 0; k < 2; k++) sx = xl - step + margin - runFor * runV * 0.95 / Math.sqrt(1 + (lat / (xl - sx)) ** 2); // his run is a diagonal
    const start = { x: sx, z: clamp(zl + lat, -28, 28) };
    // a diagonal run: from his spot, through the gap, on to the end
    const end = { x: ex, z: clamp(start.z + (zl - start.z) * (ex - sx) / (xl - sx), -30, 30) };
    const runner = this.pickMate(['ST', 'RW', 'LW', 'CAM']);
    this.put(runner, start.x, start.z);

    // the back four, level, a gap either side of the run
    const dl = [this.pickOpp(['LCB', 'RCB']), this.pickOpp(['RCB', 'LCB']), this.pickOpp(['LB', 'RB']), this.pickOpp(['RB', 'LB'])];
    const zs = [zl - 7.2, zl + 7.2, zl - 7.2 - rand(9, 11), zl + 7.2 + rand(9, 11)];
    dl.forEach((o, i) => { this.put(o, xl, zs[i]); this.pinned.add(o); });

    // the full-back who steps up on the viewer, on the far side of him from the through ball
    const pr = this.pickOpp(['LM', 'RM', 'LCM', 'RCM']);
    const hl = heading(U, { x: xl + 9, z: zl + (end.z - zl) * 0.3 }), pdeg = rand(85, 100) * DEG, pd = 4 + this.reach() * rand(0.45, 0.7);
    // beside him, on the side away from the runner's start and clear of the way back
    const at = (sg) => ({ x: ux + Math.sin(hl + sg * pdeg) * pd, z: uz + Math.cos(hl + sg * pdeg) * pd });
    const pp = dist2(at(1), start) > dist2(at(-1), start) ? at(1) : at(-1);
    this.put(pr, pp.x, pp.z);
    this.pinned.add(pr);
    this.stalk.set(pr, new THREE.Vector3(pp.x - ux, 0, pp.z - uz));

    this.fillRest(ux, uz * 0.5);
    this.keepArea(ux, uz, 7.5);
    const lead0 = { x: ux + 17, z: start.z + (end.z - start.z) * (ux + 17 - sx) / (ex - sx) }; // where the ball goes, about
    this.keepLane(U, lead0, 2.4);
    this.keepLane(U, { x: cx, z: cz }, 1.9); // the way back to the man who played it: recycling must be on
    this.keepSeg(start, end, 9.6);
    this.rules.push(() => this.clearMatesSeg(start, end, 4.5));
    this.clearMatesSeg(start, end, 4.5);
    // nobody else is deeper than the back four, even after the step: the line is the offside line
    this.capX = xl - step - 2.6;
    this.rules.push(() => this.keepUpfield());
    this.chainTo(carrier, Math.round(rand(d.passes[0], d.passes[1])));

    this.passer = carrier; this.runner = runner; this.marker = pr; this.line = dl;
    this.xl = xl; this.step = step; this.runDelay = T - runFor; this.passOffside = null;
    this.S = start; this.E = end;
    const len = dist2(start, end) || 1;
    this.runDir = { x: (end.x - start.x) / len, z: (end.z - start.z) / len };
    this.runV = runV;
    this.runStarted = false;
    this.free = runner; this.pressers = [pr];
    this.watch = { runner: { p: runner, when: () => this.finalStruck }, line: { p: dl[1] }, line2: { p: dl[0] } };
  }

  // unscripted outfield opposition sit upfield of capX; one pushed back finds the nearest clear spot along the
  // line, outside the viewer's circle and off everybody else
  keepUpfield() {
    const U = this.U, all = [...this.home.filter((p) => p !== this.userBody), ...this.away];
    for (const o of this.movable()) {
      if (o.pos.x <= this.capX) continue;
      const x = this.capX - rand(0, 0.6), dx = x - U.x, z0 = o.pos.z, sg = z0 >= U.z ? 1 : -1;
      const clear = (z) => Math.abs(z) <= 32 && Math.hypot(dx, z - U.z) >= 7.8 && all.every((q) => q === o || Math.hypot(q.pos.x - x, q.pos.z - z) >= 1.9);
      let z = z0;
      for (let j = 0; j < 80 && !clear(z); j++) z = z0 + (j % 2 ? -sg : sg) * Math.ceil((j + 1) / 2) * 0.9;
      this.put(o, x, z);
    }
  }

  afterSeal() { this.keepUpfield(); this.clearLane(this.U, this.passer.pos, 1.9); }

  onFinal() { this.runAt = this.strikeAt + this.runDelay; }

  script(dt, user) {
    const r = this.runner;
    if (!this.runStarted && this.state === 'incoming' && this.runAt != null && this.t >= this.runAt) {
      this.runStarted = true;
      this.events.push({ t: this.t, type: 'run' });
    }
    if (this.runStarted && !(this.state === 'outcome' && this.outcomeTarget === r)) {
      r.target.set(this.E.x, 0, this.E.z);
      r.maxSpeed = this.runV;
    }
    // the back four step up together, a flat line, as the ball comes
    if (this.finalStruck && this.t - this.strikeAt >= 0.2) {
      for (const o of this.line) {
        if (this.state === 'outcome' && this.outcomeTarget === o) continue;
        o.target.set(this.xl - this.step, 0, this.base.get(o).z);
        o.maxSpeed = 4.5 * this.speed;
      }
    }
    if (!this.closeIn(this.marker, user, 3.0, 2.2)) this.stalkUser(this.marker, user, 4);
  }

  // where the runner is tau seconds from now (he may not have started yet)
  runnerAt(tau, out) {
    const wait = this.runStarted || this.runAt == null ? 0 : Math.max(0, this.runAt - this.t);
    const r = this.runner, rem = dist2(r.pos, this.E), k = Math.min(rem, this.runV * Math.max(0, tau - wait));
    out.x = r.pos.x + this.runDir.x * k;
    out.z = r.pos.z + this.runDir.z * k;
    return out;
  }

  // The offside line is the second-last opponent: the deepest outfield man (the keeper is last). The runner is
  // offside when he is beyond it, and beyond the ball, as the pass is played (a quarter metre's benefit of the doubt).
  offsideState() {
    const line = offsideLine(this.away), x = this.runner.pos.x;
    return { line, runnerX: x, margin: x - line, offside: x - line > 0.25 && x > this.world.ball.pos.x };
  }

  execute(choice, oneTouch) {
    if (!this.passOffside) this.passOffside = this.offsideState();
    super.execute(choice, oneTouch);
    if (this.passOffside.offside && choice.kind === 'pass' && choice.target === this.runner) {
      // flagged: the ball goes to the line's keeper of the free kick
      this.outcome = 'intercepted';
      this.outcomeTarget = this.line.slice().sort((a, b) => dist2(a.pos, this.runner.pos) - dist2(b.pos, this.runner.pos))[0];
      this.events.push({ t: this.t, type: 'offside' });
      this.fx.whistle?.();
    }
  }

  offsideNow() { return (this.passOffside ?? this.offsideState()).offside; }

  answer() { return this.offsideNow() ? { target: this.passer, one: false, offside: true } : { target: this.runner, one: true }; }
  wrongs() { return this.offsideNow() ? [this.runner] : [this.passer]; }

  valueOf(o) {
    if (o.kind !== 'pass') return -0.3;
    if (this.offsideNow()) {
      if (o.target === this.runner) return -o.value - 0.25; // flagged: worth less than nothing
      return o.target === this.passer ? BONUS : 0; // recycling is the answer; any other safe ball is fine
    }
    return o.target === this.runner ? BONUS : -0.2;
  }

  describe(r) {
    const ch = this.chosen?.target, toRunner = ch === this.runner;
    const seen = !!this.saw.runner, seenLine = !!(this.saw.line || this.saw.line2);
    const quick = (this.touchDelay ?? 9) <= 1.0;
    const lead = this.leadErr;
    const o = this.passOffside;
    const kept = ['completed', 'tight', 'goal'].includes(r.outcome);
    r.runnerSeen = seen;
    r.lineSeen = seenLine;
    r.quick = quick;
    r.leadErr = lead;
    r.offside = o ? o.offside : null;
    r.offsideMargin = o ? o.margin : null;
    r.lineStep = this.step;
    if (o?.offside) {
      // the line caught him: a pass to him is wrong, a recycled ball is a valid answer
      r.correct = !!ch && !toRunner && kept;
      r.fact = !toRunner && r.correct ? 'OFFSIDE RUN · RECYCLED' : 'OFFSIDE';
      r.expected = 'NOT ON · RECYCLE';
      r.reason = `OFFSIDE BY ${f1(Math.min(o.margin, 9.9))} M · RECYCLE`;
      r.scenarioScore = toRunner ? (seenLine ? 15 : 0) : r.correct ? 50 + (seenLine ? 30 : 0) + (quick ? 20 : 0) : (seenLine ? 25 : 10);
      return;
    }
    r.correct = toRunner && lead != null && lead <= 1.5 && quick;
    r.fact = !toRunner ? 'RUNNER MISSED' : lead == null ? 'PASS LOST' : lead <= 1.5 ? `THROUGH BALL ${f1(lead)} M` : `OFF THE RUN ${f1(lead)} M`;
    r.expected = 'THROUGH BALL INTO THE RUN';
    r.reason = o ? `ONSIDE BY ${f1(Math.min(-o.margin, 9.9))} M · THROUGH BALL` : 'ONSIDE · THROUGH BALL';
    r.scenarioScore = (seen ? 25 : 0) + (quick && toRunner ? 25 : 0) + (toRunner && lead != null ? Math.round(50 * clamp(1 - lead / 2.5, 0, 1)) : 0);
  }
}

// ---------------------------------------------------------------------------------------------
// D7 Goalkeeper build-up. A centre back plays it back to you and the strikers jump. One centre
// back is shut off: play to the other. Both are: go long.
// ---------------------------------------------------------------------------------------------
export class GkBuildScenario extends Scenario {
  static key = 'gkbuild';
  static roles = ['GK'];
  static flight = 1.2;
  static quizOK = false;

  build() {
    const d = this.diff;
    const ux = -47 + rand(0, 1.5), uz = rand(-1.5, 1.5);
    const cb1z = -rand(7, 10), cb2z = rand(7, 10), cbx = -33 + rand(-2, 2);
    const flip = Math.random() < 0.5; // which centre back plays it back
    this.userAt(ux, uz, cbx, flip ? cb2z : cb1z);
    const U = this.U;
    const lcb = this.pickMate(['LCB']), rcb = this.pickMate(['RCB']);
    this.put(lcb, cbx + rand(-1, 1), cb1z);
    this.put(rcb, cbx + rand(-1, 1), cb2z);
    const passer = flip ? rcb : lcb, other = flip ? lcb : rcb;
    this.both = Math.random() < 0.4;

    // the strikers jump: one shuts the passer's lane from the front, the other either takes the other
    // centre back's lane or stays high
    const s1 = this.pickOpp(['ST1', 'ST2']), s2 = this.pickOpp(['ST2', 'ST1']);
    const T = this.flightT / this.speed;
    const dA = rand(4.2, 5.6);
    const lane = (from, to, k) => ({ x: from.x + (to.x - from.x) * k, z: from.z + (to.z - from.z) * k });
    // s1 closes the keeper (the viewer) from the passer's side, and stands in the keeper-to-passer lane
    const l1 = lane(U, passer.pos, 0.72);
    this.put(s1, l1.x + 0.8, l1.z);
    const l2 = lane(U, other.pos, 0.72);
    if (this.both) this.put(s2, l2.x + 0.8, l2.z);
    else this.put(s2, ux + rand(24, 30), (other.pos.z > 0 ? -1 : 1) * rand(5, 9)); // high, out of the way
    this.pinned.add(s1); this.pinned.add(s2);
    this.stalk.set(s1, new THREE.Vector3(s1.pos.x - ux, 0, s1.pos.z - uz));
    this.stalk.set(s2, new THREE.Vector3(s2.pos.x - ux, 0, s2.pos.z - uz));

    // the long option: a forward with nobody within reach of where it lands
    const target = this.pickMate(['ST', 'RW', 'LW', 'CAM']);
    const tz = (other.pos.z > 0 ? 1 : -1) * rand(4, 9), tx = ux + rand(34, 40);
    this.put(target, tx, tz);

    this.fillRest(-30, 0);
    const p80 = { x: ux + (tx - ux) * 0.8, z: uz + (tz - uz) * 0.8 };
    this.keepSeg(p80, { x: tx, z: tz }, 11.5);
    this.keepArea(tx, tz, 12);
    this.keepArea(ux, uz, 6, [s1, s2]);
    if (!this.both) this.keepLane(U, other.pos, 2.2);
    this.chain = [passer];

    this.passer = passer; this.other = other; this.longMan = target; this.s1 = s1; this.s2 = s2; this.dA = dA;
    this.free = this.both ? target : other; this.pressers = this.both ? [s1, s2] : [s1];
    this.watch = { passer: { p: passer }, other: { p: other }, press: { p: s1 }, press2: { p: s2 } };
  }

  script(dt, user) {
    // after the back pass the first striker closes the keeper; the second stays on his man
    if (!this.closeIn(this.s1, user, this.dA, 1.6)) this.stalkUser(this.s1, user, 4);
    if (!this.both) {
      if (!this.closeIn(this.s2, user, this.dA + 2.5, 2.5)) this.stalkUser(this.s2, user, 4);
    } else if (this.finalStruck && this.state !== 'outcome') {
      // he sits in the other centre back's lane, keeping the same shape
      const o = this.other.pos;
      this.s2.target.set(user.x + (o.x - user.x) * 0.72 + 0.8, 0, user.z + (o.z - user.z) * 0.72);
      this.s2.maxSpeed = 5;
    } else this.stalkUser(this.s2, user, 4);
  }

  // a centre back is shut off when a striker is in the lane
  shut(p) {
    const u = this.world.userPos(this._u);
    let m = Infinity;
    for (const o of [this.s1, this.s2]) m = Math.min(m, laneMargin(u, p.pos, o.pos, 17, false));
    return m < 1.0;
  }

  answer() {
    const sh = this.shutAtArrival || [this.shut(this.passer), this.shut(this.other)];
    const pShut = sh[0], oShut = sh[1];
    if (!oShut) return { target: this.other, one: false };
    if (!pShut) return { target: this.passer, one: false };
    return { target: this.longMan, one: false };
  }
  wrongs() { const a = this.answer().target; return a === this.longMan ? [this.other] : [this.longMan]; }

  valueOf(o) {
    if (o.kind !== 'pass') return -0.3;
    const a = this.answer();
    if (o.target === a.target) return BONUS;
    if (o.target === this.passer || o.target === this.other) return this.shut(o.target) ? -0.45 : -0.1;
    return o.target === this.longMan ? -0.2 : -0.15;
  }

  atArrival() { this.shutAtArrival = [this.shut(this.passer), this.shut(this.other)]; }

  describe(r) {
    const ch = this.chosen?.target, a = this.answer();
    const sh = this.shutAtArrival || [this.shut(this.passer), this.shut(this.other)];
    const both = sh[0] && sh[1];
    r.correct = !!ch && ch === a.target;
    r.bothPressed = both;
    r.sawPressers = !!this.saw.press && (!this.both || !!this.saw.press2);
    r.fact = both ? 'BOTH CENTRE BACKS SHUT' : 'ONE CENTRE BACK SHUT';
    r.expected = both ? 'GO LONG' : 'PLAY TO THE OPEN SIDE';
    r.reason = `${r.fact} · ${r.expected}`;
    r.scenarioScore = r.correct ? (r.sawPressers ? 100 : 65) : (r.sawPressers ? 30 : 0);
  }
}

export const SCENARIOS = {
  press: PressScenario,
  switch: SwitchScenario,
  thirdman: ThirdManScenario,
  signal: SignalScenario,
  colour: ColourScenario,
  memory: MemoryScenario,
  turn: TurnScenario,
  inhibit: InhibitScenario,
  sandwich: SandwichScenario,
  through: ThroughScenario,
  gkbuild: GkBuildScenario,
};
export const SCENARIO_NAMES = {
  press: 'BLIND-SIDE PRESS',
  switch: 'WEAK-SIDE SWITCH',
  thirdman: 'THIRD-MAN WALL',
  signal: 'HAND-SIGNAL TRAP',
  colour: 'COLOUR CALL',
  memory: 'COLOUR MEMORY',
  turn: 'RECEIVE AND TURN',
  inhibit: 'INHIBITION',
  sandwich: 'SANDWICH',
  through: 'LINE STEPS UP',
  gkbuild: 'KEEPER BUILD-UP',
};
export const SCENARIO_ROLES = Object.fromEntries(Object.entries(SCENARIOS).map(([k, C]) => [k, [...C.roles]]));

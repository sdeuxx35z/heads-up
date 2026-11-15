import * as THREE from 'three';
import { ROLES, DIFFICULTY, AWAY_442, PITCH, GOAL } from './config.js';
import { evaluateOptions, scoreDecision, laneMargin, LOFT_OVER } from './eval.js';

const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const angDiff = (a, b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
const heading = (from, to) => Math.atan2(to.x - from.x, to.z - from.z);
const DEG = Math.PI / 180;

const SCAN_ON = 58 * DEG, SCAN_OFF = 35 * DEG, SEEN = 48 * DEG;

function homeTarget(slotDef, bx, bz, offsideX) {
  const [name, sx, sz] = slotDef;
  if (name === 'GK') return new THREE.Vector3(-47 + (bx + 52) * 0.06, 0, bz * 0.12);
  let x = sx + bx * 0.5, z = sz * 0.9 + bz * 0.3;
  if (x > offsideX - 0.6 && bx < offsideX) x = offsideX - 0.6;
  return new THREE.Vector3(clamp(x, -50, 50), 0, clamp(z, -32, 32));
}

function awayTarget(slotDef, bx, bz) {
  const [name, sx, sz] = slotDef;
  if (name === 'GK') return new THREE.Vector3(49 - Math.max(0, bx - 15) * 0.05, 0, bz * 0.12);
  const x = sx + bx * 0.55, z = sz * 0.75 + bz * 0.4;
  return new THREE.Vector3(clamp(x, -48, 48), 0, clamp(z, -32, 32));
}

// One repetition: build-up passes, the ball arrives, you decide, it plays out.
export class Rep {
  constructor(world, { role, difficulty, quiz, motion, fx }) {
    this.world = world;
    this.roleKey = role;
    this.role = ROLES[role];
    this.diff = DIFFICULTY[difficulty];
    this.quizWanted = quiz;
    this.motion = motion;
    this.fx = fx || {};
    this.state = 'setup';
    this.t = 0;
  }

  start() {
    const w = this.world, role = this.role, d = this.diff;
    w.useFormation(role.formation);
    w.clearOverlays();
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
    const pool = this.mates.filter((p) => allowGK || p.slot !== 'GK');
    const offside0 = 30 + bx * 0.55 - 4;
    const startTargets = this.F.map((s) => homeTarget(s, bx, bz, offside0));
    const carrierCand = pool
      .map((p) => ({ p, d: startTargets[this.home.indexOf(p)].distanceTo(new THREE.Vector3(bx, 0, bz)) }))
      .sort((a, b) => a.d - b.d);
    this.carrier = carrierCand[Math.random() < 0.7 ? 0 : 1].p;
    const ct = startTargets[this.home.indexOf(this.carrier)];
    bx = ct.x; bz = ct.z;

    const offside = Math.min(...AWAY_442.slice(1, 5).map((s) => awayTarget(s, bx, bz).x));
    this.home.forEach((p, i) => {
      const t = homeTarget(this.F[i], bx, bz, offside);
      p.place(t.x + rand(-1, 1) * d.jitter, t.z + rand(-1, 1) * d.jitter);
      p.maxSpeed = 6.2;
      p.wobble = Math.random() * 100;
    });
    this.away.forEach((p, i) => {
      const t = awayTarget(AWAY_442[i], bx, bz);
      p.place(t.x + rand(-1, 1) * d.jitter, t.z + rand(-1, 1) * d.jitter);
      p.maxSpeed = 6.2;
      p.role = null;
    });

    // the viewer stands where their slot is and faces the ball
    const up = this.userBody.pos.clone();
    this.ballAt(this.carrier);
    w.placeUser(up, heading(up, this.carrier.pos));
    this.userStart = up.clone();
    this.userTarget = up.clone();
    this.runOffset = new THREE.Vector3(rand(-2, 3), 0, rand(-3, 3));

    const toBall = heading(up, this.carrier.pos);

    // A free teammate somewhere the viewer has to turn to see.
    const behind = this.mates.filter((p) => p !== this.carrier && p.slot !== 'GK' &&
      angDiff(heading(up, p.pos), toBall) > 95 * DEG && p.pos.distanceTo(up) > 8 && p.pos.distanceTo(up) < 30);
    this.free = behind.length ? pick(behind) : null;
    this.freeDrift = new THREE.Vector3();
    if (this.free) {
      const near = this.nearestOpp(this.free.pos);
      if (near) this.freeDrift.copy(this.free.pos).sub(near.pos).setY(0).setLength(3);
    }

    // Pressers start in the blind spot and stalk the viewer until the ball comes.
    this.pressers = [];
    const taken = new Set();
    for (let i = 0; i < d.pressers; i++) {
      const a = toBall + Math.PI + (i === 0 ? rand(-45, 45) : (Math.random() < 0.5 ? -1 : 1) * rand(70, 100)) * DEG;
      const dist = rand(...d.presserDist) + i * 2;
      const spot = new THREE.Vector3(up.x + Math.sin(a) * dist, 0, up.z + Math.cos(a) * dist);
      spot.x = clamp(spot.x, -PITCH.HL + 1, PITCH.HL - 1);
      spot.z = clamp(spot.z, -PITCH.HW + 1, PITCH.HW - 1);
      const o = this.away.filter((p) => p.slot !== 'GK' && !taken.has(p))
        .sort((p, q) => p.pos.distanceTo(spot) - q.pos.distanceTo(spot))[0];
      taken.add(o);
      o.place(spot.x, spot.z);
      o.role = 'presser';
      o.stalk = spot.clone().sub(up);
      this.pressers.push(o);
    }

    // build-up passes
    this.passesLeft = Math.round(rand(d.passes[0], d.passes[1]));
    this.hold = rand(0.9, 1.4);
    this.receiver = null;
    this.finalStruck = false;

    this.scans = [];
    this.inScan = false;
    this.scanPeak = 0;
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
    this.t = 0;
    this.state = 'buildup';
    this.fx.whistle?.();
  }

  ballAt(p) {
    const f = new THREE.Vector3(Math.sin(p.heading), 0, Math.cos(p.heading)).multiplyScalar(0.45);
    this.world.ball.set(p.pos.x + f.x, p.pos.z + f.z);
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

  update(dt) {
    if (this.state === 'quiz' || this.state === 'done' || this.state === 'setup') return;
    this.t += dt;
    const w = this.world, ball = w.ball, d = this.diff;
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

    // --- targets
    const bp = ball.flight ? ball.flight.to : ball.pos;
    const offside = Math.min(...this.away.filter((p) => /CB|LB|RB/.test(p.slot)).map((p) => p.pos.x));
    this.home.forEach((p, i) => {
      if (i === this.userIdx) return;
      const t = homeTarget(this.F[i], bp.x, bp.z, offside);
      t.x += Math.sin(this.t * 0.6 + p.wobble) * 1.2;
      t.z += Math.cos(this.t * 0.5 + p.wobble) * 1.2;
      if (p === this.free) t.add(this.freeDrift);
      p.maxSpeed = 6.2;
      if (p === this.carrier && !ball.flight && this.state === 'buildup') { p.maxSpeed = 2.4; }
      if (this.receiver === p && ball.flight) t.copy(ball.flight.to);
      if (this.state === 'outcome' && this.outcomeTarget === p) t.copy(ball.flight ? ball.flight.to : ball.pos);
      p.target.copy(t);
    });

    const markable = [...this.mates.filter((p) => p !== this.free && p.slot !== 'GK'), { pos: user }];
    const carrierPos = this.state === 'buildup' ? this.carrier.pos : user;
    let closer = null, cd = Infinity;
    for (const o of this.away) {
      if (o.role === 'presser' || o.slot === 'GK') continue;
      const dd = o.pos.distanceTo(carrierPos);
      if (dd < cd) { cd = dd; closer = o; }
    }
    this.away.forEach((o, i) => {
      if (this.state === 'outcome' && o === this.outcomeTarget) {
        o.target.copy(ball.flight ? ball.flight.to : ball.pos);
        o.maxSpeed = 7;
        return;
      }
      if (o.role === 'presser') {
        if (!this.finalStruck) {
          o.target.copy(user).add(o.stalk);
          o.maxSpeed = 6;
        } else {
          // close down while the ball travels, then jockey a yard off until the window runs out
          const to = o.pos.clone().sub(user).setY(0);
          const hold = this.state === 'decide' ? 1.0 : 2.5;
          o.target.copy(user).add(to.setLength(hold));
          o.maxSpeed = this.state === 'decide' ? d.presserSpeed : d.presserSpeed * 0.7;
        }
        return;
      }
      let t = awayTarget(AWAY_442[i], bp.x, bp.z);
      if (o === closer && this.state === 'buildup' && !ball.flight) {
        const dir = o.pos.clone().sub(carrierPos).setY(0).normalize();
        t = carrierPos.clone().addScaledVector(dir, 2.2);
      } else if (o.slot !== 'GK') {
        let near = null, nd = 9;
        for (const h of markable) {
          const dd = Math.hypot(h.pos.x - t.x, h.pos.z - t.z);
          if (dd < nd) { nd = dd; near = h; }
        }
        if (near) t.lerp(new THREE.Vector3(near.pos.x + 1.6, 0, near.pos.z), 0.45);
        if (this.free) {
          const away = t.clone().sub(this.free.pos).setY(0);
          if (away.length() < 6.5) t.copy(this.free.pos).add(away.setLength(6.5));
        }
      }
      o.target.copy(t);
      o.maxSpeed = 6;
    });

    for (const p of this.home) if (p !== this.userBody) p.step(dt, ball.pos);
    for (const o of this.away) o.step(dt, ball.pos);

    // --- the viewer's run
    if (this.state === 'buildup' && this.motion) {
      const t = homeTarget(this.F[this.userIdx], bp.x, bp.z, offside).add(this.runOffset);
      const to = t.sub(user).setY(0);
      const dist = to.length();
      if (dist > 0.3) {
        to.setLength(Math.min(dist, 2.2 * dt));
        w.moveUser(to.x, to.z);
      }
    }
    this.userBody.pos.copy(w.userPos());
    this.userBody.heading = w.headYaw();

    // --- scanning
    if (this.state === 'buildup' || this.state === 'incoming') this.trackScan(user, ball);

    // --- decision window
    if (this.state === 'decide') {
      this.decideT += dt;
      this.updateAimGlow();
      if (this.decideT > this.window) {
        const p = [...this.pressers].sort((a, b) => a.pos.distanceTo(user) - b.pos.distanceTo(user))[0];
        this.lose(p);
      }
    } else if (this.state === 'incoming') {
      this.updateAimGlow();
    }

    if (this.state === 'outcome') {
      this.outcomeT -= dt;
      if (this.outcomeT <= 0) this.finish();
    }

    this.record(dt);
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
    from.heading = to ? heading(from.pos, to.pos) : heading(from.pos, user);
    this.ballAt(from);
    if (to) {
      const dist = to.pos.distanceTo(from.pos);
      const land = to.pos.clone().addScaledVector(to.vel, dist / 16 * 0.6);
      ball.kick(ball.pos, land, rand(15, 18), dist > LOFT_OVER ? dist * 0.1 : 0);
      this.receiver = to;
      this.events.push({ t: this.t, type: 'pass' });
      this.fx.kick?.(0.7);
    } else {
      // final ball to the viewer
      const dir = from.pos.clone().sub(user).setY(0).normalize();
      const land = user.clone().addScaledVector(dir, 0.6);
      const dist = land.distanceTo(from.pos);
      ball.kick(ball.pos, land, rand(14, 16.5), dist > LOFT_OVER ? dist * 0.08 : 0);
      this.receiver = null;
      this.finalStruck = true;
      this.state = 'incoming';
      this.strikeT = this.t;
      this.events.push({ t: this.t, type: 'final' });
      const toBall = heading(user, this.world.ball.pos);
      this.watchedStrike = angDiff(this.world.headYaw(), toBall) < 38 * DEG;
      this.strikeWatchUntil = this.t + 0.3;
      this.fx.kick?.(0.8);
    }
  }

  onArrive() {
    if (this.state === 'buildup' && this.receiver) {
      this.carrier = this.receiver;
      this.receiver = null;
      this.hold = rand(0.7, 1.3);
      this.fx.touch?.();
      return;
    }
    if (this.state === 'incoming') {
      const user = this.world.userPos();
      this.receiveT = this.t;
      this.events.push({ t: this.t, type: 'receive' });
      this.watchedTouch = angDiff(this.world.headYaw(), heading(user, this.world.ball.pos)) < 45 * DEG;
      this.fx.touch?.();
      if (this.inScan) this.closeScan();
      this.scanWindow = Math.max(0.5, this.receiveT - this.buildupStart);
      this.decideT = 0;
      this.knewPressure = this.sawPresser.every((s) => this.receiveT - s < 2.5);
      this.window = this.diff.window + (this.knewPressure ? 0.6 : 0);
      if (this.quizWanted) {
        this.snapshot = this.takeSnapshot(user);
        this.state = 'quiz';
        return;
      }
      this.enterDecide();
      return;
    }
    if (this.state === 'outcome') {
      this.outcomeArrived = true;
    }
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

  trackScan(user, ball) {
    const yaw = this.world.headYaw();
    const off = angDiff(yaw, heading(user, ball.pos));
    // A scan is the head turning away from the ball, not the ball moving past a still head.
    if (this.anchorYaw == null) this.anchorYaw = yaw;
    if (!this.inScan) {
      if (off < SCAN_OFF) this.anchorYaw = yaw;
      if (off > SCAN_ON && angDiff(yaw, this.anchorYaw) > 40 * DEG) {
        this.inScan = true;
        this.scanStart = this.t;
        this.scanPeak = off;
        this.scanPeakYaw = yaw;
        this.scanSide = Math.sign(Math.sin(yaw - heading(user, ball.pos)));
        this.fx.tick?.();
      }
    } else {
      if (off > this.scanPeak) { this.scanPeak = off; this.scanPeakYaw = yaw; }
      const cameBack = angDiff(yaw, this.scanPeakYaw) > 40 * DEG && angDiff(yaw, this.anchorYaw) < 25 * DEG;
      if (off < SCAN_OFF || cameBack) { this.closeScan(); this.anchorYaw = yaw; }
    }
    if (this.strikeWatchUntil && this.t < this.strikeWatchUntil && off < 38 * DEG) this.watchedStrike = true;
    this.pressers.forEach((p, i) => {
      if (angDiff(yaw, heading(user, p.pos)) < SEEN) this.sawPresser[i] = this.t;
    });
    if (this.free && angDiff(yaw, heading(user, this.free.pos)) < SEEN) this.lastSawFree = this.t;
  }

  closeScan() {
    this.inScan = false;
    if (this.t - this.scanStart < 0.18) return;
    // timing: during a pass or a dribble is fine, the moment the ball is struck towards you is not
    const ballMoving = !!this.world.ball.flight;
    this.scans.push({ t: this.scanStart, end: this.t, peak: this.scanPeak, side: this.scanSide, shoulder: this.scanPeak > 100 * DEG, ballMoving });
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
    const options = evaluateOptions(from, this.mates, this.away, this.role.group);
    const chosen = options.find((o) => o.kind === choice.kind && (o.kind === 'shot' || o.target === choice.target))
      || { kind: choice.kind, target: choice.target, value: 0 };
    this.options = options;
    this.chosen = chosen;
    this.decisionScore = scoreDecision(chosen, options);
    this.oneTouch = oneTouch;
    this.decideTime = this.decideT;
    this.events.push({ t: this.t, type: 'decide' });
    this.world.clearOverlays();
    this.fx.kick?.(1);

    let outcome, target;
    if (chosen.kind === 'pass') {
      const t = chosen.target;
      const dist = t.pos.distanceTo(from);
      const lofted = dist > LOFT_OVER;
      const speed = lofted ? 21 : 17;
      let worst = null, wm = Infinity;
      for (const o of this.away) {
        const m = laneMargin(from, t.pos, o.pos, speed, lofted) + rand(-0.15, 0.15);
        if (m < wm) { wm = m; worst = o; }
      }
      if (wm < 0 && worst) {
        outcome = 'intercepted';
        // ball meets the defender on the line
        const dx = t.pos.x - from.x, dz = t.pos.z - from.z, len2 = dx * dx + dz * dz;
        let k = ((worst.pos.x - from.x) * dx + (worst.pos.z - from.z) * dz) / len2;
        k = clamp(k, lofted ? 0.8 : 0.08, 1);
        const pt = new THREE.Vector3(from.x + dx * k, 0, from.z + dz * k);
        ball.kick(from, pt, speed, lofted ? dist * 0.09 * k : 0);
        target = worst;
      } else {
        outcome = chosen.space < 0.25 ? 'tight' : 'completed';
        const land = t.pos.clone().addScaledVector(t.vel, dist / speed * 0.5);
        ball.kick(from, land, speed, lofted ? dist * 0.09 : 0);
        target = t;
      }
    } else {
      const aimZ = clamp(from.z * -0.15 + rand(-2.4, 2.4), -3.2, 3.2);
      const gk = this.away.find((o) => o.slot === 'GK');
      if (chosen.open < 0.3) {
        outcome = 'blocked';
        const blocker = this.away.filter((o) => o.slot !== 'GK').sort((a, b) => a.pos.distanceTo(from) - b.pos.distanceTo(from))[0];
        ball.kick(from, blocker.pos.clone(), 24, 0.4);
        target = blocker;
      } else if (chosen.quality * (0.4 + 0.6 * chosen.open) + rand(0, 0.35) > 0.55) {
        outcome = 'goal';
        ball.kick(from, new THREE.Vector3(GOAL.x + 1.2, 0, aimZ), 27, rand(0.3, 1.4));
        target = null;
      } else {
        outcome = 'saved';
        ball.kick(from, new THREE.Vector3(GOAL.x - 0.6, 0, aimZ * 0.7), 27, 0.6);
        target = gk;
      }
    }
    this.outcome = outcome;
    this.outcomeTarget = target;
    this.state = 'outcome';
    this.outcomeT = 2.2;
    w.setLine(w.choiceLine, null, null);
  }

  lose(presser) {
    this.options = evaluateOptions(this.world.ball.pos.clone(), this.mates, this.away, this.role.group);
    this.chosen = null;
    this.decisionScore = 0;
    this.decideTime = this.decideT;
    this.outcome = 'lost';
    this.outcomeTarget = presser;
    const ball = this.world.ball;
    const away = presser.pos.clone().add(new THREE.Vector3(-8, 0, rand(-4, 4)));
    ball.kick(ball.pos.clone(), away, 7, 0);
    presser.target.copy(away);
    this.events.push({ t: this.t, type: 'lost' });
    this.state = 'outcome';
    this.outcomeT = 2;
    this.world.clearOverlays();
    this.fx.groan?.();
  }

  finish() {
    if (this.inScan) this.closeScan();
    const d = this.diff;
    const before = this.scans.filter((s) => s.t < (this.receiveT ?? this.t));
    const scans = before.length;
    const scanScore = Math.round(Math.min(1, scans / d.scanTarget) * 60 + (this.knewPressure ? 20 : 0) + (this.watchedStrike ? 10 : 0) + (this.watchedTouch ? 10 : 0));
    const quiz = this.memory != null;
    const decision = this.decisionScore || 0;
    const total = Math.round(quiz ? scanScore * 0.3 + decision * 0.45 + this.memory * 0.25 : scanScore * 0.4 + decision * 0.6);
    const goodOutcome = ['completed', 'goal'].includes(this.outcome);
    if (goodOutcome) this.fx.cheer?.(this.outcome === 'goal' ? 1 : 0.4);
    else if (this.outcome !== 'lost') this.fx.groan?.();
    this.result = {
      role: this.roleKey,
      scans,
      scanTarget: d.scanTarget,
      scanRate: scans / (this.scanWindow || 1),
      shoulder: before.filter((s) => s.shoulder).length,
      watchedStrike: this.watchedStrike,
      watchedTouch: this.watchedTouch,
      sawPresser: !!this.knewPressure,
      sawFree: !this.free || (this.receiveT ?? this.t) - this.lastSawFree < 4,
      scanScore,
      decision,
      memory: quiz ? this.memory : null,
      total,
      outcome: this.outcome,
      oneTouch: !!this.oneTouch,
      decideTime: this.decideTime,
      chosen: this.chosen,
      best: this.options?.[0] || null,
    };
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
    for (const p of [...this.home, ...this.away]) {
      f[k++] = p === this.userBody ? u.x : p.pos.x;
      f[k++] = p === this.userBody ? u.z : p.pos.z;
      f[k++] = p === this.userBody ? w.headYaw() : p.heading;
    }
    this.frames.push({ t: this.t, f });
  }
}


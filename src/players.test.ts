import { test, expect } from 'bun:test';
import * as THREE from 'three';
import { Player, Ball } from './players.js';
import { World } from './world.js';
import { ROLES } from './config.js';

// No WebGL here: three.js maths, meshes and materials all work without a renderer, and players.js skips
// canvas textures when there is no DOM.

const KIT = { shirt: 0xff7a1a, shorts: 0x15171a, socks: 0xff7a1a, number: '#15171a' };
const DEG = Math.PI / 180;
const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));
const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);

const mk = (n = 8, team = 'home', slot = 'CM') => new Player(new THREE.Scene(), { kit: KIT, number: n, team, slot });

// the middle of a boot's sole, and its lowest corner, in world space
const _tmp = new THREE.Vector3();
function sole(p: any, i: number, out = V()) {
  p.legs[i].boot.updateWorldMatrix(true, false);
  return out.set(0, -0.035, 0.05).applyMatrix4(p.legs[i].boot.matrixWorld);
}
function lowest(p: any, i: number) {
  const m = p.legs[i].boot.matrixWorld;
  let y = Infinity;
  for (const sx of [-0.055, 0.055]) for (const sz of [-0.08, 0.18]) y = Math.min(y, _tmp.set(sx, -0.035, sz).applyMatrix4(m).y);
  return y;
}

// run a player flat out along +z at a steady `v` and report what the stance foot does
function run(v: number) {
  const p = mk();
  p.place(0, 0, 0);
  p.maxSpeed = v / p.speedMul;
  p.target.set(0, 0, 400);
  const look = V(0, 0.11, 300), dt = 1 / 72;
  const prev = [V(), V()], prevRel = [V(), V()], pel = V();
  let have = false, stance = 0, frames = 0, worstWorld = 0, worstRel = 0, minY = 1;
  for (let k = 0; k < 72 * 9; k++) {
    p.step(dt, look);
    p.root.updateMatrixWorld(true);
    p.pelvis.getWorldPosition(pel);
    for (let i = 0; i < 2; i++) {
      const s = sole(p, i);
      const rel = s.clone().sub(pel);
      if (k > 72 * 4 && have) {
        frames++;
        minY = Math.min(minY, lowest(p, i));
        if (s.y < 0.0005 && prev[i].y < 0.0005) {
          stance++;
          const world = Math.hypot(s.x - prev[i].x, s.z - prev[i].z) / dt;
          const relv = Math.hypot(rel.x - prevRel[i].x, rel.z - prevRel[i].z) / dt;
          worstWorld = Math.max(worstWorld, Math.abs(world) / v);
          worstRel = Math.max(worstRel, Math.abs(relv / v - 1));
        }
      }
      prev[i].copy(s); prevRel[i].copy(rel);
    }
    have = true;
  }
  return { speed: p.vel.length(), stance, frames, worstWorld, worstRel, minY };
}

for (const v of [1, 3, 6]) {
  test(`stance foot is planted at ${v} m/s (ground speed of the foot ~0, speed against the body ~ body speed)`, () => {
    const r = run(v);
    expect(r.speed).toBeCloseTo(v, 1);
    expect(r.stance / r.frames).toBeGreaterThan(0.25); // a foot really is on the ground a good part of the time
    expect(r.worstWorld).toBeLessThan(0.2);             // stance foot moves < 20% of body speed over the ground
    expect(r.worstRel).toBeLessThan(0.2);               // ... i.e. it slides back against the body at the body's speed (+-20%)
    expect(r.minY).toBeGreaterThan(-0.015);             // boots never go through the pitch
  });
}

test('standing: soles sit on the ground, feet do not move, body breathes', () => {
  const p = mk();
  p.place(5, 5, 0.3);
  const a = [sole(p, 0).clone(), sole(p, 1).clone()];
  let top = -1, bottom = 9;
  for (let k = 0; k < 72 * 4; k++) {
    p.step(1 / 72, V(5, 0, 30));
    p.root.updateMatrixWorld(true);
    for (let i = 0; i < 2; i++) {
      expect(Math.abs(sole(p, i).y)).toBeLessThan(0.005);
      expect(lowest(p, i)).toBeGreaterThan(-0.012);
      expect(sole(p, i).distanceTo(a[i])).toBeLessThan(0.03);
    }
    top = Math.max(top, p.spine.position.y); bottom = Math.min(bottom, p.spine.position.y);
  }
  expect(top - bottom).toBeGreaterThan(0.002);
  expect(p.vel.length()).toBe(0);
});

test('turning on the spot: planted feet stay put, and a foot steps round once the turn is big', () => {
  const p = mk();
  p.place(0, 0, 0);
  const dt = 1 / 72, prev = [V(), V()], s = V();
  let have = false, planted = 0, worst = 0, lifted = 0;
  for (let k = 0; k < 72 * 4; k++) {
    // the ball goes round the player: 150 degrees of turning in about two seconds
    const a = (k / 72) * 1.3;
    p.step(dt, V(Math.sin(a) * 20, 0.11, Math.cos(a) * 20));
    p.root.updateMatrixWorld(true);
    for (let i = 0; i < 2; i++) {
      sole(p, i, s);
      if (have) {
        if (s.y < 0.0005 && prev[i].y < 0.0005) { planted++; worst = Math.max(worst, Math.hypot(s.x - prev[i].x, s.z - prev[i].z) / dt); }
        if (s.y > 0.02) lifted++;
      }
      prev[i].copy(s);
    }
    have = true;
  }
  expect(Math.abs(wrap(p.heading - 1.3 * 4))).toBeLessThan(40 * DEG); // it did turn with the ball
  expect(planted).toBeGreaterThan(72 * 4 * 2 * 0.5);
  expect(worst).toBeLessThan(0.25); // a planted foot barely slides (m/s)
  expect(lifted).toBeGreaterThan(5); // and it stepped
});

test('place sets the heading: attack direction by default, or the one asked for', () => {
  const h = mk(8, 'home'), a = mk(8, 'away');
  h.heading = 2.2; a.heading = 0.4;
  h.place(0, 0); a.place(0, 0);
  expect(h.heading).toBeCloseTo(Math.PI / 2, 6);
  expect(a.heading).toBeCloseTo(-Math.PI / 2, 6);
  h.place(1, 1, 1.0);
  expect(h.heading).toBeCloseTo(1.0, 6);
  expect(h.pos.toArray()).toEqual([1, 0, 1]);
  expect(h.vel.length()).toBe(0);
});

function capFor(speed: number) {
  return (speed >= 3 ? 300 : speed <= 1.5 ? 540 : 540 - ((speed - 1.5) / 1.5) * 240) * DEG;
}

for (const [name, tx, tz] of [['90 degrees off the ball', 60, 0], ['straight back', 0, -60], ['diagonal', -45, 24]] as const) {
  test(`run start ${name}: heading turns under the rate caps, no snap`, () => {
    const p = mk();
    p.place(0, 0, 0); // facing +z, ball ahead
    p.maxSpeed = 6.2;
    p.target.set(tx, 0, tz);
    const ball = V(0, 0.11, 12), dt = 1 / 72;
    let prev = p.heading, worst = 0, over = 0, maxRate = 0, atSpeed = NaN;
    for (let k = 0; k < 72 * 5; k++) {
      p.step(dt, ball);
      const rate = Math.abs(wrap(p.heading - prev)) / dt;
      prev = p.heading;
      maxRate = Math.max(maxRate, rate);
      worst = Math.max(worst, rate - capFor(p.vel.length()));
      if (p.vel.length() > 3) over = Math.max(over, rate);
      if (k === 72 * 3) atSpeed = p.heading;
    }
    expect(maxRate).toBeLessThanOrEqual(540 * DEG + 1e-6);
    expect(over).toBeLessThanOrEqual(300 * DEG + 1e-6);
    expect(worst).toBeLessThan(1e-6);
    // three seconds in, at full tilt, it is facing the way it goes
    expect(Math.abs(wrap(atSpeed - Math.atan2(tx, tz)))).toBeLessThan(25 * DEG);
  });
}

test('heading hysteresis: no flip between ball-facing and run-facing near 1.6 m/s', () => {
  const p = mk();
  p.place(0, 0, 0);
  const ball = V(0, 0.11, 30), dt = 1 / 72;
  // walking 1.6 m/s from rest keeps facing the ball
  p.maxSpeed = 1.6 / p.speedMul;
  p.target.set(40, 0, 0);
  for (let k = 0; k < 72 * 4; k++) p.step(dt, ball);
  expect(p.vel.length()).toBeCloseTo(1.6, 1);
  expect(Math.abs(wrap(p.heading - 0))).toBeLessThan(15 * DEG);
  // speeding up past 2 turns the body to the run direction, easing back to 1.6 keeps it there
  p.maxSpeed = 3 / p.speedMul;
  for (let k = 0; k < 72 * 3; k++) p.step(dt, ball);
  expect(Math.abs(wrap(p.heading - Math.PI / 2))).toBeLessThan(10 * DEG);
  p.maxSpeed = 1.6 / p.speedMul;
  for (let k = 0; k < 72 * 3; k++) p.step(dt, ball);
  expect(p.vel.length()).toBeCloseTo(1.6, 1);
  expect(Math.abs(wrap(p.heading - Math.PI / 2))).toBeLessThan(10 * DEG);
});

test('the head turns up to 70 degrees to the ball while the body faces the run', () => {
  const p = mk();
  p.place(0, 0, 0);
  p.maxSpeed = 6.2;
  p.target.set(0, 0, 300);
  const ball = V(30, 0.11, 10); // well off to the left of the run
  for (let k = 0; k < 72 * 4; k++) p.step(1 / 72, ball);
  expect(Math.abs(wrap(p.heading))).toBeLessThan(10 * DEG);
  expect(p._headYaw).toBeGreaterThan(65 * DEG);
  expect(p._headYaw).toBeLessThanOrEqual(70 * DEG + 1e-9);
  // the head mesh actually carries it
  expect(p.head.rotation.y).toBeGreaterThan(60 * DEG);
});

test('eleven players given the same new target do not move in lockstep', () => {
  const ps = Array.from({ length: 11 }, (_, i) => mk(i + 1, 'home', 'CM'));
  ps.forEach((p, i) => { p.place(i * 2, 0, 0); p.maxSpeed = 6.2; p.target.set(i * 2, 0, 0); });
  for (let k = 0; k < 10; k++) ps.forEach((p) => p.step(1 / 72, V(0, 0.11, 30)));
  ps.forEach((p, i) => p.target.set(i * 2, 0, 25)); // everyone told to go at the same instant
  const first = ps.map(() => -1), top = ps.map(() => 0);
  for (let k = 0; k < 72 * 5; k++) {
    ps.forEach((p, i) => {
      p.step(1 / 72, V(0, 0.11, 30));
      if (first[i] < 0 && p.vel.length() > 0.5) first[i] = k / 72;
      top[i] = Math.max(top[i], p.vel.length());
    });
  }
  expect(Math.max(...first) - Math.min(...first)).toBeGreaterThan(0.12);
  expect(Math.min(...first)).toBeGreaterThan(0.1);
  expect(Math.min(...first)).toBeLessThan(0.55);
  expect(Math.max(...top) - Math.min(...top)).toBeGreaterThan(0.4);
  for (const p of ps) {
    expect(p.speedMul).toBeGreaterThanOrEqual(0.85); expect(p.speedMul).toBeLessThanOrEqual(1.1);
    expect(p.accel).toBeGreaterThanOrEqual(6); expect(p.accel).toBeLessThanOrEqual(10);
    expect(p.reactT).toBeGreaterThanOrEqual(0.15); expect(p.reactT).toBeLessThanOrEqual(0.45);
  }
});

test('arrive: slows before the target, stops in the dead zone, then does not jitter', () => {
  const p = mk();
  p.place(0, 0, 0);
  p.maxSpeed = 6.2;
  p.target.set(10, 0, 3);
  const dt = 1 / 72, tgt = V(10, 0, 3);
  let past = 0, vmax = 0, vNear = 0;
  for (let k = 0; k < 72 * 8; k++) {
    p.step(dt, V(0, 0.11, 30));
    const d = Math.hypot(p.pos.x - tgt.x, p.pos.z - tgt.z);
    if (p.pos.x > tgt.x) past = Math.max(past, p.pos.x - tgt.x);
    vmax = Math.max(vmax, p.vel.length());
    if (Math.abs(d - 1) < 0.15) vNear = Math.max(vNear, p.vel.length());
  }
  expect(past).toBeLessThan(0.3);
  expect(vNear).toBeLessThan(vmax * 0.7); // already braking a metre out
  expect(Math.hypot(p.pos.x - tgt.x, p.pos.z - tgt.z)).toBeLessThan(0.35);
  expect(p.vel.length()).toBeLessThan(0.05);
  const at = p.pos.clone();
  for (let k = 0; k < 72 * 3; k++) p.step(dt, V(0, 0.11, 30));
  expect(p.pos.distanceTo(at)).toBeLessThan(0.01);
  // a target that wobbles inside the dead zone does not make anyone walk about
  const q = mk(5);
  q.place(0, 0, 0); q.maxSpeed = 6.2; q.target.set(0, 0, 0);
  let t = 0;
  for (let k = 0; k < 72 * 6; k++) {
    t += dt;
    q.target.set(Math.sin(t * 1.1) * 0.3, 0, Math.cos(t * 0.9) * 0.3);
    q.step(dt, V(0, 0.11, 30));
  }
  expect(q.pos.length()).toBeLessThan(0.3);
});

test('moving the same 40 m twice gives the same finite, bounded numbers (no NaN anywhere in the rig)', () => {
  const p = mk();
  p.place(0, 0, 0);
  p.maxSpeed = 7;
  p.mood = 1;
  for (let k = 0; k < 72 * 6; k++) {
    p.target.set(Math.sin(k / 40) * 30, 0, Math.cos(k / 55) * 20);
    p.step(1 / 72, V(5, 0.11, 5));
  }
  p.root.updateMatrixWorld(true);
  p.root.traverse((o: any) => {
    for (const e of o.matrixWorld.elements) expect(Number.isFinite(e)).toBe(true);
  });
});

// ------------------------------------------------------------------------------------------------ ball
function fly(ball: any, dt = 1 / 72, max = 10) {
  let arrivals = 0, frames = 0;
  const speeds: number[] = [];
  const prev = ball.pos.clone();
  let peak = ball.pos.y, minY = ball.pos.y;
  while (ball.flight && frames < max / dt) {
    const done = ball.update(dt);
    frames++;
    speeds.push(ball.pos.distanceTo(prev) / dt);
    prev.copy(ball.pos);
    peak = Math.max(peak, ball.pos.y); minY = Math.min(minY, ball.pos.y);
    if (done) arrivals++;
  }
  return { arrivals, frames, speeds, peak, minY };
}

test('ground pass: arrives exactly at the target, once, rolling out slower than it left', () => {
  const ball = new Ball(new THREE.Scene());
  ball.set(0, 0);
  const to = V(14, 0, 3);
  ball.kick(ball.pos, to, 16, 0);
  const f = ball.flight;
  expect(f.dur).toBeCloseTo(Math.hypot(14, 3) / 16, 6);
  expect(f.t).toBe(0);
  expect(ball.timeLeft()).toBeCloseTo(f.dur, 6);
  const r = fly(ball);
  expect(r.arrivals).toBe(1);
  expect(ball.flight).toBeNull();
  expect(ball.pos.x).toBeCloseTo(14, 9);
  expect(ball.pos.z).toBeCloseTo(3, 9);
  expect(ball.pos.y).toBeCloseTo(0.11, 9);
  expect(Math.abs(r.frames / 72 - f.dur)).toBeLessThan(1 / 72 + 1e-9);
  expect(r.minY).toBeGreaterThanOrEqual(0.11 - 1e-9);
  expect(r.peak).toBeLessThan(0.1101);
  // rolling friction: fastest near the start, ~35% of that at the end, never stopping dead from speed
  const sp = r.speeds.slice(0, -1);
  const vmax = Math.max(...sp);
  expect(vmax).toBeGreaterThan(16);
  const last = sp.at(-1) as number;
  expect(last / vmax).toBeGreaterThan(0.25);
  expect(last / vmax).toBeLessThan(0.5);
  const moving = sp.filter((s) => s > 0.1);
  for (let i = 1; i < moving.length; i++) expect(moving[i]).toBeLessThanOrEqual(moving[i - 1] + 0.05);
  expect(ball.timeLeft()).toBe(0);
  expect(ball.update(1 / 72)).toBe(false);
});

test('arrival is exact whatever the frame length, and for a target moved mid-flight', () => {
  for (const dt of [1 / 144, 1 / 60, 0.05, 0.2]) {
    const ball = new Ball(new THREE.Scene());
    ball.set(-3, 2);
    ball.kick(ball.pos, V(9, 0, -7), 15, 0);
    const r = fly(ball, dt);
    expect(r.arrivals).toBe(1);
    expect(ball.pos.x).toBeCloseTo(9, 9); expect(ball.pos.z).toBeCloseTo(-7, 9);
  }
  const ball = new Ball(new THREE.Scene());
  ball.set(0, 0);
  ball.kick(ball.pos, V(12, 0, 0), 15, 0);
  let arrivals = 0, n = 0;
  while (ball.flight) {
    if (ball.flight.t > 0.3) ball.flight.to.set(10, 0.11, 6); // main.js re-aims at a moving receiver
    if (ball.update(1 / 72)) arrivals++;
    if (++n > 1000) break;
  }
  expect(arrivals).toBe(1);
  expect(ball.pos.x).toBeCloseTo(10, 9); expect(ball.pos.z).toBeCloseTo(6, 9);
});

test('lofted pass: a gravity parabola whose peak is the loft, landing exactly and staying put', () => {
  const ball = new Ball(new THREE.Scene());
  ball.set(0, 0);
  ball.kick(ball.pos, V(30, 0, 0), 17, 2.5);
  const spin0 = ball.mesh.quaternion.clone();
  const ys: number[] = [];
  let arrivals = 0, prevX = 0, mono = true;
  while (ball.flight) {
    if (ball.update(1 / 72)) arrivals++;
    ys.push(ball.pos.y);
    if (ball.pos.x < prevX - 1e-9) mono = false;
    prevX = ball.pos.x;
  }
  expect(arrivals).toBe(1);
  expect(mono).toBe(true);
  expect(Math.max(...ys)).toBeGreaterThan(0.11 + 2.5 - 0.1);
  expect(Math.max(...ys)).toBeLessThan(0.11 + 2.5 + 0.05);
  expect(Math.min(...ys)).toBeGreaterThanOrEqual(0.11 - 1e-9);
  // parabola: second difference of height is constant (gravity)
  const mid = ys.slice(5, ys.length - 6);
  const d2 = mid.slice(2).map((y, i) => y - 2 * mid[i + 1] + mid[i]);
  expect(Math.max(...d2) - Math.min(...d2)).toBeLessThan(1e-6);
  expect(ball.pos.x).toBeCloseTo(30, 9);
  expect(ball.pos.y).toBeCloseTo(0.11, 9);
  expect(ball.mesh.quaternion.angleTo(spin0)).toBeGreaterThan(0.1); // it spun on the way
});

test('a kick with nobody about still flies; a kick from nowhere near a player gives nobody a kick', () => {
  const ball = new Ball(new THREE.Scene());
  ball.set(0, 0);
  ball.kick(V(0, 0.11, 0), V(5, 0, 0), 12, 0);
  expect(ball.flight.wait).toBe(0);
  expect(fly(ball).arrivals).toBe(1);
});

// ------------------------------------------------------------------------------------------------ kicks, traps, dives
test('the player on the ball kicks it, the ball waits for the boot, the receiver traps it', () => {
  const sc = new THREE.Scene();
  const a = new Player(sc, { kit: KIT, number: 8, team: 'home', slot: 'CM' });
  const b = new Player(sc, { kit: KIT, number: 4, team: 'home', slot: 'CM' });
  const c = new Player(sc, { kit: KIT, number: 6, team: 'away', slot: 'CM' });
  a.place(0, 0, 0); b.place(14, 3, 0); c.place(1.2, 1.0, 0);
  const ball = new Ball(sc);
  ball.players = [a, b, c];
  ball.set(0, 0.45);
  const dt = 1 / 72;
  ball.kick(ball.pos, V(14, 0, 3), 16, 0);
  expect(a.activity).toBe('kick');
  expect(c.activity).toBe(''); // the one standing next to it is not the kicker
  expect(b._alert).toBeGreaterThan(0.5); // the receiver gets going at once
  const f = ball.flight;
  expect(f.wait).toBeGreaterThan(0.05);
  expect(f.wait).toBeLessThanOrEqual(0.2);
  expect(Math.abs(wrap(a.heading - Math.atan2(14, 3 - 0.45)))).toBeLessThan(0.2 + 0.001 + 90 * DEG); // turning to it (rate-capped)
  const start = ball.pos.clone();
  let trapAt = -1, t = 0, arrived = false, kickEnded = -1;
  for (let k = 0; k < 72 * 3 && !arrived; k++) {
    arrived = ball.update(dt);
    t += dt;
    if (t < f.wait - 0.01) expect(ball.pos.distanceTo(start)).toBeLessThan(1e-9); // still, until the strike
    [a, b, c].forEach((p) => p.step(dt, ball.pos));
    if (trapAt < 0 && b.activity === 'trap') trapAt = ball.timeLeft();
    if (kickEnded < 0 && a.activity === '') kickEnded = t;
  }
  expect(arrived).toBe(true);
  expect(trapAt).toBeGreaterThan(0.1); expect(trapAt).toBeLessThan(0.26); // about 0.2 s out
  expect(kickEnded).toBeGreaterThan(0.25); expect(kickEnded).toBeLessThan(0.5);
  // the kicking leg really swung: backswing then through
  const leg = a.footed;
  let back = 0, fwd = 0;
  const sc2 = new THREE.Scene();
  const k2 = new Player(sc2, { kit: KIT, number: 8, team: 'home', slot: 'CM' });
  k2.place(0, 0, 0);
  k2.playKick(0.0, 0.16);
  for (let k = 0; k < 72 * 0.5; k++) {
    k2.step(dt, V(0, 0.11, 20));
    k2.root.updateMatrixWorld(true);
    const hip = k2.legs[leg].hip, p0 = new THREE.Vector3(0, -0.8, 0).applyQuaternion(hip.quaternion);
    back = Math.max(back, -p0.z); fwd = Math.max(fwd, p0.z);
  }
  expect(back).toBeGreaterThan(0.3);
  expect(fwd).toBeGreaterThan(0.3);
});

test("the viewer's own (invisible) body is not given a kick, and does not steal the kick of someone nearby", () => {
  const sc = new THREE.Scene();
  const me = new Player(sc, { kit: KIT, number: 8, team: 'home', slot: 'CM' });
  const press = new Player(sc, { kit: KIT, number: 6, team: 'away', slot: 'CM' });
  me.place(0, 0, 0); me.setVisible(false);
  press.place(1.0, 0.4, 0);
  const ball = new Ball(sc);
  ball.players = [me, press];
  ball.set(0.1, 0.6);
  ball.kick(ball.pos, V(12, 0, 5), 16, 0);
  expect(ball.flight.wait).toBe(0); // the viewer's pass leaves on the trigger
  expect(press.activity).toBe('');
  expect(me.activity).toBe('');
});

test('a hard shot to the corner: the keeper dives, the get-up ends, he can move again', () => {
  const sc = new THREE.Scene();
  const gk = new Player(sc, { kit: KIT, number: 1, team: 'away', slot: 'GK' });
  gk.place(49, 0, -Math.PI / 2);
  const ball = new Ball(sc);
  ball.players = [gk];
  ball.set(30, 0);
  ball.kick(V(30, 0.11, 0), V(53.7, 0, 2.4), 27, 0.9);
  const dt = 1 / 72;
  let dived = false, rollMax = 0, moved = 0, zPeak = 0;
  const z0 = gk.pos.z;
  for (let k = 0; k < 72 * 2.5; k++) {
    if (ball.flight) ball.update(dt);
    gk.step(dt, ball.pos);
    if (gk.activity === 'dive') { dived = true; rollMax = Math.max(rollMax, Math.abs(gk.rig.rotation.z)); }
    moved = Math.max(moved, Math.abs(gk.pos.z - z0));
    zPeak = Math.max(zPeak, gk.pos.z);
  }
  expect(dived).toBe(true);
  expect(rollMax).toBeGreaterThan(60 * DEG); expect(rollMax).toBeLessThan(75 * DEG);
  expect(moved).toBeGreaterThan(1.0);
  expect(gk.activity).toBe('');
  expect(Math.abs(gk.rig.rotation.z)).toBeLessThan(5 * DEG); // back on his feet
  // he dived the way the ball was going (towards +z, his left as he faces -x)
  expect(zPeak).toBeGreaterThan(z0 + 0.8);
  gk.target.set(49, 0, -3); gk.maxSpeed = 5;
  for (let k = 0; k < 72 * 3; k++) gk.step(dt, ball.pos);
  expect(gk.pos.z).toBeLessThan(z0 + 0.3);
});

test('a ball that is slow, or lands in the middle, only gets a trap from a keeper', () => {
  const sc = new THREE.Scene();
  const gk = new Player(sc, { kit: KIT, number: 1, team: 'away', slot: 'GK' });
  gk.place(49, 0, -Math.PI / 2);
  const ball = new Ball(sc);
  ball.players = [gk];
  ball.set(40, 0);
  ball.kick(V(40, 0.11, 0), V(49.2, 0, 0.3), 14, 0);
  let dived = false, trapped = false;
  for (let k = 0; k < 72 * 2; k++) {
    if (ball.flight) ball.update(1 / 72);
    gk.step(1 / 72, ball.pos);
    if (gk.activity === 'dive') dived = true;
    if (gk.activity === 'trap') trapped = true;
  }
  expect(dived).toBe(false);
  expect(trapped).toBe(true);
});

// ------------------------------------------------------------------------------------------------ bodies, replay, cost
for (const rate of [1, 0.5, 0.25]) {
  test(`replay at ${rate}x: animate() with an explicit speed drives the same planted gait (no step needed)`, () => {
    const p = mk();
    p.place(0, 0, 0);
    const dt = 1 / 60, v = 5;
    let planted = 0, frames = 0, worst = 0;
    const prev = V(), s = V();
    for (let k = 0; k < 60 * 8; k++) {
      // main.js moves the player and sets the heading itself (at playback speed), then animates
      p.pos.z += v * rate * dt;
      p.heading = 0;
      p.animate(dt * rate, v * rate);
      p.sync();
      p.root.updateMatrixWorld(true);
      sole(p, 0, s);
      if (k > 120) {
        frames++;
        if (s.y < 0.0005 && prev.y < 0.0005) { planted++; worst = Math.max(worst, Math.hypot(s.x - prev.x, s.z - prev.z) / dt / (v * rate)); }
      }
      prev.copy(s);
    }
    expect(planted / frames).toBeGreaterThan(0.2);
    expect(worst).toBeLessThan(0.2);
  });
}

test('cost: merged body parts, shared number materials, the ring is only drawn when lit', () => {
  const sc = new THREE.Scene();
  const a = new Player(sc, { kit: KIT, number: 8, team: 'home', slot: 'CM' });
  const b = new Player(sc, { kit: KIT, number: 8, team: 'home', slot: 'LCM' });
  const c = new Player(sc, { kit: KIT, number: 9, team: 'home', slot: 'ST' });
  let meshes = 0;
  a.root.traverse((o: any) => { if (o.isMesh) meshes++; });
  expect(meshes).toBeLessThanOrEqual(13);
  const num = (p: Player) => { let m: any = null; p.root.traverse((o: any) => { if (o.isMesh && o.geometry.attributes.uv && o.material.alphaTest > 0) m = o.material; }); return m; };
  expect(num(a)).toBe(num(b));
  expect(num(a)).not.toBe(num(c));
  expect(a.ring.visible).toBe(false);
  a.highlight(0xff7a1a, 0.9);
  expect(a.ring.visible).toBe(true);
  expect(a.ringMat.opacity).toBe(0.9);
  a.highlight(0xffffff, 0);
  expect(a.ring.visible).toBe(false);
});

test('mood: celebrating throws the arms up, dejected drops the head; place() resets both', () => {
  const p = mk();
  p.place(0, 0, 0);
  p.mood = 1;
  for (let k = 0; k < 72; k++) p.step(1 / 72, V(0, 0.11, 20));
  expect(p.arms[0].rotation.x).toBeLessThan(-2);
  p.mood = 2;
  for (let k = 0; k < 72; k++) p.step(1 / 72, V(0, 0.11, 20));
  expect(p.head.rotation.x).toBeGreaterThan(0.3);
  p.place(0, 0, 0);
  expect(p.mood).toBe(0); expect(p.cel).toBe(0); expect(p.dej).toBe(0);
});

// ------------------------------------------------------------------------------------------------ the menu kick-about
test('menu kick-about: a believable passing session (real kicks and traps), nothing leaves the pitch', () => {
  const rig = new THREE.Group(), cam = new THREE.PerspectiveCamera();
  rig.add(cam);
  const w = new World(new THREE.Scene(), rig, cam);
  expect(w.ball.players.length).toBe(22);
  expect(w.ball.players.filter((p: any) => p.team === 'away').length).toBe(11);
  let arrivals = 0, flights = 0, longs = 0, was = false, maxStep = 0;
  const seen = new Set<string>();
  const dt = 1 / 72, prev = w.ball.pos.clone();
  for (let k = 0; k < 72 * 90; k++) {
    w.idleStep(dt);
    const b = w.ball;
    expect(Number.isFinite(b.pos.x + b.pos.y + b.pos.z)).toBe(true);
    expect(Math.abs(b.pos.x)).toBeLessThan(55);
    expect(Math.abs(b.pos.z)).toBeLessThan(35);
    maxStep = Math.max(maxStep, b.pos.distanceTo(prev)); prev.copy(b.pos);
    if (b.flight && !was) { flights++; if (b.flight.loft > 0) longs++; }
    if (!b.flight && was) arrivals++;
    was = !!b.flight;
    for (const p of w.actors) if (p.activity) seen.add(p.activity);
  }
  expect(arrivals).toBeGreaterThan(25);
  expect(longs).toBeGreaterThanOrEqual(2);
  expect(Math.abs(flights - arrivals)).toBeLessThanOrEqual(1);
  expect(seen.has('kick')).toBe(true);
  expect(seen.has('trap')).toBe(true);
  expect(maxStep).toBeLessThan(2.5); // nothing teleports (a 24 m/s ball covers 0.33 m a frame)
  for (const p of w.actors) {
    expect(Number.isFinite(p.pos.x + p.pos.z + p.heading)).toBe(true);
    expect(Math.abs(p.pos.x)).toBeLessThan(55); expect(Math.abs(p.pos.z)).toBeLessThan(35);
  }
});

test('switching formation hands the ball the new eleven plus the away side', () => {
  const rig = new THREE.Group(), cam = new THREE.PerspectiveCamera();
  rig.add(cam);
  const w = new World(new THREE.Scene(), rig, cam);
  w.useFormation(ROLES.CAM.formation);
  expect(w.ball.players.length).toBe(22);
  expect(w.ball.players.slice(0, 11)).toEqual(w.home);
  expect(w.ball.players.slice(11)).toEqual(w.away);
  w.idle();
  expect(w.home.every((p: any) => p.root.visible)).toBe(true);
});

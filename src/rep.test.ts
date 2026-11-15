import { test, expect } from 'bun:test';
import * as THREE from 'three';
import {
  Rep, timingScore, classifyCritical, criticalScore, scanRate10, rateScore, bodyShape, informationScore, scanComposite,
  speedFactor, totalScore, offsideLine, PAR, AWARE_BONUS,
} from './rep.js';
import {
  evaluateOptions, passProbability, shotXG, shotAim, scoreDecision, laneMargin, linesBroken, GAIN_FLOOR, turnoverLoss, LOSS_OWN, LOSS_ATT,
} from './eval.js';
import { ROLES, AWAY_442, DIFFICULTY } from './config.js';

const DEG = Math.PI / 180;
const scan = (t: number, end: number, extra: any = {}) => ({ t, end, ...extra });

// --- pure metric helpers --------------------------------------------------------------------

test('timing: a scan overlapping [touch-0.10, touch+0.15] is bad, boundaries are clear', () => {
  const touches = [{ t: 2.0 }];
  const s1 = scan(1.6, 1.95);   // ends inside the lead-in
  const s2 = scan(1.2, 1.9);    // ends exactly at touch - 0.10: clear
  const s3 = scan(2.15, 2.5);   // starts exactly at touch + 0.15: clear
  const s4 = scan(2.1, 2.5);    // starts inside the follow-through
  const r = timingScore([s1, s2, s3, s4], touches);
  expect(s1.bad).toBe(true);
  expect(s2.bad).toBe(false);
  expect(s3.bad).toBe(false);
  expect(s4.bad).toBe(true);
  expect(r.timing).toBe(50);
  expect(r.bad).toBe(2);
  expect(r.good).toBe(2);
});

test('timing: null with no scans, 100 with none overlapping, a scan counts once however many touches it covers', () => {
  expect(timingScore([], [{ t: 1 }]).timing).toBeNull();
  expect(timingScore([scan(3, 3.4)], [{ t: 1 }, { t: 2 }]).timing).toBe(100);
  const s = scan(1.0, 2.2);
  const r = timingScore([s], [{ t: 1.1 }, { t: 2.0 }]);
  expect(r.bad).toBe(1);
  expect(s.hits).toBe(2);
  expect(r.timing).toBe(0);
});

test('critical: not scorable under 0.9 s of flight', () => {
  expect(classifyCritical([scan(0.3, 0.6)], 0, 0.85)).toBeNull();
  expect(classifyCritical([], 0, 0.9)).toBe('none');
});

test('critical: a scan between release+0.15 and arrival-0.25 is CRITICAL, one peaking 0.35-0.80 s out is PRIME', () => {
  // flight 1.5 s: release 0, arrival 1.5
  expect(classifyCritical([scan(0.2, 0.55, { peakT: 0.4 })], 0, 1.5)).toBe('critical'); // peak 1.1 s out
  expect(classifyCritical([scan(0.7, 1.0, { peakT: 0.85 })], 0, 1.5)).toBe('prime');    // peak 0.65 s out
  expect(classifyCritical([scan(0.7, 1.0)], 0, 1.5)).toBe('prime');                      // no peakT: midpoint
  expect(classifyCritical([scan(0.05, 0.4)], 0, 1.5)).toBe('none');                      // too soon after the strike
});

test('critical: LATE EYES in the last 0.25 s cancels CRITICAL', () => {
  const early = scan(0.7, 1.0, { peakT: 0.85 });
  expect(classifyCritical([early, scan(1.2, 1.5)], 0, 1.5)).toBe('late');
  expect(classifyCritical([early, scan(1.1, 1.3)], 0, 1.5)).toBe('late'); // ends inside the last 0.25 s
  expect(classifyCritical([early, scan(1.0, 1.25)], 0, 1.5)).toBe('prime'); // ends exactly 0.25 s out: allowed
  expect(criticalScore('prime')).toBe(100);
  expect(criticalScore('critical')).toBe(80);
  expect(criticalScore('none')).toBe(20);
  expect(criticalScore('late')).toBe(0);
  expect(criticalScore(null)).toBeNull();
});

test('scan rate: per 10 s, window clipped to the rep start, null under 3 s', () => {
  const sc = [scan(1, 1.4), scan(3, 3.4), scan(5, 5.4), scan(7, 7.4)];
  expect(scanRate10(sc, 2.9)).toBeNull();
  expect(scanRate10(sc, 8, 0)).toBeCloseTo((4 / 8) * 10, 6);
  // only the last 10 s count when the rep ran longer
  const long = [scan(1, 1.4), scan(14, 14.4), scan(16, 16.4)];
  expect(scanRate10(long, 18, 0)).toBeCloseTo(2, 6);
  // a window that starts when possession was won
  expect(scanRate10([scan(5, 5.4)], 8, 4)).toBeCloseTo((1 / 4) * 10, 6);
});

test('rate score: 100 at par, linear to 0; par table', () => {
  expect(rateScore(5, 5)).toBe(100);
  expect(rateScore(7, 5)).toBe(100);
  expect(rateScore(2.5, 5)).toBe(50);
  expect(rateScore(0, 5)).toBe(0);
  expect(rateScore(null, 5)).toBeNull();
  expect(PAR).toEqual({ CM: 5, CDM: 5, CB: 4.5, W: 4, CAM: 4, FB: 3.5, ST: 3, GK: 3 });
});

test('body shape: half-turn, open, closed', () => {
  const passer = -Math.PI / 2; // the pass comes from behind (-x)
  expect(bodyShape(passer, passer).shape).toBe('CLOSED');            // square on to the ball, back to goal
  expect(bodyShape(0, 55 * DEG).shape).toBe('HALF-TURN');            // a = 55, facing +z so g = 90
  expect(bodyShape(0, 55 * DEG).score).toBe(100);
  expect(bodyShape(0, Math.PI).shape).toBe('OPEN');                  // a = 180, g = 90
  expect(bodyShape(0, Math.PI).score).toBe(70);
  expect(bodyShape(Math.PI * 0.9, Math.PI / 2).shape).toBe('OPEN');  // a = 72, g = 72
  expect(bodyShape(-Math.PI / 2 + 10 * DEG, Math.PI).shape).toBe('CLOSED'); // g = 170: back to goal
  expect(bodyShape(Math.PI / 2 + 25 * DEG, Math.PI / 2).shape).toBe('CLOSED'); // a = 25: nearly square on
});

test('body shape: the half-turn opens away from the presser, not into him', () => {
  const passer = Math.PI / 2 + 80 * DEG;
  const facing = Math.PI / 2 + 25 * DEG;       // 55 deg towards -z side of the passer line
  const away = passer + 100 * DEG;             // presser on the other side of the passer line
  const into = passer - 100 * DEG;             // presser on the same side as the body turned
  expect(bodyShape(facing, passer, Math.PI / 2, away).shape).toBe('HALF-TURN');
  expect(bodyShape(facing, passer, Math.PI / 2, into).shape).toBe('OPEN');
});

test('information: weights 35/30/20/15 and renormalising for what does not apply', () => {
  expect(informationScore({ presser: true, exit: true, blind: true, both: true })).toBe(100);
  expect(informationScore({ presser: true, exit: false, blind: false, both: false })).toBe(35);
  expect(informationScore({ presser: false, exit: true, blind: false, both: true })).toBe(45);
  expect(informationScore({ presser: false, exit: false, blind: false, both: false })).toBe(0);
  // no presser on the pitch: 65 available, 65 earned
  expect(informationScore({ presser: null, exit: true, blind: true, both: true })).toBe(100);
});

test('composite: weights, null parts drop out, a ball-watcher scores low', () => {
  expect(scanComposite({ rate: 100, info: 100, timing: 100, critical: 100 })).toBeCloseTo(100, 6);
  expect(scanComposite({ rate: 0, info: 100, timing: 100, critical: 100 })).toBeCloseTo(65, 6);
  expect(scanComposite({ rate: null, info: 50, timing: null, critical: null })).toBeCloseTo(50, 6);
  expect(scanComposite({ rate: null, info: null, timing: null, critical: null })).toBe(0);
  // never scanned: no rate, nothing seen, no timing, critical 'none'
  const watcher = scanComposite({ rate: 0, info: 15, timing: null, critical: criticalScore('none') });
  expect(watcher).toBeLessThan(25);
});

test('speed factor and the total', () => {
  expect(speedFactor(0)).toBe(1);
  expect(speedFactor(1.0)).toBe(1);
  expect(speedFactor(1.6)).toBeCloseTo(0.8, 6);
  expect(speedFactor(2.2)).toBeCloseTo(0.6, 6);
  expect(speedFactor(5)).toBeCloseTo(0.6, 6);
  // perfect pass, never scanned vs scanned well
  expect(totalScore(100, 1, 0)).toBe(35);
  expect(totalScore(100, 1, 100)).toBe(100);
  expect(totalScore(100, 0.6, 100)).toBe(60);
  expect(totalScore(80, 1, 50, 100)).toBe(Math.round(80 * (0.35 + 0.325) * 0.8 + 20));
});

test('offside line is the deepest outfield opponent: the highest x', () => {
  const P = (x: number, slot: string) => ({ slot, pos: { x, z: 0 } });
  expect(offsideLine([P(49, 'GK'), P(22, 'RCB'), P(26, 'LCB'), P(10, 'RM')])).toBe(26);
  // a keeper pushed far up does not count, and a striker dropping deep does not set the line
  expect(offsideLine([P(51, 'GK'), P(-4, 'ST1'), P(20, 'RCB')])).toBe(20);
});

// --- eval.js ---------------------------------------------------------------------------------

const O = (x: number, z: number, slot = 'CM') => ({ pos: new THREE.Vector3(x, 0, z), slot, vel: new THREE.Vector3() });

test('pComplete: 50% at 0.3 m, 90% at 1.5 m, monotonic', () => {
  expect(passProbability(0.3)).toBeCloseTo(0.5, 6);
  expect(passProbability(1.5)).toBeCloseTo(0.9, 3);
  let prev = -1;
  for (let m = -6; m <= 8; m += 0.25) {
    const p = passProbability(m);
    expect(p).toBeGreaterThan(prev);
    expect(p).toBeGreaterThanOrEqual(0);
    expect(p).toBeLessThanOrEqual(1);
    prev = p;
  }
  expect(passProbability(Infinity)).toBe(1);
});

test('value = p x gain - (1 - p) x loss(ball.x); a tighter lane is worth less', () => {
  const ball = { x: 0, y: 0, z: 0 };
  const mate = O(14, 0);
  const wide = evaluateOptions(ball, [mate], [O(14, 12, 'RB')], 'mid');
  const tight = evaluateOptions(ball, [mate], [O(14, 2.6, 'RB')], 'mid');
  for (const o of [wide[0], tight[0]]) expect(o.value).toBeCloseTo(o.pComplete * o.gain - (1 - o.pComplete) * turnoverLoss(0), 9);
  expect(tight[0].pComplete).toBeLessThan(wide[0].pComplete);
  expect(tight[0].value).toBeLessThan(wide[0].value);
});

test('turnover cost: 0.5 near your own box, 0.15 in the attacking third, interpolated on ball x', () => {
  expect(turnoverLoss(-52)).toBeCloseTo(LOSS_OWN, 9);
  expect(turnoverLoss(-36)).toBeCloseTo(LOSS_OWN, 9);
  expect(turnoverLoss(17.5)).toBeCloseTo(LOSS_ATT, 9);
  expect(turnoverLoss(45)).toBeCloseTo(LOSS_ATT, 9);
  expect(turnoverLoss(-9.25)).toBeCloseTo((LOSS_OWN + LOSS_ATT) / 2, 6);
  let prev = 1;
  for (let x = -50; x <= 50; x += 5) { const l = turnoverLoss(x); expect(l).toBeLessThanOrEqual(prev); prev = l; }
});

test('a 49% forward ball from a centre back no longer beats a 99% safe pass; in the attacking third it still does', () => {
  // the opponent sits so the forward lane's margin is just under 0.3 m (p about 0.49); the sideways ball is wide open
  // a defender 4.19 m off the line at its middle: reach 3.91 m, margin 0.28 m, p about 0.49
  const mkOpps = (bx: number) => [O(bx + 12, 4.19, 'RM'), O(bx + 12, 40, 'LM')];
  const forward = (bx: number) => ({ pos: new THREE.Vector3(bx + 25, 0, 0), slot: 'ST', vel: new THREE.Vector3() });
  const side = (bx: number) => ({ pos: new THREE.Vector3(bx, 0, 18), slot: 'RCB', vel: new THREE.Vector3() });
  const eval1 = (bx: number, group: string) => {
    const opts = evaluateOptions({ x: bx, y: 0, z: 0 }, [forward(bx), side(bx)], mkOpps(bx), group);
    return { f: opts.find((o: any) => o.target.slot === 'ST'), s: opts.find((o: any) => o.target.slot === 'RCB'), opts };
  };
  const cb = eval1(-35, 'def');
  expect(cb.f.pComplete).toBeGreaterThan(0.35);
  expect(cb.f.pComplete).toBeLessThan(0.65);
  expect(cb.s.pComplete).toBeGreaterThan(0.97);
  expect(cb.f.value).toBeLessThan(cb.s.value);       // a coin flip from your own box loses to the safe ball
  expect(cb.opts[0].target.slot).toBe('RCB');
  // the same two balls from the attacking third: losing it costs little, so the coin flip is right
  const att = eval1(20, 'att');
  expect(att.f.value).toBeGreaterThan(att.s.value);
  // 99% of the time a safe pass is worth gain x p, not less than nothing
  expect(cb.s.value).toBeGreaterThan(0);
});

test('a pass that costs more than it gains is negative, scores 0, and the best of bad options still scores 100', () => {
  const bad = evaluateOptions({ x: -40, y: 0, z: 0 }, [{ pos: new THREE.Vector3(-14, 0, 0), slot: 'ST', vel: new THREE.Vector3() }], [O(-27, 0, 'RM')], 'def')[0];
  expect(bad.value).toBeLessThan(0);
  const ok = { kind: 'pass', value: 0.3 };
  expect(scoreDecision(bad, [ok, bad])).toBe(0);
  const o = (value: number) => ({ kind: 'pass', value });
  const allBad = [o(-0.05), o(-0.2), o(-0.6)];
  expect(scoreDecision(allBad[0], allBad)).toBe(100);
  expect(scoreDecision(allBad[1], allBad)).toBe(63);
  expect(scoreDecision(allBad[2], allBad)).toBe(0);
  // a choice that is not on the list (a pass that was never offered) cannot score above half when everything is bad
  expect(scoreDecision({ kind: 'pass', value: 0 }, allBad)).toBeLessThanOrEqual(50);
  for (const sc of [scoreDecision(allBad[1], allBad), scoreDecision(bad, [ok, bad])]) { expect(sc).toBeGreaterThanOrEqual(0); expect(sc).toBeLessThanOrEqual(100); }
});

test('progression is dx/25: backwards is allowed but a safe recycle keeps a small positive gain', () => {
  const ball = { x: 0, y: 0, z: 0 };
  const far = [O(60, 40, 'RB')];
  const fwd = evaluateOptions(ball, [O(20, 0)], far, 'mid')[0];
  const back = evaluateOptions(ball, [O(-20, 0)], far, 'mid')[0];
  expect(fwd.prog).toBeCloseTo(0.8, 6);
  expect(back.prog).toBeLessThan(0);
  expect(back.gain).toBeGreaterThanOrEqual(GAIN_FLOOR);
  expect(back.value).toBeGreaterThan(0);
  expect(fwd.value).toBeGreaterThan(back.value);
});

test('lines broken counts only opponents within 8 m of the pass line', () => {
  const ball = { x: 0, z: 0 }, to = { x: 30, z: 0 };
  const opps = [O(10, 3), O(15, 7.5), O(20, 9), O(25, -20), O(-5, 0), O(29.5, 0)];
  // (10,3) and (15,7.5) are within 8 m and between; (20,9) is 9 m off; (25,-20) is far; (-5) is behind; (29.5) is at the receiver
  expect(linesBroken(ball, to, opps)).toBe(2);
  expect(linesBroken(ball, { x: 2, z: 0 }, opps)).toBe(0);
  const pass = evaluateOptions({ x: 0, y: 0, z: 0 }, [{ pos: new THREE.Vector3(30, 0, 0), slot: 'ST' }], opps, 'mid')[0];
  expect(pass.broken).toBe(2);
});

test('switch bonus +0.2 for 25 m or more across with space, not without', () => {
  const ball = { x: 0, y: 0, z: -15 };
  const far = [O(0, 30, 'LM')];
  const sw = evaluateOptions(ball, [O(2, 12)], far, 'mid')[0];            // dz = 27, free
  const short = evaluateOptions(ball, [O(2, 8)], far, 'mid')[0];          // dz = 23
  expect(sw.switch).toBe(true);
  expect(short.switch).toBe(false);
  // same pass with a marker on the receiver: no space, no bonus
  const marked = evaluateOptions(ball, [O(2, 12)], [O(2, 15, 'LM')], 'mid')[0];
  expect(marked.switch).toBe(false);
  // gain differs by the bonus (everything else equal): rebuild with identical space
  const sw2 = evaluateOptions(ball, [O(2, 12)], [O(2, 22, 'LM')], 'mid')[0];
  const nb = evaluateOptions(ball, [O(2, 9.9)], [O(2, 19.9, 'LM')], 'mid')[0];
  expect(sw2.switch).toBe(true);
  expect(nb.switch).toBe(false);
  expect(sw2.gain - nb.gain).toBeGreaterThan(0.15);
});

test('xG is sane: nearer and more central is better, a covered aim is worse, blockers kill it', () => {
  const gk = { x: 51.5, z: 0 };
  const aim = (b: any, k: any) => shotAim(b, k);
  const six = shotXG({ x: 47, z: 0 }, gk, aim({ x: 47, z: 0 }, gk), 1).xg;
  const pen = shotXG({ x: 41.5, z: 0 }, gk, aim({ x: 41.5, z: 0 }, gk), 1).xg;
  const edge = shotXG({ x: 34, z: 0 }, gk, aim({ x: 34, z: 0 }, gk), 1).xg;
  const long = shotXG({ x: 25, z: 0 }, gk, aim({ x: 25, z: 0 }, gk), 1).xg;
  expect(six).toBeGreaterThan(pen);
  expect(pen).toBeGreaterThan(edge);
  expect(edge).toBeGreaterThan(long);
  expect(pen).toBeGreaterThan(0.15);
  expect(pen).toBeLessThan(0.5);
  expect(long).toBeLessThan(0.1);
  const wide = shotXG({ x: 47, z: 20 }, gk, aim({ x: 47, z: 20 }, gk), 1).xg;
  expect(wide).toBeLessThan(pen);
  // keeper standing on the aim point is worse than keeper opposite
  const a = aim({ x: 41.5, z: 6 }, { x: 51.5, z: 0 });
  const covered = shotXG({ x: 41.5, z: 6 }, { x: 51.5, z: a.z }, a, 1).xg;
  const opposite = shotXG({ x: 41.5, z: 6 }, { x: 51.5, z: -a.z }, a, 1).xg;
  expect(covered).toBeLessThan(opposite);
  expect(shotXG({ x: 41.5, z: 0 }, gk, aim({ x: 41.5, z: 0 }, gk), 0).xg).toBe(0);
  for (const x of [20, 30, 40, 50]) for (const z of [-25, -10, 0, 10, 25]) {
    const v = shotXG({ x, z }, gk, aim({ x, z }, gk), 1).xg;
    expect(v).toBeGreaterThanOrEqual(0);
    expect(v).toBeLessThanOrEqual(0.95);
  }
});

test('shot aim is the far side of the keeper, not random', () => {
  for (let i = 0; i < 20; i++) {
    expect(shotAim({ x: 40, z: 3 }, { x: 51, z: 1.5 }).z).toBeLessThan(0);
    expect(shotAim({ x: 40, z: -3 }, { x: 51, z: -1.5 }).z).toBeGreaterThan(0);
  }
  // keeper in the middle: away from the shooter's side
  expect(shotAim({ x: 40, z: 8 }, { x: 51, z: 0 }).z).toBeLessThan(0);
  expect(Math.abs(shotAim({ x: 40, z: 0 }, null).z)).toBeLessThan(3.66);
});

test('shot option: valued by xG, only for attackers (or opts.shots), uses the keeper', () => {
  const gk = { slot: 'GK', pos: new THREE.Vector3(51.5, 0, 0) };
  const ball = new THREE.Vector3(40, 0, 3);
  const opts = [gk, O(25, 10, 'RCB')];
  const att = evaluateOptions(ball, [], opts, 'att');
  expect(att[0].kind).toBe('shot');
  expect(att[0].xg).toBeGreaterThan(0);
  expect(att[0].aim.z).toBeLessThan(0);
  expect(evaluateOptions(ball, [], opts, 'mid').length).toBe(0);
  expect(evaluateOptions(ball, [], opts, 'mid', { shots: true })[0].kind).toBe('shot');
  // the shooter goes to the other side when the keeper shifts across to cover the first aim
  const gk2 = { slot: 'GK', pos: new THREE.Vector3(51.5, 0, att[0].aim.z) };
  expect(evaluateOptions(ball, [], [gk2, O(25, 10, 'RCB')], 'att')[0].aim.z).toBeGreaterThan(0);
});

test('scoreDecision: best is 100, ratio otherwise, rank props it up when everything is poor', () => {
  const o = (v: number) => ({ kind: 'pass', value: v });
  const good = [o(0.8), o(0.4), o(0.1)];
  expect(scoreDecision(good[0], good)).toBe(100);
  expect(scoreDecision(good[1], good)).toBe(50);
  const poor = [o(0.04), o(0.02), o(0.001), o(0.0001)];
  expect(scoreDecision(poor[0], poor)).toBe(100);
  expect(scoreDecision(poor[1], poor)).toBeGreaterThanOrEqual(50);
  expect(scoreDecision(poor[3], poor)).toBeLessThan(5);
  expect(scoreDecision(null, good)).toBe(0);
});

test('laneMargin keeps its signature and accepts a slower defender', () => {
  const a = { x: 0, z: 0 }, b = { x: 20, z: 0 }, opp = { x: 10, z: 3 };
  const m = laneMargin(a, b, opp, 17, false);
  expect(laneMargin(a, b, opp, 17, false, 3)).toBeGreaterThan(m);
});

// --- a headless world for the rep ------------------------------------------------------------

class FakePlayer {
  pos = new THREE.Vector3(); vel = new THREE.Vector3(); target = new THREE.Vector3();
  heading = 0; maxSpeed = 6; wobble = Math.random() * 100; mood = 0; role: any = null; ring = 0; ringHex = 0xffffff;
  ringMat = { color: { getHex: () => this.ringHex }, opacity: 0 };
  visible = true; stalk: any; pressV = 0; turned: number[] = [];
  constructor(public slot: string, public number: number, public team: string) {}
  turnTo(yaw: number) { this.turned.push(yaw); }
  place(x: number, z: number) { this.pos.set(x, 0, z); this.target.copy(this.pos); this.vel.set(0, 0, 0); this.mood = 0; }
  sync() {}
  setVisible(v: boolean) { this.visible = v; }
  highlight(c: number, o: number) { this.ringHex = c; this.ringMat.opacity = o; }
  step(dt: number) {
    const to = this.target.clone().sub(this.pos); const d = to.length();
    if (d > 0.05) {
      const s = Math.min(this.maxSpeed * dt, d); to.multiplyScalar(s / d); this.pos.add(to);
      this.vel.copy(to).multiplyScalar(1 / dt); this.heading = Math.atan2(to.x, to.z);
    } else this.vel.set(0, 0, 0);
  }
}
class FakeBall {
  pos = new THREE.Vector3(0, 0.11, 0); flight: any = null;
  kick(from: any, to: any, speed: number, loft = 0) {
    const dist = Math.hypot(to.x - from.x, to.z - from.z);
    this.flight = { from: from.clone(), to: to.clone(), t: 0, dur: Math.max(0.25, dist / speed), loft };
  }
  update(dt: number) {
    const f = this.flight; f.t += dt; const k = Math.min(1, f.t / f.dur);
    this.pos.lerpVectors(f.from, f.to, k);
    if (k >= 1) { this.flight = null; return true; } return false;
  }
  set(x: number, z: number) { this.pos.set(x, 0.11, z); this.flight = null; }
}
function makeWorld() {
  const sets = new Map<any, FakePlayer[]>();
  for (const r of Object.values(ROLES) as any[]) if (!sets.has(r.formation)) sets.set(r.formation, r.formation.map(([s, , , n]: any) => new FakePlayer(s, n, 'home')));
  const w: any = {
    yaw: 0, user: new THREE.Vector3(), ball: new FakeBall(), snapTurned: false,
    away: AWAY_442.map(([s, , , n]: any) => new FakePlayer(s, n, 'away')),
    goalGlow: { visible: false }, choiceLine: {}, rondo: null,
    useFormation(F: any) { this.home = sets.get(F); this.home.forEach((p: any) => p.setVisible(true)); this.away.forEach((p: any) => p.setVisible(true)); },
    clearOverlays() {}, setLine() {},
    placeUser(p: any, yaw: number) { this.user.copy(p); this.yaw = yaw; },
    userPos(out = new THREE.Vector3()) { return out.copy(this.user); },
    headYaw() { return this.yaw; }, moveUser(dx: number, dz: number) { this.user.x += dx; this.user.z += dz; },
  };
  return w;
}
const fx = (log?: string[]) => ({
  cheer: (k: number) => log?.push('cheer' + k), groan: () => log?.push('groan'),
});
const bearing = (w: any, p: any) => Math.atan2(p.x - w.user.x, p.z - w.user.z);

// Plays a rep. look(rep, w) sets w.yaw each frame; pass: whether to release at once (one touch) via aim.
function play(rep: any, w: any, look: (rep: any, w: any) => void, opts: { release?: 'best' | 'first' | false; dt?: number } = {}) {
  rep.start();
  const dt = opts.dt ?? 1 / 60;
  let g = 0;
  while (rep.state !== 'done' && g++ < 6000) {
    look(rep, w);
    if (rep.state === 'quiz') { rep.endQuiz(60); continue; }
    rep.update(dt);
    if (opts.release && (rep.state === 'incoming' || rep.state === 'decide')) {
      const m = opts.release === 'best' && rep.options?.length ? rep.options[0].target : rep.mates[0];
      const t = (opts.release === 'best' ? rep.evaluate(w.ball.pos)[0]?.target : null) || m || rep.mates[0];
      const o = w.user.clone(); o.y = 1.6;
      const dir = new THREE.Vector3(t.pos.x, 1, t.pos.z).sub(o).normalize();
      rep.aim(o, dir); rep.select();
    }
  }
  return g;
}
const watchBall = (rep: any, w: any) => { w.yaw = bearing(w, w.ball.pos); };

test('touches: every kick and reception of the home team is logged, including the viewer\'s', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: fx() });
  play(rep, w, watchBall, { release: 'first' });
  expect(rep.touches.length).toBeGreaterThanOrEqual(3);
  const kicks = rep.touches.filter((k: any) => k.type === 'kick' && !k.mine);
  const recv = rep.touches.filter((k: any) => k.type === 'receive');
  expect(kicks.length).toBeGreaterThanOrEqual(1);
  expect(recv.length).toBeGreaterThanOrEqual(1);
  // the final pass release is a kick at strikeT, the viewer's own reception is a receive at receiveT
  expect(rep.touches.some((k: any) => k.type === 'kick' && Math.abs(k.t - rep.strikeT) < 0.06)).toBe(true);
  expect(rep.touches.some((k: any) => k.type === 'receive' && k.mine && k.t === rep.receiveT)).toBe(true);
  for (let i = 1; i < rep.touches.length; i++) expect(rep.touches[i].t).toBeGreaterThanOrEqual(rep.touches[i - 1].t);
});

test('a ball-watcher: no scans, timing null, low scan score; the card cannot be won by decision alone', () => {
  for (const diff of ['EASY', 'HARD']) {
    const w = makeWorld();
    const rep = new Rep(w, { role: 'CM', difficulty: diff, quiz: false, motion: false, fx: fx() });
    play(rep, w, watchBall, { release: 'best' });
    const r = rep.result;
    expect(r.scans).toBe(0);
    expect(r.timing).toBeNull();
    expect(r.badScans).toBe(0);
    expect(r.scanScore).toBeLessThan(40);
    expect(r.total).toBeLessThanOrEqual(Math.round(100 * (0.35 + 0.65 * 0.4)));
    expect(r.critical === null || r.critical === 'none').toBe(true);
  }
});

test('result carries every field the screens read, plus the new ones', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: fx() });
  play(rep, w, watchBall, { release: 'best' });
  const r = rep.result;
  for (const k of ['role', 'scans', 'scanTarget', 'scanRate', 'shoulder', 'watchedStrike', 'watchedTouch', 'sawPresser', 'sawFree', 'scanScore',
    'decision', 'memory', 'total', 'outcome', 'oneTouch', 'decideTime', 'chosen', 'best', 'drill',
    'timing', 'badScans', 'critical', 'info', 'body', 'scanRate10', 'par', 'decisionSpeed', 'bestNumber', 'reason']) expect(k in r).toBe(true);
  expect(r.par).toBe(5);
  expect(['HALF-TURN', 'OPEN', 'CLOSED']).toContain(r.body);
  expect(r.info).toBeGreaterThanOrEqual(0);
  expect(r.info).toBeLessThanOrEqual(100);
  expect(r.best).toBeTruthy();
  expect(typeof r.bestNumber === 'number' || r.bestNumber === 'SHOT').toBe(true);
  expect(typeof r.reason).toBe('string');
  expect(r.oneTouch).toBe(true);
  expect(r.decisionSpeed).toBe(0);
  expect(r.scanScore).toBe(Math.round(r.scanScore));
});

test('scripted scans: a real look over the shoulder counts, a flick or a waggle does not', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  const look = (r: any, ww: any) => {
    const b = bearing(ww, ww.ball.pos);
    const t = r.t;
    let off = 0;
    if (t >= 0.8 && t < 1.25) off = 110 * DEG;       // a 0.45 s shoulder check
    else if (t >= 1.6 && t < 1.68) off = 120 * DEG;   // a 0.08 s flick
    else if (t >= 2.0 && t < 2.3) off = 50 * DEG;     // a lazy drift that never reaches 58 deg
    ww.yaw = b + off;
  };
  rep.start();
  // hold the ball so the carrier does not pass during the test window
  rep.hold = 99;
  let g = 0;
  while (rep.t < 2.6 && g++ < 1000) { look(rep, w); rep.update(1 / 60); }
  expect(rep.scans.length).toBe(1);
  expect(rep.scans[0].t).toBeGreaterThan(0.75);
  expect(rep.scans[0].dur).toBeGreaterThan(0.35);
  expect(rep.scans[0].shoulder).toBe(true);
  expect(rep.scans[0].bad).toBe(false);
  expect(rep.scans[0].peakT).toBeGreaterThanOrEqual(rep.scans[0].t);
  expect(rep.scans[0].ball).toBe('held');
});

test('a snap turn is never a scan', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  rep.start();
  rep.hold = 99;
  let g = 0;
  let snapped = false;
  while (rep.t < 3 && g++ < 1000) {
    const b = bearing(w, w.ball.pos);
    if (rep.t < 1) w.yaw = b;
    else {
      // 30-degree snaps, twice, then the head stays put: the ball is now 60 deg off the nose
      if (!snapped) { w.yaw = b + 30 * DEG; w.snapTurned = true; snapped = true; }
      if (rep.t > 1.5 && rep.t < 1.52) { w.yaw = b + 60 * DEG; w.snapTurned = true; }
    }
    rep.update(1 / 60);
    expect(w.snapTurned).toBe(false); // cleared after reading
  }
  expect(rep.scans.length).toBe(0);
  expect(rep.inScan).toBe(false);
});

test('a snap turn mid-scan drops that scan; a genuine scan afterwards still counts', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  rep.start();
  rep.hold = 99;
  let g = 0;
  while (rep.t < 3.2 && g++ < 1000) {
    const b = bearing(w, w.ball.pos);
    const t = rep.t;
    let off = 0;
    if (t >= 0.5 && t < 0.9) off = 100 * DEG;          // scan begins...
    if (t >= 0.7 && t < 0.72) w.snapTurned = true;      // ...and a snap happens inside it: the scan is discarded
    if (t >= 2.0 && t < 2.5) off = -105 * DEG;          // a real one on the other side
    w.yaw = b + off;
    rep.update(1 / 60);
  }
  expect(rep.scans.length).toBe(1);
  expect(rep.scans[0].t).toBeGreaterThan(1.9);
  expect(rep.scans[0].side).toBe(-1);
});

test('scan.bad matches the touch log, badScans and timing come out of it', () => {
  // scan the whole time at a steady rhythm so some overlap touches and some do not
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  const look = (r: any, ww: any) => {
    const b = bearing(ww, ww.ball.pos);
    const ph = (r.t % 0.9) / 0.9;
    ww.yaw = b + (ph > 0.4 && ph < 0.9 ? 105 * DEG : 0);
  };
  play(rep, w, look, { release: 'first' });
  const r = rep.result;
  expect(rep.scans.length).toBeGreaterThan(0);
  let bad = 0;
  for (const s of rep.scans) {
    const hit = rep.touches.some((k: any) => s.t < k.t + 0.15 && s.end > k.t - 0.1);
    expect(s.bad).toBe(hit);
    if (hit) bad++;
  }
  expect(r.badScans).toBe(bad);
  expect(r.timing).toBe(Math.round(((rep.scans.length - bad) / rep.scans.length) * 100));
});

test('speed scalar stretches the window and the flight', () => {
  const run = (speed: number) => {
    const w = makeWorld();
    const rep = new Rep(w, { role: 'CM', difficulty: 'HARD', quiz: false, motion: false, fx: fx(), speed });
    rep.minFlight = 1.0;
    rep.start();
    let g = 0;
    while (rep.state !== 'decide' && g++ < 6000) { watchBall(rep, w); rep.update(1 / 60); }
    // the difficulty's window (and the awareness bonus) is the ceiling; a presser close at the touch shortens it
    const cap = (DIFFICULTY.HARD.window + (rep.knewPressure ? AWARE_BONUS : 0)) / speed;
    const floor = 0.5 + (rep.knewPressure ? AWARE_BONUS : 0) / speed; // half a second of real time, plus the bonus scaled
    return { window: rep.window, cap, floor, flight: rep.finalFlight, same: rep.decisionWindow(rep.m.presserDist, rep.knewPressure) };
  };
  const slow = run(0.5), norm = run(1), fast = run(1.2);
  for (const r of [slow, norm, fast]) {
    expect(r.window).toBeLessThanOrEqual(r.cap + 1e-9);
    expect(r.window).toBeGreaterThanOrEqual(Math.min(r.floor, r.cap) - 1e-9);
    expect(r.window).toBeCloseTo(r.same, 9);
  }
  // the ball is slower at half speed: the flight in game time never drops below minFlight
  expect(slow.flight * 0.5).toBeGreaterThanOrEqual(1.0 - 0.05);
  expect(norm.flight).toBeGreaterThanOrEqual(1.0 - 0.05);
  expect(fast.flight * 1.2).toBeGreaterThanOrEqual(1.0 - 0.05);
  expect(new Rep(makeWorld(), { role: 'CM', difficulty: 'HARD', quiz: false, motion: false, fx: {}, speed: 9 }).speed).toBe(1.2);
  expect(new Rep(makeWorld(), { role: 'CM', difficulty: 'HARD', quiz: false, motion: false, fx: {}, speed: 0.1 }).speed).toBe(0.5);
  expect(new Rep(makeWorld(), { role: 'CM', difficulty: 'HARD', quiz: false, motion: false, fx: {} }).speed).toBe(1);
});

test('final pass flies 15-19 m/s and minFlight slows it for the critical-scan lessons', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  rep.minFlight = 1.5;
  rep.start();
  let g = 0;
  while (!rep.finalStruck && g++ < 3000) { watchBall(rep, w); rep.update(1 / 60); }
  expect(rep.finalFlight).toBeGreaterThanOrEqual(1.5 - 1e-6);
  for (let n = 0; n < 15; n++) {
    const w2 = makeWorld();
    const r2 = new Rep(w2, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
    r2.start();
    let k = 0;
    while (!r2.finalStruck && k++ < 3000) { watchBall(r2, w2); r2.update(1 / 60); }
    const f = w2.ball.flight;
    const spd = Math.hypot(f.to.x - f.from.x, f.to.z - f.from.z) / f.dur;
    expect(spd).toBeGreaterThanOrEqual(15 - 1e-6);
    expect(spd).toBeLessThanOrEqual(19 + 1e-6);
  }
});

test('critical scan uses the real arrival time: an eyes-on-ball viewer is "none", a mid-flight look is critical', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  rep.minFlight = 1.4;
  const look = (r: any, ww: any) => {
    const b = bearing(ww, ww.ball.pos);
    let off = 0;
    if (r.finalStruck && r.state === 'incoming') {
      const since = r.t - r.strikeT;
      if (since >= 0.35 && since < 0.8) off = 100 * DEG; // a look well before the last 0.25 s
    }
    ww.yaw = b + off;
  };
  play(rep, w, look, { release: 'first' });
  expect(rep.m.flight).toBeGreaterThanOrEqual(1.4 - 0.05);
  expect(['critical', 'prime']).toContain(rep.result.critical);
});

test('late eyes: still looking away as the ball arrives', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  rep.minFlight = 1.4;
  const look = (r: any, ww: any) => {
    const b = bearing(ww, ww.ball.pos);
    let off = 0;
    if (r.state === 'incoming' && r.t - r.strikeT > 1.1) off = 100 * DEG;
    ww.yaw = b + off;
  };
  play(rep, w, look, { release: 'first' });
  expect(rep.result.critical).toBe('late');
  expect(rep.result.badScans).toBeGreaterThanOrEqual(1); // it overlaps the viewer's own reception
});

test('information: looking at the presser and the best exit raises it; ball-watching leaves it low', () => {
  const info = (watch: boolean) => {
    const w = makeWorld();
    const rep = new Rep(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: fx() });
    rep.minFlight = 1.4;
    const look = (r: any, ww: any) => {
      const b = bearing(ww, ww.ball.pos);
      if (!watch || r.state !== 'incoming') { ww.yaw = b; return; }
      const since = r.t - r.strikeT;
      const p = r.pressers[0];
      const ex = r.rank(ww.ball.pos).find((o: any) => o.kind === 'pass')?.target;
      if (since > 0.3 && since < 0.7) ww.yaw = bearing(ww, p.pos);
      else if (since >= 0.7 && since < 1.1 && ex) ww.yaw = bearing(ww, ex.pos);
      else ww.yaw = b;
    };
    play(rep, w, look, { release: 'first' });
    return rep.result;
  };
  let sum0 = 0, sum1 = 0;
  const N = 8;
  for (let i = 0; i < N; i++) { sum0 += info(false).info; sum1 += info(true).info; }
  expect(sum1 / N).toBeGreaterThan(sum0 / N + 25);
});

test('free teammate: any direction, and sometimes nobody', () => {
  let none = 0, ahead = 0, behind = 0;
  for (let i = 0; i < 160; i++) {
    const w = makeWorld();
    const rep = new Rep(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: {} });
    rep.start();
    if (!rep.free) { none++; continue; }
    const up = rep.userBody.pos;
    const toBall = Math.atan2(rep.carrier.pos.x - up.x, rep.carrier.pos.z - up.z);
    const a = Math.abs(Math.atan2(Math.sin(Math.atan2(rep.free.pos.x - up.x, rep.free.pos.z - up.z) - toBall), Math.cos(Math.atan2(rep.free.pos.x - up.x, rep.free.pos.z - up.z) - toBall)));
    if (a < 70 * DEG) ahead++; else if (a > 95 * DEG) behind++;
    expect(rep.free.slot).not.toBe('GK');
    expect(rep.free).not.toBe(rep.carrier);
  }
  expect(none).toBeGreaterThan(160 * 0.1);
  expect(none).toBeLessThan(160 * 0.45);
  expect(ahead).toBeGreaterThan(5);
  expect(behind).toBeGreaterThan(5);
});

test('sawFree is only false when the top-ranked option went unseen', () => {
  let seenTrue = 0, seenFalse = 0;
  for (let i = 0; i < 30; i++) {
    const w = makeWorld();
    const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
    rep.freeChance = 1;
    // always look at the current best pass: whatever is top-ranked has been seen
    const look = (r: any, ww: any) => {
      if (r.state === 'incoming' || r.state === 'buildup') {
        const ex = r.mates.length ? r.rank(ww.ball.pos).find((o: any) => o.kind === 'pass')?.target : null;
        const b = bearing(ww, ww.ball.pos);
        ww.yaw = ex && r.state === 'incoming' && r.t - r.strikeT > 0.2 ? bearing(ww, ex.pos) : b;
      }
    };
    play(rep, w, look, { release: 'first' });
    if (rep.result.sawBest) seenTrue++; else seenFalse++;
    expect(rep.result.sawFree).toBe(rep.result.sawBest);
  }
  expect(seenTrue).toBeGreaterThan(seenFalse);
});

test('pressers keep their shape: only mids and forwards, never teleported; they sprint at the strike and win the ball if you wait', () => {
  let lost = 0;
  for (let i = 0; i < 24; i++) {
    const w = makeWorld();
    const diff = i % 2 ? 'HARD' : 'MEDIUM';
    const rep = new Rep(w, { role: 'CM', difficulty: diff, quiz: false, motion: false, fx: fx() });
    rep.start();
    expect(rep.pressers.length).toBe(DIFFICULTY[diff as 'HARD'].pressers);
    for (const p of rep.pressers) expect(/^(RM|RCM|LCM|LM|ST1|ST2)$/.test(p.slot)).toBe(true);
    // the back four stay home: nobody defending was recruited
    for (const p of w.away.filter((o: any) => /CB|LB|RB|GK/.test(o.slot))) expect(rep.pressers).not.toContain(p);
    let wasFar = false, atLose = Infinity;
    const orig = rep.lose.bind(rep);
    rep.lose = (p: any) => { atLose = p.pos.distanceTo(w.user); return orig(p); };
    let g = 0;
    while (rep.state !== 'done' && g++ < 6000) { watchBall(rep, w); rep.update(1 / 60); if (rep.finalStruck && !wasFar) { wasFar = true; } }
    if (rep.result.outcome === 'lost') { lost++; expect(atLose).toBeLessThan(4.5); }
  }
  expect(lost).toBe(24);
});

test('lower levels press from the ball side; high levels split the two pressers across both sides', () => {
  let ballSide = 0, n = 0, split = 0, nh = 0;
  for (let i = 0; i < 60; i++) {
    const w = makeWorld();
    const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: {} });
    rep.start();
    const up = rep.userBody.pos;
    const toBall = Math.atan2(rep.carrier.pos.x - up.x, rep.carrier.pos.z - up.z);
    const p = rep.pressers[0];
    const a = Math.abs(Math.atan2(Math.sin(Math.atan2(p.pos.x - up.x, p.pos.z - up.z) - toBall), Math.cos(Math.atan2(p.pos.x - up.x, p.pos.z - up.z) - toBall)));
    n++; if (a < 90 * DEG) ballSide++;
    const w2 = makeWorld();
    const r2 = new Rep(w2, { role: 'ST', difficulty: 'HARD', quiz: false, motion: false, fx: {} });
    r2.start();
    const up2 = r2.userBody.pos;
    const tb2 = Math.atan2(r2.carrier.pos.x - up2.x, r2.carrier.pos.z - up2.z);
    const sides = r2.pressers.map((q: any) => {
      const aa = Math.abs(Math.atan2(Math.sin(Math.atan2(q.pos.x - up2.x, q.pos.z - up2.z) - tb2), Math.cos(Math.atan2(q.pos.x - up2.x, q.pos.z - up2.z) - tb2)));
      return aa >= 90 * DEG;
    });
    nh++; if (sides.length === 2 && sides[0] !== sides[1]) split++;
  }
  // a candidate on the preferred side is not always available (the fallback is the nearest), so allow slack
  expect(ballSide / n).toBeGreaterThan(0.8);
  expect(split / nh).toBeGreaterThan(0.7);
});

test('the user is never offside by the old bug: the line is the deepest outfield opponent', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'W', difficulty: 'EASY', quiz: false, motion: false, fx: {} });
  rep.start();
  const line = offsideLine(rep.away);
  const deepest = Math.max(...rep.away.filter((o: any) => o.slot !== 'GK').map((o: any) => o.pos.x));
  expect(line).toBe(deepest);
  const keeperX = rep.away.find((o: any) => o.slot === 'GK').pos.x;
  expect(line).toBeLessThan(keeperX);
});

test('cheers for tight completions, groans for interceptions, nothing for a lost ball beyond the groan at the tackle', () => {
  const log: string[] = [];
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx(log) });
  rep.start();
  rep.outcome = 'tight'; rep.options = []; rep.chosen = null; rep.decisionScore = 100; rep.state = 'outcome';
  rep.finish();
  expect(log).toEqual(['cheer0.7']);
  // the crowd follows the quality of the decision, not just the result
  const log2: string[] = [];
  const rep2 = new Rep(makeWorld(), { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx(log2) });
  rep2.start();
  rep2.outcome = 'tight'; rep2.options = []; rep2.chosen = null; rep2.decisionScore = 50; rep2.state = 'outcome';
  rep2.finish();
  expect(log2).toEqual(['cheer' + 0.7 * (0.4 + 0.6 * 0.5)]);
});

test('decision window: a presser at 1.2 m tackles at once, a far one leaves the difficulty window, seeing him adds time', () => {
  const w = makeWorld();
  const rep: any = new Rep(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: fx() });
  rep.start();
  const u = w.userPos(), presser = rep.pressers[0];
  const win = (d: number, v = 0, aware = false) => { presser.pos.set(u.x + d, 0, u.z); presser.pressV = v; return rep.decisionWindow(d, aware); };
  const cap = DIFFICULTY.MEDIUM.window, v0 = DIFFICULTY.MEDIUM.presserSpeed * 0.6;
  expect(win(1.2)).toBeCloseTo(0.5, 9);                       // (1.2 - 0.8) / 3.7 is a tenth of a second: the floor
  expect(win(3)).toBeCloseTo((3 - 0.8) / v0, 9);
  expect(win(3)).toBeLessThan(win(6));
  expect(win(6)).toBeLessThan(win(9));
  expect(win(60)).toBeCloseTo(cap, 9);                        // never longer than the difficulty's window
  expect(win(8, 9)).toBeLessThan(win(8, 0));                  // a presser already running at 9 m/s leaves less
  expect(win(1.2, 0, true)).toBeCloseTo(0.5 + AWARE_BONUS, 9);
  expect(rep.decisionWindow(null, false)).toBeCloseTo(cap, 9);
  // a slower game gives more time, scaled
  const slow: any = new Rep(makeWorld(), { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: fx(), speed: 0.5 });
  slow.start();
  expect(slow.decisionWindow(null, false)).toBeCloseTo(cap / 0.5, 9);
});

test('decision window: with the presser at 1.2 m at the touch the ball is lost inside a second, not after 1.9', () => {
  const w = makeWorld();
  const rep: any = new Rep(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: fx() });
  rep.minFlight = 1.0;
  rep.start();
  let g = 0;
  while (rep.state !== 'decide' && g++ < 6000) {
    watchBall(rep, w);
    // he is on the viewer's shoulder when the ball arrives
    if (rep.state === 'incoming' && w.ball.flight && w.ball.flight.t > w.ball.flight.dur - 0.1) {
      const u = w.userPos(); rep.pressers[0].pos.set(u.x + 1.2, 0, u.z); rep.pressers[0].target.copy(rep.pressers[0].pos);
    }
    rep.update(1 / 60);
  }
  expect(rep.state).toBe('decide');
  expect(rep.m.presserDist).toBeLessThan(1.6);
  expect(rep.window).toBeLessThan(1.0);
  while (rep.state === 'decide' && g++ < 9000) { watchBall(rep, w); rep.update(1 / 60); }
  expect(rep.outcome).toBe('lost');
  expect(rep.decideTime).toBeLessThan(1.0);
});

// --- scenario hooks (S2 contract) -------------------------------------------------------------

test('hooks: setupScenario runs at the end of start, scenarioValue reranks, scenarioResult adds fields', () => {
  const w = makeWorld();
  const order: string[] = [];
  class Scen extends Rep {
    setupScenario() { order.push('setup:' + this.state + ':' + (this.pressers.length > 0) + ':' + !!this.carrier); this.marker = 7; }
    scenarioValue(o: any) { return o.kind === 'pass' && o.target === this.boosted ? 5 : 0; }
    scenarioResult(r: any) { r.extra = this.marker; return { second: 2 }; }
    boosted: any; marker = 0;
  }
  const rep = new Scen(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  rep.start();
  expect(order).toEqual(['setup:setup:true:true']); // after the cast is placed, before state flips to buildup
  expect(rep.state).toBe('buildup');
  rep.boosted = rep.mates.find((m: any) => m.slot !== 'GK');
  let g = 0;
  while (rep.state !== 'decide' && g++ < 4000) { watchBall(rep, w); rep.update(1 / 60); }
  const ranked = rep.rank(w.ball.pos);
  expect(ranked[0].target).toBe(rep.boosted);
  const o = w.user.clone(); o.y = 1.6;
  const dir = new THREE.Vector3(rep.boosted.pos.x, 1, rep.boosted.pos.z).sub(o).normalize();
  rep.aim(o, dir); rep.select();
  while (rep.state !== 'done' && g++ < 8000) { watchBall(rep, w); rep.update(1 / 60); }
  expect(rep.result.extra).toBe(7);
  expect(rep.result.second).toBe(2);
  expect(rep.result.decision).toBe(100);
  expect(rep.options[0].target).toBe(rep.boosted);
});

test('no wall clock anywhere in a rep', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  rep.start();
  const real = Date.now; const pn = performance.now;
  Date.now = () => { throw new Error('wall clock'); };
  (performance as any).now = () => { throw new Error('wall clock'); };
  try { for (let i = 0; i < 400; i++) { watchBall(rep, w); rep.update(1 / 30); if (rep.state === 'decide') break; } } finally { Date.now = real; (performance as any).now = pn; }
  expect(rep.t).toBeGreaterThan(1);
});

// --- round 3 fixes -----------------------------------------------------------------------------

test('the kicker turns with turnTo, his heading is never written in one frame', () => {
  const w = makeWorld();
  const rep: any = new Rep(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: fx() });
  rep.start();
  const from = rep.carrier, h0 = from.heading, user = w.userPos();
  rep.passesLeft = 5;
  rep.nextPass(user);
  const to = rep.receiver;
  expect(from.heading).toBe(h0);
  expect(from.turned.length).toBe(1);
  expect(from.turned[0]).toBeCloseTo(Math.atan2(to.pos.x - from.pos.x, to.pos.z - from.pos.z), 9);
  // the last pass, to the viewer
  w.ball.flight = null;
  rep.carrier = to; rep.passesLeft = 1;
  const h1 = to.heading;
  rep.nextPass(user);
  expect(to.heading).toBe(h1);
  expect(to.turned.length).toBe(1);
  expect(to.turned[0]).toBeCloseTo(Math.atan2(user.x - to.pos.x, user.z - to.pos.z), 9);
});

test('the kick sound waits for the boot: it plays flight.wait after the kick, in sim time', () => {
  const w = makeWorld();
  const heard: { t: number; v: number }[] = [];
  const rep: any = new Rep(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: { kick: (v: number) => heard.push({ t: rep.t, v }) } });
  const kicks: number[] = [];
  const real = w.ball.kick.bind(w.ball);
  w.ball.kick = (a: any, b: any, sp: number, loft = 0) => { real(a, b, sp, loft); w.ball.flight.wait = 0.16; kicks.push(rep.t); };
  rep.start();
  let g = 0;
  while (kicks.length < 2 && g++ < 2000) { watchBall(rep, w); rep.update(1 / 120); }
  expect(kicks.length).toBeGreaterThanOrEqual(2);
  // at the moment of the second kick nothing has sounded for it yet; 0.16 s later it has
  const n = heard.length;
  expect(n).toBeLessThanOrEqual(1);
  for (let i = 0; i < 40; i++) { watchBall(rep, w); rep.update(1 / 120); }
  expect(heard.length).toBeGreaterThan(n - 1);
  for (let k = 0; k < Math.min(heard.length, kicks.length); k++) {
    expect(heard[k].t - kicks[k]).toBeGreaterThanOrEqual(0.16 - 1 / 120 - 1e-6);
    expect(heard[k].t - kicks[k]).toBeLessThan(0.16 + 1 / 60);
  }
  // a kick with no wait (the viewer's own boot is invisible) sounds at once
  const log: number[] = [];
  const rep2: any = new Rep(makeWorld(), { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: { kick: (v: number) => log.push(v) } });
  rep2.start();
  rep2.kickSound(1, 0);
  rep2.kickSound(0.5, undefined);
  expect(log).toEqual([1, 0.5]);
});

test('the viewer\'s own pass sounds once, with the ball, after the boot', () => {
  const w = makeWorld();
  const heard: number[] = [];
  const rep: any = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: { kick: (v: number) => heard.push(v) } });
  rep.start();
  let g = 0;
  while (rep.state !== 'decide' && g++ < 6000) { watchBall(rep, w); rep.update(1 / 60); }
  const before = heard.length;
  const t = rep.evaluate(w.ball.pos)[0].target;
  const o = w.user.clone(); o.y = 1.6;
  rep.aim(o, new THREE.Vector3(t.pos.x, 1, t.pos.z).sub(o).normalize()); rep.select();
  expect(heard.length).toBe(before + 1);
  expect(heard[heard.length - 1]).toBe(1);
});

test('smoothedYaw can leave out the last moments before the touch', () => {
  const w = makeWorld();
  const rep: any = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  rep.start();
  rep.initMetrics();
  const push = (yaw: number, n: number) => { for (let i = 0; i < n; i++) { rep._ry[rep._rh] = yaw; rep._rd[rep._rh] = 1 / 60; rep._rh = (rep._rh + 1) % 512; rep._rn++; } };
  push(0.5, 60);   // a second looking one way
  push(2.0, 15);   // the last quarter second: eyes somewhere else
  expect(rep.smoothedYaw(0.5)).toBeGreaterThan(0.8);
  expect(rep.smoothedYaw(0.5, 0.25)).toBeCloseTo(0.5, 3);
  expect(rep.smoothedYaw(0.3, 0.25)).toBeCloseTo(0.5, 3);
});

test('body shape ignores eyes swung off the ball in the last 0.25 s before the touch', () => {
  const body = (swing: boolean) => {
    const w = makeWorld();
    const rep: any = new Rep(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx: fx() });
    rep.minFlight = 1.2;
    play(rep, w, (r, ww) => {
      const f = ww.ball.flight;
      const late = r.state === 'incoming' && f && f.dur - f.t < 0.2;
      ww.yaw = bearing(ww, r.passer ? r.passer.pos : ww.ball.pos) + (swing && late ? 90 * DEG : 0); // on the man who played it
    }, { release: 'first' });
    return rep.result.body;
  };
  expect(body(false)).toBe('CLOSED');          // watching the passer square on
  expect(body(true)).toBe('CLOSED');           // the glance at the touch is not a half-turn
});

test('snapThisFrame is raised on the frame a snap turn is read and cleared on the next', () => {
  const w = makeWorld();
  const rep: any = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  rep.start();
  watchBall(rep, w); rep.update(1 / 60);
  expect(rep.snapThisFrame).toBe(false);
  w.snapTurned = true; w.yaw += 0.5; rep.update(1 / 60);
  expect(rep.snapThisFrame).toBe(true);
  expect(w.snapTurned).toBe(false);
  rep.update(1 / 60);
  expect(rep.snapThisFrame).toBe(false);
});

test('the gaze trackers do not credit the frame a snap turn swung the view onto a player', () => {
  const w = makeWorld();
  const rep: any = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx: fx() });
  rep.start();
  const mate = rep.mates.find((m: any) => m.slot !== 'GK' && m !== rep.carrier);
  const idx = rep.mates.indexOf(mate);
  for (let i = 0; i < 30; i++) { w.yaw = bearing(w, mate.pos); w.snapTurned = true; rep.update(1 / 60); }
  expect(rep.sawMate[idx]).toBeLessThan(0);
  for (let i = 0; i < 30; i++) { w.yaw = bearing(w, mate.pos); rep.update(1 / 60); }
  expect(rep.sawMate[idx]).toBeGreaterThan(0);
});

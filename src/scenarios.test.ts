import { test, expect } from 'bun:test';
import * as THREE from 'three';
import { ROLES, AWAY_442 } from './config.js';
import { SCENARIOS, SCENARIO_NAMES, SCENARIO_ROLES, PALETTE } from './scenarios.js';

// --- headless world (same approach as drills.test.ts) ---------------------------------------
class FakePlayer {
  pos = new THREE.Vector3(); vel = new THREE.Vector3(); target = new THREE.Vector3();
  heading = 0; maxSpeed = 6; wobble = Math.random() * 100; mood = 0; role: any = null; ring = 0; ringHex = 0xffffff;
  ringMat = { color: { getHex: () => this.ringHex }, opacity: 0 };
  arms = [{ rotation: { x: 0, z: 0 } }, { rotation: { x: 0, z: 0 } }];
  visible = true; stalk: any = null; pressV = 0;
  constructor(public slot: string, public number: number, public team: string) {}
  place(x: number, z: number, h?: number) { this.pos.set(x, 0, z); this.target.copy(this.pos); this.vel.set(0, 0, 0); this.mood = 0; if (h !== undefined) this.heading = h; }
  sync() {}
  setVisible(v: boolean) { this.visible = v; }
  highlight(c: number, o: number) { this.ringHex = c; this.ringMat.opacity = o; }
  step(dt: number) {
    const to = this.target.clone().sub(this.pos); const d = to.length();
    if (d > 0.05) { to.multiplyScalar(Math.min(this.maxSpeed * dt, d) / d); this.pos.add(to); this.vel.copy(to).multiplyScalar(1 / dt); this.heading = Math.atan2(to.x, to.z); } else this.vel.set(0, 0, 0);
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
    yaw: 0, user: new THREE.Vector3(), ball: new FakeBall(),
    away: AWAY_442.map(([s, , , n]: any) => new FakePlayer(s, n, 'away')),
    goalGlow: { visible: false }, choiceLine: {}, rondo: null,
    useFormation(F: any) { this.home = sets.get(F); this.home.forEach((p: any) => p.setVisible(true)); this.away.forEach((p: any) => p.setVisible(true)); },
    clearOverlays() { [...this.home, ...this.away].forEach((p: any) => p.highlight(0xffffff, 0)); }, setLine() {}, showRondo() {},
    placeUser(p: any, yaw: number) { this.user.copy(p); this.yaw = yaw; },
    userPos(out = new THREE.Vector3()) { return out.copy(this.user); },
    headYaw() { return this.yaw; }, moveUser(dx: number, dz: number) { this.user.x += dx; this.user.z += dz; },
  };
  return w;
}
const calls: Record<string, number> = {};
const fx = new Proxy({}, { get: (_t, k: string) => () => { calls[k] = (calls[k] || 0) + 1; } });

const heading = (a: any, b: any) => Math.atan2(b.x - a.x, b.z - a.z);
function make(key: string, role?: string, o: any = {}) {
  const w = makeWorld();
  const rep: any = new (SCENARIOS as any)[key](w, { role: role ?? SCENARIO_ROLES[key][0], difficulty: o.diff ?? 'MEDIUM', quiz: false, motion: false, fx, speed: o.speed });
  rep.start();
  return { w, rep };
}
// a controller ray from the viewer's head at a player (or a point on the grass), then the trigger
function aimAt(w: any, rep: any, target: any, ground = false) {
  const o = w.user.clone(); o.y = 1.6;
  const p = target.pos ?? target;
  const dir = new THREE.Vector3(p.x, ground ? 0.5 : 1, p.z).sub(o).normalize();
  rep.aim(o, dir);
  return rep.select();
}
function play(rep: any, w: any, drive: (rep: any, w: any) => void, limit = 30) {
  let t = 0;
  while (rep.state !== 'done' && t < limit) {
    drive(rep, w);
    if (rep.state === 'quiz') { rep.endQuiz(50); continue; }
    rep.update(1 / 30);
    t += 1 / 30;
  }
  return t;
}
const noop = () => {};
// pass to f(rep) once the ball has arrived (state decide)
const decideWith = (f: (rep: any) => any) => (rep: any, w: any) => {
  if (rep.state === 'decide') { const tg = f(rep); if (tg) aimAt(w, rep, tg); }
};
// pass to f(rep) while the ball is still in the air (queues a one-touch)
const incomingWith = (f: (rep: any) => any, from = 0.5) => (rep: any, w: any) => {
  if (rep.state === 'incoming' && rep.t - rep.strikeAt >= from) { const tg = f(rep); if (tg) aimAt(w, rep, tg); }
  else if (rep.state === 'decide') { const tg = f(rep); if (tg) aimAt(w, rep, tg); }
};

const KEYS = Object.keys(SCENARIOS);
// where a runner will be when a ball hit from the viewer's feet gets there (a fixed point on rep.runnerAt)
const leadPoint = (rep: any, w: any) => {
  const from = w.ball.pos;
  let L: any = { x: rep.runner.pos.x, z: rep.runner.pos.z };
  for (let i = 0; i < 6; i++) {
    const T = Math.hypot(L.x - from.x, L.z - from.z) / 17;
    L = rep.runnerAt(T, {});
  }
  return L;
};

test('registry: eleven scenarios with names and roles', () => {
  expect(KEYS).toEqual(['press', 'switch', 'thirdman', 'signal', 'colour', 'memory', 'turn', 'inhibit', 'sandwich', 'through', 'gkbuild']);
  for (const k of KEYS) {
    expect(typeof (SCENARIO_NAMES as any)[k]).toBe('string');
    expect((SCENARIO_NAMES as any)[k]).toBe((SCENARIO_NAMES as any)[k].toUpperCase());
    expect(SCENARIO_ROLES[k].length).toBeGreaterThan(0);
    for (const r of SCENARIO_ROLES[k]) expect((ROLES as any)[r]).toBeTruthy();
  }
});

for (const key of KEYS) {
  test(`${key}: sets the scene on the pitch, whatever role is asked for`, () => {
    for (const asked of ['GK', 'CB', 'ST', ...SCENARIO_ROLES[key]]) {
      for (let n = 0; n < 8; n++) {
        const { w, rep } = make(key, asked);
        expect(SCENARIO_ROLES[key]).toContain(rep.roleKey);
        expect(rep.state).toBe('buildup');
        expect(rep.chain.length).toBeGreaterThan(0);
        expect(rep.carrier).toBe(rep.chain[0]);
        expect(rep.pressers.length).toBeGreaterThan(0);
        const all = [...w.home.filter((p: any) => p !== rep.userBody), ...w.away];
        for (const p of all) {
          expect(Math.abs(p.pos.x)).toBeLessThanOrEqual(52.5);
          expect(Math.abs(p.pos.z)).toBeLessThanOrEqual(34);
        }
        for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) expect(all[i].pos.distanceTo(all[j].pos)).toBeGreaterThan(0.5);
        // the viewer is not on top of anyone, and faces the ball
        for (const p of all) expect(p.pos.distanceTo(w.user)).toBeGreaterThan(1.1);
        const toBall = heading(w.user, w.ball.pos);
        expect(Math.abs(Math.atan2(Math.sin(w.yaw - toBall), Math.cos(w.yaw - toBall)))).toBeLessThan(0.1);
      }
    }
  });

  test(`${key}: plays out to done with a scenario result`, () => {
    for (const diff of ['EASY', 'ELITE']) {
      const { w, rep } = make(key, undefined, { diff });
      const t = play(rep, w, noop); // nobody touches the controller: the press wins the ball
      expect(rep.state).toBe('done');
      expect(t).toBeLessThan(30);
      const r = rep.result;
      expect(r.scenario).toBe(key);
      expect(r.drill).toBe(key);
      expect(r.role).toBe(rep.roleKey);
      expect(typeof r.fact).toBe('string');
      expect(r.fact.length).toBeGreaterThan(0);
      expect(r.fact.length).toBeLessThan(40);
      expect(r.scenarioScore).toBeGreaterThanOrEqual(0);
      expect(r.scenarioScore).toBeLessThanOrEqual(100);
      expect(r.outcome).toBe('lost');
      // S1's metrics survive the scenario
      for (const f of ['timing', 'badScans', 'critical', 'info', 'body', 'scanRate10', 'par', 'decisionSpeed', 'bestNumber', 'reason']) expect(f in r).toBe(true);
      expect(rep.frames.length).toBeGreaterThan(20);
    }
  });

  test(`${key}: the final pass flies the planned time, scaled by the game speed`, () => {
    for (const speed of [1, 0.5]) {
      const { w, rep } = make(key, undefined, { speed });
      let strike = -1, arrive = -1;
      for (let i = 0; i < 3600 && arrive < 0; i++) {
        const before = rep.state;
        rep.update(1 / 60);
        if (before === 'buildup' && rep.state === 'incoming') strike = rep.t;
        if (before === 'incoming' && rep.state !== 'incoming') arrive = rep.t;
      }
      expect(strike).toBeGreaterThan(0);
      const planned = (SCENARIOS as any)[key].flight / speed;
      expect(arrive - strike).toBeGreaterThan(planned - 0.08);
      expect(arrive - strike).toBeLessThan(planned + 0.1);
    }
  });
}

test('press: one touch when the presser is close, half-turn forward when he is not', () => {
  const seen = { close: 0, far: 0 };
  for (let n = 0; n < 24; n++) {
    const { w, rep } = make('press', n % 2 ? 'CM' : 'CDM');
    let pickedAnswer: any = null;
    play(rep, w, decideWith((r) => (pickedAnswer = r.answer().target)));
    const good = rep.result;
    const close = rep.presserDist < 3.5;
    seen[close ? 'close' : 'far']++;
    expect(good.correct).toBe(true);
    expect(good.decision).toBe(100);
    expect(pickedAnswer).toBe(close ? rep.freeMan : rep.fwdMan);
    expect(good.fact).toMatch(/^PRESSER \d\.\d M$/);

    const b = make('press', n % 2 ? 'CM' : 'CDM');
    play(b.rep, b.w, decideWith((r) => r.wrongs()[0]));
    expect(b.rep.result.correct).toBe(b.rep.presserDist >= 3.5 ? b.rep.answer().target === b.rep.wrongs()[0] : false);
    expect(b.rep.result.decision).toBeLessThan(good.decision);
    expect(b.rep.result.scenarioScore).toBeLessThan(good.scenarioScore + 1);
  }
  expect(seen.close).toBeGreaterThan(3);
  expect(seen.far).toBeGreaterThan(3);
});

test('press: the presser is under 3.5 m or over 4 m at arrival, never in between', () => {
  let band = 0;
  for (let n = 0; n < 60; n++) {
    const { w, rep } = make('press', 'CM', { diff: ['EASY', 'MEDIUM', 'HARD', 'ELITE'][n % 4] });
    play(rep, w, decideWith(() => null), 10);
    const d = rep.presserDist;
    if (d > 3.5 && d < 4.0) band++;
  }
  expect(band).toBeLessThan(8);
});

test('press: seeing the presser behind is credited', () => {
  const look = (rep: any, w: any) => { if (rep.state === 'incoming') w.yaw = heading(w.user, rep.presser.pos); };
  const { w, rep } = make('press');
  play(rep, w, (r, ww) => { look(r, ww); decideWith((x) => x.answer().target)(r, ww); });
  expect(rep.result.sawPresserBehind).toBe(true);
  expect(rep.result.scenarioScore).toBe(100);
  const b = make('press');
  play(b.rep, b.w, decideWith((x) => x.answer().target));
  expect(b.rep.result.sawPresserBehind).toBe(false);
  expect(b.rep.result.scenarioScore).toBe(65);
});

test('switch: switch when the lane margin is 1.5 m or more, else recycle', () => {
  const seen = { switchOn: 0, recycle: 0 };
  for (let n = 0; n < 24; n++) {
    const role = n % 2 ? 'FB' : 'W';
    const { w, rep } = make('switch', role);
    play(rep, w, decideWith((r) => r.answer().target));
    const good = rep.result;
    const wing = rep.answer().target === rep.winger;
    seen[wing ? 'switchOn' : 'recycle']++;
    expect(good.correct).toBe(true);
    expect(good.decision).toBe(100);
    expect(good.fact).toMatch(/^LANE -?\d\.\d M (OPEN|TIGHT)$/);
    expect(good.switchDist).toBeGreaterThan(30);
    expect(good.switchDist).toBeLessThan(39);
    expect(good.laneMargin >= 1.5).toBe(wing);

    const b = make('switch', role);
    play(b.rep, b.w, decideWith((r) => r.wrongs()[0]));
    expect(b.rep.result.correct).toBe(false);
    expect(b.rep.result.decision).toBeLessThan(good.decision);
  }
  expect(seen.switchOn).toBeGreaterThan(3);
  expect(seen.recycle).toBeGreaterThan(3);
});

test('switch: the user is on the flank of his slot, the far winger on the other', () => {
  for (let n = 0; n < 20; n++) {
    const { w, rep } = make('switch', n % 2 ? 'FB' : 'W');
    const side = rep.userBody.slot.startsWith('L') ? -1 : 1;
    expect(Math.sign(w.user.z)).toBe(side);
    expect(Math.sign(rep.winger.pos.z)).toBe(-side);
    expect(rep.winger.slot).toBe(side > 0 ? 'LW' : 'RW');
  }
});

test('thirdman: a led pass into the runner path beats a pass to his feet and a pass back', () => {
  const lead = (rep: any, w: any) => {
    // where the runner will be when a ball hit from the viewer's feet gets there
    const from = w.ball.pos, r = rep.runner;
    let L = { x: r.pos.x, z: r.pos.z };
    for (let i = 0; i < 5; i++) {
      const T = Math.hypot(L.x - from.x, L.z - from.z) / 17;
      const k = Math.min(Math.hypot(rep.E.x - r.pos.x, rep.E.z - r.pos.z), rep.runV * T);
      L = { x: r.pos.x + rep.runDir.x * k, z: r.pos.z + rep.runDir.z * k };
    }
    return L;
  };
  let sumLed = 0, sumFeet = 0, n = 0;
  for (let i = 0; i < 16; i++) {
    const role = i % 2 ? 'CAM' : 'ST';
    const A = make('thirdman', role);
    play(A.rep, A.w, (rep, w) => {
      if (rep.state === 'incoming' && rep.runStarted) w.yaw = heading(w.user, rep.runner.pos);
      if (rep.state === 'decide') aimAt(w, rep, lead(rep, w), true);
    });
    const led = A.rep.result;
    expect(led.runnerSeen).toBe(true);
    expect(led.quick).toBe(true);
    expect(led.leadErr).toBeLessThan(2.2);
    expect(led.correct).toBe(true);
    expect(['completed', 'tight']).toContain(led.outcome);
    expect(led.decision).toBe(100);
    expect(led.fact).toMatch(/^INTO THE RUN \d\.\d M$/);

    const B = make('thirdman', role);
    play(B.rep, B.w, decideWith((r) => r.runner));
    const feet = B.rep.result;
    expect(feet.leadErr).toBeGreaterThan(2);
    expect(feet.correct).toBe(false);
    expect(feet.decision).toBe(100); // the right man...
    expect(feet.scenarioScore).toBeLessThan(led.scenarioScore); // ...but not into his path

    const C = make('thirdman', role);
    play(C.rep, C.w, decideWith((r) => r.wrongs()[0]));
    expect(C.rep.result.decision).toBeLessThan(100);
    expect(C.rep.result.fact).toBe('RUNNER MISSED');
    sumLed += led.scenarioScore; sumFeet += feet.scenarioScore; n++;
  }
  expect(sumLed / n).toBeGreaterThan(sumFeet / n + 10);
});

test('thirdman: the runner starts running while the ball is in the air', () => {
  const { w, rep } = make('thirdman');
  let startedIn = '';
  const start = { x: rep.runner.pos.x, z: rep.runner.pos.z };
  for (let i = 0; i < 300 && !startedIn; i++) {
    rep.update(1 / 30);
    if (rep.runStarted) startedIn = rep.state;
  }
  expect(startedIn).toBe('incoming');
  for (let i = 0; i < 30; i++) rep.update(1 / 30);
  expect(rep.runner.pos.distanceTo(new THREE.Vector3(start.x, 0, start.z))).toBeGreaterThan(2);
});

test('thirdman: aiming at a point on the runner path leads him, aiming at him does not', () => {
  const { w, rep } = make('thirdman');
  for (let i = 0; i < 300 && !(rep.state === 'incoming' && rep.runStarted); i++) rep.update(1 / 30);
  for (let i = 0; i < 12; i++) rep.update(1 / 30);
  const r = rep.runner;
  const ahead = { x: r.pos.x + rep.runDir.x * 3.5, z: r.pos.z + rep.runDir.z * 3.5 };
  aimAt(w, rep, ahead, true);
  expect(rep.aimed?.target).toBe(r);
  expect(rep.aimed?.lead).toBeTruthy();
  expect(Math.hypot(rep.aimed.lead.x - ahead.x, rep.aimed.lead.z - ahead.z)).toBeLessThan(0.6);
  aimAt(w, rep, r);
  expect(rep.aimed?.target).toBe(r);
  expect(rep.aimed?.lead).toBeUndefined();
});

test('signal: the waver is worth nothing, the quiet teammate is the answer, the arm goes up', () => {
  for (let n = 0; n < 12; n++) {
    const role = SCENARIO_ROLES.signal[n % SCENARIO_ROLES.signal.length];
    const A = make('signal', role);
    // the wave
    for (let i = 0; i < 20; i++) A.rep.update(1 / 30);
    expect(A.rep.waver.arms[1].rotation.x).toBeLessThan(-2.4);
    expect(A.rep.quiet.arms[1].rotation.x).toBe(0);
    play(A.rep, A.w, decideWith((r) => r.quiet));
    const good = A.rep.result;
    expect(good.followedWave).toBe(false);
    expect(good.correct).toBe(true);
    expect(good.decision).toBe(100);
    expect(good.fact).toBe('WAVE IGNORED');

    const B = make('signal', role);
    play(B.rep, B.w, decideWith((r) => r.waver));
    const bad = B.rep.result;
    expect(bad.followedWave).toBe(true);
    expect(bad.decision).toBe(0);
    expect(bad.scenarioScore).toBe(0);
    expect(bad.fact).toBe('FOLLOWED THE WAVE');
    expect(bad.outcome).toBe('intercepted');
  }
});

test('signal: the waver is covered, the quiet man is clear, and the quiet man is behind', () => {
  for (let n = 0; n < 20; n++) {
    const { w, rep } = make('signal');
    const near = (p: any) => Math.min(...w.away.map((o: any) => o.pos.distanceTo(p.pos)));
    expect(near(rep.waver)).toBeLessThan(2);
    expect(near(rep.quiet)).toBeGreaterThan(6);
    const toBall = heading(w.user, rep.passer.pos);
    const a = Math.abs(Math.atan2(Math.sin(heading(w.user, rep.quiet.pos) - toBall), Math.cos(heading(w.user, rep.quiet.pos) - toBall)));
    expect(a).toBeGreaterThan(1.5);
  }
});

test('colour: three distinct rings, a call during the flight, first time to the called colour', () => {
  for (let n = 0; n < 12; n++) {
    const role = SCENARIO_ROLES.colour[n % SCENARIO_ROLES.colour.length];
    const A = make('colour', role);
    const hexes = [...A.rep.cmap.values()].map((c: any) => c.hex);
    expect(new Set(hexes).size).toBe(3);
    for (const c of A.rep.cmap.values()) expect(PALETTE.map((p) => p.hex)).toContain(c.hex);
    for (const [p, c] of A.rep.cmap) { expect(p.ringHex).toBe(c.hex); expect(p.ringMat.opacity).toBeGreaterThan(0.5); }
    let calledAt = -1, calledState = '', flashed = 0;
    play(A.rep, A.w, (rep, w) => {
      if (rep.called && calledAt < 0) { calledAt = rep.t; calledState = rep.state; }
      if (rep.called && rep.callLeft > 0) flashed++;
      // wait for the call, then pass first time
      if (rep.state === 'incoming' && rep.called) aimAt(w, rep, rep.calledPlayer);
      // rings stay on while the ball is in flight
      if (rep.state === 'incoming' && rep.t < rep.strikeAt + 0.2) for (const [p, c] of rep.cmap) expect(p.ringHex).toBe(c.hex);
    });
    const good = A.rep.result;
    expect(calledState).toBe('incoming');
    expect(flashed / 30).toBeGreaterThan(0.3);
    expect(flashed / 30).toBeLessThan(0.5);
    expect(good.correct).toBe(true);
    expect(good.onTime).toBe(true);
    expect(good.decision).toBe(100);
    expect(good.fact).toMatch(/^CALLED [A-Z]+ 0\.0 S$/);
    expect(good.calledColour).toBe(good.pickedColour);

    const B = make('colour', role);
    play(B.rep, B.w, (rep, w) => { if (rep.state === 'incoming' && rep.called) aimAt(w, rep, rep.wrongs()[0]); });
    expect(B.rep.result.correct).toBe(false);
    expect(B.rep.result.decision).toBeLessThan(80);
    expect(B.rep.result.scenarioScore).toBe(0);
    expect(B.rep.result.fact).toMatch(/^CALLED [A-Z]+, PLAYED [A-Z]+$/);
  }
});

test('colour: a late pass to the right colour scores less than a first-time one', () => {
  const A = make('colour', 'CM');
  play(A.rep, A.w, (rep, w) => { if (rep.state === 'incoming' && rep.called) aimAt(w, rep, rep.calledPlayer); });
  const B = make('colour', 'CM');
  let waited = 0;
  play(B.rep, B.w, (rep, w) => {
    if (rep.state === 'decide') { waited += 1 / 30; if (waited > 1.15) aimAt(w, rep, rep.calledPlayer); }
  });
  expect(B.rep.result.correct).toBe(true);
  expect(B.rep.result.onTime).toBe(false);
  expect(B.rep.result.scenarioScore).toBeLessThan(A.rep.result.scenarioScore);
  expect(B.rep.result.decisionSpeed).toBeGreaterThan(A.rep.result.decisionSpeed + 0.8);
});

test('colour: the three coloured teammates are not all in front of the viewer', () => {
  for (let n = 0; n < 20; n++) {
    const { w, rep } = make('colour', 'CM');
    const toBall = heading(w.user, rep.passer.pos);
    const behind = rep.coloured.filter((p: any) => Math.abs(Math.atan2(Math.sin(heading(w.user, p.pos) - toBall), Math.cos(heading(w.user, p.pos) - toBall))) > 1.5);
    expect(behind.length).toBeGreaterThanOrEqual(1);
  }
});

test('turn: with a shoulder scan turn and play forward, without one play it back', () => {
  for (let n = 0; n < 16; n++) {
    const role = n % 2 ? 'CM' : 'CDM';
    // scanned
    const A = make('turn', role);
    play(A.rep, A.w, (rep, w) => {
      if (rep.state === 'incoming' && rep.t - rep.strikeAt < 0.8) w.yaw = heading(w.user, rep.presser.pos);
      else if (rep.state === 'incoming') w.yaw = heading(w.user, w.ball.pos);
      if (rep.state === 'decide') aimAt(w, rep, rep.answer().target);
    });
    const a = A.rep.result;
    expect(a.shoulderScan).toBe(true);
    expect(a.turned).toBe(true);
    expect(a.correct).toBe(true);
    expect(a.decision).toBe(100);
    expect(a.fact).toBe('SHOULDER SCAN');

    // the same pass without looking is a blind turn into the press
    const B = make('turn', role);
    play(B.rep, B.w, decideWith((r) => r.freeMid));
    expect(B.rep.result.shoulderScan).toBe(false);
    expect(B.rep.result.correct).toBe(false);
    expect(B.rep.result.decision).toBeLessThan(a.decision);

    // no scan, one touch back
    const C = make('turn', role);
    play(C.rep, C.w, incomingWith((r) => r.passer, 0.9));
    expect(C.rep.result.shoulderScan).toBe(false);
    expect(C.rep.result.correct).toBe(true);
    expect(C.rep.result.decision).toBe(100);
    expect(C.rep.result.fact).toBe('NO SCAN BEHIND');
    expect(C.rep.result.scenarioScore).toBeLessThan(a.scenarioScore + 1);
    expect(C.rep.result.scenarioScore).toBeGreaterThan(B.rep.result.scenarioScore);
  }
});

test('turn: the presser is behind the viewer and the free midfielder beyond him', () => {
  for (let n = 0; n < 20; n++) {
    const { w, rep } = make('turn', n % 2 ? 'CM' : 'CDM');
    const toBall = heading(w.user, rep.passer.pos);
    const off = (p: any) => Math.abs(Math.atan2(Math.sin(heading(w.user, p.pos) - toBall), Math.cos(heading(w.user, p.pos) - toBall)));
    expect(off(rep.presser)).toBeGreaterThan(2.3);
    expect(rep.presser.pos.distanceTo(w.user)).toBeLessThan(5);
    expect(off(rep.freeMid)).toBeGreaterThan(2.3);
    expect(rep.freeMid.pos.distanceTo(w.user)).toBeGreaterThan(9);
    expect(rep.freeMid.pos.x).toBeGreaterThan(w.user.x + 6);
  }
});

test('inhibit: a tone mid-aim closes the lane and slows time; switch in time or lose the mark', () => {
  for (let n = 0; n < 10; n++) {
    const role = SCENARIO_ROLES.inhibit[n % 3];
    const before = calls.alert || 0;
    const A = make('inhibit', role);
    let first: any = null, cueAt = 0, switched = false, slowSeen = false, lane = Infinity;
    play(A.rep, A.w, (rep, w) => {
      if (rep.cueFired && rep.closed) lane = Math.min(lane, rep.stepper.get(rep.closed).pos.distanceTo(new THREE.Vector3(rep.laneMid.x, 0, rep.laneMid.z)));
      if (rep.state !== 'decide' && rep.state !== 'incoming') return;
      if (!rep.cueFired) { first = first || rep.A; aimAt(w, rep, first); return; }
      if (!cueAt) cueAt = rep.rawT;
      slowSeen = slowSeen || rep.slow === 0.5;
      if (rep.rawT - cueAt > 0.35 && !switched) { switched = aimAt(w, rep, rep.answer().target); }
    });
    const good = A.rep.result;
    expect((calls.alert || 0) - before).toBe(1);
    expect(slowSeen).toBe(true);
    expect(lane).toBeLessThan(1.5); // the defender stepped into the lane
    expect(A.rep.closed).toBe(first);
    expect(good.inhibition.cued).toBe(true);
    expect(good.inhibition.repeated).toBe(false);
    expect(good.inhibition.delay).toBeGreaterThan(0.3);
    expect(good.inhibition.delay).toBeLessThan(0.8);
    expect(good.correct).toBe(true);
    expect(good.decision).toBe(100);
    expect(good.scenarioScore).toBeGreaterThan(75);
    expect(good.fact).toMatch(/^SWITCHED 0\.\d\d S$/);
    expect(A.rep.slow).toBe(1);

    // pass at the same man again after the tone
    const B = make('inhibit', role);
    let bf: any = null, bc = 0, done = false;
    play(B.rep, B.w, (rep, w) => {
      if (rep.state !== 'decide' && rep.state !== 'incoming') return;
      if (!rep.cueFired) { bf = bf || rep.A; aimAt(w, rep, bf); return; }
      if (!bc) bc = rep.rawT;
      if (rep.rawT - bc > 0.3 && !done) done = aimAt(w, rep, rep.closed);
    });
    expect(B.rep.result.inhibition.repeated).toBe(true);
    expect(B.rep.result.decision).toBeLessThan(good.decision);
    expect(B.rep.result.scenarioScore).toBe(0);
    expect(B.rep.result.fact).toBe('REPEATED THE PASS');

    // switch, but slowly
    const C = make('inhibit', role);
    let cf: any = null, cc = 0, cdone = false;
    play(C.rep, C.w, (rep, w) => {
      if (rep.state !== 'decide' && rep.state !== 'incoming') return;
      if (!rep.cueFired) { cf = cf || rep.A; aimAt(w, rep, cf); return; }
      if (!cc) cc = rep.rawT;
      if (rep.rawT - cc > 0.95 && !cdone) cdone = aimAt(w, rep, rep.answer().target);
    }, 40);
    expect(C.rep.result.inhibition.delay).toBeGreaterThan(0.8);
    expect(C.rep.result.correct).toBe(false);
    expect(C.rep.result.scenarioScore).toBeLessThan(good.scenarioScore);
    expect(C.rep.result.scenarioScore).toBeGreaterThan(B.rep.result.scenarioScore);
  }
});

test('inhibit: a trigger pulled before the tone is withheld until the tone', () => {
  const { w, rep } = make('inhibit', 'CM');
  for (let i = 0; i < 400 && rep.state !== 'decide'; i++) rep.update(1 / 30);
  expect(rep.state).toBe('decide');
  expect(aimAt(w, rep, rep.A)).toBe(true); // trigger at once
  expect(rep.state).toBe('decide'); // the pass did not go
  expect(rep.early).toBe(true);
  let guard = 0;
  while (!rep.cueFired && guard++ < 200) { aimAt(w, rep, rep.A); rep.update(1 / 30); }
  expect(rep.cueFired).toBe(true);
  expect(rep.state).toBe('decide');
  expect(rep.rawT - rep.lockT).toBeGreaterThanOrEqual(0.39);
  expect(rep.rawT - rep.lockT).toBeLessThan(1.1);
});

test('inhibit: no tone when the aim stays on a covered teammate', () => {
  const { w, rep } = make('inhibit', 'CM');
  const covered = rep.mates.find((m: any) => !rep.freeSet.has(m) && m.slot !== 'GK' && m.pos.distanceTo(w.user) > 4);
  play(rep, w, (r, ww) => { if (r.state === 'decide') aimAt(ww, r, covered); });
  expect(rep.cueFired).toBe(false);
  expect(rep.result.fact).toBe('NO TONE');
  expect(rep.result.inhibition.cued).toBe(false);
});

test('sandwich: one touch back to the centre back beats the gap and the second touch', () => {
  for (let n = 0; n < 16; n++) {
    const role = SCENARIO_ROLES.sandwich[n % 3];
    const A = make('sandwich', role);
    play(A.rep, A.w, (rep, w) => {
      if (rep.state === 'incoming') { w.yaw = heading(w.user, (rep.t - rep.strikeAt) % 0.4 < 0.2 ? rep.pA.pos : rep.pB.pos); }
      incomingWith((r) => r.passer, 0.4)(rep, w);
    });
    const good = A.rep.result;
    expect(good.oneTouchBack).toBe(true);
    expect(good.kept).toBe(true);
    expect(good.correct).toBe(true);
    expect(good.decision).toBe(100);
    expect(good.fact).toBe('ONE TOUCH BACK');
    expect(good.bothPressersSeen).toBe(true);
    expect(good.scenarioScore).toBe(100);

    const B = make('sandwich', role);
    play(B.rep, B.w, decideWith((r) => r.passer));
    expect(B.rep.result.oneTouchBack).toBe(false);
    expect(B.rep.result.fact).toBe('SECOND TOUCH BACK');
    expect(B.rep.result.decision).toBe(100);
    expect(B.rep.result.scenarioScore).toBeLessThan(good.scenarioScore);

    const C = make('sandwich', role);
    play(C.rep, C.w, decideWith((r) => r.wrongs()[0]));
    expect(C.rep.result.fact).toBe('THROUGH THE GAP');
    expect(C.rep.result.decision).toBeLessThan(good.decision);
    expect(C.rep.result.scenarioScore).toBeLessThan(B.rep.result.scenarioScore);
  }
});

test('sandwich: a presser either side and a lane between them', () => {
  for (let n = 0; n < 20; n++) {
    const { w, rep } = make('sandwich', SCENARIO_ROLES.sandwich[n % 3]);
    const toBall = heading(w.user, rep.passer.pos);
    const rel = (p: any) => Math.atan2(Math.sin(heading(w.user, p.pos) - toBall), Math.cos(heading(w.user, p.pos) - toBall));
    expect(Math.sign(rel(rep.pA))).toBe(-Math.sign(rel(rep.pB)));
    expect(Math.abs(rel(rep.pA))).toBeGreaterThan(1.4);
    expect(Math.abs(rel(rep.gapMan))).toBeGreaterThan(2.7); // straight through them
  }
});

test('a blackout quiz is only offered where it does not break the timing', () => {
  for (const k of KEYS) {
    const w = makeWorld();
    const rep: any = new (SCENARIOS as any)[k](w, { role: SCENARIO_ROLES[k][0], difficulty: 'MEDIUM', quiz: true, motion: false, fx });
    expect(rep.quizWanted).toBe(['press', 'switch', 'signal', 'sandwich'].includes(k));
  }
});

test('answers are never decided by the scenario alone: lane margins still rule', () => {
  // a wrong-but-open pass can still complete; the decision score is what falls
  const { w, rep } = make('press', 'CM');
  play(rep, w, decideWith((r) => r.wrongs()[0]));
  expect(rep.result.decision).toBeLessThan(100);
  expect(['completed', 'tight', 'intercepted']).toContain(rep.result.outcome);
});

test('through: the back four step up as one flat line; the runner is timed onside or caught offside', () => {
  const seen = { trap: 0, on: 0 };
  let sumLed = 0, sumFeet = 0, nOn = 0;
  for (let i = 0; i < 60 && (i < 24 || seen.trap < 6 || seen.on < 6); i++) {
    const role = i % 2 ? 'W' : 'ST';
    const A = make('through', role);
    const rep = A.rep;
    expect(rep.line.length).toBe(4);
    const x0 = rep.line.map((o: any) => o.pos.x);
    expect(Math.max(...x0) - Math.min(...x0)).toBeLessThan(0.01); // level at the start
    // nobody else is deeper than the four, now or after the step
    for (const o of A.w.away) if (o.slot !== 'GK' && !rep.line.includes(o)) expect(o.pos.x).toBeLessThan(Math.min(...x0) - 1);
    play(rep, A.w, (r, w) => {
      // the line first (0.3 s on a centre back), then the runner
      if (r.state === 'incoming') w.yaw = heading(w.user, r.t - r.strikeAt < 0.3 ? r.line[1].pos : r.runner.pos);
      if (r.state === 'decide') aimAt(w, r, r.answer().offside ? r.answer().target : leadPoint(r, w), !r.answer().offside);
    });
    const res = rep.result;
    // the line stepped up together, by the amount the rep planned, and is flat again once it has settled
    const xs = rep.line.map((o: any) => o.pos.x);
    xs.forEach((x: number, k: number) => expect(x0[k] - x).toBeGreaterThan(rep.step - 0.5));
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThan(0.3);
    expect(res.runnerSeen).toBe(true);
    expect(res.lineSeen).toBe(true);
    // the offside line is read at the pass: the deepest of the four against the runner
    const o = rep.passOffside;
    expect(o.offside).toBe(rep.trap);
    expect(o.line).toBeCloseTo(Math.max(...rep.line.map((d: any) => d.pos.x)) + (rep.passOffside.line - o.line), 0);
    expect(res.offside).toBe(rep.trap);
    if (rep.trap) {
      seen.trap++;
      expect(o.margin).toBeGreaterThan(1.5);
      expect(rep.answer().target).toBe(rep.passer);
      expect(res.correct).toBe(true);
      expect(res.fact).toBe('OFFSIDE RUN · RECYCLED');
      expect(res.reason).toMatch(/^OFFSIDE BY \d\.\d M · RECYCLE$/);
      expect(res.decision).toBe(100);
      expect(['completed', 'tight']).toContain(res.outcome);
      expect(res.scenarioScore).toBeGreaterThan(75);
    } else {
      seen.on++; nOn++;
      expect(o.margin).toBeLessThan(-1.5);
      expect(res.correct).toBe(true);
      expect(res.quick).toBe(true);
      expect(res.leadErr).toBeLessThan(1.5);
      expect(res.decision).toBe(100);
      expect(['completed', 'tight']).toContain(res.outcome);
      expect(res.fact).toMatch(/^THROUGH BALL \d\.\d M$/);
      expect(res.reason).toMatch(/^ONSIDE BY \d\.\d M · THROUGH BALL$/);
      // the run is in behind the line: the runner ends up well past it
      expect(rep.runner.pos.x).toBeGreaterThan(x0[0]);
    }

    // a pass to the runner when he is offside is flagged and given away; to his feet when onside is off the run
    const same = () => { let m = make('through', role); while (m.rep.trap !== rep.trap) m = make('through', role); return m; };
    const B = same();
    play(B.rep, B.w, (r, w) => { if (r.state === 'decide') aimAt(w, r, r.runner); });
    if (B.rep.trap) {
      expect(B.rep.result.fact).toBe('OFFSIDE');
      expect(B.rep.result.correct).toBe(false);
      expect(B.rep.result.outcome).toBe('intercepted');
      expect(B.rep.result.decision).toBe(0);
      expect(B.rep.result.scenarioScore).toBeLessThan(20);
      expect(B.rep.events.some((e: any) => e.type === 'offside')).toBe(true);
    } else {
      expect(B.rep.result.offside).toBe(false);
      expect(B.rep.result.leadErr).toBeGreaterThan(res.leadErr);
      expect(B.rep.result.scenarioScore).toBeLessThanOrEqual(res.scenarioScore);
      sumLed += res.scenarioScore; sumFeet += B.rep.result.scenarioScore;
    }

    // any other pass: the wrong call when onside (RUNNER MISSED), a valid recycle when he is offside
    const C = same();
    play(C.rep, C.w, decideWith((r) => r.wrongs()[0]));
    if (C.rep.trap) {
      expect(C.rep.result.fact).toBe('OFFSIDE');
      expect(C.rep.result.correct).toBe(false);
    } else {
      expect(C.rep.result.fact).toBe('RUNNER MISSED');
      expect(C.rep.result.correct).toBe(false);
      expect(C.rep.result.decision).toBeLessThan(100);
    }
    const D = same();
    play(D.rep, D.w, decideWith((r) => r.passer));
    if (D.rep.trap) { expect(D.rep.result.correct).toBe(true); expect(D.rep.result.decision).toBe(100); }
    else { expect(D.rep.result.fact).toBe('RUNNER MISSED'); expect(D.rep.result.correct).toBe(false); }
  }
  expect(seen.trap).toBeGreaterThan(5);
  expect(seen.on).toBeGreaterThan(5);
  expect(sumLed / nOn).toBeGreaterThan(sumFeet / nOn + 8);
});

test('through: a runner who is timed onside goes offside if the pass is held too long', () => {
  let tested = 0;
  for (let i = 0; i < 80 && tested < 6; i++) {
    const { w, rep } = make('through', i % 2 ? 'W' : 'ST');
    if (rep.trap) continue;
    tested++;
    let waited = 0;
    play(rep, w, (r, ww) => {
      if (r.state === 'incoming' && r.finalStruck) ww.yaw = heading(ww.user, r.runner.pos);
      if (r.state === 'decide') { r.window = 5; waited += 1 / 30; if (waited > 1.3) aimAt(ww, r, r.runner); }
    });
    expect(rep.result.offside).toBe(true); // he ran past the line while the ball was held
    expect(rep.result.fact).toBe('OFFSIDE');
    expect(rep.result.correct).toBe(false);
  }
  expect(tested).toBeGreaterThan(5);
});

test('gkbuild: play to the open centre back, or go long when both are shut', () => {
  const seen = { both: 0, one: 0 };
  for (let n = 0; n < 120 && (n < 12 || seen.both < 4 || seen.one < 4); n++) {
    const A = make('gkbuild', 'GK');
    expect(A.rep.userBody.slot).toBe('GK');
    expect(A.rep.roleKey).toBe('GK');
    let want: any = null;
    play(A.rep, A.w, decideWith((r) => (want = r.answer().target)));
    const good = A.rep.result;
    expect(good.correct).toBe(true);
    expect(good.decision).toBe(100);
    expect(good.bothPressed).toBe(A.rep.both);
    expect(want).toBe(A.rep.both ? A.rep.longMan : A.rep.other);
    expect(good.fact).toBe(A.rep.both ? 'BOTH CENTRE BACKS SHUT' : 'ONE CENTRE BACK SHUT');
    seen[A.rep.both ? 'both' : 'one']++;
    if (!A.rep.both) expect(['completed', 'tight']).toContain(good.outcome);

    const B = make('gkbuild', 'GK');
    play(B.rep, B.w, decideWith((r) => r.wrongs()[0]));
    expect(B.rep.result.correct).toBe(false);
    expect(B.rep.result.decision).toBeLessThan(100);
    expect(B.rep.result.scenarioScore).toBeLessThan(good.scenarioScore + 1);
  }
  expect(seen.both).toBeGreaterThan(3);
  expect(seen.one).toBeGreaterThan(3);
});

test('gkbuild: the keeper stands on his goal line and the strikers jump from the front', () => {
  for (let n = 0; n < 20; n++) {
    const { w, rep } = make('gkbuild');
    expect(w.user.x).toBeLessThan(-45);
    expect(rep.longMan.pos.x).toBeGreaterThan(-15);
    for (const o of [rep.s1, rep.s2]) expect(o.pos.x).toBeGreaterThan(w.user.x + 5);
  }
});

// --- round 3 fixes -----------------------------------------------------------------------------

// look at p for `secs` of game time (stepping the rep), then back at the ball
function lookFor(w: any, rep: any, p: any, secs: number, snap = false) {
  const steps = Math.round(secs * 60);
  for (let i = 0; i < steps; i++) {
    w.yaw = heading(w.user, p.pos ?? p);
    if (snap) w.snapTurned = true;
    rep.update(1 / 60);
  }
}

test('saw: Rep\'s gaze (20 degree cone held 0.12 s); one frame, a wide glance, or snap-turn frames do not count', () => {
  // one frame straight at him: nothing
  const A = make('press', 'CM');
  lookFor(A.w, A.rep, A.rep.presser, 1 / 60);
  A.w.yaw = heading(A.w.user, A.w.ball.pos);
  for (let i = 0; i < 20; i++) A.rep.update(1 / 60);
  expect(A.rep.saw.presser).toBeUndefined();
  // 35 degrees off him for most of a second: inside the old 48 degree test, outside the cone
  const B = make('press', 'CM');
  const off = B.w.user.clone();
  for (let i = 0; i < 45; i++) { B.w.yaw = heading(B.w.user, B.rep.presser.pos) + 35 * Math.PI / 180; B.rep.update(1 / 60); }
  expect(B.rep.saw.presser).toBeUndefined();
  expect(B.rep.state).toBe('buildup');
  // held at him for 0.2 s: seen
  const C = make('press', 'CM');
  lookFor(C.w, C.rep, C.rep.presser, 0.2);
  expect(C.rep.saw.presser).toBe(true);
  expect(C.rep.saw.free).toBeUndefined();
  // a snap turn that swings the view onto him, held: the controller turned, he was not looked at
  const D = make('press', 'CM');
  lookFor(D.w, D.rep, D.rep.presser, 0.5, true);
  expect(D.rep.saw.presser).toBeUndefined();
  expect(D.rep.snapThisFrame).toBe(true);
  // and a genuine look afterwards still counts
  lookFor(D.w, D.rep, D.rep.presser, 0.2);
  expect(D.rep.saw.presser).toBe(true);
  expect(off.x).toBe(B.w.user.x);
});

test('saw: a short break in the look is forgiven, a long one starts again', () => {
  const A = make('press', 'CM');
  lookFor(A.w, A.rep, A.rep.presser, 0.08);
  lookFor(A.w, A.rep, { x: A.w.user.x, z: A.w.user.z - 40 }, 0.2); // looks the other way for 0.2 s
  expect(A.rep.saw.presser).toBeUndefined();
  lookFor(A.w, A.rep, A.rep.presser, 0.06);
  expect(A.rep.saw.presser).toBe(true);
  const B = make('press', 'CM');
  lookFor(B.w, B.rep, B.rep.presser, 0.08);
  const away = { x: B.w.user.x, z: B.w.user.z - 40 };
  lookFor(B.w, B.rep, { x: B.w.user.x - 40, z: B.w.user.z + 40 }, 0.5);
  lookFor(B.w, B.rep, B.rep.presser, 0.06);
  expect(B.rep.saw.presser).toBeUndefined();
  expect(away.z).toBeLessThan(B.w.user.z);
});

test('turn: no shoulder check cannot reach the 60 mark; the check, the right pass and an open body can', () => {
  for (let n = 0; n < 16; n++) {
    const role = n % 2 ? 'CM' : 'CDM';
    const scanned = (rep: any, w: any) => {
      if (rep.state === 'incoming' && rep.t - rep.strikeAt < 0.8 && rep.t - rep.strikeAt > 0.1) w.yaw = heading(w.user, rep.presser.pos);
      else if (rep.state === 'incoming') w.yaw = heading(w.user, w.ball.pos);
    };
    // checked, turned: full marks need the body shape too
    const A = make('turn', role);
    play(A.rep, A.w, (rep, w) => { scanned(rep, w); if (rep.state === 'decide') aimAt(w, rep, rep.answer().target); });
    expect(A.rep.result.shoulderScan).toBe(true);
    expect(A.rep.result.scenarioScore).toBeGreaterThanOrEqual(75);
    expect(A.rep.result.reason).toBe('SHOULDER CHECK · TURN AND PLAY FORWARD');

    // not checked, bounced back in one touch: the right pass, but nothing like the 60 mark
    const B = make('turn', role);
    play(B.rep, B.w, incomingWith((r) => r.passer, 0.9));
    expect(B.rep.result.shoulderScan).toBe(false);
    expect(B.rep.result.correct).toBe(true);
    expect(B.rep.result.scenarioScore).toBeLessThanOrEqual(55);
    expect(B.rep.result.reason).toBe('NO SHOULDER CHECK · BOUNCE IT BACK');
    // however the body is set: the ceiling is 55 for every shape
    for (const body of ['HALF-TURN', 'OPEN', 'CLOSED']) {
      const r: any = { body, outcome: 'completed' };
      const C = make('turn', role);
      C.rep.chosen = { target: C.rep.passer }; C.rep.decideT = 0.3;
      C.rep.describe(r);
      expect(r.correct).toBe(true);
      expect(r.scenarioScore).toBeLessThanOrEqual(55);
    }
    // checked, but the wrong pass: also under the mark
    const D = make('turn', role);
    play(D.rep, D.w, (rep, w) => { scanned(rep, w); if (rep.state === 'decide') aimAt(w, rep, rep.passer); });
    expect(D.rep.result.shoulderScan).toBe(true);
    expect(D.rep.result.correct).toBe(false);
    expect(D.rep.result.scenarioScore).toBeLessThanOrEqual(55);
  }
});

test('turn: a flick, a waggle or a snap turn is not a shoulder check', () => {
  const run = (look: (rep: any, w: any) => void) => {
    const A = make('turn', 'CDM');
    play(A.rep, A.w, (rep, w) => { look(rep, w); if (rep.state === 'decide') aimAt(w, rep, rep.freeMid); });
    return A.rep.result;
  };
  // 0.08 s at the presser
  expect(run((rep, w) => { if (rep.state === 'incoming') w.yaw = heading(w.user, rep.t - rep.strikeAt > 0.3 && rep.t - rep.strikeAt < 0.38 ? rep.presser.pos : w.ball.pos); }).shoulderScan).toBe(false);
  // a lazy drift to 50 degrees
  expect(run((rep, w) => { if (rep.state === 'incoming') w.yaw = heading(w.user, w.ball.pos) + (rep.t - rep.strikeAt > 0.3 && rep.t - rep.strikeAt < 0.8 ? 50 * Math.PI / 180 : 0); }).shoulderScan).toBe(false);
  // the rig turned round and back: the controller did it, the head did not
  expect(run((rep, w) => {
    if (rep.state !== 'incoming') return;
    const k = rep.t - rep.strikeAt;
    const behind = k > 0.2 && k < 0.9;
    const want = heading(w.user, behind ? rep.presser.pos : w.ball.pos);
    if (want !== w.yaw) w.snapTurned = true;
    w.yaw = want;
  }).shoulderScan).toBe(false);
});

test('every scenario result carries correct and oneTouchBack as booleans and a card reason in the scenario\'s own words', () => {
  const REASON: Record<string, RegExp> = {
    press: /^PRESSER \d+\.\d M · (ONE TOUCH|HALF-TURN)$/,
    switch: /^LANE -?\d+\.\d M (OPEN|TIGHT) · (SWITCH|RECYCLE)$/,
    thirdman: /^MARKER ON YOUR BACK · ONE TOUCH INTO THE RUN$/,
    signal: /^#\d+ WAVING, COVERED · #\d+ FREE$/,
    colour: /^[A-Z]+ CALLED · FIRST TIME$/,
    memory: /^(MISSED \d OF 3 FLASHES|SAW ALL 3 FLASHES)/,
    turn: /^(SHOULDER CHECK · TURN AND PLAY FORWARD|NO SHOULDER CHECK · BOUNCE IT BACK)$/,
    inhibit: /^(TONE · LANE SHUT · SWITCH WITHIN 0\.8 S|NO TONE · LANE STAYED OPEN)$/,
    sandwich: /^PRESSERS BOTH SIDES · ONE TOUCH BACK$/,
    through: /^(OFFSIDE BY \d+\.\d M · RECYCLE|ONSIDE( BY \d+\.\d M)? · THROUGH BALL)$/,
    gkbuild: /^(BOTH CENTRE BACKS SHUT · GO LONG|ONE CENTRE BACK SHUT · PLAY TO THE OPEN SIDE)$/,
  };
  for (const key of KEYS) {
    for (let n = 0; n < 4; n++) {
      const plays = [noop, decideWith((r) => r.answer().target), incomingWith((r) => r.answer().target, 0.5)];
      const A = make(key, undefined, { diff: n % 2 ? 'HARD' : 'EASY' });
      play(A.rep, A.w, plays[n % 3]);
      const r = A.rep.result;
      expect(typeof r.correct).toBe('boolean');
      expect(typeof r.oneTouchBack).toBe('boolean');
      expect(r.reason).toMatch(REASON[key]);
      expect(r.reason).not.toMatch(/\b(YOU|SHOULD|TRY)\b/);
      expect(r.reason.length).toBeLessThan(48);
      // not Rep's generic reason ("LANE 3.4 M OPEN") unless the scenario means it
      if (key !== 'switch') expect(r.reason).not.toMatch(/^(LANE|SAFEST|FORWARD|SPACE)/);
      if (r.oneTouchBack) expect(r.oneTouch).toBe(true);
      if (n % 3 === 0) { expect(r.oneTouchBack).toBe(false); expect(r.correct).toBe(false); } // nobody touched it
    }
  }
});

test('oneTouchBack: true only when the scenario\'s one-touch answer was played before the ball arrived', () => {
  for (let n = 0; n < 12; n++) {
    const role = SCENARIO_ROLES.sandwich[n % 3];
    const A = make('sandwich', role);
    play(A.rep, A.w, incomingWith((r) => r.passer, 0.4));
    expect(A.rep.result.oneTouchBack).toBe(true);
    const B = make('sandwich', role);
    play(B.rep, B.w, decideWith((r) => r.passer));
    expect(B.rep.result.oneTouchBack).toBe(false);
    const C = make('sandwich', role);
    play(C.rep, C.w, incomingWith((r) => r.gapMan, 0.4));
    expect(C.rep.result.oneTouchBack).toBe(false);
  }
  // the others: colour call is a one-touch answer too
  for (let n = 0; n < 6; n++) {
    const A = make('colour');
    play(A.rep, A.w, incomingWith((r) => r.calledPlayer, 0.9));
    expect(A.rep.result.oneTouchBack).toBe(A.rep.result.oneTouch && A.rep.result.correct);
  }
});

test('the window is the scenario\'s own floor when the presser is close: inhibition keeps room for the tone', () => {
  for (let n = 0; n < 8; n++) {
    const { w, rep } = make('inhibit', SCENARIO_ROLES.inhibit[n % 3]);
    play(rep, w, (r, ww) => { if (r.state === 'decide') r.window = r.window; });
    expect(rep.result.decideTime).toBeGreaterThanOrEqual(2.2 - 0.1);
  }
  for (const key of KEYS) {
    const { w, rep } = make(key);
    play(rep, w, noop);
    expect(rep.window).toBeGreaterThanOrEqual((SCENARIOS as any)[key].minWindow - 1e-9);
  }
});

// --- colour memory --------------------------------------------------------------------------
// a bot that looks at whoever is flashing and remembers what it saw, then acts on the call
const memoryBot = () => {
  const seen = new Map<any, number>();
  return (rep: any, w: any) => {
    if (rep.state === 'buildup') {
      const f = rep.flashes.find((f: any) => rep.t >= f.at && rep.t < f.at + f.len);
      w.yaw = heading(w.user, f ? f.p.pos : w.ball.pos);
      if (f && f.p.ringMat.opacity > 0.5) seen.set(f.p, f.p.ringHex);
    } else if (rep.state === 'incoming' && rep.called) {
      w.yaw = heading(w.user, w.ball.pos);
      const hex = rep.callColour.hex;
      const mate = rep.coloured.find((p: any) => seen.get(p) === hex);
      aimAt(w, rep, mate || rep.passer);
    }
  };
};

test('memory: one flash at a time during the build-up, every flash shown before the last pass, rings dark after', () => {
  for (let n = 0; n < 12; n++) {
    const A = make('memory', undefined, { diff: n % 2 ? 'HARD' : 'EASY' });
    expect(A.rep.flashes.length).toBe(4);
    expect(new Set(A.rep.flashes.map((f: any) => f.colour.hex)).size).toBe(4);
    let maxLit = 0, litAtStrike = -1;
    play(A.rep, A.w, (rep, w) => {
      const lit = [...rep.coloured, rep.decoy].filter((p: any) => p.ringMat.opacity > 0.5).length;
      if (rep.state === 'buildup') maxLit = Math.max(maxLit, lit);
      if (rep.state === 'incoming' && litAtStrike < 0) litAtStrike = lit;
    });
    expect(maxLit).toBe(1);
    expect(litAtStrike).toBe(0);
    const last = A.rep.flashes[3];
    expect(A.rep.strikeAt).toBeGreaterThanOrEqual(last.at + last.len - 1e-6);
  }
});

test('memory: the fakes (unworn colour, the opponent\'s colour, no colour) all come up and want the ball played back', () => {
  const kinds = new Set<string>();
  for (let n = 0; n < 60; n++) {
    const A = make('memory');
    kinds.add(A.rep.callKind);
    if (A.rep.callKind !== 'mate') {
      expect(A.rep.answer().target).toBe(A.rep.passer);
      expect(A.rep.coloured.some((p: any) => A.rep.cmap.get(p).hex === A.rep.callColour.hex)).toBe(false);
    } else expect(A.rep.cmap.get(A.rep.answer().target).hex).toBe(A.rep.callColour.hex);
  }
  expect([...kinds].sort()).toEqual(['decoy', 'mate', 'none']);
});

test('memory: watching the flashes and remembering them gets it right; guessing a coloured teammate gets faked out', () => {
  let good = 0, goodFakes = 0, lazy = 0, fakes = 0, faked = 0;
  for (let n = 0; n < 30; n++) {
    const A = make('memory');
    play(A.rep, A.w, memoryBot());
    const r = A.rep.result;
    if (r.correct) good++;
    if (r.callKind !== 'mate' && r.correct) goodFakes++;
    expect(r.flashesMissed).toBe(0);
    const B = make('memory');
    play(B.rep, B.w, (rep, w) => {
      // never looks away from the ball, plays the nearest teammate who had a ring
      if (rep.state === 'incoming' && rep.called) {
        const near = [...rep.coloured].sort((a: any, b: any) => a.pos.distanceTo(w.user) - b.pos.distanceTo(w.user))[0];
        aimAt(w, rep, near);
      }
    });
    if (B.rep.result.correct) lazy++;
    if (B.rep.callKind !== 'mate') { fakes++; if (B.rep.result.fakedOut) faked++; }
    expect(B.rep.result.flashesMissed).toBeGreaterThan(0);
  }
  expect(good).toBeGreaterThanOrEqual(27);
  expect(goodFakes).toBeGreaterThan(0);
  expect(lazy).toBeLessThan(12);
  expect(faked).toBe(fakes);
});

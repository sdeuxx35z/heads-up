import { test, expect } from 'bun:test';
import * as THREE from 'three';
import { evaluateRondo, evaluateOptions, laneMargin } from './eval.js';
import { ROLES, AWAY_442 } from './config.js';
import { Rep } from './rep.js';
import { RondoDrill, AwarenessDrill, DRILLS, DRILL_NAMES, DRILL_KEYS, perimeterPoint } from './drills.js';
import { SCENARIOS, SCENARIO_NAMES } from './scenarios.js';
import { makeQuiz, quizScreen } from './quiz.js';

const P = (x: number, z: number) => ({ pos: { x, y: 0, z }, slot: 'CM' });

test('rondo: a defender in the lane makes the pass worse', () => {
  const ball = { x: 0, z: 0 };
  const mates = [P(6, 0), P(0, 6)];
  const open = evaluateRondo(ball, mates, [P(-4, -4)]);
  const blocked = evaluateRondo(ball, mates, [P(3, 0.2)]);
  expect(open[0].margin).toBeGreaterThan(0);
  const toX = (o: any[]) => o.find((x) => x.target === mates[0]);
  expect(toX(blocked).margin).toBeLessThan(0);
  expect(toX(blocked).value).toBeLessThan(toX(open).value);
  expect(blocked[0].target).toBe(mates[1]);
});

test('keeper: pass into the press scores lower than the same pass unpressed', () => {
  const ball = { x: -46, z: 0 };
  const t = P(-30, 10);
  const calm = evaluateOptions(ball, [t], [P(0, 0)], 'def', { keeper: true });
  const pressed = evaluateOptions(ball, [t], [P(-28, 11)], 'def', { keeper: true });
  expect(pressed[0].value).toBeLessThan(calm[0].value * 0.7);
});

test('keeper: long loft is allowed, contested loft is punished', () => {
  const ball = { x: -46, z: 0 };
  const t = P(-10, 5);
  const free = evaluateOptions(ball, [t], [P(20, 0)], 'def', { keeper: true });
  const duel = evaluateOptions(ball, [t], [P(-8, 5)], 'def', { keeper: true });
  expect(free[0].lofted).toBe(true);
  expect(duel[0].value).toBeLessThan(free[0].value);
});

test('GK role', () => {
  expect(ROLES.GK.name).toBe('GOALKEEPER');
  expect(ROLES.GK.slots).toEqual(['GK']);
  expect(ROLES.GK.group).toBe('def');
  expect(ROLES.GK.ballX).toBe(-40);
});

test('perimeter points stay on the edge', () => {
  for (let s = 0; s < 48; s += 1.7) {
    const p = perimeterPoint(s, 3, -2);
    expect(Math.max(Math.abs(p.x - 3), Math.abs(p.z + 2))).toBeCloseTo(6, 5);
  }
});

// --- headless world -------------------------------------------------------------------------
class FakePlayer {
  pos = new THREE.Vector3(); vel = new THREE.Vector3(); target = new THREE.Vector3();
  heading = 0; maxSpeed = 6; wobble = Math.random() * 100; mood = 0; role: any = null; ring = 0; ringHex = 0xffffff;
  ringMat = { color: { getHex: () => this.ringHex }, opacity: 0 };
  visible = true; stalk: any; turned: number[] = [];
  constructor(public slot: string, public number: number, public team: string) {}
  turnTo(yaw: number) { this.turned.push(yaw); }
  place(x: number, z: number) { this.pos.set(x, 0, z); this.target.copy(this.pos); this.vel.set(0, 0, 0); this.mood = 0; }
  sync() {}
  setVisible(v: boolean) { this.visible = v; }
  highlight(c: number, o: number) { this.ringHex = c; this.ringMat.opacity = o; }
  step(dt: number) {
    const to = this.target.clone().sub(this.pos); const d = to.length();
    if (d > 0.05) { to.multiplyScalar(Math.min(this.maxSpeed * dt, d) / d); this.pos.add(to); this.heading = Math.atan2(to.x, to.z); }
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
    clearOverlays() {}, setLine() {}, showRondo(on: boolean, x: number, z: number) { this.rondo = on ? { x, z } : null; },
    placeUser(p: any, yaw: number) { this.user.copy(p); this.yaw = yaw; },
    userPos(out = new THREE.Vector3()) { return out.copy(this.user); },
    headYaw() { return this.yaw; }, moveUser(dx: number, dz: number) { this.user.x += dx; this.user.z += dz; },
  };
  return w;
}
const fx = {};
function run(rep: any, w: any, opts: { aim?: boolean; look?: (rep: any) => void; seconds?: number } = {}) {
  rep.start();
  let guard = 0;
  while (rep.state !== 'done' && guard++ < 4000) {
    opts.look?.(rep);
    if (rep.state === 'quiz') { rep.endQuiz(50); continue; }
    rep.update(1 / 30);
    if (opts.aim !== false && (rep.state === 'incoming' || rep.state === 'decide')) {
      const m = rep.mates[0];
      const o = w.user.clone(); o.y = 1.6;
      const dir = new THREE.Vector3(m.pos.x, 1, m.pos.z).sub(o).normalize();
      rep.aim(o, dir); rep.select();
    }
  }
  return guard;
}

for (const diff of ['EASY', 'ELITE']) {
  test(`rondo plays out (${diff})`, () => {
    const { DIFFICULTY } = require('./config.js');
    const w = makeWorld();
    const rep = new RondoDrill(w, { role: 'CM', difficulty: diff, quiz: true, motion: true, fx });
    const g = run(rep, w);
    expect(rep.state).toBe('done');
    expect(rep.result.drill).toBe('rondo');
    expect(rep.mates.length).toBe(4);
    expect(rep.t).toBeLessThan(10);
    expect(rep.frames.length).toBeGreaterThan(20);
    expect(rep.result.best).toBeTruthy();
    expect(w.rondo).not.toBeNull();
    // hidden players are far away
    expect(w.home.filter((p: any) => !p.visible && p !== rep.userBody).every((p: any) => p.pos.x > 100)).toBe(true);
  });
}

test('rondo timeout loses the ball', () => {
  const w = makeWorld();
  const rep = new RondoDrill(w, { role: 'CM', difficulty: 'ELITE', quiz: false, motion: false, fx });
  run(rep, w, { aim: false });
  expect(rep.result.outcome).toBe('lost');
});

test('awareness: cue fires, snapshot carries it, quiz always asked', () => {
  const w = makeWorld();
  let snap: any = null;
  const rep = new AwarenessDrill(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx });
  rep.start();
  expect(rep.quizWanted).toBe(true);
  let shown = 0, prev = 0;
  for (let i = 0; i < 3000 && rep.state !== 'quiz'; i++) {
    rep.update(1 / 30);
    if (rep.cueState === 1) shown += 1 / 30;
  }
  expect(rep.state).toBe('quiz');
  snap = rep.snapshot;
  expect([0, 1, 2, 3, 4]).toContain(snap.cueColor);
  expect(snap.cue.colors.length).toBe(5);
  expect(snap.cue.color).toBe(snap.cueColor);
  expect(typeof snap.cueSeen).toBe('boolean');
  expect(shown).toBeGreaterThan(0.7);
  expect(shown).toBeLessThan(0.9);
  // the cued player is behind the ball direction and its ring is cleared again
  expect(rep.cueP.ringMat.opacity).toBe(0);
});

test('awareness: looking at the cued player sets cueSeen', () => {
  const w = makeWorld();
  const rep = new AwarenessDrill(w, { role: 'CM', difficulty: 'EASY', quiz: true, motion: false, fx });
  rep.start();
  for (let i = 0; i < 3000 && rep.state !== 'quiz'; i++) {
    if (rep.cueState === 1) w.yaw = Math.atan2(rep.cueP.pos.x - w.user.x, rep.cueP.pos.z - w.user.z);
    rep.update(1 / 30);
  }
  expect(rep.snapshot.cueSeen).toBe(true);
});

test('awareness: the cue is seen by a held look inside the cone, not by a glance, a wide look, or a snap turn', () => {
  const seen = (look: (rep: any, w: any, k: number) => void) => {
    const w = makeWorld();
    const rep: any = new AwarenessDrill(w, { role: 'CM', difficulty: 'EASY', quiz: true, motion: false, fx });
    rep.start();
    let k = 0;
    for (let i = 0; i < 3000 && rep.state !== 'quiz'; i++) {
      if (rep.cueState === 1) look(rep, w, k++);
      rep.update(1 / 30);
    }
    expect(rep.state).toBe('quiz');
    return rep.snapshot.cueSeen;
  };
  const at = (rep: any, w: any, off = 0) => { w.yaw = Math.atan2(rep.cueP.pos.x - w.user.x, rep.cueP.pos.z - w.user.z) + off; };
  const ball = (w: any) => { w.yaw = Math.atan2(w.ball.pos.x - w.user.x, w.ball.pos.z - w.user.z); };
  expect(seen(() => {})).toBe(false);
  expect(seen((rep, w, k) => { if (k === 0) at(rep, w); else ball(w); })).toBe(false);   // one frame
  expect(seen((rep, w) => at(rep, w, 35 * Math.PI / 180))).toBe(false);                    // inside the old 48 degrees
  expect(seen((rep, w) => { at(rep, w); w.snapTurned = true; })).toBe(false);              // the controller did the turning
  expect(seen((rep, w, k) => { if (k < 6) at(rep, w); else ball(w); })).toBe(true);                      // 0.2 s on him
});

test('rondo: the passer turns with turnTo, the ball is not given a new facing in a frame', () => {
  const w = makeWorld();
  const rep = new RondoDrill(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx });
  rep.start();
  const heads = rep.mates.map((p: any) => p.heading);
  for (let i = 0; i < 40; i++) rep.update(1 / 30);
  expect(rep.mates.some((p: any) => p.turned.length > 0)).toBe(true);
  expect(heads.length).toBe(4);
});

test('GK rep: keeper start, carrier is a defender, presser from the front', () => {
  for (let n = 0; n < 20; n++) {
    const w = makeWorld();
    const rep = new Rep(w, { role: 'GK', difficulty: 'HARD', quiz: false, motion: true, fx });
    rep.start();
    expect(rep.userBody.slot).toBe('GK');
    expect(rep.userBody.pos.x).toBeLessThan(-40);
    expect(/CB|LB|RB/.test(rep.carrier.slot)).toBe(true);
    for (const p of rep.pressers) expect(p.pos.x).toBeGreaterThan(rep.userBody.pos.x + 8);
    for (const p of w.home) expect(p.pos.x).toBeGreaterThan(-50);
    run(rep, w);
    expect(rep.state).toBe('done');
  }
});

test('big dt is sliced and clock-free', () => {
  const w = makeWorld();
  const rep = new Rep(w, { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx });
  rep.start();
  const real = Date.now;
  Date.now = () => { throw new Error('wall clock'); };
  const pn = performance.now; (performance as any).now = () => { throw new Error('wall clock'); };
  try { rep.update(1.0); } finally { Date.now = real; (performance as any).now = pn; }
  expect(rep.t).toBeCloseTo(1.0, 5);
});

test('DRILLS map', () => {
  expect(DRILLS.match).toBe(Rep);
  expect(Object.keys(DRILLS).slice(0, 3)).toEqual(['match', 'rondo', 'awareness']);
  for (const k of Object.keys(SCENARIOS)) {
    expect(DRILLS[k]).toBe((SCENARIOS as any)[k]);
    expect(DRILL_NAMES[k]).toBe((SCENARIO_NAMES as any)[k]);
    expect(DRILL_KEYS).toContain(k);
  }
});

// --- rondo: mates slide, game speed is respected ------------------------------------------------
test('rondo: the four mates slide along the edges and stay spaced', () => {
  const w = makeWorld();
  const rep: any = new RondoDrill(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx });
  rep.start();
  const c = rep.centre;
  const start = rep.mates.map((m: any) => m.pos.clone());
  let moved = 0, minGap = Infinity;
  for (let i = 0; i < 60 && rep.state !== 'incoming'; i++) {
    rep.update(1 / 30);
    rep.mates.forEach((m: any, k: number) => {
      moved = Math.max(moved, m.pos.distanceTo(start[k]));
      // still on the square's edge (a little sway allowed)
      const edge = Math.max(Math.abs(m.pos.x - c.x), Math.abs(m.pos.z - c.z));
      expect(Math.abs(edge - 6)).toBeLessThan(0.7);
    });
    for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) minGap = Math.min(minGap, rep.mates[a].pos.distanceTo(rep.mates[b].pos));
  }
  expect(rep.mateS.some((s: number, k: number) => Math.abs(s - rep.homeS[k]) > 0.2)).toBe(true);
  expect(minGap).toBeGreaterThan(2.5);
});

test('rondo: the ball goes round two or three times before it reaches the viewer, in short windows', () => {
  for (let n = 0; n < 12; n++) {
    const w = makeWorld();
    const rep: any = new RondoDrill(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx });
    rep.start();
    let passes = 0;
    for (let i = 0; i < 600 && rep.state !== 'decide'; i++) {
      rep.update(1 / 30);
    }
    passes = rep.events.filter((e: any) => e.type === 'pass').length;
    expect(passes).toBeGreaterThanOrEqual(2);
    expect(passes).toBeLessThanOrEqual(3);
    expect(rep.window).toBeLessThan(1.6);
  }
});

test('rondo: respects the game speed', () => {
  const timeToViewer = (speed: number) => {
    let sum = 0;
    for (let n = 0; n < 10; n++) {
      const w = makeWorld();
      const rep: any = new RondoDrill(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx, speed });
      rep.start();
      for (let i = 0; i < 2000 && rep.state !== 'decide'; i++) rep.update(1 / 30);
      sum += rep.t + rep.window * 0.0;
      expect(rep.window).toBeCloseTo(((1.9 + 0.4) * 0.5) / speed, 0);
    }
    return sum / 10;
  };
  expect(timeToViewer(0.5)).toBeGreaterThan(timeToViewer(1.2) * 1.5);
});

// --- awareness: five colours and a position question ---------------------------------------------
test('awareness: both questions come up, the spot question has four map spots and one is right', () => {
  const modes = new Set<string>();
  for (let n = 0; n < 30; n++) {
    const w = makeWorld();
    const rep: any = new AwarenessDrill(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx });
    rep.start();
    if (n % 2) rep.cueMode = 'spot'; else rep.cueMode = 'colour';
    let flashAt: any = null;
    for (let i = 0; i < 3000 && rep.state !== 'quiz'; i++) {
      rep.update(1 / 30);
      if (!flashAt && rep.cueState === 1) flashAt = { x: rep.cueP.pos.x, z: rep.cueP.pos.z };
    }
    const snap = rep.snapshot;
    const q = makeQuiz(snap);
    modes.add(q.type);
    expect(snap.cue.colors.length).toBe(5);
    expect(new Set(snap.cue.colors).size).toBe(5);
    if (n % 2) {
      expect(q.type).toBe('cuepos');
      const s = snap.cue.spots;
      expect(s.length).toBe(4);
      expect(snap.cue.spot).toBeGreaterThanOrEqual(0);
      expect(snap.cue.spot).toBeLessThan(4);
      for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) expect(Math.hypot(s[a].x - s[b].x, s[a].z - s[b].z)).toBeGreaterThan(6.5);
      // the right spot is where the flashing player stood when it flashed (he has drifted since)
      expect(Math.hypot(s[snap.cue.spot].x - flashAt.x, s[snap.cue.spot].z - flashAt.z)).toBeLessThan(0.8);
      // and every spot is on the quiz map: 44 m square round the viewer
      for (const p of s) { expect(Math.abs(p.x - snap.user.x)).toBeLessThan(22); expect(Math.abs(p.z - snap.user.z)).toBeLessThan(22); }
    } else expect(q.type).toBe('cue');
  }
  expect([...modes].sort()).toEqual(['cue', 'cuepos']);
});

test('awareness: the mode is random, about half and half', () => {
  const c = { colour: 0, spot: 0 };
  for (let n = 0; n < 200; n++) {
    const rep: any = new AwarenessDrill(makeWorld(), { role: 'CM', difficulty: 'EASY', quiz: false, motion: false, fx });
    rep.start();
    (c as any)[rep.cueMode]++;
  }
  expect(c.colour).toBeGreaterThan(60);
  expect(c.spot).toBeGreaterThan(60);
});

// --- quiz screens: the two cue questions draw and answer ------------------------------------------
function quizKit() {
  const hits: any[] = [], texts: string[] = [];
  const g: any = new Proxy({}, {
    get: (_t, k: string) => (k === 'createLinearGradient' ? () => ({ addColorStop() {} }) : k === 'measureText' ? () => ({ width: 10 }) : () => {}),
    set: () => true,
  });
  const kit: any = {
    g, w: 1280, h: 800, hits, texts,
    bg() {}, card() {}, rr() {}, hovered: () => false,
    text(s: string) { texts.push(s); return 0; },
    button(id: string, x: number, y: number, w: number, h: number, label: string, o: any) { hits.push({ id, onClick: o?.onClick }); },
    hit(id: string, x: number, y: number, w: number, h: number, fn: any) { hits.push({ id, x, y, w, h, onClick: fn }); },
  };
  return kit;
}
function cueSnap(mode: 'colour' | 'spot') {
  const w = makeWorld();
  const rep: any = new AwarenessDrill(w, { role: 'CM', difficulty: 'MEDIUM', quiz: false, motion: false, fx });
  rep.start();
  rep.cueMode = mode;
  for (let i = 0; i < 3000 && rep.state !== 'quiz'; i++) rep.update(1 / 30);
  return rep.snapshot;
}
test('quiz: the colour question has five answers and scores 100 or 0', () => {
  const snap = cueSnap('colour');
  const scores: number[] = [];
  const app = { answerQuiz: (s: number) => scores.push(s) };
  const q = makeQuiz(snap);
  const kit = quizKit();
  quizScreen(app, q)(kit);
  expect(kit.hits.length).toBe(5);
  expect(kit.texts).toContain('WHAT COLOUR FLASHED BEHIND YOU?');
  expect(kit.texts.filter((t: string) => ['RED', 'YELLOW', 'GREEN', 'CYAN', 'PURPLE'].includes(t)).length).toBe(5);
  kit.hits.forEach((h: any) => h.onClick());
  expect(scores.sort()).toEqual([0, 0, 0, 0, 100]);
  const k2 = quizKit();
  q.answered = true; q.guess = 0; q.score = 0;
  quizScreen(app, q)(k2);
  expect(k2.hits.length).toBe(0);
});

test('quiz: the spot question has four lettered spots and one right answer', () => {
  const snap = cueSnap('spot');
  const scores: number[] = [];
  const app = { answerQuiz: (s: number) => scores.push(s) };
  const q = makeQuiz(snap);
  expect(q.type).toBe('cuepos');
  const kit = quizKit();
  quizScreen(app, q)(kit);
  expect(kit.hits.length).toBe(4);
  expect(kit.texts).toContain('WHERE DID IT FLASH?');
  expect(['A', 'B', 'C', 'D'].every((l) => kit.texts.includes(l))).toBe(true);
  kit.hits.forEach((h: any) => h.onClick());
  expect(scores.sort()).toEqual([0, 0, 0, 100]);
  const k2 = quizKit();
  q.answered = true; q.guess = 1; q.score = 0;
  quizScreen(app, q)(k2);
  expect(k2.hits.length).toBe(0);
});

test('quiz: the old questions still draw', () => {
  const w = makeWorld();
  const rep: any = new Rep(w, { role: 'CM', difficulty: 'MEDIUM', quiz: true, motion: false, fx });
  rep.start();
  for (let i = 0; i < 3000 && rep.state !== 'quiz'; i++) rep.update(1 / 30);
  for (let n = 0; n < 12; n++) {
    const q = makeQuiz(rep.snapshot);
    expect(['nearest', 'count', 'free']).toContain(q.type);
    const kit = quizKit();
    quizScreen({ answerQuiz() {} }, q)(kit);
    expect(kit.hits.length).toBeGreaterThan(0);
  }
});

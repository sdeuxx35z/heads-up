import { test, expect } from 'bun:test';
import { newPro, nextFixture, matchdaySession, playMatch, trainingSession, applyTraining, canTrain, endSeason, acceptOffer, table, seeded, ovr, positionFit, CLUBS, ATTRS, STATUSES, unreadCount, markRead, trainingDrill } from './pro.js';

const rep = (o: any = {}) => ({ total: 60, decision: 60, scanScore: 60, scanRate10: 3, par: 3, timing: 60, critical: 'critical', info: 60, memory: null, outcome: 'completed', correct: null, decisionSpeed: 1.8, ...o });
const GOOD = () => rep({ total: 85, decision: 85, scanRate10: 3.6, par: 3, info: 85, timing: 85 });
const POOR = () => rep({ total: 35, decision: 30, scanRate10: 1, par: 3, info: 30, timing: 25, critical: 'late', outcome: 'intercepted' });

function season(pro: any, mk: () => any, rng: () => number) {
  const out: any[] = [];
  while (pro.matchday < 18) {
    const o = matchdaySession(pro, rng)!;
    out.push(playMatch(pro, Array.from({ length: o.reps }, mk), rng));
  }
  return out;
}

test('fictional clubs: two divisions of ten, strengths 45-90, no real names', () => {
  const pro = newPro({ name: 'TEST', position: 'CM', number: 8 }, seeded(1));
  expect(pro.divs[1].length).toBe(10);
  expect(pro.divs[2].length).toBe(10);
  for (const c of Object.values(CLUBS) as any[]) expect(c.strength).toBeGreaterThanOrEqual(45), expect(c.strength).toBeLessThanOrEqual(90);
  expect(pro.div).toBe(2);
  expect(pro.status).toBe('PROSPECT');
  expect(pro.age).toBe(17);
  expect(pro.ovr).toBeGreaterThan(48);
  expect(pro.ovr).toBeLessThan(62);
  expect(() => JSON.parse(JSON.stringify(pro))).not.toThrow();
});

test('a full season simulates, 18 matchdays, and the table adds up', () => {
  const rng = seeded(7);
  const pro = newPro({ name: 'TEST', position: 'CM', number: 8 }, rng);
  const reports = season(pro, GOOD, rng);
  expect(reports.length).toBe(18);
  expect(pro.matchday).toBe(18);
  expect(nextFixture(pro)).toBeNull();
  for (const div of [1, 2]) {
    const rows = table(pro, div);
    expect(rows.length).toBe(10);
    let pts = 0, gf = 0, ga = 0, w = 0, d = 0, l = 0;
    for (const r of rows) {
      expect(r.P).toBe(18);
      expect(r.W + r.D + r.L).toBe(r.P);
      expect(r.GD).toBe(r.GF - r.GA);
      expect(r.Pts).toBe(r.W * 3 + r.D);
      pts += r.Pts; gf += r.GF; ga += r.GA; w += r.W; d += r.D; l += r.L;
    }
    expect(gf).toBe(ga);
    expect(w).toBe(l);
    // every match adds 3 points (decided) or 2 (drawn)
    expect(pts).toBe(w * 3 + d);
    expect(pts).toBe(90 * 3 - d / 2);
    expect(w + d / 2).toBe(90);
  }
});

test('ratings stay within 3 and 10, in one decimal', () => {
  const rng = seeded(3);
  for (const mk of [GOOD, POOR]) {
    const pro = newPro({ name: 'T', position: 'ST', number: 9 }, rng);
    for (const r of season(pro, mk, rng)) {
      if (!r.played) { expect(r.rating).toBeNull(); continue; }
      expect(r.rating).toBeGreaterThanOrEqual(3);
      expect(r.rating).toBeLessThanOrEqual(10);
      expect(Math.round(r.rating * 10) / 10).toBe(r.rating);
    }
  }
});

test('good results grow OVR over a season more than poor ones', () => {
  const run = (mk: () => any, seed: number) => {
    const rng = seeded(seed);
    const pro = newPro({ name: 'T', position: 'CM', number: 8 }, rng);
    const start = pro.ovr;
    season(pro, mk, rng);
    return pro.ovr - start;
  };
  for (const seed of [1, 2, 3, 4]) {
    const good = run(GOOD, seed), poor = run(POOR, seed);
    expect(good).toBeGreaterThan(poor);
    expect(good).toBeGreaterThanOrEqual(3);
    expect(poor).toBeLessThanOrEqual(0);
  }
});

test('good play earns trust and a better squad status', () => {
  const rng = seeded(11);
  const pro = newPro({ name: 'T', position: 'CM', number: 8 }, rng);
  season(pro, GOOD, rng);
  expect(STATUSES.indexOf(pro.status)).toBeGreaterThanOrEqual(2);
  expect(pro.stats.apps).toBeGreaterThan(10);
  expect(pro.inbox.length).toBeGreaterThan(5);
});

test('matchday session opts: position-fitting drills, scaled to the opponent', () => {
  const rng = seeded(5);
  for (const position of ['CB', 'ST', 'GK', 'CM', 'W']) {
    const pro = newPro({ name: 'T', position, number: 5 }, rng);
    pro.status = 'STARTER'; pro.trust = 60; pro.pending = null;
    const o = matchdaySession(pro, rng)!;
    expect(o.pro).toBe(true);
    expect(o.level).toBeNull();
    expect(o.pairs.length).toBe(o.reps);
    for (const [d, r] of o.pairs) { expect(r).toBe(position); expect(positionFit(position, d)).toBe(1); }
    expect(o.speed).toBeGreaterThanOrEqual(0.9);
    expect(o.speed).toBeLessThanOrEqual(1.15);
    expect(o.fixture.opp).toBeTruthy();
  }
  // a weaker opponent gets an easier session than a stronger one
  const pro = newPro({ name: 'T', position: 'CM', number: 8 }, rng);
  pro.status = 'KEY PLAYER'; pro.pending = null;
  const diffs = ['EASY', 'MEDIUM', 'HARD', 'ELITE'];
  const seen = new Set<string>();
  for (let i = 0; i < 18; i++) { const o = matchdaySession(pro, rng)!; seen.add(o.difficulty); playMatch(pro, [rep()], rng); }
  expect(seen.size).toBeGreaterThan(0);
  for (const d of seen) expect(diffs).toContain(d);
});

test('a prospect is sometimes a sub or left out, a captain always starts', () => {
  const rng = seeded(9);
  const roles = new Set<string>();
  for (let i = 0; i < 40; i++) {
    const pro = newPro({ name: 'T', position: 'CM', number: 8 }, rng);
    const o = matchdaySession(pro, rng)!;
    roles.add(o.lineup);
    if (o.lineup === 'SUB') { expect(o.reps).toBeLessThanOrEqual(3); expect(o.minutes).toBeLessThan(45); }
    if (o.lineup === 'BENCH') { expect(o.trainingOnly).toBe(true); const r = playMatch(pro, [rep(), rep()], rng)!; expect(r.played).toBe(false); expect(pro.matchday).toBe(1); }
  }
  expect(roles.has('SUB')).toBe(true);
  expect(roles.has('BENCH')).toBe(true);
  const cap = newPro({ name: 'T', position: 'CM', number: 8 }, rng);
  cap.status = 'CAPTAIN';
  for (let i = 0; i < 10; i++) { cap.pending = null; expect(matchdaySession(cap, rng)!.lineup).toBe('START'); }
});

test('training: one per matchday, grows the focus a little', () => {
  const rng = seeded(2);
  const pro = newPro({ name: 'T', position: 'CM', number: 8 }, rng);
  for (const f of ATTRS) {
    const o = trainingSession(pro, f);
    expect(o.reps).toBe(3);
    expect(positionFit('CM', o.drill)).toBe(1);
    expect(trainingDrill(pro, f)).toBe(o.drill);
  }
  expect(canTrain(pro)).toBe(true);
  const before = pro.attrs.VISION;
  const r = applyTraining(pro, 'VISION', null, [GOOD(), GOOD(), GOOD()])!;
  expect(r.after).toBeGreaterThan(before);
  expect(r.delta).toBeLessThan(0.5);
  expect(canTrain(pro)).toBe(false);
  expect(applyTraining(pro, 'VISION', null, [GOOD()])).toBeNull();
  const o = matchdaySession(pro, rng)!;
  playMatch(pro, Array.from({ length: o.reps }, GOOD), rng);
  expect(canTrain(pro)).toBe(true);
});

test('match report: score, rating, attribute changes, inbox, MOTM possible', () => {
  const rng = seeded(21);
  const pro = newPro({ name: 'T', position: 'ST', number: 9 }, rng);
  pro.status = 'KEY PLAYER'; pro.pending = null;
  const o = matchdaySession(pro, rng)!;
  const r = playMatch(pro, Array.from({ length: o.reps }, () => rep({ total: 90, decision: 90, outcome: 'goal', scanRate10: 3.5 })), rng)!;
  expect(r.goals).toBe(o.reps);
  expect(r.yourGoals).toBeGreaterThanOrEqual(r.goals);
  expect(r.home.goals + r.away.goals).toBe(r.yourGoals + r.oppGoals);
  expect(r.rating).toBeGreaterThan(8);
  expect(r.ovrAfter).toBeGreaterThanOrEqual(r.ovrBefore);
  expect(Object.keys(r.attrChanges)).toEqual(ATTRS);
  expect(unreadCount(pro)).toBeGreaterThan(0);
  markRead(pro);
  expect(unreadCount(pro)).toBe(0);
  expect(pro.inbox[0].text).not.toMatch(/!|[\u{1F300}-\u{1FAFF}]/u);
});

test('season end: positions, awards, offers; accepting one starts season 2 with new fixtures', () => {
  const rng = seeded(13);
  const pro = newPro({ name: 'T', position: 'CM', number: 8 }, rng);
  expect(endSeason(pro, rng)).toBeNull();
  season(pro, GOOD, rng);
  const first = nextFixtureSnapshot(pro);
  const ovrNow = pro.ovr;
  const s = endSeason(pro, rng)!;
  expect(s.pos).toBeGreaterThanOrEqual(1);
  expect(s.pos).toBeLessThanOrEqual(10);
  expect(s.awards.length).toBe(4);
  expect(pro.phase).toBe('offseason');
  expect(pro.offers.length).toBeGreaterThanOrEqual(1);
  expect(pro.offers.length).toBeLessThanOrEqual(3);
  for (const o of pro.offers) { expect(o.wage).toBeGreaterThan(0); expect(o.years).toBeGreaterThanOrEqual(1); expect(STATUSES).toContain(o.promise); expect(CLUBS[o.clubId]).toBeTruthy(); }
  expect(pro.age).toBe(18);
  expect(pro.history.length).toBe(1);
  // two clubs go up, two go down
  expect(pro.divs[1].length).toBe(10);
  expect(pro.divs[2].length).toBe(10);
  expect(s.promoted.length).toBe(2);
  expect(s.relegated.length).toBe(2);
  const pick = pro.offers.length - 1;
  const club = pro.offers[pick].clubId;
  acceptOffer(pro, pick, rng);
  expect(pro.season).toBe(2);
  expect(pro.matchday).toBe(0);
  expect(pro.phase).toBe('season');
  expect(pro.clubId).toBe(club);
  expect(pro.ovr).toBe(ovrNow);
  const fx = nextFixture(pro)!;
  expect(fx.matchday).toBe(1);
  expect(fx.opp).not.toBe(pro.clubId);
  expect(table(pro).every((r) => r.P === 0)).toBe(true);
  expect(pro.stats.apps).toBe(0);
  expect(first).toBeTruthy();
  // and the second season plays through too
  season(pro, GOOD, rng);
  expect(pro.matchday).toBe(18);
  expect(endSeason(pro, rng)!.season).toBe(2);
});

function nextFixtureSnapshot(pro: any) { return JSON.stringify(pro.rounds[pro.div][0]); }

test('ovr is position weighted', () => {
  const rng = seeded(4);
  const a = newPro({ name: 'T', position: 'ST', number: 9 }, rng);
  const b = { ...a, position: 'CB', attrs: { ...a.attrs } };
  a.attrs.COMPOSURE = 80; b.attrs.COMPOSURE = 80;
  expect(ovr(a)).toBeGreaterThan(ovr(b));
});

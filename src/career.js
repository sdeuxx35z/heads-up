import { CAREER } from './config.js';
import { SCENARIO_ROLES } from './drills.js';

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

// Per-session numbers from rep results, in the units the objectives use.
export function sessionMetrics(results) {
  const n = results.length || 1;
  // capped per rep, so one frantic rep can't carry two where you never looked
  const rates = results.filter((r) => r.scanRate10 != null && r.par).map((r) => Math.min(1.2, r.scanRate10 / r.par));
  const crit = results.filter((r) => r.critical != null);
  const bodies = results.filter((r) => r.body);
  const num = (k) => mean(results.map((r) => r[k]).filter((v) => v != null));
  const share = (f) => { const v = results.filter((r) => f(r) != null); return v.length ? v.filter((r) => f(r)).length / v.length : null; };
  return {
    rate: mean(rates),
    timing: mean(results.map((r) => (r.timing == null ? 0 : r.timing))),
    critical: crit.length ? crit.filter((r) => r.critical === 'critical' || r.critical === 'prime').length / crit.length : null,
    info: num('info'),
    body: bodies.length ? bodies.filter((r) => r.body === 'HALF-TURN' || r.body === 'OPEN').length / bodies.length : null,
    decision: num('decision'),
    memory: num('memory'),
    scenario: num('scenarioScore'),
    correct: share((r) => r.correct),
    onetouch: share((r) => r.oneTouchBack),
    complete: results.filter((r) => ['completed', 'tight', 'goal'].includes(r.outcome)).length / n,
    score: num('total'),
  };
}

// Whether the session met the lesson's own objective, and by how much.
// after two misses the bar drops 10%, so nobody is stuck on one lesson for ever
export function checkObjective(lesson, metrics, fails = 0) {
  if (!lesson?.objective) return null;
  const [key, base] = lesson.objective;
  const need = fails >= 2 ? (base < 2 ? Math.round(base * 0.9 * 100) / 100 : Math.round(base * 0.9)) : base;
  const got = metrics[key];
  // every lesson needs some scanning, whatever it grades
  const lowScans = key !== 'rate' && metrics.rate != null && metrics.rate < 0.3;
  return { key, need, got, lowScans, passed: got != null && got >= need && !lowScans };
}

export function repValue(key, r) {
  return ({
    rate: r.scanRate10 != null && r.par ? r.scanRate10 / r.par : null,
    timing: r.timing == null ? 0 : r.timing,
    critical: r.critical == null ? null : r.critical === 'critical' || r.critical === 'prime' ? 1 : 0,
    info: r.info, decision: r.decision, memory: r.memory, scenario: r.scenarioScore, score: r.total,
    body: r.body ? (r.body === 'CLOSED' ? 0 : 1) : null,
    complete: ['completed', 'tight', 'goal'].includes(r.outcome) ? 1 : 0,
    correct: r.correct == null ? null : r.correct ? 1 : 0,
    onetouch: r.oneTouchBack == null ? null : r.oneTouchBack ? 1 : 0,
  })[key];
}

export function formatMetric(key, v) {
  if (v == null) return '—';
  if (['rate', 'critical', 'body', 'complete'].includes(key)) return `${Math.round(v * 100)}%`;
  return String(Math.round(v));
}

export function nextLesson(profile) {
  const done = profile.passed || [];
  const i = CAREER.findIndex((_, k) => !done[k]);
  return i < 0 ? CAREER.length - 1 : i;
}

// Practice drills open up as the lessons that introduce them are passed.
export function unlockedDrills(profile) {
  const out = new Set(['match']);
  CAREER.forEach((l, i) => {
    if (!profile.passed?.[i]) return;
    out.add(l.drill);
    (l.pairs || []).forEach(([d]) => out.add(d));
  });
  return out;
}

// The same three reps for everyone on a given day, from what this profile has unlocked.
// local calendar day, so the daily turns over at midnight where you are
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// pace of the lesson you last passed, so dailies and weak-spot work match where you are
export function currentLevel(profile) {
  let last = -1;
  CAREER.forEach((_, i) => { if (profile.passed?.[i]) last = i; });
  const l = CAREER[Math.max(0, last)];
  return { difficulty: last < 0 ? 'EASY' : l.difficulty, speed: last < 0 ? 0.9 : l.speed, quiz: profile.passed?.[12] ? 0.34 : 0 };
}

export function dailyDrill(profile, date = new Date()) {
  const key = dayKey(date);
  let seed = [...key].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const drills = [...unlockedDrills(profile)];
  const roles = ['CM', 'CB', 'FB', 'CDM', 'CAM', 'W', 'ST'];
  const picks = Array.from({ length: 3 }, () => drills[Math.floor(rnd() * drills.length)]);
  // each drill gets a position it was built for
  const roleFor = (d) => { const rs = SCENARIO_ROLES?.[d] || roles; return rs[Math.floor(rnd() * rs.length)]; };
  const lv = currentLevel(profile);
  return {
    key, reps: 3, daily: true, difficulty: lv.difficulty, speed: lv.speed, quizChance: lv.quiz,
    pairs: picks.map((d) => [d, roleFor(d)]),
  };
}

// A 1-rest-day-tolerant streak of days with the daily drill done.
export function streak(profile, today = new Date()) {
  const days = new Set(profile.dailies || []);
  let count = 0, misses = 0;
  const d = new Date(today);
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (misses < 2) {
    if (days.has(dayKey(d))) { count++; misses = 0; } else misses++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

// Weakest skill over the last sessions, and the drill that trains it.
const TRAINS = { rate: ['rondo', 'CM'], timing: ['match', 'CM'], critical: ['match', 'CB'], info: ['press', 'CM'], body: ['turn', 'CDM'], decision: ['match', 'CM'] };
export function weakSpot(profile) {
  const recent = profile.sessions.slice(-12).filter((s) => s.metrics);
  if (recent.length < 2) return null;
  const scale = { rate: 100, timing: 1, critical: 100, info: 1, body: 100, decision: 1 };
  let worst = null;
  for (const k of Object.keys(TRAINS)) {
    const v = mean(recent.map((s) => s.metrics[k]).filter((x) => x != null));
    if (v == null) continue;
    const pct = v * scale[k];
    if (!worst || pct < worst.pct) worst = { key: k, pct };
  }
  if (!worst) return null;
  const [drill, role] = TRAINS[worst.key];
  return { ...worst, drill, role };
}

// One number for the player card: recent scores weighted by how hard the sessions were.
const DIFF_FACTOR = { EASY: 0.75, MEDIUM: 0.9, HARD: 1.0, ELITE: 1.1 };
export function rating(profile) {
  const ss = profile.sessions.slice(-10);
  if (!ss.length) return null;
  const v = mean(ss.map((s) => (s.score || 0) * (DIFF_FACTOR[s.difficulty] || 0.9) * (s.speed || 1)));
  return Math.max(1, Math.min(99, Math.round(v)));
}


import { CAREER } from './config.js';

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

// Per-session numbers from rep results, in the units the objectives use.
export function sessionMetrics(results) {
  const n = results.length || 1;
  const rates = results.filter((r) => r.scanRate10 != null && r.par).map((r) => r.scanRate10 / r.par);
  const crit = results.filter((r) => r.critical != null);
  const bodies = results.filter((r) => r.body);
  const num = (k) => mean(results.map((r) => r[k]).filter((v) => v != null));
  return {
    rate: mean(rates),
    timing: num('timing'),
    critical: crit.length ? crit.filter((r) => r.critical === 'critical' || r.critical === 'prime').length / crit.length : null,
    info: num('info'),
    body: bodies.length ? bodies.filter((r) => r.body === 'HALF-TURN' || r.body === 'OPEN').length / bodies.length : null,
    decision: num('decision'),
    memory: num('memory'),
    scenario: num('scenarioScore'),
    complete: results.filter((r) => ['completed', 'tight', 'goal'].includes(r.outcome)).length / n,
    score: num('total'),
  };
}

// Whether the session met the lesson's own objective, and by how much.
export function checkObjective(lesson, metrics) {
  if (!lesson?.objective) return null;
  const [key, need] = lesson.objective;
  const got = metrics[key];
  return { key, need, got, passed: got != null && got >= need };
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
    (l.drills || []).forEach((d) => out.add(d));
  });
  return out;
}

// The same three reps for everyone on a given day, from what this profile has unlocked.
export function dailyDrill(profile, date = new Date()) {
  const key = date.toISOString().slice(0, 10);
  let seed = [...key].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const drills = [...unlockedDrills(profile)];
  const roles = ['CM', 'CB', 'FB', 'CDM', 'CAM', 'W', 'ST'];
  const picks = Array.from({ length: 3 }, () => drills[Math.floor(rnd() * drills.length)]);
  return {
    key, reps: 3, daily: true, difficulty: profile.passed?.[11] ? 'HARD' : 'MEDIUM', quizChance: 0.34,
    drills: picks, roles: picks.map(() => roles[Math.floor(rnd() * roles.length)]),
  };
}

// A 1-rest-day-tolerant streak of days with the daily drill done.
export function streak(profile, today = new Date()) {
  const days = new Set(profile.dailies || []);
  let count = 0, misses = 0;
  const d = new Date(today);
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (misses < 2) {
    if (days.has(d.toISOString().slice(0, 10))) { count++; misses = 0; } else misses++;
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


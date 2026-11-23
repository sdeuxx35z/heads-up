import { STAR_LINES, CAREER, CAREER_INSERTS } from './config.js';

const KEY = 'headsup.v1';
const PROFILE_COLORS = ['#ff7a1a', '#4fd88a', '#5aa9ff'];

const N = CAREER.length;
function blankProfile(i) {
  return { name: `PLAYER ${i + 1}`, number: [8, 10, 6][i], color: PROFILE_COLORS[i], stars: Array(N).fill(0), best: Array(N).fill(0), passed: Array(N).fill(false), fails: Array(N).fill(0), dailies: [], sessions: [] };
}

// Lessons added after a profile was saved: open a gap at each new index so old progress stays on the
// lesson it was earned on. The new lessons start unpassed, so CONTINUE takes you to them.
function migrate(raw) {
  const v = raw.careerV || 1;
  for (const [ver, at] of CAREER_INSERTS) {
    if (v >= ver) continue;
    for (const p of raw.profiles) {
      for (const k of ['passed', 'fails', 'stars', 'best']) {
        if (!Array.isArray(p[k])) continue;
        const fill = k === 'passed' ? false : 0;
        for (const i of at) p[k].splice(i, 0, fill);
      }
      for (const s of p.sessions || []) if (s.level != null) for (const i of at) if (s.level >= i) s.level++;
    }
  }
  raw.careerV = CAREER_INSERTS.reduce((m, [ver]) => Math.max(m, ver), 1);
  for (const p of raw.profiles) for (const k of ['passed', 'fails', 'stars', 'best']) {
    if (Array.isArray(p[k])) while (p[k].length < N) p[k].push(k === 'passed' ? false : 0);
  }
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw && Array.isArray(raw.profiles)) {
      // profiles saved before the learning career get the new fields
      // settings added in later versions get their defaults
      raw.settings = { motion: false, height: 'auto', snapTurn: false, coach: true, volume: 0.8, ticks: true, ...raw.settings };
      raw.profiles = raw.profiles.map((p, i) => ({ ...blankProfile(i), ...p, passed: p.passed || Array(N).fill(false), fails: p.fails || Array(N).fill(0), dailies: p.dailies || [] }));
      migrate(raw);
      return raw;
    }
  } catch {}
  return {
    careerV: CAREER_INSERTS.reduce((m, [ver]) => Math.max(m, ver), 1),
    active: 0,
    profiles: [0, 1, 2].map(blankProfile),
    settings: { motion: false, height: 'auto', snapTurn: false, coach: true, volume: 0.8, ticks: true },
  };
}

export const store = {
  data: load(),
  save() {
    try { localStorage.setItem(KEY, JSON.stringify(this.data)); } catch {}
  },
  get profile() { return this.data.profiles[this.data.active]; },
  get settings() { return this.data.settings; },
  setActive(i) { this.data.active = i; this.save(); },
  unlocked(level) { return level === 0 || !!this.profile.passed[level - 1] || !!this.profile.passed[level]; },
  // after three tries a lesson can be skipped; it opens the next one but earns no stars
  skipLesson(level) {
    const p = this.profile;
    p.passed[level] = true;
    p.fails[level] = 0;
    this.save();
  },
  starsFor(score) { return STAR_LINES.filter((s) => score >= s).length; },

  recordSession(s) {
    const p = this.profile;
    p.sessions.push(s);
    if (p.sessions.length > 400) p.sessions.shift();
    if (s.level != null) {
      // stars are mastery; only passing the lesson objective opens the next lesson
      if (s.objective?.passed) {
        p.passed[s.level] = true;
        p.stars[s.level] = Math.max(p.stars[s.level], Math.max(1, this.starsFor(s.score)));
        p.fails[s.level] = 0;
      } else if (s.objective) p.fails[s.level] = (p.fails[s.level] || 0) + 1;
      p.best[s.level] = Math.max(p.best[s.level], s.score);
    }
    if (s.daily) {
      const d = new Date(s.date);
      const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!p.dailies.includes(day)) p.dailies.push(day);
      if (p.dailies.length > 400) p.dailies.shift();
    }
    this.save();
  },

  totals() {
    const ss = this.profile.sessions;
    const reps = ss.reduce((a, s) => a + s.reps, 0);
    const avg = (k) => {
      const v = ss.filter((s) => s[k] != null);
      return v.length ? v.reduce((a, s) => a + s[k] * s.reps, 0) / v.reduce((a, s) => a + s.reps, 0) : null;
    };
    return {
      sessions: ss.length,
      reps,
      scanRate: avg('scanRate'),
      scan: avg('scan'),
      decision: avg('decision'),
      memory: avg('memory'),
      score: avg('score'),
      stars: this.profile.stars.reduce((a, b) => a + b, 0),
    };
  },
};

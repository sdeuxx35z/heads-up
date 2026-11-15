import { STAR_LINES } from './config.js';

const KEY = 'headsup.v1';
const PROFILE_COLORS = ['#ff7a1a', '#4fd88a', '#5aa9ff'];

function blankProfile(i) {
  return { name: `PLAYER ${i + 1}`, number: [8, 10, 6][i], color: PROFILE_COLORS[i], stars: Array(24).fill(0), best: Array(24).fill(0), passed: Array(24).fill(false), dailies: [], sessions: [] };
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw && Array.isArray(raw.profiles)) {
      // profiles saved before the learning career get the new fields
      raw.profiles = raw.profiles.map((p, i) => ({ ...blankProfile(i), ...p, passed: p.passed || Array(24).fill(false), dailies: p.dailies || [] }));
      return raw;
    }
  } catch {}
  return {
    active: 0,
    profiles: [0, 1, 2].map(blankProfile),
    settings: { motion: false, seated: false, volume: 0.8, ticks: true },
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
      }
      p.best[s.level] = Math.max(p.best[s.level], s.score);
    }
    if (s.daily) {
      const day = new Date(s.date).toISOString().slice(0, 10);
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

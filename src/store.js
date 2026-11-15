import { STAR_LINES } from './config.js';

const KEY = 'headsup.v1';
const PROFILE_COLORS = ['#ff7a1a', '#4fd88a', '#5aa9ff'];

function blankProfile(i) {
  return { name: `PLAYER ${i + 1}`, color: PROFILE_COLORS[i], stars: Array(24).fill(0), best: Array(24).fill(0), sessions: [] };
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw && Array.isArray(raw.profiles)) return raw;
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
  unlocked(level) { return level === 0 || this.profile.stars[level - 1] > 0; },
  starsFor(score) { return STAR_LINES.filter((s) => score >= s).length; },

  recordSession(s) {
    const p = this.profile;
    p.sessions.push(s);
    if (p.sessions.length > 400) p.sessions.shift();
    if (s.level != null) {
      p.stars[s.level] = Math.max(p.stars[s.level], this.starsFor(s.score));
      p.best[s.level] = Math.max(p.best[s.level], s.score);
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

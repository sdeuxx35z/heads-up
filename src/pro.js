// PLAYER CAREER: a FIFA-career-mode in miniature. Pure logic, no DOM, no three.js.
// Everything takes an optional `rng` (a () => [0,1) function) so tests are deterministic; see seeded().
//
// STATE: `pro` is plain JSON, stored at store.profile.pro.
//   v, name, position (a ROLES key), number, age, season (1-based), matchday (matches played this season, 0..18)
//   clubId, div (1 | 2), phase ('season' | 'offseason')
//   attrs {VISION, AWARENESS, DECISIONS, COMPOSURE, PASSING} (floats), potential (88-94 cap), ovr (int)
//   contract {wage, years, promise}, status (PROSPECT | ROTATION | STARTER | KEY PLAYER | CAPTAIN), trust 0-100, morale 0-100
//   stats {apps, starts, goals, assists, ratingSum, avg, motm, minutes}   (this season)
//   form [last 5 ratings], inbox [{id, from, text, season, md, read}] newest first
//   history [{season, clubId, div, pos, apps, goals, assists, avg, motm, ovr, awards}], trophies [{season, name}]
//   divs {1:[ids], 2:[ids]}, strength {id: n}, rounds {1:[[ [home,away] x5 ] x18], 2:[...]},
//   tables {1:{id:row}, 2:{id:row}} row = {id,P,W,D,L,GF,GA,GD,Pts}, stars {id:{g,a}} (rival top scorers/assisters)
//   pending {md, role:'START'|'SUB'|'BENCH', minutes}   lineup for the next match, decided once per matchday
//   trainedMd (matchday the one allowed training happened on, or -1), offers [...] and summary (after endSeason)
//
// REPORT (returned by playMatch):
//   { season, matchday (1-based), played, role, minutes, youHome, home:{id,name,short,color,goals}, away:{...},
//     yourGoals, oppGoals, result 'W'|'D'|'L', opp (club), rating (3.0-10.0, null if not played), band,
//     goals, assists, motm, ovrBefore, ovrAfter, attrChanges {ATTR: +x}, attrs (after),
//     statusBefore, statusAfter, trust, morale, managerLine, messages [inbox texts added],
//     components {ATTR: 0-100}, seasonOver, tablePos }
import { sessionMetrics } from './career.js';
import { DRILL_KEYS } from './drills.js';

export const ATTRS = ['VISION', 'AWARENESS', 'DECISIONS', 'COMPOSURE', 'PASSING'];
export const STATUSES = ['PROSPECT', 'ROTATION', 'STARTER', 'KEY PLAYER', 'CAPTAIN'];
const TRUST_AT = [0, 35, 55, 75, 90];
export const MATCHDAYS = 18;
export const FOCUS_LABEL = { VISION: 'VISION', AWARENESS: 'AWARENESS', DECISIONS: 'DECISIONS', COMPOSURE: 'COMPOSURE', PASSING: 'PASSING' };

// Invented clubs. [id, name, short, kit colour, strength, manager]
const D1 = [
  ['harrow', 'Harrowgate Rovers', 'HAR', '#c8372d', 90, 'Gordon Pryce'],
  ['northmere', 'Northmere Town', 'NMT', '#e9e4d6', 86, 'Ilse Brandt'],
  ['calder', 'Calder Athletic', 'CAL', '#2f8f5b', 82, 'Marco Veltri'],
  ['westbury', 'Westbury United', 'WBU', '#d9a62b', 79, 'Alan Dewhurst'],
  ['kingsley', 'Kingsley City', 'KIC', '#4a90b8', 76, 'Tomas Rehak'],
  ['thornbury', 'Thornbury FC', 'THO', '#8c2f3f', 73, 'Paul Ashdown'],
  ['ravenhill', 'Ravenhill Albion', 'RAV', '#303436', 70, 'Dara Kavanagh'],
  ['stonebridge', 'Stonebridge Rangers', 'STB', '#e07b2a', 68, 'Henrik Soltau'],
  ['lowick', 'Lowick Park', 'LOW', '#6aa84f', 65, 'Frank Mundy'],
  ['corvane', 'Corvane Wanderers', 'COR', '#b5b0a0', 62, 'Nuno Alcazar'],
];
const D2 = [
  ['marlow', 'Marlow Vale', 'MAV', '#2a7f7a', 72, 'Stuart Ince'],
  ['easton', 'Easton Borough', 'EAB', '#c94f7c', 68, 'Yusuf Demir'],
  ['pennington', 'Pennington Town', 'PEN', '#e4c340', 64, 'Colm Rafferty'],
  ['dunmore', 'Dunmore Athletic', 'DUN', '#9a6b3c', 61, 'Anders Lund'],
  ['fenwick', 'Fenwick United', 'FEN', '#d9d4c5', 58, 'Gary Sheldon'],
  ['salters', "Salter's Cross", 'SAC', '#3d7a3d', 56, 'Rui Matos'],
  ['orley', 'Orley Wanderers', 'ORL', '#b8453a', 53, 'Kenneth Odell'],
  ['varnley', 'Varnley Rovers', 'VAR', '#5f7f9c', 51, 'Piet Maas'],
  ['wickham', 'Wickham Town', 'WIC', '#a89a62', 48, 'Lee Tolland'],
  ['brackley', 'Brackley Heath', 'BRH', '#e07b2a', 45, 'Dennis Quarry'],
];
const CLUB_LIST = [...D1.map((c) => ({ c, div: 1 })), ...D2.map((c) => ({ c, div: 2 }))]
  .map(({ c, div }) => ({ id: c[0], name: c[1], short: c[2], color: c[3], strength: c[4], manager: c[5], div }));
export const CLUBS = Object.fromEntries(CLUB_LIST.map((c) => [c.id, c]));

const SURNAMES = ['Vance', 'Okoro', 'Lindqvist', 'Marsh', 'Delacroix', 'Petrov', 'Hale', 'Moretti', 'Ibarra', 'Kessler', 'Dunne', 'Salo', 'Whitlow', 'Aziz', 'Brandt', 'Costa', 'Farrow', 'Novak', 'Tanner', 'Ruiz'];
const INITIALS = 'ABCDEFGHJKLMNPRSTW';
const hash = (s) => [...s].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7);
export const starName = (id, kind = 'g') => `${INITIALS[hash(id + kind) % INITIALS.length]}. ${SURNAMES[hash(kind + id) % SURNAMES.length]}`;

// ---------- small helpers

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mean = (xs) => { const v = xs.filter((x) => x != null && !Number.isNaN(x)); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
const r1 = (v) => Math.round(v * 10) / 10;
const rng0 = (rng) => rng || Math.random;
export function seeded(seed = 1) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function gauss(rng) { const u = Math.max(1e-9, rng()), v = rng(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function poisson(lam, rng) { const L = Math.exp(-lam); let k = 0, p = 1; do { k++; p *= rng(); } while (p > L && k < 12); return k - 1; }
function shuffle(a, rng) { const o = [...a]; for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; } return o; }
export const ordinal = (n) => `${n}${[, 'ST', 'ND', 'RD'][n % 10 > 3 || Math.floor(n / 10) === 1 ? 0 : n % 10] || 'TH'}`;

// ---------- position, OVR

const W = {
  CB:  [0.12, 0.30, 0.20, 0.28, 0.10],
  FB:  [0.18, 0.22, 0.20, 0.15, 0.25],
  CDM: [0.15, 0.28, 0.22, 0.17, 0.18],
  CM:  [0.22, 0.18, 0.20, 0.15, 0.25],
  CAM: [0.25, 0.12, 0.20, 0.13, 0.30],
  W:   [0.22, 0.10, 0.22, 0.18, 0.28],
  ST:  [0.15, 0.10, 0.25, 0.35, 0.15],
  GK:  [0.10, 0.25, 0.15, 0.30, 0.20],
};
export const POSITION_WEIGHTS = W;
export function ovrOf(position, attrs) {
  const w = W[position] || W.CM;
  return Math.round(ATTRS.reduce((s, a, i) => s + w[i] * attrs[a], 0));
}
export const ovr = (pro) => ovrOf(pro.position, pro.attrs);

// Which drills fit which positions (match fits all).
export const DRILL_ROLES = {
  rondo: ['CM'], awareness: ['CM'], press: ['CM', 'CDM', 'CAM', 'FB'], switch: ['FB', 'W', 'CM'], thirdman: ['CAM', 'ST', 'CM'],
  signal: ['CM', 'CAM', 'W', 'ST', 'CDM'], colour: ['CM', 'CDM', 'CAM', 'W', 'ST'], turn: ['CDM', 'CM'], inhibit: ['CM', 'CDM', 'CAM'],
  sandwich: ['CM', 'CDM'], through: ['W', 'ST'], gkbuild: ['GK'], memory: ['CM', 'CDM', 'CAM', 'W', 'ST'], latest: ['CM', 'CDM', 'CAM', 'W', 'ST'],
};
// 1 if the drill suits the position, 0 if not. Drills the game does not have (yet) never fit.
export function positionFit(position, drill) {
  if (drill === 'match') return 1;
  if (!DRILL_KEYS.includes(drill)) return 0;
  return (DRILL_ROLES[drill] || []).includes(position) ? 1 : 0;
}
export const fittingDrills = (position) => Object.keys(DRILL_ROLES).filter((d) => positionFit(position, d));

// ---------- clubs, tables, schedule

export function clubOf(id, pro = null) {
  const c = CLUBS[id];
  if (!c) return null;
  if (!pro) return c;
  return { ...c, div: Object.keys(pro.divs).find((d) => pro.divs[d].includes(id)) * 1 || c.div, strength: pro.strength?.[id] ?? c.strength };
}
const blankRow = (id) => ({ id, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 });

function roundRobin(ids, rng) {
  let t = shuffle(ids, rng);
  const n = t.length, rounds = [];
  for (let r = 0; r < n - 1; r++) {
    const pairs = [];
    for (let i = 0; i < n / 2; i++) {
      const a = t[i], b = t[n - 1 - i];
      pairs.push((i === 0 ? r % 2 === 0 : (r + i) % 2 === 0) ? [a, b] : [b, a]);
    }
    rounds.push(pairs);
    t = [t[0], t[n - 1], ...t.slice(1, n - 1)];
  }
  return [...rounds, ...rounds.map((rd) => rd.map(([h, a]) => [a, h]))];
}

function startSeasonState(pro, rng) {
  pro.rounds = { 1: roundRobin(pro.divs[1], rng), 2: roundRobin(pro.divs[2], rng) };
  pro.tables = { 1: Object.fromEntries(pro.divs[1].map((id) => [id, blankRow(id)])), 2: Object.fromEntries(pro.divs[2].map((id) => [id, blankRow(id)])) };
  pro.stars = Object.fromEntries(Object.keys(pro.strength).map((id) => [id, { g: 0, a: 0 }]));
  pro.matchday = 0; pro.pending = null; pro.trainedMd = -1; pro.phase = 'season';
  pro.stats = { apps: 0, starts: 0, goals: 0, assists: 0, ratingSum: 0, avg: 0, motm: 0, minutes: 0 };
}

// sorted table rows for a division (default the player's), each with pos, name, color
export function table(pro, div = pro.div) {
  const rows = Object.values(pro.tables[div]).map((r) => ({ ...r }));
  rows.sort((a, b) => b.Pts - a.Pts || b.GD - a.GD || b.GF - a.GF || CLUBS[a.id].name.localeCompare(CLUBS[b.id].name));
  return rows.map((r, i) => ({ ...r, pos: i + 1, name: CLUBS[r.id].name, short: CLUBS[r.id].short, color: CLUBS[r.id].color, you: r.id === pro.clubId }));
}
export const tablePos = (pro, id = pro.clubId, div = pro.div) => table(pro, div).find((r) => r.id === id)?.pos ?? null;
export const seasonOver = (pro) => pro.matchday >= MATCHDAYS;

function applyResult(t, h, a, hg, ag) {
  const H = t[h], A = t[a];
  H.P++; A.P++; H.GF += hg; H.GA += ag; A.GF += ag; A.GA += hg;
  if (hg > ag) { H.W++; A.L++; H.Pts += 3; } else if (hg < ag) { A.W++; H.L++; A.Pts += 3; } else { H.D++; A.D++; H.Pts++; A.Pts++; }
  H.GD = H.GF - H.GA; A.GD = A.GF - A.GA;
}
function simScore(sh, sa, rng) {
  const d = clamp(sh - sa, -40, 40);
  return [poisson(1.3 * 1.1 * Math.exp(d / 42), rng), poisson(1.3 * 0.92 * Math.exp(-d / 42), rng)];
}
function creditStars(pro, id, goals, rng, skip = 0) {
  const s = pro.stars[id];
  for (let i = skip; i < goals; i++) { if (rng() < 0.4) s.g++; if (rng() < 0.22) s.a++; }
}

export function nextFixture(pro) {
  if (seasonOver(pro)) return null;
  const pair = pro.rounds[pro.div][pro.matchday].find(([h, a]) => h === pro.clubId || a === pro.clubId);
  const home = pair[0] === pro.clubId;
  const opp = home ? pair[1] : pair[0];
  const oc = clubOf(opp, pro);
  return { matchday: pro.matchday + 1, opp, oppName: oc.name, oppShort: oc.short, oppColor: oc.color, oppStrength: oc.strength, oppPos: tablePos(pro, opp), home, competition: `DIVISION ${pro.div}` };
}

// ---------- new player

const status0 = (trust) => { let i = 0; TRUST_AT.forEach((t, k) => { if (trust >= t) i = k; }); return STATUSES[i]; };

export function newPro({ name = 'PLAYER', position = 'CM', number = 8 } = {}, rng = Math.random) {
  rng = rng0(rng);
  const weak = D2.slice(-3);
  const club = weak[Math.floor(rng() * weak.length)];
  const w = W[position] || W.CM;
  const attrs = {};
  const top = w.indexOf(Math.max(...w));
  ATTRS.forEach((a, i) => { attrs[a] = r1(clamp(55 + (rng() - 0.5) * 10 + (i === top ? 3 : 0), 50, 60)); });
  const strength = Object.fromEntries(CLUB_LIST.map((c) => [c.id, c.strength + Math.round((rng() - 0.5) * 3)]));
  const pro = {
    v: 1, name, position, number, age: 17, season: 1, matchday: 0, clubId: club[0], div: 2, phase: 'season',
    attrs, potential: 88 + Math.floor(rng() * 7), ovr: 0,
    contract: { wage: 1200, years: 3, promise: 'PROSPECT' }, status: 'PROSPECT', trust: 25, morale: 60,
    stats: null, form: [], inbox: [], history: [], trophies: [],
    divs: { 1: D1.map((c) => c[0]), 2: D2.map((c) => c[0]) }, strength, offers: [], summary: null, msgSeq: 0,
  };
  pro.ovr = ovr(pro);
  startSeasonState(pro, rng);
  say(pro, 'CLUB', `${CLUBS[pro.clubId].name} have signed ${name}, 17, on a ${pro.contract.years}-year contract. Squad status: PROSPECT.`);
  say(pro, 'MANAGER', `${CLUBS[pro.clubId].manager}: First match is ${nextFixture(pro).home ? 'at home' : 'away'} against ${nextFixture(pro).oppName}. Training first, then we see where you fit.`);
  return pro;
}

// ---------- inbox

function say(pro, from, text) {
  pro.inbox.unshift({ id: ++pro.msgSeq, from, text, season: pro.season, md: pro.matchday, read: false });
  if (pro.inbox.length > 40) pro.inbox.length = 40;
  return text;
}
export const unreadCount = (pro) => pro.inbox.filter((m) => !m.read).length;
export function markRead(pro) { pro.inbox.forEach((m) => { m.read = true; }); }

// ---------- performance model

// 0-100 per attribute from the rep results; also the session metrics and speed score
export function components(results) {
  const m = sessionMetrics(results);
  const tot = m.score ?? 50;
  const speeds = results.map((r) => r.decisionSpeed).filter((v) => v != null);
  const spd = speeds.length ? clamp(100 - (mean(speeds) - 1) * 30, 0, 100) : null;
  const timing = mean(results.map((r) => r.timing));
  const c = {
    VISION: m.rate == null ? tot : clamp(m.rate * 83, 0, 100),
    AWARENESS: mean([m.info, m.memory]) ?? tot,
    DECISIONS: m.decision ?? tot,
    COMPOSURE: mean([timing, m.critical == null ? null : m.critical * 100, spd]) ?? tot,
    PASSING: mean([m.complete * 100, m.correct == null ? null : m.correct * 100]) ?? tot,
  };
  return { c, m };
}
const PERF_W = { VISION: 0.22, AWARENESS: 0.18, DECISIONS: 0.25, COMPOSURE: 0.17, PASSING: 0.18 };

export function ratingBand(r) { return r == null ? 'none' : r >= 8 ? 'elite' : r >= 7 ? 'good' : r >= 6 ? 'average' : 'poor'; }
export function ratingColor(r, UI) {
  const b = ratingBand(r);
  return b === 'elite' || b === 'good' ? UI.good : b === 'average' ? UI.text : r >= 5 ? UI.accent : UI.bad;
}

// ---------- lineup and matchday session

function decideLineup(pro, rng) {
  if (pro.pending?.md === pro.matchday) return pro.pending;
  const fx = nextFixture(pro);
  const gap = pro.ovr - (pro.strength[pro.clubId] ?? 50);
  const base = { PROSPECT: 0.18, ROTATION: 0.5, STARTER: 0.9, 'KEY PLAYER': 0.97, CAPTAIN: 1 }[pro.status];
  const bench = { PROSPECT: 0.3, ROTATION: 0.08, STARTER: 0, 'KEY PLAYER': 0, CAPTAIN: 0 }[pro.status];
  const form = mean(pro.form) ?? 6.3;
  const start = clamp(base + clamp(gap * 0.012, -0.15, 0.15) + (form - 6.3) * 0.04, 0, 1);
  const roll = rng();
  let role = 'START', minutes = 90;
  if (roll >= start) {
    if (rng() < bench / Math.max(0.01, 1 - start)) { role = 'BENCH'; minutes = 0; } else { role = 'SUB'; minutes = 18 + Math.floor(rng() * 22); }
  }
  pro.pending = { md: pro.matchday, role, minutes, opp: fx?.opp };
  return pro.pending;
}

const diffFor = (s) => (s < 52 ? 'EASY' : s < 64 ? 'MEDIUM' : s < 78 ? 'HARD' : 'ELITE');
const speedFor = (s) => r1(clamp(0.9 + ((s - 45) / 45) * 0.25, 0.9, 1.15));

function pickDrills(pro, n, rng, weights = null) {
  const pos = pro.position;
  const pool = fittingDrills(pos);
  const out = ['match'];
  const rest = shuffle(pool, rng);
  while (out.length < n) out.push(rest.length ? rest.pop() : 'match');
  return out.map((d) => [d, pos]);
}

// beginSession opts for the next matchday; also fixes the lineup (START / SUB / BENCH) for it
export function matchdaySession(pro, rng = Math.random) {
  rng = rng0(rng);
  const fx = nextFixture(pro);
  if (!fx) return null;
  const lu = decideLineup(pro, rng);
  const s = fx.oppStrength;
  const reps = lu.role === 'START' ? (rng() < 0.5 ? 4 : 5) : lu.role === 'SUB' ? (lu.minutes >= 30 ? 3 : 2) : 2;
  const trainingOnly = lu.role === 'BENCH';
  const difficulty = trainingOnly ? 'EASY' : diffFor(s);
  const hasQuiz = ['CM', 'CDM', 'CAM'].includes(pro.position);
  return {
    level: null, role: pro.position, difficulty, reps, quizChance: !trainingOnly && hasQuiz && (difficulty === 'ELITE' || difficulty === 'HARD') ? 0.2 : 0,
    drill: 'match', pairs: pickDrills(pro, reps, rng), speed: trainingOnly ? 0.9 : speedFor(s),
    pro: true, trainingOnly, lineup: lu.role, minutes: lu.minutes,
    fixture: { matchday: fx.matchday, opp: fx.opp, oppName: fx.oppName, home: fx.home, competition: fx.competition },
  };
}

// ---------- match

const FWD = { att: 0.22, mid: 0.1, def: 0.03 };
const GROUP = { CB: 'def', FB: 'def', CDM: 'def', GK: 'def', CM: 'mid', CAM: 'att', W: 'att', ST: 'att' };

function tick(pro, from, text) { return say(pro, from, text); }

export function playMatch(pro, results, rng = Math.random) {
  rng = rng0(rng);
  const fx = nextFixture(pro);
  if (!fx) return null;
  const lu = decideLineup(pro, rng);
  const minutes = lu.minutes, played = minutes > 0 && results.length > 0;
  const f = minutes / 90;
  const { c, m } = components(results);
  const perf = ATTRS.reduce((s, a) => s + PERF_W[a] * c[a], 0) + (pro.morale - 60) * 0.05;
  const inf = played ? clamp((perf - 55) / 45, -1, 1) * f : 0;
  const ovrBefore = pro.ovr, statusBefore = pro.status;
  const ps = pro.strength[pro.clubId];
  const effUs = ps + inf * 12;
  const [hg, ag] = fx.home ? simScore(effUs, fx.oppStrength, rng) : (() => { const [h, a] = simScore(fx.oppStrength, effUs, rng); return [h, a]; })();
  let ours = fx.home ? hg : ag, theirs = fx.home ? ag : hg;

  // your goals and assists come from the reps
  let goals = played ? results.filter((r) => r.outcome === 'goal').length : 0;
  let assists = 0;
  if (played) for (const r of results) if (['completed', 'tight'].includes(r.outcome) && (r.decision ?? 0) >= 75 && rng() < FWD[GROUP[pro.position]]) assists++;
  if (goals > ours) ours = goals;
  assists = Math.min(assists, Math.max(0, ours - goals));
  const H = fx.home ? ours : theirs, A = fx.home ? theirs : ours;
  const result = ours > theirs ? 'W' : ours < theirs ? 'L' : 'D';

  // rating
  let rating = null, motm = false;
  if (played) {
    const raw = 3 + Math.pow(clamp(perf, 0, 100) / 100, 1.5) * 7;
    const tm = (result === 'W' ? 0.3 : result === 'L' ? -0.25 : 0) + (theirs === 0 ? 0.15 : 0) + goals * 0.7 + assists * 0.4;
    rating = r1(clamp(6 + (raw + tm - 6) * (0.55 + 0.45 * f), 3, 10));
    if (minutes >= 45) {
      const sq = Array.from({ length: 10 }, () => 6.3 + gauss(rng) * 0.65 + (result === 'W' ? 0.3 : result === 'L' ? -0.3 : 0));
      motm = rating > Math.max(...sq) && rating >= 7.5;
    }
  }

  // tables: our match, the rest of our division, the whole other division
  const t = pro.tables[pro.div];
  const hId = fx.home ? pro.clubId : fx.opp, aId = fx.home ? fx.opp : pro.clubId;
  applyResult(t, hId, aId, H, A);
  creditStars(pro, pro.clubId, ours, rng, goals);
  creditStars(pro, fx.opp, theirs, rng);
  for (const div of [1, 2]) {
    for (const [h, a] of pro.rounds[div][pro.matchday]) {
      if (div === pro.div && (h === pro.clubId || a === pro.clubId)) continue;
      const [x, y] = simScore(pro.strength[h], pro.strength[a], rng);
      applyResult(pro.tables[div], h, a, x, y);
      creditStars(pro, h, x, rng); creditStars(pro, a, y, rng);
    }
  }

  // attributes
  const before = { ...pro.attrs };
  const dampen = (a) => clamp((pro.potential - pro.attrs[a]) / (pro.potential - 55), 0.15, 1);
  const young = pro.age <= 18 ? 1.2 : pro.age <= 21 ? 1.05 : pro.age <= 26 ? 0.85 : 0.6;
  const rt = rating ?? 6.0;
  const att = played ? 1 : 0.3;
  for (const a of ATTRS) {
    if (rt >= 7 && c[a] >= 62) pro.attrs[a] += (0.3 + 0.5 * clamp((rt - 7) / 2, 0, 1)) * dampen(a) * young * 0.75 * (played ? 0.5 + 0.5 * f : att);
    else if (rt <= 5.5 && c[a] < 45 && pro.attrs[a] > 45) pro.attrs[a] -= (0.05 + 0.2 * clamp((5.5 - rt) / 2.5, 0, 1)) * (played ? 1 : 0.5);
    else if (!played && c[a] >= 62) pro.attrs[a] += 0.15 * dampen(a) * young;
    pro.attrs[a] = r1(clamp(pro.attrs[a], 30, pro.potential));
  }
  pro.ovr = ovr(pro);
  const attrChanges = {};
  ATTRS.forEach((a) => { attrChanges[a] = r1(pro.attrs[a] - before[a]); });

  // morale, form, trust, status
  if (played) {
    pro.form.push(rating); if (pro.form.length > 5) pro.form.shift();
    const s = pro.stats; s.apps++; if (lu.role === 'START') s.starts++; s.goals += goals; s.assists += assists; s.ratingSum += rating; s.avg = r1(s.ratingSum / s.apps); s.minutes += minutes; if (motm) s.motm++;
  }
  pro.morale = clamp(pro.morale + (played ? (rating - 6.4) * 5 : -3) + (result === 'W' ? 4 : result === 'L' ? -4 : 0) - (pro.morale - 60) * 0.1, 0, 100);
  pro.trust = clamp(pro.trust + (played ? (rating - 6.3) * 5 * (0.6 + 0.4 * f) : -0.5), 0, 100);
  const idx = STATUSES.indexOf(pro.status);
  if (idx < 4 && pro.trust >= TRUST_AT[idx + 1] && (idx + 1 < 4 || pro.season >= 3)) pro.status = STATUSES[idx + 1];
  else if (idx > 0 && pro.trust < TRUST_AT[idx] - 8) pro.status = STATUSES[idx - 1];
  const promoted = STATUSES.indexOf(pro.status) > idx, demoted = STATUSES.indexOf(pro.status) < idx;

  // messages
  const msgs = [];
  const mgr = CLUBS[pro.clubId].manager, mgrTag = `MANAGER`;
  const rateTxt = m.rate != null ? `you scanned ${m.rate.toFixed(1)}x your target` : null;
  const score = fx.home ? `${ours}-${theirs}` : `${theirs}-${ours}`;
  let line;
  if (!played) {
    line = lu.role === 'BENCH' ? `Manager: you are not in the squad against ${fx.oppName}. Training score ${Math.round(m.score ?? 0)}.` : `Manager: no minutes against ${fx.oppName}.`;
  } else if (rating >= 7.5) {
    line = `Manager: ${rateTxt ? rateTxt + '. ' : ''}${promoted ? `You are now ${pro.status}.` : pro.status === 'PROSPECT' || pro.status === 'ROTATION' ? 'You are in contention to start.' : 'You start Saturday.'}`;
  } else if (rating >= 6.2) {
    line = `Manager: ${rateTxt ? rateTxt + '. ' : ''}Decisions ${Math.round(c.DECISIONS)}. ${demoted ? `Your status is now ${pro.status}.` : 'Solid. Keep going.'}`;
  } else {
    line = `Manager: ${rateTxt ? rateTxt + '. ' : ''}Decisions ${Math.round(c.DECISIONS)}. ${demoted ? `Your status is now ${pro.status}.` : 'Scan more before the ball arrives.'}`;
  }
  msgs.push(tick(pro, mgrTag, line.replace(/^Manager: /, `${mgr}: `)));
  if (played && (rating >= 7.5 || rating <= 4.8 || goals > 0)) {
    const num = `#${pro.number}`;
    const where = fx.home ? '' : ` at ${fx.oppName}`;
    const win = result === 'W', loss = result === 'L';
    const txt = goals > 0 ? `${num} scores${goals > 1 ? ` ${goals}` : ''} in ${score} ${win ? 'win' : loss ? 'defeat' : 'draw'}${where}.`
      : rating >= 7.5 ? `Heads-up display from ${num} in ${score} ${win ? 'win' : loss ? 'defeat' : 'draw'}${where}.`
      : `${num} struggles in ${score} ${loss ? 'defeat' : win ? 'win' : 'draw'}${where}.`;
    msgs.push(tick(pro, 'LOCAL PRESS', txt));
  }

  pro.matchday++;
  pro.pending = null;
  const hc = clubOf(hId, pro), ac = clubOf(aId, pro);
  const seasonOverNow = seasonOver(pro);
  return {
    season: pro.season, matchday: pro.matchday, played, role: lu.role, minutes, youHome: fx.home,
    home: { id: hc.id, name: hc.name, short: hc.short, color: hc.color, goals: H },
    away: { id: ac.id, name: ac.name, short: ac.short, color: ac.color, goals: A },
    yourGoals: ours, oppGoals: theirs, result, opp: clubOf(fx.opp, pro),
    rating, band: ratingBand(rating), goals, assists, motm,
    ovrBefore, ovrAfter: pro.ovr, attrChanges, attrs: { ...pro.attrs }, statusBefore, statusAfter: pro.status,
    trust: Math.round(pro.trust), morale: Math.round(pro.morale), managerLine: msgs[0], messages: msgs,
    components: Object.fromEntries(ATTRS.map((a) => [a, Math.round(c[a])])), seasonOver: seasonOverNow, tablePos: tablePos(pro),
  };
}

// ---------- training

// first fitting drill per focus
const TRAIN_PREF = {
  VISION: ['press', 'rondo', 'match'],
  AWARENESS: ['awareness', 'memory', 'latest', 'colour', 'match'],
  DECISIONS: ['switch', 'thirdman', 'through', 'match'],
  COMPOSURE: ['turn', 'inhibit', 'sandwich', 'signal', 'match'],
  PASSING: ['rondo', 'thirdman', 'gkbuild', 'switch', 'match'],
};
export function trainingDrill(pro, focus) {
  return (TRAIN_PREF[focus] || ['match']).find((d) => positionFit(pro.position, d)) || 'match';
}
export const canTrain = (pro) => pro.phase === 'season' && !seasonOver(pro) && pro.trainedMd !== pro.matchday;

export function trainingSession(pro, focus) {
  const drill = trainingDrill(pro, focus);
  const difficulty = pro.ovr < 60 ? 'EASY' : pro.ovr < 74 ? 'MEDIUM' : pro.ovr < 84 ? 'HARD' : 'ELITE';
  return { level: null, role: pro.position, difficulty, reps: 3, quizChance: 0, drill, pairs: [[drill, pro.position], [drill, pro.position], [drill, pro.position]], speed: 1, pro: true, training: true, focus };
}

// grows one attribute a little (0.1-0.45); one training per matchday. Returns null when already trained.
export function applyTraining(pro, focus, metrics, results = null) {
  if (!canTrain(pro) || !ATTRS.includes(focus)) return null;
  const score = results ? components(results).c[focus] : metrics ? { VISION: metrics.rate == null ? metrics.score : clamp(metrics.rate * 83, 0, 100), AWARENESS: mean([metrics.info, metrics.memory]) ?? metrics.score, DECISIONS: metrics.decision ?? metrics.score, COMPOSURE: mean([metrics.timing, metrics.critical == null ? null : metrics.critical * 100]) ?? metrics.score, PASSING: mean([metrics.complete * 100, metrics.correct == null ? null : metrics.correct * 100]) ?? metrics.score }[focus] : 50;
  const before = pro.attrs[focus];
  const damp = clamp((pro.potential - before) / (pro.potential - 55), 0.15, 1);
  pro.attrs[focus] = r1(clamp(before + (0.1 + 0.35 * clamp((score ?? 50) / 100, 0, 1)) * damp, 30, pro.potential));
  pro.trainedMd = pro.matchday;
  const ovrBefore = pro.ovr;
  pro.ovr = ovr(pro);
  return { focus, before, after: pro.attrs[focus], delta: r1(pro.attrs[focus] - before), ovrBefore, ovrAfter: pro.ovr };
}

// ---------- end of season

const gapStatus = (gap) => (gap >= 10 ? 'KEY PLAYER' : gap >= 4 ? 'STARTER' : gap >= -3 ? 'ROTATION' : 'PROSPECT');
const wageFor = (o, strength) => Math.round((400 + (o - 45) ** 2 * 18 + strength * 25) / 50) * 50;

function makeOffer(pro, id, type, rng) {
  const c = clubOf(id, pro);
  const status = gapStatus(pro.ovr - c.strength);
  const cur = STATUSES.indexOf(pro.status);
  const promise = type === 'RENEWAL' ? STATUSES[Math.max(cur, STATUSES.indexOf(status))] : status;
  const wage = Math.max(wageFor(pro.ovr, c.strength), type === 'RENEWAL' ? Math.round(pro.contract.wage * 1.1 / 50) * 50 : 0);
  return { type, clubId: id, name: c.name, color: c.color, div: c.div, strength: c.strength, wage, years: 2 + Math.floor(rng() * 3), promise };
}

export function endSeason(pro, rng = Math.random) {
  rng = rng0(rng);
  if (pro.phase === 'offseason' && pro.summary) return pro.summary;
  if (!seasonOver(pro)) return null;
  const ovrStart = pro.history.length ? pro.history[pro.history.length - 1].ovr : 55;
  const tabs = { 1: table(pro, 1), 2: table(pro, 2) };
  const myTab = tabs[pro.div];
  const pos = myTab.find((r) => r.you).pos;
  const s = pro.stats;
  const awards = [];
  const champ = myTab[0];
  awards.push({ key: 'CHAMPIONS', text: champ.you ? `DIVISION ${pro.div} CHAMPIONS` : `${champ.name.toUpperCase()} WIN DIVISION ${pro.div}`, you: champ.you });
  if (champ.you) pro.trophies.push({ season: pro.season, name: `DIVISION ${pro.div} TITLE`, clubId: pro.clubId });

  // league top scorer / assists: rivals are each club's star, you compare by your own tallies
  const ids = pro.divs[pro.div].filter((id) => id !== pro.clubId);
  const best = (k) => ids.reduce((b, id) => (pro.stars[id][k] > b.n ? { n: pro.stars[id][k], id } : b), { n: -1, id: null });
  const rs = best('g'), ra = best('a');
  const scorer = s.goals >= rs.n && s.goals > 0;
  const assister = s.assists >= ra.n && s.assists > 0;
  awards.push({ key: 'SCORER', text: scorer ? `TOP SCORER  ${s.goals} GOALS` : `TOP SCORER  ${starName(rs.id, 'g').toUpperCase()}  ${rs.n}`, you: scorer });
  awards.push({ key: 'ASSISTS', text: assister ? `MOST ASSISTS  ${s.assists}` : `MOST ASSISTS  ${starName(ra.id, 'a').toUpperCase()}  ${ra.n}`, you: assister });
  const pots = s.apps >= 10 && s.avg >= 7.3 && pos <= 6;
  awards.push({ key: 'PLAYER', text: pots ? 'PLAYER OF THE SEASON' : `PLAYER OF THE SEASON  ${starName(champ.id, 'g').toUpperCase()}`, you: pots });
  if (scorer) pro.trophies.push({ season: pro.season, name: 'TOP SCORER', clubId: pro.clubId });
  if (assister) pro.trophies.push({ season: pro.season, name: 'MOST ASSISTS', clubId: pro.clubId });
  if (pots) pro.trophies.push({ season: pro.season, name: 'PLAYER OF THE SEASON', clubId: pro.clubId });

  // promotion and relegation
  const down = tabs[1].slice(-2).map((r) => r.id), up = tabs[2].slice(0, 2).map((r) => r.id);
  const newDivs = { 1: [...pro.divs[1].filter((id) => !down.includes(id)), ...up], 2: [...pro.divs[2].filter((id) => !up.includes(id)), ...down] };
  pro.divs = newDivs;
  for (const id of Object.keys(pro.strength)) {
    const div = newDivs[1].includes(id) ? 1 : 2;
    pro.strength[id] = clamp(pro.strength[id] + Math.round(gauss(rng) * 2) + (up.includes(id) ? 1 : down.includes(id) ? -1 : 0), div === 1 ? 60 : 43, div === 1 ? 92 : 74);
  }
  const wasDiv = pro.div;
  pro.div = newDivs[1].includes(pro.clubId) ? 1 : 2;
  const moved = pro.div < wasDiv ? 'PROMOTED' : pro.div > wasDiv ? 'RELEGATED' : null;

  pro.history.push({ season: pro.season, clubId: pro.clubId, div: wasDiv, pos, apps: s.apps, goals: s.goals, assists: s.assists, avg: s.avg, motm: s.motm, ovr: pro.ovr, awards: awards.filter((a) => a.you).map((a) => a.text) });
  pro.age += 1;
  pro.potential = clamp(pro.potential + Math.round(gauss(rng) * 1.2), 84, 94);
  pro.contract.years = Math.max(0, pro.contract.years - 1);

  // offers: renewal, plus up to two clubs near your level
  const offers = [makeOffer(pro, pro.clubId, 'RENEWAL', rng)];
  const want = s.avg >= 6.8 ? 2 : s.avg >= 6.2 || !s.apps ? 1 : 0;
  const near = (range) => Object.keys(pro.strength).filter((id) => id !== pro.clubId && Math.abs(pro.strength[id] - pro.ovr) <= range);
  let cands = near(12);
  if (!cands.length) cands = near(20);
  shuffle(cands, rng).slice(0, Math.max(want, cands.length && !offers.length ? 1 : 0)).forEach((id) => offers.push(makeOffer(pro, id, 'TRANSFER', rng)));
  pro.offers = offers;
  pro.phase = 'offseason';
  pro.summary = { season: pro.season, div: wasDiv, pos, champion: champ.id, awards, moved, promoted: up.map((id) => CLUBS[id].name), relegated: down.map((id) => CLUBS[id].name), table: myTab, stats: { ...s }, ovr: pro.ovr, ovrStart, age: pro.age, offers };
  say(pro, 'AGENT', `${offers.length} offer${offers.length > 1 ? 's' : ''} on the table for next season.`);
  say(pro, 'LEAGUE', `Season ${pro.season} final table: ${CLUBS[pro.clubId].name} finish ${ordinal(pos).toLowerCase()} in Division ${wasDiv}.${moved ? ` ${CLUBS[pro.clubId].name} are ${moved.toLowerCase()}.` : ''}`);
  return pro.summary;
}

export function acceptOffer(pro, i, rng = Math.random) {
  rng = rng0(rng);
  const o = pro.offers[i];
  if (!o || pro.phase !== 'offseason') return null;
  const changed = o.clubId !== pro.clubId;
  pro.clubId = o.clubId;
  pro.div = o.div;
  pro.contract = { wage: o.wage, years: o.years, promise: o.promise };
  const idx = STATUSES.indexOf(o.promise);
  if (changed || idx > STATUSES.indexOf(pro.status)) { pro.status = o.promise; pro.trust = Math.max(TRUST_AT[idx] + 6, pro.trust); }
  pro.morale = clamp(pro.morale + (changed ? 8 : 4), 0, 100);
  pro.season += 1;
  pro.offers = []; pro.summary = null;
  startSeasonState(pro, rng);
  const fx = nextFixture(pro);
  say(pro, 'CLUB', `${CLUBS[pro.clubId].name}: ${pro.name} signs ${o.years} years on ${o.wage.toLocaleString('en-US')} a week. Squad status: ${pro.status}.`);
  say(pro, 'MANAGER', `${CLUBS[pro.clubId].manager}: Season ${pro.season} opens ${fx.home ? 'at home' : 'away'} against ${fx.oppName}.`);
  return pro;
}

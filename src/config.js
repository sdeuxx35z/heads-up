// Pitch is 105 x 68. Home attacks +x. Facing +x, +z is the right touchline.
export const PITCH = { L: 105, W: 68, HL: 52.5, HW: 34 };
export const GOAL = { x: PITCH.HL, halfWidth: 3.66, height: 2.44 };

export const HOME_KIT = { shirt: 0xff7a1a, shorts: 0x15171a, socks: 0xff7a1a, number: '#15171a' };
export const AWAY_KIT = { shirt: 0x1f3f8c, shorts: 0xf2f0e8, socks: 0x1f3f8c, number: '#f2f0e8' };
export const GK_HOME = { shirt: 0x2bd17e, shorts: 0x15171a, socks: 0x2bd17e, number: '#15171a' };
export const GK_AWAY = { shirt: 0xe8e23a, shorts: 0x15171a, socks: 0xe8e23a, number: '#15171a' };

// 4-3-3 and 4-2-3-1, positions for the ball on the centre spot.
const F433 = [
  ['GK', -47, 0, 1], ['LB', -26, -22, 3], ['LCB', -31, -8, 5], ['RCB', -31, 8, 4], ['RB', -26, 22, 2],
  ['CDM', -19, 0, 6], ['LCM', -10, -11, 8], ['RCM', -10, 11, 10],
  ['LW', 4, -24, 11], ['ST', 8, 0, 9], ['RW', 4, 24, 7],
];
const F4231 = [
  ['GK', -47, 0, 1], ['LB', -26, -22, 3], ['LCB', -31, -8, 5], ['RCB', -31, 8, 4], ['RB', -26, 22, 2],
  ['LDM', -18, -7, 6], ['RDM', -18, 7, 8], ['CAM', -3, 0, 10],
  ['LW', 3, -23, 11], ['ST', 9, 0, 9], ['RW', 3, 23, 7],
];
export const AWAY_442 = [
  ['GK', 49, 0, 1], ['RB', 24, -20, 2], ['RCB', 26, -7, 5], ['LCB', 26, 7, 4], ['LB', 24, 20, 3],
  ['RM', 10, -21, 7], ['RCM', 12, -7, 8], ['LCM', 12, 7, 6], ['LM', 10, 21, 11],
  ['ST2', -4, -6, 9], ['ST1', -2, 6, 10],
];

export const ROLES = {
  CB:  { name: 'CENTRE BACK',  formation: F433,  slots: ['LCB', 'RCB'], ballX: -30, group: 'def' },
  FB:  { name: 'FULL BACK',    formation: F433,  slots: ['LB', 'RB'],   ballX: -22, group: 'def' },
  CDM: { name: 'HOLDING MID',  formation: F433,  slots: ['CDM'],        ballX: -18, group: 'def' },
  CM:  { name: 'CENTRAL MID',  formation: F433,  slots: ['LCM', 'RCM'], ballX: -9,  group: 'mid' },
  CAM: { name: 'NUMBER 10',    formation: F4231, slots: ['CAM'],        ballX: 2,   group: 'att' },
  W:   { name: 'WINGER',       formation: F433,  slots: ['LW', 'RW'],   ballX: 10,  group: 'att' },
  ST:  { name: 'STRIKER',      formation: F433,  slots: ['ST'],         ballX: 14,  group: 'att' },
  // anchor pushes the outfield block upfield of the deep ball so the back line is not on the goal line
  GK:  { name: 'GOALKEEPER',   formation: F433,  slots: ['GK'],         ballX: -40, group: 'def', anchor: 28 },
};
export const ROLE_KEYS = Object.keys(ROLES);

export const DIFFICULTY = {
  EASY:   { passes: [3, 3], presserSpeed: 5.4, presserDist: [11, 13], window: 3.6, scanTarget: 2, pressers: 1, jitter: 1.0 },
  MEDIUM: { passes: [2, 3], presserSpeed: 6.2, presserDist: [9, 11],  window: 2.9, scanTarget: 3, pressers: 1, jitter: 1.6 },
  HARD:   { passes: [2, 2], presserSpeed: 6.9, presserDist: [7, 9],   window: 2.3, scanTarget: 3, pressers: 2, jitter: 2.2 },
  ELITE:  { passes: [1, 2], presserSpeed: 7.5, presserDist: [5.5, 7], window: 1.8, scanTarget: 4, pressers: 2, jitter: 2.8 },
};
export const DIFF_KEYS = Object.keys(DIFFICULTY);

export const STAGES = ['ACADEMY', 'RESERVES', 'FIRST TEAM', 'INTERNATIONAL'];
const CAREER_ROLES = ['CM', 'CB', 'W', 'CDM', 'FB', 'ST', 'CAM', 'CM', 'W', 'CB', 'ST', 'CAM'];
export const CAREER = Array.from({ length: 24 }, (_, i) => ({
  index: i,
  stage: Math.floor(i / 6),
  role: CAREER_ROLES[i % CAREER_ROLES.length],
  difficulty: DIFF_KEYS[Math.floor(i / 6)],
  reps: 6,
  quizChance: i % 6 === 4 ? 0.8 : 0.3,
  // every stage mixes in a rondo and an awareness test
  drill: i % 6 === 2 ? 'rondo' : i % 6 === 4 ? 'awareness' : 'match',
}));
export const STAR_LINES = [55, 70, 85];

export const UI = {
  font: '"Barlow Condensed", "Arial Narrow", sans-serif',
  body: '"Barlow", "Helvetica Neue", sans-serif',
  bg: 'rgba(14,17,16,0.94)',
  card: '#1b2120',
  cardHi: '#27302e',
  line: 'rgba(242,240,232,0.12)',
  text: '#f2f0e8',
  dim: 'rgba(242,240,232,0.55)',
  accent: '#ff7a1a',
  good: '#4fd88a',
  bad: '#ff5a4f',
};

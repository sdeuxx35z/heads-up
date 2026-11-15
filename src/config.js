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

// window: seconds on the ball before the presser takes it (research: pressers that really tackle)
export const DIFFICULTY = {
  EASY:   { passes: [3, 3], presserSpeed: 5.4, presserDist: [11, 13], window: 2.4, scanTarget: 2, pressers: 1, jitter: 1.0 },
  MEDIUM: { passes: [2, 3], presserSpeed: 6.2, presserDist: [9, 11],  window: 1.9, scanTarget: 3, pressers: 1, jitter: 1.6 },
  HARD:   { passes: [2, 2], presserSpeed: 6.9, presserDist: [7, 9],   window: 1.5, scanTarget: 3, pressers: 2, jitter: 2.2 },
  ELITE:  { passes: [1, 2], presserSpeed: 7.5, presserDist: [5.5, 7], window: 1.2, scanTarget: 4, pressers: 2, jitter: 2.8 },
};
export const DIFF_KEYS = Object.keys(DIFFICULTY);

// Four stages; each lesson teaches one new thing and is passed on its own objective, not the overall score.
export const STAGES = ['SEE', 'JUDGE', 'REMEMBER', 'FINISH'];

// objective metrics: rate (scans per 10 s as a share of role par), timing, critical (share of reps with a
// critical or prime scan), info, body (share HALF-TURN or OPEN), decision, memory, complete (share kept), score
const L = (name, o) => ({ name, reps: 5, difficulty: 'MEDIUM', speed: 1, quizChance: 0, drill: 'match', role: 'CM', ...o });
const LESSONS = [
  L('LOOK AWAY', { reps: 3, difficulty: 'EASY', speed: 0.8, objective: ['rate', 0.5], teaches: 'scan' }),
  L('FIND THE PRESSER', { reps: 4, drill: 'press', difficulty: 'EASY', objective: ['info', 55], teaches: 'info' }),
  L('TIMING', { role: 'CB', difficulty: 'EASY', minFlight: 1.1, objective: ['timing', 60], teaches: 'timing' }),
  L('SCAN RATE', { pairs: [['match', 'FB'], ['press', 'CM']], objective: ['rate', 0.8], teaches: 'rate' }),
  // longer passes so there's time to look away while the ball travels
  L('CRITICAL SCAN', { role: 'CDM', difficulty: 'EASY', minFlight: 1.4, objective: ['critical', 0.5], teaches: 'critical' }),
  L('EXAM: SEE', { reps: 8, pairs: [['match', 'CM'], ['press', 'CDM'], ['match', 'CB'], ['rondo', 'CM'], ['match', 'FB']], objective: ['score', 60] }),

  L('SAFE OR FORWARD', { objective: ['decision', 70], teaches: 'decision' }),
  // no hip tracking in a headset, so the turn itself is graded: shoulder check, then turn or bounce it back
  L('RECEIVE AND TURN', { drill: 'turn', role: 'CDM', objective: ['scenario', 60], teaches: 'body' }),
  L('SWITCH PLAY', { drill: 'switch', role: 'FB', objective: ['correct', 0.7] }),
  L('ONE TOUCH', { drill: 'sandwich', objective: ['onetouch', 0.6] }),
  L('THIRD MAN', { drill: 'thirdman', role: 'CAM', objective: ['correct', 0.6] }),
  L('EXAM: JUDGE', { reps: 8, difficulty: 'HARD', pairs: [['match', 'CM'], ['turn', 'CDM'], ['switch', 'FB'], ['thirdman', 'CAM'], ['sandwich', 'CM']], objective: ['score', 62] }),

  L('WHERE WAS HE', { quizChance: 1, objective: ['memory', 60], teaches: 'memory' }),
  L('COLOUR CALL', { drill: 'colour', objective: ['correct', 0.7] }),
  L('BEHIND YOU', { drill: 'awareness', objective: ['memory', 70] }),
  L('IGNORE THE WAVE', { drill: 'signal', objective: ['correct', 0.7] }),
  L('CHANGE YOUR MIND', { drill: 'inhibit', objective: ['correct', 0.6] }),
  L('EXAM: REMEMBER', { reps: 8, difficulty: 'HARD', quizChance: 0.5, pairs: [['match', 'CB'], ['colour', 'CM'], ['awareness', 'CM'], ['signal', 'W'], ['inhibit', 'CDM']], objective: ['score', 62] }),

  L('WINGER', { role: 'W', difficulty: 'HARD', pairs: [['match', 'W'], ['through', 'W'], ['switch', 'W']], objective: ['score', 62] }),
  L('STRIKER', { role: 'ST', difficulty: 'HARD', pairs: [['match', 'ST'], ['through', 'ST'], ['thirdman', 'ST']], objective: ['score', 60] }),
  L('GOALKEEPER', { role: 'GK', difficulty: 'HARD', pairs: [['gkbuild', 'GK'], ['match', 'GK']], objective: ['score', 55] }),
  L('TWO PRESSERS', { difficulty: 'ELITE', objective: ['score', 58] }),
  L('FULL SPEED', { difficulty: 'ELITE', speed: 1.1, pairs: [['match', 'CM'], ['press', 'CDM'], ['switch', 'W'], ['thirdman', 'ST'], ['match', 'CB']], objective: ['score', 62] }),
  L('FINAL', { reps: 12, difficulty: 'ELITE', speed: 1.15, quizChance: 0.3, pairs: [['match', 'CB'], ['press', 'CM'], ['turn', 'CDM'], ['switch', 'FB'], ['thirdman', 'CAM'], ['through', 'W'], ['match', 'ST'], ['gkbuild', 'GK'], ['sandwich', 'CM'], ['colour', 'CAM'], ['inhibit', 'CDM'], ['signal', 'ST']], objective: ['score', 68] }),
];
export const CAREER = LESSONS.map((l, i) => ({ ...l, index: i, stage: Math.floor(i / 6) }));
// What each drill asks of you, in two short lines, shown on the briefing card before you play it.
export const DRILL_GOALS = {
  match: ['LOOK AROUND BEFORE THE BALL COMES', 'THEN PASS TO THE BEST TEAMMATE'],
  rondo: ['5 V 2: KEEP THE BALL', 'PASS PAST THE TWO IN THE MIDDLE'],
  awareness: ['A PLAYER BEHIND YOU LIGHTS UP', 'REMEMBER THE COLOUR, THEN PASS'],
  press: ['A PRESSER IS COMING FROM BEHIND', 'SPOT HIM, THEN PASS AWAY FROM HIM'],
  switch: ['THE NEAR SIDE IS CROWDED', 'FIND THE FREE MAN ON THE FAR SIDE'],
  thirdman: ['A TEAMMATE RUNS PAST YOUR MARKER', 'AIM AT THE GRASS AHEAD OF HIM'],
  signal: ['ONE TEAMMATE WAVES, ONE IS FREE', 'PASS TO THE FREE ONE, NOT THE WAVE'],
  colour: ['A COLOUR FLASHES AS THE BALL COMES', 'PASS TO THAT COLOUR, FIRST TIME'],
  turn: ['BACK TO GOAL, A PRESSER BEHIND YOU', 'CHECK YOUR SHOULDER: FREE = TURN, PRESSED = PASS BACK'],
  inhibit: ['A BEEP MEANS YOUR LANE IS CLOSING', 'SWITCH TO ANOTHER PASS, FAST'],
  sandwich: ['TWO PRESSERS CLOSE IN FROM THE SIDES', 'ONE TOUCH BACK TO THE DEFENDER'],
  through: ['THE BACK LINE STEPS UP', 'PLAY IN BEHIND ONLY IF HE IS ONSIDE'],
  gkbuild: ['YOU ARE THE KEEPER', 'PASS TO THE DEFENDER WHO IS NOT PRESSED'],
};
// Skill lessons explain the skill instead of the drill.
export const LESSON_GOALS = {
  'LOOK AWAY': ['TURN YOUR HEAD AWAY FROM THE BALL', 'LOOK BEHIND YOU, THEN PASS'],
  TIMING: ['LOOK AWAY WHILE THE BALL TRAVELS', 'EYES BACK ON IT WHEN SOMEONE KICKS IT'],
  'SCAN RATE': ['LOOK AROUND AGAIN AND AGAIN', 'MORE LOOKS BEFORE THE BALL REACHES YOU'],
  'CRITICAL SCAN': ['ONE LAST LOOK WHILE THE PASS COMES TO YOU', 'THEN EYES BACK ON THE BALL'],
  'SAFE OR FORWARD': ['PICK THE PASS THAT MOVES THE TEAM FORWARD', 'WITHOUT GIVING THE BALL AWAY'],
  'WHERE WAS HE': ['THE SCREEN GOES DARK WHEN THE BALL ARRIVES', 'REMEMBER WHERE THE PLAYERS WERE'],
};

export const OBJECTIVE_LABEL = {
  rate: (v) => `SCAN RATE ${Math.round(v * 100)}% OF TARGET`, timing: (v) => `TIMING ${v}%`, critical: (v) => `CRITICAL SCAN ${Math.round(v * 100)}% OF REPS`,
  info: (v) => `INFO ${v}`, body: (v) => `OPEN BODY ${Math.round(v * 100)}% OF REPS`, decision: (v) => `DECISION ${v}`,
  memory: (v) => `MEMORY ${v}`, correct: (v) => `RIGHT CALL ${Math.round(v * 100)}% OF REPS`, onetouch: (v) => `ONE TOUCH BACK ${Math.round(v * 100)}%`, scenario: (v) => `READ THE SITUATION ${v}`, complete: (v) => `KEEP THE BALL ${Math.round(v * 100)}%`, score: (v) => `SCORE ${v}`,
};
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

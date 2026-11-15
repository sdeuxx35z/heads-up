import { GOAL } from './config.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const PASS_SPEED = 17;
export const LOFT_OVER = 28;
export const SHOT_SPEED = 27;
export const OPP_SPEED = 6.2;

// How much room an opponent leaves on the line from a to b. Negative means they get there first.
// oppSpeed is how fast the defender covers ground (game-speed scaled callers can lower it).
export function laneMargin(a, b, opp, speed, lofted, oppSpeed = OPP_SPEED) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const len = Math.hypot(dx, dz) || 1;
  let t = ((opp.x - a.x) * dx + (opp.z - a.z) * dz) / (len * len);
  t = clamp(t, 0, 1);
  // a lofted ball is only playable near where it lands
  if (lofted && t < 0.8) t = 0.8;
  const cx = a.x + dx * t, cz = a.z + dz * t;
  const d = Math.hypot(opp.x - cx, opp.z - cz);
  const ballTime = (len * t) / speed;
  const reach = Math.max(0, ballTime - 0.22) * oppSpeed + 0.9;
  return d - reach;
}

function minMargin(a, b, opps, speed, lofted) {
  let m = Infinity, who = null;
  for (const o of opps) {
    const v = laneMargin(a, b, o.pos, speed, lofted);
    if (v < m) { m = v; who = o; }
  }
  return { m, who };
}

const nearestDist = (p, opps) => opps.reduce((best, o) => Math.min(best, Math.hypot(o.pos.x - p.x, o.pos.z - p.z)), Infinity);

// Chance a pass gets through, from the lane margin: 50% at 0.3 m, 90% at 1.5 m.
export const P_MID = 0.3, P_HI = 1.5;
const P_K = Math.log(9) / (P_HI - P_MID);
export function passProbability(margin) {
  if (margin === Infinity) return 1;
  return 1 / (1 + Math.exp(-P_K * (margin - P_MID)));
}

// Opponents (outfield) that a forward pass goes past: between passer and receiver in the attacking
// direction and within 8 m of the pass line.
export const LINE_BREAK_RADIUS = 8;
export function linesBroken(from, to, outfieldOpps) {
  if (to.x <= from.x + 4) return 0;
  const dx = to.x - from.x, dz = to.z - from.z, len2 = dx * dx + dz * dz || 1;
  let n = 0;
  for (const o of outfieldOpps) {
    const ox = o.pos.x, oz = o.pos.z;
    if (ox <= from.x + 1 || ox >= to.x - 1) continue;
    const k = clamp(((ox - from.x) * dx + (oz - from.z) * dz) / len2, 0, 1);
    if (Math.hypot(ox - (from.x + dx * k), oz - (from.z + dz * k)) <= LINE_BREAK_RADIUS) n++;
  }
  return n;
}

// Expected goals for a shot at the aim point: distance, angle subtended by the posts, where the
// keeper stands against the aim, and anything in the way. ball is {x, z}; gk is a {x, z} or null.
// open is the clear-lane fraction (0 = blocked, 1 = nothing in the way).
export function shotXG(ball, gk, aim, open = 1) {
  const dx = GOAL.x - ball.x, d = Math.hypot(dx, ball.z);
  const a1 = Math.atan2(-GOAL.halfWidth - ball.z, dx), a2 = Math.atan2(GOAL.halfWidth - ball.z, dx);
  const angle = Math.abs(a2 - a1);
  const central = 2 * Math.atan(GOAL.halfWidth / Math.max(d, 1));
  const base = Math.min(0.6, 0.62 * Math.exp(-(d - 5) / 9.5));
  const quality = base * Math.pow(clamp(angle / central, 0.05, 1), 0.9);
  let keeperF = 1;
  if (gk) {
    keeperF = clamp(0.3 + 0.7 * Math.abs(aim.z - gk.z) / 3.4, 0.3, 1);
    keeperF *= 1 - clamp((GOAL.x - gk.x - 2) / 10, 0, 0.35); // a keeper off his line narrows the angle
  }
  return { xg: clamp(quality * keeperF * clamp(open, 0, 1), 0, 0.95), quality, keeperF, angle, dist: d };
}

// Where a sensible shooter puts it: the far side of the keeper, just inside the post.
export function shotAim(ball, gk) {
  const post = GOAL.halfWidth - 0.75;
  const side = gk && Math.abs(gk.z) > 0.5 ? (gk.z > 0 ? -1 : 1) : (ball.z > 0 ? -1 : 1);
  return { x: GOAL.x, z: side * post };
}

// gain terms per role group: progression is dx/25, so a 25 m forward pass is worth `prog`
const GAIN = {
  def: { prog: 0.55, lines: 0.2, space: 0.2, base: 0.08 },
  mid: { prog: 0.62, lines: 0.25, space: 0.18, base: 0.06 },
  att: { prog: 0.72, lines: 0.3, space: 0.15, base: 0.04 },
};
const KEEPER_GAIN = { prog: 0.45, lines: 0.1, space: 0.35, base: 0.12 };
export const GAIN_FLOOR = 0.06; // a safe recycle is never worth nothing
export const SWITCH_DZ = 25, SWITCH_BONUS = 0.2;
export const SHOT_SCALE = 2.6;

// Scores every pass (and the shot, if in range) from the ball's position: value = pComplete x gain.
// opts.keeper: the viewer is the goalkeeper. A receiver with a presser on him is punished, and a long
// ball into a duel is a coin flip, not a good pass. opts.shots: allow the shot option for any group.
export function evaluateOptions(ball, mates, opps, group, opts = {}) {
  const keeper = !!opts.keeper;
  const w = keeper ? KEEPER_GAIN : GAIN[group] || GAIN.mid;
  const outfieldOpps = opps.filter((o) => o.slot !== 'GK');
  const out = [];
  for (const t of mates) {
    const dist = Math.hypot(t.pos.x - ball.x, t.pos.z - ball.z);
    if (dist < 3) continue;
    const lofted = dist > LOFT_OVER;
    const speed = lofted ? 21 : PASS_SPEED;
    const { m, who } = minMargin(ball, t.pos, opps, speed, lofted);
    const near = nearestDist(t.pos, opps);
    const dx = t.pos.x - ball.x, dz = t.pos.z - ball.z;
    let pComplete = passProbability(m) * (lofted ? 0.85 : 1);
    if (keeper) {
      if (near < 4) pComplete *= 0.6; // received under the press
      if (lofted && near < 6) pComplete *= 0.65; // a long ball into a duel
    }
    // a pass back to the keeper is safe but rarely the best idea
    if (t.slot === 'GK') pComplete *= 0.7;
    const prog = clamp(dx / 25, -0.6, 1.2);
    const space = clamp((near - 1.5) / 7, 0, 1);
    const broken = linesBroken(ball, t.pos, outfieldOpps);
    const lines = clamp(broken / 4, 0, 1);
    const isSwitch = Math.abs(dz) >= SWITCH_DZ && space >= 0.5;
    const gain = Math.max(GAIN_FLOOR, w.base + w.prog * prog + w.lines * lines + w.space * space + (isSwitch ? SWITCH_BONUS : 0));
    out.push({
      kind: 'pass', target: t, value: pComplete * gain, pComplete, gain, safe: pComplete, space, prog, lines, broken,
      margin: m, threat: who, lofted, speed, switch: isSwitch, near, dx, dz,
    });
  }
  const gx = GOAL.x;
  const dGoal = Math.hypot(gx - ball.x, ball.z);
  if (dGoal < 30 && ball.x > 20 && (group === 'att' || opts.shots)) {
    const gk = opps.find((o) => o.slot === 'GK');
    const aim = shotAim(ball, gk?.pos);
    const { m } = minMargin(ball, aim, outfieldOpps, SHOT_SPEED, false);
    const open = clamp((m + 0.2) / 1.6, 0, 1);
    const q = shotXG(ball, gk?.pos, aim, open);
    out.push({ kind: 'shot', target: null, aim, value: Math.min(1.3, q.xg * SHOT_SCALE), xg: q.xg, quality: q.quality, keeperF: q.keeperF, open, margin: m, speed: SHOT_SPEED, dist: dGoal });
  }
  out.sort((a, b) => b.value - a.value);
  return out;
}

// Rank-based: the best option scores 100, others by value against it. When every option is poor
// (values near zero make ratios noisy) the option's rank holds the score up.
export function scoreDecision(chosen, options) {
  if (!chosen || !options.length) return 0;
  const best = Math.max(options[0].value, 1e-6);
  const ratio = clamp(chosen.value / best, 0, 1);
  const rank = options.indexOf(chosen);
  if (rank < 0 || best >= 0.1 || options.length < 2) return Math.round(ratio * 100);
  const byRank = 1 - rank / (options.length - 1);
  return Math.round(Math.max(ratio, byRank * 0.7) * 100);
}

// Rondo: five on the edge, two in the middle. Only lane margins and space matter; there is no
// progression. mates need .pos, defenders need .pos. Returns options best first.
export function evaluateRondo(ball, mates, defenders, speed = 16) {
  const out = [];
  for (const t of mates) {
    if (Math.hypot(t.pos.x - ball.x, t.pos.z - ball.z) < 2) continue;
    const { m, who } = minMargin(ball, t.pos, defenders, speed, false);
    const safe = clamp((m + 0.4) / 2.6, 0, 1);
    const space = clamp((nearestDist(t.pos, defenders) - 1.5) / 5, 0, 1);
    let value = 0.75 * safe + 0.25 * space;
    if (safe < 0.2) value *= 0.4;
    out.push({
      kind: 'pass', target: t, value, safe, space, prog: 0, lines: 0, broken: 0, margin: m, threat: who, lofted: false, speed,
      pComplete: passProbability(m), switch: false, near: nearestDist(t.pos, defenders), dx: t.pos.x - ball.x, dz: t.pos.z - ball.z,
    });
  }
  out.sort((a, b) => b.value - a.value);
  return out;
}

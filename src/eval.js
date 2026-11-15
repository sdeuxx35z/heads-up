import { GOAL } from './config.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const PASS_SPEED = 17;
export const LOFT_OVER = 28;
export const SHOT_SPEED = 27;

// How much room an opponent leaves on the line from a to b. Negative means they get there first.
export function laneMargin(a, b, opp, speed, lofted) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const len = Math.hypot(dx, dz) || 1;
  let t = ((opp.x - a.x) * dx + (opp.z - a.z) * dz) / (len * len);
  t = clamp(t, 0, 1);
  // a lofted ball is only playable near where it lands
  if (lofted && t < 0.8) t = 0.8;
  const cx = a.x + dx * t, cz = a.z + dz * t;
  const d = Math.hypot(opp.x - cx, opp.z - cz);
  const ballTime = (len * t) / speed;
  const reach = Math.max(0, ballTime - 0.22) * 6.2 + 0.9;
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

const WEIGHTS = {
  def: { safe: 0.5, space: 0.25, prog: 0.15, lines: 0.1 },
  mid: { safe: 0.4, space: 0.25, prog: 0.2, lines: 0.15 },
  att: { safe: 0.34, space: 0.2, prog: 0.26, lines: 0.2 },
};

// Scores every pass (and the shot, if in range) from the ball's position.
export function evaluateOptions(ball, mates, opps, group) {
  const w = WEIGHTS[group];
  const outfieldOpps = opps.filter((o) => o.slot !== 'GK');
  const out = [];
  for (const t of mates) {
    const dist = Math.hypot(t.pos.x - ball.x, t.pos.z - ball.z);
    if (dist < 3) continue;
    const lofted = dist > LOFT_OVER;
    const speed = lofted ? 21 : PASS_SPEED;
    const { m, who } = minMargin(ball, t.pos, opps, speed, lofted);
    const safe = clamp((m + 0.4) / 3.4, 0, 1) * (lofted ? 0.85 : 1);
    const space = clamp((nearestDist(t.pos, opps) - 1.5) / 7, 0, 1);
    const prog = clamp((t.pos.x - ball.x + 8) / 30, 0, 1);
    const lo = Math.min(ball.x, t.pos.x), hi = Math.max(ball.x, t.pos.x);
    const broken = t.pos.x > ball.x ? outfieldOpps.filter((o) => o.pos.x > lo + 1 && o.pos.x < hi - 1).length : 0;
    const lines = clamp(broken / 4, 0, 1);
    let value = w.safe * safe + w.space * space + w.prog * prog + w.lines * lines;
    if (safe < 0.25) value *= 0.45;
    // a pass back to the keeper is safe but rarely the best idea
    if (t.slot === 'GK') value *= 0.7;
    out.push({ kind: 'pass', target: t, value, safe, space, prog, lines, margin: m, threat: who, lofted, speed });
  }
  const gx = GOAL.x;
  const dGoal = Math.hypot(gx - ball.x, ball.z);
  if (dGoal < 30 && ball.x > 20) {
    const a1 = Math.atan2(-GOAL.halfWidth - ball.z, gx - ball.x);
    const a2 = Math.atan2(GOAL.halfWidth - ball.z, gx - ball.x);
    const angle = Math.abs(a2 - a1);
    const aim = { x: gx, z: clamp(ball.z * 0.2, -2.6, 2.6) };
    const { m } = minMargin(ball, aim, outfieldOpps, SHOT_SPEED, false);
    const open = clamp((m + 0.2) / 1.6, 0, 1);
    const quality = clamp(angle / 0.55, 0, 1) * clamp((30 - dGoal) / 18, 0, 1);
    out.push({ kind: 'shot', target: null, aim, value: quality * (0.25 + 0.75 * open) * 1.05, quality, open, margin: m, speed: SHOT_SPEED });
  }
  out.sort((a, b) => b.value - a.value);
  return out;
}

export function scoreDecision(chosen, options) {
  if (!chosen || !options.length) return 0;
  const best = options[0].value || 1e-6;
  return Math.round(clamp((chosen.value / best) * 100, 0, 100));
}

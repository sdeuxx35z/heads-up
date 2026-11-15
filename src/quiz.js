import { UI } from './config.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const TYPES = ['nearest', 'count', 'free'];

// Questions asked in the dark, about the picture the viewer should have built.
export function makeQuiz(snap) {
  const types = TYPES.filter((t) => t !== 'free' || snap.mates.length >= 3);
  const type = types[(Math.random() * types.length) | 0];
  const q = { type, snap, answered: false, score: 0, guess: null };
  if (type === 'free') {
    const others = snap.mates.filter((m) => m !== snap.freest)
      .sort((a, b) => a.pos.distanceTo(snap.user) - b.pos.distanceTo(snap.user)).slice(0, 3);
    q.choices = [snap.freest, ...others].sort(() => Math.random() - 0.5);
  }
  return q;
}

// map: 44 m square around the viewer, rotated so the ball is at the top
const MAP_M = 44;
function mapper(snap, x0, y0, size) {
  const sn = Math.sin(snap.toBall), c = Math.cos(snap.toBall);
  const s = size / MAP_M, cx = x0 + size / 2, cy = y0 + size / 2;
  return {
    toPx(p) {
      const dx = p.x - snap.user.x, dz = p.z - snap.user.z;
      const f = dx * sn + dz * c; // towards the ball
      const r = -dx * c + dz * sn; // viewer's right
      return { x: cx + r * s, y: cy - f * s };
    },
    toWorld(px, py) {
      const r = (px - cx) / s, f = -(py - cy) / s;
      return { x: snap.user.x + f * sn - r * c, z: snap.user.z + f * c + r * sn };
    },
  };
}

export function quizScreen(app, q) {
  return (k) => {
    k.bg();
    const g = k.g;
    const titles = { nearest: 'WHERE WAS THE NEAREST OPPONENT?', count: 'OPPONENTS WITHIN 10 METRES?', free: 'WHO HAD THE MOST SPACE?' };
    k.text(titles[q.type], k.w / 2, 90, 56, { weight: 800, align: 'center' });

    if (q.type === 'nearest') {
      const size = 600, x0 = (k.w - size) / 2, y0 = 130;
      const m = mapper(q.snap, x0, y0, size);
      g.save();
      k.rr(x0, y0, size, size, 24); g.clip();
      g.fillStyle = '#21451f'; g.fillRect(x0, y0, size, size);
      g.strokeStyle = 'rgba(255,255,255,0.12)'; g.lineWidth = 2;
      for (const r of [10, 20]) { g.beginPath(); g.arc(x0 + size / 2, y0 + size / 2, (r / MAP_M) * size, 0, Math.PI * 2); g.stroke(); }
      const u = m.toPx(q.snap.user);
      // viewer arrow pointing at the ball
      g.fillStyle = UI.accent;
      g.beginPath(); g.moveTo(u.x, u.y - 22); g.lineTo(u.x - 15, u.y + 14); g.lineTo(u.x + 15, u.y + 14); g.closePath(); g.fill();
      if (q.answered) {
        for (const o of q.snap.opps) {
          const p = m.toPx(o);
          g.fillStyle = o === q.snap.nearest ? '#5aa9ff' : 'rgba(90,169,255,0.4)';
          g.beginPath(); g.arc(p.x, p.y, o === q.snap.nearest ? 16 : 11, 0, Math.PI * 2); g.fill();
        }
        if (q.guess) {
          const p = m.toPx(q.guess), n = m.toPx(q.snap.nearest);
          g.strokeStyle = UI.text; g.lineWidth = 3; g.setLineDash([8, 8]);
          g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(n.x, n.y); g.stroke(); g.setLineDash([]);
          g.strokeStyle = UI.text; g.lineWidth = 5;
          g.beginPath(); g.arc(p.x, p.y, 14, 0, Math.PI * 2); g.stroke();
        }
      } else if (k.hovered('map') && app.quizCursor) {
        g.strokeStyle = UI.text; g.lineWidth = 4;
        g.beginPath(); g.arc(app.quizCursor.x, app.quizCursor.y, 14, 0, Math.PI * 2); g.stroke();
      }
      g.restore();
      if (!q.answered) {
        k.hit('map', x0, y0, size, size, (hx, hy) => {
          const w = m.toWorld(hx, hy);
          q.guess = { x: w.x, z: w.z };
          const err = Math.hypot(w.x - q.snap.nearest.x, w.z - q.snap.nearest.z);
          app.answerQuiz(Math.round(clamp(100 - (err - 2) * 9, 0, 100)));
        });
      } else {
        k.text(`${q.score}`, x0 + size + 40, y0 + 90, 80, { weight: 800, color: q.score >= 60 ? UI.good : UI.bad });
      }
    }

    if (q.type === 'count') {
      const vals = [0, 1, 2, 3, 4, 5];
      const bw = 150, gap = 20, x0 = (k.w - (bw * 6 + gap * 5)) / 2;
      vals.forEach((v, i) => {
        const label = v === 5 ? '5+' : String(v);
        const right = Math.min(q.snap.within, 5) === v;
        const id = 'c' + v;
        if (q.answered) {
          const col = right ? UI.good : q.guess === v ? UI.bad : UI.card;
          g.fillStyle = col; k.rr(x0 + i * (bw + gap), 300, bw, 180, 22); g.fill();
          k.text(label, x0 + i * (bw + gap) + bw / 2, 390, 80, { align: 'center', base: 'middle', color: right || q.guess === v ? '#111' : UI.dim });
        } else {
          k.button(id, x0 + i * (bw + gap), 300, bw, 180, label, {
            size: 80,
            onClick: () => {
              q.guess = v;
              const off = Math.abs(v - Math.min(q.snap.within, 5));
              app.answerQuiz(off === 0 ? 100 : off === 1 ? 50 : 0);
            },
          });
        }
      });
    }

    if (q.type === 'free') {
      const n = q.choices.length, bw = 220, gap = 24, x0 = (k.w - (bw * n + gap * (n - 1))) / 2;
      q.choices.forEach((m, i) => {
        const id = 'f' + i;
        const x = x0 + i * (bw + gap);
        const right = m === q.snap.freest;
        if (q.answered) {
          g.fillStyle = right ? UI.good : q.guess === m ? UI.bad : UI.card;
          k.rr(x, 260, bw, 260, 26); g.fill();
          k.text(String(m.number), x + bw / 2, 380, 130, { align: 'center', base: 'middle', weight: 800, color: right || q.guess === m ? '#111' : UI.dim });
          k.text(`${m.space.toFixed(0)} M`, x + bw / 2, 490, 36, { align: 'center', color: right || q.guess === m ? '#111' : UI.dim });
        } else {
          k.button(id, x, 260, bw, 260, String(m.number), {
            size: 130, r: 26,
            onClick: () => {
              q.guess = m;
              const best = q.snap.freest.space || 1;
              app.answerQuiz(m === q.snap.freest ? 100 : Math.round(clamp((m.space / best) * 60, 0, 60)));
            },
          });
        }
      });
    }
  };
}

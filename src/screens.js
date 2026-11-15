import { DRILL_KEYS, DRILL_NAMES } from './drills.js';
import { UI, ROLES, ROLE_KEYS, DIFF_KEYS, CAREER, STAGES } from './config.js';
import { store } from './store.js';
import { GLASS, edge } from './ui.js';

const star = (k, x, y, size, on) => {
  const g = k.g;
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? size * 0.42 : size;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
  }
  g.closePath();
  g.fillStyle = on ? UI.accent : 'rgba(242,240,232,0.22)';
  g.fill();
};
export const stars = (k, n, x, y, size, gap = size * 2.3) => { for (let i = 0; i < 3; i++) star(k, x + i * gap, y, size, i < n); };

const pct = (v) => (v == null ? '—' : String(Math.round(v)));

function profileChips(k, app) {
  store.data.profiles.forEach((p, i) => {
    const on = store.data.active === i;
    const x = k.w - 70 - (2 - i) * 70, y = 48;
    const g = k.g;
    g.beginPath(); g.arc(x, y + 22, 26, 0, Math.PI * 2);
    const hov = k.hovered('prof' + i);
    g.fillStyle = on ? p.color : hov ? GLASS.chipHi : GLASS.chip; g.fill();
    g.strokeStyle = on ? 'rgba(255,255,255,0.5)' : hov ? p.color : 'rgba(255,255,255,0.22)'; g.lineWidth = hov && !on ? 3 : 1.5; g.stroke();
    k.text(String(i + 1), x, y + 23, 30, { align: 'center', base: 'middle', color: on ? '#111' : GLASS.dim });
    k.hit('prof' + i, x - 28, y - 6, 56, 56, () => { store.setActive(i); app.redraw(); });
  });
}

export function home(app) {
  return (k) => {
    k.bg();
    k.text('HEADS UP', 70, 150, 120, { weight: 800 });
    k.g.fillStyle = UI.accent;
    k.g.fillRect(74, 172, 120, 8);
    profileChips(k, app);
    const t = store.totals();
    const x = 70, w = k.w - 140;
    k.button('career', x, 240, w, 150, 'CAREER', { primary: true, size: 64, onClick: () => app.go('career') });
    k.text(`${t.stars} / 72`, x + w - 40, 330, 40, { align: 'right', color: '#111' });
    stars(k, 1, x + w - 250, 316, 16);
    const bw = (w - 40) / 3;
    k.button('practice', x, 420, bw, 130, 'PRACTICE', { size: 48, onClick: () => app.go('practice') });
    k.button('stats', x + bw + 20, 420, bw, 130, 'STATS', { size: 48, onClick: () => app.go('stats') });
    k.button('settings', x + (bw + 20) * 2, 420, bw, 130, 'SETTINGS', { size: 48, onClick: () => app.go('settings') });
    const last = store.profile.sessions.at(-1);
    k.card(x, 584, w, 90, 24);
    k.text(store.profile.name, x + 32, 643, 40, { color: store.profile.color });
    k.text(`${t.reps} REPS`, x + 292, 643, 40, { color: GLASS.dim });
    if (last) k.text(`LAST ${last.score}`, x + w - 32, 643, 40, { align: 'right', color: GLASS.dim });
    if (app.xrSupported && !app.inXR) {
      k.button('vr', x, 696, w, 70, 'ENTER VR', { size: 38, onClick: () => app.enterVR() });
    }
  };
}

export function career(app) {
  return (k) => {
    k.bg();
    const stage = app.careerStage;
    k.text(STAGES[stage], 70, 120, 84, { weight: 800 });
    const earned = CAREER.filter((l) => l.stage === stage).reduce((a, l) => a + store.profile.stars[l.index], 0);
    k.text(`${earned} / 18`, k.w - 70, 120, 44, { align: 'right', color: GLASS.dim });
    const levels = CAREER.filter((l) => l.stage === stage);
    const cw = (k.w - 140 - 40) / 3, ch = 230;
    levels.forEach((l, i) => {
      const x = 70 + (i % 3) * (cw + 20), y = 170 + Math.floor(i / 3) * (ch + 20);
      const open = store.unlocked(l.index);
      const id = 'lvl' + l.index;
      const hov = k.hovered(id) && open;
      k.card(x, y, cw, ch, 26, { hi: hov, shadow: open });
      k.text(String(l.index + 1).padStart(2, '0'), x + 28, y + 78, 64, { weight: 800, color: open ? UI.text : 'rgba(242,240,232,0.4)' });
      k.text(ROLES[l.role].name, x + 28, y + 132, 38, { color: open ? UI.text : 'rgba(242,240,232,0.4)' });
      {
        const tag = l.drill === 'rondo' ? `${l.difficulty} · RONDO` : l.drill === 'awareness' ? `${l.difficulty} · AWARENESS` : l.difficulty;
        k.g.font = `700 28px ${UI.font}`;
        const tw = k.g.measureText(tag).width + 36;
        k.g.fillStyle = open ? GLASS.chip : GLASS.chipOff; k.rr(x + 28, y + 160, tw, 44, 22); k.g.fill();
        edge(k.g, x + 28, y + 160, tw, 44, 22, open ? 0.2 : 0.08, 0.05);
        k.text(tag, x + 46, y + 183, 28, { color: open ? UI.text : 'rgba(242,240,232,0.25)', base: 'middle' });
      }
      if (open) stars(k, store.profile.stars[l.index], x + cw - 120, y + 62, 17, 40);
      else k.text('LOCKED', x + cw - 28, y + 70, 28, { align: 'right', color: 'rgba(242,240,232,0.25)' });
      if (open) k.hit(id, x, y, cw, ch, () => app.startCareer(l.index));
    });
    k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => app.go('home') });
    k.button('prev', k.w - 290, 690, 100, 80, '‹', { size: 60, disabled: stage === 0, onClick: () => { app.careerStage--; app.redraw(); } });
    k.button('next', k.w - 170, 690, 100, 80, '›', { size: 60, disabled: stage === STAGES.length - 1, onClick: () => { app.careerStage++; app.redraw(); } });
  };
}

export function practice(app) {
  return (k) => {
    k.bg();
    const p = app.practiceOpts;
    k.text('PRACTICE', 70, 120, 84, { weight: 800 });
    k.text(ROLES[p.role].name, k.w - 70, 120, 44, { align: 'right', color: GLASS.dim });
    const row = (keys, label, y, h, cur, set, size = 32) => {
      const gap = 14, bw = (k.w - 140 - gap * (keys.length - 1)) / keys.length;
      keys.forEach((key, i) => k.button(label + key, 70 + i * (bw + gap), y, bw, h, typeof key === 'number' ? `${key} REPS` : key, { active: cur === key, size, onClick: () => { set(key); app.redraw(); } }));
    };
    row(DRILL_KEYS.map((d) => DRILL_NAMES[d]), 'x', 160, 84, DRILL_NAMES[p.drill], (v) => (p.drill = DRILL_KEYS.find((d) => DRILL_NAMES[d] === v)), 32);
    row(ROLE_KEYS, 'r', 264, 84, p.role, (v) => (p.role = v), 32);
    row(DIFF_KEYS, 'd', 368, 84, p.difficulty, (v) => (p.difficulty = v));
    if (p.drill === 'match') row(['QUIZ OFF', 'QUIZ SOME', 'QUIZ EVERY REP'], 'q', 472, 84, p.quiz, (v) => (p.quiz = v));
    row([5, 10, 20], 'n', p.drill === 'match' ? 576 : 472, 84, p.reps, (v) => (p.reps = v));
    k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => app.go('home') });
    k.button('start', k.w - 70 - 360, 690, 360, 80, 'START', { primary: true, size: 44, onClick: () => app.startPractice() });
  };
}

export function stats(app) {
  return (k) => {
    k.bg();
    k.text('STATS', 70, 120, 84, { weight: 800 });
    profileChips(k, app);
    const t = store.totals();
    const tiles = [
      ['REPS', String(t.reps)],
      ['SCANS / SEC', t.scanRate == null ? '—' : t.scanRate.toFixed(2)],
      ['SCANNING', pct(t.scan)],
      ['DECISIONS', pct(t.decision)],
      ['MEMORY', pct(t.memory)],
      ['STARS', `${t.stars}`],
    ];
    const tw = (k.w - 140 - 5 * 14) / 6;
    tiles.forEach(([label, val], i) => {
      const x = 70 + i * (tw + 14);
      k.card(x, 160, tw, 150, 22);
      k.text(val, x + 22, 250, 64, { weight: 800 });
      k.text(label, x + 22, 290, 26, { color: GLASS.dim, weight: 700 });
    });
    // last 20 sessions
    const ss = store.profile.sessions.slice(-20);
    const cx = 70, cy = 350, cw = k.w - 140, chh = 300;
    k.card(cx, cy, cw, chh, 26);
    if (ss.length < 2) {
      k.text(ss.length ? 'ONE SESSION SO FAR' : 'NO SESSIONS YET', cx + cw / 2, cy + chh / 2, 40, { align: 'center', base: 'middle', color: GLASS.dim });
    } else {
      const px = (i) => cx + 40 + (i / (ss.length - 1)) * (cw - 80);
      const py = (v) => cy + chh - 40 - (v / 100) * (chh - 80);
      k.g.strokeStyle = GLASS.hair; k.g.lineWidth = 2;
      for (const v of [25, 50, 75]) { k.g.beginPath(); k.g.moveTo(cx + 40, py(v)); k.g.lineTo(cx + cw - 40, py(v)); k.g.stroke(); }
      const line = (key, color, scale = 1) => {
        k.g.strokeStyle = color; k.g.lineWidth = 5; k.g.lineJoin = 'round';
        k.g.beginPath();
        ss.forEach((s, i) => { const v = (s[key] ?? 0) * scale; i ? k.g.lineTo(px(i), py(v)) : k.g.moveTo(px(i), py(v)); });
        k.g.stroke();
      };
      line('score', UI.accent);
      line('scan', '#f2f0e8');
      k.text('SCORE', cx + cw - 40, cy + 44, 28, { align: 'right', color: UI.accent });
      k.text('SCANNING', cx + cw - 140, cy + 44, 28, { align: 'right', color: UI.text });
    }
    k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => app.go('home') });
  };
}

export function settings(app) {
  return (k) => {
    k.bg();
    const s = store.settings;
    k.text('SETTINGS', 70, 120, 84, { weight: 800 });
    const toggle = (id, label, y, key, after) => {
      k.text(label, 70, y + 52, 44);
      k.button(id + 'on', k.w - 70 - 300, y, 140, 76, 'ON', { active: s[key], size: 34, onClick: () => { s[key] = true; store.save(); after?.(); app.redraw(); } });
      k.button(id + 'off', k.w - 70 - 145, y, 140, 76, 'OFF', { active: !s[key], size: 34, onClick: () => { s[key] = false; store.save(); after?.(); app.redraw(); } });
    };
    toggle('mv', 'MOVE WITH PLAY', 170, 'motion');
    toggle('st', 'SEATED', 266, 'seated', () => app.applySettings());
    toggle('tk', 'CLICK ON EACH SCAN', 362, 'ticks', () => app.applySettings());
    k.text('VOLUME', 70, 510, 44);
    k.button('vdn', k.w - 70 - 300, 458, 90, 76, '–', { size: 48, onClick: () => { s.volume = Math.max(0, +(s.volume - 0.1).toFixed(1)); store.save(); app.applySettings(); app.redraw(); } });
    k.text(String(Math.round(s.volume * 10)), k.w - 70 - 155, 510, 48, { align: 'center' });
    k.button('vup', k.w - 70 - 90, 458, 90, 76, '+', { size: 48, onClick: () => { s.volume = Math.min(1, +(s.volume + 0.1).toFixed(1)); store.save(); app.applySettings(); app.redraw(); } });
    const armed = app.resetArmed;
    k.button('reset', 70, 580, k.w - 140, 76, armed ? `CLEAR ${store.profile.name}? PRESS AGAIN` : `CLEAR ${store.profile.name}`, {
      size: 34,
      onClick: () => {
        if (!armed) { app.resetArmed = true; app.redraw(); return; }
        const i = store.data.active;
        store.data.profiles[i] = { ...store.data.profiles[i], stars: Array(24).fill(0), best: Array(24).fill(0), sessions: [] };
        store.save();
        app.resetArmed = false;
        app.redraw();
      },
    });
    k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => { app.resetArmed = false; app.go('home'); } });
    k.button('tutorial', k.w - 70 - 360, 690, 360, 80, 'PLAY TUTORIAL', { size: 36, onClick: () => { app.resetArmed = false; app.startTutorial(); } });
  };
}

export function pause(app) {
  return (k) => {
    k.bg();
    k.text('PAUSED', k.w / 2, 200, 110, { weight: 800, align: 'center' });
    k.button('resume', 240, 300, k.w - 480, 120, 'RESUME', { primary: true, size: 52, onClick: () => app.resume() });
    k.button('quit', 240, 450, k.w - 480, 110, 'QUIT SESSION', { size: 44, onClick: () => app.quitSession() });
  };
}

const OUTCOME = {
  completed: ['COMPLETED', UI.good], tight: ['COMPLETED UNDER PRESSURE', UI.text], intercepted: ['INTERCEPTED', UI.bad],
  lost: ['LOST THE BALL', UI.bad], goal: ['GOAL', UI.good], saved: ['SAVED', UI.text], blocked: ['BLOCKED', UI.bad],
};

export function repCard(app, r, index, count, countdown) {
  return (k) => {
    k.bg();
    k.text(`${index + 1} / ${count}`, 60, 92, 40, { color: GLASS.dim });
    const [label, col] = OUTCOME[r.outcome];
    k.text(label, k.w - 60, 92, 44, { align: 'right', color: col });
    k.text(String(r.total), 60, 290, 210, { weight: 800 });
    const rows = [
      ['SCANS', `${r.scans} / ${r.scanTarget}`, r.scanScore],
      ['DECISION', r.outcome === 'lost' ? 'TOO LATE' : r.decision === 100 ? 'BEST OPTION' : `${r.decision}% OF BEST`, r.decision],
    ];
    if (r.memory != null) rows.push(['MEMORY', '', r.memory]);
    rows.forEach(([name, detail, score], i) => {
      const y = 140 + i * 82;
      k.text(name, 420, y + 50, 40);
      k.text(detail, 640, y + 50, 36, { color: GLASS.dim, weight: 600 });
      k.text(String(score), k.w - 60, y + 50, 48, { align: 'right', color: score >= 70 ? UI.good : score >= 40 ? UI.text : UI.bad });
    });
    const facts = [];
    if (r.shoulder) facts.push([`${r.shoulder} SHOULDER CHECK${r.shoulder > 1 ? 'S' : ''}`, UI.good]);
    if (!r.sawPresser) facts.push(['PRESSER UNSEEN', UI.bad]);
    if (!r.sawFree) facts.push(['FREE TEAMMATE UNSEEN', UI.bad]);
    if (r.watchedStrike === false) facts.push(['EYES OFF THE PASS', UI.bad]);
    if (r.oneTouch) facts.push(['ONE TOUCH', UI.good]);
    let fx = 60;
    k.g.font = `700 30px ${UI.font}`;
    for (const [f, c] of facts.slice(0, 4)) {
      const w = k.g.measureText(f).width + 40;
      if (fx + w > k.w - 60) break;
      k.g.fillStyle = 'rgba(12,14,14,0.5)'; k.rr(fx, 400, w, 58, 29); k.g.fill(); edge(k.g, fx, 400, w, 58, 29, 0.24, 0.07);
      k.text(f, fx + 20, 438, 30, { color: c });
      fx += w + 12;
    }
    k.button('replay', 60, 500, 360, 100, 'REPLAY', { size: 44, onClick: () => app.openReplay() });
    const last = index + 1 >= count;
    k.button('next', k.w - 60 - 460, 500, 460, 100, last ? 'FINISH' : countdown != null ? `NEXT  ${countdown}` : 'NEXT', { primary: true, size: 44, onClick: () => app.nextRep() });
  };
}

export function summary(app, s, starsEarned, nextLevel) {
  return (k) => {
    k.bg();
    k.text(String(s.score), 70, 320, 220, { weight: 800 });
    if (s.level != null) { stars(k, starsEarned, 110, 380, 30, 74); k.text(`LEVEL ${s.level + 1}`, 320, 395, 44, { color: GLASS.dim, align: 'left' }); }
    const rows = [
      ['SCANNING', pct(s.scan)],
      ['DECISIONS', pct(s.decision)],
      ['MEMORY', pct(s.memory)],
      ['SCANS / SEC', s.scanRate.toFixed(2)],
      ['COMPLETED', `${s.completed} / ${s.reps}`],
    ];
    rows.forEach(([a, b], i) => {
      const y = 150 + i * 72;
      k.text(a, 560, y + 40, 40, { color: GLASS.dim, weight: 600 });
      k.text(b, k.w - 70, y + 40, 48, { align: 'right' });
    });
    k.button('menu', 70, 560, 260, 100, 'MENU', { size: 44, onClick: () => app.go('home') });
    k.button('again', 350, 560, 300, 100, 'AGAIN', { size: 44, onClick: () => app.again() });
    if (nextLevel != null) k.button('nextlvl', 670, 560, k.w - 740, 100, `LEVEL ${nextLevel + 1}`, { primary: true, size: 44, onClick: () => app.startCareer(nextLevel) });
  };
}

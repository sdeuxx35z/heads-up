import { DRILL_KEYS, DRILL_NAMES } from './drills.js';
import { UI, ROLES, ROLE_KEYS, DIFF_KEYS, CAREER, STAGES, OBJECTIVE_LABEL } from './config.js';
import { nextLesson, dailyDrill, streak, weakSpot, rating, unlockedDrills, formatMetric } from './career.js';
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
    k.hit('prof' + i, x - 28, y - 6, 56, 56, () => app.switchProfile(i));
  });
}

export function home(app) {
  return (k) => {
    k.bg();
    k.text('HEADS UP', 70, 150, 120, { weight: 800 });
    k.g.fillStyle = UI.accent;
    k.g.fillRect(74, 172, 120, 8);
    profileChips(k, app);
    const p = store.profile, t = store.totals();
    const x = 70, w = k.w - 140;
    const n = nextLesson(p), lesson = CAREER[n];
    const allDone = p.passed.every(Boolean);
    k.button('continue', x, 222, w, 130, allDone ? 'CAREER COMPLETE' : 'CONTINUE', { primary: true, size: 60, onClick: () => app.continueCareer() });
    if (!allDone) k.text(`${String(n + 1).padStart(2, '0')} · ${lesson.name}`, x + w - 40, 300, 40, { align: 'right', color: '#111' });
    const bw = (w - 40) / 3;
    const daily = dailyDrill(p);
    const doneToday = p.dailies.includes(daily.key);
    const st = streak(p);
    k.button('daily', x, 372, bw, 120, doneToday ? 'DAILY DONE' : 'DAILY', { size: 44, active: false, onClick: () => app.startDaily() });
    if (st) k.text(`${st} DAY${st > 1 ? 'S' : ''}`, x + bw / 2, 470, 28, { align: 'center', color: GLASS.dim });
    const weak = weakSpot(p);
    k.button('weak', x + bw + 20, 372, bw, 120, weak ? `WORK ON ${WEAK_LABEL[weak.key]}` : 'WORK ON SCANS', { size: 40, onClick: () => app.startWeakSpot() });
    k.button('career', x + (bw + 20) * 2, 372, bw, 120, 'CAREER MAP', { size: 44, onClick: () => { app.careerStage = CAREER[n].stage; app.go('career'); } });
    k.button('practice', x, 512, bw, 100, 'PRACTICE', { size: 40, onClick: () => app.go('practice') });
    k.button('stats', x + bw + 20, 512, bw, 100, 'STATS', { size: 40, onClick: () => app.go('stats') });
    k.button('settings', x + (bw + 20) * 2, 512, bw, 100, 'SETTINGS', { size: 40, onClick: () => app.go('settings') });
    k.card(x, 632, w, 70, 22);
    k.text(`${p.name} · ${p.number}`, x + 28, 678, 36, { color: p.color });
    const r = rating(p);
    k.text(r == null ? `${t.reps} REPS` : `RATING ${r}`, x + w / 2, 678, 36, { align: 'center' });
    k.text(`${t.stars} / 72`, x + w - 28, 678, 36, { align: 'right', color: GLASS.dim });
    if (app.xrSupported && !app.inXR) {
      k.button('vr', x, 716, w, 64, 'ENTER VR', { size: 34, onClick: () => app.enterVR() });
    }
  };
}

// the noticeboard: today's drill, the streak, the weak spot
export function today(app) {
  return (k) => {
    k.bg(30);
    const p = store.profile;
    const d = dailyDrill(p), done = p.dailies.includes(d.key), st = streak(p);
    k.text('TODAY', 56, 100, 72, { weight: 800 });
    k.text(st ? `${st} DAY STREAK` : d.key, k.w - 56, 100, 34, { align: 'right', color: GLASS.dim });
    const names = d.pairs.map(([x, role]) => `${DRILL_NAMES[x] || x} · ${role}`);
    names.forEach((n, i) => {
      k.card(56, 140 + i * 96, k.w - 112, 80, 20);
      k.text(n, 84, 192 + i * 96, 36);
    });
    k.button('daily', 56, 440, k.w - 112, 110, done ? 'DAILY DONE · AGAIN' : 'PLAY DAILY', { primary: !done, size: 46, onClick: () => app.startDaily() });
    const w = weakSpot(p);
    k.button('weak', 56, 572, k.w - 112, 110, `WORK ON ${w ? WEAK_LABEL[w.key] : 'SCANS'}`, { size: 42, onClick: () => app.startWeakSpot() });
    k.text(`${p.name} · ${p.number}`, 56, k.h - 40, 30, { color: p.color });
    const r = rating(p);
    if (r != null) k.text(`RATING ${r}`, k.w - 56, k.h - 40, 30, { align: 'right' });
  };
}

const WEAK_LABEL = { rate: 'SCAN RATE', timing: 'TIMING', critical: 'CRITICAL', info: 'WHAT YOU SEE', body: 'BODY SHAPE', decision: 'DECISIONS' };

export function career(app, mounted = false) {
  return (k) => {
    k.bg();
    const stage = app.careerStage;
    const p = store.profile;
    k.text(STAGES[stage], 70, 120, 84, { weight: 800 });
    const levels = CAREER.filter((l) => l.stage === stage);
    const passed = levels.filter((l) => p.passed[l.index]).length;
    k.text(`${passed} / 6`, k.w - 70, 120, 44, { align: 'right', color: GLASS.dim });
    const next = nextLesson(p);
    const cw = (k.w - 140 - 40) / 3, ch = 236;
    levels.forEach((l, i) => {
      const x = 70 + (i % 3) * (cw + 20), y = 166 + Math.floor(i / 3) * (ch + 18);
      const done = !!p.passed[l.index];
      const open = done || l.index === next || store.unlocked(l.index);
      const isNext = l.index === next && !done;
      const id = 'lvl' + l.index;
      const hov = k.hovered(id) && open;
      k.card(x, y, cw, ch, 26, { hi: hov, shadow: open });
      if (isNext) { k.g.strokeStyle = UI.accent; k.g.lineWidth = 4; k.rr(x + 2, y + 2, cw - 4, ch - 4, 25); k.g.stroke(); }
      const ink = open ? UI.text : 'rgba(242,240,232,0.35)';
      k.text(String(l.index + 1).padStart(2, '0'), x + 26, y + 70, 56, { weight: 800, color: isNext ? UI.accent : ink });
      if (done) stars(k, p.stars[l.index], x + cw - 118, y + 52, 16, 38);
      else if (!open) k.text('LOCKED', x + cw - 26, y + 62, 26, { align: 'right', color: 'rgba(242,240,232,0.25)' });
      k.text(l.name, x + 26, y + 124, 40, { color: ink });
      const [key, need] = l.objective;
      const tag = OBJECTIVE_LABEL[key](need);
      k.g.font = `700 30px ${UI.font}`;
      const tw = Math.min(cw - 52, k.g.measureText(tag).width + 34);
      k.g.fillStyle = open ? GLASS.chip : GLASS.chipOff; k.rr(x + 26, y + 150, tw, 42, 21); k.g.fill();
      edge(k.g, x + 26, y + 150, tw, 42, 21, open ? 0.2 : 0.08, 0.05);
      k.text(tag, x + 43, y + 172, 30, { color: open ? UI.text : 'rgba(242,240,232,0.25)', base: 'middle' });
      const best = p.best[l.index];
      if (best) k.text(`BEST ${best}`, x + 26, y + 220, 26, { color: GLASS.dim });
      if (open) k.hit(id, x, y, cw, ch, () => app.startCareer(l.index));
    });
    if (!mounted) k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => app.go('home') });
    k.button('prev', k.w - 290, 690, 100, 80, '‹', { size: 60, disabled: stage === 0, onClick: () => { app.careerStage--; app.redraw(); } });
    k.button('next', k.w - 170, 690, 100, 80, '›', { size: 60, disabled: stage === STAGES.length - 1, onClick: () => { app.careerStage++; app.redraw(); } });
  };
}

export function practice(app) {
  return (k) => {
    k.bg();
    const p = app.practiceOpts;
    k.text('PRACTICE', 70, 112, 76, { weight: 800 });
    k.text(ROLES[p.role].name, k.w - 70, 112, 40, { align: 'right', color: GLASS.dim });
    const gap = 12;
    const row = (keys, label, y, h, cur, set, size = 30, isOpen = () => true, name = (x) => x) => {
      const bw = (k.w - 140 - gap * (keys.length - 1)) / keys.length;
      keys.forEach((key, i) => k.button(label + key, 70 + i * (bw + gap), y, bw, h, typeof key === 'number' ? `${key} REPS` : name(key), {
        active: cur === key, size, disabled: !isOpen(key), onClick: () => { set(key); app.redraw(); },
      }));
    };
    // drills open up as career lessons introduce them
    const open = unlockedDrills(store.profile);
    if (!open.has(p.drill)) p.drill = 'match';
    const isOpen = (d) => open.has(d);
    const opener = (d) => CAREER.findIndex((l) => l.drill === d || (l.pairs || []).some(([x]) => x === d));
    const label = (d) => (isOpen(d) ? DRILL_NAMES[d] : opener(d) >= 0 ? `LESSON ${opener(d) + 1}` : DRILL_NAMES[d]);
    const per = Math.ceil(DRILL_KEYS.length / 3);
    for (let i = 0; i < 3; i++) row(DRILL_KEYS.slice(i * per, (i + 1) * per), 'x', 132 + i * 72, 62, p.drill, (v) => (p.drill = v), 25, isOpen, label);
    row(ROLE_KEYS, 'r', 362, 70, p.role, (v) => (p.role = v), 30);
    row(DIFF_KEYS, 'd', 444, 70, p.difficulty, (v) => (p.difficulty = v));
    if (p.drill === 'match') row(['QUIZ OFF', 'QUIZ SOME', 'QUIZ EVERY REP'], 'q', 526, 70, p.quiz, (v) => (p.quiz = v));
    row([5, 10, 20], 'n', p.drill === 'match' ? 608 : 526, 70, p.reps, (v) => (p.reps = v));
    k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => app.go('home') });
    k.button('start', k.w - 70 - 360, 690, 360, 80, 'START', { primary: true, size: 44, onClick: () => app.startPractice() });
  };
}

export function stats(app, mounted = false) {
  return (k) => {
    k.bg();
    k.text('STATS', 70, 120, 84, { weight: 800 });
    profileChips(k, app);
    const p = store.profile, t = store.totals();
    const recent = p.sessions.slice(-10).filter((x) => x.metrics);
    const avg = (key) => { const v = recent.map((x) => x.metrics[key]).filter((x) => x != null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
    const r = rating(p), st = streak(p);
    const tiles = [
      ['RATING', r == null ? '—' : String(r)],
      ['REPS', String(t.reps)],
      ['STREAK', st ? `${st}` : '—'],
      ['SCANS VS PAR', formatMetric('rate', avg('rate'))],
      ['TIMING', avg('timing') == null ? '—' : `${Math.round(avg('timing'))}%`],
      ['CRITICAL', formatMetric('critical', avg('critical'))],
    ];
    const tw = (k.w - 140 - 5 * 14) / 6;
    tiles.forEach(([label, val], i) => {
      const x = 70 + i * (tw + 14);
      k.card(x, 160, tw, 150, 22);
      k.text(val, x + 22, 250, 60, { weight: 800 });
      k.text(label, x + 22, 292, 28, { color: GLASS.dim, weight: 700 });
    });
    // last 20 sessions: overall score and scanning against par
    const ss = p.sessions.slice(-20);
    const cx = 70, cy = 340, cw = k.w - 140, chh = mounted ? k.h - 380 : 300;
    k.card(cx, cy, cw, chh, 26);
    if (ss.length < 2) {
      k.text(ss.length ? 'ONE SESSION SO FAR' : 'NO SESSIONS YET', cx + cw / 2, cy + chh / 2, 40, { align: 'center', base: 'middle', color: GLASS.dim });
    } else {
      const px = (i) => cx + 40 + (i / (ss.length - 1)) * (cw - 80);
      const py = (v) => cy + chh - 40 - (Math.min(120, v) / 120) * (chh - 80);
      k.g.strokeStyle = GLASS.hair; k.g.lineWidth = 2;
      for (const v of [25, 50, 75, 100]) { k.g.beginPath(); k.g.moveTo(cx + 40, py(v)); k.g.lineTo(cx + cw - 40, py(v)); k.g.stroke(); }
      const line = (get, color) => {
        k.g.strokeStyle = color; k.g.lineWidth = 5; k.g.lineJoin = 'round';
        k.g.beginPath();
        let started = false;
        ss.forEach((x, i) => {
          const v = get(x);
          if (v == null) return;
          started ? k.g.lineTo(px(i), py(v)) : k.g.moveTo(px(i), py(v));
          started = true;
        });
        k.g.stroke();
      };
      line((x) => x.score, UI.accent);
      line((x) => (x.metrics?.rate != null ? x.metrics.rate * 100 : null), '#f2f0e8');
      k.text('SCORE', cx + cw - 40, cy + 44, 28, { align: 'right', color: UI.accent });
      k.text('SCANS VS PAR', cx + cw - 150, cy + 44, 28, { align: 'right', color: UI.text });
    }
    if (!mounted) k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => app.go('home') });
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
    const pick = (id, label, y, key, opts) => {
      k.text(label, 70, y + 50, 40);
      opts.forEach(([v, name], i) => k.button(id + v, k.w - 70 - 300 + i * 155, y, 145, 70, name, { active: (s[key] ?? opts[0][0]) === v, size: 32, onClick: () => { s[key] = v; store.save(); app.applySettings(); app.redraw(); } }));
    };
    const onOff = [[true, 'ON'], [false, 'OFF']];
    if (s.vignette === undefined) s.vignette = true;
    pick('sr', 'RUN WHERE YOUR LEFT HAND POINTS', 146, 'steer', [['hand', 'HAND'], ['head', 'HEAD']]);
    pick('mv', 'AUTO RUN WITH PLAY', 226, 'motion', onOff);
    pick('st', 'SEATED', 306, 'seated', onOff);
    pick('tk', 'CLICK ON EACH SCAN', 386, 'ticks', onOff);
    pick('vg', 'DIM EDGES WHEN RUNNING', 466, 'vignette', onOff);
    k.text('VOLUME', 70, 596, 40);
    k.button('vdn', k.w - 70 - 300, 546, 90, 70, '–', { size: 46, onClick: () => { s.volume = Math.max(0, +(s.volume - 0.1).toFixed(1)); store.save(); app.applySettings(); app.redraw(); } });
    k.text(String(Math.round(s.volume * 10)), k.w - 70 - 155, 596, 46, { align: 'center' });
    k.button('vup', k.w - 70 - 90, 546, 90, 70, '+', { size: 46, onClick: () => { s.volume = Math.min(1, +(s.volume + 0.1).toFixed(1)); store.save(); app.applySettings(); app.redraw(); } });
    const armed = app.resetArmed;
    k.button('reset', 290, 690, 540, 80, armed ? 'PRESS AGAIN TO CLEAR' : `CLEAR ${store.profile.name}`, {
      size: 32,
      onClick: () => {
        if (!armed) { app.resetArmed = true; app.redraw(); return; }
        const i = store.data.active;
        store.data.profiles[i] = { ...store.data.profiles[i], stars: Array(24).fill(0), best: Array(24).fill(0), passed: Array(24).fill(false), dailies: [], sessions: [] };
        store.save();
        app.resetArmed = false;
        app.redraw();
      },
    });
    k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => { app.resetArmed = false; app.go('home'); } });
    k.button('tutorial', k.w - 70 - 360, 690, 360, 80, 'TUTORIAL', { size: 36, onClick: () => { app.resetArmed = false; app.startTutorial(); } });
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

const CRIT = { prime: ['PRIME', UI.good], critical: ['CRITICAL', UI.good], late: ['LATE EYES', UI.bad], none: ['NONE', UI.bad] };
const tone = (v) => (v == null ? GLASS.dim : v >= 70 ? UI.good : v >= 40 ? UI.text : UI.bad);

export function repCard(app, r, index, count) {
  return (k) => {
    k.bg();
    k.text(`${index + 1} / ${count}`, 60, 92, 40, { color: GLASS.dim });
    const [label, col] = OUTCOME[r.outcome] || ['', UI.text];
    k.text(label, k.w - 60, 92, 44, { align: 'right', color: col });
    k.text(String(r.total), 60, 300, 200, { weight: 800 });
    const rate = r.scanRate10 != null ? r.scanRate10 : null;
    const ratePct = rate != null && r.par ? Math.round((rate / r.par) * 100) : null;
    const chosenNo = r.chosen?.kind === 'shot' ? 'SHOT' : r.chosen?.target?.number;
    const bestNo = r.bestNumber ?? (r.best?.kind === 'shot' ? 'SHOT' : r.best?.target?.number);
    const decisionText = r.outcome === 'lost' ? 'TOO LATE'
      : r.decision >= 99 ? `#${chosenNo}${r.reason ? ' · ' + r.reason : ''}`
      : `YOU #${chosenNo ?? '—'} · BEST #${bestNo ?? '—'}${r.reason ? ' · ' + r.reason : ''}`;
    const taught = app.taught();
    const rows = [
      ['SCANS', rate == null ? '—' : `${rate.toFixed(1)} PER 10 S · PAR ${r.par}`, ratePct == null ? null : Math.min(100, ratePct)],
      taught.has('timing') && ['TIMING', r.timing == null ? '—' : `${r.badScans || 0} AT A TOUCH`, r.timing],
      taught.has('critical') && ['CRITICAL', r.critical == null ? 'SHORT PASS' : CRIT[r.critical]?.[0] || '—', r.critical == null ? null : { prime: 100, critical: 80, none: 20, late: 0 }[r.critical]],
      taught.has('info') && ['WHAT YOU SAW', r.sawPresser === false ? 'PRESSER MISSED' : r.sawBest === false ? `#${r.bestNumber} MISSED` : '', r.info],
      taught.has('body') && ['BODY', r.body || '—', r.body ? { 'HALF-TURN': 100, OPEN: 70, CLOSED: 30 }[r.body] : null],
      ['DECISION', decisionText, r.decision],
    ].filter(Boolean);
    if (r.memory != null) rows.push(['MEMORY', '', r.memory]);
    const rh = rows.length > 5 ? 62 : rows.length > 3 ? 70 : 84;
    rows.forEach(([name, detail, score], i) => {
      const y = 128 + i * rh;
      k.text(name, 400, y + 46, 38);
      k.g.save(); k.g.beginPath(); k.g.rect(560, y, 520, rh); k.g.clip();
      k.text(detail, 560, y + 46, 32, { color: GLASS.dim, weight: 600 });
      k.g.restore();
      k.text(score == null ? '—' : String(Math.round(score)), k.w - 60, y + 46, 44, { align: 'right', color: tone(score) });
    });
    const facts = [];
    if (r.fact) facts.push([r.fact, UI.text]);
    if (r.shoulder) facts.push([`${r.shoulder} SHOULDER CHECK${r.shoulder > 1 ? 'S' : ''}`, UI.good]);
    if (r.sawPresser === false) facts.push(['PRESSER UNSEEN', UI.bad]);
    if (r.sawFree === false) facts.push(['BEST OPTION UNSEEN', UI.bad]);
    if (r.oneTouch) facts.push(['ONE TOUCH', UI.good]);
    else if (r.decisionSpeed != null && r.outcome !== 'lost') facts.push([`${r.decisionSpeed.toFixed(1)} S ON THE BALL`, r.decisionSpeed <= 1 ? UI.good : UI.text]);
    let fx = 60;
    const fy = 128 + rows.length * rh + 18;
    k.g.font = `700 28px ${UI.font}`;
    for (const [f, c] of facts.slice(0, 4)) {
      const w = k.g.measureText(f).width + 38;
      if (fx + w > k.w - 60) break;
      k.g.fillStyle = 'rgba(12,14,14,0.5)'; k.rr(fx, fy, w, 54, 27); k.g.fill(); edge(k.g, fx, fy, w, 54, 27, 0.24, 0.07);
      k.text(f, fx + 19, fy + 36, 28, { color: c });
      fx += w + 12;
    }
    k.button('replay', 60, 676, 360, 96, 'REPLAY', { size: 42, onClick: () => app.openReplay() });
    const last = index + 1 >= count;
    k.button('next', k.w - 60 - 460, 676, 460, 96, last ? 'FINISH' : 'NEXT', { primary: true, size: 42, onClick: () => app.nextRep() });
  };
}

export function summary(app, s, starsEarned, nextLevel) {
  return (k) => {
    k.bg();
    const lesson = s.level != null ? CAREER[s.level] : null;
    const head = lesson ? `${String(s.level + 1).padStart(2, '0')} · ${lesson.name}` : s.daily ? 'DAILY DRILL' : 'SESSION';
    k.text(head, 70, 104, 52, { weight: 800, color: GLASS.dim });
    k.text(String(s.score ?? '—'), 70, 300, 200, { weight: 800 });
    if (lesson && s.objective?.passed) stars(k, starsEarned || 1, 110, 360, 28, 70);
    let cy = 410;
    if (s.newBest || s.firstPass) {
      const extra = [...(s.unlocked || []).map((d) => DRILL_NAMES[d]), s.trophy ? 'TROPHY' : null].filter(Boolean);
      const t = (s.firstPass ? (nextLevel != null ? `LESSON ${nextLevel + 1} OPEN` : 'CAREER COMPLETE') : 'NEW BEST') + (extra.length ? ` · ${extra.join(' · ')}` : '');
      k.g.font = `800 32px ${UI.font}`;
      const w = k.g.measureText(t).width + 44;
      k.g.fillStyle = UI.accent; k.rr(70, cy, w, 58, 29); k.g.fill();
      k.text(t, 92, cy + 40, 32, { color: '#111', weight: 800 });
      cy += 76;
    }
    const o = s.objective;
    if (o) {
      k.card(70, cy, 520, 120, 24);
      k.text(OBJECTIVE_LABEL[o.key](o.need), 98, cy + 50, 34);
      k.text(o.passed ? `YOURS ${formatMetric(o.key, o.got)}` : `YOURS ${formatMetric(o.key, o.got)} · NOT YET`, 98, cy + 96, 32, { color: o.passed ? UI.good : UI.bad, weight: 700 });
      cy += 132;
      if (!o.passed && o.lowScans) k.text('SCANS UNDER 30% OF PAR', 70, cy + 20, 30, { color: UI.text });
      else if (!o.passed && s.worst) k.text(`REP ${s.worst.rep}: ${s.worst.why}`, 70, cy + 20, 30, { color: UI.text });
    }
    const delta = s.ratingBefore != null && s.ratingAfter != null ? s.ratingAfter - s.ratingBefore : null;
    const line = [s.streak ? `STREAK ${s.streak}` : null, s.ratingAfter != null ? `RATING ${s.ratingAfter}${delta ? (delta > 0 ? ` +${delta}` : ` ${delta}`) : ''}` : null].filter(Boolean).join(' · ');
    if (line) k.text(line, 70, 640, 30, { color: GLASS.dim });
    const m = s.metrics || {};
    const rows = [
      ['SCANS VS PAR', formatMetric('rate', m.rate)],
      ['TIMING', m.timing == null ? '—' : `${Math.round(m.timing)}%`],
      ['CRITICAL SCANS', formatMetric('critical', m.critical)],
      ['WHAT YOU SAW', formatMetric('info', m.info)],
      ['DECISIONS', formatMetric('decision', m.decision)],
      ['KEPT THE BALL', `${s.completed} / ${s.reps}`],
    ];
    rows.forEach(([a, b], i) => {
      const y = 140 + i * 66;
      k.text(a, 660, y + 40, 36, { color: GLASS.dim, weight: 600 });
      k.text(b, k.w - 70, y + 40, 44, { align: 'right' });
    });
    k.button('menu', 70, 676, 260, 96, 'MENU', { size: 42, onClick: () => app.go('home') });
    k.button('again', 350, 676, 300, 96, o && !o.passed ? 'RETRY' : 'AGAIN', { size: 42, primary: !!o && !o.passed, onClick: () => app.again() });
    // three misses: the lesson can be skipped (no stars) so nobody hits a wall
    if (o && !o.passed && s.fails >= 3 && s.level < CAREER.length - 1) k.button('skip', 670, 676, k.w - 740, 96, `SKIP TO LESSON ${s.level + 2}`, { size: 38, onClick: () => { store.skipLesson(s.level); app.startCareer(s.level + 1); } });
    if (nextLevel != null) k.button('nextlvl', 670, 676, k.w - 740, 96, `LESSON ${nextLevel + 1}`, { primary: true, size: 42, onClick: () => app.startCareer(nextLevel) });
  };
}

// PLAYER CAREER screens. Same kit and look as screens.js: each export is (app, ...) => (k) => {...}.
// State comes from store.profile.pro every draw; the app methods used are:
//   app.go(name), app.redraw(), app.proCreate({name, position, number}), app.proPlay(), app.proTrain(focus), app.proSign(i)
// Screen-local state lives on the app: app.proDraft, app.proTableDiv, app.proInboxPage.
import { UI, ROLES, ROLE_KEYS } from './config.js';
import { store } from './store.js';
import { GLASS } from './ui.js';
import {
  ATTRS, STATUSES, table, tablePos, nextFixture, clubOf, CLUBS, unreadCount, markRead, canTrain, trainingDrill,
  seasonOver, endSeason, ratingColor, ordinal, MATCHDAYS, POSITION_WEIGHTS,
} from './pro.js';

const DRILL_LABEL = {
  match: 'MATCH SITUATION', rondo: 'RONDO 5V2', awareness: 'AWARENESS', press: 'PRESS', switch: 'SWITCH PLAY', thirdman: 'THIRD MAN', signal: 'SIGNAL',
  colour: 'COLOUR CALL', turn: 'RECEIVE AND TURN', inhibit: 'INHIBIT', sandwich: 'SANDWICH', through: 'THROUGH BALL', gkbuild: 'BUILD FROM THE BACK', memory: 'COLOUR MEMORY', latest: 'LATEST COLOUR',
};
const NAMES = ['J. CARTER', 'M. OKAFOR', 'L. FERREIRA', 'D. NOVAK', 'T. HAYES', 'S. ROMERO', 'A. KOWALSKI', 'R. SATO'];
const g = () => store.profile?.pro || null;
const num = (n) => n.toLocaleString('en-US');

function wrap(k, text, size, maxW, weight = 600) {
  k.g.font = `${weight} ${size}px ${UI.font}`;
  const lines = []; let cur = '';
  for (const word of String(text).split(' ')) {
    const t = cur ? `${cur} ${word}` : word;
    if (k.g.measureText(t).width > maxW && cur) { lines.push(cur); cur = word; } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}
function fit(k, text, size, maxW, weight = 700) {
  k.g.font = `${weight} ${size}px ${UI.font}`;
  while (size > 22 && k.g.measureText(text).width > maxW) { size -= 2; k.g.font = `${weight} ${size}px ${UI.font}`; }
  return size;
}
function disc(k, x, y, r, color) {
  const c = k.g;
  c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = color; c.fill();
  c.strokeStyle = 'rgba(255,255,255,0.45)'; c.lineWidth = 2; c.stroke();
}
function missing(k, app) {
  k.bg();
  k.text('NO CAREER YET', k.w / 2, 380, 70, { align: 'center', weight: 800 });
  k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => app.go('home') });
}
const statusColor = (s) => (STATUSES.indexOf(s) >= 3 ? UI.accent : UI.text);

// ---------- create

export function proCreate(app) {
  return (k) => {
    k.bg();
    const p = store.profile;
    const d = (app.proDraft ||= { name: p.name, position: 'CM', number: p.number || 8 });
    const names = [p.name, ...NAMES.filter((n) => n !== p.name)];
    k.text('PLAYER CAREER', 70, 120, 84, { weight: 800 });
    k.g.fillStyle = UI.accent; k.g.fillRect(74, 142, 120, 8);
    const cols = 4, gap = 14, bw = (k.w - 140 - gap * (cols - 1)) / cols, bh = 112;
    ROLE_KEYS.forEach((key, i) => {
      const x = 70 + (i % cols) * (bw + gap), y = 176 + Math.floor(i / cols) * (bh + gap);
      k.button('pos' + key, x, y, bw, bh, key, { size: 52, sub: ROLES[key].name, active: d.position === key, onClick: () => { d.position = key; app.redraw(); } });
    });
    const cy = 436, ch = 150, cw = (k.w - 140 - 24) / 2;
    // shirt number
    k.card(70, cy, cw, ch, 26);
    const step = (id, x, label, delta) => k.button(id, x, cy + 35, 70, 80, label, { size: 40, onClick: () => { d.number = ((d.number - 1 + delta + 99) % 99) + 1; app.redraw(); } });
    step('n-10', 90, '‹‹', -10); step('n-1', 168, '‹', -1); step('n+1', 70 + cw - 168 - 70 + 0, '›', 1); step('n+10', 70 + cw - 90 - 70 + 0, '››', 10);
    k.text(String(d.number), 70 + cw / 2, cy + 104, 100, { align: 'center', weight: 800 });
    // name
    const nx = 70 + cw + 24;
    k.card(nx, cy, cw, ch, 26);
    const ni = Math.max(0, names.indexOf(d.name));
    k.button('name-', nx + 20, cy + 35, 70, 80, '‹', { size: 40, onClick: () => { d.name = names[(ni + names.length - 1) % names.length]; app.redraw(); } });
    k.button('name+', nx + cw - 90, cy + 35, 70, 80, '›', { size: 40, onClick: () => { d.name = names[(ni + 1) % names.length]; app.redraw(); } });
    k.text(d.name, nx + cw / 2, cy + 98, fit(k, d.name, 56, cw - 220), { align: 'center', base: 'alphabetic' });
    // shirt preview line
    k.card(70, 606, k.w - 140, 64, 22);
    k.text(`${d.name} · ${d.number} · ${ROLES[d.position].name}`, 98, 650, 36);
    k.text('AGE 17 · OVR 55 · DIVISION 2', k.w - 98, 650, 32, { align: 'right', color: GLASS.dim });
    k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => app.go('home') });
    k.button('sign', k.w - 70 - 420, 690, 420, 80, 'SIGN', { primary: true, size: 48, onClick: () => app.proCreate({ name: d.name, position: d.position, number: d.number }) });
  };
}

// ---------- hub

export function proHub(app) {
  return (k) => {
    const pro = g(app);
    if (!pro) return missing(k, app);
    k.bg();
    const club = clubOf(pro.clubId, pro);
    const fx = nextFixture(pro);
    const over = seasonOver(pro) || pro.phase === 'offseason';
    k.text(club.name.toUpperCase(), 70, 120, fit(k, club.name.toUpperCase(), 84, 640, 800), { weight: 800 });
    k.g.fillStyle = club.color; k.g.fillRect(74, 140, 120, 8);
    k.text(`SEASON ${pro.season} · ${over ? 'COMPLETE' : `MATCHDAY ${pro.matchday + 1} / ${MATCHDAYS}`}`, k.w - 70, 98, 38, { align: 'right', color: GLASS.dim });
    k.text(`DIVISION ${pro.div} · ${ordinal(tablePos(pro))}`, k.w - 70, 140, 38, { align: 'right' });

    // player card
    const cx = 70, cy = 172, cw = 430, chh = 496;
    k.card(cx, cy, cw, chh, 30);
    k.text(String(pro.ovr), cx + 34, cy + 138, 150, { weight: 800, color: UI.accent });
    k.text(pro.position, cx + cw - 34, cy + 70, 64, { align: 'right', weight: 800 });
    k.text(ROLES[pro.position].name, cx + cw - 34, cy + 108, 30, { align: 'right', color: GLASS.dim });
    k.text(`${pro.name} · ${pro.number}`, cx + 34, cy + 188, fit(k, `${pro.name} · ${pro.number}`, 42, cw - 68));
    k.text(`AGE ${pro.age}`, cx + cw - 34, cy + 138, 32, { align: 'right', color: GLASS.dim });
    k.g.fillStyle = GLASS.hair; k.g.fillRect(cx + 34, cy + 210, cw - 68, 2);
    ATTRS.forEach((a, i) => {
      const y = cy + 262 + i * 46, v = pro.attrs[a];
      k.text(a, cx + 34, y, 30, { color: GLASS.dim });
      k.g.fillStyle = 'rgba(255,255,255,0.10)'; k.rr(cx + 190, y - 22, 140, 14, 7); k.g.fill();
      k.g.fillStyle = UI.accent; k.rr(cx + 190, y - 22, Math.max(8, 140 * Math.min(1, (v - 30) / 60)), 14, 7); k.g.fill();
      k.text(String(Math.round(v)), cx + cw - 34, y, 36, { align: 'right', weight: 800 });
    });

    // next fixture
    const fx0 = 524, fw = k.w - 70 - fx0;
    k.card(fx0, 172, fw, 250, 30);
    if (fx && !over) {
      disc(k, fx0 + 70, 262, 34, fx.oppColor);
      k.text(fx.oppName.toUpperCase(), fx0 + 130, 262, fit(k, fx.oppName.toUpperCase(), 60, fw - 170, 800), { weight: 800 });
      k.text(`${fx.home ? 'HOME' : 'AWAY'} · MATCHDAY ${fx.matchday}`, fx0 + 130, 308, 36, { color: GLASS.dim });
      k.g.fillStyle = GLASS.hair; k.g.fillRect(fx0 + 34, 336, fw - 68, 2);
      k.text(`${ordinal(fx.oppPos)} IN DIVISION ${pro.div}`, fx0 + 34, 390, 36);
      k.text(`STRENGTH ${fx.oppStrength}`, fx0 + fw - 34, 390, 36, { align: 'right', color: GLASS.dim });
    } else {
      k.text(pro.phase === 'offseason' ? 'OFFERS ARE IN' : 'SEASON COMPLETE', fx0 + 34, 290, 64, { weight: 800 });
      k.text(`FINISHED ${ordinal(tablePos(pro))} IN DIVISION ${pro.div}`, fx0 + 34, 346, 38, { color: GLASS.dim });
    }

    // status, form, morale
    k.card(fx0, 442, fw, 226, 30);
    k.text(pro.status, fx0 + 34, 506, 54, { weight: 800, color: statusColor(pro.status) });
    k.text(`TRUST ${Math.round(pro.trust)}`, fx0 + fw - 34, 506, 34, { align: 'right', color: GLASS.dim });
    k.text(`${clubOf(pro.clubId, pro).name.toUpperCase()} · ${pro.contract.years} YR · ${num(pro.contract.wage)} A WEEK`, fx0 + 34, 552, 28, { color: GLASS.dim });
    const form = pro.form.slice(-5);
    for (let i = 0; i < 5; i++) {
      const x = fx0 + 34 + i * 82, v = form[i];
      k.g.fillStyle = v == null ? GLASS.chipOff : GLASS.chip; k.rr(x, 586, 70, 56, 16); k.g.fill();
      if (v != null) k.text(v.toFixed(1), x + 35, 616, 30, { align: 'center', base: 'middle', color: ratingColor(v, UI) });
    }
    const s = pro.stats;
    k.text(`${s.apps} APPS · ${s.goals} G · ${s.assists} A`, fx0 + fw - 34, 622, 30, { align: 'right' });

    // buttons
    const unread = unreadCount(pro);
    k.button('back', 70, 690, 150, 80, 'BACK', { size: 34, onClick: () => app.go('home') });
    k.button('inbox', 236, 690, 210, 80, unread ? `INBOX · ${unread}` : 'INBOX', { size: 34, onClick: () => app.go('proInbox') });
    k.button('table', 462, 690, 170, 80, 'TABLE', { size: 34, onClick: () => app.go('proTable') });
    k.button('training', 648, 690, 210, 80, 'TRAINING', { size: 34, disabled: over, onClick: () => app.go('proTraining') });
    const px = 874, pw = k.w - 70 - px;
    if (over) k.button('end', px, 690, pw, 80, 'SEASON END', { primary: true, size: 42, onClick: () => app.go('proSeasonEnd') });
    else k.button('play', px, 690, pw, 80, 'PLAY MATCH', { primary: true, size: 42, onClick: () => app.proPlay() });
  };
}

// ---------- training

export function proTraining(app) {
  return (k) => {
    const pro = g(app);
    if (!pro) return missing(k, app);
    k.bg();
    const can = canTrain(pro);
    k.text('TRAINING', 70, 120, 84, { weight: 800 });
    const t = !can && app.proTrained;
    const done = t ? `${t.focus} +${t.delta.toFixed(1)}${t.ovrAfter > t.ovrBefore ? ` · OVR ${t.ovrAfter}` : ''} · DONE FOR TODAY` : 'DONE FOR TODAY';
    k.text(can ? `MATCHDAY ${pro.matchday + 1}` : done, k.w - 70, 120, 44, { align: 'right', color: can ? GLASS.dim : UI.good });
    const gap = 16, cw = (k.w - 140 - gap * 4) / 5, y = 170, ch = 470;
    const wts = POSITION_WEIGHTS[pro.position];
    ATTRS.forEach((a, i) => {
      const x = 70 + i * (cw + gap), id = 'tr' + a;
      const hov = can && k.hovered(id);
      k.card(x, y, cw, ch, 28, { hi: hov, shadow: can });
      const ink = can ? UI.text : 'rgba(242,240,232,0.4)';
      k.text(a, x + cw / 2, y + 66, fit(k, a, 38, cw - 24), { align: 'center', color: ink });
      k.text(String(Math.round(pro.attrs[a])), x + cw / 2, y + 190, 130, { align: 'center', weight: 800, color: can ? UI.accent : 'rgba(255,122,26,0.4)' });
      k.text(`${Math.round(wts[i] * 100)}% OF OVR`, x + cw / 2, y + 240, 28, { align: 'center', color: GLASS.dim });
      k.g.fillStyle = GLASS.hair; k.g.fillRect(x + 28, y + 276, cw - 56, 2);
      const drill = DRILL_LABEL[trainingDrill(pro, a)] || trainingDrill(pro, a).toUpperCase();
      const lines = wrap(k, drill, 32, cw - 40, 700);
      lines.slice(0, 3).forEach((l, j) => k.text(l, x + cw / 2, y + 330 + j * 38, 32, { align: 'center', color: ink }));
      k.text('3 REPS', x + cw / 2, y + ch - 36, 28, { align: 'center', color: GLASS.dim });
      if (can) k.hit(id, x, y, cw, ch, () => app.proTrain(a));
    });
    k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => app.go('proHub') });
  };
}

// ---------- table

export function proTable(app) {
  return (k) => {
    const pro = g(app);
    if (!pro) return missing(k, app);
    k.bg();
    const div = app.proTableDiv || pro.div;
    const rows = table(pro, div);
    k.text(`DIVISION ${div}`, 70, 112, 76, { weight: 800 });
    k.text(`SEASON ${pro.season} · AFTER ${Math.min(...rows.map((r) => r.P)) } OF ${MATCHDAYS}`, k.w - 70, 112, 36, { align: 'right', color: GLASS.dim });
    const cols = ['P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'PTS'];
    const cx = (i) => 690 + i * 68 + 40;
    cols.forEach((c, i) => k.text(c, cx(i), 160, 28, { align: 'right', color: GLASS.dim }));
    const rh = 46, y0 = 172;
    rows.forEach((r, i) => {
      const y = y0 + i * rh;
      if (r.you) {
        k.g.fillStyle = 'rgba(255,122,26,0.16)'; k.rr(70, y, k.w - 140, rh - 4, 14); k.g.fill();
        k.g.strokeStyle = UI.accent; k.g.lineWidth = 2.5; k.rr(71, y + 1, k.w - 142, rh - 6, 13); k.g.stroke();
      } else if (i % 2 === 0) { k.g.fillStyle = 'rgba(255,255,255,0.04)'; k.rr(70, y, k.w - 140, rh - 4, 14); k.g.fill(); }
      const base = y + rh / 2 - 2;
      k.text(String(r.pos), 108, base, 32, { align: 'center', base: 'middle', color: i < 2 ? UI.good : i >= rows.length - 2 ? UI.bad : GLASS.dim });
      disc(k, 160, base, 12, r.color);
      k.text(r.name.toUpperCase(), 190, base, 32, { base: 'middle', weight: r.you ? 800 : 700 });
      const v = [r.P, r.W, r.D, r.L, r.GF, r.GA, r.GD > 0 ? `+${r.GD}` : r.GD, r.Pts];
      v.forEach((x, j) => k.text(String(x), cx(j), base, 32, { align: 'right', base: 'middle', weight: j === 7 ? 800 : 600, color: j === 7 ? UI.text : 'rgba(242,240,232,0.85)' }));
    });
    k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => { app.proTableDiv = null; app.go('proHub'); } });
    [1, 2].forEach((d, i) => k.button('div' + d, k.w - 70 - 2 * 180 - 16 + i * 196, 690, 180, 80, `DIV ${d}`, { size: 36, active: div === d, onClick: () => { app.proTableDiv = d; app.redraw(); } }));
  };
}

// ---------- inbox

export function proInbox(app) {
  const pro = g(app);
  // messages that were unread when you opened it stay marked
  const fresh = new Set(pro ? pro.inbox.filter((m) => !m.read).map((m) => m.id) : []);
  if (pro) { markRead(pro); store.save(); }
  app.proInboxPage = 0;
  return (k) => {
    const p = g(app);
    if (!p) return missing(k, app);
    k.bg();
    const per = 4, pages = Math.max(1, Math.ceil(p.inbox.length / per));
    const page = Math.min(app.proInboxPage || 0, pages - 1);
    k.text('INBOX', 70, 120, 84, { weight: 800 });
    k.text(`${p.inbox.length} MESSAGES`, k.w - 70, 120, 40, { align: 'right', color: GLASS.dim });
    if (!p.inbox.length) k.text('NO MESSAGES', k.w / 2, 400, 52, { align: 'center', color: GLASS.dim });
    p.inbox.slice(page * per, page * per + per).forEach((m, i) => {
      const y = 156 + i * 130, h = 124;
      k.card(70, y, k.w - 140, h, 24, { hi: fresh.has(m.id) });
      if (fresh.has(m.id)) { k.g.fillStyle = UI.accent; k.g.beginPath(); k.g.arc(104, y + 31, 8, 0, Math.PI * 2); k.g.fill(); }
      k.text(m.from, 128, y + 40, 30, { color: fresh.has(m.id) ? UI.accent : GLASS.dim });
      k.text(`SEASON ${m.season} · MD ${m.md}`, k.w - 98, y + 40, 28, { align: 'right', color: GLASS.faint });
      wrap(k, m.text, 32, k.w - 140 - 60, 600).slice(0, 2).forEach((l, j) => k.text(l, 98, y + 82 + j * 34, 32, { weight: 600 }));
    });
    k.button('back', 70, 690, 200, 80, 'BACK', { size: 36, onClick: () => app.go('proHub') });
    k.button('prev', k.w - 290, 690, 100, 80, '‹', { size: 60, disabled: page === 0, onClick: () => { app.proInboxPage = page - 1; app.redraw(); } });
    k.button('next', k.w - 170, 690, 100, 80, '›', { size: 60, disabled: page >= pages - 1, onClick: () => { app.proInboxPage = page + 1; app.redraw(); } });
  };
}

// ---------- match report

function ballIcon(k, x, y, r) {
  const c = k.g;
  c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = UI.text; c.fill();
  c.beginPath();
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; c.lineTo(x + Math.cos(a) * r * 0.45, y + Math.sin(a) * r * 0.45); }
  c.closePath(); c.fillStyle = '#15171a'; c.fill();
}
function assistIcon(k, x, y, r) {
  const c = k.g;
  c.strokeStyle = UI.accent; c.fillStyle = UI.accent; c.lineWidth = 5; c.lineCap = 'round';
  c.beginPath(); c.moveTo(x - r, y); c.lineTo(x + r * 0.5, y); c.stroke();
  c.beginPath(); c.moveTo(x + r, y); c.lineTo(x + r * 0.2, y - r * 0.6); c.lineTo(x + r * 0.2, y + r * 0.6); c.closePath(); c.fill();
}
function tally(k, n, x, y, draw) {
  const shown = Math.min(n, 4);
  for (let i = 0; i < shown; i++) draw(k, x + i * 52, y, 20);
  if (n > shown) k.text(`+${n - shown}`, x + shown * 52, y + 10, 32);
  if (!n) k.text('0', x, y + 12, 36, { color: GLASS.faint });
}

export function proReport(app, report) {
  return (k) => {
    const r = report || app.proReportData;
    if (!r) return missing(k, app);
    k.bg();
    // score
    const h = r.home, a = r.away;
    k.text(h.name.toUpperCase(), 548, 100, fit(k, h.name.toUpperCase(), 44, 440), { align: 'right', weight: 800 });
    k.text(a.name.toUpperCase(), 732, 100, fit(k, a.name.toUpperCase(), 44, 440), { weight: 800 });
    k.g.fillStyle = h.color; k.g.fillRect(548 - 120, 114, 120, 8);
    k.g.fillStyle = a.color; k.g.fillRect(732, 114, 120, 8);
    k.text(`${h.goals}`, 600, 126, 110, { align: 'center', weight: 800 });
    k.text('–', 640, 116, 70, { align: 'center', color: GLASS.dim });
    k.text(`${a.goals}`, 680, 126, 110, { align: 'center', weight: 800 });
    k.text(`MATCHDAY ${r.matchday} · ${r.youHome ? 'HOME' : 'AWAY'} · ${r.result === 'W' ? 'WIN' : r.result === 'L' ? 'DEFEAT' : 'DRAW'}`, 640, 168, 34, { align: 'center', color: GLASS.dim });

    const y = 196, ch = 318;
    // rating
    k.card(70, y, 360, ch, 30);
    if (r.played) {
      k.text(r.rating.toFixed(1), 250, y + 206, 170, { align: 'center', weight: 800, color: ratingColor(r.rating, UI) });
      k.text('RATING', 250, y + 50, 32, { align: 'center', color: GLASS.dim });
      if (r.motm) {
        k.g.fillStyle = UI.accent; k.rr(100, y + 236, 300, 52, 26); k.g.fill();
        k.text('MAN OF THE MATCH', 250, y + 263, 30, { align: 'center', base: 'middle', color: '#111' });
      } else k.text(`${r.minutes} MIN · ${r.role === 'START' ? 'STARTED' : 'SUB'}`, 250, y + 270, 32, { align: 'center', color: GLASS.dim });
    } else {
      k.text('DNP', 250, y + 180, 130, { align: 'center', weight: 800, color: GLASS.dim });
      k.text('NOT IN THE SQUAD', 250, y + 250, 32, { align: 'center', color: GLASS.dim });
    }
    // goals and assists
    k.card(446, y, 360, ch, 30);
    k.text('GOALS', 478, y + 62, 32, { color: GLASS.dim });
    tally(k, r.goals, 500, y + 130, ballIcon);
    k.g.fillStyle = GLASS.hair; k.g.fillRect(478, y + 170, 296, 2);
    k.text('ASSISTS', 478, y + 226, 32, { color: GLASS.dim });
    tally(k, r.assists, 500, y + 280, assistIcon);
    // growth
    k.card(822, y, k.w - 70 - 822, ch, 30);
    const gx = 822 + 32, gw = k.w - 70 - 822 - 64;
    k.text('OVR', gx, y + 76, 36, { color: GLASS.dim });
    const up = r.ovrAfter > r.ovrBefore;
    k.text(`${r.ovrBefore} → ${r.ovrAfter}`, gx + gw, y + 80, 56, { align: 'right', weight: 800, color: up ? UI.good : UI.text });
    ATTRS.forEach((at, i) => {
      const v = r.attrChanges[at], yy = y + 134 + i * 36;
      k.text(at, gx, yy, 28, { color: GLASS.dim });
      k.text(v === 0 ? '0.0' : `${v > 0 ? '+' : ''}${v.toFixed(1)}`, gx + gw, yy, 30, { align: 'right', color: v > 0 ? UI.good : v < 0 ? UI.bad : GLASS.faint });
    });
    // manager
    k.card(70, 530, k.w - 140, 134, 26);
    wrap(k, r.managerLine, 34, k.w - 140 - 64, 600).slice(0, 3).forEach((l, i) => k.text(l, 102, 580 + i * 40, 34, { weight: 600 }));
    k.button('continue', k.w - 70 - 360, 690, 360, 80, 'CONTINUE', { primary: true, size: 44, onClick: () => app.go('proHub') });
  };
}

// ---------- season end

export function proSeasonEnd(app, summary) {
  const pro = g(app);
  // opening this screen at the end of a season closes it out (once; endSeason is a no-op afterwards)
  if (pro && !summary) { summary = pro.summary || (seasonOver(pro) ? endSeason(pro) : null); if (summary) store.save(); }
  return (k) => {
    const p = g(app);
    if (!p || !summary) return missing(k, app);
    const s = summary;
    k.bg();
    k.text(`SEASON ${s.season}`, 70, 112, 76, { weight: 800 });
    k.text(`${CLUBS[p.history[p.history.length - 1]?.clubId || p.clubId].name.toUpperCase()} · DIVISION ${s.div}`, k.w - 70, 112, 36, { align: 'right', color: GLASS.dim });
    // finish
    k.card(70, 140, 360, 250, 30);
    k.text(ordinal(s.pos), 100, 270, 130, { weight: 800, color: s.pos <= 2 ? UI.good : UI.text });
    k.text(s.moved || 'FINAL POSITION', 100, 322, 34, { color: s.moved === 'PROMOTED' ? UI.good : s.moved ? UI.bad : GLASS.dim });
    k.text(`${s.stats.apps} APPS · ${s.stats.goals} G · ${s.stats.assists} A · AVG ${s.stats.avg ? s.stats.avg.toFixed(1) : '–'}`, 100, 366, 28, { color: GLASS.dim });
    // awards
    k.card(446, 140, k.w - 70 - 446, 250, 30);
    s.awards.forEach((aw, i) => {
      const y = 192 + i * 46;
      k.g.fillStyle = aw.you ? UI.accent : 'rgba(242,240,232,0.25)'; k.g.beginPath(); k.g.arc(484, y - 10, 9, 0, Math.PI * 2); k.g.fill();
      k.text(aw.text, 512, y, fit(k, aw.text, 34, k.w - 70 - 512 - 28), { color: aw.you ? UI.accent : UI.text });
    });
    k.text(`UP ${s.promoted.join(', ').toUpperCase()}`, 472, 372, fit(k, `UP ${s.promoted.join(', ').toUpperCase()}`, 26, k.w - 70 - 472 - 28), { color: GLASS.dim });
    // offers
    const n = p.offers.length, gap = 20, cw = (k.w - 140 - gap * (n - 1)) / Math.max(1, n), y0 = 410, ch = 358;
    p.offers.forEach((o, i) => {
      const x = 70 + i * (cw + gap);
      k.card(x, y0, cw, ch, 28);
      disc(k, x + 52, y0 + 56, 26, o.color);
      k.text(o.type === 'RENEWAL' ? 'NEW CONTRACT' : 'TRANSFER OFFER', x + 92, y0 + 66, 30, { color: o.type === 'RENEWAL' ? GLASS.dim : UI.accent });
      k.text(o.name.toUpperCase(), x + 28, y0 + 128, fit(k, o.name.toUpperCase(), 44, cw - 56, 800), { weight: 800 });
      k.text(`DIVISION ${o.div}`, x + 28, y0 + 166, 30, { color: GLASS.dim });
      const row = (j, l, v, col = UI.text) => { k.text(l, x + 28, y0 + 206 + j * 34, 28, { color: GLASS.dim }); k.text(v, x + cw - 28, y0 + 206 + j * 34, 32, { align: 'right', color: col }); };
      row(0, 'WAGE', `${num(o.wage)} / WEEK`);
      row(1, 'CONTRACT', `${o.years} YEARS`);
      row(2, 'STATUS', o.promise, statusColor(o.promise));
      k.button('sign' + i, x + 20, y0 + ch - 72, cw - 40, 56, 'SIGN', { primary: i === 0, size: 38, onClick: () => app.proSign(i) });
    });
  };
}

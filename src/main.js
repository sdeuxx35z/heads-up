import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { buildStadium } from './stadium.js';
import { World } from './world.js';
import { Rep } from './rep.js';
import { Panel, Pointer } from './ui.js';
import { Audio } from './audio.js';
import { store } from './store.js';
import { CAREER } from './config.js';
import * as S from './screens.js';
import { makeQuiz, quizScreen } from './quiz.js';

const DESK_EYE = 1.7;

class App {
  constructor() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType('local-floor');
    renderer.xr.setFoveation(1);
    document.body.appendChild(renderer.domElement);
    this.renderer = renderer;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.05, 600);
    this.camera.rotation.order = 'YXZ';
    this.camera.position.y = DESK_EYE;
    this.rig = new THREE.Group();
    this.rig.add(this.camera);
    this.scene.add(this.rig);
    buildStadium(this.scene);
    this.world = new World(this.scene, this.rig, this.camera);
    this.audio = new Audio();
    this.pointer = new Pointer();

    this.panel = new Panel(this.scene, 1280, 800, 2.0);
    this.bar = new Panel(this.scene, 1280, 430, 1.5);
    this.pointer.panels.push(this.panel, this.bar);

    // black-out sphere for fades and quizzes
    this.fade = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide, transparent: true, opacity: 0, depthTest: false, depthWrite: false }));
    this.fade.renderOrder = 9;
    this.camera.add(this.fade);
    this.fadeTo = 0;

    this.screen = 'home';
    this.careerStage = 0;
    this.practiceOpts = { role: 'CM', difficulty: 'MEDIUM', quiz: 'QUIZ SOME', reps: 10 };
    this.session = null;
    this.mode = 'boot';
    this.inXR = false;
    this.xrSupported = false;
    this.look = { yaw: 0, pitch: 0 };

    this.setupDesktopInput();
    this.setupXR();
    this.applySettings();
    this.toMenuView();
    this.go('home');

    this.clock = new THREE.Clock();
    renderer.setAnimationLoop(() => this.frame());
    this.step = (sec, fps = 30) => { for (let i = 0; i < sec * fps; i++) this.frame(1 / fps); };
    addEventListener('resize', () => {
      this.camera.aspect = innerWidth / innerHeight;
      this.camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  }

  // ---------- input

  setupDesktopInput() {
    const el = this.renderer.domElement;
    this.mouse = new THREE.Vector2(0, 0);
    this.mouseActive = false;
    let down = null;
    el.addEventListener('pointerdown', (e) => {
      this.mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
      this.mouseActive = true;
      down = { x: e.clientX, y: e.clientY, moved: 0 };
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', (e) => {
      this.mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
      this.mouseActive = true;
      if (down && !this.inXR) {
        const dx = e.movementX, dy = e.movementY;
        down.moved += Math.abs(dx) + Math.abs(dy);
        if (down.moved > 6) {
          this.look.yaw -= dx * 0.004;
          this.look.pitch = THREE.MathUtils.clamp(this.look.pitch - dy * 0.004, -1.35, 1.2);
        }
      }
    });
    el.addEventListener('pointerup', () => {
      if (down && down.moved <= 6) this.select(this.mouseRay());
      down = null;
    });
    addEventListener('keydown', (e) => {
      this.audio.unlock();
      if (e.key === 'Escape') this.mode === 'paused' ? this.resume() : this.pauseGame();
      const turn = { ArrowLeft: 1, a: 1, ArrowRight: -1, d: -1 }[e.key];
      if (turn) this.keyTurn = turn;
    });
    addEventListener('keyup', (e) => {
      if (['ArrowLeft', 'a', 'ArrowRight', 'd'].includes(e.key)) this.keyTurn = 0;
    });
  }

  mouseRay() {
    const r = new THREE.Raycaster();
    r.setFromCamera(this.mouse, this.camera);
    return { origin: r.ray.origin.clone(), dir: r.ray.direction.clone(), src: 'mouse' };
  }

  setupXR() {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then((ok) => {
        this.xrSupported = ok;
        document.body.classList.toggle('desk', !ok);
        this.redraw();
      }).catch(() => {});
    } else document.body.classList.add('desk');

    const factory = new XRControllerModelFactory();
    this.controllers = [0, 1].map((i) => {
      const c = this.renderer.xr.getController(i);
      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);
      const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }));
      line.scale.z = 5;
      c.add(line);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.012, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false }));
      dot.renderOrder = 11;
      dot.visible = false;
      this.scene.add(dot);
      c.userData = { line, dot, index: i, connected: false };
      c.addEventListener('connected', (e) => { c.userData.connected = true; c.userData.source = e.data; });
      c.addEventListener('disconnected', () => { c.userData.connected = false; });
      c.addEventListener('selectstart', () => { this.activeCtrl = i; this.audio.unlock(); c.userData.heldSince = performance.now(); this.select(this.ctrlRay(c)); });
      c.addEventListener('selectend', () => { c.userData.heldSince = null; });
      c.addEventListener('squeezestart', () => this.pauseGame());
      this.rig.add(c);
      const grip = this.renderer.xr.getControllerGrip(i);
      grip.add(factory.createControllerModel(grip));
      this.rig.add(grip);
      return c;
    });
    this.activeCtrl = null;

    this.renderer.xr.addEventListener('sessionstart', () => {
      this.inXR = true;
      document.body.classList.add('xr');
      this.camera.position.set(0, 0, 0);
      this.camera.rotation.set(0, 0, 0);
      this.applySettings();
      // re-anchor once the headset pose is known
      setTimeout(() => { this.applySettings(); this.reanchor(); }, 400);
      this.renderer.xr.getReferenceSpace()?.addEventListener('reset', () => this.reanchor());
      this.redraw();
    });
    this.renderer.xr.addEventListener('sessionend', () => {
      this.inXR = false;
      document.body.classList.remove('xr');
      this.camera.position.set(0, DESK_EYE, 0);
      this.rig.position.y = 0;
      this.look.pitch = 0;
      this.reanchor();
      this.redraw();
    });
  }

  async enterVR() {
    if (!navigator.xr || this.inXR) return;
    this.audio.unlock();
    try {
      const session = await navigator.xr.requestSession('immersive-vr', { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking'] });
      await this.renderer.xr.setSession(session);
    } catch (err) {
      console.warn('VR failed', err);
    }
  }

  ctrlRay(c) {
    const m = c.matrixWorld;
    const origin = new THREE.Vector3().setFromMatrixPosition(m);
    const dir = new THREE.Vector3(0, 0, -1).transformDirection(m);
    return { origin, dir, src: c };
  }

  rays() {
    if (!this.inXR) return this.mouseActive ? [this.mouseRay()] : [];
    return this.controllers.filter((c) => c.userData.connected).map((c) => this.ctrlRay(c));
  }

  activeRay() {
    if (!this.inXR) return this.mouseActive ? this.mouseRay() : null;
    const c = this.controllers[this.activeCtrl];
    if (c?.userData.connected) return this.ctrlRay(c);
    const any = this.controllers.find((x) => x.userData.connected && x.userData.source?.handedness === 'right')
      || this.controllers.find((x) => x.userData.connected);
    return any ? this.ctrlRay(any) : null;
  }

  select(ray) {
    this.audio.unlock();
    if (!ray) return;
    const hit = this.pointer.hitPanels(ray.origin, ray.dir);
    if (hit && hit.b) { this.audio.ui(); hit.b.onClick(hit.x, hit.y); return; }
    if (hit) return;
    if (this.mode === 'play' && this.rep) {
      this.rep.aim(ray.origin, ray.dir);
      this.rep.select();
    }
  }

  pollButtons() {
    if (!this.inXR) return;
    // holding the trigger (or a pinch) on empty space for a second pauses, so hand tracking can pause too
    for (const c of this.controllers) {
      const h = c.userData.heldSince;
      if (h && performance.now() - h > 1000 && ['play', 'quiz'].includes(this.mode) && !this.pointer.hitPanels(...Object.values(this.ctrlRay(c)).slice(0, 2))) {
        c.userData.heldSince = null;
        this.pauseGame();
      }
    }
    const session = this.renderer.xr.getSession();
    if (!session) return;
    for (const src of session.inputSources) {
      const b = src.gamepad?.buttons;
      if (!b) continue;
      const pressed = (b[4]?.pressed || b[5]?.pressed);
      const key = src.handedness;
      this.btnPrev = this.btnPrev || {};
      if (pressed && !this.btnPrev[key]) {
        if (this.mode === 'play' || this.mode === 'quiz') this.pauseGame();
        else if (this.mode === 'paused') this.resume();
      }
      this.btnPrev[key] = pressed;
    }
  }

  // ---------- settings / view

  applySettings() {
    const s = store.settings;
    this.audio.setVolume(s.volume);
    this.audio.ticks = s.ticks;
    this.rig.position.y = this.eyeOffset();
  }

  // seated players get lifted to a standing eye height, measured from where their head actually is
  eyeOffset() {
    if (!this.inXR || !store.settings.seated) return 0;
    return Math.max(0, 1.65 - (this.camera.position.y || 1.2));
  }

  headPos() {
    const v = new THREE.Vector3();
    this.camera.getWorldPosition(v);
    return v;
  }

  toMenuView() {
    this.world.placeUser(new THREE.Vector3(0, 0, -37.5), 0);
  }

  reanchor() {
    if (this.mode === 'menu' || this.mode === 'summary') { this.toMenuView(); this.placePanel(); return; }
    const rep = this.rep;
    if (rep && rep.userBody && this.mode !== 'replay') {
      this.world.placeUser(rep.userBody.pos, Math.atan2(this.world.ball.pos.x - rep.userBody.pos.x, this.world.ball.pos.z - rep.userBody.pos.z));
      if (this.panel.mesh.visible) this.placePanel();
    }
  }

  placePanel(dy = -0.1, dist = 2.3) {
    const yaw = this.world.headYaw();
    this.panel.placeFacing(this.headPos(), yaw, dist, dy);
  }

  // ---------- screens

  go(name) {
    const fromMenu = this.mode === 'menu';
    this.screen = name;
    this.mode = 'menu';
    this.rep = null;
    this.quiz = null;
    this.session = null;
    this.endReplay();
    this.bar.hide();
    this.panel.show(S[name](this));
    if (!fromMenu) {
      this.world.clearOverlays();
      this.world.idle();
      this.toMenuView();
      this.setFade(1, true);
      this.setFade(0);
      this.placePanel();
    }
  }

  redraw() { if (this.panel.mesh.visible) this.panel.redraw(); }

  // ---------- sessions

  startCareer(level) {
    const l = CAREER[level];
    this.beginSession({ level, role: l.role, difficulty: l.difficulty, reps: l.reps, quizChance: l.quizChance });
  }

  startPractice() {
    const p = this.practiceOpts;
    const quizChance = { 'QUIZ OFF': 0, 'QUIZ SOME': 0.3, 'QUIZ EVERY REP': 1 }[p.quiz];
    this.beginSession({ level: null, role: p.role, difficulty: p.difficulty, reps: p.reps, quizChance });
  }

  again() { this.beginSession({ ...this.lastSessionOpts }); }

  beginSession(opts) {
    this.lastSessionOpts = opts;
    this.session = { ...opts, index: 0, results: [] };
    this.panel.hide();
    this.startRep();
  }

  startRep() {
    const s = this.session;
    // guarantee at least one quiz in a memory-heavy session
    const quiz = s.quizChance >= 1 || Math.random() < s.quizChance || (s.quizChance > 0.5 && s.index === s.reps - 1 && !s.results.some((r) => r.memory != null));
    this.rep = new Rep(this.world, {
      role: s.role, difficulty: s.difficulty, quiz, motion: store.settings.motion,
      fx: {
        kick: (p) => this.audio.kick(p), touch: () => this.audio.touch(), tick: () => this.audio.tick(),
        whistle: () => this.audio.whistle(), cheer: (k) => this.audio.cheer(k), groan: () => this.audio.groan(), ui: () => this.audio.ui(),
      },
    });
    this.mode = 'play';
    this.panel.hide();
    this.quiz = null;
    this.setFade(1, true);
    this.rep.start();
    this.look.pitch = 0;
    this.setFade(0);
    this.holdT = 0.6; // breathing room before the first pass
  }

  setFade(v, instant = false) {
    this.fadeTo = v;
    if (instant) this.fade.material.opacity = v;
  }

  pauseGame() {
    if (this.mode !== 'play' && this.mode !== 'quiz') return;
    this.pausedFrom = this.mode;
    this.mode = 'paused';
    this.panel.show(S.pause(this));
    this.placePanel();
  }

  resume() {
    if (this.mode !== 'paused') return;
    this.mode = this.pausedFrom || 'play';
    if (this.mode === 'quiz' && this.quiz) {
      this.panel.show(quizScreen(this, this.quiz));
      this.placePanel(-0.05, 2.1);
    } else this.panel.hide();
  }

  quitSession() { this.go('home'); }

  answerQuiz(score) {
    const q = this.quiz;
    if (!q || q.answered) return;
    q.answered = true;
    q.score = score;
    this.audio.ui();
    this.panel.redraw();
    setTimeout(() => {
      if (this.quiz !== q) return;
      this.panel.hide();
      this.quiz = null;
      this.setFade(0);
      this.rep.endQuiz(score);
      this.mode = 'play';
    }, 1700);
  }

  showCard() {
    const s = this.session, r = this.rep.result;
    s.results.push(r);
    this.mode = 'card';
    this.cardCountdown = s.index + 1 < s.reps ? 6 : null;
    this.cardTimer = 0;
    this.drawCard();
    this.placePanel(-0.15, 2.2);
  }

  drawCard() {
    const s = this.session;
    this.panel.show(S.repCard(this, this.rep.result, s.index, s.reps, this.cardCountdown == null ? null : Math.ceil(this.cardCountdown)));
  }

  nextRep() {
    const s = this.session;
    this.endReplay();
    s.index++;
    if (s.index >= s.reps) return this.finishSession();
    this.startRep();
  }

  finishSession() {
    const s = this.session, rs = s.results;
    const avg = (f) => { const v = rs.map(f).filter((x) => x != null); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null; };
    const rec = {
      date: Date.now(), level: s.level, role: s.role, difficulty: s.difficulty, reps: rs.length,
      score: avg((r) => r.total), scan: avg((r) => r.scanScore), decision: avg((r) => r.decision), memory: avg((r) => r.memory),
      scanRate: rs.reduce((a, r) => a + r.scanRate, 0) / rs.length,
      completed: rs.filter((r) => ['completed', 'tight', 'goal'].includes(r.outcome)).length,
    };
    store.recordSession(rec);
    const starsEarned = store.starsFor(rec.score);
    const next = s.level != null && s.level < CAREER.length - 1 && store.unlocked(s.level + 1) ? s.level + 1 : null;
    this.audio.whistle(true);
    this.mode = 'summary';
    this.rep = null;
    this.world.clearOverlays();
    this.world.idle();
    this.toMenuView();
    this.panel.show(S.summary(this, rec, starsEarned, next));
    this.placePanel();
  }

  // ---------- replay

  openReplay() {
    const rep = this.rep;
    if (!rep?.frames.length) return;
    this.mode = 'replay';
    this.cardCountdown = null;
    this.replay = { t: rep.frames[0].t, playing: true, view: 'above', speed: 0.6 };
    rep.userBody.setVisible(true);
    this.showReplayPanel();
    this.setReplayView('above');
  }

  showReplayPanel() {
    const rp = this.replay, rep = this.rep;
    const t0 = rep.frames[0].t, t1 = rep.frames.at(-1).t;
    this.panel.hide();
    this.bar.show((k) => {
      k.bg();
      const x = 60, w = k.w - 120, y = 120;
      k.text('REPLAY', x, 92, 60, { weight: 800 });
      k.text(`${(rp.t - t0).toFixed(1)} S`, k.w - 60, 92, 44, { align: 'right', color: 'rgba(242,240,232,0.55)' });
      k.g.fillStyle = 'rgba(242,240,232,0.12)'; k.rr(x, y + 30, w, 16, 8); k.g.fill();
      const px = (t) => x + ((t - t0) / (t1 - t0 || 1)) * w;
      k.g.fillStyle = '#f2f0e8'; k.rr(x, y + 30, px(rp.t) - x, 16, 8); k.g.fill();
      for (const sc of rep.scans) {
        k.g.fillStyle = sc.shoulder ? '#4fd88a' : '#ffe08a';
        k.g.fillRect(px(sc.t) - 3, y + 6, 6, 64);
      }
      for (const e of rep.events) {
        if (!['final', 'receive', 'decide', 'lost'].includes(e.type)) continue;
        k.g.fillStyle = e.type === 'lost' ? '#ff5a4f' : '#ff7a1a';
        k.g.beginPath(); k.g.arc(px(e.t), y + 38, 14, 0, Math.PI * 2); k.g.fill();
      }
      k.hit('scrub', x, y, w, 80, (hx) => { rp.t = t0 + ((hx - x) / w) * (t1 - t0); rp.playing = false; this.bar.redraw(); });
      const legend = [['SCAN', '#ffe08a'], ['SHOULDER CHECK', '#4fd88a'], ['BEST PASS', '#4fd88a'], ['YOUR PASS', '#f2f0e8']];
      let lx = x;
      legend.forEach(([l, c], i) => {
        k.g.fillStyle = c;
        if (i < 2) k.g.fillRect(lx, 238, 6, 30); else k.g.fillRect(lx, 250, 30, 6);
        lx += i < 2 ? 18 : 42;
        lx += k.text(l, lx, 264, 30, { color: 'rgba(242,240,232,0.7)', weight: 600 }) + 34;
      });
      const bw = (w - 60) / 4;
      k.button('pp', x, 310, bw, 100, rp.playing ? 'PAUSE' : 'PLAY', { size: 40, onClick: () => { rp.playing = !rp.playing; if (rp.t >= t1) rp.t = t0; this.bar.redraw(); } });
      k.button('va', x + (bw + 20), 310, bw, 100, 'ABOVE', { size: 40, active: rp.view === 'above', onClick: () => this.setReplayView('above') });
      k.button('vp', x + (bw + 20) * 2, 310, bw, 100, 'ON PITCH', { size: 40, active: rp.view === 'pitch', onClick: () => this.setReplayView('pitch') });
      k.button('done', x + (bw + 20) * 3, 310, bw, 100, 'DONE', { primary: true, size: 40, onClick: () => this.closeReplay() });
    });
  }

  setReplayView(view) {
    const rp = this.replay, rep = this.rep;
    this.setFade(1, true);
    this.setFade(0);
    rp.view = view;
    const f = rep.frames.find((fr) => rep.events.find((e) => e.type === 'receive') ? fr.t >= rep.events.find((e) => e.type === 'receive').t : true) || rep.frames.at(-1);
    const ux = f.f[0], uz = f.f[1];
    const ballYaw = Math.atan2(f.f[3] - ux, f.f[5] - uz);
    if (view === 'above') {
      // hover behind and above, looking down at the viewer's spot
      const back = new THREE.Vector3(ux - Math.sin(ballYaw) * 9, 0, uz - Math.cos(ballYaw) * 9);
      this.world.placeUser(back, ballYaw);
      this.rig.position.y = this.inXR ? 11 : 11 - DESK_EYE + 1.7;
      if (!this.inXR) this.look.pitch = -0.75;
    } else {
      this.rig.position.y = this.eyeOffset();
      this.world.placeUser(new THREE.Vector3(ux, 0, uz), ballYaw);
      if (!this.inXR) this.look.pitch = 0;
    }
    this.rig.updateMatrixWorld(true);
    if (!this.inXR) this.camera.rotation.set(this.look.pitch, this.look.yaw, 0);
    this.camera.updateMatrixWorld(true);
    this.bar.redraw();
    this.placeAlongGaze(this.bar, 2.0, 0.42);
  }

  // in the lower part of the current view, turned to face the eyes
  placeAlongGaze(panel, dist, drop) {
    const head = this.headPos();
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    const right = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize();
    dir.applyAxisAngle(right, -drop);
    panel.mesh.position.copy(head).addScaledVector(dir, dist);
    panel.mesh.lookAt(head);
  }

  replayStep(dt) {
    const rp = this.replay, rep = this.rep, fr = rep.frames;
    const t0 = fr[0].t, t1 = fr.at(-1).t;
    if (rp.playing) {
      rp.t += dt * rp.speed;
      if (rp.t >= t1) { rp.t = t1; rp.playing = false; this.bar.redraw(); }
    }
    let i = fr.findIndex((x) => x.t >= rp.t);
    if (i < 0) i = fr.length - 1;
    const a = fr[Math.max(0, i - 1)], b = fr[i];
    const k = b.t > a.t ? (rp.t - a.t) / (b.t - a.t) : 0;
    const L = (j) => a.f[j] + (b.f[j] - a.f[j]) * k;
    const LA = (j) => { let d = b.f[j] - a.f[j]; d = Math.atan2(Math.sin(d), Math.cos(d)); return a.f[j] + d * k; };
    this.world.ball.set(L(3), L(5), L(4));
    const players = [...rep.home, ...rep.away];
    players.forEach((p, n) => {
      const j = 6 + n * 3;
      const nx = L(j), nz = L(j + 1);
      const sp = Math.hypot(nx - p.pos.x, nz - p.pos.z) / Math.max(dt, 1e-3);
      p.pos.set(nx, 0, nz);
      p.heading = LA(j + 2);
      p.animate(dt * rp.speed, rp.playing ? Math.min(8, sp) : 0);
      p.sync();
    });
    const w = this.world;
    w.cone.visible = true;
    w.cone.position.set(L(0), 0.03, L(1));
    w.cone.rotation.y = LA(2);
    // lines from the moment of the decision
    const dec = rep.events.find((e) => e.type === 'decide' || e.type === 'lost');
    if (dec && rp.t >= dec.t - 0.05) {
      const best = rep.result.best, ch = rep.result.chosen;
      const from = { x: L(0), z: L(1) };
      const end = (o) => (o.kind === 'shot' ? { x: 52.5, z: 0 } : o.target.pos);
      w.setLine(w.bestLine, best ? from : null, best ? end(best) : null);
      w.setLine(w.choiceLine, ch ? from : null, ch ? end(ch) : null);
    } else {
      w.setLine(w.bestLine, null, null);
      w.setLine(w.choiceLine, null, null);
    }
    this.replayRedrawT = (this.replayRedrawT || 0) - dt;
    if (rp.playing && this.replayRedrawT <= 0) { this.replayRedrawT = 0.1; this.bar.redraw(); }
  }

  closeReplay() {
    this.endReplay();
    this.mode = 'card';
    this.drawCard();
    this.placePanel(-0.15, 2.2);
  }

  endReplay() {
    if (!this.replay) return;
    this.replay = null;
    this.bar.hide();
    this.world.clearOverlays();
    this.rig.position.y = this.eyeOffset();
    if (!this.inXR) this.look.pitch = 0;
    const rep = this.rep;
    if (rep) {
      rep.userBody.setVisible(false);
      const f = rep.frames.at(-1).f;
      this.world.placeUser(new THREE.Vector3(f[0], 0, f[1]), this.world.headYaw());
      this.setFade(1, true);
      this.setFade(0);
    }
  }

  // ---------- frame

  // dtOverride lets tests step the game without a visible window
  frame(dtOverride) {
    const dt = dtOverride ?? Math.min(0.05, this.clock.getDelta());
    if (!this.inXR) {
      if (this.keyTurn) this.look.yaw += this.keyTurn * dt * 2.4;
      this.camera.rotation.set(this.look.pitch, this.look.yaw, 0);
    }
    this.pollButtons();

    const fm = this.fade.material;
    fm.opacity += (this.fadeTo - fm.opacity) * Math.min(1, dt * 8);
    this.fade.visible = fm.opacity > 0.01;

    if (this.mode === 'menu' || this.mode === 'summary') this.world.idleStep(dt);
    if (this.mode === 'play' && this.rep) {
      if (this.holdT > 0) this.holdT -= dt;
      else this.rep.update(dt);
      const ray = this.activeRay();
      if (ray) this.rep.aim(ray.origin, ray.dir);
      if (this.rep.state === 'quiz' && !this.quiz) {
        this.quiz = makeQuiz(this.rep.snapshot);
        this.mode = 'quiz';
        this.setFade(1);
        this.panel.show(quizScreen(this, this.quiz));
        this.placePanel(-0.05, 2.1);
      }
      if (this.rep.state === 'done') this.showCard();
    }
    if (this.mode === 'card' && this.cardCountdown != null) {
      const before = Math.ceil(this.cardCountdown);
      this.cardCountdown -= dt;
      if (this.cardCountdown <= 0) this.nextRep();
      else if (Math.ceil(this.cardCountdown) !== before) this.drawCard();
    }
    if (this.mode === 'replay') this.replayStep(dt);

    this.updatePointers();
    this.renderer.render(this.scene, this.camera);
  }

  updatePointers() {
    const rays = this.rays();
    let hoverId = null, hoverPanel = null, cursor = null;
    for (const c of this.controllers) c.userData.dot.visible = false;
    for (const r of rays) {
      const hit = this.pointer.hitPanels(r.origin, r.dir);
      if (r.src !== 'mouse') {
        const ud = r.src.userData;
        ud.line.scale.z = hit ? hit.distance : this.mode === 'play' ? 30 : 5;
        ud.line.material.opacity = hit || this.mode !== 'play' ? 0.6 : 0.3;
        if (hit) { ud.dot.visible = true; ud.dot.position.copy(hit.point); }
      }
      if (hit) {
        if (hit.b && !hoverId) { hoverId = hit.b.id; hoverPanel = hit.panel; }
        if (hit.b?.id === 'map') cursor = { x: hit.x, y: hit.y };
      }
    }
    if (!this.inXR) this.renderer.domElement.style.cursor = hoverId ? 'pointer' : 'grab';
    if (cursor) {
      const now = performance.now();
      const moved = !this.quizCursor || Math.hypot(cursor.x - this.quizCursor.x, cursor.y - this.quizCursor.y) > 2;
      if (moved && now - (this.cursorDrawn || 0) > 60) { this.quizCursor = cursor; this.cursorDrawn = now; this.panel.redraw(); }
    }
    for (const p of this.pointer.panels) p.setHover(p === hoverPanel ? hoverId : null);
  }
}

// fonts are drawn into canvases, so wait for them before the first paint
const fontsReady = Promise.race([
  Promise.all(['800 40px "Barlow Condensed"', '700 40px "Barlow Condensed"', '600 40px "Barlow Condensed"'].map((f) => document.fonts.load(f))),
  new Promise((r) => setTimeout(r, 2500)),
]);
fontsReady.then(() => { window.app = new App(); document.getElementById('boot')?.remove(); });


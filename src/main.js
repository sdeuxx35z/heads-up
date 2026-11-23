import * as THREE from 'three';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { buildStadium } from './stadium.js';
import { LockerRoom } from './locker.js';
import { World } from './world.js';
import { DRILLS } from './drills.js';
import { Panel, Pointer } from './ui.js';
import { Audio } from './audio.js';
import { store } from './store.js';
import { CAREER, DRILL_GOALS, LESSON_GOALS } from './config.js';
import * as S from './screens.js';
import * as PS from './proScreens.js';
import { newPro, matchdaySession, playMatch, trainingSession, applyTraining, acceptOffer, nextFixture, clubOf } from './pro.js';
import { makeQuiz, quizScreen } from './quiz.js';
import { sessionMetrics, checkObjective, nextLesson, dailyDrill, weakSpot, currentLevel, rating, streak, unlockedDrills } from './career.js';

const DESK_EYE = 1.7;
const _v1 = new THREE.Vector3();
const XR_OPTS = { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking'] };
const APP_MODE = new URLSearchParams(location.search).has('app') || matchMedia('(display-mode: standalone)').matches;

// the rep that scored lowest on the lesson's own metric, for the summary's diagnosis
function worstRep(rs, key) {
  const val = (r) => ({
    rate: r.scanRate10 != null && r.par ? r.scanRate10 / r.par : null, timing: r.timing,
    critical: r.critical == null ? null : { prime: 1, critical: 0.8, none: 0.2, late: 0 }[r.critical],
    info: r.info, decision: r.decision, memory: r.memory, scenario: r.scenarioScore, score: r.total,
    complete: ['completed', 'tight', 'goal'].includes(r.outcome) ? 1 : 0,
  })[key];
  let w = null;
  rs.forEach((r, i) => { const v = val(r); if (v != null && (!w || v < w.v)) w = { i, v, r }; });
  if (!w) return null;
  const r = w.r;
  const why = r.critical === 'late' ? 'EYES OFF THE BALL AS IT ARRIVED'
    : r.sawPresser === false ? `PRESSER ${r.presserSide === 'BLIND' ? 'BEHIND YOU ' : ''}UNSEEN`
    : r.sawBest === false ? `#${r.bestNumber} WAS FREE, NOT CHECKED`
    : r.badScans ? `${r.badScans} SCAN${r.badScans > 1 ? 'S' : ''} DURING A TOUCH`
    : r.fact || r.reason || '';
  return { rep: w.i + 1, why };
}

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
    this.stadium = buildStadium(this.scene);
    this.world = new World(this.scene, this.rig, this.camera);
    this.audio = new Audio();
    this.pointer = new Pointer();

    this.panel = new Panel(this.scene, 1280, 800, 2.0);
    this.bar = new Panel(this.scene, 1280, 430, 1.5);
    this.hint = new Panel(this.scene, 1100, 170, 1.4);
    this.pointer.panels.push(this.hint);

    // the locker room hub: live screens mounted on its boards, the room's objects are the buttons
    this.locker = new LockerRoom(this.scene);
    this.inLocker = false;
    const mount = (m, w, h, aspect) => {
      const mw = Math.min(m.userData.maxWidth || m.userData.width, (m.userData.maxHeight || m.userData.height) * aspect);
      const p = new Panel(this.scene, w, h, mw * 0.86);
      // on a wall: depth-tested, drawn under the floating panel, mipmapped (it redraws rarely)
      p.mesh.material.depthTest = true;
      p.tex.generateMipmaps = true;
      p.tex.minFilter = THREE.LinearMipmapLinearFilter;
      p.boardAction = m.userData.action || null;
      p.mesh.renderOrder = 2;
      m.add(p.mesh);
      p.mesh.position.set(0, 0, 0.01);
      this.pointer.panels.push(p);
      return p;
    };
    // a waist-high CONTINUE in front of your locker, so the first thing you can do is play
    this.hub = new Panel(this.scene, 1100, 320, 1.15);
    this.pointer.panels.push(this.hub);
    this.boards = {
      career: mount(this.locker.mounts.career, 1280, 800, 1.6),
      notice: mount(this.locker.mounts.notice, 1024, 768, 4 / 3),
      stats: mount(this.locker.mounts.stats, 1280, 720, 16 / 9),
    };
    this.pointer.panels.push(this.panel, this.bar);

    // black-out sphere for fades and quizzes
    this.fade = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide, transparent: true, opacity: 0, depthTest: false, depthWrite: false }));
    this.fade.renderOrder = 9;
    this.camera.add(this.fade);
    this.fadeTo = 0;

    this.screen = 'home';
    this.careerStage = 0;
    this.practiceOpts = { drill: 'match', role: 'CM', difficulty: 'MEDIUM', quiz: 'QUIZ SOME', reps: 10 };
    this.session = null;
    this.mode = 'boot';
    this.inXR = false;
    this.xrSupported = false;
    this.look = { yaw: 0, pitch: 0 };
    this.keys = new Set();
    this.moveSpeed = 0;
    this.stepClock = 0;
    this.buildVignette();
    this.buildAttackMarkers();
    this.countdown = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.42, 40), new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide }));
    this.countdown.visible = false;
    this.scene.add(this.countdown);

    this.setupDesktopInput();
    this.setupXR();
    this.applySettings();
    try { this.renderer.compile(this.scene, this.camera); } catch {}
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
        if (down.moved > 14) {
          this.look.yaw -= dx * 0.004;
          this.look.pitch = THREE.MathUtils.clamp(this.look.pitch - dy * 0.004, -1.35, 1.2);
        }
      }
    });
    el.addEventListener('pointerup', () => {
      // on a headset browser any tap goes into VR; the Quest laser jitters too much to tell taps from drags
      if (this.xrSupported && !this.inXR) { down = null; this.enterVR(); return; }
      if (down && down.moved <= 14) this.select(this.mouseRay());
      down = null;
    });
    addEventListener('keydown', (e) => {
      this.audio.unlock();
      if (e.key === 'Escape') this.mode === 'paused' ? this.resume() : this.pauseGame();
      const turn = { ArrowLeft: 1, ArrowRight: -1 }[e.key];
      if (turn) this.keyTurn = turn;
      this.keys.add(e.key.toLowerCase());
    });
    addEventListener('keyup', (e) => {
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) this.keyTurn = 0;
      this.keys.delete(e.key.toLowerCase());
    });
    addEventListener('blur', () => this.keys.clear());
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
        document.body.classList.toggle('vr-ready', ok);
        this.redraw();
        if (!ok) return;
        // launched from the app icon: go straight in
        if (APP_MODE) this.enterVR();
        // Quest Browser can show its own Enter VR prompt
        if (navigator.xr.offerSession) {
          navigator.xr.offerSession('immersive-vr', XR_OPTS).then((s) => this.useSession(s)).catch(() => {});
        }
      }).catch(() => {});
      // following a link from inside VR keeps you in VR
      navigator.xr.addEventListener?.('sessiongranted', () => this.enterVR());
      document.getElementById('enter')?.addEventListener('click', () => this.enterVR());
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
      setTimeout(() => {
        this.applySettings();
        this.reanchor();
      }, 400);
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
    if (!navigator.xr || this.inXR || this.entering) return;
    this.audio.unlock();
    this.entering = true;
    try {
      await this.useSession(await navigator.xr.requestSession('immersive-vr', XR_OPTS));
    } catch (err) {
      console.warn('VR failed', err);
      const n = document.getElementById('vrerr');
      if (n) { n.textContent = `VR DIDN'T START: ${err.message || err}`; n.hidden = false; }
    }
    this.entering = false;
  }

  async useSession(session) {
    if (this.inXR) return;
    await this.renderer.xr.setSession(session);
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
    if (hit && hit.b) { this.audio.ui(); this.haptic(0.35, 25); hit.b.onClick(hit.x, hit.y); return; }
    if (hit) {
      const act = { [this.boards.career.mesh.uuid]: 'career', [this.boards.stats.mesh.uuid]: 'stats' }[hit.panel.mesh.uuid];
      if (act && this.inLocker && ['menu', 'summary'].includes(this.mode)) this.lockerAction(act);
      return;
    }
    const obj = this.pickLocker(ray);
    if (obj && ['menu', 'summary'].includes(this.mode)) { this.lockerAction(obj.userData.action); return; }
    if (this.mode === 'play' && this.rep) {
      this.rep.aim(ray.origin, ray.dir);
      this.rep.select();
    }
  }

  // chevrons on the grass at your feet and a marker over the goal you're attacking (+x)
  buildAttackMarkers() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.22); shape.lineTo(0.2, 0); shape.lineTo(0, -0.22);
    shape.lineTo(-0.08, -0.22); shape.lineTo(0.11, 0); shape.lineTo(-0.08, 0.22); shape.closePath();
    const geo = new THREE.ShapeGeometry(shape);
    geo.rotateX(-Math.PI / 2); // lie flat, pointing +x
    this.chevrons = new THREE.Group();
    this.chevronMats = [0, 1, 2].map((i) => {
      const m = new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0.5, depthWrite: false });
      const c = new THREE.Mesh(geo, m);
      c.position.set(0.9 + i * 0.32, 0.015, 0);
      this.chevrons.add(c);
      return m;
    });
    this.chevrons.visible = false;
    this.scene.add(this.chevrons);

    const tri = new THREE.Shape();
    tri.moveTo(-0.7, 0.5); tri.lineTo(0.7, 0.5); tri.lineTo(0, -0.55); tri.closePath();
    this.goalMarker = new THREE.Mesh(new THREE.ShapeGeometry(tri), new THREE.MeshBasicMaterial({ color: 0xff7a1a, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false }));
    this.goalMarker.position.set(52.5, 4.6, 0);
    this.goalMarker.visible = false;
    this.scene.add(this.goalMarker);
    this.markerT = 0;
  }

  updateAttackMarkers(dt) {
    const show = ['play', 'card', 'quiz'].includes(this.mode) && this.rep && this.session?.drill !== 'rondo';
    this.chevrons.visible = this.goalMarker.visible = !!show && this.mode !== 'quiz';
    if (!show) return;
    this.markerT += dt;
    const u = this.world.userPos();
    this.chevrons.position.set(u.x, 0, u.z);
    // a slow ripple outward so it reads as a direction, not decoration
    this.chevronMats.forEach((m, i) => { m.opacity = 0.25 + 0.45 * Math.max(0, Math.sin(this.markerT * 3 - i * 0.9)); });
    const h = this.headPos();
    const gm = this.goalMarker;
    gm.lookAt(h.x, gm.position.y, h.z);
    gm.scale.setScalar(Math.max(1, h.distanceTo(gm.position) / 22));
    gm.position.y = 4.6 + gm.scale.x * 0.6 + Math.sin(this.markerT * 2) * 0.15;
  }

  // tunnel vignette that closes in while you run, for comfort
  buildVignette() {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(128, 128, 40, 128, 128, 128);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.3, 'rgba(0,0,0,0)');
    grad.addColorStop(0.8, 'rgba(0,0,0,1)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    this.vignette = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 3.1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthTest: false, depthWrite: false }));
    this.vignette.position.z = -1;
    this.vignette.renderOrder = 8;
    this.vignette.visible = false;
    this.camera.add(this.vignette);
  }

  // Left stick runs (click it in to sprint), right stick snap-turns. WASD + Shift on desktop.
  locomotion(dt) {
    const rep = this.rep, st = rep?.state;
    const canRun = this.mode === 'play' && rep && (st === 'buildup' || st === 'incoming');
    // with the ball at your feet you can still walk it a few steps
    const canWalk = this.mode === 'play' && rep && st === 'decide';
    const roomWalk = this.inLocker && ['menu', 'summary'].includes(this.mode);
    let ix = 0, iy = 0, sprint = false, turn = 0, handYaw = null;
    if (this.inXR) {
      const session = this.renderer.xr.getSession();
      for (const src of session?.inputSources || []) {
        const gp = src.gamepad;
        if (!gp || gp.axes.length < 4) continue;
        if (src.handedness === 'left') {
          ix = gp.axes[2]; iy = gp.axes[3];
          // a stick click latches sprint until the stick is let go
          if (gp.buttons[3]?.pressed) this.sprintLatch = true;
          sprint = !!this.sprintLatch;
          const c = this.controllers.find((k) => k.userData.source === src);
          if (c) {
            const d = _v1.set(0, 0, -1).transformDirection(c.matrixWorld);
            // a ray pointing near straight up or down has no stable heading
            if (Math.abs(d.y) < 0.77) handYaw = Math.atan2(d.x, d.z);
          }
        } else if (src.handedness === 'right') turn = gp.axes[2];
      }
    } else {
      const k = this.keys;
      iy = (k.has('s') ? 1 : 0) - (k.has('w') ? 1 : 0);
      ix = (k.has('d') ? 1 : 0) - (k.has('a') ? 1 : 0);
      sprint = k.has('shift');
    }

    // snap turn on the right stick, one step per flick, with a short blink
    // off by default: in a scanning trainer you look around with your head, not the stick
    if (store.settings.snapTurn && Math.abs(turn) > 0.7 && !this.turnHeld && ['play', 'menu', 'card', 'summary', 'replay'].includes(this.mode)) {
      this.turnHeld = true;
      this.world.placeUser(this.world.userPos(), this.world.headYaw() + (Math.sign(turn) * -Math.PI) / 6);
      this.fade.material.opacity = Math.max(this.fade.material.opacity, 0.5);
      this.world.snapTurned = true; // the scan tracker must ignore this yaw jump
    } else if (Math.abs(turn) < 0.3) this.turnHeld = false;

    // run direction: the left hand, or a slowly-following body heading from the head
    const headYaw = this.world.headYaw();
    if (this.bodyYaw == null) this.bodyYaw = headYaw;
    this.bodyYaw += Math.atan2(Math.sin(headYaw - this.bodyYaw), Math.cos(headYaw - this.bodyYaw)) * Math.min(1, dt / 0.6);
    if (handYaw != null) {
      if (this.lastHandYaw == null) this.lastHandYaw = handYaw;
      const d = Math.atan2(Math.sin(handYaw - this.lastHandYaw), Math.cos(handYaw - this.lastHandYaw));
      // ignore wrist wobble under 8 degrees, then follow with a short lag
      if (Math.abs(d) > 0.14) this.lastHandYaw += d * Math.min(1, dt / 0.15);
    }
    const dirYaw = !this.inXR ? headYaw : store.settings.steer === 'head' ? this.bodyYaw : this.lastHandYaw ?? this.bodyYaw;

    let mag = Math.hypot(ix, iy);
    if (mag < 0.15) { mag = 0; this.sprintLatch = false; }
    const v = this.vel || (this.vel = { x: 0, z: 0 });
    let wantX = 0, wantZ = 0;
    if (mag > 0 && (canRun || canWalk || roomWalk)) {
      let top = roomWalk ? 1.6 : canWalk ? 1.5 : sprint ? 6.2 : 3.8;
      if (st === 'incoming') top = Math.min(top, 3);
      const sp = top * Math.min(1, mag);
      const fx = Math.sin(dirYaw), fz = Math.cos(dirYaw);
      const rx = -Math.cos(dirYaw), rz = Math.sin(dirYaw);
      let mx = fx * -iy + rx * ix, mz = fz * -iy + rz * ix;
      const l = Math.hypot(mx, mz) || 1;
      wantX = (mx / l) * sp; wantZ = (mz / l) * sp;
    }
    if (!['play', 'paused', 'quiz'].includes(this.mode) && !roomWalk) { v.x = v.z = 0; }
    // linear ramps (6 m/s² up, 12 m/s² down) instead of exponential easing that spikes at the start
    const dvx = wantX - v.x, dvz = wantZ - v.z, dvl = Math.hypot(dvx, dvz);
    const speeding = Math.hypot(wantX, wantZ) > Math.hypot(v.x, v.z);
    const maxDv = (speeding ? 6 : 12) * dt;
    const k = dvl > maxDv ? maxDv / dvl : 1;
    const prevSpeed = Math.hypot(v.x, v.z);
    if (this.mode !== 'paused' && this.mode !== 'quiz') { v.x += dvx * k; v.z += dvz * k; }
    this.moveSpeed = Math.hypot(v.x, v.z);
    const accel = Math.abs(this.moveSpeed - prevSpeed) / Math.max(dt, 1e-4);

    if (this.moveSpeed > 0.02 && roomWalk) {
      // inside the room's walls
      const u = this.world.userPos(), o = this.locker.spawn.pos;
      const nx = THREE.MathUtils.clamp(u.x + v.x * dt, o.x - 3.9, o.x + 3.9);
      const nz = THREE.MathUtils.clamp(u.z + v.z * dt, o.z - 2.9, o.z + 2.9);
      this.world.moveUser(nx - u.x, nz - u.z);
    }
    if (this.moveSpeed > 0.02 && this.mode === 'play') {
      const u = this.world.userPos();
      const nx = THREE.MathUtils.clamp(u.x + v.x * dt, -52, 52);
      const nz = THREE.MathUtils.clamp(u.z + v.z * dt, -33.5, 33.5);
      this.world.moveUser(nx - u.x, nz - u.z);
      if (rep && mag > 0) rep.motion = false; // you're running yourself now
      // dribble: the ball stays at your feet while you walk it
      if (st === 'decide' && this.moveSpeed > 0.15) {
        const s = 0.55 / this.moveSpeed;
        this.world.ball.set(nx + v.x * s, nz + v.z * s);
      }
      this.stepClock -= dt * (1.6 + this.moveSpeed * 0.32);
      if (this.stepClock <= 0) { this.stepClock = 1; this.audio.step(this.moveSpeed / 6.2); }
    }

    // the ball is played to where you are now, not where you were when it was struck
    if (st === 'incoming' && this.world.ball.flight) {
      const f = this.world.ball.flight, u = this.world.userPos();
      const dx = f.from.x - u.x, dz = f.from.z - u.z, dl = Math.hypot(dx, dz) || 1;
      f.to.set(u.x + (dx / dl) * 0.6, 0.11, u.z + (dz / dl) * 0.6);
    }

    // vignette follows artificial motion only (speed and acceleration), never your own head turns
    const vm = this.vignette.material;
    const want = store.settings.vignette !== false && this.inXR
      ? Math.min(0.85, (this.moveSpeed / 6.2) * 0.6 + Math.min(1, accel / 6) * 0.3) : 0;
    vm.opacity += (want - vm.opacity) * Math.min(1, dt * 8);
    this.vignette.visible = vm.opacity > 0.02;
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
      // B / Y: hold briefly to pause, so a stray press mid-rep doesn't stop the game
      const pressed = !!b[5]?.pressed;
      const key = src.handedness;
      this.btnHeld = this.btnHeld || {};
      if (pressed) {
        this.btnHeld[key] = (this.btnHeld[key] || 0) + 1 / 72;
        if (this.btnHeld[key] > 0.4 && this.btnHeld[key] < 1) {
          this.btnHeld[key] = 1;
          if (this.mode === 'play' || this.mode === 'quiz') this.pauseGame();
          else if (this.mode === 'paused') this.resume();
        }
      } else this.btnHeld[key] = 0;
    }
  }

  // ---------- settings / view

  applySettings() {
    const s = store.settings;
    this.audio.setVolume(s.volume);
    this.audio.ticks = s.ticks;
    this.rig.position.y = this.eyeOffset();
  }

  // Eyes at a player's eye height whatever the headset reports: seated, short, or a floor the
  // headset put in the wrong place all end up level with the players. 'real' keeps your true height.
  eyeOffset() {
    if (!this.inXR || store.settings.height === 'real') return 0;
    const local = this.camera.getWorldPosition(_v1).y - this.rig.position.y;
    return Math.max(0, 1.62 - local);
  }

  levelEyes() { this.rig.position.y = this.eyeOffset(); }

  headPos() {
    const v = new THREE.Vector3();
    this.camera.getWorldPosition(v);
    return v;
  }

  toMenuView() {
    this.enterLocker();
    // a step toward the front wall so the boards are close enough to read
    const sp = this.locker.spawn;
    this.world.placeUser(sp.pos.clone().add(new THREE.Vector3(Math.sin(sp.yaw), 0, Math.cos(sp.yaw)).multiplyScalar(1.1)), sp.yaw);
  }

  enterLocker() {
    if (this.inLocker) return;
    this.inLocker = true;
    this.stadium.group.visible = false;
    this.stadium.setEnvironment('locker');
    this.levelEyes();
    this.locker.show();
    this.world.clearOverlays();
    for (const p of [...this.world.homeSets.values()].flat().concat(this.world.away)) p.setVisible(false);
    this.world.ball.mesh.visible = this.world.ball.shadow.visible = false;
    this.chevrons.visible = this.goalMarker.visible = false;
    this.audio.setCrowd?.(0.08);
    this.refreshBoards();
  }

  leaveLocker() {
    if (!this.inLocker) return;
    this.inLocker = false;
    this.locker.hide();
    this.hub.hide();
    for (const b of Object.values(this.boards)) b.mesh.visible = false;
    this.stadium.group.visible = true;
    this.stadium.setEnvironment('stadium');
    this.world.ball.mesh.visible = this.world.ball.shadow.visible = true;
    this.audio.setCrowd?.(0.22);
  }

  // what the room shows: name on the shirt, trophies for stages, the next lesson over the door
  refreshBoards() {
    if (!this.inLocker) return;
    const p = store.profile;
    this.locker.setProfile({ name: p.name, number: p.number, color: p.color });
    const passed = p.passed.filter(Boolean).length;
    this.locker.setTrophies(Math.min(8, Math.floor(passed / 3)));
    const n = nextLesson(p);
    this.locker.setNextLabel(p.passed.every(Boolean) ? 'CAREER COMPLETE' : `LESSON ${n + 1} · ${CAREER[n].name}`);
    if (this.mode !== 'menu' || this.screen !== 'career') this.careerStage = CAREER[n].stage;
    this.boards.career.show(S.career(this, true));
    this.boards.notice.show(S.today(this));
    this.boards.stats.show(S.stats(this, true));
    if (this.mode === 'menu' && this.screen === 'home') {
      const label = p.passed.every(Boolean) ? 'CAREER COMPLETE' : `${String(n + 1).padStart(2, '0')} · ${CAREER[n].name}`;
      const pro = p.pro;
      const proLabel = pro ? proHubLine(pro) : 'START AS A 17-YEAR-OLD';
      this.hub.show((k) => {
        k.button('go', 0, 0, k.w, 190, 'CONTINUE', { primary: true, size: 70, r: 40, onClick: () => this.continueCareer() });
        k.text(label, k.w - 44, 97, 40, { align: 'right', base: 'middle', color: '#111' });
        k.button('pro', 0, 210, k.w, 110, '', { r: 34, onClick: () => this.openPro() });
        k.text('PLAYER CAREER', 44, 266, 46, { base: 'middle', weight: 800 });
        k.text(proLabel, k.w - 40, 266, 30, { align: 'right', base: 'middle', color: 'rgba(242,240,232,0.6)' });
      });
      const sp = this.locker.spawn;
      this.hub.mesh.position.set(sp.pos.x + Math.sin(sp.yaw) * 2.5, (this.inXR ? this.headPos().y : 1.7) - 0.5, sp.pos.z + Math.cos(sp.yaw) * 2.5);
      this.hub.mesh.rotation.set(-0.35, sp.yaw + Math.PI, 0, 'YXZ');
    } else this.hub.hide();
  }

  lockerAction(action) {
    this.audio.ui();
    if (action === 'continue') return this.continueCareer();
    if (action === 'practice') return this.go('practice');
    if (action === 'settings') return this.go('settings');
    if (action === 'career') return this.go('career');
    if (action === 'stats') return this.go('stats');
    if (action === 'notice') return this.startDaily();
  }

  pickLocker(ray) {
    if (!this.inLocker || !this.locker.visible || !ray) return null;
    this._lockerRay = this._lockerRay || new THREE.Raycaster();
    this._lockerRay.set(ray.origin, ray.dir);
    const hit = this._lockerRay.intersectObjects(this.locker.pickables, false)[0];
    return hit && hit.distance < 12 ? hit.object : null;
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
    this.pendingAfter = null;
    this.screen = name;
    this.mode = 'menu';
    this.hideHint();
    this.rep = null;
    this.quiz = null;
    this.session = null;
    this.endReplay();
    this.bar.hide();
    if (!fromMenu || !this.inLocker) {
      this.world.clearOverlays();
      this.toMenuView();
      this.setFade(1, true);
      this.setFade(0);
    }
    this.refreshBoards();
    // home is the room itself; everything else opens as a panel in front of you
    if (name === 'home') this.panel.hide();
    else {
      const screen = S[name] || PS[name];
      this.panel.show(name === 'proReport' ? screen(this, this.proReportData) : screen(this));
      if (name === 'proSeasonEnd' || name === 'proInbox') store.save();
      this.placePanel();
    }
  }

  redraw() {
    if (this.panel.mesh.visible) this.panel.redraw();
    if (this.inLocker) for (const b of Object.values(this.boards)) b.redraw();
  }

  // ---------- sessions

  startCareer(level) {
    const l = CAREER[level];
    this.beginSession({ level, role: l.role, difficulty: l.difficulty, reps: l.reps, quizChance: l.quizChance, drill: l.drill, pairs: l.pairs, speed: l.speed, minFlight: l.minFlight });
  }

  continueCareer() {
    // first press of CONTINUE plays the three-rep tutorial, which ends on a button into lesson 1
    if (!store.data.tutorialDone && !store.profile.passed[0]) return this.startTutorial();
    this.startCareer(nextLesson(store.profile));
  }

  // which metrics the player has been taught so far (the card only shows those)
  taught() {
    const out = new Set(['scan', 'decision']);
    CAREER.forEach((l, i) => { if (store.profile.passed[i] && l.teaches) out.add(l.teaches); });
    const cur = this.session?.level != null ? CAREER[this.session.level] : null;
    if (cur?.teaches) out.add(cur.teaches);
    if (this.session?.level == null && !this.session?.tutorial) ['timing', 'critical', 'info'].forEach((k) => store.profile.passed.some(Boolean) && out.add(k));
    return out;
  }

  switchProfile(i) {
    store.setActive(i);
    this.careerStage = CAREER[nextLesson(store.profile)].stage;
    this.refreshBoards();
    this.redraw();
  }

  startDaily() { this.beginSession({ level: null, ...dailyDrill(store.profile) }); }

  startWeakSpot() {
    const w = weakSpot(store.profile) || { key: 'rate', drill: 'match', role: 'CM' };
    const lv = currentLevel(store.profile);
    this.beginSession({ level: null, drill: w.drill, role: w.role, difficulty: lv.difficulty, speed: lv.speed, reps: 5, quizChance: 0, weak: w.key });
  }

  // ---------- player career

  openPro() { this.audio.ui(); this.go(store.profile.pro ? 'proHub' : 'proCreate'); }

  proCreate(opts) {
    store.profile.pro = newPro(opts);
    store.save();
    this.go('proHub');
  }

  proPlay() {
    const pro = store.profile.pro;
    if (!pro) return;
    const o = matchdaySession(pro);
    if (!o) return this.go('proSeasonEnd');
    store.save(); // the lineup is fixed for this matchday
    this.beginSession(o);
  }

  proTrain(focus) {
    const pro = store.profile.pro;
    if (pro) this.beginSession(trainingSession(pro, focus));
  }

  proSign(i) {
    const pro = store.profile.pro;
    if (!pro || !acceptOffer(pro, i)) return;
    store.save();
    this.go('proHub');
  }

  // a short controller buzz; Quest controllers expose hapticActuators on the gamepad
  haptic(strength = 0.4, ms = 30) {
    if (!this.inXR) return;
    for (const src of this.renderer.xr.getSession()?.inputSources || []) {
      const h = src.gamepad?.hapticActuators?.[0];
      try { h?.pulse?.(strength, ms); } catch {}
    }
  }

  startPractice() {
    const p = this.practiceOpts;
    const quizChance = { 'QUIZ OFF': 0, 'QUIZ SOME': 0.3, 'QUIZ EVERY REP': 1 }[p.quiz];
    this.beginSession({ level: null, role: p.role, difficulty: p.difficulty, reps: p.reps, quizChance, drill: p.drill });
  }

  again() { this.beginSession({ ...this.lastSessionOpts }); }

  // three easy reps with prompts; the first one waits for the pass
  startTutorial() {
    this.beginSession({ level: null, role: 'CM', difficulty: 'EASY', reps: 3, quizChance: 0, tutorial: true });
  }

  tutorialStep() {
    const s = this.session, rep = this.rep;
    if (!s?.tutorial || !rep) return;
    if (s.index === 0 && rep.state === 'decide') rep.decideT = 0;
    const scans = rep.scans.length + (rep.inScan ? 1 : 0);
    const pass = this.inXR ? 'POINT AT A TEAMMATE · PULL THE TRIGGER' : 'CLICK A TEAMMATE TO PASS';
    let text = null;
    const move = this.inXR ? 'LEFT STICK RUNS · CLICK IT TO SPRINT' : 'WASD RUNS · SHIFT SPRINTS';
    const pr = rep.pressers?.[0];
    const prText = pr ? `PRESSER ${Math.round(pr.pos.distanceTo(this.world.userPos()))} M ${rep.sawPresser?.[0] > -1 ? '' : 'BEHIND '}· SCANS ${scans}` : `SCANS ${scans}`;
    if (rep.state === 'buildup') text = scans === 0 ? (s.index === 0 ? 'LOOK OVER YOUR SHOULDER' : move) : s.index === 0 ? prText : `SCANS ${scans}`;
    else if (rep.state === 'incoming' || rep.state === 'decide') text = s.index < 2 ? pass : null;
    if (s.index === 2) text = rep.state === 'buildup' && scans ? `SCANS ${scans}` : null;
    this.showHint(text, true);
  }

  showHint(text, skip = false) {
    if (text === this.hintText) return;
    this.hintText = text;
    if (!text) { this.hint.hide(); return; }
    this.hint.show((k) => {
      k.bg(60);
      k.text(text, skip ? (k.w - 200) / 2 : k.w / 2, k.h / 2 + 4, text.length > 30 ? 52 : 62, { align: 'center', base: 'middle', weight: 800 });
      if (skip) k.button('skip', k.w - 190, 30, 160, k.h - 60, 'SKIP', { size: 40, onClick: () => this.skipTutorial() });
    });
    if (!this.hintPlaced) {
      this.hintPlaced = true;
      this.hint.placeFacing(this.headPos(), this.world.headYaw(), 3.2, 0.75);
    }
  }

  // Live prompts in normal sessions: what to do right now, and how many looks so far.
  coachStep() {
    const s = this.session, rep = this.rep;
    if (!s || s.tutorial || !rep) return;
    if (!store.settings.coach) return this.showHint(null);
    const lesson = s.level != null ? CAREER[s.level] : null;
    const scans = rep.scans.length + (rep.inScan ? 1 : 0);
    const early = (this.repsOfDrill?.[rep.drillKey] || 0) <= 2;
    const goal = (lesson && LESSON_GOALS[lesson.name]) || DRILL_GOALS[rep.drillKey] || DRILL_GOALS.match;
    const scanLesson = lesson && ['scan', 'rate', 'timing', 'critical', 'info'].includes(lesson.teaches);
    let text = null;
    if (rep.state === 'buildup') text = early && scans === 0 ? goal[0] : `LOOKS ${scans}`;
    else if (rep.state === 'incoming') text = lesson?.teaches === 'critical' ? 'BALL COMING · ONE LAST LOOK' : scanLesson ? `BALL COMING · LOOKS ${scans}` : 'BALL COMING';
    else if (rep.state === 'decide') text = this.inXR ? 'PASS · POINT AND PULL THE TRIGGER' : 'PASS · CLICK A TEAMMATE';
    this.showHint(text);
  }

  // a ring round the ball at your feet that runs down until the presser takes it
  updateCountdown() {
    const rep = this.rep, ring = this.countdown;
    const on = this.mode === 'play' && rep?.state === 'decide' && rep.window > 0 && !this.session?.tutorial;
    ring.visible = !!on;
    if (!on) return;
    const left = Math.max(0, 1 - rep.decideT / rep.window);
    const theta = Math.round(left * 48) / 48 * Math.PI * 2;
    if (theta !== this.countdownTheta) {
      this.countdownTheta = theta;
      ring.geometry.dispose();
      ring.geometry = new THREE.RingGeometry(0.34, 0.42, 40, 1, Math.PI / 2, Math.max(0.001, theta));
      ring.geometry.rotateX(-Math.PI / 2);
      ring.material.color.setHex(left < 0.35 ? 0xff5a4f : 0xff7a1a);
    }
    const b = this.world.ball.pos;
    ring.position.set(b.x, 0.03, b.z);
  }

  // stereo position and distance of the ball relative to the head
  ballPan() {
    const b = this.world.ball.pos, h = this.headPos();
    const yaw = this.world.headYaw();
    const ang = Math.atan2(b.x - h.x, b.z - h.z) - yaw;
    return [-Math.sin(ang), Math.hypot(b.x - h.x, b.z - h.z)];
  }

  skipTutorial() {
    store.data.tutorialDone = true;
    store.save();
    this.hideHint();
    this.startCareer(0);
  }

  hideHint() { this.hint.hide(); this.hintText = null; this.hintPlaced = false; }

  beginSession(opts) {
    if (this.pendingAfter) return;
    this.lastSessionOpts = opts;
    this.panel.hide();
    this.hub.hide();
    this.setFade(1);
    this.mode = 'between';
    this.after(0.25, () => {
      this.leaveLocker();
      this.session = { ...opts, index: 0, results: [] };
      this.startRep();
    });
  }

  startRep() {
    const s = this.session;
    // guarantee at least one quiz in a memory-heavy session
    const quiz = s.quizChance >= 1 || Math.random() < s.quizChance || (s.quizChance > 0.5 && s.index === s.reps - 1 && !s.results.some((r) => r.memory != null));
    // mixed sessions cycle through their drills and positions rep by rep
    const pair = s.pairs ? s.pairs[s.index % s.pairs.length] : null;
    const drill = pair ? pair[0] : s.drill || 'match';
    const role = pair ? pair[1] : s.role;
    const Drill = DRILLS[drill] || DRILLS.match;
    this.rep = new Drill(this.world, {
      role, difficulty: s.difficulty, quiz, motion: store.settings.motion, speed: s.speed || 1,
      fx: {
        kick: (p) => this.audio.kick(p, ...this.ballPan()), touch: () => this.audio.touch(...this.ballPan()),
        tick: () => { this.audio.tick(); this.haptic(0.25, 18); },
        whistle: () => this.audio.whistle(), cheer: (k) => { this.audio.cheer(k); this.haptic(0.6, 60); }, groan: () => this.audio.groan(), ui: () => this.audio.ui(),
        alert: () => { this.audio.alert(); this.haptic(0.8, 80); },
      },
    });
    this.rep.drillKey = drill;
    this.mode = 'play';
    this.panel.hide();
    this.hideHint();
    this.quiz = null;
    this.setFade(1, true);
    this.levelEyes();
    this.rep.start();
    if (s.minFlight) this.rep.minFlight = s.minFlight; // start() resets it
    this.look.pitch = 0;
    this.setFade(0);
    this.holdT = 0.6; // breathing room before the first pass
    this.repsOfDrill = this.repsOfDrill || {};
    if (s.index === 0) this.repsOfDrill = {};
    const firstOfDrill = !this.repsOfDrill[drill];
    this.repsOfDrill[drill] = (this.repsOfDrill[drill] || 0) + 1;
    // explain a drill the first time you ever meet it, and always at the start of a session
    const briefed = store.data.briefed || (store.data.briefed = []);
    if (!s.tutorial && firstOfDrill && (s.index === 0 || !briefed.includes(drill))) {
      if (!briefed.includes(drill)) { briefed.push(drill); store.save(); }
      const lesson = s.level != null ? CAREER[s.level] : null;
      const title = lesson ? `${String(s.level + 1).padStart(2, '0')} · ${lesson.name}` : s.training ? `TRAINING · ${s.focus}`
        : s.pro ? `MATCHDAY ${s.fixture.matchday} · ${s.fixture.home ? 'V' : 'AT'} ${s.fixture.oppName.toUpperCase()}${s.lineup === 'SUB' ? ' · OFF THE BENCH' : s.lineup === 'BENCH' ? ' · BENCH: WARM-UP' : ''}`
        : s.daily ? 'DAILY DRILL' : s.weak ? 'WEAK SPOT' : 'PRACTICE';
      this.mode = 'brief';
      this.panel.show(S.brief(this, { title, drill, role: this.rep.roleKey || role, lesson, firstOfLesson: s.index === 0 }));
      this.placePanel(-0.05, 2.2);
    }
  }

  startPlay() {
    if (this.mode !== 'brief') return;
    this.panel.hide();
    this.mode = 'play';
    this.holdT = 0.6;
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

  quitSession() { this.go(this.session?.pro ? 'proHub' : 'home'); }

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
    this.hideHint();
    const s = this.session, r = this.rep.result;
    s.results.push(r);
    this.mode = 'card';
    // the card waits for you: in a head-turning game an auto-advance loses the lesson
    this.cardCountdown = null;
    this.cardTimer = 0;
    this.drawCard();
    this.placePanel(-0.15, 2.2);
  }

  drawCard() {
    const s = this.session;
    this.panel.show(S.repCard(this, this.rep.result, s.index, s.reps));
  }

  nextRep() {
    const s = this.session;
    if (this.pendingAfter) return;
    this.endReplay();
    s.index++;
    if (s.index >= s.reps) {
      this.panel.hide();
      this.setFade(1);
      this.mode = 'between';
      this.after(0.25, () => { this.finishSession(); this.setFade(0); });
      return;
    }
    // fade out before teleporting to the next spot, never cut
    this.panel.hide();
    this.setFade(1);
    this.mode = 'between';
    this.after(0.2, () => this.startRep());
  }

  after(sec, fn) { this.pendingAfter = { t: sec, fn }; }

  finishSession() {
    const s = this.session, rs = s.results;
    const avg = (f) => { const v = rs.map(f).filter((x) => x != null); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null; };
    const metrics = sessionMetrics(rs);
    const lesson = s.level != null ? CAREER[s.level] : null;
    const fails = s.level != null ? store.profile.fails[s.level] || 0 : 0;
    const objective = checkObjective(lesson, metrics, fails);
    const ratingBefore = rating(store.profile);
    const drillsBefore = unlockedDrills(store.profile);
    const prevBest = s.level != null ? store.profile.best[s.level] : null;
    const rec = {
      date: Date.now(), level: s.level, role: s.role, difficulty: s.difficulty, speed: s.speed || 1, reps: rs.length,
      score: avg((r) => r.total), scan: avg((r) => r.scanScore), decision: avg((r) => r.decision), memory: avg((r) => r.memory),
      scanRate: rs.reduce((a, r) => a + (r.scanRate || 0), 0) / rs.length,
      completed: rs.filter((r) => ['completed', 'tight', 'goal'].includes(r.outcome)).length,
      metrics, objective, daily: !!s.daily,
      newBest: s.level != null && prevBest > 0 && avg((r) => r.total) > prevBest,
    };
    const wasPassed = s.level != null && store.profile.passed[s.level];
    store.recordSession(rec);
    rec.firstPass = !!objective?.passed && !wasPassed;
    if (rec.firstPass || rec.newBest) { this.audio.cheer(rec.firstPass ? 0.9 : 0.6); this.haptic(0.8, 120); }
    else if (objective && !objective.passed) { this.audio.groan(); this.haptic(0.3, 200); }
    rec.ratingBefore = ratingBefore;
    rec.ratingAfter = rating(store.profile);
    rec.streak = streak(store.profile);
    rec.unlocked = [...unlockedDrills(store.profile)].filter((d) => !drillsBefore.has(d));
    rec.trophy = rec.firstPass && (store.profile.passed.filter(Boolean).length % 3 === 0);
    rec.fails = s.level != null ? store.profile.fails[s.level] || 0 : 0;
    // the rep that hurt the objective most, and what happened in it
    if (objective && !objective.passed) rec.worst = worstRep(rs, objective.key);
    if (s.pro && store.profile.pro) return this.finishPro(s, rs, metrics);
    if (s.tutorial) { store.data.tutorialDone = true; store.save(); }
    const starsEarned = store.starsFor(rec.score);
    const next = s.tutorial ? 0 : s.level != null && objective?.passed && s.level < CAREER.length - 1 ? s.level + 1 : null;
    this.audio.whistle(true);
    this.mode = 'summary';
    this.rep = null;
    this.world.clearOverlays();
    this.toMenuView();
    this.refreshBoards();
    this.panel.show(S.summary(this, rec, starsEarned, next));
    this.placePanel();
  }

  // a matchday or a training session of the player career: the club's screens, not the lesson summary
  finishPro(s, rs, metrics) {
    const pro = store.profile.pro;
    this.audio.whistle(true);
    this.mode = 'summary';
    this.rep = null;
    this.world.clearOverlays();
    this.toMenuView();
    if (s.training) {
      this.proTrained = applyTraining(pro, s.focus, metrics, rs);
      store.save();
      this.go('proTraining');
      return;
    }
    const report = playMatch(pro, rs);
    store.save();
    if (report?.motm || report?.result === 'W') { this.audio.cheer(report.motm ? 0.9 : 0.6); this.haptic(0.8, 120); }
    else if (report?.result === 'L') this.audio.groan();
    this.proReportData = report;
    this.go('proReport');
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
      // the critical window: from the pass to you leaving, until it arrives
      const fin = rep.events.find((e) => e.type === 'final'), rec = rep.events.find((e) => e.type === 'receive');
      if (fin && rec) {
        k.g.fillStyle = 'rgba(255,122,26,0.22)';
        k.g.fillRect(px(fin.t), y, px(rec.t) - px(fin.t), 76);
      }
      k.g.fillStyle = '#f2f0e8'; k.rr(x, y + 30, Math.max(0, px(rp.t) - x), 16, 8); k.g.fill();
      // teammates' touches: eyes should be on the ball at these moments
      k.g.fillStyle = 'rgba(242,240,232,0.85)';
      for (const tc of rep.touches || []) k.g.fillRect(px(tc.t) - 1.5, y + 50, 3, 26);
      for (const sc of rep.scans) {
        k.g.fillStyle = sc.bad ? '#ff5a4f' : sc.shoulder ? '#4fd88a' : '#ffe08a';
        const x0 = px(sc.t), x1 = Math.max(x0 + 6, px(sc.end ?? sc.t));
        k.g.fillRect(x0, y + 4, x1 - x0, 22);
      }
      for (const e of rep.events) {
        if (!['final', 'receive', 'decide', 'lost'].includes(e.type)) continue;
        k.g.fillStyle = e.type === 'lost' ? '#ff5a4f' : '#ff7a1a';
        k.g.beginPath(); k.g.arc(px(e.t), y + 38, 14, 0, Math.PI * 2); k.g.fill();
      }
      k.hit('scrub', x, y, w, 80, (hx) => { rp.t = t0 + ((hx - x) / w) * (t1 - t0); rp.playing = false; this.bar.redraw(); });
      const legend = [['SCAN', '#ffe08a'], ['SHOULDER', '#4fd88a'], ['AT A TOUCH', '#ff5a4f'], ['BEST PASS', '#4fd88a'], ['YOUR PASS', '#f2f0e8']];
      let lx = x;
      legend.forEach(([l, c], i) => {
        k.g.fillStyle = c;
        if (i < 3) k.g.fillRect(lx, 238, 6, 30); else k.g.fillRect(lx, 250, 30, 6);
        lx += i < 3 ? 18 : 42;
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
      // who it should have gone to, and who took it
      if (best?.target) best.target.highlight(0x4fd88a, 0.9);
      if (['intercepted', 'lost', 'blocked'].includes(rep.result.outcome)) rep.outcomeTarget?.highlight(0xff5a4f, 0.9);
    } else {
      w.setLine(w.bestLine, null, null);
      w.setLine(w.choiceLine, null, null);
      for (const p of [...rep.home, ...rep.away]) p.highlight(0xffffff, 0);
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
    if (this.pendingAfter) {
      this.pendingAfter.t -= dt;
      if (this.pendingAfter.t <= 0) { const f = this.pendingAfter.fn; this.pendingAfter = null; f(); }
    }
    this.locomotion(dt);
    this.updateAttackMarkers(dt);
    this.updateCountdown();

    const fm = this.fade.material;
    fm.opacity += (this.fadeTo - fm.opacity) * Math.min(1, dt * (this.fadeTo > fm.opacity ? 16 : 8));
    this.fade.visible = fm.opacity > 0.01;

    if ((this.mode === 'menu' || this.mode === 'summary') && !this.inLocker) this.world.idleStep(dt);
    if (this.inLocker) {
      const { doorGaze } = this.locker.update(dt, this.headPos(), this.world.headDir(_v1));
      // the crowd outside gets louder as you turn to the tunnel
      this.audio.setCrowd?.(0.06 + doorGaze * 0.2);
    }
    if (this.mode === 'play' && this.rep) {
      if (this.holdT > 0) this.holdT -= dt;
      else this.rep.update(dt);
      this.tutorialStep();
      this.coachStep();
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
        // no laser while the play builds up; it only appears when there's something to aim at
        ud.line.visible = !!hit || this.mode !== 'play' || ['incoming', 'decide'].includes(this.rep?.state);
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
    // the room's objects light up under the pointer when no screen is in the way
    let lockerHover = null;
    if (this.inLocker && !hoverId && ['menu', 'summary'].includes(this.mode)) {
      for (const r of rays) { if (this.pointer.hitPanels(r.origin, r.dir)) continue; lockerHover = this.pickLocker(r); if (lockerHover) break; }
    }
    if (this.inLocker) this.locker.setHover(lockerHover);
    if (lockerHover !== this._lastLockerHover) { if (lockerHover) this.haptic(0.2, 15); this._lastLockerHover = lockerHover; }
    if (lockerHover && !this.inXR) this.renderer.domElement.style.cursor = 'pointer';
  }
}

// fonts are drawn into canvases, so wait for them before the first paint
const fontsReady = Promise.race([
  Promise.all(['800 40px "Barlow Condensed"', '700 40px "Barlow Condensed"', '600 40px "Barlow Condensed"'].map((f) => document.fonts.load(f))),
  new Promise((r) => setTimeout(r, 2500)),
]);
fontsReady.then(() => { window.app = new App(); document.getElementById('boot')?.remove(); });

// one line under PLAYER CAREER on the locker hub: club, rating, next match
function proHubLine(pro) {
  const c = clubOf(pro.clubId, pro), fx = nextFixture(pro);
  return `${(c.short || c.name).toUpperCase()} · OVR ${pro.ovr}${fx ? ` · NEXT ${fx.home ? 'V' : 'AT'} ${(fx.oppShort || fx.oppName).toUpperCase()}` : ' · SEASON OVER'}`;
}

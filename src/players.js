import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Heading convention everywhere: atan2(x, z), 0 = +z, a positive turn goes towards +x.
// Player-local axes: +z forward, +x the player's LEFT, +y up. legs[0] is the right leg (x < 0).

const SKIN = [0xf1c7a5, 0xd9a47e, 0xb07a52, 0x8a5a3a, 0x5e3b25];
const HAIR = [0x1a1410, 0x3b2a1c, 0x6b4a2a, 0x0e0e0e, 0xa88a5a];

const PI = Math.PI, TAU = PI * 2, DEG = PI / 180;
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const wrap = (a) => a - TAU * Math.floor((a + PI) / TAU);
const frac = (x) => x - Math.floor(x);
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
const easeOut = (t) => 1 - (1 - t) * (1 - t);
const easeIn = (t) => t * t;

// Cheap deterministic per-player randomness, so a given shirt always has the same legs and the same lungs.
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function rnd(seed, k) {
  let x = Math.imul(seed ^ Math.imul(k + 1, 0x9e3779b1), 0x85ebca6b);
  x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

// ---- skeleton, metres. Soles sit on y = 0 when the pelvis is HIP_Y and the legs are straight.
const HIP_Y = 0.895, HIP_X = 0.1, THIGH = 0.42, SHIN = 0.44, ANKLE = 0.035;
const REACH = THIGH + SHIN;
const LEG_R = 0.855; // working leg length at the extremes of a stride (a little knee left in it)
const BALL_R = 0.11;

// ---- scratch, so step / animate / update never allocate
const _m = new THREE.Matrix4();
const _ax = new THREE.Vector3(), _ay = new THREE.Vector3(), _az = new THREE.Vector3();
const _qa = new THREE.Quaternion(), _qb = new THREE.Quaternion(), _qc = new THREE.Quaternion();
const AXX = new THREE.Vector3(1, 0, 0), AXY = new THREE.Vector3(0, 1, 0);
const FX = [0, 0], FY = [0, 0], FZ = [0, 0], FP = [0, 0]; // foot targets (heading frame) + toe pitch
const AW = [0, 0], AH = [0, 0], AK = [0, 0], AP = [0, 0]; // action weight / hip / knee / toe per leg

// ---- geometry. Everything a player is made of is built once; per-player bodies are merged
// vertex-coloured meshes, so a player costs 10 draw calls instead of 17.
const hasDOM = typeof document !== 'undefined' && typeof document.createElement === 'function';
function canvas2d(w, h) {
  if (!hasDOM) return null;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

const base = {
  torso: new THREE.CapsuleGeometry(0.2, 0.32, 4, 10),
  shorts: new THREE.CylinderGeometry(0.21, 0.23, 0.26, 10),
  neck: new THREE.CylinderGeometry(0.048, 0.055, 0.1, 8),
  head: new THREE.SphereGeometry(0.115, 14, 10),
  hair: new THREE.SphereGeometry(0.12, 14, 8, 0, TAU, 0, PI * 0.55),
  nose: new THREE.SphereGeometry(0.022, 6, 5),
  thigh: new THREE.CapsuleGeometry(0.085, 0.32, 3, 8),
  shin: new THREE.CapsuleGeometry(0.068, 0.34, 3, 8),
  arm: new THREE.CapsuleGeometry(0.055, 0.4, 3, 8),
  sleeve: new THREE.CylinderGeometry(0.07, 0.074, 0.16, 8),
  hand: new THREE.SphereGeometry(0.055, 8, 6),
};
const geo = {
  boot: new THREE.BoxGeometry(0.11, 0.07, 0.26).translate(0, 0, 0.05), // pivot at the ankle
  numbers: null,
  shadow: new THREE.CircleGeometry(0.45, 20),
  ring: new THREE.RingGeometry(0.62, 0.8, 32),
};
{
  // back number big, front number small on the chest; one geometry shared by everyone
  const back = new THREE.PlaneGeometry(0.26, 0.26).rotateY(PI).translate(0, 0.385, -0.155);
  const front = new THREE.PlaneGeometry(0.26, 0.26).scale(0.45, 0.45, 1).translate(0.07, 0.465, 0.155);
  geo.numbers = mergeGeometries([back, front]);
}

function tint(g, hex) {
  const c = new THREE.Color(hex);
  const n = g.attributes.position.count;
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { a[i * 3] = c.r; a[i * 3 + 1] = c.g; a[i * 3 + 2] = c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(a, 3));
  return g;
}
function put(src, hex, o = {}) {
  const g = src.clone();
  if (o.sx || o.sy || o.sz) g.scale(o.sx ?? 1, o.sy ?? 1, o.sz ?? 1);
  if (o.rx) g.rotateX(o.rx);
  g.translate(o.x ?? 0, o.y ?? 0, o.z ?? 0);
  return tint(g, hex);
}
const memo = new Map();
const once = (key, make) => { let v = memo.get(key); if (!v) memo.set(key, v = make()); return v; };

// pelvis-local: shorts, torso, neck (origin = hip joint height)
const torsoGeo = (shirt, shorts, skin) => once(`T${shirt}.${shorts}.${skin}`, () => mergeGeometries([
  put(base.torso, shirt, { y: 0.32, sx: 1.05, sz: 0.72 }),
  put(base.shorts, shorts, { y: 0.035, sz: 0.75 }),
  put(base.neck, skin, { y: 0.7 }),
]));
// origin at the neck, so the head turns on it
const headGeo = (skin, hair) => once(`H${skin}.${hair}`, () => mergeGeometries([
  put(base.head, skin, { y: 0.08, z: 0.005 }),
  put(base.hair, hair, { y: 0.1, rx: -0.25 }),
  put(base.nose, skin, { y: 0.075, z: 0.113 }),
]));
// origin at the shoulder
const armGeo = (skin, shirt) => once(`A${skin}.${shirt}`, () => mergeGeometries([
  put(base.arm, skin, { y: -0.26 }),
  put(base.hand, skin, { y: -0.55 }),
  put(base.sleeve, shirt, { y: -0.08 }),
]));
const thighGeo = (skin) => once(`L${skin}`, () => put(base.thigh, skin, { y: -0.215 }));
const shinGeo = (socks) => once(`S${socks}`, () => put(base.shin, socks, { y: -0.215 }));

// ---- materials
const bodyMat = new THREE.MeshLambertMaterial({ vertexColors: true });
const bootMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35, depthWrite: false });

const numMats = new Map();
function numberMaterial(n, color) {
  const key = `${n}|${color}`;
  let m = numMats.get(key);
  if (m) return m;
  const c = canvas2d(128, 128);
  let map = null;
  if (c) {
    const g = c.getContext('2d');
    g.fillStyle = color;
    g.font = '800 104px "Barlow Condensed", sans-serif';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(String(n), 64, 70);
    map = new THREE.CanvasTexture(c);
    map.colorSpace = THREE.SRGBColorSpace;
  }
  m = new THREE.MeshBasicMaterial({ map, color: map ? 0xffffff : color, alphaTest: 0.4, side: THREE.FrontSide });
  numMats.set(key, m);
  return m;
}

// static children never need their matrix recomposed
const frozen = (mesh) => { mesh.matrixAutoUpdate = false; mesh.updateMatrix(); return mesh; };

export class Player {
  constructor(scene, { kit, number, team, slot }) {
    this.team = team;
    this.slot = slot;
    this.number = number;
    const seed = hashStr(`${team}|${slot}|${number}`);
    const R = (k) => rnd(seed, k);

    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.target = new THREE.Vector3();
    this.heading = team === 'away' ? -PI / 2 : PI / 2;
    this.maxSpeed = 6.5;
    this.wobble = R(1) * 100;
    this.mood = 0; // 0 normal, 1 celebrating, 2 dejected
    this.cel = 0;
    this.dej = 0;

    // who this person is: how fast they react, how hard they can push, how they run
    this.reactT = 0.15 + R(2) * 0.3;    // s before a big change of plan turns into movement
    this.tau = 0.1 + R(3) * 0.14;       // s, how smoothly the target is followed
    this.speedMul = 0.85 + R(4) * 0.25; // of maxSpeed
    this.accel = 6 + R(5) * 4;          // m/s^2
    this.stride = 0.95 + R(6) * 0.1;
    this.footed = R(7) < 0.8 ? 0 : 1;   // kicking leg (0 = right)

    // movement internals
    this._raw = new THREE.Vector3();    // last target seen
    this._bel = new THREE.Vector3();    // the target this player has made up his mind about
    this._tgt = new THREE.Vector3();    // smoothed copy that is actually steered to
    this._delay = 0; this._alert = 0; this._settled = false;
    this._running = false; this._yawRate = 0; this._yr = 0; this._prevH = this.heading;
    this._faceYaw = 0; this._faceT = 0;
    this._accFwd = 0; this._lastSpeed = 0;
    this._headYaw = 0;
    this._fs = false;
    this._lpx = 0; this._lpz = 0;
    this._ay = [this.heading, this.heading]; this._ad = [0, 0]; this._st = [-1, -1]; // idle feet: planted facing, step state
    // animation internals
    this._t = R(8) * 20;
    this.gait = R(9) * 2;      // in steps; even = right foot down
    this.phase = this.gait * PI;
    this.lean = 0; this.roll = 0;
    this._ct = 0;
    // one-shot actions; -1 = idle
    this._kT = -1; this._kC = 0.16; this._kYaw = 0;
    this._tT = -1;
    this._dT = -1; this._dSide = 1; this._dX = 0; this._dZ = 0; this._dDone = 0;

    const root = new THREE.Group();
    const rig = new THREE.Group();     // roll into turns, dives, hops
    const pelvis = new THREE.Group();  // hip height, twist
    const spine = new THREE.Group();   // lean, counter-twist
    root.add(rig);
    rig.add(pelvis);
    pelvis.add(spine);
    const skin = SKIN[(R(10) * SKIN.length) | 0], hair = HAIR[(R(11) * HAIR.length) | 0];

    const torso = frozen(new THREE.Mesh(torsoGeo(kit.shirt, kit.shorts, skin), bodyMat));
    spine.add(torso);
    spine.add(frozen(new THREE.Mesh(geo.numbers, numberMaterial(number, kit.number))));
    const head = new THREE.Mesh(headGeo(skin, hair), bodyMat);
    head.position.y = 0.72;
    spine.add(head);
    this.head = head;
    this.hair = head;

    this.legs = [-1, 1].map((side) => {
      const hip = new THREE.Group();
      hip.position.set(side * HIP_X, 0, 0);
      hip.add(frozen(new THREE.Mesh(thighGeo(skin), bodyMat)));
      const knee = new THREE.Group();
      knee.position.y = -THIGH;
      knee.add(frozen(new THREE.Mesh(shinGeo(kit.socks), bodyMat)));
      const boot = new THREE.Mesh(geo.boot, bootMat);
      boot.position.y = -SHIN;
      knee.add(boot);
      hip.add(knee);
      pelvis.add(hip);
      return { hip, knee, boot, side };
    });
    this.arms = [-1, 1].map((side) => {
      const s = new THREE.Group();
      s.position.set(side * 0.262, 0.52, 0);
      s.add(frozen(new THREE.Mesh(armGeo(skin, kit.shirt), bodyMat)));
      spine.add(s);
      return s;
    });

    const shadow = frozen(new THREE.Mesh(geo.shadow, shadowMat));
    shadow.rotation.x = -PI / 2;
    shadow.position.y = 0.012;
    shadow.updateMatrix();
    root.add(shadow);

    this.ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false });
    this.ring = new THREE.Mesh(geo.ring, this.ringMat);
    this.ring.rotation.x = -PI / 2;
    this.ring.position.y = 0.02;
    this.ring.visible = false;
    root.add(this.ring);

    this.root = root;
    this.rig = rig;
    this.pelvis = pelvis;
    this.body = pelvis;
    this.spine = spine;
    scene.add(root);
    this.animate(0, 0, false);
    this.sync();
  }

  // Put the player down and leave them standing. heading defaults to their side's way of attack.
  place(x, z, heading) {
    this.pos.set(x, 0, z);
    this._lpx = x; this._lpz = z;
    this.target.copy(this.pos);
    this.vel.set(0, 0, 0);
    this.mood = 0; this.cel = 0; this.dej = 0;
    if (heading !== undefined) this.heading = wrap(heading);
    else this.heading = this.team === 'away' ? -PI / 2 : PI / 2;
    this._raw.copy(this.pos); this._bel.copy(this.pos); this._tgt.copy(this.pos);
    this._delay = 0; this._alert = 0; this._settled = true;
    this._running = false; this._yawRate = 0; this._yr = 0; this._prevH = this.heading;
    this._faceT = 0; this._accFwd = 0; this._lastSpeed = 0;
    this._headYaw = 0;
    this._ay[0] = this._ay[1] = this.heading; this._st[0] = this._st[1] = -1;
    this._kT = this._tT = this._dT = -1;
    this.lean = 0; this.roll = 0;
    this.animate(0, 0, false);
    this.sync();
  }

  highlight(color, opacity) {
    this.ringMat.color.setHex(color);
    this.ringMat.opacity = opacity;
    this.ring.visible = opacity > 0;
  }

  // Skip the reaction time: the ball is coming to this player (Ball.kick calls this on the receiver).
  anticipate(seconds = 1) {
    this._delay = 0;
    this._alert = Math.max(this._alert, seconds);
  }

  // Face a direction (the better hook than writing .heading: it is rate-capped like any other turn).
  turnTo(yaw, hold = 0.6) {
    this._faceYaw = yaw;
    this._faceT = hold;
  }

  // Strike with the kicking foot; the ball leaves at `contact` seconds (Ball.kick delays the ball to match).
  playKick(dirYaw, contact = 0.16) {
    this._kT = 0;
    this._kYaw = dirYaw;
    this._kC = clamp(contact, 0.06, 0.3);
    this._tT = -1;
  }

  // Cushion an arriving ball: foot out, knee gives, foot draws back.
  playTrap() {
    if (this._kT >= 0 && this._kT < this._kC + 0.08) return;
    if (this._dT >= 0) return;
    this._tT = 0;
  }

  // Keeper's dive. side > 0 is the player's left (+x local), < 0 the right.
  playDive(side) {
    if (this._dT >= 0) return;
    this._dSide = side < 0 ? -1 : 1;
    this._dX = Math.cos(this.heading) * this._dSide;
    this._dZ = -Math.sin(this.heading) * this._dSide;
    this._dT = 0; this._dDone = 0;
    this._kT = this._tT = -1;
    this.vel.set(0, 0, 0);
  }

  get activity() {
    return this._dT >= 0 ? 'dive' : this._kT >= 0 ? 'kick' : this._tT >= 0 ? 'trap' : '';
  }

  step(dt, lookAt) {
    if (!(dt > 0)) { this.sync(); return; }
    if (dt > 0.1) dt = 0.1;
    const pos = this.pos, vel = this.vel;

    // ---- one-shot actions tick
    if (this._kT >= 0) { this._kT += dt; if (this._kT > this._kC + 0.2) this._kT = -1; }
    if (this._tT >= 0) { this._tT += dt; if (this._tT > 0.3) this._tT = -1; }
    let diving = false;
    if (this._dT >= 0) {
      this._dT += dt;
      const u = this._dT / 0.4;
      const want = 1.2 * easeOut(clamp(u, 0, 1));
      const dd = want - this._dDone;
      if (dd > 0) { pos.x += this._dX * dd; pos.z += this._dZ * dd; this._dDone = want; }
      if (this._dT > 0.9) { if (this._dT > 1) this._dT = -1; } else diving = true;
      vel.set(0, 0, 0);
    }

    // ---- what this player has decided to run to. A big change of plan takes a moment to register
    // (personal reaction time) and is then followed through a low-pass, so nobody moves in lockstep.
    const T = this.target;
    const jx = T.x - this._raw.x, jz = T.z - this._raw.z;
    if (jx * jx + jz * jz > 0.64 && this._alert <= 0 && this._delay <= 0) this._delay = this.reactT;
    this._raw.x = T.x; this._raw.z = T.z;
    if (this._alert > 0) this._alert -= dt;
    if (this._delay > 0) this._delay -= dt;
    else { this._bel.x = T.x; this._bel.z = T.z; }
    const kk = 1 - Math.exp(-dt / (this._alert > 0 ? 0.05 : this.tau));
    this._tgt.x += (this._bel.x - this._tgt.x) * kk;
    this._tgt.z += (this._bel.z - this._tgt.z) * kk;

    // ---- steer: accelerate towards a speed that lets us stop on the target
    const px = vel.x, pz = vel.z;
    if (!diving) {
      const dx = this._tgt.x - pos.x, dz = this._tgt.z - pos.z;
      const d = Math.hypot(dx, dz);
      const dead = this._alert > 0 ? 0.08 : 0.25;
      const vmax = this.maxSpeed * this.speedMul;
      const brake = this.accel * 1.35;
      // hysteresis: once settled on a target, it takes a real move (dead + 0.2) to get going again
      if (this._settled) { if (d > dead + 0.2) this._settled = false; }
      else if (d < dead) this._settled = true;
      let vdes = 0;
      if (!this._settled && d > dead) {
        const x = d - dead;
        vdes = Math.min(vmax, 3.2 * x, Math.sqrt(2 * brake * 0.8 * x));
      }
      const inv = d > 1e-6 ? 1 / d : 0;
      const ex = dx * inv * vdes - vel.x, ez = dz * inv * vdes - vel.z;
      const el = Math.hypot(ex, ez);
      const sp0 = Math.hypot(vel.x, vel.z);
      const amax = (vdes >= sp0 ? this.accel : brake) * dt;
      if (el > amax) { const s = amax / el; vel.x += ex * s; vel.z += ez * s; }
      else { vel.x += ex; vel.z += ez; }
      if (vdes === 0 && Math.hypot(vel.x, vel.z) < 0.03) { vel.x = 0; vel.z = 0; }
      pos.x += vel.x * dt;
      pos.z += vel.z * dt;
    }
    const speed = Math.hypot(vel.x, vel.z);
    const hs = Math.sin(this.heading), hc = Math.cos(this.heading);
    this._accFwd += (((vel.x - px) * hs + (vel.z - pz) * hc) / dt - this._accFwd) * Math.min(1, dt * 8);
    this._lastSpeed = speed;

    // ---- heading: run where you are going, otherwise square up to the ball; turns are rate-capped
    if (this._running) { if (speed < 1.2) this._running = false; }
    else if (speed > 2.0) this._running = true;
    if (this._faceT > 0) this._faceT -= dt;
    let want = this.heading, fast = false;
    if (diving) want = this.heading;
    else if (this._kT >= 0) { want = this._kYaw; fast = true; }
    else if (this._faceT > 0 && !this._running) want = this._faceYaw;
    else if (this._running) want = Math.atan2(vel.x, vel.z);
    else if (lookAt) {
      const lx = lookAt.x - pos.x, lz = lookAt.z - pos.z;
      if (lx * lx + lz * lz > 0.09) want = Math.atan2(lx, lz);
    }
    const cap = (fast ? 720 : speed >= 3 ? 300 : speed <= 1.5 ? 540 : lerp(540, 300, (speed - 1.5) / 1.5)) * DEG;
    const ANG_ACC = 4500 * DEG;
    const diff = wrap(want - this.heading);
    const wdes = Math.sign(diff) * Math.min(cap, Math.abs(diff) * 14, Math.sqrt(2 * ANG_ACC * 0.7 * Math.abs(diff)));
    const dw = wdes - this._yawRate, mdw = ANG_ACC * dt;
    this._yawRate += dw > mdw ? mdw : dw < -mdw ? -mdw : dw;
    this._yawRate = clamp(this._yawRate, -cap, cap);
    this.heading = wrap(this.heading + this._yawRate * dt);

    // ---- head: looks at the ball up to 70 degrees off the body, whatever the legs are doing
    let ht = 0;
    if (lookAt && !diving) {
      const lx = lookAt.x - pos.x, lz = lookAt.z - pos.z;
      if (lx * lx + lz * lz > 0.25) ht = clamp(wrap(Math.atan2(lx, lz) - this.heading), -70 * DEG, 70 * DEG);
    }
    const hd = (ht - this._headYaw) * Math.min(1, dt * 11), hm = 11 * dt;
    this._headYaw += hd > hm ? hm : hd < -hm ? -hm : hd;

    if (this.root.visible) {
      this._fs = true;
      this.animate(dt, speed, this.mood === 1);
    }
    this.sync();
  }

  // celebrate: arms up and a little jump. mood 2 (dejected) lets the head and shoulders drop.
  // Called by step() every frame, and by the replay with an explicit speed (feet then run straight ahead).
  animate(dt, speed, celebrate = false) {
    dt = dt > 0 ? Math.min(dt, 0.1) : 0;
    const live = this._fs;
    this._fs = false;
    const v = clamp(speed, 0, 9);
    const k8 = Math.min(1, dt * 8);
    this.cel += ((celebrate ? 1 : 0) - this.cel) * k8;
    this.dej += ((this.mood === 2 ? 1 : 0) - this.dej) * k8;
    const cel = this.cel, dej = this.dej;
    this._t += dt;
    const time = this._t;

    // Direction of travel in the heading frame (x = left, z = forward), and how far the gait has to account for.
    // Live, that is velocity * dt. Driven from outside (the replay moves .pos itself, at any playback speed) it is the
    // distance actually covered since the last call, so the feet stay planted whatever the replay speed.
    let mx = 0, mz = 1, adv = v * dt;
    const hs = Math.sin(this.heading), hc = Math.cos(this.heading);
    const pdx = this.pos.x - this._lpx, pdz = this.pos.z - this._lpz;
    this._lpx = this.pos.x; this._lpz = this.pos.z;
    if (live) {
      const sp = Math.hypot(this.vel.x, this.vel.z);
      if (sp > 0.05) { mz = (this.vel.x * hs + this.vel.z * hc) / sp; mx = (this.vel.x * hc - this.vel.z * hs) / sp; }
    } else {
      const dist = Math.hypot(pdx, pdz);
      adv = v > 0.05 && dist < 1.5 ? dist : 0;
      if (dist > 0.005) { mz = (pdx * hs + pdz * hc) / dist; mx = (pdx * hc - pdz * hs) / dist; }
    }
    if (dt > 0) {
      const yr = clamp(wrap(this.heading - this._prevH) / dt, -12, 12);
      this._yr += (yr - this._yr) * Math.min(1, dt * 10);
    }
    this._prevH = this.heading;

    // ---------------------------------------------------------------- actions (only while live)
    AW[0] = AW[1] = 0; AP[0] = AP[1] = 0;
    let dipA = 0, leanA = 0, armKick = 0, armTrap = 0, kickLeg = this.footed;
    let wDive = 0, diveRoll = 0, diveDrop = 0;
    if (live) {
      if (this._kT >= 0) {
        const t = this._kT, tc = this._kC, tb = 0.62 * tc;
        const w = t < 0.5 * tc ? sstep(0, 0.5 * tc, t) : t < tc + 0.08 ? 1 : 1 - sstep(tc + 0.08, tc + 0.2, t);
        let hip, knee;
        if (t < tb) { const e = easeOut(t / tb); hip = 0.9 * e; knee = 1.4 * e; }
        else if (t < tc) { const e = easeIn((t - tb) / (tc - tb)); hip = lerp(0.9, -0.5, e); knee = lerp(1.4, 0.15, e); }
        else { const e = easeOut(clamp((t - tc) / 0.1, 0, 1)); hip = lerp(-0.5, -1.15, e); knee = lerp(0.15, 0.3, e); }
        AW[kickLeg] = w; AH[kickLeg] = hip; AK[kickLeg] = knee; AP[kickLeg] = 0.5;
        leanA = w * (hip > 0 ? -0.1 * Math.min(hip, 1) : 0.08 * Math.min(-hip, 1.2));
        armKick = -hip * w; // + = kicking leg forward
        dipA += 0.025 * w;
      }
      if (this._tT >= 0) {
        const t = this._tT;
        const w = sstep(0, 0.07, t) * (1 - sstep(0.2, 0.28, t));
        let hip, knee;
        if (t < 0.1) { const e = easeOut(t / 0.1); hip = -0.65 * e; knee = 0.5 * e; }
        else { const e = clamp((t - 0.1) / 0.1, 0, 1); hip = lerp(-0.65, -0.2, e); knee = lerp(0.5, 0.9, e); }
        const tl = this.footed;
        if (w > AW[tl]) { AW[tl] = w; AH[tl] = hip; AK[tl] = knee; AP[tl] = 0.3; }
        dipA += 0.045 * w;
        leanA += 0.08 * w;
        armTrap = w;
      }
      if (this._dT >= 0) {
        const t = this._dT;
        const g = t < 0.3 ? easeOut(t / 0.3) : t < 0.42 ? 1 : 1 - sstep(0.42, 1, t);
        diveRoll = -this._dSide * 70 * DEG * g;
        diveDrop = -0.55 * (t < 0.45 ? sstep(0.18, 0.42, t) : 1 - sstep(0.45, 0.9, t));
        wDive = sstep(0, 0.15, t) * (1 - sstep(0.6, 1, t));
      }
    }

    // ---------------------------------------------------------------- gait
    const mv = sstep(0.15, 0.5, v);
    const Ls = (0.45 + 0.17 * v) * this.stride;         // metres per step
    this.gait += adv / Ls;
    if (this.gait > 1000) this.gait -= 1000;
    this.phase = this.gait * PI;
    const d0 = clamp(0.52 - 0.045 * (v - 1), 0.26, 0.55); // fraction of the stride a foot spends on the ground
    const S = Math.min(2 * d0 * Ls, 0.9);               // how far the pelvis travels over a planted foot
    const d = S / (2 * Ls);
    const lift = clamp(0.04 + 0.032 * v, 0.05, 0.26);
    const mfwd = -2 * (1 - d) * Ls;                      // swing foot leaves and lands moving at ground speed
    const zStart = -S * 0.5, zEnd = S * 0.5;
    // Standing feet stay where they were put while the body turns; past ~35 degrees the more twisted foot steps round.
    const ay = this._ay, st = this._st;
    for (let i = 0; i < 2; i++) {
      if (!live || mv > 0.5) { ay[i] = this.heading; st[i] = -1; continue; }
      if (st[i] >= 0) {
        st[i] += dt;
        const u = st[i] / 0.24;
        if (u >= 1) { st[i] = -1; ay[i] = this.heading; }
        else ay[i] = this.heading - this._ad[i] * (1 - u * u * (3 - 2 * u));
      } else if (st[1 - i] < 0 && Math.abs(wrap(this.heading - ay[i])) > 0.6
        && Math.abs(wrap(this.heading - ay[i])) >= Math.abs(wrap(this.heading - ay[1 - i]))) {
        st[i] = 0; this._ad[i] = wrap(this.heading - ay[i]);
      }
    }
    for (let i = 0; i < 2; i++) {
      const c = frac(this.gait * 0.5 + (i ? 0.5 : 0));
      let zp, fy = ANKLE, pitch = 0;
      if (c < d) zp = S * (0.5 - c / d);
      else {
        const s = (c - d) / (1 - d), s2 = s * s, s3 = s2 * s;
        zp = (2 * s3 - 3 * s2 + 1) * zStart + (s3 - 2 * s2 + s) * mfwd + (3 * s2 - 2 * s3) * zEnd + (s3 - s2) * mfwd;
        const b = s * (1 - s);
        fy = ANKLE + lift * 16 * b * b;
        // toe-down off the ground, toe-up coming in, never with a corner of the boot below the turf
        const h = fy - ANKLE;
        pitch = clamp(0.4 * Math.sin(TAU * s), -h * 11, h * 5);
      }
      const hx = (i ? 1 : -1) * HIP_X;
      // standing foot, rotated back against the turn so it stays put in the world
      const dev = wrap(this.heading - ay[i]), cd = Math.cos(dev), sd = Math.sin(dev);
      const bx = hx * 1.25, bz = i ? 0.05 : -0.04;
      let iy = ANKLE;
      if (st[i] >= 0) { const u = st[i] / 0.24, b = u * (1 - u); iy += 0.28 * b; }
      FX[i] = lerp(bx * cd - bz * sd, hx * 0.9 + mx * zp, mv);
      FZ[i] = lerp(bx * sd + bz * cd, mz * zp, mv);
      FY[i] = lerp(iy, fy, mv);
      FP[i] = pitch * mv;
    }
    // pelvis: as high as the legs allow at full stride, a bounce on top, a crouch under load
    const hGait = ANKLE + Math.sqrt(LEG_R * LEG_R - zEnd * zEnd) - (0.012 + 0.004 * Math.min(v, 6)) * Math.pow(Math.cos(PI * (this.gait - d)), 2);
    const breathe = Math.sin(time * 1.7);
    const hIdle = HIP_Y - 0.032 + 0.0025 * breathe;
    const hp = lerp(hIdle, hGait, mv) - dipA;
    const sway = lerp(Math.sin(time * 0.45) * 0.014, -0.014 * Math.cos(PI * (this.gait - d)), mv);
    const psi = 0.131 * sstep(0.8, 4, v) * Math.cos(PI * this.gait);

    // ---------------------------------------------------------------- body
    const pel = this.pelvis, spine = this.spine;
    pel.position.set(sway, hp, 0);
    pel.rotation.y = psi;
    const leanT = 0.18 * sstep(0.4, 6.8, v) + (live ? clamp(this._accFwd * 0.012, -0.05, 0.08) : 0) + leanA;
    this.lean += (leanT - this.lean) * Math.min(1, dt * 9);
    spine.rotation.x = this.lean + 0.22 * dej + 0.004 * breathe * (1 - mv);
    spine.rotation.y = -2 * psi;
    spine.rotation.z = -sway * 0.8;
    spine.position.y = 0.003 * breathe * (1 - mv);
    const head = this.head;
    head.rotation.x = -this.lean * 0.8 + 0.5 * dej + 0.03 * Math.sin(time * 0.8) * (1 - mv);
    head.rotation.y = this._headYaw + psi * 0.9 + Math.sin(time * 0.37) * 0.05 * (1 - mv);
    head.rotation.z = 0;
    head.position.y = 0.72 - 0.05 * dej;

    // arms: swing against the legs, up for a goal, limp when down, out for balance
    const swingA = (0.2 + 0.075 * v) * mv * (1 - 0.5 * dej) * (1 - cel);
    const zn = 1 / (S * 0.5);
    const wave = Math.sin(time * 9.6) * 0.18;
    const idleSway = Math.sin(time * 1.1) * 0.03 * (1 - mv);
    for (let i = 0; i < 2; i++) {
      // arm i swings with the opposite leg; forward is a negative x rotation
      let sw = -clamp(FZ[1 - i] * zn, -1.25, 1.25) * swingA + (i ? -idleSway : idleSway);
      if (armKick !== 0) sw += (1 - i === kickLeg ? -1 : 1) * 0.8 * armKick;
      const up = (-2.6 + (i ? -wave : wave)) * cel;
      const arm = this.arms[i];
      arm.rotation.x = lerp(sw * (1 - cel) + up, -2.9, wDive);
      arm.rotation.z = (i ? 1 : -1) * (0.12 + 0.45 * cel + 0.35 * armTrap + 0.1 * wDive);
    }

    // ---------------------------------------------------------------- legs
    // ankle target relative to the hip, in the pelvis frame (the pelvis twists, the feet must not)
    const cp = Math.cos(psi), sp2 = Math.sin(psi);
    for (let i = 0; i < 2; i++) {
      const leg = this.legs[i];
      const hx = leg.side * HIP_X;
      let tx = FX[i] - sway - hx * cp;
      let ty = FY[i] - hp;
      let tz = FZ[i] + hx * sp2;
      const rx = tx * cp - tz * sp2, rz = tx * sp2 + tz * cp;
      this.solveLeg(leg, rx, ty, rz);
      let w = AW[i], hipA = AH[i], kneeA = AK[i], toe = AP[i];
      if (wDive > w) { w = wDive; hipA = 0.12; kneeA = 0.15; toe = 0.6; }
      if (w > 0) {
        _qb.setFromAxisAngle(AXX, hipA);
        leg.hip.quaternion.slerp(_qb, w);
        leg.knee.rotation.x = lerp(leg.knee.rotation.x, kneeA, w);
      }
      // boots stay level on the ground (pelvis-frame yaw cancels the twist), tipping toe-down in the air
      _qa.copy(leg.hip.quaternion).multiply(leg.knee.quaternion).invert();
      _qb.setFromAxisAngle(AXY, -psi);
      _qc.setFromAxisAngle(AXX, lerp(FP[i], toe, w));
      leg.boot.quaternion.copy(_qa).multiply(_qb).multiply(_qc);
    }

    // ---------------------------------------------------------------- rig: roll into turns, hops, dives
    const rollT = clamp(-this._yr * v * 0.02, -12 * DEG, 12 * DEG);
    this.roll += (rollT - this.roll) * Math.min(1, dt * 10);
    this._ct += dt * cel;
    const hop = 0.13 * cel * Math.abs(Math.sin(this._ct * 4.5));
    const r = this.roll * (1 - wDive) + diveRoll;
    const ph = 0.9 * wDive;
    const rig = this.rig;
    rig.rotation.z = r;
    rig.position.set(ph * Math.sin(r), hop + ph * (1 - Math.cos(r)) + diveDrop, 0);
  }

  // Two-bone IK: put the ankle at (tx, ty, tz) relative to the hip, knee leading forward.
  solveLeg(leg, tx, ty, tz) {
    let d = Math.sqrt(tx * tx + ty * ty + tz * tz);
    const dmax = REACH * 0.9995;
    if (d > dmax) { const s = dmax / d; tx *= s; ty *= s; tz *= s; d = dmax; }
    if (d < 0.12) { d = 0.12; ty = -0.12; tx = tz = 0; }
    const inv = 1 / d;
    const nx = tx * inv, ny = ty * inv, nz = tz * inv;
    const cosG = clamp((THIGH * THIGH + d * d - SHIN * SHIN) / (2 * THIGH * d), -1, 1);
    const sinG = Math.sqrt(1 - cosG * cosG);
    const cosK = clamp((THIGH * THIGH + SHIN * SHIN - d * d) / (2 * THIGH * SHIN), -1, 1);
    // pole: forward, made perpendicular to the leg line
    let qx = -nz * nx, qy = -nz * ny, qz = 1 - nz * nz;
    let ql = Math.sqrt(qx * qx + qy * qy + qz * qz);
    if (ql < 1e-4) { qx = 0; qy = 1; qz = 0; ql = 1; }
    qx /= ql; qy /= ql; qz /= ql;
    // thigh runs along u1; the hip frame has -y along it and +z in the leg plane, towards the knee side
    const ux = cosG * nx + sinG * qx, uy = cosG * ny + sinG * qy, uz = cosG * nz + sinG * qz;
    _ay.set(-ux, -uy, -uz);
    _az.set(-sinG * nx + cosG * qx, -sinG * ny + cosG * qy, -sinG * nz + cosG * qz);
    _ax.crossVectors(_ay, _az);
    _m.makeBasis(_ax, _ay, _az);
    leg.hip.quaternion.setFromRotationMatrix(_m);
    leg.knee.rotation.x = PI - Math.acos(cosK);
  }

  sync() {
    this.root.position.set(this.pos.x, 0, this.pos.z);
    this.root.rotation.y = this.heading;
    this.ring.visible = this.ringMat.opacity > 0.002;
  }

  setVisible(v) { this.root.visible = v; }
}

// ---------------------------------------------------------------------------------------------
// Ball
// ---------------------------------------------------------------------------------------------
const KICK_CONTACT = 0.16; // s from the start of a kick to the boot meeting the ball
const GROUND_END = 0.35;   // a rolling pass is still doing 35% of its opening speed on arrival
const G_A = 2 / (1 + GROUND_END), G_B = (1 - GROUND_END) / 2;

export class Ball {
  constructor(scene) {
    const c = canvas2d(256, 128);
    let map = null;
    if (c) {
      const g = c.getContext('2d');
      g.fillStyle = '#f6f5ef'; g.fillRect(0, 0, 256, 128);
      g.fillStyle = '#17191c';
      for (let i = 0; i < 14; i++) {
        const x = (i * 37) % 256, y = 18 + ((i * 53) % 96);
        g.beginPath();
        for (let k = 0; k < 5; k++) {
          const a = (k / 5) * TAU;
          g.lineTo(x + Math.cos(a) * 11, y + Math.sin(a) * 11);
        }
        g.fill();
      }
      map = new THREE.CanvasTexture(c);
      map.colorSpace = THREE.SRGBColorSpace;
    }
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(BALL_R, 20, 14), new THREE.MeshLambertMaterial(map ? { map } : { color: 0xf6f5ef }));
    this.shadow = new THREE.Mesh(geo.shadow, shadowMat);
    this.shadow.scale.setScalar(0.3);
    this.shadow.rotation.x = -PI / 2;
    this.shadow.position.y = 0.011;
    scene.add(this.mesh, this.shadow);
    this.pos = new THREE.Vector3(0, BALL_R, 0);
    this.flight = null;
    // World hands over everyone on the pitch so kicks and arrivals can be given a body
    this.players = [];
    this._spin = new THREE.Vector3();
  }

  // The player standing closest to (x, z) within r, visible or not (an invisible one is the viewer's own body).
  nearest(x, z, r, skip = null) {
    const ps = this.players;
    let best = null, bd = r * r;
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      if (p === skip) continue;
      const dx = p.pos.x - x, dz = p.pos.z - z, d2 = dx * dx + dz * dz;
      if (d2 < bd) { bd = d2; best = p; }
    }
    return best;
  }

  // ground pass or lofted pass from a to b, speed in m/s (the average over the flight)
  kick(from, to, speed, loft = 0) {
    const dist = Math.hypot(to.x - from.x, to.z - from.z);
    const dur = Math.max(0.25, dist / Math.max(0.5, speed));
    const f = {
      from: from.clone(), to: to.clone(), t: 0, dur, loft,
      wait: 0, stage: 0, speed: dist / dur, kicker: null,
    };
    f.from.y = BALL_R; f.to.y = BALL_R;
    this.flight = f;
    // Whoever is standing on the ball strikes it; the ball waits for the boot (the arrival time does not change).
    const k = this.nearest(from.x, from.z, 1.6);
    if (k && k.root.visible) {
      f.kicker = k;
      f.wait = Math.min(KICK_CONTACT, dur * 0.3);
      f.kx = k.pos.x; f.kz = k.pos.z;
      k.playKick(Math.atan2(to.x - from.x, to.z - from.z), f.wait);
    } else if (k) f.kicker = k;
    // The man the ball is meant for starts moving at once.
    const r = this.nearest(to.x, to.z, 6, f.kicker);
    if (r && r.root.visible) r.anticipate(dur + 0.3);
  }

  update(dt) {
    const f = this.flight;
    if (!f) return false;
    f.t += dt;
    const left = f.dur - f.t;
    if (f.stage < 1 && left <= 0.4) { f.stage = 1; if (f.speed > 20) this.keeperCheck(f); }
    if (f.stage < 2 && left <= 0.2) { f.stage = 2; this.reception(f); }

    const from = f.from, to = f.to, pos = this.pos;
    const px = pos.x, py = pos.y, pz = pos.z;
    const air = f.loft > 0.05;
    if (f.t >= f.dur) {
      pos.set(to.x, BALL_R, to.z);
      this.flight = null;
      this.spin(px, py, pz, f, dt);
      this.sync();
      return true;
    }
    if (f.t < f.wait) {
      // still at his feet, carried along with him until the boot meets it
      const k = f.kicker;
      from.x += k.pos.x - f.kx; from.z += k.pos.z - f.kz;
      f.kx = k.pos.x; f.kz = k.pos.z;
      pos.x = from.x; pos.z = from.z;
      this.sync();
      return false;
    }
    const u = clamp((f.t - f.wait) / (f.dur - f.wait), 0, 1);
    const s = air ? u : G_A * (u - G_B * u * u);
    pos.x = from.x + (to.x - from.x) * s;
    pos.z = from.z + (to.z - from.z) * s;
    pos.y = BALL_R + (air ? 4 * f.loft * u * (1 - u) : 0);
    this.spin(px, py, pz, f, dt);
    this.sync();
    return false;
  }

  // roll by distance over radius about the travel axis; a lofted ball carries backspin instead
  spin(px, py, pz, f, dt) {
    const dx = f.to.x - f.from.x, dz = f.to.z - f.from.z;
    const len = Math.hypot(dx, dz);
    if (len < 1e-4) return;
    this._spin.set(dz / len, 0, -dx / len);
    if (f.loft > 0.05) {
      if (f.t > f.wait) this.mesh.rotateOnWorldAxis(this._spin, -14 * dt);
    } else {
      const moved = Math.hypot(this.pos.x - px, this.pos.z - pz);
      if (moved > 0) this.mesh.rotateOnWorldAxis(this._spin, moved / BALL_R);
    }
  }

  // A hard shot heading for a keeper's side of the goal: he goes for it.
  keeperCheck(f) {
    const ps = this.players;
    let gk = null, bd = 56;
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      if (p.slot !== 'GK' || !p.root.visible) continue;
      const dx = p.pos.x - f.to.x, dz = p.pos.z - f.to.z, d2 = dx * dx + dz * dz;
      if (d2 < bd) { bd = d2; gk = p; }
    }
    if (!gk) return;
    const lat = (f.to.x - gk.pos.x) * Math.cos(gk.heading) - (f.to.z - gk.pos.z) * Math.sin(gk.heading);
    if (Math.abs(lat) >= 0.8) gk.playDive(lat);
  }

  // About to arrive: whoever it arrives at gets his foot out.
  reception(f) {
    const p = this.nearest(f.to.x, f.to.z, 1.8, f.kicker);
    if (!p || !p.root.visible) return;
    if (p.slot === 'GK' && f.speed > 18) {
      const lat = (f.to.x - p.pos.x) * Math.cos(p.heading) - (f.to.z - p.pos.z) * Math.sin(p.heading);
      if (Math.abs(lat) >= 0.8) { p.playDive(lat); return; }
    }
    p.playTrap();
  }

  timeLeft() { return this.flight ? Math.max(0, this.flight.dur - this.flight.t) : 0; }

  set(x, z, y = BALL_R) {
    this.pos.set(x, y, z);
    this.flight = null;
    this.sync();
  }

  sync() {
    this.mesh.position.copy(this.pos);
    this.shadow.position.set(this.pos.x, 0.011, this.pos.z);
    this.shadow.scale.setScalar(0.3 * (1 - Math.min(0.5, (this.pos.y - BALL_R) * 0.16)));
  }
}

import * as THREE from 'three';

const SKIN = [0xf1c7a5, 0xd9a47e, 0xb07a52, 0x8a5a3a, 0x5e3b25];
const HAIR = [0x1a1410, 0x3b2a1c, 0x6b4a2a, 0x0e0e0e, 0xa88a5a];

const geo = {
  torso: new THREE.CapsuleGeometry(0.2, 0.42, 4, 10),
  shorts: new THREE.CylinderGeometry(0.21, 0.23, 0.26, 10),
  thigh: new THREE.CapsuleGeometry(0.085, 0.32, 3, 8),
  shin: new THREE.CapsuleGeometry(0.07, 0.34, 3, 8),
  boot: new THREE.BoxGeometry(0.11, 0.07, 0.26),
  arm: new THREE.CapsuleGeometry(0.06, 0.48, 3, 8),
  head: new THREE.SphereGeometry(0.12, 14, 10),
  hair: new THREE.SphereGeometry(0.125, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
  number: new THREE.PlaneGeometry(0.26, 0.26),
  shadow: new THREE.CircleGeometry(0.45, 20),
  ring: new THREE.RingGeometry(0.62, 0.8, 32),
};
geo.thigh.translate(0, -0.21, 0);
geo.shin.translate(0, -0.22, 0);
geo.arm.translate(0, -0.27, 0);

const matCache = new Map();
const lambert = (hex) => {
  if (!matCache.has(hex)) matCache.set(hex, new THREE.MeshLambertMaterial({ color: hex }));
  return matCache.get(hex);
};
const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35, depthWrite: false });
const bootMat = lambert(0x111111);

function numberTexture(n, color) {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = color;
  g.font = '800 104px "Barlow Condensed", sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(String(n), 64, 70);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class Player {
  constructor(scene, { kit, number, team, slot }) {
    this.team = team;
    this.slot = slot;
    this.number = number;
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.target = new THREE.Vector3();
    this.heading = 0;
    this.maxSpeed = 6.5;
    this.phase = Math.random() * 10;
    this.wobble = Math.random() * 100;
    this.mood = 0; // 0 normal, 1 celebrating, 2 dejected
    this.cel = 0;
    this.dej = 0;

    const root = new THREE.Group();
    const body = new THREE.Group();
    root.add(body);
    const skin = lambert(SKIN[(Math.random() * SKIN.length) | 0]);
    const shirt = lambert(kit.shirt), shorts = lambert(kit.shorts), socks = lambert(kit.socks);

    const torso = new THREE.Mesh(geo.torso, shirt);
    torso.position.y = 1.22;
    torso.scale.set(1.05, 1, 0.72);
    body.add(torso);
    const sh = new THREE.Mesh(geo.shorts, shorts);
    sh.position.y = 0.88;
    sh.scale.z = 0.75;
    body.add(sh);
    const head = new THREE.Mesh(geo.head, skin);
    head.position.y = 1.68;
    body.add(head);
    this.head = head;
    const hair = new THREE.Mesh(geo.hair, lambert(HAIR[(Math.random() * HAIR.length) | 0]));
    hair.position.y = 1.7;
    hair.rotation.x = -0.25;
    body.add(hair);
    this.hair = hair;

    const mkLeg = (side) => {
      const hip = new THREE.Group();
      hip.position.set(side * 0.1, 0.84, 0);
      const thigh = new THREE.Mesh(geo.thigh, skin);
      hip.add(thigh);
      const knee = new THREE.Group();
      knee.position.y = -0.42;
      const shin = new THREE.Mesh(geo.shin, socks);
      knee.add(shin);
      const boot = new THREE.Mesh(geo.boot, bootMat);
      boot.position.set(0, -0.44, 0.05);
      knee.add(boot);
      hip.add(knee);
      body.add(hip);
      return { hip, knee };
    };
    const mkArm = (side) => {
      const s = new THREE.Group();
      s.position.set(side * 0.27, 1.45, 0);
      const a = new THREE.Mesh(geo.arm, skin);
      s.add(a);
      // short sleeve
      const sleeve = new THREE.Mesh(geo.thigh, shirt);
      sleeve.scale.set(0.9, 0.42, 0.9);
      s.add(sleeve);
      s.rotation.z = side * 0.12;
      body.add(s);
      return s;
    };
    this.legs = [mkLeg(-1), mkLeg(1)];
    this.arms = [mkArm(-1), mkArm(1)];

    const tex = numberTexture(number, kit.number);
    const numMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
    const back = new THREE.Mesh(geo.number, numMat);
    back.position.set(0, 1.28, -0.155);
    back.rotation.y = Math.PI;
    body.add(back);
    const front = new THREE.Mesh(geo.number, numMat);
    front.scale.setScalar(0.45);
    front.position.set(0.07, 1.36, 0.155);
    body.add(front);

    const shadow = new THREE.Mesh(geo.shadow, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.012;
    root.add(shadow);

    this.ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false });
    this.ring = new THREE.Mesh(geo.ring, this.ringMat);
    this.ring.rotation.x = -Math.PI / 2;
    this.ring.position.y = 0.02;
    root.add(this.ring);

    this.root = root;
    this.body = body;
    scene.add(root);
  }

  place(x, z) {
    this.pos.set(x, 0, z);
    this.target.copy(this.pos);
    this.vel.set(0, 0, 0);
    this.mood = 0; this.cel = 0; this.dej = 0;
    this.sync();
  }

  highlight(color, opacity) {
    this.ringMat.color.setHex(color);
    this.ringMat.opacity = opacity;
  }

  step(dt, lookAt) {
    const to = this.target.clone().sub(this.pos);
    to.y = 0;
    const d = to.length();
    // arrive: slow down inside 3 m so players settle instead of orbiting the target
    const desired = d > 0.05 ? to.multiplyScalar(Math.min(this.maxSpeed, d * 1.6) / d) : to.set(0, 0, 0);
    const accel = 9;
    const dv = desired.sub(this.vel);
    const dvl = dv.length();
    if (dvl > accel * dt) dv.multiplyScalar((accel * dt) / dvl);
    this.vel.add(dv);
    this.pos.addScaledVector(this.vel, dt);
    const speed = this.vel.length();
    let want = this.heading;
    if (speed > 1.6) want = Math.atan2(this.vel.x, this.vel.z);
    else if (lookAt) want = Math.atan2(lookAt.x - this.pos.x, lookAt.z - this.pos.z);
    let diff = want - this.heading;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    this.heading += diff * Math.min(1, dt * 7);
    this.animate(dt, speed, this.mood === 1);
    this.sync();
  }

  // celebrate: arms up and a little jump. mood 2 (dejected) lets the head and shoulders drop.
  animate(dt, speed, celebrate = false) {
    const k = Math.min(1, dt * 8);
    this.cel += ((celebrate ? 1 : 0) - this.cel) * k;
    this.dej += ((this.mood === 2 ? 1 : 0) - this.dej) * k;
    const c = this.cel, dj = this.dej;
    this.phase += dt * (3 + speed * 1.55);
    const amp = Math.min(1, speed / 6) * 0.85;
    const s = Math.sin(this.phase);
    this.legs[0].hip.rotation.x = s * amp;
    this.legs[1].hip.rotation.x = -s * amp;
    this.legs[0].knee.rotation.x = Math.max(0, -Math.cos(this.phase)) * amp * 1.3 + 0.08;
    this.legs[1].knee.rotation.x = Math.max(0, Math.cos(this.phase)) * amp * 1.3 + 0.08;
    const swing = s * amp * 0.9 * (1 - 0.5 * dj);
    const wave = Math.sin(this.phase * 1.6) * 0.18;
    this.arms[0].rotation.x = -swing * (1 - c) + (-2.6 + wave) * c;
    this.arms[1].rotation.x = swing * (1 - c) + (-2.6 - wave) * c;
    this.arms[0].rotation.z = -(0.12 + 0.45 * c);
    this.arms[1].rotation.z = 0.12 + 0.45 * c;
    this.body.position.y = Math.abs(Math.cos(this.phase)) * amp * 0.06 + Math.abs(Math.sin(this.phase * 1.2)) * 0.14 * c;
    this.body.rotation.x = amp * 0.16 + 0.22 * dj;
    this.head.rotation.x = 0.5 * dj;
    this.head.position.y = 1.68 - 0.05 * dj;
    this.hair.position.y = 1.7 - 0.05 * dj;
  }

  sync() {
    this.root.position.set(this.pos.x, 0, this.pos.z);
    this.root.rotation.y = this.heading;
  }

  setVisible(v) { this.root.visible = v; }
}

export class Ball {
  constructor(scene) {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 128;
    const g = c.getContext('2d');
    g.fillStyle = '#f6f5ef'; g.fillRect(0, 0, 256, 128);
    g.fillStyle = '#17191c';
    for (let i = 0; i < 14; i++) {
      const x = (i * 37) % 256, y = 18 + ((i * 53) % 96);
      g.beginPath();
      for (let k = 0; k < 5; k++) {
        const a = (k / 5) * Math.PI * 2;
        g.lineTo(x + Math.cos(a) * 11, y + Math.sin(a) * 11);
      }
      g.fill();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 14), new THREE.MeshLambertMaterial({ map: tex }));
    this.shadow = new THREE.Mesh(geo.shadow, shadowMat);
    this.shadow.scale.setScalar(0.3);
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = 0.011;
    scene.add(this.mesh, this.shadow);
    this.pos = new THREE.Vector3(0, 0.11, 0);
    this.flight = null;
  }

  // ground pass or lofted pass from a to b, speed in m/s
  kick(from, to, speed, loft = 0) {
    const dist = Math.hypot(to.x - from.x, to.z - from.z);
    this.flight = { from: from.clone(), to: to.clone(), t: 0, dur: Math.max(0.25, dist / speed), loft };
    this.flight.from.y = 0.11; this.flight.to.y = 0.11;
  }

  update(dt) {
    if (!this.flight) return false;
    const f = this.flight;
    f.t += dt;
    const k = Math.min(1, f.t / f.dur);
    const prev = this.pos.clone();
    // ground passes lose a little pace as they roll
    this.pos.lerpVectors(f.from, f.to, f.loft ? k : k * (1.15 - 0.15 * k));
    this.pos.y = 0.11 + (f.loft ? Math.sin(Math.PI * k) * f.loft : 0);
    const moved = prev.distanceTo(this.pos);
    const axis = new THREE.Vector3(f.to.z - f.from.z, 0, -(f.to.x - f.from.x)).normalize();
    this.mesh.rotateOnWorldAxis(axis, moved / 0.11);
    this.sync();
    if (k >= 1) { this.flight = null; return true; }
    return false;
  }

  timeLeft() { return this.flight ? this.flight.dur - this.flight.t : 0; }

  set(x, z, y = 0.11) {
    this.pos.set(x, y, z);
    this.flight = null;
    this.sync();
  }

  sync() {
    this.mesh.position.copy(this.pos);
    this.shadow.position.set(this.pos.x, 0.011, this.pos.z);
  }
}

import * as THREE from 'three';
import { PITCH, GOAL } from './config.js';

const APRON = 6;

function pitchTexture() {
  const pxPerM = 18;
  const w = (PITCH.L + APRON * 2) * pxPerM, h = (PITCH.W + APRON * 2) * pxPerM;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = '#245a22';
  g.fillRect(0, 0, w, h);
  const stripes = 18, sw = (PITCH.L * pxPerM) / stripes;
  for (let i = 0; i < stripes; i++) {
    g.fillStyle = i % 2 ? '#2b6a28' : '#276124';
    g.fillRect(APRON * pxPerM + i * sw, 0, sw, h);
  }
  // grain
  const img = g.getImageData(0, 0, w, h);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 10;
    img.data[i] += n; img.data[i + 1] += n; img.data[i + 2] += n * 0.6;
  }
  g.putImageData(img, 0, 0);

  const X = (x) => (x + PITCH.HL + APRON) * pxPerM;
  const Y = (z) => (z + PITCH.HW + APRON) * pxPerM;
  const M = (m) => m * pxPerM;
  g.strokeStyle = 'rgba(245,245,238,0.92)';
  g.lineWidth = M(0.12);
  g.strokeRect(X(-PITCH.HL), Y(-PITCH.HW), M(PITCH.L), M(PITCH.W));
  g.beginPath(); g.moveTo(X(0), Y(-PITCH.HW)); g.lineTo(X(0), Y(PITCH.HW)); g.stroke();
  g.beginPath(); g.arc(X(0), Y(0), M(9.15), 0, Math.PI * 2); g.stroke();
  g.fillStyle = 'rgba(245,245,238,0.92)';
  for (const s of [-1, 1]) {
    const gx = s * PITCH.HL;
    g.strokeRect(Math.min(X(gx), X(gx - s * 16.5)), Y(-20.16), M(16.5), M(40.32));
    g.strokeRect(Math.min(X(gx), X(gx - s * 5.5)), Y(-9.16), M(5.5), M(18.32));
    g.beginPath(); g.arc(X(gx - s * 11), Y(0), M(0.2), 0, Math.PI * 2); g.fill();
    g.beginPath();
    const a = Math.acos(5.5 / 9.15);
    if (s > 0) g.arc(X(gx - 11), Y(0), M(9.15), Math.PI - a, Math.PI + a);
    else g.arc(X(gx + 11), Y(0), M(9.15), -a, a);
    g.stroke();
  }
  g.beginPath(); g.arc(X(0), Y(0), M(0.2), 0, Math.PI * 2); g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function goal(parent, side) {
  const mat = new THREE.MeshLambertMaterial({ color: 0xf4f4ef });
  const r = 0.06, gx = side * GOAL.x;
  const post = new THREE.CylinderGeometry(r, r, GOAL.height, 10);
  for (const z of [-GOAL.halfWidth, GOAL.halfWidth]) {
    const p = new THREE.Mesh(post, mat);
    p.position.set(gx, GOAL.height / 2, z);
    parent.add(p);
  }
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(r, r, GOAL.halfWidth * 2, 10), mat);
  bar.rotation.x = Math.PI / 2;
  bar.position.set(gx, GOAL.height, 0);
  parent.add(bar);
  // net: a box of lines
  const depth = 2, pts = [];
  const bx = gx + side * depth;
  for (let z = -GOAL.halfWidth; z <= GOAL.halfWidth + 0.01; z += 0.35) {
    pts.push(gx, GOAL.height, z, bx, GOAL.height * 0.6, z, bx, GOAL.height * 0.6, z, bx, 0, z);
  }
  for (let y = 0; y <= GOAL.height + 0.01; y += 0.35) {
    const xb = bx, yy = Math.min(y, GOAL.height * 0.6);
    pts.push(xb, yy, -GOAL.halfWidth, xb, yy, GOAL.halfWidth);
    pts.push(gx, y, -GOAL.halfWidth, xb, yy, -GOAL.halfWidth, gx, y, GOAL.halfWidth, xb, yy, GOAL.halfWidth);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  parent.add(new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0xdedfd8, transparent: true, opacity: 0.45 })));
}

function stands(parent) {
  const concrete = new THREE.MeshLambertMaterial({ color: 0x2a2d31 });
  const roofMat = new THREE.MeshLambertMaterial({ color: 0x15171a });
  const crowdGeo = new THREE.BoxGeometry(0.45, 0.6, 0.35);
  const crowdMat = new THREE.MeshLambertMaterial();
  const placements = [];
  const sides = [
    { cx: 0, cz: -(PITCH.HW + APRON + 2), len: PITCH.L + 20, rot: 0 },
    { cx: 0, cz: PITCH.HW + APRON + 2, len: PITCH.L + 20, rot: Math.PI },
    { cx: -(PITCH.HL + APRON + 2), cz: 0, len: PITCH.W + 8, rot: Math.PI / 2 },
    { cx: PITCH.HL + APRON + 2, cz: 0, len: PITCH.W + 8, rot: -Math.PI / 2 },
  ];
  const rows = 22, rowDepth = 0.85, rowRise = 0.48;
  for (const s of sides) {
    const grp = new THREE.Group();
    grp.position.set(s.cx, 0, s.cz);
    grp.rotation.y = s.rot;
    // rake: stepped slab rendered as one sloped box
    const deep = rows * rowDepth, high = rows * rowRise;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(s.len, 0.4, Math.hypot(deep, high)), concrete);
    slab.rotation.x = Math.atan2(high, deep);
    slab.position.set(0, 1.2 + high / 2, -deep / 2);
    grp.add(slab);
    const wall = new THREE.Mesh(new THREE.BoxGeometry(s.len, 1.1, 0.3), new THREE.MeshLambertMaterial({ color: 0x101214 }));
    wall.position.set(0, 0.55, 0.2);
    grp.add(wall);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(s.len, 0.5, deep + 6), roofMat);
    roof.position.set(0, high + 7, -deep / 2 + 1);
    roof.rotation.x = -0.08;
    grp.add(roof);
    const back = new THREE.Mesh(new THREE.BoxGeometry(s.len, high + 8, 0.5), roofMat);
    back.position.set(0, (high + 8) / 2, -deep - 0.6);
    grp.add(back);
    parent.add(grp);
    grp.updateMatrixWorld();
    for (let r = 0; r < rows; r++) {
      for (let x = -s.len / 2 + 0.5; x < s.len / 2 - 0.5; x += 0.55) {
        if (Math.random() < 0.18) continue;
        const local = new THREE.Vector3(x + (Math.random() - 0.5) * 0.1, 1.55 + r * rowRise + 0.3, -0.4 - r * rowDepth);
        placements.push(local.applyMatrix4(grp.matrixWorld));
      }
    }
  }
  const crowd = new THREE.InstancedMesh(crowdGeo, crowdMat, placements.length);
  const m = new THREE.Matrix4(), col = new THREE.Color();
  const palette = [0xff7a1a, 0xff7a1a, 0x15171a, 0xd9d6cc, 0x3a3f46, 0x6b4b3a, 0xb24a2a, 0x1f3f8c, 0x2a2a2a];
  placements.forEach((p, i) => {
    m.makeRotationY(Math.atan2(-p.x, -p.z) + (Math.random() - 0.5) * 0.4);
    m.setPosition(p);
    crowd.setMatrixAt(i, m);
    crowd.setColorAt(i, col.setHex(palette[(Math.random() * palette.length) | 0]).multiplyScalar(0.55 + Math.random() * 0.45));
  });
  parent.add(crowd);
  return crowd;
}

function floodlights(parent) {
  const poleMat = new THREE.MeshLambertMaterial({ color: 0x3a3d42 });
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xfffbea });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * (PITCH.HL + 14), z = sz * (PITCH.HW + 26);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, 42, 8), poleMat);
    pole.position.set(x, 21, z);
    parent.add(pole);
    const head = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 0.6), lampMat);
    head.position.set(x, 43, z);
    head.lookAt(0, 0, 0);
    parent.add(head);
  }
}

function boards(parent) {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = '#0d0f11'; g.fillRect(0, 0, 1024, 64);
  g.fillStyle = '#ff7a1a';
  g.font = '700 44px "Barlow Condensed", sans-serif';
  g.textBaseline = 'middle';
  for (let x = 20; x < 1024; x += 256) g.fillText('HEADS UP', x, 34);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  const mat = new THREE.MeshBasicMaterial({ map: tex });
  const mk = (len, x, z, rot) => {
    const t = tex.clone(); t.needsUpdate = true; t.repeat.set(len / 40, 1);
    const b = new THREE.Mesh(new THREE.PlaneGeometry(len, 0.9), new THREE.MeshBasicMaterial({ map: t }));
    b.position.set(x, 0.45, z); b.rotation.y = rot;
    parent.add(b);
  };
  mk(PITCH.L, 0, -(PITCH.HW + 4), 0);
  mk(PITCH.L, 0, PITCH.HW + 4, Math.PI);
  mk(PITCH.W - 12, -(PITCH.HL + 4), 0, Math.PI / 2);
  mk(PITCH.W - 12, PITCH.HL + 4, 0, -Math.PI / 2);
  mat.dispose();
}

// Backdrop + fog per scene "mode". The locker room is a dark warm interior with no fog.
const ENV = {
  stadium: { bg: 0x07090b, fog: { color: 0x07090b, near: 120, far: 260 } },
  locker: { bg: 0x0d0a08, fog: null },
};

/** Switch scene.background / scene.fog between 'stadium' and 'locker'. */
export function setEnvironment(scene, mode = 'stadium') {
  const e = ENV[mode] || ENV.stadium;
  scene.background = new THREE.Color(e.bg);
  scene.fog = e.fog ? new THREE.Fog(e.fog.color, e.fog.near, e.fog.far) : null;
}

/**
 * Builds the night stadium. Every mesh and light it adds lives under the returned group, so
 * `stadium.group.visible = false` hides the whole stadium (lights included).
 * Returns { group, lights, crowd, setEnvironment(mode) }.
 */
export function buildStadium(scene) {
  const group = new THREE.Group();
  group.name = 'stadium';
  scene.add(group);
  setEnvironment(scene, 'stadium');

  const hemi = new THREE.HemisphereLight(0xdfe6ee, 0x1c2a18, 1.15);
  const sun = new THREE.DirectionalLight(0xfff6e6, 1.6);
  sun.position.set(-30, 60, 20);
  group.add(hemi, sun);

  const tex = pitchTexture();
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(PITCH.L + APRON * 2, PITCH.W + APRON * 2),
    new THREE.MeshLambertMaterial({ map: tex }),
  );
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);
  const outer = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshLambertMaterial({ color: 0x1a2a19 }));
  outer.rotation.x = -Math.PI / 2;
  outer.position.y = -0.02;
  group.add(outer);

  goal(group, 1); goal(group, -1);
  const crowd = stands(group);
  floodlights(group);
  boards(group);

  return { group, lights: [hemi, sun], crowd, setEnvironment: (mode) => setEnvironment(scene, mode) };
}

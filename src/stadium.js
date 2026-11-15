import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { PITCH, GOAL } from './config.js';

const APRON = 6;

/*
 * Night stadium. Cheap on purpose (Quest 3): about 15 draw calls and ~35k triangles, of which the crowd is 26k.
 *   sky dome        near-black zenith -> warm dark-grey haze; matches the fog so the ground melts into it
 *   structure       one merged Lambert mesh (slabs, boards' walls, goal frames, floodlight poles)
 *   baked           one merged Basic mesh: roofs (lit undersides, ribs, lip lamps), back walls, lamp grids
 *   crowd           one InstancedMesh of 2-triangle head+shoulders cards, per-instance colour
 *   floodlights     lamp grids + an additive glow sprite per head + soft crossed-quad beam hints
 */

// ---------------------------------------------------------------- merge helper
const UNIT_BOX = new THREE.BoxGeometry(1, 1, 1);
const _m = new THREE.Matrix4(), _nm = new THREE.Matrix3(), _v = new THREE.Vector3(), _n = new THREE.Vector3();
const _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _s = new THREE.Vector3(), _c = new THREE.Color();
const _geo = new Map();
const cached = (key, make) => { let g = _geo.get(key); if (!g) { g = make(); _geo.set(key, g); } return g; };

/** Merges transformed geometries into one vertex-coloured BufferGeometry. */
class Mesher {
  constructor() { this.p = []; this.n = []; this.u = []; this.c = []; this.i = []; this.count = 0; this.frame = new THREE.Matrix4(); }

  // colour: number | Color | fn(localPos, localNormal) -> {r,g,b}, where "local" is the frame-local space
  add(geo, matrix, color, uvScale = 1) {
    _m.multiplyMatrices(this.frame, matrix);
    _nm.getNormalMatrix(_m);
    const pos = geo.attributes.position, nor = geo.attributes.normal, uv = geo.attributes.uv;
    const fn = typeof color === 'function' ? color : null;
    const flat = fn ? null : _c.set(color);
    const fr = new THREE.Matrix4().copy(this.frame).invert();
    const base = this.count;
    for (let i = 0; i < pos.count; i++) {
      _v.fromBufferAttribute(pos, i).applyMatrix4(_m);
      _n.fromBufferAttribute(nor, i).applyMatrix3(_nm).normalize();
      let r, g, b;
      if (fn) {
        const lp = _v.clone().applyMatrix4(fr);
        const ln = _n.clone().transformDirection(fr);
        const o = fn(lp, ln); r = o.r; g = o.g; b = o.b;
      } else { r = flat.r; g = flat.g; b = flat.b; }
      this.p.push(_v.x, _v.y, _v.z);
      this.n.push(_n.x, _n.y, _n.z);
      this.u.push(uv.getX(i) * uvScale, uv.getY(i));
      this.c.push(r, g, b);
    }
    if (geo.index) for (let i = 0; i < geo.index.count; i++) this.i.push(base + geo.index.getX(i));
    else for (let i = 0; i < pos.count; i++) this.i.push(base + i);
    this.count += pos.count;
  }

  box(x, y, z, w, h, d, color, rx = 0, ry = 0, rz = 0) {
    _p.set(x, y, z); _q.setFromEuler(_e.set(rx, ry, rz)); _s.set(w, h, d);
    this.add(UNIT_BOX, new THREE.Matrix4().compose(_p, _q, _s), color);
  }

  cyl(x, y, z, rt, rb, h, seg, color, rx = 0, rz = 0) {
    const g = cached(`cyl${rt}|${rb}|${seg}`, () => new THREE.CylinderGeometry(rt, rb, 1, seg, 1));
    _p.set(x, y, z); _q.setFromEuler(_e.set(rx, 0, rz)); _s.set(1, h, 1);
    this.add(g, new THREE.Matrix4().compose(_p, _q, _s), color);
  }

  geo(g, matrix, color, uvScale = 1) { this.add(g, matrix, color, uvScale); }

  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.u, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
    g.setIndex(this.count > 65535 ? new THREE.Uint32BufferAttribute(this.i, 1) : new THREE.Uint16BufferAttribute(this.i, 1));
    g.computeBoundingSphere();
    return g;
  }
}

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a, b, t) => a + (b - a) * t;
const _out = { r: 0, g: 0, b: 0 };
// warm-grey with a tint multiplier; k is a display (sRGB-ish) level, vertex colours are linear
function warm(k, tint = [1, 0.93, 0.8]) {
  _out.r = Math.pow(k * tint[0], 2.2); _out.g = Math.pow(k * tint[1], 2.2); _out.b = Math.pow(k * tint[2], 2.2);
  return _out;
}

// ---------------------------------------------------------------- pitch
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

// ---------------------------------------------------------------- goals (posts/bars merged into the structure mesh, nets into one line mesh)
function goalFrames(mesh, netPts) {
  const r = 0.06;
  for (const side of [-1, 1]) {
    const gx = side * GOAL.x;
    mesh.frame.identity();
    for (const z of [-GOAL.halfWidth, GOAL.halfWidth]) mesh.cyl(gx, GOAL.height / 2, z, r, r, GOAL.height, 10, 0xf4f4ef);
    mesh.cyl(gx, GOAL.height, 0, r, r, GOAL.halfWidth * 2, 10, 0xf4f4ef, Math.PI / 2);
    // net: a box of lines
    const depth = 2, bx = gx + side * depth;
    for (let z = -GOAL.halfWidth; z <= GOAL.halfWidth + 0.01; z += 0.35) {
      netPts.push(gx, GOAL.height, z, bx, GOAL.height * 0.6, z, bx, GOAL.height * 0.6, z, bx, 0, z);
    }
    for (let y = 0; y <= GOAL.height + 0.01; y += 0.35) {
      const yy = Math.min(y, GOAL.height * 0.6);
      netPts.push(bx, yy, -GOAL.halfWidth, bx, yy, GOAL.halfWidth);
      netPts.push(gx, y, -GOAL.halfWidth, bx, yy, -GOAL.halfWidth, gx, y, GOAL.halfWidth, bx, yy, GOAL.halfWidth);
    }
  }
}

// ---------------------------------------------------------------- stands
const ROWS = 22, ROW_DEPTH = 0.85, ROW_RISE = 0.48;
const DEEP = ROWS * ROW_DEPTH, HIGH = ROWS * ROW_RISE;
const ROOF_Y = HIGH + 7, ROOF_Z = -DEEP / 2 + 1, ROOF_D = DEEP + 6, ROOF_TILT = -0.08;

function standSides() {
  return [
    { cx: 0, cz: -(PITCH.HW + APRON + 2), len: PITCH.L + 20, rot: 0 },
    { cx: 0, cz: PITCH.HW + APRON + 2, len: PITCH.L + 20, rot: Math.PI },
    { cx: -(PITCH.HL + APRON + 2), cz: 0, len: PITCH.W + 8, rot: Math.PI / 2 },
    { cx: PITCH.HL + APRON + 2, cz: 0, len: PITCH.W + 8, rot: -Math.PI / 2 },
  ];
}

// roof-local colour: the underside is lit by the floodlights and the pitch, brighter toward the front lip
function roofColor(len) {
  return (v, n) => {
    const t = clamp((v.z + ROOF_D / 2) / ROOF_D);
    if (n.y < -0.5) return warm(mix(0.05, 0.34, Math.pow(t, 1.4)));
    if (n.y > 0.5) return warm(0.05);
    if (n.z > 0.5) return warm(0.3);            // lip fascia, lit from the pitch side
    return warm(mix(0.07, 0.2, t));
  };
}

function buildStands(lit, baked) {
  const placements = [];
  const frame = new THREE.Matrix4();
  for (const s of standSides()) {
    frame.makeRotationY(s.rot).setPosition(s.cx, 0, s.cz);
    // ---- lit structure: the raked slab and the board wall in front
    lit.frame.copy(frame);
    lit.box(0, 1.2 + HIGH / 2, -DEEP / 2, s.len, 0.4, Math.hypot(DEEP, HIGH), 0x3a3631, Math.atan2(HIGH, DEEP));
    lit.box(0, 0.55, 0.2, s.len, 1.1, 0.3, 0x1c1a17);

    // ---- baked: back wall (dark behind the crowd, catching light toward the roof), pilasters
    baked.frame.copy(frame);
    const wallH = HIGH + 8;
    baked.box(0, wallH / 2, -DEEP - 0.6, s.len, wallH, 0.5, (v, n) => {
      if (n.z < 0.5) return warm(0.05);
      return warm(mix(0.07, 0.26, clamp((v.y - 8) / 10)));
    });
    const bays = Math.round(s.len / 9);
    for (let k = 0; k <= bays; k++) {
      const x = -s.len / 2 + (k * s.len) / bays;
      baked.box(x, wallH / 2, -DEEP - 0.25, 0.7, wallH, 0.35, (v, n) => warm(n.z > 0.5 ? mix(0.05, 0.14, clamp((v.y - 8) / 10)) : 0.04));
    }

    // ---- baked: the roof, in its own tilted frame (local y = 0 is the roof centre line, +z = toward the pitch)
    const roofFrame = new THREE.Matrix4().compose(new THREE.Vector3(0, ROOF_Y, ROOF_Z), new THREE.Quaternion().setFromEuler(new THREE.Euler(ROOF_TILT, 0, 0)), new THREE.Vector3(1, 1, 1));
    baked.frame.copy(frame).multiply(roofFrame);
    const rc = roofColor(s.len);
    baked.box(0, 0, 0, s.len, 0.5, ROOF_D, rc);
    // ribs: dark beams under the roof every 6 m so the structure reads from the pitch
    const ribs = Math.round(s.len / 6);
    for (let k = 0; k <= ribs; k++) {
      const x = -s.len / 2 + (k * s.len) / ribs;
      baked.box(x, -0.8, 0, 0.32, 1.1, ROOF_D - 0.4, (v, n) => {
        const t = clamp((v.z + ROOF_D / 2) / ROOF_D);
        if (n.y < -0.5) return warm(mix(0.03, 0.12, t));
        return warm(mix(0.05, 0.2, t));
      });
    }
    // two cross beams and the lip beam
    for (const z of [-ROOF_D * 0.18, ROOF_D * 0.16]) baked.box(0, -0.62, z, s.len, 0.5, 0.35, (v, n) => warm(n.y < -0.5 ? 0.07 : 0.15));
    baked.box(0, -0.3, ROOF_D / 2, s.len, 1.0, 0.3, (v, n) => warm(n.z > 0.5 ? 0.34 : 0.1));
    // lip lamps: a row of warm lamp bars along the underside of the front edge
    const bars = Math.floor(s.len / 3);
    for (let k = 0; k < bars; k++) {
      const x = -s.len / 2 + (k + 0.5) * (s.len / bars);
      baked.box(x, -0.82, ROOF_D / 2 - 0.5, 1.5, 0.12, 0.4, 0xfff0cc);
    }

    // ---- crowd seats
    frame.makeRotationY(s.rot).setPosition(s.cx, 0, s.cz);
    for (let r = 0; r < ROWS; r++) {
      for (let x = -s.len / 2 + 0.5; x < s.len / 2 - 0.5; x += 0.55) {
        if (Math.random() < 0.18) continue;
        const local = new THREE.Vector3(x + (Math.random() - 0.5) * 0.1, 1.97 + r * ROW_RISE, -0.4 - r * ROW_DEPTH);
        placements.push(local.applyMatrix4(frame));
      }
    }
  }
  return placements;
}

// head and shoulders silhouette, white so the per-instance colour carries; head a touch lighter than the body
function spectatorTexture() {
  const W = 64, H = 128;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  g.clearRect(0, 0, W, H);
  // torso with rounded shoulders
  const body = g.createLinearGradient(0, H * 0.42, 0, H);
  body.addColorStop(0, '#ffffff'); body.addColorStop(1, '#a8a8a8');
  g.fillStyle = body;
  g.beginPath();
  g.moveTo(W * 0.04, H);
  g.lineTo(W * 0.04, H * 0.62);
  g.quadraticCurveTo(W * 0.05, H * 0.46, W * 0.3, H * 0.44);
  g.lineTo(W * 0.7, H * 0.44);
  g.quadraticCurveTo(W * 0.95, H * 0.46, W * 0.96, H * 0.62);
  g.lineTo(W * 0.96, H);
  g.closePath(); g.fill();
  // neck
  g.fillStyle = '#9a9a9a';
  g.fillRect(W * 0.41, H * 0.34, W * 0.18, H * 0.14);
  // head
  g.fillStyle = '#eeeeee';
  g.beginPath(); g.ellipse(W / 2, H * 0.24, W * 0.2, H * 0.14, 0, 0, Math.PI * 2); g.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 2;
  return t;
}

function buildCrowd(placements) {
  const geo = new THREE.PlaneGeometry(0.5, 0.7);
  const mat = new THREE.MeshLambertMaterial({ map: spectatorTexture(), alphaTest: 0.5, alphaToCoverage: true, emissive: 0x1a1612 });
  const crowd = new THREE.InstancedMesh(geo, mat, placements.length);
  const m = new THREE.Matrix4(), col = new THREE.Color(), q = new THREE.Quaternion(), s = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
  const palette = [0xff7a1a, 0xff7a1a, 0xff7a1a, 0x1a1a1a, 0xd9d6cc, 0xd9d6cc, 0x4a4945, 0x6b4b3a, 0xb24a2a, 0xe8d9a8, 0x2e4a36];
  placements.forEach((p, i) => {
    q.setFromAxisAngle(up, Math.atan2(-p.x, -p.z) + (Math.random() - 0.5) * 0.4);
    const k = 0.92 + Math.random() * 0.2;
    s.set(k, k, 1);
    m.compose(p, q, s);
    crowd.setMatrixAt(i, m);
    crowd.setColorAt(i, col.setHex(palette[(Math.random() * palette.length) | 0]).multiplyScalar(0.55 + Math.random() * 0.45));
  });
  crowd.instanceMatrix.needsUpdate = true;
  crowd.instanceColor.needsUpdate = true;
  crowd.name = 'crowd';
  crowd.computeBoundingSphere();
  return crowd;
}

// ---------------------------------------------------------------- floodlights
const LIGHT_TARGETS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

function glowTexture() {
  const S = 128;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const img = g.createImageData(S, S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const nx = (x + 0.5) / S * 2 - 1, ny = (y + 0.5) / S * 2 - 1;
    const r = Math.hypot(nx, ny);
    const edge = Math.pow(clamp(1 - r), 2);
    const core = Math.exp(-Math.pow(r / 0.09, 2));
    const halo = 0.62 * Math.exp(-Math.pow(r / 0.36, 1.3));
    const a = clamp((core + halo) * edge * 1.15);
    const i = (y * S + x) * 4;
    img.data[i] = 255; img.data[i + 1] = 246; img.data[i + 2] = 226; img.data[i + 3] = a * 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Fake volumetric cone: alpha follows how squarely the surface faces the eye (soft edges, no hard rim) and fades along the length.
function beamMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, fog: false,
    uniforms: { color: { value: new THREE.Color(1.0, 0.93, 0.78) }, opacity: { value: 0.16 } },
    vertexShader: `
      attribute float fade;
      varying vec3 vN; varying vec3 vV; varying float vFade;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vN = normalize(mat3(modelMatrix) * normal);
        vV = cameraPosition - wp.xyz;
        vFade = fade;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      uniform vec3 color; uniform float opacity;
      varying vec3 vN; varying vec3 vV; varying float vFade;
      void main() {
        float f = abs(dot(normalize(vN), normalize(vV)));
        float a = pow(f, 2.2) * pow(vFade, 1.4) * opacity;
        gl_FragColor = vec4(color, a);
      }`,
  });
}

function buildFloodlights(lit, baked, group) {
  const glowMat = new THREE.SpriteMaterial({ map: glowTexture(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, fog: false, opacity: 0.95 });
  const sprites = [];
  const cones = [];
  const dummy = new THREE.Object3D();
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * (PITCH.HL + 14), z = sz * (PITCH.HW + 26), headY = 43;
    // pole
    lit.frame.identity();
    lit.cyl(x, 21, z, 0.5, 0.8, 42, 8, 0x55514a);
    // head: housing + a grid of lamp cells, aimed across the pitch
    const tx = -sx * 18, tz = -sz * 10;
    dummy.position.set(x, headY, z);
    dummy.lookAt(tx, 0, tz);
    dummy.updateMatrix();
    baked.frame.copy(dummy.matrix);
    baked.box(0, 0, 0, 8.6, 4.6, 0.9, 0x1e1c19);
    baked.box(0, 2.45, 0, 8.8, 0.3, 1.0, 0x3a3631);
    for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
      baked.box(-3.15 + col * 2.1, -1.4 + row * 1.4, 0.5, 1.8, 1.1, 0.12, 0xfffaea);
    }
    // glow card (camera-facing sprite) just in front of the lamps
    const dir = new THREE.Vector3(tx - x, -headY, tz - z).normalize();
    const sp = new THREE.Sprite(glowMat);
    sp.position.set(x, headY, z).addScaledVector(dir, 2);
    sp.scale.set(56, 56, 1);
    sp.renderOrder = 4;
    sp.frustumCulled = false;
    group.add(sp);
    sprites.push(sp);

    // beam hint: an open cone from the lamp toward the pitch (faded in the shader, see beamMaterial)
    const len = 92;
    const cone = new THREE.CylinderGeometry(1.6, 16, len, 20, 1, true);
    cone.deleteAttribute('uv');
    const fade = new Float32Array(cone.attributes.position.count);
    for (let i = 0; i < fade.length; i++) fade[i] = cone.attributes.position.getY(i) > 0 ? 1 : 0;   // top ring is at the lamp
    cone.setAttribute('fade', new THREE.BufferAttribute(fade, 1));
    const lampEnd = new THREE.Vector3(x, headY, z).addScaledVector(dir, 3);
    const mid = lampEnd.clone().addScaledVector(dir, len / 2);
    cone.applyMatrix4(new THREE.Matrix4().compose(mid, new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().negate()), new THREE.Vector3(1, 1, 1)));
    cones.push(cone);
  }
  const bg = mergeGeometries(cones);
  bg.computeBoundingSphere();
  const beams = new THREE.Mesh(bg, beamMaterial());
  beams.name = 'floodBeams';
  beams.renderOrder = 3;
  beams.frustumCulled = false;
  group.add(beams);
  return { sprites, beams };
}

// ---------------------------------------------------------------- ad boards (one merged mesh)
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
  const mesh = new Mesher();
  const mk = (len, x, z, rot) => {
    mesh.frame.makeRotationY(rot).setPosition(x, 0.45, z);
    mesh.geo(new THREE.PlaneGeometry(len, 0.9), new THREE.Matrix4(), 0xffffff, len / 40);
  };
  mk(PITCH.L, 0, -(PITCH.HW + 4), 0);
  mk(PITCH.L, 0, PITCH.HW + 4, Math.PI);
  mk(PITCH.W - 12, -(PITCH.HL + 4), 0, Math.PI / 2);
  mk(PITCH.W - 12, PITCH.HL + 4, 0, -Math.PI / 2);
  const b = new THREE.Mesh(mesh.build(), new THREE.MeshBasicMaterial({ map: tex }));
  b.name = 'adBoards';
  parent.add(b);
}

// ---------------------------------------------------------------- sky
// Neutral and warm: a near-black zenith falling to a warm dark-grey haze that matches the fog. No blue, no purple.
const HAZE = 0x302c27, ZENITH = 0x050505;

function skyTexture() {
  const W = 256, H = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  const img = g.createImageData(W, H);
  const hz = [(HAZE >> 16 & 255), (HAZE >> 8 & 255), (HAZE & 255)], zn = [(ZENITH >> 16 & 255), (ZENITH >> 8 & 255), (ZENITH & 255)];
  // row 0 is the zenith, row H/2 the horizon; the sphere's v is linear in elevation. Blended in display space.
  for (let y = 0; y < H; y++) {
    const el = 90 - (180 * (y + 0.5)) / H;                       // degrees
    const t = Math.pow(clamp(el / 80), 0.75);                    // 0 at the horizon, 1 near the zenith
    for (let x = 0; x < W; x++) {
      const n = (Math.random() - 0.5) * 1.6;                      // dither against banding in the dark ramp
      const i = (y * W + x) * 4;
      img.data[i] = mix(hz[0], zn[0], t) + n;
      img.data[i + 1] = mix(hz[1], zn[1], t) + n;
      img.data[i + 2] = mix(hz[2], zn[2], t) + n;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function buildSky(group) {
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(430, 32, 24),
    new THREE.MeshBasicMaterial({ map: skyTexture(), side: THREE.BackSide, fog: false, depthWrite: false }),
  );
  dome.name = 'sky';
  dome.renderOrder = 1;          // after the opaque scene: the depth test then rejects every covered pixel
  dome.frustumCulled = false;
  group.add(dome);
  return dome;
}

// Backdrop + fog per scene "mode". The locker room is a dark warm interior with no fog.
const ENV = {
  stadium: { bg: HAZE, fog: { color: HAZE, near: 120, far: 270 } },
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

  // floodlit look: a warm-white key from a corner, a neutral fill with grass bounce underneath. No shadows.
  const hemi = new THREE.HemisphereLight(0xeceae4, 0x56604a, 1.3);
  const sun = new THREE.DirectionalLight(0xfff0d8, 2.0);
  sun.position.set(-30, 60, 20);
  group.add(hemi, sun);

  buildSky(group);

  const tex = pitchTexture();
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(PITCH.L + APRON * 2, PITCH.W + APRON * 2),
    new THREE.MeshLambertMaterial({ map: tex }),
  );
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);
  // beyond the pitch the grass runs into the fog, which is the same colour as the horizon haze
  const outer = new THREE.Mesh(new THREE.CircleGeometry(440, 48), new THREE.MeshLambertMaterial({ color: 0x1a2a19 }));
  outer.rotation.x = -Math.PI / 2;
  outer.position.y = -0.02;
  group.add(outer);

  const lit = new Mesher(), baked = new Mesher(), netPts = [];
  const placements = buildStands(lit, baked);
  goalFrames(lit, netPts);
  const crowd = buildCrowd(placements);
  buildFloodlights(lit, baked, group);

  const structure = new THREE.Mesh(lit.build(), new THREE.MeshLambertMaterial({ vertexColors: true }));
  structure.name = 'structure';
  const bakedMesh = new THREE.Mesh(baked.build(), new THREE.MeshBasicMaterial({ vertexColors: true }));
  bakedMesh.name = 'standsBaked';
  group.add(structure, bakedMesh, crowd);

  const ng = new THREE.BufferGeometry();
  ng.setAttribute('position', new THREE.Float32BufferAttribute(netPts, 3));
  group.add(new THREE.LineSegments(ng, new THREE.LineBasicMaterial({ color: 0xdedfd8, transparent: true, opacity: 0.45 })));

  boards(group);

  return { group, lights: [hemi, sun], crowd, setEnvironment: (mode) => setEnvironment(scene, mode) };
}

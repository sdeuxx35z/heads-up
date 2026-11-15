import * as THREE from 'three';

/*
 * LockerRoom: the menu hub. A procedural football dressing room at a night match.
 * No model files; everything is generated (canvas textures, merged vertex-coloured meshes, baked light).
 *
 * INTEGRATION (main.js)
 *   const stadium = buildStadium(scene);          // stadium.js: { group, lights, crowd, setEnvironment(mode) }
 *   const locker = new LockerRoom(scene);         // built hidden, centred on LOCKER_ORIGIN (0,0,-200)
 *
 *   enter:  stadium.group.visible = false;  stadium.setEnvironment('locker');   // dark warm backdrop, no fog
 *           locker.show();  world.placeUser(locker.spawn.pos, locker.spawn.yaw);
 *           hide the live game objects (players, ball) and any Panels you are not mounting
 *   leave:  locker.hide();  stadium.group.visible = true;  stadium.setEnvironment('stadium');
 *
 *   Panels:  locker.mounts.career | .notice | .stats are Object3Ds sitting ON the board surface, local +z facing
 *            into the room. userData.width/height = the Panel size the mount is made for (2.0x1.25, 1.2x0.9,
 *            1.6x0.9 m); userData.maxWidth/maxHeight = the whole board surface if you want a bigger Panel.
 *            mount.add(panel.mesh); panel.mesh.position.set(0, 0, 0.01);   // flush
 *            Panels draw with depthTest off, so hide them when you leave the room.
 *   Pointer: raycast locker.pickables (check locker.visible first). hit.object.userData.action is one of
 *            'continue' (tunnel door + the lit sign above it), 'practice' (kit bag + its stand sign), 'settings'
 *            (clipboard + its plate), 'career', 'stats', 'notice' (each board + its frame + the header plate over it).
 *            Several pickables share one action; hovering any of them lights all of them.
 *            locker.setHover(hit ? hit.object : null) every frame; the highlight is a warm outline / faint glow.
 *   Frame:   const { doorGaze } = locker.update(dt, headWorldPos, headWorldDir);   // doorGaze 0..1, eased;
 *            the returned object is reused every frame. Drive crowd swell from it.
 *   Data:    locker.setProfile({ name, number, color })   shirt back + nameplate (color = shirt/plate colour)
 *            locker.setTrophies(n)                        0..8 gold, the rest faint outlines
 *            locker.setNextLabel('LESSON 4 · TIMING')     chalk slate above the door
 *            locker.setDoorLabel('CONTINUE')              the big lit sign above the door (default 'CONTINUE'; 'PLAY'...)
 *
 * LAYOUT. Room 9 m (x) x 7 m (z), ceiling 3.2 m. The player spawns in the middle facing +z (yaw 0), eyes
 * ~1.65 m. Facing +z the left hand is +x:
 *   front  (+z)  career board (left), 3 stalls with the player's lit locker in the middle, noticeboard (right)
 *   left   (+x)  stats TV, trophy cabinet, towel shelf
 *   right  (-x)  tunnel door under the lit CONTINUE sign, the clipboard (SETTINGS, with its own plate) beside it, 4 stalls
 *                (the stalls sit 0.15 m toward the corners so the gap beside the door holds a readable plate)
 *   behind (-z)  physio table, first-aid cabinet, clock, 4 stalls
 *   kit bag (PRACTICE) with balls and cones on the floor front-left, a PRACTICE sign on a stand behind it.
 * Every target carries a label with letters >= 8 cm (see SIGNS): the door sign 17 cm, header plates CAREER / TODAY /
 * STATS 18 cm above the boards (the Panels cover the boards, the plates and frames stay visible and pickable).
 * The boards are 4.5-4.7 m from the spawn; a Panel scaled up toward maxWidth reads better in the headset.
 * The career/stats boards are dark on purpose: a smoked-glass Panel stays legible over them.
 *
 * COST. ~27 draw calls, ~17k triangles, 3 real lights (hemisphere, spot on the own locker, door point light),
 * no shadow maps, Lambert + Basic. The first show() compiles the room's shader variants once.
 */

export const LOCKER_ORIGIN = new THREE.Vector3(0, 0, -200);

const HX = 4.5, HZ = 3.5, H = 3.2, SW = 1.1;
const ORANGE = 0xff7a1a, INK = 0x15171a;
const FONT = '"Barlow Condensed", "Arial Narrow", sans-serif';
const ATLAS = { w: 1024, h: 1024 };
const SHIRT_ATLAS = 1024;

// ---------------------------------------------------------------- small helpers
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sstep = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };

/** Shirt numbers on the other ten shirts: 1..11 without the player's own. */
export function teammateNumbers(playerNumber) {
  const pool = [];
  for (let n = 1; n <= 11; n++) if (n !== playerNumber) pool.push(n);
  return pool.slice(0, 10);
}

/** 0..1 how directly `dir` (unit) points from `from` at `target`. Smoothstep between ~37 and ~9 degrees. */
export function gazeAmount(from, dir, target) {
  const dx = target.x - from.x, dy = target.y - from.y, dz = target.z - from.z;
  const len = Math.hypot(dx, dy, dz) || 1;
  const dot = (dir.x * dx + dir.y * dy + dir.z * dz) / len;
  return sstep(0.80, 0.988, dot);
}

function cv(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function texOf(c, { repeat = false, aniso = 4 } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}
function fit(g, text, maxW, size, weight = 800) {
  g.font = `${weight} ${size}px ${FONT}`;
  const w = g.measureText(text).width;
  if (w > maxW) { size = Math.floor(size * maxW / w); g.font = `${weight} ${size}px ${FONT}`; }
  return size;
}
function hexStr(c) { return '#' + c.getHexString(); }
function luma(c) { return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b; }

// ---------------------------------------------------------------- baked light
// One function colours every vertex of the room: a handful of virtual lights (ceiling strips,
// the door spill) plus contact darkening. The real lights then only add the hero touches.
function makeBake() {
  const lights = [];
  const warm = [1.0, 0.9, 0.76];
  for (const z of [-1.5, 1.5]) for (const x of [-2.8, 0, 2.8]) for (const dx of [-0.45, 0.45]) {
    lights.push({ x: x + dx, y: 3.05, z, c: warm, k: 0.42 });
  }
  lights.push({ x: -3.7, y: 1.3, z: 0, c: [1, 0.96, 0.88], k: 0.9 });
  const out = { r: 1, g: 1, b: 1 };
  return (p, n) => {
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < lights.length; i++) {
      const l = lights[i];
      const dx = l.x - p.x, dy = l.y - p.y, dz = l.z - p.z;
      const d2 = dx * dx + dy * dy + dz * dz + 0.04;
      const ndl = (n.x * dx + n.y * dy + n.z * dz) / Math.sqrt(d2);
      const wrap = clamp((ndl + 0.5) / 1.5);
      const a = l.k * wrap / (1 + d2 / 3.2);
      r += l.c[0] * a; g += l.c[1] * a; b += l.c[2] * a;
    }
    let ao = 1;
    const dw = Math.min(HX - Math.abs(p.x), HZ - Math.abs(p.z));
    if (n.y > 0.5) ao *= 0.68 + 0.32 * sstep(0, 1.0, dw);
    else if (Math.abs(n.y) < 0.5) {
      ao *= 0.6 + 0.4 * sstep(0, 0.8, p.y);
      ao *= 0.88 + 0.12 * sstep(2.4, 3.1, 3.2 - p.y) ;
      // vertical room corners
      const cx = HX - Math.abs(p.x), cz = HZ - Math.abs(p.z);
      ao *= 0.82 + 0.18 * sstep(0, 0.5, Math.max(cx, cz));
    }
    const base = 0.13;
    out.r = clamp((base + r) * ao, 0, 1.3);
    out.g = clamp((base * 0.96 + g) * ao, 0, 1.3);
    out.b = clamp((base * 0.9 + b) * ao, 0, 1.3);
    return out;
  };
}

// ---------------------------------------------------------------- geometry batch
const UNIT_BOX = new THREE.BoxGeometry(1, 1, 1);
const _m = new THREE.Matrix4(), _nm = new THREE.Matrix3(), _v = new THREE.Vector3(), _n = new THREE.Vector3();
const _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _s = new THREE.Vector3(), _mat = new THREE.Matrix4();
const _c = new THREE.Color();
const _geoCache = new Map();
function cachedGeo(key, make) {
  let g = _geoCache.get(key);
  if (!g) { g = make(); _geoCache.set(key, g); }
  return g;
}

class Batch {
  constructor({ rng, bakeFn = null, uvPerMetre = 2 } = {}) {
    this.p = []; this.n = []; this.u = []; this.c = []; this.i = [];
    this.count = 0;
    this.frame = new THREE.Matrix4();
    this.rng = rng;
    this.bakeFn = bakeFn;
    this.uvPerMetre = uvPerMetre;
    this.white = [0.99, 0.01];
  }

  // Adds an indexed or non-indexed geometry transformed by frame * matrix.
  // o.uv: 'tri' (world-space triplanar, default) | 'rect' (geometry uv remapped into o.rect) | 'white'
  add(geo, matrix, color, o = {}) {
    _m.multiplyMatrices(this.frame, matrix);
    _nm.getNormalMatrix(_m);
    const pos = geo.attributes.position, nor = geo.attributes.normal, uv = geo.attributes.uv;
    const col = (typeof color === 'number') ? _c.setHex(color) : color;
    const jit = o.jitter ?? 0.05;
    const jv = this.rng ? 1 + (this.rng() - 0.5) * 2 * jit : 1;
    const mode = o.uv || 'tri';
    const k = this.uvPerMetre;
    const base = this.count;
    for (let i = 0; i < pos.count; i++) {
      _v.fromBufferAttribute(pos, i).applyMatrix4(_m);
      _n.fromBufferAttribute(nor, i).applyMatrix3(_nm).normalize();
      let r = col.r * jv, g = col.g * jv, b = col.b * jv;
      if (this.bakeFn && !o.noBake) {
        const f = this.bakeFn(_v, _n);
        r *= f.r; g *= f.g; b *= f.b;
      }
      this.p.push(_v.x, _v.y, _v.z);
      this.n.push(_n.x, _n.y, _n.z);
      this.c.push(r, g, b);
      if (mode === 'white') this.u.push(this.white[0], this.white[1]);
      else if (mode === 'rect') {
        const r4 = o.rect;
        this.u.push(r4[0] + uv.getX(i) * (r4[2] - r4[0]), r4[1] + uv.getY(i) * (r4[3] - r4[1]));
      } else {
        const ax = Math.abs(_n.x), ay = Math.abs(_n.y), az = Math.abs(_n.z);
        let a, b2;
        if (ax >= ay && ax >= az) { a = _v.z; b2 = _v.y; } else if (ay >= az) { a = _v.x; b2 = _v.z; } else { a = _v.x; b2 = _v.y; }
        if (o.swap) { const t = a; a = b2; b2 = t; }
        this.u.push(a * k, b2 * k);
      }
    }
    if (geo.index) for (let i = 0; i < geo.index.count; i++) this.i.push(base + geo.index.getX(i));
    else for (let i = 0; i < pos.count; i++) this.i.push(base + i);
    this.count += pos.count;
  }

  box(x, y, z, w, h, d, color, o = {}) {
    _p.set(x, y, z);
    _q.setFromEuler(_e.set(o.rx || 0, o.ry || 0, o.rz || 0));
    _s.set(w, h, d);
    _mat.compose(_p, _q, _s);
    this.add(UNIT_BOX, _mat, color, o);
  }

  cyl(x, y, z, rt, rb, h, color, o = {}) {
    const seg = o.seg || 10;
    const geo = cachedGeo(`cyl${rt}|${rb}|${seg}`, () => new THREE.CylinderGeometry(rt, rb, 1, seg, 1, !!o.open));
    _p.set(x, y, z);
    _q.setFromEuler(_e.set(o.rx || 0, o.ry || 0, o.rz || 0));
    _s.set(1, h, 1);
    _mat.compose(_p, _q, _s);
    this.add(geo, _mat, color, o);
  }

  sph(x, y, z, r, color, o = {}) {
    const geo = cachedGeo(`sph${o.seg || 12}`, () => new THREE.SphereGeometry(1, o.seg || 12, Math.max(6, (o.seg || 12) >> 1)));
    _p.set(x, y, z);
    _q.setFromEuler(_e.set(o.rx || 0, o.ry || 0, o.rz || 0));
    _s.set(r * (o.sx || 1), r * (o.sy || 1), r * (o.sz || 1));
    _mat.compose(_p, _q, _s);
    this.add(geo, _mat, color, o);
  }

  // textured/atlas quad facing local +z
  quad(x, y, z, w, h, color, rect, o = {}) {
    const geo = cachedGeo('quad', () => new THREE.PlaneGeometry(1, 1));
    _p.set(x, y, z);
    _q.setFromEuler(_e.set(o.rx || 0, o.ry || 0, o.rz || 0));
    _s.set(w, h, 1);
    _mat.compose(_p, _q, _s);
    this.add(geo, _mat, color, { uv: 'rect', rect, jitter: 0, ...o });
  }

  geo(g, x, y, z, color, o = {}) {
    _p.set(x, y, z);
    _q.setFromEuler(_e.set(o.rx || 0, o.ry || 0, o.rz || 0));
    _s.set(o.sx ?? 1, o.sy ?? 1, o.sz ?? 1);
    _mat.compose(_p, _q, _s);
    this.add(g, _mat, color, o);
  }

  // regular grid of quads: p0 + s*du + t*dv, normal = du x dv
  grid(p0, du, dv, nu, nv, color, uvFn, o = {}) {
    const nrm = new THREE.Vector3().crossVectors(du, dv).normalize();
    const base = this.count;
    const pt = new THREE.Vector3();
    for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) {
      const s = i / nu, t = j / nv;
      pt.copy(p0).addScaledVector(du, s).addScaledVector(dv, t);
      let r = color.r, g = color.g, b = color.b;
      if (this.bakeFn && !o.noBake) { const f = this.bakeFn(pt, nrm); r *= f.r; g *= f.g; b *= f.b; }
      this.p.push(pt.x, pt.y, pt.z);
      this.n.push(nrm.x, nrm.y, nrm.z);
      this.c.push(r, g, b);
      const uv = uvFn(pt, s, t);
      this.u.push(uv[0], uv[1]);
    }
    for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
      const a = base + j * (nu + 1) + i, b = a + 1, c = a + nu + 2, d = a + nu + 1;
      this.i.push(a, b, c, a, c, d);
    }
    this.count += (nu + 1) * (nv + 1);
  }

  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.u, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
    g.setIndex(this.count > 65535 ? new THREE.Uint32BufferAttribute(this.i, 1) : new THREE.Uint16BufferAttribute(this.i, 1));
    g.computeBoundingSphere();
    g.computeBoundingBox();
    return g;
  }
}

// ---------------------------------------------------------------- walls
const WALLS = {
  front: { o: [0, 0, HZ], n: [0, 0, -1], t: [-1, 0, 0], yaw: Math.PI, len: 2 * HX },
  back: { o: [0, 0, -HZ], n: [0, 0, 1], t: [1, 0, 0], yaw: 0, len: 2 * HX },
  left: { o: [HX, 0, 0], n: [-1, 0, 0], t: [0, 0, 1], yaw: -Math.PI / 2, len: 2 * HZ },
  right: { o: [-HX, 0, 0], n: [1, 0, 0], t: [0, 0, -1], yaw: Math.PI / 2, len: 2 * HZ },
};
// local frame on a wall: +x along the wall to the viewer's right, +y up, +z out into the room
function wallMatrix(name, u = 0, off = 0, out = new THREE.Matrix4()) {
  const w = WALLS[name];
  out.makeRotationY(w.yaw);
  out.setPosition(w.o[0] + w.t[0] * u + w.n[0] * off, 0, w.o[2] + w.t[2] * u + w.n[2] * off);
  return out;
}
function placeOnWall(obj, name, u, y, off = 0) {
  const w = WALLS[name];
  obj.position.set(w.o[0] + w.t[0] * u + w.n[0] * off, y, w.o[2] + w.t[2] * u + w.n[2] * off);
  obj.rotation.y = w.yaw;
  return obj;
}

// ---------------------------------------------------------------- canvas art
function floorCanvas(rng) {
  const c = cv(512, 512), g = c.getContext('2d');
  for (let ty = 0; ty < 2; ty++) for (let tx = 0; tx < 2; tx++) {
    const v = 0.93 + rng() * 0.12;
    g.fillStyle = `rgb(${Math.round(158 * v)},${Math.round(150 * v)},${Math.round(138 * v)})`;
    g.fillRect(tx * 256, ty * 256, 256, 256);
    for (let i = 0; i < 900; i++) {
      g.fillStyle = rng() < 0.5 ? `rgba(60,52,44,${0.05 + rng() * 0.1})` : `rgba(240,230,210,${0.05 + rng() * 0.1})`;
      g.fillRect(tx * 256 + rng() * 256, ty * 256 + rng() * 256, 1 + rng() * 2.4, 1 + rng() * 2.4);
    }
  }
  g.fillStyle = '#6a645a';
  for (const p of [0, 253, 509]) { g.fillRect(0, p, 512, p === 253 ? 6 : 3); g.fillRect(p, 0, p === 253 ? 6 : 3, 512); }
  return c;
}

function wallCanvas(rng) {
  // 480 x 1024 px = 1.5 m x 3.2 m (320 px / m)
  const c = cv(480, 1024), g = c.getContext('2d');
  const pg = g.createLinearGradient(0, 0, 0, 640);
  pg.addColorStop(0, '#4a443d'); pg.addColorStop(1, '#6a635a');
  g.fillStyle = pg; g.fillRect(0, 0, 480, 640);
  for (let i = 0; i < 1800; i++) {
    g.fillStyle = rng() < 0.5 ? 'rgba(20,16,12,0.05)' : 'rgba(255,240,220,0.04)';
    g.fillRect(rng() * 480, rng() * 640, 1 + rng() * 3, 1 + rng() * 3);
  }
  // tile band: grout colour first, then subway tiles
  g.fillStyle = '#b5ad9a'; g.fillRect(0, 640, 480, 384);
  for (let r = 0; r < 8; r++) {
    const y = 992 - (r + 1) * 48;
    const off = (r % 2) * 48;
    for (let x = -96; x < 480 + 96; x += 96) {
      const v = 0.94 + rng() * 0.1;
      g.fillStyle = `rgb(${Math.round(222 * v)},${Math.round(214 * v)},${Math.round(196 * v)})`;
      const yy = Math.max(640, y);
      g.fillRect(x + off + 1.5, yy + 1.5, 93, 45 - (yy - y));
    }
  }
  g.fillStyle = '#ff7a1a'; g.fillRect(0, 620, 480, 20);
  g.fillStyle = '#2b2723'; g.fillRect(0, 614, 480, 6);
  g.fillStyle = '#2b2723'; g.fillRect(0, 992, 480, 32);
  return c;
}

function ceilCanvas(rng) {
  const c = cv(512, 512), g = c.getContext('2d');
  g.fillStyle = '#8a857a'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = rng() < 0.6 ? 'rgba(40,34,28,0.18)' : 'rgba(255,250,240,0.12)';
    g.fillRect(rng() * 512, rng() * 512, 1 + rng() * 2, 1 + rng() * 2);
  }
  g.fillStyle = '#3d3a35';
  for (const p of [0, 254]) { g.fillRect(0, p, 512, 4); g.fillRect(p, 0, 4, 512); }
  g.fillRect(0, 508, 512, 4); g.fillRect(508, 0, 4, 512);
  return c;
}

function woodCanvas(rng) {
  const c = cv(256, 256), g = c.getContext('2d');
  g.fillStyle = '#c9a678'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 110; i++) {
    const y0 = rng() * 256, amp = 0.6 + rng() * 2.6, k = 1 + Math.floor(rng() * 3), ph = rng() * 6.28;
    const dark = rng() < 0.7;
    g.strokeStyle = dark ? `rgba(80,52,28,${0.05 + rng() * 0.17})` : `rgba(255,236,200,${0.05 + rng() * 0.1})`;
    g.lineWidth = 0.6 + rng() * 1.6;
    for (const dy of [-256, 0, 256]) {
      g.beginPath();
      for (let x = 0; x <= 256; x += 8) {
        const y = y0 + dy + amp * Math.sin(ph + (x / 256) * 6.2832 * k);
        if (x === 0) g.moveTo(x, y); else g.lineTo(x, y);
      }
      g.stroke();
    }
  }
  return c;
}

function corkCanvas(rng, w, h) {
  const c = cv(w, h), g = c.getContext('2d');
  g.fillStyle = '#b3855a'; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 5200; i++) {
    const a = rng();
    g.fillStyle = a < 0.45 ? `rgba(90,56,30,${0.12 + rng() * 0.25})` : a < 0.8 ? `rgba(230,190,140,${0.1 + rng() * 0.22})` : `rgba(60,36,18,${0.1 + rng() * 0.2})`;
    g.beginPath(); g.arc(rng() * w, rng() * h, 0.8 + rng() * 2.6, 0, 6.2832); g.fill();
  }
  // pinned scraps in the margins (the panel covers the middle)
  const sx = w / 1.5, sy = h / 1.2; // px per metre
  const note = (mx, my, mw, mh, col, rot) => {
    g.save(); g.translate(mx * sx, my * sy); g.rotate(rot);
    g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(-mw * sx / 2 + 3, -mh * sy / 2 + 4, mw * sx, mh * sy);
    g.fillStyle = col; g.fillRect(-mw * sx / 2, -mh * sy / 2, mw * sx, mh * sy);
    g.fillStyle = 'rgba(40,36,30,0.35)';
    for (let l = 0; l < 4; l++) g.fillRect(-mw * sx / 2 + 6, -mh * sy / 2 + 12 + l * 9, mw * sx * (0.8 - l * 0.12), 2.5);
    g.fillStyle = '#b8431b'; g.beginPath(); g.arc(0, -mh * sy / 2 + 5, 4, 0, 6.2832); g.fill();
    g.restore();
  };
  note(0.075, 0.2, 0.11, 0.14, '#efe6d0', -0.08);
  note(0.075, 0.62, 0.11, 0.12, '#e9d78b', 0.06);
  note(1.425, 0.28, 0.11, 0.13, '#efe6d0', 0.07);
  note(1.425, 0.85, 0.11, 0.14, '#f1c48a', -0.05);
  return c;
}

function tacticsCanvas(rng, w, h) {
  const c = cv(w, h), g = c.getContext('2d');
  g.fillStyle = '#24251f'; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 3000; i++) {
    g.fillStyle = rng() < 0.5 ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.05)';
    g.fillRect(rng() * w, rng() * h, 1 + rng() * 3, 1 + rng() * 3);
  }
  // ghosted chalk: faint pitch lines and a few moves in the margins
  g.strokeStyle = 'rgba(240,235,220,0.07)'; g.lineWidth = 4;
  g.strokeRect(w * 0.04, h * 0.06, w * 0.92, h * 0.88);
  g.beginPath(); g.moveTo(w / 2, h * 0.06); g.lineTo(w / 2, h * 0.94); g.stroke();
  g.beginPath(); g.arc(w / 2, h / 2, h * 0.14, 0, 6.2832); g.stroke();
  g.strokeRect(w * 0.04, h * 0.28, w * 0.13, h * 0.44);
  g.strokeRect(w * 0.83, h * 0.28, w * 0.13, h * 0.44);
  g.strokeStyle = 'rgba(255,122,26,0.5)'; g.lineWidth = 5; g.fillStyle = 'rgba(255,122,26,0.5)';
  const x = (cx, cy) => { g.beginPath(); g.moveTo(cx - 9, cy - 9); g.lineTo(cx + 9, cy + 9); g.moveTo(cx + 9, cy - 9); g.lineTo(cx - 9, cy + 9); g.stroke(); };
  const o = (cx, cy) => { g.beginPath(); g.arc(cx, cy, 10, 0, 6.2832); g.stroke(); };
  x(w * 0.07, h * 0.15); x(w * 0.1, h * 0.85); o(w * 0.93, h * 0.2); o(w * 0.9, h * 0.8);
  g.strokeStyle = 'rgba(240,235,220,0.18)'; g.setLineDash([12, 10]);
  g.beginPath(); g.moveTo(w * 0.1, h * 0.15); g.quadraticCurveTo(w * 0.2, h * 0.02, w * 0.3, h * 0.07); g.stroke();
  g.beginPath(); g.moveTo(w * 0.9, h * 0.8); g.quadraticCurveTo(w * 0.8, h * 0.96, w * 0.7, h * 0.92); g.stroke();
  return c;
}

function screenCanvas() {
  const c = cv(512, 288), g = c.getContext('2d');
  g.fillStyle = '#121413'; g.fillRect(0, 0, 512, 288);
  const gr = g.createLinearGradient(0, 0, 512, 288);
  gr.addColorStop(0, 'rgba(255,255,255,0.05)'); gr.addColorStop(0.45, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 512, 288);
  return c;
}

function frostCanvas(rng) {
  const c = cv(128, 256), g = c.getContext('2d');
  const img = g.createImageData(128, 256);
  for (let y = 0; y < 256; y++) for (let x = 0; x < 128; x++) {
    const nx = (x / 127) * 2 - 1, ny = (y / 255) * 2 - 1;
    const v = clamp(1.0 - 0.28 * (nx * nx) - 0.2 * ny * ny + (rng() - 0.5) * 0.08);
    const i = (y * 128 + x) * 4;
    img.data[i] = 255 * v; img.data[i + 1] = 248 * v; img.data[i + 2] = 226 * v; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  g.fillStyle = 'rgba(60,50,40,0.5)';
  g.fillRect(62, 0, 4, 256); g.fillRect(0, 126, 128, 4);
  return c;
}

function beamCanvas() {
  // light spilling from the door along the floor: x is distance from the wall, y is across
  const c = cv(256, 256), g = c.getContext('2d');
  const img = g.createImageData(256, 256);
  for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) {
    const s = x / 255, t = (y / 255) * 2 - 1;
    const half = 0.18 + 0.82 * s;
    const a = Math.exp(-Math.pow(t / half, 2) * 2.2) * Math.pow(1 - s, 1.6);
    const i = (y * 256 + x) * 4;
    img.data[i] = 255; img.data[i + 1] = 244; img.data[i + 2] = 214; img.data[i + 3] = clamp(a) * 255;
  }
  g.putImageData(img, 0, 0);
  return c;
}

function bloomCanvas() {
  const c = cv(128, 128), g = c.getContext('2d');
  const img = g.createImageData(128, 128);
  for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
    const nx = (x / 127) * 2 - 1, ny = (y / 127) * 2 - 1;
    const a = Math.pow(clamp(1 - Math.hypot(nx, ny)), 2.2);
    const i = (y * 128 + x) * 4;
    img.data[i] = 255; img.data[i + 1] = 240; img.data[i + 2] = 210; img.data[i + 3] = a * 255;
  }
  g.putImageData(img, 0, 0);
  return c;
}

function plateText(g, cx, cy, text, size, color) {
  g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `800 ${size}px ${FONT}`;
  g.fillText(text, cx, cy);
}

/*
 * Signs. Every target in the room has a label you can read from where you stand: w x h is the plate in metres,
 * cap the letter (capital) height in metres. Cap 0.08 m is about 1 degree at 4.5 m, the smallest we call readable.
 * `ppm` is the texture density in pixels per metre. The door sign is lit (its own mesh, see setDoorLabel).
 */
export const SIGNS = {
  continue: { w: 1.1, h: 0.26, cap: 0.17, ppm: 640, track: 0.05 },    // lit, above the door
  settings: { w: 0.52, h: 0.17, cap: 0.088, ppm: 640, track: 0.02 },  // above the clipboard, fills the gap beside the door
  practice: { w: 0.66, h: 0.2, cap: 0.1, ppm: 640, track: 0.04 },     // on a floor stand behind the kit bag
  career: { w: 1.1, h: 0.3, cap: 0.18, ppm: 400, track: 0.04 },       // header plates over the wall boards
  today: { w: 1.1, h: 0.3, cap: 0.18, ppm: 400, track: 0.04 },
  stats: { w: 1.1, h: 0.3, cap: 0.18, ppm: 400, track: 0.04 },
};
export const SIGN_TEXT = { settings: 'SETTINGS', practice: 'PRACTICE', career: 'CAREER', today: 'TODAY', stats: 'STATS' };
// advance widths in em of the label texts in Barlow Condensed 800 (measured), used to predict the letter size that survives fitting
const TEXT_EM = { SETTINGS: 3.548, PRACTICE: 3.545, CONTINUE: 3.631, PLAY: 1.856, 'CAREER COMPLETE': 6.795, CAREER: 2.81, TODAY: 2.347, STATS: 2.261 };
const SIGN_MARGIN = 0.04;   // metres, total, left over on a plate

/** Cap height in metres the letters of `text` end up with on plate `key` (shrunk from the spec only if the text will not fit). */
export function signCapHeight(key, text = SIGN_TEXT[key] || 'CONTINUE') {
  const sp = SIGNS[key];
  const em = (TEXT_EM[text] ?? 0.45 * text.length) + sp.track * text.length;
  const emM = sp.cap / 0.7;
  const fit = (sp.w - SIGN_MARGIN) / (em * emM);
  return sp.cap * Math.min(1, fit);
}

// static decals: exit sign, bag tag, wall lettering, clipboard sheet, clock face, and the sign plates (y >= 512)
const AT = {
  exit: [0, 0, 256, 96],
  tag: [256, 0, 192, 96],
  heads: [0, 100, 1024, 128],
  sheet: [0, 232, 192, 256],
  clock: [200, 232, 160, 160],
  white: [1000, 1008, 16, 16],   // bottom-right corner: Batch's 'white' uv (0.99, 0.01) lands in this cell
  settings: [0, 512, Math.round(SIGNS.settings.w * SIGNS.settings.ppm), Math.round(SIGNS.settings.h * SIGNS.settings.ppm)],
  practice: [330, 512, Math.round(SIGNS.practice.w * SIGNS.practice.ppm), Math.round(SIGNS.practice.h * SIGNS.practice.ppm)],
  career: [0, 660, Math.round(SIGNS.career.w * SIGNS.career.ppm), Math.round(SIGNS.career.h * SIGNS.career.ppm)],
  today: [450, 660, Math.round(SIGNS.today.w * SIGNS.today.ppm), Math.round(SIGNS.today.h * SIGNS.today.ppm)],
  stats: [0, 790, Math.round(SIGNS.stats.w * SIGNS.stats.ppm), Math.round(SIGNS.stats.h * SIGNS.stats.ppm)],
};

/** One sign plate drawn into rect r of canvas context g: dark plate, warm-white letters (or a lit orange face with dark ink). */
function drawPlate(g, r, sp, text, lit = false) {
  const [x, y, w, h] = r;
  const lw = Math.max(2, h * 0.035);
  g.save();
  g.beginPath(); g.rect(x, y, w, h); g.clip();
  g.fillStyle = lit ? '#ff7a1a' : '#1b1a18';
  g.fillRect(x, y, w, h);
  g.strokeStyle = lit ? 'rgba(21,23,26,0.45)' : 'rgba(242,240,232,0.18)';
  g.lineWidth = lw;
  g.strokeRect(x + lw * 1.5, y + lw * 1.5, w - lw * 3, h - lw * 3);
  if (!lit) { g.fillStyle = '#ff7a1a'; g.fillRect(x, y + h - h * 0.06, w, h * 0.06); }
  // letters: cap height from the spec, shrunk only if the text would not fit the plate
  let size = Math.round((sp.cap * sp.ppm) / 0.7);
  const maxW = w - SIGN_MARGIN * sp.ppm;
  const spaced = 'letterSpacing' in g;
  g.font = `800 ${size}px ${FONT}`;
  if (spaced) g.letterSpacing = `${(size * sp.track).toFixed(1)}px`;
  const tw = g.measureText(text).width;
  if (tw > maxW) {
    size = Math.floor((size * maxW) / tw);
    g.font = `800 ${size}px ${FONT}`;
    if (spaced) g.letterSpacing = `${(size * sp.track).toFixed(1)}px`;
  }
  g.fillStyle = lit ? '#15171a' : '#f2f0e8';
  g.textAlign = 'center'; g.textBaseline = 'alphabetic';
  g.fillText(text, x + w / 2, y + h / 2 + (size * 0.7) / 2 - (lit ? 0 : h * 0.02));
  if (spaced) g.letterSpacing = '0px';
  g.restore();
}
function atlasRect(r) {
  const [x, y, w, h] = r;
  return [(x + 0.5) / ATLAS.w, 1 - (y + h - 0.5) / ATLAS.h, (x + w - 0.5) / ATLAS.w, 1 - (y + 0.5) / ATLAS.h];
}
function decoCanvas() {
  const c = cv(ATLAS.w, ATLAS.h), g = c.getContext('2d');
  // white cell
  g.fillStyle = '#fff'; g.fillRect(...AT.white);
  // exit sign: muted green lightbox, white pictogram
  let [x, y, w, h] = AT.exit;
  g.fillStyle = '#23895a'; g.fillRect(x, y, w, h);
  g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = 3; g.strokeRect(x + 5, y + 5, w - 10, h - 10);
  g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `800 62px ${FONT}`; g.fillText('EXIT', x + 150, y + h / 2 + 3);
  g.lineWidth = 6; g.lineCap = 'round'; g.strokeStyle = '#fff';
  g.beginPath(); g.arc(x + 52, y + 26, 7, 0, 6.2832); g.fill();
  g.beginPath(); g.moveTo(x + 44, y + 38); g.lineTo(x + 52, y + 54); g.lineTo(x + 40, y + 66); g.moveTo(x + 52, y + 54); g.lineTo(x + 64, y + 62); g.moveTo(x + 38, y + 44); g.lineTo(x + 66, y + 46);
  g.stroke();
  // luggage tag
  [x, y, w, h] = AT.tag;
  g.clearRect(x, y, w, h);
  g.fillStyle = '#ece3cd'; g.beginPath();
  g.moveTo(x + 20, y + 4); g.lineTo(x + w - 6, y + 4); g.lineTo(x + w - 6, y + h - 4); g.lineTo(x + 20, y + h - 4); g.lineTo(x + 6, y + h / 2); g.closePath(); g.fill();
  g.fillStyle = '#6a5f4c'; g.beginPath(); g.arc(x + 24, y + h / 2, 6, 0, 6.2832); g.fill();
  g.fillStyle = '#15171a'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `800 40px ${FONT}`; g.fillText('PRACTICE', x + 112, y + h / 2 + 2);
  // wall lettering
  [x, y, w, h] = AT.heads;
  g.clearRect(x, y, w, h);
  g.fillStyle = '#ff7a1a'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `800 120px ${FONT}`;
  if ('letterSpacing' in g) g.letterSpacing = '22px';
  g.fillText('HEADS UP', x + w / 2, y + h / 2 + 6);
  if ('letterSpacing' in g) g.letterSpacing = '0px';
  // clipboard sheet
  [x, y, w, h] = AT.sheet;
  g.fillStyle = '#efe9da'; g.fillRect(x, y, w, h);
  g.fillStyle = '#15171a'; g.textAlign = 'left'; g.textBaseline = 'middle';
  g.font = `800 40px ${FONT}`; g.fillText('SETTINGS', x + 14, y + 62);
  g.fillStyle = '#ff7a1a'; g.fillRect(x + 14, y + 90, 60, 5);
  g.fillStyle = 'rgba(21,23,26,0.28)';
  for (let r = 0; r < 6; r++) {
    g.fillRect(x + 14, y + 118 + r * 20, 18, 12);
    g.fillRect(x + 42, y + 121 + r * 20, 100 - (r % 3) * 20, 5);
  }
  // sign plates
  for (const key of Object.keys(SIGN_TEXT)) drawPlate(g, AT[key], SIGNS[key], SIGN_TEXT[key]);
  // clock
  [x, y, w, h] = AT.clock;
  g.fillStyle = '#ebe5d6'; g.beginPath(); g.arc(x + 80, y + 80, 76, 0, 6.2832); g.fill();
  g.fillStyle = '#15171a';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * 6.2832;
    g.fillRect(x + 80 + Math.sin(a) * 62 - 2, y + 80 - Math.cos(a) * 62 - 5, 4, i % 3 ? 7 : 12);
  }
  g.lineCap = 'round'; g.strokeStyle = '#15171a'; g.lineWidth = 6;
  g.beginPath(); g.moveTo(x + 80, y + 80); g.lineTo(x + 80 + Math.sin(0.55) * 40, y + 80 - Math.cos(0.55) * 40); g.stroke();
  g.lineWidth = 4;
  g.beginPath(); g.moveTo(x + 80, y + 80); g.lineTo(x + 80 + Math.sin(3.8) * 56, y + 80 - Math.cos(3.8) * 56); g.stroke();
  return c;
}

// ---------------------------------------------------------------- shirts
const SHIRT_PATH = [[0.36, 0.02], 'Q', [0.5, 0.15], [0.64, 0.02], [0.84, 0.09], [1.0, 0.36], [0.83, 0.45], [0.78, 0.31], [0.78, 1.0], [0.22, 1.0], [0.22, 0.31], [0.17, 0.45], [0.0, 0.36], [0.16, 0.09]];

function drawShirt(g, x0, y0, num, name, body, rng) {
  const pad = 6, S = SHIRT_ATLAS / 4 - pad * 2;
  const P = (sx, sy) => [x0 + pad + sx * S, y0 + pad + sy * S];
  const path = () => {
    g.beginPath();
    let a = P(...SHIRT_PATH[0]); g.moveTo(a[0], a[1]);
    for (let i = 1; i < SHIRT_PATH.length; i++) {
      if (SHIRT_PATH[i] === 'Q') {
        const cp = P(...SHIRT_PATH[i + 1]), e = P(...SHIRT_PATH[i + 2]);
        g.quadraticCurveTo(cp[0], cp[1], e[0], e[1]); i += 2;
      } else { a = P(...SHIRT_PATH[i]); g.lineTo(a[0], a[1]); }
    }
    g.closePath();
  };
  g.save();
  path(); g.clip();
  const dark = luma(body) < 0.18;
  const jitter = 0.96 + rng() * 0.08;
  const col = body.clone().multiplyScalar(jitter);
  g.fillStyle = hexStr(col); g.fillRect(x0, y0, SHIRT_ATLAS / 4, SHIRT_ATLAS / 4);
  // tone-on-tone vertical stripes
  g.fillStyle = 'rgba(0,0,0,0.07)';
  for (let sx = 0.27; sx < 0.78; sx += 0.1) { const a = P(sx, 0.1); g.fillRect(a[0], a[1], S * 0.04, S * 0.9); }
  // cloth roundness
  const gr = g.createLinearGradient(...P(0.2, 0), ...P(0.8, 0));
  gr.addColorStop(0, 'rgba(0,0,0,0.22)'); gr.addColorStop(0.18, 'rgba(0,0,0,0)'); gr.addColorStop(0.82, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,0.22)');
  g.fillStyle = gr; g.fillRect(x0, y0, SHIRT_ATLAS / 4, SHIRT_ATLAS / 4);
  const ink = dark ? '#f2f0e8' : '#15171a';
  // sleeve cuffs, hem
  g.fillStyle = ink;
  g.save(); g.translate(...P(0.915, 0.405)); g.rotate(0.33); g.fillRect(-S * 0.1, -S * 0.012, S * 0.2, S * 0.024); g.restore();
  g.save(); g.translate(...P(0.085, 0.405)); g.rotate(-0.33); g.fillRect(-S * 0.1, -S * 0.012, S * 0.2, S * 0.024); g.restore();
  g.fillRect(...P(0.22, 0.965), S * 0.56, S * 0.03);
  g.restore();
  // collar
  g.strokeStyle = ink; g.lineWidth = 0.011 * SHIRT_ATLAS; g.lineJoin = 'round';
  g.beginPath(); let a = P(0.36, 0.02); g.moveTo(...a); { const cp = P(0.5, 0.15), e = P(0.64, 0.02); g.quadraticCurveTo(cp[0], cp[1], e[0], e[1]); } g.stroke();
  // number + name (back of the shirt)
  g.fillStyle = ink; g.textAlign = 'center'; g.textBaseline = 'middle';
  const c0 = P(0.5, 0.64);
  g.font = `800 ${Math.round(S * 0.6)}px ${FONT}`;
  g.fillText(String(num), c0[0], c0[1]);
  if (name) {
    const n0 = P(0.5, 0.31);
    if ('letterSpacing' in g) g.letterSpacing = '2px';
    fit(g, name, S * 0.5, Math.round(S * 0.15), 800);
    g.fillText(name, n0[0], n0[1]);
    if ('letterSpacing' in g) g.letterSpacing = '0px';
  }
}

// ---------------------------------------------------------------- ball
let _ballGeos = null;
function ballGeos() {
  if (_ballGeos) return _ballGeos;
  const src = new THREE.IcosahedronGeometry(1, 1);
  const base = new THREE.IcosahedronGeometry(1, 0).attributes.position;
  const corners = [];
  for (let i = 0; i < base.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(base, i);
    if (!corners.some((c) => c.distanceTo(v) < 1e-3)) corners.push(v);
  }
  const pos = src.attributes.position, nor = src.attributes.normal;
  const white = [], black = [], wn = [], bn = [];
  const v = new THREE.Vector3();
  for (let t = 0; t < pos.count; t += 3) {
    let hit = false;
    for (let k = 0; k < 3 && !hit; k++) {
      v.fromBufferAttribute(pos, t + k);
      hit = corners.some((c) => c.distanceTo(v) < 1e-3);
    }
    const dst = hit ? black : white, dn = hit ? bn : wn;
    for (let k = 0; k < 3; k++) { dst.push(pos.getX(t + k), pos.getY(t + k), pos.getZ(t + k)); dn.push(nor.getX(t + k), nor.getY(t + k), nor.getZ(t + k)); }
  }
  const mk = (p, n) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(new Array((p.length / 3) * 2).fill(0), 2));
    return g;
  };
  _ballGeos = [mk(white, wn), mk(black, bn)];
  return _ballGeos;
}
function addBall(batch, x, y, z, r) {
  const [w, b] = ballGeos();
  batch.geo(w, x, y, z, 0xf0ebdd, { uv: 'white', jitter: 0, sx: r, sy: r, sz: r, ry: x * 7 });
  batch.geo(b, x, y, z, 0x1a1b1d, { uv: 'white', jitter: 0, sx: r, sy: r, sz: r, ry: x * 7 });
}

// ---------------------------------------------------------------- trophies
function trophyParts(i) {
  // each part: { geo, x, y, z, rx, ry, rz, sx, sy, sz } in slot space, base at y=0, ~0.3 tall
  const parts = [];
  const lathe = (pts) => cachedGeo('lathe' + pts.flat().join(','), () => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 14));
  const cup = (h, w) => lathe([[0.001, 0], [0.07 * w, 0], [0.07 * w, 0.02 * h], [0.025, 0.04 * h], [0.02, 0.4 * h], [0.05 * w, 0.46 * h], [0.095 * w, 0.62 * h], [0.1 * w, 0.95 * h], [0.092 * w, h], [0.08 * w, 0.96 * h], [0.085 * w, 0.64 * h], [0.001, 0.5 * h]]);
  const handle = cachedGeo('handle', () => new THREE.TorusGeometry(0.05, 0.009, 6, 12, Math.PI));
  switch (i % 8) {
    case 0:
      parts.push({ geo: cup(0.3, 1.0), x: 0, y: 0, z: 0 });
      parts.push({ geo: handle, x: -0.1, y: 0.2, z: 0, rz: Math.PI / 2 });
      parts.push({ geo: handle, x: 0.1, y: 0.2, z: 0, rz: -Math.PI / 2 });
      break;
    case 1: { // medal on a stand
      parts.push({ box: [0.2, 0.025, 0.12], x: 0, y: 0.0125, z: 0 });
      parts.push({ cyl: [0.085, 0.085, 0.014], x: 0, y: 0.13, z: 0.01, rx: Math.PI / 2 - 0.25 });
      parts.push({ cyl: [0.055, 0.055, 0.018], x: 0, y: 0.13, z: 0.012, rx: Math.PI / 2 - 0.25 });
      parts.push({ box: [0.04, 0.12, 0.006], x: 0, y: 0.22, z: -0.025, rx: -0.25, ribbon: true });
      break;
    }
    case 2: // shield plaque
      parts.push({ box: [0.2, 0.025, 0.1], x: 0, y: 0.0125, z: 0 });
      parts.push({ box: [0.17, 0.2, 0.02], x: 0, y: 0.125, z: -0.01, rx: -0.12 });
      parts.push({ box: [0.11, 0.12, 0.024], x: 0, y: 0.13, z: -0.006, rx: -0.12, lite: true });
      break;
    case 3: // tall slim cup
      parts.push({ geo: cup(0.36, 0.7), x: 0, y: 0, z: 0 });
      parts.push({ geo: handle, x: -0.07, y: 0.25, z: 0, rz: Math.PI / 2, s: 0.7 });
      parts.push({ geo: handle, x: 0.07, y: 0.25, z: 0, rz: -Math.PI / 2, s: 0.7 });
      break;
    case 4: // ball on plinth
      parts.push({ box: [0.14, 0.06, 0.14], x: 0, y: 0.03, z: 0 });
      parts.push({ sph: 0.09, x: 0, y: 0.16, z: 0 });
      break;
    case 5:
      parts.push({ box: [0.2, 0.025, 0.12], x: 0, y: 0.0125, z: 0 });
      parts.push({ cyl: [0.075, 0.075, 0.014], x: 0, y: 0.12, z: 0.01, rx: Math.PI / 2 - 0.25 });
      parts.push({ cyl: [0.048, 0.048, 0.018], x: 0, y: 0.12, z: 0.012, rx: Math.PI / 2 - 0.25 });
      parts.push({ box: [0.04, 0.11, 0.006], x: 0, y: 0.205, z: -0.025, rx: -0.25, ribbon: true });
      break;
    case 6: // small cup pair
      parts.push({ geo: cup(0.2, 0.9), x: -0.065, y: 0, z: 0 });
      parts.push({ geo: cup(0.26, 0.9), x: 0.07, y: 0, z: 0 });
      break;
    default: // star on a stem
      parts.push({ cyl: [0.012, 0.03, 0.17], x: 0, y: 0.085, z: 0 });
      parts.push({ box: [0.13, 0.02, 0.09], x: 0, y: 0.01, z: 0 });
      parts.push({ star: true, x: 0, y: 0.26, z: 0 });
  }
  return parts;
}
let _starGeo = null;
function starGeo() {
  if (_starGeo) return _starGeo;
  const s = new THREE.Shape();
  for (let k = 0; k < 10; k++) {
    const r = k % 2 ? 0.045 : 0.1, a = (k / 10) * Math.PI * 2 + Math.PI / 2;
    if (k === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r); else s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  _starGeo = new THREE.ExtrudeGeometry(s, { depth: 0.02, bevelEnabled: false });
  _starGeo.translate(0, 0, -0.01);
  return _starGeo;
}

// slot matrix = cabinet-shelf frame (local +z faces into the room)
function addTrophy(batch, i, slot, color, ribbon = 0xff7a1a) {
  batch.frame.copy(slot);
  for (const p of trophyParts(i)) {
    const o = { jitter: 0, rx: p.rx, ry: p.ry, rz: p.rz, uv: 'white' };
    const col = p.ribbon ? ribbon : p.lite ? 0xf6d57a : color;
    if (p.box) batch.box(p.x, p.y, p.z, p.box[0], p.box[1], p.box[2], col, o);
    else if (p.cyl) batch.cyl(p.x, p.y, p.z, p.cyl[0], p.cyl[1], p.cyl[2], col, { ...o, seg: 16 });
    else if (p.sph) batch.sph(p.x, p.y, p.z, p.sph, col, o);
    else if (p.star) batch.geo(starGeo(), p.x, p.y, p.z, col, o);
    else if (p.geo) batch.geo(p.geo, p.x, p.y, p.z, col, { ...o, sx: p.s || 1, sy: p.s || 1, sz: p.s || 1 });
  }
}

// ================================================================ the room
export class LockerRoom {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'lockerRoom';
    this.group.position.copy(LOCKER_ORIGIN);
    this.group.visible = false;
    scene.add(this.group);

    this.pickables = [];
    this.mounts = {};
    this.profile = { name: 'PLAYER', number: 8, color: new THREE.Color(ORANGE) };
    this.trophies = 0;
    this.nextLabel = 'MATCH DAY';
    this.doorLabel = 'CONTINUE';
    this.doorGaze = 0;
    this._out = { doorGaze: 0 };
    this._hover = null;
    this._t = 0;
    this._flick = { next: 6, left: 0, f: 1 };
    this._painters = [];
    this._disposables = [];
    this._doorWorld = new THREE.Vector3();
    this._rng = mulberry32(20261115);

    this._build();
    this.setProfile({});
    this.setTrophies(0);
    this.setNextLabel(this.nextLabel);
    this._paintDoorSign();
    this.group.updateMatrixWorld(true);
    this._doorWorld.copy(this._doorLocal).applyMatrix4(this.group.matrixWorld);

    // canvas text needs the web fonts: redraw once they are in
    if (typeof document !== 'undefined' && document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load('800 40px "Barlow Condensed"'),
        document.fonts.load('700 40px "Barlow Condensed"'),
      ]).then(() => this._repaint()).catch(() => {});
    }
  }

  get visible() { return this.group.visible; }
  set visible(v) { this.group.visible = !!v; }
  show() {
    this.group.visible = true;
    this._hover = null;
    this.group.updateMatrixWorld(true);
    this._doorWorld.copy(this._doorLocal).applyMatrix4(this.group.matrixWorld);
  }
  hide() { this.group.visible = false; this.doorGaze = 0; this._out.doorGaze = 0; }

  /** Where the lead puts the player: world.placeUser(spawn.pos, spawn.yaw). */
  get spawn() {
    this.group.updateMatrixWorld(true);
    return { pos: new THREE.Vector3(0, 0, 0).applyMatrix4(this.group.matrixWorld), yaw: this.group.rotation.y };
  }

  /** Scene backdrop for the room (dark warm interior, no fog). stadium.js setEnvironment does the same by name. */
  applyEnvironment(scene = this.scene) {
    scene.background = new THREE.Color(0x0d0a08);
    scene.fog = null;
  }

  // ---------------------------------------------------------------- API
  setHover(mesh) { this._hover = mesh || null; }

  setProfile({ name, number, color } = {}) {
    const p = this.profile;
    if (name !== undefined && name !== null) p.name = String(name).toUpperCase().slice(0, 14);
    if (number !== undefined && number !== null) p.number = Math.max(0, Math.min(99, Math.floor(Number(number)) || 0));
    if (color !== undefined && color !== null) { try { p.color = new THREE.Color(color); } catch (e) { /* keep the old colour */ } }
    this._paintShirts();
    this._paintNameplate();
  }

  setTrophies(n) {
    n = clamp(Math.floor(Number(n) || 0), 0, 8);
    this.trophies = n;
    const gold = new Batch({ rng: null, bakeFn: this._bake }), ghost = new Batch({ rng: null });
    for (let i = 0; i < 8; i++) addTrophy(i < n ? gold : ghost, i, this._trophySlots[i], i < n ? 0xe8b53a : 0xd8cfbf);
    this._trophyGold.geometry.dispose();
    this._trophyGhost.geometry.dispose();
    this._trophyGold.geometry = gold.build();
    this._trophyGhost.geometry = ghost.build();
    this._trophyGold.visible = n > 0;
    this._trophyGhost.visible = n < 8;
  }

  setNextLabel(text) {
    this.nextLabel = String(text || '').toUpperCase().slice(0, 40) || 'MATCH DAY';
    this._paintChalk();
  }

  /** The big lit sign above the tunnel door: 'CONTINUE', 'PLAY'... (upper-cased, at most 16 characters). */
  setDoorLabel(text) {
    this.doorLabel = String(text || '').toUpperCase().slice(0, 16) || 'CONTINUE';
    this._paintDoorSign();
  }

  /** Call every frame. headPos/headDir are world-space (dir is the unit forward vector). */
  update(dt, headPos, headDir) {
    this._t += dt;
    const t = this._t;
    if (!this.group.visible) { this._out.doorGaze = 0; return this._out; }

    // door gaze
    let target = 0;
    if (headPos && headDir) target = gazeAmount(headPos, headDir, this._doorWorld);
    this.doorGaze += (target - this.doorGaze) * Math.min(1, dt * 5);
    this._out.doorGaze = this.doorGaze;

    // hover easing
    // pickables that share the hovered one's action light up together (door leaf + sign, board + header + frame)
    let doorHover = 0;
    const hoverAction = this._hover ? this._hover.userData.action : null;
    for (const p of this.pickables) {
      const u = p.userData;
      const goal = hoverAction && u.action === hoverAction ? 1 : 0;
      u.h += (goal - u.h) * Math.min(1, dt * 12);
      if (u.h < 0.002 && goal === 0) u.h = 0;
      if (u.glowMat) u.glowMat.emissive.copy(this._glow).multiplyScalar(u.h * u.glowK);
      if (u.outline) {
        u.outline.visible = u.h > 0.02;
        u.outline.material.opacity = u.h * 0.7;
      }
      if (u.pop) u.pop.scale.setScalar(1 + 0.035 * u.h);
      if (u.action === 'continue') doorHover = Math.max(doorHover, u.h);
    }

    // strip light: one fixture flickers now and then
    const f = this._flick;
    f.next -= dt;
    if (f.left > 0) {
      f.left -= dt;
      f.f = (Math.sin(t * 90) > -0.2 && Math.sin(t * 37 + 1.3) > -0.55) ? 1 : 0.2;
      if (f.left <= 0) f.f = 1;
    } else if (f.next <= 0) {
      f.left = 0.25 + this._rng() * 0.35;
      f.next = 7 + this._rng() * 12;
    }
    this._flickLamp.material.color.setScalar(0.35 + 0.65 * f.f);
    this._hemi.intensity = this._hemiBase * (1 - 0.1 * (1 - f.f));

    // door glow breathes; it swells when you look at it or point at it
    const glow = 0.86 + 0.05 * Math.sin(t * 2.1) + 0.04 * Math.sin(t * 5.3) + 0.22 * this.doorGaze + 0.2 * doorHover;
    this._frost.material.color.setScalar(clamp(glow, 0.6, 1.05));
    this._bloom.material.opacity = clamp(0.42 * glow + 0.3 * this.doorGaze, 0, 0.85);
    this._spill.material.opacity = clamp(0.5 * glow + 0.3 * this.doorGaze, 0, 0.95);
    this._doorLight.intensity = 3.4 * glow;
    // the lit sign breathes with the door and swells when you look at it or point at it
    this._doorSign.material.color.setScalar(clamp(0.93 + 0.03 * Math.sin(t * 2.1) + 0.05 * this.doorGaze + 0.05 * doorHover, 0.7, 1));
    this._signHalo.material.opacity = clamp(0.22 + 0.02 * Math.sin(t * 2.1) + 0.25 * this.doorGaze + 0.3 * doorHover, 0, 0.7);
    return this._out;
  }

  dispose() {
    this.group.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) { for (const m of [].concat(o.material)) { if (m.map) m.map.dispose(); m.dispose(); } }
    });
    this.scene.remove(this.group);
  }

  // ---------------------------------------------------------------- painting (redrawn on data/font change)
  _repaint() { for (const f of this._painters) f(); }

  _paintShirts() {
    const g = this._shirtCtx, rng = mulberry32(77), P = this.profile;
    g.clearRect(0, 0, SHIRT_ATLAS, SHIRT_ATLAS);
    const nums = teammateNumbers(P.number);
    const home = new THREE.Color(ORANGE);
    let k = 0;
    for (let i = 0; i < 11; i++) {
      const col = i % 4, row = Math.floor(i / 4);
      const mine = i === this._playerStall;
      const num = mine ? P.number : nums[k++];
      drawShirt(g, col * 256, row * 256, num, mine ? P.name : '', mine ? P.color : home, rng);
      // header plate number (small, bottom strip)
      const px = (i % 8) * 128, py = 768 + Math.floor(i / 8) * 64;
      g.fillStyle = '#1b1a18'; g.fillRect(px, py, 128, 64);
      g.fillStyle = mine ? hexStr(P.color) : '#d9d4c6';
      g.fillRect(px + 6, py + 6, 5, 52);
      plateText(g, px + 72, py + 33, String(num), 50, mine ? hexStr(P.color) : '#e9e5d8');
    }
    this._shirtTex.needsUpdate = true;
  }

  _paintNameplate() {
    const g = this._plateCtx, P = this.profile;
    const W = 1024, Hh = 200;
    g.clearRect(0, 0, W, Hh);
    g.fillStyle = '#1b1a18'; g.fillRect(0, 0, W, Hh);
    g.strokeStyle = 'rgba(242,240,232,0.16)'; g.lineWidth = 4; g.strokeRect(6, 6, W - 12, Hh - 12);
    g.fillStyle = hexStr(P.color); g.fillRect(14, 14, 210, Hh - 28);
    const ink = luma(P.color) < 0.18 ? '#f2f0e8' : '#15171a';
    g.fillStyle = ink; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = `800 150px ${FONT}`;
    g.fillText(String(P.number), 119, Hh / 2 + 8);
    g.fillStyle = '#f2f0e8'; g.textAlign = 'center';
    if ('letterSpacing' in g) g.letterSpacing = '4px';
    fit(g, P.name, W - 330, 160, 800);
    g.fillText(P.name, 250 + (W - 250) / 2, Hh / 2 + 8);
    if ('letterSpacing' in g) g.letterSpacing = '0px';
    this._plateTex.needsUpdate = true;
  }

  _paintDoorSign() {
    const sp = SIGNS.continue, g = this._signCtx;
    if (!g) return;
    g.clearRect(0, 0, this._signCv.width, this._signCv.height);
    drawPlate(g, [0, 0, this._signCv.width, this._signCv.height], sp, this.doorLabel, true);
    this._signTex.needsUpdate = true;
  }

  _paintChalk() {
    const g = this._chalkCtx, rng = mulberry32(5);
    const W = 1024, Hh = 256;
    g.clearRect(0, 0, W, Hh);
    const gr = g.createLinearGradient(0, 0, 0, Hh);
    gr.addColorStop(0, '#2b2e2c'); gr.addColorStop(1, '#222523');
    g.fillStyle = gr; g.fillRect(0, 0, W, Hh);
    for (let i = 0; i < 1400; i++) {
      g.fillStyle = `rgba(255,255,255,${0.012 + rng() * 0.03})`;
      g.fillRect(rng() * W, rng() * Hh, 2 + rng() * 14, 1 + rng() * 2);
    }
    // old ghosted chalk behind the text
    g.fillStyle = 'rgba(240,236,224,0.05)'; g.font = `800 150px ${FONT}`; g.textAlign = 'left'; g.textBaseline = 'middle';
    g.fillText('4-3-3', 40, 150);
    g.fillStyle = 'rgba(240,236,224,0.92)'; g.textAlign = 'center';
    const spaced = 'letterSpacing' in g;
    if (spaced) g.letterSpacing = '5px';
    fit(g, this.nextLabel, W - 140 - (spaced ? 0 : this.nextLabel.length * 5), 168, 800);
    if (spaced) g.letterSpacing = '5px';   // fit() resets the font, not the spacing
    g.fillText(this.nextLabel, W / 2 + 2, 120);
    if (spaced) g.letterSpacing = '0px';
    // chalk underline
    g.strokeStyle = 'rgba(255,122,26,0.9)'; g.lineWidth = 7; g.lineCap = 'round';
    g.beginPath(); g.moveTo(W / 2 - 220, 215); g.quadraticCurveTo(W / 2, 224, W / 2 + 220, 213); g.stroke();
    // dust specks over the text
    for (let i = 0; i < 260; i++) { g.fillStyle = 'rgba(30,32,30,0.35)'; g.fillRect(rng() * W, 40 + rng() * 150, 1 + rng() * 2, 1 + rng() * 2); }
    this._chalkTex.needsUpdate = true;
  }

  // ---------------------------------------------------------------- build
  _build() {
    const rng = this._rng;
    const bake = makeBake();
    this._bake = bake;
    const group = this.group;
    const toDispose = this._disposables;

    // textures
    const floorTex = texOf(floorCanvas(rng), { repeat: true, aniso: 8 });
    const wallTex = texOf(wallCanvas(rng), { repeat: true, aniso: 8 });
    const ceilTex = texOf(ceilCanvas(rng), { repeat: true });
    const woodTex = texOf(woodCanvas(rng), { repeat: true, aniso: 8 });
    const decoCv = decoCanvas();
    const decoTex = texOf(decoCv, { aniso: 4 });
    this._decoCv = decoCv; this._decoTex = decoTex;
    this._painters.push(() => {
      const fresh = decoCanvas();
      decoCv.getContext('2d').clearRect(0, 0, ATLAS.w, ATLAS.h);
      decoCv.getContext('2d').drawImage(fresh, 0, 0);
      decoTex.needsUpdate = true;
    });

    const shirtCv = cv(SHIRT_ATLAS, SHIRT_ATLAS);
    this._shirtCtx = shirtCv.getContext('2d');
    this._shirtTex = texOf(shirtCv, { aniso: 4 });
    const plateCv = cv(1024, 200);
    this._plateCtx = plateCv.getContext('2d');
    this._plateTex = texOf(plateCv, { aniso: 4 });
    const chalkCv = cv(1024, 256);
    this._chalkCtx = chalkCv.getContext('2d');
    this._chalkTex = texOf(chalkCv, { aniso: 4 });
    this._painters.push(() => this.setProfile({}), () => this._paintChalk());

    // materials
    const vcLambert = (map = null, extra = {}) => new THREE.MeshLambertMaterial({ vertexColors: true, map, ...extra });
    const mFloor = vcLambert(floorTex);
    const mWall = vcLambert(wallTex);
    const mCeil = vcLambert(ceilTex);
    const mSolid = vcLambert();
    const mWood = vcLambert(woodTex);
    const mDeco = vcLambert(decoTex, { alphaTest: 0.4 });
    const mShirt = vcLambert(this._shirtTex, { alphaTest: 0.5, side: THREE.DoubleSide });
    const mLamp = new THREE.MeshBasicMaterial({ vertexColors: true, map: decoTex, alphaTest: 0.4 });
    const mPlate = vcLambert(this._plateTex);

    // batches
    const mk = (uvm = 2) => new Batch({ rng, bakeFn: bake, uvPerMetre: uvm });
    const walls = mk(), floor = mk(), ceil = mk(), solid = mk(), wood = mk(2), deco = mk(), shirts = mk(), lamps = new Batch({ rng, uvPerMetre: 1 }), plate = mk();
    const all = [solid, wood, deco, shirts, lamps, plate];
    const setFrame = (m) => { for (const b of all) b.frame.copy(m); };
    const WHITE = new THREE.Color(1, 1, 1);
    const R = (k) => atlasRect(AT[k]);
    // a label plate on a wall: dark backing, the atlas face, an invisible pick plane and a hover outline
    const hitMat = new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide });
    this._hitMat = hitMat;
    const SIGN_ACTION = { settings: 'settings', career: 'career', today: 'notice', stats: 'stats' };
    const signPlate = (key, wall, u, y) => {
      const sp = SIGNS[key];
      setFrame(wallMatrix(wall, u));
      solid.box(0, y, 0.03, sp.w + 0.03, sp.h + 0.03, 0.03, 0x161513);
      deco.quad(0, y, 0.047, sp.w, sp.h, WHITE, R(key));
      const hit = new THREE.Mesh(new THREE.PlaneGeometry(sp.w + 0.12, sp.h + 0.12), hitMat);
      placeOnWall(hit, wall, u, y, 0.07);
      group.add(hit);
      const ol = this._outlineFor(sp.w, sp.h, 0.02);
      placeOnWall(ol, wall, u, y, 0.052);
      group.add(ol);
      this._pickable(hit, SIGN_ACTION[key], { outline: ol });
    };

    // ---- shell
    const up = new THREE.Vector3(0, H, 0);
    for (const name of ['front', 'back', 'left', 'right']) {
      const w = WALLS[name];
      const t = new THREE.Vector3(...w.t);
      const p0 = new THREE.Vector3(...w.o).addScaledVector(t, -w.len / 2);
      walls.grid(p0, t.clone().multiplyScalar(w.len), up, Math.round(w.len / 0.35), 14, WHITE, (pt, s, tt) => [(s * w.len) / 1.5 + (name === 'left' || name === 'right' ? 0.37 : 0), tt]);
    }
    floor.grid(new THREE.Vector3(-HX, 0, -HZ), new THREE.Vector3(0, 0, 2 * HZ), new THREE.Vector3(2 * HX, 0, 0), 28, 36, WHITE, (pt) => [pt.x / 1.2, pt.z / 1.2]);
    ceil.grid(new THREE.Vector3(-HX, H, -HZ), new THREE.Vector3(2 * HX, 0, 0), new THREE.Vector3(0, 0, 2 * HZ), 18, 14, new THREE.Color(0.55, 0.55, 0.55), (pt) => [pt.x / 1.2, pt.z / 1.2]);
    const meshOf = (batch, mat, name) => {
      const m = new THREE.Mesh(batch.build(), mat);
      m.name = name; group.add(m);
      return m;
    };
    meshOf(walls, mWall, 'walls');
    meshOf(floor, mFloor, 'floor');
    meshOf(ceil, mCeil, 'ceiling');

    // ---- ceiling: strip lights, pipe run
    const stripPos = [];
    for (const z of [-1.5, 1.5]) for (const x of [-2.8, 0, 2.8]) stripPos.push([x, z]);
    setFrame(new THREE.Matrix4());
    const flickerIdx = 4; // x=0, z=1.5, above the way to the own locker
    this._flickLamp = null;
    const flickBatch = new Batch({ rng: null, uvPerMetre: 1 });
    stripPos.forEach(([x, z], i) => {
      solid.box(x, H - 0.035, z, 1.3, 0.07, 0.2, 0x37342f, { noBake: false });
      const b = i === flickerIdx ? flickBatch : lamps;
      b.box(x, H - 0.074, z, 1.2, 0.012, 0.13, 0xfff0d6, { uv: 'white', noBake: true, jitter: 0 });
    });
    solid.cyl(0, 3.02, -3.3, 0.05, 0.05, 2 * HX, 0x6a655d, { rz: Math.PI / 2, seg: 8 });
    solid.cyl(0, 3.0, -3.18, 0.025, 0.025, 2 * HX, 0x8d5a2f, { rz: Math.PI / 2, seg: 6 });
    // wall lights beside the door
    const flickMesh = new THREE.Mesh(flickBatch.build(), new THREE.MeshBasicMaterial({ vertexColors: true, map: decoTex }));
    flickMesh.name = 'flickerLamp';
    group.add(flickMesh);
    this._flickLamp = flickMesh;

    // ---- stalls
    const stalls = [];
    const bankDefs = [
      { wall: 'front', us: [-1.1, 0, 1.1] },
      { wall: 'right', us: [-2.85, -1.75] },   // 0.15 m toward the corners: room for a readable sign beside the door
      { wall: 'right', us: [1.75, 2.85] },
      { wall: 'back', us: [-3.3, -2.2] },
      { wall: 'back', us: [2.2, 3.3] },
    ];
    // stall indices: front 0,1,2 (1 = the player's), right 3..6, back 7..10
    this._playerStall = 1;

    const WOOD_DARK = 0x4a3426, WOOD_MID = 0x7b5738, WOOD_LIGHT = 0xb68c5a, METAL = 0x8a8c88, DARK = 0x1c1b19;

    const boots = (x, y, z, ry, accent) => {
      for (const dx of [-0.07, 0.07]) {
        solid.box(x + dx * Math.cos(ry), y + 0.045, z - dx * Math.sin(ry), 0.085, 0.07, 0.24, 0x16171a, { ry, jitter: 0.1 });
        solid.box(x + dx * Math.cos(ry), y + 0.01, z - dx * Math.sin(ry), 0.09, 0.02, 0.26, accent, { ry, jitter: 0.1 });
      }
    };

    for (const bank of bankDefs) {
      const us = bank.us;
      const uMin = Math.min(...us) - SW / 2, uMax = Math.max(...us) + SW / 2;
      const uc = (uMin + uMax) / 2, bw = uMax - uMin;
      // bank frame
      setFrame(wallMatrix(bank.wall, uc));
      // bench seat, legs, shoe shelf
      wood.box(0, 0.44, 0.34, bw, 0.05, 0.46, WOOD_LIGHT, { jitter: 0.03 });
      wood.box(0, 0.16, 0.25, bw - 0.1, 0.03, 0.34, WOOD_MID);
      for (let k = 0; k <= us.length; k++) {
        const lx = uMin + k * SW - uc;
        solid.box(lx, 0.21, 0.34, 0.045, 0.42, 0.4, DARK);
        wood.box(lx, 1.2, 0.235, 0.04, 2.4, 0.47, WOOD_MID, { swap: true });
      }
      // dark recess below the bench
      solid.box(0, 0.22, 0.045, bw, 0.4, 0.03, 0x24211e);
      // rubber mat in front of the bank
      solid.box(0, 0.006, 0.62, bw + 0.1, 0.012, 0.95, bank.wall === 'front' ? 0x2d2a26 : 0x2f2c28, { noBake: false });
      // overhead conduit
      solid.box(0, 2.46, 0.04, bw, 0.05, 0.05, 0x3a3733);
    }

    this._stallFrames = [];
    const stallDefs = [];
    for (const bank of bankDefs) {
      const list = bank.wall === 'right' ? [...bank.us].sort((a, b) => a - b) : bank.us;
      list.forEach((u) => stallDefs.push({ wall: bank.wall, u }));
    }
    stallDefs.forEach((s, idx) => {
      const mine = idx === this._playerStall;
      const F = wallMatrix(s.wall, s.u);
      setFrame(F);
      const w = SW - 0.04;
      wood.box(0, 1.2, 0.02, w, 2.4, 0.04, mine ? 0x5a3f2c : WOOD_DARK, { swap: true });
      wood.box(0, 2.08, 0.235, w, 0.035, 0.43, WOOD_MID);
      // header board with number plate
      solid.box(0, 2.31, 0.04, w, 0.2, 0.04, 0x1b1a18);
      const pxr = [(idx % 8) * 128, 768 + Math.floor(idx / 8) * 64, 128, 64];
      const atlasPlate = [(pxr[0] + 0.5) / SHIRT_ATLAS, 1 - (pxr[1] + pxr[3] - 0.5) / SHIRT_ATLAS, (pxr[0] + pxr[2] - 0.5) / SHIRT_ATLAS, 1 - (pxr[1] + 0.5) / SHIRT_ATLAS];
      if (!mine) shirts.quad(0, 2.31, 0.065, 0.36, 0.18, WHITE, atlasPlate, { noBake: false });
      // hook rail + hooks
      solid.box(0, 1.95, 0.065, w - 0.16, 0.025, 0.03, METAL);
      for (const hx of [-0.3, 0, 0.3]) solid.cyl(hx, 1.95, 0.09, 0.011, 0.011, 0.05, METAL, { rx: Math.PI / 2, seg: 6 });
      // hanger
      solid.box(0, 1.915, 0.1, 0.04, 0.06, 0.012, METAL);
      solid.box(0, 1.865, 0.1, 0.46, 0.014, 0.014, 0x6a4a2e, { jitter: 0 });
      // shirt
      const geo = new THREE.PlaneGeometry(0.8, 0.78, 10, 12);
      const pa = geo.attributes.position;
      const ph = rng() * 6.28, bulge = 0.02 + rng() * 0.012;
      for (let i = 0; i < pa.count; i++) {
        const x = pa.getX(i), y = pa.getY(i);
        const s = x / 0.8, t = (0.39 - y) / 0.78;
        const body = Math.cos(clamp(s * 1.6, -1.4, 1.4)) * bulge;
        const fold = Math.sin(x * 22 + ph) * 0.0045 * (0.3 + t);
        const hem = 0.03 * t * t * Math.sin(ph);
        pa.setZ(i, 0.1 + body + fold + hem + 0.015 * t * t);
        pa.setY(i, y + 1.49);
      }
      geo.computeVertexNormals();
      const cx = (idx % 4) * 256 + 6, cy = Math.floor(idx / 4) * 256 + 6, cs = 244;
      const shirtRect = [cx / SHIRT_ATLAS, 1 - (cy + cs) / SHIRT_ATLAS, (cx + cs) / SHIRT_ATLAS, 1 - cy / SHIRT_ATLAS];
      shirts.add(geo, new THREE.Matrix4(), WHITE, { uv: 'rect', rect: shirtRect, jitter: 0 });
      geo.dispose();

      // bench clutter
      if (mine) {
        boots(-0.22, 0.465, 0.36, 0.35, ORANGE);
        solid.box(0.25, 0.49, 0.36, 0.34, 0.06, 0.24, 0xf0ebdd, { ry: -0.1 });
        solid.box(0.25, 0.545, 0.36, 0.34, 0.05, 0.24, 0xe9e4d4, { ry: -0.12 });
        solid.cyl(0.43, 0.565, 0.3, 0.032, 0.032, 0.2, 0xe4e6e2, { seg: 8 });
        solid.cyl(0.43, 0.675, 0.3, 0.02, 0.02, 0.03, ORANGE, { seg: 8 });
      } else {
        const r = rng();
        if (r < 0.5) boots(-0.2 + rng() * 0.4, 0.465, 0.35, rng() * 0.6 - 0.3, rng() < 0.5 ? ORANGE : 0xf0ebdd);
        else {
          solid.box(-0.15 + rng() * 0.3, 0.485, 0.34, 0.3, 0.05, 0.22, rng() < 0.5 ? 0xf0ebdd : ORANGE, { ry: rng() * 0.4 - 0.2 });
        }
        if (rng() < 0.4) {
          const bx = -0.35 + rng() * 0.7;
          solid.cyl(bx, 0.565, 0.4, 0.03, 0.03, 0.2, 0xe4e6e2, { seg: 8 });
          solid.cyl(bx, 0.675, 0.4, 0.019, 0.019, 0.03, ORANGE, { seg: 8 });
        }
      }
      // boots on the shoe shelf
      if (rng() < 0.7) boots(-0.2 + rng() * 0.4, 0.18, 0.25, rng() * 0.5 - 0.25, 0x2a2926);
      this._stallFrames.push(F.clone());
    });

    // ---- the player's own locker: floor mat and a ball on the shelf above
    setFrame(wallMatrix('front', 0));
    solid.box(0, 0.014, 0.85, 1.05, 0.012, 1.0, 0xd8650f, { noBake: false });
    addBall(solid, 0.38, 0.115, 1.0, 0.11);

    // ---- front wall: lettering above the bank, marker tray under the career board
    setFrame(wallMatrix('front', 0));
    deco.quad(0, 2.82, 0.012, 3.2, 0.4, WHITE, R('heads'));

    // ---- boards ------------------------------------------------------------
    const careerU = -3.15, noticeU = 2.95; // front wall: u grows to the viewer's right (= -x)
    // career board (tactics board)
    {
      const sw = 2.5, sh = 1.6, yc = 1.62;
      setFrame(wallMatrix('front', careerU));
      const fr = 0x9ea09b;
      solid.box(0, yc + sh / 2 + 0.025, 0.02, sw + 0.1, 0.05, 0.04, fr);
      solid.box(0, yc - sh / 2 - 0.025, 0.02, sw + 0.1, 0.05, 0.04, fr);
      solid.box(-sw / 2 - 0.025, yc, 0.02, 0.05, sh, 0.04, fr);
      solid.box(sw / 2 + 0.025, yc, 0.02, 0.05, sh, 0.04, fr);
      solid.box(0, yc, 0.01, sw, sh, 0.02, 0x1d1e1a);
      // marker tray
      solid.box(0, yc - sh / 2 - 0.08, 0.06, sw * 0.86, 0.025, 0.09, fr);
      solid.box(0, yc - sh / 2 - 0.063, 0.1, sw * 0.86, 0.045, 0.012, fr);
      const cols = [ORANGE, 0xf0ebdd, 0x16171a, ORANGE, 0xe9d28a];
      cols.forEach((c, i) => solid.cyl(-0.55 + i * 0.11, yc - sh / 2 - 0.0545, 0.07, 0.009, 0.009, 0.11, c, { rz: Math.PI / 2, ry: 0.15 * i, seg: 6, jitter: 0 }));
      [0.2, 0.28, 0.36, 0.55].forEach((x, i) => solid.cyl(x, yc - sh / 2 - 0.0545, 0.06, 0.017, 0.017, 0.012, i % 2 ? ORANGE : 0xf0ebdd, { seg: 10, jitter: 0 }));
      solid.box(0.8, yc - sh / 2 - 0.0445, 0.06, 0.11, 0.025, 0.045, 0x2a2926);
    }
    // noticeboard (cork)
    {
      const sw = 1.5, sh = 1.2, yc = 1.56;
      setFrame(wallMatrix('front', noticeU));
      const fr = WOOD_MID;
      wood.box(0, yc + sh / 2 + 0.03, 0.025, sw + 0.12, 0.06, 0.05, fr);
      wood.box(0, yc - sh / 2 - 0.03, 0.025, sw + 0.12, 0.06, 0.05, fr);
      wood.box(-sw / 2 - 0.03, yc, 0.025, 0.06, sh, 0.05, fr, { swap: true });
      wood.box(sw / 2 + 0.03, yc, 0.025, 0.06, sh, 0.05, fr, { swap: true });
      solid.box(0, yc, 0.01, sw, sh, 0.02, 0x7a5434);
    }
    // header plates over the boards: the panels cover the boards, these stay readable and pickable
    signPlate('career', 'front', careerU, 2.66);
    signPlate('today', 'front', noticeU, 2.4);
    setFrame(new THREE.Matrix4());

    // ---- left wall: TV + bench, trophy cabinet, towel shelf
    {
      setFrame(wallMatrix('left', 0));
      const yc = 1.7;
      solid.box(0, yc, 0.025, 1.9, 1.1, 0.05, 0x16171a);
      signPlate('stats', 'left', 0, 2.42);
      setFrame(wallMatrix('left', 0));
      // low bench under the TV, along the wall
      setFrame(wallMatrix('left', 0.4));
      wood.box(0, 0.44, 0.3, 2.6, 0.05, 0.38, WOOD_LIGHT);
      for (const lx of [-1.25, -0.4, 0.4, 1.25]) solid.box(lx, 0.21, 0.3, 0.05, 0.42, 0.34, DARK);
      solid.box(0, 0.006, 0.7, 2.6, 0.012, 0.9, 0x2f2c28);
      // folded towels + bottles on the bench
      [-0.8, 0.2, 0.95].forEach((x, i) => {
        solid.box(x, 0.495, 0.3, 0.32, 0.06, 0.22, i === 1 ? ORANGE : 0xf0ebdd, { ry: 0.1 * i });
        solid.box(x, 0.55, 0.3, 0.32, 0.05, 0.22, i === 1 ? 0xf0ebdd : ORANGE, { ry: -0.08 * i });
      });
      [-0.4, -0.33, 0.6].forEach((x) => { solid.cyl(x, 0.57, 0.35, 0.03, 0.03, 0.2, 0xe4e6e2, { seg: 8 }); solid.cyl(x, 0.675, 0.35, 0.019, 0.019, 0.03, ORANGE, { seg: 8 }); });
    }
    // trophy cabinet
    this._trophySlots = [];
    {
      const cu = -2.35, yc = 1.65, cw = 2.1, ch = 1.4;
      setFrame(wallMatrix('left', cu));
      solid.box(0, yc, 0.015, cw, ch, 0.03, 0x1b1816);
      // frame
      const fr = WOOD_MID;
      wood.box(0, yc + ch / 2 + 0.03, 0.12, cw + 0.1, 0.06, 0.24, fr);
      wood.box(0, yc - ch / 2 - 0.03, 0.12, cw + 0.1, 0.06, 0.24, fr);
      wood.box(-cw / 2 - 0.03, yc, 0.12, 0.06, ch, 0.24, fr, { swap: true });
      wood.box(cw / 2 + 0.03, yc, 0.12, 0.06, ch, 0.24, fr, { swap: true });
      // shelves
      const sy = [yc - 0.4, yc + 0.28];
      for (const y of sy) {
        wood.box(0, y - 0.0125, 0.13, cw - 0.04, 0.025, 0.2, 0x3b2c20);
      }
      // warm LED strips under the top and middle
      lamps.box(0, yc + ch / 2 - 0.02, 0.2, cw - 0.1, 0.012, 0.03, 0xffe2b0, { uv: 'white', noBake: true, jitter: 0 });
      lamps.box(0, sy[1] - 0.03, 0.2, cw - 0.1, 0.012, 0.03, 0xffe2b0, { uv: 'white', noBake: true, jitter: 0 });
      // slot frames in room space (local +z faces into the room)
      const M = wallMatrix('left', cu);
      for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
        this._trophySlots.push(M.clone().multiply(new THREE.Matrix4().makeTranslation(-0.75 + c * 0.5, sy[r], 0.13)));
      }
    }
    // towel shelf unit in the front-left corner
    {
      setFrame(wallMatrix('left', 2.5));
      wood.box(0, 0.55, 0.19, 1.0, 0.03, 0.34, WOOD_MID);
      wood.box(0, 1.1, 0.19, 1.0, 0.03, 0.34, WOOD_MID);
      wood.box(0, 1.65, 0.19, 1.0, 0.03, 0.34, WOOD_MID);
      for (const sx of [-0.5, 0.5]) wood.box(sx, 0.85, 0.19, 0.035, 1.7, 0.36, WOOD_MID, { swap: true });
      wood.box(0, 0.85, 0.02, 1.0, 1.7, 0.03, WOOD_DARK, { swap: true });
      [0.58, 1.13, 1.68].forEach((y, k) => {
        for (let i = 0; i < 3; i++) {
          const c = (k + i) % 3 === 0 ? ORANGE : 0xf0ebdd;
          solid.box(-0.3 + i * 0.3, y + 0.04 + (i === 1 ? 0.03 : 0), 0.19, 0.26, 0.07 + (i === 1 ? 0.06 : 0), 0.26, c, { jitter: 0.06 });
        }
      });
    }

    // ---- right wall: door frame, sign housing above the door, hook for the clipboard
    const gapU = -0.885;   // middle of the gap between the door frame and the nearest stall
    {
      setFrame(wallMatrix('right', 0));
      const fc = 0x24221f;
      solid.box(-0.54, 1.1, 0.05, 0.1, 2.2, 0.1, fc);
      solid.box(0.54, 1.1, 0.05, 0.1, 2.2, 0.1, fc);
      solid.box(0, 2.2, 0.05, 1.18, 0.1, 0.1, fc);
      // kick plate and push bar
      solid.box(0, 0.12, 0.092, 0.95, 0.24, 0.012, 0x6d6e6a);
      solid.box(0, 1.05, 0.11, 0.7, 0.04, 0.03, METAL);
      for (const bx of [-0.3, 0.3]) solid.box(bx, 1.05, 0.092, 0.03, 0.04, 0.03, METAL);
      // hazard-free orange stripe at the threshold
      solid.box(0, 0.005, 0.1, 1.18, 0.01, 0.2, 0x2a2724, { noBake: true });
      // housing for the lit door sign (the sign face itself is a separate mesh, see _door)
      solid.box(0, 2.41, 0.06, SIGNS.continue.w + 0.06, SIGNS.continue.h + 0.03, 0.1, 0x1b1a18);
      // small exit sign on the other side of the door
      setFrame(wallMatrix('right', -gapU));
      solid.box(0, 1.95, 0.045, 0.34, 0.14, 0.05, 0x2a2926);
      lamps.quad(0, 1.95, 0.073, 0.3, 0.1125, WHITE, R('exit'), { noBake: true });
      // clipboard hook, and the SETTINGS plate above it (the gap between the door frame and the first stall is ~0.59 m)
      setFrame(wallMatrix('right', gapU));
      solid.cyl(0, 1.72, 0.03, 0.012, 0.012, 0.06, METAL, { rx: Math.PI / 2, seg: 6 });
      solid.box(0, 1.695, 0.05, 0.03, 0.05, 0.02, METAL);
      signPlate('settings', 'right', gapU, 1.93);
    }
    // ---- back wall: physio table, first aid, clock
    {
      setFrame(wallMatrix('back', 0));
      // table
      solid.box(0, 0.8, 0.62, 1.9, 0.09, 0.72, 0xd9d2c0, { jitter: 0.02 });
      solid.box(0, 0.73, 0.62, 1.88, 0.06, 0.7, 0x3a3631);
      for (const lx of [-0.8, 0.8]) for (const lz of [0.4, 0.84]) solid.box(lx, 0.36, lz, 0.05, 0.72, 0.05, 0x8d8f8c);
      solid.box(0, 0.12, 0.62, 1.7, 0.03, 0.04, 0x8d8f8c);
      solid.cyl(-0.78, 0.91, 0.62, 0.065, 0.065, 0.72, 0xf0ebdd, { rz: Math.PI / 2, seg: 12 });
      solid.box(-0.1, 0.87, 0.62, 0.4, 0.03, 0.24, ORANGE, { ry: 0.04 });
      // ice bucket + bottles
      solid.cyl(1.45, 0.27, 0.45, 0.2, 0.17, 0.54, 0x55524c, { seg: 14 });
      solid.cyl(1.45, 0.56, 0.45, 0.2, 0.2, 0.04, 0xdedad0, { seg: 14 });
      // first-aid cabinet + clock
      solid.box(-1.3, 1.65, 0.07, 0.5, 0.65, 0.14, 0xe9e5d8);
      solid.box(-1.3, 1.65, 0.145, 0.22, 0.06, 0.012, 0x2e7d55);
      solid.box(-1.3, 1.65, 0.145, 0.06, 0.22, 0.012, 0x2e7d55);
      solid.cyl(0.6, 2.4, 0.04, 0.22, 0.22, 0.06, 0x24221f, { rx: Math.PI / 2, seg: 20 });
      deco.quad(0.6, 2.4, 0.078, 0.38, 0.38, WHITE, R('clock'));
      // cones and a ball net in the back corner
      setFrame(new THREE.Matrix4());
      for (let i = 0; i < 5; i++) solid.cyl(4.05 + i * 0.01, 0.07 + i * 0.07, -3.15, 0.12 - i * 0.012, 0.16 - i * 0.012, 0.14, ORANGE, { seg: 10, jitter: 0.02 });
    }

    // ---- kit bag (PRACTICE), balls and cones. Separate mesh: pickable.
    const bagBatch = new Batch({ rng, bakeFn: bake, uvPerMetre: 1 });
    {
      const O = ORANGE, D = 0x15171a;
      // duffel lying on its side, built around the origin. The pocket and the PRACTICE tag face -z (toward the spawn).
      const tube = cachedGeo('bagTube', () => new THREE.CylinderGeometry(0.17, 0.17, 1, 16));
      const wk = { uv: 'white', jitter: 0, rz: Math.PI / 2 };
      bagBatch.geo(tube, 0, 0.15, 0, O, { ...wk, sx: 0.86, sy: 0.74, sz: 1 });
      bagBatch.geo(tube, 0.372, 0.15, 0, D, { ...wk, sx: 0.86, sy: 0.02, sz: 0.97 });
      bagBatch.geo(tube, -0.372, 0.15, 0, D, { ...wk, sx: 0.86, sy: 0.02, sz: 0.97 });
      bagBatch.geo(tube, 0.19, 0.15, 0, D, { ...wk, sx: 0.88, sy: 0.05, sz: 1.02 }); // straps round the body
      bagBatch.geo(tube, -0.19, 0.15, 0, D, { ...wk, sx: 0.88, sy: 0.05, sz: 1.02 });
      bagBatch.box(0, 0.296, 0, 0.62, 0.014, 0.07, D, { uv: 'white', jitter: 0 }); // zip
      bagBatch.box(0, 0.12, -0.165, 0.46, 0.15, 0.04, D, { uv: 'white', jitter: 0 }); // side pocket
      const strap = new THREE.TorusGeometry(0.1, 0.011, 6, 14, Math.PI);
      bagBatch.geo(strap, -0.19, 0.28, 0, D, { uv: 'white', jitter: 0, ry: Math.PI / 2 });
      bagBatch.geo(strap, 0.19, 0.28, 0, D, { uv: 'white', jitter: 0, ry: Math.PI / 2 });
      bagBatch.quad(0.12, 0.17, -0.19, 0.22, 0.11, WHITE, R('tag'), { ry: Math.PI, rz: -0.05 });
    }
    const bagMat = vcLambert(decoTex, { alphaTest: 0.4 });
    const bag = new THREE.Mesh(bagBatch.build(), bagMat);
    bag.name = 'kitBag';
    bag.position.set(1.75, 0, 1.45);
    bag.rotation.y = 0.7;
    group.add(bag);
    {
      // invisible padded hit proxy: the whole bag with a generous margin (it is a floor-level target)
      const hit = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.8, 0.95), hitMat);
      hit.position.set(0, 0.35, 0);
      bag.add(hit);
      this._pickable(hit, 'practice', { glowMat: bagMat, k: 0.035, pop: bag });
    }
    // PRACTICE on a floor stand behind the bag, facing the spawn
    {
      const sp = SIGNS.practice;
      const px = 2.0, pz = 1.85, py = 0.8;    // behind the bag, low enough not to cover the career board's bottom row
      const face = Math.atan2(-px, -pz);          // +z of the stand frame points at the spawn
      setFrame(new THREE.Matrix4().makeRotationY(face).setPosition(px, 0, pz));
      solid.cyl(0, 0.02, 0, 0.2, 0.22, 0.04, 0x2a2926, { seg: 14, noBake: false });
      solid.cyl(0, 0.46, 0, 0.014, 0.014, 0.92, METAL, { seg: 8 });
      solid.box(0, py, 0, sp.w + 0.03, sp.h + 0.03, 0.03, 0x161513);
      deco.quad(0, py, 0.017, sp.w, sp.h, WHITE, R('practice'));
      deco.quad(0, py, -0.017, sp.w, sp.h, WHITE, R('practice'), { ry: Math.PI });
      const hit = new THREE.Mesh(new THREE.BoxGeometry(sp.w + 0.14, sp.h + 0.14, 0.16), hitMat);
      hit.position.set(px, py, pz);
      hit.rotation.y = face;
      group.add(hit);
      const ol = this._outlineFor(sp.w, sp.h, 0.02);
      ol.position.set(px, py, pz); ol.rotation.y = face;
      ol.translateZ(0.02);
      group.add(ol);
      this._pickable(hit, 'practice', { outline: ol });
    }
    // balls and cones next to it
    setFrame(new THREE.Matrix4());
    addBall(solid, 2.35, 0.11, 1.05, 0.11);
    addBall(solid, 2.3, 0.11, 1.9, 0.11);
    addBall(solid, 1.3, 0.11, 2.1, 0.11);
    for (const [cx, cz] of [[3.0, 1.9], [3.3, 2.2], [3.05, 2.45]]) {
      solid.box(cx, 0.008, cz, 0.24, 0.016, 0.24, ORANGE, { jitter: 0.03 });
      solid.cyl(cx, 0.16, cz, 0.02, 0.1, 0.3, ORANGE, { seg: 10, jitter: 0.03 });
      solid.cyl(cx, 0.1, cz, 0.065, 0.065, 0.025, 0xf0ebdd, { seg: 10, jitter: 0 });
    }

    // ---- clipboard (SETTINGS). Separate mesh: pickable.
    const clipBatch = new Batch({ rng: null, bakeFn: bake, uvPerMetre: 1 });
    {
      const bd = 0x6a4a2e;
      clipBatch.box(0, 0, 0, 0.25, 0.34, 0.012, bd, { uv: 'white' });
      clipBatch.quad(0, -0.01, 0.0075, 0.21, 0.27, WHITE, R('sheet'));
      clipBatch.box(0, 0.16, 0.014, 0.1, 0.035, 0.014, METAL, { uv: 'white' });
      clipBatch.cyl(0.09, -0.12, 0.012, 0.005, 0.005, 0.24, 0x16171a, { uv: 'white', rx: 0.05, seg: 6 });
    }
    const clipMat = vcLambert(decoTex, { alphaTest: 0.4 });
    const clip = new THREE.Mesh(clipBatch.build(), clipMat);
    clip.name = 'clipboard';
    {
      const w = WALLS.right;
      clip.position.set(w.o[0] + w.t[0] * gapU + w.n[0] * 0.08, 1.49, w.o[2] + w.t[2] * gapU + w.n[2] * 0.08);
      clip.rotation.y = w.yaw;
      clip.rotation.z = 0.03;
      clip.scale.setScalar(1.3);
    }
    group.add(clip);
    {
      // pick volume: clipboard and its plate, the full width of the gap beside the door
      const hit = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.9, 0.24), hitMat);
      placeOnWall(hit, 'right', gapU, 1.6, 0.12);
      group.add(hit);
      const ol = this._outlineFor(0.25, 0.34, 0.02);
      ol.position.z = 0.01;
      clip.add(ol);
      this._pickable(hit, 'settings', { glowMat: clipMat, k: 0.08, outline: ol });
    }

    // ---- merge the static batches
    meshOf(solid, mSolid, 'furniture');
    meshOf(wood, mWood, 'wood');
    meshOf(deco, mDeco, 'decals');
    const shirtMesh = meshOf(shirts, mShirt, 'shirts');
    meshOf(lamps, mLamp, 'lamps');
    shirtMesh.renderOrder = 0;

    // ---- boards as meshes (pickable), TV, mounts
    this._boards(tacticsCanvas, corkCanvas, screenCanvas, rng, careerU, noticeU);
    this._door(frostCanvas, beamCanvas, bloomCanvas, rng);
    this._nameplateAndChalk(group);

    // trophies: two dynamic meshes, rebuilt by setTrophies
    this._trophyGold = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0x4a3208 }));
    this._trophyGold.name = 'trophiesGold';
    this._trophyGhost = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.13, depthWrite: false }));
    this._trophyGhost.name = 'trophiesGhost';
    group.add(this._trophyGold, this._trophyGhost);

    // ---- lights (inside the group so they hide with it)
    this._hemiBase = 2.4;
    this._hemi = new THREE.HemisphereLight(0xfff3e2, 0x8f7c64, this._hemiBase);
    this._glow = new THREE.Color(ORANGE);
    const spot = new THREE.SpotLight(0xfff0d6, 42, 0, 0.46, 0.7, 2);
    spot.position.set(0, 3.0, 1.2);
    spot.target.position.set(0, 1.5, HZ - 0.05);
    this._doorLight = new THREE.PointLight(0xfff0d8, 2.6, 7, 2);
    this._doorLight.position.set(-3.7, 1.5, 0);
    group.add(this._hemi, spot, spot.target, this._doorLight);
    this._spot = spot;
  }

  // registers a pickable: userData.action + hover state
  // registers a pickable. Hover = a warm outline and/or a faint emissive on glowMat (strength k) and/or a 3.5% scale pop.
  _pickable(mesh, action, { glowMat = null, outline = null, k = 0.1, pop = null } = {}) {
    const u = mesh.userData;
    u.action = action;
    u.h = 0;
    u.glowMat = glowMat; u.glowK = k;
    u.outline = outline;
    u.pop = pop;
    if (glowMat) glowMat.emissive = new THREE.Color(0, 0, 0);
    if (outline) outline.visible = false;
    this.pickables.push(mesh);
    return mesh;
  }

  // thin warm frame whose inner opening is w x h
  _outlineFor(w, h, thickness = 0.03) {
    const b = new Batch({ rng: null, uvPerMetre: 1 });
    const t = thickness;
    b.box(0, h / 2 + t / 2, 0, w + 2 * t, t, 0.004, ORANGE, { uv: 'white', noBake: true });
    b.box(0, -h / 2 - t / 2, 0, w + 2 * t, t, 0.004, ORANGE, { uv: 'white', noBake: true });
    b.box(-w / 2 - t / 2, 0, 0, t, h, 0.004, ORANGE, { uv: 'white', noBake: true });
    b.box(w / 2 + t / 2, 0, 0, t, h, 0.004, ORANGE, { uv: 'white', noBake: true });
    const m = new THREE.Mesh(b.build(), new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, depthWrite: false }));
    m.visible = false;
    m.renderOrder = 2;
    return m;
  }

  _boards(tacticsCanvas, corkCanvas, screenCanvas, rng, careerU, noticeU) {
    const group = this.group;
    const mount = (name, wall, u, y, off, w, h, pickW, pickH, tex, action, basic, frameW, frontZ) => {
      const holder = new THREE.Object3D();
      holder.name = name;
      placeOnWall(holder, wall, u, y, off);
      // width/height: the Panel size this mount is made for; maxWidth/maxHeight: the whole board surface
      holder.userData.width = w; holder.userData.height = h;
      holder.userData.maxWidth = pickW; holder.userData.maxHeight = pickH;
      group.add(holder);
      const mat = basic ? new THREE.MeshBasicMaterial({ map: tex }) : new THREE.MeshLambertMaterial({ map: tex });
      const surf = new THREE.Mesh(new THREE.PlaneGeometry(pickW, pickH), mat);
      surf.name = name + 'Surface';
      holder.add(surf);
      // the highlight lies on the front of the frame that wraps the surface
      const outline = this._outlineFor(pickW, pickH, frameW);
      outline.position.z = frontZ + 0.006 - off;
      holder.add(outline);
      this._pickable(surf, action, { outline });
      // the frame and a margin around the board are pickable too (the lead's Panel covers the surface itself)
      const fh = new THREE.Mesh(new THREE.PlaneGeometry(pickW + 2 * frameW + 0.06, pickH + 2 * frameW + 0.06), this._hitMat);
      fh.position.z = frontZ + 0.012 - off;
      holder.add(fh);
      this._pickable(fh, action);
      holder.userData.surface = surf;
      this.mounts[name] = holder;
      return holder;
    };
    const tacticsCv = tacticsCanvas(rng, 1250, 800);
    const tacticsTex = texOf(tacticsCv, { aniso: 4 });
    const corkTex = texOf(corkCanvas(rng, 750, 600), { aniso: 4 });
    const screenTex = texOf(screenCanvas(), { aniso: 4 });
    // surfaces sit 0.021 off the wall: the frame (0.04 deep) wraps them
    mount('career', 'front', careerU, 1.62, 0.021, 2.0, 1.25, 2.5, 1.6, tacticsTex, 'career', false, 0.05, 0.04);
    mount('notice', 'front', noticeU, 1.56, 0.021, 1.2, 0.9, 1.5, 1.2, corkTex, 'notice', false, 0.06, 0.05);
    mount('stats', 'left', 0, 1.7, 0.052, 1.6, 0.9, 1.8, 1.01, screenTex, 'stats', true, 0.05, 0.05);
  }

  _door(frostCanvas, beamCanvas, bloomCanvas, rng) {
    const group = this.group;
    const root = new THREE.Object3D();
    root.name = 'tunnelDoor';
    placeOnWall(root, 'right', 0, 0, 0);
    group.add(root);
    const leafMat = new THREE.MeshLambertMaterial({ color: 0x34322f });
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.1, 0.05), leafMat);
    leaf.position.set(0, 1.05, 0.065);
    root.add(leaf);
    // sheet-steel panelling lines so the leaf is not a plain slab
    const dec = new Batch({ rng: null, uvPerMetre: 1 });
    dec.box(0, 0.75, 0, 0.82, 0.012, 0.004, 0x1c1b19, { uv: 'white', noBake: true, jitter: 0 });
    const decMesh = new THREE.Mesh(dec.build(), new THREE.MeshBasicMaterial({ vertexColors: true, map: this._decoTex }));
    decMesh.position.set(0, 0, 0.0905); root.add(decMesh);
    const dol = this._outlineFor(0.98, 2.1, 0.035);
    dol.position.set(0, 1.05, 0.106);
    root.add(dol);
    this._pickable(leaf, 'continue', { glowMat: leafMat, k: 0.03, outline: dol });

    // frosted window
    const frostTex = texOf(frostCanvas(rng), { aniso: 2 });
    this._frost = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.78), new THREE.MeshBasicMaterial({ map: frostTex }));
    this._frost.position.set(0, 1.58, 0.0915);
    root.add(this._frost);
    // window frame
    const wf = new Batch({ rng: null, uvPerMetre: 1 });
    wf.box(0, 0.4, 0, 0.5, 0.03, 0.01, 0x1c1b19, { uv: 'white', noBake: true, jitter: 0 });
    wf.box(0, -0.4, 0, 0.5, 0.03, 0.01, 0x1c1b19, { uv: 'white', noBake: true, jitter: 0 });
    wf.box(-0.235, 0, 0, 0.03, 0.8, 0.01, 0x1c1b19, { uv: 'white', noBake: true, jitter: 0 });
    wf.box(0.235, 0, 0, 0.03, 0.8, 0.01, 0x1c1b19, { uv: 'white', noBake: true, jitter: 0 });
    const wfm = new THREE.Mesh(wf.build(), new THREE.MeshBasicMaterial({ vertexColors: true, map: this._decoTex }));
    wfm.position.set(0, 1.58, 0.0915); root.add(wfm);

    // soft bloom around the window and a spill of light on the floor
    this._bloom = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.9), new THREE.MeshBasicMaterial({
      map: texOf(bloomCanvas(), { aniso: 1 }), transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    this._bloom.position.set(0, 1.6, 0.098);
    this._bloom.renderOrder = 3;
    root.add(this._bloom);
    this._spill = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.6), new THREE.MeshBasicMaterial({
      map: texOf(beamCanvas(), { aniso: 2 }), transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    this._spill.rotation.x = -Math.PI / 2;
    this._spill.rotation.z = -Math.PI / 2; // texture x runs out from the wall
    this._spill.position.set(0, 0.018, 2.15);
    this._spill.renderOrder = 3;
    root.add(this._spill);

    // lit sign above the door: orange face, dark letters, its own canvas so setDoorLabel is a cheap repaint
    {
      const sp = SIGNS.continue, y = 2.41;
      const signCv = cv(Math.round(sp.w * sp.ppm), Math.round(sp.h * sp.ppm));
      this._signCv = signCv;
      this._signCtx = signCv.getContext('2d');
      this._signTex = texOf(signCv, { aniso: 4 });
      this._doorSign = new THREE.Mesh(new THREE.PlaneGeometry(sp.w, sp.h), new THREE.MeshBasicMaterial({ map: this._signTex }));
      this._doorSign.name = 'doorSign';
      this._doorSign.position.set(0, y, 0.112);
      root.add(this._doorSign);
      this._signHalo = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.1), new THREE.MeshBasicMaterial({
        map: texOf(bloomCanvas(), { aniso: 1 }), color: ORANGE, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false,
      }));
      this._signHalo.position.set(0, y, 0.125);
      this._signHalo.renderOrder = 3;
      root.add(this._signHalo);
      const hit = new THREE.Mesh(new THREE.PlaneGeometry(sp.w + 0.2, sp.h + 0.14), this._hitMat);
      hit.position.set(0, y, 0.14);
      root.add(hit);
      const ol = this._outlineFor(sp.w, sp.h, 0.025);
      ol.position.set(0, y, 0.118);
      root.add(ol);
      this._pickable(hit, 'continue', { outline: ol });
      this._painters.push(() => this._paintDoorSign());
    }

    this._doorLocal = new THREE.Vector3(-HX + 0.1, 1.2, 0);
  }

  _nameplateAndChalk(group) {
    // player's nameplate on the header board of the own locker
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.195), new THREE.MeshLambertMaterial({ map: this._plateTex }));
    plate.name = 'nameplate';
    placeOnWall(plate, 'front', 0, 2.31, 0.067);
    group.add(plate);
    // chalk slate above the door
    const slate = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 0.575), new THREE.MeshLambertMaterial({ map: this._chalkTex }));
    slate.name = 'chalkSlate';
    placeOnWall(slate, 'right', 0, 2.88, 0.03);
    group.add(slate);
    const fb = new Batch({ rng: null, uvPerMetre: 1, bakeFn: null });
    const fr = 0x4a3426;
    fb.box(0, 0.3, 0, 2.4, 0.04, 0.05, fr, { uv: 'white' });
    fb.box(0, -0.3, 0, 2.4, 0.04, 0.05, fr, { uv: 'white' });
    fb.box(-1.18, 0, 0, 0.04, 0.6, 0.05, fr, { uv: 'white' });
    fb.box(1.18, 0, 0, 0.04, 0.6, 0.05, fr, { uv: 'white' });
    const frame = new THREE.Mesh(fb.build(), new THREE.MeshLambertMaterial({ vertexColors: true }));
    frame.position.z = 0.012;
    slate.add(frame);
  }
}

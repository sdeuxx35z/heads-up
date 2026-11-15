import * as THREE from 'three';
import { UI } from './config.js';

// Glass tokens: smoked panel, white-alpha chips, orange accent. Neutral and warm only.
export const GLASS = {
  panel: 'rgba(20,24,26,0.6)',
  sheen: 0.08,
  edgeTop: 0.22,
  edgeBot: 0.06,
  chip: 'rgba(255,255,255,0.10)',
  chipHi: 'rgba(255,255,255,0.19)',
  chipOff: 'rgba(255,255,255,0.04)',
  card: 'rgba(255,255,255,0.075)',
  cardHi: 'rgba(255,255,255,0.14)',
  dim: 'rgba(242,240,232,0.72)',
  faint: 'rgba(242,240,232,0.34)',
  hair: 'rgba(242,240,232,0.14)',
  off: '#f2f0e8',
  shadow: 'rgba(0,0,0,0.38)',
  rPanel: 36,
  rBtn: 22,
};

// 1.5 px highlight stroke: bright at the top edge, fading down.
export function edge(g, x, y, w, h, r, top = GLASS.edgeTop, bot = GLASS.edgeBot) {
  const gr = g.createLinearGradient(0, y, 0, y + h);
  gr.addColorStop(0, `rgba(255,255,255,${top})`);
  gr.addColorStop(1, `rgba(255,255,255,${bot})`);
  g.strokeStyle = gr; g.lineWidth = 1.5;
  rr(g, x + 0.75, y + 0.75, w - 1.5, h - 1.5, Math.max(0, r - 0.75)); g.stroke();
}

// white sheen, top to bottom, clipped to the shape
function sheen(g, x, y, w, h, r, a = GLASS.sheen) {
  const gr = g.createLinearGradient(0, y, 0, y + h);
  gr.addColorStop(0, `rgba(255,255,255,${a})`);
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; rr(g, x, y, w, h, r); g.fill();
}

// soft drop shadow that only falls outside the shape, so the glass stays clear inside
function dropShadow(g, x, y, w, h, r, blur = 26, dy = 10) {
  g.save();
  g.beginPath();
  g.rect(x - 200, y - 200, w + 400, h + 400);
  rr(g, x, y, w, h, r, false);
  g.clip('evenodd');
  g.shadowColor = GLASS.shadow; g.shadowBlur = blur; g.shadowOffsetY = dy;
  g.fillStyle = '#000';
  rr(g, x, y, w, h, r); g.fill();
  g.restore();
}

// a glass card sitting on a panel
export function glassCard(g, x, y, w, h, r = 22, { hi = false, shadow = true, fill = null } = {}) {
  if (shadow) dropShadow(g, x, y, w, h, r, 22, 8);
  g.fillStyle = fill || (hi ? GLASS.cardHi : GLASS.card);
  rr(g, x, y, w, h, r); g.fill();
  sheen(g, x, y, w, h, r, hi ? 0.1 : 0.07);
  edge(g, x, y, w, h, r, hi ? 0.34 : 0.2, 0.06);
}

// A flat screen floating in the stadium, drawn with canvas 2D.
export class Panel {
  constructor(scene, w, h, worldWidth) {
    this.w = w; this.h = h;
    this.canvas = document.createElement('canvas');
    this.canvas.width = w; this.canvas.height = h;
    this.g = this.canvas.getContext('2d');
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    this.tex.anisotropy = 4;
    // redrawn often: skip mipmap rebuilds on every upload
    this.tex.generateMipmaps = false;
    this.tex.minFilter = THREE.LinearFilter;
    const geo = new THREE.PlaneGeometry(worldWidth, worldWidth * (h / w));
    this.mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: this.tex, transparent: true, depthTest: false, depthWrite: false }));
    this.mesh.renderOrder = 10;
    this.mesh.visible = false;
    this.mesh.userData.panel = this;
    scene.add(this.mesh);
    this.buttons = [];
    this.hover = null;
    this.render = null;
  }

  show(render) {
    this.render = render;
    this.hover = null;
    this.mesh.visible = true;
    this.redraw();
  }

  hide() { this.mesh.visible = false; this.render = null; this.buttons = []; }

  redraw() {
    if (!this.render) return;
    this.buttons = [];
    const g = this.g;
    g.clearRect(0, 0, this.w, this.h);
    this.render(this.draw());
    this.tex.needsUpdate = true;
  }

  // drawing kit handed to screen renderers
  draw() {
    const g = this.g, self = this;
    const kit = {
      g, w: this.w, h: this.h,
      bg(r = GLASS.rPanel) {
        const m = 12, x = m, y = m, w = self.w - m * 2, h = self.h - m * 2;
        dropShadow(g, x, y, w, h, r, 18, 6);
        g.fillStyle = GLASS.panel; rr(g, x, y, w, h, r); g.fill();
        sheen(g, x, y, w, h, r);
        edge(g, x, y, w, h, r);
      },
      card: (x, y, w, h, r, o) => glassCard(g, x, y, w, h, r, o),
      text(s, x, y, size, { weight = 700, color = UI.text, align = 'left', font = UI.font, base = 'alphabetic' } = {}) {
        g.font = `${weight} ${size}px ${font}`;
        g.fillStyle = color; g.textAlign = align; g.textBaseline = base;
        g.fillText(s, x, y);
        return g.measureText(s).width;
      },
      button(id, x, y, w, h, label, { onClick, primary = false, active = false, disabled = false, size = 40, sub = null, r = GLASS.rBtn } = {}) {
        const hov = self.hover === id && !disabled;
        if (primary) {
          dropShadow(g, x, y, w, h, r, 20, 8);
          g.fillStyle = hov ? '#ff9447' : UI.accent; rr(g, x, y, w, h, r); g.fill();
          const gl = g.createLinearGradient(0, y, 0, y + h);
          gl.addColorStop(0, 'rgba(255,255,255,0.30)'); gl.addColorStop(0.5, 'rgba(255,255,255,0.06)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
          g.fillStyle = gl; rr(g, x, y, w, h, r); g.fill();
          edge(g, x, y, w, h, r, 0.5, 0.12);
        } else if (active) {
          g.fillStyle = hov ? '#fff' : GLASS.off; rr(g, x, y, w, h, r); g.fill();
          sheen(g, x, y, w, h, r, 0.35);
          edge(g, x, y, w, h, r, 0.7, 0.2);
        } else {
          g.fillStyle = disabled ? GLASS.chipOff : hov ? GLASS.chipHi : GLASS.chip; rr(g, x, y, w, h, r); g.fill();
          sheen(g, x, y, w, h, r, hov ? 0.12 : 0.07);
          edge(g, x, y, w, h, r, hov ? 0.5 : 0.24, hov ? 0.2 : 0.07);
        }
        const col = primary || active ? '#111' : disabled ? 'rgba(242,240,232,0.3)' : UI.text;
        if (sub) {
          kit.text(label, x + w / 2, y + h / 2 - 2, size, { color: col, align: 'center' });
          kit.text(sub, x + w / 2, y + h / 2 + size * 0.75, size * 0.55, { color: primary || active ? 'rgba(0,0,0,0.62)' : GLASS.dim, align: 'center', weight: 600 });
        } else {
          kit.text(label, x + w / 2, y + h / 2, size, { color: col, align: 'center', base: 'middle' });
        }
        if (!disabled && onClick) self.buttons.push({ id, x, y, w, h, onClick });
      },
      hit(id, x, y, w, h, onClick) { self.buttons.push({ id, x, y, w, h, onClick }); },
      rr: (x, y, w, h, r) => rr(g, x, y, w, h, r),
      hovered: (id) => self.hover === id,
    };
    return kit;
  }

  // uv from a raycast hit -> canvas pixels
  pick(uv) {
    const x = uv.x * this.w, y = (1 - uv.y) * this.h;
    for (let i = this.buttons.length - 1; i >= 0; i--) {
      const b = this.buttons[i];
      if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) return { b, x, y };
    }
    return { b: null, x, y };
  }

  setHover(id) {
    if (id === this.hover) return;
    this.hover = id;
    this.redraw();
  }

  placeFacing(headPos, yaw, dist, dy = 0) {
    this.mesh.position.set(headPos.x + Math.sin(yaw) * dist, headPos.y + dy, headPos.z + Math.cos(yaw) * dist);
    this.mesh.rotation.set(0, yaw + Math.PI, 0);
  }
}

export function rr(g, x, y, w, h, r, begin = true) {
  if (begin) g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

// Rays from controllers (VR) or the mouse (desktop) against visible panels.
export class Pointer {
  constructor() {
    this.ray = new THREE.Raycaster();
    this.panels = [];
  }

  hitPanels(origin, dir) {
    this.ray.set(origin, dir);
    const meshes = this.panels.filter((p) => p.mesh.visible).map((p) => p.mesh);
    const hits = this.ray.intersectObjects(meshes, false);
    if (!hits.length) return null;
    const h = hits[0];
    const panel = h.object.userData.panel;
    return { panel, point: h.point, distance: h.distance, ...panel.pick(h.uv) };
  }
}

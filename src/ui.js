import * as THREE from 'three';
import { UI } from './config.js';

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
      bg(r = 28) { g.fillStyle = UI.bg; rr(g, 0, 0, self.w, self.h, r); g.fill(); },
      text(s, x, y, size, { weight = 700, color = UI.text, align = 'left', font = UI.font, base = 'alphabetic' } = {}) {
        g.font = `${weight} ${size}px ${font}`;
        g.fillStyle = color; g.textAlign = align; g.textBaseline = base;
        g.fillText(s, x, y);
        return g.measureText(s).width;
      },
      button(id, x, y, w, h, label, { onClick, primary = false, active = false, disabled = false, size = 40, sub = null, r = 18 } = {}) {
        const hov = self.hover === id && !disabled;
        g.fillStyle = primary ? (hov ? '#ff9447' : UI.accent) : active ? UI.text : hov ? UI.cardHi : UI.card;
        rr(g, x, y, w, h, r); g.fill();
        if (hov && !primary && !active) { g.strokeStyle = 'rgba(242,240,232,0.35)'; g.lineWidth = 3; rr(g, x + 1.5, y + 1.5, w - 3, h - 3, r); g.stroke(); }
        const col = primary || active ? '#111' : disabled ? 'rgba(242,240,232,0.25)' : UI.text;
        if (sub) {
          kit.text(label, x + w / 2, y + h / 2 - 2, size, { color: col, align: 'center' });
          kit.text(sub, x + w / 2, y + h / 2 + size * 0.75, size * 0.55, { color: primary || active ? 'rgba(0,0,0,0.6)' : UI.dim, align: 'center', weight: 600 });
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

export function rr(g, x, y, w, h, r) {
  g.beginPath();
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

import * as THREE from 'three';
import { Player, Ball } from './players.js';
import { ROLES, AWAY_442, HOME_KIT, AWAY_KIT, GK_HOME, GK_AWAY } from './config.js';

const _v = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _to = new THREE.Vector3();
const TAU = Math.PI * 2;
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

// The menu kick-about: two groups of six on rings knock the ball round and now and then hit a long one across to
// the other group; the defenders jog short lanes; the keepers shuffle on their line.
const RING_R = 6.2;
const GROUPS = [{ team: 'home', cx: -17, cz: -3 }, { team: 'away', cx: 17, cz: 4 }];

// Everything that lives on the pitch, plus where the viewer stands.
export class World {
  constructor(scene, rig, camera) {
    this.scene = scene;
    this.rig = rig;
    this.camera = camera;
    this.homeSets = new Map();
    for (const role of Object.values(ROLES)) {
      if (this.homeSets.has(role.formation)) continue;
      this.homeSets.set(role.formation, role.formation.map(([slot, , , n]) =>
        new Player(scene, { kit: slot === 'GK' ? GK_HOME : HOME_KIT, number: n, team: 'home', slot })));
    }
    this.away = AWAY_442.map(([slot, , , n]) =>
      new Player(scene, { kit: slot === 'GK' ? GK_AWAY : AWAY_KIT, number: n, team: 'away', slot }));
    this.ball = new Ball(scene);
    this.rondoSquare = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.5, 0.04, -0.5), new THREE.Vector3(0.5, 0.04, -0.5), new THREE.Vector3(0.5, 0.04, 0.5), new THREE.Vector3(-0.5, 0.04, 0.5)]),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }));
    this.rondoSquare.visible = false;
    scene.add(this.rondoSquare);
    this.home = null;
    this.useFormation(ROLES.CM.formation);
    this.idle();
    this.buildOverlays();
  }

  useFormation(F) {
    for (const [f, set] of this.homeSets) set.forEach((p) => p.setVisible(f === F));
    this.away.forEach((p) => p.setVisible(true));
    this.rondoSquare.visible = false;
    this.home = this.homeSets.get(F);
    // the ball finds the man who kicks it and the man it arrives at from this list
    this.actors = this.home.concat(this.away);
    this.ball.players = this.actors;
  }

  // A calm kick-about for the menus: two passing groups, jogging defenders, keepers on their lines.
  idle() {
    this.useFormation(ROLES.CM.formation);
    this.idleT = 0;
    this._groups = GROUPS.map((g) => {
      const set = g.team === 'home' ? this.home : this.away;
      const members = set.slice(5, 11);
      const spots = members.map((_, i) => {
        const a = (i / members.length) * TAU + 0.5;
        return { x: g.cx + Math.cos(a) * RING_R, z: g.cz + Math.sin(a) * RING_R, ox: 0, oz: 0, moveT: 0 };
      });
      members.forEach((p, i) => p.place(spots[i].x, spots[i].z, Math.atan2(g.cx - spots[i].x, g.cz - spots[i].z)));
      return { members, spots };
    });
    this._lanes = [];
    this._keepers = [];
    [this.home, this.away].forEach((set, si) => {
      const sx = si ? 1 : -1;
      for (let i = 1; i <= 4; i++) {
        const alongZ = i % 2 === 1;
        const bx = sx * (30 + (i % 2) * 5), bz = -21 + (i - 1) * 14, h = 4.5;
        const lane = { p: set[i], goB: Math.random() < 0.5, wait: Math.random() * 1.2,
          ax: bx - (alongZ ? 0 : h), az: bz - (alongZ ? h : 0), bx: bx + (alongZ ? 0 : h), bz: bz + (alongZ ? h : 0) };
        set[i].place(lane.goB ? lane.bx : lane.ax, lane.goB ? lane.bz : lane.az);
        this._lanes.push(lane);
      }
      const gk = set[0];
      gk.place(sx * 47.5, 0);
      this._keepers.push({ p: gk, x: sx * 47.5, ph: Math.random() * 6 });
    });
    // one ball, starting at a man's feet
    const holder = this._groups[0].members[0];
    this._pass = { state: 'hold', holder, aim: null, grp: 0, t: 0.8, yaw: 0, turnT: 0, count: 0, limit: 4 + ((Math.random() * 4) | 0) };
    this.holdBall(holder);
  }

  holdBall(p) {
    this.ball.set(p.pos.x + Math.sin(p.heading) * 0.45, p.pos.z + Math.cos(p.heading) * 0.45);
  }

  // 12 m grid the rondo is played in
  showRondo(on, x = 0, z = 0, size = 12) {
    this.rondoSquare.visible = on;
    this.rondoSquare.position.set(x, 0, z);
    this.rondoSquare.scale.set(size, 1, size);
  }

  idleStep(dt) {
    this.rondoSquare.visible = false;
    this.idleT += dt;
    const t = this.idleT, ball = this.ball, ps = this._pass;

    // --- the ball: hold it a moment, square up to a teammate, strike, trap
    if (ball.flight) {
      if (ball.update(dt)) { ps.holder = ps.aim; ps.aim = null; ps.state = 'hold'; ps.t = 0.55 + Math.random() * 0.55; }
    } else if (ps.state === 'fly') {
      // the flight was cut short from outside; carry on from wherever the ball is
      ps.holder = ps.aim || ps.holder; ps.aim = null; ps.state = 'hold'; ps.t = 0.5;
    } else if (ps.state === 'hold') {
      this.holdBall(ps.holder);
      ps.t -= dt;
      if (ps.t <= 0) this.choosePass(ps);
    } else {
      this.holdBall(ps.holder);
      ps.turnT += dt;
      if (Math.abs(wrap(ps.holder.heading - ps.yaw)) < 0.25 || ps.turnT > 1) this.strike(ps);
    }

    // --- the groups: everyone holds a spot on the ring; whoever just passed jogs off it and back
    for (const g of this._groups) {
      for (let i = 0; i < g.members.length; i++) {
        const p = g.members[i], sp = g.spots[i];
        if (sp.moveT > 0) sp.moveT -= dt;
        const off = sp.moveT > 0.5 ? 1 : 0;
        p.maxSpeed = 3.2;
        p.target.set(sp.x + sp.ox * off, 0, sp.z + sp.oz * off);
      }
    }
    for (const l of this._lanes) {
      const p = l.p;
      p.maxSpeed = 2.7;
      if (l.wait > 0) { l.wait -= dt; p.target.copy(p.pos); continue; }
      p.target.set(l.goB ? l.bx : l.ax, 0, l.goB ? l.bz : l.az);
      if (Math.hypot(p.pos.x - p.target.x, p.pos.z - p.target.z) < 0.7) { l.goB = !l.goB; l.wait = 0.6 + Math.random() * 0.9; }
    }
    for (const k of this._keepers) {
      k.p.maxSpeed = 1.6;
      k.p.target.set(k.x, 0, Math.sin(t * 0.42 + k.ph) * 2.6);
    }
    for (let i = 0; i < this.actors.length; i++) this.actors[i].step(dt, ball.pos);
  }

  // who gets it next: mostly someone on the same ring who is not busy, now and then a long one to the other group
  choosePass(ps) {
    const h = ps.holder;
    const long = ps.count >= ps.limit;
    const toGrp = long ? 1 - ps.grp : ps.grp;
    const g = this._groups[toGrp];
    const idle = [];
    for (let i = 0; i < g.members.length; i++) if (g.members[i] !== h && g.spots[i].moveT <= 0) idle.push(g.members[i]);
    if (!idle.length) return;
    ps.aim = idle[(Math.random() * idle.length) | 0];
    ps.toGrp = toGrp;
    ps.yaw = Math.atan2(ps.aim.pos.x - h.pos.x, ps.aim.pos.z - h.pos.z);
    ps.state = 'turn';
    ps.turnT = 0;
    h.turnTo(ps.yaw, 1);
  }

  strike(ps) {
    const h = ps.holder, r = ps.aim, ball = this.ball;
    // into his feet: half a metre this side of him, where he will stand when he has turned to face us
    _to.set(h.pos.x - r.pos.x, 0, h.pos.z - r.pos.z).setLength(0.5);
    const tx = r.pos.x + _to.x, tz = r.pos.z + _to.z;
    const dist = Math.hypot(tx - ball.pos.x, tz - ball.pos.z);
    const long = ps.toGrp !== ps.grp;
    _to.set(tx, 0.11, tz);
    ball.kick(ball.pos, _to, long ? 17 : 10.5 + Math.random() * 3, long ? dist * 0.075 : 0);
    if (long) { ps.count = 0; ps.limit = 4 + ((Math.random() * 4) | 0); } else ps.count++;
    // pass and move: the passer slips sideways off the ring and back
    const g = this._groups[ps.grp];
    const sp = g.spots[g.members.indexOf(h)];
    if (sp) {
      const side = Math.random() < 0.5 ? -1 : 1;
      const ux = r.pos.x - h.pos.x, uz = r.pos.z - h.pos.z, ul = Math.hypot(ux, uz) || 1;
      sp.ox = (-uz / ul) * 3 * side; sp.oz = (ux / ul) * 3 * side; sp.moveT = 2.2;
    }
    ps.grp = ps.toGrp;
    ps.state = 'fly';
  }

  userPos(out = new THREE.Vector3()) {
    this.camera.getWorldPosition(out);
    out.y = 0;
    return out;
  }

  headHeight() {
    this.camera.getWorldPosition(_v);
    return _v.y;
  }

  // heading convention: atan2(x, z), 0 = +z
  headYaw() {
    this.camera.getWorldDirection(_v);
    return Math.atan2(_v.x, _v.z);
  }

  headDir(out = new THREE.Vector3()) {
    this.camera.getWorldDirection(out);
    out.y = 0;
    return out.normalize();
  }

  // Put the viewer's head at pos, facing heading yaw, whatever their play space offset is.
  placeUser(pos, yaw) {
    const localFwd = _v.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
    const localYaw = Math.atan2(localFwd.x, localFwd.z);
    this.rig.rotation.set(0, yaw - localYaw, 0);
    this.rig.updateMatrixWorld(true);
    const off = this.camera.position.clone();
    off.y = 0;
    off.applyQuaternion(_q.setFromEuler(this.rig.rotation));
    this.rig.position.set(pos.x - off.x, this.rig.position.y, pos.z - off.z);
    this.rig.updateMatrixWorld(true);
  }

  moveUser(dx, dz) {
    this.rig.position.x += dx;
    this.rig.position.z += dz;
  }

  buildOverlays() {
    // vision cone used in replays: 100 degree fan
    const fan = new THREE.CircleGeometry(9, 24, -Math.PI / 2 - THREE.MathUtils.degToRad(50), THREE.MathUtils.degToRad(100));
    fan.rotateX(-Math.PI / 2);
    this.cone = new THREE.Mesh(fan, new THREE.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0.28, depthWrite: false }));
    this.cone.position.y = 0.03;
    this.cone.visible = false;
    this.scene.add(this.cone);
    const lineMat = (c) => new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.95 });
    this.bestLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), lineMat(0x4fd88a));
    this.choiceLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), lineMat(0xffffff));
    this.bestLine.visible = this.choiceLine.visible = false;
    this.scene.add(this.bestLine, this.choiceLine);
    this.goalGlow = new THREE.Mesh(new THREE.PlaneGeometry(7.32, 2.44), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false }));
    this.goalGlow.position.set(52.55, 1.22, 0);
    this.goalGlow.rotation.y = Math.PI / 2;
    this.goalGlow.visible = false;
    this.scene.add(this.goalGlow);
  }

  setLine(line, a, b) {
    if (!a || !b) { line.visible = false; return; }
    const p = line.geometry.attributes.position;
    p.setXYZ(0, a.x, 0.06, a.z);
    p.setXYZ(1, b.x, 0.06, b.z);
    p.needsUpdate = true;
    line.geometry.computeBoundingSphere();
    line.visible = true;
  }

  clearOverlays() {
    this.cone.visible = false;
    this.bestLine.visible = this.choiceLine.visible = false;
    this.goalGlow.visible = false;
    [...this.home, ...this.away].forEach((p) => p.highlight(0xffffff, 0));
  }
}

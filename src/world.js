import * as THREE from 'three';
import { Player, Ball } from './players.js';
import { ROLES, AWAY_442, HOME_KIT, AWAY_KIT, GK_HOME, GK_AWAY } from './config.js';

const _v = new THREE.Vector3();
const _q = new THREE.Quaternion();

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
    this.home = null;
    this.useFormation(ROLES.CM.formation);
    this.idle();
    this.buildOverlays();
  }

  useFormation(F) {
    for (const [f, set] of this.homeSets) set.forEach((p) => p.setVisible(f === F));
    this.home = this.homeSets.get(F);
  }

  // A calm kick-about for the menus.
  idle() {
    this.home.forEach((p, i) => {
      const [, x, z] = ROLES.CM.formation[i] || [0, 0, 0];
      p.place(x * 0.9, z);
      p.setVisible(true);
    });
    this.away.forEach((p, i) => p.place(AWAY_442[i][1] * 0.9, AWAY_442[i][2]));
    this.ball.set(0, 0);
    this.idleT = 0;
  }

  idleStep(dt) {
    this.idleT += dt;
    const t = this.idleT;
    const bx = Math.sin(t * 0.07) * 18, bz = Math.sin(t * 0.11) * 14;
    this.ball.set(bx, bz);
    const all = [...this.home, ...this.away];
    all.forEach((p, i) => {
      const [, x, z] = (p.team === 'home' ? ROLES.CM.formation : AWAY_442)[i % 11];
      p.maxSpeed = 3;
      p.target.set(x + bx * 0.5 + Math.sin(t * 0.3 + i) * 1.5, 0, z * 0.85 + bz * 0.3);
      p.step(dt, this.ball.pos);
    });
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

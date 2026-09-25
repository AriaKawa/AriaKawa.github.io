import * as THREE from "./vendor/three.module.min.js";
import { createBike, animateWheels } from "./bike-model.js?v=speed-1";
import { LaserWalls } from "./laser-walls.js?v=speed-1";
import { EffectComposer } from "./vendor/postprocessing/EffectComposer.js";
import { RenderPass } from "./vendor/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "./vendor/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "./vendor/postprocessing/OutputPass.js";
import {
  HALF,
  WORLD_SIZE,
  COLORS,
  LANDMARKS,
  jumpHeight,
  WALL_HEIGHT,
} from "./simulation.mjs?v=speed-1";

const palette = COLORS.map((c) => new THREE.Color(c));
const shardPalette = [
  "#ff322a",
  "#ff6652",
  "#ff8a66",
  "#ffb777",
  "#ff4964",
  "#fff0e8",
].map((c) => new THREE.Color(c));
const dummy = new THREE.Object3D();
const white = new THREE.Color("#fff5f0");
const UP = new THREE.Vector3(0, 1, 0);
const ALONG = new THREE.Vector3(1, 0, 0);
const edgeDirection = new THREE.Vector3();
const boxGeo = new THREE.BoxGeometry(1, 1, 1);
const standard = (color, metalness = 0.45, roughness = 0.38) =>
  new THREE.MeshStandardMaterial({ color, metalness, roughness });
const dark = standard(0x171719, 0.65, 0.38),
  pearl = standard(0x6f6868, 0.52, 0.27);
function mesh(geo, mat, x = 0, y = 0, z = 0, parent) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  if (parent) parent.add(m);
  return m;
}
function box(parent, mat, x, y, z, sx, sy, sz) {
  const m = mesh(boxGeo, mat, x, y, z, parent);
  m.scale.set(sx, sy, sz);
  return m;
}
function glow(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    depthWrite: opacity === 1,
    toneMapped: false,
  });
}
function canvasGlow() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d"),
    grad = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,.65)");
  grad.addColorStop(0.25, "rgba(255,255,255,.2)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export class GridRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.65));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x09090a);
    this.scene.fog = new THREE.FogExp2(0x160b0e, 0.0012);
    this.camera = new THREE.OrthographicCamera(-150, 150, 100, -100, 0.1, 1600);
    this.camera.position.set(0, 210, 140);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();
    this.cameraTarget = new THREE.Vector3(0, 0, 125);
    this.viewHeight = 170;
    this.quality = true;
    this.scene.add(new THREE.HemisphereLight(0xffeee6, 0x241a1b, 2.3));
    this.sun = new THREE.DirectionalLight(0xffebe4, 3.6);
    this.sun.position.set(-80, 160, -70);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    Object.assign(this.sun.shadow.camera, {
      left: -145,
      right: 145,
      top: 145,
      bottom: -145,
      near: 1,
      far: 480,
    });
    this.sun.shadow.bias = -0.001;
    this.sun.shadow.normalBias = 0.4;
    this.scene.add(this.sun, this.sun.target);
    const rim = new THREE.DirectionalLight(0xff2420, 1.5);
    rim.position.set(80, 50, 100);
    this.scene.add(rim);
    this.textureLoader = new THREE.TextureLoader();
    this.glowTexture = canvasGlow();
    this.buildWorld();
    this.bikes = new Map();
    this.particles = [];
    this.rings = [];
    this.crystals = new THREE.InstancedMesh(
      new THREE.OctahedronGeometry(0.92),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.15,
        roughness: 0.28,
        emissive: 0x291010,
        emissiveIntensity: 0.12,
      }),
      2000,
    );
    this.crystals.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.crystals.frustumCulled = false;
    this.scene.add(this.crystals);
    this.crystalGlows = new THREE.InstancedMesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: this.glowTexture,
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
      2000,
    );
    this.crystalGlows.frustumCulled = false;
    this.scene.add(this.crystalGlows);
    this.walls = new LaserWalls();
    this.scene.add(this.walls);
    this.cores = new THREE.InstancedMesh(
      boxGeo,
      new THREE.MeshBasicMaterial({ toneMapped: false }),
      12000,
    );
    this.cores.name = "laser-edges";
    this.cores.frustumCulled = false;
    this.cores.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.scene.add(this.cores);
    this.sparks = new THREE.InstancedMesh(
      new THREE.OctahedronGeometry(0.5),
      new THREE.MeshBasicMaterial({ toneMapped: false }),
      600,
    );
    this.sparks.frustumCulled = false;
    this.scene.add(this.sparks);
    this.raycaster = new THREE.Raycaster();
    this.plane = new THREE.Plane(UP, 0);
    this.pointer = new THREE.Vector2();
    this.projected = new THREE.Vector3();
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(innerWidth, innerHeight),
      0.46,
      0.65,
      0.72,
    );
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.resize();
  }
  buildWorld() {
    const texture = this.textureLoader.load("assets/red-alloy.webp");
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50, 50);
    texture.anisotropy = Math.min(
      8,
      this.renderer.capabilities.getMaxAnisotropy(),
    );
    const floor = mesh(
      new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE),
      new THREE.MeshStandardMaterial({
        map: texture,
        color: 0x777070,
        metalness: 0.35,
        roughness: 0.64,
      }),
      0,
      -0.14,
      0,
      this.scene,
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    const grid = new THREE.GridHelper(WORLD_SIZE, 200, 0x743a3b, 0x472427);
    grid.position.y = 0.02;
    grid.material.transparent = true;
    grid.material.opacity = 0.23;
    this.scene.add(grid);
    const major = new THREE.GridHelper(WORLD_SIZE, 50, 0xc53835, 0x7d2e31);
    major.position.y = 0.03;
    major.material.transparent = true;
    major.material.opacity = 0.35;
    this.scene.add(major);
    const wall = glow(0xff302a, 0.25),
      edge = glow(0xff7163);
    for (const x of [-HALF, HALF]) {
      box(this.scene, wall, x, 9, 0, 1, 18, WORLD_SIZE);
      box(this.scene, edge, x, 1, 0, 1.7, 1, WORLD_SIZE);
      box(this.scene, edge, x, 18, 0, 0.7, 0.3, WORLD_SIZE);
    }
    for (const z of [-HALF, HALF]) {
      box(this.scene, wall, 0, 9, z, WORLD_SIZE, 18, 1);
      box(this.scene, edge, 0, 1, z, WORLD_SIZE, 1, 1.7);
      box(this.scene, edge, 0, 18, z, WORLD_SIZE, 0.3, 0.7);
    }
    this.archTexture = this.textureLoader.load("assets/red-alloy.webp");
    this.archTexture.colorSpace = THREE.SRGBColorSpace;
    this.archTexture.anisotropy = 4;
    this.landmarkGroups = [];
    this.rotors = [];
    for (const o of LANDMARKS) this.buildLandmark(o);
    // Perimeter architecture is outside the playable boundary.
    const distantMat = standard(0x1b1718, 0.5, 0.7);
    for (let i = 0; i < 64; i++) {
      const a = (i / 64) * Math.PI * 2,
        r = 1750 + (i % 3) * 80,
        h = 60 + ((i * 47) % 170),
        x = Math.cos(a) * r,
        z = Math.sin(a) * r;
      box(this.scene, distantMat, x, h / 2, z, 40, h, 50);
      box(
        this.scene,
        glow(i % 2 ? 0xe52e29 : 0xab262d, 0.5),
        x,
        h / 2,
        z + 25.1,
        2,
        h * 0.8,
        0.5,
      );
    }
  }
  buildLandmark(o) {
    const g = new THREE.Group();
    g.position.set(o.x, 0, o.z);
    this.scene.add(g);
    this.landmarkGroups.push(g);
    const accent = glow(o.color),
      subtle = glow(o.color, 0.16),
      alloy = new THREE.MeshStandardMaterial({
        map: this.archTexture,
        color: 0xaaa0a0,
        metalness: 0.55,
        roughness: 0.38,
      });
    const base = mesh(
      new THREE.CylinderGeometry(o.r, o.r + 1.5, 2.4, 8),
      alloy,
      0,
      1.2,
      0,
      g,
    );
    base.receiveShadow = true;
    base.castShadow = true;
    const rim = mesh(
      new THREE.RingGeometry(o.r - 0.8, o.r + 0.6, 64),
      accent,
      0,
      2.45,
      0,
      g,
    );
    rim.rotation.x = -Math.PI / 2;
    const halo = mesh(
      new THREE.RingGeometry(o.r + 4, o.r + 4.35, 64),
      subtle,
      0,
      0.1,
      0,
      g,
    );
    halo.rotation.x = -Math.PI / 2;
    const core = mesh(
      new THREE.CylinderGeometry(o.r * 0.34, o.r * 0.48, 9, 8),
      dark,
      0,
      6,
      0,
      g,
    );
    core.castShadow = true;
    const energy = mesh(
      new THREE.OctahedronGeometry(o.r * 0.23),
      accent,
      0,
      18,
      0,
      g,
    );
    this.rotors.push(energy);
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2 + 0.5,
        x = Math.cos(a) * o.r * 0.67,
        z = Math.sin(a) * o.r * 0.67;
      const height =
        o.kind === "spire"
          ? 28 + (i % 2) * 12
          : o.kind === "garden"
            ? 8 + (i % 2) * 7
            : 14;
      const tower = box(g, alloy, x, height / 2 + 2, z, 6, height, 6);
      tower.rotation.y = a;
      tower.castShadow = true;
      const light = box(
        g,
        accent,
        x,
        height / 2 + 2,
        z + 3.05,
        1,
        height * 0.8,
        0.12,
      );
      light.rotation.y = 0;
      const cap = mesh(
        new THREE.ConeGeometry(4.8, 5, 4),
        pearl,
        x,
        height + 3,
        z,
        g,
      );
      cap.rotation.y = Math.PI / 4;
    }
    for (const y of [9, 22]) {
      const ring = mesh(
        new THREE.TorusGeometry(o.r * 0.5, 0.2, 6, 64),
        accent,
        0,
        y,
        0,
        g,
      );
      ring.rotation.x = Math.PI / 2 + (y === 22 ? 0.25 : 0);
      this.rotors.push(ring);
    }
    const beam = mesh(
      new THREE.CylinderGeometry(1.2, 3, 60, 16, 1, true),
      subtle,
      0,
      34,
      0,
      g,
    );
    beam.material.side = THREE.DoubleSide;
  }
  resize() {
    this.width = innerWidth;
    this.height = innerHeight;
    this.renderer.setSize(this.width, this.height, false);
    if (this.composer) {
      this.composer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
      this.composer.setSize(this.width, this.height);
    }
    this.updateProjection();
  }
  updateProjection() {
    const h = this.viewHeight / 2,
      aspect = this.width / this.height;
    this.camera.left = -h * aspect;
    this.camera.right = h * aspect;
    this.camera.top = h;
    this.camera.bottom = -h;
    this.camera.updateProjectionMatrix();
  }
  setQuality(high) {
    this.quality = high;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, high ? 1.65 : 1));
    this.renderer.shadowMap.enabled = high;
    this.sun.castShadow = high;
    this.resize();
  }
  reset(arena) {
    for (const entry of this.bikes.values()) {
      this.scene.remove(entry.group, entry.shadow, entry.aura);
      entry.shadow.material.dispose();
      entry.aura.material.dispose();
    }
    this.bikes.clear();
    this.particles.length = 0;
    this.cameraTarget.set(arena.player.x, 0, arena.player.z);
    this.syncCamera(arena.player, 1);
  }
  getBike(r) {
    if (this.bikes.has(r.id)) return this.bikes.get(r.id);
    const group = createBike(r.skin, r.loadout);
    this.scene.add(group);
    const shadow = mesh(
      new THREE.PlaneGeometry(11, 6),
      new THREE.MeshBasicMaterial({
        map: this.glowTexture,
        color: 0x000000,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      }),
      r.x,
      0.1,
      r.z,
      this.scene,
    );
    shadow.rotation.x = -Math.PI / 2;
    const aura = mesh(
      new THREE.PlaneGeometry(16, 11),
      new THREE.MeshBasicMaterial({
        map: this.glowTexture,
        color: COLORS[r.skin],
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
      r.x,
      0.12,
      r.z,
      this.scene,
    );
    aura.rotation.x = -Math.PI / 2;
    const result = { group, shadow, aura };
    this.bikes.set(r.id, result);
    return result;
  }
  syncCamera(p, dt) {
    const ahead = p.boost ? 14 : 8;
    const target = new THREE.Vector3(
      p.x + Math.cos(p.angle) * ahead,
      0,
      p.z + Math.sin(p.angle) * ahead,
    );
    this.cameraTarget.lerp(target, 1 - Math.exp(-dt * 5));
    this.viewHeight +=
      ((this.width < 700 ? 195 : 170) +
        Math.min(65, p.length * 0.035) +
        (p.boost ? 14 : 0) -
        this.viewHeight) *
      (1 - Math.exp(-dt * 2));
    this.updateProjection();
    this.camera.position.set(
      this.cameraTarget.x,
      210,
      this.cameraTarget.z + 165,
    );
    this.camera.lookAt(this.cameraTarget);
    this.camera.updateMatrixWorld();
    this.sun.position.set(p.x - 80, 160, p.z - 70);
    this.sun.target.position.set(p.x, 0, p.z);
    this.sun.target.updateMatrixWorld();
  }
  screenAngle(x, y, p) {
    this.pointer.set((x / this.width) * 2 - 1, 1 - (y / this.height) * 2);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (this.raycaster.ray.intersectPlane(this.plane, this.projected)) {
      const dx = this.projected.x - p.x,
        dz = this.projected.z - p.z;
      if (Math.hypot(dx, dz) > 4) return Math.atan2(dz, dx);
    }
    return p.angle;
  }
  emit(x, z, skin, count = 12, power = 1) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= 600) this.particles.shift();
      const a = Math.random() * Math.PI * 2,
        speed = (6 + Math.random() * 20) * power;
      this.particles.push({
        x,
        y: 1,
        z,
        vx: Math.cos(a) * speed,
        vz: Math.sin(a) * speed,
        vy: 8 + Math.random() * 18,
        life: 0.5 + Math.random() * 0.8,
        max: 1.3,
        skin,
      });
    }
  }
  draw(arena, dt, time) {
    const p = arena.player;
    this.syncCamera(p, dt);
    const range = Math.max(
        240,
        ((this.viewHeight * this.width) / this.height) * 0.75 + 60,
      ),
      rangeSq = range * range;
    for (const r of arena.riders) {
      const b = this.getBike(r),
        visible = r.alive && (r.x - p.x) ** 2 + (r.z - p.z) ** 2 < rangeSq;
      b.group.visible = b.shadow.visible = b.aura.visible = visible;
      if (!visible) continue;
      const altitude = jumpHeight(r);
      b.group.position.set(r.x, altitude + 0.06, r.z);
      b.group.rotation.set(
        Math.sin(time * 9 + r.id) * 0.018,
        -r.angle,
        Math.sin(r.jump > 0 ? (1 - r.jump / 1.05) * Math.PI * 2 : 0) * 0.14,
      );
      b.group.scale.setScalar(r.player ? 1.35 : 1.17);
      animateWheels(b.group, r.speed * dt);
      b.shadow.position.set(r.x, 0.09, r.z);
      b.shadow.rotation.z = -r.angle;
      b.shadow.scale.setScalar(1 + altitude * 0.04);
      b.shadow.material.opacity = 0.8 - altitude * 0.03;
      b.aura.position.set(r.x, 0.12, r.z);
      b.aura.rotation.z = -r.angle;
      b.aura.material.opacity = r.boost ? 0.5 : 0.24;
      b.aura.material.opacity = r.grace > 0 ? 0.45 : b.aura.material.opacity;
      if (r.boost && Math.random() < 0.65)
        this.emit(
          r.x - Math.cos(r.angle) * 4,
          r.z - Math.sin(r.angle) * 4,
          r.skin,
          1,
          0.35,
        );
    }
    let fi = 0;
    for (const f of arena.foodHash.query(p.x, p.z, range)) {
      if (fi >= 2000) break;
      if ((f.x - p.x) ** 2 + (f.z - p.z) ** 2 > rangeSq) continue;
      const scale = 0.85 + f.value * 0.15;
      dummy.position.set(f.x, 1.4 + Math.sin(time * 2 + f.index) * 0.38, f.z);
      dummy.rotation.set(0, time * 0.7 + f.index, Math.PI / 8);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      this.crystals.setMatrixAt(fi, dummy.matrix);
      this.crystals.setColorAt(fi, shardPalette[f.skin]);
      dummy.position.y = 0.08;
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.set(6 * scale, 6 * scale, 1);
      dummy.updateMatrix();
      this.crystalGlows.setMatrixAt(fi, dummy.matrix);
      this.crystalGlows.setColorAt(fi, palette[f.skin]);
      fi++;
    }
    this.crystals.count = this.crystalGlows.count = fi;
    this.crystalGlows.visible = this.quality;
    for (const m of [this.crystals, this.crystalGlows]) {
      m.instanceMatrix.needsUpdate = true;
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
    }
    let ti = 0;
    for (const r of arena.riders) {
      if (!r.alive) continue;
      const points = r.trail;
      const head = { x: r.x, y: jumpHeight(r), z: r.z };
      for (let i = 0; i < points.length; i++) {
        const a = points[i],
          b = i === points.length - 1 ? head : points[i + 1];
        if ((a.x - p.x) ** 2 + (a.z - p.z) ** 2 > rangeSq) continue;
        const len = Math.hypot(b.x - a.x, b.z - a.z);
        if (len < 0.01 || len > 6 || ti >= 12000) continue;
        this.walls.segment(ti, a, b, palette[r.skin]);
        const ya = (a.y ?? 0) + WALL_HEIGHT + 0.08,
          yb = (b.y ?? 0) + WALL_HEIGHT + 0.08;
        edgeDirection.set(b.x - a.x, yb - ya, b.z - a.z);
        const edgeLength = edgeDirection.length();
        dummy.position.set((a.x + b.x) / 2, (ya + yb) / 2, (a.z + b.z) / 2);
        dummy.quaternion.setFromUnitVectors(ALONG, edgeDirection.normalize());
        dummy.scale.set(edgeLength + 0.19, 0.26, 0.38);
        dummy.updateMatrix();
        this.cores.setMatrixAt(ti, dummy.matrix);
        this.cores.setColorAt(ti, palette[r.skin].clone().lerp(white, 0.32));
        ti++;
      }
    }
    this.walls.finish(ti);
    for (const m of [this.cores]) {
      m.count = ti;
      m.instanceMatrix.needsUpdate = true;
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
    }
    let si = 0;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const s = this.particles[i];
      s.life -= dt;
      if (s.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      s.x += s.vx * dt;
      s.z += s.vz * dt;
      s.y += s.vy * dt;
      s.vy -= 32 * dt;
      dummy.position.set(s.x, Math.max(0.1, s.y), s.z);
      dummy.rotation.set(time * 3, time * 4, 0);
      dummy.scale.setScalar(Math.min(1, s.life * 2));
      dummy.updateMatrix();
      this.sparks.setMatrixAt(si, dummy.matrix);
      this.sparks.setColorAt(si, palette[s.skin]);
      si++;
    }
    this.sparks.count = si;
    this.sparks.instanceMatrix.needsUpdate = true;
    if (this.sparks.instanceColor) this.sparks.instanceColor.needsUpdate = true;
    for (const r of this.rotors) {
      if (r.geometry.type === "OctahedronGeometry") {
        r.rotation.y = time * 0.5;
        r.position.y = 18 + Math.sin(time) * 1.2;
      } else r.rotation.z = time * 0.15;
    }
    if (this.quality) this.composer.render(dt);
    else this.renderer.render(this.scene, this.camera);
  }
}

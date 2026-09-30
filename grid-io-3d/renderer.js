import { ChaseCamera } from "./chase.mjs?v=wheelie-2";
import * as THREE from "../grid-io/vendor/three.module.min.js";
import { createBike, animateWheels } from "./bike-model.js?v=wheelie-2";
import { NeonTrails } from "./neon-trails.js?v=wheelie-2";
import { DistantBikes } from "./distant-bikes.js?v=wheelie-2";
import { mergeGeometries } from "../grid-io/vendor/utils/BufferGeometryUtils.js";
import {
  HALF,
  WORLD_SIZE,
  COLORS,
  LANDMARKS,
  jumpHeight,
  trailHead,
  angleDifference,
} from "./simulation.mjs?v=wheelie-2";

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
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
    this.renderer.info.autoReset = false;
    this.renderScale = 1;
    this.frameAverage = 1 / 60;
    this.adaptTime = 0;
    this.visualPlayer = {};
    this.foodVisible = [];
    this.foodTimer = 0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.renderer.shadowMap.enabled = false;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x11101a);
    this.scene.fog = new THREE.FogExp2(0x19111b, 0.00062);
    this.camera = new THREE.PerspectiveCamera(68, 1, 0.15, 5000);
    this.camera.position.set(0, 210, 140);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();
    this.cameraTarget = new THREE.Vector3(0, 0, 125);
    this.chase = new ChaseCamera();
    this.lookBack = false;
    this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.quality = true;
    this.scene.add(new THREE.HemisphereLight(0xffeee6, 0x241a1b, 2.3));
    this.sun = new THREE.DirectionalLight(0xffebe4, 3.6);
    this.sun.position.set(-80, 160, -70);
    this.sun.castShadow = false;
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
    this.sun.shadow.normalBias = 0.15;
    this.scene.add(this.sun, this.sun.target);
    const rim = new THREE.DirectionalLight(0xff2420, 1.5);
    rim.position.set(80, 50, 100);
    this.scene.add(rim);
    this.textureLoader = new THREE.TextureLoader();
    this.glowTexture = canvasGlow();
    this.buildWorld();
    this.batchArchitecture();
    this.bikes = new Map();
    this.distantBikes = new DistantBikes();
    this.scene.add(this.distantBikes);
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
    this.walls = new NeonTrails();
    this.scene.add(this.walls);
    this.sparks = new THREE.InstancedMesh(
      new THREE.OctahedronGeometry(0.5),
      new THREE.MeshBasicMaterial({ toneMapped: false }),
      600,
    );
    this.sparks.frustumCulled = false;
    this.scene.add(this.sparks);
    this.resize();
  }
  buildWorld() {
    const texture = this.textureLoader.load("../grid-io/assets/red-alloy.webp");
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
    grid.material.opacity = 0.42;
    this.scene.add(grid);
    const major = new THREE.GridHelper(WORLD_SIZE, 50, 0xc53835, 0x7d2e31);
    major.position.y = 0.03;
    major.material.transparent = true;
    major.material.opacity = 0.58;
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
    this.archTexture = this.textureLoader.load("../grid-io/assets/red-alloy.webp");
    this.archTexture.colorSpace = THREE.SRGBColorSpace;
    this.archTexture.anisotropy = 4;
    this.archMaterial = new THREE.MeshStandardMaterial({map:this.archTexture,color:0xaaa0a0,metalness:0.55,roughness:0.38});
    this.landmarkGroups = [];
    this.rotors = [];
    for (const o of LANDMARKS) this.buildLandmark(o);
    this.buildSkyline();
  }
  buildSkyline() {
    // Instanced towers stay beyond the original solid arena boundary.
    const towers = new THREE.InstancedMesh(boxGeo, standard(0x22212c, 0.7, 0.5), 160);
    const lights = new THREE.InstancedMesh(boxGeo, glow(0xff6659, 0.8), 480);
    towers.name = "perimeter-megastructures";
    lights.name = "skyline-light-strips";
    let n = 0;
    for (let i = 0; i < 160; i++) {
      const side = Math.floor(i / 40), offset = (i % 40 - 19.5) * 92;
      const depth = 1400 + (i % 4) * 95;
      const x = side < 2 ? offset : (side === 2 ? -depth : depth);
      const z = side < 2 ? (side === 0 ? -depth : depth) : offset;
      const height = 70 + (i * 79 % 290), width = 24 + i * 17 % 37;
      dummy.position.set(x, height / 2 - 1, z);
      dummy.rotation.set(0, side < 2 ? 0 : Math.PI / 2, 0);
      dummy.scale.set(width, height, 35); dummy.updateMatrix(); towers.setMatrixAt(i, dummy.matrix);
      for (const j of [-1, 0, 1]) {
        dummy.position.set(x + (side < 2 ? j * width * 0.3 : (side === 2 ? 18 : -18)), height / 2, z + (side < 2 ? (side === 0 ? 18 : -18) : j * width * 0.3));
        dummy.scale.set(0.8, height * (j ? 0.45 : 0.84), 0.8); dummy.updateMatrix(); lights.setMatrixAt(n++, dummy.matrix);
      }
    }
    this.scene.add(towers, lights);
    const positions = new Float32Array(450 * 3);
    for (let i = 0; i < 450; i++) {
      const angle = i * 2.39996323, y = 400 + (i * 139 % 1800);
      positions.set([Math.cos(angle) * 2600, y, Math.sin(angle) * 2600], i * 3);
    }
    const stars = new THREE.BufferGeometry();
    stars.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starfield = new THREE.Points(stars, new THREE.PointsMaterial({ color: 0xded2df, size: 3, transparent: true, opacity: 0.55, fog: false }));
    starfield.name = "starfield"; this.scene.add(starfield);
    const halo = mesh(new THREE.TorusGeometry(190, 1.8, 6, 128), glow(0xff7669, 0.6), 0, 560, -2050, this.scene);
    halo.name = "orbital-relay";
  }
  buildLandmark(o) {
    const g = new THREE.Group();
    g.position.set(o.x, 0, o.z);
    this.scene.add(g);
    this.landmarkGroups.push(g);
    const accent = glow(o.color),
      subtle = glow(o.color, 0.16),
      alloy = this.archMaterial;
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
  batchArchitecture() {
    this.scene.updateMatrixWorld(true);
    const batches = new Map();
    for (const group of this.landmarkGroups) for (const child of [...group.children]) {
      if (!child.isMesh || this.rotors.includes(child)) continue;
      const clone = child.geometry.clone().applyMatrix4(child.matrixWorld);
      const geometry = clone.index ? clone.toNonIndexed() : clone;
      if (geometry !== clone) clone.dispose();
      if (!batches.has(child.material)) batches.set(child.material, []);
      batches.get(child.material).push(geometry); group.remove(child);
    }
    for (const [material, geometries] of batches) {
      const geometry = mergeGeometries(geometries);
      geometries.forEach(g => g.dispose());
      const batch = new THREE.Mesh(geometry, material); batch.name = "batched-reactor-architecture"; this.scene.add(batch);
    }
  }
  resize() {
    this.width = innerWidth; this.height = innerHeight;
    const ceiling = this.quality ? 1.25 : 1;
    const pixels = Math.min(1, Math.sqrt(1920 * 1080 / (this.width * this.height)));
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, ceiling) * this.renderScale * pixels);
    this.renderer.setSize(this.width, this.height, false);
    this.updateProjection();
  }
  updateProjection() {
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }
  setQuality(high) {
    this.quality = high; this.renderScale = 1; this.resize();
  }
  adapt(dt) {
    if (dt <= 0 || dt > 0.1) return;
    this.frameAverage += (dt - this.frameAverage) * 0.04;
    this.adaptTime += dt;
    if (this.adaptTime < 1.5) return;
    this.adaptTime = 0;
    const next = this.frameAverage > 0.022 ? Math.max(0.65, this.renderScale - 0.1)
      : this.frameAverage < 0.0175 ? Math.min(1, this.renderScale + 0.05) : this.renderScale;
    if (Math.abs(next - this.renderScale) > 0.01) { this.renderScale = next; this.resize(); }
  }
  interpolate(r, alpha, target) {
    Object.assign(target, r);
    if (Number.isFinite(r.previousX)) {
      target.x = r.previousX + (r.x - r.previousX) * alpha;
      target.z = r.previousZ + (r.z - r.previousZ) * alpha;
      target.angle = r.previousAngle + angleDifference(r.angle, r.previousAngle) * alpha;
      if (r.previousJump >= r.jump) target.jump = r.previousJump + (r.jump-r.previousJump)*alpha;
      target.wheelie = (r.previousWheelie || 0) + ((r.wheelie || 0)-(r.previousWheelie || 0))*alpha;
    }
    return target;
  }
  reset(arena) {
    for (const entry of this.bikes.values()) {
      this.scene.remove(entry.group, entry.shadow, entry.aura);
      entry.shadow.geometry.dispose();
      entry.aura.geometry.dispose();
      entry.shadow.material.dispose();
      entry.aura.material.dispose();
    }
    this.bikes.clear();
    this.particles.length = 0;
    this.foodTimer = 0;
    this.foodVisible.length = 0;
    this.chase.reset(arena.player);
    this.lookBack = false;
    this.cameraTarget.set(arena.player.x, 0, arena.player.z);
    this.syncCamera(arena.player, 1);
  }
  getBike(r) {
    if (this.bikes.has(r.id)) return this.bikes.get(r.id);
    const model = createBike(r.skin, r.loadout);
    const group = new THREE.Group(), pivot = new THREE.Group();
    pivot.name = "rear-axle-pivot"; pivot.position.set(-2.65, 1.35, 0);
    model.position.set(2.65, -1.35, 0); pivot.add(model); group.add(pivot);
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
    const result = { group, pivot, shadow, aura, visual: {} };
    this.bikes.set(r.id, result);
    return result;
  }
  syncCamera(p, dt) {
    const pose = this.chase.update(p, dt, { aspect: this.width / this.height, lookBack: this.lookBack, reducedMotion: this.reducedMotion });
    this.camera.position.set(pose.x, pose.y, pose.z);
    this.cameraTarget.set(pose.targetX, pose.targetY, pose.targetZ);
    this.camera.fov = pose.fov;
    this.updateProjection();
    this.camera.lookAt(this.cameraTarget);
    this.camera.updateMatrixWorld();
    this.sun.position.set(p.x - 80, 160, p.z - 70);
    this.sun.target.position.set(p.x, 0, p.z);
    this.sun.target.updateMatrixWorld();
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
  draw(arena, dt, time, alpha = 1) {
    this.renderer.info.reset();
    this.adapt(dt);
    const p = this.interpolate(arena.player, alpha, this.visualPlayer);
    this.syncCamera(p, dt);
    const range = this.quality ? 520 : 380, rangeSq = range * range;
    this.distantBikes.begin();
    for (const rider of arena.riders) {
      const distanceSq = (rider.x-p.x)**2+(rider.z-p.z)**2;
      const visible = rider.alive && distanceSq < rangeSq;
      const close = rider.player || distanceSq < (this.quality ? 85 : 55)**2;
      let b = this.bikes.get(rider.id);
      if (!visible || !close) {
        if (b) b.group.visible = b.shadow.visible = b.aura.visible = false;
        if (visible) this.distantBikes.rider(rider);
        continue;
      }
      b = this.getBike(rider);
      b.group.visible = b.shadow.visible = b.aura.visible = true;
      const r = this.interpolate(rider, alpha, b.visual);
      const altitude = jumpHeight(r);
      b.group.position.set(r.x, altitude + 0.06, r.z);
      b.group.rotation.set(0, -r.angle, 0);
      b.group.scale.setScalar(r.player ? 1.35 : 1.17);
      b.pivot.rotation.z = (r.wheelie || 0) * 0.68;
      animateWheels(b.group, r.speed * dt);
      b.shadow.position.set(r.x, 0.09, r.z); b.shadow.rotation.z = -r.angle;
      b.shadow.scale.setScalar(1 + altitude * 0.04); b.shadow.material.opacity = 0.8 - altitude * 0.03;
      b.aura.position.set(r.x, 0.12, r.z); b.aura.rotation.z = -r.angle;
      b.aura.material.opacity = r.boost ? 0.5 : 0.24;
      if (r.boost && Math.random() < Math.min(0.7, dt*24))
        this.emit(r.x-Math.cos(r.angle)*4,r.z-Math.sin(r.angle)*4,r.skin,1,0.35);
    }
    this.distantBikes.finish();
    this.foodTimer -= dt;
    if (this.foodTimer <= 0 || arena.foodRevision !== this.foodRevision) {
      arena.foodHash.query(p.x, p.z, range, this.foodVisible);
      this.foodRevision = arena.foodRevision; this.foodTimer = 0.15;
    }
    let fi = 0;
    for (const f of this.foodVisible) {
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
    this.walls.begin();
    // Two distance bands retain immediate hazards before distant scenery.
    for (let band=0;band<2;band++) for (const rider of arena.riders) {
      if (!rider.alive) continue;
      const points=rider.trail, head=trailHead(rider.player?p:rider);
      for(let i=0;i<points.length;i++) {
        const a=points[i],b=i===points.length-1?head:points[i+1];
        const distance=(a.x-p.x)**2+(a.z-p.z)**2;
        if(distance>rangeSq || (band===0 ? distance>150**2 : distance<=150**2))continue;
        const lengthSq=(b.x-a.x)**2+(b.z-a.z)**2;
        if(lengthSq<0.0001||lengthSq>36)continue;
        this.walls.segment(a,b,palette[rider.skin]);
      }
    }
    this.walls.finish();
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
    this.renderer.render(this.scene, this.camera);
  }
}

import * as THREE from "./vendor/three.module.min.js";
import { createBike } from "./bike-model.js?v=speed-1";

export class BikeGarage {
  constructor(teaser, stage, reducedMotion = false) {
    this.teaser = teaser;
    this.stage = stage;
    this.expanded = false;
    this.reducedMotion = reducedMotion;
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute(
      "aria-label",
      "3D preview of your customized bike",
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    this.scene.add(new THREE.HemisphereLight(0xfff1ed, 0x241819, 2.2));
    const key = new THREE.DirectionalLight(0xfff4ef, 4.5);
    key.position.set(5, 12, 9);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, {
      left: -7,
      right: 7,
      top: 7,
      bottom: -7,
      near: 1,
      far: 35,
    });
    key.shadow.normalBias = 0.06;
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xff302a, 3);
    rim.position.set(-8, 6, -8);
    this.scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffbbaa, 1.3);
    fill.position.set(5, 3, -5);
    this.scene.add(fill);
    this.pivot = new THREE.Group();
    this.scene.add(this.pivot);
    this.platform = new THREE.Group();
    this.scene.add(this.platform);
    const disk = new THREE.Mesh(
      new THREE.CylinderGeometry(4.8, 4.95, 0.24, 64),
      new THREE.MeshStandardMaterial({
        color: 0x111011,
        roughness: 0.92,
        metalness: 0.02,
      }),
    );
    disk.position.y = -0.18;
    disk.receiveShadow = true;
    this.platform.add(disk);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(4.84, 0.027, 8, 96),
      new THREE.MeshBasicMaterial({
        color: 0xff3930,
        transparent: true,
        opacity: 0.65,
      }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.04;
    this.platform.add(ring);
    this.yaw = -0.22;
    this.pitch = 0;
    this.lastDrag = 0;
    this.drag = null;
    this.dirty = true;
    this.elapsed = 0;
    this.teaser.append(this.canvas);
    this.platform.visible = false;
    this.canvas.addEventListener("pointerdown", (e) => {
      if (!this.expanded) return;
      e.preventDefault();
      this.drag = { id: e.pointerId, x: e.clientX, y: e.clientY };
      this.lastDrag = performance.now();
      this.canvas.setPointerCapture(e.pointerId);
    });
    this.canvas.addEventListener("pointermove", (e) => {
      if (!this.drag || this.drag.id !== e.pointerId) return;
      this.yaw += (e.clientX - this.drag.x) * 0.009;
      this.pitch = THREE.MathUtils.clamp(
        this.pitch + (e.clientY - this.drag.y) * 0.004,
        -0.2,
        0.42,
      );
      this.drag.x = e.clientX;
      this.drag.y = e.clientY;
      this.lastDrag = performance.now();
      this.dirty = true;
    });
    for (const type of ["pointerup", "pointercancel", "lostpointercapture"])
      this.canvas.addEventListener(type, () => {
        this.drag = null;
      });
    this.stage.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code))
        return;
      e.preventDefault();
      this.yaw +=
        e.code === "ArrowLeft" ? -0.14 : e.code === "ArrowRight" ? 0.14 : 0;
      this.pitch = THREE.MathUtils.clamp(
        this.pitch +
          (e.code === "ArrowUp" ? -0.07 : e.code === "ArrowDown" ? 0.07 : 0),
        -0.2,
        0.42,
      );
      this.lastDrag = performance.now();
      this.dirty = true;
    });
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(this.teaser);
    this.observer.observe(this.stage);
    this.resize();
    this.canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.lost = true;
      this.stage.dataset.error = "Preview interrupted. Reload to restore 3D.";
    });
    this.canvas.addEventListener("webglcontextrestored", () => {
      this.lost = false;
      delete this.stage.dataset.error;
      this.dirty = true;
    });
  }
  setLoadout(skin, loadout) {
    if (this.bike) this.pivot.remove(this.bike);
    this.bike = createBike(skin, loadout);
    this.pivot.add(this.bike);
    this.dirty = true;
  }
  open() {
    this.expanded = true;
    this.stage.append(this.canvas);
    this.platform.visible = true;
    this.resetView();
    this.resize();
  }
  close() {
    this.expanded = false;
    this.teaser.append(this.canvas);
    this.platform.visible = false;
    this.drag = null;
    this.yaw = -0.22;
    this.pitch = 0;
    this.resize();
  }
  resetView() {
    this.yaw = -0.22;
    this.pitch = 0;
    this.lastDrag = performance.now();
    this.dirty = true;
  }
  resize() {
    const host = this.expanded ? this.stage : this.teaser,
      rect = host.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    this.renderer.setSize(rect.width, rect.height, false);
    const aspect = rect.width / rect.height;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    const scale = Math.max(0.88, 1.08 / aspect);
    this.camera.position.set(8.5 * scale, 6.2 * scale + 1.8, 10.5 * scale);
    this.camera.lookAt(0, 2, 0);
    this.dirty = true;
  }
  draw(dt, now) {
    if (this.lost || !this.bike) return;
    this.elapsed += dt;
    if (!this.dirty && this.elapsed < 1 / 30) return;
    if (
      !this.drag &&
      !this.reducedMotion &&
      this.expanded &&
      now - this.lastDrag > 4000
    ) {
      this.yaw += dt * 0.22;
      this.dirty = true;
    }
    if (!this.dirty) return;
    this.elapsed = 0;
    this.pivot.rotation.set(this.pitch, this.yaw, 0);
    this.renderer.render(this.scene, this.camera);
    this.dirty = false;
  }
}

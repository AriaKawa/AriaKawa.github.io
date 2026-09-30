import * as THREE from "./vendor/three.module.min.js";
import { GridRenderer } from "./arcade/renderer.js?v=arcade-1";
import { roadById } from "./arcade/terrain.mjs?v=arcade-1";

// Use the same riding surfaces and bike poses as the third-person game, while
// keeping Grid.io's north-up, orthographic camera and absolute mouse steering.
export class ArcadeRenderer extends GridRenderer {
  constructor(canvas) {
    super(canvas);
    this.camera = new THREE.OrthographicCamera(-150, 150, 100, -100, .1, 1600);
    this.viewHeight = 195;
    this.aim = new THREE.Vector3();
    this.pointer = new THREE.Vector2();
    this.projected = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0));
    this.cutaway = { value: new THREE.Vector3() };
    this.tunnelCut = { value: new THREE.Vector2() };
    this.cutawayMaterials = new Map();
    this.prepareCutaway(this.scene);
    this.loopDeck = this.terrain.getObjectByName("helix-loop-drivable-surface");
    this.loopDeck.material.transparent = true;
    this.resize();
  }

  prepareCutaway(root) {
    root.traverse(object => {
      if (!object.material) return;
      const prepare = source => {
        if (this.cutawayMaterials.has(source)) return this.cutawayMaterials.get(source);
        const material = source.clone();
        this.cutawayMaterials.set(source, material);
        this.cutawayMaterials.set(material, material);
        material.onBeforeCompile = shader => {
          shader.uniforms.arcadeFocus = this.cutaway;
          shader.uniforms.arcadeTunnel = this.tunnelCut;
          shader.vertexShader = "varying vec3 arcadeWorld;\n" + shader.vertexShader;
          if (material.isShaderMaterial) {
            // Neon trails generate their vertices from segment endpoints.
            shader.vertexShader = shader.vertexShader.replace("vec4 view =", "arcadeWorld = (modelMatrix * vec4(center, 1.0)).xyz;\n  vec4 view =");
          } else {
            shader.vertexShader = shader.vertexShader.replace("#include <project_vertex>", `
              vec4 arcadePosition = vec4(transformed, 1.0);
              #ifdef USE_INSTANCING
                arcadePosition = instanceMatrix * arcadePosition;
              #endif
              arcadeWorld = (modelMatrix * arcadePosition).xyz;
              #include <project_vertex>
            `);
          }
          shader.fragmentShader = "uniform vec3 arcadeFocus;\nuniform vec2 arcadeTunnel;\nvarying vec3 arcadeWorld;\n" + shader.fragmentShader;
          shader.fragmentShader = shader.fragmentShader.replace("void main() {", `void main() {
            vec3 delta = arcadeWorld - arcadeFocus;
            // Project onto the rider's plane along the fixed camera direction.
            vec2 overhead = delta.xz - vec2(0.0, delta.y * 165.0 / 210.0);
            if (delta.y > 12.0 && dot(overhead, overhead) < 5625.0
              ${object.name === "textured-ground-with-open-ramps" ? "&& abs(arcadeWorld.z - arcadeTunnel.x) < arcadeTunnel.y" : ""}) discard;
          `);
        };
        material.customProgramCacheKey = () => "grid-arcade-cutaway-1-" + (object.name === "textured-ground-with-open-ramps" ? "roof" : "object");
        return material;
      };
      object.material = Array.isArray(object.material)
        ? object.material.map(prepare) : prepare(object.material);
    });
  }

  getBike(rider) {
    const exists = this.bikes.has(rider.id);
    const bike = super.getBike(rider);
    if (!exists) this.prepareCutaway(bike.group);
    return bike;
  }

  updateProjection() {
    // The base constructor calls resize before the orthographic camera exists.
    if (!this.camera.isOrthographicCamera) return super.updateProjection();
    const half = this.viewHeight / 2;
    const aspect = this.width / this.height;
    // Retain enough road on either side in portrait orientation.
    this.camera.left = -Math.max(85, half * aspect);
    this.camera.right = -this.camera.left;
    this.camera.top = this.camera.right / aspect;
    this.camera.bottom = -this.camera.top;
    this.camera.updateProjectionMatrix();
  }

  syncCamera(rider, dt) {
    const ahead = rider.boost ? 14 : 8;
    this.aim.set(rider.x + Math.cos(rider.angle) * ahead,
      rider.y || 0, rider.z + Math.sin(rider.angle) * ahead);
    this.cameraTarget.lerp(this.aim, 1 - Math.exp(-dt * 7));
    const height = 195 + Math.min(45, rider.length * .025) + (rider.boost ? 12 : 0);
    this.viewHeight += (height - this.viewHeight) * (1 - Math.exp(-dt * 3));
    this.updateProjection();
    this.camera.position.set(this.cameraTarget.x, this.cameraTarget.y + 210, this.cameraTarget.z + 165);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(this.cameraTarget);
    this.camera.updateMatrixWorld();
    this.cutaway.value.set(rider.x, rider.y || 0, rider.z);
    const road = roadById(rider.road);
    this.tunnelCut.value.set(road?.cross || 0, road?.kind === "tunnel" ? road.width / 2 + 2 : 0);
    // The rider sits on the underside at the top of the loop. Reveal the bike
    // through that deck without rolling or flipping the top-down camera.
    const inverted = Number.isFinite(rider.loopS) && Math.cos(rider.pitch || 0) < .5;
    this.loopDeck.material.opacity = inverted ? .16 : 1;
    this.loopDeck.material.depthWrite = !inverted;
    this.sun.position.set(rider.x - 80, 160, rider.z - 70);
    this.sun.target.position.set(rider.x, 0, rider.z);
    this.sun.target.updateMatrixWorld();
  }

  screenAngle(x, y, rider) {
    this.pointer.set(x / this.width * 2 - 1, 1 - y / this.height * 2);
    this.plane.constant = -(rider.y || 0);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (this.raycaster.ray.intersectPlane(this.plane, this.projected)) {
      const dx = this.projected.x - rider.x, dz = this.projected.z - rider.z;
      if (Math.hypot(dx, dz) > 4) return Math.atan2(dz, dx);
    }
    return rider.angle;
  }
}

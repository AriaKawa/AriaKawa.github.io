import * as THREE from "./vendor/three.module.min.js";

// A continuous vertical sheet of light. There is no floor ribbon, platform,
// underlay, or structural geometry beneath the laser.
export class LaserWalls extends THREE.Mesh {
  constructor(capacity = 12000) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(capacity * 12),
      colors = new Float32Array(capacity * 16);
    const index = new Uint32Array(capacity * 6);
    for (let i = 0; i < capacity; i++)
      index.set(
        [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 2, i * 4 + 1, i * 4 + 3],
        i * 6,
      );
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 4).setUsage(THREE.DynamicDrawUsage),
    );
    geometry.setIndex(new THREE.BufferAttribute(index, 1));
    geometry.setDrawRange(0, 0);
    super(
      geometry,
      new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        side: THREE.DoubleSide,
        forceSinglePass: true,
      }),
    );
    this.name = "laser-walls";
    this.frustumCulled = false;
    this.positions = positions;
    this.colors = colors;
  }
  segment(i, a, b, color, heightA, heightB) {
    this.positions.set(
      [a.x, 0.12, a.z, a.x, heightA, a.z, b.x, 0.12, b.z, b.x, heightB, b.z],
      i * 12,
    );
    for (let vertex = 0; vertex < 4; vertex++)
      this.colors.set(
        [color.r, color.g, color.b, vertex % 2 ? 0.55 : 0.12],
        i * 16 + vertex * 4,
      );
  }
  finish(count) {
    this.geometry.setDrawRange(0, count * 6);
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
  }
}

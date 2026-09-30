import * as THREE from "../vendor/three.module.min.js";
import { WALL_HEIGHT, WALL_BOTTOM } from "./simulation.mjs?v=arcade-1";

const vertexShader = `
attribute vec3 segmentStart;
attribute vec3 segmentEnd;
attribute vec3 laserColor;
attribute vec3 surfaceNormal;
uniform float layer;
varying vec3 vColor;
varying vec3 vLocal;
varying float vDistance;
void main() {
  vec3 center = mix(segmentStart, segmentEnd, position.x + 0.5);
  vec3 along = normalize(segmentEnd - segmentStart + vec3(0.000001));
  vec3 up = normalize(surfaceNormal);
  vec3 across = normalize(cross(along,up)+vec3(0.000001));
  float width = layer < 0.5 ? 0.42 : (layer < 1.5 ? 0.72 : 2.6);
  float height = layer < 0.5 ? ${WALL_HEIGHT-WALL_BOTTOM} : (layer < 1.5 ? 0.42 : 2.0);
  float base = layer < 0.5 ? ${(WALL_BOTTOM+((WALL_HEIGHT-WALL_BOTTOM)/2)).toFixed(3)} : ${WALL_HEIGHT.toFixed(3)};
  if (layer > 1.5) {
    center += up * ${WALL_HEIGHT.toFixed(3)};
    vec3 facing = normalize(cross(along, normalize(cameraPosition - center)));
    center += facing * position.y * 3.1;
  } else {
    center += across * position.z * width + along * position.x * 0.14;
    center += up * (base + position.y * height);
  }
  vec4 view = modelViewMatrix * vec4(center, 1.0);
  vDistance = -view.z;
  vColor = laserColor;
  vLocal = position;
  gl_Position = projectionMatrix * view;
}`;
const fragmentShader = `
uniform float layer;
varying vec3 vColor;
varying vec3 vLocal;
varying float vDistance;
void main() {
  float y = vLocal.y + 0.5;
  vec3 color;
  float alpha;
  if (layer < 0.5) {
    float edge = pow(abs(y - 0.5) * 2.0, 12.0);
    float scan = pow(0.5 + 0.5 * cos(y * 75.0), 12.0);
    color = vColor * (0.8 + edge * 1.3) + vec3(edge * 0.3);
    alpha = 0.08 + edge * 0.22 + scan * 0.025;
  } else if (layer < 1.5) {
    float shine = 1.0 - abs(vLocal.y) * 1.2;
    color = mix(vColor * 1.7, vec3(1.9), shine * 0.35);
    alpha = 0.95;
  } else {
    float vertical = exp(-pow(vLocal.y * 5.4, 2.0));
    color = vColor * 1.8;
    alpha = vertical * 0.27;
  }
  alpha *= exp(-vDistance * 0.001);
  gl_FragColor = vec4(color, alpha);
  #include <colorspace_fragment>
}`;

// Three batched draws: translucent light wall, polished luminous core, soft halo.
// The glow works in a single scene render; it needs no fullscreen bloom passes.
export class NeonTrails extends THREE.Group {
  constructor(capacity = 24000) {
    super(); this.name = "neon-laser-trails"; this.capacity = capacity; this.count = 0;
    this.starts = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3).setUsage(THREE.DynamicDrawUsage);
    this.ends = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3).setUsage(THREE.DynamicDrawUsage);
    this.colors = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3).setUsage(THREE.DynamicDrawUsage);
    this.normals = new THREE.InstancedBufferAttribute(new Float32Array(capacity * 3), 3).setUsage(THREE.DynamicDrawUsage);
    this.geometries = [];
    for (let layer = 0; layer < 3; layer++) {
      const base = layer === 2 ? new THREE.PlaneGeometry(1, 1)
        : layer === 1 ? new THREE.CylinderGeometry(0.5,0.5,1,8,1,true).rotateZ(Math.PI/2)
        : new THREE.BoxGeometry(1, 1, 1);
      if (layer === 0) base.setIndex(Array.from(base.index.array).slice(12));
      const geo = new THREE.InstancedBufferGeometry();
      geo.index = base.index; geo.attributes.position = base.attributes.position;
      geo.setAttribute("segmentStart", this.starts); geo.setAttribute("segmentEnd", this.ends); geo.setAttribute("laserColor", this.colors);
      geo.setAttribute('surfaceNormal',this.normals);
      geo.instanceCount = 0; this.geometries.push(geo);
      const mesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({
        vertexShader, fragmentShader, uniforms: {layer:{value:layer}},
        transparent: true, depthWrite: false, toneMapped: false,
        blending: layer===2 ? THREE.AdditiveBlending : THREE.NormalBlending,
        side: layer===2 ? THREE.DoubleSide : THREE.FrontSide,
        forceSinglePass: true,
      }));
      mesh.name = ["laser-light-sheet", "laser-bright-core", "laser-soft-glow"][layer];
      mesh.frustumCulled = false; mesh.renderOrder = layer===2 ? 3 : 2;
      this.add(mesh);
    }
  }
  begin() { this.count = 0; }
  segment(a, b, color) {
    if(this.count >= this.capacity) return;
    const offset = this.count++ * 3;
    this.starts.array[offset]=a.x; this.starts.array[offset+1]=a.y||0; this.starts.array[offset+2]=a.z;
    this.ends.array[offset]=b.x; this.ends.array[offset+1]=b.y||0; this.ends.array[offset+2]=b.z;
    this.colors.array[offset]=color.r; this.colors.array[offset+1]=color.g; this.colors.array[offset+2]=color.b;
    this.normals.array[offset]=((a.nx||0)+(b.nx||0))*.5;this.normals.array[offset+1]=((a.ny??1)+(b.ny??1))*.5;this.normals.array[offset+2]=((a.nz||0)+(b.nz||0))*.5;
  }
  finish() {
    for(const geometry of this.geometries) geometry.instanceCount=this.count;
    for(const attribute of [this.starts,this.ends,this.colors,this.normals]) {
      attribute.clearUpdateRanges();
      if(this.count) attribute.addUpdateRange(0,this.count*3);
      attribute.needsUpdate=true;
    }
  }
}

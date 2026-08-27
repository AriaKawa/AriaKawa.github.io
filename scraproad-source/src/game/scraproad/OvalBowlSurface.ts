import * as THREE from "three";

export type OvalBowlConfig = {
  straightHalfLength: number;
  flatRadius: number;
  outerRadius: number;
  wallRise: number;
};

export type OvalBowlSample = {
  height: number;
  distance: number;
  progress: number;
  anchorZ: number;
  outwardX: number;
  outwardZ: number;
  normal: THREE.Vector3;
};

const subtleFloorHeight = (x: number, z: number): number =>
  Math.sin(x * .075) * Math.cos(z * .058) * .035;

export function sampleOvalBowl(config: OvalBowlConfig, x: number, z: number): OvalBowlSample {
  const anchorZ = THREE.MathUtils.clamp(z, -config.straightHalfLength, config.straightHalfLength);
  const dx = x;
  const dz = z - anchorZ;
  const distance = Math.hypot(dx, dz);
  const outwardX = distance > .0001 ? dx / distance : 1;
  const outwardZ = distance > .0001 ? dz / distance : 0;
  const wallWidth = config.outerRadius - config.flatRadius;
  const progress = THREE.MathUtils.clamp((distance - config.flatRadius) / wallWidth, 0, 1);
  const eased = progress * progress * (3 - 2 * progress);
  const floorFade = 1 - THREE.MathUtils.smoothstep(distance, config.flatRadius - 8, config.flatRadius);
  const height = subtleFloorHeight(x, z) * floorFade + config.wallRise * eased;
  const slope = progress > 0 && progress < 1
    ? config.wallRise * 6 * progress * (1 - progress) / wallWidth
    : 0;
  const normal = new THREE.Vector3(-outwardX * slope, 1, -outwardZ * slope).normalize();
  return { height, distance, progress, anchorZ, outwardX, outwardZ, normal };
}

export function clampToOvalBowl(
  config: OvalBowlConfig,
  x: number,
  z: number,
  inset: number,
): { x: number; z: number; collided: boolean } {
  const sample = sampleOvalBowl(config, x, z);
  const limit = config.outerRadius - inset;
  if (sample.distance <= limit) return { x, z, collided: false };
  return {
    x: sample.outwardX * limit,
    z: sample.anchorZ + sample.outwardZ * limit,
    collided: true,
  };
}

function createCapsuleLoop(radius: number, halfLength: number, arcSegments = 48, straightSegments = 40): THREE.Vector2[] {
  const points: THREE.Vector2[] = [];
  for (let index = 0; index < arcSegments; index++) {
    const angle = index / arcSegments * Math.PI;
    points.push(new THREE.Vector2(Math.cos(angle) * radius, halfLength + Math.sin(angle) * radius));
  }
  for (let index = 0; index < straightSegments; index++) {
    const t = index / straightSegments;
    points.push(new THREE.Vector2(-radius, THREE.MathUtils.lerp(halfLength, -halfLength, t)));
  }
  for (let index = 0; index < arcSegments; index++) {
    const angle = Math.PI + index / arcSegments * Math.PI;
    points.push(new THREE.Vector2(Math.cos(angle) * radius, -halfLength + Math.sin(angle) * radius));
  }
  for (let index = 0; index < straightSegments; index++) {
    const t = index / straightSegments;
    points.push(new THREE.Vector2(radius, THREE.MathUtils.lerp(-halfLength, halfLength, t)));
  }
  return points;
}

function addSurfaceAttributes(geometry: THREE.BufferGeometry, colors: number[]): void {
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
}

export function createOvalFloorGeometry(config: OvalBowlConfig): THREE.BufferGeometry {
  const contour = createCapsuleLoop(config.flatRadius, config.straightHalfLength);
  const vertices: number[] = [];
  const colors: number[] = [];
  const low = new THREE.Color(0x66564a), high = new THREE.Color(0x8d7660), color = new THREE.Color();
  for (const point of contour) {
    const height = sampleOvalBowl(config, point.x, point.y).height;
    vertices.push(point.x, height, point.y);
    const variation = THREE.MathUtils.clamp(.48 + Math.sin(point.x * .13 + point.y * .09) * .12, 0, 1);
    color.copy(low).lerp(high, variation).toArray(colors, colors.length);
  }
  const triangles = THREE.ShapeUtils.triangulateShape(contour, []);
  const indices: number[] = [];
  for (const [a, b, c] of triangles) indices.push(a, c, b);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  addSurfaceAttributes(geometry, colors);
  return geometry;
}

export function createOvalBankGeometry(config: OvalBowlConfig, radialSegments = 30): THREE.BufferGeometry {
  const loops: THREE.Vector2[][] = [];
  for (let ring = 0; ring <= radialSegments; ring++) {
    const radius = THREE.MathUtils.lerp(config.flatRadius, config.outerRadius, ring / radialSegments);
    loops.push(createCapsuleLoop(radius, config.straightHalfLength));
  }
  const loopSize = loops[0].length;
  const vertices: number[] = [];
  const colors: number[] = [];
  const inner = new THREE.Color(0x4e4c47), outer = new THREE.Color(0x252827), rust = new THREE.Color(0xa9562f), color = new THREE.Color();
  for (let ring = 0; ring < loops.length; ring++) {
    const progress = ring / radialSegments;
    for (const point of loops[ring]) {
      vertices.push(point.x, sampleOvalBowl(config, point.x, point.y).height, point.y);
      color.copy(inner).lerp(outer, progress);
      if ((progress > .28 && progress < .32) || (progress > .76 && progress < .80)) color.lerp(rust, .68);
      color.toArray(colors, colors.length);
    }
  }
  const indices: number[] = [];
  for (let ring = 0; ring < radialSegments; ring++) {
    for (let point = 0; point < loopSize; point++) {
      const next = (point + 1) % loopSize;
      const innerPoint = ring * loopSize + point;
      const innerNext = ring * loopSize + next;
      const outerPoint = (ring + 1) * loopSize + point;
      const outerNext = (ring + 1) * loopSize + next;
      indices.push(innerPoint, innerNext, outerPoint, innerNext, outerNext, outerPoint);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  addSurfaceAttributes(geometry, colors);
  return geometry;
}

export function createOvalRimCurtainGeometry(config: OvalBowlConfig): THREE.BufferGeometry {
  const loop = createCapsuleLoop(config.outerRadius, config.straightHalfLength);
  const vertices: number[] = [];
  const indices: number[] = [];
  for (const point of loop) {
    vertices.push(point.x, sampleOvalBowl(config, point.x, point.y).height, point.y);
    vertices.push(point.x, -2.4, point.y);
  }
  for (let point = 0; point < loop.length; point++) {
    const next = (point + 1) % loop.length;
    const top = point * 2, bottom = top + 1, nextTop = next * 2, nextBottom = nextTop + 1;
    indices.push(top, bottom, nextTop, nextTop, bottom, nextBottom);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}


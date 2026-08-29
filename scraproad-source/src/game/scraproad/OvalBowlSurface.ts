import * as THREE from "three";

export type OvalBowlConfig = {
  straightHalfLength: number;
  flatRadius: number;
  outerRadius: number;
  wallRise: number;
  guardHeight: number;
};

export type OvalBowlSample = {
  height: number;
  distance: number;
  progress: number;
  anchorZ: number;
  outwardX: number;
  outwardZ: number;
  normal: THREE.Vector3;
  band: "floor" | "transition" | "bank" | "upper-bank";
};

const subtleFloorHeight = (x: number, z: number): number =>
  Math.sin(x * .075) * Math.cos(z * .058) * .035;

const smoothProfile = (value: number): number => value * value * (3 - 2 * value);
const smoothProfileSlope = (value: number): number => 6 * value * (1 - value);

function sampleBankProfile(progress: number, wallWidth: number, wallRise: number): { height: number; slope: number; band: OvalBowlSample["band"] } {
  if (progress <= 0) return { height: 0, slope: 0, band: "floor" };
  if (progress < .28) {
    const local = progress / .28;
    return {
      height: wallRise * .14 * smoothProfile(local),
      slope: wallRise * .14 * smoothProfileSlope(local) / (.28 * wallWidth),
      band: "transition",
    };
  }
  if (progress < .78) {
    const local = (progress - .28) / .5;
    return {
      height: wallRise * (.14 + .66 * smoothProfile(local)),
      slope: wallRise * .66 * smoothProfileSlope(local) / (.5 * wallWidth),
      band: "bank",
    };
  }
  const local = (progress - .78) / .22;
  return {
    height: wallRise * (.8 + .2 * smoothProfile(local)),
    slope: wallRise * .2 * smoothProfileSlope(local) / (.22 * wallWidth),
    band: "upper-bank",
  };
}

export function sampleOvalBowl(config: OvalBowlConfig, x: number, z: number): OvalBowlSample {
  const anchorZ = THREE.MathUtils.clamp(z, -config.straightHalfLength, config.straightHalfLength);
  const dx = x;
  const dz = z - anchorZ;
  const distance = Math.hypot(dx, dz);
  const outwardX = distance > .0001 ? dx / distance : 1;
  const outwardZ = distance > .0001 ? dz / distance : 0;
  const wallWidth = config.outerRadius - config.flatRadius;
  const progress = THREE.MathUtils.clamp((distance - config.flatRadius) / wallWidth, 0, 1);
  const profile = sampleBankProfile(progress, wallWidth, config.wallRise);
  const floorFade = 1 - THREE.MathUtils.smoothstep(distance, config.flatRadius - 8, config.flatRadius);
  const height = subtleFloorHeight(x, z) * floorFade + profile.height;
  const slope = profile.slope;
  const normal = new THREE.Vector3(-outwardX * slope, 1, -outwardZ * slope).normalize();
  return { height, distance, progress, anchorZ, outwardX, outwardZ, normal, band: profile.band };
}

export type OvalBoundaryResolution = {
  x: number;
  z: number;
  collided: boolean;
  normalX: number;
  normalZ: number;
  penetration: number;
};

/** Resolves a three-disc vehicle capsule against the continuous stadium guard. */
export function resolveOvalBoundary(
  config: OvalBowlConfig,
  x: number,
  z: number,
  heading: number,
  halfLength: number,
  radius: number,
): OvalBoundaryResolution {
  let resolvedX = x, resolvedZ = z, collided = false, normalX = 0, normalZ = 0, penetration = 0;
  const limit = config.outerRadius - radius - .12;
  for (let iteration = 0; iteration < 3; iteration++) {
    let deepest = 0, deepestNormalX = 0, deepestNormalZ = 0;
    for (const offset of [-halfLength, 0, halfLength]) {
      const sampleX = resolvedX + Math.sin(heading) * offset;
      const sampleZ = resolvedZ + Math.cos(heading) * offset;
      const sample = sampleOvalBowl(config, sampleX, sampleZ);
      const overlap = sample.distance - limit;
      if (overlap <= deepest) continue;
      deepest = overlap;
      deepestNormalX = sample.outwardX;
      deepestNormalZ = sample.outwardZ;
    }
    if (deepest <= 0) break;
    resolvedX -= deepestNormalX * (deepest + .015);
    resolvedZ -= deepestNormalZ * (deepest + .015);
    collided = true;
    normalX = deepestNormalX;
    normalZ = deepestNormalZ;
    penetration = Math.max(penetration, deepest);
  }
  return { x: resolvedX, z: resolvedZ, collided, normalX, normalZ, penetration };
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
  const positions = geometry.getAttribute("position");
  const uvs = new Float32Array(positions.count * 2);
  for (let index = 0; index < positions.count; index++) {
    uvs[index * 2] = positions.getX(index) / 7.5;
    uvs[index * 2 + 1] = positions.getZ(index) / 7.5;
  }
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
}

export function createOvalFloorGeometry(config: OvalBowlConfig): THREE.BufferGeometry {
  const contour = createCapsuleLoop(config.flatRadius, config.straightHalfLength);
  const vertices: number[] = [];
  const colors: number[] = [];
  const low = new THREE.Color(0xbda98f), high = new THREE.Color(0xe1c5a1), color = new THREE.Color();
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
  const inner = new THREE.Color(0xc2c5c0), outer = new THREE.Color(0x767b78), rust = new THREE.Color(0xb76a42), color = new THREE.Color();
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
  const uvs: number[] = [];
  const indices: number[] = [];
  const distances = [0];
  for (let point = 1; point <= loop.length; point++) distances.push(distances[point - 1] + loop[(point - 1) % loop.length].distanceTo(loop[point % loop.length]));
  for (let index = 0; index < loop.length; index++) {
    const point = loop[index];
    const bankTop = sampleOvalBowl(config, point.x, point.y).height;
    vertices.push(point.x, bankTop - .08, point.y);
    vertices.push(point.x, bankTop + config.guardHeight, point.y);
    const u = distances[index] / 7.5;
    uvs.push(u, 0, u, config.guardHeight / 7.5);
  }
  for (let point = 0; point < loop.length; point++) {
    const next = (point + 1) % loop.length;
    const top = point * 2, bottom = top + 1, nextTop = next * 2, nextBottom = nextTop + 1;
    indices.push(top, bottom, nextTop, nextTop, bottom, nextBottom);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

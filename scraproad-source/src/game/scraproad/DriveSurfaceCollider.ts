import * as THREE from "three";

export type HeightfieldCollider<TMetadata> = {
  label: string;
  center: THREE.Vector2;
  rotation: number;
  width: number;
  length: number;
  columns: number;
  rows: number;
  heights: Float32Array;
  valid: Uint8Array;
  metadata: TMetadata;
};

type HeightfieldOptions<TMetadata> = {
  label: string;
  centerX: number;
  centerZ: number;
  rotation: number;
  width: number;
  length: number;
  metadata: TMetadata;
  sampleSpacing?: number;
};

const down = new THREE.Vector3(0, -1, 0);

export function buildHeightfieldCollider<TMetadata>(
  object: THREE.Object3D,
  options: HeightfieldOptions<TMetadata>,
): HeightfieldCollider<TMetadata> {
  object.updateWorldMatrix(true, true);
  const bounds = new THREE.Box3().setFromObject(object);
  const spacing = options.sampleSpacing ?? 1.15;
  const columns = THREE.MathUtils.clamp(Math.ceil(options.width / spacing) + 1, 3, 49);
  const rows = THREE.MathUtils.clamp(Math.ceil(options.length / spacing) + 1, 3, 49);
  const heights = new Float32Array(columns * rows);
  const valid = new Uint8Array(columns * rows);
  const raycaster = new THREE.Raycaster();
  const cosine = Math.cos(options.rotation), sine = Math.sin(options.rotation);
  const rayTop = bounds.max.y + 2;
  const rayFar = Math.max(8, bounds.max.y - bounds.min.y + 4);
  const safeWidth = options.width * .995, safeLength = options.length * .995;

  for (let row = 0; row < rows; row++) {
    const localZ = -safeLength * .5 + row / (rows - 1) * safeLength;
    for (let column = 0; column < columns; column++) {
      const localX = -safeWidth * .5 + column / (columns - 1) * safeWidth;
      const worldX = options.centerX + localX * cosine + localZ * sine;
      const worldZ = options.centerZ - localX * sine + localZ * cosine;
      raycaster.set(new THREE.Vector3(worldX, rayTop, worldZ), down);
      raycaster.far = rayFar;
      const hit = raycaster.intersectObject(object, true)[0];
      const index = row * columns + column;
      if (!hit) continue;
      heights[index] = hit.point.y;
      valid[index] = 1;
    }
  }

  return {
    label: options.label,
    center: new THREE.Vector2(options.centerX, options.centerZ),
    rotation: options.rotation,
    width: options.width,
    length: options.length,
    columns,
    rows,
    heights,
    valid,
    metadata: options.metadata,
  };
}

export function sampleHeightfield<TMetadata>(collider: HeightfieldCollider<TMetadata>, x: number, z: number): number | null {
  const dx = x - collider.center.x, dz = z - collider.center.y;
  const cosine = Math.cos(collider.rotation), sine = Math.sin(collider.rotation);
  const localX = dx * cosine - dz * sine;
  const localZ = dx * sine + dz * cosine;
  const u = localX / collider.width + .5, v = localZ / collider.length + .5;
  if (u < 0 || u > 1 || v < 0 || v > 1) return null;

  const gridX = u * (collider.columns - 1), gridZ = v * (collider.rows - 1);
  const x0 = Math.min(Math.floor(gridX), collider.columns - 2);
  const z0 = Math.min(Math.floor(gridZ), collider.rows - 2);
  const tx = gridX - x0, tz = gridZ - z0;
  const samples = [
    [z0 * collider.columns + x0, (1 - tx) * (1 - tz)],
    [z0 * collider.columns + x0 + 1, tx * (1 - tz)],
    [(z0 + 1) * collider.columns + x0, (1 - tx) * tz],
    [(z0 + 1) * collider.columns + x0 + 1, tx * tz],
  ] as const;
  let height = 0, weight = 0;
  for (const [index, sampleWeight] of samples) {
    if (!collider.valid[index]) continue;
    height += collider.heights[index] * sampleWeight;
    weight += sampleWeight;
  }
  return weight > .24 ? height / weight : null;
}

export function createHeightfieldDebug<TMetadata>(collider: HeightfieldCollider<TMetadata>, color: number): THREE.LineSegments {
  const positions: number[] = [];
  const cosine = Math.cos(collider.rotation), sine = Math.sin(collider.rotation);
  const point = (column: number, row: number): [number, number, number] => {
    const localX = -collider.width * .5 + column / (collider.columns - 1) * collider.width;
    const localZ = -collider.length * .5 + row / (collider.rows - 1) * collider.length;
    const worldX = collider.center.x + localX * cosine + localZ * sine;
    const worldZ = collider.center.y - localX * sine + localZ * cosine;
    return [worldX, collider.heights[row * collider.columns + column] + .055, worldZ];
  };
  const segment = (aColumn: number, aRow: number, bColumn: number, bRow: number): void => {
    const aIndex = aRow * collider.columns + aColumn, bIndex = bRow * collider.columns + bColumn;
    if (!collider.valid[aIndex] || !collider.valid[bIndex]) return;
    positions.push(...point(aColumn, aRow), ...point(bColumn, bRow));
  };
  for (let row = 0; row < collider.rows; row++) {
    for (let column = 0; column < collider.columns; column++) {
      if (column + 1 < collider.columns) segment(column, row, column + 1, row);
      if (row + 1 < collider.rows) segment(column, row, column, row + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: .9, depthTest: false });
  const debug = new THREE.LineSegments(geometry, material);
  debug.name = `heightfield-debug-${collider.label}`;
  debug.renderOrder = 20;
  debug.visible = false;
  return debug;
}

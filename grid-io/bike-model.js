import * as THREE from "./vendor/three.module.min.js";
import { mergeGeometries } from "./vendor/utils/BufferGeometryUtils.js";
import { COLORS } from "./simulation.mjs?v=red-1";
import { normalizeLoadout, loadoutKey } from "./customization.mjs?v=red-1";

const templates = new Map();
const unitBox = new THREE.BoxGeometry(1, 1, 1);
const metal = (color, roughness = 0.34, metalness = 0.6) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness });
const materials = {
  dark: metal(0x131315),
  frame: metal(0x494447, 0.25, 0.85),
  alloy: metal(0x9a9695, 0.24, 0.8),
  pearl: metal(0x292629, 0.22, 0.65),
  rubber: metal(0x0c0c0d, 0.88, 0.03),
  suit: metal(0x171619, 0.75, 0.08),
  glass: metal(0x170d11, 0.14, 0.7),
};
const palettes = COLORS.map((color) => ({
  ...materials,
  light: new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 1.1,
    roughness: 0.25,
    metalness: 0.2,
  }),
  paint: metal(new THREE.Color(color).multiplyScalar(0.38), 0.3, 0.55),
}));

function add(group, geometry, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  group.add(mesh);
  return mesh;
}
function box(group, material, x, y, z, sx, sy, sz) {
  const mesh = add(group, unitBox, material, x, y, z);
  mesh.scale.set(sx, sy, sz);
  return mesh;
}
function ellipsoid(group, material, x, y, z, sx, sy, sz) {
  const mesh = add(
    group,
    new THREE.SphereGeometry(1, 20, 12),
    material,
    x,
    y,
    z,
  );
  mesh.scale.set(sx, sy, sz);
  return mesh;
}
function link(group, material, a, b, radius = 0.12, sides = 10) {
  const start = new THREE.Vector3(...a),
    end = new THREE.Vector3(...b),
    direction = end.clone().sub(start);
  const mesh = add(
    group,
    new THREE.CylinderGeometry(radius, radius, direction.length(), sides),
    material,
  );
  mesh.position.copy(start.add(end).multiplyScalar(0.5));
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize(),
  );
  return mesh;
}
function fairing(group, material, outline, y, thickness = 0.4, bevel = 0.13) {
  const shape = new THREE.Shape();
  outline.forEach(([x, z], i) => (i ? shape.lineTo(x, z) : shape.moveTo(x, z)));
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 3,
    steps: 1,
  });
  geometry.rotateX(-Math.PI / 2);
  return add(group, geometry, material, 0, y, 0);
}
function cylinder(group, material, x, y, z, radius, depth, sides = 24) {
  const geometry = new THREE.CylinderGeometry(radius, radius, depth, sides);
  geometry.rotateX(Math.PI / 2);
  return add(group, geometry, material, x, y, z);
}
function ring(group, material, radius, tube, z = 0, segments = 40) {
  return add(
    group,
    new THREE.TorusGeometry(radius, tube, 8, segments),
    material,
    0,
    0,
    z,
  );
}

// Merge static subassemblies by material. Parts stay independently swappable;
// gameplay reuses these exact meshes without hundreds of small draw calls.
function bake(group) {
  group.updateMatrixWorld(true);
  const batches = new Map();
  for (const child of [...group.children]) {
    const geometry = child.geometry.clone().applyMatrix4(child.matrix);
    const plain = geometry.index ? geometry.toNonIndexed() : geometry;
    if (geometry !== plain) geometry.dispose();
    if (!batches.has(child.material)) batches.set(child.material, []);
    batches.get(child.material).push(plain);
    if (child.geometry !== unitBox) child.geometry.dispose();
    group.remove(child);
  }
  for (const [material, geometries] of batches) {
    const combined = mergeGeometries(geometries);
    geometries.forEach((g) => g.dispose());
    const mesh = add(group, combined, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
  return group;
}

function makeBody(id, m) {
  const g = new THREE.Group();
  g.name = "body";
  g.userData.part = id;
  // Shared hard points align every body with every wheel and rider.
  box(g, m.dark, -0.2, 1.3, 0, 5.8, 0.5, 0.8);
  for (const z of [-0.56, 0.56]) {
    link(g, m.frame, [-1.25, 1.6, z], [-2.75, 1.35, z], 0.12);
    link(g, m.frame, [1.4, 2.65, z], [2.65, 1.35, z], 0.12);
  }
  if (id === "phantom") {
    fairing(
      g,
      m.pearl,
      [
        [-2.5, -0.8],
        [0.9, -1.07],
        [2.7, -0.73],
        [3.55, -0.32],
        [3.8, 0],
        [3.55, 0.32],
        [2.7, 0.73],
        [0.9, 1.07],
        [-2.5, 0.8],
      ],
      1.8,
      0.46,
    );
    for (const side of [-1, 1]) {
      const z = side * 0.87;
      const wing = fairing(
        g,
        m.paint,
        [
          [-2.7, -0.42],
          [-0.5, -0.42],
          [1.6, 0],
          [-0.5, 0.42],
          [-2.7, 0.42],
        ],
        1.42,
        0.33,
      );
      wing.position.z = z;
      link(g, m.light, [-2.4, 1.94, z], [2.35, 1.94, z * 0.76], 0.065);
      const intake = box(g, m.dark, 0.85, 1.58, side * 1.06, 1, 0.36, 0.18);
      intake.rotation.z = -0.12;
      for (let i = 0; i < 3; i++)
        box(g, m.alloy, 0.58 + i * 0.2, 1.58, side * 1.16, 0.045, 0.22, 0.03);
    }
    ellipsoid(g, m.glass, 1.58, 2.52, 0, 1.22, 0.64, 0.63);
    fairing(
      g,
      m.pearl,
      [
        [-3.35, -0.65],
        [-1.55, -0.8],
        [-1.4, 0.8],
        [-3.35, 0.65],
      ],
      2.38,
      0.2,
    );
  } else if (id === "vector") {
    for (const side of [-1, 1]) {
      const z = side * 0.65;
      link(g, m.paint, [-2.5, 1.4, z], [0.7, 2.1, z], 0.16);
      link(g, m.paint, [0.7, 2.1, z], [1.5, 1.3, z], 0.16);
      link(g, m.paint, [1.5, 1.3, z], [-1.9, 1.3, z], 0.16);
      link(g, m.frame, [-1.9, 1.3, z], [-0.75, 2.55, z], 0.1);
      link(g, m.frame, [-0.75, 2.55, z], [0.7, 2.1, z], 0.1);
      cylinder(g, m.dark, -0.5, 1.75, z, 0.55, 0.25, 16);
      cylinder(g, m.alloy, -0.5, 1.75, z + side * 0.15, 0.31, 0.05, 12);
      link(
        g,
        m.light,
        [-1.8, 1.36, z + side * 0.05],
        [1.12, 1.36, z + side * 0.05],
        0.055,
      );
    }
    ellipsoid(g, m.pearl, 0.4, 2.3, 0, 1.1, 0.59, 0.73);
    box(g, m.light, 0.4, 2.85, 0, 1.3, 0.045, 0.13);
    fairing(
      g,
      m.pearl,
      [
        [-3.1, -0.58],
        [-1.1, -0.55],
        [-1.1, 0.55],
        [-3.1, 0.58],
      ],
      2.05,
      0.18,
    );
    // A round instrument/headlight pod distinguishes the naked racer.
    const head = add(
      g,
      new THREE.CylinderGeometry(0.46, 0.46, 0.5, 20),
      m.dark,
      2.3,
      2.15,
      0,
    );
    head.rotation.z = Math.PI / 2;
    const lamp = add(
      g,
      new THREE.CylinderGeometry(0.32, 0.32, 0.035, 20),
      m.light,
      2.57,
      2.15,
      0,
    );
    lamp.rotation.z = Math.PI / 2;
    link(g, m.frame, [1.4, 2.65, -0.96], [1.4, 2.65, 0.96], 0.1);
  } else {
    fairing(
      g,
      m.dark,
      [
        [-3.4, -1.14],
        [1.8, -1.36],
        [3.7, -0.7],
        [3.7, 0.7],
        [1.8, 1.36],
        [-3.4, 1.14],
      ],
      1.58,
      0.64,
      0.16,
    );
    for (const side of [-1, 1]) {
      const z = side * 1.14;
      const panel = fairing(
        g,
        m.pearl,
        [
          [-2.9, -0.4],
          [1.7, -0.4],
          [2.65, 0],
          [1.7, 0.4],
          [-2.9, 0.4],
        ],
        2.16,
        0.38,
      );
      panel.position.z = z;
      link(g, m.light, [-2.6, 2.57, z], [1.9, 2.57, z], 0.08);
      for (let i = 0; i < 4; i++)
        box(g, m.frame, -2.2 + i * 0.35, 2.66, z, 0.12, 0.08, 0.5);
      box(g, m.dark, -3.15, 1.87, z, 0.6, 0.8, 0.65);
      box(g, m.light, -3.49, 1.87, z, 0.045, 0.3, 0.43);
    }
    fairing(
      g,
      m.paint,
      [
        [0.55, -0.75],
        [2.7, -0.55],
        [3.65, 0],
        [2.7, 0.55],
        [0.55, 0.75],
      ],
      2.44,
      0.4,
    );
    box(g, m.glass, 1.45, 2.98, 0, 1.55, 0.27, 0.9).rotation.z = -0.16;
    box(g, m.light, 3.62, 2.0, 0, 0.12, 0.15, 1.0);
  }
  const seat = box(g, m.rubber, -1.13, 2.52, 0, 1.9, 0.26, 0.92);
  seat.rotation.z = 0.08;
  link(g, m.frame, [1.05, 2.82, -0.87], [1.05, 2.82, 0.87], 0.09);
  for (const side of [-1, 1])
    box(g, m.rubber, 1.05, 2.82, side * 0.91, 0.3, 0.17, 0.35);
  box(g, m.light, -3.1, 1.5, 0, 0.18, 0.28, 0.45);
  return bake(g);
}

function makeWheel(id, m) {
  const g = new THREE.Group();
  g.userData.part = id;
  if (id === "turbine") {
    ring(g, m.rubber, 1.02, 0.32, 0, 40);
    cylinder(g, m.dark, 0, 0, 0, 0.99, 0.56);
    for (const side of [-1, 1]) {
      cylinder(g, m.alloy, 0, 0, side * 0.3, 0.9, 0.055, 32);
      ring(g, m.light, 0.84, 0.045, side * 0.35);
      for (let i = 0; i < 10; i++) {
        const a = (i * Math.PI) / 5;
        const blade = box(
          g,
          m.frame,
          Math.cos(a) * 0.52,
          Math.sin(a) * 0.52,
          side * 0.35,
          0.62,
          0.16,
          0.07,
        );
        blade.rotation.z = a + 0.5;
      }
      cylinder(g, m.dark, 0, 0, side * 0.4, 0.31, 0.13);
      cylinder(g, m.light, 0, 0, side * 0.48, 0.17, 0.045);
    }
  } else if (id === "spoke") {
    ring(g, m.rubber, 1.04, 0.3, 0, 40);
    cylinder(g, m.dark, 0, 0, 0, 0.26, 0.65);
    for (const side of [-1, 1]) {
      ring(g, m.alloy, 0.9, 0.065, side * 0.22);
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        link(
          g,
          m.alloy,
          [Math.cos(a) * 0.22, Math.sin(a) * 0.22, side * 0.21],
          [Math.cos(a + 0.2) * 0.89, Math.sin(a + 0.2) * 0.89, side * 0.21],
          0.068,
          8,
        );
      }
      cylinder(g, m.light, 0, 0, side * 0.35, 0.21, 0.08);
      ring(g, m.light, 0.94, 0.025, side * 0.23);
    }
  } else {
    cylinder(g, m.rubber, 0, 0, 0, 1.19, 0.92, 12);
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      const tread = box(
        g,
        m.dark,
        Math.cos(a) * 1.2,
        Math.sin(a) * 1.2,
        0,
        0.28,
        0.51,
        1.01,
      );
      tread.rotation.z = a;
    }
    cylinder(g, m.frame, 0, 0, 0, 0.79, 0.95, 12);
    for (const side of [-1, 1]) {
      cylinder(g, m.dark, 0, 0, side * 0.5, 0.61, 0.09, 6);
      ring(g, m.light, 0.57, 0.05, side * 0.56, 6);
      cylinder(g, m.alloy, 0, 0, side * 0.57, 0.27, 0.07, 6);
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        cylinder(
          g,
          m.pearl,
          Math.cos(a) * 0.68,
          Math.sin(a) * 0.68,
          side * 0.51,
          0.065,
          0.07,
          6,
        );
      }
    }
  }
  return bake(g);
}

function makeRider(id, m) {
  const g = new THREE.Group();
  g.name = "rider";
  g.userData.part = id;
  const female = id === "female",
    shoulder = female ? 0.53 : 0.66,
    waist = female ? 0.36 : 0.46,
    hips = female ? 0.54 : 0.51;
  // Both riders are adults in full protective suits. The meshes have distinct
  // torso proportions and armor cuts, with the same seating and grip points.
  const torso = add(
    g,
    new THREE.CylinderGeometry(shoulder, waist, 1.15, 10),
    m.suit,
    -0.38,
    3.34,
    0,
  );
  torso.rotation.z = -0.57;
  torso.scale.z = 1.18;
  ellipsoid(g, m.suit, -1.02, 2.77, 0, 0.55, 0.36, hips);
  const chest = ellipsoid(
    g,
    m.pearl,
    -0.07,
    3.39,
    0,
    0.32,
    0.51,
    shoulder * 0.88,
  );
  chest.rotation.z = -0.57;
  link(g, m.light, [-0.18, 3.72, 0], [0.23, 3.21, 0], 0.045);
  for (const side of [-1, 1]) {
    const s = side * shoulder;
    ellipsoid(g, m.pearl, -0.52, 3.73, s, 0.28, 0.23, 0.27);
    link(
      g,
      m.suit,
      [-0.38, 3.65, s],
      [0.25, 3.04, side * 0.83],
      female ? 0.16 : 0.19,
    );
    link(g, m.suit, [0.25, 3.04, side * 0.83], [1.04, 2.89, side * 0.89], 0.15);
    ellipsoid(g, m.dark, 1.04, 2.89, side * 0.88, 0.22, 0.17, 0.2);
    link(
      g,
      m.suit,
      [-1.08, 2.72, side * hips],
      [-0.34, 1.94, side * 0.9],
      female ? 0.23 : 0.26,
    );
    ellipsoid(g, m.pearl, -0.34, 1.99, side * 0.95, 0.26, 0.32, 0.18);
    link(
      g,
      m.suit,
      [-0.34, 1.91, side * 0.93],
      [-1.23, 1.29, side * 0.89],
      0.19,
    );
    box(g, m.dark, -1.13, 1.23, side * 0.95, 0.83, 0.3, 0.4);
    link(
      g,
      m.light,
      [-0.54, 3.73, s + side * 0.2],
      [-0.14, 3.32, side * 0.89],
      0.035,
    );
  }
  const hx = female ? 0.17 : 0.21,
    hy = female ? 4.0 : 4.13;
  ellipsoid(
    g,
    m.pearl,
    hx,
    hy,
    0,
    0.7,
    female ? 0.6 : 0.65,
    female ? 0.53 : 0.59,
  );
  ellipsoid(
    g,
    m.glass,
    hx + 0.5,
    hy + 0.04,
    0,
    0.3,
    0.27,
    female ? 0.49 : 0.55,
  );
  link(
    g,
    m.light,
    [hx + 0.71, hy - 0.02, -0.35],
    [hx + 0.71, hy - 0.02, 0.35],
    0.035,
  );
  // Helmet vent fins and contrasting nape armor make the silhouettes readable.
  for (const z of [-0.16, 0.16])
    box(g, m.dark, hx - 0.23, hy + 0.57, z, 0.56, 0.075, 0.095);
  box(g, m.paint, hx - 0.55, hy - 0.13, 0, 0.2, 0.37, female ? 0.62 : 0.73);
  return bake(g);
}

export function createBike(skin = 0, selection = {}) {
  const loadout = normalizeLoadout(selection),
    key = loadoutKey(skin, loadout);
  if (!templates.has(key)) {
    const m = palettes[skin] || palettes[0],
      root = new THREE.Group();
    root.name = "laser-bike";
    root.userData = { loadout, skin };
    root.add(makeBody(loadout.body, m), makeRider(loadout.rider, m));
    const wheel = makeWheel(loadout.wheels, m);
    wheel.name = "wheel-front";
    wheel.position.set(2.65, 1.35, 0);
    root.add(wheel);
    const rear = wheel.clone();
    rear.name = "wheel-rear";
    rear.position.x = -2.65;
    root.add(rear);
    templates.set(key, root);
  }
  return templates.get(key).clone();
}

export function animateWheels(bike, distance) {
  for (const name of ["wheel-front", "wheel-rear"]) {
    const wheel = bike.getObjectByName(name);
    if (wheel) wheel.rotation.z -= distance / 1.35;
  }
}

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { scraproadAssetManifest } from "./assets/scraproadAssetManifest";
import "./style.css";

type VehiclePartSlot = "roof_weapon" | "front_weapon" | "tires" | "engine" | "armor";
type VehicleStats = {
  maxHealth: number;
  acceleration: number;
  maxSpeed: number;
  handling: number;
  traction: number;
  boostPower?: number;
  armor?: number;
  weaponDamage: number;
  fireRate: number;
  projectileSpeed: number;
};
type VehiclePart = {
  id: string;
  name: string;
  slot: VehiclePartSlot;
  stats: Partial<VehicleStats>;
};
type Pickup = { group: THREE.Group; part: VehiclePart | null; repair?: number; collected: boolean; label: string };
type Target = { group: THREE.Group; health: number; alive: boolean; hitFlash: number };
type Bullet = { mesh: THREE.Mesh; velocity: THREE.Vector3; life: number };
type DustParticle = { mesh: THREE.Mesh; life: number; velocity: THREE.Vector3 };
type Obstacle = { position: THREE.Vector3; radius: number; top: number; label: string };
type BoxCollider = { position: THREE.Vector3; halfWidth: number; halfLength: number; rotation: number; label: string };
type RampSurface = {
  group: THREE.Group;
  deck: THREE.Mesh;
  position: THREE.Vector3;
  rotation: number;
  width: number;
  length: number;
  baseHeight: number;
  rise: number;
};

const canvas = getElement<HTMLCanvasElement>("game");

const ui = {
  health: getElement("health-value"), healthBar: getElement("health-bar"), speed: getElement("speed-value"),
  boost: getElement("boost-value"), targets: getElement("target-value"), weapon: getElement("weapon-part"),
  tires: getElement("tires-part"), engine: getElement("engine-part"), armor: getElement("armor-part"),
  weaponState: getElement("weapon-state"), message: getElement("message"), controls: getElement("controls"),
  pause: getElement("pause"), objective: getElement("objective"), radar: getElement<HTMLCanvasElement>("radar-canvas"),
};

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
renderer.setSize(innerWidth, innerHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.18;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7d8992);
scene.fog = new THREE.FogExp2(0x89919a, 0.0057);
const skyTexture = new THREE.TextureLoader().load("./assets/cloudy-sky.png");
skyTexture.mapping = THREE.EquirectangularReflectionMapping;
skyTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = skyTexture;
scene.backgroundIntensity = .82;
scene.environment = skyTexture;
scene.environmentIntensity = .42;

const gltfLoader = new GLTFLoader();
const assetTemplates = new Map<string, Promise<THREE.Group>>();

function loadAssetTemplate(path: string): Promise<THREE.Group> {
  const cached = assetTemplates.get(path);
  if (cached) return cached;
  const pending = new Promise<THREE.Group>((resolve, reject) => {
    gltfLoader.load(path, ({ scene: imported }) => {
      imported.updateMatrixWorld(true);
      const bounds = new THREE.Box3().setFromObject(imported);
      const center = bounds.getCenter(new THREE.Vector3());
      imported.position.set(-center.x, -bounds.min.y, -center.z);
      imported.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        object.castShadow = true;
        object.receiveShadow = true;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const material of materials) {
          if (material instanceof THREE.MeshStandardMaterial) {
            material.roughness = Math.max(material.roughness, .66);
            material.metalness = Math.min(material.metalness, .35);
          }
        }
      });
      const normalized = new THREE.Group();
      normalized.add(imported);
      resolve(normalized);
    }, undefined, reject);
  });
  assetTemplates.set(path, pending);
  return pending;
}

async function instantiateAsset(path: string): Promise<THREE.Group> {
  const template = await loadAssetTemplate(path);
  const instance = template.clone(true);
  const loaded = Number(canvas.dataset.assetsLoaded ?? 0) + 1;
  canvas.dataset.assetsLoaded = String(loaded);
  return instance;
}

function noteAssetFailure(path: string, error: unknown): void {
  canvas.dataset.assetErrors = String(Number(canvas.dataset.assetErrors ?? 0) + 1);
  console.error(`[Scraproad] Failed to load licensed asset: ${path}`, error);
}

const camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 520);
camera.position.set(0, 7, -11);

const hemi = new THREE.HemisphereLight(0xdde8f2, 0x493c31, 2.75);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0cf, 3.75);
sun.position.set(-28, 42, -18);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -125; sun.shadow.camera.right = 125; sun.shadow.camera.top = 125; sun.shadow.camera.bottom = -125;
scene.add(sun);

const warm = new THREE.MeshStandardMaterial({ color: 0x9f3d22, roughness: .78, metalness: .26 });
const metal = new THREE.MeshStandardMaterial({ color: 0x272a29, roughness: .55, metalness: .76 });
const darkMetal = new THREE.MeshStandardMaterial({ color: 0x151717, roughness: .67, metalness: .72 });
const sand = new THREE.MeshStandardMaterial({ color: 0x9a6b49, roughness: 1, metalness: 0, vertexColors: true });
const rubber = new THREE.MeshStandardMaterial({ color: 0x101111, roughness: .9, metalness: .08 });
const ARENA_RADIUS = 116;
const VEHICLE_RADIUS = 1.35;
const ramps: RampSurface[] = [];
const obstacles: Obstacle[] = [];
const boxColliders: BoxCollider[] = [];
const aimSurfaces: THREE.Object3D[] = [];
const debugVisuals: THREE.Object3D[] = [];
let debugPhysics = false;

function getGroundHeight(x: number, z: number): number {
  const northHill = 3.4 * Math.exp(-((x - 42) ** 2 + (z - 50) ** 2) / 520);
  const westRise = 2.5 * Math.exp(-((x + 64) ** 2 + (z - 8) ** 2) / 430);
  const southBump = 2.1 * Math.exp(-((x - 24) ** 2 + (z + 65) ** 2) / 340);
  const texture = Math.sin(x * .105) * Math.cos(z * .09) * .18 + Math.sin((x + z) * .055) * .14;
  return northHill + westRise + southBump + texture;
}

function addArena(): void {
  const geometry = new THREE.PlaneGeometry(250, 250, 100, 100);
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index++) {
    positions.setY(index, getGroundHeight(positions.getX(index), positions.getZ(index)));
  }
  const groundColors = new Float32Array(positions.count * 3);
  const low = new THREE.Color(0x74513b), high = new THREE.Color(0xb07a50), color = new THREE.Color();
  for (let index = 0; index < positions.count; index++) {
    const x = positions.getX(index), z = positions.getZ(index);
    const variation = THREE.MathUtils.clamp(.42 + getGroundHeight(x, z) * .08 + Math.sin(x * .31 + z * .17) * .11, 0, 1);
    color.copy(low).lerp(high, variation);
    color.toArray(groundColors, index * 3);
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(groundColors, 3));
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  const ground = new THREE.Mesh(geometry, sand);
  ground.receiveShadow = true;
  ground.name = "arena-ground-aim-surface";
  scene.add(ground); aimSurfaces.push(ground);

  const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x50392b, roughness: 1, transparent: true, opacity: .84 });
  for (let segment = 0; segment < 40; segment++) {
    const angle = segment / 40 * Math.PI * 2;
    const next = (segment + 1) / 40 * Math.PI * 2;
    const x = Math.sin(angle) * 82;
    const z = Math.cos(angle) * 69;
    const nx = Math.sin(next) * 82;
    const nz = Math.cos(next) * 69;
    const strip = new THREE.Mesh(new THREE.BoxGeometry(11, .055, Math.hypot(nx - x, nz - z) + .8), trackMaterial);
    strip.position.set((x + nx) / 2, getGroundHeight((x + nx) / 2, (z + nz) / 2) + .05, (z + nz) / 2);
    strip.rotation.y = Math.atan2(nx - x, nz - z);
    strip.receiveShadow = true;
    scene.add(strip);
  }

  const arenaRing = new THREE.Mesh(new THREE.RingGeometry(ARENA_RADIUS - 1, ARENA_RADIUS, 96), new THREE.MeshBasicMaterial({ color: 0x5a2c20, side: THREE.DoubleSide }));
  arenaRing.rotateX(-Math.PI / 2);
  arenaRing.position.y = .12;
  scene.add(arenaRing);

  addRamp(-20, -5, Math.PI * .43);
  addRamp(58, -28, -Math.PI * .7);
  addRamp(-66, 43, Math.PI * .12);
  addRamp(26, 62, Math.PI * .92);
  addRamp(-53, -61, -Math.PI * .34);
  addScrapGate(0, 84, 0);
  addScrapGate(0, -84, Math.PI);

  addBarrier(-35, 30, .2, 16);
  addBarrier(45, 24, -.75, 19);
  addBarrier(-43, -28, .72, 18);
  addBarrier(35, -57, -.2, 15);
  for (let segment = 0; segment < 24; segment++) {
    const angle = segment / 24 * Math.PI * 2;
    addBarrier(Math.sin(angle) * (ARENA_RADIUS - 2), Math.cos(angle) * (ARENA_RADIUS - 2), angle, 12, true);
  }
}

function addRamp(x: number, z: number, rotation: number): void {
  const width = 8.5, length = 14, rise = 3.8;
  const slope = Math.asin(rise / length);
  const baseHeight = getGroundHeight(x - Math.sin(rotation) * length * .5, z - Math.cos(rotation) * length * .5);
  const ramp = new THREE.Group();
  const collisionMaterial = new THREE.MeshStandardMaterial({ color: 0x3c3029, roughness: .9, metalness: .18, transparent: true, opacity: .18, depthWrite: false });
  const deck = new THREE.Mesh(new THREE.BoxGeometry(width, .5, length), collisionMaterial);
  deck.rotation.x = -slope;
  deck.position.y = rise * .5 + .01;
  deck.name = "ramp-collider-surface";
  deck.castShadow = deck.receiveShadow = true;
  ramp.add(deck);
  for (const side of [-width * .46, width * .46]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(.2, .72, length + .2), warm);
    rail.position.set(side, rise * .5 + .42, 0); rail.rotation.x = -slope; rail.castShadow = true; ramp.add(rail);
  }
  ramp.position.set(x, baseHeight, z); ramp.rotation.y = rotation; scene.add(ramp);
  instantiateAsset(scraproadAssetManifest.arena.ramp).then(asset => {
    asset.name = "kenney-racing-kit-ramp";
    asset.scale.set(width / .55, rise / .33, length / .73);
    asset.rotation.y = Math.PI;
    ramp.add(asset);
  }).catch(error => noteAssetFailure(scraproadAssetManifest.arena.ramp, error));
  const surface: RampSurface = { group: ramp, deck, position: new THREE.Vector3(x, baseHeight, z), rotation, width, length, baseHeight, rise };
  ramps.push(surface); aimSurfaces.push(deck);
  const helper = new THREE.BoxHelper(deck, 0x5dff8a); helper.visible = false; scene.add(helper); debugVisuals.push(helper);
}

function addScrapGate(x: number, z: number, rotation: number): void {
  const gate = new THREE.Group();
  for (const side of [-6, 6]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(.7, 5.5, .7), darkMetal);
    post.position.set(side, 2.75, 0); post.rotation.z = side > 0 ? -.07 : .07; post.castShadow = true; gate.add(post);
  }
  const top = new THREE.Mesh(new THREE.BoxGeometry(13, .75, .75), metal);
  top.position.y = 5.2; top.rotation.z = .02; top.castShadow = true; gate.add(top);
  const sign = new THREE.Mesh(new THREE.BoxGeometry(5.5, 1.45, .2), warm);
  sign.position.set(0, 4.6, -.5); gate.add(sign);
  gate.position.set(x, getGroundHeight(x, z), z); gate.rotation.y = rotation; scene.add(gate);
  for (const side of [-6, 6]) {
    const offset = new THREE.Vector3(side, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation);
    obstacles.push({ position: new THREE.Vector3(x + offset.x, 0, z + offset.z), radius: .85, top: getGroundHeight(x + offset.x, z + offset.z) + 5.5, label: "gate post" });
  }
}

function addBarrier(x: number, z: number, rotation: number, length: number, boundary = false): void {
  const material = new THREE.MeshStandardMaterial({ color: boundary ? 0x633829 : 0x6e4a35, roughness: .88, metalness: .22 });
  const barrier = new THREE.Mesh(new THREE.BoxGeometry(length, 1.35, .8), material);
  barrier.position.set(x, getGroundHeight(x, z) + .68, z); barrier.rotation.y = rotation; barrier.castShadow = barrier.receiveShadow = true;
  barrier.material.transparent = true; barrier.material.opacity = .12; barrier.material.depthWrite = false; scene.add(barrier);
  instantiateAsset(scraproadAssetManifest.arena.barrier).then(asset => {
    asset.name = "kenney-racing-kit-barrier";
    asset.scale.set(length, 1.35 / .1312, .8 / .123);
    asset.position.set(x, getGroundHeight(x, z), z);
    asset.rotation.y = rotation;
    scene.add(asset);
  }).catch(error => noteAssetFailure(scraproadAssetManifest.arena.barrier, error));
  boxColliders.push({ position: new THREE.Vector3(x, 0, z), halfWidth: length * .5, halfLength: .4, rotation, label: boundary ? "arena wall" : "scrap barrier" });
  const helper = new THREE.BoxHelper(barrier, 0xffb347); helper.visible = false; scene.add(helper); debugVisuals.push(helper);
}

function addWorldProps(): void {
  const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x5d5044, roughness: 1 });
  const placements = [[-88,-36,3.4],[-91,28,3.8],[86,-57,3.2],[92,19,4.2],[62,75,3],[-49,82,3.6],[15,34,2.2],[-18,-67,2.7],[51,-5,2.8],[-70,-78,3.2],[77,52,2.5]];
  placements.forEach(([x,z,size], index) => {
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(size, 0), rockMaterial);
    rock.scale.y = .65 + (index % 3) * .12; rock.rotation.set(index*.7, index*.4, index*.2);
    rock.position.set(x, getGroundHeight(x,z) + size*.5, z); rock.castShadow = rock.receiveShadow = true;
    const ground = getGroundHeight(x, z);
    const top = ground + size * .5 + size * rock.scale.y;
    scene.add(rock); obstacles.push({ position: new THREE.Vector3(x,0,z), radius: size*.78, top, label: "rock" });
  });
  const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x8e3b22, roughness: .72, metalness: .45 });
  [[-37,22],[68,31],[-74,-17],[28,78],[76,-11]].forEach(([x,z]) => {
    for (let i=0;i<3;i++) {
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,1.35,12), barrelMaterial);
      barrel.position.set(x+i*.9, getGroundHeight(x+i*.9,z)+.68, z+(i%2)*.65); barrel.castShadow=true; scene.add(barrel);
      for (const rimY of [-.52, .52]) {
        const rim = new THREE.Mesh(new THREE.TorusGeometry(.49, .055, 6, 12), darkMetal);
        rim.rotation.x = Math.PI / 2; rim.position.copy(barrel.position); rim.position.y += rimY; rim.castShadow = true; scene.add(rim);
      }
      obstacles.push({ position:new THREE.Vector3(x+i*.9,0,z+(i%2)*.65), radius:.55, top:getGroundHeight(x+i*.9,z+(i%2)*.65)+1.35, label: "barrel" });
    }
  });
  for (let i=0;i<32;i++) {
    const angle = i/32*Math.PI*2;
    const x = Math.sin(angle)*(104+(i%2)*2), z = Math.cos(angle)*(102+(i%3));
    instantiateAsset(scraproadAssetManifest.props.tire).then(tire => {
      tire.name = "kenney-car-kit-debris-tire";
      tire.scale.setScalar(1.8); tire.position.set(x, getGroundHeight(x, z) + .5, z);
      tire.rotation.set(Math.PI / 2, angle, i * .5); scene.add(tire);
    }).catch(error => noteAssetFailure(scraproadAssetManifest.props.tire, error));
  }
  const crates = [[-39,20,0],[66,29,.3],[-71,-20,.7],[26,76,1.1],[74,-14,.4]];
  for (const [x,z,rotation] of crates) {
    instantiateAsset(scraproadAssetManifest.props.crate).then(crate => {
      crate.name = "kenney-car-kit-crate"; crate.scale.setScalar(1.35);
      crate.position.set(x, getGroundHeight(x,z), z); crate.rotation.y = rotation; scene.add(crate);
    }).catch(error => noteAssetFailure(scraproadAssetManifest.props.crate, error));
  }
  const pylons = [[-25,-8],[ -15,-1],[54,-34],[62,-23],[-70,38],[-62,48],[22,57],[31,67],[-58,-66],[-49,-57]];
  for (const [x,z] of pylons) {
    instantiateAsset(scraproadAssetManifest.arena.pylon).then(pylon => {
      pylon.name = "kenney-racing-kit-pylon"; pylon.scale.setScalar(6.2);
      pylon.position.set(x, getGroundHeight(x,z), z); pylon.rotation.y = (x + z) * .1; scene.add(pylon);
    }).catch(error => noteAssetFailure(scraproadAssetManifest.arena.pylon, error));
  }
  for (const [x,z,rotation] of [[-12,38,.4],[55,8,-.7],[-61,-42,1.1]] as const) {
    instantiateAsset(scraproadAssetManifest.props.bumper).then(debris => {
      debris.name = "kenney-car-kit-scrap-bumper"; debris.scale.setScalar(1.5);
      debris.position.set(x, getGroundHeight(x,z), z); debris.rotation.set(.1,rotation,.15); scene.add(debris);
    }).catch(error => noteAssetFailure(scraproadAssetManifest.props.bumper, error));
  }
}

function rampSample(x: number, z: number): { ramp: RampSurface; height: number; localZ: number } | null {
  for (const ramp of ramps) {
    const dx = x - ramp.position.x, dz = z - ramp.position.z;
    const localX = dx * Math.cos(ramp.rotation) - dz * Math.sin(ramp.rotation);
    const localZ = dx * Math.sin(ramp.rotation) + dz * Math.cos(ramp.rotation);
    if (Math.abs(localX) <= ramp.width * .5 && localZ >= -ramp.length * .5 && localZ <= ramp.length * .5) {
      return { ramp, height: ramp.baseHeight + (localZ / ramp.length + .5) * ramp.rise + .25, localZ };
    }
  }
  return null;
}

function getDriveHeight(x: number, z: number): number {
  return rampSample(x, z)?.height ?? getGroundHeight(x, z);
}

function resolveBoxCollision(collider: BoxCollider): boolean {
  const dx = vehicle.position.x - collider.position.x, dz = vehicle.position.z - collider.position.z;
  const cosine = Math.cos(collider.rotation), sine = Math.sin(collider.rotation);
  const localX = dx * cosine - dz * sine, localZ = dx * sine + dz * cosine;
  const closestX = THREE.MathUtils.clamp(localX, -collider.halfWidth, collider.halfWidth);
  const closestZ = THREE.MathUtils.clamp(localZ, -collider.halfLength, collider.halfLength);
  let pushX = localX - closestX, pushZ = localZ - closestZ;
  const distance = Math.hypot(pushX, pushZ);
  if (distance >= VEHICLE_RADIUS) return false;
  let correction: number;
  if (distance < .001) {
    const escapeX = collider.halfWidth + VEHICLE_RADIUS - Math.abs(localX);
    const escapeZ = collider.halfLength + VEHICLE_RADIUS - Math.abs(localZ);
    if (escapeX < escapeZ) { pushX = Math.sign(localX || 1); pushZ = 0; correction = escapeX + .02; }
    else { pushX = 0; pushZ = Math.sign(localZ || 1); correction = escapeZ + .02; }
  } else { pushX /= distance; pushZ /= distance; correction = VEHICLE_RADIUS - distance + .02; }
  const worldX = pushX * cosine + pushZ * sine, worldZ = -pushX * sine + pushZ * cosine;
  vehicle.position.x += worldX * correction; vehicle.position.z += worldZ * correction;
  return true;
}

function registerPhysicsDebug(): void {
  const material = new THREE.MeshBasicMaterial({ color: 0xff8d3a, wireframe: true, transparent: true, opacity: .65 });
  for (const obstacle of obstacles) {
    const ground = getGroundHeight(obstacle.position.x, obstacle.position.z);
    const height = Math.max(.12, obstacle.top - ground);
    const marker = new THREE.Mesh(new THREE.CylinderGeometry(obstacle.radius + VEHICLE_RADIUS, obstacle.radius + VEHICLE_RADIUS, height, 18), material);
    marker.position.set(obstacle.position.x, ground + height * .5, obstacle.position.z);
    marker.visible = false; scene.add(marker); debugVisuals.push(marker);
  }
}

const car = new THREE.Group();
const wheels: THREE.Object3D[] = [];
const frontWheelPivots: THREE.Object3D[] = [];
const turret = new THREE.Group();
const barrelPivot = new THREE.Group();
let muzzle: THREE.Object3D;

function buildCar(): void {
  const fallback = new THREE.Group();
  fallback.name = "vehicle-fallback";
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.7,.65,4.55), warm);
  chassis.position.y = 1.05; chassis.castShadow = chassis.receiveShadow = true; fallback.add(chassis);
  const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(1.18,0), darkMetal);
  cabin.scale.set(1,.66,1.05); cabin.position.set(0,1.72,-.32); cabin.castShadow=true; fallback.add(cabin);
  for (const x of [-1.45,1.45]) for (const z of [-1.45,1.45]) {
    const pivot = new THREE.Group(); pivot.position.set(x,.72,z); fallback.add(pivot);
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.57,.57,.42,14),rubber); wheel.rotation.z=Math.PI/2; wheel.castShadow=true; pivot.add(wheel); wheels.push(wheel);
    if(z>0) frontWheelPivots.push(pivot);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.45,10),metal); hub.rotation.z=Math.PI/2; wheel.add(hub);
  }
  car.add(fallback);

  canvas.dataset.vehicleAsset = "loading-kenney-suv";
  instantiateAsset(scraproadAssetManifest.vehicle.model).then(model => {
    model.name = "kenney-car-kit-suv";
    model.scale.setScalar(1.84);
    model.position.y = .06;
    const dustyTint = new THREE.Color(0xd8b08d);
    model.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      const sourceMaterials = Array.isArray(object.material) ? object.material : [object.material];
      const tintedMaterials = sourceMaterials.map(source => {
        const material = source.clone();
        if (material instanceof THREE.MeshStandardMaterial) {
          material.color.multiply(dustyTint);
          material.roughness = .78;
          material.metalness = .2;
          material.envMapIntensity = .55;
        }
        return material;
      });
      object.material = Array.isArray(object.material) ? tintedMaterials : tintedMaterials[0];
    });
    fallback.removeFromParent();
    wheels.length = 0; frontWheelPivots.length = 0;
    for (const nodeName of scraproadAssetManifest.vehicle.wheelNodes) {
      const wheel = model.getObjectByName(nodeName);
      if (!wheel) continue;
      wheels.push(wheel);
      if (nodeName.includes("front")) frontWheelPivots.push(wheel);
    }
    car.add(model);
    canvas.dataset.vehicleAsset = "kenney-car-kit-suv";
    canvas.dataset.vehicleWheels = String(wheels.length);
  }).catch(error => {
    canvas.dataset.vehicleAsset = "fallback-low-poly";
    noteAssetFailure(scraproadAssetManifest.vehicle.model, error);
  });

  const mount = new THREE.Mesh(new THREE.CylinderGeometry(.62,.76,.22,12),metal);
  mount.position.y=2.38; mount.castShadow=true; car.add(mount);
  const bearing = new THREE.Mesh(new THREE.TorusGeometry(.62,.08,8,16),darkMetal);
  bearing.rotation.x=Math.PI/2; bearing.position.y=2.5; bearing.castShadow=true; car.add(bearing);
  turret.position.y=2.54; car.add(turret);
  const receiver = new THREE.Mesh(new THREE.DodecahedronGeometry(.48,0),darkMetal);
  receiver.scale.set(1,.7,1.28); receiver.position.set(0,.28,.1); receiver.castShadow=true; turret.add(receiver);
  const ammoBox = new THREE.Mesh(new THREE.BoxGeometry(.82,.42,.5),metal);
  ammoBox.position.set(0,.18,-.52); ammoBox.rotation.x=.08; ammoBox.castShadow=true; turret.add(ammoBox);
  for(const side of [-1,1]) {
    const support = new THREE.Mesh(new THREE.CylinderGeometry(.09,.13,.68,8),metal);
    support.position.set(side*.4,.12,.02); support.rotation.z=side*.42; support.castShadow=true; turret.add(support);
  }
  const shield = new THREE.Mesh(new THREE.BoxGeometry(1.24,.72,.12),warm);
  shield.position.set(0,.24,.43); shield.rotation.x=-.12; shield.castShadow=true; turret.add(shield);
  barrelPivot.position.set(0,.34,.35); turret.add(barrelPivot);
  const jacket = new THREE.Mesh(new THREE.CylinderGeometry(.17,.2,.72,10),darkMetal);
  jacket.rotation.x=Math.PI/2; jacket.position.z=.34; jacket.castShadow=true; barrelPivot.add(jacket);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.075,.095,1.82,10),metal);
  barrel.rotation.x=Math.PI/2; barrel.position.z=1.53; barrel.castShadow=true; barrelPivot.add(barrel);
  const muzzleBrake = new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.34,10),darkMetal);
  muzzleBrake.rotation.x=Math.PI/2; muzzleBrake.position.z=2.45; muzzleBrake.castShadow=true; barrelPivot.add(muzzleBrake);
  const muzzleGlow = new THREE.Mesh(new THREE.RingGeometry(.055,.13,10),new THREE.MeshBasicMaterial({color:0xff8b35}));
  muzzleGlow.position.z=2.63; barrelPivot.add(muzzleGlow);
  muzzle = new THREE.Object3D(); muzzle.position.z=2.66; barrelPivot.add(muzzle);
  car.position.set(0,getGroundHeight(0,-28),-28); scene.add(car);
}

// Upgrade cards can mutate this single structure between rounds. Future systems:
// TODO: RoundManager, UpgradeCardDraft, OpponentVehicleAI, BetweenRoundScreen.
const defaultStats: VehicleStats = {
  maxHealth: 100,
  acceleration: 16.5,
  maxSpeed: 27,
  handling: 1.62,
  traction: 7.4,
  boostPower: 1.3,
  armor: 0,
  weaponDamage: 15,
  fireRate: 6.7,
  projectileSpeed: 58,
};
const stats: VehicleStats = { ...defaultStats };
const equipped: Partial<Record<VehiclePartSlot, VehiclePart>> = {};
const vehicle = {
  position: new THREE.Vector3(0,0,-28), heading: 0, speed: 0, driftAngle: 0, verticalVelocity: 0,
  grounded: true, activeRamp: null as RampSurface | null, health: 100, boost: 100, collisionCooldown: 0,
};

type PartPickupKind = "tires" | "engine" | "armor" | "weapon";
type PickupKind = PartPickupKind | "repair";
const partCatalog: Record<PartPickupKind, VehiclePart> = {
  tires: { id:"better-tires", name:"All-Terrain Tires", slot:"tires", stats:{ traction:9.2, handling:1.85 } },
  engine: { id:"turbo-engine", name:"Turbo V8", slot:"engine", stats:{ maxSpeed:32, acceleration:24 } },
  armor: { id:"armor-plates", name:"Riveted Armor", slot:"armor", stats:{ maxHealth:145, armor:.22 } },
  weapon: { id:"roof-machine-gun", name:"Twin Roof MG", slot:"roof_weapon", stats:{ weaponDamage:24, fireRate:10.5, projectileSpeed:68 } },
};

const pickups: Pickup[] = [];
function createPickup(x:number,z:number,kind:PickupKind): void {
  const group = new THREE.Group();
  const colors: Record<PickupKind, number> = { tires:0x4fc7de, engine:0xf0ad45, armor:0xc4d07a, weapon:0xe75c38, repair:0x67cf82 };
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(.08,.22,4,8,1,true),new THREE.MeshBasicMaterial({color:colors[kind],transparent:true,opacity:.15,side:THREE.DoubleSide}));
  beam.position.y=2; group.add(beam);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.75,.07,8,24),new THREE.MeshBasicMaterial({color:colors[kind]})); ring.rotation.x=Math.PI/2; ring.position.y=.12; group.add(ring);
  const item = new THREE.Group(); item.position.y=1.15; group.add(item);
  if(kind==="tires") { const tire=new THREE.Mesh(new THREE.TorusGeometry(.48,.2,10,18),rubber); tire.rotation.y=Math.PI/2; item.add(tire); }
  if(kind==="engine") { const block=new THREE.Mesh(new THREE.BoxGeometry(.9,.65,.65),metal); item.add(block); for(const side of [-.3,.3]){const pipe=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.8,8),warm);pipe.position.set(side,.45,0);item.add(pipe);} }
  if(kind==="armor") { for(const offset of [-.18,.18]){const plate=new THREE.Mesh(new THREE.BoxGeometry(1.05,.68,.1),new THREE.MeshStandardMaterial({color:colors[kind],roughness:.65,metalness:.55}));plate.position.z=offset;plate.rotation.y=offset*1.5;item.add(plate);} }
  if(kind==="weapon") { const gun=new THREE.Mesh(new THREE.BoxGeometry(.36,.32,1.2),metal);gun.position.z=.22;item.add(gun);const barrel=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1.2,8),metal);barrel.rotation.x=Math.PI/2;barrel.position.z=1;item.add(barrel); }
  if(kind==="repair") { const box=new THREE.Mesh(new THREE.BoxGeometry(.85,.7,.55),new THREE.MeshStandardMaterial({color:colors[kind],roughness:.6}));item.add(box);const v=new THREE.Mesh(new THREE.BoxGeometry(.16,.5,.08),new THREE.MeshBasicMaterial({color:0xf1f0d3}));v.position.z=.3;item.add(v);const h=v.clone();h.rotation.z=Math.PI/2;item.add(h); }
  group.position.set(x,getGroundHeight(x,z)+.12,z); scene.add(group);
  const part = kind==="repair" ? null : partCatalog[kind];
  pickups.push({group,part,repair:kind==="repair"?45:undefined,collected:false,label:part?.name ?? "Repair Kit"});
}

const targets: Target[] = [];
function createTarget(x:number,z:number,rotation:number): void {
  const group=new THREE.Group();
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.75,.9,.35,10),darkMetal);base.position.y=.18;base.castShadow=true;group.add(base);
  const post=new THREE.Mesh(new THREE.BoxGeometry(.3,1.8,.3),metal);post.position.y=1.2;post.castShadow=true;group.add(post);
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.62,.78,1.35,8),new THREE.MeshStandardMaterial({color:0x913c27,roughness:.7,metalness:.45,emissive:0x000000}));body.position.y=1.55;body.castShadow=true;body.name="target-body";group.add(body);
  const eye=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),new THREE.MeshBasicMaterial({color:0xffb446}));eye.position.set(0,1.72,.65);group.add(eye);
  for(const side of [-1,1]){const arm=new THREE.Mesh(new THREE.BoxGeometry(.8,.16,.16),metal);arm.position.set(side*.78,1.7,0);arm.rotation.z=side*.25;group.add(arm);}
  group.position.set(x,getGroundHeight(x,z),z);group.rotation.y=rotation;scene.add(group);targets.push({group,health:55,alive:true,hitFlash:0});
}

const bullets: Bullet[]=[]; const dust: DustParticle[]=[];
const bulletMaterial=new THREE.MeshBasicMaterial({color:0xffcf5a});
const dustMaterial=new THREE.MeshBasicMaterial({color:0xc18a59,transparent:true,opacity:.35,depthWrite:false});
let lastShot=0; let messageTimer=0; let paused=false; let cameraMode=0; let elapsed=0;
const rampSmokeTest = new URLSearchParams(location.search).get("physics-smoke") === "ramp";
const soundtrack = new Audio("./assets/nitro-games.wav");
soundtrack.loop = true;
soundtrack.volume = .12;
soundtrack.preload = "metadata";
soundtrack.id = "soundtrack";
soundtrack.hidden = true;
soundtrack.dataset.playback = "waiting-for-interaction";
document.body.append(soundtrack);

function startSoundtrack(): void {
  if (!soundtrack.paused) return;
  soundtrack.dataset.playback = "starting";
  soundtrack.play()
    .then(() => { soundtrack.dataset.playback = "playing"; })
    .catch(() => { soundtrack.dataset.playback = "blocked"; });
}
const input=new Set<string>(); const mouse=new THREE.Vector2(0,.15); const aimPoint=new THREE.Vector3();
const raycaster=new THREE.Raycaster(); const aimPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0);
const currentAimDirection = new THREE.Vector3(0, 0, 1);
let aimReady = false;
const groundCrosshair = new THREE.Group();
const crosshairMaterial = new THREE.MeshBasicMaterial({ color: 0xffc85c, transparent: true, opacity: .92, depthTest: false });
const crosshairRing = new THREE.Mesh(new THREE.RingGeometry(.65, .82, 24), crosshairMaterial);
crosshairRing.rotation.x = -Math.PI / 2; groundCrosshair.add(crosshairRing);
for (const rotation of [0, Math.PI / 2]) {
  const line = new THREE.Mesh(new THREE.BoxGeometry(2.25, .025, .08), crosshairMaterial);
  line.rotation.y = rotation; line.position.y = .015; groundCrosshair.add(line);
}
groundCrosshair.renderOrder = 10; scene.add(groundCrosshair);

function shoot(): void {
  const now=performance.now(); if(paused || !aimReady || now-lastShot < 1000/stats.fireRate) return; lastShot=now;
  const origin=new THREE.Vector3();muzzle.getWorldPosition(origin);
  const direction=aimPoint.clone().sub(origin).normalize(); currentAimDirection.copy(direction);
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(.09,.09,.72),bulletMaterial);mesh.position.copy(origin);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),direction);scene.add(mesh);
  bullets.push({mesh,velocity:direction.multiplyScalar(stats.projectileSpeed),life:2.35});
  canvas.dataset.shotsFired=String(Number(canvas.dataset.shotsFired??0)+1);
  ui.weaponState.textContent="FIRING"; setTimeout(()=>{if(ui.weaponState.textContent==="FIRING")ui.weaponState.textContent="READY";},80);
  const flash=new THREE.PointLight(0xff8a24,8,5,2);flash.position.copy(origin);scene.add(flash);setTimeout(()=>scene.remove(flash),45);
}

function spawnDust(dt:number): void {
  if(Math.abs(vehicle.speed)<3 || Math.random()>dt*Math.min(Math.abs(vehicle.speed),20)*1.8) return;
  const behind=new THREE.Vector3(-Math.sin(vehicle.heading)*2,0,-Math.cos(vehicle.heading)*2);
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(.18+Math.random()*.22,6,4),dustMaterial.clone());
  mesh.position.copy(vehicle.position).add(behind).add(new THREE.Vector3((Math.random()-.5)*1.8,.25,(Math.random()-.5)*.8));scene.add(mesh);
  dust.push({mesh,life:.7+Math.random()*.5,velocity:new THREE.Vector3((Math.random()-.5)*.5,.45+Math.random()*.3,(Math.random()-.5)*.5)});
}

function explode(position:THREE.Vector3): void {
  for(let i=0;i<14;i++){
    const mesh=new THREE.Mesh(new THREE.DodecahedronGeometry(.08+Math.random()*.14,0),new THREE.MeshBasicMaterial({color:i%3===0?0xffc34e:0xb84a29}));
    mesh.position.copy(position).add(new THREE.Vector3(0,1.4,0));scene.add(mesh);
    dust.push({mesh,life:.7+Math.random()*.8,velocity:new THREE.Vector3((Math.random()-.5)*7,2+Math.random()*5,(Math.random()-.5)*7)});
  }
}

function damageTarget(target:Target,amount:number): void {
  if(!target.alive)return;target.health-=amount;target.hitFlash=.09;
  if(target.health<=0){target.alive=false;explode(target.group.position);scene.remove(target.group);const left=targets.filter(item=>item.alive).length;ui.targets.textContent=String(left);showMessage(left?`TARGET SCRAPPED // ${left} REMAIN`:`ARENA CLEARED // ALL TARGETS SCRAPPED`);if(!left)ui.objective.innerHTML="<small>FIELD TEST COMPLETE</small><b>All targets destroyed. Keep looting or run another lap.</b>";}
}

function equipPickup(pickup:Pickup): void {
  pickup.collected=true;scene.remove(pickup.group);
  if(pickup.repair){vehicle.health=Math.min(stats.maxHealth,vehicle.health+pickup.repair);showMessage(`REPAIR KIT // HULL RESTORED +${pickup.repair}`);return;}
  if(!pickup.part)return;equipped[pickup.part.slot]=pickup.part;Object.assign(stats,pickup.part.stats);
  if(pickup.part.slot==="armor"){vehicle.health=Math.min(stats.maxHealth,vehicle.health+45);ui.armor.textContent="RIVETED";}
  if(pickup.part.slot==="engine")ui.engine.textContent="TURBO V8";
  if(pickup.part.slot==="tires")ui.tires.textContent="ALL-TERRAIN";
  if(pickup.part.slot==="roof_weapon"){ui.weapon.textContent="TWIN ROOF MG";turret.scale.set(1.18,1.12,1.18);}
  showMessage(`EQUIPPED // ${pickup.part.name.toUpperCase()}`);
}

function showMessage(text:string): void {ui.message.textContent=text;ui.message.classList.add("show");clearTimeout(messageTimer);messageTimer=window.setTimeout(()=>ui.message.classList.remove("show"),1900);}

function updateVehicle(dt:number): void {
  vehicle.collisionCooldown=Math.max(0,vehicle.collisionCooldown-dt);
  const forward=input.has("KeyW")?1:0;const reverse=input.has("KeyS")?1:0;const steer=(input.has("KeyA")?1:0)-(input.has("KeyD")?1:0);const drifting=input.has("Space");
  const boosting=input.has("ShiftLeft")&&forward>0&&vehicle.boost>0;
  if(forward)vehicle.speed+=stats.acceleration*(boosting?(stats.boostPower??1.3):1)*dt;
  if(reverse)vehicle.speed-=vehicle.speed>1?stats.acceleration*2.35*dt:stats.acceleration*.68*dt;
  if(boosting){vehicle.boost=Math.max(0,vehicle.boost-24*dt);}else vehicle.boost=Math.min(100,vehicle.boost+9*dt);
  const maxForward=stats.maxSpeed*(boosting?(stats.boostPower??1.3):1);vehicle.speed=THREE.MathUtils.clamp(vehicle.speed,-11,maxForward);
  if(!forward&&!reverse){const drag=(drifting?4.4:2.15)*dt;vehicle.speed=Math.abs(vehicle.speed)<=drag?0:vehicle.speed-Math.sign(vehicle.speed)*drag;}
  const speedRatio=Math.min(Math.abs(vehicle.speed)/stats.maxSpeed,1);const reverseSign=vehicle.speed>=0?1:-1;
  const steeringAuthority=.2+speedRatio*.8-(Math.max(0,speedRatio-.72)*.34);
  vehicle.heading+=steer*stats.handling*steeringAuthority*(drifting?1.3:1)*reverseSign*dt;
  const targetDrift=drifting&&speedRatio>.16?-steer*.28*speedRatio*reverseSign:0;
  vehicle.driftAngle=THREE.MathUtils.damp(vehicle.driftAngle,targetDrift,drifting?4.2:stats.traction,dt);
  const moveAngle=vehicle.heading+vehicle.driftAngle;
  const previousPosition=vehicle.position.clone();
  vehicle.position.x+=Math.sin(moveAngle)*vehicle.speed*dt;vehicle.position.z+=Math.cos(moveAngle)*vehicle.speed*dt;

  let collided=false;
  const arenaDistance=Math.hypot(vehicle.position.x,vehicle.position.z);
  if(arenaDistance>ARENA_RADIUS-2){const nx=vehicle.position.x/arenaDistance,nz=vehicle.position.z/arenaDistance;vehicle.position.x=nx*(ARENA_RADIUS-2);vehicle.position.z=nz*(ARENA_RADIUS-2);collided=true;showMessage("BOUNDARY IMPACT // TURN BACK");}
  for(const obstacle of obstacles){
    if(vehicle.position.y > obstacle.top)continue;
    const dx=vehicle.position.x-obstacle.position.x,dz=vehicle.position.z-obstacle.position.z,dist=Math.hypot(dx,dz),min=obstacle.radius+VEHICLE_RADIUS;
    if(dist<min){const nx=dist>.001?dx/dist:Math.sin(vehicle.heading),nz=dist>.001?dz/dist:Math.cos(vehicle.heading);vehicle.position.x=obstacle.position.x+nx*min;vehicle.position.z=obstacle.position.z+nz*min;collided=true;}
  }
  for(const collider of boxColliders) if(resolveBoxCollision(collider)) collided=true;

  const rampBefore=vehicle.activeRamp;
  let rampNow=rampSample(vehicle.position.x,vehicle.position.z);
  if(rampNow&&rampNow.ramp!==rampBefore&&rampNow.height>vehicle.position.y+.85){
    vehicle.position.x=previousPosition.x;vehicle.position.z=previousPosition.z;rampNow=rampSample(vehicle.position.x,vehicle.position.z);collided=true;
  }
  if(collided){if(Math.abs(vehicle.speed)>6){hitVehicle(Math.round(Math.abs(vehicle.speed)*.32));showMessage("SCRAP COLLISION // HULL DAMAGED");}vehicle.speed*=-.18;vehicle.driftAngle*=.25;}

  rampNow=rampSample(vehicle.position.x,vehicle.position.z);
  if(rampNow){
    vehicle.activeRamp=rampNow.ramp;vehicle.grounded=true;vehicle.verticalVelocity=0;vehicle.position.y=rampNow.height+.06;
  }else{
    const ground=getGroundHeight(vehicle.position.x,vehicle.position.z)+.06;
    if(rampBefore&&vehicle.position.y>ground+.45){
      const travelAlignment=Math.cos(moveAngle-rampBefore.rotation);
      vehicle.verticalVelocity=Math.max(0,vehicle.speed*travelAlignment*rampBefore.rise/rampBefore.length);
      vehicle.grounded=false;
    }
    vehicle.activeRamp=null;
    if(!vehicle.grounded){vehicle.verticalVelocity-=12.5*dt;vehicle.position.y+=vehicle.verticalVelocity*dt;if(vehicle.position.y<=ground){vehicle.position.y=ground;vehicle.verticalVelocity=0;vehicle.grounded=true;}}
    else vehicle.position.y=ground;
  }

  const frontY=getDriveHeight(vehicle.position.x+Math.sin(vehicle.heading)*2,vehicle.position.z+Math.cos(vehicle.heading)*2);const backY=getDriveHeight(vehicle.position.x-Math.sin(vehicle.heading)*2,vehicle.position.z-Math.cos(vehicle.heading)*2);
  const rightY=getDriveHeight(vehicle.position.x+Math.cos(vehicle.heading)*1.2,vehicle.position.z-Math.sin(vehicle.heading)*1.2);const leftY=getDriveHeight(vehicle.position.x-Math.cos(vehicle.heading)*1.2,vehicle.position.z+Math.sin(vehicle.heading)*1.2);
  const pitch=vehicle.grounded?Math.atan2(backY-frontY,4):0;const roll=(vehicle.grounded?Math.atan2(leftY-rightY,2.4):0)+(drifting?steer*.055*speedRatio:0);
  car.position.lerp(new THREE.Vector3(vehicle.position.x,vehicle.position.y,vehicle.position.z),1-Math.exp(-12*dt));car.rotation.set(pitch,vehicle.heading,roll,"YXZ");
  wheels.forEach(wheel=>wheel.rotation.x+=vehicle.speed*dt/.57);frontWheelPivots.forEach(pivot=>pivot.rotation.y=THREE.MathUtils.damp(pivot.rotation.y,-steer*.38,12,dt));
  for(const pickup of pickups){if(!pickup.collected&&pickup.group.position.distanceTo(car.position)<2.25)equipPickup(pickup);}
  for(const target of targets){if(target.alive&&target.group.position.distanceTo(car.position)<1.85&&Math.abs(vehicle.speed)>5){damageTarget(target,Math.abs(vehicle.speed)*1.8);vehicle.speed*=-.35;hitVehicle(4);}}
  spawnDust(dt);
}

function hitVehicle(amount:number):void{if(vehicle.collisionCooldown>0)return;vehicle.collisionCooldown=.45;vehicle.health=Math.max(0,vehicle.health-amount*(1-(stats.armor??0)));if(vehicle.health<=0){showMessage("RIG DISABLED // RESETTING");setTimeout(resetVehicle,900);}}

function updateAim(dt:number): void {
  raycaster.setFromCamera(mouse,camera);
  const hit = raycaster.intersectObjects(aimSurfaces, false)[0];
  if (hit) aimPoint.copy(hit.point);
  else {
    aimPlane.constant = 0;
    if (!raycaster.ray.intersectPlane(aimPlane, aimPoint)) return;
    aimPoint.y = getDriveHeight(aimPoint.x, aimPoint.z);
  }
  const turretWorld = new THREE.Vector3(); turret.getWorldPosition(turretWorld);
  const dx=aimPoint.x-turretWorld.x,dz=aimPoint.z-turretWorld.z;
  if (Math.hypot(dx,dz) < 1.8) return;
  const worldYaw=Math.atan2(dx,dz);let local=worldYaw-vehicle.heading;local=Math.atan2(Math.sin(local),Math.cos(local));
  turret.rotation.y=THREE.MathUtils.damp(turret.rotation.y,local,12,dt);
  const pitch = -Math.atan2(aimPoint.y - turretWorld.y, Math.hypot(dx,dz));
  barrelPivot.rotation.x = THREE.MathUtils.damp(barrelPivot.rotation.x, THREE.MathUtils.clamp(pitch,-.42,.2), 11, dt);
  currentAimDirection.copy(aimPoint).sub(turretWorld).normalize(); aimReady = true;
  groundCrosshair.position.copy(aimPoint); groundCrosshair.position.y += .09;
  groundCrosshair.scale.setScalar(1 + Math.sin(elapsed * 5) * .06);
}

function updateProjectiles(dt:number): void {
  for(let i=bullets.length-1;i>=0;i--){const bullet=bullets[i];bullet.mesh.position.addScaledVector(bullet.velocity,dt);bullet.life-=dt;let hit=false;for(const target of targets){if(target.alive&&bullet.mesh.position.distanceTo(target.group.position.clone().add(new THREE.Vector3(0,1.4,0)))<1){damageTarget(target,stats.weaponDamage);hit=true;break;}}const hitTerrain=bullet.life<2.28&&bullet.mesh.position.y<=getDriveHeight(bullet.mesh.position.x,bullet.mesh.position.z)+.08;if(hit||hitTerrain||bullet.life<=0){scene.remove(bullet.mesh);bullets.splice(i,1);}}
  for(let i=dust.length-1;i>=0;i--){const p=dust[i];p.life-=dt;p.mesh.position.addScaledVector(p.velocity,dt);p.velocity.y-=3.5*dt;p.mesh.scale.multiplyScalar(1+dt*.55);const material=p.mesh.material as THREE.MeshBasicMaterial;material.opacity=Math.max(0,Math.min(material.opacity,p.life*.45));if(p.life<=0){scene.remove(p.mesh);material.dispose();dust.splice(i,1);}}
  for(const target of targets){if(!target.alive)continue;if(target.hitFlash>0){target.hitFlash-=dt;const body=target.group.getObjectByName("target-body") as THREE.Mesh<THREE.BufferGeometry,THREE.MeshStandardMaterial>;body.material.emissive.setHex(0xff6b2c);}else{const body=target.group.getObjectByName("target-body") as THREE.Mesh<THREE.BufferGeometry,THREE.MeshStandardMaterial>;body.material.emissive.setHex(0x000000);}}
}

const cameraLook=new THREE.Vector3();
function updateCamera(dt:number): void {
  const forward=new THREE.Vector3(Math.sin(vehicle.heading),0,Math.cos(vehicle.heading));
  const desired=cameraMode===0?vehicle.position.clone().addScaledVector(forward,-11.5).add(new THREE.Vector3(0,6.3,0)):vehicle.position.clone().add(new THREE.Vector3(0,23,-.01));
  camera.position.lerp(desired,1-Math.exp(-5*dt));const look=vehicle.position.clone().addScaledVector(forward,cameraMode===0?4:0).add(new THREE.Vector3(0,1.2,0));cameraLook.lerp(look,1-Math.exp(-8*dt));camera.lookAt(cameraLook);
}

function updatePickups(dt:number):void{for(const pickup of pickups){if(pickup.collected)continue;pickup.group.rotation.y+=dt*.8;const item=pickup.group.children[2];item.position.y=1.1+Math.sin(elapsed*2.4+pickup.group.position.x)*.18;}}

function updateHud():void{ui.speed.textContent=String(Math.round(Math.abs(vehicle.speed)*4.2));ui.boost.textContent=String(Math.round(vehicle.boost));ui.health.textContent=String(Math.round(vehicle.health));ui.healthBar.style.width=`${vehicle.health/stats.maxHealth*100}%`;canvas.dataset.groundContact=vehicle.grounded?(vehicle.activeRamp?"ramp":"terrain"):"airborne";canvas.dataset.aimRay=aimReady?"locked":"searching";canvas.dataset.aimPoint=`${aimPoint.x.toFixed(1)},${aimPoint.y.toFixed(1)},${aimPoint.z.toFixed(1)}`;canvas.dataset.vehiclePosition=`${vehicle.position.x.toFixed(1)},${vehicle.position.y.toFixed(1)},${vehicle.position.z.toFixed(1)}`;if(rampSmokeTest&&vehicle.activeRamp)canvas.dataset.rampDriveUp="passed";if(rampSmokeTest&&!vehicle.grounded&&canvas.dataset.rampDriveUp==="passed")canvas.dataset.rampLaunch="passed";}

function drawRadar():void{const context=ui.radar.getContext("2d");if(!context)return;const size=160,center=80,scale=.58;context.clearRect(0,0,size,size);context.strokeStyle="rgba(213,183,119,.13)";context.lineWidth=1;for(const radius of [24,48,72]){context.beginPath();context.arc(center,center,radius,0,Math.PI*2);context.stroke();}context.beginPath();context.moveTo(center,8);context.lineTo(center,152);context.moveTo(8,center);context.lineTo(152,center);context.stroke();const plot=(x:number,z:number,color:string,radius:number)=>{const dx=(x-vehicle.position.x)*scale,dz=(z-vehicle.position.z)*scale;const angle=-vehicle.heading;const px=dx*Math.cos(angle)-dz*Math.sin(angle),py=dx*Math.sin(angle)+dz*Math.cos(angle);if(Math.hypot(px,py)>73)return;context.fillStyle=color;context.beginPath();context.arc(center+px,center-py,radius,0,Math.PI*2);context.fill();};pickups.forEach(p=>{if(!p.collected)plot(p.group.position.x,p.group.position.z,"#57dbe3",2.7)});targets.forEach(t=>{if(t.alive)plot(t.group.position.x,t.group.position.z,"#ef6846",3)});context.save();context.translate(center,center);context.fillStyle="#f3ce79";context.beginPath();context.moveTo(0,-7);context.lineTo(5,6);context.lineTo(0,3);context.lineTo(-5,6);context.closePath();context.fill();context.restore();}

function resetVehicle():void{vehicle.position.set(0,getGroundHeight(0,-28)+.06,-28);vehicle.heading=0;vehicle.speed=0;vehicle.driftAngle=0;vehicle.verticalVelocity=0;vehicle.grounded=true;vehicle.activeRamp=null;vehicle.health=Math.max(vehicle.health,Math.min(stats.maxHealth,65));vehicle.boost=100;car.position.copy(vehicle.position);car.rotation.set(0,0,0);showMessage("RIG RECOVERED // SYSTEMS ONLINE");}

function togglePause(force?:boolean):void{paused=force??!paused;ui.pause.hidden=!paused;}
function toggleControls(show?:boolean):void{ui.controls.classList.toggle("closed",show===undefined?!ui.controls.classList.contains("closed"):!show);}

canvas.dataset.assetsLoaded="0";canvas.dataset.assetErrors="0";canvas.dataset.assetManifest="scraproadAssetManifest";
addArena();addWorldProps();registerPhysicsDebug();buildCar();
createPickup(-44,-34,"tires");createPickup(43,17,"engine");createPickup(73,-49,"armor");createPickup(-9,57,"weapon");createPickup(-76,53,"repair");createPickup(31,-78,"repair");
createTarget(-29,16,.4);createTarget(21,36,-.5);createTarget(59,57,1.2);createTarget(81,5,-1.2);createTarget(43,-48,2.5);createTarget(-25,-72,.2);createTarget(-70,-44,-.8);createTarget(-84,22,1.6);
canvas.dataset.prototype="scraproad-1v1-foundation";canvas.dataset.arenaRadius=String(ARENA_RADIUS);canvas.dataset.rampColliders=String(ramps.length);canvas.dataset.majorColliders=String(obstacles.length+boxColliders.length);canvas.dataset.shotsFired="0";
if(rampSmokeTest){
  const ramp=ramps[0];
  const offset=new THREE.Vector3(0,0,-ramp.length*.5-3).applyAxisAngle(new THREE.Vector3(0,1,0),ramp.rotation);
  vehicle.position.set(ramp.position.x+offset.x,getGroundHeight(ramp.position.x+offset.x,ramp.position.z+offset.z)+.06,ramp.position.z+offset.z);
  vehicle.heading=ramp.rotation;car.position.copy(vehicle.position);
  canvas.dataset.rampDriveUp="pending";canvas.dataset.rampLaunch="pending";input.add("KeyW");
  for(let step=0;step<300&&canvas.dataset.rampLaunch!=="passed";step++){
    elapsed+=1/60;updateVehicle(1/60);updateHud();
  }
  input.delete("KeyW");canvas.dataset.physicsSmoke="complete";
}
showMessage(rampSmokeTest?"RAMP SMOKE TEST // AUTO DRIVE":"1V1 PROVING GROUND // PHYSICS ONLINE");setTimeout(()=>toggleControls(false),4200);

window.addEventListener("keydown",event=>{if(["KeyW","KeyA","KeyS","KeyD","Space","ShiftLeft","KeyF"].includes(event.code))event.preventDefault();if(event.repeat)return;if(event.code==="Escape"){togglePause();return;}if(event.code==="KeyR")resetVehicle();if(event.code==="KeyC"){cameraMode=(cameraMode+1)%2;showMessage(cameraMode?"CAMERA // OVERWATCH":"CAMERA // CHASE");}if(event.code==="KeyB"){debugPhysics=!debugPhysics;debugVisuals.forEach(item=>item.visible=debugPhysics);showMessage(debugPhysics?`PHYSICS DEBUG // ${vehicle.grounded?"GROUNDED":"AIRBORNE"}`:"PHYSICS DEBUG // OFF");}if(event.code==="KeyF")shoot();input.add(event.code);});
window.addEventListener("keyup",event=>input.delete(event.code));
canvas.addEventListener("pointermove",event=>{const bounds=canvas.getBoundingClientRect();mouse.x=(event.clientX-bounds.left)/bounds.width*2-1;mouse.y=-(event.clientY-bounds.top)/bounds.height*2+1;const crosshair=getElement("crosshair");crosshair.style.left=`${event.clientX}px`;crosshair.style.top=`${event.clientY}px`;});
canvas.addEventListener("pointerdown",event=>{if(event.button===0)shoot();});
window.addEventListener("keydown", startSoundtrack, { capture: true });
window.addEventListener("pointerdown", startSoundtrack, { capture: true });
canvas.addEventListener("contextmenu",event=>event.preventDefault());
getElement("help-button").addEventListener("click",()=>toggleControls());getElement("controls-close").addEventListener("click",()=>toggleControls(false));getElement("resume-button").addEventListener("click",()=>togglePause(false));
document.querySelectorAll<HTMLButtonElement>("[data-key]").forEach(button=>{const code=button.dataset.key??"";const press=(event:PointerEvent)=>{event.preventDefault();if(code==="Fire")shoot();else input.add(code);};const release=(event:PointerEvent)=>{event.preventDefault();input.delete(code);};button.addEventListener("pointerdown",press);button.addEventListener("pointerup",release);button.addEventListener("pointercancel",release);button.addEventListener("pointerleave",release);});
window.addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));});

const clock=new THREE.Clock();let radarAccumulator=0;
function animate():void{requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04);if(!paused){elapsed+=dt;updateVehicle(dt);updateCamera(dt);updateAim(dt);updateProjectiles(dt);updatePickups(dt);updateHud();radarAccumulator+=dt;if(radarAccumulator>.08){radarAccumulator=0;drawRadar();}}renderer.render(scene,camera);}
animate();

function getElement<T extends HTMLElement=HTMLElement>(id:string):T{const element=document.getElementById(id);if(!element)throw new Error(`Missing #${id}`);return element as T;}

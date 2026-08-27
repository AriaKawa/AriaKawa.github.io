import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { scraproadAssetManifest } from "./assets/scraproadAssetManifest";
import { scraproadRacekartManifest, type RacekartAssetKey } from "./assets/scraproadRacekartManifest";
import {
  defaultScraproadLevel,
  scraproadArenaLayouts,
  type AssetPlacement,
  type DriveSurfaceSpec,
  type ScraproadArenaLayout,
  type ScraproadLevelId,
} from "./game/scraproad/ScraproadArenaLayout";
import "./style.css";

type VehiclePartSlot = "roof_weapon" | "front_weapon" | "tires" | "engine" | "armor";
type WeaponStats = {
  fireRate: number;
  damage: number;
  projectileSpeed: number;
  range: number;
  automatic?: boolean;
};
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
  kind: "ramp" | "bridge";
  label: string;
};

const canvas = getElement<HTMLCanvasElement>("game");

const ui = {
  health: getElement("health-value"), healthBar: getElement("health-bar"), speed: getElement("speed-value"),
  boost: getElement("boost-value"), targets: getElement("target-value"), weapon: getElement("weapon-part"),
  tires: getElement("tires-part"), engine: getElement("engine-part"), armor: getElement("armor-part"),
  weaponState: getElement("weapon-state"), message: getElement("message"), controls: getElement("controls"),
  pause: getElement("pause"), objective: getElement("objective"), radar: getElement<HTMLCanvasElement>("radar-canvas"),
  debug: getElement("physics-debug"), levelSelect: getElement("level-select"),
};

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
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
const racekartTemplates = new Map<RacekartAssetKey, Promise<THREE.Group>>();

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
        object.castShadow = false;
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

function loadRacekartTemplate(key: RacekartAssetKey): Promise<THREE.Group> {
  const cached = racekartTemplates.get(key);
  if (cached) return cached;
  const definition = scraproadRacekartManifest[key];
  const pending = new Promise<THREE.Group>((resolve, reject) => {
    new MTLLoader().load(definition.mtl, materials => {
      materials.preload();
      const loader = new OBJLoader();
      loader.setMaterials(materials);
      loader.load(definition.obj, imported => {
        imported.updateMatrixWorld(true);
        const bounds = new THREE.Box3().setFromObject(imported);
        const center = bounds.getCenter(new THREE.Vector3());
        imported.position.set(-center.x, -bounds.min.y, -center.z);
        imported.traverse(object => {
          if (!(object instanceof THREE.Mesh)) return;
          object.castShadow = false;
          object.receiveShadow = true;
          const materialsForMesh = Array.isArray(object.material) ? object.material : [object.material];
          for (const material of materialsForMesh) {
            if (material instanceof THREE.MeshPhongMaterial) {
              material.shininess = Math.min(material.shininess, 8);
              material.specular.setHex(0x15120d);
            }
          }
        });
        const normalized = new THREE.Group();
        normalized.name = `racekart-hilly-${key}`;
        normalized.userData.sourceSize = bounds.getSize(new THREE.Vector3());
        normalized.add(imported);
        resolve(normalized);
      }, undefined, reject);
    }, undefined, reject);
  });
  racekartTemplates.set(key, pending);
  return pending;
}

async function instantiateRacekartAsset(key: RacekartAssetKey): Promise<THREE.Group> {
  const template = await loadRacekartTemplate(key);
  canvas.dataset.assetsLoaded = String(Number(canvas.dataset.assetsLoaded ?? 0) + 1);
  return template.clone(true);
}

const camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 520);
camera.position.set(0, 7, -11);

const hemi = new THREE.HemisphereLight(0xdde8f2, 0x493c31, 2.75);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0cf, 3.75);
sun.position.set(-28, 42, -18);
sun.castShadow = true;
sun.shadow.mapSize.set(1536, 1536);
sun.shadow.camera.left = -125; sun.shadow.camera.right = 125; sun.shadow.camera.top = 125; sun.shadow.camera.bottom = -125;
scene.add(sun);

const warm = new THREE.MeshStandardMaterial({ color: 0x9f3d22, roughness: .78, metalness: .26 });
const metal = new THREE.MeshStandardMaterial({ color: 0x272a29, roughness: .55, metalness: .76 });
const darkMetal = new THREE.MeshStandardMaterial({ color: 0x151717, roughness: .67, metalness: .72 });
const sand = new THREE.MeshStandardMaterial({ color: 0x9a6b49, roughness: 1, metalness: 0, vertexColors: true });
const rubber = new THREE.MeshStandardMaterial({ color: 0x101111, roughness: .9, metalness: .08 });
let activeLayout: ScraproadArenaLayout = scraproadArenaLayouts[defaultScraproadLevel];
let ARENA_RADIUS = activeLayout.radius;
let levelStarted = false;
const VEHICLE_COLLIDER_RADIUS = 1.12;
const VEHICLE_COLLIDER_HALF_LENGTH = .95;
const VEHICLE_COLLIDER_HEIGHT = .72;
const FIXED_TIMESTEP = 1 / 60;
const MAX_FRAME_DELTA = .1;
const MAX_PHYSICS_STEPS = 5;
const RAMP_ENTRY_BLEND = 1.15;
const ramps: RampSurface[] = [];
const obstacles: Obstacle[] = [];
const boxColliders: BoxCollider[] = [];
const aimSurfaces: THREE.Object3D[] = [];
const debugVisuals: THREE.Object3D[] = [];
let debugPhysics = false;

function getGroundHeight(x: number, z: number): number {
  const hilly = activeLayout.id === "stuntworks";
  const northHill = (hilly ? 4.8 : 2.5) * Math.exp(-((x - 42) ** 2 + (z - 67) ** 2) / (hilly ? 820 : 610));
  const westRise = (hilly ? 4.1 : 2.2) * Math.exp(-((x + 82) ** 2 + (z - 12) ** 2) / (hilly ? 760 : 520));
  const southBump = (hilly ? 3.5 : 1.7) * Math.exp(-((x - 36) ** 2 + (z + 82) ** 2) / (hilly ? 640 : 440));
  const openBowl = -1.15 * Math.exp(-(x ** 2 + z ** 2) / 1450);
  const texture = Math.sin(x * .07) * Math.cos(z * .065) * .1 + Math.sin((x + z) * .04) * .08;
  return northHill + westRise + southBump + openBowl + texture;
}

function placeRacekartAsset(placement: AssetPlacement): void {
  instantiateRacekartAsset(placement.asset).then(asset => {
    const scale = placement.scale ?? 10;
    const sourceSize = asset.userData.sourceSize as THREE.Vector3 | undefined;
    const definition = scraproadRacekartManifest[placement.asset];
    const buriedTrackOffset = definition.category === "track" && sourceSize ? -sourceSize.y * scale + .08 : 0;
    asset.name = `racekart-hilly-${placement.asset}${placement.label ? `-${placement.label}` : ""}`;
    asset.scale.setScalar(scale);
    asset.position.set(placement.x, getGroundHeight(placement.x, placement.z) + (placement.y ?? buriedTrackOffset), placement.z);
    asset.rotation.y = placement.rotation ?? 0;
    scene.add(asset);
  }).catch(error => noteAssetFailure(scraproadRacekartManifest[placement.asset].obj, error));
}

function addSpawnMarker(x: number, z: number, heading: number, opponent = false): void {
  const pad = new THREE.Mesh(
    new THREE.RingGeometry(4.2, 5.2, 24),
    new THREE.MeshBasicMaterial({ color: opponent ? 0xd9593b : 0x5bd1c5, side: THREE.DoubleSide, transparent: true, opacity: .72 }),
  );
  pad.rotateX(-Math.PI / 2); pad.rotation.z = heading; pad.position.set(x, getGroundHeight(x, z) + .11, z);
  pad.name = opponent ? "opponent-spawn-placeholder" : "player-spawn"; scene.add(pad);
}

function addArena(): void {
  const diameter = ARENA_RADIUS * 2 + 18;
  const geometry = new THREE.PlaneGeometry(diameter, diameter, 112, 112);
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

  const arenaRing = new THREE.Mesh(new THREE.RingGeometry(ARENA_RADIUS - 1, ARENA_RADIUS, 96), new THREE.MeshBasicMaterial({ color: 0x5a2c20, side: THREE.DoubleSide }));
  arenaRing.rotateX(-Math.PI / 2);
  arenaRing.position.y = .12;
  scene.add(arenaRing);

  activeLayout.terrain.forEach(placeRacekartAsset);
  activeLayout.track.forEach(placeRacekartAsset);
  for (const surface of activeLayout.surfaces) addRamp(surface);
  for (const barrier of activeLayout.barriers) addBarrier(barrier.x, barrier.z, barrier.rotation, barrier.length, barrier.boundary);
  for (let segment = 0; segment < 32; segment++) {
    const angle = segment / 32 * Math.PI * 2;
    addBarrier(Math.sin(angle) * (ARENA_RADIUS - 2), Math.cos(angle) * (ARENA_RADIUS - 2), angle, Math.PI * (ARENA_RADIUS - 2) / 16 + .8, true);
  }
  addSpawnMarker(activeLayout.spawn.x, activeLayout.spawn.z, activeLayout.spawn.heading);
  addSpawnMarker(activeLayout.opponentSpawn.x, activeLayout.opponentSpawn.z, activeLayout.opponentSpawn.heading, true);
}

function addRamp(spec: DriveSurfaceSpec): void {
  const { x, z, rotation = 0, width, length } = spec;
  const entryX = x - Math.sin(rotation) * length * .5, entryZ = z - Math.cos(rotation) * length * .5;
  const exitX = x + Math.sin(rotation) * length * .5, exitZ = z + Math.cos(rotation) * length * .5;
  const baseHeight = getGroundHeight(entryX, entryZ) + spec.startHeight;
  const endHeight = getGroundHeight(exitX, exitZ) + spec.endHeight;
  const rise = endHeight - baseHeight;
  const slope = Math.atan2(rise, length);
  const ramp = new THREE.Group();
  const collisionMaterial = new THREE.MeshBasicMaterial({ color: spec.kind === "bridge" ? 0x55d7c5 : 0xffa54b, wireframe: true, transparent: true, opacity: 0 });
  const deck = new THREE.Mesh(new THREE.BoxGeometry(width, .32, length), collisionMaterial);
  deck.rotation.x = -slope;
  deck.position.y = (baseHeight + endHeight) * .5;
  deck.name = `${spec.kind}-collider-surface`;
  deck.castShadow = false; deck.receiveShadow = true;
  ramp.add(deck);
  ramp.position.set(x, 0, z); ramp.rotation.y = rotation; scene.add(ramp);
  instantiateRacekartAsset(spec.asset).then(asset => {
    const sourceSize = (asset.userData.sourceSize as THREE.Vector3 | undefined) ?? new THREE.Vector3(2, 1, 1);
    const visualHeight = Math.max(.7, spec.kind === "bridge" ? Math.max(spec.startHeight, spec.endHeight) : Math.abs(spec.endHeight - spec.startHeight));
    asset.name = `racekart-hilly-driveable-${spec.label ?? spec.asset}`;
    asset.scale.set(length / sourceSize.x, visualHeight / sourceSize.y, width / sourceSize.z);
    asset.position.y = Math.min(getGroundHeight(entryX, entryZ), getGroundHeight(exitX, exitZ));
    asset.rotation.y = spec.assetYaw ?? 0;
    ramp.add(asset);
  }).catch(error => noteAssetFailure(scraproadRacekartManifest[spec.asset].obj, error));
  const surface: RampSurface = { group: ramp, deck, position: new THREE.Vector3(x, baseHeight, z), rotation, width, length, baseHeight, rise, kind: spec.kind, label: spec.label ?? spec.asset };
  ramps.push(surface); aimSurfaces.push(deck);
  const helper = new THREE.BoxHelper(deck, 0x5dff8a); helper.visible = false; scene.add(helper); debugVisuals.push(helper);
}

function addBarrier(x: number, z: number, rotation: number, length: number, boundary = false): void {
  const material = new THREE.MeshStandardMaterial({ color: boundary ? 0x633829 : 0x6e4a35, roughness: .88, metalness: .22 });
  const barrier = new THREE.Mesh(new THREE.BoxGeometry(length, 1.35, .8), material);
  barrier.position.set(x, getGroundHeight(x, z) + .68, z); barrier.rotation.y = rotation; barrier.castShadow = false; barrier.receiveShadow = true;
  barrier.material.transparent = true; barrier.material.opacity = .12; barrier.material.depthWrite = false; scene.add(barrier);
  instantiateRacekartAsset("fence").then(asset => {
    const sourceSize = (asset.userData.sourceSize as THREE.Vector3 | undefined) ?? new THREE.Vector3(1, .4, .05);
    asset.name = boundary ? "racekart-hilly-arena-fence" : "racekart-hilly-scrap-fence";
    asset.scale.set(length / sourceSize.x, (boundary ? 2.6 : 1.8) / sourceSize.y, .8 / sourceSize.z);
    asset.position.set(x, getGroundHeight(x, z), z);
    asset.rotation.y = rotation;
    scene.add(asset);
  }).catch(error => noteAssetFailure(scraproadRacekartManifest.fence.obj, error));
  boxColliders.push({ position: new THREE.Vector3(x, 0, z), halfWidth: length * .5, halfLength: .4, rotation, label: boundary ? "arena wall" : "scrap barrier" });
  const helper = new THREE.BoxHelper(barrier, 0xffb347); helper.visible = false; scene.add(helper); debugVisuals.push(helper);
}

function addWorldProps(): void {
  activeLayout.props.forEach(placement => {
    placeRacekartAsset(placement);
    const scale = placement.scale ?? 10;
    if (placement.asset === "rockWide" || placement.asset === "rockTall") {
      obstacles.push({
        position: new THREE.Vector3(placement.x, 0, placement.z),
        radius: scale * .48,
        top: getGroundHeight(placement.x, placement.z) + scale,
        label: "racekart rock",
      });
    }
    if (placement.asset === "hayBale") {
      obstacles.push({
        position: new THREE.Vector3(placement.x, 0, placement.z),
        radius: scale * .3,
        top: getGroundHeight(placement.x, placement.z) + scale * .55,
        label: "hay obstacle",
      });
    }
  });
  const grassPatches = activeLayout.id === "stuntworks"
    ? [[-124,-38],[-93,114],[-47,116],[48,116],[102,96],[124,42],[122,-104],[-105,-106]]
    : [[-101,-48],[-96,83],[-45,104],[48,104],[100,68],[103,-73],[-69,-101]];
  for (const [x, z] of grassPatches) {
    placeRacekartAsset({ asset: "terrainFlat", x, z, scale: 25, label: "terrain patch" });
  }
}

function rampSample(x: number, z: number): { ramp: RampSurface; height: number; localZ: number } | null {
  for (const ramp of ramps) {
    const dx = x - ramp.position.x, dz = z - ramp.position.z;
    const localX = dx * Math.cos(ramp.rotation) - dz * Math.sin(ramp.rotation);
    const localZ = dx * Math.sin(ramp.rotation) + dz * Math.cos(ramp.rotation);
    const entry = -ramp.length * .5;
    if (Math.abs(localX) <= ramp.width * .5 && localZ >= entry - RAMP_ENTRY_BLEND && localZ <= ramp.length * .5) {
      const rampProgress = THREE.MathUtils.clamp((localZ - entry) / ramp.length, 0, 1);
      const rampHeight = ramp.baseHeight + rampProgress * ramp.rise + .25;
      if (localZ < entry) {
        const blend = THREE.MathUtils.smoothstep(localZ, entry - RAMP_ENTRY_BLEND, entry);
        return { ramp, height: THREE.MathUtils.lerp(getGroundHeight(x, z), rampHeight, blend), localZ };
      }
      return { ramp, height: rampHeight, localZ };
    }
  }
  return null;
}

function getDriveHeight(x: number, z: number): number {
  return rampSample(x, z)?.height ?? getGroundHeight(x, z);
}

function resolveBoxCollision(collider: BoxCollider, sampleOffset: number): boolean {
  const sampleX = vehicle.position.x + Math.sin(vehicle.heading) * sampleOffset;
  const sampleZ = vehicle.position.z + Math.cos(vehicle.heading) * sampleOffset;
  const dx = sampleX - collider.position.x, dz = sampleZ - collider.position.z;
  const cosine = Math.cos(collider.rotation), sine = Math.sin(collider.rotation);
  const localX = dx * cosine - dz * sine, localZ = dx * sine + dz * cosine;
  const closestX = THREE.MathUtils.clamp(localX, -collider.halfWidth, collider.halfWidth);
  const closestZ = THREE.MathUtils.clamp(localZ, -collider.halfLength, collider.halfLength);
  let pushX = localX - closestX, pushZ = localZ - closestZ;
  const distance = Math.hypot(pushX, pushZ);
  if (distance >= VEHICLE_COLLIDER_RADIUS) return false;
  let correction: number;
  if (distance < .001) {
    const escapeX = collider.halfWidth + VEHICLE_COLLIDER_RADIUS - Math.abs(localX);
    const escapeZ = collider.halfLength + VEHICLE_COLLIDER_RADIUS - Math.abs(localZ);
    if (escapeX < escapeZ) { pushX = Math.sign(localX || 1); pushZ = 0; correction = escapeX + .02; }
    else { pushX = 0; pushZ = Math.sign(localZ || 1); correction = escapeZ + .02; }
  } else { pushX /= distance; pushZ /= distance; correction = VEHICLE_COLLIDER_RADIUS - distance + .02; }
  const worldX = pushX * cosine + pushZ * sine, worldZ = -pushX * sine + pushZ * cosine;
  vehicle.position.x += worldX * correction; vehicle.position.z += worldZ * correction;
  return true;
}

function resolveObstacleCollision(obstacle: Obstacle, sampleOffset: number): boolean {
  const sampleX = vehicle.position.x + Math.sin(vehicle.heading) * sampleOffset;
  const sampleZ = vehicle.position.z + Math.cos(vehicle.heading) * sampleOffset;
  const dx = sampleX - obstacle.position.x, dz = sampleZ - obstacle.position.z;
  const distance = Math.hypot(dx, dz);
  const minimum = obstacle.radius + VEHICLE_COLLIDER_RADIUS;
  if (distance >= minimum) return false;
  const normalX = distance > .001 ? dx / distance : Math.sin(vehicle.heading);
  const normalZ = distance > .001 ? dz / distance : Math.cos(vehicle.heading);
  const correction = minimum - distance + .02;
  vehicle.position.x += normalX * correction;
  vehicle.position.z += normalZ * correction;
  return true;
}

function registerPhysicsDebug(): void {
  const material = new THREE.MeshBasicMaterial({ color: 0xff8d3a, wireframe: true, transparent: true, opacity: .65 });
  for (const obstacle of obstacles) {
    const ground = getGroundHeight(obstacle.position.x, obstacle.position.z);
    const height = Math.max(.12, obstacle.top - ground);
    const marker = new THREE.Mesh(new THREE.CylinderGeometry(obstacle.radius, obstacle.radius, height, 18), material);
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
let vehicleColliderDebug: THREE.Mesh;

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
      object.castShadow = true;
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
  vehicleColliderDebug = new THREE.Mesh(
    new THREE.BoxGeometry(VEHICLE_COLLIDER_RADIUS * 2, VEHICLE_COLLIDER_HEIGHT, (VEHICLE_COLLIDER_HALF_LENGTH + VEHICLE_COLLIDER_RADIUS) * 2),
    new THREE.MeshBasicMaterial({ color: 0x4cfff0, wireframe: true, transparent: true, opacity: .8 }),
  );
  vehicleColliderDebug.position.y = .52;
  vehicleColliderDebug.visible = false;
  car.add(vehicleColliderDebug);
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
const weaponStats: WeaponStats = {
  fireRate: stats.fireRate,
  damage: stats.weaponDamage,
  projectileSpeed: stats.projectileSpeed,
  range: 136,
  automatic: false,
};
const equipped: Partial<Record<VehiclePartSlot, VehiclePart>> = {};
const vehicle = {
  position: new THREE.Vector3(0,0,-28), heading: 0, speed: 0, driftAngle: 0, verticalVelocity: 0,
  pitch: 0, roll: 0, grounded: true, activeRamp: null as RampSurface | null, health: 100, boost: 100, collisionCooldown: 0,
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
const bulletGeometry = new THREE.BoxGeometry(.09,.09,.72);
const dustGeometry = new THREE.SphereGeometry(.3,6,4);
const debrisGeometry = new THREE.DodecahedronGeometry(.14,0);
const muzzleFlash = new THREE.PointLight(0xff8a24, 8, 5, 2);
muzzleFlash.visible = false; scene.add(muzzleFlash);
let fireCooldown=0; let isFireHeld=false; let muzzleFlashLife=0; let weaponStateLife=0;
let messageTimer=0; let paused=false; let cameraMode=0; let elapsed=0;
const rampSmokeTest = new URLSearchParams(location.search).get("physics-smoke") === "ramp";
const bridgeSmokeTest = new URLSearchParams(location.search).get("physics-smoke") === "bridge";
const holdFireSmokeTest = new URLSearchParams(location.search).get("input-smoke") === "hold-fire";
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

const shotOrigin = new THREE.Vector3();
const shotDirection = new THREE.Vector3();
const projectileForward = new THREE.Vector3(0,0,1);

function shoot(): boolean {
  if(paused || vehicle.health<=0 || !aimReady || fireCooldown > 0 || bullets.length >= 120) return false;
  fireCooldown = 1 / weaponStats.fireRate;
  muzzle.getWorldPosition(shotOrigin);
  shotDirection.copy(aimPoint).sub(shotOrigin).normalize(); currentAimDirection.copy(shotDirection);
  const mesh=new THREE.Mesh(bulletGeometry,bulletMaterial);mesh.position.copy(shotOrigin);
  mesh.quaternion.setFromUnitVectors(projectileForward,shotDirection);scene.add(mesh);
  bullets.push({mesh,velocity:shotDirection.clone().multiplyScalar(weaponStats.projectileSpeed),life:weaponStats.range/weaponStats.projectileSpeed});
  canvas.dataset.shotsFired=String(Number(canvas.dataset.shotsFired??0)+1);
  ui.weaponState.textContent="FIRING"; weaponStateLife=.08;
  muzzleFlash.position.copy(shotOrigin); muzzleFlash.visible=true; muzzleFlashLife=.045;
  return true;
}

function setFireHeld(held: boolean): void {
  isFireHeld = held;
  canvas.dataset.fireHeld = String(held);
  if (held) shoot();
}

function updateWeapon(dt: number): void {
  fireCooldown = Math.max(0, fireCooldown - dt);
  weaponStateLife = Math.max(0, weaponStateLife - dt);
  muzzleFlashLife = Math.max(0, muzzleFlashLife - dt);
  if (weaponStateLife === 0 && ui.weaponState.textContent === "FIRING") ui.weaponState.textContent = "READY";
  if (muzzleFlashLife === 0) muzzleFlash.visible = false;
  if (isFireHeld) shoot();
}

function spawnDust(dt:number): void {
  if(dust.length>=80 || Math.abs(vehicle.speed)<3 || Math.random()>dt*Math.min(Math.abs(vehicle.speed),20)*1.5) return;
  const behind=new THREE.Vector3(-Math.sin(vehicle.heading)*2,0,-Math.cos(vehicle.heading)*2);
  const mesh=new THREE.Mesh(dustGeometry,dustMaterial.clone());mesh.scale.setScalar(.6+Math.random()*.7);
  mesh.position.copy(vehicle.position).add(behind).add(new THREE.Vector3((Math.random()-.5)*1.8,.25,(Math.random()-.5)*.8));scene.add(mesh);
  dust.push({mesh,life:.7+Math.random()*.5,velocity:new THREE.Vector3((Math.random()-.5)*.5,.45+Math.random()*.3,(Math.random()-.5)*.5)});
}

function explode(position:THREE.Vector3): void {
  for(let i=0;i<Math.min(12,80-dust.length);i++){
    const mesh=new THREE.Mesh(debrisGeometry,new THREE.MeshBasicMaterial({color:i%3===0?0xffc34e:0xb84a29}));mesh.scale.setScalar(.6+Math.random());
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
  weaponStats.fireRate=stats.fireRate;weaponStats.damage=stats.weaponDamage;weaponStats.projectileSpeed=stats.projectileSpeed;
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
  vehicle.position.x+=Math.sin(moveAngle)*vehicle.speed*dt;vehicle.position.z+=Math.cos(moveAngle)*vehicle.speed*dt;

  let collided=false;
  const arenaDistance=Math.hypot(vehicle.position.x,vehicle.position.z);
  const boundaryLimit=ARENA_RADIUS-(VEHICLE_COLLIDER_HALF_LENGTH+VEHICLE_COLLIDER_RADIUS);
  if(arenaDistance>boundaryLimit){const nx=vehicle.position.x/arenaDistance,nz=vehicle.position.z/arenaDistance;vehicle.position.x=nx*boundaryLimit;vehicle.position.z=nz*boundaryLimit;collided=true;showMessage("BOUNDARY IMPACT // TURN BACK");}
  for(const obstacle of obstacles){
    if(vehicle.position.y > obstacle.top+.2)continue;
    for(const offset of [-VEHICLE_COLLIDER_HALF_LENGTH,0,VEHICLE_COLLIDER_HALF_LENGTH]) {
      if(resolveObstacleCollision(obstacle,offset))collided=true;
    }
  }
  for(const collider of boxColliders) {
    for(const offset of [-VEHICLE_COLLIDER_HALF_LENGTH,0,VEHICLE_COLLIDER_HALF_LENGTH]) {
      if(resolveBoxCollision(collider,offset))collided=true;
    }
  }

  const rampBefore=vehicle.activeRamp;
  let rampNow=rampSample(vehicle.position.x,vehicle.position.z);
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
  vehicle.pitch=vehicle.grounded?Math.atan2(backY-frontY,4):0;vehicle.roll=(vehicle.grounded?Math.atan2(leftY-rightY,2.4):0)+(drifting?steer*.055*speedRatio:0);
  wheels.forEach(wheel=>wheel.rotation.x+=vehicle.speed*dt/.57);frontWheelPivots.forEach(pivot=>pivot.rotation.y=THREE.MathUtils.damp(pivot.rotation.y,-steer*.38,12,dt));
  for(const pickup of pickups){if(!pickup.collected&&pickup.group.position.distanceTo(vehicle.position)<2.25)equipPickup(pickup);}
  for(const target of targets){if(target.alive&&target.group.position.distanceTo(vehicle.position)<1.85&&Math.abs(vehicle.speed)>5){damageTarget(target,Math.abs(vehicle.speed)*1.8);vehicle.speed*=-.35;hitVehicle(4);}}
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
  for(let i=bullets.length-1;i>=0;i--){const bullet=bullets[i];bullet.mesh.position.addScaledVector(bullet.velocity,dt);bullet.life-=dt;let hit=false;for(const target of targets){if(!target.alive)continue;const dx=bullet.mesh.position.x-target.group.position.x,dy=bullet.mesh.position.y-target.group.position.y-1.4,dz=bullet.mesh.position.z-target.group.position.z;if(dx*dx+dy*dy+dz*dz<1){damageTarget(target,weaponStats.damage);hit=true;break;}}const hitTerrain=bullet.mesh.position.y<=getDriveHeight(bullet.mesh.position.x,bullet.mesh.position.z)+.08;if(hit||hitTerrain||bullet.life<=0){scene.remove(bullet.mesh);bullets.splice(i,1);}}
  for(let i=dust.length-1;i>=0;i--){const p=dust[i];p.life-=dt;p.mesh.position.addScaledVector(p.velocity,dt);p.velocity.y-=3.5*dt;p.mesh.scale.multiplyScalar(1+dt*.55);const material=p.mesh.material as THREE.MeshBasicMaterial;material.opacity=Math.max(0,Math.min(material.opacity,p.life*.45));if(p.life<=0){scene.remove(p.mesh);material.dispose();dust.splice(i,1);}}
  for(const target of targets){if(!target.alive)continue;if(target.hitFlash>0){target.hitFlash-=dt;const body=target.group.getObjectByName("target-body") as THREE.Mesh<THREE.BufferGeometry,THREE.MeshStandardMaterial>;body.material.emissive.setHex(0xff6b2c);}else{const body=target.group.getObjectByName("target-body") as THREE.Mesh<THREE.BufferGeometry,THREE.MeshStandardMaterial>;body.material.emissive.setHex(0x000000);}}
}

const cameraLook=new THREE.Vector3();
const cameraForward=new THREE.Vector3();
const cameraDesired=new THREE.Vector3();
const cameraTarget=new THREE.Vector3();
function updateCamera(dt:number): void {
  cameraForward.set(Math.sin(car.rotation.y),0,Math.cos(car.rotation.y));
  cameraDesired.copy(car.position);
  if(cameraMode===0)cameraDesired.addScaledVector(cameraForward,-11.5).y+=6.3;
  else{cameraDesired.y+=23;cameraDesired.z-=.01;}
  camera.position.lerp(cameraDesired,1-Math.exp(-6.5*dt));
  cameraTarget.copy(car.position).addScaledVector(cameraForward,cameraMode===0?4:0);cameraTarget.y+=1.2;
  cameraLook.lerp(cameraTarget,1-Math.exp(-9*dt));camera.lookAt(cameraLook);
}

function updatePickups(dt:number):void{for(const pickup of pickups){if(pickup.collected)continue;pickup.group.rotation.y+=dt*.8;const item=pickup.group.children[2];item.position.y=1.1+Math.sin(elapsed*2.4+pickup.group.position.x)*.18;}}

function updateHud():void{ui.speed.textContent=String(Math.round(Math.abs(vehicle.speed)*4.2));ui.boost.textContent=String(Math.round(vehicle.boost));ui.health.textContent=String(Math.round(vehicle.health));ui.healthBar.style.width=`${vehicle.health/stats.maxHealth*100}%`;canvas.dataset.groundContact=vehicle.grounded?(vehicle.activeRamp?vehicle.activeRamp.kind:"terrain"):"airborne";canvas.dataset.aimRay=aimReady?"locked":"searching";canvas.dataset.aimPoint=`${aimPoint.x.toFixed(1)},${aimPoint.y.toFixed(1)},${aimPoint.z.toFixed(1)}`;canvas.dataset.vehiclePosition=`${vehicle.position.x.toFixed(1)},${vehicle.position.y.toFixed(1)},${vehicle.position.z.toFixed(1)}`;if(rampSmokeTest&&vehicle.activeRamp?.kind==="ramp")canvas.dataset.rampDriveUp="passed";if(rampSmokeTest&&!vehicle.grounded&&canvas.dataset.rampDriveUp==="passed")canvas.dataset.rampLaunch="passed";if(bridgeSmokeTest&&vehicle.activeRamp?.kind==="bridge"){canvas.dataset.bridgeDriveUp="passed";if(vehicle.position.y>getGroundHeight(vehicle.position.x,vehicle.position.z)+3)canvas.dataset.bridgeCrossing="passed";}}

function drawRadar():void{const context=ui.radar.getContext("2d");if(!context)return;const size=160,center=80,scale=.58;context.clearRect(0,0,size,size);context.strokeStyle="rgba(213,183,119,.13)";context.lineWidth=1;for(const radius of [24,48,72]){context.beginPath();context.arc(center,center,radius,0,Math.PI*2);context.stroke();}context.beginPath();context.moveTo(center,8);context.lineTo(center,152);context.moveTo(8,center);context.lineTo(152,center);context.stroke();const plot=(x:number,z:number,color:string,radius:number)=>{const dx=(x-vehicle.position.x)*scale,dz=(z-vehicle.position.z)*scale;const angle=-vehicle.heading;const px=dx*Math.cos(angle)-dz*Math.sin(angle),py=dx*Math.sin(angle)+dz*Math.cos(angle);if(Math.hypot(px,py)>73)return;context.fillStyle=color;context.beginPath();context.arc(center+px,center-py,radius,0,Math.PI*2);context.fill();};pickups.forEach(p=>{if(!p.collected)plot(p.group.position.x,p.group.position.z,"#57dbe3",2.7)});targets.forEach(t=>{if(t.alive)plot(t.group.position.x,t.group.position.z,"#ef6846",3)});context.save();context.translate(center,center);context.fillStyle="#f3ce79";context.beginPath();context.moveTo(0,-7);context.lineTo(5,6);context.lineTo(0,3);context.lineTo(-5,6);context.closePath();context.fill();context.restore();}

const previousVehiclePosition = new THREE.Vector3(0,0,-28);
let previousVehicleHeading=0;let previousVehiclePitch=0;let previousVehicleRoll=0;

function capturePhysicsPose():void{
  previousVehiclePosition.copy(vehicle.position);previousVehicleHeading=vehicle.heading;previousVehiclePitch=vehicle.pitch;previousVehicleRoll=vehicle.roll;
}

function interpolateAngle(from:number,to:number,alpha:number):number{
  const delta=Math.atan2(Math.sin(to-from),Math.cos(to-from));return from+delta*alpha;
}

function updateVehicleVisual(alpha:number):void{
  car.position.lerpVectors(previousVehiclePosition,vehicle.position,alpha);
  car.rotation.set(
    THREE.MathUtils.lerp(previousVehiclePitch,vehicle.pitch,alpha),
    interpolateAngle(previousVehicleHeading,vehicle.heading,alpha),
    THREE.MathUtils.lerp(previousVehicleRoll,vehicle.roll,alpha),
    "YXZ",
  );
}

function resetVehicle():void{
  const spawn = activeLayout.spawn;
  setFireHeld(false);vehicle.position.set(spawn.x,getGroundHeight(spawn.x,spawn.z)+.06,spawn.z);vehicle.heading=spawn.heading;vehicle.speed=0;vehicle.driftAngle=0;vehicle.verticalVelocity=0;vehicle.pitch=0;vehicle.roll=0;vehicle.grounded=true;vehicle.activeRamp=null;vehicle.health=Math.max(vehicle.health,Math.min(stats.maxHealth,65));vehicle.boost=100;capturePhysicsPose();car.position.copy(vehicle.position);car.rotation.set(0,spawn.heading,0);camera.position.set(spawn.x,vehicle.position.y+6.3,spawn.z-11.5);cameraLook.copy(vehicle.position);cameraLook.y+=1.2;showMessage("RIG RECOVERED // SYSTEMS ONLINE");
}

function togglePause(force?:boolean):void{if(!levelStarted)return;paused=force??!paused;if(paused)setFireHeld(false);ui.pause.hidden=!paused;}
function toggleControls(show?:boolean):void{ui.controls.classList.toggle("closed",show===undefined?!ui.controls.classList.contains("closed"):!show);}
function toggleDebug():void{if(!levelStarted)return;debugPhysics=!debugPhysics;debugVisuals.forEach(item=>item.visible=debugPhysics);vehicleColliderDebug.visible=debugPhysics;ui.debug.hidden=!debugPhysics;showMessage(debugPhysics?`PHYSICS DEBUG // ${vehicle.grounded?"GROUNDED":"AIRBORNE"}`:"PHYSICS DEBUG // OFF");}

canvas.dataset.assetsLoaded="0";canvas.dataset.assetErrors="0";canvas.dataset.assetManifest="scraproadAssetManifest";

function runSmokeRoutes(): void {
  if(rampSmokeTest){
    const ramp=ramps[0];
    const offset=new THREE.Vector3(0,0,-ramp.length*.5-3).applyAxisAngle(new THREE.Vector3(0,1,0),ramp.rotation);
    vehicle.position.set(ramp.position.x+offset.x,getGroundHeight(ramp.position.x+offset.x,ramp.position.z+offset.z)+.06,ramp.position.z+offset.z);
    vehicle.heading=ramp.rotation;car.position.copy(vehicle.position);
    canvas.dataset.rampDriveUp="pending";canvas.dataset.rampLaunch="pending";input.add("KeyW");
    for(let step=0;step<360&&canvas.dataset.rampLaunch!=="passed";step++){
      elapsed+=1/60;updateVehicle(1/60);updateHud();
    }
    input.delete("KeyW");canvas.dataset.physicsSmoke="complete";
  }
  if(bridgeSmokeTest){
    const bridge=ramps.find(surface=>surface.kind==="bridge");
    if(bridge){
      const offset=new THREE.Vector3(0,0,-bridge.length*.5-3).applyAxisAngle(new THREE.Vector3(0,1,0),bridge.rotation);
      vehicle.position.set(bridge.position.x+offset.x,getGroundHeight(bridge.position.x+offset.x,bridge.position.z+offset.z)+.06,bridge.position.z+offset.z);
      vehicle.heading=bridge.rotation;car.position.copy(vehicle.position);canvas.dataset.bridgeDriveUp="pending";canvas.dataset.bridgeCrossing="pending";input.add("KeyW");
      for(let step=0;step<520&&canvas.dataset.bridgeCrossing!=="passed";step++){elapsed+=1/60;updateVehicle(1/60);updateHud();}
      input.delete("KeyW");canvas.dataset.bridgeSmoke="complete";
    }
  }
  if(holdFireSmokeTest){
    aimPoint.copy(vehicle.position).add(new THREE.Vector3(0,1,40));aimReady=true;car.updateMatrixWorld(true);setFireHeld(true);
    for(let step=0;step<120;step++)updateWeapon(FIXED_TIMESTEP);
    setFireHeld(false);const smokeShots=Number(canvas.dataset.shotsFired??0);const shotLimit=Math.ceil(2*weaponStats.fireRate)+1;
    canvas.dataset.holdFireSmoke=smokeShots>=2&&smokeShots<=shotLimit?"passed":"failed";canvas.dataset.fireRateLimited=smokeShots<=shotLimit?"passed":"failed";canvas.dataset.holdFireShots=String(smokeShots);
  }
}

function startLevel(levelId: ScraproadLevelId): void {
  if (levelStarted) return;
  activeLayout = scraproadArenaLayouts[levelId]; ARENA_RADIUS = activeLayout.radius;
  addArena(); addWorldProps(); registerPhysicsDebug(); buildCar();
  activeLayout.pickups.forEach(pickup => createPickup(pickup.x, pickup.z, pickup.kind));
  activeLayout.targets.forEach(target => createTarget(target.x, target.z, target.rotation));
  ui.targets.textContent = String(activeLayout.targets.length);
  ui.objective.innerHTML = `<small>${activeLayout.callsign}</small><b>${activeLayout.objective}</b>`;
  canvas.dataset.prototype="scraproad-1v1-foundation";canvas.dataset.arenaLayout=activeLayout.id;canvas.dataset.arenaRadius=String(ARENA_RADIUS);canvas.dataset.rampColliders=String(ramps.filter(ramp=>ramp.kind==="ramp").length);canvas.dataset.bridgeColliders=String(ramps.filter(ramp=>ramp.kind==="bridge").length);canvas.dataset.majorColliders=String(obstacles.length+boxColliders.length);canvas.dataset.vehicleCollider="low-capsule-2.24x4.14x0.72";canvas.dataset.shotsFired="0";canvas.dataset.fireHeld="false";canvas.dataset.racekartAssets="modular-racekart-track-hilly";
  levelStarted = true; paused = false; ui.levelSelect.hidden = true; resetVehicle(); runSmokeRoutes();
  showMessage(rampSmokeTest?"RAMP SMOKE TEST // AUTO DRIVE":bridgeSmokeTest?"BRIDGE SMOKE TEST // AUTO DRIVE":holdFireSmokeTest?"HOLD-FIRE SMOKE TEST // COMPLETE":`${activeLayout.name.toUpperCase()} // DEPLOYED`);
}

document.querySelectorAll<HTMLButtonElement>("[data-level]").forEach(button => {
  button.addEventListener("click", () => startLevel(button.dataset.level as ScraproadLevelId));
});
const requestedLevel = new URLSearchParams(location.search).get("level") as ScraproadLevelId | null;
if (rampSmokeTest || bridgeSmokeTest || holdFireSmokeTest || (requestedLevel && requestedLevel in scraproadArenaLayouts)) startLevel(requestedLevel && requestedLevel in scraproadArenaLayouts ? requestedLevel : defaultScraproadLevel);

window.addEventListener("keydown",event=>{if(["KeyW","KeyA","KeyS","KeyD","Space","ShiftLeft","KeyF","F3"].includes(event.code))event.preventDefault();if(event.repeat||!levelStarted)return;if(event.code==="Escape"){togglePause();return;}if(event.code==="KeyR")resetVehicle();if(event.code==="KeyC"){cameraMode=(cameraMode+1)%2;showMessage(cameraMode?"CAMERA // OVERWATCH":"CAMERA // CHASE");}if(event.code==="KeyB"||event.code==="KeyH"||event.code==="F3")toggleDebug();if(event.code==="KeyF")setFireHeld(true);input.add(event.code);});
window.addEventListener("keyup",event=>{input.delete(event.code);if(event.code==="KeyF")setFireHeld(false);});
canvas.addEventListener("pointermove",event=>{const bounds=canvas.getBoundingClientRect();mouse.x=(event.clientX-bounds.left)/bounds.width*2-1;mouse.y=-(event.clientY-bounds.top)/bounds.height*2+1;const crosshair=getElement("crosshair");crosshair.style.left=`${event.clientX}px`;crosshair.style.top=`${event.clientY}px`;});
canvas.addEventListener("pointerdown",event=>{if(event.button===0)setFireHeld(true);});
window.addEventListener("pointerup",event=>{if(event.button===0)setFireHeld(false);});
canvas.addEventListener("pointerleave",event=>{if(event.buttons&1)setFireHeld(false);});
window.addEventListener("blur",()=>{input.clear();setFireHeld(false);});
document.addEventListener("visibilitychange",()=>{if(document.hidden){input.clear();setFireHeld(false);}});
window.addEventListener("keydown", startSoundtrack, { capture: true });
window.addEventListener("pointerdown", startSoundtrack, { capture: true });
canvas.addEventListener("contextmenu",event=>event.preventDefault());
getElement("help-button").addEventListener("click",()=>toggleControls());getElement("controls-close").addEventListener("click",()=>toggleControls(false));getElement("resume-button").addEventListener("click",()=>togglePause(false));
document.querySelectorAll<HTMLButtonElement>("[data-key]").forEach(button=>{const code=button.dataset.key??"";const press=(event:PointerEvent)=>{event.preventDefault();if(code==="Fire")setFireHeld(true);else input.add(code);};const release=(event:PointerEvent)=>{event.preventDefault();if(code==="Fire")setFireHeld(false);else input.delete(code);};button.addEventListener("pointerdown",press);button.addEventListener("pointerup",release);button.addEventListener("pointercancel",release);button.addEventListener("pointerleave",release);});
window.addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));});

const clock=new THREE.Clock();let physicsAccumulator=0;let radarAccumulator=0;let hudAccumulator=0;let debugAccumulator=0;let frameAverage=1/60;let physicsStepMs=0;
function updateDebug(frameDelta:number):void{
  frameAverage=THREE.MathUtils.lerp(frameAverage,frameDelta,.08);debugAccumulator+=frameDelta;if(debugAccumulator<.2)return;debugAccumulator=0;
  const fps=frameAverage>0?1/frameAverage:0;const contact=vehicle.grounded?(vehicle.activeRamp?"RAMP":"TERRAIN"):"AIRBORNE";
  ui.debug.textContent=`COLLISION DEBUG\n${contact}  ${Math.abs(vehicle.speed*4.2).toFixed(0)} KM/H\n${fps.toFixed(0)} FPS  ${(frameAverage*1000).toFixed(1)} MS FRAME\n${physicsStepMs.toFixed(2)} MS PHYSICS  60 HZ\n${renderer.info.render.calls} DRAWS  ${renderer.info.render.triangles.toLocaleString()} TRIS\n${scene.children.length+bullets.length+dust.length} ACTIVE OBJECTS`;
  canvas.dataset.physicsFps="60";canvas.dataset.frameDeltaMs=(frameAverage*1000).toFixed(2);canvas.dataset.physicsStepMs=physicsStepMs.toFixed(2);
}
function animate():void{
  requestAnimationFrame(animate);const frameDelta=Math.min(clock.getDelta(),MAX_FRAME_DELTA);
  if(!paused&&levelStarted){
    physicsAccumulator=Math.min(physicsAccumulator+frameDelta,FIXED_TIMESTEP*MAX_PHYSICS_STEPS);
    const physicsStart=performance.now();let steps=0;
    while(physicsAccumulator>=FIXED_TIMESTEP&&steps<MAX_PHYSICS_STEPS){capturePhysicsPose();elapsed+=FIXED_TIMESTEP;updateVehicle(FIXED_TIMESTEP);updateWeapon(FIXED_TIMESTEP);updateProjectiles(FIXED_TIMESTEP);physicsAccumulator-=FIXED_TIMESTEP;steps++;}
    physicsStepMs=performance.now()-physicsStart;updateVehicleVisual(physicsAccumulator/FIXED_TIMESTEP);updateCamera(frameDelta);updateAim(frameDelta);updatePickups(frameDelta);hudAccumulator+=frameDelta;radarAccumulator+=frameDelta;if(hudAccumulator>.1){hudAccumulator=0;updateHud();}if(radarAccumulator>.1){radarAccumulator=0;drawRadar();}
  }else{physicsAccumulator=0;}
  renderer.render(scene,camera);updateDebug(frameDelta);
}
animate();

function getElement<T extends HTMLElement=HTMLElement>(id:string):T{const element=document.getElementById(id);if(!element)throw new Error(`Missing #${id}`);return element as T;}

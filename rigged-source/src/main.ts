import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { riggedAssetManifest, riggedVehicleCatalog, type RiggedVehicleId } from "./assets/riggedAssetManifest";
import { riggedRacekartManifest, type RacekartAssetKey } from "./assets/riggedRacekartManifest";
import {
  defaultRiggedLevel,
  riggedArenaLayouts,
  type AssetPlacement,
  type DriveSurfaceSpec,
  type RiggedArenaLayout,
  type RiggedLevelId,
} from "./game/rigged/RiggedArenaLayout";
import {
  buildHeightfieldCollider,
  createHeightfieldDebug,
  sampleHeightfield,
  type HeightfieldCollider,
} from "./game/rigged/DriveSurfaceCollider";
import {
  createOvalBankGeometry,
  createOvalFloorGeometry,
  createOvalRimCurtainGeometry,
  resolveOvalBoundary,
  sampleOvalBowl,
} from "./game/rigged/OvalBowlSurface";
import { RiggedCameraController, type RiggedCameraBounds } from "./game/rigged/RiggedCameraController";
import {
  applyCard,
  createTurretCard,
  createStarterRun,
  draftCards,
  isRunState,
  upgradeCards,
  type ScraproadRunState,
  type UpgradeCard,
  type WeaponKind,
} from "./game/rigged/RoguelikeRun";
import {
  cleanPlayerName,
  cleanRoomCode,
  RiggedMultiplayerClient,
  roomPlayers,
  type RiggedRoom,
  type RiggedRoomPick,
} from "./game/rigged/RiggedMultiplayer";
import "./style.css";

type WeaponStats = {
  fireRate: number;
  damage: number;
  projectileSpeed: number;
  range: number;
  automatic?: boolean;
};
type WeaponDefinition = WeaponStats & {
  kind: WeaponKind;
  label: string;
  stateLabel: string;
  impactColor: number;
  splashRadius?: number;
};
type VehicleStats = {
  maxHealth: number;
  acceleration: number;
  maxSpeed: number;
  handling: number;
  traction: number;
  boostPower?: number;
  armor?: number;
  ramPower?: number;
  stability?: number;
  weaponDamage: number;
  fireRate: number;
  projectileSpeed: number;
};
type Target = { group: THREE.Group; health: number; alive: boolean; hitFlash: number };
type Bullet = {
  id: number;
  mesh: THREE.Object3D;
  velocity: THREE.Vector3;
  life: number;
  kind: WeaponKind;
  owner: "player" | "opponent";
  damage: number;
  splashRadius: number;
  trailTimer: number;
  ricochetsRemaining: number;
  piercesRemaining: number;
  burnDps: number;
  burnDuration: number;
  hitOpponent: boolean;
  hitTargets: Set<Target>;
};
type DustParticle = { mesh: THREE.Mesh; life: number; velocity: THREE.Vector3 };
type VisualEffect = {
  group: THREE.Group;
  life: number;
  maxLife: number;
  kind: "impact" | "trail" | "laser";
  growth: number;
  sourceId?: number;
  meshes: THREE.Mesh[];
  lights: THREE.PointLight[];
};
type Obstacle = { position: THREE.Vector3; radius: number; top: number; label: string };
type BoxCollider = { position: THREE.Vector3; halfWidth: number; halfLength: number; rotation: number; label: string };
type DriveSurfaceKind = "ramp" | "bridge" | "track" | "terrain" | "wall";
type DriveSurfaceContact = {
  rotation: number;
  length: number;
  rise: number;
  kind: DriveSurfaceKind;
  label: string;
};
type RampSurface = DriveSurfaceContact & {
  group: THREE.Group;
  deck: THREE.Mesh;
  position: THREE.Vector3;
  width: number;
  baseHeight: number;
};
type DriveHeightfield = HeightfieldCollider<DriveSurfaceContact>;
type DriveSurfaceSample = { ramp: DriveSurfaceContact; height: number; localZ: number };

const canvas = getElement<HTMLCanvasElement>("game");

const ui = {
  health: getElement("health-value"), healthBar: getElement("health-bar"), boost: getElement("boost-value"), boostBar: getElement("boost-bar"),
  playerHealthTag: getElement("player-health-tag"), rivalHealthTag: getElement("rival-health-tag"),
  boostMeter: document.querySelector<HTMLElement>(".status-meter--boost")!, weapon: getElement("weapon-part"),
  weaponState: getElement("weapon-state"), message: getElement("message"), controls: getElement("controls"),
  pause: getElement("pause"), debug: getElement("physics-debug"), multiplayerLobby: getElement("multiplayer-lobby"),
  round: getElement("round-value"), playerRounds: getElement("player-rounds"), enemyRounds: getElement("enemy-rounds"),
  countdown: getElement("round-countdown"), countdownValue: getElement("round-countdown-value"), countdownArena: getElement("round-countdown-arena"),
  rivalHealth: getElement("rival-health-value"), rivalHealthBar: getElement("rival-health-bar"),
  cameraMode: getElement("camera-mode-value"),
  starterSelect: getElement("starter-select"), cardDraft: getElement("card-draft"), cardGrid: getElement("card-grid"),
  vehicleSelect: getElement("vehicle-select"), vehicleGrid: getElement("vehicle-grid"), vehicleTurn: getElement("vehicle-turn"), vehiclePickReveal: getElement("vehicle-pick-reveal"),
  draftEyebrow: getElement("draft-eyebrow"), draftTitle: getElement("card-draft-title"), draftSubtitle: getElement("draft-subtitle"),
  starterTurn: getElement("starter-turn"), starterPickReveal: getElement("starter-pick-reveal"), draftPickReveal: getElement("draft-pick-reveal"),
  roomEntry: getElement("room-entry"), roomWaiting: getElement("room-waiting"), playerName: getElement<HTMLInputElement>("player-name"),
  roomCodeInput: getElement<HTMLInputElement>("room-code-input"), roomCodeDisplay: getElement<HTMLButtonElement>("room-code-display"),
  roomPlayers: getElement("room-players"), roomStatus: getElement("room-status"), hostRoom: getElement<HTMLButtonElement>("host-room"),
  joinRoomForm: getElement<HTMLFormElement>("join-room-form"), addAI: getElement<HTMLButtonElement>("add-ai"), startRun: getElement<HTMLButtonElement>("start-run"),
  musicMuted: getElement<HTMLInputElement>("music-muted"),
  activeUpgrades: getElement("active-upgrades"), weaponSelect: getElement("weapon-select"),
};
const initialParams = new URLSearchParams(location.search);
const RUN_STORAGE_KEY = "rigged-roguelike-run-v1";
function loadRunState(): ScraproadRunState | null {
  try { const parsed=JSON.parse(sessionStorage.getItem(RUN_STORAGE_KEY)??"null") as unknown;return isRunState(parsed)?parsed:null; } catch { return null; }
}
function saveRunState():void { if(runState)sessionStorage.setItem(RUN_STORAGE_KEY,JSON.stringify(runState)); }
let runState: ScraproadRunState | null = loadRunState();
const readScoreParam = (key: string, maximum: number): number => THREE.MathUtils.clamp(Number.parseInt(initialParams.get(key) ?? "0", 10) || 0, 0, maximum);
let playerRoundWins=readScoreParam("pw",3),enemyRoundWins=readScoreParam("ew",3),currentRound=Math.max(1,readScoreParam("round",99) || 1),roundAwarded=false;
if(runState)runState.round=currentRound;
type RoundPhase = "loading" | "starter_turret_select" | "countdown" | "active" | "ended" | "card_select";
let roundPhase: RoundPhase = "loading";
const COUNTDOWN_SECONDS = 3.55;
const COUNTDOWN_DRIVE_WINDOW = .55;
let countdownEndsAt = 0;
let countdownShown = 3;
let roundTransitionTimer = 0;
let multiplayer: RiggedMultiplayerClient | null = null;
let activeRoom: RiggedRoom | null = null;
let renderedPickId = 0;
let pickAnimationActive = false;
let aiPickPending = false;
let lastStartedRoomRound = 0;
let selectedVehicleId:RiggedVehicleId=riggedAssetManifest.vehicle.defaultId;

function updateRoundHud():void{
  ui.round.textContent=String(currentRound).padStart(2,"0");
  ui.playerRounds.querySelectorAll("i").forEach((pip,index)=>pip.classList.toggle("won",index<playerRoundWins));
  ui.enemyRounds.querySelectorAll("i").forEach((pip,index)=>pip.classList.toggle("won",index<enemyRoundWins));
  canvas.dataset.currentRound=String(currentRound);canvas.dataset.playerRoundWins=String(playerRoundWins);canvas.dataset.enemyRoundWins=String(enemyRoundWins);
}

function awardPlayerRound():void{
  finishRound("player");
}

function awardEnemyRound():void{finishRound("opponent");}

const MAX_PIXEL_RATIO = 1.25;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, MAX_PIXEL_RATIO));
renderer.setSize(innerWidth, innerHeight, false);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7d8992);
scene.fog = new THREE.FogExp2(0x737a7e, 0.0068);
const textureLoader = new THREE.TextureLoader();
const skyTexture = textureLoader.load("./assets/cloudy-sky.png");
skyTexture.mapping = THREE.EquirectangularReflectionMapping;
skyTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = skyTexture;
scene.backgroundIntensity = .72;
scene.environment = skyTexture;
scene.environmentIntensity = .58;

function loadTilingTexture(path: string, repeatX = 1, repeatY = repeatX): THREE.Texture {
  const texture = textureLoader.load(path);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return texture;
}

const dirtyGroundTexture = loadTilingTexture("./assets/materials/dirty-arena-ground-v1.png");
const weatheredWallTexture = loadTilingTexture("./assets/materials/weathered-arena-metal-v1.png");
const grittyTurretTexture = loadTilingTexture("./assets/materials/gritty-turret-metal-v1.png", 2.4, 2.4);

function applyPlanarUv(geometry: THREE.BufferGeometry, worldTileSize = 7.5): void {
  const positions = geometry.getAttribute("position");
  const uvs = new Float32Array(positions.count * 2);
  for (let index = 0; index < positions.count; index++) {
    uvs[index * 2] = positions.getX(index) / worldTileSize;
    uvs[index * 2 + 1] = positions.getZ(index) / worldTileSize;
  }
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
}

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
  console.error(`[Rigged] Failed to load licensed asset: ${path}`, error);
}

function loadRacekartTemplate(key: RacekartAssetKey): Promise<THREE.Group> {
  const cached = racekartTemplates.get(key);
  if (cached) return cached;
  const definition = riggedRacekartManifest[key];
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
const cameraController = new RiggedCameraController(camera);

const hemi = new THREE.HemisphereLight(0xbccbd7, 0x3c3027, 1.35);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffead0, 3.25);
sun.position.set(-28, 42, -18);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -125; sun.shadow.camera.right = 125; sun.shadow.camera.top = 125; sun.shadow.camera.bottom = -125;
sun.shadow.camera.near = 2; sun.shadow.camera.far = 180;
sun.shadow.bias = -.00035; sun.shadow.normalBias = .035;
scene.add(sun);

const lightShafts = new THREE.Group();
lightShafts.name = "cloud-break-volumetric-light";
const shaftMaterial = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
  vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  fragmentShader: `varying vec2 vUv; void main(){float edge=pow(max(0.0,1.0-abs(vUv.x-.5)*2.0),1.8);float fade=smoothstep(0.0,.2,vUv.y)*(1.0-smoothstep(.7,1.0,vUv.y));gl_FragColor=vec4(1.0,.91,.76,edge*fade*.042);}`,
});
for (const [x, z, radius, tilt] of [[-48,-34,18,.08],[-12,8,13,-.05],[28,-10,17,.06],[54,34,12,-.08],[-62,48,10,.04]] as const) {
  const volume = new THREE.Group(); volume.position.set(x, 37, z); volume.rotation.z = tilt;
  for (const yaw of [0, Math.PI / 3, Math.PI * 2 / 3]) {
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(radius * 1.7, 78), shaftMaterial);
    sheet.rotation.y = yaw; sheet.renderOrder = -1; volume.add(sheet);
  }
  lightShafts.add(volume);
}
scene.add(lightShafts);

let atmosphereSeed = 0x5a17;
const atmosphericDustPositions = new Float32Array(760 * 3);
for (let index = 0; index < 760; index++) {
  atmosphereSeed = (atmosphereSeed * 1664525 + 1013904223) >>> 0; const x = atmosphereSeed / 0xffffffff;
  atmosphereSeed = (atmosphereSeed * 1664525 + 1013904223) >>> 0; const y = atmosphereSeed / 0xffffffff;
  atmosphereSeed = (atmosphereSeed * 1664525 + 1013904223) >>> 0; const z = atmosphereSeed / 0xffffffff;
  atmosphericDustPositions[index * 3] = (x - .5) * 236;
  atmosphericDustPositions[index * 3 + 1] = .6 + y * 22;
  atmosphericDustPositions[index * 3 + 2] = (z - .5) * 236;
}
const atmosphericDustGeometry = new THREE.BufferGeometry();
atmosphericDustGeometry.setAttribute("position", new THREE.BufferAttribute(atmosphericDustPositions, 3));
const atmosphericDust = new THREE.Points(atmosphericDustGeometry, new THREE.PointsMaterial({ color: 0xe2c9a4, size: .13, transparent: true, opacity: .22, depthWrite: false, blending: THREE.AdditiveBlending }));
atmosphericDust.name = "volumetric-dust-motes"; scene.add(atmosphericDust);

const warm = new THREE.MeshStandardMaterial({ color: 0xb85a3d, map: grittyTurretTexture, bumpMap: grittyTurretTexture, bumpScale: .025, roughness: .74, metalness: .48 });
const metal = new THREE.MeshStandardMaterial({ color: 0xc0beb5, map: grittyTurretTexture, bumpMap: grittyTurretTexture, bumpScale: .035, roughness: .48, metalness: .84 });
const darkMetal = new THREE.MeshStandardMaterial({ color: 0x747872, map: grittyTurretTexture, bumpMap: grittyTurretTexture, bumpScale: .04, roughness: .59, metalness: .82 });
const wallMetal = new THREE.MeshStandardMaterial({ color: 0xaeb2ae, map: weatheredWallTexture, bumpMap: weatheredWallTexture, bumpScale: .055, roughness: .48, metalness: .74, side: THREE.DoubleSide });
const sand = new THREE.MeshStandardMaterial({ color: 0xffffff, map: dirtyGroundTexture, bumpMap: dirtyGroundTexture, bumpScale: .07, roughness: .96, metalness: 0, vertexColors: true });
const rubber = new THREE.MeshStandardMaterial({ color: 0x101111, roughness: .9, metalness: .08 });
let activeLayout: RiggedArenaLayout = riggedArenaLayouts[defaultRiggedLevel];
let ARENA_RADIUS = activeLayout.radius;
let levelStarted = false;
let levelStarting = false;
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
const driveHeightfields: DriveHeightfield[] = [];
let debugPhysics = false;

const contactDebug = new THREE.Mesh(
  new THREE.SphereGeometry(.3, 10, 7),
  new THREE.MeshBasicMaterial({ color: 0x52fff0, depthTest: false }),
);
contactDebug.name = "vehicle-surface-contact"; contactDebug.renderOrder = 30; contactDebug.visible = false;
scene.add(contactDebug); debugVisuals.push(contactDebug);

const debugOrigin = new THREE.Vector3();
const debugUp = new THREE.ArrowHelper(new THREE.Vector3(0,1,0),debugOrigin,3.2,0x72ff68,.55,.28);
const debugSurfaceNormal = new THREE.ArrowHelper(new THREE.Vector3(0,1,0),debugOrigin,3.8,0x53fff1,.6,.3);
const debugSurfaceForward = new THREE.ArrowHelper(new THREE.Vector3(0,0,1),debugOrigin,4.5,0xffdc63,.65,.32);
const debugVelocity = new THREE.ArrowHelper(new THREE.Vector3(0,0,1),debugOrigin,3,0xff933f,.6,.3);
const debugWallContact = new THREE.ArrowHelper(new THREE.Vector3(1,0,0),debugOrigin,3.5,0xff4e4e,.6,.3);
const actualVehicleUp=new THREE.Vector3(0,1,0);
for(const arrow of [debugUp,debugSurfaceNormal,debugSurfaceForward,debugVelocity,debugWallContact]){
  arrow.visible=false;arrow.renderOrder=31;scene.add(arrow);debugVisuals.push(arrow);
}
const persistentSceneObjects = new Set<THREE.Object3D>();
const persistentDebugVisuals = new Set<THREE.Object3D>();

function getGroundHeight(x: number, z: number): number {
  if (activeLayout.arenaKind === "capsule" && activeLayout.bowl) {
    return sampleOvalBowl(activeLayout.bowl, x, z).height;
  }
  // The combat bowl is intentionally flat. A tiny visual undulation keeps the
  // dirt from feeling synthetic without upsetting steering or ramp seams.
  return Math.sin(x * .055) * Math.cos(z * .05) * .035;
}

function bowlSurfaceSample(x: number, z: number): DriveSurfaceSample | null {
  if (activeLayout.arenaKind !== "capsule" || !activeLayout.bowl) return null;
  const sample = sampleOvalBowl(activeLayout.bowl, x, z);
  if (sample.progress <= .001) return null;
  return {
    ramp: {
      kind: "wall",
      label: `${sample.band} capsule collider band`,
      rotation: Math.atan2(sample.outwardX, sample.outwardZ),
      length: activeLayout.bowl.outerRadius - activeLayout.bowl.flatRadius,
      rise: activeLayout.bowl.wallRise,
    },
    height: sample.height,
    localZ: sample.progress,
  };
}

function registerDriveHeightfield(
  object: THREE.Object3D,
  options: { label: string; x: number; z: number; rotation: number; width: number; length: number; kind: DriveSurfaceKind; contact?: DriveSurfaceContact },
): DriveHeightfield {
  const contact = options.contact ?? { kind: options.kind, label: options.label, rotation: options.rotation, length: options.length, rise: 0 };
  const collider = buildHeightfieldCollider(object, {
    label: options.label,
    centerX: options.x,
    centerZ: options.z,
    rotation: options.rotation,
    width: options.width,
    length: options.length,
    metadata: contact,
  });
  let minimum = Number.POSITIVE_INFINITY, maximum = Number.NEGATIVE_INFINITY, samples = 0;
  for (let index = 0; index < collider.heights.length; index++) {
    if (!collider.valid[index]) continue;
    minimum = Math.min(minimum, collider.heights[index]); maximum = Math.max(maximum, collider.heights[index]); samples++;
  }
  contact.rise = samples ? maximum - minimum : 0;
  driveHeightfields.push(collider); aimSurfaces.push(object);
  const debug = createHeightfieldDebug(collider, options.kind === "bridge" ? 0x53fff1 : options.kind === "ramp" ? 0xffbe55 : 0x72ff68);
  scene.add(debug); debugVisuals.push(debug);
  return collider;
}

async function placeRacekartAsset(placement: AssetPlacement): Promise<void> {
  try {
    const asset = await instantiateRacekartAsset(placement.asset);
    const scale = placement.scale ?? 10;
    const sourceSize = asset.userData.sourceSize as THREE.Vector3 | undefined;
    const definition = riggedRacekartManifest[placement.asset];
    const buriedTrackOffset = definition.category === "track" && sourceSize ? -sourceSize.y * scale + .08 : 0;
    asset.name = `racekart-hilly-${placement.asset}${placement.label ? `-${placement.label}` : ""}`;
    asset.scale.setScalar(scale);
    asset.position.set(placement.x, getGroundHeight(placement.x, placement.z) + (placement.y ?? buriedTrackOffset), placement.z);
    asset.rotation.y = placement.rotation ?? 0;
    scene.add(asset);
    if ((definition.category === "terrain" || definition.category === "track") && sourceSize) {
      registerDriveHeightfield(asset, {
        label: placement.label ?? placement.asset,
        x: placement.x,
        z: placement.z,
        rotation: placement.rotation ?? 0,
        width: sourceSize.x * scale,
        length: sourceSize.z * scale,
        kind: definition.category,
      });
    }
  } catch (error) {
    noteAssetFailure(riggedRacekartManifest[placement.asset].obj, error);
  }
}

function addSpawnMarker(x: number, z: number, heading: number, opponent = false): void {
  const pad = new THREE.Mesh(
    new THREE.RingGeometry(4.2, 5.2, 24),
    new THREE.MeshBasicMaterial({ color: opponent ? 0xa94b32 : 0xd89a46, side: THREE.DoubleSide, transparent: true, opacity: .68 }),
  );
  pad.rotateX(-Math.PI / 2); pad.rotation.z = heading; pad.position.set(x, getGroundHeight(x, z) + .11, z);
  pad.name = opponent ? "opponent-spawn-placeholder" : "player-spawn"; scene.add(pad);
}

async function addArena(): Promise<void> {
  if (activeLayout.arenaKind === "capsule") {
    await addOvalBowlArena();
    return;
  }
  const diameter = ARENA_RADIUS * 2 + 18;
  const geometry = new THREE.PlaneGeometry(diameter, diameter, 112, 112);
  geometry.rotateX(-Math.PI / 2);
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index++) {
    positions.setY(index, getGroundHeight(positions.getX(index), positions.getZ(index)));
  }
  applyPlanarUv(geometry);
  const groundColors = new Float32Array(positions.count * 3);
  const low = new THREE.Color(0xc2ad91), high = new THREE.Color(0xf0d4ab), color = new THREE.Color();
  for (let index = 0; index < positions.count; index++) {
    const x = positions.getX(index), z = positions.getZ(index);
    const variation = THREE.MathUtils.clamp(.46 + Math.sin(x * .19 + z * .13) * .1 + Math.cos(x * .07 - z * .11) * .06, 0, 1);
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

  const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x77716a, map: dirtyGroundTexture, bumpMap: dirtyGroundTexture, bumpScale: .035, roughness: .9, metalness: .04, side: THREE.DoubleSide });
  const ringTrackGeometry = new THREE.RingGeometry(activeLayout.ringInnerRadius, activeLayout.ringOuterRadius, 128);
  ringTrackGeometry.rotateX(-Math.PI / 2); applyPlanarUv(ringTrackGeometry);
  const ringTrack = new THREE.Mesh(ringTrackGeometry, trackMaterial);
  ringTrack.position.y = .055; ringTrack.receiveShadow = true; ringTrack.name = "continuous-circular-ring-track"; scene.add(ringTrack);

  const centerPadGeometry = new THREE.CircleGeometry(activeLayout.ringInnerRadius - 2.5, 96);
  centerPadGeometry.rotateX(-Math.PI / 2); applyPlanarUv(centerPadGeometry);
  const centerPad = new THREE.Mesh(
    centerPadGeometry,
    new THREE.MeshStandardMaterial({ color: 0xd0b38d, map: dirtyGroundTexture, bumpMap: dirtyGroundTexture, bumpScale: .07, roughness: .97, metalness: 0, side: THREE.DoubleSide }),
  );
  centerPad.position.y = .04; centerPad.receiveShadow = true; centerPad.name = "central-combat-bowl"; scene.add(centerPad);

  for (const [radius, color, width] of [
    [activeLayout.ringInnerRadius, 0xb96a32, .65],
    [activeLayout.ringOuterRadius, 0x8e938e, .85],
  ] as const) {
    const curb = new THREE.Mesh(new THREE.RingGeometry(radius - width, radius + width, 128), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
    curb.rotateX(-Math.PI / 2); curb.position.y = .075; curb.name = radius === activeLayout.ringInnerRadius ? "rust-inner-track-edge" : "concrete-outer-track-edge"; scene.add(curb);
  }
  const laneRadius = (activeLayout.ringInnerRadius + activeLayout.ringOuterRadius) * .5;
  for (let marker = 0; marker < 32; marker++) {
    const angle = marker / 32 * Math.PI * 2;
    const dash = new THREE.Mesh(new THREE.BoxGeometry(.32, .035, 4.8), new THREE.MeshBasicMaterial({ color: 0xc8aa74 }));
    dash.position.set(Math.sin(angle) * laneRadius, .095, Math.cos(angle) * laneRadius); dash.rotation.y = angle; dash.name = "ring-lane-marker"; scene.add(dash);
  }

  await Promise.all([
    ...activeLayout.terrain.map(placeRacekartAsset),
    ...activeLayout.track.map(placeRacekartAsset),
    ...activeLayout.surfaces.map(addRamp),
  ]);
  for (const barrier of activeLayout.barriers) addBarrier(barrier.x, barrier.z, barrier.rotation, barrier.length, barrier.boundary);
  for (let segment = 0; segment < 36; segment++) {
    const angle = segment / 36 * Math.PI * 2;
    addBarrier(Math.sin(angle) * (ARENA_RADIUS - 2), Math.cos(angle) * (ARENA_RADIUS - 2), angle, Math.PI * (ARENA_RADIUS - 2) / 18 + .6, true);
  }
  addSpawnMarker(activeLayout.spawn.x, activeLayout.spawn.z, activeLayout.spawn.heading);
  addSpawnMarker(activeLayout.opponentSpawn.x, activeLayout.opponentSpawn.z, activeLayout.opponentSpawn.heading, true);
}

async function addOvalBowlArena(): Promise<void> {
  if (!activeLayout.bowl) throw new Error("Capsule Circuit layout is missing its surface configuration");
  const bowl = activeLayout.bowl;
  const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: dirtyGroundTexture, bumpMap: dirtyGroundTexture, bumpScale: .07, vertexColors: true, roughness: .96, metalness: 0, side: THREE.DoubleSide });
  const floor = new THREE.Mesh(createOvalFloorGeometry(bowl), floorMaterial);
  floor.name = "capsule-flat-floor-collider";
  floor.receiveShadow = true;
  scene.add(floor); aimSurfaces.push(floor);

  const bankMaterial = new THREE.MeshStandardMaterial({ color: 0xd1d3cf, map: weatheredWallTexture, bumpMap: weatheredWallTexture, bumpScale: .05, vertexColors: true, roughness: .52, metalness: .64, side: THREE.DoubleSide });
  const bank = new THREE.Mesh(createOvalBankGeometry(bowl), bankMaterial);
  bank.name = "capsule-continuous-layered-wall-ride-surface";
  bank.receiveShadow = true;
  scene.add(bank); aimSurfaces.push(bank);

  const rim = new THREE.Mesh(
    createOvalRimCurtainGeometry(bowl),
    wallMetal,
  );
  rim.name = "capsule-solid-upper-guard-collider";
  rim.castShadow = false;
  rim.receiveShadow = true;
  scene.add(rim);

  const floorDebug = new THREE.Mesh(
    floor.geometry,
    new THREE.MeshBasicMaterial({ color: 0x72ff68, wireframe: true, transparent: true, opacity: .34, depthTest: false }),
  );
  floorDebug.name = "capsule-flat-floor-collider-debug";
  floorDebug.visible = false; floorDebug.renderOrder = 21;
  scene.add(floorDebug); debugVisuals.push(floorDebug);

  const bankDebug = new THREE.Mesh(
    bank.geometry,
    new THREE.MeshBasicMaterial({ color: 0x55ffe2, wireframe: true, transparent: true, opacity: .56, depthTest: false }),
  );
  bankDebug.name = "capsule-transition-and-bank-collider-debug";
  bankDebug.visible = false; bankDebug.renderOrder = 22;
  scene.add(bankDebug); debugVisuals.push(bankDebug);

  const guardDebug = new THREE.Mesh(
    rim.geometry,
    new THREE.MeshBasicMaterial({ color: 0xff6a42, wireframe: true, transparent: true, opacity: .72, depthTest: false }),
  );
  guardDebug.name = "capsule-upper-guard-collider-debug";
  guardDebug.visible = false; guardDebug.renderOrder = 23;
  scene.add(guardDebug); debugVisuals.push(guardDebug);

  const centerMark = new THREE.Mesh(
    new THREE.RingGeometry(7.2, 7.7, 48),
    new THREE.MeshBasicMaterial({ color: 0xa45a35, side: THREE.DoubleSide, transparent: true, opacity: .8 }),
  );
  centerMark.rotateX(-Math.PI / 2); centerMark.position.y = .08; centerMark.name = "capsule-center-mark"; scene.add(centerMark);
  for (let marker = -5; marker <= 5; marker++) {
    if (marker === 0) continue;
    const dash = new THREE.Mesh(new THREE.BoxGeometry(.28, .035, 4.6), new THREE.MeshBasicMaterial({ color: 0xb99a69 }));
    dash.position.set(0, .09, marker * 7.3); dash.name = "capsule-centerline-marker"; scene.add(dash);
  }

  await Promise.all([
    ...activeLayout.terrain.map(placeRacekartAsset),
    ...activeLayout.track.map(placeRacekartAsset),
    ...activeLayout.surfaces.map(addRamp),
  ]);
  for (const barrier of activeLayout.barriers) addBarrier(barrier.x, barrier.z, barrier.rotation, barrier.length, barrier.boundary);
  addSpawnMarker(activeLayout.spawn.x, activeLayout.spawn.z, activeLayout.spawn.heading);
  addSpawnMarker(activeLayout.opponentSpawn.x, activeLayout.opponentSpawn.z, activeLayout.opponentSpawn.heading, true);

  canvas.dataset.capsuleCollision = "three-disc-analytic-bands";
  canvas.dataset.bowlShape = "capsule";
  canvas.dataset.bankedWallColliders = "3";
  canvas.dataset.transitionCollider = "continuous";
  canvas.dataset.upperGuardCollider = "continuous";
  canvas.dataset.wallRideSurface = "continuous";
}

async function addRamp(spec: DriveSurfaceSpec): Promise<void> {
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
  const surface: RampSurface = { group: ramp, deck, position: new THREE.Vector3(x, baseHeight, z), rotation, width, length, baseHeight, rise, kind: spec.kind, label: spec.label ?? spec.asset };
  ramps.push(surface); aimSurfaces.push(deck);
  if (spec.kind === "bridge") {
    for (const side of [-width * .47, width * .47]) {
      const sideX = x + Math.cos(rotation) * side, sideZ = z - Math.sin(rotation) * side;
      boxColliders.push({ position: new THREE.Vector3(sideX, 0, sideZ), halfWidth: length * .5, halfLength: .35, rotation: rotation + Math.PI / 2, label: "bridge rail" });
    }
  }
  try {
    const asset = await instantiateRacekartAsset(spec.asset);
    const sourceSize = (asset.userData.sourceSize as THREE.Vector3 | undefined) ?? new THREE.Vector3(2, 1, 1);
    const visualHeight = Math.max(.7, spec.kind === "bridge" ? Math.max(spec.startHeight, spec.endHeight) : Math.abs(spec.endHeight - spec.startHeight));
    asset.name = `racekart-hilly-driveable-${spec.label ?? spec.asset}`;
    asset.scale.set(length / sourceSize.x, visualHeight / sourceSize.y, width / sourceSize.z);
    asset.position.y = Math.min(getGroundHeight(entryX, entryZ), getGroundHeight(exitX, exitZ));
    asset.rotation.y = spec.assetYaw ?? 0;
    ramp.add(asset);
    ramp.updateWorldMatrix(true, true);
    registerDriveHeightfield(asset, {
      label: surface.label,
      x,
      z,
      rotation,
      width: width * (spec.kind === "bridge" ? .72 : .94),
      length: length * .995,
      kind: spec.kind,
      contact: surface,
    });
  } catch (error) {
    noteAssetFailure(riggedRacekartManifest[spec.asset].obj, error);
  }
}

function addBarrier(x: number, z: number, rotation: number, length: number, boundary = false): void {
  const material = wallMetal.clone(); material.color.setHex(boundary ? 0x8a8f8b : 0x8f7667);
  const barrier = new THREE.Mesh(new THREE.BoxGeometry(length, 1.35, .8), material);
  barrier.position.set(x, getGroundHeight(x, z) + .68, z); barrier.rotation.y = rotation; barrier.castShadow = false; barrier.receiveShadow = true;
  barrier.material.transparent = true; barrier.material.opacity = .12; barrier.material.depthWrite = false; scene.add(barrier);
  instantiateRacekartAsset("fence").then(asset => {
    const sourceSize = (asset.userData.sourceSize as THREE.Vector3 | undefined) ?? new THREE.Vector3(1, .4, .05);
    asset.name = boundary ? "racekart-hilly-arena-fence" : "racekart-hilly-scrap-fence";
    asset.scale.set(length / sourceSize.x, (boundary ? 2.6 : 1.8) / sourceSize.y, .8 / sourceSize.z);
    asset.position.set(x, getGroundHeight(x, z), z);
    asset.rotation.y = rotation;
    asset.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = false; object.receiveShadow = true; object.material = wallMetal;
    });
    scene.add(asset);
  }).catch(error => noteAssetFailure(riggedRacekartManifest.fence.obj, error));
  boxColliders.push({ position: new THREE.Vector3(x, 0, z), halfWidth: length * .5, halfLength: .4, rotation, label: boundary ? "arena wall" : "scrap barrier" });
  const helper = new THREE.BoxHelper(barrier, 0xffb347); helper.visible = false; scene.add(helper); debugVisuals.push(helper);
}

async function addWorldProps(): Promise<void> {
  const propLoads = activeLayout.props.map(placement => {
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
    return placeRacekartAsset(placement);
  });
  await Promise.all(propLoads);
}

function analyticRampSample(x: number, z: number): DriveSurfaceSample | null {
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

function rampSample(x: number, z: number): DriveSurfaceSample | null {
  const ground = getGroundHeight(x, z);
  let best: DriveSurfaceSample | null = null;
  for (const collider of driveHeightfields) {
    const height = sampleHeightfield(collider, x, z);
    if (height === null || height < ground - .12) continue;
    if (!best || height > best.height) best = { ramp: collider.metadata, height, localZ: 0 };
  }
  return best ?? analyticRampSample(x, z) ?? bowlSurfaceSample(x, z);
}

function getDriveHeight(x: number, z: number): number {
  return rampSample(x, z)?.height ?? getGroundHeight(x, z);
}

function auditHeightfieldCoverage(): void {
  let complete = 0, raised = 0;
  for (const collider of driveHeightfields) {
    let validSamples = 0, maximumLift = 0;
    const cosine = Math.cos(collider.rotation), sine = Math.sin(collider.rotation);
    for (let row = 0; row < collider.rows; row++) {
      const localZ = -collider.length * .5 + row / (collider.rows - 1) * collider.length;
      for (let column = 0; column < collider.columns; column++) {
        const index = row * collider.columns + column;
        if (!collider.valid[index]) continue;
        validSamples++;
        const localX = -collider.width * .5 + column / (collider.columns - 1) * collider.width;
        const worldX = collider.center.x + localX * cosine + localZ * sine;
        const worldZ = collider.center.y - localX * sine + localZ * cosine;
        maximumLift = Math.max(maximumLift, collider.heights[index] - getGroundHeight(worldX, worldZ));
      }
    }
    if (validSamples > 0) complete++;
    if (maximumLift > .35) raised++;
  }
  canvas.dataset.heightfieldCoverage = complete === driveHeightfields.length ? "passed" : "failed";
  canvas.dataset.heightfieldCoverageCount = `${complete}/${driveHeightfields.length}`;
  canvas.dataset.raisedSurfaceColliders = String(raised);
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

function auditArenaFlow(): void {
  if (activeLayout.arenaKind === "capsule" && activeLayout.bowl) {
    const bowl = activeLayout.bowl;
    const floorSamples = [
      [0, 0], [-20, -24], [20, -24], [-20, 24], [20, 24], [0, -38], [0, 38],
    ];
    const floorClear = floorSamples.every(([x, z]) => sampleOvalBowl(bowl, x, z).progress === 0);
    const wallSamples = [
      [bowl.flatRadius + 7, 0], [-(bowl.flatRadius + 7), 0],
      [0, bowl.straightHalfLength + bowl.flatRadius + 7], [0, -(bowl.straightHalfLength + bowl.flatRadius + 7)],
    ];
    const wallsContinuous = wallSamples.every(([x, z]) => {
      const sample = sampleOvalBowl(bowl, x, z);
      return sample.progress > .25 && sample.progress < .75 && sample.height > 2;
    });
    canvas.dataset.ringSampleCount = String(floorSamples.length);
    canvas.dataset.ringClearSamples = String(floorSamples.length);
    canvas.dataset.ringTrackDrivable = wallsContinuous ? "passed" : "failed";
    canvas.dataset.centralCombatArea = floorClear ? "passed" : "failed";
    canvas.dataset.targetArea = activeLayout.targets.length >= 3 && activeLayout.targets.length <= 5 ? "passed" : "failed";
    canvas.dataset.futureSpawnSides = activeLayout.spawn.z * activeLayout.opponentSpawn.z < 0 ? "passed" : "failed";
    canvas.dataset.ovalBoundary = "enclosed";
    canvas.dataset.wallSeam = sampleOvalBowl(bowl, bowl.flatRadius + .05, 0).height < .01 ? "smooth" : "failed";
    return;
  }
  const laneRadius = (activeLayout.ringInnerRadius + activeLayout.ringOuterRadius) * .5;
  const sampleCount = 72;
  let clearSamples = 0;
  for (let sample = 0; sample < sampleCount; sample++) {
    const angle = sample / sampleCount * Math.PI * 2;
    const x = Math.sin(angle) * laneRadius, z = Math.cos(angle) * laneRadius;
    const obstacleBlocked = obstacles.some(obstacle => Math.hypot(x - obstacle.position.x, z - obstacle.position.z) < obstacle.radius + 2.2);
    const barrierBlocked = boxColliders.some(collider => {
      if (collider.label === "arena wall") return false;
      const dx = x - collider.position.x, dz = z - collider.position.z;
      const cosine = Math.cos(collider.rotation), sine = Math.sin(collider.rotation);
      const localX = dx * cosine - dz * sine, localZ = dx * sine + dz * cosine;
      return Math.abs(localX) < collider.halfWidth + 2.2 && Math.abs(localZ) < collider.halfLength + 2.2;
    });
    if (!obstacleBlocked && !barrierBlocked && Math.abs(getGroundHeight(x, z)) < .1) clearSamples++;
  }
  canvas.dataset.ringSampleCount = String(sampleCount);
  canvas.dataset.ringClearSamples = String(clearSamples);
  canvas.dataset.ringTrackDrivable = clearSamples === sampleCount ? "passed" : "failed";
  canvas.dataset.centralCombatArea = activeLayout.ringInnerRadius >= 50 ? "passed" : "failed";
  canvas.dataset.targetArea = activeLayout.targets.length >= 3 ? "passed" : "failed";
  canvas.dataset.futureSpawnSides = activeLayout.spawn.z * activeLayout.opponentSpawn.z < 0 ? "passed" : "failed";
}

const car = new THREE.Group();
const opponentCar = new THREE.Group();
const wheels: THREE.Object3D[] = [];
const frontWheelPivots: THREE.Object3D[] = [];
const turret = new THREE.Group();
const weaponDefinitions: Record<WeaponKind, WeaponDefinition> = {
  mg: { kind:"mg", label:"SCRAP RATTLER", stateLabel:"READY", fireRate:6.7, damage:15, projectileSpeed:58, range:136, automatic:true, impactColor:0xffb548 },
  rocket: { kind:"rocket", label:"HELLBOX ROCKETS", stateLabel:"ARMED", fireRate:.78, damage:82, projectileSpeed:34, range:112, automatic:false, impactColor:0xff5b20, splashRadius:5.4 },
  sniper: { kind:"sniper", label:"LONGLANCE RAIL", stateLabel:"CHARGED", fireRate:.58, damage:110, projectileSpeed:320, range:188, automatic:false, impactColor:0x67e7ff },
};
type TurretRig = { root: THREE.Group; barrelPivot: THREE.Group; muzzle: THREE.Object3D };
const turretRigs = new Map<WeaponKind, TurretRig>();
let selectedWeapon: WeaponKind = runState?.activeTurret ?? "mg";
let barrelPivot = new THREE.Group();
let muzzle = new THREE.Object3D();
let vehicleColliderDebug: THREE.Mesh;
let lastTurretSwapAt = -Infinity;
let vehicleFallback:THREE.Group|null=null;
let vehicleVisual:THREE.Group|null=null;
let vehicleLoadToken=0;
let vehicleMount:THREE.Mesh|null=null;
let vehicleBearing:THREE.Mesh|null=null;

function addScrapSupport(root: THREE.Group, spread = .4): void {
  for(const side of [-1,1]) {
    const support = new THREE.Mesh(new THREE.CylinderGeometry(.09,.13,.68,8),metal);
    support.position.set(side*spread,.12,.02); support.rotation.z=side*.42; support.castShadow=true; root.add(support);
  }
}

function createTurretRig(kind: WeaponKind): TurretRig {
  const root = new THREE.Group(); root.name = `turret-${kind}`;
  const pivot = new THREE.Group();
  let tip = new THREE.Object3D();
  if(kind === "mg") {
    const receiver = new THREE.Mesh(new THREE.DodecahedronGeometry(.48,0),darkMetal);
    receiver.scale.set(1,.7,1.28); receiver.position.set(0,.28,.1); receiver.castShadow=true; root.add(receiver);
    const ammoBox = new THREE.Mesh(new THREE.BoxGeometry(.82,.42,.5),metal);
    ammoBox.position.set(0,.18,-.52); ammoBox.rotation.x=.08; ammoBox.castShadow=true; root.add(ammoBox);
    addScrapSupport(root);
    const shield = new THREE.Mesh(new THREE.BoxGeometry(1.24,.72,.12),warm);
    shield.position.set(0,.24,.43); shield.rotation.x=-.12; shield.castShadow=true; root.add(shield);
    pivot.position.set(0,.34,.35); root.add(pivot);
    const jacket = new THREE.Mesh(new THREE.CylinderGeometry(.17,.2,.72,10),darkMetal);
    jacket.rotation.x=Math.PI/2; jacket.position.z=.34; jacket.castShadow=true; pivot.add(jacket);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.075,.095,1.82,10),metal);
    barrel.rotation.x=Math.PI/2; barrel.position.z=1.53; barrel.castShadow=true; pivot.add(barrel);
    const brake = new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.34,10),darkMetal);
    brake.rotation.x=Math.PI/2; brake.position.z=2.45; brake.castShadow=true; pivot.add(brake);
    const glow = new THREE.Mesh(new THREE.RingGeometry(.055,.13,10),new THREE.MeshBasicMaterial({color:0xff8b35}));
    glow.position.z=2.63; pivot.add(glow); tip.position.z=2.66; pivot.add(tip);
  } else if(kind === "rocket") {
    const receiver = new THREE.Mesh(new THREE.BoxGeometry(1.34,.58,1.18),darkMetal);
    receiver.position.set(0,.28,-.05); receiver.rotation.x=-.05; receiver.castShadow=true; root.add(receiver);
    const armor = new THREE.Mesh(new THREE.BoxGeometry(1.58,.72,.12),warm);
    armor.position.set(0,.28,.54); armor.rotation.x=-.13; armor.castShadow=true; root.add(armor);
    addScrapSupport(root,.5);
    pivot.position.set(0,.48,.18); root.add(pivot);
    const pod = new THREE.Mesh(new THREE.BoxGeometry(1.28,.9,1.72),darkMetal);
    pod.position.z=.62; pod.castShadow=true; pivot.add(pod);
    for(const x of [-.34,.34]) for(const y of [-.23,.23]) {
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(.19,.23,1.92,10),darkMetal);
      tube.rotation.x=Math.PI/2; tube.position.set(x,y,.72); tube.castShadow=true; pivot.add(tube);
      const collar = new THREE.Mesh(new THREE.TorusGeometry(.205,.045,7,12),warm);
      collar.position.set(x,y,1.69); pivot.add(collar);
      const throat = new THREE.Mesh(new THREE.CircleGeometry(.14,10),new THREE.MeshBasicMaterial({color:0xff6a24}));
      throat.position.set(x,y,1.7); pivot.add(throat);
    }
    const warning = new THREE.Mesh(new THREE.BoxGeometry(.86,.08,.04),new THREE.MeshBasicMaterial({color:0xffb53d}));
    warning.position.set(0,.48,1.5); pivot.add(warning);
    tip.position.z=1.86; pivot.add(tip);
  } else {
    const receiver = new THREE.Mesh(new THREE.BoxGeometry(1.12,.52,1.48),darkMetal);
    receiver.position.set(0,.29,.15); receiver.castShadow=true; root.add(receiver);
    const rearBlock = new THREE.Mesh(new THREE.BoxGeometry(.82,.46,.72),metal);
    rearBlock.position.set(0,.25,-.75); rearBlock.castShadow=true; root.add(rearBlock);
    addScrapSupport(root,.43);
    pivot.position.set(0,.43,.36); root.add(pivot);
    for(const x of [-.25,.25]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(.12,.12,3.18),metal);
      rail.position.set(x,0,1.52); rail.castShadow=true; pivot.add(rail);
    }
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(.085,.12,3.5,10),darkMetal);
    barrel.rotation.x=Math.PI/2; barrel.position.z=1.72; barrel.castShadow=true; pivot.add(barrel);
    const brake = new THREE.Mesh(new THREE.BoxGeometry(.68,.34,.48),darkMetal);
    brake.position.z=3.45; brake.castShadow=true; pivot.add(brake);
    for(const x of [-.27,.27]) {
      const port = new THREE.Mesh(new THREE.BoxGeometry(.13,.13,.62),new THREE.MeshBasicMaterial({color:0x58dff8}));
      port.position.set(x,0,3.47); pivot.add(port);
    }
    const optic = new THREE.Mesh(new THREE.BoxGeometry(.32,.26,.7),metal);
    optic.position.set(0,.39,.45); pivot.add(optic);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(.12,12),new THREE.MeshBasicMaterial({color:0x8bf3ff}));
    lens.position.set(0,.39,.81); pivot.add(lens);
    tip.position.z=3.76; pivot.add(tip);
  }
  root.visible = kind === selectedWeapon;
  return { root, barrelPivot:pivot, muzzle:tip };
}

function selectWeapon(kind: WeaponKind, announce = true): void {
  if(runState&&!runState.ownedTurrets.includes(kind)){if(announce)showMessage("TURRET SLOT LOCKED // EARN IT AFTER ROUND 3");return;}
  const now=performance.now()/1000;
  if(announce&&runState&&now-lastTurretSwapAt<runState.swapCooldown)return;
  lastTurretSwapAt=now;
  selectedWeapon = kind;
  if(runState){runState.activeTurret=kind;saveRunState();}
  const definition = weaponDefinitions[kind];
  applyActiveTurretStats();
  fireCooldown=0; setFireHeld(false);
  for(const [rigKind,rig] of turretRigs){rig.root.visible=rigKind===kind;if(rigKind===kind){barrelPivot=rig.barrelPivot;muzzle=rig.muzzle;}}
  ui.weapon.textContent=definition.label; ui.weaponState.textContent=definition.stateLabel;
  updateLoadoutUi();
  canvas.dataset.selectedTurret=kind; canvas.dataset.weaponVfx=kind==="rocket"?"large-world-detonation":kind==="sniper"?"tight-cyan-laser-tracer":"scrap-sparks";
  if(announce&&levelStarted)showMessage(`${definition.label} // ACTIVE TURRET`);
}

function isVehicleId(value:string|undefined):value is RiggedVehicleId{return Boolean(value&&value in riggedVehicleCatalog);}

function positionTurretForVehicle(id:RiggedVehicleId):void{
  const height=riggedVehicleCatalog[id].turretHeight;
  if(vehicleMount)vehicleMount.position.y=height-.16;
  if(vehicleBearing)vehicleBearing.position.y=height-.04;
  turret.position.y=height;
}

async function loadVehicleModel(id:RiggedVehicleId):Promise<void>{
  const definition=riggedVehicleCatalog[id],token=++vehicleLoadToken;
  canvas.dataset.vehicleAsset=`loading-kenney-${id}`;positionTurretForVehicle(id);
  try{
    const model=await instantiateAsset(definition.model);if(token!==vehicleLoadToken)return;
    model.name=`kenney-car-kit-${id}`;model.scale.setScalar(1.84);model.position.y=.06;
    const dustyTint=new THREE.Color(0xd8b08d);
    model.traverse(object=>{
      if(!(object instanceof THREE.Mesh))return;object.castShadow=true;
      const sourceMaterials=Array.isArray(object.material)?object.material:[object.material];
      const tintedMaterials=sourceMaterials.map(source=>{const material=source.clone();if(material instanceof THREE.MeshStandardMaterial){material.color.multiply(dustyTint);material.roughness=.78;material.metalness=.2;material.envMapIntensity=.55;}return material;});
      object.material=Array.isArray(object.material)?tintedMaterials:tintedMaterials[0];
    });
    vehicleVisual?.removeFromParent();vehicleFallback?.removeFromParent();wheels.length=0;frontWheelPivots.length=0;
    for(const nodeName of riggedAssetManifest.vehicle.wheelNodes){const wheel=model.getObjectByName(nodeName);if(!wheel)continue;wheels.push(wheel);if(nodeName.includes("front"))frontWheelPivots.push(wheel);}
    car.add(model);vehicleVisual=model;selectedVehicleId=id;canvas.dataset.vehicleAsset=`kenney-car-kit-${id}`;canvas.dataset.vehicleWheels=String(wheels.length);canvas.dataset.selectedVehicle=id;applyWheelVisual();
  }catch(error){if(token!==vehicleLoadToken)return;canvas.dataset.vehicleAsset="fallback-low-poly";noteAssetFailure(definition.model,error);}
}

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
  car.add(fallback);vehicleFallback=fallback;void loadVehicleModel(selectedVehicleId);

  const mount = new THREE.Mesh(new THREE.CylinderGeometry(.62,.76,.22,12),metal);
  vehicleMount=mount;mount.castShadow=true;car.add(mount);
  const bearing = new THREE.Mesh(new THREE.TorusGeometry(.62,.08,8,16),darkMetal);
  vehicleBearing=bearing;bearing.rotation.x=Math.PI/2;bearing.castShadow=true;car.add(bearing);
  car.add(turret);positionTurretForVehicle(selectedVehicleId);
  for(const kind of ["mg","rocket","sniper"] as const){const rig=createTurretRig(kind);turretRigs.set(kind,rig);turret.add(rig.root);}
  selectWeapon(selectedWeapon,false);
  vehicleColliderDebug = new THREE.Mesh(
    new THREE.BoxGeometry(VEHICLE_COLLIDER_RADIUS * 2, VEHICLE_COLLIDER_HEIGHT, (VEHICLE_COLLIDER_HALF_LENGTH + VEHICLE_COLLIDER_RADIUS) * 2),
    new THREE.MeshBasicMaterial({ color: 0x4cfff0, wireframe: true, transparent: true, opacity: .8 }),
  );
  vehicleColliderDebug.position.y = .52;
  vehicleColliderDebug.visible = false;
  car.add(vehicleColliderDebug);
  car.position.set(0,getGroundHeight(0,-28),-28); scene.add(car);
}

function buildOpponentCar(): void {
  opponentCar.name = "rival-ai-combat-car";
  const chassisMaterial = new THREE.MeshStandardMaterial({ color:0x63339b, map:grittyTurretTexture, roughness:.68, metalness:.5 });
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.75,.72,4.45),chassisMaterial);
  chassis.position.y=1.02;chassis.castShadow=true;opponentCar.add(chassis);
  const cabin = new THREE.Mesh(new THREE.DodecahedronGeometry(1.15,0),darkMetal.clone());
  cabin.scale.set(1,.66,1.05);cabin.position.set(0,1.68,-.28);cabin.castShadow=true;opponentCar.add(cabin);
  for(const x of [-1.43,1.43])for(const z of [-1.42,1.42]){
    const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.56,.56,.42,14),rubber);wheel.rotation.z=Math.PI/2;wheel.position.set(x,.7,z);wheel.castShadow=true;opponentCar.add(wheel);
  }
  const mount=new THREE.Mesh(new THREE.CylinderGeometry(.58,.72,.24,12),chassisMaterial);mount.position.y=2.32;opponentCar.add(mount);
  const rivalTurret=new THREE.Group();rivalTurret.name="rival-longlance-tracking-turret";rivalTurret.position.y=2.5;opponentCar.add(rivalTurret);
  const receiver=new THREE.Mesh(new THREE.BoxGeometry(1.12,.52,1.48),darkMetal);receiver.position.set(0,.25,.12);receiver.castShadow=true;rivalTurret.add(receiver);
  for(const x of [-.25,.25]){const rail=new THREE.Mesh(new THREE.BoxGeometry(.12,.12,3.18),metal);rail.position.set(x,.27,1.58);rail.castShadow=true;rivalTurret.add(rail);}
  const barrel=new THREE.Mesh(new THREE.CylinderGeometry(.085,.12,3.5,10),darkMetal);barrel.rotation.x=Math.PI/2;barrel.position.set(0,.27,1.78);barrel.castShadow=true;rivalTurret.add(barrel);
  const brake=new THREE.Mesh(new THREE.BoxGeometry(.68,.34,.48),darkMetal);brake.position.set(0,.27,3.52);rivalTurret.add(brake);
  const eye=new THREE.Mesh(new THREE.SphereGeometry(.12,10,7),new THREE.MeshBasicMaterial({color:0x67e7ff}));eye.position.set(0,.52,.68);rivalTurret.add(eye);
  opponentCar.userData.turret=rivalTurret;
  canvas.dataset.aiTurret="sniper";
  scene.add(opponentCar);aimSurfaces.push(opponentCar);
}

// Upgrade cards can mutate this single structure between rounds. Future systems:
// TODO: RoundManager, UpgradeCardDraft, OpponentVehicleAI, BetweenRoundScreen.
const defaultStats: VehicleStats = {
  maxHealth: 150,
  acceleration: 16.5,
  maxSpeed: 27,
  handling: 1.62,
  traction: 7.4,
  boostPower: 1.3,
  armor: 0,
  ramPower: 1,
  stability: 1,
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
function applyActiveTurretStats():void{
  const definition=weaponDefinitions[selectedWeapon],mod=runState?.turretStats[selectedWeapon];
  weaponStats.fireRate=definition.fireRate*(mod?.fireRateMultiplier??1);
  weaponStats.damage=definition.damage*(mod?.damageMultiplier??1);
  weaponStats.projectileSpeed=definition.projectileSpeed*(mod?.projectileSpeedMultiplier??1);
  weaponStats.range=definition.range*(mod?.rangeMultiplier??1);
  weaponStats.automatic=definition.automatic;
  canvas.dataset.weaponDamage=weaponStats.damage.toFixed(2);canvas.dataset.weaponFireRate=weaponStats.fireRate.toFixed(2);canvas.dataset.weaponProjectileCount=String(mod?.projectileCount??1);
}
function applyWheelVisual():void{
  const visual=runState?.tireVisual??"stock";
  const color=visual==="racing"?0x171c22:visual==="offroad"?0x292418:visual==="heavy"?0x08090a:0x101111;
  const scale=visual==="racing"?new THREE.Vector3(.92,1,.9):visual==="offroad"?new THREE.Vector3(1.16,1.12,1.16):visual==="heavy"?new THREE.Vector3(1.13,1.28,1.13):new THREE.Vector3(1,1,1);
  wheels.forEach(wheel=>{wheel.scale.copy(scale);wheel.traverse(object=>{if(!(object instanceof THREE.Mesh))return;const materials=Array.isArray(object.material)?object.material:[object.material];for(const material of materials)if(material instanceof THREE.MeshStandardMaterial&&material.color.r<.35&&material.color.g<.35&&material.color.b<.35)material.color.setHex(color);});});
  canvas.dataset.tireVisual=visual;
}
function recomputeRunStats():void{
  Object.assign(stats,defaultStats);
  const mod=runState?.vehicleStats;
  if(mod){stats.maxHealth*=mod.maxHealthMultiplier;stats.acceleration*=mod.accelerationMultiplier;stats.maxSpeed*=mod.maxSpeedMultiplier;stats.handling*=mod.handlingMultiplier;stats.traction*=mod.tractionMultiplier;stats.boostPower=(stats.boostPower??1.3)*mod.boostMultiplier;stats.armor=Math.min(.72,(stats.armor??0)+mod.armorBonus);stats.ramPower=mod.ramMultiplier;stats.stability=mod.stabilityMultiplier;}
  applyActiveTurretStats();applyWheelVisual();
  canvas.dataset.vehicleUpgradeStats=`hp:${stats.maxHealth.toFixed(0)},accel:${stats.acceleration.toFixed(1)},speed:${stats.maxSpeed.toFixed(1)},handling:${stats.handling.toFixed(2)},traction:${stats.traction.toFixed(2)}`;
}
const vehicle = {
  position: new THREE.Vector3(0,0,-28), heading: 0, speed: 0, driftAngle: 0, verticalVelocity: 0,
  pitch: 0, roll: 0, grounded: true, activeRamp: null as DriveSurfaceContact | null, health: 150, shield: 0, boost: 100, collisionCooldown: 0,
  orientation: new THREE.Quaternion(),surfaceNormal:new THREE.Vector3(0,1,0),projectedForward:new THREE.Vector3(0,0,1),
  velocity:new THREE.Vector3(),wallContactNormal:new THREE.Vector3(),wallAssistActive:false,downforce:0,
};
const opponent = {
  position:new THREE.Vector3(),heading:Math.PI,speed:0,health:210,maxHealth:210,fireCooldown:1.4,steerBias:1,collisionCooldown:0,burnTime:0,burnDps:0,burnFxCooldown:0,
  maneuverTimer:0,preferredDistance:24,speedMultiplier:1,weavePhase:0,weaveRate:1.5,
};

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

const bullets: Bullet[]=[]; const dust: DustParticle[]=[]; const visualEffects: VisualEffect[]=[];
let nextBulletId=1;
const dustMaterial=new THREE.MeshBasicMaterial({color:0xc18a59,transparent:true,opacity:.35,depthWrite:false});
const bulletGeometry = new THREE.BoxGeometry(.09,.09,.72);
const dustGeometry = new THREE.SphereGeometry(.3,6,4);
const debrisGeometry = new THREE.DodecahedronGeometry(.14,0);
const effectRingGeometry = new THREE.RingGeometry(.48,.68,28);
const effectCoreGeometry = new THREE.IcosahedronGeometry(.55,1);
const trailGeometry = new THREE.SphereGeometry(.18,7,5);
const rocketShardGeometry = new THREE.BoxGeometry(.13,3.25,.04);
const sniperShardGeometry = new THREE.BoxGeometry(.025,.86,.025);
const sniperTracerGlowGeometry = new THREE.CylinderGeometry(.2,.2,1,8,1,true);
const sniperTracerCoreGeometry = new THREE.CylinderGeometry(.055,.055,1,8);
const sniperTracerHotCoreGeometry = new THREE.CylinderGeometry(.018,.018,1,6);
const burnEmberGeometry = new THREE.CircleGeometry(.15,7);
// Keep the light in the renderer's light set for the lifetime of the game. Toggling
// PointLight.visible changes Three.js shader defines and can compile a new program in
// the middle of a shot. Intensity zero gives the same visual result without a hitch.
const muzzleFlash = new THREE.PointLight(0xff8a24, 0, 5, 2);
scene.add(muzzleFlash);
let fireCooldown=0; let isFireHeld=false; let muzzleFlashLife=0; let weaponStateLife=0;
let cameraShakeLife=0; let cameraShakeStrength=0;
let messageTimer=0; let paused=false; let elapsed=0;
const rampSmokeTest = new URLSearchParams(location.search).get("physics-smoke") === "ramp";
const allSurfaceSmokeTest = new URLSearchParams(location.search).get("physics-smoke") === "all-surfaces";
const wallRideSmokeTest = new URLSearchParams(location.search).get("physics-smoke") === "wall";
const holdFireSmokeTest = new URLSearchParams(location.search).get("input-smoke") === "hold-fire";
const boostSmokeTest = new URLSearchParams(location.search).get("input-smoke") === "boost";
const roundWinSmokeTest = new URLSearchParams(location.search).get("combat-smoke") === "round-win";
const vehiclePreviewTest = initialParams.get("ui-preview") === "vehicles";
const soundtrack = new Audio("./assets/nitro-games.wav");
soundtrack.loop = true;
soundtrack.volume = .09;
soundtrack.preload = "auto";
soundtrack.id = "soundtrack";
soundtrack.hidden = true;
soundtrack.dataset.playback = "waiting-for-interaction";
const engineLoop = new Audio("./assets/audio/sfx/vehicle-engine-loop.wav");
engineLoop.loop = true;
engineLoop.volume = .001;
engineLoop.playbackRate = .68;
engineLoop.preservesPitch = false;
engineLoop.preload = "auto";
engineLoop.id = "vehicle-engine-loop";
engineLoop.hidden = true;
engineLoop.dataset.playback = "waiting-for-interaction";
document.body.append(soundtrack, engineLoop);
const MUSIC_MUTE_KEY="rigged-music-muted";
function setMusicMuted(muted:boolean):void{
  soundtrack.muted=muted;ui.musicMuted.checked=muted;localStorage.setItem(MUSIC_MUTE_KEY,muted?"1":"0");canvas.dataset.musicMuted=String(muted);
}
setMusicMuted(localStorage.getItem(MUSIC_MUTE_KEY)==="1");
ui.musicMuted.addEventListener("change",()=>setMusicMuted(ui.musicMuted.checked));

type SfxKey = "turret-mg" | "turret-rocket" | "turret-sniper" | "vehicle-hit" | "confirmed-hit";
const sfxSources: Record<SfxKey, string> = {
  "turret-mg": "./assets/audio/sfx/turret-mg-fire.wav",
  "turret-rocket": "./assets/audio/sfx/turret-rocket-fire.ogg",
  "turret-sniper": "./assets/audio/sfx/turret-sniper-fire.ogg",
  "vehicle-hit": "./assets/audio/sfx/vehicle-hit-clank.ogg",
  "confirmed-hit": "./assets/audio/sfx/confirmed-hit-clank.ogg",
};
const sfxTemplates = new Map<SfxKey, HTMLAudioElement>();
const activeSfx = new Set<HTMLAudioElement>();
const spatialBuffers = new Map<SfxKey, AudioBuffer>();
const sfxDataPromises = new Map<SfxKey, Promise<ArrayBuffer>>();
let audioContext: AudioContext | null = null;
let spatialAudioLoad: Promise<void> | null = null;
let audioFrameDisabled = false;
const audioFailureSmokeTest = initialParams.get("audio-smoke") === "fail";
for (const [key, source] of Object.entries(sfxSources) as [SfxKey, string][]) {
  const audio = new Audio(source);
  audio.preload = "auto";
  audio.load();
  sfxTemplates.set(key, audio);
  sfxDataPromises.set(key,fetch(source).then(response=>response.arrayBuffer()));
}
soundtrack.load();engineLoop.load();

const spatialSoundOffset=new THREE.Vector3(),spatialCameraRight=new THREE.Vector3();
function playSfx(key: SfxKey, volume: number, pitchVariation = .035, position?: THREE.Vector3): void {
  const buffer=spatialBuffers.get(key);
  if(audioContext&&buffer){
    const source=audioContext.createBufferSource(),gain=audioContext.createGain(),panner=audioContext.createStereoPanner();
    source.buffer=buffer;source.playbackRate.value=1+(Math.random()*2-1)*pitchVariation;
    const worldPosition=position??vehicle.position;
    spatialSoundOffset.copy(worldPosition).sub(camera.position);const distance=spatialSoundOffset.length();
    spatialCameraRight.set(1,0,0).applyQuaternion(camera.quaternion);
    const pan=distance>.001?spatialSoundOffset.dot(spatialCameraRight)/distance:0;
    const attenuation=1/(1+Math.max(0,distance-7)/28);
    gain.gain.value=THREE.MathUtils.clamp(volume*attenuation,0,1);panner.pan.value=THREE.MathUtils.clamp(pan,-1,1);
    source.connect(gain).connect(panner).connect(audioContext.destination);
    source.onended=()=>{source.disconnect();gain.disconnect();panner.disconnect();};
    source.start();canvas.dataset.lastSfx=key;canvas.dataset.spatialAudio="stereo-world-positioned";return;
  }
  const template = sfxTemplates.get(key);
  if (!template) return;
  const sound = template.cloneNode(true) as HTMLAudioElement;
  sound.volume = THREE.MathUtils.clamp(volume, 0, 1);
  sound.preservesPitch = false;
  sound.playbackRate = 1 + (Math.random() * 2 - 1) * pitchVariation;
  activeSfx.add(sound);
  sound.addEventListener("ended", () => activeSfx.delete(sound), { once: true });
  sound.play().catch(() => activeSfx.delete(sound));
  canvas.dataset.lastSfx = key;
}

function startAudio(): void {
  if(!audioContext){
    audioContext=new AudioContext();
    spatialAudioLoad=Promise.all([...sfxDataPromises].map(([key,pending])=>pending.then(data=>audioContext!.decodeAudioData(data.slice(0))).then(buffer=>spatialBuffers.set(key,buffer)).catch(()=>undefined))).then(()=>{canvas.dataset.combatAudio="decoded";});
  }
  if(audioContext.state==="suspended")void audioContext.resume();
  if (soundtrack.paused) {
    soundtrack.dataset.playback = "starting";
    soundtrack.play()
      .then(() => { soundtrack.dataset.playback = "playing"; })
      .catch(() => { soundtrack.dataset.playback = "blocked"; });
  }
  if (engineLoop.paused) {
    engineLoop.dataset.playback = "starting";
    engineLoop.play()
      .then(() => { engineLoop.dataset.playback = "playing"; })
      .catch(() => { engineLoop.dataset.playback = "blocked"; });
  }
  canvas.dataset.musicContinuity="single-document-loop";
}

let engineMix = 0;
function updateEngineAudio(dt: number): void {
  const speedRatio = THREE.MathUtils.clamp(Math.abs(vehicle.speed) / Math.max(1, stats.maxSpeed), 0, 1.25);
  const accelerating = input.has("KeyW") || input.has("KeyS");
  const boosting = input.has("ShiftLeft") && vehicle.boost > 0;
  const audible = levelStarted && !paused && vehicle.health > 0;
  const targetVolume = audible ? .055 + speedRatio * .16 + (accelerating ? .025 : 0) : 0;
  const targetRate = .68 + speedRatio * .82 + (boosting ? .12 : 0);
  engineMix = THREE.MathUtils.damp(engineMix, targetVolume, 6, dt);
  engineLoop.volume = THREE.MathUtils.clamp(engineMix, 0, .26);
  engineLoop.playbackRate = THREE.MathUtils.damp(engineLoop.playbackRate, targetRate, 7, dt);
  canvas.dataset.engineVolume = engineLoop.volume.toFixed(3);
  canvas.dataset.enginePlaybackRate = engineLoop.playbackRate.toFixed(2);
}

function updateAudioFrame(dt:number):void{
  if(audioFrameDisabled)return;
  try{updateEngineAudio(dt);if(audioFailureSmokeTest)throw new Error("Simulated audio-frame failure");canvas.dataset.audioFrame="active";}
  catch(error){audioFrameDisabled=true;canvas.dataset.audioFrame="disabled";console.warn("[Rigged] Audio frame updates disabled; gameplay will continue.",error);}
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

function createStarGeometry(points=10,outer=1.35,inner=.34): THREE.ShapeGeometry {
  const shape=new THREE.Shape();
  for(let index=0;index<points*2;index++){
    const angle=index/(points*2)*Math.PI*2-Math.PI/2, radius=index%2===0?outer:inner;
    const x=Math.cos(angle)*radius,y=Math.sin(angle)*radius;
    if(index===0)shape.moveTo(x,y);else shape.lineTo(x,y);
  }
  shape.closePath();return new THREE.ShapeGeometry(shape);
}
const impactStarGeometry=createStarGeometry();
const effectMidpoint=new THREE.Vector3();
const effectUp=new THREE.Vector3(0,1,0);
const effectMaterialPool:THREE.MeshBasicMaterial[]=[];
const createEffectMaterial=()=>new THREE.MeshBasicMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});

function effectMaterial(color:number,opacity=1): THREE.MeshBasicMaterial {
  const material=effectMaterialPool.pop()??createEffectMaterial();
  material.color.setHex(color);material.opacity=opacity;material.visible=true;
  material.userData.baseOpacity=opacity;return material;
}

function recycleEffectMaterial(material:THREE.Material):void{
  if(material instanceof THREE.MeshBasicMaterial&&material.transparent&&material.blending===THREE.AdditiveBlending){material.opacity=0;effectMaterialPool.push(material);}
  else material.dispose();
}

function registerVisualEffect(effect:Omit<VisualEffect,"meshes"|"lights">):void{
  const meshes:THREE.Mesh[]=[],lights:THREE.PointLight[]=[];
  effect.group.traverse(object=>{
    if(object instanceof THREE.Mesh)meshes.push(object);
    else if(object instanceof THREE.PointLight)lights.push(object);
  });
  visualEffects.push({...effect,meshes,lights});
}

function removeVisualEffect(index:number):void{
  const effect=visualEffects[index];scene.remove(effect.group);
  for(const mesh of effect.meshes){
    const materials=Array.isArray(mesh.material)?mesh.material:[mesh.material];
    for(const material of materials)recycleEffectMaterial(material);
  }
  visualEffects.splice(index,1);
}

function spawnImpactVfx(kind:WeaponKind,position:THREE.Vector3,major=true):void{
  const definition=weaponDefinitions[kind],group=new THREE.Group();group.position.copy(position);group.userData.billboard=true;
  const isRocket=kind==="rocket",coreScale=major&&isRocket?1.8:major?1:.28;
  const core=new THREE.Mesh(effectCoreGeometry,effectMaterial(isRocket?0xffb52f:0xffd66f,.95));
  core.scale.setScalar(coreScale);group.add(core);
  const star=new THREE.Mesh(impactStarGeometry,effectMaterial(definition.impactColor,kind==="mg" ? .72 : .96));star.scale.setScalar(major ? 1.24 : .26);group.add(star);
  if(major&&isRocket)star.scale.setScalar(2.15);
  const ringCount=major&&isRocket?5:1;
  for(let index=0;index<ringCount;index++){
    const ring=new THREE.Mesh(effectRingGeometry,effectMaterial(index===0?0xffffff:definition.impactColor,.9-index*.18));
    ring.scale.setScalar((major ? 1.1 : .2)+index*.46);ring.position.z=-.03-index*.015;group.add(ring);
  }
  if(major&&isRocket){
    const shardCount=20;
    for(let index=0;index<shardCount;index++){
      const shard=new THREE.Mesh(rocketShardGeometry,effectMaterial(index%3?definition.impactColor:0xffffff,.88));
      const angle=index/shardCount*Math.PI*2;shard.rotation.z=angle;shard.position.set(Math.cos(angle)*2.1,Math.sin(angle)*2.1,-.06);group.add(shard);
    }
    cameraShakeLife=.38;cameraShakeStrength=.62;canvas.dataset.lastImpactEffect="rocket-world-detonation";
  }
  const life=major&&isRocket ? .82 : major ? .3 : .13;scene.add(group);registerVisualEffect({group,life,maxLife:life,kind:"impact",growth:major&&isRocket?7.2:major?2.2:1.3});
}

function spawnSniperHit(position:THREE.Vector3):void{
  const group=new THREE.Group();group.position.copy(position);group.userData.billboard=true;
  const core=new THREE.Mesh(effectCoreGeometry,effectMaterial(0xffffff,.96));core.scale.setScalar(.22);group.add(core);
  for(let index=0;index<8;index++){
    const angle=index/8*Math.PI*2,shard=new THREE.Mesh(sniperShardGeometry,effectMaterial(index%2?0x5de5ff:0xffffff,.9));
    shard.rotation.z=angle;shard.position.set(Math.cos(angle)*.38,Math.sin(angle)*.38,0);group.add(shard);
  }
  scene.add(group);
  registerVisualEffect({group,life:.16,maxLife:.16,kind:"impact",growth:.5});cameraShakeLife=.055;cameraShakeStrength=.08;
  canvas.dataset.lastImpactEffect="sniper-pinpoint-spark";
}

function spawnSniperTracer(start:THREE.Vector3,direction:THREE.Vector3,range:number):void{
  const distance=Math.min(range,Math.max(18,start.distanceTo(aimPoint)+8)),group=new THREE.Group();
  effectMidpoint.copy(start).addScaledVector(direction,distance*.5);group.position.copy(effectMidpoint);group.quaternion.setFromUnitVectors(effectUp,direction);
  const glow=new THREE.Mesh(sniperTracerGlowGeometry,effectMaterial(0x37cfff,.34));glow.scale.y=distance;group.add(glow);
  const core=new THREE.Mesh(sniperTracerCoreGeometry,effectMaterial(0xe9fdff,1));core.scale.y=distance;group.add(core);
  const hotCore=new THREE.Mesh(sniperTracerHotCoreGeometry,effectMaterial(0xffffff,1));hotCore.scale.y=distance;group.add(hotCore);
  scene.add(group);registerVisualEffect({group,life:.48,maxLife:.48,kind:"laser",growth:0});
  canvas.dataset.sniperTracerLength=distance.toFixed(1);
}

function spawnRocketTrail(position:THREE.Vector3,sourceId:number):void{
  const group=new THREE.Group();group.position.copy(position).add(new THREE.Vector3((Math.random()-.5)*.12,(Math.random()-.5)*.12,(Math.random()-.5)*.12));
  const puff=new THREE.Mesh(trailGeometry,effectMaterial(Math.random()>.45?0xff7a23:0xffd85a,.72));group.add(puff);scene.add(group);
  registerVisualEffect({group,life:.28,maxLife:.28,kind:"trail",growth:2.2,sourceId});
}

function clearRocketTrail(sourceId:number):void{
  for(let index=visualEffects.length-1;index>=0;index--){const effect=visualEffects[index];if(effect.kind!=="trail"||effect.sourceId!==sourceId)continue;removeVisualEffect(index);}
  canvas.dataset.rocketTrailCleanup="detonation-synced";
}

const projectileMgMaterials={
  standard:new THREE.MeshBasicMaterial({color:0xffcf5a}),
  incendiary:new THREE.MeshBasicMaterial({color:0xff4b18}),
  piercing:new THREE.MeshBasicMaterial({color:0xe9fbff}),
};
const sniperProjectileCoreGeometry=new THREE.BoxGeometry(.06,.06,9);
const sniperProjectileAuraGeometry=new THREE.BoxGeometry(.24,.24,8.2);
const sniperProjectileCoreMaterials={standard:new THREE.MeshBasicMaterial({color:0xffffff}),incendiary:new THREE.MeshBasicMaterial({color:0xff8a35})};
const sniperProjectileAuraMaterials={standard:effectMaterial(0x55dcff,.58),incendiary:effectMaterial(0xff3b14,.58),piercing:effectMaterial(0xc9f8ff,.58)};
const rocketBodyGeometry=new THREE.CylinderGeometry(.12,.15,.78,9);
const rocketBodyMaterial=new THREE.MeshStandardMaterial({color:0x343633,roughness:.55,metalness:.7});
const rocketNoseGeometry=new THREE.ConeGeometry(.15,.34,9);
const rocketFinGeometry=new THREE.BoxGeometry(.38,.04,.32);
const rocketFlameGeometry=new THREE.ConeGeometry(.18,.85,9);
const rocketFlameMaterials={standard:effectMaterial(0xff8b28,.92),incendiary:effectMaterial(0xff3010,.92)};
const mgProjectilePool:THREE.Mesh[]=[];
function acquireMgProjectile(material:THREE.Material,scale:number):THREE.Mesh{
  const shot=mgProjectilePool.pop()??new THREE.Mesh(bulletGeometry,material);
  shot.material=material;shot.scale.setScalar(scale);shot.visible=true;return shot;
}
function releaseProjectile(projectile:THREE.Object3D,kind:WeaponKind):void{
  projectile.removeFromParent();
  if(kind==="mg"&&projectile instanceof THREE.Mesh){projectile.visible=false;projectile.position.set(0,0,0);projectile.quaternion.identity();mgProjectilePool.push(projectile);}
}
function createProjectile(kind:WeaponKind,incendiary=false,piercing=false,heavy=false):THREE.Object3D{
  if(kind==="mg"){
    const material=incendiary?projectileMgMaterials.incendiary:piercing?projectileMgMaterials.piercing:projectileMgMaterials.standard;
    return acquireMgProjectile(material,heavy?1.75:piercing?1.25:1);
  }
  if(kind==="sniper"){
    const group=new THREE.Group();
    const core=new THREE.Mesh(sniperProjectileCoreGeometry,incendiary?sniperProjectileCoreMaterials.incendiary:sniperProjectileCoreMaterials.standard);group.add(core);
    const auraMaterial=incendiary?sniperProjectileAuraMaterials.incendiary:piercing?sniperProjectileAuraMaterials.piercing:sniperProjectileAuraMaterials.standard;
    const aura=new THREE.Mesh(sniperProjectileAuraGeometry,auraMaterial);group.add(aura);group.scale.setScalar(heavy?1.55:1);return group;
  }
  const group=new THREE.Group();
  const body=new THREE.Mesh(rocketBodyGeometry,rocketBodyMaterial);body.rotation.x=Math.PI/2;group.add(body);
  const nose=new THREE.Mesh(rocketNoseGeometry,warm);nose.rotation.x=Math.PI/2;nose.position.z=.55;group.add(nose);
  for(const side of [-1,1]){const fin=new THREE.Mesh(rocketFinGeometry,warm);fin.position.set(side*.14,0,-.28);fin.rotation.z=side*.42;group.add(fin);}
  const flame=new THREE.Mesh(rocketFlameGeometry,incendiary?rocketFlameMaterials.incendiary:rocketFlameMaterials.standard);flame.rotation.x=-Math.PI/2;flame.position.z=-.78;group.add(flame);
  return group;
}

let combatWarmPromise:Promise<void>|null=null;
function warmCombatResources():Promise<void>{
  if(combatWarmPromise)return combatWarmPromise;
  combatWarmPromise=(async()=>{
    const warmup=new THREE.Group();warmup.name="offscreen-combat-resource-warmup";warmup.position.set(0,-500,0);
    while(mgProjectilePool.length<32)mgProjectilePool.push(new THREE.Mesh(bulletGeometry,projectileMgMaterials.standard));
    while(effectMaterialPool.length<48)effectMaterialPool.push(createEffectMaterial());
    const variants:[WeaponKind,boolean,boolean,boolean][]=[["mg",false,false,false],["mg",true,false,false],["mg",false,true,true],["rocket",false,false,false],["rocket",true,false,true],["sniper",false,false,false],["sniper",true,true,true]];
    const warmProjectiles:THREE.Object3D[]=[];variants.forEach(([kind,fire,pierce,heavy],index)=>{const projectile=createProjectile(kind,fire,pierce,heavy);projectile.position.x=index*2;warmup.add(projectile);warmProjectiles.push(projectile);});
    const warmMaterials=[effectMaterial(0xffb52f,.95),effectMaterial(0xff5b20,.92),effectMaterial(0x67e7ff,.9),effectMaterial(0xff4b18,.8)];
    warmup.add(new THREE.Mesh(effectCoreGeometry,warmMaterials[0]),new THREE.Mesh(impactStarGeometry,warmMaterials[1]),new THREE.Mesh(effectRingGeometry,warmMaterials[2]),new THREE.Mesh(trailGeometry,warmMaterials[3]));
    scene.add(warmup);
    try{await renderer.compileAsync(scene,camera);if(spatialAudioLoad)await spatialAudioLoad;canvas.dataset.combatPrewarm="complete";}
    catch(error){canvas.dataset.combatPrewarm="partial";console.warn("[Rigged] Combat pre-warm completed with a fallback.",error);}
    finally{scene.remove(warmup);warmProjectiles.forEach((projectile,index)=>releaseProjectile(projectile,variants[index][0]));warmMaterials.forEach(recycleEffectMaterial);canvas.dataset.projectilePool=String(mgProjectilePool.length);}
  })();
  return combatWarmPromise;
}

function spawnBurnEmber(position:THREE.Vector3):void{
  const group=new THREE.Group();group.position.copy(position).add(new THREE.Vector3((Math.random()-.5)*1.4,.7+Math.random()*1.2,(Math.random()-.5)*1.4));group.userData.billboard=true;
  const ember=new THREE.Mesh(burnEmberGeometry,effectMaterial(Math.random()>.35?0xff491c:0xffbd45,.9));ember.scale.setScalar(.73+Math.random()*.6);group.add(ember);
  scene.add(group);registerVisualEffect({group,life:.45,maxLife:.45,kind:"trail",growth:1.7});
  canvas.dataset.burnVfx="ember-active";
}

function shoot(): boolean {
  if(paused || roundPhase!=="active" || vehicle.health<=0 || !aimReady || fireCooldown > 0 || bullets.length >= 120) return false;
  const definition=weaponDefinitions[selectedWeapon],mod=runState?.turretStats[selectedWeapon];fireCooldown = 1 / weaponStats.fireRate;
  muzzle.getWorldPosition(shotOrigin);
  shotDirection.copy(aimPoint).sub(shotOrigin).normalize(); currentAimDirection.copy(shotDirection);
  const count=mod?.projectileCount??1,totalSpread=mod?.spread??0;
  for(let index=0;index<count;index++){
    const normalized=count===1?0:index/(count-1)-.5,angle=normalized*totalSpread+(Math.random()-.5)*totalSpread*.12;
    const direction=shotDirection.clone().applyAxisAngle(effectUp,angle).normalize();
    const mesh=createProjectile(selectedWeapon,(mod?.burnDps??0)>0,(mod?.pierces??0)>0,mod?.heavyRounds??false);mesh.position.copy(shotOrigin);
    mesh.quaternion.setFromUnitVectors(projectileForward,direction);scene.add(mesh);
    bullets.push({id:nextBulletId++,mesh,velocity:direction.multiplyScalar(weaponStats.projectileSpeed),life:weaponStats.range/weaponStats.projectileSpeed,kind:selectedWeapon,owner:"player",damage:weaponStats.damage,splashRadius:definition.splashRadius??0,trailTimer:0,ricochetsRemaining:mod?.ricochets??0,piercesRemaining:mod?.pierces??0,burnDps:mod?.burnDps??0,burnDuration:mod?.burnDuration??0,hitOpponent:false,hitTargets:new Set()});
  }
  canvas.dataset.shotsFired=String(Number(canvas.dataset.shotsFired??0)+count);
  ui.weaponState.textContent="FIRING"; weaponStateLife=.08;
  muzzleFlash.color.setHex(definition.impactColor);muzzleFlash.intensity=selectedWeapon==="rocket"?22:selectedWeapon==="sniper"?28:8;muzzleFlash.distance=selectedWeapon==="rocket"?10:7;
  muzzleFlash.position.copy(shotOrigin); muzzleFlashLife=selectedWeapon==="mg" ? .045 : .09;
  if(selectedWeapon==="mg")playSfx("turret-mg",.10,.025,shotOrigin);
  else if(selectedWeapon==="rocket")playSfx("turret-rocket",.44,.025,shotOrigin);
  else playSfx("turret-sniper",.38,.018,shotOrigin);
  if(selectedWeapon==="sniper")spawnSniperTracer(shotOrigin,shotDirection,weaponStats.range);else spawnImpactVfx(selectedWeapon,shotOrigin,false);
  return true;
}

const opponentShotOrigin=new THREE.Vector3();
const opponentShotDirection=new THREE.Vector3();
function shootOpponent():void{
  if(roundPhase!=="active"||opponent.health<=0||vehicle.health<=0)return;
  const definition=weaponDefinitions.sniper;
  opponentShotOrigin.copy(opponent.position);opponentShotOrigin.y+=2.72;
  const travelTime=Math.min(.45,opponentShotOrigin.distanceTo(vehicle.position)/definition.projectileSpeed);
  opponentShotDirection.copy(vehicle.position).addScaledVector(vehicle.velocity,travelTime).add(effectMidpoint.set((Math.random()-.5)*.34,1.05+(Math.random()-.5)*.18,(Math.random()-.5)*.34)).sub(opponentShotOrigin).normalize();
  const mesh=createProjectile("sniper");mesh.position.copy(opponentShotOrigin);mesh.quaternion.setFromUnitVectors(projectileForward,opponentShotDirection);scene.add(mesh);
  bullets.push({id:nextBulletId++,mesh,velocity:opponentShotDirection.clone().multiplyScalar(definition.projectileSpeed),life:definition.range/definition.projectileSpeed,kind:"sniper",owner:"opponent",damage:definition.damage,splashRadius:0,trailTimer:0,ricochetsRemaining:0,piercesRemaining:0,burnDps:0,burnDuration:0,hitOpponent:false,hitTargets:new Set()});
  playSfx("turret-sniper",.3,.025,opponentShotOrigin);spawnSniperTracer(opponentShotOrigin,opponentShotDirection,definition.range);canvas.dataset.aiShotsFired=String(Number(canvas.dataset.aiShotsFired??0)+1);
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
  if (weaponStateLife === 0 && ui.weaponState.textContent === "FIRING") ui.weaponState.textContent = weaponDefinitions[selectedWeapon].stateLabel;
  if (muzzleFlashLife === 0) muzzleFlash.intensity = 0;
  if (isFireHeld) shoot();
}

const MAX_DUST_PARTICLES=48;
function spawnDust(dt:number): void {
  if(dust.length>=MAX_DUST_PARTICLES || Math.abs(vehicle.speed)<3 || Math.random()>dt*Math.min(Math.abs(vehicle.speed),20)*1.15) return;
  const behind=new THREE.Vector3(-Math.sin(vehicle.heading)*2,0,-Math.cos(vehicle.heading)*2);
  const mesh=new THREE.Mesh(dustGeometry,dustMaterial.clone());mesh.scale.setScalar(.6+Math.random()*.7);
  mesh.position.copy(vehicle.position).add(behind).add(new THREE.Vector3((Math.random()-.5)*1.8,.25,(Math.random()-.5)*.8));scene.add(mesh);
  dust.push({mesh,life:.7+Math.random()*.5,velocity:new THREE.Vector3((Math.random()-.5)*.5,.45+Math.random()*.3,(Math.random()-.5)*.5)});
}

function explode(position:THREE.Vector3,lift=1.4,count=12): void {
  for(let i=0;i<Math.min(count,MAX_DUST_PARTICLES-dust.length);i++){
    const mesh=new THREE.Mesh(debrisGeometry,new THREE.MeshBasicMaterial({color:i%3===0?0xffc34e:0xb84a29}));mesh.scale.setScalar(.6+Math.random());
    mesh.position.copy(position).add(new THREE.Vector3(0,lift,0));scene.add(mesh);
    dust.push({mesh,life:.7+Math.random()*.8,velocity:new THREE.Vector3((Math.random()-.5)*7,2+Math.random()*5,(Math.random()-.5)*7)});
  }
}

function damageTarget(target:Target,amount:number): void {
  if(!target.alive)return;target.health-=amount;target.hitFlash=.09;playHitConfirmation();
  if(target.health<=0){target.alive=false;explode(target.group.position);scene.remove(target.group);const left=targets.filter(item=>item.alive).length;canvas.dataset.targetsRemaining=String(left);showMessage(left?`TARGET SCRAPPED // ${left} REMAIN`:`TARGET LANE CLEARED // FIND THE RIVAL`);}
}

let lastHitConfirmationAt = -Infinity;
function playHitConfirmation(): void {
  const now = performance.now();
  if (now - lastHitConfirmationAt < 70) return;
  lastHitConfirmationAt = now;
  playSfx("confirmed-hit", .23, .02);
}

function showMessage(text:string): void {ui.message.textContent=text;ui.message.classList.add("show");clearTimeout(messageTimer);messageTimer=window.setTimeout(()=>ui.message.classList.remove("show"),1900);}

const turretShortNames:Record<WeaponKind,string>={mg:"SCRAP RATTLER",rocket:"HELLBOX",sniper:"LONGLANCE"};
function updateLoadoutUi():void{
  document.querySelectorAll<HTMLButtonElement>("[data-weapon]").forEach(button=>{
    const kind=button.dataset.weapon as WeaponKind,owned=!!runState?.ownedTurrets.includes(kind),active=owned&&selectedWeapon===kind;
    button.classList.toggle("owned",owned);button.classList.toggle("selected",active);button.disabled=!owned;button.setAttribute("aria-pressed",String(active));
    const status=button.querySelector("small");if(status)status.textContent=active?"ACTIVE":owned?"OWNED":`LOCKED // ROUND ${Math.max(3,Math.ceil(currentRound/3)*3)}`;
  });
  const labels=new Map(upgradeCards.map(card=>[card.id,card.name]));
  const upgradeNames=(runState?.upgrades??[]).map(id=>labels.get(id)??(id.startsWith("add-")?`Added ${turretShortNames[id.slice(4) as WeaponKind]??"Turret"}`:id.startsWith("mastery-")?"Turret Mastery":id));
  ui.activeUpgrades.replaceChildren(...(upgradeNames.length?upgradeNames.slice(-7):["No cards installed"]).map(name=>{const item=document.createElement("li");item.textContent=name;return item;}));
  canvas.dataset.ownedTurrets=runState?.ownedTurrets.join(",")??"none";canvas.dataset.activeUpgrades=runState?.upgrades.join(",")??"none";
}

function showStarterTurretSelect():void{
  if(!activeRoom||activeRoom.phase!=="starter_draft")return;
  roundPhase="starter_turret_select";ui.starterSelect.hidden=false;ui.vehicleSelect.hidden=true;ui.cardDraft.hidden=true;ui.countdown.hidden=true;ui.weaponSelect.classList.add("draft-open");canvas.dataset.roundPhase=roundPhase;canvas.dataset.starterSelection="visible";updateLoadoutUi();
  const picker=roomPlayers(activeRoom).find(player=>player.id===activeRoom?.activePickerId),myTurn=multiplayer?.isMyTurn()??false;
  ui.starterTurn.textContent=myTurn?"YOUR PICK // Choose the next roof turret.":`${picker?.name??"The other driver"} is choosing. Watch their pick resolve.`;
  ui.starterPickReveal.hidden=true;
  document.querySelectorAll<HTMLElement>(".starter-card").forEach(card=>{
    const button=card.querySelector<HTMLButtonElement>("[data-starter-turret]")!,kind=button.dataset.starterTurret as WeaponKind,available=activeRoom?.draftOptions.includes(kind)??false;
    card.hidden=!available;card.dataset.optionId=kind;card.classList.remove("is-picked","is-fizzling");card.classList.toggle("is-watching",!myTurn);button.disabled=!myTurn;button.textContent=myTurn?`MOUNT ${kind==="mg"?"RATTLER":kind==="rocket"?"HELLBOX":"LONGLANCE"}`:"RIVAL IS CHOOSING";
  });
}

async function chooseStarterTurret(kind:WeaponKind):Promise<void>{
  if(!multiplayer?.isMyTurn()||!activeRoom?.draftOptions.includes(kind))return;
  const nextState=activeRoom.runState?structuredClone(activeRoom.runState):createStarterRun(kind,currentRound);
  if(activeRoom.runState)applyCard(nextState,createTurretCard(kind));
  document.querySelectorAll<HTMLButtonElement>("[data-starter-turret]").forEach(button=>button.disabled=true);
  const nextOptions=activeRoom.draftTurn===0?(["mg","rocket","sniper"] as WeaponKind[]).filter(option=>option!==kind):Object.keys(riggedVehicleCatalog);
  try{await multiplayer.submitPick({optionId:kind,optionName:turretShortNames[kind],nextRunState:nextState,nextOptions});}
  catch(error){showRoomError(error);showStarterTurretSelect();}
}

function showVehicleSelect():void{
  if(!activeRoom||activeRoom.phase!=="vehicle_select")return;
  roundPhase="starter_turret_select";ui.starterSelect.hidden=true;ui.cardDraft.hidden=true;ui.vehicleSelect.hidden=false;ui.countdown.hidden=true;ui.weaponSelect.classList.add("draft-open");
  const players=roomPlayers(activeRoom),picker=players.find(player=>player.id===activeRoom?.activePickerId),myTurn=vehiclePreviewTest||(multiplayer?.isMyTurn()??false);
  ui.vehicleTurn.textContent=myTurn?"YOUR PICK // Choose the car you will drive.":`${picker?.name??"The other driver"} is choosing their car.`;ui.vehiclePickReveal.hidden=true;
  const cards=Object.entries(riggedVehicleCatalog).map(([rawId,definition])=>{
    const id=rawId as RiggedVehicleId,button=document.createElement("button");button.type="button";button.className="vehicle-card";button.dataset.vehicle=id;button.dataset.optionId=id;button.disabled=!myTurn||!activeRoom?.draftOptions.includes(id);button.classList.toggle("is-watching",!myTurn);
    const image=document.createElement("img");image.src=definition.preview;image.alt="";const copy=document.createElement("span"),label=document.createElement("b"),callout=document.createElement("small"),picked=document.createElement("em");
    label.textContent=definition.label.toUpperCase();callout.textContent=definition.callout;const owners=players.filter(player=>activeRoom?.vehicleSelections?.[player.id]===id).map(player=>player.name);picked.textContent=owners.length?`${owners.join(" + ")} PICKED THIS`:myTurn?"SELECT VEHICLE":"RIVAL IS CHOOSING";copy.append(label,callout,picked);button.append(image,copy);button.addEventListener("click",()=>void chooseVehicle(id));return button;
  });
  ui.vehicleGrid.replaceChildren(...cards);canvas.dataset.roundPhase="vehicle_select";canvas.dataset.vehicleSelection="visible";
}

async function chooseVehicle(id:RiggedVehicleId):Promise<void>{
  if(!multiplayer?.isMyTurn()||activeRoom?.phase!=="vehicle_select")return;
  ui.vehicleGrid.querySelectorAll<HTMLButtonElement>("button").forEach(button=>button.disabled=true);
  try{await multiplayer.submitVehiclePick(id,riggedVehicleCatalog[id].label);}
  catch(error){showRoomError(error);showVehicleSelect();}
}

function buildCardElement(card:UpgradeCard):HTMLElement{
  const article=document.createElement("article");article.className="upgrade-card";article.dataset.category=card.category;article.dataset.optionId=card.id;
  const meta=document.createElement("div");meta.className="upgrade-card__meta";const category=document.createElement("span");category.textContent=card.category.toUpperCase();const scope=document.createElement("span");scope.textContent=card.scope.toUpperCase();meta.append(category,scope);
  const title=document.createElement("h2");title.textContent=card.name.toUpperCase();const description=document.createElement("p");description.textContent=card.description;
  const statsList=document.createElement("ul");statsList.className="upgrade-card__stats";for(const line of card.stats){const item=document.createElement("li");item.textContent=line;statsList.append(item);}
  const quote=document.createElement("p");quote.className="upgrade-card__quote";quote.textContent=`“${card.quote}”`;
  const button=document.createElement("button");button.type="button";button.textContent=card.category==="turret"?"ADD TO LOADOUT":"CHOOSE CARD";button.disabled=!(multiplayer?.isMyTurn()??false);button.addEventListener("click",()=>void chooseUpgradeCard(card));
  article.classList.toggle("is-watching",button.disabled);
  article.append(meta,title,description,statsList,quote,button);return article;
}

function showCardDraft():void{
  if(!runState||!activeRoom||activeRoom.phase!=="upgrade_draft")return;
  const cards=resolveRoomCards(activeRoom.draftOptions,runState),turretReward=currentRound%3===0,picker=roomPlayers(activeRoom).find(player=>player.id===activeRoom?.activePickerId),myTurn=multiplayer?.isMyTurn()??false;
  roundPhase="card_select";ui.countdown.hidden=true;ui.starterSelect.hidden=true;ui.vehicleSelect.hidden=true;ui.cardDraft.hidden=false;ui.weaponSelect.classList.add("draft-open");ui.draftEyebrow.textContent=turretReward?`ROUND ${currentRound} // TURRET SALVAGE`:`ROUND ${currentRound} COMPLETE // SALVAGE DRAFT`;ui.draftTitle.textContent=myTurn?(turretReward?"EXPAND THE RIG OR UPGRADE":"CHOOSE ONE UPGRADE"):`${(picker?.name??"RIVAL").toUpperCase()} IS PICKING`;ui.draftSubtitle.textContent=myTurn?"YOUR PICK // Install one card into the shared rig.":`You can see every option. ${picker?.name??"The other driver"} has control.`;ui.draftPickReveal.hidden=true;ui.cardGrid.replaceChildren(...cards.map(buildCardElement));canvas.dataset.roundPhase=roundPhase;canvas.dataset.cardDraft="visible";canvas.dataset.turretReward=turretReward?"offered":"not-due";
}

async function chooseUpgradeCard(card:UpgradeCard):Promise<void>{
  if(!runState||roundPhase!=="card_select"||!multiplayer?.isMyTurn()||!activeRoom?.draftOptions.includes(card.id))return;
  const nextState=structuredClone(runState);applyCard(nextState,card);nextState.round=currentRound;
  ui.cardGrid.querySelectorAll<HTMLButtonElement>("button").forEach(button=>button.disabled=true);
  const nextOptions=activeRoom.draftTurn===0?draftCards(nextState).map(option=>option.id):[];
  try{await multiplayer.submitPick({optionId:card.id,optionName:card.name,nextRunState:nextState,nextOptions});}
  catch(error){showRoomError(error);showCardDraft();}
}

function resolveRoomCards(ids:string[],state:ScraproadRunState):UpgradeCard[]{
  const generated=draftCards(state),candidates=[...generated,...upgradeCards];
  for(const kind of ["mg","rocket","sniper"] as const)candidates.push(createTurretCard(kind));
  return ids.map(id=>candidates.find(card=>card.id===id)).filter((card):card is UpgradeCard=>Boolean(card));
}

function cycleOwnedTurret(direction:number):void{
  if(!runState||runState.ownedTurrets.length<2||roundPhase!=="active")return;const current=runState.ownedTurrets.indexOf(selectedWeapon),next=(current+direction+runState.ownedTurrets.length)%runState.ownedTurrets.length;selectWeapon(runState.ownedTurrets[next]);
}

const worldUp=new THREE.Vector3(0,1,0);
const movementDirection=new THREE.Vector3();
const desiredSurfaceUp=new THREE.Vector3();
const surfaceRight=new THREE.Vector3();
const surfaceForward=new THREE.Vector3();
const surfaceMatrix=new THREE.Matrix4();
const targetSurfaceOrientation=new THREE.Quaternion();
const surfaceEuler=new THREE.Euler(0,0,0,"YXZ");
const MAX_ARCADE_WALL_ROLL=.93;

function projectDirectionToDriveSurface(angle:number,x:number,z:number,out:THREE.Vector3):THREE.Vector3{
  out.set(Math.sin(angle),0,Math.cos(angle));
  if(activeLayout.arenaKind!=="capsule"||!activeLayout.bowl)return out;
  const sample=sampleOvalBowl(activeLayout.bowl,x,z);
  if(sample.progress<=.001)return out;
  out.addScaledVector(sample.normal,-out.dot(sample.normal));
  if(out.lengthSq()<.0001)out.set(Math.sin(angle),0,Math.cos(angle));
  return out.normalize();
}

function updateArcadeSurfaceFrame(dt:number,drifting:boolean,steer:number,speedRatio:number):void{
  const isCapsule=activeLayout.arenaKind==="capsule"&&Boolean(activeLayout.bowl);
  const sample=isCapsule?sampleOvalBowl(activeLayout.bowl!,vehicle.position.x,vehicle.position.z):null;
  const onWall=Boolean(sample&&sample.progress>.001&&vehicle.grounded);
  const assistBlend=sample?THREE.MathUtils.smoothstep(sample.progress,.025,.34):0;
  desiredSurfaceUp.copy(worldUp);
  if(sample)desiredSurfaceUp.lerp(sample.normal,assistBlend*.88).normalize();
  vehicle.surfaceNormal.copy(sample?.normal??worldUp);
  vehicle.wallAssistActive=onWall;
  vehicle.downforce=onWall?3.5+assistBlend*5.5:0;

  surfaceForward.set(Math.sin(vehicle.heading),0,Math.cos(vehicle.heading));
  surfaceForward.addScaledVector(desiredSurfaceUp,-surfaceForward.dot(desiredSurfaceUp));
  if(surfaceForward.lengthSq()<.0001)surfaceForward.set(Math.sin(vehicle.heading),0,Math.cos(vehicle.heading));
  surfaceForward.normalize();
  surfaceRight.crossVectors(desiredSurfaceUp,surfaceForward).normalize();
  surfaceForward.crossVectors(surfaceRight,desiredSurfaceUp).normalize();
  vehicle.projectedForward.copy(surfaceForward);
  surfaceMatrix.makeBasis(surfaceRight,desiredSurfaceUp,surfaceForward);
  targetSurfaceOrientation.setFromRotationMatrix(surfaceMatrix);
  vehicle.orientation.slerp(targetSurfaceOrientation,1-Math.exp(-(onWall?11:15)*dt));
  surfaceEuler.setFromQuaternion(vehicle.orientation,"YXZ");
  vehicle.pitch=THREE.MathUtils.clamp(surfaceEuler.x,-MAX_ARCADE_WALL_ROLL,MAX_ARCADE_WALL_ROLL);
  vehicle.roll=THREE.MathUtils.clamp(surfaceEuler.z,-MAX_ARCADE_WALL_ROLL,MAX_ARCADE_WALL_ROLL)+(drifting?steer*.035*speedRatio:0);
  surfaceEuler.set(vehicle.pitch,surfaceEuler.y,vehicle.roll,"YXZ");
  vehicle.orientation.setFromEuler(surfaceEuler);
}

function applyCapsuleGuardResponse(normalX:number,normalZ:number,moveAngle:number):void{
  let velocityX=Math.sin(moveAngle)*vehicle.speed,velocityZ=Math.cos(moveAngle)*vehicle.speed;
  const outwardSpeed=velocityX*normalX+velocityZ*normalZ;
  if(outwardSpeed<=0)return;
  velocityX-=normalX*outwardSpeed*1.08;velocityZ-=normalZ*outwardSpeed*1.08;
  const redirectedSpeed=Math.hypot(velocityX,velocityZ);
  vehicle.speed=Math.min(Math.abs(vehicle.speed),redirectedSpeed);
  if(redirectedSpeed>.05){const redirectedAngle=Math.atan2(velocityX,velocityZ);vehicle.heading=redirectedAngle-vehicle.driftAngle;}
  vehicle.driftAngle*=.35;
}

function updateVehicle(dt:number): void {
  vehicle.collisionCooldown=Math.max(0,vehicle.collisionCooldown-dt);
  vehicle.wallContactNormal.set(0,0,0);
  const forward=input.has("KeyW")?1:0;const reverse=input.has("KeyS")?1:0;const steer=(input.has("KeyA")?1:0)-(input.has("KeyD")?1:0);const drifting=input.has("Space");
  const boosting=input.has("ShiftLeft")&&forward>0&&vehicle.boost>0;
  if(forward)vehicle.speed+=stats.acceleration*(boosting?(stats.boostPower??1.3):1)*dt;
  if(reverse)vehicle.speed-=vehicle.speed>1?stats.acceleration*2.35*dt:stats.acceleration*.68*dt;
  if(boosting){vehicle.boost=Math.max(0,vehicle.boost-24*dt);}else vehicle.boost=Math.min(100,vehicle.boost+6*dt);
  const maxForward=stats.maxSpeed*(boosting?(stats.boostPower??1.3):1);vehicle.speed=THREE.MathUtils.clamp(vehicle.speed,-11,maxForward);
  if(!forward&&!reverse){const drag=(drifting?4.4:2.15)*dt;vehicle.speed=Math.abs(vehicle.speed)<=drag?0:vehicle.speed-Math.sign(vehicle.speed)*drag;}
  const speedRatio=Math.min(Math.abs(vehicle.speed)/stats.maxSpeed,1);const reverseSign=vehicle.speed>=0?1:-1;
  const steeringAuthority=.2+speedRatio*.8-(Math.max(0,speedRatio-.72)*.34);
  vehicle.heading+=steer*stats.handling*steeringAuthority*(drifting?1.3:1)*reverseSign*dt;
  const targetDrift=drifting&&speedRatio>.16?-steer*.28*speedRatio*reverseSign:0;
  vehicle.driftAngle=THREE.MathUtils.damp(vehicle.driftAngle,targetDrift,drifting?4.2:stats.traction,dt);
  const moveAngle=vehicle.heading+vehicle.driftAngle;
  projectDirectionToDriveSurface(moveAngle,vehicle.position.x,vehicle.position.z,movementDirection);
  vehicle.velocity.copy(movementDirection).multiplyScalar(vehicle.speed);
  vehicle.position.x+=vehicle.velocity.x*dt;vehicle.position.z+=vehicle.velocity.z*dt;

  let collided=false,capsuleGuardCollision=false;
  if(activeLayout.arenaKind==="capsule"&&activeLayout.bowl){
    const boundary=resolveOvalBoundary(activeLayout.bowl,vehicle.position.x,vehicle.position.z,vehicle.heading,VEHICLE_COLLIDER_HALF_LENGTH,VEHICLE_COLLIDER_RADIUS);
    if(boundary.collided){
      vehicle.position.x=boundary.x;vehicle.position.z=boundary.z;collided=true;capsuleGuardCollision=true;
      applyCapsuleGuardResponse(boundary.normalX,boundary.normalZ,moveAngle);
      vehicle.wallContactNormal.set(-boundary.normalX,0,-boundary.normalZ);
      canvas.dataset.guardContact="active";canvas.dataset.guardPenetration=boundary.penetration.toFixed(3);
      if(vehicle.collisionCooldown<=0)showMessage("UPPER GUARD // SLIDE BACK INTO THE ARENA");
    }else canvas.dataset.guardContact="clear";
  }else{
    const arenaDistance=Math.hypot(vehicle.position.x,vehicle.position.z);
    const boundaryLimit=ARENA_RADIUS-(VEHICLE_COLLIDER_HALF_LENGTH+VEHICLE_COLLIDER_RADIUS);
    if(arenaDistance>boundaryLimit){const nx=vehicle.position.x/arenaDistance,nz=vehicle.position.z/arenaDistance;vehicle.position.x=nx*boundaryLimit;vehicle.position.z=nz*boundaryLimit;collided=true;showMessage("BOUNDARY IMPACT // TURN BACK");}
  }
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
  if(collided){if(Math.abs(vehicle.speed)>6){hitVehicle(Math.round(Math.abs(vehicle.speed)*.32));showMessage("SCRAP COLLISION // HULL DAMAGED");}if(!capsuleGuardCollision)vehicle.speed*=-.18;vehicle.driftAngle*=.25;}

  rampNow=rampSample(vehicle.position.x,vehicle.position.z);
  if(rampNow){
    vehicle.activeRamp=rampNow.ramp;vehicle.grounded=true;vehicle.verticalVelocity=0;vehicle.position.y=rampNow.height+.06;
    if(rampNow.ramp.kind==="wall"){
      const wallProgress=rampNow.localZ;const grip=THREE.MathUtils.smoothstep(wallProgress,.08,.42);
      const wallSample=sampleOvalBowl(activeLayout.bowl!,vehicle.position.x,vehicle.position.z);
      const outwardTravel=Math.sin(moveAngle)*wallSample.outwardX+Math.cos(moveAngle)*wallSample.outwardZ;
      const upperResistance=THREE.MathUtils.smoothstep(wallProgress,.62,.9);
      vehicle.speed-=outwardTravel*(5.8*grip+12*upperResistance)*dt;
      vehicle.speed=THREE.MathUtils.clamp(vehicle.speed,-11,maxForward);
      vehicle.driftAngle=THREE.MathUtils.damp(vehicle.driftAngle,0,5+grip*7,dt);
      vehicle.speed*=Math.exp(-.18*upperResistance*dt);canvas.dataset.wallRideGrip=(grip*.85+.15).toFixed(2);
      canvas.dataset.wallSurfaceBand=wallSample.band;canvas.dataset.wallSurfaceNormal=`${wallSample.normal.x.toFixed(2)},${wallSample.normal.y.toFixed(2)},${wallSample.normal.z.toFixed(2)}`;
      if(wallProgress>.18&&Math.abs(vehicle.speed)>5)canvas.dataset.wallRideContact="passed";
    }
  }else{
    const ground=getGroundHeight(vehicle.position.x,vehicle.position.z)+.06;
    if(rampBefore&&rampBefore.kind!=="wall"&&vehicle.position.y>ground+.45){
      const travelAlignment=Math.cos(moveAngle-rampBefore.rotation);
      const profileLaunch=vehicle.speed*travelAlignment*rampBefore.rise/rampBefore.length;
      const pitchLaunch=Math.abs(vehicle.speed)*Math.max(0,-Math.sin(vehicle.pitch));
      vehicle.verticalVelocity=Math.max(0,profileLaunch,pitchLaunch);
      vehicle.grounded=false;
    }
    vehicle.activeRamp=null;
    if(!vehicle.grounded){vehicle.verticalVelocity-=12.5*dt;vehicle.position.y+=vehicle.verticalVelocity*dt;if(vehicle.position.y<=ground){vehicle.position.y=ground;vehicle.verticalVelocity=0;vehicle.grounded=true;}}
    else vehicle.position.y=ground;
  }

  const frontY=getDriveHeight(vehicle.position.x+Math.sin(vehicle.heading)*2,vehicle.position.z+Math.cos(vehicle.heading)*2);const backY=getDriveHeight(vehicle.position.x-Math.sin(vehicle.heading)*2,vehicle.position.z-Math.cos(vehicle.heading)*2);
  const rightY=getDriveHeight(vehicle.position.x+Math.cos(vehicle.heading)*1.2,vehicle.position.z-Math.sin(vehicle.heading)*1.2);const leftY=getDriveHeight(vehicle.position.x-Math.cos(vehicle.heading)*1.2,vehicle.position.z+Math.sin(vehicle.heading)*1.2);
  if(activeLayout.arenaKind==="capsule")updateArcadeSurfaceFrame(dt,drifting,steer,speedRatio);
  else{
    vehicle.pitch=vehicle.grounded?Math.atan2(backY-frontY,4):0;
    vehicle.roll=((vehicle.grounded?Math.atan2(rightY-leftY,2.4):0)+(drifting?steer*.055*speedRatio:0))/(stats.stability??1);
    vehicle.orientation.setFromEuler(surfaceEuler.set(vehicle.pitch,vehicle.heading,vehicle.roll,"YXZ"));
    vehicle.surfaceNormal.set(0,1,0);vehicle.projectedForward.set(Math.sin(vehicle.heading),0,Math.cos(vehicle.heading));vehicle.wallAssistActive=false;vehicle.downforce=0;
  }
  vehicle.velocity.copy(movementDirection).multiplyScalar(vehicle.speed);
  wheels.forEach(wheel=>wheel.rotation.x+=vehicle.speed*dt/.57);frontWheelPivots.forEach(pivot=>pivot.rotation.y=THREE.MathUtils.damp(pivot.rotation.y,-steer*.38,12,dt));
  for(const target of targets){if(target.alive&&target.group.position.distanceTo(vehicle.position)<1.85&&Math.abs(vehicle.speed)>5){damageTarget(target,Math.abs(vehicle.speed)*1.8);vehicle.speed*=-.35;hitVehicle(4);}}
  if(!Number.isFinite(vehicle.position.x)||!Number.isFinite(vehicle.position.y)||!Number.isFinite(vehicle.position.z)||vehicle.position.y < -8 || Math.abs(vehicle.position.x) > ARENA_RADIUS * 1.8 || Math.abs(vehicle.position.z) > ARENA_RADIUS * 1.8){showMessage("OUT OF BOUNDS // AUTO RECOVERY");resetVehicle();return;}
  spawnDust(dt);
}

function damageOpponent(amount:number,silent=false):void{
  if(opponent.health<=0||roundPhase==="ended"||roundPhase==="card_select")return;opponent.health=Math.max(0,opponent.health-amount);if(!silent)playSfx("confirmed-hit",.18,.025,opponent.position);canvas.dataset.opponentHealth=opponent.health.toFixed(0);
  if(opponent.health<=0){explode(opponent.position,1,28);opponentCar.visible=false;showMessage("RIVAL SCRAPPED // ROUND SECURED");awardPlayerRound();}
}

function updateOpponent(dt:number):void{
  if(roundPhase!=="active"||opponent.health<=0)return;
  if(opponent.burnTime>0){opponent.burnTime=Math.max(0,opponent.burnTime-dt);opponent.burnFxCooldown-=dt;damageOpponent(opponent.burnDps*dt,true);if(opponent.burnFxCooldown<=0){opponent.burnFxCooldown=.14;spawnBurnEmber(opponent.position.clone().add(new THREE.Vector3(0,.5,0)));}canvas.dataset.burnRemaining=opponent.burnTime.toFixed(2);if(opponent.health<=0)return;}
  opponent.collisionCooldown=Math.max(0,opponent.collisionCooldown-dt);opponent.fireCooldown-=dt;
  const dx=vehicle.position.x-opponent.position.x,dz=vehicle.position.z-opponent.position.z,distance=Math.hypot(dx,dz);
  opponent.maneuverTimer-=dt;opponent.weavePhase+=dt*opponent.weaveRate;
  if(opponent.maneuverTimer<=0){opponent.maneuverTimer=.75+Math.random()*1.65;opponent.steerBias=Math.random()<.5?-1:1;opponent.preferredDistance=17+Math.random()*22;opponent.speedMultiplier=.78+Math.random()*.5;opponent.weaveRate=1.1+Math.random()*2.1;canvas.dataset.aiManeuver="rerolled";}
  const targetHeading=Math.atan2(dx,dz),rangeRatio=distance/opponent.preferredDistance;
  const orbitOffset=opponent.steerBias*(.62+Math.sin(opponent.weavePhase)*.32);
  const desiredHeading=rangeRatio<.58?targetHeading+Math.PI+opponent.steerBias*.28:rangeRatio>1.42?targetHeading+Math.sin(opponent.weavePhase)*.2:targetHeading+orbitOffset;
  const delta=Math.atan2(Math.sin(desiredHeading-opponent.heading),Math.cos(desiredHeading-opponent.heading));
  opponent.heading+=THREE.MathUtils.clamp(delta,-2.05*dt,2.05*dt);const desiredSpeed=(rangeRatio>1.35?20:rangeRatio<.58?18:13+Math.abs(Math.sin(opponent.weavePhase))*6)*opponent.speedMultiplier;opponent.speed=THREE.MathUtils.damp(opponent.speed,desiredSpeed,3,dt);
  opponent.position.x+=Math.sin(opponent.heading)*opponent.speed*dt;opponent.position.z+=Math.cos(opponent.heading)*opponent.speed*dt;
  if(activeLayout.arenaKind==="capsule"&&activeLayout.bowl){
    const boundary=resolveOvalBoundary(activeLayout.bowl,opponent.position.x,opponent.position.z,opponent.heading,VEHICLE_COLLIDER_HALF_LENGTH,VEHICLE_COLLIDER_RADIUS);
    if(boundary.collided){opponent.position.x=boundary.x;opponent.position.z=boundary.z;opponent.heading+=opponent.steerBias*.7;opponent.steerBias*=-1;}
  }else{
    const limit=ARENA_RADIUS-4,radius=Math.hypot(opponent.position.x,opponent.position.z);if(radius>limit){opponent.position.multiplyScalar(limit/radius);opponent.heading=Math.atan2(-opponent.position.x,-opponent.position.z)+opponent.steerBias*.5;opponent.steerBias*=-1;}
  }
  opponent.position.y=getDriveHeight(opponent.position.x,opponent.position.z)+.06;opponentCar.position.copy(opponent.position);opponentCar.rotation.y=opponent.heading;
  const rivalTurret=opponentCar.userData.turret as THREE.Group|undefined;if(rivalTurret){const worldAim=Math.atan2(dx,dz);rivalTurret.rotation.y=THREE.MathUtils.damp(rivalTurret.rotation.y,Math.atan2(Math.sin(worldAim-opponent.heading),Math.cos(worldAim-opponent.heading)),8,dt);}
  if(distance<weaponDefinitions.sniper.range&&opponent.fireCooldown<=0){shootOpponent();opponent.fireCooldown=1/weaponDefinitions.sniper.fireRate+.18+Math.random()*.55;}
  if(distance<2.35&&opponent.collisionCooldown<=0){opponent.collisionCooldown=.8;hitVehicle(10);damageOpponent(5*(stats.ramPower??1));opponent.heading+=Math.PI*.65;}
}

function hitVehicle(amount:number):void{if(vehicle.collisionCooldown>0||roundPhase==="ended"||roundPhase==="card_select")return;vehicle.collisionCooldown=.45;let incoming=amount*(1-(stats.armor??0));if(vehicle.shield>0){const absorbed=Math.min(vehicle.shield,incoming);vehicle.shield-=absorbed;incoming-=absorbed;canvas.dataset.shieldAbsorbed=absorbed.toFixed(1);showMessage("EMERGENCY SHIELD // IMPACT ABSORBED");}vehicle.health=Math.max(0,vehicle.health-incoming);playSfx("vehicle-hit",.26,.045,vehicle.position);if(vehicle.health<=0){showMessage("RIG DISABLED // RIVAL TAKES THE ROUND");awardEnemyRound();}}

const aimIntersections:THREE.Intersection[]=[];
const turretWorld=new THREE.Vector3();
function updateAim(dt:number): void {
  raycaster.setFromCamera(mouse,camera);
  aimIntersections.length=0;raycaster.intersectObjects(aimSurfaces,true,aimIntersections);
  const hit = aimIntersections[0];
  if (hit) aimPoint.copy(hit.point);
  else {
    aimPlane.constant = 0;
    if (!raycaster.ray.intersectPlane(aimPlane, aimPoint)) return;
    aimPoint.y = getDriveHeight(aimPoint.x, aimPoint.z);
  }
  turret.getWorldPosition(turretWorld);
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

const projectilePrevious=new THREE.Vector3(),targetCenter=new THREE.Vector3(),projectileClosest=new THREE.Vector3(),impactPoint=new THREE.Vector3();
const projectileSegment=new THREE.Vector3(),projectilePointDelta=new THREE.Vector3();
function segmentDistanceSq(start:THREE.Vector3,end:THREE.Vector3,point:THREE.Vector3):number{
  projectileSegment.copy(end).sub(start);const lengthSq=projectileSegment.lengthSq();
  if(lengthSq<=.000001)return point.distanceToSquared(start);
  const t=THREE.MathUtils.clamp(projectilePointDelta.copy(point).sub(start).dot(projectileSegment)/lengthSq,0,1);
  projectileClosest.copy(start).addScaledVector(projectileSegment,t);return projectileClosest.distanceToSquared(point);
}

function resolveProjectileImpact(bullet:Bullet,position:THREE.Vector3,directTarget:Target|null,hitOpponent=false,hitPlayer=false):void{
  canvas.dataset.lastWeaponImpact=bullet.kind;
  if(bullet.owner==="player"&&bullet.kind==="rocket"){
    for(const target of targets){
      if(!target.alive)continue;targetCenter.copy(target.group.position);targetCenter.y+=1.4;
      const distance=targetCenter.distanceTo(position);if(distance>bullet.splashRadius)continue;
      const damage=target===directTarget?bullet.damage:bullet.damage*Math.max(.28,1-distance/bullet.splashRadius);
      damageTarget(target,damage);
    }
    targetCenter.copy(opponent.position);targetCenter.y+=1.1;const rivalDistance=targetCenter.distanceTo(position);if(opponent.health>0&&rivalDistance<=bullet.splashRadius)damageOpponent(bullet.damage*Math.max(.3,1-rivalDistance/bullet.splashRadius));
  }else if(bullet.owner==="player"&&directTarget)damageTarget(directTarget,bullet.damage);
  if(bullet.owner==="player"&&hitOpponent&&bullet.kind!=="rocket")damageOpponent(bullet.damage);
  if(bullet.owner==="player"&&hitOpponent&&bullet.burnDps>0){opponent.burnDps=Math.max(opponent.burnDps,bullet.burnDps);opponent.burnTime=Math.max(opponent.burnTime,bullet.burnDuration);spawnBurnEmber(position);canvas.dataset.burnStatus="applied";}
  if(bullet.owner==="opponent"&&hitPlayer)hitVehicle(bullet.damage);
  if(bullet.kind==="rocket"){clearRocketTrail(bullet.id);spawnImpactVfx("rocket",position,true);explode(position,.2,22);}
  else if(bullet.kind==="sniper")spawnSniperHit(position);
  else spawnImpactVfx("mg",position,false);
}

function updateProjectiles(dt:number): void {
  for(let index=bullets.length-1;index>=0;index--){
    const bullet=bullets[index];projectilePrevious.copy(bullet.mesh.position);bullet.mesh.position.addScaledVector(bullet.velocity,dt);bullet.life-=dt;
    if(bullet.kind==="rocket"){bullet.trailTimer-=dt;if(bullet.trailTimer<=0){bullet.trailTimer=.06;spawnRocketTrail(bullet.mesh.position,bullet.id);}}
    let directTarget:Target|null=null;
    if(bullet.owner==="player")for(const target of targets){
      if(!target.alive||bullet.hitTargets.has(target))continue;targetCenter.copy(target.group.position);targetCenter.y+=1.4;
      const radius=bullet.kind==="rocket"?1.15:.95;if(segmentDistanceSq(projectilePrevious,bullet.mesh.position,targetCenter)<radius*radius){directTarget=target;break;}
    }
    targetCenter.copy(opponent.position);targetCenter.y+=1.1;const hitOpponent=bullet.owner==="player"&&!bullet.hitOpponent&&opponent.health>0&&segmentDistanceSq(projectilePrevious,bullet.mesh.position,targetCenter)<(bullet.kind==="rocket"?1.6:1.35)**2;
    targetCenter.copy(vehicle.position);targetCenter.y+=1.05;const hitPlayer=bullet.owner==="opponent"&&vehicle.health>0&&segmentDistanceSq(projectilePrevious,bullet.mesh.position,targetCenter)<1.4**2;
    const groundHeight=getDriveHeight(bullet.mesh.position.x,bullet.mesh.position.z)+.1;
    const hitTerrain=bullet.mesh.position.y<=groundHeight;
    if(hitTerrain&&bullet.ricochetsRemaining>0){bullet.ricochetsRemaining--;bullet.mesh.position.copy(projectilePrevious);bullet.velocity.y=Math.abs(bullet.velocity.y)+4;bullet.velocity.multiplyScalar(.82);spawnImpactVfx("mg",bullet.mesh.position,false);canvas.dataset.ricochetVfx="spark";continue;}
    if(directTarget||hitOpponent||hitPlayer||hitTerrain||bullet.life<=0){
      if(directTarget){impactPoint.copy(directTarget.group.position);impactPoint.y+=1.4;}
      else if(hitOpponent){impactPoint.copy(opponent.position);impactPoint.y+=1.1;}
      else if(hitPlayer){impactPoint.copy(vehicle.position);impactPoint.y+=1.05;}
      else {impactPoint.copy(bullet.mesh.position);if(hitTerrain)impactPoint.y=groundHeight+.08;}
      if(directTarget||hitOpponent||hitPlayer||hitTerrain||bullet.kind==="rocket")resolveProjectileImpact(bullet,impactPoint,directTarget,hitOpponent,hitPlayer);
      const pierceHit=bullet.owner==="player"&&(!!directTarget||hitOpponent)&&bullet.piercesRemaining>0&&bullet.kind!=="rocket";
      if(pierceHit){bullet.piercesRemaining--;if(directTarget)bullet.hitTargets.add(directTarget);if(hitOpponent)bullet.hitOpponent=true;bullet.mesh.position.addScaledVector(bullet.velocity.clone().normalize(),1.8);canvas.dataset.piercingVfx="bright-tracer";continue;}
      if(bullet.kind==="rocket")clearRocketTrail(bullet.id);
      releaseProjectile(bullet.mesh,bullet.kind);bullets.splice(index,1);
    }
  }
  for(let i=dust.length-1;i>=0;i--){const p=dust[i];p.life-=dt;p.mesh.position.addScaledVector(p.velocity,dt);p.velocity.y-=3.5*dt;p.mesh.scale.multiplyScalar(1+dt*.55);const material=p.mesh.material as THREE.MeshBasicMaterial;material.opacity=Math.max(0,Math.min(material.opacity,p.life*.45));if(p.life<=0){scene.remove(p.mesh);material.dispose();dust.splice(i,1);}}
  for(let index=visualEffects.length-1;index>=0;index--){
    const effect=visualEffects[index];effect.life-=dt;const progress=THREE.MathUtils.clamp(1-effect.life/effect.maxLife,0,1),fade=Math.pow(1-progress,1.45);
    if(effect.group.userData.billboard)effect.group.quaternion.copy(camera.quaternion);
    if(effect.kind!=="laser")effect.group.scale.setScalar((effect.kind==="impact" ? .48 : .68)+progress*effect.growth);
    for(const light of effect.lights)light.intensity*=Math.max(0,1-dt*8);
    for(const mesh of effect.meshes){const materials=Array.isArray(mesh.material)?mesh.material:[mesh.material];for(const material of materials)material.opacity=Number(material.userData.baseOpacity??1)*fade;}
    if(effect.life<=0)removeVisualEffect(index);
  }
  cameraShakeLife=Math.max(0,cameraShakeLife-dt);if(cameraShakeLife===0)cameraShakeStrength=0;
  for(const target of targets){if(!target.alive)continue;if(target.hitFlash>0){target.hitFlash-=dt;const body=target.group.getObjectByName("target-body") as THREE.Mesh<THREE.BufferGeometry,THREE.MeshStandardMaterial>;body.material.emissive.setHex(0xff6b2c);}else{const body=target.group.getObjectByName("target-body") as THREE.Mesh<THREE.BufferGeometry,THREE.MeshStandardMaterial>;body.material.emissive.setHex(0x000000);}}
}

const cameraShakeOffset=new THREE.Vector3();
let cameraTelemetryAccumulator=.1;
function getCameraBounds():RiggedCameraBounds{
  if(activeLayout.arenaKind==="capsule"&&activeLayout.bowl)return{kind:"capsule",straightHalfLength:activeLayout.bowl.straightHalfLength,outerRadius:activeLayout.bowl.outerRadius};
  return{kind:"ring",radius:ARENA_RADIUS};
}
function updateCameraModeHud():void{
  const enemyMode=cameraController.mode==="enemy";
  ui.cameraMode.textContent=enemyMode?"ENEMY CAM":"CHASE CAM";
  ui.cameraMode.parentElement?.classList.toggle("enemy",enemyMode);
  canvas.dataset.cameraMode=cameraController.mode;
  canvas.dataset.enemyCam=enemyMode?"locked":"off";
}
function updateCamera(dt:number): void {
  if(cameraShakeLife>0)cameraShakeOffset.set((Math.random()-.5)*cameraShakeStrength,(Math.random()-.5)*cameraShakeStrength,(Math.random()-.5)*cameraShakeStrength);
  else cameraShakeOffset.set(0,0,0);
  const result=cameraController.update({dt,playerPosition:car.position,playerHeading:vehicle.heading,enemyPosition:opponentCar.position,enemyAvailable:opponent.health>0&&opponentCar.visible,groundHeight:getDriveHeight,bounds:getCameraBounds(),shake:cameraShakeOffset});
  if(result.fellBackToChase){updateCameraModeHud();showMessage("NO TARGET // CHASE CAM");}
  cameraTelemetryAccumulator+=dt;if(cameraTelemetryAccumulator>=.1){cameraTelemetryAccumulator=0;canvas.dataset.cameraAimMode=result.mode==="enemy"?"enemy-target":"drive-forward";canvas.dataset.cameraPositionMode=result.mode;canvas.dataset.cameraTargetDistance=result.targetDistance?.toFixed(2)??"none";canvas.dataset.cameraPosition=`${camera.position.x.toFixed(2)},${camera.position.y.toFixed(2)},${camera.position.z.toFixed(2)}`;canvas.dataset.cameraLookAt=`${cameraController.lookAt.x.toFixed(2)},${cameraController.lookAt.y.toFixed(2)},${cameraController.lookAt.z.toFixed(2)}`;}
}

const worldHealthProjection=new THREE.Vector3();
function placeWorldHealthTag(tag:HTMLElement,position:THREE.Vector3,height:number,available:boolean):void{
  worldHealthProjection.copy(position);worldHealthProjection.y+=height;worldHealthProjection.project(camera);
  const visible=available&&worldHealthProjection.z>-1&&worldHealthProjection.z<1&&Math.abs(worldHealthProjection.x)<1.15&&Math.abs(worldHealthProjection.y)<1.15;
  tag.classList.toggle("world-health--hidden",!visible);tag.setAttribute("aria-hidden",String(!visible));
  if(!visible)return;
  const screenX=(worldHealthProjection.x*.5+.5)*innerWidth,screenY=(-worldHealthProjection.y*.5+.5)*innerHeight;
  const scale=THREE.MathUtils.clamp(1.08-camera.position.distanceTo(position)*.0055,.78,1.02);
  tag.style.transform=`translate3d(${screenX.toFixed(1)}px,${screenY.toFixed(1)}px,0) translate(-50%,-100%) scale(${scale.toFixed(3)})`;
}
function updateWorldHealthTags():void{
  const duringCombat=levelStarted&&(roundPhase==="countdown"||roundPhase==="active"||roundPhase==="ended");
  placeWorldHealthTag(ui.playerHealthTag,car.position,3.7,duringCombat&&vehicle.health>0&&car.visible);
  placeWorldHealthTag(ui.rivalHealthTag,opponentCar.position,3.85,duringCombat&&opponent.health>0&&opponentCar.visible);
  canvas.dataset.worldHealthHud="projected-car-anchors";
}

function updateHud():void{
  ui.boost.textContent=String(Math.round(vehicle.boost));ui.health.textContent=String(Math.round(vehicle.health));ui.healthBar.style.width=`${vehicle.health/stats.maxHealth*100}%`;ui.boostBar.style.width=`${vehicle.boost}%`;
  ui.health.parentElement!.title=vehicle.shield>0?`${Math.round(vehicle.shield)} temporary shield active`:"Hull integrity";canvas.dataset.shield=vehicle.shield.toFixed(1);
  ui.rivalHealth.textContent=String(Math.round(opponent.health));ui.rivalHealthBar.style.width=`${opponent.health/opponent.maxHealth*100}%`;
  ui.boostMeter.classList.toggle("recharging",vehicle.boost<99.5&&!input.has("ShiftLeft"));canvas.dataset.boost=vehicle.boost.toFixed(1);canvas.dataset.boostRechargeRate="6-per-second";
  const contact=rampSample(vehicle.position.x,vehicle.position.z);const baseHeight=getGroundHeight(vehicle.position.x,vehicle.position.z);
  const flatContactLabel=activeLayout.arenaKind==="capsule"?"flat-floor":"terrain";
  canvas.dataset.groundContact=vehicle.grounded?(vehicle.activeRamp?vehicle.activeRamp.kind:flatContactLabel):"airborne";canvas.dataset.aimRay=aimReady?"locked":"searching";canvas.dataset.aimPoint=`${aimPoint.x.toFixed(1)},${aimPoint.y.toFixed(1)},${aimPoint.z.toFixed(1)}`;canvas.dataset.vehiclePosition=`${vehicle.position.x.toFixed(1)},${vehicle.position.y.toFixed(1)},${vehicle.position.z.toFixed(1)}`;
  canvas.dataset.surfaceLabel=contact?.ramp.label??(activeLayout.arenaKind==="capsule"?"flat center floor":"base terrain");canvas.dataset.surfaceHeight=(contact?.height??baseHeight).toFixed(2);canvas.dataset.baseGroundHeight=baseHeight.toFixed(2);canvas.dataset.contactDelta=((contact?.height??baseHeight)-baseHeight).toFixed(2);canvas.dataset.heightMismatch=contact?Math.abs(vehicle.position.y-.06-contact.height).toFixed(3):"0.000";canvas.dataset.wallRideActive=String(contact?.ramp.kind==="wall");
  contactDebug.position.set(vehicle.position.x,(contact?.height??baseHeight)+.16,vehicle.position.z);
  actualVehicleUp.set(0,1,0).applyQuaternion(vehicle.orientation).normalize();
  debugOrigin.copy(vehicle.position).addScaledVector(actualVehicleUp,.7);
  for(const arrow of [debugUp,debugSurfaceNormal,debugSurfaceForward,debugVelocity,debugWallContact])arrow.position.copy(debugOrigin);
  debugUp.setDirection(actualVehicleUp);debugSurfaceNormal.setDirection(vehicle.surfaceNormal);debugSurfaceForward.setDirection(vehicle.projectedForward);
  const velocityLength=vehicle.velocity.length();debugVelocity.setDirection(velocityLength>.01?vehicle.velocity.clone().normalize():vehicle.projectedForward);debugVelocity.setLength(THREE.MathUtils.clamp(velocityLength*.24,1.2,7),.6,.3);
  const hasWallContact=vehicle.wallContactNormal.lengthSq()>.001;debugWallContact.visible=debugPhysics&&hasWallContact;if(hasWallContact)debugWallContact.setDirection(vehicle.wallContactNormal);
  const wallSample=activeLayout.arenaKind==="capsule"&&activeLayout.bowl?sampleOvalBowl(activeLayout.bowl,vehicle.position.x,vehicle.position.z):null;
  const surfaceType=!vehicle.grounded?"airborne":canvas.dataset.guardContact==="active"?"upper-lip":wallSample&&wallSample.progress>.001?wallSample.band:"flat-floor";
  canvas.dataset.surfaceType=surfaceType;canvas.dataset.carUp=`${actualVehicleUp.x.toFixed(2)},${actualVehicleUp.y.toFixed(2)},${actualVehicleUp.z.toFixed(2)}`;canvas.dataset.surfaceNormal=`${vehicle.surfaceNormal.x.toFixed(2)},${vehicle.surfaceNormal.y.toFixed(2)},${vehicle.surfaceNormal.z.toFixed(2)}`;canvas.dataset.projectedForward=`${vehicle.projectedForward.x.toFixed(2)},${vehicle.projectedForward.y.toFixed(2)},${vehicle.projectedForward.z.toFixed(2)}`;canvas.dataset.velocityVector=`${vehicle.velocity.x.toFixed(2)},${vehicle.velocity.y.toFixed(2)},${vehicle.velocity.z.toFixed(2)}`;canvas.dataset.wallContactNormal=`${vehicle.wallContactNormal.x.toFixed(2)},${vehicle.wallContactNormal.y.toFixed(2)},${vehicle.wallContactNormal.z.toFixed(2)}`;canvas.dataset.wallAssist=vehicle.wallAssistActive?"active":"off";canvas.dataset.wallDownforce=vehicle.downforce.toFixed(2);canvas.dataset.carRoll=vehicle.roll.toFixed(3);canvas.dataset.carPitch=vehicle.pitch.toFixed(3);
  if(rampSmokeTest&&vehicle.activeRamp?.kind==="ramp")canvas.dataset.rampDriveUp="passed";if(rampSmokeTest&&!vehicle.grounded&&canvas.dataset.rampDriveUp==="passed")canvas.dataset.rampLaunch="passed";
}

const previousVehiclePosition = new THREE.Vector3(0,0,-28);
const previousVehicleOrientation=new THREE.Quaternion();
const renderedVehicleOrientation=new THREE.Quaternion();

function capturePhysicsPose():void{
  previousVehiclePosition.copy(vehicle.position);previousVehicleOrientation.copy(vehicle.orientation);
}

function updateVehicleVisual(alpha:number):void{
  car.position.lerpVectors(previousVehiclePosition,vehicle.position,alpha);
  renderedVehicleOrientation.slerpQuaternions(previousVehicleOrientation,vehicle.orientation,alpha);
  car.quaternion.copy(renderedVehicleOrientation);
}

function resetVehicle(announce=true):void{
  const spawn = activeLayout.spawn;
  setFireHeld(false);vehicle.position.set(spawn.x,getGroundHeight(spawn.x,spawn.z)+.06,spawn.z);vehicle.heading=spawn.heading;vehicle.speed=0;vehicle.driftAngle=0;vehicle.verticalVelocity=0;vehicle.pitch=0;vehicle.roll=0;vehicle.grounded=true;vehicle.activeRamp=null;vehicle.health=stats.maxHealth;vehicle.shield=runState?.roundShield??0;vehicle.boost=100;vehicle.orientation.setFromAxisAngle(worldUp,spawn.heading);vehicle.surfaceNormal.copy(worldUp);vehicle.projectedForward.set(Math.sin(spawn.heading),0,Math.cos(spawn.heading));vehicle.velocity.set(0,0,0);vehicle.wallContactNormal.set(0,0,0);vehicle.wallAssistActive=false;vehicle.downforce=0;capturePhysicsPose();car.position.copy(vehicle.position);car.quaternion.copy(vehicle.orientation);cameraController.snapToChase(vehicle.position,vehicle.heading,getDriveHeight);canvas.dataset.roundShield=vehicle.shield.toFixed(0);if(announce)showMessage("RIG RECOVERED // SYSTEMS ONLINE");
}

function resetOpponent():void{
  const spawn=activeLayout.opponentSpawn;opponent.maxHealth=210*(1+Math.min(.6,(currentRound-1)*.06));opponent.position.set(spawn.x,getGroundHeight(spawn.x,spawn.z)+.06,spawn.z);opponent.heading=spawn.heading;opponent.speed=0;opponent.health=opponent.maxHealth;opponent.fireCooldown=Math.max(.72,1.25-(currentRound-1)*.025);opponent.collisionCooldown=0;opponent.burnTime=0;opponent.burnDps=0;opponent.burnFxCooldown=0;opponent.maneuverTimer=0;opponent.preferredDistance=24;opponent.speedMultiplier=1;opponent.weavePhase=Math.random()*Math.PI*2;opponent.weaveRate=1.5;opponentCar.visible=true;opponentCar.position.copy(opponent.position);opponentCar.rotation.y=opponent.heading;canvas.dataset.opponentHealth=String(opponent.health);canvas.dataset.aiScaling=(1+Math.min(.6,(currentRound-1)*.06)).toFixed(2);canvas.dataset.aiState="countdown-ready";
}

function beginRoundCountdown():void{
  roundPhase="countdown";countdownEndsAt=performance.now()+COUNTDOWN_SECONDS*1000;countdownShown=3;clearTimeout(messageTimer);ui.message.classList.remove("show");ui.countdown.hidden=false;ui.countdownArena.textContent=activeLayout.name;ui.countdownValue.textContent="3";ui.countdown.querySelector("span")!.textContent="GET READY";canvas.dataset.roundPhase=roundPhase;
}

function updateRoundCountdown():void{
  if(roundPhase!=="countdown")return;const countdownRemaining=Math.max(0,(countdownEndsAt-performance.now())/1000);const next=Math.max(0,Math.ceil(countdownRemaining-COUNTDOWN_DRIVE_WINDOW));
  if(next!==countdownShown){countdownShown=next;ui.countdownValue.textContent=next>0?String(next):"DRIVE";ui.countdown.querySelector("span")!.textContent=next>0?"GET READY":"FIGHT BACK";}
  if(countdownRemaining<=0){roundPhase="active";ui.countdown.hidden=true;canvas.dataset.roundPhase=roundPhase;canvas.dataset.aiState="hunting";showMessage(`ROUND ${currentRound} // ${activeLayout.name.toUpperCase()}`);}
}

function finishRound(winner:"player"|"opponent"):void{
  if(roundAwarded)return;roundAwarded=true;roundPhase="ended";setFireHeld(false);
  if(winner==="player")playerRoundWins=Math.min(3,playerRoundWins+1);else enemyRoundWins=Math.min(3,enemyRoundWins+1);
  updateRoundHud();canvas.dataset.roundWinner=winner;canvas.dataset.roundPhase=roundPhase;ui.countdown.hidden=false;ui.countdownValue.textContent=winner==="player"?"WIN":"LOST";ui.countdownArena.textContent=playerRoundWins>=3||enemyRoundWins>=3?"MATCH COMPLETE":`ROUND ${currentRound} COMPLETE`;ui.countdown.querySelector("span")!.textContent="WAITING FOR BOTH DRIVERS";
  const smokeMode=rampSmokeTest||allSurfaceSmokeTest||wallRideSmokeTest||holdFireSmokeTest||boostSmokeTest||roundWinSmokeTest;
  if(!smokeMode){clearTimeout(roundTransitionTimer);roundTransitionTimer=window.setTimeout(()=>void checkInRound(),1500);}
}

async function checkInRound():Promise<void>{
  if(!runState||!multiplayer){return;}
  runState.round=currentRound;saveRunState();
  ui.countdown.querySelector("span")!.textContent="YOU'RE READY // WAITING FOR RIVAL";
  try{await multiplayer.markRoundComplete(draftCards(runState).map(card=>card.id),structuredClone(runState));canvas.dataset.roundReady="submitted";}
  catch(error){showRoomError(error);}
}

function clearRoundScene():void{
  setFireHeld(false);input.clear();muzzleFlash.intensity=0;
  for(const bullet of bullets)releaseProjectile(bullet.mesh,bullet.kind);bullets.length=0;
  for(const particle of dust)scene.remove(particle.mesh);dust.length=0;
  while(visualEffects.length)removeVisualEffect(visualEffects.length-1);
  for(const child of [...scene.children])if(!persistentSceneObjects.has(child))scene.remove(child);
  ramps.length=0;obstacles.length=0;boxColliders.length=0;aimSurfaces.length=0;driveHeightfields.length=0;targets.length=0;
  debugVisuals.length=0;debugVisuals.push(...persistentDebugVisuals);canvas.dataset.roundWorldCleanup="complete";
}

async function advanceRound(targetRound=currentRound+1):Promise<void>{
  if(roundPhase==="loading")return;
  const matchComplete=playerRoundWins>=3||enemyRoundWins>=3,nextLayout=activeLayout.id==="dustring"?"ovalbowl":"dustring";
  const nextRound=Math.max(currentRound+1,targetRound);roundPhase="loading";canvas.dataset.roundPhase=roundPhase;canvas.dataset.seamlessTransition="loading";ui.cardDraft.hidden=true;ui.countdown.hidden=false;ui.countdownValue.textContent="…";ui.countdownArena.textContent="NEXT ARENA";ui.countdown.querySelector("span")!.textContent="REBUILDING THE RING";startAudio();
  if(matchComplete){playerRoundWins=0;enemyRoundWins=0;}currentRound=nextRound;if(runState){runState.round=nextRound;saveRunState();}updateRoundHud();
  clearRoundScene();activeLayout=riggedArenaLayouts[nextLayout];ARENA_RADIUS=activeLayout.radius;
  await addArena();await addWorldProps();registerPhysicsDebug();auditArenaFlow();activeLayout.targets.forEach(target=>createTarget(target.x,target.z,target.rotation));aimSurfaces.push(opponentCar);auditHeightfieldCoverage();
  roundAwarded=false;resetVehicle(false);resetOpponent();updateCameraModeHud();canvas.dataset.targetsRemaining=String(activeLayout.targets.length);canvas.dataset.arenaLayout=activeLayout.id;canvas.dataset.arenaKind=activeLayout.arenaKind;canvas.dataset.arenaRadius=String(ARENA_RADIUS);canvas.dataset.ringInnerRadius=String(activeLayout.ringInnerRadius);canvas.dataset.ringOuterRadius=String(activeLayout.ringOuterRadius);canvas.dataset.mapRotation="alternate-in-document";canvas.dataset.seamlessTransition="complete";beginRoundCountdown();
}

function togglePause(force?:boolean):void{if(!levelStarted)return;paused=force??!paused;if(paused)setFireHeld(false);ui.pause.hidden=!paused;}
function toggleControls(show?:boolean):void{ui.controls.classList.toggle("closed",show===undefined?!ui.controls.classList.contains("closed"):!show);}
function toggleDebug():void{if(!levelStarted)return;debugPhysics=!debugPhysics;debugVisuals.forEach(item=>item.visible=debugPhysics);vehicleColliderDebug.visible=debugPhysics;ui.debug.hidden=!debugPhysics;showMessage(debugPhysics?`PHYSICS DEBUG // ${vehicle.grounded?"GROUNDED":"AIRBORNE"}`:"PHYSICS DEBUG // OFF");}
function toggleCameraMode():void{if(!levelStarted)return;const result=cameraController.toggle(opponent.health>0&&opponentCar.visible);updateCameraModeHud();showMessage(result.noTarget?"NO TARGET // CHASE CAM":result.mode==="enemy"?"ENEMY CAM // ON":"CHASE CAM // ON");}

canvas.dataset.assetsLoaded="0";canvas.dataset.assetErrors="0";canvas.dataset.assetManifest="riggedAssetManifest";

function prepareSurfaceTest(surface: RampSurface): void {
  const offset=new THREE.Vector3(0,0,-surface.length*.5-3).applyAxisAngle(new THREE.Vector3(0,1,0),surface.rotation);
  const x=surface.position.x+offset.x,z=surface.position.z+offset.z;
  vehicle.position.set(x,getGroundHeight(x,z)+.06,z);vehicle.heading=surface.rotation;vehicle.speed=0;vehicle.driftAngle=0;vehicle.verticalVelocity=0;vehicle.pitch=0;vehicle.roll=0;vehicle.grounded=true;vehicle.activeRamp=null;vehicle.orientation.setFromAxisAngle(worldUp,surface.rotation);car.position.copy(vehicle.position);car.quaternion.copy(vehicle.orientation);
}

function runRampTraversalSuite(): boolean {
  const rampSurfaces=ramps.filter(surface=>surface.kind==="ramp");const failures:string[]=[];
  let landingPasses=0;
  for(const surface of rampSurfaces){
    prepareSurfaceTest(surface);let touched=false,launched=false,landed=false;input.add("KeyW");
    for(let step=0;step<600;step++){
      elapsed+=FIXED_TIMESTEP;updateVehicle(FIXED_TIMESTEP);updateHud();
      if(vehicle.activeRamp?.label===surface.label)touched=true;
      if(touched&&!vehicle.grounded)launched=true;
      if(launched&&vehicle.grounded&&vehicle.activeRamp?.label!==surface.label){landed=true;break;}
    }
    input.delete("KeyW");
    if(landed)landingPasses++;
    if(!touched||!launched||!landed)failures.push(`${surface.label}:${!touched?"no-contact":!launched?"no-launch":"no-landing"}`);
  }
  canvas.dataset.allRampExpected=String(rampSurfaces.length);canvas.dataset.allRampPasses=String(rampSurfaces.length-failures.length);canvas.dataset.allRampLandings=String(landingPasses);canvas.dataset.allRampFailures=failures.join("|")||"none";canvas.dataset.rampDriveUp=failures.some(failure=>failure.endsWith("no-contact"))?"failed":"passed";canvas.dataset.rampLaunch=failures.some(failure=>failure.endsWith("no-launch"))?"failed":"passed";canvas.dataset.rampLanding=landingPasses===rampSurfaces.length?"passed":"failed";
  return failures.length===0;
}

function runWallTurningSuite(bowl:NonNullable<RiggedArenaLayout["bowl"]>):boolean{
  const wallWidth=bowl.outerRadius-bowl.flatRadius;
  const tangentRadius=bowl.flatRadius+wallWidth*.48;
  const capAngle=Math.PI*.25;
  const cases=[
    {label:"straight-along-bank",x:tangentRadius,z:-30,heading:0,steps:180,drive:false,steer:"none" as const},
    {label:"turn-left-while-climbing",x:bowl.flatRadius+2,z:-18,heading:Math.PI/2,steps:170,drive:true,steer:"left" as const},
    {label:"turn-right-while-climbing",x:bowl.flatRadius+2,z:18,heading:Math.PI/2,steps:170,drive:true,steer:"right" as const},
    {label:"steer-around-rounded-cap",x:Math.cos(capAngle)*tangentRadius,z:bowl.straightHalfLength+Math.sin(capAngle)*tangentRadius,heading:-capAngle,steps:210,drive:false,steer:"cap" as const},
  ];
  const failures:string[]=[];let globalMaxRoll=0,globalMaxPitch=0,globalMinUpDot=1;
  for(const test of cases){
    vehicle.position.set(test.x,getGroundHeight(test.x,test.z)+.06,test.z);vehicle.heading=test.heading;vehicle.speed=test.drive?8:14;vehicle.driftAngle=0;vehicle.verticalVelocity=0;vehicle.pitch=0;vehicle.roll=0;vehicle.grounded=true;vehicle.activeRamp=null;vehicle.orientation.setFromAxisAngle(worldUp,test.heading);
    let wallFrames=0,maxRoll=0,maxPitch=0,minUpDot=1,stayedInside=true,finite=true;
    if(test.drive)input.add("KeyW");
    for(let step=0;step<test.steps;step++){
      if(test.steer==="left"&&step>=34&&step<72)input.add("KeyA");else input.delete("KeyA");
      if(test.steer==="right"&&step>=34&&step<72)input.add("KeyD");
      else if(test.steer==="cap"&&step%6===0)input.add("KeyD");
      else input.delete("KeyD");
      elapsed+=FIXED_TIMESTEP;updateVehicle(FIXED_TIMESTEP);
      if(test.steer==="cap")input.delete("KeyD");
      const sample=sampleOvalBowl(bowl,vehicle.position.x,vehicle.position.z);
      if(sample.progress>.001)wallFrames++;
      actualVehicleUp.set(0,1,0).applyQuaternion(vehicle.orientation).normalize();
      const upDot=actualVehicleUp.dot(sample.normal);if(step>18)minUpDot=Math.min(minUpDot,upDot);
      maxRoll=Math.max(maxRoll,Math.abs(vehicle.roll));maxPitch=Math.max(maxPitch,Math.abs(vehicle.pitch));
      finite=finite&&Number.isFinite(vehicle.position.x)&&Number.isFinite(vehicle.position.y)&&Number.isFinite(vehicle.position.z)&&Number.isFinite(vehicle.roll)&&Number.isFinite(vehicle.pitch);
      for(const offset of [-VEHICLE_COLLIDER_HALF_LENGTH,0,VEHICLE_COLLIDER_HALF_LENGTH]){
        const footprint=sampleOvalBowl(bowl,vehicle.position.x+Math.sin(vehicle.heading)*offset,vehicle.position.z+Math.cos(vehicle.heading)*offset);
        stayedInside=stayedInside&&footprint.distance<=bowl.outerRadius-VEHICLE_COLLIDER_RADIUS+.05;
      }
    }
    input.delete("KeyW");input.delete("KeyA");input.delete("KeyD");
    globalMaxRoll=Math.max(globalMaxRoll,maxRoll);globalMaxPitch=Math.max(globalMaxPitch,maxPitch);globalMinUpDot=Math.min(globalMinUpDot,minUpDot);
    const stable=finite&&stayedInside&&wallFrames>=Math.min(90,test.steps*.6)&&maxRoll<=MAX_ARCADE_WALL_ROLL+.025&&maxPitch<=MAX_ARCADE_WALL_ROLL+.025&&minUpDot>.72;
    if(!stable)failures.push(`${test.label}:${!finite?"non-finite":!stayedInside?"escaped":wallFrames<90?"lost-wall":maxRoll>MAX_ARCADE_WALL_ROLL+.025?"roll":maxPitch>MAX_ARCADE_WALL_ROLL+.025?"pitch":"up-vector"}`);
  }
  const passed=failures.length===0;
  canvas.dataset.wallTurningSmoke=passed?"passed":"failed";canvas.dataset.wallTurningCases=String(cases.length);canvas.dataset.wallTurningFailures=failures.join("|")||"none";canvas.dataset.wallTurningMaxRoll=THREE.MathUtils.radToDeg(globalMaxRoll).toFixed(1);canvas.dataset.wallTurningMaxPitch=THREE.MathUtils.radToDeg(globalMaxPitch).toFixed(1);canvas.dataset.wallTurningMinUpDot=globalMinUpDot.toFixed(3);
  return passed;
}

function runWallRideSuite(): boolean {
  if (activeLayout.arenaKind !== "capsule" || !activeLayout.bowl) {
    canvas.dataset.wallRideSmoke = "skipped-non-bowl";
    return true;
  }
  const bowl = activeLayout.bowl;
  const approaches = [
    { label: "east-straight", x: bowl.flatRadius - 5, z: 0, heading: Math.PI / 2 },
    { label: "east-diagonal", x: bowl.flatRadius - 5, z: -14, heading: Math.PI / 2 - .34 },
    { label: "north-cap", x: 0, z: bowl.straightHalfLength + bowl.flatRadius - 5, heading: 0 },
    { label: "north-cap-diagonal", x: -14, z: bowl.straightHalfLength + bowl.flatRadius - 5, heading: .34 },
  ];
  const failures:string[]=[];
  let maximumProgress = 0, maximumHeight = 0, stayedInside = true, returnedToFloor = true;
  for(const approach of approaches){
    vehicle.position.set(approach.x,getGroundHeight(approach.x,approach.z)+.06,approach.z);
    vehicle.heading=approach.heading;vehicle.speed=8;vehicle.driftAngle=0;vehicle.verticalVelocity=0;
    vehicle.pitch=0;vehicle.roll=0;vehicle.grounded=true;vehicle.activeRamp=null;vehicle.orientation.setFromAxisAngle(worldUp,approach.heading);
    let routeProgress=0,routeHeight=0,contactedWall=false;
    input.add("KeyW");
    for(let step=0;step<210;step++){
      elapsed+=FIXED_TIMESTEP;updateVehicle(FIXED_TIMESTEP);
      const sample=sampleOvalBowl(bowl,vehicle.position.x,vehicle.position.z);
      routeProgress=Math.max(routeProgress,sample.progress);routeHeight=Math.max(routeHeight,vehicle.position.y);
      maximumProgress=Math.max(maximumProgress,routeProgress);maximumHeight=Math.max(maximumHeight,routeHeight);
      contactedWall=contactedWall||sample.progress>.001;
      for(const offset of [-VEHICLE_COLLIDER_HALF_LENGTH,0,VEHICLE_COLLIDER_HALF_LENGTH]){
        const footprint=sampleOvalBowl(bowl,vehicle.position.x+Math.sin(vehicle.heading)*offset,vehicle.position.z+Math.cos(vehicle.heading)*offset);
        stayedInside=stayedInside&&footprint.distance<=bowl.outerRadius-VEHICLE_COLLIDER_RADIUS+.05;
      }
    }
    const wallSample=sampleOvalBowl(bowl,vehicle.position.x,vehicle.position.z);
    vehicle.heading=Math.atan2(-wallSample.outwardX,-wallSample.outwardZ);vehicle.driftAngle=0;vehicle.speed=Math.max(7,Math.abs(vehicle.speed));
    for(let step=0;step<180;step++){elapsed+=FIXED_TIMESTEP;updateVehicle(FIXED_TIMESTEP);}
    input.delete("KeyW");
    const finalProgress=sampleOvalBowl(bowl,vehicle.position.x,vehicle.position.z).progress;
    const routeReturned=finalProgress<.08&&vehicle.grounded;
    returnedToFloor=returnedToFloor&&routeReturned;
    if(!contactedWall||routeProgress<=.28||routeHeight<=2||!routeReturned)failures.push(`${approach.label}:${!contactedWall?"no-contact":routeProgress<=.28?"too-low":routeHeight<=2?"no-rise":"no-return"}`);
  }
  const turningPassed=runWallTurningSuite(bowl);
  let passed = failures.length===0 && stayedInside && returnedToFloor && turningPassed;
  canvas.dataset.wallRideApproaches = String(approaches.length);
  canvas.dataset.wallRideFailures = failures.join("|") || "none";
  canvas.dataset.wallRideMaxProgress = maximumProgress.toFixed(2);
  canvas.dataset.wallRideMaxHeight = maximumHeight.toFixed(2);
  canvas.dataset.wallRideBoundary = stayedInside ? "passed" : "failed";
  canvas.dataset.wallRideReturn = returnedToFloor ? "passed" : "failed";
  resetVehicle();
  actualVehicleUp.set(0,1,0).applyQuaternion(vehicle.orientation);
  const resetPassed=vehicle.position.x===activeLayout.spawn.x&&vehicle.position.z===activeLayout.spawn.z&&vehicle.speed===0&&vehicle.velocity.lengthSq()===0&&vehicle.verticalVelocity===0&&vehicle.pitch===0&&vehicle.roll===0&&actualVehicleUp.dot(worldUp)>.999&&vehicle.grounded&&!vehicle.wallAssistActive&&sampleOvalBowl(bowl,vehicle.position.x,vehicle.position.z).progress===0;
  canvas.dataset.wallReset=resetPassed?"passed":"failed";
  passed=passed&&resetPassed;canvas.dataset.wallRideSmoke=passed?"passed":"failed";
  return passed;
}

function runSmokeRoutes(): void {
  let surfacePass=true;
  if(rampSmokeTest||allSurfaceSmokeTest)surfacePass=runRampTraversalSuite()&&surfacePass;
  if(rampSmokeTest||allSurfaceSmokeTest)canvas.dataset.physicsSmoke=surfacePass?"passed":"failed";
  if(wallRideSmokeTest)canvas.dataset.physicsSmoke=runWallRideSuite()?"passed":"failed";
  if(holdFireSmokeTest){
    aimPoint.copy(vehicle.position).add(new THREE.Vector3(0,1,40));aimReady=true;car.updateMatrixWorld(true);setFireHeld(true);
    for(let step=0;step<120;step++)updateWeapon(FIXED_TIMESTEP);
    setFireHeld(false);const smokeShots=Number(canvas.dataset.shotsFired??0);const shotLimit=Math.ceil(2*weaponStats.fireRate)+1;
    canvas.dataset.holdFireSmoke=smokeShots>=2&&smokeShots<=shotLimit?"passed":"failed";canvas.dataset.fireRateLimited=smokeShots<=shotLimit?"passed":"failed";canvas.dataset.holdFireShots=String(smokeShots);
  }
  if(boostSmokeTest){
    vehicle.boost=100;input.add("KeyW");input.add("ShiftLeft");for(let step=0;step<60;step++)updateVehicle(FIXED_TIMESTEP);
    const depleted=vehicle.boost;input.delete("ShiftLeft");for(let step=0;step<60;step++)updateVehicle(FIXED_TIMESTEP);const recharged=vehicle.boost;input.clear();
    canvas.dataset.boostAfterUse=depleted.toFixed(1);canvas.dataset.boostAfterRecharge=recharged.toFixed(1);canvas.dataset.boostSmoke=depleted<80&&recharged>depleted&&recharged<95?"passed":"failed";resetVehicle();
  }
  if(roundWinSmokeTest){roundPhase="active";damageOpponent(999);canvas.dataset.roundHudSmoke=playerRoundWins===1&&canvas.dataset.roundWinner==="player"?"passed":"failed";}
}

function showRoomError(error:unknown):void{
  const message=error instanceof Error?error.message:"Multiplayer connection failed.";
  ui.roomStatus.textContent=message;showMessage(message.toUpperCase());
}

function renderRoomLobby(room:RiggedRoom|null):void{
  if(!room){ui.roomEntry.hidden=false;ui.roomWaiting.hidden=true;ui.addAI.hidden=true;return;}
  const players=roomPlayers(room),inLobby=room.phase==="lobby";
  ui.multiplayerLobby.hidden=!inLobby;ui.roomEntry.hidden=true;ui.roomWaiting.hidden=false;ui.roomCodeDisplay.textContent=room.code;
  const rows=players.map(player=>{const row=document.createElement("div");row.className="room-player";const name=document.createElement("b");name.textContent=player.name;const role=document.createElement("span");role.textContent=player.id===room.hostId?"HOST // PICKS FIRST":player.isAI?"AI RIVAL // PICKS SECOND":"RIVAL // PICKS SECOND";row.append(name,role);return row;});
  if(players.length<2){const empty=document.createElement("div");empty.className="room-player room-player--empty";const name=document.createElement("b");name.textContent="OPEN SEAT";const role=document.createElement("span");role.textContent="SHARE THE ROOM CODE";empty.append(name,role);rows.push(empty);}
  ui.roomPlayers.replaceChildren(...rows);const canStart=multiplayer?.isHost()===true&&players.length===2;
  ui.addAI.hidden=multiplayer?.isHost()!==true||players.length>=2;ui.addAI.disabled=!inLobby;
  ui.startRun.disabled=!canStart;ui.startRun.textContent=canStart?"START SHARED RUN":multiplayer?.isHost()?"WAITING FOR RIVAL":"WAITING FOR HOST";
  ui.roomStatus.textContent=players.length<2?"Room ready. Invite a friend or add an AI rival.":canStart?"Both drivers connected. Launch when ready.":"Both drivers connected. Waiting for the host.";
}

function maybeRunAITurn(room:RiggedRoom):void{
  const ai=roomPlayers(room).find(player=>player.isAI);
  if(!ai||room.activePickerId!==ai.id||multiplayer?.isHost()!==true||aiPickPending)return;
  if(!["starter_draft","vehicle_select","upgrade_draft"].includes(room.phase))return;
  aiPickPending=true;const sequence=room.pickSequence;
  window.setTimeout(async()=>{
    try{
      if(!multiplayer||!activeRoom||activeRoom.pickSequence!==sequence||activeRoom.activePickerId!==ai.id)return;
      const options=activeRoom.draftOptions;
      if(!options.length)return;
      const optionId=activeRoom.phase==="starter_draft"?(["sniper","rocket","mg"] as const).find(kind=>options.includes(kind))??options[0]:options[Math.floor(Math.random()*options.length)];
      if(activeRoom.phase==="vehicle_select"){
        if(isVehicleId(optionId))await multiplayer.submitAiVehiclePick(optionId,riggedVehicleCatalog[optionId].label);
        return;
      }
      if(activeRoom.phase==="starter_draft"){
        const kind=optionId as WeaponKind,nextState=activeRoom.runState?structuredClone(activeRoom.runState):createStarterRun(kind,currentRound);
        if(activeRoom.runState)applyCard(nextState,createTurretCard(kind));
        const nextOptions=activeRoom.draftTurn===0?(["mg","rocket","sniper"] as WeaponKind[]).filter(option=>option!==kind):Object.keys(riggedVehicleCatalog);
        await multiplayer.submitAiPick({optionId:kind,optionName:turretShortNames[kind],nextRunState:nextState,nextOptions});return;
      }
      if(!runState)return;const card=resolveRoomCards(options,runState).find(item=>item.id===optionId);if(!card)return;
      const nextState=structuredClone(runState);applyCard(nextState,card);nextState.round=currentRound;
      const nextOptions=activeRoom.draftTurn===0?draftCards(nextState).map(option=>option.id):[];
      await multiplayer.submitAiPick({optionId:card.id,optionName:card.name,nextRunState:nextState,nextOptions});
    }catch(error){showRoomError(error);}finally{aiPickPending=false;}
  },900);
}

function syncRunFromRoom(room:RiggedRoom):void{
  if(!room.runState)return;
  runState=structuredClone(room.runState);saveRunState();selectedWeapon=runState.activeTurret;
  if(levelStarted){recomputeRunStats();selectWeapon(selectedWeapon,false);updateLoadoutUi();}
  canvas.dataset.runState="shared";canvas.dataset.roomCode=room.code;
}

function syncVehicleFromRoom(room:RiggedRoom):void{
  if(!multiplayer)return;const chosen=room.vehicleSelections?.[multiplayer.playerId];if(!isVehicleId(chosen)||chosen===selectedVehicleId)return;
  selectedVehicleId=chosen;if(levelStarted)void loadVehicleModel(chosen);
}

function animateRoomPick(pick:RiggedRoomPick):void{
  const mode=!ui.starterSelect.hidden?"starter":!ui.vehicleSelect.hidden?"vehicle":"upgrade",grid=mode==="starter"?ui.starterSelect:mode==="vehicle"?ui.vehicleGrid:ui.cardGrid,reveal=mode==="starter"?ui.starterPickReveal:mode==="vehicle"?ui.vehiclePickReveal:ui.draftPickReveal;
  const picker=activeRoom?roomPlayers(activeRoom).find(player=>player.id===pick.playerId):null;
  grid.querySelectorAll<HTMLElement>(".starter-card,.upgrade-card,.vehicle-card").forEach(card=>{
    const picked=card.dataset.optionId===pick.optionId;card.classList.toggle("is-picked",picked);card.classList.toggle("is-fizzling",!picked&&!card.hidden);
    card.querySelectorAll<HTMLButtonElement>("button").forEach(button=>button.disabled=true);
  });
  reveal.textContent=`${picker?.name??"Driver"} picked ${pick.optionName}`;reveal.hidden=false;pickAnimationActive=true;canvas.dataset.pickAnimation="fizzle";canvas.dataset.lastCardChosen=pick.optionId;
  window.setTimeout(finishPickAnimation,1300);
}

function finishPickAnimation():void{
  pickAnimationActive=false;const room=activeRoom;if(!room)return;
  if(room.phase==="starter_draft"){showStarterTurretSelect();maybeRunAITurn(room);return;}
  if(room.phase==="vehicle_select"){showVehicleSelect();maybeRunAITurn(room);return;}
  if(room.phase==="upgrade_draft"){showCardDraft();maybeRunAITurn(room);return;}
  if(room.phase!=="playing"||room.round<=lastStartedRoomRound)return;
  ui.starterSelect.hidden=true;ui.vehicleSelect.hidden=true;ui.cardDraft.hidden=true;ui.weaponSelect.classList.remove("draft-open");canvas.dataset.starterSelection="complete";canvas.dataset.vehicleSelection="complete";canvas.dataset.cardApplied="true";startAudio();const firstRound=lastStartedRoomRound===0;lastStartedRoomRound=room.round;
  if(firstRound){currentRound=room.round;updateRoundHud();resetVehicle(false);resetOpponent();beginRoundCountdown();}
  else void advanceRound(room.round);
}

function handleRoomSnapshot(room:RiggedRoom|null):void{
  activeRoom=room;renderRoomLobby(room);if(!room)return;
  syncRunFromRoom(room);syncVehicleFromRoom(room);
  maybeRunAITurn(room);
  const newPick=room.lastPick&&room.lastPick.id>renderedPickId;
  if(newPick){renderedPickId=room.lastPick!.id;if(levelStarted)animateRoomPick(room.lastPick!);return;}
  if(!levelStarted||pickAnimationActive)return;
  if(room.phase==="starter_draft"){showStarterTurretSelect();maybeRunAITurn(room);return;}
  if(room.phase==="vehicle_select"){showVehicleSelect();maybeRunAITurn(room);return;}
  if(room.phase==="upgrade_draft"){showCardDraft();maybeRunAITurn(room);return;}
  if(room.phase==="playing"&&room.round>lastStartedRoomRound)finishPickAnimation();
}

async function setupMultiplayer():Promise<void>{
  const savedName=localStorage.getItem("rigged-player-name")??"";ui.playerName.value=savedName;
  const linkedCode=cleanRoomCode(new URLSearchParams(location.search).get("room")??"");if(linkedCode)ui.roomCodeInput.value=linkedCode;
  ui.hostRoom.disabled=true;ui.startRun.disabled=true;
  try{
    multiplayer=await RiggedMultiplayerClient.connect();multiplayer.onRoom(handleRoomSnapshot);ui.hostRoom.disabled=false;ui.roomStatus.textContent="Firebase online. Host a room or join a friend.";
  }catch(error){showRoomError(error);ui.roomStatus.textContent="Could not connect to Firebase. Check the network and reload.";return;}
  ui.hostRoom.addEventListener("click",async()=>{
    if(!multiplayer)return;ui.hostRoom.disabled=true;const name=cleanPlayerName(ui.playerName.value);localStorage.setItem("rigged-player-name",name);
    try{const code=await multiplayer.createRoom(name);const url=new URL(location.href);url.searchParams.set("room",code);history.replaceState(null,"",url);sessionStorage.removeItem(RUN_STORAGE_KEY);runState=null;}
    catch(error){showRoomError(error);ui.hostRoom.disabled=false;}
  });
  ui.joinRoomForm.addEventListener("submit",async event=>{
    event.preventDefault();if(!multiplayer)return;const submit=ui.joinRoomForm.querySelector<HTMLButtonElement>("button")!;submit.disabled=true;const name=cleanPlayerName(ui.playerName.value);localStorage.setItem("rigged-player-name",name);
    try{const code=await multiplayer.joinRoom(ui.roomCodeInput.value,name);const url=new URL(location.href);url.searchParams.set("room",code);history.replaceState(null,"",url);sessionStorage.removeItem(RUN_STORAGE_KEY);runState=null;}
    catch(error){showRoomError(error);submit.disabled=false;}
  });
  ui.startRun.addEventListener("click",()=>multiplayer?.startRun().catch(showRoomError));
  ui.addAI.addEventListener("click",()=>{ui.addAI.disabled=true;multiplayer?.addAI().catch(error=>{showRoomError(error);ui.addAI.disabled=false;});});
  ui.roomCodeDisplay.addEventListener("click",()=>{if(!activeRoom)return;navigator.clipboard?.writeText(activeRoom.code).catch(()=>undefined);ui.roomStatus.textContent="Room code copied.";});
  ui.roomCodeInput.addEventListener("input",()=>{ui.roomCodeInput.value=cleanRoomCode(ui.roomCodeInput.value);});
}

async function startLevel(levelId: RiggedLevelId): Promise<void> {
  if (levelStarted || levelStarting) return;
  levelStarting = true;
  if(persistentSceneObjects.size===0){scene.children.forEach(object=>persistentSceneObjects.add(object));debugVisuals.forEach(object=>persistentDebugVisuals.add(object));}
  activeLayout = riggedArenaLayouts[levelId]; ARENA_RADIUS = activeLayout.radius;
  showMessage(`ASSEMBLING // ${activeLayout.name.toUpperCase()}`);
  document.querySelectorAll<HTMLButtonElement>("[data-level]").forEach(button => button.disabled = true);
  await addArena(); await addWorldProps(); registerPhysicsDebug(); auditArenaFlow(); buildCar(); buildOpponentCar();persistentSceneObjects.add(car);persistentSceneObjects.add(opponentCar);recomputeRunStats();
  activeLayout.targets.forEach(target => createTarget(target.x, target.z, target.rotation));
  roundAwarded=false;updateRoundHud();canvas.dataset.targetsRemaining=String(activeLayout.targets.length);
  canvas.dataset.prototype="rigged-1v1-combat";canvas.dataset.audioSystem="pooled-stereo-combat-sfx-v3";canvas.dataset.arenaLayout=activeLayout.id;canvas.dataset.arenaKind=activeLayout.arenaKind;canvas.dataset.arenaRadius=String(ARENA_RADIUS);canvas.dataset.ringInnerRadius=String(activeLayout.ringInnerRadius);canvas.dataset.ringOuterRadius=String(activeLayout.ringOuterRadius);canvas.dataset.rampColliders=String(ramps.filter(ramp=>ramp.kind==="ramp").length);canvas.dataset.bridgeColliders=String(ramps.filter(ramp=>ramp.kind==="bridge").length);canvas.dataset.heightfieldColliders=String(driveHeightfields.length);canvas.dataset.majorColliders=String(obstacles.length+boxColliders.length+(activeLayout.arenaKind==="capsule"?3:0));canvas.dataset.vehicleCollider="three-disc-capsule-2.24x4.14x0.72";canvas.dataset.shotsFired="0";canvas.dataset.aiShotsFired="0";canvas.dataset.fireHeld="false";canvas.dataset.arenaDrops="disabled";canvas.dataset.racekartAssets="modular-racekart-track-hilly";canvas.dataset.racingAssetsUsage=activeLayout.arenaKind==="capsule"?"rim-railings":"ramps-fences-props";canvas.dataset.colliderSource=activeLayout.arenaKind==="capsule"?"analytic-capsule-bands":"visual-asset-heightfields";canvas.dataset.wallRideContact="pending";canvas.dataset.mapRotation="alternate-in-document";auditHeightfieldCoverage();await warmCombatResources();
  levelStarted = true; levelStarting = false; paused = false; resetVehicle(false);resetOpponent();updateCameraModeHud();
  const smokeMode=rampSmokeTest||allSurfaceSmokeTest||wallRideSmokeTest||holdFireSmokeTest||boostSmokeTest||roundWinSmokeTest;
  if(smokeMode)ui.multiplayerLobby.hidden=true;
  if(smokeMode&&!runState){runState=createStarterRun("mg",currentRound);selectedWeapon="mg";saveRunState();recomputeRunStats();selectWeapon("mg",false);beginRoundCountdown();}
  else if(smokeMode&&runState){selectedWeapon=runState.activeTurret;recomputeRunStats();selectWeapon(selectedWeapon,false);beginRoundCountdown();}
  else if(vehiclePreviewTest){activeRoom={code:"PREVIEW",hostId:"preview-player",phase:"vehicle_select",round:1,players:{"preview-player":{name:"Preview Driver",joinedAt:1},rival:{name:"Rival Driver",joinedAt:2}},playerOrder:["preview-player","rival"],activePickerId:"preview-player",draftOptions:Object.keys(riggedVehicleCatalog),draftTurn:0,pickSequence:0,lastPick:null,vehicleSelections:{},roundReady:{},runState:null,createdAt:1,updatedAt:1};ui.multiplayerLobby.hidden=true;showVehicleSelect();}
  else if(activeRoom)handleRoomSnapshot(activeRoom);
  if(initialParams.get("auto")==="1"&&runState)startAudio();runSmokeRoutes();
  if(roundPhase!=="ended"&&(rampSmokeTest||allSurfaceSmokeTest||wallRideSmokeTest||holdFireSmokeTest||boostSmokeTest))showMessage(rampSmokeTest?"RAMP SUITE // AUTO DRIVE":allSurfaceSmokeTest?"ALL RAMPS // AUTO DRIVE":wallRideSmokeTest?"WALL-RIDE SUITE // AUTO DRIVE":holdFireSmokeTest?"HOLD-FIRE SMOKE TEST // COMPLETE":"BOOST STAMINA TEST // COMPLETE");
}

document.querySelectorAll<HTMLButtonElement>("[data-weapon]").forEach(button=>{
  button.addEventListener("click",()=>selectWeapon(button.dataset.weapon as WeaponKind));
});
document.querySelectorAll<HTMLButtonElement>("[data-starter-turret]").forEach(button=>{
  button.addEventListener("click",()=>void chooseStarterTurret(button.dataset.starterTurret as WeaponKind));
});
selectWeapon("mg",false);
updateRoundHud();
const requestedLevel = new URLSearchParams(location.search).get("level") as RiggedLevelId | null;
if(!vehiclePreviewTest)void setupMultiplayer();
void startLevel(requestedLevel && requestedLevel in riggedArenaLayouts ? requestedLevel : defaultRiggedLevel);

window.addEventListener("keydown",event=>{if(["KeyW","KeyA","KeyS","KeyD","Space","ShiftLeft","KeyC","KeyF","F3","Digit1","Digit2","Digit3"].includes(event.code))event.preventDefault();if(event.repeat||!levelStarted)return;if(event.code==="Escape"){togglePause();return;}if(event.code==="KeyC"){toggleCameraMode();return;}if(event.code.startsWith("Digit")){const kind=(["mg","rocket","sniper"] as const)[Number(event.code.slice(5))-1];if(kind)selectWeapon(kind);return;}if(event.code==="KeyR")resetVehicle();if(event.code==="KeyB"||event.code==="KeyH"||event.code==="F3")toggleDebug();if(event.code==="KeyF")setFireHeld(true);input.add(event.code);});
window.addEventListener("keyup",event=>{input.delete(event.code);if(event.code==="KeyF")setFireHeld(false);});
canvas.addEventListener("pointermove",event=>{const bounds=canvas.getBoundingClientRect();mouse.x=(event.clientX-bounds.left)/bounds.width*2-1;mouse.y=-(event.clientY-bounds.top)/bounds.height*2+1;const crosshair=getElement("crosshair");crosshair.style.left=`${event.clientX}px`;crosshair.style.top=`${event.clientY}px`;});
canvas.addEventListener("pointerdown",event=>{if(event.button===0)setFireHeld(true);});
window.addEventListener("pointerup",event=>{if(event.button===0)setFireHeld(false);});
canvas.addEventListener("pointerleave",event=>{if(event.buttons&1)setFireHeld(false);});
canvas.addEventListener("wheel",event=>{event.preventDefault();cycleOwnedTurret(event.deltaY>0?1:-1);},{passive:false});
window.addEventListener("blur",()=>{input.clear();setFireHeld(false);});
document.addEventListener("visibilitychange",()=>{if(document.hidden){input.clear();setFireHeld(false);}});
window.addEventListener("keydown", startAudio, { capture: true });
window.addEventListener("pointerdown", startAudio, { capture: true });
canvas.addEventListener("contextmenu",event=>event.preventDefault());
getElement("controls-close").addEventListener("click",()=>toggleControls(false));getElement("resume-button").addEventListener("click",()=>togglePause(false));
document.querySelectorAll<HTMLButtonElement>("[data-key]").forEach(button=>{const code=button.dataset.key??"";const press=(event:PointerEvent)=>{event.preventDefault();if(code==="Fire")setFireHeld(true);else input.add(code);};const release=(event:PointerEvent)=>{event.preventDefault();if(code==="Fire")setFireHeld(false);else input.delete(code);};button.addEventListener("pointerdown",press);button.addEventListener("pointerup",release);button.addEventListener("pointercancel",release);button.addEventListener("pointerleave",release);});
window.addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight,false);renderer.setPixelRatio(Math.min(devicePixelRatio,MAX_PIXEL_RATIO));});

const clock=new THREE.Clock();let physicsAccumulator=0;let hudAccumulator=0;let debugAccumulator=0;let frameAverage=1/60;let physicsStepMs=0;
function updateDebug(frameDelta:number):void{
  if(!debugPhysics)return;frameAverage=THREE.MathUtils.lerp(frameAverage,frameDelta,.08);debugAccumulator+=frameDelta;if(debugAccumulator<.2)return;debugAccumulator=0;
  const fps=frameAverage>0?1/frameAverage:0;const contact=vehicle.grounded?(vehicle.activeRamp?vehicle.activeRamp.kind.toUpperCase():(activeLayout.arenaKind==="capsule"?"FLAT FLOOR":"TERRAIN")):"AIRBORNE";
  const surfaceColliderCount=activeLayout.arenaKind==="capsule"?3:driveHeightfields.length;
  ui.debug.textContent=`COLLISION DEBUG\n${contact} // ${(canvas.dataset.surfaceType??"flat-floor").toUpperCase()} // ${canvas.dataset.surfaceLabel??"base terrain"}\nUP [${canvas.dataset.carUp??"0.00,1.00,0.00"}]  NORMAL [${canvas.dataset.surfaceNormal??"0.00,1.00,0.00"}]\nSURFACE FWD [${canvas.dataset.projectedForward??"0.00,0.00,1.00"}]\nVELOCITY [${canvas.dataset.velocityVector??"0.00,0.00,0.00"}]  CONTACT N [${canvas.dataset.wallContactNormal??"0.00,0.00,0.00"}]\nASSIST ${(canvas.dataset.wallAssist??"off").toUpperCase()}  DOWNFORCE ${canvas.dataset.wallDownforce??"0.00"}  ROLL ${THREE.MathUtils.radToDeg(vehicle.roll).toFixed(1)}°  PITCH ${THREE.MathUtils.radToDeg(vehicle.pitch).toFixed(1)}°\nSURFACE ${canvas.dataset.surfaceHeight??"0.00"}M  BASE ${canvas.dataset.baseGroundHeight??"0.00"}M  ERROR ${canvas.dataset.heightMismatch??"0.000"}M\n${Math.abs(vehicle.speed*4.2).toFixed(0)} KM/H  ${fps.toFixed(0)} FPS  ${(frameAverage*1000).toFixed(1)} MS FRAME\n${physicsStepMs.toFixed(2)} MS PHYSICS  60 HZ  ${surfaceColliderCount} COLLIDERS\n${renderer.info.render.calls} DRAWS  ${renderer.info.render.triangles.toLocaleString()} TRIS  ${scene.children.length+bullets.length+dust.length} OBJECTS`;
  canvas.dataset.physicsFps="60";canvas.dataset.frameDeltaMs=(frameAverage*1000).toFixed(2);canvas.dataset.physicsStepMs=physicsStepMs.toFixed(2);
}
function animate():void{
  requestAnimationFrame(animate);const frameDelta=Math.min(clock.getDelta(),MAX_FRAME_DELTA);
  if(!paused&&levelStarted)updateRoundCountdown();
  lightShafts.rotation.y += frameDelta * .0025; atmosphericDust.rotation.y -= frameDelta * .0015;
  updateAudioFrame(frameDelta);
  if(!paused&&levelStarted){
    if(roundPhase==="active"){
      physicsAccumulator=Math.min(physicsAccumulator+frameDelta,FIXED_TIMESTEP*MAX_PHYSICS_STEPS);
      const physicsStart=performance.now();let steps=0;
      while(physicsAccumulator>=FIXED_TIMESTEP&&steps<MAX_PHYSICS_STEPS){capturePhysicsPose();elapsed+=FIXED_TIMESTEP;updateVehicle(FIXED_TIMESTEP);updateOpponent(FIXED_TIMESTEP);updateWeapon(FIXED_TIMESTEP);updateProjectiles(FIXED_TIMESTEP);physicsAccumulator-=FIXED_TIMESTEP;steps++;}
      physicsStepMs=performance.now()-physicsStart;updateVehicleVisual(physicsAccumulator/FIXED_TIMESTEP);
    }else{physicsAccumulator=0;if(roundPhase==="ended")updateProjectiles(frameDelta);}
    updateCamera(frameDelta);updateWorldHealthTags();updateAim(frameDelta);hudAccumulator+=frameDelta;if(hudAccumulator>.1){hudAccumulator=0;updateHud();}
  }else{physicsAccumulator=0;}
  if(!levelStarted||paused)updateWorldHealthTags();
  renderer.render(scene,camera);updateDebug(frameDelta);
}
animate();

function getElement<T extends HTMLElement=HTMLElement>(id:string):T{const element=document.getElementById(id);if(!element)throw new Error(`Missing #${id}`);return element as T;}

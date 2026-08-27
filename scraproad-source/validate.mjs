import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../scraproad");
const racekartModels = [
  "Prop_Track_Ramp", "Prop_Track_Ramp_Railing", "Prop_Decorative_Fence_Railing",
  "Prop_Decorative_Rock_2", "Prop_Decorative_Rock_5",
  "Prop_Decorative_Hay_Bale_Box",
];
const required = [
  "index.html", "ASSET_CREDITS.md", "THIRD_PARTY_LICENSES.txt", "assets/cloudy-sky.png", "assets/nitro-games.wav",
  "assets/scraproad/vehicles/kenney-suv.glb",
  "assets/scraproad/vehicles/Textures/colormap.png",
  "assets/scraproad/arena/kenney-ramp.glb",
  "assets/scraproad/arena/kenney-barrier-wall.glb",
  "assets/scraproad/arena/kenney-pylon.glb",
  "assets/scraproad/props/kenney-crate.glb",
  "assets/scraproad/props/kenney-debris-tire.glb",
  "assets/scraproad/props/kenney-debris-bumper.glb",
  "assets/scraproad/props/Textures/colormap.png",
  "assets/scraproad/licenses/kenney-car-kit.txt",
  "assets/scraproad/licenses/kenney-racing-kit.txt",
  "assets/scraproad/racekart-hilly/LICENSE-CC0.txt",
  ...racekartModels.flatMap(name => [`assets/scraproad/racekart-hilly/${name}.obj`, `assets/scraproad/racekart-hilly/${name}.mtl`]),
];
for (const file of required) await access(resolve(root, file));

const html = await readFile(resolve(root, "index.html"), "utf8");
const source = await readFile(resolve(import.meta.dirname, "src/main.ts"), "utf8");
const colliderSource = await readFile(resolve(import.meta.dirname, "src/game/scraproad/DriveSurfaceCollider.ts"), "utf8");
const ovalSource = await readFile(resolve(import.meta.dirname, "src/game/scraproad/OvalBowlSurface.ts"), "utf8");
const racekartManifest = await readFile(resolve(import.meta.dirname, "src/assets/scraproadRacekartManifest.ts"), "utf8");
const layouts = await readFile(resolve(import.meta.dirname, "src/game/scraproad/ScraproadArenaLayout.ts"), "utf8");
const checks = [
  ["title", /Scraproad Arena/i],
  ["game canvas", /id="game"/],
  ["HUD", /id="health-value"/],
  ["controls", /id="controls"/],
  ["level selector", /id="level-select"/],
  ["Dust Ring deploy button", /data-level="dustring"/],
  ["Oval Bowl deploy button", /data-level="ovalbowl"/],
  ["compiled module", /assets\/.*\.js/],
  ["compiled stylesheet", /assets\/.*\.css/],
];

for (const [label, pattern] of checks) {
  if (!pattern.test(html)) throw new Error(`Missing ${label} in production output`);
}

const sceneChecks = [
  ["terrain", /addArena\(\)/],
  ["vehicle", /buildCar\(\)/],
  ["licensed GLB loader", /new GLTFLoader\(\)/],
  ["central asset manifest", /scraproadAssetManifest/],
  ["Racekart OBJ loader", /new OBJLoader\(\)/],
  ["Racekart material loader", /new MTLLoader\(\)/],
  ["Racekart Hilly manifest", /scraproadRacekartManifest/],
  ["Kenney SUV visual", /kenney-car-kit-suv/],
  ["animated imported wheel nodes", /vehicle\.wheelNodes/],
  ["driveable Racekart visual", /racekart-hilly-driveable/],
  ["Racekart arena fence", /racekart-hilly-arena-fence/],
  ["continuous circular track", /continuous-circular-ring-track/],
  ["continuous oval wall ride mesh", /oval-bowl-continuous-wall-ride-surface/],
  ["solid oval outer boundary", /oval-bowl-solid-outer-boundary/],
  ["matching oval collider debug", /oval-bowl-matching-collider-debug/],
  ["central combat bowl", /central-combat-bowl/],
  ["ring lane markers", /ring-lane-marker/],
  ["roof weapon mount", /const turret = new THREE\.Group/],
  ["barrel pitch mount", /const barrelPivot = new THREE\.Group/],
  ["mouse world ray", /intersectObjects\(aimSurfaces/],
  ["ground crosshair", /const groundCrosshair = new THREE\.Group/],
  ["modular part slots", /type VehiclePartSlot/],
  ["central vehicle stats", /type VehicleStats[\s\S]*projectileSpeed: number/],
  ["weapon stats contract", /type WeaponStats[\s\S]*fireRate: number[\s\S]*damage: number[\s\S]*projectileSpeed: number[\s\S]*range: number[\s\S]*automatic\?: boolean/],
  ["pickup collection", /equipPickup\(pickup/],
  ["projectile combat", /function shoot\(\)/],
  ["muzzle projectile direction", /shotDirection\.copy\(aimPoint\)\.sub\(shotOrigin\)\.normalize/],
  ["ramming damage", /damageTarget\(target,Math\.abs\(vehicle\.speed\)/],
  ["ramp surface collision", /function rampSample/],
  ["visual asset heightfields", /buildHeightfieldCollider\(object/],
  ["visual collider takes drive priority", /sampleHeightfield\(collider, x, z\)[\s\S]*best \?\? analyticRampSample/],
  ["async collider deployment", /await addArena\(\); await addWorldProps\(\)/],
  ["collider source telemetry", /colliderSource=activeLayout\.arenaKind==="oval-bowl"\?"shared-oval-surface":"visual-asset-heightfields"/],
  ["contact point debug", /contactDebug\.position\.set/],
  ["visual collider error telemetry", /dataset\.heightMismatch/],
  ["ramp runtime smoke route", /physics-smoke.*ramp/],
  ["all ramp traversal smoke route", /all-surfaces[\s\S]*runRampTraversalSuite/],
  ["ramp landing verification", /allRampLandings[\s\S]*rampLanding/],
  ["solid prop colliders", /boxColliders/],
  ["height-aware prop colliders", /vehicle\.position\.y > obstacle\.top\+\.2/],
  ["low capsule vehicle collider", /VEHICLE_COLLIDER_RADIUS = 1\.12[\s\S]*VEHICLE_COLLIDER_HALF_LENGTH = \.95[\s\S]*VEHICLE_COLLIDER_HEIGHT = \.72/],
  ["forgiving ramp entry", /RAMP_ENTRY_BLEND = 1\.15[\s\S]*smoothstep/],
  ["held fire state", /let isFireHeld=false[\s\S]*function setFireHeld[\s\S]*if \(isFireHeld\) shoot\(\)/],
  ["fire cooldown limit", /fireCooldown = 1 \/ weaponStats\.fireRate/],
  ["held fire runtime smoke route", /holdFireSmokeTest[\s\S]*canvas\.dataset\.holdFireSmoke/],
  ["fixed physics timestep", /FIXED_TIMESTEP = 1 \/ 60[\s\S]*while\(physicsAccumulator>=FIXED_TIMESTEP/],
  ["interpolated vehicle render", /function updateVehicleVisual[\s\S]*lerpVectors/],
  ["performance debug", /function updateDebug[\s\S]*renderer\.info\.render\.calls/],
  ["looping quiet soundtrack", /soundtrack\.loop = true[\s\S]*soundtrack\.volume = \.12/],
  ["cloudy environment map", /cloudy-sky\.png[\s\S]*scene\.environment = skyTexture/],
  ["layout-sized arena boundary", /ARENA_RADIUS = activeLayout\.radius/],
  ["ring geometry telemetry", /dataset\.ringInnerRadius/],
  ["ring clearance audit", /function auditArenaFlow[\s\S]*ringTrackDrivable/],
  ["central combat area audit", /dataset\.centralCombatArea/],
  ["target lane audit", /dataset\.targetArea/],
  ["future opponent spawn", /opponent-spawn-placeholder/],
  ["recovery control", /event\.code==="KeyR"\)resetVehicle/],
  ["automatic outside recovery", /OUT OF BOUNDS \/\/ AUTO RECOVERY/],
  ["oval boundary clamp", /clampToOvalBowl\(activeLayout\.bowl/],
  ["wall surface grip", /rampNow\.ramp\.kind==="wall"[\s\S]*wallRideGrip/],
  ["wall ride runtime smoke route", /function runWallRideSuite[\s\S]*wallRideSmoke/],
  ["shared oval collision telemetry", /bowlCollision = "shared-mathematical-surface"/],
  ["chase camera", /function updateCamera/],
];
for (const [label, pattern] of sceneChecks) {
  if (!pattern.test(source)) throw new Error(`Missing ${label} implementation`);
}
const colliderChecks = [
  ["downward visual ray sampling", /new THREE\.Raycaster\(\)[\s\S]*intersectObject\(object, true\)/],
  ["bounded heightfield grid", /columns = THREE\.MathUtils\.clamp[\s\S]*rows = THREE\.MathUtils\.clamp/],
  ["interpolated collision heights", /const samples = \[[\s\S]*height \/ weight/],
  ["matching collider wireframe", /createHeightfieldDebug[\s\S]*new THREE\.LineSegments/],
];
for (const [label, pattern] of colliderChecks) {
  if (!pattern.test(colliderSource)) throw new Error(`Missing ${label} implementation`);
}
const ovalChecks = [
  ["capsule surface sampler", /function sampleOvalBowl/],
  ["smooth wall transition", /progress \* progress \* \(3 - 2 \* progress\)/],
  ["surface normal", /new THREE\.Vector3\(-outwardX \* slope, 1, -outwardZ \* slope\)\.normalize/],
  ["generated floor collision geometry", /function createOvalFloorGeometry/],
  ["generated bank collision geometry", /function createOvalBankGeometry/],
  ["enclosed rim curtain", /function createOvalRimCurtainGeometry/],
];
for (const [label, pattern] of ovalChecks) {
  if (!pattern.test(ovalSource)) throw new Error(`Missing ${label} implementation`);
}
for (const key of ["stuntRamp", "fence", "rockWide", "rockTall", "hayBale"]) {
  if (!racekartManifest.includes(`${key}: asset(`)) throw new Error(`Missing ${key} from Racekart asset manifest`);
}
if (!layouts.includes("dustring: {")) throw new Error("Missing Dust Ring arena layout");
if (!layouts.includes("ovalbowl: {")) throw new Error("Missing Oval Bowl arena layout");
if (!/ovalbowl:[\s\S]*arenaKind: "oval-bowl"[\s\S]*bowl: \{ straightHalfLength: 46, flatRadius: 42, outerRadius: 62, wallRise: 16\.5 \}/.test(layouts)) throw new Error("Oval Bowl capsule dimensions are missing");
if ((layouts.match(/asset: "stuntRailing"/g) ?? []).length !== 4) throw new Error("Oval Bowl must use four restrained Racing Assets rim railings");
if (!/ovalbowl:[\s\S]*targets: \[[\s\S]*\{ x: 38, z: 24/.test(layouts)) throw new Error("Oval Bowl target set is missing");
if ((layouts.match(/\{ asset: "stuntRamp", kind: "ramp"/g) ?? []).length !== 4) throw new Error("Expected exactly 4 placed ramp surfaces");
if (/\{ asset: "[^"]+", kind: "bridge"/.test(layouts)) throw new Error("Dust Ring must not include bridge or loop stunt chains");
if ((layouts.match(/kind: "repair"/g) ?? []).length < 1) throw new Error("Expected a repair pickup");
if ((layouts.match(/rotation:/g) ?? []).length < 20) throw new Error("Expected curated track, target, and prop placements");
if (/dustbowl|stuntworks|bridge deck|mega jump/i.test(layouts)) throw new Error("Legacy stunt arena content remains in the layout");

const assetPaths = [...html.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g)].map((match) => match[1]);
for (const asset of assetPaths) await access(resolve(root, asset));

console.log(`Scraproad production validation passed (${sceneChecks.length} gameplay/asset systems, 2 selectable arenas including the shared-surface Oval Bowl, ${racekartModels.length} selected Racekart Hilly models, and ${required.length + assetPaths.length} files checked).`);

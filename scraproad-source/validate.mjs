import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../scraproad");
const racekartModels = [
  "Terrain_Grass_Flat_1x1", "Terrain_Hill_Side_1x3", "Terrain_Hill_Corner_Outer_4x4",
  "Track_Standard_Straight_Double", "Track_Striped_Straight_Double", "Track_Standard_Curve_Double_4x4",
  "Track_Striped_Curve_Double_4x4", "Track_Standard_Incline_Double", "Track_Striped_Incline_Double",
  "Track_Bridge_Start", "Track_Bridge_Incline_Gentle_Supported", "Track_Bridge_Flat_Supported",
  "Track_Bridge_Curve_3x3", "Prop_Track_Ramp", "Prop_Track_Ramp_Railing", "Prop_Track_Arch_1x4",
  "Prop_Decorative_Fence_Railing", "Prop_Decorative_Rock_2", "Prop_Decorative_Rock_5",
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
const racekartManifest = await readFile(resolve(import.meta.dirname, "src/assets/scraproadRacekartManifest.ts"), "utf8");
const layouts = await readFile(resolve(import.meta.dirname, "src/game/scraproad/ScraproadArenaLayout.ts"), "utf8");
const checks = [
  ["title", /Scraproad Arena/i],
  ["game canvas", /id="game"/],
  ["HUD", /id="health-value"/],
  ["controls", /id="controls"/],
  ["level selector", /id="level-select"/],
  ["safe level button", /data-level="dustbowl"/],
  ["prompt level button", /data-level="stuntworks"/],
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
  ["ramp runtime smoke route", /physics-smoke.*ramp/],
  ["bridge runtime smoke route", /physics-smoke.*bridge[\s\S]*bridgeCrossing/],
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
  ["bridge collider telemetry", /dataset\.bridgeColliders/],
  ["future opponent spawn", /opponent-spawn-placeholder/],
  ["recovery control", /event\.code==="KeyR"\)resetVehicle/],
  ["chase camera", /function updateCamera/],
];
for (const [label, pattern] of sceneChecks) {
  if (!pattern.test(source)) throw new Error(`Missing ${label} implementation`);
}
for (const key of ["terrainFlat", "trackStraight", "trackCurve", "trackBank", "bridgeIncline", "bridgeFlat", "stuntRamp", "fence", "rockWide"]) {
  if (!racekartManifest.includes(`${key}: asset(`)) throw new Error(`Missing ${key} from Racekart asset manifest`);
}
for (const level of ["dustbowl", "stuntworks"]) {
  if (!layouts.includes(`${level}: {`)) throw new Error(`Missing ${level} arena layout`);
}
if ((layouts.match(/kind: "ramp"/g) ?? []).length < 5) throw new Error("Expected at least 5 placed ramp surfaces across both levels");
if ((layouts.match(/kind: "bridge"/g) ?? []).length < 8) throw new Error("Expected at least 8 placed bridge surfaces across both levels");
if ((layouts.match(/kind: "repair"/g) ?? []).length < 4) throw new Error("Expected repair pickups in both levels");
if ((layouts.match(/rotation:/g) ?? []).length < 20) throw new Error("Expected curated track, target, and prop placements");

const assetPaths = [...html.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g)].map((match) => match[1]);
for (const asset of assetPaths) await access(resolve(root, asset));

console.log(`Scraproad production validation passed (${sceneChecks.length} gameplay/asset systems, 2 selectable arenas, ${racekartModels.length} Racekart Hilly models, and ${required.length + assetPaths.length} files checked).`);

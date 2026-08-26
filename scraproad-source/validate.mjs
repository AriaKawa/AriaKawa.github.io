import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../scraproad");
const required = ["index.html", "ASSET_CREDITS.md", "THIRD_PARTY_LICENSES.txt", "assets/cloudy-sky.png", "assets/nitro-games.wav"];
for (const file of required) await access(resolve(root, file));

const html = await readFile(resolve(root, "index.html"), "utf8");
const source = await readFile(resolve(import.meta.dirname, "src/main.ts"), "utf8");
const checks = [
  ["title", /Scraproad Arena/i],
  ["game canvas", /id="game"/],
  ["HUD", /id="health-value"/],
  ["controls", /id="controls"/],
  ["compiled module", /assets\/.*\.js/],
  ["compiled stylesheet", /assets\/.*\.css/],
];

for (const [label, pattern] of checks) {
  if (!pattern.test(html)) throw new Error(`Missing ${label} in production output`);
}

const sceneChecks = [
  ["terrain", /addArena\(\)/],
  ["vehicle", /buildCar\(\)/],
  ["roof weapon mount", /const turret = new THREE\.Group/],
  ["barrel pitch mount", /const barrelPivot = new THREE\.Group/],
  ["mouse world ray", /intersectObjects\(aimSurfaces/],
  ["ground crosshair", /const groundCrosshair = new THREE\.Group/],
  ["modular part slots", /type VehiclePartSlot/],
  ["central vehicle stats", /type VehicleStats[\s\S]*projectileSpeed: number/],
  ["pickup collection", /equipPickup\(pickup/],
  ["projectile combat", /function shoot\(\)/],
  ["muzzle projectile direction", /aimPoint\.clone\(\)\.sub\(origin\)\.normalize/],
  ["ramming damage", /damageTarget\(target,Math\.abs\(vehicle\.speed\)/],
  ["ramp surface collision", /function rampSample/],
  ["ramp runtime smoke route", /physics-smoke.*ramp/],
  ["solid prop colliders", /boxColliders/],
  ["height-aware prop colliders", /vehicle\.position\.y > obstacle\.top/],
  ["looping quiet soundtrack", /soundtrack\.loop = true[\s\S]*soundtrack\.volume = \.12/],
  ["cloudy environment map", /cloudy-sky\.png[\s\S]*scene\.environment = skyTexture/],
  ["arena boundary", /ARENA_RADIUS = 116/],
  ["recovery control", /event\.code==="KeyR"\)resetVehicle/],
  ["chase camera", /function updateCamera/],
];
for (const [label, pattern] of sceneChecks) {
  if (!pattern.test(source)) throw new Error(`Missing ${label} implementation`);
}
if ((source.match(/createPickup\(/g) ?? []).length < 7) throw new Error("Expected at least 6 placed pickups");
if ((source.match(/createTarget\(/g) ?? []).length < 9) throw new Error("Expected at least 8 placed targets");
if ((source.match(/addRamp\(/g) ?? []).length < 6) throw new Error("Expected at least 5 physical ramps");

const assetPaths = [...html.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g)].map((match) => match[1]);
for (const asset of assetPaths) await access(resolve(root, asset));

console.log(`Scraproad production validation passed (${sceneChecks.length} gameplay systems, 5 ramps, 6 pickups, 8 targets, and ${required.length + assetPaths.length} files checked).`);

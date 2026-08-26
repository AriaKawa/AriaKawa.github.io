import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../scraproad");
const required = ["index.html", "ASSET_CREDITS.md", "THIRD_PARTY_LICENSES.txt"];
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
  ["modular part slots", /type VehiclePartSlot/],
  ["pickup collection", /equipPickup\(pickup/],
  ["projectile combat", /function shoot\(\)/],
  ["ramming damage", /damageTarget\(target,Math\.abs\(vehicle\.speed\)/],
  ["chase camera", /function updateCamera/],
];
for (const [label, pattern] of sceneChecks) {
  if (!pattern.test(source)) throw new Error(`Missing ${label} implementation`);
}
if ((source.match(/createPickup\(/g) ?? []).length < 7) throw new Error("Expected at least 6 placed pickups");
if ((source.match(/createTarget\(/g) ?? []).length < 9) throw new Error("Expected at least 8 placed targets");

const assetPaths = [...html.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g)].map((match) => match[1]);
for (const asset of assetPaths) await access(resolve(root, asset));

console.log(`Scraproad production validation passed (${sceneChecks.length} gameplay systems, 6 pickups, 8 targets, and ${required.length + assetPaths.length} files checked).`);

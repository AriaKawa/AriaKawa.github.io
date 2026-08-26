import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = dirname(fileURLToPath(import.meta.url));
const required = ["index.html", "styles.css", "game.js", "asset-manifest.js", "ASSET_CREDITS.md"];
await Promise.all(required.map((file) => access(join(root, file))));

const sandbox = { window: {} };
vm.runInNewContext(await readFile(join(root, "asset-manifest.js"), "utf8"), sandbox);
const manifest = sandbox.window.LAST_LOT_ASSETS;
if (!manifest?.player?.pistol || !manifest?.zombies?.small || !manifest?.terrain?.ground) {
  throw new Error("Asset manifest is missing critical game groups.");
}

const paths = [];
const collect = (value) => {
  if (typeof value === "string") paths.push(value);
  else if (value && typeof value === "object") Object.values(value).forEach(collect);
};
collect(manifest);
await Promise.all(paths.map((path) => access(join(root, path))));

const html = await readFile(join(root, "index.html"), "utf8");
for (const id of ["game", "startButton", "restartButton", "healthBar", "killsText", "timeText"]) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing required DOM hook: ${id}`);
}

new vm.Script(await readFile(join(root, "game.js"), "utf8"), { filename: "game.js" });
console.log(`Last Lot validated: ${paths.length} manifest entries, ${new Set(paths).size} selected assets, scripts parse successfully.`);

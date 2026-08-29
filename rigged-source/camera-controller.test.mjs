import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import ts from "typescript";
import * as THREE from "three";

const testDirectory = await mkdtemp(join(import.meta.dirname, ".camera-test-"));
const compiledController = join(testDirectory, "RiggedCameraController.mjs");

try {
  const source = await readFile(join(import.meta.dirname, "src/game/rigged/RiggedCameraController.ts"), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  await writeFile(compiledController, compiled, "utf8");

  const { RiggedCameraController } = await import(`${new URL(`file:///${compiledController.replaceAll("\\", "/")}`).href}?test=${Date.now()}`);
  const camera = new THREE.PerspectiveCamera(58, 16 / 9, .1, 520);
  const controller = new RiggedCameraController(camera);
  const player = new THREE.Vector3(0, 0, 0);
  const enemy = new THREE.Vector3(0, 0, 40);
  const flatGround = () => 0;
  const ring = { kind: "ring", radius: 100 };

  controller.snapToChase(player, 0, flatGround);
  assert.deepEqual(controller.toggle(true), { mode: "enemy", noTarget: false });
  for (let frame = 0; frame < 180; frame++) {
    controller.update({ dt: 1 / 60, playerPosition: player, playerHeading: 0, enemyPosition: enemy, enemyAvailable: true, bounds: ring, groundHeight: flatGround });
  }

  camera.updateMatrixWorld(true);
  const playerScreen = player.clone().add(new THREE.Vector3(0, 1.1, 0)).project(camera);
  const enemyScreen = enemy.clone().add(new THREE.Vector3(0, 1.1, 0)).project(camera);
  assert.ok(Math.abs(playerScreen.x) < 1 && Math.abs(playerScreen.y) < 1, "player must remain framed");
  assert.ok(Math.abs(enemyScreen.x) < 1 && Math.abs(enemyScreen.y) < 1, "enemy must remain framed");
  assert.ok(camera.position.z < -9 && camera.position.z > -15, "enemy camera remains anchored behind the player");

  const sideEnemy = new THREE.Vector3(40, 0, 0);
  let largestCameraStep = 0;
  for (let frame = 0; frame < 90; frame++) {
    const previous = camera.position.clone();
    controller.update({ dt: 1 / 60, playerPosition: player, playerHeading: 0, enemyPosition: sideEnemy, enemyAvailable: true, bounds: ring, groundHeight: flatGround });
    largestCameraStep = Math.max(largestCameraStep, previous.distanceTo(camera.position));
  }
  assert.ok(largestCameraStep < 1.25, `orbit should not snap (largest step ${largestCameraStep.toFixed(3)})`);
  assert.deepEqual(camera.up.toArray(), [0, 1, 0], "camera must retain world-up");

  player.set(95, 0, 0); enemy.set(0, 0, 0);
  for (let frame = 0; frame < 180; frame++) {
    controller.update({ dt: 1 / 60, playerPosition: player, playerHeading: 0, enemyPosition: enemy, enemyAvailable: true, bounds: ring, groundHeight: flatGround });
  }
  assert.ok(Math.hypot(camera.position.x, camera.position.z) <= 95.51, "ring camera must stay inside the wall");

  player.set(60, 10, 0);
  const capsule = { kind: "capsule", straightHalfLength: 46, outerRadius: 62 };
  for (let frame = 0; frame < 180; frame++) {
    controller.update({ dt: 1 / 60, playerPosition: player, playerHeading: 0, enemyPosition: enemy, enemyAvailable: true, bounds: capsule, groundHeight: () => 10 });
  }
  assert.ok(Math.abs(camera.position.x) <= 57.51, "capsule camera must stay inside the upper guard");
  assert.ok(camera.position.y >= 12.59, "camera must stay above the drive surface");

  const fallback = controller.update({ dt: 1 / 60, playerPosition: player, playerHeading: 0, enemyAvailable: false, bounds: capsule, groundHeight: () => 10 });
  assert.equal(fallback.mode, "chase");
  assert.equal(fallback.fellBackToChase, true);
  assert.deepEqual(controller.toggle(false), { mode: "chase", noTarget: true });

  console.log(`Rigged camera runtime tests passed (two-car framing, ${largestCameraStep.toFixed(3)} max orbit step, arena/floor clamps, missing-target fallback).`);
} finally {
  await rm(testDirectory, { recursive: true, force: true });
}

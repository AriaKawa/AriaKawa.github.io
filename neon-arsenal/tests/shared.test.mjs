import assert from "node:assert/strict";
import {
  LEVEL_XP,
  STAT_KEYS,
  STAT_PRESETS,
  TANKS,
  availableUpgrades,
  canUpgradeTank,
  derivedStats,
  levelForXp,
  makeStats,
  maxStatForTank,
  spentStats,
  statPointsForLevel,
  validateClientMessage,
} from "../shared.js";

{
  assert.equal(levelForXp(0), 1);
  assert.equal(levelForXp(LEVEL_XP[15]), 15);
  assert.equal(levelForXp(LEVEL_XP[45] + 9999), 45);
  assert.ok(LEVEL_XP[30] > LEVEL_XP[15]);
}

{
  assert.equal(statPointsForLevel(1), 0);
  assert.equal(statPointsForLevel(2), 1);
  assert.equal(statPointsForLevel(28), 27);
  assert.equal(statPointsForLevel(45), 33);
}

{
  const player = { tank: "basic", level: 15, stats: makeStats() };
  assert.deepEqual(availableUpgrades(player), ["twin", "sniper", "machineGun", "flankGuard"]);
  assert.equal(canUpgradeTank(player, "sniper"), true);
  assert.equal(canUpgradeTank(player, "smasher"), false);
  player.level = 30;
  assert.equal(availableUpgrades(player).includes("smasher"), true);
  player.level = 45;
  assert.equal(availableUpgrades(player).includes("autoTank"), true);
}

{
  const player = { tank: "smasher", level: 45, stats: makeStats() };
  assert.equal(maxStatForTank("smasher", "bodyDamage"), 10);
  assert.equal(maxStatForTank("smasher", "bulletDamage"), 0);
  assert.equal(maxStatForTank("basic", "bulletDamage"), 7);
  player.stats.maxHealth = 10;
  player.stats.bodyDamage = 10;
  const d = derivedStats(player);
  assert.ok(d.maxHealth > 300);
  assert.ok(d.bodyDamage > 50);
}

{
  const stats = makeStats();
  assert.deepEqual(Object.keys(stats), STAT_KEYS);
  stats.reload = 7;
  stats.bulletDamage = 7;
  assert.equal(spentStats(stats), 14);
}

{
  assert.ok(TANKS.overlord.droneLimit >= 8);
  assert.ok(TANKS.annihilator.barrels[0].damage > TANKS.basic.barrels[0].damage);
  assert.ok(TANKS.spike.smasher);
  assert.ok(Object.keys(STAT_PRESETS).includes("glass"));
}

{
  assert.equal(validateClientMessage({ type: "join", name: "Ari" }), true);
  assert.equal(validateClientMessage({ type: "input", seq: 1, aim: 0 }), true);
  assert.equal(validateClientMessage({ type: "upgradeStat", stat: "reload" }), true);
  assert.equal(validateClientMessage({ type: "upgradeTank", tank: "overlord" }), true);
  assert.equal(validateClientMessage({ type: "preset", preset: "ram" }), true);
  assert.equal(validateClientMessage({ type: "upgradeStat", stat: "money" }), false);
  assert.equal(validateClientMessage({ type: "upgradeTank", tank: "banana" }), false);
}

console.log("shared tests passed");

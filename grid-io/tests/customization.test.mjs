import test from "node:test";
import assert from "node:assert/strict";
import { Arena } from "../simulation.mjs";
import { BODIES, WHEELS, RIDERS, normalizeLoadout } from "../customization.mjs";

test("all 18 part combinations survive match initialization without changing handling", () => {
  const initial = new Arena({ seed: 9, bots: 0, food: 0 });
  for (const body of BODIES)
    for (const wheels of WHEELS)
      for (const rider of RIDERS) {
        const loadout = { body: body.id, wheels: wheels.id, rider: rider.id };
        const arena = new Arena({ seed: 9, bots: 0, food: 0, loadout });
        assert.deepEqual(arena.player.loadout, loadout);
        assert.equal(arena.player.speed, initial.player.speed);
        assert.equal(arena.player.length, initial.player.length);
        loadout.body = "not-a-part";
        assert.equal(arena.player.loadout.body, body.id);
      }
});
test("corrupt or old saved options fall back safely while valid fields survive", () => {
  assert.deepEqual(normalizeLoadout(null), {
    body: "phantom",
    wheels: "turbine",
    rider: "male",
  });
  assert.deepEqual(
    normalizeLoadout({ body: "deleted", wheels: "spoke", rider: "female" }),
    { body: "phantom", wheels: "spoke", rider: "female" },
  );
});

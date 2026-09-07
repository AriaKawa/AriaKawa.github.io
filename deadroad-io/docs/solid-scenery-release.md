# Solid world scenery

Trees no longer disappear near the command truck. Tree collisions cover the ground-level trunk, leaving canopies and low foliage passable. Cars, rocks, and structures have fixed ground footprints.

Rendering and the live browser simulation share deterministic, cached scenery data independent of camera position. Swept movement stops vehicles and zombies before solid objects. Both horde approach modes cache obstacle-avoiding routes. Core placement rejects occupied ground; generated build pads exclude solid footprints, and tower purchase validates occupancy again. Packed turret restoration uses the remaining clear pads. Initial convoy insertion is adjusted to clear ground if needed.

Validation: full TypeScript/production build; validate:scenery (stable scenery queries, canopy/trunk separation, car collisions, high-speed sweep, detours, core/tower rejection, both live zombie modes reaching the core without overlap); validate:convoy; validate:contracts.

Source: client/src/game/SceneryWorld.ts, client/src/game/ExpeditionScenery.ts, client/src/net/LocalSimulation.ts, client/src/net/GameClient.ts, client/src/scenes/WorldScene.ts, scripts/validate-scenery.ts in the Deadroad.io development project.

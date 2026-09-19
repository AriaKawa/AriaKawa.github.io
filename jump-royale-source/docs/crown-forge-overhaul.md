# Crown Forge overhaul

Twelve original images generated with the built-in image_gen tool replace the forge environment: background, basalt slab, bronze resting slab, mechanical ferry, lava, masonry, chain, vent, hook, anvil, ember and dust. Full prompts and original PNGs are in crown-forge-prompts.json and crown-forge-source/. The compiler trims transparent margins, aligns slab tops, resizes and exports WebP. Runtime assets live in forge-climb-royale/assets/crown-forge/ and restore into client/public with npm run assets.

The six chapters now have solid platforms and six mandatory ferries. Each ferry sweeps 352 pixels horizontally on a 9–10.75 second cycle. Its exit is 230 pixels above the boarding dock, beyond the jump apex. Six molten crucibles punish falls independently of the rising tide. Forge lava has an 18 second grace period and rises at 14–24 pixels per second to leave time to wait and ride. Hosted and server simulation share the same hazard geometry. Bots forecast ferry motion and reject lava-crossing jumps.

Validation: static jump solver, 24 ferry traversals across four arrival phases, head collision, eight expert bot patterns finishing the entire course with no crucible hits, existing regression suite, client/server type checks, hosted build and desktop/responsive browser checks. Screenshots: crown-forge-start.png, crown-forge-ferry.png, crown-forge-small.png.

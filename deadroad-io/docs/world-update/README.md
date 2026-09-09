# Convoy routes and roadside population

Reroll changes only the seeded road approach, preserving convoy state and rewards. The survey stays centered on the convoy and fits the approach. Route bends vary by seed and extend into the field when the convoy is close to a highway; obstacle and land checks still apply. Confirmation uses the exact preview route.

Stable geographic tree density decreases from full density in green regions to 70% in hard regions, shared by rendering and collision data. Ground detail placement is deterministic and sparse: 12% green, 18% autumn, 10% dead, with varied offsets and sizes.

The live browser authority streams deterministic roadside walkers around the convoy. Walkers notice it within 420 simulation units, disengage beyond 850 or their 1100-unit home leash, and return home. Nearby walkers can damage the convoy. Swept vehicle contact kills instantly in forward or reverse travel. Explicit death events guarantee a blood splat, including kills between rendered frames. Defeated roadside spawn locations cool down for three minutes. Distant populations unload without death effects.

Validation: TypeScript and production build; scenery and progression suites; validate-world-update.ts covers density, road spawning, chase and disengage, return home, forward/reverse high-health kills, stationary contact, and death events. Browser verified rerolls, exact confirmed route, road rollout, 42 natural roadside zombies, exactly one splat per run-over, sparse details in three biomes, and zero runtime errors.

The source directory mirrors changed files under the deadroad-io source checkout. This release targets the browser-authoritative GitHub Pages game; the legacy Colyseus server is not the live site's simulation.

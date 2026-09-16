# Moonveil Forest

A new map added alongside all four existing maps. The menu opens with Moonveil Forest selected on a fresh visit.

- World: 2,560 × 14,400 pixels; horizontal and vertical camera tracking, including replay, resize, flight and finale.
- Six chapters: Lantern Grove, The Rootways, Mothwood, Broken Monastery, Starlit Boughs and Moonveil Crown.
- 119 main-route jumps, long switchbacks, broad recovery shelves, and 14 alternative trails splitting a taller jump into two shorter jumps. Widths narrow with altitude. Both branches reconnect to the main route.
- Rectangular collision cores match the bright moss landing edges. Roots, distant trees and plants are decoration. Charge/release movement retains the existing physics and no air steering.
- Native canvas pixel textures: layered forest silhouettes, moon, stars, bark, fractured stone, moss, mushrooms, lanterns, water and fireflies. Textures use nearest-neighbor sampling. No additional runtime network dependencies.
- Flood starts after 12 seconds, rising at 9 px/s and accelerating by 0.008 px/s each second up to 18 px/s. No five-minute timeout on this larger map.

## Rewards

One match loot point requires final placement 1–15, an unassisted round and a unique round receipt. Elimination alone and leaving before final standings give no match point. The departure scoreboard no longer says a point was credited. Existing duplicate-item points and three-point free spins remain intact.

## Validation

- `npm run test:forest`: every main transition and both connections of every branch are checked with the 30 Hz collision simulation. Minimum eight sampled launch/charge solutions per main transition. Four expert bot patterns reach the crown ahead of the flood. Reward boundary and duplicate-receipt tests pass.
- `npm run test:browser:forest` against hosted Vite on port 5224: normal keyboard jumping, horizontal camera tracking, smaller viewport, top-15/16 rewards, no elimination/departure point, replay and browser errors.
- `npm test`, `npm run build`, `npm run build:site`.

Hosted gameplay remains the existing local 24-competitor practice simulation. Shared source contains the same forest level and physics for the server.

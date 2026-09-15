# The Long Mountain — authored world release

## Implemented course

One 2,560 × 34,243-pixel connected world, with 293 surfaces and 281 required main-route jumps. Ten regions have explicit placement tables in `server/src/sim/mountain.ts`; the data compiler only expands those rows, with no random placement or repeated level-generation phrase. The summit has a short ten-jump approach and an original bell shrine.

Foothills introduce broad grassy shelves and a walking gallery; the abandoned village crosses house roofs and offers the first cracked shortcut. Aqueduct arches provide narrower landings and long bridge bays. Mine galleries lead to moving cart platforms and a steep supported shaft. Castle roofs connect two tall tower runs. Windmills introduce orbiting blade cradles with two-axis rider carry. Cloud gardens cross floating islands; Frozen Peak introduces ice with the existing charge-to-grip behavior. Celestial ruins combine high rises, moving stonework and fragile shortcuts before the summit.

Horizontal galleries are explicitly placed between the vertical runs. The world snakes from the left bank to the right and back across most of its 2,560px width. Charge curves, gravity, walk speed, launch velocity and zero air control are unchanged. Geometry uses one-way top surfaces, consistently marked with pale rims; recessed walls and architectural silhouettes are scenery. There are no invented solid slopes or wall-jump mechanics.

Four broad spillways/galleries interrupt otherwise catastrophic fall channels. Five optional fragile shortcuts hold original survey sigils, recorded locally as exploration keepsakes without changing competitive gold or scores. Collapsing a shortcut never removes the permanent route. Failed jumps can lose a ledge, a screen or roughly two regions.

## Art and performance

34 original illustrations, each with an editable SVG and a PNG: ten region platforms, ten landmarks, ten facades, sky, cloud, cart and sigil. These share palettes, outlines and lit surfaces. Existing characters retain their original animation/wardrobe system. Assets and provenance are in `assets/jump-royale/ASSET_CREDITS.md` in the published game. Distant mountains, clouds and atmospheric color respond to altitude and camera movement.

Platform containers and background structures are culled outside the camera. Browser playthrough captures showed 6–9 visible platform containers at sampled regions out of 293. Art totals about 1.05 MB on disk including the SVG sources; the game retains its existing Phaser bundle. Browser timing uses software rendering on this test machine and is not a hardware/device FPS guarantee.

## Race integration

Both the local hosted simulation and authoritative server use map-specific bounds, spawn, flood, scoring height, ghosts and moving-platform X/Y snapshots. Other maps retain 640×7,200 bounds and existing flood/lava rules. Mountain flood begins after 120 seconds at 7px/s, slowly accelerating to 12px/s. Mountain bots take longer to assess ledges, preserving a useful race window for this much larger map. Two expert patterns completed in 1,442 and 1,386 simulated seconds (24.0 / 23.1 minutes).

The website retains local practice with bots. This release does not provision a public multiplayer backend.

## Measured validation

- Typecheck, server/client production build and hosted site build passed.
- Two full 281-jump simulation replays at different moving-platform/wind phases passed through actual walking, charging and collision integration. Minimum measured landing margin: 39px.
- 584 fall probes recovered onto geometry; observed drops span 0–5,160px. All broad recovery platforms have tested exits back into the route.
- Five survey shortcuts and both optional orbiting cradles are reachable. Full-cycle rotor carrying preserves player offset on both axes. Collapse state stays player-specific.
- Full browser playthrough passed all 281 required jumps using actual hosted-client input and 30Hz ticks, with 24 competitors, flood, camera and summit victory. It used an accelerated clock without teleporting or flight. Keyboard walking and charge/release were also tested in real time.
- Two actual browser clients shared the new map in one Colyseus room, with correct dimensions, all 293 platforms, orbital X/Y replication, charged keyboard input and resize handling. No runtime errors were observed.
- Original forge reachability, eight expert bot patterns, three-map finale, jumping/flight, ghost, reward and progression regressions passed.

An ideal automated route takes approximately 8m25s of simulated movement. The requested 20–30 minute first-successful-human-climb target still needs human playtesting; bot pacing supports that window, but it is not evidence of human completion time. Full ten-region playability is implemented; no claim of final human difficulty tuning is made.

## Release

Published assets are under the existing `/forge-climb-royale/` URL. Source is committed alongside the built game to make the course reproducible and maintainable. GitHub Pages serves the repository's main branch.

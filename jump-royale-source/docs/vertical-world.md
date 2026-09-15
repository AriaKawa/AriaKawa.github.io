# The Long Mountain — authored world release

## Implemented course

One 2,560 × 34,243-pixel connected world, with 293 surfaces and 281 required main-route jumps. Ten regions have explicit placement tables in `server/src/sim/mountain.ts`; the data compiler only expands those rows, with no random placement or repeated level-generation phrase. The summit has a short ten-jump approach and an original bell shrine.

Foothills introduce progressively smaller grassy shelves and a walking gallery; the abandoned village crosses house roofs and offers the first cracked shortcut. Aqueduct arches provide narrower landings and long bridge bays. Mine galleries lead to moving cart platforms and a steep supported shaft. Castle roofs connect two tall tower runs. Windmills introduce orbiting blade cradles with two-axis rider carry. Cloud gardens cross floating islands; Frozen Peak introduces ice with the existing charge-to-grip behavior. Celestial ruins combine high rises, moving stonework and fragile shortcuts before the summit.

Horizontal galleries are explicitly placed between the vertical runs. The world snakes from the left bank to the right and back across most of its 2,560px width. Charge curves, gravity, walk speed, launch velocity and zero air control are unchanged. Geometry uses one-way top surfaces, consistently marked with pale rims; recessed walls and architectural silhouettes are scenery. There are no invented solid slopes or wall-jump mechanics.

Four broad spillways/galleries interrupt otherwise catastrophic fall channels. Five optional fragile shortcuts hold original survey sigils, recorded locally as exploration keepsakes without changing competitive gold or scores. Collapsing a shortcut never removes the permanent route. Failed jumps can lose a ledge, a screen or roughly two regions.

The difficulty now ramps gradually. Ordinary ledges taper from 220–200px in the foothills to 200–178px in the village, 178–156px in the aqueduct, 156–134px in the mine, 134–112px in the castle, 112–90px at the windmills, 90–68px in the clouds, 68–46px at Frozen Peak and 46–30px in Celestial Ruins. Only the summit reaches 30–18px precision ledges. Broad recovery galleries remain. Moving platforms retain at least 56px and ice at least 96px. Placement centers preserve the authored long jumps.

## Art and performance

All environment artwork in this map is now AI-generated: ten regional panoramas, four related platform variants per region and six props. Backgrounds crossfade at region boundaries and pan with the camera. Platforms use the matching regional materials with a visible cap aligned to the collision surface. Wide galleries combine related variants. Original prompts and unmodified PNG atlases are retained in `docs/ai-art-prompts.json` and `docs/ai-source`. `npm run assets:vertical` extracts cells and exports WebP without painting substitute art. Characters, UI and other maps retain their existing assets.

Platform containers and props are culled outside the camera; only one or two regional backgrounds are visible during a transition. Browser playthrough captures showed 6–9 visible platform containers at sampled regions out of 293. The game retains its existing Phaser bundle. Browser timing uses software rendering on this test machine and is not a hardware/device FPS guarantee.

## Race integration

Both the local hosted simulation and authoritative server use map-specific bounds, spawn, flood, scoring height, ghosts and moving-platform X/Y snapshots. Other maps retain 640×7,200 bounds and existing flood/lava rules. Mountain flood begins after 10 seconds at 7px/s, slowly accelerating to 12px/s. Mountain bots take longer to assess ledges, preserving a useful race window for this much larger map. Two expert patterns completed in 1,436 and 1,393 simulated seconds (23.9 / 23.2 minutes).

The website retains local practice with bots. This release does not provision a public multiplayer backend.

## Measured validation

- Typecheck, server/client production build and hosted site build passed.
- Two full 281-jump simulation replays at different moving-platform/wind phases passed through actual walking, charging and collision integration. Minimum full-body landing margin: 1.6px across both phase runs.
- 584 fall probes recovered onto geometry; observed drops span 0–5,780px. All broad recovery platforms have tested exits back into the route.
- Five survey shortcuts and both optional orbiting cradles are reachable. Full-cycle rotor carrying preserves player offset on both axes. Collapse state stays player-specific.
- Full browser playthrough passed all 281 required jumps using actual hosted-client input and 30Hz ticks, with 24 competitors, flood, camera and summit victory. It used an accelerated clock without teleporting or flight. Keyboard walking and charge/release were also tested in real time.
- Two actual browser clients shared the new map in one Colyseus room, with correct dimensions, all 293 platforms, orbital X/Y replication, charged keyboard input and resize handling. No runtime errors were observed.
- Original forge reachability, eight expert bot patterns, three-map finale, jumping/flight, ghost, reward and progression regressions passed.

An ideal automated route takes approximately 7m32s of simulated movement. The requested 20–30 minute first-successful-human-climb target still needs human playtesting; bot pacing supports that window, but it is not evidence of human completion time. Full ten-region playability is implemented; no claim of final human difficulty tuning is made.

## Release

Published assets are under the existing `/forge-climb-royale/` URL. Source is committed alongside the built game to make the course reproducible and maintainable. GitHub Pages serves the repository's main branch.

## Rendering and costumes revision

Platform cap measurements now use the same opaque-alpha threshold for row selection and width measurement. Previously, near-transparent edge rows produced negative or one-pixel widths and enormous artwork; this affected normal play as well as god mode. The compiler rejects invalid caps, and the renderer bounds stale measurements. Browser checks inspect every platform before and after god-mode flight, landing and resizing.

Finn uses twelve complete costumes in one Costumes tab. Separate helmet, shirt, pants and hair selectors and the second wardrobe are retired. Existing characters remain. Legacy set-piece purchases count toward each full costume; previously free Finn looks remain free. Costume selection persists across reloads and uses complete looks in the lobby and match. Tests cover partial/full legacy ownership, repeat purchases and locked selection fallback.

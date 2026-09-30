# Grid.io 3D

A separate third-person edition of Grid.io at `/grid-io-3d/`, linked from its own Games card. Open the site through a static HTTP server; no build, backend, downloads, or runtime CDN is required. WebGL2 is required.

## Arena and handling

This edition now has its own simulation, derived from the original, with wheelie braking and predictive AI. The 2,400 × 2,400 arena, eight reactor platforms, 40 AI riders, pickups, finite trails, raised jump arches, self-collision, eliminations, boost costs, jump cooldown, 90°/360° modes, and 0–300% speed slider are retained. The original `/grid-io/` is unchanged. Both editions are solo arenas with computer opponents.

Three bodies, three wheel assemblies, two riders, and six colors are retained. Garage and gameplay share detailed meshes with textured metal, carbon-weave suits, treaded rubber, and illuminated drive assemblies. Distant bikes use six instanced parts. The floor and roads have procedural plate seams, bolts, machining marks, scuffs, and bump detail; a reflection environment gives the metal a polished finish. All new materials are generated locally. Original fonts, licenses, and Three.js are reused from `../grid-io/`.

Two signed skyways cross the map at 32 m and 54 m. Two underpasses descend through actual openings to -24 m, travel under the arena, and climb back out. All four routes work in both directions. Rails contain the roads and supports are solid. The single pink Helix Loop guides the bike through a complete inversion; steering shifts lanes while its magnetic surface keeps the tires attached. The camera follows height and inversion. Trail collisions and pickups respect elevation, allowing traffic on different levels to pass above or below one another.

Cyan pickups are basic charge, violet cells give double charge, amber caches are worth four, and rare white cores are worth six. About 30% are scattered; the rest form flowing lines, clustered caches, and illuminated transit routes. Structured pickups recharge in the same place after 12–20 seconds. The player joins an established field of 40 bots, including veteran riders with real 2–4 km trails, a mix of smaller riders, and a clear starting area. Trails can grow up to 6 km.

## Controls

- A/D or left/right arrows: steer. The bike moves automatically. In 90° mode, each key press turns 90°.
- Mouse: gently pan the camera left/right and up/down. Mouse movement and canvas clicks never steer, boost, or jump.
- Hold Shift: boost, spending length. Space: jump.
- Hold Control: lift the front wheel and brake linearly to zero over two seconds. Steer to pivot on the rear axle. After one second stopped, the bike automatically lowers and accelerates even if Control is still held. Release Control to rearm; a short recovery prevents immediate repeated stalls. Releasing early also resumes riding. The entire laser remains frozen at its existing position and length during a wheelie, then resumes emission along the ridden path. 90° mode aligns to the nearest cardinal heading afterward. Boost and jump are unavailable while pivoting.
- Hold C or the Rear view button: look behind.
- Esc/P: pause. Graphics quality and audio controls are available from pause.
- M: mute/unmute engine and effects. Sound defaults on for new visitors and starts only after Play. Existing saved preferences are respected. The local Web Audio engine layers a low drive pulse, harmonics, electric whine, and wind; pitch responds to speed and boost, drops while braking, and gains an echo underground. Pause/menu/mute silence it.
- Touch: left pad steers; Wheelie, Boost, Jump, and Rear view buttons operate independently.

The minimap remains north-up and shows your heading, solid skyways, dashed underpasses, and the pink loop. Scores and preferences use separate `grid-io-3d-*` storage keys. Reduced motion disables boost field-of-view changes and menu/garage animation.

## Performance and opponents

Rendering is capped at 60 Hz with interpolated rider poses. Balanced and Performance settings both retain laser glow. Resolution adapts to sustained slow frames; pixel density is capped and very large displays have a pixel budget. Static reactor meshes are batched, distant riders are instanced, and soft contact shadows replace the expensive live shadow pass. The lasers use three batched layers (translucent sheet, rounded luminous core, soft camera-facing halo), without fullscreen bloom. Raised arches retain their open underside.

The simulation indexes only new and expired trail segments, updates the moving attachment, and uses cumulative distances to trim tails without scanning whole kilometre-long trails. Segment objects and spatial buckets are reused; pickups move directly in their index. Bots commit to food/loot destinations, avoid chasing pellets immediately behind them, predict their actual turning paths and nearby riders, avoid boundaries and transit supports, use signed route entrances, and check pickup elevation. They attempt opportunistic cutoffs and boost/jump only when a tested route is clear. Think times are staggered across riders. Road structures, neon markings, and pickup rings are instanced.

## Verification

From the site root, run `node --test grid-io/tests/*.test.mjs grid-io-3d/tests/*.test.mjs`.

With a static server on port 5276 and Playwright installed, run `node grid-io-3d/tests/browser.cjs`, `node grid-io-3d/tests/browser-input.cjs`, `node grid-io-3d/tests/browser-wheelie.cjs`, and `node grid-io-3d/tests/browser-city.cjs`. `PLAYWRIGHT_PATH` can point to an existing Playwright installation; `GRID3D_BASE_URL` can override the server origin. These scripts use Edge and save screenshots under the system temporary directory.

The simulation suites cover scoring, AI, collisions, modes, speed limits, jump arches, all garage combinations, and five minutes of seeded play. The 3D suite also covers braking and automatic recovery, frozen trails, stationary pivots, square corners, incremental food indexing, AI route choices, camera behavior, every route and the loop in both directions, collisions across levels, pickup values and regeneration, and the established starting field. Browser checks verify audible engine samples, RPM changes and mute, independent mouse camera control, terrain shaders and upside-down rendering, touch controls, and mobile layouts.

Run `node grid-io-3d/tests/benchmark.mjs` for a reproducible simulation workload. The original and 3D worlds now have different terrain and starting populations, so their crash counts are not directly comparable. A three-second development profile of this expanded arena at 1440 × 900 recorded 180 renders, about 1.8 ms of render submission and 0.6 ms of simulation per frame, with peak 93 draw calls. These are CPU diagnostics, not a guarantee of frame rate on other devices.

Browser QA uses opt-in `?test=1` diagnostics, absent during normal visits. `assets/chase-cover.png` is rendered with this edition's actual meshes and procedural materials. No external asset license is required for the new materials or synthesized engine beyond the existing engine licenses.

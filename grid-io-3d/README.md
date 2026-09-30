# Grid.io 3D

A separate third-person edition of Grid.io at `/grid-io-3d/`, linked from its own Games card. Open the site through a static HTTP server; no build, backend, downloads, or runtime CDN is required. WebGL2 is required.

## Arena and handling

This edition now has its own simulation, derived from the original, with wheelie braking and predictive AI. The 2,400 × 2,400 arena, eight reactor platforms, 40 AI riders, pickups, finite trails, raised jump arches, self-collision, eliminations, boost costs, jump cooldown, 90°/360° modes, and 0–300% speed slider are retained. The original `/grid-io/` is unchanged. Both editions are solo arenas with computer opponents.

Three bodies, three wheel assemblies, two riders, and six colors are retained. The garage and gameplay share this edition's detailed bike meshes, with added rear drive assemblies, suspension links, illuminated spine segments, and nape plates. Distant bikes use six instanced parts. A perspective camera follows the rider, follows jump height, shortens its boom around reactors, and stays within the boundary. A city skyline and orbital relay sit outside the playable arena. Original textures, fonts, licenses, and Three.js are reused from `../grid-io/`.

## Controls

- Mouse left/right or A/D or left/right arrows: turn relative to your bike. Center the mouse to ride straight. The bike moves automatically.
- 90° mode: each left/right key press turns 90°. With a mouse or touch pad, return to center before the next turn.
- Hold Shift or left mouse: boost, spending length.
- Space or right mouse: jump.
- Hold Control: wheelie brake. Speed falls linearly from the entry speed to zero in two seconds. A/D, arrows, or mouse steering pivot around the rear axle, including while stationary. Releasing Control lowers the front wheel and accelerates smoothly. Wheelies allow free pivots in either mode; 90° mode aligns to the nearest cardinal heading when released. Boost and jump are unavailable while pivoting.
- Hold C or the Rear view button: look behind.
- Esc/P: pause. Graphics quality is available from pause.
- Touch: left pad steers; Wheelie, Boost, Jump, and Rear view buttons operate independently.

The minimap remains north-up and shows your heading. Scores and preferences use separate `grid-io-3d-*` storage keys. Reduced motion disables boost field-of-view changes and menu/garage animation.

## Performance and opponents

Rendering is capped at 60 Hz with interpolated rider poses. Balanced and Performance settings both retain laser glow. Resolution adapts to sustained slow frames; pixel density is capped and very large displays have a pixel budget. Static reactor meshes are batched, distant riders are instanced, and soft contact shadows replace the expensive live shadow pass. The lasers use three batched layers (translucent sheet, rounded luminous core, soft camera-facing halo), without fullscreen bloom. Raised arches retain their open underside.

The simulation reuses trail segments and spatial buckets, and moves pickups in their spatial index directly rather than rebuilding thousands of entries. Bots commit to food/loot destinations, avoid chasing pellets immediately behind them, predict their actual turning paths and nearby riders, avoid boundaries, attempt opportunistic cutoffs, and boost/jump only when a tested route is clear. Think times are staggered across riders.

## Verification

From the site root, run `node --test grid-io/tests/*.test.mjs grid-io-3d/tests/*.test.mjs`.

With a static server on port 5276 and Playwright installed, run `node grid-io-3d/tests/browser.cjs`, `node grid-io-3d/tests/browser-input.cjs`, and `node grid-io-3d/tests/browser-wheelie.cjs`. `PLAYWRIGHT_PATH` can point to an existing Playwright installation; `GRID3D_BASE_URL` can override the server origin. These scripts use Edge and save screenshots under the system temporary directory.

The simulation suites cover scoring, AI, collisions, modes, speed limits, jump arches, all garage combinations, and five minutes of seeded play. The 3D regression suite also covers stopping time at multiple speed settings, a stationary rear-axle pivot, acceleration recovery, boost/jump exclusion, square 90° corners, incremental food indexing, AI route choices, camera behavior, and reduced motion.

Run `node grid-io-3d/tests/benchmark.mjs` for a repeatable before/after simulation comparison. Across three seeded one-minute runs, the new AI had 4 crashes versus 78 and 235 sampled steering reversals versus 2,378. Simulation CPU time was about 55% lower on the development machine. Browser profiling at 1440 × 900 reduced peak draw calls from 485 to 142; timings and frame rates depend on the device and the scene.

Browser QA uses the existing opt-in `?test=1` diagnostics, absent during normal visits. Verify desktop and touch play, both steering modes, mouse recentering, boost/jump, rear view, pause/resume, quality switching, crashes/retry, garage persistence, speed 0/300, portrait and landscape layouts, and the Games card. `assets/chase-cover.png` is a screenshot rendered with this edition's actual game meshes, with no external asset license required beyond the existing shared materials and engine licenses.

# Grid.io 3D

A separate third-person edition of Grid.io at `/grid-io-3d/`, linked from its own Games card. Open the site through a static HTTP server; no build, backend, downloads, or runtime CDN is required. WebGL2 is required.

## Gameplay parity

This edition imports the original `../grid-io/simulation.mjs` directly. The 2,400 × 2,400 arena, eight reactor platforms, 40 AI riders, pickups, finite trails, raised jump arches, self-collision, eliminations, boost costs, jump cooldown, 90°/360° modes, and 0–300% speed slider are unchanged. The original `/grid-io/` is unchanged. Both editions are solo arenas with computer opponents.

Three bodies, three wheel assemblies, two riders, and six colors are retained. The garage and gameplay share this edition's bike meshes, with added rear drive assemblies, suspension links, illuminated spine segments, and nape plates. A perspective camera follows the rider, follows jump height, shortens its boom around reactors, and stays within the boundary. A city skyline and orbital relay sit outside the playable arena. Original textures, fonts, licenses, Three.js, and laser-wall geometry are reused from `../grid-io/`.

## Controls

- Mouse left/right or A/D or left/right arrows: turn relative to your bike. Center the mouse to ride straight. The bike moves automatically.
- 90° mode: each left/right key press turns 90°. With a mouse or touch pad, return to center before the next turn.
- Hold Shift or left mouse: boost, spending length.
- Space or right mouse: jump.
- Hold C or the Rear view button: look behind.
- Esc/P: pause. Graphics quality is available from pause.
- Touch: left pad steers; Boost, Jump, and Rear view buttons operate independently.

The minimap remains north-up and shows your heading. Scores and preferences use separate `grid-io-3d-*` storage keys. Reduced motion disables boost field-of-view changes and menu/garage animation.

## Verification

From the site root, run `node --test grid-io/tests/*.test.mjs grid-io-3d/tests/*.test.mjs`.

With a static server on port 5276 and Playwright installed, run `node grid-io-3d/tests/browser.cjs` and `node grid-io-3d/tests/browser-input.cjs`. `PLAYWRIGHT_PATH` can point to an existing Playwright installation; `GRID3D_BASE_URL` can override the server origin. These scripts use Edge and save screenshots under the system temporary directory.

The original simulation suite covers scoring, AI, collisions, modes, speed limits, jump arches, all garage combinations, and five minutes of seeded play. New tests cover relative steering and the chase camera's heading, rear view, jumps, boundary/reactor clearance, and reduced motion.

Browser QA uses the existing opt-in `?test=1` diagnostics, absent during normal visits. Verify desktop and touch play, both steering modes, mouse recentering, boost/jump, rear view, pause/resume, quality switching, crashes/retry, garage persistence, speed 0/300, portrait and landscape layouts, and the Games card. `assets/chase-cover.png` is a screenshot rendered with this edition's actual game meshes, with no external asset license required beyond the existing shared materials and engine licenses.

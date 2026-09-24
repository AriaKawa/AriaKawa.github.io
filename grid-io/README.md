# Grid.io

An original 3D laser-bike survival arena for AriaKawa. Static browser game; no build step, backend, account, or runtime CDN dependency for the game engine. Start a local static HTTP server at the site root, then open `/grid-io/`.

## Play

Collect energy to grow a finite laser trail. Cut off the 40 computer riders, collect their dropped energy, and beat your personal best. Mouse, WASD, or arrows steer. Hold Shift or left mouse to boost; boost spends length and drops energy. Every laser wall, including your own, is lethal. Space or right mouse jumps over walls with a 5.5-second cooldown. Only the eight meters of fresh trail attached to a bike are exempt from self-collision. Platforms and the arena boundary remain solid during jumps. Esc or P pauses. Touch devices have a steering pad and ability buttons.

This release is a solo arena with AI opponents, not network multiplayer. Best length, nickname, bike build, color, graphics setting, and sound preference persist locally when browser storage is available.

## Bike garage

Open **Customize bike** from the main menu. Combine three original 3D bodies (Phantom, Vector, Bulwark), three wheel assemblies (Turbine, Spoke, Tread), and male/female armored riders. Six light colors remain available. The garage and game use the same modular meshes, with moving wheels in gameplay. Drag or use the arrow keys on the preview to rotate it; Reset view returns to the starting angle. Choices save automatically. All 18 part combinations have identical handling and collision rules. Static geometry is merged per material to keep draw calls low.

Trails are continuous vertical light sheets with luminous top edges. There is no floor ribbon or underlay.

## World and graphics

2,400 × 2,400 meter arena with nine reactor landmarks, five main districts, generated alloy and reactor materials, beveled 3D bikes, suspended reactor geometry, dimensional laser walls, particle effects, bloom, shadows, energy crystals, and a minimap. Graphics can switch between High and Performance from pause. Three.js 0.180.0 is vendored locally under its MIT license. Space Grotesk and Barlow Condensed are hosted locally with their SIL Open Font Licenses. WebGL2 is required; a visible error appears if it cannot initialize.

Generated background, cover, floor, and garage art live in `assets/`. See `assets/GENERATED-ASSETS.md` for exact prompts. Runtime bikes and architecture are original procedural 3D meshes.

## Verification

`node --test grid-io/tests/*.test.mjs` (from the site root) exercises growth, boost costs, laser death and scoring, lethal self-collision, the fresh-trail exemption, jumping over your own wall, lethal boundaries, all 18 part combinations, malformed saved selections, and a five-minute seeded arena simulation. Browser verification covers distinct body/wheel/rider geometry, preview rotation, saved selections after reload, garage-to-game model parity, removal of the underlay, and desktop/mobile controls. `?test=1` exposes diagnostics only for browser QA.

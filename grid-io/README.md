# Grid.io

An original 3D laser-bike survival arena for AriaKawa. Static browser game; no build step, backend, account, or runtime CDN dependency for the game engine. Start a local static HTTP server at the site root, then open `/grid-io/`.

## Play

Collect energy to grow a finite laser trail. Cut off the 40 computer riders, collect their dropped energy, and beat your personal best. Mouse, WASD, or arrows steer. Hold Shift or left mouse to boost; boost spends length and drops energy. Space or right mouse jumps over rival laser walls with a 5.5-second cooldown. Your own trail is safe. Platforms and the arena boundary remain solid during jumps. Esc or P pauses. Touch devices have a steering pad and ability buttons.

This release is a solo arena with AI opponents, not network multiplayer. All skins have equal performance. Best length, nickname, color, graphics setting, and sound preference persist locally when browser storage is available.

## World and graphics

2,400 × 2,400 meter arena with nine reactor landmarks, five main districts, generated alloy and reactor materials, beveled 3D bikes, suspended reactor geometry, dimensional laser walls, particle effects, bloom, shadows, energy crystals, and a minimap. Graphics can switch between High and Performance from pause. Three.js 0.180.0 is vendored locally under its MIT license. Space Grotesk and Barlow Condensed are hosted locally with their SIL Open Font Licenses. WebGL2 is required; a visible error appears if it cannot initialize.

Generated background, cover, floor, and garage art live in `assets/`. See `assets/GENERATED-ASSETS.md` for exact prompts. Runtime bikes and architecture are original procedural 3D meshes.

## Verification

`node --test grid-io/tests/simulation.test.mjs` (from the site root) exercises growth, boost costs, laser death and scoring, jump clearance and cooldown, safe own trails, lethal boundaries, and a five-minute seeded arena simulation. Browser verification covers desktop/mobile menus, garage color, controls, boost, jumping, pause, quality toggle, death and retry. `?test=1` exposes diagnostics only for browser QA.

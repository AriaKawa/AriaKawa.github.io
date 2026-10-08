# Burrow & Fang

Pixel-art village autobattler for AriaKawa. Static ES modules; no build step or runtime package install.

Serve the repository root with a local HTTP server and open `/burrow-and-fang/`. Run `npm test` from this folder for the engine suite. Production is deployed by the repository's GitHub Pages `main` branch.

## Play

Choose Rats or Wolves. Buy from four shop cards, place purchases on the 37-hex village, then battle. Units are recreated from their buildings each round. Each building type is unique. Clicking its matching shop offer immediately adds one star, up to three; it never creates a duplicate. Maximum-star types stop appearing in new rolls. Move or swap buildings freely during preparation; reserve and sell actions are in the selected-building panel. Unit buildings and non-unit buildings each have a capacity equal to village level. The eight-slot reserve holds purchases.

Click a purchase or village building to pick it up. Its preview follows the pointer and snaps to nearby hexes; click to place or Escape to cancel. The higher-angle village uses grounded foundations, connected perimeter roads, animated patrols and cosmetic workers. Workers carry supplies along the road graph, stop at destinations, and never enter the economy, saved armies or combat simulation. Combat takes place on an open meadow with direct pursuit rather than a central crossing. The shop uses unframed transparent building art and plain coin prices above the reroll control. Matching upgrades share a colored glow on the board and in the shop. Generated wood-and-bronze controls replace the blue panels; the utility row is hidden and scroll zoom extends to 3.2×.

Rats field small swarms, poison casters and a summoning Rat King. Wolves gain 6% damage per nearby packmate, up to 18%; a Pack Leader adds a 35% damage aura, and shamans heal nearby allies. Adjacent support buildings add attack speed or starting health. Each clan has nine building types with generated art.

Rounds pay 5 gold, up to 5 interest (1 per 10 saved), economy-building income, streak income, and 1 extra gold for a victory. Rerolls cost 2; 4 gold buys 4 XP; battles grant 2 XP. Levels 3–8 unlock higher shop odds and more building slots. Reach 10 wins before health runs out. Runs also end after round 25. Buildings sell for their combined purchase value.

## Modules

- `engine.mjs`: pure economy, placement, merging, snapshot validation and deterministic 60 Hz combat.
- `render.mjs`: pixel canvas, hex picking, camera, depth-sorted animation and roads along shared hex boundaries.
- `game.mjs`: minimal DOM interface, input, sound synthesis and local autosave.
- `network.mjs`: asynchronous saved-army matching through the site's Firebase project.
- `assets/generation.json`: built-in image-generation prompts and asset provenance. Runtime art includes 18 extracted building sprites, two 24-frame unit sheets, a 16-frame VFX sheet, and terrain. The cover is a capture of the rendered generated art.
- `assets/generation-v2.json`: higher-view building and meadow prompts, road texture and a 24-frame worker atlas. Version 2 unit sheets align the existing poses to a shared foot baseline to prevent floating during animation.

## Async battles and persistence

Firebase anonymous authentication is automatic; no user login or name is requested. The public army snapshot contains clan, round, level, building types, star levels, hex coordinates, a random run ID and timestamp. It excludes browser saves, health, currency and any account profile. Pools are separated by round under `burrowAndFang/v1/rounds` with 96 bounded slots per round. Incoming snapshots are validated and expired snapshots ignored. Locally cached armies or explicitly labeled practice villages fill empty/offline pools.

The opponent and seed are saved before combat. Refreshing restarts that deterministic battle. Settlement only applies to the battle phase, preventing duplicate rewards. Browser save failures are surfaced; malformed saves are rejected.

For local UI verification, `?qa=1` exposes a narrow test interface only on `localhost` and `127.0.0.1`. It is unavailable on the public site.

## Verification

The engine suite covers hex topology, shop costs and odds, direct upgrades, legacy duplicate refunds, full reserves, caps and swaps, interest and income, XP, locking, support adjacency, snapshot validation, saves, combat determinism, and complete campaigns for both clans. Browser playtests cover purchases, placement, XP, locking, refresh during battle, settlement, next round, two-browser saved-army matching, restart confirmation and desktop/portrait/landscape layouts. Matchmaking tests use isolated temporary database paths.

Version 3 UI assets and their built-in imagegen prompt are recorded in assets/generation-v3.json. Legacy saves retain a single building per type and refund removed duplicates and the old extra star investment; in-progress battles finish before this migration.

# Burrow & Fang

Pixel-art village autobattler for AriaKawa. Static ES modules; no build step or runtime package install.

Serve the repository root with a local HTTP server and open `/burrow-and-fang/`. Run `npm test` from this folder for the engine suite. Production is deployed by the repository's GitHub Pages `main` branch.

## Play

Choose Rats or Wolves. Buy from four shop cards, place purchases on the 37-hex village, then battle. Units are recreated from their buildings each round. Three equal copies merge automatically, through three stars. Move or swap buildings freely during preparation; reserve and sell actions are in the selected-building panel. Unit buildings and non-unit buildings each have a capacity equal to village level. The eight-slot reserve holds purchases.

Rats field small swarms, poison casters and a summoning Rat King. Wolves gain 6% damage per nearby packmate, up to 18%; a Pack Leader adds a 35% damage aura, and shamans heal nearby allies. Adjacent support buildings add attack speed or starting health. Each clan has nine building types with generated art.

Rounds pay 5 gold, up to 5 interest (1 per 10 saved), economy-building income, streak income, and 1 extra gold for a victory. Rerolls cost 2; 4 gold buys 4 XP; battles grant 2 XP. Levels 3–8 unlock higher shop odds and more building slots. Reach 10 wins before health runs out. Runs also end after round 25. Buildings sell for their combined purchase value.

## Modules

- `engine.mjs`: pure economy, placement, merging, snapshot validation and deterministic 60 Hz combat.
- `render.mjs`: pixel canvas, hex picking, camera, depth-sorted animation and roads along shared hex boundaries.
- `game.mjs`: minimal DOM interface, input, sound synthesis and local autosave.
- `network.mjs`: asynchronous saved-army matching through the site's Firebase project.
- `assets/generation.json`: built-in image-generation prompts and asset provenance. Runtime art includes 18 extracted building sprites, two 24-frame unit sheets, a 16-frame VFX sheet, and terrain. The cover is a capture of the rendered generated art.

## Async battles and persistence

Firebase anonymous authentication is automatic; no user login or name is requested. The public army snapshot contains clan, round, level, building types, star levels, hex coordinates, a random run ID and timestamp. It excludes browser saves, health, currency and any account profile. Pools are separated by round under `burrowAndFang/v1/rounds` with 96 bounded slots per round. Incoming snapshots are validated and expired snapshots ignored. Locally cached armies or explicitly labeled practice villages fill empty/offline pools.

The opponent and seed are saved before combat. Refreshing restarts that deterministic battle. Settlement only applies to the battle phase, preventing duplicate rewards. Browser save failures are surfaced; malformed saves are rejected.

For local UI verification, `?qa=1` exposes a narrow test interface only on `localhost` and `127.0.0.1`. It is unavailable on the public site.

## Verification

The engine suite covers hex topology, shop costs and odds, merge cascades, full reserves, caps and swaps, interest and income, XP, locking, support adjacency, snapshot validation, saves, combat determinism, and complete campaigns for both clans. Browser playtests cover purchases, placement, XP, locking, refresh during battle, settlement, next round, two-browser saved-army matching, restart confirmation and desktop/portrait/landscape layouts. Matchmaking tests use isolated temporary database paths.

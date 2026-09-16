# Jump Royale — The Long Mountain

Playable website: https://ariakawa.github.io/forge-climb-royale/

The map carousel defaults to **The Long Mountain**. The original forge, jungle and snow maps, wardrobe, local rewards, spectator mode and round finale remain available. The public GitHub Pages build runs local practice with 23 bots; the Colyseus multiplayer server remains supported for separately hosted/local sessions.

## Build from this repository

Use Node 22+ and npm. From this directory:

```
npm ci
npm run typecheck
npm test
npm run test:mountain
npm run build
npm run build:site
```

Postinstall copies shared original assets from `../forge-climb-royale/assets` and `vendor` into ignored `client/public`; the source and published game travel together in this repository. Production output is `client/dist`. No node_modules, generated output or duplicate public assets are committed here.

For local multiplayer: `npm run dev`. For static practice development: `npm run dev:client -- --mode hosted --port 5215`.

All Long Mountain environment art is AI-generated: ten matching backgrounds, forty platform variants and six props in the published game's `assets/jump-royale-ai`. Original PNG atlases and exact prompts are saved in `docs/ai-source` and `docs/ai-art-prompts.json`. The atlas compiler uses Sharp; set `SHARP_PATH` to an installed Sharp package before `npm run assets:vertical` (the bundled workstation path is a fallback). Building the game does not require regenerating artwork.

## Verification

`npm run test:mountain` uses actual 30 Hz physics, continuous walking and charging, moving surfaces, wind, ice, recovery exits, private collapse, secret/rotor access and expert bots. `npm run test:browser:mountain` expects hosted dev at port 5215. It uses real keyboard input first, then replays the entire course through the actual hosted client with an accelerated clock and no teleports. The online test expects a server on 2575 and Vite with `VITE_SERVER_URL=ws://127.0.0.1:2575` on port 5216. Browser scripts use the local bundled Playwright path; adjust that import for other machines.

See [world design and measured validation](docs/vertical-world.md). The `debugWorld` URL parameter displays surface edges and IDs; normal gameplay hides these.

## Moonveil Forest

A new 16-bit nighttime forest with a 2,560 × 14,400 world, horizontal camera tracking, 119 primary jumps and 14 alternate trails. Details and checks: [Moonveil Forest](docs/moonveil-forest.md). Match loot points now require a final top-15 placement. Elimination and early departure do not award a point.

## Starlight Reverie

A magical-girl-inspired anime pixel map with six chapters, two generated backdrops, three platform variants and a rising stardust tide. A 2,880 × 15,600 world with 128 main jumps and 16 alternative routes. See [map and generated-art notes](docs/starlight-reverie.md).

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

New artwork has editable SVGs and PNG exports in the published game's `assets/jump-royale`. The generators use Sharp; set `SHARP_PATH` to an installed Sharp package before `npm run assets:vertical` (the bundled workstation path is a fallback). Building the game does not require regenerating artwork.

## Verification

`npm run test:mountain` uses actual 30 Hz physics, continuous walking and charging, moving surfaces, wind, ice, recovery exits, private collapse, secret/rotor access and expert bots. `npm run test:browser:mountain` expects hosted dev at port 5215. It uses real keyboard input first, then replays the entire course through the actual hosted client with an accelerated clock and no teleports. The online test expects a server on 2575 and Vite with `VITE_SERVER_URL=ws://127.0.0.1:2575` on port 5216. Browser scripts use the local bundled Playwright path; adjust that import for other machines.

See [world design and measured validation](docs/vertical-world.md). The `debugWorld` URL parameter displays surface edges and IDs; normal gameplay hides these.

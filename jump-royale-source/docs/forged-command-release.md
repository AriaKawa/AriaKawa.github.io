# Forged Command release

The approved forge home screen uses generated logo, hanging banner, helmet, chest, button and reusable metal frame assets. Map selection has four newly generated scenery-only previews instead of composited gameplay platforms. The live character, editable name, carousel, wardrobe, scores, loot, wallet, settings and game launch remain functional.

This release is based on live commit `6c11306`. It ports only the menu work from the earlier local prototype, preserving live's ten-region mountain, platform balancing, unified wardrobe/costumes, Ember hairstyles, accessory previews and updated loot mechanics. The retired second wardrobe is not restored. Game simulation and saved-data formats are unchanged.

Generated UI assets: `forge-climb-royale/assets/menu/forged-command/`; scenery previews: `forge-climb-royale/assets/menu/map-previews/`. All image generation used the built-in tool. Prompts are in the adjacent asset and map-preview documents. `npm run assets` restores these public assets from the deployed sibling as usual.

Validation: `npm run typecheck -w client`, `npm run build:site`, and `node scripts/browser-forged-release.mjs`. Set `FORGE_TEST_URL` to test a static production build or live URL. The browser smoke uses an isolated test wallet, exercises all four carousel images, current wardrobe, scores, a real free-spin transition, nested gold dialogs, settings, gameplay entry/return, and desktop/portrait layouts, rejecting failed requests and page exceptions. Screenshot fixtures do not modify user balances or deployment defaults.

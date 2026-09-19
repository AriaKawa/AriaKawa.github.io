# Currency, frost and map-preview artwork

All new raster artwork in this release was generated with the built-in imagegen tool. No API generation or fallback image source was used. Aria's higher-detail sheet reuses her original approved canon-outfit generation; character sizing is handled in code without generating replacement characters.

## Published assets

- `forge-climb-royale/assets/menu/currency/{single,five,ten,fifty}.webp`: four square illustrated currency-card backgrounds.
- `forge-climb-royale/assets/snow/blizzard-wall.png`: one continuous rising blizzard image, with lightweight animated wind strokes rendered by the game.
- `forge-climb-royale/assets/reforged/cosmetics/aria-detail.png`: twelve 128px animation frames cropped from the original generation.
- `forge-climb-royale/map-options/images/{map}-{A,B,C}.webp`: eighteen map preview candidates, arranged in the review gallery. These do not replace home-screen map thumbnails until selected.

The complete source map generations are retained locally in `output/jump-map-originals`. `map-preview-manifest.json` records the generation IDs in map/option order.

## Prompt summaries

All map prompts requested wide 3:2 16-bit console pixel art, a restrained palette, crisp square pixel clusters, readable silhouettes, coherent architectural geometry, and no text, characters, UI, glossy rendering or painterly blur.

| Map | A | B | C |
| --- | --- | --- | --- |
| Starlight Reverie | Moonlit palace bridge | Rose garden and gazebo | Broken bridge and clock tower |
| Moonveil Forest | Oak branches and moon shrine | Footbridge above a forest stream | Ascending canopy |
| The Long Mountain | Mountain town beneath a dawn peak | Bell tower and sunset lift | Summit stairs at night |
| The Crown Forge | Tall forge shaft | Giant gear above lava | Crown fortress on a dusk summit |
| Verdant Canopy | Jungle waterfall in morning light | Overgrown shrine | Log bridge at dusk |
| Frostpeak Summit | Alpine chasm in daylight | Glacier cave | Aurora over the summit |

Currency prompts requested square pixel-art fantasy architecture with a quiet, dark central area for the existing gold icons and text; no generated labels, coins, gold bars or characters. Each tier has its own location and palette, from a small treasury to a grand vault.

The blizzard prompt requested one continuous opaque weather mass with blue-gray diagonal wind, no water-wave motif, and no repeating tile pattern.

## Integration and validation

Visible idle-body bounds set character scale consistently in matches, the lobby, wardrobe and rewards. The scale remains fixed across animation frames, and hats use the underlying animal's body height. Pippa's pogo stick is excluded from body-height measurement. Physics dimensions and abilities are unchanged.

`npm test` checks all four gold-pack values and the shared five-second countdown. `scripts/browser-currency-frost.mjs` checks character scale, Currency Exchange contents and close-icon centering, desktop/phone layout, countdown timing, the ice tutorial, and the single-image storm. Existing reward and Aria gameplay checks also pass. Gallery validation covers all eighteen image loads, choice persistence, enlarged previews, Escape, and mobile overflow.

## Selected home-screen previews

Applied the user choices: Starlight Reverie A, Moonveil Forest B, The Long Mountain B, The Crown Forge C, and Frostpeak Summit C. Verdant Canopy retains its existing image. The selected original PNGs were resized to the same 1200-by-800 framing as the gallery and installed at the existing home-screen preview paths.

## Animal size, steady camera and coffee icon

Animals use a 0.5 visual multiplier, including hats and retro versions. Other character scales remain unchanged. The shared simulation does not receive character or outfit data: everyone retains PLAYER_WIDTH/PLAYER_HEIGHT, the same charge curve, launch velocity, air control and collision rules. Removed the sole camera shake call from the shared danger HUD.

Coffee asset: forge-climb-royale/assets/menu/coffee-cup.png. Generated with the built-in imagegen tool, preserving alpha and resized with nearest-neighbor sampling. Final prompt: "Generate a single game UI icon: a steaming ceramic coffee cup filled with dark coffee, handle on the right, warm ivory ceramic with subtle amber highlights and a dark brown pixel outline. True 16-bit console pixel-art sprite, crisp square pixel clusters, simple readable silhouette at 48 pixels. Centered isolated full cup and two little steam curls, transparent background with genuine alpha. No saucer, no text, no badge, no surrounding scenery or border. Square canvas. Intended beside a fantasy game's treasure chest menu icon."

The icon is visual only, immediately after the loot box; no destination or purchasing action was requested. The right-aligned toolbar shifts preceding items left, with a compact narrow-phone layout. Browser verification covers 104 outfit/hat/retro size combinations, four viewport widths, and forced high-danger HUD updates on every map with camera shake instrumented to fail the test.

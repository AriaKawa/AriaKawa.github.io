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

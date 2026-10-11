# Crossroads II — Japanese Village

Select **Settings → Styles → Japanese**. The choice is saved between visits.

## Expanded pack (v2)

- 27 distinct building designs, including separate upgrade tiers, each exported in south, west, north and east orientations: 108 building sprites.
- Homes, produce market, covered well, kitchen, tannery, architect, roadwright, stonemason, shrine, rice farms/granaries/mill, hunters, herbalists, lumber workshops, wolf shelters and fishing hut.
- Four rice growth stages, shallow paddy-water ground, low bunds and rice-bale deliveries.
- Japanese sika deer, including a matching non-graphic fallen sprite.
- Subtle sage grass, pale gravel paths and mossy stone paving.
- Original pink and white sakura trees retained. Workers, wolves, small props and winter tree silhouettes share Current assets.

The buildings use actual orientation-specific files; doorway geometry and street approaches follow their orientation. Economy, harvesting intervals and seasonal rules are unchanged.

Runtime WebPs and dimensions are under `v2/`. High-resolution four-view sheets, environment masters, complete prompts, and the directional contact sheet are in `art-source/japanese-pack-v2/`. All raster art was generated with built-in image_gen. Re-export with `node tools/japanese-pack/prepare-v2.mjs`; this also fills the Japanese slot manifest. Sprite export preserves alpha, crops the four sheet cells and resizes with nearest-neighbor sampling. It does not paint or fabricate directions.

The original six-sprite pack and its source folder remain available as v1. The active in-game style uses the expanded v2 pack.

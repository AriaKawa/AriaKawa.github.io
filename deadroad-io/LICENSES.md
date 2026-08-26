# Asset licenses

Generated placeholder assets:

- Created procedurally for this prototype.
- Original placeholder art.
- No external assets used yet.
- Globe continents, biome fields, forests, lakes, elevation marks, coastlines, road graphs, rivers, labels, bridges, and danger overlays are deterministic original procedural code and art.
- The five PNG zombie enemies and five PNG blood decals under `client/public/assets/generated/zombies/` were generated specifically for Deadroad.io from original prompts using OpenAI image generation, then cropped and downscaled locally. They contain no downloaded or ripped game artwork.
- The active, damaged, destroyed, and packed Mobile Command Core PNGs under `client/public/assets/generated/base/` were generated specifically for Deadroad.io from original OpenAI image-generation prompts, then transparency-cleaned and downscaled locally. They contain no downloaded or ripped game artwork.
- The 24 chassis, body, weapon, and attachment PNGs under `client/public/assets/generated/turrets/` were generated specifically for Deadroad.io with built-in OpenAI image generation, then transparency-cleaned and normalized locally onto shared attachment canvases. They contain no downloaded or ripped game artwork and require no external attribution.

External assets:

- **TheLazyStone — Post-Apocalypse Pixel Art Asset Pack**, https://thelazystone.itch.io/post-apocalyptic-pixel-art-asset-pack. Selected terrain atlases and small environment props are used only by the isolated Planet 2 Missouri prototype/test under `client/public/assets/generated/deadroad/planet2/`. The downloaded pack license permits free non-commercial use, requires payment of at least USD $2 for commercial use, prohibits redistribution of the asset pack in original or modified form, and says credit is optional but appreciated. This repository does not include the raw pack, character art, UI, animations, or a downloadable archive; only the small runtime selection needed for the test is present. Raw assets may not be extracted and redistributed separately from the game. License text reviewed from the downloaded pack's `LICENSE.txt` on 2026-08-26.

- Natural Earth 1:110m land boundary data, Natural Earth contributors, https://www.naturalearthdata.com/, public domain. Used for Planet 2 coastline geometry; all coloring and terrain rendering are original procedural code.
- Natural Earth administrative boundary data, Natural Earth contributors, https://www.naturalearthdata.com/, public domain. Used for the real U.S. state, Canadian province, and American country selection polygons and borders.
- U.S. Census Bureau 2025 Cartographic Boundary File — States, 1:20,000,000, https://www2.census.gov/geo/tiger/GENZ2025/kml/cb_2025_us_state_20m.zip, public domain. Preprocessed into the shared U.S. state polygons, internal-border mesh, and national coastline used by both the globe and tactical map.
- U.S. Census Bureau 2025 TIGER/Line Shapefiles — Primary Roads and county Roads, https://www2.census.gov/geo/tiger/TIGER2025/PRIMARYROADS/ and https://www2.census.gov/geo/tiger/TIGER2025/ROADS/, public U.S. government data. Preprocessed into the compact USA road chunks under `client/src/game/roadData/`; used for Earth road geometry, classification, deployment access, and tactical horde routing. TIGER/Line is not a routing or navigation product.

Any future asset entry must record its name, author, source URL, license, and whether attribution is required.

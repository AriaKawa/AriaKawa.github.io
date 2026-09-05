# Asset licenses

Generated placeholder assets:

- Created procedurally for this prototype.
- Original placeholder art.
- Globe continents, biome fields, forests, lakes, elevation marks, coastlines, road graphs, rivers, labels, bridges, and danger overlays are deterministic original procedural code and art.
- The five PNG zombie enemies and legacy generated blood decals under `client/public/assets/generated/zombies/` were generated specifically for Deadroad.io from original prompts using OpenAI image generation, then cropped and downscaled locally. The legacy blood decals are no longer used by the game.
- The active, damaged, destroyed, and packed Mobile Command Core PNGs under `client/public/assets/generated/base/` were generated specifically for Deadroad.io from original OpenAI image-generation prompts, then transparency-cleaned and downscaled locally. They contain no downloaded or ripped game artwork.
- The 24 chassis, body, weapon, and attachment PNGs under `client/public/assets/generated/turrets/` were generated specifically for Deadroad.io with built-in OpenAI image generation, then transparency-cleaned and normalized locally onto shared attachment canvases. They contain no downloaded or ripped game artwork and require no external attribution.

External assets:

- **TheLazyStone — Post-Apocalypse Pixel Art Asset Pack**, https://thelazystone.itch.io/post-apocalyptic-pixel-art-asset-pack. The included “Hunger Pains” track is used as the looping game soundtrack under `client/public/assets/audio/`. The downloaded pack license permits free non-commercial use, requires payment of at least USD $2 for commercial use, prohibits redistribution of the asset pack in original or modified form, and says credit is optional but appreciated. License text reviewed from the downloaded pack's `LICENSE.txt` on 2026-08-26.
- **domasx2 — Racing Car Engine Sound Loops (`loop_0.wav`)**, https://opengameart.org/content/racing-car-engine-sound-loops. Used as the subtle convoy engine loop at `client/public/assets/audio/sfx/vehicle-engine-loop.wav`. Licensed CC0 1.0 Universal; attribution is not required. This is the same engine loop used by Rigged.
- **n4 — Basic Sound Effects (`gunshot.mp3`)**, https://opengameart.org/content/basic-sound-effects. Used for the rifle/minigun turret at `client/public/assets/audio/turret-rifle.mp3`. Licensed CC0; attribution is not required.
- **Thimras — Battle at sea (`cannon_fire.ogg`)**, https://opengameart.org/content/battle-at-sea. Used for the scrap cannon at `client/public/assets/audio/turret-cannon.ogg`. Licensed CC0; attribution is not required.
- **qubodup — Fire Loop (`qubodupFireLoop.ogg`)**, https://opengameart.org/content/fire-loop. Used as the held, seamless flame-turret stream at `client/public/assets/audio/turret-flame-loop.ogg`. Licensed CC BY 3.0; credit to qubodup is required.
- **zonked — Pixel Flame VFX (`fire-a-168x62.png`)**, https://opengameart.org/content/pixel-flame-vfx. Used as the animated flame-turret stream at `client/public/assets/effects/flamethrower-stream.png`. Licensed CC0; attribution is not required.
- **kurohina — Spark effect (`spark_sprite_strip9.png`)**, https://opengameart.org/content/spark-effect. Used as the animated sparkling-cinder burn effect at `client/public/assets/effects/spark-cinders-cc0.png`. Licensed CC0; attribution is not required.
- **OpenAI image generation — Deadroad field equipment set**, generated for this project on September 2, 2026. Used for the loot satchel, barbed wire, overclock booster, proximity mine, field repair kit, and road flare sprites in `client/public/assets/loot/`. Project-owned generated assets.
- **OpenAI image generation — Missouri 3 road tile kit**, generated for this project on September 2, 2026 and revised the same day. The project-owned asphalt source material under `client/assets-source/missouri3/` was used to create six deterministic 512px edge-matched runtime tiles under `client/public/assets/generated/tilesets/missouri3/`; rotations supply every standard orientation. No external game artwork is embedded.
- **BMacZero — Electricity Sound Effects (`spark.wav`)**, https://opengameart.org/content/electricity-sound-effects-0. Used for the shock turret at `client/public/assets/audio/turret-shock.wav`. Licensed CC0; attribution is optional.
- **sketcherskt — Pew Laser fire Sound (`laserpew.ogg`)**, https://opengameart.org/content/pew-laser-fire-sound. Used for the floodlight pulse turret at `client/public/assets/audio/turret-floodlight.ogg`. Licensed CC0; attribution is not required.
- **Darsycho — Zombie moans (`darsycho__zombie-moans.ogg`)**, https://opengameart.org/content/zombie-moans. Bundled at `client/public/assets/audio/zombie-groan.ogg` but currently unused while zombie groans are disabled. Licensed CC0; attribution is optional.
- **EZduzziteh — Squish Sounds Effects (`squishsplat_impact.mp3`)**, https://opengameart.org/content/squish-sounds-effects. Used for the simple zombie blood-splat sound at `client/public/assets/audio/blood-splat.mp3`. Licensed CC0; attribution is not required.
- **TobiasM — Blood splat (`blood_splat.png`)**, https://opengameart.org/content/blood-splat. Used for both impact feedback and zombie death decals at `client/public/assets/effects/blood-splat.png`. Licensed CC0; attribution is optional.

- Natural Earth administrative boundary data, Natural Earth contributors, https://www.naturalearthdata.com/, public domain. Used for the real U.S. state, Canadian province, and American country selection polygons and borders.
- U.S. Census Bureau 2025 Cartographic Boundary File — States, 1:20,000,000, https://www2.census.gov/geo/tiger/GENZ2025/kml/cb_2025_us_state_20m.zip, public domain. Preprocessed into the shared U.S. state polygons, internal-border mesh, and national coastline used by both the globe and tactical map.
Any future asset entry must record its name, author, source URL, license, and whether attribution is required.

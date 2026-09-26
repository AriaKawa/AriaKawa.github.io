# Neon Rail Rush

Original 16-bit perspective endless runner for AriaKawa. Static HTML/CSS and dependency-free JavaScript modules. Serve the repository root with any static HTTP server and visit `/neon-rail-rush/`.

Controls: arrows or WASD to change lanes, jump and slide; Space jumps; P/Escape pauses. Touch: swipe in four directions, tap to jump, or use the four buttons. Trains require lane changes; orange barricades can be jumped; pink gates can be slid under. Shield absorbs one hit and magnet attracts coins for nine seconds. Speed rises from 24 to 56 m/s. Track rows always have an adjacent open route with spacing scaled to approach speed. Three scenery palettes cycle every 700 meters. Best distance, coins and audio preference are stored only on the current device.

Run the simulation suite with `node --test neon-rail-rush/model.test.mjs`. The engine is deterministic for a given seed. Browser verification covers mouse, keyboard, swipes, touch buttons, pause/resume, collision/retry, saved results, desktop/mobile layouts and asset loading.

All art is original generated material. Prompts and tool provenance are in `assets/ART-PROMPTS.md`. Source PNGs are preserved beside web-ready crops. Runtime binary alpha keeps pixel edges crisp. Rails, signs, lights, effects, powerup symbols, original chiptune music and game audio are generated in code. `prepare-assets.cjs` is an optional local authoring helper requiring the `sharp` package (or `NEON_SHARP_MODULE` pointing to an installed copy); the shipped game needs no build tool.

Validation: six deterministic simulation tests passed, including 120 generation seeds and twenty sustained runs at the speed cap. Browser checks passed for desktop (1440×1040) and emulated mobile (390×844): fifteen runtime assets, all keyboard actions, four real touch swipe directions, touch buttons, pause/resume, a minute-long safe-route run, increasing speed, collisions, retry, saved best score and the Games-page link. The cover is the sixteenth generated runtime art asset.

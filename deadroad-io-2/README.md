# Deadroad.io 2: Last Light

A standalone, single-player sequel to Deadroad.io. The expedition uses original Deadroad generated vehicle, turret, and zombie assets and retains a copied original sandbox at `legacy.html?offline=1`.

Three sectors, nine waves, three convoy loadouts, three difficulties, five defenses with three upgrade levels, six permanent upgrade types, salvage driving, targeted airstrikes, EMP support, field repairs, local checkpoints, and a complete victory/defeat loop.

Controls: WASD/arrows to drive; E to deploy; 1–5 then click an empty pad to build; click an existing turret to upgrade/salvage; Space to send a wave; Q then click to call an airstrike; R for EMP; mouse wheel to zoom; drag empty terrain to pan; F to reset view; M for route map; Escape to cancel/pause. Touch driving arrows appear on narrow screens.

The `source/sequel/` directory preserves the editable expedition engine, renderer, interface, and stylesheet. `source/tests/expedition.test.mjs` exercises economy, placement, support, persistence, defeat, and a full nine-wave expedition. Run `node --test source/tests/*.test.mjs` to validate the engine.

Production output was built with Vite 6.4.3. The original sandbox and its dependencies load only when selected. The new expedition entry is approximately 43 KB JavaScript before gzip; generated game art loads separately. No backend is required. Saves and personal bests are local to the browser.

New key art: `assets/last-light-keyart.png`, created with the built-in OpenAI image generator. Brief: a cinematic, original pixel-art-inspired illustration of an armored command truck beside an abandoned forest highway at dusk, teal shadows and an orange horizon, with dark negative space on the left; no text, logos, or UI. Remaining asset provenance is documented in `LICENSES.md`.

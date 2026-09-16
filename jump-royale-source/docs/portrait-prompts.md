# New profile portraits

Generated with the built-in ImageGen tool on September 16, 2026. These are new illustrations, not gameplay-sprite crops. The four square outputs were resized without cropping to 256×256 WebP for the UI.

Final files:

- `forge-climb-royale/assets/menu/portraits/finn.webp`
- `forge-climb-royale/assets/menu/portraits/stella.webp`
- `forge-climb-royale/assets/menu/portraits/ember.webp`
- `forge-climb-royale/assets/menu/portraits/biscuit.webp`

Each generation used this exact common prefix, followed by its subject text below:

> Use case: stylized-concept. Asset: one square profile portrait for Jump Royale, a richly painted pixel-art fantasy climbing game with dark forged-metal UI frames. Generate a NEW original illustration, not a crop or copy of an existing game sprite. Very tight face close-up, face and hair fill nearly the whole square edge to edge, only a hint of shoulders at bottom, instantly readable at 64px. Polished 16-bit-inspired pixel illustration with clear chunky pixel clusters, expressive eyes, detailed warm highlights, dark navy vignette background, strong silhouette. No frame, no border, no letters, no text, no symbols overlay, no watermark. Square image. Subject:

Finn:

> Finn, a friendly young adult male blacksmith adventurer with short chestnut brown hair, warm tan skin, blue eyes, confident half-smile, a little soot on his cheek and hint of teal clothing. Warm forge light.

Stella:

> Stella, a cheerful adult magical-girl heroine with bright rose-pink hair, pink twin-tail ribbons at the edges, violet eyes, small gold star hair ornament, rosy cheeks, and a confident smile. Pink-gold moonlight.

Ember:

> Ember, an adult demon heroine with flowing midnight-purple hair, two short curved crimson horns, warm amber eyes, light lavender skin, and a playful confident grin. Ember-orange rim light.

Biscuit:

> Biscuit, an adorable golden puppy with floppy caramel ears, soft golden fur, round dark brown eyes, little black nose, happy open mouth. The entire puppy face fills the square. Warm cream highlights.

UI changes reuse the existing `assets/menu/forged-command/frame.png` for panels, buttons and portrait borders. Existing legacy portrait choices map to their corresponding new illustrations where available, otherwise Finn.

Regression test: `scripts/browser-menu-controls.mjs` reproduces the prior button-focus lockout, verifies movement after every menu dialog, checks name-field/modal input isolation and Space jumping, tests Escape dismissal, checks portrait persistence, and compares icon/gold heights on desktop and mobile layouts.

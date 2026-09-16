# Stella 16-bit costume and animal hats

Starlight 16-bit is a separate Stella costume with twin tails and Star Buns. Its 12-frame sheets use 64x64 cells instead of 32x32, with newly generated detail rather than enlarged pixels. Display scale is normalized to preserve gameplay size. Existing animation states and physics are retained.

The costume costs 5 gold. Fedora and Unicorn Horn cost 3 gold each and work on puppy, cat, rat, Cerberus, and kangaroo. All three additions are available in the mystery box and wardrobe. Existing ownership remains intact.

Raster source art was generated with ImageGen using the original Stella sheets as references. Masters are in docs/art-source; exact prompts are in docs/stella-16-prompts.json. Rebuild strips with scripts/compile-stella-16.mjs. Hats use the existing code-native pixel attachment system.

Validation: typecheck, gameplay/costume regression suite, production build, and scripts/test-stella-hats.mjs. Browser checks cover purchases, saved outfits, both hairstyles, animation registration, gameplay scale, all 120 animal/hat frames, mystery box entries, and mobile wardrobe.

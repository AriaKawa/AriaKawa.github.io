# Detailed costumes for Ember, Kenji and Cerberus

Each costume has twelve 64x64 animation frames and costs 5 gold, with mystery-box availability. Ember supports Midnight Locks, Rose Horn Buns and Silver Braid. Cerberus supports all existing hats. Character labels now display names only.

The original designs remain selectable. Detailed selections persist independently per character. Animation timing, gameplay dimensions and physics remain unchanged.

Generated using built-in ImageGen, editing the existing character sheets. Exact prompts: [trio-16-prompts.json](trio-16-prompts.json). Saved sprite strips: `client/public/assets/reforged/cosmetics/{demon,demon-buns,demon-braid,neet,cerberus}-16.png`. Original generated masters: `docs/art-source/*-16-source.png`. Compiler: `scripts/compile-trio-16.mjs`.

Checks: TypeScript, gameplay and costume regressions, previous Stella/hat browser checks, and `scripts/test-trio-16.mjs` for purchases, persistence, names, 96 animation frames with hairstyles/hats, ownership guards, live mystery-box entries, mobile wardrobe and fixed gameplay scale.

# Skin and wallpaper overhaul — September 18, 2026

All twelve characters use 64px 16-bit base models. The eleven prior low-resolution character models are Retro 8-bit Specials; they cannot use retired Finn costume art. Finn's seven complete costumes use new twelve-frame knight sheets. Pippa is a barefoot adult athlete in a teal sports bra and navy gym shorts, riding a pogo stick through idle, charge, jump, fall, landing, defeat and travel animations. Character abilities and collision bounds are unchanged.

Existing character and costume ownership is retained. Prior paid 16-bit upgrade receipts unlock that character's new base and Retro Special, preserving purchase value. Old selected 16-bit IDs resolve to the new base. No old 8-bit Finn costume variants or paid HD upgrade entries remain in the wardrobe or mystery box.

Wallpaper browsing changes only the picker preview. Equip persists the selection. Closing without a new selection leaves the lobby model, background and effects alone. Closing returns focus to the game canvas, preventing Space from reopening the picker.

The $50 USD Gold Vault contains 50 base gold plus 10 bonus gold: 60 total, 20% extra. Like the existing packs, checkout remains unavailable until the existing payment/wallet integration is completed. A one-time, explicitly claimed 1000-gold browser gift is supported; normal visitors receive no automatic credit.

## Mystery box audit

37 unique prizes: 11 character unlocks, 11 Retro Specials, 7 knight costumes, 2 wallpapers, 3 hairstyles and 3 animal hats. Free base Finn is excluded. Every prize is reachable. Each rarity chooses equally among unowned prizes, falling back to duplicates only when the entire tier is owned.

| Rarity | Tier chance | Items | Initial chance per item |
|---|---:|---:|---:|
| Mil-Spec | 60% | 5 | 12% |
| Restricted | 25% | 6 | 4.1667% |
| Classified | 10% | 5 | 2% |
| Covert | 4% | 19 | 0.2105% |
| Legendary | 1% | 2 | 0.5% |

The in-game odds display updates with each browser's collection.

## Art and validation

Created with built-in ImageGen. Original generated atlases and prompts are in `overhaul-ai-source/` and `overhaul-prompts.json`; `overhaul-art.json` maps them to shipped sprites. `scripts/import-overhaul.cjs` packs each 4x3 atlas into twelve 64px frames, removes the magenta packing background and aligns the foot/pogo baseline. Final assets are in `forge-climb-royale/assets/reforged/cosmetics`.

Validation: server/client typecheck; existing physics, bot, finale and ownership tests; `test-overhaul.ts` covers migration, retro purchase/equip, duplicate purchase prevention, gift idempotency, bundle math and rarity boundaries. `browser-overhaul.mjs` checks all bases and costumes, 420 frames including animal hats, all 37 prizes, 100% probability total, wallpaper input and reload persistence, real wardrobe purchases, Pippa in a match, and desktop/portrait/landscape store and wallpaper layouts. Zero browser exceptions.

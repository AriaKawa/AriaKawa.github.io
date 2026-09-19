# Terrain and mystery-box refresh — September 19, 2026

Frostpeak has permanent platforms only. Slippery cyan ice occupies fewer than 22% of its ledges. All original platform dimensions are reduced 10%, with stable width variation down to another 40% smaller. The inner edges of opposite banks retain their positions so the jumps remain reachable.

Moonveil Forest has a new optional mossy bucket platform beside the first climb. Its open center has a lower physical floor and solid side walls; entering it is avoidable and jumping out is possible. The flood starts after 6 seconds at 30 world units/second, accelerating to 52, compared with the previous 12-second grace and 9–18 speed.

The Long Mountain adds a connected optional three-platform branch after `foothills-4`, returning to `foothills-7`. The filled wedge rises left to right. Players slide downhill at 26 world units/second while idle or charging; uphill input can make slow progress. Launch physics and player collision dimensions remain shared by every character.

All in-world text labels are removed; player names and HUD text remain. Mechanic notices use the established textured frame, with roughly four times their previous area on desktop and responsive sizing on phones. Enemy opacity ranges from 10% to 100%; saved values below 10% are clamped, and the default remains 25%. Bot outfits are approximately 92% knights, with occasional special characters.

Mystery-box icons are cached, the collection grid renders only when expanded, and the reel uses compositor transforms without per-icon shadow filters. Baseline spin time is 8.4375 seconds (25% longer). A spin can be 15% faster or 30% slower; slow spins are more frequent when the actual winning or adjacent card has red/gold rarity. Rewards and drop odds are unchanged. The reveal uses the established frame and texture with a rarity hue.

## Generated assets

Mode: built-in `image_gen`, separate generation for each asset. Existing platform art was supplied as a style reference. Outputs retained their generated alpha, were trimmed and resized, and were exported as lossless WebP into the published assets. No CLI generation was used.

Final paths relative to the repository root:

- `forge-climb-royale/assets/forest-ai/lantern.webp` — 256 px tall.
- `forge-climb-royale/assets/forest-ai/bucket.webp` — 768 × 192.
- `forge-climb-royale/assets/jump-royale-ai/props/slope.webp` — 600 × 180.

Generation prompt summaries:

- Lantern: a single standing fantasy forest lantern in detailed 16-bit pixel art; mossy teal metal, warm golden glass, slim post; match Moonveil's blue slate and moss palette; no scenery, lettering or cast background; true transparent alpha.
- Bucket: a side-view U-shaped forest platform matching `forest-ai/moss-slate.webp`; equal flat moss-covered left and right ledges, deep open rectangular center notch, filled blue slate below and around the notch, roots and small glowing mineral details; coherent pixel grid, no perspective, text or background; true alpha in and around the opening.
- Slope: a side-view filled right-triangle mountain wedge matching `jump-royale-ai/foothills/platform-0.webp`; grassy diagonal ascending from bottom-left to top-right, vertical right face, horizontal bottom, solid gray rock beneath; crisp 16-bit pixels, no text, perspective or background; true transparent alpha.

## Validation

- TypeScript checks and the main simulation/economy suite.
- All 76 Frostpeak jumps, all 119 forest main jumps and 14 branches; four expert forest bots finish ahead of the faster flood.
- Mountain's 281 main jumps at two moving-platform phases and 590 fall probes; all four connections of the new branch.
- Direct tests of idle/charging slope drift, uphill movement, slope jumps, falling through the pit opening and escaping it.
- Browser checks on six maps: absent world labels, normal and 10–100% enemy visibility, equal character physics/visual foot alignment, larger framed tutorials, generated assets, cached loot reel, reveal hue, duplicate rewards and Back behavior.
- Desktop, phone portrait and phone landscape layouts.

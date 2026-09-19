# Reward reveal and Aria artwork

Generated with the built-in imagegen tool, then cropped and resized with nearest-neighbor sampling for the game. The three hats use shared generated sprites, explicit per-frame crown anchors on every 16-bit animal, and the same art in reward icons. Aria has twelve frames and no retro variant. The currency/frost update restores those frames from the original generation at 128px each to retain more outfit detail.

## References

Aria: the user's `Creative Projects/Aria/Aria - Adventurer Character Reference.png`: mint-green bob, green eyes, ivory capelet and tunic, olive laced bodice, dark trousers and cuffs, belt pouch, brown boots, red wrist bead. The reference remains outside the published site.

## Generation prompts

- Party hat: transparent-background 16-bit SNES equipment sprite, pink and purple cone, pale gold dots, turquoise rim, gold pompom, crisp square pixel clusters, side view with level base, no character or text.
- Fedora: transparent-background 16-bit SNES equipment sprite, brown felt with chestnut shading, tan highlights, dark chocolate band, wide level brim, crisp square pixel clusters, no character or text.
- Unicorn horn: transparent-background 16-bit SNES equipment sprite, upright tapered ivory spiral with pink/cyan facets, thin gold edging and small flat gold base, crisp square pixel clusters, no character or text.
- Aria: preserve the reference appearance and outfit in a transparent 4-by-3 grid of twelve 16-bit full-body sprites facing right: idle, breathing, charge, crouch, ascending jump, descending jump, landing, defeated, and four walking frames. Consistent scale and baseline, no weapon, labels, scenery or borders.

## Validation

`npm run typecheck`, `npm test`, and `npm run build:site` pass. `scripts/browser-rewards.mjs` checks 516 character/hat frames, rarity order and odds, real spins with Legendary/duplicate/non-character prizes, changing jump poses, nested Back actions, closed-during-spin handling, fall wrapping and phone layouts. Aria also passed saved-selection, match-spawn and jump checks.

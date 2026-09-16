# Starlight Reverie

A new magical-girl-themed map inspired by the existing pink-haired character, her ivory outfit, ruby accents and gold jewelry. All existing maps and wardrobe choices remain available.

## Course

- 2,880 × 15,600 pixels, with position-following horizontal scrolling and no facing offset.
- Six chapters: Wishing Plaza, Ribbon Rooftops, Roseglass Gardens, Star Crystal Arcade, Lunar Sanctuary, Heart of the Moon.
- 128 main-route jumps and 16 optional branches that split a tall jump into two shorter jumps. Platform widths taper with altitude; broad recovery shelves join the routes.
- Solid landing surfaces and undersides use the existing collision physics. The Solid Terrain notice appears before and during the countdown with the matching palace platform illustration.
- Stardust Tide begins rising after 12 seconds: 9 px/s plus 0.008 px/s per second, capped at 18 px/s. No five-minute timeout.
- A dream-city backdrop transitions into a celestial moon palace through the middle of the ascent. Animated star particles and a heart crest mark the magical theme.
- Final top-15 placement awards a loot point under the existing unassisted-round rules.

## Generated artwork

Built-in **image_gen** generated six original assets: ribbon-palace, rose-garden, star-crystal, dream-city, moon-palace and stardust-tide. Full final prompts are retained in [magical-ai-prompts.json](magical-ai-prompts.json); original PNGs are in [magical-ai-source](magical-ai-source/).

Runtime WebP files are saved in `client/public/assets/magical-ai/` and the published repository's `forge-climb-royale/assets/magical-ai/`. Run `npm run assets:magical` to pack them. The compiler preserves generated RGB and transparency, crops the platforms to their measured landing caps, and writes cap metrics used to align artwork with collision tops.

## Validation

`npm run test:magical` checks all main jumps and both connections of every optional branch using the 30 Hz physics. The minimum is 21 sampled launch solutions per main jump. Four expert bot patterns reach the summit ahead of the tide. Reward boundaries and duplicate receipts pass.

`npm run test:browser:magical` against hosted Vite on port 5224 checks keyboard jumping, horizontal camera behavior when turning, all platform variants and the tide texture, the upper palace transition, smaller screens, rewards, departure behavior, replay and browser errors. Existing `npm test`, server build and hosted production build also pass.

Hosted mode retains the existing local match with 23 bots. The shared server source includes the new map and dimensions.

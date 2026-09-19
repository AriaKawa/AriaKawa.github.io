# Expedition collection

Five mystery-box lobby wallpapers: Corsair Cove, Little Moon, Neon Rooftops,
Tidal Sanctuary and Cloud Garden. All are ownership-gated and persist through
reload. The city is a lobby wallpaper, not a new competitive climbing course.

Three detailed characters: Captain Marlow (pirate), Cosmo (monkey astronaut),
and Mochi Rose (axolotl). Each has 16 authored poses packed into a 1024px RGBA
sheet with 256px frames: idle, blink, two charge poses, jump, fall, landing,
defeat, four walking strides and four celebration/expressive poses. The rig
registers nine animation sequences. No nonexistent retro variants are sold.

Little Moon uses a circular collision surface and local radial gravity; A/D
walks around its circumference and holding/releasing Space charges a jump.
Ship, rooftop, reef and garden surfaces are measured against the finished art.
Leaving those ledges returns the player from above. The ship has a signal
cannon effect; the reef current and garden breeze launch the lobby player.
Actions have cooldowns and honor reduced-motion preferences for particles.

Art was generated with the built-in image generation tool. Original character
sheets are in `source/`; `scripts/compile-expedition.cjs` removes disconnected
alpha dust and packs consistently scaled, foot-aligned frames. Production
wallpapers live in `forge-climb-royale/assets/menu/wallpapers/`; character sheets
live in `forge-climb-royale/assets/reforged/cosmetics/` with `-expedition` suffixes.
The source project's public assets are restored with `scripts/restore-public.mjs`.

Validation: full client/server typecheck; production hosted build;
`scripts/browser-expedition.mjs` checks all eight loot entries, exact total
odds, ownership, 48 frames and 27 animations, moon contact through a complete
orbit, jump/landing, all five scenes, interactive actions, carousel count,
mobile viewports, persistence and a real hosted-mode match start.

The broader legacy `test-jump-royale.ts` and `test-progression.ts` scripts
fail on bot launch alignment and ghost/departure counts respectively. Their
simulation dependencies match the live base revision and are unchanged by
this cosmetic/lobby update. Economy overhaul and social reward tests pass.

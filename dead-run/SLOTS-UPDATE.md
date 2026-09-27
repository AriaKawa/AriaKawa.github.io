# Two weapon slots

The starting weapon occupies slot 1; slot 2 starts empty. Pick a weapon in a road crate, then choose slot 1 or 2 to fill or replace. The other slot is preserved. Crates exclude both held weapon types. Back returns to the same offers; Keep Both Weapons closes the crate without changing inventory. The whole run pauses until the choice is resolved.

Press 1 or 2, use the mouse wheel over the game, or tap/click a HUD slot to switch. The active slot is highlighted. Weapon rectangles are separate from the health panel, with their numbers on the right. Empty slots cannot be selected. A 0.42-second holster/draw animation lowers the old weapon and raises the new one, with a small HUD progress indicator. Movement continues; attacks wait until the swap completes. Repeated input cannot interrupt a swap. Holstered weapon cooldowns count down normally, so switching cannot reset slow weapon fire rates. Card and safehouse bonuses apply to both weapons, including bonuses earned while one is holstered.

The Scorpion fires one bullet into the player's lane and one into an adjacent lane, each carrying half its weapon damage. It prefers a neighboring lane with a target, otherwise the neighbor toward the center. It emits both bullets even when only one lane has an enemy. Crossfire cannot increase its two-lane cap; piercing and elemental/critical modifiers still apply to each bullet. A temporary minigun retains its separate four-lane behavior.

The decorative running horde behind the survivor and the in-game Test Gear menu have been removed. Road pickups, infected ahead, and the existing horde-pressure mechanic remain.

75 automated checks cover the existing game and the new slot state, swap cooldowns, card transfers, paused swaps, temporary minigun expiry, Scorpion damage splitting, and two-slot Crossfire eligibility. Desktop and phone browser checks each collected two natural crates, filled/replaced both slots, used keyboard and pointer/touch switching, checked the swap pose, preserved cards, and loaded all 309 assets without errors. Local QA screenshots and scripts are under `Playground/deadrun-qa/v8/`.

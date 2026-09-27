# Elemental builds and weapon crates

## Cards

There are 28 draftable upgrades plus the exhausted-build recovery card. Each card shows its rarity and build family; support cards enter the pool after a matching starter. Attunements can coexist and remain once-per-run picks.

| Rare attunement | Effect |
| --- | --- |
| Ice | Hits slow an infected target's approach by 40% for 3 seconds. |
| Fire | +50% to every fire damage source; weapon hits add an 18 damage/second burn. |
| Air | Double jump height, enough to clear brutes as well as smaller infected. |
| Earth | 150 contact damage to infected; the survivor still takes contact damage. |

Fire builds: Incendiary adds burn damage; Fan the Flames increases all fire damage and duration; Wildfire spreads explosions and ignition on burning kills; Firebomb converts grenades to fire and ignites survivors; Cinder Feast heals on burning kills.

Thorns builds: Briar Armor adds contact damage and armor; Juggernaut adds health and max-health scaling to thorns; Retribution splashes thorns damage to nearby infected; Living Fortress adds armor and regeneration below half health. Fatal contact remains fatal even if retaliation kills an infected.

Headshot grants 20% critical chance per rank. Headshot Specialist adds 10% chance and 50% critical damage per rank. Both work on all weapons, including the sword.

## Weapon crates

Collect the amber weapon crate from the road. The first is scheduled near 180 meters; later crates arrive roughly every 420–640 meters, delayed when no safe lane is available. Each pauses the simulation, power timers and movement and offers three distinct weapons other than the equipped one. The fourth option keeps the current weapon. Keyboard shortcuts are 1–4, with touch buttons and trapped keyboard focus.

All eight weapons are in the crate pool. The original three remain starting choices. Current cards, safehouse bonuses, health, consumables and XP survive replacement. Damage and attack-speed modifiers transfer to the new weapon's baseline; piercing bonuses transfer; Crossfire persists. One-time card healing and grenade rewards do not replay. A minigun power-up returns to the newly equipped weapon when it expires.

| New weapon | Damage | Seconds / attack | Range | Base targets per lane |
| --- | ---: | ---: | ---: | ---: |
| Deagle | 94 | 0.72 | 115 m | 1 |
| Akimbo Glocks | 19 | 0.14 | 85 m | 1 |
| Scorpion EVO | 10 | 0.065 | 75 m | 1 |
| Barrett .50 Cal | 155 | 1.55 | 210 m | 6 |
| Samurai Sword | 110 | 0.66 | 12 m | 4, across up to three lanes |

Akimbo pistols alternate muzzle positions. The sword uses a four-frame cut with a blade trail, affects only reachable elevations, and emits no bullet tracer. All five weapons have new equipped, jump and inventory art. The Test Gear crate marks the run as practice, like the other test equipment.

## XP

All kill XP is multiplied by exactly 0.5: walkers 5, runners 7, brutes 15. Elite multipliers remain double. Weapon, grenade, burn, explosion, thorns and board kills all share this calculation. Level thresholds and overflow behavior remain the same.

## Verification

65 Node regression checks pass across `model`, `geometry`, `endless`, `animation` and `builds`, including a 20-minute bounded-world simulation. New checks cover damage combinations, prerequisites, crits, jump clearance, XP, crate state, replacement bonuses, and packaged assets.

Desktop and 390-pixel phone browser checks loaded all 309 assets without errors. They exercised all eight weapon replacements, the fourth keep option, natural crate pickups, earned card drafts, keyboard and touch input, and the Games tile. The recorded run collected two crates, selected three upgrades, and reached level 4 with 310 total XP. Visual QA checked inventory crops, the forward-facing Barrett, sword cut, and both crate layouts. QA artifacts are in `Playground/deadrun-qa/v7/`.

## Art provenance

The built-in image generation tool produced the five weapon atlases and crate; no CLI fallback was used. Sources, exact prompts and the Barrett correction prompt are retained in [assets/v7/generation.json](assets/v7/generation.json). [prepare-art-v7.cjs](prepare-art-v7.cjs) extracts connected figures, aligns frames, and prepares inventory icons while preserving generated transparency.

Final assets are under [assets/v7/](assets/v7/): `weapon-{deagle,glocks,scorpion,barrett,katana}.png`, `weaponcrate.png`, and 60 `v7-*` character frames. Existing raster art supplies the card illustrations, with build labels and colors added by the UI.

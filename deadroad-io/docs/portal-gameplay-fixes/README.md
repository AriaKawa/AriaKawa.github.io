# Portal and gameplay fixes

The gravestone spawner is now a generated transparent stone portal, 130 world units tall (previously 54), with a dark gateway, violet/teal energy and twelve animated wisps. Zombies emerge at its lower opening.

Wave pressure changes repaint only the threat texture in short cooperative batches. They keep the existing texture and do not rebuild terrain or map labels. Damage feedback uses one opacity animation without a forced synchronous layout or repeated timers. Unchanged HUD text is no longer rewritten.

Convoy collision sweeps interpolate the shortest heading arc across the ±π boundary, preventing partial tree collisions from rotating the chassis through a full circle.

Balance (shared by local and authoritative combat):

| Tower | Range before → after | Damage before → after |
| --- | --- | --- |
| Rifle | 285 → 160 | 11 → 9 |
| Cannon | 255 → 145 | 38 → 30 |
| Flame | 175 → 100 | 3 → 2 |
| Shock | 265 → 150 | 21 → 16 |
| Floodlight | 240 → 140 | 2 → 2 |

Cannon splash radius is 65 instead of 115. Flame splash radius is 48 instead of 68, with burn DPS 5 instead of 7. Research grants +30% power, +12% reach (plus the existing +10% damage), or +20% firing rate per tier. Research costs and existing unlocks remain intact.

Field-gear bag chances: stalker/skitter 4% → 5%, bloater 6% → 8%, armored 6% → 9%, ravager 10% → 13%, brute 18% → 22%. Ordinary zombie chances and the guaranteed Zombie King bag remain intact.

Every audio category applies a 0.4 output multiplier, including music, combat, engine and field-gear sounds. This applies equally to saved settings and new defaults without repeatedly migrating stored preferences.

Validation: production build; combat balance, loot, audio, convoy, scenery, progression/server parity; a collision regression with a partial obstacle sweep across π and repeated contact; browser deployment/reroll/rollout checks, portal screenshot, three wave completions and eight damage events. Local browser measured zero world rebuilds, texture reuse, one damage animation maximum, and event handlers under 6 ms, with no runtime errors.

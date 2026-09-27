# Random events

The first event starts after 45–65 seconds of active play. Every event gets a four-second warning, an on-screen explanation and countdown. After an event finishes there are 40–60 seconds before the next. A seeded shuffled bag uses each of the five events once before refilling, with no immediate repeats. Pausing, card drafts and weapon crates freeze the schedule and durations.

| Event | Duration | Effect |
| --- | --- | --- |
| Horde Incoming | 14 s | Replace zombies ahead with nonelite walkers in all four lanes, every 16 m. Preserve safe vehicle ramps and exits. |
| Sword Fight | 16 s | Runners carry visible swords that swing as they approach. Contact deals 2.5× their usual damage; jumping, shields, armor and thorns still work. |
| Bucket Heads | 16 s | All zombies wear buckets and ignore headshot critical bonuses. Normal weapon damage, burning and other effects still work. |
| Clear Skies | 12 s | Remove existing zombies and suppress new zombie spawns. Double current movement speed, preserve obstacles, and pause chase pressure. Completing the event alive grants 60 XP once, using the existing level-up flow. |
| Supply Drop | 16 s | Double health supply pickups, including the already-generated track. Each original pickup gets one nearby companion on its lane and surface. Weapon crates and power-ups keep their own frequencies. |

Crates now start around 350 m instead of 180 m. Subsequent spacing is 840–1280 m instead of 420–640 m, approximately halving frequency. Unsafe placement is retried farther ahead as before.

Runtime modules use the `events-v9` cache version. No test menu or writable debug API is added to production.

Validation: run `node --test dead-run/model.test.mjs dead-run/endless.test.mjs dead-run/animation.test.mjs dead-run/geometry.test.mjs dead-run/builds.test.mjs dead-run/slots.test.mjs dead-run/events.test.mjs` from the repository root. Event coverage includes schedule determinism, shuffled rotation, pause behavior, spawn replacement/suppression, doubled movement, survival XP, obstacle damage, crit immunity, sword damage, doubled supplies, crate spacing, and fresh-run resets. Browser checks exercise all five events and their HUD on desktop and mobile.

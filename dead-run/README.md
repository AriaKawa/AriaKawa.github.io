# Dead Run

A gritty four-lane 16-bit zombie roguelike runner for AriaKawa. Neon Rail Rush remains available. The Games page includes a dedicated Dead Run card. See [the elemental builds update](BUILD-UPDATE.md) and [two weapon slots update](SLOTS-UPDATE.md).

## Play

Serve the repository root with a static HTTP server and visit `/dead-run/`. No build step or runtime dependency. Local preview: http://127.0.0.1:5282/dead-run/ . Public game route: https://ariakawa.github.io/dead-run/ .

Left/right or A/D move and aim. Up/W/Space jumps, down/S dodge rolls, E throws a grenade, P/Escape pauses. Mouse wheel or 1/2 swaps weapon slots; touch players tap the separate weapon rectangles. Crates choose a new weapon and then its destination slot. Guns raise and fire automatically when a target enters range, then lower between bursts. Touch supports swipes, tap to jump, and five action buttons.

| Loadout | Range | Pattern |
| --- | --- | --- |
| Rust Carbine | 145 m | Rapid fire in one lane |
| Sawed-off | 34 m | Your lane and neighbors (up to three), two targets per lane, stronger close up |
| Iron Six | 90 m | Two-target piercing in one lane |

Twenty-eight draftable upgrades plus a repeatable recovery option for exhausted builds change combat, survival and equipment, with eligibility and stack limits. Each run starts with one reroll and two grenades. There is no extraction or finish line. District themes repeat every six districts while combat continues to scale. Kills grant XP: walkers 5, runners 7, brutes 15 (exactly half the previous XP). Fill the blood bar to level up and choose one of three cards. The first upgrade needs 60 XP, and each subsequent level costs 35 more. Overflow XP is preserved, including multiple levels from a grenade. Travel and pickups grant no XP. Districts still change every 450 meters but no longer grant free cards. Staying underleveled increases late-district horde pressure, so avoiding every fight eventually becomes unsustainable. Personal distance/kill records and audio preferences stay on this device. Builds and equipment reset each run. Switching away pauses play; audio starts after interaction. Reduced-motion settings suppress shake, dust and decorative sway.

## Hordes and roofs

The road streams indefinitely with bounded entity, convoy, exit-buffer and kill-lane windows. A seeded kill lane changes every 210 meters, while every lane still gets zombies. Starting zombie health, contact damage, pack density, runner speed and horde pursuit pressure are all 25% higher than the endless v5 baseline. Packs average 3.75 initially and grow to 10 infected per row, with 3.75 extra during 15-second surges every minute starting at 0:45. Fractional packs accumulate across rows. Rows tighten from about 28 to 12 meters. Runners and brutes become more frequent; gold-marked elites begin after 100 seconds. Elite kills give double XP. Health and damage continue growing quadratically with survival time, so powerful builds eventually lose. Speed starts at 27 m/s, reaches about 37.0 at one minute and 41.3 at five minutes, then grows slowly. Draft and pause time do not affect difficulty or power-up duration.

Six-vehicle rooftop routes keep generating on seeded outer lanes. Entry and exit ramps, rooftop hazards, solid vehicle bodies, and clear 65-meter exit buffers work throughout the endless run. Kills, supplies and grenades relieve horde pressure. Every fifth supply restores a grenade.

## Random gear

| Pickup | Base duration | Effect |
| --- | --- | --- |
| Minigun | 10 seconds | Sweeps all four lanes at 190 m range with deep piercing and rapid heavy fire; original weapon returns afterward. |
| Stim | 15 seconds | Exactly +50% bullet, grenade and burn damage; repeat pickups refresh duration without multiplying the bonus again. |
| Spikeboard | 8 seconds | Ride 35% faster behind a front-held spiked shield, block damage, crush infected and smash obstacles and vehicle bodies ahead. Roofs currently supporting the rider remain intact. |

Random gear appears approximately every 330–600 meters after the first drop; drops avoid vehicle bodies and nearby enemies/obstacles. Gear is collected from the road; the Test Gear menu has been removed. Effects can coexist, and refresh pickups reset that effect's timer. Overcharge extends all durations.

## Safehouse skill tree

Open **Skill Tree** from the title or death screen. Nine permanent upgrades branch into Survival (health, armor, district healing), Firepower (damage, fire rate, critical chance), and Scavenging (scrap yield, power duration, starting equipment). Child nodes require two ranks in their parent. Costs grow per rank; all ranks have caps. Changes apply to new runs.

Normal runs bank scrap on death or when leaving/restarting via the pause menu: floor(distance / 100) + floor(kills / 4) + 2 × floor(survival seconds / 30), multiplied by Scrap Hunter. Each run banks once. Records, audio preferences, scrap and ranks share the existing localStorage key, preserving previous records. No account or server is needed; saves belong to this browser/device. Storage failure shows an explicit message. Zero-time restarts and practice runs award no scrap.

## Generated art

All raster art uses the built-in image generation tool. Prompts, references and original source images are preserved:

- [Weapon crate and builds pack](BUILD-UPDATE.md): five new weapon atlases, sword cut and crate sprite.
- [Original pack](assets/ART-PROMPTS.md): city, survivor and infected.
- [Matching pack](assets/v2/ART-DIRECTION.md): facades, surfaces, props, weapons, cards, UI, controls, effects and logo.
- [Combat and convoy pack](assets/v3/ART-DIRECTION.md): 30 survivor animation frames, six vehicle textures, ramp, spikes, barrels and three sparse road decals.
- [Animation pass](assets/v6/ART-PROMPTS.md): 144 aligned frames for survivor locomotion, jumps, forward-held gear and eight-frame infected loops.
- [Endless gear pack](assets/v5/ART-PROMPTS.md): three pickups plus equipped minigun and skateboard survivor sprites.
- [Dodge roll and blood pack](assets/v4/ART-DIRECTION.md): eight somersault frames, four blood explosion frames, puddles, splatters, XP blood fill and droplets.

The weapon and hands are integrated into the survivor's poses. An eight-phase symmetric leg cycle continues through running and aiming, with weapon-specific upper bodies and a slight recoil. Jump animation follows takeoff, ascent, tuck, apex, descent, extension and planted landing before running resumes. The minigun points forward; the shield is held ahead of the rider. Walkers, runners and brutes each have eight-frame loops with different cadences and phase offsets. Stim emits a green silhouette glow. Shield impacts scatter textured fragments and dust. Dodge rolling uses eight generated somersault poses. Kills create animated blood bursts, airborne droplets and ground stains. Blood particles fly toward the XP bar. Shared head/foot alignment keeps the character stable. Side-view inventory weapons remain in menus and HUD.

Ruined buildings are closed textured volumes with camera-plane clipping. Vehicle walls, rear doors, roofs and sloping ramps are depth-sorted with their occupants. Asphalt is a quiet continuous surface with sparse cracks, oil, glass and debris, without repeated square tiles.

The manifest preloads 309 runtime images. Source PNGs are retained separately. The `prepare-*.cjs` scripts are optional Sharp authoring helpers; `DEAD_RUN_SHARP` overrides the module path. Live labels stay accessible HTML over generated skins. Audio is synthesized locally.

## Verification

Run `node --test dead-run/model.test.mjs dead-run/geometry.test.mjs dead-run/endless.test.mjs dead-run/animation.test.mjs dead-run/builds.test.mjs dead-run/slots.test.mjs`. Seventy-five checks cover controls, collision geometry, roof routes, frame-rate consistency, XP overflow, endless generation, power-up effects and expiration, skill prerequisites/costs/caps, profile validation, scrap rewards and a 20-minute simulated run with bounded world state.

Browser QA checked desktop and phone layouts, weapon slots, natural crates, keyboard/wheel/touch switching, preservation of cards, equipment artwork, kill-earned drafts, pause and return to play. The previous v4 screenshots remain in `Playground/output/dead-run/v4/`; v6 QA artifacts live in `Playground/deadrun-qa/v6/`. The isolated `animation-preview.html` page supports frame stepping, jumps, equipment changes, stim and shield impacts without touching saved progress.

## Files

- `model.mjs`: deterministic simulation, terrain, combat and crate state.
- `cards.mjs`, `arsenal.mjs`: build cards, eight weapons and stat-preserving replacement.
- `game.mjs`: input, audio, UI, record and progression persistence.
- `endless.mjs`: difficulty curve and pickup definitions.
- `progression.mjs`, `skill-tree.mjs`: persistent economy, upgrades and tree UI.
- `animation.mjs`: stride/jump selection, infected cadence and debris parameters.
- `renderer.mjs`, `geometry.mjs`: textured scenery, vehicles, sprites and effects.
- `visuals.mjs`: runtime asset manifest.
- `index.html`, `style.css`, `art-v2.css`, `blood-v4.css`, `endless-v5.css`: responsive menus, map selector, XP bar and UI skins.
- `model.test.mjs`, `geometry.test.mjs`, `endless.test.mjs`, `animation.test.mjs`: regression checks.

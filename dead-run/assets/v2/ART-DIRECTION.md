# Dead Run — matching art pack

Generated with the built-in imagegen tool on 2026-09-26. This pack expands the original characters and city art with 67 game-ready assets from nine source sheets. Full source PNGs and prepared PNGs are saved together in this directory. `prepare-art-v2.cjs` crops the sheets, preserves whole silhouettes and panel corners, downsamples with nearest-neighbor filtering, and keeps pixel alpha edges crisp.

## Shared palette and treatment

Charcoal outlines, military olive, soot gray, dirty bone, oxidized rust orange, and faded ochre. Weathered metal, damaged masonry, visible pixel clusters, subdued material contrast, and matching highlights throughout the interface and world. UI labels and changing numbers remain actual accessible text over the generated skins.

## Inventory

- Four building facade textures: apartments, factory, hospital, and shop.
- Four surface textures: asphalt, sidewalk, roof, and wall.
- Six props: wrecked car, concrete barrier, overhead wire gate, medical supply crate, lamp, and burning barrel.
- Six equipment sprites: carbine, shotgun, revolver, grenade, ammunition, and holster.
- Sixteen upgrade illustrations: all fifteen selectable cards plus skull artwork.
- Six resizable UI frames: dialog, common/rare/epic cards, button, and HUD.
- Sixteen control icons, eight effect/shadow sprites, and the title logo.

## Prompts

### facades

Saved source: `facades-source.png`. Transparent request: false.

Production game asset for DEAD RUN. Cohesive gritty SNES 16-bit pixel art: charcoal outlines, desaturated military olive, soot gray, warm dirty bone highlights, oxidized rust orange, small faded ochre details. Sharp deliberate large pixel clusters, no smooth painting, no vector, no photorealism, no neon. Weathered survival horror craft. Opaque texture atlas, square 1536x1536 image split into an exact 2 by 2 grid of four square front-elevation building facade textures, each filling its entire equal cell edge to edge. NOT isometric: perfectly flat architectural elevation viewed straight-on, no perspective, no sky or ground, no margins or borders between tiles. Top-left derelict five-floor brick apartment with broken windows, boarded shop entrance, exposed pale brick, metal fire escape. Top-right abandoned industrial factory, corrugated siding and dirty concrete, broken multi-pane windows, rust pipes, loading door. Bottom-left rundown stone hospital front with three floors of shattered windows and dirty red medical cross above boarded entrance. Bottom-right decayed three-floor corner shop facade, dirty plaster, rust shutters, faded blank ochre awning, torn posters. All textures have dark opaque unlit rooms behind windows, no transparent voids. Varied convincing masonry, pipes and cracks. No legible text.

### surfaces

Saved source: `surfaces-source.png`. Transparent request: false.

Production game asset for DEAD RUN. Cohesive gritty SNES 16-bit pixel art: charcoal outlines, desaturated military olive, soot gray, warm dirty bone highlights, oxidized rust orange, small faded ochre details. Sharp deliberate large pixel clusters, no smooth painting, no vector, no photorealism, no neon. Weathered survival horror craft. Opaque seamless game material atlas, square 1536x1536, exact 2 by 2 equal square tiles each filling whole cell to edge, orthographic top-down, no perspective, borders, margins or text. Top-left dark cracked asphalt with subtle aggregate, oil and scattered tiny pale gravel; no lane markings. Top-right broken concrete sidewalk slabs with moss and rubble, coherent large square pavers. Bottom-left dirty flat tar rooftop with gravel patches and rusty seams, no raised objects. Bottom-right weathered opaque concrete brick side wall texture with rust stain streaks, vertical cracks, subtle faded brick mortar. Flat evenly lit, must work as repeating materials on 3D planes, directional shading minimal. Keep contrast subdued to ensure game characters remain readable.

### props

Saved source: `props-source.png`. Transparent request: true.

Production game asset for DEAD RUN. Cohesive gritty SNES 16-bit pixel art: charcoal outlines, desaturated military olive, soot gray, warm dirty bone highlights, oxidized rust orange, small faded ochre details. Sharp deliberate large pixel clusters, no smooth painting, no vector, no photorealism, no neon. Weathered survival horror craft. A strictly aligned 3-column by 2-row sprite sheet with equal rectangular cells. One isolated complete asset per cell, centered with generous transparent padding. Actual transparent alpha background. No grids, labels, words, UI mockup or scenery. Read left-to-right then top-to-bottom. Landscape 1536x1024. Cell 1: rusty derelict compact sedan front view slightly from above, shattered windshield, dented hood, flat tires. Cell 2: waist-high broken concrete road barrier front view, worn diagonal ochre warning paint, chunky base. Cell 3: OVERHEAD barbed-wire checkpoint gate front view, two sturdy rust metal upright posts and top horizontal beam carrying three sagging strands of barbed wire across top quarter, wide CLEAR EMPTY OPENING under the wire for a sliding person, no bottom beam, no wall or fence filling the opening. Cell 4: olive military medical supply crate, pale bone cross on front, small red bandage roll and amber supplies, three-quarter front view. Cell 5: entire tall bent abandoned street lamp, dim amber glass light on a short bent arm, rust column, small concrete foot. Cell 6: dented rusty steel barrel burning with chunky orange yellow pixel flames and small smoke wisps. Camera compatible with rear-view perspective arcade runner, strong readable silhouettes.

### weapons

Saved source: `weapons-source.png`. Transparent request: true.

Production game asset for DEAD RUN. Cohesive gritty SNES 16-bit pixel art: charcoal outlines, desaturated military olive, soot gray, warm dirty bone highlights, oxidized rust orange, small faded ochre details. Sharp deliberate large pixel clusters, no smooth painting, no vector, no photorealism, no neon. Weathered survival horror craft. A strictly aligned 3-column by 2-row sprite sheet with equal rectangular cells. One isolated complete asset per cell, centered with generous transparent padding. Actual transparent alpha background. No grids, labels, words, UI mockup or scenery. Read left-to-right then top-to-bottom. Landscape 1536x1024. Cell 1 compact battered CARBINE rifle pointing RIGHT, side view, wooden stock, olive fabric wrap, short gray barrel, readable distinct silhouette. Cell 2 short SAWED-OFF double barrel shotgun pointing RIGHT, side view, rust wood grip, twin barrels. Cell 3 heavy six-cylinder REVOLVER pointing RIGHT, side view, worn silver cylinder, dark rust wooden grip, long barrel. Cell 4 oval olive frag grenade with chunky metal pin. Cell 5 little cluster of three tarnished golden rifle cartridges. Cell 6 compact rugged weapon holster and brown leather belt. Fictional game equipment, not diagrams. Consistent pixel scale and lighting, clean alpha.

### upgrades

Saved source: `upgrades-source.png`. Transparent request: true.

Production game asset for DEAD RUN. Cohesive gritty SNES 16-bit pixel art: charcoal outlines, desaturated military olive, soot gray, warm dirty bone highlights, oxidized rust orange, small faded ochre details. Sharp deliberate large pixel clusters, no smooth painting, no vector, no photorealism, no neon. Weathered survival horror craft. A strictly aligned 4-column by 4-row sprite sheet with equal rectangular cells. One isolated complete asset per cell, centered with generous transparent padding. Actual transparent alpha background. No grids, labels, words, UI mockup or scenery. Read left-to-right then top-to-bottom. Square 1536x1536. Exactly SIXTEEN unique small item icons for roguelike upgrade cards, roughly 48x48 pixel-level detail scaled up. Row 1: [1] single heavy brass bullet on tattered red patch, [2] mechanical trigger with coiled spring, [3] piercing bullet through two dented steel plates, [4] three bullets fanning outward. Row 2: [5] worn brass rifle scope with tiny crosshair glass, [6] flaming rifle cartridge, [7] stitched green anatomical heart patch, [8] patched improvised steel torso armor. Row 3: [9] bloodstained white bandage roll with small medical shears, [10] small dark red blood flask with bone stopper, [11] worn running boots with cloth wrap, [12] two olive frag grenades. Row 4: [13] battered scavenger satchel with supplies sticking out, [14] tin of emergency rations and can opener, [15] two ivory dice with black pips, [16] ominous weathered zombie skull with green patina. Each isolated artifact large and recognizable, no frames, no lettering, no background.

### panels

Saved source: `panels-source.png`. Transparent request: true.

Production game asset for DEAD RUN. Cohesive gritty SNES 16-bit pixel art: charcoal outlines, desaturated military olive, soot gray, warm dirty bone highlights, oxidized rust orange, small faded ochre details. Sharp deliberate large pixel clusters, no smooth painting, no vector, no photorealism, no neon. Weathered survival horror craft. A strictly aligned 3-column by 2-row sprite sheet with equal rectangular cells. One isolated complete asset per cell, centered with generous transparent padding. Actual transparent alpha background. No grids, labels, words, UI mockup or scenery. Read left-to-right then top-to-bottom. Landscape 1536x1024. Six empty resizable UI skin assets, all orthographic flat front-facing, symmetric rectangular straight borders that can be nine-sliced. All interiors DARK nearly black military green (#182018) with very subtle restrained texture; bright enough border distinction. Row 1 cell1: wide 4:3 modal panel of battered olive sheet metal, riveted corners, thin rust edge, generous plain dark center. Row1 cell2: tall portrait 3:4 COMMON upgrade card frame, battered olive metal, thin faded green trim, plain dark blank center. Row1 cell3: tall portrait 3:4 RARE upgrade card frame, same family with tarnished gray-green steel trim, plain dark blank center. Row2 cell1: tall portrait 3:4 EPIC upgrade card frame, same family with oxidized bronze trim, plain dark blank center. Row2 cell2: wide 3:1 button plate, rusty ochre painted metal with chipped outer edge and dark rust interior, no text, clean blank center. Row2 cell3: wide 3:1 HUD readout panel, dark olive metal with thin dirty bone rim and little corner bolts, clean blank center. NO pictograms, decorative inset windows, lettering or multiple compartments; these are blank backgrounds for functional HTML labels. Transparent outside outer silhouettes, opaque dark interiors.

### controls

Saved source: `controls-source.png`. Transparent request: true.

Production game asset for DEAD RUN. Cohesive gritty SNES 16-bit pixel art: charcoal outlines, desaturated military olive, soot gray, warm dirty bone highlights, oxidized rust orange, small faded ochre details. Sharp deliberate large pixel clusters, no smooth painting, no vector, no photorealism, no neon. Weathered survival horror craft. A strictly aligned 4-column by 4-row sprite sheet with equal rectangular cells. One isolated complete asset per cell, centered with generous transparent padding. Actual transparent alpha background. No grids, labels, words, UI mockup or scenery. Read left-to-right then top-to-bottom. Square 1536x1536. Exactly SIXTEEN consistent UI control glyphs, sculpted from chipped dirty-bone painted steel with thin charcoal outlines, small rust spots, simple highly readable 24x24 pixel level detail. NO enclosing button tiles. Row1: arrow LEFT, arrow RIGHT, arrow UP, arrow DOWN. Row2: PAUSE symbol two vertical bars, PLAY triangle pointing right, FULLSCREEN four outward corner brackets, loudspeaker with two sound waves. Row3: muted loudspeaker crossed out, medical PLUS cross, frag GRENADE silhouette, two curved arrows in a circle for REROLL. Row4: HOME hut silhouette, EXIT open door with outward arrow, CHECKMARK tick, small SKULL face icon. No text. Each symbol is a single isolated sprite.

### effects

Saved source: `effects-source.png`. Transparent request: true.

Production game asset for DEAD RUN. Cohesive gritty SNES 16-bit pixel art: charcoal outlines, desaturated military olive, soot gray, warm dirty bone highlights, oxidized rust orange, small faded ochre details. Sharp deliberate large pixel clusters, no smooth painting, no vector, no photorealism, no neon. Weathered survival horror craft. A strictly aligned 4-column by 2-row sprite sheet with equal rectangular cells. One isolated complete asset per cell, centered with generous transparent padding. Actual transparent alpha background. No grids, labels, words, UI mockup or scenery. Read left-to-right then top-to-bottom. Landscape 1536x1024. Exactly eight game VFX sprites, transparent. First row: horizontal bright gold bullet streak pointing right with small white tip and tapered rust trail; sharp golden muzzle flash starburst; initial round small orange-yellow grenade explosion with dark rust chunks; larger fiery orange explosion with smoke on edges. Second row: vertical barrel fire flames; gray-green curling puff of smoke and dust; small dark burgundy stylized zombie-hit impact splatter; flat dark nearly black oval ground shadow soft through pixel dithering, wide and short. Pixel-art effects, hard-edged chunky clusters, no large smooth blur, no gore anatomy, consistent retro game palette.

### logo

Saved source: `logo-source.png`. Transparent request: true.

Production game asset for DEAD RUN. Cohesive gritty SNES 16-bit pixel art: charcoal outlines, desaturated military olive, soot gray, warm dirty bone highlights, oxidized rust orange, small faded ochre details. Sharp deliberate large pixel clusters, no smooth painting, no vector, no photorealism, no neon. Weathered survival horror craft. Transparent standalone game title logo. Exact readable words in TWO stacked lines: first line DEAD, second line RUN. Huge condensed blocky pixel-stencil uppercase letters made from chipped bone-colored paint for DEAD and rust-orange paint for RUN, subtle dark olive extruded shadow and damaged edges, angular pixel stair steps, no smooth vector edges. Tight cohesive compact typography, gritty survival game title, tiny bolts and scratches allowed inside letters. No tagline, frame, scene, other words or symbols. 1536x1024 landscape with generous transparent padding around complete two-line logo.

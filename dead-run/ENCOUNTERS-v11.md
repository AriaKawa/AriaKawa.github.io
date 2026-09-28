# Dead City encounter update

Generated using the built-in image generation tool. All source atlases and runtime frames are saved under `assets/v11/`. Each zombie and bucket animation has eight frames (`v11-<family>-0.png` through `-7.png`). `prepare-art-v11.cjs` crops and aligns the generated alpha sprites and extracts the container textures; it preserves the source atlases.

Brute limb animation reuses the existing generated brute frames. Matching polygon masks remove hands and arms from each walking pose and supply the detached pieces; pieces tumble and fall with gravity. No extra painting replaces the original brute.

Hordes retain existing enemies and start 18 m beyond the farthest living enemy (at least 55 m ahead). Density bias is invisible. Containers occupy a single lane for 80–115 m between bus routes, with no ramps; normal jump height is below the 2.8 m roof and Air Attunement clears it. Crawlers have a 0.4 m jump-clearance threshold, 1.2 m/s approach and no elite variant. The two new walker appearances share basic walker combat stats.

## Validation

94 model/geometry/animation tests pass, including long-run bounds, horde retention, standard/high jump collision, low-shot occlusion, shield interactions, crawler health and speed, and single-emission limb thresholds. Five rendered scenarios checked on desktop and phone: variety, buckets, missing limbs, containers, and preserved horde front waves. 345 runtime assets loaded without errors.

## Prompt set

### Bucket helmets

First runtime asset: `assets/v11/v11-bucket-0.png`.

Use case: stylized-concept. Asset type: transparent game sprite animation sheet for Dead Run. Exactly EIGHT rusty galvanized metal BUCKET helmet sprites in a perfectly spaced 4 columns by 2 rows grid. 1536x1024 sheet, each cell 384x512. Single inverted metal bucket in every cell, closed base at TOP and open rim at BOTTOM, as worn upside down over a zombie head. Front view with slightly visible right side, dented steel, rolled rim, side handle and rust patches, dirty grey with muted olive shadows and amber highlights. Cohesive gritty 16-bit pixel-art, crisp edges, deliberate pixel clusters. Eight gentle wobble cycle frames: upright, tilt -4 degrees, -7, -4, upright, +4, +7, +4. Same scale and center in all cells; generous transparent gutters, no overlap, no head or person, no ground shadows, no background, no text, no grid lines. True transparent alpha.

### Crawler

First runtime asset: `assets/v11/v11-crawler-0.png`.

Use case: stylized-concept. Asset type: game character sprite sheet. Generate exactly EIGHT frames of one weak slow CRAWLER zombie pulling itself forward on hands and knees, facing directly toward camera, in a perfectly spaced 4 columns x 2 rows grid, 1536x1024. Each cell 384x512 with character centered and bottom aligned, generous empty gutters. Gritty detailed 16-bit pixel art in muted olive, bone, brown and rust. Thin decayed adult zombie, ragged grey shirt and brown pants, hunched almost flat to ground, head raised facing viewer, both legs trailing behind. This is a LOW silhouette enemy, not standing or crouching upright. One coherent eight-frame crawling loop: alternate left hand reaching forward, planted pull, body gliding, right hand reaching, planted pull, body gliding and return; clear different arm positions per frame, same character and scale. Front-facing perspective for a pseudo-3D zombie runner. All eight whole figures contained within their own cells. Transparent background with true alpha, no glow, no ground shadow, no floor, no text, no borders, no grid lines. Keep anatomy readable at 96 pixel sprite size.

### Female walker

First runtime asset: `assets/v11/v11-woman-0.png`.

Use case: stylized-concept. Asset type: transparent enemy sprite animation sheet for gritty 16-bit zombie runner. Exactly EIGHT full-body sprites of the SAME adult FEMALE zombie walking toward camera, 4 columns x 2 rows evenly spaced grid, 1536x1024 landscape sheet, each cell 384x512. Pale olive grey decayed skin, tangled shoulder-length dark hair, torn faded maroon jacket over dirty tan shirt, worn dark trousers and scuffed boots. Strong readable silhouette, ordinary adult woman zombie, fully clothed. Gritty pixel art with restrained olive brown rust palette, crisp dark outlines and detailed pixel clusters matching classic survival horror sprites. Front-facing eight-frame WALK cycle: left foot forward contact, down, passing, up, right foot forward contact, down, passing, up. Feet and arms visibly alternate through the cycle, subtle head and shoulder bob; consistent face/outfit/scale throughout. Each whole character centered in its cell with generous clear space all around, aligned foot baseline. Transparent true alpha background, NO ground, NO shadow, NO glow, NO text or numbering, NO grid lines. Not a pose collection: consecutive looping walk animation.

### Second basic walker

First runtime asset: `assets/v11/v11-walker2-0.png`.

Use case: stylized-concept. Asset type: enemy sprite animation sheet. Input image is style and anatomy reference for original basic zombie; create a SECOND VARIANT, not identical. Exactly EIGHT full-body frames of one gaunt adult male zombie, front-facing, walking toward camera in perfect 4 columns x 2 rows grid, 1536x1024 sheet, each cell 384x512. Preserve gritty 16-bit survival horror pixel art matching reference. Variant has receding ragged hair, skeletal olive skin, torn faded blue-grey work shirt with one ripped sleeve, dirty brown pants, worn boots. Lean proportions like original, different face and clothing silhouette. Eight sequential walk-loop poses: left foot contact, down, passing, up, right foot contact, down, passing, up. Clear alternating arms and legs. Same character and scale across all eight frames, foot baseline aligned, generous transparent gutters, entire figure fits each cell. True transparent alpha background. No floor, shadows, glow, text, numbers, logos or grid lines.

### Container textures

First runtime asset: `assets/v11/blockade-side.png`.

Use case: stylized-concept. Asset type: single texture atlas for a long rusty shipping container road blockage in a gritty 16-bit zombie game. OPAQUE 1536x1024 landscape image divided into exactly THREE equally wide vertical panels, each 512x1024, edge-to-edge no gaps no borders. LEFT panel: flat straight-on container corrugated SIDE wall texture, rusty faded red oxide steel with vertical ribs, dents and grime, yellow black hazard strip along lower edge. MIDDLE panel: flat straight-on double container END doors, hinges, vertical locking bars, yellow black hazard strip lower edge, no writing. RIGHT panel: flat top-down container ROOF texture, rusty corrugated steel with long ribs and weathering. All panels flat orthographic texture surfaces, no perspective, no surrounding scene, no wheels, no text, no symbols or labels, no shading cast outside surfaces. Fine gritty pixel art, consistent light from upper left, muted dark rust and olive palette, sharply defined pixels. These textures will be mapped onto a 3D box.

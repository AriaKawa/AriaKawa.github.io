# Dead City background refresh

Generated with the built-in image generation tool. Production WebP assets:
- `assets/v10/horizon.webp` — gameplay horizon and map preview.
- `assets/v10/home.webp` — home screen wallpaper.

The horizon is aligned with the road's vanishing point, with modest lane parallax and slow distance-based drift. Reduced motion disables the ambient drift. Existing moving street geometry remains responsible for nearby city motion.

## Horizon prompt
Use case: stylized-concept. Asset type: wide 16-bit pixel-art distant horizon backdrop for Dead Run, a gritty zombie runner. Create a broad open atmospheric horizon, 1536x1024 landscape. Dusty olive charcoal and muted amber palette, large layered overcast sky above distant low ruined industrial silhouettes and hills across the entire width. Horizon at 68% down image, lower third flat dark olive haze. All buildings tiny and far away, no close city buildings, no street, no road, no foreground objects, no people, no text. Restrained pixel clusters, detailed atmospheric pixel art, ominous dawn amber light breaking along horizon. Broad spacious view that can sit behind separately rendered moving buildings and road. Left and right edges similar haze for unobtrusive cropping.

## Home prompt
Use case: stylized-concept. Asset type: home screen wallpaper for Dead Run, gritty 16-bit zombie survival runner. Landscape 1536x1024 cinematic detailed pixel art, with chunky deliberate pixel clusters. View from an abandoned elevated highway overlooking a sprawling ruined city at amber dusk beneath charcoal olive storm clouds. Foreground on RIGHT third: lone survivor seen from behind wearing dark jacket, small backpack, holding a lowered carbine, looking toward the enormous distant city; broken concrete guardrail, a few weeds, abandoned wreck farther right, tiny distant zombie silhouettes on the roadway. Main visual storytelling on right 60%; left 40% dark quiet negative space for existing menu overlay. Expansive depth and open sky, strong readable silhouettes, atmospheric layers, muted olive green and charcoal with rusty amber light. Beautiful evocative game key art, restrained detail. No lettering, no title, no logos, no UI, no borders, no photorealism.

## Validation
Desktop (1440×1000) and mobile (390×844) title and running screens inspected; both loaded the replacement art and started runs without browser errors. Four geometry regression tests passed.

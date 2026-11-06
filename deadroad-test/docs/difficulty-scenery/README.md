# Difficulty scenery assets

Generated with the built-in imagegen tool on 2026-09-08. Three transparent 2x2 atlases, twelve sprites total.

- client/public/assets/generated/scenery-autumn-v1.png: golden larch, orange maple, russet oak, amber bush.
- client/public/assets/generated/scenery-dead-v1.png: charred pine, bare oak, broken snag, burnt scrub.
- client/public/assets/generated/scenery-details-v1.png: wildflowers, autumn leaf litter, scorched fissures, fire and smoke.

Prompt set: production transparent square game sprite atlases, exactly two columns and two rows, detailed painterly realistic survival strategy style, consistent upper-left lighting, whole isolated sprites, no text or grid lines. Autumn: golden tall larch, broad orange maple, sparse russet oak, compact amber bush; warm gold/orange/rust leaves, weathered bark. Dead: tall charred pine, twisted leafless oak, broken snag, burnt twig scrub; ash gray/charcoal, no green or leaves. Ground details: white daisies/yellow/violet wildflowers and grass; orange/gold/red fallen leaf litter; dirty scorched cracked mud and ember fissures; small smoldering fissure with orange fire and gray smoke. Organic transparent edges and cell padding.

Difficulty follows the same geographic threatAt function and live war-sector pressure as the terrain tint: below 3.3 green, 3.3 to below 6.5 autumn, 6.5 and above dead. Props retain deterministic world locations and existing collision bodies. Decals reuse road-cleared vegetation footprints. Visible scenery updates when camera cells or pressure change, is hidden at overview zoom, and is destroyed when leaving the view. Fire alpha flickers without particle emitters.

Validation: production build, scenery collision/path regression suite, browser checks in Illinois (green), Arizona (autumn), Missouri (dead), all three atlases and ground decals rendered, no browser errors. Screenshots in artifacts/scenery-{green,autumn,dead}.png.

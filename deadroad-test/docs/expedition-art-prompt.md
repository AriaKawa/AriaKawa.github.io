# Scenery atlas prompt

Built-in imagegen, one request, no retries. Output: `client/public/assets/expedition-atlas.png`.

Use case: stylized-concept. Production sprite atlas for Deadroad, a post-apocalyptic top-down convoy survival game. Create one 1024x1024 PNG with genuinely transparent alpha, precisely 4 columns by 4 rows of equal cells. No visible grid lines. Center one fully isolated object or specified cluster in each cell, all silhouettes contained within their cell with generous transparent margins.

Row 1: mature evergreen tree; broadleaf tree; dead tree; clustered grey boulders.
Row 2: small abandoned gas station; rusted warehouse; radio communications mast with base; survivor camp tents.
Row 3: wrecked sedan; rusty shipping container; fuel barrel cluster; supply crate cluster.
Row 4: small derelict house; military checkpoint barricade; radar bunker; pine bush cluster.

Detailed pixel-art, realistic gritty survival-game scenery. Crisp pixels, readable silhouettes, dark evergreen and rust palette with restrained golden-hour highlights. Consistent near-top-down camera with a small visible south face, no horizon or scene background. Independently reusable sprites. Transparent gaps and margins. No text, labels, numbers, cell lines, border, watermark, ground tile, checkerboard drawing, characters, or extra objects. Exact 16 objects in the specified order.

Actual output is 1254×1254 with transparent alpha, in a slightly more isometric perspective. The game uses runtime frames and does not modify the generated bitmap.

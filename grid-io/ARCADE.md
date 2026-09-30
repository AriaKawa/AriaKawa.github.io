# Arcade mode

Choose **Arcade** in the original Grid.io menu. The camera stays north-up and
orthographic. Classic keeps its existing simulation and renderer; Arcade has
separate high scores for 90° and 360° steering.

- Cyan and amber roads climb to two highway levels. Enter at the marked ends.
- Dashed violet minimap routes descend into two underground passages. A local
  roof cutaway keeps the bike and nearby hazards visible from above.
- The magenta loop is in the southeast. Enter either end; its magnetic track
  guides the inversion, and left/right steering changes lane. The deck becomes
  translucent during inversion so it cannot hide the rider.
- Hold Ctrl (or the Wheelie touch button) to brake over two seconds. A/D or
  left/right pivots around the rear tire. After one second stopped, the front
  wheel drops and the bike accelerates. Release Ctrl to rearm. The existing
  laser trail holds its position and length during the maneuver.

`arcade/` carries the terrain, bike assets, optimized rendering, AI, pickups,
and physics ported from the third-person game at commit `2eb4a44`. It is a
self-contained ruleset: subsequent changes to the third-person game's driving
or trail behavior do not silently change Arcade. Three.js, customization, and
the original simulation's utility functions remain shared. `arcade-renderer.js`
adds the top-down camera, mouse aiming, and overhead visibility treatment.
The engine loads only after Arcade is selected; the active renderer alone draws.

Validation:

```powershell
node --test grid-io/tests/*.test.mjs
$env:PLAYWRIGHT_PATH = 'path/to/playwright'
$env:GRID_BASE_URL = 'http://127.0.0.1:5276'
node grid-io/tests/browser-arcade.cjs
```

The browser test covers Classic/Arcade switching, separate scores, both steering
modes, wheelie timing and trail retention, complete routes in both directions,
actual rendered visibility under roofs, loop inversion, and independent touch
controls in portrait and landscape. Screenshots go to the system temp directory.

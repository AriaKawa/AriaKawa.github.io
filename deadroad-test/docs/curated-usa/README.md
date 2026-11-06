# Curated USA Road Layer v1

Planet 3 now starts with 18 editable, hand-authored spline roads: 14 highway
corridors and four thinner major connectors (I-44, I-64, I-81, I-85).
278 static control points describe a connected simplified USA backbone.
I-90 has western and eastern sections; Chicago–Cleveland shares I-80 pavement.
Metro areas are shared anchors, without local streets or interchange webs.

The existing textured road/network renderer is unchanged. Planet 1 reference
roads default off in Planet 3, and hidden reference roads are excluded from
snapping. Terrain and state borders remain visible. No spawn/operation markers
were added. Planet 1/2 road data, scenes, simulation, and shared renderer sources
were not modified. The previous production entry bundle was index-C8sgNZYt.js;
this release uses index-dqAgBdt7.js and the same CSS, Phaser, and public assets.

## Editor behavior

Click roads to select names/classes; drag their points to edit. Save Local and
Load Local use the existing isolated Planet 3 storage key. Startup shows the
curated draft, leaving browser saves intact until Save Local is pressed.
Load Curated USA Road Layer restores the authored draft and can be undone.
Existing JSON import/export format v2 remains supported. The accompanying
curated-usa-v1.json is directly importable.

## Source integration

The source files in this directory correspond to:

- client/src/game/roadEditor/CuratedUSARoadLayer.ts (new static data)
- client/src/game/roadEditor/RoadEditorController.ts (default and reset action)
- client/index.html (index.source.html here; editor labels/button)
- scripts/validate-curated-usa.ts (new regression check)

Run the new check with `npx tsx scripts/validate-curated-usa.ts` in the source
project. Its export output goes to docs/curated-usa/curated-usa-v1.json.

## Validation — 2026-09-05

- Typecheck and production build passed (existing bundle-size/vendor warnings).
- Curated check passed: 18 roads; all sampled splines on rendered land; entire
  sampled graph connected; independent editable clones; lossless JSON round trip.
- One metro junction each: St. Louis 6 arms, Kansas City 4, Chicago 4, LA 3,
  Atlanta 3, New York 3. No extra junction within 250 world units of those anchors.
- Existing road editor, road network, California, and Planet 2 checks passed.
- Browser verified Planet 1 globe, Planet 3 full-USA view, St. Louis, Kansas City
  including close textured pavement, eastern corridors, sparse mountain routes,
  road selection, moving a control point, JSON export, and local save/load of
  that edit. No browser console errors observed.
- Existing validate:free-selection has two source-text assertion failures:
  “Valid land clicks do not directly enter the tactical sector” and
  “Free selection is not restricted to the authored highway backbone”. The four
  source files read by that check are byte-for-byte unchanged by this release.
  This unrelated baseline issue was preserved to keep Planet 1 untouched.

# Map Workshop

Open **Map Workshop** below Wardrobe and Leaderboards. The three buttons use matching frames and equal spacing. The editor uses the original theme art, a draggable parts tray, floating tools, and a large playfield. All instructions and keyboard controls are behind **?**.

## Build and test

- **Select map** opens six illustrated original maps, saved maps, and an empty-course option. Switching maps saves the current draft to My maps first.
- Drag a textured part from the tray into the world. Clicking a tray item alone places nothing.
- Drag existing objects to move them. Drag a box on empty space to select a group; Shift adds to selection. Groups move together.
- Drag the square corner to resize. Drag the curved arrow beyond it to rotate; Shift snaps to 15 degrees. **Object properties** includes the exact angle. Rotation is saved with the map and supports Undo/Redo.
- **Eraser** deletes a clicked object or all objects fully enclosed by a dragged rectangle. One Undo restores the whole operation. An entire course can be cleared.
- **Start** selects and highlights a platform; click or drag the start marker to choose the group center. Players are spread along its actual surface, and the start follows platform movement, resizing, and rotation. Drag **Finish** to place or move the goal.
- **Play** starts normal game physics; **Edit** returns to the editing view. A selected platform's Play icon tests from that ledge.
- **Fly** enables invulnerable flight and click-to-teleport. **Set point** records a retry; **Retry** restores it, including moving-platform timing and crumble state. F, C, and R are the corresponding keys.
- **View options** holds optional grid, collision outlines, snapping, and playtest hazards. Grid and outlines start off. **Map overview** navigates the whole course.

Mouse and keyboard are the primary interface. Theme scenery is decorative; individual jungle vines and forge lava pools are not placeable parts.

## Open boundaries and AI testers

The bottom remains fixed. Objects, players in flight, and the camera can extend beyond the original sides and above the original top. The overview includes these extensions.

Use the bottom-right person button or **+** to add an AI at the shared start; **−** removes the last tester. Drag the person onto a platform or into the air to start a tester there. Up to 24 testers use ordinary movement, crouching, and charged jumps. They retry after falls and search nearby landings; a tester getting stuck is not proof a jump is impossible. Returning to Edit clears the testers.

## Randomize

Choose a theme, Gentle/Steady/Bold difficulty, 4–40 jumps, platform width 80–160, and a seed. Matching settings and seed reproduce the same geometry.

The generator builds one static chain and accepts it only after replaying the entire route with ordinary charged-jump inputs through authoritative 30 Hz game physics. Every landing retains a safety margin. It never uses flight or teleportation to prove reachability. Failed candidates are retried; if none pass, the current draft stays open.

The verification badge applies to the new route with default hazards off. Editing clears the badge. It does not certify subsequent edits or optional rising hazards.

## Save and handoff

The working draft autosaves in this browser under `jump-royale-editor-recovery-v1`. **Save map** stores the named map in My maps under `jump-royale-maps-v1`. The menu imports and exports portable `.jump-royale.json` files. Imports receive a fresh ID.

Export a file to hand off for integration into the main game. Nothing publishes automatically or changes official maps, multiplayer, scores, or currency. Browser storage is tied to the browser and site address; export files for backups and other devices. Import and storage errors leave the open draft available.

## Technical notes

Version 1 files contain format/version, ID, name, baseMapId, platforms, spawn, and updatedAt. Optional platform artVariant preserves selected textures; original maps keep their existing renderer choices. The importer validates a known schema, geometry, IDs, motion periods, hollow shapes, and texture indices. Limits: 2,000 objects, 2 MB per file, 100 saved maps.

EditorSimulation clones the draft and uses authoritative physics, moving platforms, flight, and hazards. Rotation-enabled workshop maps use swept polygon collision; original courses retain their authored physics. Surfaces up to 45 degrees from horizontal support standing; steeper faces gradually slide downhill when idle. Holding jump crouches and grips the slope; releasing launches normally throughout the game. Forest buckets use the asset's opening, floor depth, and opaque underside profile. Resizing and importing retain those proportions. Original map generation is unchanged.

## Local preview and verification

Run `node scripts/preview-editor.mjs`, then open http://127.0.0.1:5255/. JUMP_ASSET_ROOT can point to another checkout's client/public; PORT changes the port. A smaller compiled preview is available with `node scripts/preview-editor.mjs --built --build`; rebuild it after source changes.

Checks: `npm run typecheck`, `npm run test:editor`, and `npm test`.

Verified September 19, 2026: type checking, hosted bundle, main regression suite, six-theme physics parity, persistence/import validation, deterministic retries, and 1,872 generated jump replays including width limits and 40-jump routes. Browser checks covered placement, moving, group selection, area erase/undo, map selector, random generation, Play/Edit, flight/teleport, retry points, help, and recovery.

The prior mountain bot pattern-1 failure at slope-branch-hill was reproduced in the unchanged checkout and remains outside this work.

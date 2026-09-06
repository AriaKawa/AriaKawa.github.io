# Planet 1 navigation performance regression

The prior viewport renderer synchronously repainted on every camera change and keyed polygon compilation by inverse zoom widths. A full USA compile measured 1449 ms in Node, and another synthetic zoom width produced a polygon-clipping output-ring error. The actual browser baseline at effective zoom .012, .013 and .014 took 1197, 1117 and 1299 ms per redraw.

The replacement uses one worker, one pending request and an overscanned world-anchored raster. Close views reuse immutable physical road geometry; distant views use sampled centerlines without polygon Boolean operations. Covered pans require no road redraw. Raster dimensions are capped at 2560 pixels per side, including large displays. Bitmaps are closed after copying/discarding; scene shutdown terminates the worker. Existing vector roads provide startup, uncovered-view and worker-failure fallback. Non-USA roads and the strategic map retain their existing rendering.

Road artwork and its 18 corridors are preserved. Full-resolution local grain, wear, shoulders and clipped markings use the editor material renderer. Terrain keeps its existing detail quality and bounded tile cache, but waits 120 ms for camera settling and creates at most one missing tile per frame. Previous tiles remain visible until the new set is complete. Hidden terrain cache signatures are invalidated when zooming back from the overview.

Browser regression: 9 zoom cases passed with nonempty road pixels and no worker errors. New distant worker draw times were 0.4–8.7 ms. First detailed geometry preparation took 1099 ms off-thread while 134 animation callbacks continued (maximum frame gap 16.5 ms during that case); subsequent detailed draws took 8.3–11.5 ms. These are renderer measurements, not an all-device FPS guarantee. Full gameplay at 1280x720 showed correct close-up textures, no console errors, and one cached road image at rest. Its dev frame counter reported 120 FPS / 8.3 ms p95 after settling. Terrain generation peaked at 41.6 ms for an individual tile; subsequent tiles measured approximately 11 ms.

Checks: typecheck, production build, validate-road-performance, validate-planet-one-roads, validate:road-network, validate:road-editor, validate:planet2. Browser harness: run client dev server and open /road-performance.html. Harness is not part of the production build.

Source copies in this folder mirror client/src and scripts. Restore those paths over the deadroad-io source checkout. The browser harness files belong at the client root. Packaged production build verified with map drag, zoom transition, visible textures, worker execution and no browser console errors.


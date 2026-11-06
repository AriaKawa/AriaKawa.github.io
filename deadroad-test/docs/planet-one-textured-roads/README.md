# Planet 1 textured USA roads

Planet 1 uses the Planet 3 TexturedRoadRenderer and its continuous asphalt material, union shoulders, clipped lane markings and directional wear. Its 18 USA corridors retain the editor layout with narrower I-44, I-64, I-81 and I-85 connectors. St. Louis, Oklahoma City and Knoxville approaches now use spaced junctions. The compiled graph is connected and has a maximum degree of four; every sampled spline is on schematic USA land.

The geographic adapter uses the same 20-step Catmull-Rom centerlines for road selection and deployment. Non-USA road rendering remains on the existing renderer. Planet 3 data, saves and navigation optimization are preserved.

Source copies: PlanetOneTexturedRoads.ts belongs in client/src/game; PlanetOneRoadNetwork.ts in client/src/game/roadEditor; EarthGlobeData.ts in client/src/globe; WorldScene.ts in client/src/scenes; validation script in scripts.

Checks: typecheck/build, validate-planet-one-roads (18 roads, 282 anchors, connected, on land, maximum four arms), validate:road-network and validate:planet2 passed. Local browser verified deployment, textured pavement and strategic map, with zero console errors. Existing Vite bundle size and classic vendor script warnings remain.

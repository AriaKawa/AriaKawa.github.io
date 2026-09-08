# Deployment roads and trunk collisions

Deployment field roads reuse RoadMaterialLibrary's dirt-road material from the road editor. Their rendered centerline is the saved contract route; the renderer does not introduce unvalidated spline shortcuts. Canvas textures are cached, capped at 2048 pixels per dimension, and released on scene shutdown.

The field generator creates seeded free-angle approaches. SceneryWorld checks swept road-width clearance, searches bounded eight-direction detours, and smooths only when all resulting segments remain clear. Route sampling also checks dry land. Search is limited to 4,000 expansions and a 480-world-unit margin; failed approaches try the other seeded candidates. A failed deployment reports that no clear approach was found instead of drawing through an obstacle.

Connections use the visible highway data supplied to SceneryWorld. Entries must be within 700 simulation units; a point up to 450 units along that road leaves room for defenses. Connections are capped at 1,000 units and 1.6 times their direct distance. Unconnected field routes are capped at 1,650 units. Build pads are sampled after the final route is chosen.

Tree trunks use a radius of 2.2% of sprite size at the stump position. The truck uses overlapping, heading-aligned chassis discs instead of its former 45-unit circle. Sweeps account for translation and rotation to prevent tunneling.

Validation: TypeScript/production build, validate:contracts, validate:convoy, validate:scenery. Added regression coverage for deterministic curves, full road-width obstacle clearance, nearby versus distant roads, impassable water, and close trunk passes. Local browser deployment confirmed the dirt material and no console errors. Existing vendor-script and bundle-size build warnings remain. Release: published with the deployment-road update; GitHub Pages provides the live build.


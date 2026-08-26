export const scraproadAssetManifest = {
  vehicle: {
    model: "./assets/scraproad/vehicles/kenney-suv.glb",
    palette: "./assets/scraproad/vehicles/Textures/colormap.png",
    wheelNodes: ["wheel-back-left", "wheel-back-right", "wheel-front-left", "wheel-front-right"],
  },
  weapon: {
    model: null,
    fallback: "Original low-poly roof cannon assembled in Three.js",
  },
  arena: {
    ramp: "./assets/scraproad/arena/kenney-ramp.glb",
    barrier: "./assets/scraproad/arena/kenney-barrier-wall.glb",
    pylon: "./assets/scraproad/arena/kenney-pylon.glb",
  },
  props: {
    palette: "./assets/scraproad/props/Textures/colormap.png",
    crate: "./assets/scraproad/props/kenney-crate.glb",
    tire: "./assets/scraproad/props/kenney-debris-tire.glb",
    bumper: "./assets/scraproad/props/kenney-debris-bumper.glb",
  },
  packs: {
    carKit: {
      name: "Kenney Car Kit 3.1",
      creator: "Kenney",
      source: "https://kenney.nl/assets/car-kit",
      license: "CC0 1.0",
      creditRequired: false,
      licenseFile: "./assets/scraproad/licenses/kenney-car-kit.txt",
    },
    racingKit: {
      name: "Kenney Racing Kit 2.0",
      creator: "Kenney",
      source: "https://kenney.nl/assets/racing-kit",
      license: "CC0 1.0",
      creditRequired: false,
      licenseFile: "./assets/scraproad/licenses/kenney-racing-kit.txt",
    },
  },
} as const;

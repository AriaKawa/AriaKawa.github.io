export const riggedAssetManifest = {
  vehicle: {
    model: "./assets/rigged/vehicles/kenney-suv.glb",
    palette: "./assets/rigged/vehicles/Textures/colormap.png",
    wheelNodes: ["wheel-back-left", "wheel-back-right", "wheel-front-left", "wheel-front-right"],
  },
  weapon: {
    model: null,
    fallback: "Three original low-poly roof turrets and anime-style weapon VFX assembled in Three.js",
  },
  arena: {
    ramp: "./assets/rigged/arena/kenney-ramp.glb",
    barrier: "./assets/rigged/arena/kenney-barrier-wall.glb",
    pylon: "./assets/rigged/arena/kenney-pylon.glb",
  },
  props: {
    palette: "./assets/rigged/props/Textures/colormap.png",
    crate: "./assets/rigged/props/kenney-crate.glb",
    tire: "./assets/rigged/props/kenney-debris-tire.glb",
    bumper: "./assets/rigged/props/kenney-debris-bumper.glb",
  },
  packs: {
    carKit: {
      name: "Kenney Car Kit 3.1",
      creator: "Kenney",
      source: "https://kenney.nl/assets/car-kit",
      license: "CC0 1.0",
      creditRequired: false,
      licenseFile: "./assets/rigged/licenses/kenney-car-kit.txt",
    },
    racingKit: {
      name: "Kenney Racing Kit 2.0",
      creator: "Kenney",
      source: "https://kenney.nl/assets/racing-kit",
      license: "CC0 1.0",
      creditRequired: false,
      licenseFile: "./assets/rigged/licenses/kenney-racing-kit.txt",
    },
  },
} as const;

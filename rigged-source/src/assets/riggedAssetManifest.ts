export const riggedVehicleCatalog = {
  "hatchback-sports": { label:"Hatchback Sport", callout:"LIGHT // QUICK", model:"./assets/rigged/vehicles/kenney-hatchback-sports.glb", preview:"./assets/rigged/vehicles/previews/hatchback-sports.png", turretHeight:2.34 },
  police: { label:"Police Interceptor", callout:"PURSUIT // TOUGH", model:"./assets/rigged/vehicles/kenney-police.glb", preview:"./assets/rigged/vehicles/previews/police.png", turretHeight:2.56 },
  "race-future": { label:"Future Racer", callout:"LOW // EXOTIC", model:"./assets/rigged/vehicles/kenney-race-future.glb", preview:"./assets/rigged/vehicles/previews/race-future.png", turretHeight:2.16 },
  race: { label:"Track Racer", callout:"LOW // FAST", model:"./assets/rigged/vehicles/kenney-race.glb", preview:"./assets/rigged/vehicles/previews/race.png", turretHeight:2.12 },
  "sedan-sports": { label:"Sport Sedan", callout:"BALANCED // SHARP", model:"./assets/rigged/vehicles/kenney-sedan-sports.glb", preview:"./assets/rigged/vehicles/previews/sedan-sports.png", turretHeight:2.28 },
  sedan: { label:"Street Sedan", callout:"BALANCED // CLEAN", model:"./assets/rigged/vehicles/kenney-sedan.glb", preview:"./assets/rigged/vehicles/previews/sedan.png", turretHeight:2.38 },
  "suv-luxury": { label:"Luxury SUV", callout:"HIGH // HEAVY", model:"./assets/rigged/vehicles/kenney-suv-luxury.glb", preview:"./assets/rigged/vehicles/previews/suv-luxury.png", turretHeight:2.64 },
  suv: { label:"Scrap SUV", callout:"RUGGED // READY", model:"./assets/rigged/vehicles/kenney-suv.glb", preview:"./assets/rigged/vehicles/previews/suv.png", turretHeight:2.54 },
  taxi: { label:"Battle Taxi", callout:"LOUD // ICONIC", model:"./assets/rigged/vehicles/kenney-taxi.glb", preview:"./assets/rigged/vehicles/previews/taxi.png", turretHeight:2.67 },
} as const;

export type RiggedVehicleId = keyof typeof riggedVehicleCatalog;

export const riggedAssetManifest = {
  vehicle: {
    defaultId: "suv" as RiggedVehicleId,
    models: riggedVehicleCatalog,
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

export type RacekartAssetCategory = "terrain" | "track" | "bridge" | "stunt" | "prop";

export type RacekartAssetDefinition = {
  obj: string;
  mtl: string;
  category: RacekartAssetCategory;
};

const root = "./assets/scraproad/racekart-hilly";
const asset = (name: string, category: RacekartAssetCategory): RacekartAssetDefinition => ({
  obj: `${root}/${name}.obj`,
  mtl: `${root}/${name}.mtl`,
  category,
});

export const scraproadRacekartManifest = {
  terrainFlat: asset("Terrain_Grass_Flat_1x1", "terrain"),
  terrainHillSide: asset("Terrain_Hill_Side_1x3", "terrain"),
  terrainHillCorner: asset("Terrain_Hill_Corner_Outer_4x4", "terrain"),
  trackStraight: asset("Track_Standard_Straight_Double", "track"),
  trackStraightStriped: asset("Track_Striped_Straight_Double", "track"),
  trackCurve: asset("Track_Standard_Curve_Double_4x4", "track"),
  trackCurveStriped: asset("Track_Striped_Curve_Double_4x4", "track"),
  trackBank: asset("Track_Standard_Incline_Double", "track"),
  trackBankStriped: asset("Track_Striped_Incline_Double", "track"),
  bridgeStart: asset("Track_Bridge_Start", "bridge"),
  bridgeIncline: asset("Track_Bridge_Incline_Gentle_Supported", "bridge"),
  bridgeFlat: asset("Track_Bridge_Flat_Supported", "bridge"),
  bridgeCurve: asset("Track_Bridge_Curve_3x3", "bridge"),
  stuntRamp: asset("Prop_Track_Ramp", "stunt"),
  stuntRailing: asset("Prop_Track_Ramp_Railing", "stunt"),
  trackArch: asset("Prop_Track_Arch_1x4", "prop"),
  fence: asset("Prop_Decorative_Fence_Railing", "prop"),
  rockWide: asset("Prop_Decorative_Rock_2", "prop"),
  rockTall: asset("Prop_Decorative_Rock_5", "prop"),
  hayBale: asset("Prop_Decorative_Hay_Bale_Box", "prop"),
} as const;

export type RacekartAssetKey = keyof typeof scraproadRacekartManifest;


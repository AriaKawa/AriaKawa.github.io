import { theaterPoint } from "../AmericasTheater";
import { cloneRoads, type AuthoredRoad, type EditorPoint, type RoadClass } from "./RoadEditorData";

export const CURATED_USA_LAYER_NAME = "Curated USA Road Layer v1";
const p = (lat: number, lon: number): EditorPoint => theaterPoint(lat, lon);

// One shared anchor per metro. Coordinates are deliberately approximate and
// sometimes inland to fit the game's schematic coastline. No local streets.
export const USA_ANCHORS = {
  seattle: p(47.55, -122.12), sacramento: p(38.58, -121.49), la: p(34.05, -118.24),
  cajon: p(34.23, -117.42), barstow: p(34.90, -117.02), saltLake: p(40.76, -111.89),
  billings: p(45.78, -108.50), cheyenne: p(41.14, -104.82), denver: p(39.74, -104.99),
  albuquerque: p(35.08, -106.65), lasCruces: p(32.32, -106.76), sanAntonio: p(29.43, -98.49),
  okc: p(35.47, -97.52), kc: p(39.10, -94.58), desMoines: p(41.60, -93.61),
  minneapolis: p(44.98, -93.27), omaha: p(41.26, -95.94),
  stLouis: p(38.63, -90.20), chicago: p(41.65, -87.72), indianapolis: p(39.77, -86.16),
  newOrleans: p(30.15, -90.18), mobile: p(30.85, -88.04), memphis: p(35.15, -90.05),
  nashville: p(36.16, -86.78), louisville: p(38.25, -85.76), knoxville: p(35.96, -83.92),
  atlanta: p(33.75, -84.39), cincinnati: p(39.10, -84.51), cleveland: p(41.36, -81.65),
  jacksonville: p(30.33, -81.78), miami: p(25.85, -80.40),
  greensboro: p(36.07, -79.79), benson: p(35.38, -78.55), petersburg: p(37.23, -77.40),
  richmond: p(37.54, -77.44), harrisburg: p(40.27, -76.89),
  scranton: p(41.04, -75.57), newYork: p(40.88, -74.20), boston: p(42.30, -71.23)
};
const a = USA_ANCHORS;
const road = (id: string, name: string, points: EditorPoint[], roadClass: RoadClass = "highway"): AuthoredRoad => ({
  id: `curated-usa-${id}`, name, roadClass, width: roadClass === "highway" ? 48 : 34,
  points, source: "manual_editor", locked: false, visible: true,
  notes: `${CURATED_USA_LAYER_NAME}. Hand-authored simplified corridor; shared metro anchors, no local streets.`,
  tags: ["curated-usa-v1", "hand-authored", "major-corridor"]
});

// Static spline control points, authored route by route. This adapter only
// projects coordinates and clones data; it never invents or places roads.
const ROADS: AuthoredRoad[] = [
  road("i5", "I-5 · Pacific spine", [a.seattle, p(46.65,-122.75), p(45.52,-122.68), p(44.10,-123.02), p(42.35,-122.90), p(41.35,-122.32), p(40.58,-122.39), a.sacramento, p(37.65,-121.30), p(36.25,-120.20), p(35.40,-119.40), p(34.95,-118.90), p(34.45,-118.60), a.la, p(33.80,-117.85), p(33.45,-117.40), p(33.05,-117.10), p(32.80,-116.98)]),
  road("i10", "I-10 · Southern coast-to-coast", [a.la, a.cajon, p(33.92,-116.95), p(33.75,-116.20), p(33.62,-114.60), p(33.45,-112.07), p(32.22,-110.97), p(32.25,-109.10), a.lasCruces, p(31.80,-106.40), p(31.05,-104.75), p(30.87,-102.88), p(30.92,-100.90), a.sanAntonio, p(29.78,-96.75), p(29.80,-95.37), p(30.20,-93.25), p(30.45,-91.20), a.newOrleans, p(30.70,-89.15), a.mobile, p(30.70,-86.60), p(30.55,-84.30), p(30.28,-82.65), a.jacksonville]),
  road("i15", "I-15 · Desert and mountain spine", [a.cajon, p(34.55,-117.30), a.barstow, p(35.25,-116.10), p(35.65,-115.40), p(36.17,-115.14), p(37.10,-113.58), p(38.60,-112.60), p(40.23,-111.66), a.saltLake, p(42.87,-112.45), p(43.50,-112.05), p(45.95,-112.50), p(47.50,-111.30)]),
  road("i25", "I-25 · Front Range", [a.lasCruces, p(33.15,-107.15), p(34.10,-106.89), a.albuquerque, p(35.70,-105.94), p(36.90,-104.45), p(38.26,-104.61), a.denver, a.cheyenne, p(42.85,-106.32), p(44.80,-106.96), a.billings]),
  road("i40", "I-40 · Desert to Carolina", [a.barstow, p(34.75,-115.70), p(34.85,-114.60), p(35.19,-114.05), p(35.20,-111.65), p(35.00,-110.00), p(35.53,-108.74), a.albuquerque, p(35.17,-103.73), p(35.22,-101.83), p(35.30,-99.55), a.okc, p(35.46,-95.00), p(35.39,-94.40), p(34.75,-92.27), a.memphis, p(35.65,-88.83), a.nashville, p(36.10,-85.50), a.knoxville, p(35.65,-82.95), p(35.60,-82.55), p(35.73,-81.35), a.greensboro, p(35.80,-78.65), a.benson, p(34.65,-78.05), p(34.30,-77.95)]),
  road("i70", "I-70 · Rockies to Pennsylvania", [a.denver, p(39.35,-103.10), p(39.35,-101.70), p(38.88,-99.33), p(38.84,-97.61), p(39.05,-95.68), a.kc, p(38.95,-92.33), a.stLouis, p(39.00,-88.55), a.indianapolis, p(39.85,-84.20), p(39.96,-83.00), p(40.06,-80.72), p(40.04,-78.50), a.harrisburg]),
  road("i80", "I-80 · Bay Area to New York", [p(37.85,-121.75), p(38.25,-121.65), a.sacramento, p(39.10,-120.55), p(39.53,-119.81), p(40.65,-117.60), p(40.83,-115.76), p(40.73,-113.80), a.saltLake, p(41.26,-110.96), p(41.59,-109.22), p(41.79,-107.24), a.cheyenne, p(41.15,-102.98), p(41.13,-100.76), p(40.90,-98.34), a.omaha, a.desMoines, p(41.63,-90.58), p(41.40,-89.00), a.chicago, p(41.50,-86.20), p(41.45,-84.20), a.cleveland, p(41.17,-79.10), p(41.02,-77.50), a.scranton, p(40.94,-74.90), a.newYork]),
  road("i90-west", "I-90 · Northern plains", [a.seattle, p(47.30,-121.30), p(46.98,-120.55), p(47.66,-117.43), p(47.48,-115.95), p(46.87,-113.99), p(45.95,-112.50), p(45.68,-111.04), a.billings, p(45.00,-107.35), p(44.30,-105.50), p(44.08,-103.23), p(43.85,-101.00), p(43.60,-98.00), p(43.55,-96.73), p(43.65,-94.00), p(43.90,-92.48), p(43.80,-91.24), p(43.07,-89.40), p(42.28,-88.95), a.chicago]),
  // Cleveland–Boston is separate: Chicago–Cleveland shares the I-80 pavement.
  road("i90-east", "I-90 · Great Lakes to Boston", [a.cleveland, p(41.82,-80.25), p(42.15,-79.35), p(42.78,-78.78), p(43.00,-77.61), p(43.04,-76.15), p(42.95,-74.95), p(42.65,-73.75), p(42.12,-72.59), p(42.23,-71.80), a.boston]),
  road("i35", "I-35 · Texas to Minnesota", [a.sanAntonio, p(30.27,-97.74), p(31.55,-97.15), p(32.78,-96.80), p(34.17,-97.14), a.okc, p(37.69,-97.34), p(38.40,-96.18), a.kc, p(40.20,-94.04), a.desMoines, p(43.15,-93.20), a.minneapolis]),
  road("i55", "I-55 · Mississippi valley", [a.newOrleans, p(31.58,-90.45), p(32.30,-90.18), p(33.70,-89.85), a.memphis, p(36.89,-89.59), p(37.31,-89.56), a.stLouis, p(39.80,-89.65), p(40.48,-88.99), p(41.20,-88.35), a.chicago]),
  road("i65", "I-65 · Gulf to Indiana", [a.mobile, p(32.37,-86.30), p(33.52,-86.80), p(34.60,-86.98), a.nashville, p(36.99,-86.44), a.louisville, p(39.00,-85.90), a.indianapolis]),
  road("i75", "I-75 · Florida to Michigan", [p(26.65,-81.35), p(27.95,-81.85), p(29.18,-82.15), p(30.28,-82.65), p(30.83,-83.28), p(32.84,-83.63), a.atlanta, p(35.05,-85.31), a.knoxville, p(37.08,-84.10), p(38.05,-84.50), a.cincinnati, p(39.85,-84.20), p(40.75,-84.10), p(41.55,-83.65), p(42.30,-83.18)]),
  road("i95", "I-95 · Atlantic spine", [a.miami, p(26.55,-80.35), p(27.80,-80.65), p(29.20,-81.25), a.jacksonville, p(31.40,-81.55), p(32.20,-81.25), p(33.45,-80.60), p(34.20,-79.80), a.benson, p(36.35,-77.65), a.petersburg, a.richmond, p(38.30,-77.46), p(38.91,-77.08), p(39.30,-76.65), p(39.72,-75.60), p(40.00,-75.20), a.newYork, p(41.35,-73.20), p(41.80,-72.25), p(42.00,-71.50), a.boston]),
  road("i44", "I-44 · Ozark connector", [a.okc, p(36.15,-95.99), p(37.08,-94.51), p(37.21,-93.29), p(37.95,-91.77), a.stLouis], "major_road"),
  road("i64", "I-64 · Ohio valley to Virginia", [a.stLouis, p(38.25,-88.95), p(38.20,-87.57), a.louisville, p(38.05,-84.50), p(38.42,-82.45), p(38.35,-81.63), p(37.80,-80.45), p(38.03,-78.50), a.richmond], "major_road"),
  road("i81", "I-81 · Appalachian connector", [a.knoxville, p(36.55,-82.20), p(37.27,-79.94), p(38.45,-78.87), p(39.18,-78.17), a.harrisburg, p(40.75,-76.10), a.scranton], "major_road"),
  road("i85", "I-85 · Piedmont connector", [a.atlanta, p(34.55,-83.10), p(34.85,-82.40), p(35.23,-80.84), a.greensboro, p(36.55,-78.50), a.petersburg], "major_road")
];

/** Fresh editable objects on every load; never aliases Planet 1 or the draft. */
export function curatedUSARoads(): AuthoredRoad[] { return cloneRoads(ROADS); }


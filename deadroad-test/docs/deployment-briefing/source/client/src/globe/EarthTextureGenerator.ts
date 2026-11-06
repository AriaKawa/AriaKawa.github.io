import type { WarSector } from '../game/types';
import { paintThreatField } from '../game/ThreatField';
import * as THREE from "three";
import earthLand from "./earth-land.json";
import type { WorldRegion } from "./GlobeData";
import { isAmericasFocusAt } from "./EarthTerritories";

type Point = { lat: number; lon: number };
type Ring = number[][];
type Geometry = { type: "Polygon" | "MultiPolygon"; coordinates: Ring[] | Ring[][] };

const geometries = (earthLand as { features: Array<{ geometry: Geometry }> }).features.map((feature) => feature.geometry);
const project = (lon: number, lat: number, width: number, height: number) => ({ x: (lon + 180) / 360 * width, y: (90 - lat) / 180 * height });

function ringsFor(geometry: Geometry): Ring[][] {
  return geometry.type === "Polygon" ? [geometry.coordinates as Ring[]] : geometry.coordinates as Ring[][];
}

function pointInRing(lat: number, lon: number, ring: Ring): boolean {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const a = ring[index]; const b = ring[previous];
    if ((a[1] > lat) !== (b[1] > lat) && lon < (b[0] - a[0]) * (lat - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside;
  }
  return inside;
}

export function isEarthLandAt(lat: number, lon: number): boolean {
  return geometries.some((geometry) => ringsFor(geometry).some((polygon) => pointInRing(lat, lon, polygon[0]) && !polygon.slice(1).some((hole) => pointInRing(lat, lon, hole))));
}

function earthPath(width: number, height: number): Path2D {
  const path = new Path2D();
  for (const geometry of geometries) for (const polygon of ringsFor(geometry)) for (const ring of polygon) ring.forEach(([lon, lat], index) => { const point = project(lon, lat, width, height); index ? path.lineTo(point.x, point.y) : path.moveTo(point.x, point.y); });
  return path;
}

function drawGeoLine(ctx: CanvasRenderingContext2D, points: Point[], color: string, width: number): void {
  ctx.beginPath(); points.forEach((point, index) => { const p = project(point.lon, point.lat, ctx.canvas.width, ctx.canvas.height); index ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); }); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke();
}

export function createEarthTextures(regions: WorldRegion[], natural = false): { surface: THREE.CanvasTexture; difficulty: THREE.CanvasTexture; refreshThreat: (sectors: WarSector[]) => void } {
  const width = 4096; const height = 2048; const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height; const ctx = canvas.getContext("2d")!; const land = earthPath(width, height);
  const ocean = ctx.createLinearGradient(0, 0, 0, height); ocean.addColorStop(0, "#274e6d"); ocean.addColorStop(.5, "#174764"); ocean.addColorStop(1, "#28526f"); ctx.fillStyle = ocean; ctx.fillRect(0, 0, width, height);
  let seed = 13579; const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
  for (let index = 0; index < 2600; index++) { const x = random() * width; const y = random() * height; const radius = 3 + random() * 16; ctx.fillStyle = random() > .5 ? "rgba(132,190,210,.045)" : "rgba(5,29,49,.065)"; ctx.beginPath(); ctx.ellipse(x, y, radius * 2.4, radius, random() * Math.PI, 0, Math.PI * 2); ctx.fill(); }
  ctx.save(); ctx.clip(land);
  const base = ctx.createLinearGradient(0, 0, 0, height); base.addColorStop(0, "#e6e7df"); base.addColorStop(.13, "#829266"); base.addColorStop(.31, "#648049"); base.addColorStop(.5, "#73934f"); base.addColorStop(.7, "#6e8448"); base.addColorStop(.88, "#8b8d69"); base.addColorStop(1, "#e9e9e3"); ctx.fillStyle = base; ctx.fillRect(0, 0, width, height);
  const fields: Array<[number, number, number, string]> = [
    [15, 23, 36, "rgba(207,172,103,.94)"], [47, 24, 22, "rgba(195,158,91,.9)"], [135, -25, 31, "rgba(196,143,77,.94)"], [-111, 36, 20, "rgba(176,139,77,.78)"], [-69, -20, 17, "rgba(177,134,73,.82)"], [69, 41, 25, "rgba(176,147,87,.8)"],
    [-63, -4, 27, "rgba(31,91,45,.94)"], [23, 0, 23, "rgba(30,83,43,.92)"], [106, 5, 25, "rgba(36,101,48,.92)"], [-123, 48, 21, "rgba(39,86,47,.84)"], [24, 55, 23, "rgba(45,91,48,.82)"], [100, 58, 36, "rgba(48,89,50,.78)"]
  ];
  for (const [lon, lat, degrees, color] of fields) { const center = project(lon, lat, width, height); const radius = degrees / 360 * width; const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius); gradient.addColorStop(0, color); gradient.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = gradient; ctx.fillRect(center.x - radius, center.y - radius, radius * 2, radius * 2); }
  for (let index = 0; index < 7600; index++) { const x = random() * width; const y = random() * height; if (!ctx.isPointInPath(land, x, y)) continue; const size = 1 + random() * 6; ctx.fillStyle = random() > .58 ? "rgba(230,217,163,.12)" : random() > .32 ? "rgba(36,70,37,.13)" : "rgba(85,58,38,.1)"; ctx.fillRect(x, y, size, size * .7); }
  if (!natural) {
    ctx.fillStyle = "rgba(2,4,3,.94)";
    ctx.fillRect(project(-30, 90, width, height).x, 0, width, height);
    ctx.fillRect(0, project(-170, 90, width, height).x, width, height);
    ctx.fillRect(0, project(0, -60, width, height).y, width, height);
    ctx.globalCompositeOperation = "source-over";
    for (let index = 0; index < 220; index++) { const lon = -180 + random() * 360; const lat = -85 + random() * 170; if (isAmericasFocusAt(lat, lon)) continue; const point = project(lon, lat, width, height); ctx.fillStyle = random() > .72 ? "rgba(87,12,10,.2)" : "rgba(23,27,23,.32)"; ctx.fillRect(point.x, point.y, 8 + random() * 36, 2 + random() * 6); }
  }
  ctx.restore(); ctx.strokeStyle = "rgba(110,173,190,.72)"; ctx.lineWidth = 14; ctx.stroke(land); ctx.strokeStyle = "rgba(220,207,151,.86)"; ctx.lineWidth = 3; ctx.stroke(land);
  const difficultyCanvas = document.createElement("canvas"); difficultyCanvas.width = width; difficultyCanvas.height = height; const danger = difficultyCanvas.getContext("2d")!; danger.save(); danger.clip(land);
  paintThreatField(danger, width, height, (x, y) => ({ lon: x / width * 360 - 180, lat: 90 - y / height * 180 }), [], 5); danger.restore();
  const surface = new THREE.CanvasTexture(canvas); surface.colorSpace = THREE.SRGBColorSpace; surface.anisotropy = 8; surface.wrapS = THREE.RepeatWrapping; const difficulty = new THREE.CanvasTexture(difficultyCanvas); difficulty.colorSpace = THREE.SRGBColorSpace; difficulty.anisotropy = 8; difficulty.wrapS = THREE.RepeatWrapping; const refreshThreat = (sectors: WarSector[]) => { danger.clearRect(0,0,width,height); danger.save(); danger.clip(land); paintThreatField(danger,width,height,(x,y)=>({lon:x/width*360-180,lat:90-y/height*180}),sectors,5); danger.restore(); difficulty.needsUpdate=true; }; return { surface, difficulty, refreshThreat };
}

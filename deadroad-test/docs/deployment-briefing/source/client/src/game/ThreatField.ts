import { threatAt } from '../../../server/src/sim/threatField';
export { threatAt };
import type { WarSector } from './types';

export function threatColor(threat: number): string {
  const stops = [[66, 182, 151], [223, 186, 78], [226, 105, 52], [183, 44, 68]];
  const t = Math.max(0, Math.min(3, (threat - 1) / 3)); const i = Math.min(2, Math.floor(t));
  return `rgb(${stops[i].map((v, n) => Math.round(v + (stops[i + 1][n] - v) * (t - i))).join(',')})`;
}
export function paintThreatField(ctx: CanvasRenderingContext2D, width: number, height: number, unproject: (x: number, y: number) => { lat: number; lon: number }, sectors: WarSector[] = [], step = 4): void {
  // Draw into a small canvas, then bilinearly upscale for a soft front with no cell edges.
  const field = document.createElement('canvas'); field.width = Math.ceil(width / step); field.height = Math.ceil(height / step);
  const g = field.getContext('2d')!;
  for (let y = 0; y < field.height; y++) for (let x = 0; x < field.width; x++) {
    const p = unproject((x + .5) * step, (y + .5) * step); g.fillStyle = threatColor(threatAt(p.lat, p.lon, sectors)); g.fillRect(x, y, 1, 1);
  }
  ctx.save(); ctx.globalAlpha *= .34; ctx.imageSmoothingEnabled = true; ctx.drawImage(field, 0, 0, width, height); ctx.restore();
}

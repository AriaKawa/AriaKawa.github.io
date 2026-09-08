import type { Vec2 } from './types';

export const ROUTE_ROLLOUT_MS = 2600;
/** Routes are stored spawn → core. Reveal distance from the core outward. */
export function routeFromCore(points: Vec2[], progress: number): Vec2[] {
  if (!points.length) return [];
  const reversed = points.slice().reverse();
  const lengths = reversed.slice(1).map((p, i) => Math.hypot(p.x - reversed[i].x, p.y - reversed[i].y));
  let remaining = lengths.reduce((sum, length) => sum + length, 0) * Math.max(0, Math.min(1, progress));
  const result = [reversed[0]];
  for (let i = 0; i < lengths.length && remaining > 0; i++) {
    const a = reversed[i], b = reversed[i + 1], length = lengths[i];
    if (length <= remaining) { result.push(b); remaining -= length; }
    else { const t = remaining / length; result.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }); break; }
  }
  return result;
}

type Point = { x: number; y: number };
export const PORTAL_ROAD_WIDTH = 34;

/** Local +Y is the exit; local X spans the road. Ignore repeated route points. */
export function portalPlacement(spawn: Point, route: Point[], roadWidth = PORTAL_ROAD_WIDTH) {
  let nearest = 0;
  for (let i = 1; i < route.length; i++) {
    if (Math.hypot(route[i].x - spawn.x, route[i].y - spawn.y) < Math.hypot(route[nearest].x - spawn.x, route[nearest].y - spawn.y)) nearest = i;
  }
  const next = route.slice(nearest + 1).find(p => Math.hypot(p.x - spawn.x, p.y - spawn.y) > .001);
  const previous = route.slice(0, nearest).reverse().find(p => Math.hypot(p.x - spawn.x, p.y - spawn.y) > .001);
  const dx = next ? next.x - spawn.x : previous ? spawn.x - previous.x : 0;
  const dy = next ? next.y - spawn.y : previous ? spawn.y - previous.y : 1;
  const angle = Math.atan2(dy, dx) - Math.PI / 2;
  const across = { x: Math.cos(angle), y: Math.sin(angle) };
  return { angle, left: { x: spawn.x - across.x * roadWidth / 2, y: spawn.y - across.y * roadWidth / 2 }, right: { x: spawn.x + across.x * roadWidth / 2, y: spawn.y + across.y * roadWidth / 2 } };
}

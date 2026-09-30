import { HALF, LANDMARKS, angleDifference, jumpHeight, clamp } from "../grid-io/simulation.mjs?v=speed-1";

// Rider-relative steering needs no pointer lock. Centering the mouse stops a turn.
export function steeringAxis(value) {
  return Math.sign(value) * clamp((Math.abs(value) - 0.12) / 0.88, 0, 1);
}
export function steeringTarget(heading, axis, dt) {
  return heading + clamp(axis, -1, 1) * 2.9 * dt;
}
export function relativeTurn(heading, side) {
  return Math.round(heading / (Math.PI / 2)) * (Math.PI / 2) + Math.sign(side) * Math.PI / 2;
}

export class ChaseCamera {
  constructor() { this.heading = 0; this.elevation = 0; this.boost = 0; }
  reset(rider) {
    this.heading = rider.angle;
    this.elevation = jumpHeight(rider);
    this.boost = 0;
  }
  update(rider, dt, { aspect = 1.6, lookBack = false, reducedMotion = false } = {}) {
    dt = clamp(dt, 0, 0.1);
    this.heading += angleDifference(rider.angle, this.heading) * (1 - Math.exp(-dt * 14));
    this.elevation += (jumpHeight(rider) - this.elevation) * (1 - Math.exp(-dt * 9));
    this.boost += ((rider.boost && !reducedMotion ? 1 : 0) - this.boost) * (1 - Math.exp(-dt * 4));
    const heading = this.heading + (lookBack ? Math.PI : 0);
    const dx = Math.cos(heading), dz = Math.sin(heading);
    const portrait = aspect < 1;
    const distance = (portrait ? 31 : 25) + this.boost * 3;
    let boom = distance;
    // Shorten the boom before entering the original reactor footprints.
    // This changes the view only; the original simulation owns collisions.
    for (const o of LANDMARKS) {
      const ox = rider.x - o.x, oz = rider.z - o.z, radius = o.r + 3;
      const projection = ox * dx + oz * dz;
      const discriminant = projection ** 2 - (ox * ox + oz * oz - radius ** 2);
      if (discriminant < 0) continue;
      const entry = projection - Math.sqrt(discriminant);
      const exit = projection + Math.sqrt(discriminant);
      if (exit > 0 && entry < boom) boom = Math.max(3, entry - 1);
    }
    return {
      x: clamp(rider.x - dx * boom, -HALF + 2, HALF - 2),
      y: (portrait ? 13 : 10.5) + this.elevation + (distance - boom) * 0.4,
      z: clamp(rider.z - dz * boom, -HALF + 2, HALF - 2),
      targetX: rider.x + dx * 18,
      targetY: 2.8 + this.elevation * 0.85,
      targetZ: rider.z + dz * 18,
      fov: (portrait ? 76 : 68) + this.boost * 5,
    };
  }
}

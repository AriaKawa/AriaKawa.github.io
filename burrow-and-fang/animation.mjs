// Shared timing keeps painted contact poses and simulation impacts in sync.
export function attackTiming(unit) {
  const windup =
    unit.projectile === "arrow"
      ? 0.16
      : unit.projectile
        ? 0.22
        : unit.leader || unit.summon
          ? 0.18
          : 0.12;
  const scale = Math.min(1, (unit.rate || 1) / 0.6);
  return { windup: windup * scale, duration: (windup + 0.28) * scale };
}
export function unitPose(unit, clock) {
  if (unit.hp <= 0)
    return {
      sheet: "action",
      frame: 7,
      lean: 0,
      drop: (1 - unit.dead / 0.7) * 5,
      alpha: Math.max(0, unit.dead / 0.7),
    };
  if (unit.attack > 0) {
    const { windup, duration } = attackTiming(unit),
      elapsed = Math.max(0, duration - unit.attack);
    const recovery = duration - windup;
    const beat =
      elapsed < windup * 0.5
        ? 0
        : elapsed < windup
          ? 1
          : elapsed < windup + recovery * 0.28
            ? 2
            : elapsed < windup + recovery * 0.52
              ? 3
              : elapsed < windup + recovery * 0.78
                ? 4
                : 5;
    const frames =
      unit.clan === "rats" && unit.art === 1
        ? [2, 2, 3, 4, 5, 7]
        : unit.clan === "rats" && unit.art === 3
          ? [2, 4, 5, 6, 7, 0]
          : [2, 3, 4, 5, 6, 7];
    const frame = frames[beat],
      lean = [-1, -2, 3, 2, 1, 0][beat];
    return { sheet: "action", frame, lean, drop: 0, alpha: 1 };
  }
  if (unit.moving) {
    const stride = Math.max(20, unit.size * 0.75),
      phase = (unit.walked || 0) / stride;
    return {
      sheet: unit.back ? "back" : "walk",
      frame: Math.floor(phase * 8) % 8,
      lean: 0,
      drop: 0,
      alpha: 1,
    };
  }
  // A brief breath rather than constantly toggling two poses.
  const breath = (clock + (unit.id || 0) * 0.37) % 2.8;
  return {
    sheet: unit.back ? "back" : "action",
    frame: unit.back ? 0 : breath > 2.25 ? 1 : 0,
    lean: 0,
    drop: 0,
    alpha: 1,
  };
}

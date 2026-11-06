export type ResearchPath = 'power' | 'reach' | 'tempo';
export type Progression = { xp?: number; researchXp?: number; research?: Record<string, number>; turretRewards?: Array<{ type: string; path: ResearchPath; tier: number }> };
export const RESEARCH_PATHS: ResearchPath[] = ['power', 'reach', 'tempo'];
export const PATH_LABELS = { power: 'Stopping power', reach: 'Long watch', tempo: 'Rapid response' };
export function commanderLevel(xp = 0): number { return Math.min(50, 1 + Math.floor(Math.sqrt(Math.max(0, xp) / 150))); }
export function xpForLevel(level: number): number { return 150 * (level - 1) ** 2; }
export function missionDifficulty(threat: number, xp = 0): number { return Math.max(1, Math.min(12, threat + Math.min(2, (commanderLevel(xp) - 1) * .08))); }
export function difficultyLabel(difficulty: number, xp = 0): string {
  const relative = difficulty / (1 + (commanderLevel(xp) - 1) * .055);
  return relative < 2.5 ? 'Patrol' : relative < 4.5 ? 'Contested' : relative < 6.5 ? 'Hard' : relative < 8.5 ? 'Overrun' : 'Dead zone';
}
export function missionRewards(difficulty: number, wave = 1) {
  return { xp: Math.round(35 + difficulty * 18 + wave * 8), scrap: Math.round(35 + difficulty * 12 + wave * 6), turretChance: Math.min(.5, .04 + difficulty * .035), turretTier: difficulty >= 8 ? 3 : difficulty >= 5 ? 2 : 1 };
}
export function enemyHealthMultiplier(difficulty: number): number { return 1 + Math.max(0, difficulty - 1) * .16; }
export function enemyCountMultiplier(difficulty: number): number { return 1 + Math.max(0, difficulty - 1) * .07; }
export function researchCost(tier: number): number { return 100 * tier * tier; }
export function unlockResearch(player: Progression, type: string, path: ResearchPath): boolean {
  if (!RESEARCH_PATHS.includes(path)) return false;
  const key = `${type}:${path}`; const tier = (player.research?.[key] ?? 0) + 1;
  if (tier > 3 || (player.researchXp ?? 0) < researchCost(tier)) return false;
  player.researchXp = (player.researchXp ?? 0) - researchCost(tier); (player.research ??= {})[key] = tier; return true;
}
export function awardXp(player: Progression, amount: number): void { player.xp = (player.xp ?? 0) + amount; player.researchXp = (player.researchXp ?? 0) + amount; }
export function applyResearchUpgrade(tower: { damage: number; range: number; fireRate: number }, path: ResearchPath): void {
  if (path === 'power') tower.damage *= 1.45;
  if (path === 'reach') { tower.range *= 1.23; tower.damage *= 1.1; }
  if (path === 'tempo') tower.fireRate *= 1.3;
}

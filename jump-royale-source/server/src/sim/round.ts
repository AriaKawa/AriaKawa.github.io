import type { Placement, PlayerState } from "./types.js";

export function rankPlayers(players: Iterable<PlayerState>, winnerId?: string): Placement[] {
  return [...players].sort((a, b) => {
    if (a.id === winnerId) return -1;
    if (b.id === winnerId) return 1;
    return Math.floor(b.maxHeight) - Math.floor(a.maxHeight) || (a.heightReachedMs ?? 0) - (b.heightReachedMs ?? 0) || a.id.localeCompare(b.id);
  }).map((p, index) => ({ id: p.id, name: p.name, place: index + 1, maxHeight: Math.floor(p.maxHeight), timeMs: p.heightReachedMs ?? 0, isBot: p.isBot }));
}

export function selectWinner(players: PlayerState[], elapsed: number): PlayerState | undefined {
  const summit = players.find(p => p.alive && p.groundedPlatformId === "crown");
  if (summit) return summit;
  const alive = players.filter(p => p.alive);
  if ((alive.length <= 1 && players.some(p => p.maxHeight > 60)) || elapsed >= 300) {
    const id = rankPlayers(players)[0]?.id;
    return players.find(p => p.id === id);
  }
  return undefined;
}

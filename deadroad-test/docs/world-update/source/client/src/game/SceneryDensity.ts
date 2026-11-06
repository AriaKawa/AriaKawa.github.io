export function treeRetention(threat: number): number {
 return 1 - .3 * Math.max(0, Math.min(1, (threat - 3.3) / 3.2));
}
export function propRandom(id: string, salt = 0): number {
 let h = 2166136261 ^ salt;
 for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
 return (h >>> 0) / 4294967296;
}

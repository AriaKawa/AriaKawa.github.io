// Optional preferences and mission progress must not prevent playing.
// Keep unsaved changes for this page session when browser storage is unavailable.
const unsaved = new Map<string, string>();
export function readPreference(key: string): string | null {
  if (unsaved.has(key)) return unsaved.get(key)!;
  try { return localStorage.getItem(key); } catch { return null; }
}
export function savePreference(key: string, value: string): void {
  try { localStorage.setItem(key, value); unsaved.delete(key); }
  catch { unsaved.set(key, value); }
}

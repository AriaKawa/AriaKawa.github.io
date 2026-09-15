import type { PlatformType } from "./types";

export const platformPalette: Record<PlatformType, { top: number; body: number; edge: number }> = {
  stone: { top: 0xf0d5ad, body: 0x8c7770, edge: 0x382a31 },
  wood: { top: 0xffb551, body: 0x985334, edge: 0x3b2421 },
  anvil: { top: 0xdff4f2, body: 0x768894, edge: 0x29343c },
  ice: { top: 0xb8f5f3, body: 0x5597a3, edge: 0x24414b },
  cracked: { top: 0xd7b47d, body: 0x765846, edge: 0x332a28 },
  moving: { top: 0x9ff7ff, body: 0x2c8794, edge: 0x123c45 }
};

export function formatTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

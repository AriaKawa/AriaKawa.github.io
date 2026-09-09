import { propRandom } from './SceneryDensity';
export function ambientRandom(id: string, salt: number): number {
 let h=(propRandom(id,salt)*4294967296)>>>0;
 h=Math.imul(h^(h>>>16),0x85ebca6b);h=Math.imul(h^(h>>>13),0xc2b2ae35);
 return ((h^(h>>>16))>>>0)/4294967296;
}
export function ambientType(id: string): 'walker'|'shambler'|'crawler'|'runner' {
 const roll=ambientRandom(id,1031);
 return roll<.45?'walker':roll<.7?'shambler':roll<.92?'crawler':'runner';
}

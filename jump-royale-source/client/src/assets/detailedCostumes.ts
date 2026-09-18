export const DETAILED_CHARACTERS=['demon','neet','cerberus','mushroom','puppy','cat','rat','skeleton','kangaroo'] as const;
export const DETAILED_SHEETS=['demon-16','demon-buns-16','demon-braid-16','neet-16','cerberus-16','mushroom-16','puppy-16','cat-16','rat-16','skeleton-16','kangaroo-16'] as const;
export const hasDetailedCostume=(character:string)=>DETAILED_CHARACTERS.some(id=>id===character);
export const detailedOptions=(character:string)=>[{id:'classic',name:'Original'},{id:character+'-16',name:'16-bit'}];
export const validDetailedId=(id:unknown):id is string=>DETAILED_CHARACTERS.some(character=>id===character+'-16');

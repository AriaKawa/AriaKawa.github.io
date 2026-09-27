export const WEAPONS={
 carbine:{name:'Rust Carbine',damage:24,interval:.28,range:145,pierce:1,spread:0,description:'Long reach · rapid, precise fire.'},
 shotgun:{name:'Sawed-off',damage:64,interval:.85,range:34,pierce:2,spread:1,description:'Three lanes · devastating up close.'},
 revolver:{name:'Iron Six',damage:52,interval:.62,range:90,pierce:2,spread:0,description:'Heavy rounds · pierces two infected.'},
 deagle:{name:'Deagle',damage:94,interval:.72,range:115,pierce:1,spread:0,description:'Heavy pistol · huge damage per shot.'},
 glocks:{name:'Akimbo Glocks',damage:19,interval:.14,range:85,pierce:1,spread:0,description:'Dual pistols · alternating left and right fire.'},
 scorpion:{name:'Scorpion EVO',damage:10,interval:.065,range:75,pierce:1,spread:0,description:'Blistering fire rate · light damage per bullet.'},
 barrett:{name:'Barrett .50 Cal',damage:155,interval:1.55,range:210,pierce:6,spread:0,description:'Six-target penetration · slow, powerful shots.'},
 katana:{name:'Samurai Sword',damage:110,interval:.66,range:12,pierce:4,spread:1,description:'Close-range cuts · sweeps three lanes.'}
};

// Ratios retain card and safehouse bonuses without re-applying consumable rewards.
export function replacementStats(run,id){
 const previous=WEAPONS[run.weapon],next=WEAPONS[id];
 if(!next)return null;
 return {damage:next.damage*run.damage/previous.damage,interval:next.interval*run.interval/previous.interval,
  range:next.range,pierce:next.pierce+run.pierce-previous.pierce,spread:run.deck.spread?1:next.spread};
}

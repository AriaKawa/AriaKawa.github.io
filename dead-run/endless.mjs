export const ZOMBIE_PRESSURE=1.25;
export const POWERUPS={
 minigun:{name:'MINIGUN',duration:10,color:'#edb760',desc:'10s · all lanes, piercing fire'},
 stim:{name:'STIM',duration:15,color:'#bdde78',desc:'15s · +50% damage'},
 skateboard:{name:'SPIKEBOARD',duration:8,color:'#a7d4db',desc:'8s · shield, +35% speed, crush hits'}
};
export function difficultyAt(seconds){
 const minutes=Math.max(0,seconds-25)/60,tier=Math.floor(seconds/35),surge=seconds>=45&&seconds%60>=45;
 // Preserve the old distance-based acceleration at an 8% faster start,
 // then continue a gentle logarithmic climb beyond its 38 m/s ceiling.
 return {tier,surge,speed:Math.min(40,27*Math.exp(Math.min(seconds,75)/190))+2*Math.log1p(Math.max(0,seconds-75)/240),
  pack:(3+Math.min(5,minutes*.7)+(surge?3:0))*ZOMBIE_PRESSURE,spacing:Math.max(12,28-minutes*2),
  health:(1+minutes*.48+minutes*minutes*.10)*ZOMBIE_PRESSURE,damage:(1+minutes*.17+minutes*minutes*.025)*ZOMBIE_PRESSURE,
  runnerChance:Math.min(.43,.14+minutes*.045),bruteChance:Math.min(.36,.035+minutes*.045),
  eliteChance:seconds<100?0:Math.min(.5,(seconds-100)/900),runnerSpeed:(3.8+Math.min(8,minutes*.85))*ZOMBIE_PRESSURE};
}

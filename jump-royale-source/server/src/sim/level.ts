import { SPAWN_Y } from './constants.js';
import type { Platform, PlayerState } from './types.js';
export const CHAPTERS = [
  {name:'THE EMBER YARD',lesson:'Solid ledges. Jump around their edges.',color:'#ffc178'},
  {name:'THE CHAINWORKS',lesson:'Wait for the ferry. Stay aboard.',color:'#b8d6d6'},
  {name:'THE COPPER BELFRY',lesson:'Watch the molten channels below.',color:'#edac72'},
  {name:'THE QUENCH',lesson:'Ride across before charging the exit jump.',color:'#85e0dd'},
  {name:'THE STARLESS SPIRE',lesson:'Commit to the crossing.',color:'#b9b7ed'},
  {name:'THE CROWN FORGE',lesson:'One last furnace crossing.',color:'#ffe5a0'}
] as const;
/** Authored sizes are deliberate: ferry links must not acquire random bypasses. */
export function generateLevel(_seed = 0xf04e): Platform[] {
  const out:Platform[]=[{id:'spawn',x:54,y:SPAWN_Y+32,w:532,h:28,type:'stone',solid:true}];
  let y=SPAWN_Y+32;
  const add=(id:string,x:number,w:number,rise:number,type:Platform['type']='stone')=>{
    y-=rise;out.push({id,x,y,w,h:type==='anvil'?30:24,type,solid:true});
  };
  for(let chapter=0;chapter<6;chapter++){
    const mirror=chapter%2===1;
    const bank=(x:number,w:number)=>mirror?640-x-w:x;
    add(`route-${chapter}-0`,bank(300,112),112,110);
    add(`route-${chapter}-1`,bank(176,108),108,112);
    add(`route-${chapter}-2`,bank(66,108),108,108);
    add(`route-${chapter}-3`,bank(200,108),108,112);
    add(`dock-${chapter}`,bank(54,92),92,110,'anvil');
    y-=100;
    const phase=mirror?Math.PI/2:-Math.PI/2;
    out.push({id:`ferry-${chapter}`,x:276+Math.sin(phase)*176,baseX:276,y,w:88,h:24,type:'moving',solid:true,moveRange:176,movePeriodMs:9000+chapter*350,movePhase:phase});
    // 230px above the dock: above the maximum jump apex. The ferry is mandatory.
    add(`exit-${chapter}`,bank(494,92),92,130,'anvil');
    add(`route-${chapter}-7`,bank(352,108),108,110);
    add(`route-${chapter}-8`,bank(210,112),112,110);
    add(`route-${chapter}-9`,bank(342,132),132,110,'anvil');
  }
  add('summit-0',430,112,y-180,'anvil');
  add('crown',224,192,y-72,'anvil');
  return out;
}
export interface ForgeLavaPool {x:number;y:number;w:number;h:number}
/** Open crucibles below each ferry punish a missed crossing, even above the tide. */
export const forgeLavaPools=(platforms:Platform[]):ForgeLavaPool[]=>platforms
  .filter(p=>p.id.startsWith('ferry-')).map(p=>({x:230,y:p.y+90,w:180,h:26}));
export function touchesForgeLava(player:Pick<PlayerState,'x'|'y'>,pools:ForgeLavaPool[],previousY=player.y):boolean {
  return pools.some(p=>player.x+14>p.x&&player.x<p.x+p.w&&Math.max(previousY,player.y)+20>=p.y&&Math.min(previousY,player.y)<p.y+p.h);
}



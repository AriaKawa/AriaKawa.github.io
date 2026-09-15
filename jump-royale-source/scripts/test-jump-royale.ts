import assert from 'node:assert/strict';
import {levelForMap} from '../server/src/sim/maps';
import {stepPlayer,solidBoxes} from '../server/src/sim/physics';
import {updateBot} from '../server/src/sim/bots';
import {stepFlight,landPlayer} from '../client/src/game/godPowers';
import type {PlayerState,Skill} from '../server/src/sim/types';
const make=(id:string,skill:Skill='cracked',pattern=0):PlayerState=>({id,name:id,x:313,y:6972,vx:0,vy:0,alive:true,grounded:true,groundedPlatformId:'spawn',charging:false,charge01:0,chargeDirection:0,facing:0,isBot:true,colorIndex:0,maxHeight:0,skill,input:{left:false,right:false,jumpHeld:false,seq:0},bot:{holdUntil:0,cooldownUntil:0,pattern,jumpCount:0,initialized:false}});
for(const map of ['forge','jungle'] as const){
  const platforms=levelForMap(map),skills:Skill[]=['bad','average','good','cracked'];
  const bots=skills.flatMap(skill=>Array.from({length:8},(_,i)=>make(`${skill}-${i}`,skill,i)));
  const launches=new Set<number>(),starts=new Set<number>();
  for(let tick=0;tick<1800;tick++)for(const bot of bots){
    const grounded=bot.grounded,charging=bot.charging;
    updateBot(bot,platforms,tick*1000/30);stepPlayer(bot,platforms,1/30);
    if(grounded&&!bot.grounded){launches.add(Math.round(bot.x));if(bot.bot!.jumpCount===1)starts.add(tick);}
    if(!charging&&bot.charging)assert(Math.abs(bot.x-bot.bot!.launchX!)<=3,'Bots must line up their planned launch');
  }
  const heights=skills.map(skill=>bots.filter(p=>p.skill===skill).reduce((sum,p)=>sum+p.maxHeight,0)/8);
  assert(starts.size>=12,'Individual bots must stagger their jumps');assert(launches.size>=8,'Bots must vary takeoff locations');
  assert(heights[3]>heights[0]+200,'Expert skill must produce meaningfully better progress than beginner skill');
  const player=make('player');player.isBot=false;player.input.up=true;
  stepFlight(player,.5);assert.equal(player.y,6752);assert(!player.grounded);
  player.input.up=false;const hoverY=player.y;stepFlight(player,.5);assert.equal(player.y,hoverY);
  landPlayer(player,platforms);assert(player.grounded);assert.equal(player.vy,0);
  player.input.jumpHeld=true;stepPlayer(player,platforms,1/30);assert(player.charging);
  player.y=7180;landPlayer(player,platforms);assert(player.grounded,'L below the floor must recover to a ledge');
  if(map==='jungle'){
    const cliff=platforms.find(p=>p.solid&&p.terrain==='left')!;
    const box=solidBoxes(cliff)[0];player.x=box.x+2;player.y=box.y+2;
    landPlayer(player,platforms);
    assert(!platforms.some(p=>solidBoxes(p).some(b=>player.x<b.x+b.w&&player.x+14>b.x&&player.y<b.y+b.h&&player.y+20>b.y+.01)),'Landing from inside terrain must restore a clear position');
  }
  console.log(`PASS ${map}: ${starts.size} first-jump timings, ${launches.size} takeoff positions; mean progress by skill ${heights.map(Math.round).join('/')}; flight, hover, safe landing, normal charge.`);
}

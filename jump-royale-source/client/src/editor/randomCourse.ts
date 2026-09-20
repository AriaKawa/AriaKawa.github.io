import {stepPlayer} from '../../../server/src/sim/physics';
import {worldForMap} from '../../../server/src/sim/world';
import {PLAYER_HEIGHT,PLAYER_WIDTH} from '../../../server/src/sim/constants';
import type {PlayerState,Platform} from '../../../server/src/sim/types';
import type {MapId} from '../../../server/src/sim/maps';
import {clone,newId,parseDraft,type MapDraft} from './maps';
export interface CourseOptions {theme:MapId;jumps:number;difficulty:'gentle'|'steady'|'bold';width:number;seed:string}
export interface JumpAction {direction:-1|1;chargeTicks:number;flightTicks:number;targetId:string}
export interface GeneratedCourse {draft:MapDraft;actions:JumpAction[];seed:string}
const makePlayer=(draft:MapDraft):PlayerState=>({id:'route-check',name:'Route check',...draft.spawn,vx:0,vy:0,alive:true,grounded:true,groundedPlatformId:'spawn',charging:false,charge01:0,chargeDirection:0,facing:0,isBot:false,colorIndex:0,maxHeight:0,input:{left:false,right:false,jumpHeld:false,seq:0}});
function random(seed:string){let n=2166136261;for(const c of seed)n=Math.imul(n^c.charCodeAt(0),16777619);return()=>{n^=n<<13;n^=n>>>17;n^=n<<5;return(n>>>0)/4294967296;};}
export function verifyCourse(draft:MapDraft,actions:JumpAction[]):boolean{
 const p=makePlayer(draft),world=worldForMap(draft.baseMapId);let time=0;
 for(const a of actions){
  for(let i=0;i<a.chargeTicks+a.flightTicks;i++){p.input={left:a.direction<0,right:a.direction>0,jumpHeld:i<a.chargeTicks,seq:0};stepPlayer(p,draft.platforms,1/30,{...world,time});time+=1/30;}
  const target=draft.platforms.find(q=>q.id===a.targetId);
  if(!target||!p.grounded||p.groundedPlatformId!==target.id||p.x<target.x+8||p.x+PLAYER_WIDTH>target.x+target.w-8)return false;
 }
 return p.groundedPlatformId==='crown';
}
/** Accept only a full replay with normal inputs and the finished map geometry. */
export async function generateCourse(options:CourseOptions,progress?:(done:number,total:number)=>Promise<void>,signal?:AbortSignal):Promise<GeneratedCourse>{
 const {theme,jumps,difficulty,width,seed}=options;
 if(!Number.isInteger(jumps)||jumps<4||jumps>40)throw new Error('Choose 4–40 jumps.');
 if(!Number.isInteger(width)||width<80||width>160)throw new Error('Choose a platform width from 80–160.');
 if(!['gentle','steady','bold'].includes(difficulty)||typeof seed!=='string'||seed.length>80)throw new Error('Invalid course settings.');
 const world=worldForMap(theme),rng=random(seed||'jump-royale');
 const minRise={gentle:112,steady:128,bold:146}[difficulty],maxRise={gentle:127,steady:145,bold:166}[difficulty];
 for(let attempt=0;attempt<20;attempt++){
  if(signal?.aborted)throw new Error('Generation cancelled.');
  const floor:Platform={id:'spawn',type:'stone',x:Math.round((world.left+world.right-width)/2),y:world.spawnY+32,w:width,h:20,solid:true,forest:theme==='forest',magical:theme==='magical',mountain:theme==='mountain',...(theme==='jungle'?{terrain:'island' as const}:{}),artVariant:0};
  const draft:MapDraft={format:'jump-royale-map',version:1,id:newId(),name:difficulty[0].toUpperCase()+difficulty.slice(1)+' climb · '+seed.slice(0,20),baseMapId:theme,platforms:[floor],spawn:{x:floor.x+(floor.w-PLAYER_WIDTH)/2,y:floor.y-PLAYER_HEIGHT},updatedAt:new Date().toISOString()};
  let current=makePlayer(draft),time=0;const actions:JumpAction[]=[];
  for(let i=0;i<jumps;i++){
   let found=false;
   for(let candidate=0;candidate<120;candidate++){
    const source=draft.platforms.at(-1)!,rise=Math.round(minRise+rng()*(maxRise-minRise)),direction=(rng()<.5?-1:1) as -1|1,chargeTicks=20+Math.floor(rng()*5);
    const preview=clone(current);let previewTime=time;
    for(let t=0;t<chargeTicks;t++){preview.input={left:direction<0,right:direction>0,jumpHeld:true,seq:0};stepPlayer(preview,draft.platforms,1/30,{...world,time:previewTime});previewTime+=1/30;}
    const y=source.y-rise;if(y<80)break;
    let landingX:number|undefined;
    for(let tick=0;tick<50;tick++){
     const before=preview.y+PLAYER_HEIGHT;preview.input={left:direction<0,right:direction>0,jumpHeld:false,seq:0};stepPlayer(preview,draft.platforms,1/30,{...world,time:previewTime});previewTime+=1/30;
     if(preview.vy>=0&&before<=y+3&&preview.y+PLAYER_HEIGHT>=y){landingX=preview.x+PLAYER_WIDTH/2;break;}if(preview.grounded)break;
    }
    if(landingX===undefined)continue;
    const x=Math.round(Math.max(world.left+4,Math.min(world.right-width-4,landingX-width/2)));
    const target:Platform={...floor,id:i===jumps-1?'crown':'random-'+(i+1),x,y,artVariant:i%3};
    if(theme==='mountain')target.region=0;
    const platforms=[...draft.platforms,target],p=clone(current);let t=time;
    for(let n=0;n<chargeTicks;n++){p.input={left:direction<0,right:direction>0,jumpHeld:true,seq:0};stepPlayer(p,platforms,1/30,{...world,time:t});t+=1/30;}
    let flightTicks=0;
    for(;flightTicks<50;){p.input={left:direction<0,right:direction>0,jumpHeld:false,seq:0};stepPlayer(p,platforms,1/30,{...world,time:t});t+=1/30;flightTicks++;if(p.grounded)break;}
    if(p.groundedPlatformId!==target.id||p.x<target.x+12||p.x+PLAYER_WIDTH>target.x+target.w-12)continue;
    draft.platforms.push(target);current=p;time=t;actions.push({direction,chargeTicks,flightTicks,targetId:target.id});found=true;break;
   }
   if(!found)break;if(signal?.aborted)throw new Error('Generation cancelled.');if(progress)await progress(i+1,jumps);
  }
  if(actions.length===jumps&&verifyCourse(draft,actions))return{draft:parseDraft(JSON.stringify(draft)),actions,seed};
 }
 throw new Error('No verified course found. Try a different seed or wider platforms.');
}

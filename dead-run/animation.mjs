import {ROLL_DURATION,SWAP_DURATION} from './model.mjs?v=slots-v8';
export const GAIT_FRAMES=8;
export function jumpFrame(run){
 if(run.grounded)return 7;
 if(run.jumping&&run.airTime<.045)return 0;
 if(run.jumping&&run.vy>6.4)return 1;
 if(run.vy>3.2)return 2;
 if(run.vy>.8)return 3;
 if(run.vy>-.8&&run.jumping)return 4;
 return run.vy>-4.5?5:6;
}
export function playerAnimation(run){
 if(run.swapTimer>0&&run.roll<=0&&!run.activeBoard&&!run.activeMinigun){
  const phase=1-run.swapTimer/SWAP_DURATION,poseRun=Object.create(run);
  poseRun.weapon=phase<.5?run.swapFrom:run.weapon;poseRun.swapTimer=0;poseRun.slashTimer=0;poseRun.firePose=0;poseRun.aim=phase<.15||phase>.85?1:0;
  const animation=playerAnimation(poseRun);return {...animation,gaitPose:animation.pose,pose:'swap',swapPhase:phase};
 }
 if(run.roll>0&&!run.activeBoard){const frame=Math.min(7,Math.floor((1-run.roll/ROLL_DURATION)*8));return {asset:'roll'+frame,pose:'roll',frame};}
 const family=run.activeBoard?'shieldboard':run.activeMinigun?'minigun':run.weapon;
 if(['deagle','glocks','scorpion','barrett','katana'].includes(family)){
  if(family==='katana'&&run.slashTimer>0){const frame=Math.min(3,Math.floor((1-run.slashTimer/.28)*4));return {asset:`v7-katana-slash-${frame}`,pose:'slash',frame};}
  const jumping=!run.grounded||run.landing>0,frame=jumping?[0,0,1,1,1,2,2,3][jumpFrame(run)]:Math.floor(run.stride*4)%4;
  const pose=jumping?'jump':family!=='katana'&&(run.aim>.45||run.firePose>0)?'aim':'run';
  return {asset:`v7-${family}-${pose}-${frame}`,pose,frame};
 }
 if(!run.grounded||run.landing>0){const frame=jumpFrame(run);return {asset:`v6-${family}-jump-${frame}`,pose:'jump',frame};}
 const frame=run.activeBoard?Math.floor(run.time*7)%8:Math.floor(run.stride*8)%8;
 const pose=run.activeBoard?'ride':run.activeMinigun||run.aim>.45||run.firePose>0?'aim':'run';
 return {asset:`v6-${family}-${pose}-${frame}`,pose,frame};
}
export function zombieFrame(kind,time,id=0){const rate={walker:8,runner:13,brute:6,horde:10}[kind]||8;return Math.floor(time*rate+id*1.618)%8;}
export function crumblePieces(event,random=Math.random,reduced=false){
 const large=event.kind==='bus'||event.kind==='truck'||event.kind==='car',count=reduced?4:large?16:10,asset=event.kind==='bus'||event.kind==='truck'?event.kind+'-back':event.kind;
 return Array.from({length:count},(_,i)=>({type:'crumble',asset,lane:event.lane,at:event.at,elevation:event.elevation||0,dx:(random()-.5)*(large?110:65),dy:large?20+random()*60:5+random()*30,vx:(random()-.5)*(large?240:150),vy:35+random()*90,angle:random()*6.28,spin:(random()-.5)*10,cell:i%9,size:large?13+random()*12:6+random()*8,life:.75+random()*.35}));
}

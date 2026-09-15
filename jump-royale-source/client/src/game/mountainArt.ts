import type Phaser from 'phaser';
import type {Platform,Snapshot} from './types';
import {GAME_WIDTH,GAME_HEIGHT} from './constants';
import {REGIONS,MOUNTAIN_HEIGHT,mountainSection,mountainWind,generateMountain} from '../../../server/src/sim/mountain';
export const MOUNTAIN_ASSETS=REGIONS.flatMap(r=>[r.key+'/platform',r.key+'/landmark',r.key+'/facade']).concat(['props/sky','props/cloud','props/cart','props/sigil']);
export function queueMountainAssets(scene:Phaser.Scene):void{
 for(const name of MOUNTAIN_ASSETS)scene.load.image('ascent-'+name,import.meta.env.BASE_URL+'assets/jump-royale/'+name+'.png');
 // Results retains its existing mountain illustration.
 scene.load.image('mountain-alpine-background',import.meta.env.BASE_URL+'assets/mountain/alpine-background.png');
}
export function drawMountainPreview(scene:Phaser.Scene,c:CanvasRenderingContext2D):void{
 const source=(name:string)=>scene.textures.get('ascent-'+name).getSourceImage() as HTMLImageElement;
 c.drawImage(source('props/sky'),0,0,1600,1000,0,0,240,170);
 c.drawImage(source('foothills/platform'),0,138,104,45);c.drawImage(source('village/landmark'),94,70,80,80);
 c.drawImage(source('castle/landmark'),155,8,80,125);c.drawImage(source('summit/landmark'),40,0,60,90);
}
const DARK=[0x2d443f,0x3d3f51,0x36515a,0x252e38,0x343c54,0x425756,0x536780,0x456282,0x3a365d,0x343451];
export function drawMountain(scene:Phaser.Scene):void{
 const level=generateMountain(),decor:Phaser.GameObjects.Image[]=[];
 const sky=scene.add.image(0,0,'ascent-props/sky').setOrigin(0).setScrollFactor(0).setDepth(-40);
 const haze=scene.add.rectangle(0,0,4000,4000,0xc7c2a3,.12).setOrigin(0).setScrollFactor(0).setDepth(-35);
 // Architectural masses are grouped at each horizontal gallery. Each has its
 // own silhouette and foundations rather than a ribbon through the route.
 REGIONS.forEach((r,index)=>{
  const rows=level.filter(p=>p.region===index&&p.route),groups:Platform[][]=[[]];
  for(const p of rows){const previous=groups.at(-1)!.at(-1);if(previous&&previous.y-p.y<=55)groups.push([]);groups.at(-1)!.push(p);}
  for(const group of groups){if(!group.length)continue;
   const left=Math.min(...group.map(p=>p.x))-85,right=Math.max(...group.map(p=>p.x+p.w))+85;
   const bottom=group[0].y+280,top=group.at(-1)!.y-130;
   const image=scene.add.image(left,top,'ascent-'+r.key+'/facade').setOrigin(0).setDisplaySize(right-left,bottom-top).setDepth(-18).setAlpha(.8);decor.push(image);
  }
  for(const i of [2,7,12,17,22,27]){const p=rows[Math.min(i,rows.length-1)];if(!p)continue;
   const image=scene.add.image(p.x+p.w*.5,p.y+190,'ascent-'+r.key+'/landmark').setOrigin(.5,1).setDisplaySize(index===4?400:320,index===4?560:360).setDepth(-12).setAlpha(.64).setTint(0xa8b7c5);decor.push(image);
  }
 });
 const clouds=Array.from({length:6},(_,i)=>scene.add.image(0,0,'ascent-props/cloud').setScrollFactor(0).setDepth(i<3?-32:-21).setAlpha(i<3?.2:.13));
 const flags=scene.add.graphics().setDepth(3);
 const sigils=new Map<string,Phaser.GameObjects.Image>();
 let collected:string[]=[];try{const saved=JSON.parse(localStorage.getItem('jump-royale-survey-v1')||'[]');if(Array.isArray(saved))collected=saved.filter(x=>typeof x==='string');}catch{}
 for(const p of level.filter(p=>p.secret))sigils.set(p.id,scene.add.image(p.x+p.w/2,p.y-22,'ascent-props/sigil').setDisplaySize(18,20).setDepth(5).setAlpha(collected.includes(p.id)?.25:1));
 const debug=new URLSearchParams(location.search).has('debugWorld')?scene.add.graphics().setDepth(40):undefined;
 const update=()=>{
  const camera=scene.cameras.main,section=mountainSection(camera.scrollY+GAME_HEIGHT*.62);
  const progress=1-(camera.scrollY+GAME_HEIGHT)/MOUNTAIN_HEIGHT;
  sky.setDisplaySize(GAME_WIDTH+280,GAME_HEIGHT+550);sky.x=-camera.scrollX*.09;sky.y=-420+progress*420;
  haze.setFillStyle(DARK[section],section===3?.3:.12);

  for(const d of decor)d.setVisible(d.getBounds().bottom>camera.scrollY-150&&d.getBounds().top<camera.scrollY+GAME_HEIGHT&&d.getBounds().right>camera.scrollX-100&&d.getBounds().left<camera.scrollX+GAME_WIDTH+100);
  for(let i=0;i<clouds.length;i++){const c=clouds[i];c.setDisplaySize(500+i*90,100+i*7);c.x=((i*331-camera.scrollX*(.13+i*.02)+scene.time.now*.003)%(GAME_WIDTH+900)+GAME_WIDTH+900)%(GAME_WIDTH+900)-450;c.y=((i*137-camera.scrollY*.13)%(GAME_HEIGHT+200)+GAME_HEIGHT+200)%(GAME_HEIGHT+200)-90;}
  const game=scene as Phaser.Scene&{snapshot?:Snapshot;localId:string;showToast:(message:string)=>void};
  const snap=game.snapshot,local=snap?.players.find(p=>p.id===game.localId),t=snap?(snap.serverTime-snap.roundStartedAt)/1000:0;
  flags.clear();
  for(const p of level){
   if(p.y<camera.scrollY-50||p.y>camera.scrollY+GAME_HEIGHT+50)continue;
   const force=mountainWind(p.x+p.w/2,p.y,t);if(!force)continue;
   const x=p.x+12;flags.lineStyle(2,0xbba983).lineBetween(x,p.y,x,p.y-32);flags.fillStyle(0xf3d29c).fillTriangle(x,p.y-32,x+14+force*.35,p.y-26,x,p.y-20);
  }
  for(const p of level.filter(p=>p.orbitY&&p.baseY!==undefined)){
   if(p.y<camera.scrollY-100||p.y>camera.scrollY+GAME_HEIGHT+100)continue;
   const angle=t*1000/p.movePeriodMs!*Math.PI*2,x=p.baseX!+p.w/2,y=p.baseY!+8;
   flags.lineStyle(5,0xa89475,.7);for(let i=0;i<4;i++){const a=angle+i*Math.PI/2;flags.lineBetween(x,y,x+Math.sin(a)*35,y+Math.cos(a)*25);}
   flags.fillStyle(0xe1c99a).fillCircle(x,y,5);
  }
  for(const [id,sigil] of sigils){const p=level.find(p=>p.id===id)!;sigil.setVisible(p.y>camera.scrollY&&p.y<camera.scrollY+GAME_HEIGHT);if(local?.alive&&local.grounded&&Math.abs(local.y+20-p.y)<3&&local.x+14>p.x&&local.x<p.x+p.w&&!collected.includes(id)){
   collected.push(id);try{localStorage.setItem('jump-royale-survey-v1',JSON.stringify(collected));}catch{}sigil.setAlpha(.25);game.showToast(`Survey sigil discovered · ${collected.length}/5`);
  }}
  if(debug){debug.clear();debug.lineStyle(1,0xffdc69);for(const p of level)if(p.y>camera.scrollY&&p.y<camera.scrollY+GAME_HEIGHT)debug.strokeRect(p.x,p.y,p.w,3);}
 };
 update();scene.events.on('update',update);scene.events.once('shutdown',()=>scene.events.off('update',update));
}
export function renderMountainTerrain(scene:Phaser.Scene,p:Platform,c:Phaser.GameObjects.Container):void{
 const region=p.region??mountainSection(p.y),key=REGIONS[region].key;
 const cart=p.type==='moving';
 const height=cart?38:p.id==='spawn'?190:Math.min(180,Math.max(70,p.w*.5));
 if(p.w>600){
  const texture=scene.textures.get('ascent-'+key+'/platform');
  // Whole repeating bays share a straight lit landing rim.
  const bays=Math.ceil(p.w/240),bay=p.w/bays;
  for(let i=0;i<bays;i++)c.add(scene.add.image(i*bay,0,texture.key).setOrigin(0).setDisplaySize(bay,120));
 }else c.add(scene.add.image(0,0,cart?'ascent-props/cart':'ascent-'+key+'/platform').setOrigin(0).setDisplaySize(p.w,height));
 if(p.slippery)c.add(scene.add.rectangle(0,0,p.w,5,0xe6ffff,.9).setOrigin(0));
 if(p.crumbleSeconds){const g=scene.add.graphics().lineStyle(2,0x363750);for(let x=18;x<p.w;x+=29)g.beginPath().moveTo(x,0).lineTo(x-6,9).lineTo(x+4,18).strokePath();c.add(g);}
 if(cart){const g=scene.add.graphics().lineStyle(1,0xf2d8a2,.65);g.lineBetween(10,0,10,-40).lineBetween(p.w-10,0,p.w-10,-40);c.add(g);}
 if(p.id==='crown')c.add(scene.add.image(p.w/2,1,'ascent-summit/landmark').setOrigin(.5,1).setDisplaySize(170,170));
 if(new URLSearchParams(location.search).has('debugWorld'))c.add(scene.add.text(0,-8,p.id,{fontSize:'8px',color:'#fff1a0'}).setOrigin(0,1));
}

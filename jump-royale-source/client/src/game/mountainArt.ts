import type Phaser from 'phaser';
import type {Platform,Snapshot} from './types';
import {GAME_WIDTH,GAME_HEIGHT} from './constants';
import {REGIONS,REGION_FLOORS,MOUNTAIN_WIDTH,mountainSection,mountainWind,generateMountain} from '../../../server/src/sim/mountain';
export const MOUNTAIN_ASSETS=REGIONS.flatMap(r=>[r.key+'/background',...Array.from({length:4},(_,i)=>r.key+'/platform-'+i)]).concat(['props/bell','props/sigil','props/rotor','props/wind','props/cloud','props/water']);
const key=(name:string)=>'ascent-ai-'+name;
export function queueMountainAssets(scene:Phaser.Scene):void{
 for(const name of MOUNTAIN_ASSETS)scene.load.image(key(name),import.meta.env.BASE_URL+'assets/jump-royale-ai/'+name+'.webp?caps=2');
 scene.load.json('ai-platform-metrics',import.meta.env.BASE_URL+'assets/jump-royale-ai/metrics.json?caps=2');
}
export function drawMountainPreview(scene:Phaser.Scene,c:CanvasRenderingContext2D):void{
 const source=(name:string)=>scene.textures.get(key(name)).getSourceImage() as HTMLImageElement;
 c.drawImage(source('village/background'),0,0,1536,512,0,0,240,170);
 c.drawImage(source('foothills/platform-0'),0,0,668,167,6,132,90,26);
 c.drawImage(source('village/platform-1'),0,0,678,197,138,75,92,29);
}
export function drawMountain(scene:Phaser.Scene):void{
 const level=generateMountain();scene.cameras.main.setBackgroundColor('#111e2d');
 const backgrounds=REGIONS.map(r=>scene.add.image(0,0,key(r.key+'/background')).setOrigin(0).setScrollFactor(0).setDepth(-40).setTint(0xa3a9b3));
 const clouds=Array.from({length:3},()=>scene.add.image(0,0,key('props/cloud')).setScrollFactor(0).setDepth(-30).setAlpha(.13));
 const flags=level.filter((p,i)=>i%4===0&&mountainWind(p.x+p.w/2,p.y,4)>0).map(p=>({p,image:scene.add.image(p.x,p.y,key('props/wind')).setOrigin(.15,1).setDisplaySize(34,40).setDepth(2)}));
 const rotors=level.filter(p=>p.orbitY&&p.baseY!==undefined).map(p=>({p,image:scene.add.image(p.baseX!+p.w/2,p.baseY!+5,key('props/rotor')).setDisplaySize(82,82).setDepth(0)}));
 const sigils=new Map<string,Phaser.GameObjects.Image>();
 let collected:string[]=[];try{const saved=JSON.parse(localStorage.getItem('jump-royale-survey-v1')||'[]');if(Array.isArray(saved))collected=saved.filter(x=>typeof x==='string');}catch{}
 for(const p of level.filter(p=>p.secret))sigils.set(p.id,scene.add.image(p.x+p.w/2,p.y-21,key('props/sigil')).setDisplaySize(12,21).setDepth(5).setAlpha(collected.includes(p.id)?.25:1));
 const debug=new URLSearchParams(location.search).has('debugWorld')?scene.add.graphics().setDepth(40):undefined;
 const update=()=>{
  const camera=scene.cameras.main,game=scene as Phaser.Scene&{snapshot?:Snapshot;localId:string;showToast:(message:string)=>void};
  const snap=game.snapshot,local=snap?.players.find(p=>p.id===game.localId),y=camera.scrollY+GAME_HEIGHT*.62;
  const weights:number[]=REGIONS.map((_,i)=>i===mountainSection(y)?1:0);
  // Crossfade near each actual region boundary, including when falling back down.
  for(let r=0;r<9;r++)if(Math.abs(y-REGION_FLOORS[r+1])<180){const blend=(REGION_FLOORS[r+1]+180-y)/360;weights.fill(0);weights[r]=1-blend;weights[r+1]=blend;break;}
  const scale=Math.max((GAME_WIDTH+120)/1536,(GAME_HEIGHT+100)/512),width=1536*scale,height=512*scale;
  const pan=Math.max(0,Math.min(1,camera.scrollX/Math.max(1,MOUNTAIN_WIDTH-GAME_WIDTH)));
  backgrounds.forEach((image,r)=>{image.setVisible(weights[r]>0).setAlpha(weights[r]);image.setDisplaySize(width,height);image.x=-(width-GAME_WIDTH)*(.12+.76*pan);image.y=-(height-GAME_HEIGHT)*(.5+.12*Math.sin(camera.scrollY/1400));});
  for(let i=0;i<clouds.length;i++){const c=clouds[i];c.setDisplaySize(420+i*180,120+i*25);c.setAlpha(mountainSection(y)===3?0:.09);c.x=((i*451-camera.scrollX*.1+scene.time.now*.002)%(GAME_WIDTH+700)+GAME_WIDTH+700)%(GAME_WIDTH+700)-350;c.y=((i*177-camera.scrollY*.08)%(GAME_HEIGHT+160)+GAME_HEIGHT+160)%(GAME_HEIGHT+160)-80;}
  const t=snap?(snap.serverTime-snap.roundStartedAt)/1000:0;
  for(const {p,image} of flags){image.setVisible(p.y>camera.scrollY-50&&p.y<camera.scrollY+GAME_HEIGHT+50);image.displayWidth=26+mountainWind(p.x+p.w/2,p.y,t)*.35;}
  for(const {p,image} of rotors){image.setVisible(p.y>camera.scrollY-100&&p.y<camera.scrollY+GAME_HEIGHT+100);image.rotation=-t*1000/p.movePeriodMs!*Math.PI*2+Math.PI/4;}
  for(const [id,sigil] of sigils){const p=level.find(p=>p.id===id)!;sigil.setVisible(p.y>camera.scrollY&&p.y<camera.scrollY+GAME_HEIGHT);if(local?.alive&&local.grounded&&Math.abs(local.y+20-p.y)<3&&local.x+14>p.x&&local.x<p.x+p.w&&!collected.includes(id)){
   collected.push(id);try{localStorage.setItem('jump-royale-survey-v1',JSON.stringify(collected));}catch{}sigil.setAlpha(.25);game.showToast(`Survey sigil discovered · ${collected.length}/5`);
  }}
  if(debug){debug.clear();debug.lineStyle(1,0xffdc69);for(const p of level)if(p.y>camera.scrollY&&p.y<camera.scrollY+GAME_HEIGHT)debug.strokeRect(p.x,p.y,p.w,3);}
 };
 update();scene.events.on('update',update);scene.events.once('shutdown',()=>scene.events.off('update',update));
}
interface Cap {width:number;height:number;capLeft:number;capY:number;capWidth:number}
export function renderMountainTerrain(scene:Phaser.Scene,p:Platform,c:Phaser.GameObjects.Container):void{
 const region=p.region??mountainSection(p.y),name=REGIONS[region].key;
 const index=Number(p.id.split('-').at(-1))||0;
 const variant=p.slippery?1:p.type==='moving'?(region===3?1:region===5?3:2):p.secret?2:index%4;
 const metrics=scene.cache.json.get('ai-platform-metrics') as Record<string,Cap>;
 const bays=p.w>280?Math.ceil(p.w/210):1,bay=p.w/bays;
 for(let i=0;i<bays;i++){
  const asset=name+'/platform-'+((variant+i)%4),m=metrics[asset];
  // Bound stale or malformed atlas measurements before computing render scale.
  const valid=Number.isFinite(m.capWidth)&&m.capWidth>=m.width*.65&&m.capWidth<=m.width&&m.capLeft>=0&&m.capLeft+m.capWidth<=m.width;
  const scale=bay/(valid?m.capWidth:m.width);
  c.add(scene.add.image(i*bay-(valid?m.capLeft:0)*scale,-m.capY*scale,key(asset)).setOrigin(0).setDisplaySize(m.width*scale,m.height*scale));
 }
 if(p.id==='crown')c.add(scene.add.image(p.w/2,0,key('props/bell')).setOrigin(.5,1).setDisplaySize(118,118));
 if(new URLSearchParams(location.search).has('debugWorld'))c.add(scene.add.text(0,-8,p.id,{fontSize:'8px',color:'#fff1a0'}).setOrigin(0,1));
}

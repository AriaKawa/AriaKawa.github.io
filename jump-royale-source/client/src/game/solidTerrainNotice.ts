import type Phaser from 'phaser';
import type {RoundPhase} from './types';
import './solidTerrainNotice.css';

/** A short pre-round tutorial, illustrated with the game's existing pixel sprites. */
export function createSolidTerrainNotice(scene:Phaser.Scene,platformKey='forest-ai-moss-slate',kind:'solid'|'ice'|'slope'|'vine'='solid'){
 const root=document.createElement('aside');root.className='solid-terrain-notice';root.hidden=true;
 root.setAttribute('role','note');root.setAttribute('aria-label','Solid Terrain');
 root.innerHTML='<canvas width="96" height="96" role="img" aria-label="A climber bumps their head on the underside of a solid platform and bounces back down"></canvas><div><h2>Solid Terrain</h2><p>You can’t jump through platforms.<br>Hit the underside and bounce off.</p></div>';
 document.getElementById('game')!.append(root);
 if(kind==='ice'){root.classList.add('ice-slip-notice');root.setAttribute('aria-label','Slippery ice');root.querySelector('h2')!.textContent='Slippery when frozen!';root.querySelector('p')!.innerHTML='Cyan ice keeps you sliding.<br>Hold Space to grip and charge.';root.querySelector('canvas')!.setAttribute('aria-label','A climber slides across cyan ice, then grips it to charge a jump');}
 if(kind==='slope'){root.classList.add('slope-notice');root.setAttribute('aria-label','Slanted terrain');root.querySelector('h2')!.textContent='Keep your footing!';root.querySelector('p')!.innerHTML='Slopes always pull you downhill.<br>Inch uphill, charge while sliding, then leap.';root.querySelector('canvas')!.setAttribute('aria-label','A climber slides down a grassy slope');}
 if(kind==='vine'){root.setAttribute('aria-label','Swing through the canopy');root.querySelector('h2')!.textContent='Catch the canopy!';root.querySelector('p')!.innerHTML='Leap left to grab the swinging vine.<br>W / S or ↑ / ↓ climb. Space lets go!';root.querySelector('canvas')!.setAttribute('aria-label','A leafy vine swings from side to side');root.querySelector('canvas')!.style.imageRendering='auto';}
 const canvas=root.querySelector('canvas')!,c=canvas.getContext('2d')!;
 const platform=scene.textures.get(platformKey).getSourceImage() as HTMLImageElement;
 const player=scene.textures.get('climber-v2'),source=player.getSourceImage() as HTMLImageElement;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 function draw(time:number){
  if(kind==='vine'){c.clearRect(0,0,96,96);c.imageSmoothingEnabled=true;c.save();c.translate(48,3);c.rotate(reduced.matches?-.3:Math.sin(time*.00165)*.6);c.drawImage(platform,-6,0,12,85);c.restore();return;}
  if(kind==='slope'){const t=reduced.matches?.5:(time%2800)/2800,x=75-t*52,y=24+t*18;c.clearRect(0,0,96,96);c.imageSmoothingEnabled=false;c.drawImage(platform,4,50,88,28);const f=player.get(t<.65?0:3);c.drawImage(source,f.cutX,f.cutY,f.width,f.height,x-20,y-9,38,38);return;}
  if(kind==='ice'){
   const t=reduced.matches?.6:(time%2600)/2600,x=12+Math.min(1,t/.65)*40;
   c.clearRect(0,0,96,96);c.imageSmoothingEnabled=false;c.drawImage(platform,3,68,90,18);
   const frame=player.get(t<.65?0:3);c.drawImage(source,frame.cutX,frame.cutY,frame.width,frame.height,x-8,17,56,56);
   c.fillStyle=t<.65?'#b8f4ff':'#ffe19a';if(t<.65){for(let i=0;i<3;i++)c.fillRect(x-12-i*7,53+i*5,8,2);}else{c.fillRect(x+5,69,20,2);c.fillRect(x+13,64,3,10);}
   return;
  }
  const t=reduced.matches?.36:(time%1800)/1800;
  const lift=t<.36?t/.36:t<.72?1-(t-.36)/.36:0;
  c.clearRect(0,0,96,96);c.imageSmoothingEnabled=false;
  c.drawImage(platform,4,8,88,25);
  const frame=player.get(t<.36?4:5),y=Math.round(48-lift*17);
  c.drawImage(source,frame.cutX,frame.cutY,frame.width,frame.height,20,y-4,56,56);
  if(t>.3&&t<.5){
   c.fillStyle='#ffe19a';c.fillRect(44,31,9,2);c.fillRect(48,27,2,10);
   c.fillRect(35,33,4,2);c.fillRect(57,29,4,2);
  }
  c.fillStyle='#79b9b0';c.fillRect(13,54,2,17);c.fillRect(10,54,8,2);c.fillRect(11,57,6,2);
 }
 return {
  sync(phase:RoundPhase,solid:boolean,time:number){root.hidden=!solid||(phase!=='waiting'&&phase!=='countdown');if(!root.hidden)draw(time);},
  destroy(){root.remove();}
 };
}

import Phaser from 'phaser';
import {MAPS,type MapId} from '../../../server/src/sim/maps';
import {PORTRAITS,portraitImage,portraitId} from './portraits';
import {loadOutfit,outfitTexture,sanitizeOutfit} from '../assets/cosmetics';
import {safePlayerName} from '../../../server/src/sim/names';
import {backend,playerId,party,partyMembers,isHost,joinParty,leaveParty,updateMember,updatePresence,startParty,returnToParty,type Member,type OnlineScore} from './online';
import {equippedWallpaper} from './wallpapers';
import {scoreTime} from './scores';


function dialog(root:HTMLElement,label:string){const d=document.createElement('dialog');d.className='social-dialog';d.setAttribute('aria-label',label);const h=document.createElement('header');h.innerHTML=`<h2>${label}</h2><button type="button" aria-label="Close ${label}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>`;h.querySelector('button')!.onclick=()=>d.close();d.append(h);root.append(d);d.addEventListener('keydown',e=>e.stopPropagation());d.addEventListener('keyup',e=>e.stopPropagation());return d;}
export function createPartyUi(scene:Phaser.Scene,root:HTMLElement,form:HTMLFormElement,getMap:()=>MapId,onStart:(map:MapId)=>void){
 const toggle=document.createElement('button');toggle.className='party-toggle';toggle.type='button';toggle.setAttribute('aria-label','Party and profile');toggle.title='Party and profile';
 root.querySelector('.forge-resources')!.prepend(toggle);
 const d=dialog(root,'Party and profile'),body=document.createElement('div'),notice=document.createElement('p');notice.className='party-readiness';notice.setAttribute('aria-live','polite');form.append(notice);d.classList.add('party-dialog');d.append(body);
 let busy=false,started=party.data?.round??'',lastPresence=0,lastProfile=0,positioned=false;
 const sprites=new Map<string,{sprite:Phaser.GameObjects.Sprite;label:Phaser.GameObjects.Text;wallpaper:Phaser.GameObjects.Image}>();
 const icon=()=>portraitId(localStorage.getItem('jump-profile-icon')??'finn');
 const member=():Member=>({id:playerId,name:safePlayerName(form.querySelector('input')!.value),outfit:loadOutfit(),icon:icon(),wallpaper:equippedWallpaper(),ready:false,x:400,y:400,updated:Date.now()});
 const run=async(fn:()=>Promise<unknown>)=>{if(busy)return;busy=true;try{await fn();party.error='';}catch(e){party.error=e instanceof Error?e.message:'Unable to connect';}finally{busy=false;render();}};
 const render=()=>{
  toggle.replaceChildren(portraitImage(icon()));const dot=document.createElement('span');dot.className='party-badge';dot.setAttribute('aria-hidden','true');dot.textContent=party.code?String(partyMembers().length):'+';toggle.append(dot);
  const start=form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  const members=partyMembers(),mine=party.data?.members?.[playerId],notReady=members.filter(m=>m.id!==party.data?.host&&!m.ready);
  start.textContent=party.code&&!isHost()?(mine?.ready?'Ready ✓':'Ready'):'Start';
  const locked=root.querySelector<HTMLElement>('.map-selector')?.dataset.locked==='true';
  start.disabled=(!party.code||isHost())&&(locked||(!!party.code&&(notReady.length>0||members.length!==Object.keys(party.data?.members??{}).length)));
  root.querySelectorAll<HTMLButtonElement>('.map-arrow').forEach(b=>b.disabled=!!party.code&&!isHost());
  notice.textContent=party.error|| (party.code?(isHost()?(start.disabled?'Players not ready':'Everyone is ready'):(mine?.ready?'Waiting for the host':'Ready up to join the climb')):'');
  if(!d.open)return;body.replaceChildren();
  const profile=document.createElement('button');profile.className='profile-button';profile.append(portraitImage(icon()),document.createTextNode('Your profile · change icon'));body.append(profile);
  const choices=document.createElement('div');choices.className='profile-icons';choices.hidden=true;body.append(choices);
  profile.setAttribute('aria-expanded','false');profile.onclick=()=>{choices.hidden=!choices.hidden;profile.setAttribute('aria-expanded',String(!choices.hidden));};
  for(const c of PORTRAITS){const b=document.createElement('button');b.title=c.name;b.setAttribute('aria-pressed',String(icon()===c.id));b.setAttribute('aria-label',c.name+' icon');b.append(portraitImage(c.id));b.onclick=()=>{localStorage.setItem('jump-profile-icon',c.id);void run(()=>updateMember({icon:c.id}));};choices.append(b);}
  const info=document.createElement('p');info.textContent=party.code?`Party code: ${party.code} · ${members.length}/8 players`:'Host a party or enter a friend’s code.';body.append(info);
  if(party.code){
   const copy=document.createElement('button');copy.textContent='Copy code';copy.onclick=()=>void run(()=>navigator.clipboard.writeText(party.code));body.append(copy);
   for(const m of members){const row=document.createElement('div');row.className='party-member';row.append(portraitImage(m.icon),document.createTextNode(`${m.name} · ${m.id===party.data?.host?'Host':m.ready?'Ready':'Not ready'}`));body.append(row);}
   const leave=document.createElement('button');leave.textContent=isHost()?'Close party':'Leave party';leave.onclick=()=>void run(leaveParty);body.append(leave);
  }else{
   const host=document.createElement('button');host.textContent='Host party';host.onclick=()=>void run(()=>joinParty(Array.from(crypto.getRandomValues(new Uint8Array(6)),n=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[n%31]).join(''),member(),true));
   const input=document.createElement('input');input.placeholder='Party code';input.maxLength=6;input.setAttribute('aria-label','Party code');
   const join=document.createElement('button');join.textContent='Join party';join.onclick=()=>void run(()=>joinParty(input.value,member()));body.append(host,input,join);
  }
  const error=document.createElement('p');error.setAttribute('role','status');error.textContent=party.error;body.append(error);
 };
 const sync=()=>{
  render();const p=party.data;
  if(p?.started&&p.round&&started!==p.round){started=p.round;d.close();onStart(p.map);}
 };
 toggle.onclick=()=>{d.showModal();render();};window.addEventListener('jump-party',sync);
 const tick=()=>{
  const local=(scene as any).lobbyPlayer;
  if(party.code&&local&&!positioned){positioned=true;if(!isHost())local.x+=100;}
  if(!party.code)positioned=false;
  if(party.code&&local&&Date.now()-lastPresence>150){lastPresence=Date.now();void updatePresence(local.x,local.y).catch(()=>{});if(Date.now()-lastProfile>5000){lastProfile=Date.now();const m=member();void updateMember({name:m.name,outfit:m.outfit,wallpaper:m.wallpaper,icon:m.icon}).catch(()=>{});}}
  const seen=new Set<string>();
  for(const m of partyMembers()){if(m.id===playerId)continue;seen.add(m.id);let e=sprites.get(m.id);const key=outfitTexture(scene,sanitizeOutfit(m.outfit));
   if(!e){e={sprite:scene.add.sprite(m.x,m.y,key).setDepth(5).setScale(3.5).setOrigin(.5,1),label:scene.add.text(0,0,'',{fontSize:'12px',color:'#fff0ce',backgroundColor:'#101725'}).setDepth(6).setOrigin(.5),wallpaper:scene.add.image(0,0,m.wallpaper).setDepth(-1).setAlpha(.75)};sprites.set(m.id,e);}
   e.sprite.setTexture(key).setPosition(m.x+12,m.y+16);e.sprite.play(key+'-idle',true);e.label.setText(m.name).setPosition(m.x+12,m.y-112);
   e.wallpaper.setTexture(['starlight','moonveil'].includes(m.wallpaper)?m.wallpaper:'forged-command').setPosition(m.x+12,m.y-42).setDisplaySize(150,110).setAlpha(.65);
  }
  for(const [id,e] of sprites)if(!seen.has(id)){e.sprite.destroy();e.label.destroy();e.wallpaper.destroy();sprites.delete(id);}
 };
 scene.events.on('update',tick);if(party.code)void run(returnToParty);render();
 return {submit:()=>{if(!party.code)return false;void run(()=>isHost()?startParty(getMap()):updateMember({ready:!party.data?.members?.[playerId]?.ready}));return true;},destroy:()=>{window.removeEventListener('jump-party',sync);scene.events.off('update',tick);for(const e of sprites.values()){e.sprite.destroy();e.label.destroy();e.wallpaper.destroy();}d.remove();toggle.remove();notice.remove();}};
}

export function createLeaderboards(root:HTMLElement,name:()=>string){
 const panel=document.createElement('section');panel.className='personal-scores';const toggle=document.createElement('button');toggle.type='button';toggle.className='scores-toggle';toggle.textContent='Leaderboards';panel.append(toggle);root.append(panel);
 const d=dialog(root,'Leaderboards'),maps=document.createElement('div'),metrics=document.createElement('div'),content=document.createElement('div'),footer=document.createElement('p');maps.className=metrics.className='leaderboard-tabs';content.className='leaderboard-rows';footer.className='leaderboard-self';d.classList.add('leaderboards-dialog');d.append(maps,metrics,content,footer);
 let map:MapId=MAPS[0].id,metric:'wins'|'bestMs'='bestMs',generation=0;
 const render=async()=>{const n=++generation;maps.replaceChildren();metrics.replaceChildren();for(const m of MAPS){const b=document.createElement('button');b.textContent=m.name;b.setAttribute('aria-pressed',String(m.id===map));b.onclick=()=>{map=m.id;void render();};maps.append(b);}for(const [key,label] of [['bestMs','Fastest completion'],['wins','Most wins']] as const){const b=document.createElement('button');b.textContent=label;b.setAttribute('aria-pressed',String(key===metric));b.onclick=()=>{metric=key;void render();};metrics.append(b);}content.textContent='Loading leaderboard…';footer.textContent='';
  try{const b=await backend(),s=await b.get(b.at('boards/'+map));if(n!==generation||!d.open)return;
   const rows=Object.entries(s.val()??{}).map(([id,v])=>({id,...v as OnlineScore})).filter(r=>metric==='wins'?r.wins>0:typeof r.bestMs==='number'&&r.bestMs>0).sort((a,b)=>(metric==='wins'?b.wins-a.wins:a.bestMs!-b.bestMs!)||a.id.localeCompare(b.id));
   content.replaceChildren();if(!rows.length)content.textContent='No records yet. Finish a climb to set the first one.';
   for(const [i,r] of rows.slice(0,100).entries()){const row=document.createElement('div');row.className='leaderboard-row';for(const text of ['#'+(i+1),r.name,metric==='wins'?r.wins+' wins':scoreTime(r.bestMs!)]){const span=document.createElement('span');span.textContent=text;row.append(span);}content.append(row);}
   const index=rows.findIndex(r=>r.id===playerId);footer.textContent=`${name()} · ${index<0?'Unranked':'#'+(index+1)+' of '+rows.length}`;
  }catch{if(n===generation){content.textContent='Leaderboard unavailable. Close and reopen to retry.';footer.textContent=name()+' · Rank unavailable';}}
 };
 toggle.onclick=()=>{d.showModal();void render();};return ()=>{generation++;d.remove();panel.remove();};
}

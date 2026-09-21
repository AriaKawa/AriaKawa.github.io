import {expeditionPlatform,isExpedition,resetMoon,stepMoon} from '../game/expeditionWorlds';
import {createExpeditionInteraction} from '../game/expeditionInteraction';
import {spriteScale,drawOutfitPreview} from '../game/spriteSizing';
import {itemRarity} from '../game/lootCatalog';
import {createMissions} from '../game/missions';
import {createPartyUi,createLeaderboards} from '../game/socialUi';
import {createWallpapers,WALLPAPERS,equippedWallpaper} from '../game/wallpapers';
import { footOrigin } from '../game/spriteFeet';
import '../game/forgedCommand.css';
import '../game/forgedAssets.css';
import '../game/wardrobeShop.css';
import '../game/wallpapers.css';
import '../game/social.css';
import {drawLootIcon} from '../game/lootIcons';
import {ANIMAL_HATS,isAnimal} from '../assets/animalRig';
import {createLootBox} from '../game/lootBox';
import {COSTUMES,costumeFields} from '../assets/costumeSets';
import {createSettings} from '../game/settings';
import {isBadName, nameRebuke, safePlayerName} from '../../../server/src/sim/names';

import {createGoldStore} from '../game/goldStore';
import {audio} from '../game/audio';
import {wallet,owns,buy,price,playableOutfit} from '../game/economy';

import type { Platform } from '../../../server/src/sim/types';

import { MAPS } from "../../../server/src/sim/maps";

import Phaser from "phaser";

import { COSMETICS, DEMON_HAIRS, sanitizeOutfit, loadOutfit, saveOutfit, outfitTexture, type Outfit } from "../assets/cosmetics";
import {hasDetailedCostume} from '../assets/detailedCostumes';
import {MAGICAL_HAIR} from '../assets/fantasyRig';
type CosmeticSlot='character'|'costume'|'hair'|'animalHat';
const SLOTS:CosmeticSlot[]=['character','costume','hair','animalHat'];
const outfitSlots=(o:Outfit):CosmeticSlot[]=>o.character==='original'?['character','costume']:o.character==='magical-girl'?['character','costume','hair']:o.character==='demon'?['character','costume','hair']:hasDetailedCostume(o.character)?(isAnimal(o.character)?['character','costume','animalHat']:['character','costume']):isAnimal(o.character)?['character','animalHat']:['character'];
const baseOptions=(o:Outfit)=>o.character==='original'?COSTUMES:[{id:'classic',name:'Base · 16-bit'}];
const characterCostumes=(o:Outfit)=>[...baseOptions(o),...(['pogo','aria'].includes(o.character)?[]:[{id:'retro',name:'Retro · 8-bit Special'}])];
const equipmentOptions=(s:CosmeticSlot,_o:Outfit)=>s==='character'?COSMETICS.character:s==='hair'?(_o.character==='magical-girl'?MAGICAL_HAIR:DEMON_HAIRS):s==='animalHat'?ANIMAL_HATS:characterCostumes(_o);
const selectedPiece=(s:CosmeticSlot,o:Outfit)=>s==='character'?o.character:s==='hair'?o.hair:s==='animalHat'?o.animalHat??'none':o.retroCostumes?.includes(o.character)?'retro':o.character==='original'?o.costume??'classic':'classic';
const cosmeticName=(s:CosmeticSlot,id:string,o:Outfit)=>equipmentOptions(s,o).find(p=>p.id===id)?.name??id;
const candidateOutfit=(o:Outfit,s:CosmeticSlot,id:string):Outfit=>sanitizeOutfit(s==='costume'?{...o,...(o.character==='original'?costumeFields(id==='retro'?'classic':id):{}),retroCostumes:[...(o.retroCostumes??[]).filter(c=>c!==o.character),...(id==='retro'?[o.character]:[])]}:s==='hair'?{...o,hair:id}:s==='animalHat'?{...o,animalHat:id}:{...o,character:id});
import { GAME_HEIGHT, GAME_WIDTH } from "../game/constants";
import { createLobbyPlayer, stepLobbyPlayer, resizeLobbyPlayer, LOBBY_SPRITE_SCALE } from "../game/lobbyPhysics";
import { PLAYER_HEIGHT, PLAYER_WIDTH } from "../../../server/src/sim/constants";

const PREFIXES = ["Hot", "Iron", "Swift", "Ashen", "Bold", "Tiny", "Clever", "Coal"];
const NAMES = ["Tongs", "Hammer", "Rivet", "Boots", "Bellows", "Spark", "Anvil", "Helm"];
const randomName = () => `${PREFIXES[Math.floor(Math.random() * PREFIXES.length)]} ${NAMES[Math.floor(Math.random() * NAMES.length)]}`;

export class MenuScene extends Phaser.Scene {
  private expeditionInteraction?:ReturnType<typeof createExpeditionInteraction>;
  private partyUi?:ReturnType<typeof createPartyUi>;
  private removeMissions?:()=>void;
  private removeSettings?:()=>void;
  private mapIndex = 0;
  private wallpaperId = 'forged-command';
  private wallpapers?:ReturnType<typeof createWallpapers>;
  private removeScoresDismiss?:()=>void;
  private lobbySurfaces:Platform[]=[];
  private surfaceRefreshAt=0;
  private background!: Phaser.GameObjects.Image;
  private shade!: Phaser.GameObjects.Rectangle;
  private ui?: HTMLDivElement;
  private form?: HTMLFormElement;
  private preview!: Phaser.GameObjects.Sprite;
  private wardrobeOpen = false;
  private goldStore?: HTMLDialogElement;
  private lootBox?:ReturnType<typeof createLootBox>;
  private activeSlot: CosmeticSlot = "costume";
  private outfit: Outfit = loadOutfit();
  private animationPrefix = "";
  private held = false;
  private velocity = 0;
  private airborne = false;
  private landUntil = 0;
  private lobbyPlayer = createLobbyPlayer();
  private movement = new Set<string>();
  private accumulator = 0;
  private lobbyHeight = GAME_HEIGHT;
  private removeControls?: () => void;
  constructor() { super("Menu"); }

  preload(): void {
    const report = (value: number) => window.dispatchEvent(new CustomEvent('jump-loading', {
      detail: { percent: 90 + value * 9, label: 'Preparing the lobby' }
    }));
    report(0);
    this.load.on(Phaser.Loader.Events.PROGRESS, report);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => this.load.off(Phaser.Loader.Events.PROGRESS, report));
    for(const w of WALLPAPERS)if(!this.textures.exists(w.id))this.load.image(w.id,import.meta.env.BASE_URL+'assets/menu/'+w.image);
    if (!this.textures.exists('forged-command')) this.load.image('forged-command',import.meta.env.BASE_URL+'assets/menu/forged-command/background.png');
  }

  create(): void {
    for(const wallpaper of WALLPAPERS)if(isExpedition(wallpaper.id))this.textures.get(wallpaper.id).setFilter(Phaser.Textures.FilterMode.LINEAR);
    this.input.keyboard?.disableGlobalCapture();
    this.wallpaperId=equippedWallpaper();
    this.wardrobeOpen = false; this.activeSlot = "costume";
    this.held = false; this.velocity = 0; this.airborne = false; this.landUntil = 0;
    this.lobbyPlayer = createLobbyPlayer(GAME_WIDTH,GAME_HEIGHT); this.lobbyHeight=GAME_HEIGHT; this.movement.clear(); this.accumulator = 0;
    this.outfit = playableOutfit(this.registry.get("outfit") ?? loadOutfit());
    this.cameras.main.setBackgroundColor("#0d0b10");
    this.background = this.add.image(GAME_WIDTH/2,GAME_HEIGHT,this.wallpaperId).setOrigin(0.5,1).setDepth(-3);
    this.shade = this.add.rectangle(0,0,GAME_WIDTH,GAME_HEIGHT,0x06101b,0.08).setOrigin(0).setDepth(-2);
    this.animationPrefix = outfitTexture(this,this.outfit);

    this.preview = this.add.sprite(this.lobbyPlayer.x+PLAYER_WIDTH/2,this.lobbyPlayer.y+PLAYER_HEIGHT,this.animationPrefix).setOrigin(0.5,footOrigin(this,this.animationPrefix)).setScale(spriteScale(this,this.animationPrefix,28*LOBBY_SPRITE_SCALE));
    this.preview.play(`${this.animationPrefix}-idle`);
    this.mapIndex = Math.max(0,MAPS.findIndex(map=>map.id===this.registry.get("mapId")));
    this.createMenuUi(); this.createMapSelector(); this.createScores(); this.composeForgedUi(); this.installPreviewControls(); this.refreshSurfaces();
    this.placeOnPedestal();
    window.dispatchEvent(new Event("jump-ready"));
    this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>this.cleanup());
  }

  private pedestal(): Platform {
    const expedition=expeditionPlatform(this.wallpaperId,GAME_WIDTH,GAME_HEIGHT);if(expedition)return expedition;
    if(this.wallpaperId==='starlight')return {id:'forged-pedestal',x:0,y:GAME_HEIGHT*.585,w:GAME_WIDTH*.55,h:12,type:'stone'};
    if(this.wallpaperId!=='forged-command')return {id:'forged-pedestal',x:GAME_WIDTH*.12,y:GAME_HEIGHT*.585,w:GAME_WIDTH*.43,h:12,type:'stone'};
    const compact=window.innerWidth<760;
    return {id:'forged-pedestal',x:GAME_WIDTH*(compact?.06:.18),y:GAME_HEIGHT*.695,w:GAME_WIDTH*(compact?.32:.36),h:12,type:'stone'};
  }

  private placeOnPedestal():void {
    this.preview?.setRotation(0);
    if(this.wallpaperId==='moonwalk'){resetMoon(this.lobbyPlayer);stepMoon(this.lobbyPlayer,0,GAME_WIDTH,GAME_HEIGHT);return;}
    const p=this.pedestal();
    Object.assign(this.lobbyPlayer,{x:p.x+p.w/2-PLAYER_WIDTH/2,y:p.y-PLAYER_HEIGHT,vx:0,vy:0,grounded:true,groundedPlatformId:p.id});
  }

  private composeForgedUi():void {
    const ui=this.ui!;ui.classList.add('forged-command');
    const rail=document.createElement('nav');rail.className='forge-rail';rail.setAttribute('aria-label','Home navigation');
    const brand=ui.querySelector('.menu-title')!;
    brand.innerHTML=`<img class="forge-logo" src="${import.meta.env.BASE_URL}assets/menu/forged-command/logo.png" alt="" draggable="false">`;
    const wardrobe=ui.querySelector('.wardrobe-toggle:not(.w2-toggle)')!;
    wardrobe.querySelector('.wardrobe-art')!.innerHTML=`<img class="forge-helmet" src="${import.meta.env.BASE_URL}assets/menu/forged-command/helmet.png" alt="" draggable="false">`;
    wardrobe.insertAdjacentHTML('beforeend','<span class="forge-nav-label">Wardrobe</span>');
    const workshop=document.createElement('button');workshop.type='button';workshop.className='editor-launch';workshop.setAttribute('aria-label','Map Workshop');
    workshop.innerHTML=`<img class="forge-workshop-icon" src="${import.meta.env.BASE_URL}assets/menu/forged-command/platform.png" alt="" draggable="false"><span class="forge-nav-label">Map Workshop</span>`;
    workshop.addEventListener('click',()=>this.scene.start('Editor',{mapId:MAPS[this.mapIndex]?.id??'forest'}));
    const navigation=document.createElement('div');navigation.className='forge-main-buttons';navigation.append(wardrobe,ui.querySelector('.personal-scores')!,workshop);
    rail.append(brand,navigation,ui.querySelector('.ranked-splash')!);
    rail.querySelector('.ranked-splash')!.innerHTML='<span aria-hidden="true">♛</span><span>RANKED<small>Coming soon</small></span>';
    rail.querySelector('.scores-toggle')!.innerHTML=`<img class="forge-score-icon" src="${import.meta.env.BASE_URL}assets/menu/forged-command/scores.png" alt="" draggable="false">Leaderboards`;
    rail.querySelector('.scores-toggle')!.setAttribute('aria-label','Leaderboards');
    const mission=document.createElement('section');mission.className='forge-mission';mission.setAttribute('aria-label','Prepare your climb');
    mission.innerHTML='<div class="forge-eyebrow"><span>'+String(this.mapIndex+1).padStart(2,'0')+' / '+String(MAPS.length+2).padStart(2,'0')+'</span></div>';
    mission.append(ui.querySelector('.map-selector')!,this.form!);
    this.form!.querySelector('input')!.insertAdjacentHTML('beforebegin','<label for="climber-name">NAME</label>');
    this.form!.querySelector('button')!.innerHTML='<span>Start</span>';
    const resources=document.createElement('div');resources.className='forge-resources';
    const coffee=document.createElement('a');coffee.className='coffee-link';coffee.href='https://buymeacoffee.com/ariakawa';coffee.target='_blank';coffee.rel='noopener noreferrer';coffee.setAttribute('aria-label','Buy me a coffee (opens in a new tab)');coffee.title='Buy me a coffee';
    const coffeeIcon=document.createElement('img');coffeeIcon.className='coffee-icon';coffeeIcon.src=import.meta.env.BASE_URL+'assets/menu/coffee-cup.png';coffeeIcon.alt='';coffeeIcon.draggable=false;coffee.append(coffeeIcon);
    resources.append(ui.querySelector('.gold-marker')!,ui.querySelector('.loot-toggle')!,coffee,ui.querySelector('.settings-cog')!);
    const note=document.createElement('p');note.className='forge-controls';note.innerHTML='<span>A / D</span> MOVE <i>·</i> HOLD <span>SPACE</span> TO JUMP';
    ui.append(rail,resources,mission,note);
    this.wallpapers=createWallpapers(this,ui,id=>{this.wallpaperId=id;this.background.setTexture(id);this.layoutUi();this.expeditionInteraction?.setWallpaper(id);this.held=false;this.movement.clear();this.placeOnPedestal();this.refreshSurfaces();});
    this.expeditionInteraction=createExpeditionInteraction(this,ui,this.lobbyPlayer,()=>({width:GAME_WIDTH,height:GAME_HEIGHT}));this.expeditionInteraction.setWallpaper(this.wallpaperId);
    this.partyUi=createPartyUi(this,ui,this.form!,()=>MAPS[this.mapIndex]?.id??'magical',map=>{const name=this.form!.querySelector('input')!.value;this.registry.set('mapId',map);this.scene.start('Game',{name,mapId:map});});
    this.removeMissions=createMissions(ui,()=>{this.renderPurchase();this.lootBox?.refresh();});
    this.layoutUi();
  }

  update(_time: number, delta: number): void {
    if(_time>this.surfaceRefreshAt){this.refreshSurfaces();this.surfaceRefreshAt=_time+200;}
    this.accumulator += Math.min(delta,100)/1000;
    if(this.wardrobeOpen){
      this.accumulator=0;
      this.preview.play(this.animationPrefix+"-idle",true);
      const canvas=this.ui?.querySelector<HTMLCanvasElement>(".wardrobe-stage canvas");
      if(canvas)drawOutfitPreview(this,canvas,this.animationPrefix,Number(this.preview.frame.name));
      return;
    }
    const p = this.lobbyPlayer;
    p.input = { left: this.movement.has('KeyA') || this.movement.has('ArrowLeft'),
      right: this.movement.has('KeyD') || this.movement.has('ArrowRight'), jumpHeld: this.held, seq: 0 };
    const wasGrounded = p.grounded, wasCharging = p.charging;
    while (this.accumulator >= 1/30) {
      if(this.wallpaperId==='moonwalk')this.preview.setRotation(stepMoon(p,1/30,GAME_WIDTH,GAME_HEIGHT,this.lobbySurfaces));
      else stepLobbyPlayer(p,1/30,GAME_WIDTH,GAME_HEIGHT,this.lobbySurfaces,this.wallpaperId==='starlight'||isExpedition(this.wallpaperId));
      this.accumulator -= 1/30;
    }
    audio.step(p.grounded && !p.charging && Math.abs(p.vx)>0);
    if(wasGrounded&&!p.grounded&&p.vy<0)audio.jump(this.outfit.character==='puppy');
    this.airborne = !p.grounded; this.velocity = p.vy; if (p.charging) {
      if (!wasCharging) this.preview.play(this.animationPrefix+'-charge-start').chain(this.animationPrefix+'-charge-loop');
    } else if (!p.grounded) {
      this.preview.chain(); this.preview.play(this.animationPrefix+(p.vy < 0 ? '-jump' : '-fall'),true);
    } else if (!wasGrounded) {
      this.landUntil = this.time.now+180; this.preview.play(this.animationPrefix+'-land');
    } else if (this.time.now >= this.landUntil) this.preview.play(this.animationPrefix+(p.input.left!==p.input.right?'-walk':'-idle'),true);
    this.preview.setFlipX(p.facing < 0);
    this.preview.setOrigin(.5,footOrigin(this,this.animationPrefix,p.grounded?Number(this.preview.frame.name):0));
    this.preview.setPosition(Math.round(p.x+PLAYER_WIDTH/2),Math.round(p.y+PLAYER_HEIGHT));
  }

  private createMenuUi(): void {
    this.ui = document.createElement("div"); this.ui.className = "menu-ui";
    this.ui.innerHTML = `<div class="gold-marker" aria-label="Gold balance"><img src="${import.meta.env.BASE_URL}assets/menu/gold-bars.png" alt="Gold bars"><span class="gold-balance" aria-live="polite"></span><button class="gold-add" type="button" aria-label="Buy gold" title="Buy gold" aria-haspopup="dialog" aria-controls="gold-store"><span class="plus-icon" aria-hidden="true"></span></button></div><h1 class="menu-title" aria-label="Jump Royale"><span>JUMP</span><strong>ROYALE</strong></h1><div class="ranked-splash"><span>Ranked Coming Soon!</span></div><button class="wardrobe-toggle" type="button" aria-label="Open wardrobe" title="Wardrobe" aria-expanded="false" aria-controls="wardrobe-panel"><span class="wardrobe-art" aria-hidden="true"><img src="${import.meta.env.BASE_URL}assets/menu/wardrobe-pixel.png" alt=""><img src="${import.meta.env.BASE_URL}assets/menu/wardrobe-pixel-open.png" alt=""></span></button><form class="menu-form"><input id="climber-name" maxlength="18" autocomplete="off" placeholder="Name" aria-label="Name"><button type="submit">Start</button></form><div class="wardrobe-overlay" hidden><div class="wardrobe-stage"><canvas width="160" height="192" aria-label="Outfit preview"></canvas><div class="wardrobe-plinth"></div></div><section id="wardrobe-panel" class="wardrobe-panel" role="dialog" aria-modal="true" aria-label="Wardrobe"><header><span class="wardrobe-wallet"><img src="${import.meta.env.BASE_URL}assets/menu/gold-bars.png" alt="Gold"><b class="wardrobe-gold-balance"></b></span><button class="wardrobe-close pixel-button" type="button" aria-label="Close wardrobe">&#215;</button></header><div class="wardrobe-tabs" role="tablist" aria-label="Equipment category">${SLOTS.map(slot=>`<button id="tab-${slot}" type="button" role="tab" data-slot="${slot}" aria-controls="equipment-grid" aria-selected="${slot===this.activeSlot}" tabindex="${slot===this.activeSlot?0:-1}">${({character:"Character",costume:"Costumes",hair:"Hairstyles",animalHat:"Hats"})[slot]}</button>`).join("")}</div><div id="equipment-grid" class="equipment-grid" role="tabpanel" aria-labelledby="tab-costume"></div><div class="purchase-bar" aria-live="polite"></div></section></div>`;
    document.getElementById("game")!.appendChild(this.ui);
    this.removeSettings=createSettings(this.ui,()=>{this.held=false;this.movement.clear();this.lobbyPlayer.charging=false;this.lobbyPlayer.charge01=0;if(this.wardrobeOpen)this.setWardrobeOpen(false);});
    this.goldStore=createGoldStore(()=>{
      this.held=false;this.movement.clear();this.lobbyPlayer.charging=false;this.lobbyPlayer.charge01=0;
      this.showOutfit(this.outfit);
    },()=>{this.lootBox?.refresh();this.ui?.querySelector<HTMLButtonElement>(this.lootBox?.open()?'.loot-gold-add':'.gold-add')?.focus();});
    this.ui.appendChild(this.goldStore);
    this.lootBox=createLootBox(this.ui,()=>{if(this.wardrobeOpen)this.setWardrobeOpen(false);this.held=false;this.movement.clear();this.lobbyPlayer.charging=false;this.lobbyPlayer.charge01=0;},()=>this.renderPurchase(),(canvas,item,frame)=>{
      drawLootIcon(this,canvas,item,frame);
    },()=>this.goldStore!.dispatchEvent(new Event('gold-store-open')));
    this.ui.querySelector('.gold-add')!.addEventListener('click',()=>this.goldStore!.dispatchEvent(new Event('gold-store-open')));
    this.form = this.ui.querySelector("form")!;
    const nameInput=this.form.querySelector("input")!;
    try { nameInput.value=localStorage.getItem("forge-climber-name") || randomName(); } catch { nameInput.value=randomName(); }
    nameInput.value=safePlayerName(nameInput.value);
    const moderate=()=>{if(!isBadName(nameInput.value))return false;nameInput.value='';nameInput.placeholder=nameRebuke();try{localStorage.removeItem('forge-climber-name');}catch{}return true;};
    nameInput.addEventListener('input',event=>{if(!(event as InputEvent).isComposing)moderate();});
    nameInput.addEventListener('compositionend',moderate);
    this.ui.querySelector(".wardrobe-toggle")!.addEventListener("click",()=>this.setWardrobeOpen(true));
    this.ui.querySelector(".wardrobe-close")!.addEventListener("click",()=>this.setWardrobeOpen(false));
    const overlay=this.ui.querySelector(".wardrobe-overlay")!;
    overlay.addEventListener("click",event=>{if(!(event.target as Element).closest('.wardrobe-panel'))this.setWardrobeOpen(false);});
    this.ui.querySelectorAll<HTMLButtonElement>(".wardrobe-overlay [role=tab]").forEach(tab=>{
      tab.addEventListener("click",()=>this.selectSlot(tab.dataset.slot as CosmeticSlot));

    });
    this.ui.addEventListener("keydown",event=>{
      if(!this.wardrobeOpen)return;
      if(event.key==="Escape"){event.preventDefault();event.stopPropagation();this.setWardrobeOpen(false);}
      if(event.key==="Tab"){
        const buttons=Array.from(this.ui!.querySelectorAll<HTMLElement>(".wardrobe-overlay .wardrobe-panel button:not([tabindex='-1']):not([hidden]),.wardrobe-overlay .equipment-grid"));
        const first=buttons[0],last=buttons[buttons.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    });
    this.form.addEventListener("submit",event=>{
      event.preventDefault();
      if(this.mapIndex>=MAPS.length || this.wallpapers?.open())return;
      if(moderate())return;
      if(this.partyUi?.submit())return;
      this.showOutfit(this.outfit);
      const name=nameInput.value.trim() || randomName();
      try { localStorage.setItem("forge-climber-name",name); } catch { /* Session name remains usable. */ }
      this.registry.set("outfit",this.outfit); saveOutfit(this.outfit);
      this.registry.set("mapId",MAPS[this.mapIndex].id);
      this.scene.start("Game",{name,mapId:MAPS[this.mapIndex].id});
    });
    this.renderEquipment();
    this.layoutUi(); this.scale.on(Phaser.Scale.Events.RESIZE,this.layoutUi,this);
  }
  private createMapSelector(): void {
    const panel=document.createElement('section');panel.className='map-selector';panel.setAttribute('aria-label','Choose map');
    panel.innerHTML='<div class="map-carousel"><button type="button" class="map-arrow" aria-label="Previous map">&#8249;</button><div class="map-window"><div class="map-track"></div></div><button type="button" class="map-arrow" aria-label="Next map">&#8250;</button></div><div class="map-caption" aria-live="polite"></div><div class="map-dots" aria-hidden="true"></div>';
    this.ui!.appendChild(panel);
    const track=panel.querySelector<HTMLElement>('.map-track')!;
    for(const map of MAPS){
      const image=document.createElement('img');
      image.src=import.meta.env.BASE_URL+(map.id==='jungle'?'assets/jungle-hd/background.webp':'assets/menu/map-previews/'+map.id+'.png');
      image.alt=map.name+' scenery preview';image.draggable=false;
      track.appendChild(image);
    }
    for(let i=0;i<2;i++){const card=document.createElement('div');card.className='map-coming-soon';card.setAttribute('aria-label','Locked map '+(i+1)+' — Coming soon');card.innerHTML='<span><b aria-hidden="true">🔒</b>COMING SOON</span>';track.append(card);}
    const total=MAPS.length+2;
    const render=()=>{
      const map=MAPS[this.mapIndex];if(map)this.registry.set('mapId',map.id);
      const start=this.form!.querySelector<HTMLButtonElement>('button')!;start.disabled=!map;start.innerHTML=map?'<span>Start</span>':'<span>Coming soon</span>';
      panel.dataset.locked=String(!map);
      const counter=this.ui?.querySelector('.forge-eyebrow span:last-child');if(counter)counter.textContent=String(this.mapIndex+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
      track.style.transform='translateX(-'+this.mapIndex*100+'%)';
      panel.querySelector('.map-caption')!.innerHTML='<h2>'+(map?.name??'Coming soon')+'</h2>';
      panel.querySelector('.map-dots')!.textContent=Array.from({length:total},(_,i)=>i===this.mapIndex?'●':'○').join('  ');
    };
    panel.querySelectorAll('button').forEach((button,i)=>button.addEventListener('click',()=>{this.mapIndex=(this.mapIndex+(i?1:-1)+total)%total;render();}));
    render();
  }
  private createScores():void {this.removeScoresDismiss=createLeaderboards(this.ui!,()=>this.form!.querySelector('input')!.value.trim()||'You');}
  private refreshSurfaces():void {
    const canvas=this.game.canvas.getBoundingClientRect();
    if(!canvas.width || !this.ui)return;
    const sx=GAME_WIDTH/canvas.width,sy=GAME_HEIGHT/canvas.height;
    this.lobbySurfaces=this.wallpaperId==='moonwalk'?[]:[this.pedestal()];
    const add=(r:DOMRect)=>{if(r.width>0&&r.height>0)this.lobbySurfaces.push({id:'ui-'+this.lobbySurfaces.length,x:(r.left-canvas.left)*sx,y:(r.top-canvas.top)*sy,w:r.width*sx,h:4,type:'stone'});};
    this.ui.querySelectorAll<HTMLElement>('button,a.coffee-link,.loot-toggle,.gold-marker img,.gold-balance,.lobby-object,.wardrobe-art,.menu-form input,.map-window').forEach(e=>{if(!e.closest('[hidden],dialog:not([open])')&&getComputedStyle(e).visibility!=='hidden')add(e.getBoundingClientRect());});
    this.ui.querySelectorAll<HTMLElement>('.ranked-splash span,.menu-title span,.menu-title strong,.menu-form label,.map-caption h2,.scores-toggle,.scores-popover p,.personal-scores h2,.personal-scores strong,.personal-scores span,.personal-scores small,.lobby-steps span').forEach(e=>{
      for(const node of e.childNodes)if(node.nodeType===Node.TEXT_NODE)for(let i=0;i<(node.textContent?.length??0);i++) {
        if(!node.textContent![i].trim())continue;
        const range=document.createRange();range.setStart(node,i);range.setEnd(node,i+1);add(range.getBoundingClientRect());
      }
    });
  }
  private setWardrobeOpen(open: boolean): void {
    audio.play('wardrobe',.22);
    this.showOutfit(this.outfit);
    this.wardrobeOpen=open;this.preview.setVisible(!open);this.held=false;this.movement.clear();
    this.ui!.classList.toggle('forge-wardrobe-open',open);
    this.ui!.querySelectorAll<HTMLElement>('.forge-rail,.forge-resources,.forge-mission').forEach(e=>e.inert=open);
    this.ui!.querySelectorAll<HTMLElement>('.menu-title,.ranked-splash,.lobby-steps,.lobby-objects,.personal-scores').forEach(e=>e.hidden=open);
    this.lobbyPlayer.charging=false;this.lobbyPlayer.charge01=0;
    (this.ui!.querySelector(".wardrobe-overlay") as HTMLElement).hidden=!open;
    this.form!.hidden=open;
    (this.ui!.querySelector(".map-selector") as HTMLElement).hidden=open;
    const toggle=this.ui!.querySelector<HTMLButtonElement>(".wardrobe-toggle")!;
    toggle.setAttribute("aria-expanded",String(open));toggle.inert=open;
    this.refreshSurfaces();
    if(open)this.ui!.querySelector<HTMLButtonElement>(`#tab-${this.activeSlot}`)!.focus();else this.game.canvas.focus({preventScroll:true});
  }
  private selectSlot(slot: CosmeticSlot): void {
    this.showOutfit(this.outfit);
    this.activeSlot=slot;
    this.ui!.querySelectorAll<HTMLButtonElement>(".wardrobe-overlay [role=tab]").forEach(tab=>{
      const selected=tab.dataset.slot===slot;tab.setAttribute("aria-selected",String(selected));tab.tabIndex=selected?0:-1;
    });
    this.renderEquipment();
  }
  private renderEquipment(): void {
    const grid=this.ui!.querySelector<HTMLDivElement>(".equipment-grid")!;
    grid.setAttribute("aria-labelledby",`tab-${this.activeSlot}`);
    this.updateTabs();this.renderPurchase();
    if(!outfitSlots(this.outfit).includes(this.activeSlot)) {this.selectSlot('character');return;}
    grid.tabIndex=0;
    grid.innerHTML=[...equipmentOptions(this.activeSlot,this.outfit)].sort((a,b)=>itemRarity(this.shopSlot(a.id),this.shopId(a.id))-itemRarity(this.shopSlot(b.id),this.shopId(b.id))).map(piece=>`<button type="button" class="equipment-card" data-owned="${owns(this.shopSlot(piece.id),this.shopId(piece.id))}" data-piece="${piece.id}" aria-label="${cosmeticName(this.activeSlot,piece.id,this.outfit)}" aria-description="${owns(this.shopSlot(piece.id),this.shopId(piece.id))?'Owned':price(this.shopSlot(piece.id),this.shopId(piece.id))+' gold'}" aria-pressed="${selectedPiece(this.activeSlot,this.outfit)===piece.id}"><canvas width="64" height="64" aria-hidden="true"></canvas><span class="equipment-name">${cosmeticName(this.activeSlot,piece.id,this.outfit)}</span><span class="equipment-price">${owns(this.shopSlot(piece.id),this.shopId(piece.id))?(selectedPiece(this.activeSlot,this.outfit)===piece.id?'Equipped':'Equip'):`<img src="${import.meta.env.BASE_URL}assets/menu/gold-bars.png" alt="Gold"> <b>${price(this.shopSlot(piece.id),this.shopId(piece.id))}</b><small>Buy</small>`}</span></button>`).join("");
    grid.querySelectorAll<HTMLButtonElement>("button").forEach(button=>{
      const id=button.dataset.piece!;
      this.drawEquipmentIcon(button.querySelector("canvas")!,this.activeSlot,id);
      const candidate=candidateOutfit(this.outfit,this.activeSlot,id);
      const preview=()=>{if(owns(this.shopSlot(id),this.shopId(id)))this.showOutfit(candidate);};
      const restore=()=>this.showOutfit(this.outfit);
      button.addEventListener('pointerenter',preview);
      button.addEventListener('pointerleave',restore);


      button.addEventListener("click",()=>{
        const slot=this.shopSlot(id),purchaseId=this.shopId(id);
        if(!owns(slot,purchaseId)&&!buy(slot,purchaseId)) {
          this.ui!.querySelector('.purchase-bar')!.textContent=wallet().gold<price(slot,purchaseId)?'Not enough gold.':'Purchase could not be saved on this browser.';
          return;
        }
        this.outfit=candidate;
        saveOutfit(this.outfit);this.registry.set('outfit',this.outfit);
        this.showOutfit(this.outfit);this.renderEquipment();
      });
    });
  }
  private shopSlot(id?:string):string {return this.activeSlot==='costume'?(id==='retro'?'retroCostume':'costume'):this.activeSlot;}
  private shopId(id:string):string {return this.activeSlot==='costume'&&id==='retro'?this.outfit.character:id;}
  private showOutfit(outfit:Outfit):void {
    const stage=this.ui?.querySelector<HTMLElement>(".wardrobe-stage");if(stage)stage.dataset.outfit=JSON.stringify(outfit);
    this.animationPrefix=outfitTexture(this,outfit);
    this.preview.stop().chain();this.preview.setTexture(this.animationPrefix,0);
    this.preview.setOrigin(.5,footOrigin(this,this.animationPrefix)).setScale(spriteScale(this,this.animationPrefix,this.previewHeight()));
    this.preview.play(`${this.animationPrefix}-${this.airborne?this.velocity<0?'jump':'fall':'idle'}`);
  }
  private renderPurchase():void {
    this.ui!.querySelector('.gold-balance')!.textContent=String(wallet().gold);
    this.ui!.querySelector('.wardrobe-gold-balance')!.textContent=String(wallet().gold);
    this.lootBox?.refresh();
    this.ui!.querySelector('.purchase-bar')!.replaceChildren();
  }
  private updateTabs():void {
    this.ui!.querySelectorAll<HTMLButtonElement>('.wardrobe-overlay [role=tab]').forEach(tab=>{
      tab.hidden=!outfitSlots(this.outfit).includes(tab.dataset.slot as CosmeticSlot);
    });
  }
  private drawEquipmentIcon(canvas: HTMLCanvasElement,slot: CosmeticSlot,id: string): void {
    const sample=candidateOutfit(this.outfit,slot,id);
    const key=outfitTexture(this,sample);
    drawOutfitPreview(this,canvas,key);
  }

  private previewHeight():number {return Math.min(GAME_HEIGHT*(this.wallpaperId==='moonwalk'?.18:this.wallpaperId==='corsair-cove'?.23:.315),GAME_WIDTH*.1925);}
  private layoutBackground():void {
    const width=this.wallpaperId==='moonwalk'?GAME_HEIGHT*1.5:GAME_WIDTH;
    this.background.setPosition(GAME_WIDTH/2,GAME_HEIGHT).setDisplaySize(width,GAME_HEIGHT);
  }
  private layoutUi(): void {
    if (!this.ui) return;
    const rect=this.game.canvas.getBoundingClientRect();
    this.layoutBackground();
    this.shade.setSize(GAME_WIDTH,GAME_HEIGHT);
    Object.assign(this.ui.style,{width:rect.width+'px',height:rect.height+'px',left:rect.left+'px',top:rect.top+'px'});
    const onPedestal=this.lobbyPlayer.groundedPlatformId==='forged-pedestal';
    resizeLobbyPlayer(this.lobbyPlayer,GAME_WIDTH,GAME_HEIGHT,this.lobbyHeight);this.lobbyHeight=GAME_HEIGHT;
    if(onPedestal||this.wallpaperId==='moonwalk')this.placeOnPedestal();
    this.preview.setScale(spriteScale(this,this.animationPrefix,this.previewHeight()));
    this.refreshSurfaces();
  }
  private installPreviewControls(): void {
    const canvas=this.game.canvas; canvas.tabIndex=0;
    const editing=()=>document.activeElement?.matches("input,select,textarea,[contenteditable='true']") ?? false;
    const modalOpen=()=>!!document.querySelector('dialog[open],.wardrobe-overlay:not([hidden])');
    const down=(event:KeyboardEvent)=>{
      if(modalOpen() || editing() || event.ctrlKey || event.metaKey || event.altKey)return;
      // A/D and arrows remain game controls when a menu button has keyboard focus.
      // Space still activates a keyboard-focused button; pointer clicks return focus below.
      if(event.code==='Space'&&document.activeElement?.matches('button'))return;
      if(["Space","ArrowLeft","ArrowRight","KeyA","KeyD"].includes(event.code))event.preventDefault();
      if(event.code==="Space")this.held=true;
      this.movement.add(event.code);
    };
    const up=(event:KeyboardEvent)=>{
      if(event.code==="Space"){if(this.held&&!editing())event.preventDefault();this.held=false;}
      this.movement.delete(event.code);
    };
    const cancel=()=>{this.held=false;this.movement.clear();this.lobbyPlayer.charging=false;this.lobbyPlayer.charge01=0;};
    const focus=()=>{if(editing()||modalOpen())cancel();};
    const returnPointerFocus=(event:MouseEvent)=>{
      if(event.detail===0||(event.target as Element)?.closest('input,select,textarea,[contenteditable=true]'))return;
      queueMicrotask(()=>{if(this.scene.isActive()&&!modalOpen()&&!editing())canvas.focus({preventScroll:true});});
    };
    const visible=()=>{if(document.hidden)cancel();};
    const unfocusName=(event:PointerEvent)=>{
      const active=document.activeElement;
      if(event.button===0 && active===this.form?.querySelector('input') && event.target!==active) {
        (active as HTMLInputElement).blur();
        if(!(event.target as Element)?.closest('button,input,select,textarea,[contenteditable=true]'))canvas.focus({preventScroll:true});
      }
    };
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);window.addEventListener("blur",cancel);
    document.addEventListener("focusin",focus);document.addEventListener("visibilitychange",visible);
    document.addEventListener('pointerdown',unfocusName,true);
    document.addEventListener('click',returnPointerFocus);
    this.removeControls=()=>{window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);window.removeEventListener("blur",cancel);document.removeEventListener("focusin",focus);document.removeEventListener("visibilitychange",visible);document.removeEventListener('pointerdown',unfocusName,true);document.removeEventListener('click',returnPointerFocus);};
  }
  private cleanup(): void {
    this.partyUi?.destroy();this.removeMissions?.();
    this.wallpapers?.destroy();this.wallpapers=undefined;this.removeScoresDismiss?.();this.removeScoresDismiss=undefined;
    this.expeditionInteraction?.destroy();this.expeditionInteraction=undefined;
    this.removeSettings?.();this.removeSettings=undefined;
    this.removeControls?.();this.removeControls=undefined;this.scale.off(Phaser.Scale.Events.RESIZE,this.layoutUi,this);
    this.lootBox?.destroy();this.lootBox=undefined;
    this.goldStore?.remove();this.goldStore=undefined;
    this.ui?.remove();this.ui=undefined;this.form=undefined;this.held=false;
  }
}

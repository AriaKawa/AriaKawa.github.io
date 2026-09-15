import {createWardrobe2} from '../game/wardrobe2Ui';
import {createSettings,settingsOpen} from '../game/settings';
import {isBadName, nameRebuke, safePlayerName} from '../../../server/src/sim/names';
import {drawMountainPreview} from '../game/mountainArt';
import {createGoldStore} from '../game/goldStore';
import {audio} from '../game/audio';
import {wallet,owns,buy,price,playableOutfit} from '../game/economy';
import { loadScores, loadWins, scoreTime } from '../game/scores';
import type { Platform } from '../../../server/src/sim/types';
import { drawSnowPreview } from "../game/snowArt";
import { MAPS } from "../../../server/src/sim/maps";
import { drawJunglePreview } from "../game/jungleArt";
import Phaser from "phaser";
import { ASSETS } from "../assets/assetManifest";
import { SLOTS, loadOutfit, saveOutfit, outfitTexture, cosmeticName, pieceKey, outfitSlots, equipmentOptions, selectedPiece, type CosmeticSlot, type Outfit } from "../assets/cosmetics";
import {isAnimal} from '../assets/animalRig';
import { GAME_HEIGHT, GAME_WIDTH } from "../game/constants";
import { createLobbyPlayer, stepLobbyPlayer, resizeLobbyPlayer, LOBBY_SPRITE_SCALE } from "../game/lobbyPhysics";
import { PLAYER_HEIGHT, PLAYER_WIDTH } from "../../../server/src/sim/constants";

const PREFIXES = ["Hot", "Iron", "Swift", "Ashen", "Bold", "Tiny", "Clever", "Coal"];
const NAMES = ["Tongs", "Hammer", "Rivet", "Boots", "Bellows", "Spark", "Anvil", "Helm"];
const randomName = () => `${PREFIXES[Math.floor(Math.random() * PREFIXES.length)]} ${NAMES[Math.floor(Math.random() * NAMES.length)]}`;

export class MenuScene extends Phaser.Scene {
  private removeSettings?:()=>void;
  private mapIndex = 0;
  private lobbySurfaces:Platform[]=[];
  private surfaceRefreshAt=0;
  private background!: Phaser.GameObjects.Image;
  private shade!: Phaser.GameObjects.Rectangle;
  private ui?: HTMLDivElement;
  private form?: HTMLFormElement;
  private preview!: Phaser.GameObjects.Sprite;
  private wardrobeOpen = false;
  private wardrobe2?:ReturnType<typeof createWardrobe2>;
  private goldStore?: HTMLDialogElement;
  private activeSlot: CosmeticSlot = "helmet";
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

  create(): void {
    this.input.keyboard?.disableGlobalCapture();
    this.wardrobeOpen = false; this.activeSlot = "helmet";
    this.held = false; this.velocity = 0; this.airborne = false; this.landUntil = 0;
    this.lobbyPlayer = createLobbyPlayer(GAME_WIDTH,GAME_HEIGHT); this.lobbyHeight=GAME_HEIGHT; this.movement.clear(); this.accumulator = 0;
    this.outfit = playableOutfit(this.registry.get("outfit") ?? loadOutfit());
    this.cameras.main.setBackgroundColor("#0d0b10");
    this.background = this.add.image(GAME_WIDTH/2,GAME_HEIGHT,ASSETS.background.key).setOrigin(0.5,1);
    this.shade = this.add.rectangle(0,0,GAME_WIDTH,GAME_HEIGHT,0x06101b,0.64).setOrigin(0);
    this.animationPrefix = outfitTexture(this,this.outfit);
    const frameHeight=this.textures.get(this.animationPrefix).get(0).height;
    this.preview = this.add.sprite(this.lobbyPlayer.x+PLAYER_WIDTH/2,this.lobbyPlayer.y+PLAYER_HEIGHT,this.animationPrefix).setOrigin(0.5,this.outfit.wardrobe2?31/32:(frameHeight-1)/frameHeight).setScale(LOBBY_SPRITE_SCALE*(this.outfit.wardrobe2?32/frameHeight:1)).setInteractive({useHandCursor:true});
    this.preview.play(`${this.animationPrefix}-idle`);
    this.mapIndex = Math.max(0,MAPS.findIndex(map=>map.id===this.registry.get("mapId")));
    this.createMenuUi(); this.createMapSelector(); this.createScores(); this.installPreviewControls(); this.refreshSurfaces();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>this.cleanup());
  }

  update(_time: number, delta: number): void {
    if(_time>this.surfaceRefreshAt){this.refreshSurfaces();this.surfaceRefreshAt=_time+200;}
    this.accumulator += Math.min(delta,100)/1000;
    const p = this.lobbyPlayer;
    p.input = { left: this.movement.has('KeyA') || this.movement.has('ArrowLeft'),
      right: this.movement.has('KeyD') || this.movement.has('ArrowRight'), jumpHeld: this.held, seq: 0 };
    const wasGrounded = p.grounded, wasCharging = p.charging;
    while (this.accumulator >= 1/30) { stepLobbyPlayer(p,1/30,GAME_WIDTH,GAME_HEIGHT,this.lobbySurfaces); this.accumulator -= 1/30; }
    audio.step(p.grounded && p.input.left!==p.input.right);
    if(wasGrounded&&!p.grounded&&p.vy<0)audio.jump(this.outfit.character==='puppy');
    this.airborne = !p.grounded; this.velocity = p.vy; if (p.charging) {
      if (!wasCharging) this.preview.play(this.animationPrefix+'-charge-start').chain(this.animationPrefix+'-charge-loop');
    } else if (!p.grounded) {
      this.preview.chain(); this.preview.play(this.animationPrefix+(p.vy < 0 ? '-jump' : '-fall'),true);
    } else if (!wasGrounded) {
      this.landUntil = this.time.now+180; this.preview.play(this.animationPrefix+'-land');
    } else if (this.time.now >= this.landUntil) this.preview.play(this.animationPrefix+(p.input.left!==p.input.right?'-walk':'-idle'),true);
    this.preview.setFlipX(p.facing < 0);
    this.preview.setPosition(Math.round(p.x+PLAYER_WIDTH/2),Math.round(p.y+PLAYER_HEIGHT));
  }

  private createMenuUi(): void {
    this.ui = document.createElement("div"); this.ui.className = "menu-ui";
    this.ui.innerHTML = `<div class="gold-marker" aria-label="Gold balance"><img src="${import.meta.env.BASE_URL}assets/menu/gold-bars.png" alt="Gold bars"><span class="gold-balance" aria-live="polite"></span><button class="gold-add" type="button" aria-label="Buy gold" title="Buy gold" aria-haspopup="dialog" aria-controls="gold-store"><span class="plus-icon" aria-hidden="true"></span></button></div><h1 class="menu-title" aria-label="Jump Royale"><span>JUMP</span><strong>ROYALE</strong></h1><div class="ranked-splash"><span>Ranked Coming Soon!</span></div><button class="wardrobe-toggle" type="button" aria-label="Open wardrobe" title="Wardrobe" aria-expanded="false" aria-controls="wardrobe-panel"><span class="wardrobe-art" aria-hidden="true"><img src="${import.meta.env.BASE_URL}assets/menu/wardrobe-pixel.png" alt=""><img src="${import.meta.env.BASE_URL}assets/menu/wardrobe-pixel-open.png" alt=""></span></button><form class="menu-form"><input id="climber-name" maxlength="18" autocomplete="off" placeholder="Name" aria-label="Climber name"><button type="submit">Start the Climb</button></form><div class="wardrobe-overlay" hidden><section id="wardrobe-panel" class="wardrobe-panel" role="dialog" aria-modal="true" aria-label="Wardrobe"><header><button class="wardrobe-close pixel-button" type="button" aria-label="Close wardrobe">&#215;</button></header><div class="wardrobe-tabs" role="tablist" aria-label="Equipment category">${SLOTS.map(slot=>`<button id="tab-${slot}" type="button" role="tab" data-slot="${slot}" aria-controls="equipment-grid" aria-selected="${slot===this.activeSlot}" tabindex="${slot===this.activeSlot?0:-1}">${({character:"Character",helmet:"Helmets",shirt:"Shirts",pants:"Pants",hair:"Hairstyles"})[slot]}</button>`).join("")}</div><div id="equipment-grid" class="equipment-grid" role="tabpanel" aria-labelledby="tab-helmet"></div><div class="purchase-bar" aria-live="polite"></div></section></div>`;
    document.getElementById("game")!.appendChild(this.ui);
    this.removeSettings=createSettings(this.ui,()=>{this.held=false;this.movement.clear();this.lobbyPlayer.charging=false;this.lobbyPlayer.charge01=0;if(this.wardrobeOpen)this.setWardrobeOpen(false);});
    this.goldStore=createGoldStore(()=>{
      this.held=false;this.movement.clear();this.lobbyPlayer.charging=false;this.lobbyPlayer.charge01=0;
      this.showOutfit(this.outfit);
    },()=>this.ui?.querySelector<HTMLButtonElement>('.gold-add')?.focus());
    this.ui.appendChild(this.goldStore);
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
    overlay.addEventListener("click",event=>{if(event.target===overlay)this.setWardrobeOpen(false);});
    this.ui.querySelectorAll<HTMLButtonElement>(".wardrobe-overlay [role=tab]").forEach(tab=>{
      tab.addEventListener("click",()=>this.selectSlot(tab.dataset.slot as CosmeticSlot));

    });
    this.ui.addEventListener("keydown",event=>{
      if(!this.wardrobeOpen)return;
      if(event.key==="Escape"){event.preventDefault();event.stopPropagation();this.setWardrobeOpen(false);}
      if(event.key==="Tab"){
        const buttons=Array.from(this.ui!.querySelectorAll<HTMLButtonElement>(".wardrobe-overlay .wardrobe-panel button:not([tabindex='-1']):not([hidden])"));
        const first=buttons[0],last=buttons[buttons.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
      }
    });
    this.form.addEventListener("submit",event=>{
      event.preventDefault();
      if(moderate())return;
      this.showOutfit(this.outfit);
      const name=nameInput.value.trim() || randomName();
      try { localStorage.setItem("forge-climber-name",name); } catch { /* Session name remains usable. */ }
      this.registry.set("outfit",this.outfit); saveOutfit(this.outfit);
      this.registry.set("mapId",MAPS[this.mapIndex].id);
      this.scene.start("Game",{name,mapId:MAPS[this.mapIndex].id});
    });
    this.renderEquipment();
    this.wardrobe2=createWardrobe2(this.ui,this.outfit.wardrobe2,()=>{if(this.wardrobeOpen)this.setWardrobeOpen(false);this.held=false;this.movement.clear();this.lobbyPlayer.charging=false;this.lobbyPlayer.charge01=0;},look=>{this.outfit={...this.outfit,character:'original',wardrobe2:look};saveOutfit(this.outfit);this.registry.set('outfit',this.outfit);this.showOutfit(this.outfit);});
    this.layoutUi(); this.scale.on(Phaser.Scale.Events.RESIZE,this.layoutUi,this);
  }
  private createMapSelector(): void {
    const panel=document.createElement('section');panel.className='map-selector';panel.setAttribute('aria-label','Choose map');
    panel.innerHTML='<div class="map-carousel"><button type="button" class="map-arrow" aria-label="Previous map">&#8249;</button><div class="map-window"><div class="map-track"></div></div><button type="button" class="map-arrow" aria-label="Next map">&#8250;</button></div><div class="map-caption" aria-live="polite"></div><div class="map-dots" aria-hidden="true"></div>';
    this.ui!.appendChild(panel);
    const track=panel.querySelector<HTMLElement>('.map-track')!;
    for(const map of MAPS){
      const canvas=document.createElement('canvas');canvas.width=240;canvas.height=170;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',map.name+' map preview');
      const c=canvas.getContext('2d')!;c.imageSmoothingEnabled=false;
      if(map.id==='mountain'){drawMountainPreview(this,c);}else if(map.id==='snow'){ drawSnowPreview(this,c); }else if(map.id==='jungle'){
        drawJunglePreview(this,c);
      }else{
        const source=this.textures.get(ASSETS.background.key).getSourceImage() as HTMLImageElement;
        c.drawImage(source,0,source.height*.42,source.width,source.height*.58,0,0,240,170);c.fillStyle='#0e10174d';c.fillRect(0,0,240,170);
        const ledge=this.textures.get(ASSETS.restPlatform.key).getSourceImage() as HTMLImageElement;
        for(const [x,y,w] of [[15,140,87],[138,102,83],[38,61,84],[137,24,85]])c.drawImage(ledge,0,0,96,32,x,y,w,16);
      }
      track.appendChild(canvas);
    }
    const render=()=>{
      const map=MAPS[this.mapIndex];this.registry.set('mapId',map.id);
      track.style.transform='translateX(-'+this.mapIndex*100+'%)';
      panel.querySelector('.map-caption')!.innerHTML='<h2>'+map.name+'</h2>';
      panel.querySelector('.map-dots')!.textContent=MAPS.map((_,i)=>i===this.mapIndex?'●':'○').join('  ');
    };
    panel.querySelectorAll('button').forEach((button,i)=>button.addEventListener('click',()=>{this.mapIndex=(this.mapIndex+(i?1:-1)+MAPS.length)%MAPS.length;render();}));
    render();
  }
  private createScores():void {
    loadScores();
    const panel=document.createElement('section');panel.className='personal-scores';panel.setAttribute('aria-label','Personal high scores');
    panel.innerHTML='<div class="scores-popover" id="scores-popover" hidden></div><button type="button" class="scores-toggle" aria-expanded="false" aria-controls="scores-popover">SCORES</button>';
    const popover=panel.querySelector<HTMLElement>('.scores-popover')!;
    const render=()=>{
      popover.replaceChildren();
      const title=document.createElement('h2');title.textContent='WINS · '+loadWins();popover.append(title);
      const name=this.form!.querySelector('input')!.value.trim() || 'You';
      const heading=document.createElement('p');heading.textContent=name+' · Personal bests';popover.append(heading);
      const scores=loadScores();
      for(const map of MAPS){const h=document.createElement('h3');h.textContent=map.name;popover.append(h);
        const best=scores[map.id],row=document.createElement('p');
        row.textContent=best?'#'+best.place+' '+name+' · '+(best.maxHeight/10).toFixed(1)+'m · '+scoreTime(best.timeMs):'No round played yet';popover.append(row);
      }
      this.refreshSurfaces();
    };
    panel.querySelector('button')!.addEventListener('click',()=>{
      popover.hidden=!popover.hidden;panel.querySelector('button')!.setAttribute('aria-expanded',String(!popover.hidden));render();
    });
    this.form!.querySelector('input')!.addEventListener('input',()=>{if(!popover.hidden)render();});
    this.ui!.appendChild(panel);

  }
  private refreshSurfaces():void {
    const canvas=this.game.canvas.getBoundingClientRect();
    if(!canvas.width || !this.ui)return;
    const sx=GAME_WIDTH/canvas.width,sy=GAME_HEIGHT/canvas.height;
    this.lobbySurfaces=[];
    const add=(r:DOMRect)=>{if(r.width>0&&r.height>0)this.lobbySurfaces.push({id:'ui-'+this.lobbySurfaces.length,x:(r.left-canvas.left)*sx,y:(r.top-canvas.top)*sy,w:r.width*sx,h:4,type:'stone'});};
    this.ui.querySelectorAll<HTMLElement>('.gold-marker img,.gold-balance,.gold-add,.settings-cog,.lobby-object,.wardrobe-art,.menu-form input,.menu-form button,.map-window,.map-arrow').forEach(e=>add(e.getBoundingClientRect()));
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
    this.wardrobeOpen=open;this.held=false;this.movement.clear();
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
    grid.innerHTML=equipmentOptions(this.activeSlot,this.outfit).map(piece=>`<button type="button" class="equipment-card" data-owned="${owns(this.shopSlot(),piece.id)}" data-piece="${piece.id}" aria-label="${cosmeticName(this.activeSlot,piece.id,this.outfit)}" aria-description="${owns(this.shopSlot(),piece.id)?'Owned':price(this.shopSlot(),piece.id)+' gold'}" aria-pressed="${selectedPiece(this.activeSlot,this.outfit)===piece.id}"><canvas width="64" height="64" aria-hidden="true"></canvas><span>${cosmeticName(this.activeSlot,piece.id,this.outfit)}${owns(this.shopSlot(),piece.id)?'':' · '+price(this.shopSlot(),piece.id)+' gold'}</span></button>`).join("");
    grid.querySelectorAll<HTMLButtonElement>("button").forEach(button=>{
      const id=button.dataset.piece!;
      this.drawEquipmentIcon(button.querySelector("canvas")!,this.activeSlot,id);
      const candidate:Outfit=isAnimal(this.outfit.character)&&this.activeSlot==='helmet'?{...this.outfit,animalHat:id as 'none'|'party'}:{...this.outfit,[this.activeSlot]:id};
      const preview=()=>this.showOutfit({...candidate,wardrobe2:undefined});
      const restore=()=>this.showOutfit(this.outfit);
      button.addEventListener('pointerenter',preview);
      button.addEventListener('pointerleave',restore);
      button.addEventListener('focus',preview);
      button.addEventListener('blur',restore);
      button.addEventListener("click",()=>{
        const slot=this.shopSlot();
        if(!owns(slot,id)&&!buy(slot,id)) {
          this.ui!.querySelector('.purchase-bar')!.textContent=wallet().gold<price(slot,id)?'Not enough gold.':'Purchase could not be saved on this browser.';
          return;
        }
        this.outfit={...candidate,wardrobe2:undefined};
        saveOutfit(this.outfit);this.registry.set('outfit',this.outfit);
        this.showOutfit(this.outfit);this.renderEquipment();
      });
    });
  }
  private shopSlot():string {return isAnimal(this.outfit.character)&&this.activeSlot==='helmet'?'animalHat':this.activeSlot;}
  private showOutfit(outfit:Outfit):void {
    this.animationPrefix=outfitTexture(this,outfit);
    this.preview.stop().chain();this.preview.setTexture(this.animationPrefix,0);
    const h=this.preview.frame.height;this.preview.setOrigin(.5,outfit.wardrobe2?31/32:(h-1)/h).setScale(LOBBY_SPRITE_SCALE*(outfit.wardrobe2?32/h:1));
    this.preview.play(`${this.animationPrefix}-${this.airborne?this.velocity<0?'jump':'fall':'idle'}`);
  }
  private renderPurchase():void {
    this.ui!.querySelector('.gold-balance')!.textContent='× '+wallet().gold;
    this.ui!.querySelector('.purchase-bar')!.replaceChildren();
  }
  private updateTabs():void {
    this.ui!.querySelectorAll<HTMLButtonElement>('.wardrobe-overlay [role=tab]').forEach(tab=>{
      tab.hidden=!outfitSlots(this.outfit).includes(tab.dataset.slot as CosmeticSlot);
      if(tab.dataset.slot==='helmet')tab.textContent=isAnimal(this.outfit.character)?'Hats':'Helmets';
    });
  }
  private drawEquipmentIcon(canvas: HTMLCanvasElement,slot: CosmeticSlot,id: string): void {
    const animalHat=isAnimal(this.outfit.character)&&slot==='helmet';
    const sample=animalHat?{...this.outfit,animalHat:id as 'none'|'party'}:{...this.outfit,[slot]:id};
    const key=slot==='character'||animalHat?outfitTexture(this,{...sample,wardrobe2:undefined}):slot==='hair'?'hair-'+id:slot==='helmet'&&id==='none'?'head-bare-v2':pieceKey(slot,id);
    const source=this.textures.get(key).getSourceImage() as HTMLImageElement;
    const frameHeight=Math.min(40,source.height);
    const scratch=document.createElement("canvas");scratch.width=32;scratch.height=frameHeight;
    const context=scratch.getContext("2d")!;context.imageSmoothingEnabled=false;
    context.drawImage(source,0,0,Math.min(32,source.width),frameHeight,0,0,Math.min(32,source.width),frameHeight);
    const pixels=context.getImageData(0,0,32,frameHeight).data;
    let left=32,top=frameHeight,right=0,bottom=0;
    for(let y=0;y<frameHeight;y++)for(let x=0;x<32;x++)if(pixels[(y*32+x)*4+3]){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
    if(left>right)return;
    const width=right-left+1,height=bottom-top+1,scale=Math.max(1,Math.floor(64/Math.max(width,height)));
    const target=canvas.getContext("2d")!;target.imageSmoothingEnabled=false;target.clearRect(0,0,64,64);
    target.drawImage(scratch,left,top,width,height,Math.floor((64-width*scale)/2),Math.floor((64-height*scale)/2),width*scale,height*scale);
  }
  private layoutUi(): void {
    if (!this.ui) return;
    const rect=this.game.canvas.getBoundingClientRect();
    this.background.setPosition(GAME_WIDTH/2,GAME_HEIGHT).setScale(Math.max(GAME_WIDTH/this.background.width, GAME_HEIGHT/this.background.height));
    this.shade.setSize(GAME_WIDTH,GAME_HEIGHT);
    Object.assign(this.ui.style,{width:rect.width+'px',height:rect.height+'px',left:rect.left+'px',top:rect.top+'px'});
    resizeLobbyPlayer(this.lobbyPlayer,GAME_WIDTH,GAME_HEIGHT,this.lobbyHeight);this.lobbyHeight=GAME_HEIGHT;
  }
  private installPreviewControls(): void {
    const canvas=this.game.canvas; canvas.tabIndex=0;
    const editing=()=>document.activeElement?.matches("input,select,textarea,[contenteditable='true']") ?? false;
    const down=(event:KeyboardEvent)=>{
      if(this.wardrobe2?.open() || settingsOpen() || this.goldStore?.open || editing() || event.ctrlKey || event.metaKey || event.altKey)return;
      if(["Space","ArrowLeft","ArrowRight","KeyA","KeyD"].includes(event.code))event.preventDefault();
      if(event.code==="Space")this.held=true;
      this.movement.add(event.code);
    };
    const up=(event:KeyboardEvent)=>{
      if(event.code==="Space"){if(!this.goldStore?.open && !editing())event.preventDefault();this.held=false;}
      this.movement.delete(event.code);
    };
    const cancel=()=>{this.held=false;this.movement.clear();this.lobbyPlayer.charging=false;this.lobbyPlayer.charge01=0;};
    const focus=()=>{if(editing())cancel();};
    const visible=()=>{if(document.hidden)cancel();};
    const unfocusName=(event:PointerEvent)=>{
      const active=document.activeElement;
      if(event.button===0 && active===this.form?.querySelector('input') && event.target!==active) {
        (active as HTMLInputElement).blur();
        if(!(event.target as Element)?.closest('button,input,select,textarea,[contenteditable=true]'))canvas.focus({preventScroll:true});
      }
    };
    this.preview.on("pointerdown",()=>{if(this.wardrobe2?.open()||settingsOpen()||this.goldStore?.open||this.wardrobeOpen)return;canvas.focus();this.held=true;});
    this.input.on("pointerup",()=>{this.held=false;});
    this.input.on("pointerupoutside",()=>{this.held=false;});
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);window.addEventListener("blur",cancel);
    document.addEventListener("focusin",focus);document.addEventListener("visibilitychange",visible);
    document.addEventListener('pointerdown',unfocusName,true);
    this.removeControls=()=>{window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);window.removeEventListener("blur",cancel);document.removeEventListener("focusin",focus);document.removeEventListener("visibilitychange",visible);document.removeEventListener('pointerdown',unfocusName,true);};
  }
  private cleanup(): void {
    this.wardrobe2?.destroy();this.wardrobe2=undefined;
    this.removeSettings?.();this.removeSettings=undefined;
    this.removeControls?.();this.removeControls=undefined;this.scale.off(Phaser.Scale.Events.RESIZE,this.layoutUi,this);
    this.goldStore?.remove();this.goldStore=undefined;
    this.ui?.remove();this.ui=undefined;this.form=undefined;this.held=false;
  }
}

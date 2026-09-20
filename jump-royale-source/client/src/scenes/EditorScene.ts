import Phaser from 'phaser';
import '../editor/editor.css';
import { MAPS, type MapId } from '../../../server/src/sim/maps';
import { worldForMap } from '../../../server/src/sim/world';
import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../../../server/src/sim/constants';
import { forgeLavaPools } from '../../../server/src/sim/level';
import { CANOPY_VINE, vinePose } from '../../../server/src/sim/vines';
import type { Platform } from '../../../server/src/sim/types';
import { outfitTexture, loadOutfit } from '../assets/cosmetics';
import { footOrigin } from '../game/spriteFeet';
import { spriteScale } from '../game/spriteSizing';
import { audio } from '../game/audio';
import { clone, createDraft, DraftHistory, LIBRARY_KEY, MAX_MAP_BYTES, EDITOR_LIMIT, movePlatform, newId, parseDraft, readLibrary, RECOVERY_KEY, saveDraft, type MapDraft } from '../editor/maps';
import { EditorSimulation } from '../editor/simulation';
import { backgroundFor, renderMapPlatform } from '../editor/art';
import {partsFor,mapThumbnail,type Part} from '../editor/parts';
import {editorMarkup,helpMarkup} from '../editor/ui';
import {icon} from '../editor/icons';
import {generateCourse,type CourseOptions} from '../editor/randomCourse';
import {corners,polygons,platformBounds,toLocal,toWorld,angle} from '../../../server/src/sim/platformGeometry';
import {spawnLocations,spawnPlatform,attachSpawn,type SpawnPoint} from '../../../server/src/sim/spawn';
import {fitBucket} from '../../../server/src/sim/bucketGeometry';

type Tool = 'select' | 'pan' | 'erase' | 'start';
type Drag = { kind:'pan'|'move'|'resize'|'rotate'|'spawn'|'box'; x:number;y:number;startX:number;startY:number;endX?:number;endY?:number;before?:MapDraft;id?:string;additive?:string[] };

export class EditorScene extends Phaser.Scene {
  private draft!: MapDraft;
  private history = new DraftHistory();
  private ui!: HTMLDivElement;
  private selected?: string;
  private tool: Tool = 'select';
  private selection = new Set<string>();
  private paletteDrag?: {part:Part;pointerId:number;x:number;y:number;active:boolean};
  private placementPreview?: Phaser.GameObjects.Container;
  private dragGhost?: HTMLImageElement;
  private hazards = false;
  private verifiedJumps = 0;
  private generation?:AbortController;
  private snap = 8;
  private outlines = false;
  private grid = false;
  private keys = new Set<string>();
  private drag?: Drag;
  private graphics!: Phaser.GameObjects.Graphics;
  private background!: Phaser.GameObjects.Image;
  private entities = new Map<string, Phaser.GameObjects.Container>();
  private sprite!: Phaser.GameObjects.Sprite;
  private prefix = '';
  private simulation?: EditorSimulation;
  private botSprites=new Map<string,Phaser.GameObjects.Sprite>();
  private followPlayer=true;
  private spawnCache?:{key:string;center:ReturnType<typeof spawnLocations>[0];points:ReturnType<typeof spawnLocations>};
  private accumulator = 0;
  private savedCamera?: { x: number; y: number; zoom: number };
  private autosave?: ReturnType<typeof setTimeout>;
  private toastTimer?: ReturnType<typeof setTimeout>;
  private retryToast = 0;
  private initialMap: MapId = 'forest';
  private dirty = false;
  private lastExport = '';
  private minimap?: HTMLCanvasElement;

  constructor() { super('Editor'); }
  init(data: { mapId?: MapId }): void { this.initialMap = data.mapId ?? 'forest'; }
  create(): void {
    this.history = new DraftHistory(); this.simulation = undefined; this.selected = undefined; this.selection.clear(); this.cancelPalette();
    this.keys.clear(); this.drag = undefined; this.dirty = false; this.tool = 'select'; this.accumulator = 0;
    this.input.keyboard?.disableGlobalCapture();
    let recoveryError = '';
    try {
      const recovery = localStorage.getItem(RECOVERY_KEY);
      this.draft = recovery ? parseDraft(recovery) : createDraft(this.initialMap);
    } catch (error) { this.draft = createDraft(this.initialMap); recoveryError = `Recovery unavailable: ${this.error(error)}`; }
    this.background = this.add.image(0, 0, backgroundFor(this.draft.baseMapId)).setOrigin(.5).setDepth(-10).setAlpha(.78);
    this.graphics = this.add.graphics().setDepth(20);
    this.prefix = outfitTexture(this, this.registry.get('outfit') ?? loadOutfit());
    this.sprite = this.add.sprite(0, 0, this.prefix).setOrigin(.5, footOrigin(this, this.prefix))
      .setScale(spriteScale(this, this.prefix, 28)).setDepth(15).setVisible(false);
    this.ui = document.createElement('div'); this.ui.className = 'map-editor';
    this.ui.innerHTML = editorMarkup(); document.body.append(this.ui);
    this.bindUi(); this.bindAi(); this.rebuildPalette(); this.rebuild(); this.layout(); this.focusPoint(this.spawnInfo().center.x, this.spawnInfo().center.y - 110);
    this.refreshInspector(); this.refreshUi();
    const down = (event: KeyboardEvent) => this.keyDown(event);
    const up = (event: KeyboardEvent) => this.keys.delete(event.code);
    const blur = () => { this.keys.clear(); if (this.drag) this.endDrag(); };
    const beforeUnload = (event: BeforeUnloadEvent) => { if (this.dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('keydown', down); window.addEventListener('keyup', up); window.addEventListener('blur', blur);
    window.addEventListener('beforeunload', beforeUnload);
    this.input.on('pointerdown', this.pointerDown, this); this.input.on('pointermove', this.pointerMove, this);
    this.input.on('pointerup', this.endDrag, this); this.input.on('pointerupoutside', this.endDrag, this);
    this.input.on('wheel', (_p: Phaser.Input.Pointer, _g: unknown, _x: number, dy: number) => {
      if (!this.ui.querySelector('dialog[open]')) this.zoom(dy > 0 ? .85 : 1.18);
    });
    this.scale.on('resize', this.layout, this);
    this.input.mouse?.disableContextMenu();
    this.events.once('shutdown', () => {
      this.flushRecovery(); clearTimeout(this.autosave); clearTimeout(this.toastTimer);
      window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); window.removeEventListener('blur', blur);
      window.removeEventListener('beforeunload', beforeUnload); this.scale.off('resize', this.layout, this);
      this.generation?.abort(); this.cancelPalette(); this.ui.remove(); this.keys.clear(); this.entities.clear(); audio.setMusicMap();
    });
    audio.setMusicMap(this.draft.baseMapId);
    if (recoveryError) this.toast(recoveryError, true);
  }

  private el<T extends HTMLElement = HTMLElement>(selector: string): T { return this.ui.querySelector<T>(selector)!; }
  private error(error: unknown) { return error instanceof Error ? error.message : String(error); }
  private bindUi(): void {
    this.ui.addEventListener('click', event => {
      const button=(event.target as HTMLElement).closest<HTMLButtonElement>('button');
      if(!button||button.disabled)return;
      if(button.dataset.action)this.action(button.dataset.action);
      if(button.dataset.tool&&!this.simulation){this.tool=button.dataset.tool as Tool;this.refreshUi();}
      button.blur();
    });
    this.el<HTMLInputElement>('[aria-label="Map name"]').addEventListener('change',event=>{
      const name=(event.target as HTMLInputElement).value.trim();if(!name){this.refreshUi();return;}
      this.change(()=>{this.draft.name=name;},false);
    });
    this.el<HTMLInputElement>('.editor-file').addEventListener('change',async event=>{
      const input=event.target as HTMLInputElement,file=input.files?.[0];if(!file)return;
      try{if(file.size>MAX_MAP_BYTES)throw new Error('This map is too large (maximum 2 MB).');
        const draft=parseDraft(await file.text());draft.id=newId();
        if(this.archiveCurrent()){this.openDraft(draft);this.el<HTMLDialogElement>('.editor-dialog').close();this.toast('Map imported.');}
      }catch(error){this.toast('Import failed: '+this.error(error),true);}input.value='';
    });
    this.el('.editor-palette').addEventListener('pointerdown',event=>{
      const e=event as PointerEvent,button=(e.target as HTMLElement).closest<HTMLButtonElement>('[data-part]');
      if(!button||this.simulation||e.button!==0)return;
      const part=partsFor(this.draft.baseMapId).find(p=>p.id===button.dataset.part);if(!part)return;
      e.preventDefault();button.setPointerCapture(e.pointerId);
      this.paletteDrag={part,pointerId:e.pointerId,x:e.clientX,y:e.clientY,active:false};
    });
    const move=(e:PointerEvent)=>this.paletteMove(e);
    const up=(e:PointerEvent)=>{
      const drag=this.paletteDrag;if(!drag||drag.pointerId!==e.pointerId)return;
      const point=this.dropPoint(e.clientX,e.clientY);
      if(drag.active&&point)this.addPart(drag.part,point.x,point.y);
      this.cancelPalette();
    };
    const cancel=()=>this.cancelPalette();
    window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);window.addEventListener('pointercancel',cancel);
    this.events.once('shutdown',()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',cancel);});
    this.ui.addEventListener('focusin',()=>this.keys.clear());
  }
  private bindAi():void{
    const button=this.el<HTMLButtonElement>('.editor-ai-person');let drag:{id:number;x:number;y:number;active:boolean}|undefined;let ghost:HTMLDivElement|undefined;
    const clear=()=>{drag=undefined;ghost?.remove();ghost=undefined;};
    button.onpointerdown=e=>{if(e.button)return;e.preventDefault();button.setPointerCapture(e.pointerId);drag={id:e.pointerId,x:e.clientX,y:e.clientY,active:false};};
    const move=(e:PointerEvent)=>{if(!drag||drag.id!==e.pointerId)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>5)drag.active=true;if(!drag.active)return;
      if(!ghost){ghost=document.createElement('div');ghost.className='editor-bot-ghost';ghost.innerHTML=icon('person');document.body.append(ghost);}ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';};
    const up=(e:PointerEvent)=>{if(!drag||drag.id!==e.pointerId)return;const point=this.dropPoint(e.clientX,e.clientY);if(!drag.active)this.addAi();else if(point)this.addAi(point);clear();};
    window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);window.addEventListener('pointercancel',clear);
    this.events.once('shutdown',()=>{clear();window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);window.removeEventListener('pointercancel',clear);this.botSprites.clear();});
  }
  private addAi(point?:{x:number;y:number}):void{
    if(!this.simulation){const cam=this.cameras.main,view={x:cam.scrollX,y:cam.scrollY,z:cam.zoom};this.startTest(false);cam.setZoom(view.z).setScroll(view.x,view.y);}
    this.followPlayer=false;
    let origin:SpawnPoint|undefined;
    if(point){const p=this.spawnTarget(point.x,point.y);origin=p?attachSpawn(p,point.x):{x:point.x-PLAYER_WIDTH/2,y:point.y-PLAYER_HEIGHT,platformId:'@air'};}
    this.simulation!.addBot(origin);this.refreshUi();
  }
  private spawnTarget(x:number,y:number):Platform|undefined{
    return [...this.activePlatforms()].reverse().find(p=>{const b=platformBounds(p);return x>=b.x-6&&x<=b.x+b.w+6&&y>=b.y-PLAYER_HEIGHT-12&&y<=b.y+b.h+12;});
  }
  private spawnInfo(){
    const p=spawnPlatform(this.draft.platforms,this.draft.spawn),key=JSON.stringify([this.draft.spawn,p]);
    if(this.spawnCache?.key!==key)this.spawnCache={key,center:spawnLocations(this.draft.platforms,this.draft.spawn,1)[0],points:spawnLocations(this.draft.platforms,this.draft.spawn,24)};
    return this.spawnCache!;
  }
  private setStart(x:number,y:number):boolean{
    const p=this.spawnTarget(x,y);if(!p)return false;this.draft.spawn=attachSpawn(p,x);this.selection=new Set([p.id]);this.selected=p.id;return true;
  }
  private rebuildPalette():void{
    const tray=this.el('.editor-palette');tray.replaceChildren();
    for(const part of partsFor(this.draft.baseMapId)){
      const b=document.createElement('button');b.className='editor-part';b.dataset.part=part.id;b.setAttribute('aria-label','Drag '+part.name);b.title=part.name;
      const img=document.createElement('img');img.src=import.meta.env.BASE_URL+part.image;img.alt='';img.draggable=false;
      const label=document.createElement('span');label.textContent=part.name;b.append(img,label);
      if(part.badge){const badge=document.createElement('b');badge.textContent=part.badge;b.append(badge);}tray.append(b);
    }
  }
  private dropPoint(x:number,y:number):Phaser.Math.Vector2|undefined{
    const r=this.el('.editor-stage').getBoundingClientRect();
    if(x<r.left||x>r.right||y<r.top||y>r.bottom)return;
    const over=document.elementFromPoint(x,y);if(over?.closest('button,dialog,.editor-selection'))return;
    const canvas=this.game.canvas.getBoundingClientRect();
    return this.cameras.main.getWorldPoint((x-canvas.left)*this.scale.width/canvas.width,(y-canvas.top)*this.scale.height/canvas.height);
  }
  private paletteMove(e:PointerEvent):void{
    const drag=this.paletteDrag;if(!drag||e.pointerId!==drag.pointerId)return;
    if(!drag.active&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<5)return;
    drag.active=true;
    if(!this.dragGhost){this.dragGhost=document.createElement('img');this.dragGhost.className='editor-drag-ghost';this.dragGhost.src=import.meta.env.BASE_URL+drag.part.image;document.body.append(this.dragGhost);}
    this.dragGhost.style.left=e.clientX+'px';this.dragGhost.style.top=e.clientY+'px';
    const point=this.dropPoint(e.clientX,e.clientY);this.dragGhost.hidden=!!point;
    if(point){
      const p=this.makePart(drag.part,point.x,point.y,'placement-preview');
      if(!this.placementPreview)this.placementPreview=renderMapPlatform(this,p,this.draft.baseMapId).setAlpha(.6).setDepth(25);
      this.placementPreview.setPosition(p.x,p.y);
    }else{this.placementPreview?.destroy(true);this.placementPreview=undefined;}
  }
  private cancelPalette():void{
    this.paletteDrag=undefined;this.dragGhost?.remove();this.dragGhost=undefined;this.placementPreview?.destroy(true);this.placementPreview=undefined;
  }
  private action(action: string): void {
    switch (action) {
      case 'aiadd': this.addAi();break;
      case 'airemove':this.simulation?.removeBot();this.refreshUi();break;
      case 'test': if (this.simulation) this.stopTest(); else this.startTest(false); break;
      case 'testhere': this.startTest(true); break;
      case 'flight': if (this.simulation) { this.simulation.toggleFlight(); this.refreshUi(); } break;
      case 'checkpoint': if (this.simulation) { this.simulation.setRetry(); this.toast('Retry point set.'); } break;
      case 'retry': if (this.simulation) { this.keys.clear(); this.simulation.reset(); this.refreshUi(); } break;
      case 'undo': this.restoreHistory(false); break;
      case 'redo': this.restoreHistory(true); break;
      case 'save': this.save(); break;
      case 'export': this.export(); break;
      case 'import': this.el<HTMLInputElement>('.editor-file').click(); break;
      case 'library': this.showLibrary(); break;
      case 'menu': this.showMenu(); break;
      case 'maps': this.showMaps(); break;
      case 'help': this.dialog('Controls').querySelector('.editor-dialog-content')!.innerHTML=helpMarkup(); break;
      case 'view': this.showView(); break;
      case 'overview': this.showOverview(); break;
      case 'randomize': this.showRandomize(); break;
      case 'properties': this.dialog('Object properties').querySelector('.editor-dialog-content')!.innerHTML='<div class="editor-inspector"></div>'; this.refreshInspector(); break;
      case 'new': this.showNew(); break;
      case 'exit': if (this.flushRecovery() || this.lastExport === JSON.stringify(this.draft)) this.scene.start('Menu'); else this.toast('Export your draft before leaving; browser storage is unavailable.', true); break;
      case 'home': {const p=this.spawnInfo().center;this.followPlayer=true;this.focusPoint(p.x,p.y-100);if(this.simulation){this.simulation.teleport(p.x,p.y);this.simulation.flying=true;this.refreshUi();}break;}
      case 'finish': { const p = this.draft.platforms.find(p => p.id === 'crown'); if (p) { this.focusPoint(p.x + p.w / 2, p.y); if (this.simulation) { const live = this.simulation.platforms.find(q => q.id === p.id)!; this.simulation.placeOn(live); this.simulation.flying = true; this.refreshUi(); } } else this.toast('Add a Finish part to mark the goal.'); break; }
      case 'zoomin': this.zoom(1.2); break;
      case 'zoomout': this.zoom(1 / 1.2); break;
      case 'duplicate': this.duplicate(); break;
      case 'delete': this.deleteSelected(); break;
      case 'focus': { const p = this.draft.platforms.find(p => p.id === this.selected); if (p) this.focusPoint(p.x + p.w / 2, p.y); break; }
    }
  }

  private layout(): void {
    if (!this.ui) return;
    const stage = this.el('.editor-stage').getBoundingClientRect(), canvas = this.game.canvas.getBoundingClientRect();
    const sx = this.scale.width / canvas.width, sy = this.scale.height / canvas.height;
    const cam = this.cameras.main;
    cam.setViewport((stage.left - canvas.left) * sx, (stage.top - canvas.top) * sy, stage.width * sx, stage.height * sy);
    cam.setBackgroundColor('#101f2b');
  }
  private focusPoint(x: number, y: number): void { this.cameras.main.centerOn(x, y); }
  private zoom(factor: number): void {
    const cam = this.cameras.main, x = cam.scrollX + cam.width / 2, y = cam.scrollY + cam.height / 2;
    cam.setZoom(Phaser.Math.Clamp(cam.zoom * factor, .18, 3)); cam.centerOn(x, y);
    this.el('.editor-zoom-value').textContent = `${Math.round(cam.zoom * 100)}%`;
  }
  private activePlatforms(): Platform[] { return this.simulation?.platforms ?? this.draft.platforms; }
  private rebuild(): void {
    for (const c of this.entities.values()) { c.each((child: Phaser.GameObjects.GameObject) => this.tweens.killTweensOf(child)); c.destroy(true); }
    this.entities.clear();
    for (const p of this.activePlatforms()) this.entities.set(p.id, renderMapPlatform(this, p, this.draft.baseMapId));
    this.background.setTexture(backgroundFor(this.draft.baseMapId));
  }
  private rerender(p: Platform): void {
    const old = this.entities.get(p.id); old?.each((child: Phaser.GameObjects.GameObject) => this.tweens.killTweensOf(child)); old?.destroy(true);
    this.entities.set(p.id, renderMapPlatform(this, p, this.draft.baseMapId));
  }
  private change(mutate: () => void, redraw = true): void {
    if (this.simulation) return;
    const before = clone(this.draft); mutate();
    if (!this.history.record(before, this.draft)) return;
    if (redraw) this.rebuild(); this.changed(); this.refreshInspector(); this.refreshUi();
  }
  private changed(): void {
    this.draft.updatedAt = new Date().toISOString(); this.dirty = true; this.verifiedJumps = 0;
    this.el('.editor-save-state').textContent = 'Saving…';
    clearTimeout(this.autosave); this.autosave = setTimeout(() => this.flushRecovery(), 600);
  }
  private flushRecovery(): boolean {
    if (!this.draft) return true;
    try {
      localStorage.setItem(RECOVERY_KEY, JSON.stringify(this.draft)); this.dirty = false;
      if (this.ui) this.el('.editor-save-state').textContent = '● Saved locally';
      return true;
    } catch { if (this.ui) this.el('.editor-save-state').textContent = 'Could not autosave · export a backup'; this.dirty = true; return false; }
  }
  private save(): void {
    try { saveDraft(this.draft); this.flushRecovery(); this.toast('Map saved.'); }
    catch (error) { this.toast(`Save failed: ${this.error(error)} Export a backup.`, true); }
  }
  private archiveCurrent(): boolean {
    try { saveDraft(this.draft); return true; }
    catch (error) { if (this.lastExport === JSON.stringify(this.draft)) return true; this.toast(`Keep this draft open and export it first. ${this.error(error)}`, true); return false; }
  }
  private export(): void {
    try {
      const draft = parseDraft(JSON.stringify(this.draft));
      const url = URL.createObjectURL(new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' }));
      const link = document.createElement('a'); link.href = url; link.download = `${draft.name.replace(/[^a-z0-9-]+/gi, '-').slice(0, 60) || 'map'}.jump-royale.json`;
      link.click(); this.lastExport = JSON.stringify(this.draft); setTimeout(() => URL.revokeObjectURL(url), 1000); this.toast('Map exported.');
    } catch (error) { this.toast(this.error(error), true); }
  }
  private openDraft(draft: MapDraft): void {
    if (this.simulation) this.stopTest(); this.draft = clone(draft); this.selected = undefined; this.selection.clear(); this.cancelPalette(); this.tool = 'select';
    this.history = new DraftHistory(); this.rebuildPalette(); this.rebuild(); this.focusPoint(this.spawnInfo().center.x, this.spawnInfo().center.y - 110);
    this.changed(); this.refreshInspector(); this.refreshUi(); audio.setMusicMap(draft.baseMapId);
  }
  private restoreHistory(redo: boolean): void {
    if (this.simulation) return;
    const value = redo ? this.history.redo(this.draft) : this.history.undo(this.draft);
    if (value) { this.draft = value; this.rebuild(); this.changed(); this.refreshInspector(); this.refreshUi(); }
  }
  private toast(message: string, error = false): void {
    const toast = this.el('.editor-toast'); toast.textContent = message; toast.hidden = false; toast.classList.toggle('error', error);
    clearTimeout(this.toastTimer); this.toastTimer = setTimeout(() => { toast.hidden = true; }, error ? 8000 : 4000);
  }

  private pointerDown(pointer:Phaser.Input.Pointer):void{
    if(pointer.event.target!==this.game.canvas||this.ui.querySelector('dialog[open]'))return;
    const cam=this.cameras.main;if(pointer.x<cam.x||pointer.x>cam.x+cam.width||pointer.y<cam.y||pointer.y>cam.y+cam.height)return;
    (document.activeElement as HTMLElement)?.blur();
    const w=cam.getWorldPoint(pointer.x,pointer.y);
    if(pointer.rightButtonDown()||(this.tool==='pan'||this.keys.has('Space'))&&!this.simulation){if(this.simulation)this.followPlayer=false;this.drag={kind:'pan',x:pointer.x,y:pointer.y,startX:cam.scrollX,startY:cam.scrollY};return;}
    if(this.simulation){if(this.simulation.flying)this.simulation.teleport(w.x-PLAYER_WIDTH/2,w.y-PLAYER_HEIGHT);return;}
    if(this.tool==='start'){
      if(!this.spawnTarget(w.x,w.y)){this.toast('Choose a platform for the start.');return;}
      this.change(()=>{this.setStart(w.x,w.y);},false);this.tool='select';this.refreshUi();return;
    }
    const spawn=this.spawnInfo().center;
    if(this.tool==='select'&&Math.hypot(w.x-spawn.x-PLAYER_WIDTH/2,w.y-spawn.y-PLAYER_HEIGHT/2)<16/cam.zoom){this.drag={kind:'spawn',x:w.x,y:w.y,startX:spawn.x,startY:spawn.y,before:clone(this.draft)};return;}
    const p=this.draft.platforms.find(p=>p.id===this.selected);
    if(p&&this.selection.size===1&&this.tool==='select'){
      const handle=toWorld(p,p.w+28/cam.zoom,p.h+28/cam.zoom),corner=toWorld(p,p.w,p.h);
      if(Math.hypot(w.x-handle.x,w.y-handle.y)<14/cam.zoom){this.drag={kind:'rotate',x:p.x+p.w/2,y:p.y+p.h/2,startX:Math.atan2(w.y-p.y-p.h/2,w.x-p.x-p.w/2),startY:p.rotation??0,id:p.id,before:clone(this.draft)};return;}
      if(Math.hypot(w.x-corner.x,w.y-corner.y)<12/cam.zoom){this.drag={kind:'resize',x:w.x,y:w.y,startX:p.w,startY:p.h,id:p.id,before:clone(this.draft)};return;}
    }
    const hit=[...this.draft.platforms].reverse().find(p=>{const q=toLocal(p,w.x,w.y),pad=4/cam.zoom;return q.x>=-pad&&q.x<=p.w+pad&&q.y>=-pad&&q.y<=p.h+pad&&!(p.bucket&&q.x>p.w*p.bucket.left&&q.x<p.w*p.bucket.right&&q.y<p.bucket.depth-pad);});
    const shift=(pointer.event as MouseEvent).shiftKey;
    if(this.tool==='erase'||!hit){
      const additive=shift?[...this.selection]:[];
      this.drag={kind:'box',x:w.x,y:w.y,startX:w.x,startY:w.y,endX:w.x,endY:w.y,id:hit?.id,additive};
      this.selection=new Set(additive);if(hit)this.selection.add(hit.id);
    }else{
      if(shift){if(this.selection.has(hit.id))this.selection.delete(hit.id);else this.selection.add(hit.id);}
      else if(!this.selection.has(hit.id))this.selection=new Set([hit.id]);
      this.drag={kind:'move',x:w.x,y:w.y,startX:hit.x,startY:hit.y,id:hit.id,before:clone(this.draft)};
    }
    this.selected=this.selection.values().next().value;this.refreshInspector();this.refreshUi();
  }
  private pointerMove(pointer:Phaser.Input.Pointer):void{
    const cam=this.cameras.main,w=cam.getWorldPoint(pointer.x,pointer.y),drag=this.drag;if(!drag)return;
    if(drag.kind==='pan'){cam.scrollX=drag.startX-(pointer.x-drag.x)/cam.zoom;cam.scrollY=drag.startY-(pointer.y-drag.y)/cam.zoom;return;}
    if(drag.kind==='spawn'){if(this.setStart(w.x,w.y))this.refreshUi();return;}
    if(drag.kind==='box'){
      drag.endX=w.x;drag.endY=w.y;
      const left=Math.min(drag.x,w.x),right=Math.max(drag.x,w.x),top=Math.min(drag.y,w.y),bottom=Math.max(drag.y,w.y);
      this.selection=new Set(drag.additive);
      for(const p of this.draft.platforms){const b=platformBounds(p);if(b.x>=left&&b.x+b.w<=right&&b.y>=top&&b.y+b.h<=bottom)this.selection.add(p.id);}
      this.selected=this.selection.values().next().value;this.refreshUi();return;
    }
    const bounds=worldForMap(this.draft.baseMapId);
    if(drag.kind==='rotate'){
      const p=this.draft.platforms.find(p=>p.id===drag.id);if(!p)return;
      const degrees=drag.startY+(Math.atan2(w.y-drag.y,w.x-drag.x)-drag.startX)*180/Math.PI;
      const step=(pointer.event as MouseEvent).shiftKey?15:1;p.rotation=((Math.round(degrees/step)*step+180)%360+360)%360-180;
      this.rerender(p);this.refreshInspector();return;
    }
    if(drag.kind==='move'){
      const dx=this.snapped(w.x-drag.x),dy=this.snapped(w.y-drag.y);
      for(const p of this.draft.platforms.filter(p=>this.selection.has(p.id))){
        const old=drag.before!.platforms.find(q=>q.id===p.id)!;
        movePlatform(p,Phaser.Math.Clamp(old.x+dx,-EDITOR_LIMIT,EDITOR_LIMIT),Phaser.Math.Clamp(old.y+dy,-EDITOR_LIMIT,bounds.height));this.rerender(p);
      }
    }else{
      const p=this.draft.platforms.find(p=>p.id===drag.id);if(!p)return;
      const original=drag.before!.platforms.find(q=>q.id===p.id)!,a=angle(original),dx=w.x-drag.x,dy=w.y-drag.y,anchor=toWorld(original,0,0);
      p.w=Phaser.Math.Clamp(this.snapped(drag.startX+dx*Math.cos(a)+dy*Math.sin(a)),8,EDITOR_LIMIT);
      p.h=Phaser.Math.Clamp(this.snapped(drag.startY-dx*Math.sin(a)+dy*Math.cos(a)),4,EDITOR_LIMIT);
      movePlatform(p,anchor.x+(p.w/2)*Math.cos(a)-(p.h/2)*Math.sin(a)-p.w/2,anchor.y+(p.w/2)*Math.sin(a)+(p.h/2)*Math.cos(a)-p.h/2);
      if(p.bucket){p.bucket.depth=original.bucket!.depth*p.h/original.h;fitBucket(p);}this.rerender(p);
    }
    this.refreshInspector();
  }
  private endDrag():void{
    const drag=this.drag;if(!drag)return;this.drag=undefined;
    if(drag?.kind==='box'){
      if(Math.hypot((drag.endX??drag.x)-drag.x,(drag.endY??drag.y)-drag.y)<5/this.cameras.main.zoom){this.selection=new Set(drag.additive);if(drag.id)this.selection.add(drag.id);}
      this.selected=this.selection.values().next().value;
      if(this.tool==='erase'&&this.selection.size)this.deleteSelected();
    }else if(drag?.before&&this.history.record(drag.before,this.draft))this.changed();
    if(this.ui){this.refreshInspector();this.refreshUi();}
  }
  private snapped(n:number):number{return this.snap?Math.round(n/this.snap)*this.snap:Math.round(n);}
  private makePart(part:Part,x:number,y:number,id:string):Platform{
    const bounds=worldForMap(this.draft.baseMapId),width=part.properties.w??128;
    const p:Platform={id,x:this.snapped(Phaser.Math.Clamp(x-width/2,-EDITOR_LIMIT,EDITOR_LIMIT)),y:Math.min(bounds.height,this.snapped(Math.max(-EDITOR_LIMIT,y))),w:width,h:24,type:'stone',solid:true,rotation:0,
      forest:this.draft.baseMapId==='forest',magical:this.draft.baseMapId==='magical',mountain:this.draft.baseMapId==='mountain',
      ...(this.draft.baseMapId==='jungle'?{terrain:'island' as const}:{}),...clone(part.properties)};
    fitBucket(p);
    if(p.type==='moving')Object.assign(p,{baseX:p.x,baseY:p.y,moveRange:80,movePeriodMs:4000,movePhase:0});
    return p;
  }
  private addPart(part:Part,x:number,y:number):void{
    if(this.draft.platforms.length>=2000){this.toast('This map already has 2,000 objects.',true);return;}
    this.change(()=>{
      const existing=part.id==='finish'?this.draft.platforms.find(p=>p.id==='crown'):undefined;
      if(existing){movePlatform(existing,this.snapped(x-existing.w/2),this.snapped(Math.max(-EDITOR_LIMIT,y)));this.selected=existing.id;}
      else{const p=this.makePart(part,x,y,part.id==='finish'?'crown':'part-'+newId());this.draft.platforms.push(p);this.selected=p.id;}
      this.selection=new Set([this.selected!]);this.tool='select';
    });
  }
  private duplicate():void{
    if(this.simulation||!this.selection.size)return;
    const sources=this.draft.platforms.filter(p=>this.selection.has(p.id));if(this.draft.platforms.length+sources.length>2000)return;
    this.change(()=>{this.selection.clear();for(const source of sources){const p=clone(source);p.id='part-'+newId();movePlatform(p,p.x+24,Math.max(-EDITOR_LIMIT,p.y-32));this.draft.platforms.push(p);this.selection.add(p.id);}this.selected=this.selection.values().next().value;});
  }
  private deleteSelected():void{
    if(!this.selection.size||this.simulation)return;
    this.change(()=>{this.draft.platforms=this.draft.platforms.filter(p=>!this.selection.has(p.id));this.selection.clear();this.selected=undefined;});
  }
  private refreshInspector(): void {
    const panel = this.ui.querySelector<HTMLElement>('.editor-inspector'), p = this.draft.platforms.find(p => p.id === this.selected);
    if(!panel)return;
    if(!p){panel.textContent='No object selected.';return;}
    const field = (key: string, label: string, min: number, max: number, step = 1) => `<label>${label}<input type="number" data-field="${key}" aria-label="${label}" min="${min}" max="${max}" step="${key==='x'||key==='y'?'any':step}"></label>`;
    const bounds = worldForMap(this.draft.baseMapId);
    panel.innerHTML = `<div class="editor-object-id"></div><div class="editor-inspector-grid">${field('x','X',-EDITOR_LIMIT,EDITOR_LIMIT)}${field('y','Y',-EDITOR_LIMIT,bounds.height)}${field('w','Width',8,EDITOR_LIMIT)}${field('h','Height',4,EDITOR_LIMIT)}${field('rotation','Rotation (°)',-180,180)}<label class="editor-wide">Material<select data-field="type" aria-label="Material">${['stone','wood','anvil','ice','cracked','moving'].map(t => `<option>${t}</option>`).join('')}</select></label>${this.draft.baseMapId === 'jungle' ? '<label class="editor-wide">Terrain shape<select data-field="terrain"><option>ground</option><option>left</option><option>right</option><option>island</option><option>log</option><option>ruin</option></select></label>' : ''}</div>
    <label class="editor-check"><input type="checkbox" data-field="solid"> Solid sides / underside</label><label class="editor-check"><input type="checkbox" data-field="slippery"> Slippery</label><label class="editor-check"><input type="checkbox" data-field="slope"> Sloped top</label><div class="editor-inspector-grid">${field('crumbleSeconds','Crumble seconds (0 = off)',0,120,.1)}${p.type === 'moving' ? field('moveRange','Travel radius',0,2000)+field('movePeriodMs','Cycle (ms)',250,100000,50)+field('orbitY','Vertical radius',0,2000)+field('movePhase','Phase (radians)',-100,100,.1) : ''}</div><div class="editor-row"><button data-inspect="duplicate">Duplicate</button><button data-inspect="delete" class="editor-danger">Delete</button></div>`;
    panel.querySelector('.editor-object-id')!.textContent = p.id === 'crown' ? '⚑ FINISH' : p.id === 'spawn' ? 'START PLATFORM' : p.id;
    panel.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-field]').forEach(input => {
      const key = input.dataset.field! as keyof Platform, value = p[key];
      if (input instanceof HTMLInputElement && input.type === 'checkbox') input.checked = !!value;
      else input.value = String(value ?? (key === 'terrain' ? 'island' : 0));
      input.addEventListener('change', () => {
        if (input instanceof HTMLInputElement && input.type === 'number' && (!input.checkValidity() || !Number.isFinite(input.valueAsNumber))) { this.refreshInspector(); this.toast('Enter a number within the field’s range.', true); return; }
        this.change(() => {
          if (input instanceof HTMLInputElement && input.type === 'checkbox') (p as unknown as Record<string, unknown>)[key] = input.checked;
          else if (key === 'x' || key === 'y') movePlatform(p, key === 'x' ? Number(input.value) : p.x, key === 'y' ? Number(input.value) : p.y);
          else if (key === 'type') {
            p.type = input.value as Platform['type'];
            if (p.type === 'moving') Object.assign(p, { baseX: p.x, baseY: p.y, moveRange: 80, movePeriodMs: 4000, movePhase: 0 });
            if (p.type === 'ice') p.slippery = true;
            if (p.type === 'cracked') p.crumbleSeconds = 1.2;
          } else if (key === 'terrain') p.terrain = input.value as Platform['terrain'];
          else {if(key==='h'&&p.bucket)p.bucket.depth*=Number(input.value)/p.h;(p as unknown as Record<string, unknown>)[key] = Number(input.value);}
          fitBucket(p);
        });
      });
    });
    const focus = document.createElement('button'); focus.textContent = 'Center on object'; focus.style.width = '100%'; focus.style.marginTop = '8px'; focus.onclick = () => this.action('focus'); panel.append(focus);
    panel.querySelectorAll<HTMLButtonElement>('[data-inspect]').forEach(b => b.addEventListener('click', () => this.action(b.dataset.inspect!)));
  }
  private refreshUi():void{
    const testing=!!this.simulation;
    this.selection=new Set([...this.selection].filter(id=>this.draft.platforms.some(p=>p.id===id)));
    this.selected=this.selection.values().next().value;
    this.el<HTMLInputElement>('[aria-label="Map name"]').value=this.draft.name;
    this.el<HTMLInputElement>('[aria-label="Map name"]').disabled=testing;
    this.ui.querySelectorAll<HTMLButtonElement>('[data-tool]').forEach(b=>{b.disabled=testing;b.classList.toggle('active',b.dataset.tool===this.tool);});
    this.ui.querySelectorAll<HTMLButtonElement>('[data-part]').forEach(b=>b.disabled=testing);
    this.el<HTMLButtonElement>('[data-action="undo"]').disabled=testing||!this.history.canUndo;
    this.el<HTMLButtonElement>('[data-action="redo"]').disabled=testing||!this.history.canRedo;
    this.el<HTMLElement>('.editor-selection').hidden=testing||!this.selection.size;
    this.el('.editor-selection-count').textContent=this.selection.size===1?'1 object':this.selection.size+' objects';
    this.el<HTMLButtonElement>('[data-action="properties"]').disabled=this.selection.size!==1;
    this.el<HTMLButtonElement>('[data-action="testhere"]').disabled=testing||!this.selected;
    this.el('.editor-test-bar').hidden=!testing;
    const botCount=this.simulation?.bots.length??0;this.el('.editor-ai-count').textContent=String(botCount);this.el<HTMLButtonElement>('[data-action="airemove"]').disabled=!botCount;this.el<HTMLButtonElement>('[data-action="aiadd"]').disabled=botCount>=24;
    this.el('[data-action="flight"]').classList.toggle('active',!!this.simulation?.flying);
    const play=this.el('[data-action="test"]');play.innerHTML=icon(testing?'stop':'play')+'<span>'+(testing?'Edit':'Play')+'</span>';play.setAttribute('aria-label',testing?'Back to editor':'Playtest');
    this.el<HTMLInputElement>('.editor-map-card img').setAttribute('src',mapThumbnail(this.draft.baseMapId));
    this.el('.editor-map-card span').textContent=MAPS.find(m=>m.id===this.draft.baseMapId)!.name;
    this.el('.editor-zoom-value').textContent=Math.round(this.cameras.main.zoom*100)+'%';
    this.el('.editor-course-state').textContent=this.verifiedJumps?this.verifiedJumps+' jumps verified':'';
  }
  private startTest(fromSelected: boolean): void {
    if (this.simulation) return;
    this.endDrag(); this.flushRecovery(); this.keys.clear(); this.cancelPalette();
    const cam = this.cameras.main; this.savedCamera = { x: cam.scrollX, y: cam.scrollY, zoom: cam.zoom };
    this.followPlayer=true;this.simulation = new EditorSimulation(clone(this.draft));
    if (fromSelected) { const p = this.simulation.platforms.find(p => p.id === this.selected); if (p) { this.simulation.placeOn(p); this.simulation.setRetry(); } }
    this.simulation.hazards = this.hazards;
    this.accumulator = 0; this.retryToast = 0; cam.setZoom(1.25); this.sprite.setVisible(true); this.rebuild(); this.refreshUi();

  }
  private stopTest(): void {
    this.simulation = undefined;for(const sprite of this.botSprites.values())sprite.destroy();this.botSprites.clear(); this.keys.clear(); this.sprite.setVisible(false); this.rebuild();
    const c = this.savedCamera; if (c) { this.cameras.main.setZoom(c.zoom); this.cameras.main.setScroll(c.x, c.y); }
    this.refreshInspector(); this.refreshUi();
  }
  private keyDown(event: KeyboardEvent): void {
    if (this.ui.querySelector('dialog[open]') || (event.target as HTMLElement)?.closest('input,select,textarea,[contenteditable=true]')) return;
    const command = event.ctrlKey || event.metaKey;
    if (command && ['KeyS','KeyZ','KeyY','KeyD'].includes(event.code)) {
      event.preventDefault(); if (event.repeat) return;
      if (event.code === 'KeyS') this.save();
      if (event.code === 'KeyZ') this.restoreHistory(event.shiftKey);
      if (event.code === 'KeyY') this.restoreHistory(true);
      if (event.code === 'KeyD') this.duplicate(); return;
    }
    if (command || event.altKey) return;
    if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Tab','Delete','Backspace'].includes(event.code)) event.preventDefault();
    this.keys.add(event.code);
    if (event.repeat) return;
    if (event.code === 'Tab') { this.action('test'); return; }
    if (this.simulation) {
      if (event.code === 'KeyF' || event.code === 'KeyL') this.action('flight');
      if (event.code === 'KeyC') this.action('checkpoint');
      if (event.code === 'KeyR') this.action('retry');
      if (event.code === 'Escape') this.stopTest(); return;
    }
    if (event.code === 'Escape' || event.code === 'KeyV') { this.cancelPalette(); this.selection.clear(); this.selected=undefined; this.tool = 'select'; }
    if (event.code === 'KeyH') { this.cancelPalette(); this.tool = 'pan'; }
    if (event.code === 'KeyE') { this.cancelPalette(); this.tool = 'erase'; }
    if (event.code === 'KeyS') { this.cancelPalette(); this.tool = 'start'; }
    if (event.code === 'Delete' || event.code === 'Backspace') this.deleteSelected();
    if (event.code.startsWith('Arrow')) {
      const p = this.draft.platforms.find(p => p.id === this.selected), distance = (this.snap || 1) * (event.shiftKey ? 5 : 1);
      if (p) this.change(() => { for(const item of this.draft.platforms.filter(q=>this.selection.has(q.id))) movePlatform(item,item.x+(event.code==='ArrowRight'?distance:event.code==='ArrowLeft'?-distance:0),Math.max(-EDITOR_LIMIT,item.y+(event.code==='ArrowDown'?distance:event.code==='ArrowUp'?-distance:0))); });
    }
    this.refreshUi();
  }

  update(_time: number, delta: number): void {
    if (!this.ui) return;
    const sim = this.simulation, cam = this.cameras.main, dialog = this.ui.querySelector('dialog[open]');
    if (sim) {
      if (!dialog) {
        this.accumulator += Math.min(delta, 100) / 1000;
        const held = (a: string, b: string) => this.keys.has(a) || this.keys.has(b);
        while (this.accumulator >= 1 / 30) {
          sim.step({ left: held('KeyA','ArrowLeft'), right: held('KeyD','ArrowRight'), up: held('KeyW','ArrowUp'), down: held('KeyS','ArrowDown'), jumpHeld: this.keys.has('Space'), seq: 0 });
          this.accumulator -= 1 / 30;
        }
      }
      const p = sim.player;
      this.sprite.setPosition(p.x + PLAYER_WIDTH / 2, p.y + PLAYER_HEIGHT).setFlipX(p.facing < 0);
      const pose = sim.flying ? 'fall' : p.charging ? 'charge-loop' : !p.grounded ? p.vy < 0 ? 'jump' : 'fall' : Math.abs(p.vx) > 1 ? 'walk' : 'idle';
      if (this.anims.exists(`${this.prefix}-${pose}`)) this.sprite.play(`${this.prefix}-${pose}`, true);
      if (!this.drag&&this.followPlayer) cam.centerOn(p.x + PLAYER_WIDTH / 2, p.y - cam.height / cam.zoom * .12);
      if (sim.deaths !== this.retryToast) { this.retryToast = sim.deaths; this.toast('Back at your retry point.'); this.refreshUi(); }
      if(sim.completed)this.el('.editor-course-state').textContent='Finish reached!';
    }
    if(sim){
      const ids=new Set(sim.bots.map(b=>b.id));for(const [id,sprite]of this.botSprites)if(!ids.has(id)){sprite.destroy();this.botSprites.delete(id);}
      for(const bot of sim.bots){let sprite=this.botSprites.get(bot.id);if(!sprite){sprite=this.add.sprite(0,0,this.prefix).setOrigin(.5,footOrigin(this,this.prefix)).setScale(spriteScale(this,this.prefix,28)).setDepth(16).setTint(0x9eeaff);this.botSprites.set(bot.id,sprite);}
        const p=bot.player;sprite.setPosition(p.x+PLAYER_WIDTH/2,p.y+PLAYER_HEIGHT).setFlipX(p.facing<0);const pose=p.charging?'charge-loop':!p.grounded?(p.vy<0?'jump':'fall'):Math.abs(p.vx)>1?'walk':'idle';if(this.anims.exists(this.prefix+'-'+pose))sprite.play(this.prefix+'-'+pose,true);
      }
    }
    const view = cam.worldView, platforms = this.activePlatforms();
    this.background.setPosition(cam.scrollX + cam.width / 2, cam.scrollY + cam.height / 2).setDisplaySize(cam.width / cam.zoom * 1.5, cam.height / cam.zoom * 1.5);
    for (const p of platforms) {
      const entity = this.entities.get(p.id);
      const b=platformBounds(p);
      entity?.setPosition(p.x, p.y).setVisible(b.y + b.h > view.y - 180 && b.y < view.bottom + 180 && b.x + b.w > view.x - 200 && b.x < view.right + 200 && sim?.player.crumblingPlatforms?.[p.id] !== 0);
      const remaining = sim?.player.crumblingPlatforms?.[p.id];
      entity?.setAlpha(remaining !== undefined && p.crumbleSeconds ? .45 + .55 * remaining / p.crumbleSeconds : 1);
    }
    this.drawOverlay(); this.drawMinimap();
  }
  private drawOverlay(): void {
    const g = this.graphics.clear(), cam = this.cameras.main, view = cam.worldView, zoom = cam.zoom, sim = this.simulation;
    const bounds = worldForMap(this.draft.baseMapId);
    if (this.grid && !sim) {
      const size = Math.max(this.snap || 16, 16) * (zoom < .5 ? 4 : 1);
      g.lineStyle(1 / zoom, 0x8bc0c4, .12);
      for (let x = Math.floor(view.x / size) * size; x < view.right; x += size) g.lineBetween(x, view.y, x, view.bottom);
      for (let y = Math.floor(view.y / size) * size; y < view.bottom; y += size) g.lineBetween(view.x, y, view.right, y);
    }
    g.lineStyle(2/zoom,0x6e929c,.65).lineBetween(view.x,bounds.height,view.right,bounds.height);
    const spawnInfo=this.spawnInfo();
    for (const p of this.activePlatforms()) {
      const extent=platformBounds(p);if(extent.y>view.bottom+150||extent.y+extent.h<view.y-150)continue;
      const selected = this.selection.has(p.id) && !sim;
      if(!sim&&p.id===spawnInfo.center.platformId){g.lineStyle(3/zoom,0x6ddcff,.9).strokePoints(corners(p),true);for(const spot of spawnInfo.points)g.fillStyle(0x6ddcff,.8).fillCircle(spot.x+PLAYER_WIDTH/2,spot.y+PLAYER_HEIGHT,2/zoom);}
      if (this.outlines || selected) {
        g.lineStyle((selected ? 2 : 1) / zoom, selected ? 0xb5f4ce : 0x83c4d4, selected ? 1 : .55);
        if(this.outlines)for(const poly of polygons(p))g.strokePoints(poly,true);
        else{const a=toWorld(p,0,0),b=toWorld(p,p.w,0);g.lineBetween(a.x,a.y,b.x,b.y);}
      }
      if (selected) {
        g.lineStyle(2/zoom,0xb5f4ce).strokePoints(corners(p),true);
        if(this.selection.size===1){
          const c=toWorld(p,p.w,p.h),r=toWorld(p,p.w+28/zoom,p.h+28/zoom);
          g.fillStyle(0xffde8f).fillRect(c.x-5/zoom,c.y-5/zoom,10/zoom,10/zoom);
          g.lineStyle(1/zoom,0xffde8f,.65).lineBetween(c.x,c.y,r.x,r.y);
          g.fillStyle(0x122331,.95).fillCircle(r.x,r.y,14/zoom);
          g.lineStyle(2/zoom,0xffde8f,1).beginPath().arc(r.x,r.y,9/zoom,-Math.PI*.8,Math.PI*.65).strokePath();
          g.fillStyle(0xffde8f).fillTriangle(r.x-10/zoom,r.y+9/zoom,r.x-2/zoom,r.y+9/zoom,r.x-6/zoom,r.y+2/zoom);
        }
        if (p.type === 'moving') g.lineStyle(2 / zoom, 0x70e5dc, .6).lineBetween((p.baseX ?? p.x) - (p.moveRange ?? 0) + p.w / 2, p.y + p.h / 2, (p.baseX ?? p.x) + (p.moveRange ?? 0) + p.w / 2, p.y + p.h / 2);
      }
      if (p.id === 'crown') { g.fillStyle(0xffd877).fillTriangle(p.x + p.w / 2, p.y - 40, p.x + p.w / 2, p.y - 20, p.x + p.w / 2 + 20, p.y - 30); g.lineStyle(2, 0xffd877).lineBetween(p.x + p.w / 2, p.y - 40, p.x + p.w / 2, p.y); }
    }
    const box=this.drag;
    if(box?.kind==='box'){const x=Math.min(box.x,box.endX??box.x),y=Math.min(box.y,box.endY??box.y),w=Math.abs((box.endX??box.x)-box.x),h=Math.abs((box.endY??box.y)-box.y);const color=this.tool==='erase'?0xff9571:0xffde8f;g.fillStyle(color,.15).fillRect(x,y,w,h);g.lineStyle(2/zoom,color).strokeRect(x,y,w,h);}
    const point = sim?.retryPoint ?? spawnInfo.center;
    g.lineStyle(2 / zoom, sim ? 0xffd877 : 0xb5f4ce, .95).strokeRect(point.x - 3, point.y - 3, PLAYER_WIDTH + 6, PLAYER_HEIGHT + 6);
    g.fillStyle(sim ? 0xffd877 : 0xb5f4ce, .2).fillRect(point.x, point.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    if (this.draft.baseMapId === 'jungle' && this.draft.platforms.some(p => p.id === 'jungle-0')) {
      const pose = vinePose(sim?.elapsed ?? 0); g.lineStyle(5, 0x93b777).lineBetween(CANOPY_VINE.x, CANOPY_VINE.y, pose.x, pose.y);
    }
    if (this.draft.baseMapId === 'forge') for (const pool of forgeLavaPools(this.activePlatforms())) {
      g.fillStyle(0xff673d, sim?.hazards ? .9 : .35).fillRect(pool.x, pool.y, pool.w, pool.h);
    }
    if (sim?.hazards) g.fillStyle(this.draft.baseMapId === 'forge' ? 0xff673d : 0x62b9e5, .5).fillRect(view.x, sim.hazardY, view.width, Math.max(0, bounds.height - sim.hazardY));
    if (sim?.player.charging) { const p = sim.player; g.fillStyle(0x091820).fillRect(p.x - 8, p.y - 12, 30, 4); g.fillStyle(0xb5f4ce).fillRect(p.x - 8, p.y - 12, p.charge01 * 30, 4); }
  }
  private mapExtent(){const world=worldForMap(this.draft.baseMapId),boxes=this.activePlatforms().map(platformBounds);const x=Math.min(0,...boxes.map(b=>b.x))-80,y=Math.min(0,...boxes.map(b=>b.y))-80;return{x,y,w:Math.max(world.width,...boxes.map(b=>b.x+b.w))+80-x,h:world.height-y};}
  private drawMinimap(): void {
    if(!this.minimap?.isConnected)return;
    const ctx = this.minimap.getContext('2d')!, w = this.minimap.width, h = this.minimap.height, extent=this.mapExtent();
    const sx=w/extent.w,sy=h/extent.h;ctx.clearRect(0,0,w,h);ctx.save();ctx.translate(-extent.x*sx,-extent.y*sy);
    for (const p of this.activePlatforms()) { ctx.fillStyle = p.id === this.selected ? '#b5f4ce' : p.id === 'crown' ? '#f5cf7c' : '#5f8590'; ctx.fillRect(p.x * sx, p.y * sy, Math.max(2, p.w * sx), Math.max(1, p.h * sy)); }
    const view = this.cameras.main.worldView; ctx.strokeStyle = '#d1eeef'; ctx.lineWidth = 1; ctx.strokeRect(view.x * sx, view.y * sy, view.width * sx, Math.max(4, view.height * sy));
    const p = this.simulation?.player ?? this.draft.spawn; ctx.fillStyle = '#fce5a2'; ctx.fillRect(p.x * sx - 2, p.y * sy - 2, 4, 4);ctx.restore();
  }

  private dialog(title: string): HTMLDialogElement {
    this.keys.clear(); const dialog = this.el<HTMLDialogElement>('.editor-dialog');
    dialog.innerHTML = '<header><h3></h3><button aria-label="Close dialog">×</button></header><div class="editor-dialog-content"></div>';
    dialog.querySelector('h3')!.textContent = title; dialog.querySelector('button')!.onclick = () => dialog.close();
    if (!dialog.open) dialog.showModal(); return dialog;
  }
  private showMenu():void{
    const content=this.dialog('Map menu').querySelector('.editor-dialog-content')!;
    content.innerHTML='<div class="editor-file-actions"><button data-action="maps">'+icon('grid')+'Select map</button><button data-action="library">'+icon('save')+'My maps</button><button data-action="new">'+icon('copy')+'New map</button><button data-action="export">'+icon('save')+'Export file</button><button data-action="import">'+icon('copy')+'Import file</button><button data-action="exit">'+icon('home')+'Exit workshop</button></div>';
  }
  private showMaps():void{
    const dialog=this.dialog('Choose your map'),content=dialog.querySelector('.editor-dialog-content')!;
    content.innerHTML='<div class="editor-map-grid"></div><div class="editor-row"><button data-action="library">My saved maps</button><button data-action="new">Empty course</button></div>';
    const grid=content.querySelector('.editor-map-grid')!;
    for(const map of MAPS){
      const button=document.createElement('button'),img=document.createElement('img'),name=document.createElement('span');
      button.setAttribute('aria-label','Remix '+map.name);img.src=mapThumbnail(map.id);img.alt='';img.draggable=false;name.textContent=map.name;button.append(img,name);
      button.onclick=()=>{if(this.archiveCurrent()){this.openDraft(createDraft(map.id));dialog.close();}};grid.append(button);
    }
  }
  private showView():void{
    const content=this.dialog('View & playtest').querySelector('.editor-dialog-content')!;
    content.innerHTML='<label>Snap<select aria-label="Grid snap"><option value="0">Off</option><option value="4">4 px</option><option value="8">8 px</option><option value="16">16 px</option><option value="32">32 px</option></select></label><label class="editor-check"><input type="checkbox" data-setting="grid">Grid</label><label class="editor-check"><input type="checkbox" data-setting="outlines">Collision outlines</label><label class="editor-check"><input type="checkbox" data-setting="hazards">Playtest hazards</label>';
    const snap=content.querySelector('select')!;snap.value=String(this.snap);snap.onchange=()=>{this.snap=Number(snap.value);};
    for(const setting of ['grid','outlines','hazards'] as const){
      const input=content.querySelector<HTMLInputElement>('[data-setting="'+setting+'"]')!;input.checked=this[setting];
      input.onchange=()=>{this[setting]=input.checked;if(setting==='hazards'&&this.simulation)this.simulation.hazards=input.checked;};
    }
  }
  private showOverview():void{
    const dialog=this.dialog('Map overview'),content=dialog.querySelector('.editor-dialog-content')!;
    content.innerHTML='<canvas class="editor-minimap" width="500" height="400" aria-label="Map overview"></canvas><div class="editor-row"><button data-action="home">Start</button><button data-action="finish">Finish</button></div>';
    this.minimap=content.querySelector('canvas')!;this.drawMinimap();
    this.minimap.onpointerdown=event=>{
      const r=this.minimap!.getBoundingClientRect(),extent=this.mapExtent(),x=extent.x+(event.clientX-r.left)/r.width*extent.w,y=extent.y+(event.clientY-r.top)/r.height*extent.h;
      if(this.simulation){this.simulation.flying=true;this.simulation.teleport(x,y);this.refreshUi();}
      this.focusPoint(x,y);dialog.close();
    };
  }
  private showRandomize():void{
    if(this.simulation)this.stopTest();
    const dialog=this.dialog('Randomize a climb'),content=dialog.querySelector('.editor-dialog-content')!;
    content.innerHTML='<form class="editor-random-form"><div class="editor-fields"><label>Theme<select name="theme" aria-label="Random map theme">'+MAPS.map(m=>'<option value="'+m.id+'">'+m.name+'</option>').join('')+'</select></label><label>Difficulty<select name="difficulty" aria-label="Difficulty"><option value="gentle">Gentle</option><option value="steady">Steady</option><option value="bold">Bold</option></select></label><label>Jumps<input name="jumps" aria-label="Jump count" type="number" min="4" max="40" value="12" required></label><label>Platform width<input name="width" aria-label="Platform width" type="number" min="80" max="160" value="128" required></label><label class="editor-wide">Seed<input name="seed" aria-label="Random seed" maxlength="80" required></label></div><div class="editor-row"><button type="submit" class="editor-generate">'+icon('dice')+'Generate</button></div><p class="editor-generation-status" role="status"></p></form>';
    const form=content.querySelector('form')!,theme=form.elements.namedItem('theme') as HTMLSelectElement,seed=form.elements.namedItem('seed') as HTMLInputElement;
    theme.value=this.draft.baseMapId;seed.value=Math.random().toString(36).slice(2,8);
    form.onsubmit=async event=>{
      event.preventDefault();if(!form.reportValidity())return;
      const data=new FormData(form),options:CourseOptions={theme:String(data.get('theme')) as MapId,jumps:Number(data.get('jumps')),width:Number(data.get('width')),difficulty:String(data.get('difficulty')) as CourseOptions['difficulty'],seed:String(data.get('seed'))};
      const button=form.querySelector<HTMLButtonElement>('.editor-generate')!,status=form.querySelector('.editor-generation-status')!;
      button.disabled=true;this.generation?.abort();const controller=new AbortController();this.generation=controller;
      const cancel=()=>controller.abort();dialog.addEventListener('close',cancel,{once:true});
      try{
        const result=await generateCourse(options,async(done,total)=>{status.textContent='Checking jumps '+done+' / '+total;await new Promise<void>(resolve=>setTimeout(resolve,0));},controller.signal);
        if(controller.signal.aborted)return;
        if(this.archiveCurrent()){this.openDraft(result.draft);this.verifiedJumps=result.actions.length;this.refreshUi();dialog.close();this.toast(result.actions.length+' jumps · full route verified');}
      }catch(error){if(!controller.signal.aborted)status.textContent=this.error(error);}
      finally{button.disabled=false;dialog.removeEventListener('close',cancel);}
    };
  }
  private showLibrary(): void {
    let maps: MapDraft[];
    try { maps = readLibrary(); } catch (error) { this.toast(this.error(error), true); return; }
    const dialog = this.dialog('My maps'), content = dialog.querySelector<HTMLDivElement>('.editor-dialog-content')!;
    const note = document.createElement('p'); note.textContent = 'Saved on this browser. Export files to move maps between devices or share them.'; content.append(note);
    if (!maps.length) { const empty = document.createElement('p'); empty.textContent = 'No saved maps yet. Close this window and choose Save map.'; content.append(empty); }
    const list = document.createElement('div'); list.className = 'editor-library-list'; content.append(list);
    for (const map of maps) {
      const card = document.createElement('div'); card.className = 'editor-library-card';
      const name = document.createElement('strong'); name.textContent = map.name;
      const meta = document.createElement('small'); meta.textContent = `${MAPS.find(m => m.id === map.baseMapId)?.name} · ${map.platforms.length} objects · ${new Date(map.updatedAt).toLocaleDateString()}`;
      const open = document.createElement('button'); open.textContent = 'Open'; open.onclick = () => { if (this.archiveCurrent()) { this.openDraft(map.id === this.draft.id ? this.draft : map); dialog.close(); } };
      const copy = document.createElement('button'); copy.textContent = 'Make a copy'; copy.onclick = () => { if (this.archiveCurrent()) { this.openDraft({ ...clone(map.id === this.draft.id ? this.draft : map), id: newId(), name: `${map.name.slice(0, 70)} copy` }); dialog.close(); } };
      const remove = document.createElement('button'); remove.textContent = 'Delete'; remove.className = 'editor-danger'; remove.onclick = () => {
        if (remove.dataset.confirm !== 'yes') { remove.dataset.confirm = 'yes'; remove.textContent = 'Confirm delete'; return; }
        try { localStorage.setItem(LIBRARY_KEY, JSON.stringify(readLibrary().filter(m => m.id !== map.id))); this.showLibrary(); }
        catch (error) { this.toast(this.error(error), true); }
      };
      const row = document.createElement('div'); row.className = 'editor-row'; row.append(open, copy, remove); card.append(name, meta, row); list.append(card);
    }
  }
  private showNew(): void {
    const dialog = this.dialog('Start a new climb'), content = dialog.querySelector<HTMLDivElement>('.editor-dialog-content')!;
    content.innerHTML = `<label>Map theme<select aria-label="New map theme">${MAPS.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}</select></label><div class="editor-row"><button data-new="remix" class="primary">Remix original</button><button data-new="blank">Empty course</button></div>`;
    content.querySelector('select')!.value = this.draft.baseMapId;
    content.querySelectorAll<HTMLButtonElement>('[data-new]').forEach(b => b.onclick = () => {
      if (!this.archiveCurrent()) return;
      this.openDraft(createDraft(content.querySelector('select')!.value as MapId, b.dataset.new === 'blank')); dialog.close();
    });
  }
}

import {rewardSpinPoint} from '../game/economy';
import {worldForMap} from '../../../server/src/sim/world';
import {createSettings,preferences,settingsOpen} from '../game/settings';
import {NativeGameText} from '../game/nativeText';
import {drawMountain,renderMountainTerrain} from '../game/mountainArt';
import {mountainSection,MOUNTAIN_SECTIONS} from '../../../server/src/sim/mountain';
import {audio} from '../game/audio';
import {reward,playableOutfit} from '../game/economy';
import { saveScore, recordWin } from '../game/scores';
import { renderSnowTerrain } from "../game/snowArt";
import { renderJungleTerrain } from "../game/jungleArt";
import type { MapId } from "../../../server/src/sim/maps";
import { botOutfit, loadOutfit, outfitTexture } from "../assets/cosmetics";
import {isAnimal} from '../assets/animalRig';
import Phaser from "phaser";
import { ASSETS, BOT_ALPHA, BOT_NAME_ALPHA, LAVA_PARTICLE_RATE, LAVA_SURFACE_VISUAL_OFFSET, LOCAL_PLAYER_ALPHA } from "../assets/assetManifest";
import type { ArtAvailability } from "../assets/assetLoader";
import { desiredCameraY } from "../game/camera";
import { COLORS, GAME_HEIGHT, GAME_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH, SHAFT_LEFT, SHAFT_RIGHT, WORLD_WIDTH } from "../game/constants";
import { ClimbInput } from "../game/input";
import { formatTime } from "../game/renderer";
import type { LevelMessage, Platform, PlayerSnapshot, Snapshot } from "../game/types";
import { GameClient } from "../net/GameClient";

interface PlayerEntity {
  animationPrefix: string;
  sprite: Phaser.GameObjects.Sprite;
  name: Phaser.GameObjects.Text;
  chargeBack: Phaser.GameObjects.Rectangle;
  chargeFill: Phaser.GameObjects.Rectangle;
  targetX: number;
  targetY: number;
  previousGrounded: boolean;
  previousCharging: boolean;
  isBot: boolean;
  landUntil: number;
}

interface MiniMapHud {
  graphics: Phaser.GameObjects.Graphics;
  title: Phaser.GameObjects.Text;
  status: Phaser.GameObjects.Text;
}

const MINI_MAP = { x: 806, y: 174, width: 136, height: 348, innerX: 816, innerY: 202, innerWidth: 116, innerHeight: 278 };

export class GameScene extends Phaser.Scene {
  private nativeText?:NativeGameText;
  private lastCountdown=0;
  private flood?:Phaser.GameObjects.Image;
  private deathUi?:HTMLDivElement;
  private removeSettings?:()=>void;
  private goldEarned=0;
  private godPanel?: HTMLDivElement;
  private get world(){return worldForMap(this.mapId);}
  private get worldHeight(){return this.world.height;}
  private mapId: MapId = "forge";
  private jungleBackground?: Phaser.GameObjects.Image;
  private get hazardLabel(): string { if(this.mapId==="mountain")return "FLOOD"; return this.mapId === "snow" ? "BLIZZARD" : this.mapId === "jungle" ? "FLOOD" : "LAVA"; }
  private backdrop?: Phaser.GameObjects.Image;
  private hudObjects: Phaser.GameObjects.GameObject[] = [];
  private client = new GameClient();
  private climbInput?: ClimbInput;
  private playerEntities = new Map<string, PlayerEntity>();
  private platformEntities = new Map<string, Phaser.GameObjects.Container>();
  private artV2!: ArtAvailability;
  private localId = "";
  private playerName = "Apprentice";
  private snapshot?: Snapshot;
  private lavaSurface?: Phaser.GameObjects.TileSprite;
  private lavaBody?: Phaser.GameObjects.TileSprite;
  private lavaParticleAccumulator = 0;
  private hud?: { alive: Phaser.GameObjects.Text; timer: Phaser.GameObjects.Text; stats: Phaser.GameObjects.Text; board: Phaser.GameObjects.Text; phase: Phaser.GameObjects.Text; help: Phaser.GameObjects.Text };
  private dangerOverlay?: Phaser.GameObjects.Rectangle;
  private minimap?: MiniMapHud;
  private minimapPlatforms: Platform[] = [];
  private inputAccumulator = 0;
  private resultsStarted = false;
  private levelDrawn = false;
  private toastY = 116;

  constructor() { super("Game"); }

  init(data: { name?: string; mapId?: MapId }): void { this.playerName = data.name || "Apprentice"; this.mapId = data.mapId ?? this.registry.get("mapId") ?? "forge"; }

  create(): void {
    this.input.keyboard?.enableGlobalCapture();
    // Phaser reuses scene instances. Every round must begin with fresh network
    // and presentation state rather than references to objects destroyed at shutdown.
    this.lastCountdown=0;this.flood=undefined;this.nativeText=new NativeGameText(this);
    this.goldEarned=0;this.deathUi?.remove();this.deathUi=undefined;
    this.registry.set("outfit",playableOutfit(this.registry.get("outfit")??loadOutfit()));
    this.client = new GameClient();
    this.backdrop = undefined; this.jungleBackground = undefined;
    this.climbInput = undefined;
    this.playerEntities.clear();
    this.platformEntities.clear();
    this.localId = "";
    this.snapshot = undefined;
    this.lavaSurface = undefined;
    this.lavaBody = undefined;
    this.lavaParticleAccumulator = 0;
    this.hud = undefined;
    this.dangerOverlay = undefined;
    this.minimap = undefined;
    this.minimapPlatforms = [];
    this.inputAccumulator = 0;
    this.resultsStarted = false;
    this.levelDrawn = false;
    this.toastY = 116;
    this.artV2 = this.registry.get("artV2") as ArtAvailability;
    this.cameras.main.setBackgroundColor("#0b0810");
    this.cameras.main.setBounds(this.mapId==='mountain'?0:-(GAME_WIDTH-WORLD_WIDTH)/2, 0, this.mapId==='mountain'?this.world.width:GAME_WIDTH, this.worldHeight);
    this.cameras.main.scrollX = -(GAME_WIDTH-WORLD_WIDTH)/2;
    this.drawWorldBackdrop();
    this.createHazard();
    this.hudObjects = [];
    this.layoutHud();
    this.scale.on(Phaser.Scale.Events.RESIZE,this.layoutHud,this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN,()=>this.scale.off(Phaser.Scale.Events.RESIZE,this.layoutHud,this));
    this.climbInput = new ClimbInput(this);

    this.client.on("leave", () => { this.hud?.phase.setText("DISCONNECTED\nPress ESC for settings").setVisible(true); });
    this.client.on<LevelMessage>("level", (level) => this.drawLevel(level));
    this.client.on<Snapshot>("snapshot", (snapshot) => this.applySnapshot(snapshot));
    this.client.on<{ id: string; name: string }>("eliminated", (message) => this.showToast(`${preferences.names?message.name:'A climber'} ${this.mapId === "snow" ? "was caught by the blizzard" : (this.mapId === "jungle" || this.mapId === "mountain") ? "was swept away by the flood" : "was claimed by the forge"}`));
    void this.connect();
    this.removeSettings=createSettings(document.getElementById("game")!,undefined,()=>{void this.client.disconnect();this.scene.start("Menu");});
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => { this.removeSettings?.(); this.nativeText?.destroy();audio.lavaDistance(0);this.deathUi?.remove();this.deathUi=undefined;this.godPanel?.remove(); this.godPanel=undefined; void this.client.disconnect(); });
  }

  update(time: number, delta: number): void {
    if (!this.climbInput) return;
    if (this.climbInput.restartPressed() && !settingsOpen()) this.client.requestRestart();
    this.inputAccumulator += delta;
    if (this.inputAccumulator >= 1000 / 30) {
      this.inputAccumulator = 0;
      const input=this.climbInput.snapshot();
      if(settingsOpen())Object.assign(input,{left:false,right:false,up:false,down:false,jumpHeld:false,jumpPressed:false,jumpReleased:false,toggleFlight:false});
      this.client.sendInput(input);
    }
    this.updateEntities(delta);
    if(this.jungleBackground){
      const travel=Math.max(0,this.jungleBackground.displayHeight-GAME_HEIGHT);
      this.jungleBackground.y=-Phaser.Math.Clamp(this.cameras.main.scrollY/(this.worldHeight-GAME_HEIGHT),0,1)*travel;
    }
    if(this.mapId==='mountain'){
      const camera=this.cameras.main,collapse=this.snapshot?.players.find(p=>p.id===this.localId)?.crumblingPlatforms;
      for(const [id,c] of this.platformEntities)c.setVisible(c.y>camera.scrollY-280&&c.y<camera.scrollY+GAME_HEIGHT+100&&c.x<camera.scrollX+GAME_WIDTH+400&&c.x+(c.getData('width')??500)>camera.scrollX&&collapse?.[id]!==0);
      this.flood?.setX(camera.scrollX).setDisplaySize(GAME_WIDTH,GAME_HEIGHT+160);
    }
    this.updateLava(time, delta);
    this.updateHud();
    this.nativeText?.sync();
  }

  private async connect(): Promise<void> {
    try {
      await this.client.connect(this.playerName,this.mapId);
      this.localId = this.client.localId;
      if(this.client.supportsGodPowers) {
        this.godPanel=document.createElement("div"); this.godPanel.className="god-powers";
        this.godPanel.innerHTML='<label><input type="checkbox" aria-label="God powers"> God powers</label><small>Arrow keys fly · L land / fly</small><span aria-live="polite">Normal play</span>';
        document.getElementById("game")!.appendChild(this.godPanel);
        const checkbox=this.godPanel.querySelector("input")!;
        checkbox.addEventListener("change",()=>{ this.client.setGodPowers(checkbox.checked); checkbox.blur(); });
      }
      this.hud?.phase.setText(this.mapId === "mountain" ? "ENTERING THE MOUNTAIN..." : this.mapId === "snow" ? "ENTERING FROSTPEAK..." : this.mapId === "jungle" ? "ENTERING THE JUNGLE..." : "WAITING FOR THE FORGE...");
    } catch {
      this.hud?.phase.setText("CONNECTION LOST\nPress ESC for settings").setColor("#ff8f73");
    }
  }

  private drawWorldBackdrop(): void {
    if(this.mapId !== "forge"){ this.drawJungle(); return; }
    this.add.rectangle(-160, 0, GAME_WIDTH, this.worldHeight, 0x0b0810).setOrigin(0).setDepth(-30);
    this.backdrop = this.add.image(0, -420, ASSETS.background.key).setOrigin(0)
      .setDisplaySize(WORLD_WIDTH, 960).setDepth(-25).setScrollFactor(1, 0).setAlpha(0.56);
    for (const x of [82, WORLD_WIDTH - 98]) {
      this.add.tileSprite(x, 0, 16, this.worldHeight, ASSETS.chains.key)
        .setOrigin(0).setDepth(-15).setScrollFactor(1, 0.55).setAlpha(0.72);
    }
    for (let y = 360; y < this.worldHeight; y += 720) {
      this.add.image(y % 1440 === 360 ? 112 : WORLD_WIDTH - 112, y, ASSETS.hooks.key)
        .setDepth(-14).setScrollFactor(1, 0.55).setAlpha(0.6);
    }
    for (let y = 240; y < this.worldHeight; y += 520) {
      this.add.image(y % 1040 === 240 ? 67 : WORLD_WIDTH - 67, y, ASSETS.vents.key)
        .setDepth(-12).setScrollFactor(1, 0.35).setAlpha(0.52);
    }

    this.add.tileSprite(0, 0, 40, this.worldHeight, ASSETS.wallTiles.key)
      .setOrigin(0).setDepth(-5).setScrollFactor(1);
    this.add.tileSprite(WORLD_WIDTH - 40, 0, 40, this.worldHeight, ASSETS.wallTiles.key)
      .setOrigin(0).setDepth(-5).setScrollFactor(1).setFlipX(true);
    this.add.tileSprite(38, 0, 16, this.worldHeight, ASSETS.trim.key)
      .setOrigin(0).setDepth(-4).setScrollFactor(1);
    this.add.tileSprite(WORLD_WIDTH - 54, 0, 16, this.worldHeight, ASSETS.trim.key)
      .setOrigin(0).setDepth(-4).setScrollFactor(1).setFlipX(true);
    // These bright inner seams are the exact collision boundaries.
    this.add.rectangle(SHAFT_LEFT - 2, 0, 3, this.worldHeight, 0xd7a66d, 0.9).setOrigin(0).setDepth(-3);
    this.add.rectangle(SHAFT_RIGHT - 1, 0, 3, this.worldHeight, 0xd7a66d, 0.9).setOrigin(0).setDepth(-3);
    this.add.text(WORLD_WIDTH / 2, 32, "THE CROWN FORGE", { fontFamily: "Impact, sans-serif", fontSize: "22px", color: "#f6cf70", stroke: "#341819", strokeThickness: 5 }).setOrigin(0.5).setDepth(-3);
  }

  private drawJungle(): void {
    if(this.mapId==='mountain'){drawMountain(this);return;}
    this.cameras.main.setBackgroundColor(this.mapId==='snow'?'#263e61':'#173f37');
    this.jungleBackground=this.add.image(0,0,this.mapId==='snow'?'snow-background':'jungle-background').setOrigin(0).setScrollFactor(0).setDepth(-30);
    this.jungleBackground.setDisplaySize(GAME_WIDTH,Math.max(GAME_WIDTH*1.5,GAME_HEIGHT+500));
    // A subtle atmospheric veil keeps detailed scenery behind readable terrain.
    this.add.rectangle(0,0,4000,4000,this.mapId==='snow'?0x122a4f:0x082a26,.12).setOrigin(0).setScrollFactor(0).setDepth(-29);

    this.add.text(320,42,this.mapId==='snow'?'◆  FROSTPEAK SUMMIT  ◆':'◆  THE CANOPY CROWN  ◆',{fontFamily:'monospace',fontSize:'16px',color:'#f3df93',stroke:'#163422',strokeThickness:4}).setOrigin(.5);
  }

  private drawLevel(level: LevelMessage): void {
    if (this.levelDrawn) return;
    this.levelDrawn = true;
    this.minimapPlatforms = level.platforms;
    for (const platform of level.platforms) this.renderPlatform(platform);
  }

  private renderPlatform(platform: Platform): void {
    const container = this.add.container(platform.x, platform.y).setDepth(1).setData('width',platform.w);
    this.platformEntities.set(platform.id, container);
    if(this.mapId === 'mountain'){renderMountainTerrain(this,platform,container);return;}
    if(this.mapId === 'snow'){ renderSnowTerrain(this,platform,container); return; }
    if(this.mapId === 'jungle'){
      renderJungleTerrain(this,platform,container);
      return;
    }
    const frames = { stone: 0, anvil: 1, wood: 2, cracked: 3, moving: 4, ice: 1 };
    const frame = platform.id === "crown" || /route-\d-9/.test(platform.id) ? 5 : frames[platform.type];
    if (frame === 5) {
      // Cap each end once; repeat the middle instead of stretching large ornaments.
      container.add(this.add.image(0,0,ASSETS.restPlatform.key,"left").setOrigin(0).setDisplaySize(8,24));
      container.add(this.add.tileSprite(8,0,platform.w-16,32,ASSETS.restPlatform.key,"middle").setOrigin(0).setScale(1,0.75));
      container.add(this.add.image(platform.w-8,0,ASSETS.restPlatform.key,"right").setOrigin(0).setDisplaySize(8,24));
    } else {
      container.add(this.add.image(0, 0, ASSETS.platformTiles.key, frame).setOrigin(0).setDisplaySize(platform.w, 26)
        .setTint(platform.type === "ice" ? 0x94e8ef : 0xffffff));
    }
    // The thin landing edge exactly matches the physical surface.
    container.add(this.add.rectangle(0, 0, platform.w, 2, frame === 5 ? 0xbad4df : platform.type === "moving" ? 0x78f1dd : 0xd9dfce).setOrigin(0));
    if (platform.type === "moving") container.add(this.add.text(platform.w / 2, -9, "<  >", {fontFamily:"monospace",fontSize:"10px",color:"#78f1dd"}).setOrigin(0.5,1));
    if (/route-\d-9/.test(platform.id)) container.add(this.add.image(platform.w / 2, -3, ASSETS.anvils.key).setOrigin(0.5,1).setScale(0.6));
  }

  private createHazard(): void {
    if(this.mapId==='mountain'){
      this.flood=this.add.image(0,0,'ascent-ai-props/water').setOrigin(0).setDepth(24).setDisplaySize(GAME_WIDTH,GAME_HEIGHT+160);return;
    }
    if(this.mapId==='snow'){
      const left=-(GAME_WIDTH-WORLD_WIDTH)/2;
      this.lavaBody=this.add.tileSprite(left,0,GAME_WIDTH,this.worldHeight,'snow-storm').setOrigin(0).setDepth(24).setAlpha(.94);
      this.lavaSurface=this.add.tileSprite(left,0,GAME_WIDTH,16,'snow-storm-edge').setOrigin(0).setDepth(25);return;
    }
    if(this.mapId==='jungle'){
      const left=-(GAME_WIDTH-WORLD_WIDTH)/2;
      const key='continuous-flood';
      if(!this.textures.exists(key)){
        const texture=this.textures.createCanvas(key,1024,4096)!,c=texture.context;
        c.fillStyle='#03283c';c.fillRect(0,0,1024,4096);
        c.drawImage(this.textures.get('jungle-flood-body').getSourceImage() as HTMLImageElement,0,0,1024,320);
        const fade=c.createLinearGradient(0,120,0,320);fade.addColorStop(0,'#03283c00');fade.addColorStop(1,'#03283c');
        c.fillStyle=fade;c.fillRect(0,120,1024,200);texture.refresh();
      }
      this.flood=this.add.image(left,0,key).setOrigin(0).setDepth(24).setAlpha(.9).setDisplaySize(GAME_WIDTH,this.worldHeight+GAME_HEIGHT);
      return;
    }
    this.lavaBody = this.add.tileSprite(0, 0, WORLD_WIDTH, this.worldHeight, ASSETS.lavaBody.key).setOrigin(0).setDepth(24);
    this.lavaSurface = this.add.tileSprite(0, 0, WORLD_WIDTH, 16, ASSETS.lavaSurface.key).setOrigin(0).setDepth(25);
  }

  private createHud(): void {
    const before = new Set(this.children.list);
    const left = (GAME_WIDTH-WORLD_WIDTH)/2 - 120;
    const right = (GAME_WIDTH+WORLD_WIDTH)/2 + 8;
    Object.assign(MINI_MAP,{x:right,y:174,width:112,height:GAME_HEIGHT-190,innerX:right+8,innerY:202,innerWidth:96,innerHeight:GAME_HEIGHT-260});
    if(this.mapId === "forge") this.add.tileSprite(0,0,GAME_WIDTH,GAME_HEIGHT,ASSETS.wallTiles.key).setOrigin(0).setScrollFactor(0).setDepth(-29).setAlpha(0.12);
    const panel = this.add.graphics().setScrollFactor(0).setDepth(100);
    panel.fillStyle(0x101822,1).fillRect(left,16,112,110).fillRect(right,16,112,146);
    panel.lineStyle(1,0x6f5144).strokeRect(left,16,112,110).strokeRect(right,16,112,146);
    const style = {fontFamily:"monospace",fontSize:"10px",color:"#f2e8dc"};
    const text=(x:number,y:number,value:string)=>this.add.text(x,y,value,style).setScrollFactor(0).setDepth(101);
    this.hud = {
      alive:text(left+10,29,"24 ALIVE").setColor("#ffc65a"),
      timer:text(left+10,49,"00:00"),
      stats:text(left+10,75,`HEIGHT 0m\n${this.hazardLabel} --m`).setLineSpacing(6),
      board:text(right+8,29,"TOP OF THE TOWER").setFontSize(8).setLineSpacing(8),
      phase:text(GAME_WIDTH/2,72,"CONNECTING...").setOrigin(0.5).setFontSize(30).setStroke("#1c1115",7).setDepth(110),
      help:text(GAME_WIDTH/2,GAME_HEIGHT-14,this.mapId==="mountain"?"A / D WALK    HOLD SPACE · RELEASE TO LEAP    PALE RIMS = LANDINGS":"A / D WALK    HOLD SPACE TO AIM    RELEASE TO LEAP").setOrigin(0.5,1).setFontSize(9)
    };
    this.dangerOverlay = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, this.mapId !== "forge" ? 0x1fb8c9 : 0xff321c, 0).setOrigin(0).setScrollFactor(0).setDepth(90);
    this.minimap = {
      graphics: this.add.graphics().setScrollFactor(0).setDepth(102),
      title: this.add.text(MINI_MAP.x + 10, MINI_MAP.y + 7, this.mapId === "snow" ? "FROSTPEAK // 720m" : this.mapId === "jungle" ? "CANOPY MAP // 720m" : "TOWER MAP  //  720m", {
        fontFamily: "monospace", fontSize: "8px", fontStyle: "bold", color: "#d9c5ad"
      }).setScrollFactor(0).setDepth(103),
      status: this.add.text(MINI_MAP.x + 10, MINI_MAP.y + MINI_MAP.height - 36, `YOU --\n${this.hazardLabel} --`, {
        fontFamily: "monospace", fontSize: "7px", fontStyle: "bold", color: "#fff0be", lineSpacing: 2
      }).setScrollFactor(0).setDepth(103)
    };
    this.hudObjects=this.children.list.filter(object=>!before.has(object));
  }

  private layoutHud(): void {
    for(const object of this.hudObjects) object.destroy();
    this.hudObjects=[];
    this.cameras.main.setBounds(this.mapId==='mountain'?0:-(GAME_WIDTH-WORLD_WIDTH)/2,0,this.mapId==='mountain'?this.world.width:GAME_WIDTH,this.worldHeight);
    this.cameras.main.scrollX=-(GAME_WIDTH-WORLD_WIDTH)/2;
    this.createHud();
    this.jungleBackground?.setDisplaySize(GAME_WIDTH,Math.max(GAME_WIDTH*1.5,GAME_HEIGHT+500));
    if(this.mapId!=='forge'){
      if(this.levelDrawn){
        for(const container of this.platformEntities.values())container.destroy(true);
        this.platformEntities.clear();
        for(const platform of this.minimapPlatforms)this.renderPlatform(platform);
      }
      for(const water of [this.lavaBody,this.lavaSurface])water?.setX(-(GAME_WIDTH-WORLD_WIDTH)/2).setSize(GAME_WIDTH,water.height);
      this.flood?.setX(-(GAME_WIDTH-WORLD_WIDTH)/2).setDisplaySize(GAME_WIDTH,this.worldHeight+GAME_HEIGHT);
    }
    if(this.snapshot)this.drawMinimap(this.snapshot);
  }

  private applySnapshot(snapshot: Snapshot): void {
    if(snapshot.phase==='surge' && this.snapshot?.phase!=='surge') {
      this.cameras.main.scrollY=Phaser.Math.Clamp(snapshot.hazardY-GAME_HEIGHT*.65,0,this.worldHeight-GAME_HEIGHT);
      const score=snapshot.placements?.find(p=>p.id===this.client.localId);
      if(score && !snapshot.assisted){rewardSpinPoint(this.mapId+':'+snapshot.roundStartedAt);saveScore(this.mapId,score);if(score.place===1)recordWin(this.mapId+':'+snapshot.roundStartedAt);this.goldEarned=reward(this.mapId+':'+snapshot.roundStartedAt,score.place);}
    }
    if(snapshot.phase==='countdown'){const count=Math.max(1,Math.ceil((snapshot.countdownEndsAt-snapshot.serverTime)/1000));if(count!==this.lastCountdown){audio.countdown();this.lastCountdown=count;}}
    if(snapshot.phase==='playing' && this.snapshot?.phase==='countdown')audio.countdown(true);
    if(!this.snapshot){const arrival=snapshot.players.find(p=>p.id===this.client.localId);if(arrival)this.cameras.main.scrollY=desiredCameraY(arrival.y,this.worldHeight);}
    this.snapshot = snapshot;
    const self=snapshot.players.find(p=>p.id===this.client.localId);
    if(self&&!self.alive&&!this.deathUi){
      if(!snapshot.assisted&&snapshot.roundStartedAt)rewardSpinPoint(this.mapId+':'+snapshot.roundStartedAt);
      this.deathUi=document.createElement('div');this.deathUi.className='elimination-ui';
      this.deathUi.innerHTML='<h1>ELIMINATED</h1><div><button type="button">Spectate</button><button type="button">Leave</button></div>';
      const [spectate,leave]=this.deathUi.querySelectorAll('button');
      spectate.addEventListener('click',()=>{this.client.spectate();spectate.hidden=true;this.godPanel?.remove();});
      leave.addEventListener('click',()=>{void this.client.disconnect();this.scene.start('Menu');});
      document.getElementById('game')!.append(this.deathUi);this.godPanel?.remove();
    }
    audio.lavaDistance(this.mapId==='forge'&&self&&(self.alive||self.ghost)?Math.pow(Math.max(0,1-Math.abs(snapshot.hazardY-self.y-PLAYER_HEIGHT)/180),2):0);
    const collapse = snapshot.players.find(p => p.id === this.localId)?.crumblingPlatforms;
    for (const platform of this.minimapPlatforms) {
      if (!platform.crumbleSeconds) continue;
      const remaining = collapse?.[platform.id];
      const container = this.platformEntities.get(platform.id);
      container?.setVisible(remaining !== 0);
      container?.setAlpha(remaining === undefined ? 1 : .45 + .55 * (remaining / platform.crumbleSeconds));
      container?.setX(platform.x + (remaining && remaining < .6 ? Math.sin(snapshot.serverTime*.065)*2 : 0));
    }
    const ids = new Set(snapshot.players.map(p => p.id));
    for (const [id, entity] of this.playerEntities) if (!ids.has(id)) {
      entity.sprite.destroy(); entity.name.destroy(); entity.chargeBack.destroy(); entity.chargeFill.destroy(); this.playerEntities.delete(id);
    }
    this.localId = this.client.localId || this.localId;
    for (const player of snapshot.players) {
      let entity = this.playerEntities.get(player.id);
      if (!entity) {
        entity = this.createPlayerEntity(player);
        this.playerEntities.set(player.id, entity);
      }
      this.applyPlayerVisual(entity, player);
      entity.targetX = player.x;
      entity.targetY = player.y;
    }
    if (this.lavaSurface && this.lavaBody) {
      this.lavaSurface.y = snapshot.hazardY + LAVA_SURFACE_VISUAL_OFFSET;
      this.lavaBody.y = snapshot.hazardY + (this.mapId !== "forge" ? 7 : 14);
    }
    if(this.flood)this.flood.y=snapshot.hazardY;
    for (const position of snapshot.platforms ?? []) {
      const platform = this.minimapPlatforms.find((candidate) => candidate.id === position.id);
      if (platform) {platform.x = position.x;if(position.y!==undefined)platform.y=position.y;}
      this.platformEntities.get(position.id)?.setPosition(position.x,position.y??platform?.y??0);
    }
    this.drawMinimap(snapshot);
    if (snapshot.phase === "finished" && !this.resultsStarted && snapshot.placements) {
      this.resultsStarted = true;
      if(!snapshot.assisted&&snapshot.placements.some(p=>p.id===this.localId))rewardSpinPoint(this.mapId+':'+snapshot.roundStartedAt);
      const winner = snapshot.players.find((player) => player.id === snapshot.winnerId);
      const placement = snapshot.placements.find((player) => player.id === this.localId);
      this.time.delayedCall(900, () => {
        void this.client.disconnect();
        this.scene.start("Results", { name: this.playerName, winner: winner?.name || "The Forge", placement: placement?.place || snapshot.players.length, total: snapshot.players.length, placements:snapshot.placements, localId:this.localId, assisted:snapshot.assisted,goldEarned:this.goldEarned,mapId:this.mapId });
      });
    }
  }

  private createPlayerEntity(player: PlayerSnapshot): PlayerEntity {
    const local = player.id === this.localId;
    const outfit=local ? this.registry.get("outfit") ?? loadOutfit() : botOutfit(player.id);
    const texture = outfitTexture(this,outfit);
    const animationPrefix = texture;
    const frameHeight=this.textures.get(texture).get(0).height;
    const sprite = this.add.sprite(player.x + PLAYER_WIDTH / 2, player.y + PLAYER_HEIGHT, texture).setOrigin(0.5,isAnimal(outfit.character)?(frameHeight-1)/frameHeight:this.mapId !== "forge" ? 30/32 : 1).setDepth(local ? 20 : 10);
    if(outfit.wardrobe2)sprite.setScale(32/frameHeight);
    sprite.play(`${animationPrefix}-idle`);
    if (!player.isBot && this.artV2.player) sprite.play(`${animationPrefix}-idle`);
    const name = this.add.text(player.x + PLAYER_WIDTH / 2, player.y - 8, local ? player.name.toUpperCase() : player.name, {
      fontFamily: "monospace", fontSize: local ? "9px" : "8px", color: local ? "#fff1c7" : "#b8b2c8", stroke: "#0b0910", strokeThickness: 3
    }).setOrigin(0.5, 1).setDepth(local ? 21 : 11);
    const chargeBack = this.add.rectangle(player.x - 4, player.y + PLAYER_HEIGHT + 6, 22, 4, 0x161219, 0.9).setOrigin(0).setDepth(local ? 21 : 11).setVisible(false);
    const chargeFill = this.add.rectangle(player.x - 3, player.y + PLAYER_HEIGHT + 7, 0, 2, 0xffbd3e, 1).setOrigin(0).setDepth(local ? 22 : 12).setVisible(false);
    sprite.setAlpha(local ? LOCAL_PLAYER_ALPHA : BOT_ALPHA);
    name.setAlpha(local ? 1 : player.isBot ? 0.6 : BOT_NAME_ALPHA); chargeBack.setAlpha(local ? 1 : 0.42); chargeFill.setAlpha(local ? 1 : 0.42);
    return {
      sprite, name, chargeBack, chargeFill, animationPrefix, targetX: player.x, targetY: player.y,
      previousGrounded: player.grounded, previousCharging: player.charging, isBot: player.isBot, landUntil: 0
    };
  }

  private applyPlayerVisual(entity: PlayerEntity, player: PlayerSnapshot): void {
    if(player.ghost){entity.sprite.setVisible(true).setAlpha(.42).setTint(0xc2eaff).setFlipX(player.facing<0);entity.sprite.play(entity.animationPrefix+'-idle',true);entity.name.setText(player.name+' · GHOST').setAlpha(.6);entity.chargeBack.setVisible(false);entity.chargeFill.setVisible(false);return;}
    if (!player.alive) {
      entity.sprite.setVisible(!player.departed);entity.name.setVisible(!player.departed);
      if (!entity.isBot && this.artV2.player) entity.sprite.play(`${entity.animationPrefix}-eliminated`, true);
      entity.sprite.setAlpha(entity.isBot ? 0.08 : 0.5).setTint(entity.isBot ? 0x5f6178 : 0xffffff);
      entity.name.setText(`${player.name}  `).setAlpha(0.2);
      entity.chargeBack.setVisible(false); entity.chargeFill.setVisible(false);
      return;
    }
    if(player.id===this.localId){audio.step(player.grounded&&!player.charging&&Math.abs(player.x-entity.targetX)>.5,this.mapId);if(entity.previousGrounded&&!player.grounded&&player.vy<0)audio.jump((this.registry.get('outfit')??loadOutfit()).character==='puppy');}
    entity.sprite.setFlipX(player.facing < 0).setAngle(0);
    {
      entity.sprite.setAlpha(entity.isBot ? 0.72 : LOCAL_PLAYER_ALPHA).clearTint();
      if (!entity.previousGrounded && player.grounded) entity.landUntil = this.time.now + 180;
      if (this.artV2.player) {
        const animation = entity.sprite.anims.currentAnim?.key || "";
        if (this.time.now < entity.landUntil) entity.sprite.play(`${entity.animationPrefix}-land`, true);
        else if (player.charging && !entity.previousCharging) entity.sprite.play(`${entity.animationPrefix}-charge-start`, true).chain(`${entity.animationPrefix}-charge-loop`);
        else if (player.charging && ![`${entity.animationPrefix}-charge-start`, `${entity.animationPrefix}-charge-loop`].includes(animation)) entity.sprite.play(`${entity.animationPrefix}-charge-loop`, true);
        else if (!player.grounded && player.vy < 0) entity.sprite.play(`${entity.animationPrefix}-jump`, true);
        else if (!player.grounded) entity.sprite.play(`${entity.animationPrefix}-fall`, true);
        else if (!player.charging && this.time.now >= entity.landUntil) entity.sprite.play(`${entity.animationPrefix}-${Math.abs(player.x-entity.targetX)>.5?'walk':'idle'}`, true);
      }
    }
    entity.chargeBack.setVisible(player.charging);
    entity.chargeFill.setVisible(player.charging).width = 20 * player.charge01;
    if (entity.previousCharging && !player.charging && player.vy < 0) this.burst(player.x + 7, player.y + 18, ASSETS.spark.key, 0xffb331);
    if (!entity.previousGrounded && player.grounded) this.burst(player.x + 7, player.y + 20, ASSETS.dust.key, 0xc7b29c);
    entity.previousCharging = player.charging;
    entity.previousGrounded = player.grounded;
  }

  private updateEntities(delta: number): void {
    const smoothing = 1 - Math.pow(0.000001, delta / 1000);
    for (const entity of this.playerEntities.values()) {
      const x = Phaser.Math.Linear(entity.sprite.x, entity.targetX + PLAYER_WIDTH / 2, smoothing);
      const y = Phaser.Math.Linear(entity.sprite.y, entity.targetY + PLAYER_HEIGHT, smoothing);
      entity.sprite.setPosition(Math.round(x), Math.round(y));
      entity.name.setVisible(preferences.names && entity.sprite.visible);
      entity.name.setPosition(entity.sprite.x, entity.sprite.y - PLAYER_HEIGHT - 8);
      entity.chargeBack.setPosition(entity.sprite.x - 11, entity.sprite.y + 6);
      entity.chargeFill.setPosition(entity.sprite.x - 10, entity.sprite.y + 7);
    }
    if(this.snapshot?.phase==='surge') {
      this.cameras.main.scrollY=Phaser.Math.Clamp(this.snapshot.hazardY-GAME_HEIGHT*.65,0,this.worldHeight-GAME_HEIGHT);
      return;
    }
    const spectating=(this.snapshot?.phase==='victory' || this.snapshot?.phase==='finished');
    const local = this.playerEntities.get(spectating ? this.snapshot?.winnerId || this.localId : this.localId);
    if (local) {
      if(spectating)this.cameras.main.setBounds(this.mapId==='mountain'?0:-(GAME_WIDTH-WORLD_WIDTH)/2,-220,this.mapId==='mountain'?this.world.width:GAME_WIDTH,this.worldHeight+220);
      const desired = spectating ? -180 : desiredCameraY(local.sprite.y - PLAYER_HEIGHT,this.worldHeight);
      this.cameras.main.scrollY = Phaser.Math.Linear(this.cameras.main.scrollY, desired, 0.18);
      const targetX=this.mapId==='mountain'?Phaser.Math.Clamp(local.sprite.x-GAME_WIDTH*.5+(this.snapshot?.players.find(p=>p.id===this.localId)?.facing??0)*80,0,Math.max(0,this.world.width-GAME_WIDTH)):-(GAME_WIDTH-WORLD_WIDTH)/2;
      this.cameras.main.scrollX=Phaser.Math.Linear(this.cameras.main.scrollX,targetX,1-Math.exp(-delta/180));
    }
  }

  private updateLava(time: number, delta: number): void {
    if (!this.lavaSurface || !this.lavaBody) return;
    if(this.mapId!=='forge'){
      this.lavaSurface.tilePositionX=time*.027;
      this.lavaBody.tilePositionX=time*.011;
      // Cool foam and drifting water highlights replace embers entirely.
      if(time%220<delta && this.lavaSurface.y>this.cameras.main.scrollY-20 && this.lavaSurface.y<this.cameras.main.scrollY+GAME_HEIGHT){
        const foam=this.add.rectangle(Phaser.Math.Between(54,586),this.lavaSurface.y+4,Phaser.Math.Between(3,9),2,0xc3f8e5,.8).setDepth(26);
        this.tweens.add({targets:foam,x:foam.x+22,y:foam.y+7,alpha:0,duration:650,onComplete:()=>foam.destroy()});
      }
      return;
    }
    this.lavaSurface.tilePositionX = Math.floor(time / 90) % 64;
    this.lavaSurface.tilePositionX += delta * 0.025;
    this.lavaBody.tilePositionX -= delta * 0.009;
    this.lavaBody.tilePositionY -= delta * 0.014;
    const cameraTop = this.cameras.main.scrollY;
    const visible = this.lavaSurface.y > cameraTop - 40 && this.lavaSurface.y < cameraTop + GAME_HEIGHT + 100;
    if (!visible) return;
    this.lavaParticleAccumulator += delta;
    const interval = 1000 / (LAVA_PARTICLE_RATE * 3);
    while (this.lavaParticleAccumulator >= interval) {
      this.lavaParticleAccumulator -= interval;


      const particle = this.add.image(
        Phaser.Math.Between(36, WORLD_WIDTH - 36), this.lavaSurface.y + Phaser.Math.Between(1, 10),
        ASSETS.ember.key
      ).setDepth(26).setAlpha(0.95).setScale(1.5);
      this.tweens.add({
        targets: particle, y: particle.y - Phaser.Math.Between(50, 125), x: particle.x + Phaser.Math.Between(-10, 10),
        alpha: 0, duration: Phaser.Math.Between(500, 950), onComplete: () => particle.destroy()
      });
    }
  }

  private updateHud(): void {
    if (!this.snapshot || !this.hud) return;
    const snapshot = this.snapshot;
    if(this.godPanel) {
      const checked=this.godPanel.querySelector("input")!.checked;
      this.godPanel.querySelector("span")!.textContent=checked?(this.client.isFlying?"Flying · invincible":"Landed · invincible"):"Normal play";
    }
    const local = snapshot.players.find((player) => player.id === this.localId);
    const alive = snapshot.players.filter((player) => player.alive).length;
    const humans = snapshot.players.filter(p => !p.isBot).length;
    this.hud.alive.setText(`${alive} ALIVE / ${humans > 1 ? "ONLINE" : "BOTS"}`);
    if (this.backdrop && local) this.backdrop.y = -420 + Phaser.Math.Clamp((this.worldHeight-240-local.y)/6900,0,1)*420;
    const elapsed = snapshot.roundStartedAt ? (snapshot.serverTime - snapshot.roundStartedAt) / 1000 : 0;
    this.hud.timer.setText(formatTime(elapsed));
    if(this.mapId==='mountain' && local)this.minimap?.title.setText(MOUNTAIN_SECTIONS[mountainSection(local.y)]);
    if(this.mapId==='snow' && local){
      const chapter=Phaser.Math.Clamp(Math.floor(local.maxHeight/1200),0,5);
      this.minimap?.title.setText(['PINE VALLEY','FROZEN FALLS','GLACIER STEPS','WHITE RIDGE','THIN AIR','FROSTPEAK'][chapter]);
    }
    if(this.mapId==='jungle' && local){
      const chapter=Phaser.Math.Clamp(Math.floor(local.maxHeight/1200),0,5);
      this.minimap?.title.setText(['ROOT GARDEN','FERN HOLLOW','HANGING GROVE','MOSSBOUND RUINS','EMERALD HEIGHTS','CANOPY CROWN'][chapter]);
    }
    const hazardDistance = local ? Math.max(0, snapshot.hazardY - (local.y + PLAYER_HEIGHT)) : 0;
    this.hud.stats.setText(`HEIGHT ${String(Math.round((local?.maxHeight || 0) / 10)).padStart(4, " ")}m\n${this.hazardLabel.padEnd(7)}${String(Math.round(hazardDistance / 10)).padStart(4, " ")}m`);
    const leaders = [...snapshot.players].sort((a, b) => b.maxHeight - a.maxHeight).slice(0, 5);
    this.hud.board.setText(["TOP OF THE TOWER", ...leaders.map((player, index) => `${index + 1}. ${player.isBot ? " " : "*"}${(preferences.names?player.name:'Climber').slice(0,9).padEnd(9)} ${Math.round(player.maxHeight / 10)}m`)].join("\n"));
    this.hud.help.setVisible(!local?.ghost);
    if(snapshot.phase === "waiting") {
      this.hud.phase.setText(`WAITING FOR PLAYERS  ${snapshot.players.length}/24`).setFontSize(24).setVisible(true);
      this.hud.alive.setText(`${snapshot.players.length}/24 JOINED`);
    } else if (snapshot.phase === "countdown") {
      const count = Math.max(1, Math.ceil((snapshot.countdownEndsAt - snapshot.serverTime) / 1000));
      this.hud.phase.setText(String(count)).setFontSize(56).setVisible(true);
    } else if (snapshot.phase === "playing") {
      this.hud.phase.setText(local?.alive === false ? "" : "GO!").setFontSize(local?.alive === false ? 20 : 30);
      this.hud.phase.setVisible(elapsed < 1.3 || local?.alive === false);
    } else if (snapshot.phase === 'surge') {
      this.hud.phase.setText(`${this.hazardLabel} SURGE!`).setFontSize(32).setColor('#ffbb55').setVisible(true);
    } else if (snapshot.phase === 'victory' || snapshot.phase === "finished") {
      const winner = snapshot.players.find((player) => player.id === snapshot.winnerId);
      this.hud.phase.setText(`${preferences.names?(winner?.name || "A CLIMBER"):"A CLIMBER"} WINS${winner?.id===this.localId ? " · TAKE A VICTORY JUMP!" : " · WATCH THE WINNER"}`).setFontSize(28).setVisible(true);
    }
    if(this.deathUi)this.hud.phase.setVisible(false);
    const danger = snapshot.phase==='surge' ? .18 + Math.sin(this.time.now*.02)*.07 : local?.alive ? Phaser.Math.Clamp(1 - hazardDistance / 400, 0, 0.46) : 0;
    this.dangerOverlay?.setAlpha(danger);
    if (danger > 0.22 && Math.random() < 0.025) this.cameras.main.shake(80, 0.0022);
  }

  private drawMinimap(snapshot: Snapshot): void {
    if (!this.minimap) return;
    const { graphics: g, status } = this.minimap;
    const { x, y, width, height, innerX, innerY, innerWidth, innerHeight } = MINI_MAP;
    const mapX = (worldX: number) => innerX + Phaser.Math.Clamp((worldX - this.world.left) / (this.world.right - this.world.left), 0, 1) * innerWidth;
    const mapY = (worldY: number) => innerY + Phaser.Math.Clamp(worldY / this.worldHeight, 0, 1) * innerHeight;

    g.clear();
    g.fillStyle(0x09070d, 0.94).fillRoundedRect(x, y, width, height, 5);
    g.lineStyle(2, 0x6f5144, 0.95).strokeRoundedRect(x, y, width, height, 5);
    g.fillStyle(0x120d14, 1).fillRect(innerX, innerY, innerWidth, innerHeight);
    g.lineStyle(1, 0x8d7568, 0.65).strokeRect(innerX, innerY, innerWidth, innerHeight);

    for (const platform of this.minimapPlatforms) {
      if(snapshot.players.find(p => p.id === this.localId)?.crumblingPlatforms?.[platform.id] === 0) continue;
      const left = mapX(platform.x);
      const right = mapX(platform.x + platform.w);
      g.fillStyle(platform.type === "moving" ? 0x59dce9 : platform.type === "cracked" ? 0xb36d45 : platform.type === "anvil" ? 0xe29b4a : 0x9f8d7d, 0.78)
        .fillRect(left, Math.round(mapY(platform.y)), Math.max(2, right - left), 1);
    }

    const lavaY = mapY(snapshot.hazardY);
    g.fillStyle(this.mapId !== "forge" ? 0x1594b0 : 0xb52b14, 0.22).fillRect(innerX + 1, lavaY, innerWidth - 2, Math.max(0, innerY + innerHeight - lavaY));
    g.lineStyle(2, this.mapId !== "forge" ? 0x91ecf4 : 0xff6a24, 1).lineBetween(innerX, lavaY, innerX + innerWidth, lavaY);

    const ranked = [...snapshot.players].sort((a, b) => b.maxHeight - a.maxHeight);
    const leader = ranked[0];
    for (const player of ranked.slice().reverse()) {
      const markerX = mapX(player.x + PLAYER_WIDTH / 2);
      const bestY = mapY((this.worldHeight - 240) - player.maxHeight);
      const local = player.id === this.localId;
      const leading = player.id === leader?.id;
      const color = local ? 0xfff0a6 : COLORS[player.colorIndex % COLORS.length];
      g.fillStyle(color, player.alive ? (local ? 1 : 0.58) : 0.22).fillCircle(markerX, bestY, local ? 3.5 : 2);
      if (leading) g.lineStyle(1, 0xffc44f, 1).strokeCircle(markerX, bestY, local ? 5.5 : 4);
      if (local) g.lineStyle(1, 0xffffff, 1).strokeCircle(markerX, bestY, 5);
    }

    const local = snapshot.players.find((player) => player.id === this.localId);
    const rank = local ? ranked.findIndex((player) => player.id === local.id) + 1 : 0;
    const leadDelta = local && leader ? Math.round((leader.maxHeight - local.maxHeight) / 10) : 0;
    const second = ranked.find((player) => player.id !== local?.id);
    const advantage = local && rank === 1 && second ? Math.round((local.maxHeight - second.maxHeight) / 10) : 0;
    const lavaGap = local ? Math.max(0, Math.round((snapshot.hazardY - (local.y + PLAYER_HEIGHT)) / 10)) : 0;
    status.setText(rank === 1 ? `YOU #1  LEAD +${advantage}m\n${this.hazardLabel} ${lavaGap}m BELOW` : `YOU #${rank || "-"}  -${leadDelta}m TO LEAD\n${this.hazardLabel} ${lavaGap}m BELOW`);
  }

  private burst(x: number, y: number, texture: string, tint: number): void {
    for (let index = 0; index < 7; index++) {
      const particle = this.add.image(x, y, texture).setTint(tint).setDepth(30).setAlpha(0.9);
      this.tweens.add({
        targets: particle, x: x + Phaser.Math.Between(-18, 18), y: y + Phaser.Math.Between(-16, 7),
        alpha: 0, scale: 0.4, duration: 260 + Math.random() * 180, onComplete: () => particle.destroy()
      });
    }
  }

  private showToast(message: string): void {
    if(this.snapshot?.phase==='surge' || this.snapshot?.phase==='victory')return;
    const toast = this.add.text(28, this.toastY, message, {
      fontFamily: "Arial, sans-serif", fontSize: "11px", fontStyle: "bold", color: "#ffb293", backgroundColor: "#160d12", padding: { x: 8, y: 5 }
    }).setScrollFactor(0).setDepth(120).setAlpha(0);
    this.toastY = Math.min(250, this.toastY + 28);
    this.tweens.add({ targets: toast, alpha: 1, x: 36, duration: 180, yoyo: true, hold: 1700, onComplete: () => toast.destroy() });
  }
}

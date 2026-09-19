import {COUNTDOWN_SECONDS} from '../../../server/src/sim/constants';
import {backend,party,playerId,isHost,partyMembers} from '../game/online';
import {worldForMap,floodForMap} from '../../../server/src/sim/world';
import {safePlayerName} from '../../../server/src/sim/names';
import { becomeGhost, stepGhosts } from '../../../server/src/sim/ghosts';
import { prepareWinner, stepFinale, surgeHeight, SURGE_MS, VICTORY_MS } from '../../../server/src/sim/finale';
import type { InputMessage, LevelMessage, Snapshot } from "../game/types";
import type { PlayerState, RoundPhase, Skill } from "../../../server/src/sim/types";
import { levelForMap, type MapId } from "../../../server/src/sim/maps";
import { stepPlayer } from "../../../server/src/sim/physics";
import { updateBot } from "../../../server/src/sim/bots";
import { updateMovingPlatforms } from "../../../server/src/sim/platforms";
import { rankPlayers, selectWinner } from "../../../server/src/sim/round";
import { PLAYER_HEIGHT, HAZARD_START_Y } from "../../../server/src/sim/constants";
import { landPlayer, stepFlight } from "../game/godPowers";
type Listener<T> = (payload: T) => void;

/** Offline practice uses exactly the authoritative game's simulation. */
export class HostedGameClient {
  public localId = "practice-player";
  private onlinePath='';
  private onlineHost=false;
  private unwatch:(()=>void)[]=[];
  private net:any;
  private lastPublish=0;
  private remoteLastSeen=Date.now();
  private watchdog?:ReturnType<typeof setInterval>;
  private listeners = new Map<string, Set<Listener<unknown>>>();
  private players = new Map<string, PlayerState>();
  private platforms = levelForMap("forge");
  constructor(private mapId: MapId = "forge") {}
  private get world(){return worldForMap(this.mapId);}
  private get floodRules(){return floodForMap(this.mapId);}
  private phase: RoundPhase = "waiting";
  private clock = Date.now();
  private countdownEndsAt = 0;
  private pendingPlayers: PlayerState[] = [];
  private nextJoinAt = 0;
  private roundStartedAt = 0;
  private hazardY = HAZARD_START_Y;
  private winnerId?: string;
  private completed=false;
  private completionMs=0;
  private finaleAt=0;
  private surgeStartY=0;
  private placements?: Snapshot["placements"];
  private assisted=false;
  private loop?: number;
  private lastTick = 0;
  private accumulator = 0;
  private godPowers = false;
  private flying = false;
  get isFlying(): boolean { return this.flying; }
  setGodPowers(enabled: boolean): void {
    if(this.onlinePath)return;
    this.godPowers=enabled;
    if(enabled)this.assisted=true;
    const player=this.players.get(this.localId);
    if(player && !enabled && this.flying) landPlayer(player,this.platforms);
    this.flying=enabled;
    if(player && enabled && !player.alive) { this.godPowers=false;this.flying=false; }
  }
  spectate():void {if(this.onlinePath&&!this.onlineHost){void this.net.update(this.net.at(this.onlinePath+'/inputs/'+this.localId),{spectate:true});return;}const p=this.players.get(this.localId);if(p)becomeGhost(p);}
  private name = "Apprentice";

  async connect(name: string): Promise<void> {
    this.name = safePlayerName(name);
    if(party.code&&party.data?.round){
      this.net=await backend();this.onlinePath='matches/'+party.code+'/'+party.data.round;this.onlineHost=isHost();this.localId=playerId;
      const b=this.net;
      if(!this.onlineHost){
        this.platforms=levelForMap(this.mapId);this.emit<LevelMessage>('level',{platforms:this.platforms,worldWidth:this.world.width,worldHeight:this.world.height,spawnY:this.world.spawnY});
        this.unwatch.push(b.onValue(b.at(this.onlinePath+'/snapshot'),(s:any)=>{const value=s.val();if(!value)return;this.remoteLastSeen=Date.now();value.players=Object.values(value.players??{});value.platforms=Object.values(value.platforms??{});if(value.placements)value.placements=Object.values(value.placements);this.emit('snapshot',value);},()=>this.emit('leave',undefined)));
        this.watchdog=setInterval(()=>{if(Date.now()-this.remoteLastSeen>15000)this.emit('leave',undefined);},5000);return;
      }
      this.unwatch.push(b.onValue(b.at(this.onlinePath+'/inputs'),(s:any)=>{for(const [id,value] of Object.entries(s.val()??{})){const p=this.players.get(id);if(p&&!p.isBot&&id!==this.localId){const v=value as any;p.input={left:!!v.left,right:!!v.right,jumpHeld:!!v.jumpHeld,seq:Number(v.seq)||0};if(v.spectate)becomeGhost(p);if(v.departed){p.alive=false;p.departed=true;p.input={left:false,right:false,jumpHeld:false,seq:0};}}}}));
      await b.onDisconnect(b.at(this.onlinePath)).remove();
    }
    this.reset();
    this.lastTick = performance.now();
    this.loop = window.setInterval(() => {
      const now = performance.now();
      this.accumulator += Math.min(0.1, (now - this.lastTick) / 1000);
      this.lastTick = now;
      while (this.accumulator >= 1 / 30) { this.tick(); this.accumulator -= 1 / 30; }
    }, 1000 / 60);
  }
  private reset(): void {
    this.clock = Date.now(); this.countdownEndsAt = 0; this.pendingPlayers=[]; this.nextJoinAt=this.clock+800;
    this.phase = "waiting"; this.roundStartedAt = 0; this.hazardY = this.world.height-150;
    this.completed=false;this.completionMs=0;this.winnerId = undefined; this.placements=undefined; this.assisted=this.godPowers; this.platforms = levelForMap(this.mapId); this.players.clear();
    const names = ["MoonMoth", "RivetRush", "CloudNine", "EmberFox", "OopsIGlided", "minty", "PixelPeach", "Skybound", "QuietQuokka", "JadeJumper", "CopperCat", "tinychaos", "Starlit", "Hopscotch", "Mochi", "CinderWolf", "LuckyBoots", "Nova", "FernFable", "Bramble", "AlmostThere", "PuddleDuck", "LedgeLeap"];
    const skills: Skill[] = ["bad", "average", "good", "cracked"];
    for (let i = 0; i < 24; i++) {
      const members=this.onlineHost?partyMembers().sort((a,b)=>a.id===this.localId?-1:b.id===this.localId?1:a.id.localeCompare(b.id)):[];
      const member=members[i];
      const id = member?.id??(i ? `bot-${i}` : this.localId);
      const player: PlayerState = { id, name: member?.name??(i ? names[i-1] : this.name),
        x: i ? 174 + (i % 6) * 48 : 313, y: this.world.spawnY + 12, vx: 0, vy: 0,
        alive: true, grounded: true, charging: false, charge01: 0, chargeDirection: 0,
        groundedPlatformId: "spawn", facing: 0, isBot: i > 0 && !member, colorIndex: i % 8, maxHeight: 0,
        skill: skills[i % 4], input: { left: false, right: false, jumpHeld: false, seq: 0 },
        bot: i && !member ? { holdUntil: 0, cooldownUntil: 0, pattern: Math.floor(Math.random()*32), jumpCount: 0, initialized: false } : undefined };
      if(i&&!member)this.pendingPlayers.push(player);else this.players.set(id,player);
    }
    this.emit<LevelMessage>("level", { platforms: this.platforms, worldWidth: this.world.width, worldHeight: this.world.height, spawnY: this.world.spawnY });
  }
  private tick(): void {
    this.clock += 1000 / 30;
    if(this.phase === "waiting" && this.clock >= this.nextJoinAt) {
      const joined=this.pendingPlayers.shift();if(joined)this.players.set(joined.id,joined);
      this.nextJoinAt=this.clock+160;
      if(this.players.size===24 && !this.pendingPlayers.length){this.phase="countdown";this.countdownEndsAt=this.clock+COUNTDOWN_SECONDS*1000;}
    }
    if (this.phase === "countdown" && this.clock >= this.countdownEndsAt) { this.phase = "playing"; this.roundStartedAt = this.clock; }
    if (this.phase === "playing") {
      const elapsed = (this.clock - this.roundStartedAt) / 1000;
      updateMovingPlatforms(this.platforms, elapsed * 1000);
      const grace=this.floodRules.grace;
      if (elapsed > grace) this.hazardY -= Math.min(this.floodRules.max, this.floodRules.base + (elapsed - grace) * this.floodRules.acceleration) / 30;
      for (const player of this.players.values()) {
        if(!player.alive)continue;
        const previousHeight=Math.floor(player.maxHeight);
        if (player.isBot) updateBot(player, this.platforms, this.clock);
        if (!player.isBot && this.godPowers) {
          if (this.flying) stepFlight(player,1/30,this.world); else stepPlayer(player,this.platforms,1/30,{...this.world,time:elapsed});
        } else stepPlayer(player, this.platforms, 1 / 30,{...this.world,time:elapsed});
        if(Math.floor(player.maxHeight)>previousHeight)player.heightReachedMs=Math.round(this.clock-this.roundStartedAt);
        if (player.alive && !(this.godPowers && !player.isBot) && player.y + PLAYER_HEIGHT >= this.hazardY) {
          player.alive = false; player.charging = false; player.eliminatedAt = this.clock;
          this.emit("eliminated", { id: player.id, name: player.name });
        }
      }
      const winner = selectWinner([...this.players.values()], (this.mapId==='mountain'||this.mapId==='forest'||this.mapId==='magical')?0:elapsed);
      if (winner) { this.completed=winner.groundedPlatformId==='crown';this.completionMs=Math.round(this.clock-this.roundStartedAt);this.phase = "surge"; this.winnerId = winner.id; this.finaleAt=this.clock; this.surgeStartY=this.hazardY; this.placements=rankPlayers(this.players.values(),winner.id); prepareWinner(winner,this.platforms); }
    }
    if(this.phase==='surge' || this.phase==='victory') {
      const elapsed=this.clock-this.finaleAt;
      this.hazardY=surgeHeight(this.surgeStartY,elapsed);
      stepFinale(this.players.values(),this.platforms,this.winnerId,this.hazardY,this.clock,1/30,p=>this.emit('eliminated',{id:p.id,name:p.name}));
      if(elapsed>=SURGE_MS+VICTORY_MS)this.phase='finished';
      else if(elapsed>=SURGE_MS)this.phase='victory';
    }
    stepGhosts(this.players.values(),this.clock,1/30,this.world);
    this.emit<Snapshot>("snapshot", { serverTime: this.clock, phase: this.phase, countdownEndsAt: this.countdownEndsAt,
      completed:this.completed,completionMs:this.completionMs,assisted: this.assisted, roundStartedAt: this.roundStartedAt, hazardY: this.hazardY, winnerId: this.winnerId,
      players: [...this.players.values()], platforms: this.platforms.filter(p => p.type === "moving").map(({id,x,y}) => ({id,x,y})),
      placements: this.placements });
  }
  on<T>(event: string, listener: Listener<T>): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener as Listener<unknown>);
    return () => this.listeners.get(event)?.delete(listener as Listener<unknown>);
  }
  sendInput(input: InputMessage): void { if(this.onlinePath&&!this.onlineHost){void this.net.update(this.net.at(this.onlinePath+'/inputs/'+this.localId),{left:input.left,right:input.right,jumpHeld:input.jumpHeld,seq:input.seq}).catch(()=>this.emit('leave',undefined));return;}const p = this.players.get(this.localId); if (p) {
    if(input.toggleFlight && this.godPowers) { this.flying=!this.flying; if(!this.flying) landPlayer(p,this.platforms); }
    p.input={...input,jumpHeld:this.flying && this.phase==='playing'?false:input.jumpHeld,toggleFlight:false};
  } }
  requestRestart(): void { if (!this.onlinePath && this.phase === "finished") this.reset(); }
  async disconnect(): Promise<void> { window.clearInterval(this.loop);clearInterval(this.watchdog);for(const off of this.unwatch)off();this.unwatch=[];if(this.onlineHost&&this.onlinePath)void this.net.remove(this.net.at(this.onlinePath));else if(this.onlinePath)void this.net.update(this.net.at(this.onlinePath+'/inputs/'+this.localId),{departed:true}); this.loop = undefined; this.listeners.clear(); }
  private emit<T>(event: string, payload: T): void { if(event==='snapshot'&&this.onlineHost&&Date.now()-this.lastPublish>=100){this.lastPublish=Date.now();void this.net.set(this.net.at(this.onlinePath+'/snapshot'),JSON.parse(JSON.stringify(payload))).catch(()=>this.emit('leave',undefined));}this.listeners.get(event)?.forEach(listener => listener(payload)); }
}

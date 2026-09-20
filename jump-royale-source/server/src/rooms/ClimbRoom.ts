import {forgeLavaPools,touchesForgeLava} from '../sim/level.js';
import {defaultSpawn,spawnLocations} from '../sim/spawn.js';
import {worldForMap,floodForMap} from '../sim/world.js';
import {safePlayerName} from '../sim/names.js';
import {levelForMap, MAPS, type MapId} from '../sim/maps.js';
import { becomeGhost, stepGhosts } from '../sim/ghosts.js';
import {prepareWinner,stepFinale,surgeHeight,SURGE_MS,VICTORY_MS} from '../sim/finale.js';
import { Room, Client } from "@colyseus/core";
import {
  COUNTDOWN_SECONDS, HAZARD_ACCEL_PER_SECOND, HAZARD_BASE_SPEED, HAZARD_GRACE_SECONDS,
  HAZARD_MAX_SPEED, HAZARD_START_Y, MIN_COMPETITORS, PLAYER_HEIGHT, PLAYER_WIDTH,
  ROUND_RESET_SECONDS, SERVER_TICK_RATE, SNAPSHOT_RATE, SPAWN_Y, WORLD_WIDTH
} from "../sim/constants.js";
import { updateBot } from "../sim/bots.js";
import { generateLevel } from "../sim/level.js";
import { stepPlayer } from "../sim/physics.js";
import { updateMovingPlatforms } from "../sim/platforms.js";
import { rankPlayers, selectWinner } from "../sim/round.js";
import type { InputMessage, PlayerState, RoundPhase, Skill } from "../sim/types.js";

const BOT_FIRST = ["Cinder", "Rivet", "Tongs", "Ember", "Bellows", "Quench", "Soot", "Copper", "Flint", "Brass", "Coal", "Nail"];
const BOT_LAST = ["Boots", "Helm", "Grip", "Spark", "Anvil", "Clang", "Glow", "Ash", "Iron", "Forge"];
const SKILLS: Skill[] = ["bad", "bad", "average", "average", "average", "good", "good", "cracked"];

export class ClimbRoom extends Room {
  maxClients = MIN_COMPETITORS;
  private readyPlayers=new Set<string>();
  private nextJoinAt=0;
  private players = new Map<string, PlayerState>();
  private mapId:MapId='forge';
  private platforms = generateLevel();
  private get world(){return worldForMap(this.mapId);}
  private get floodRules(){return floodForMap(this.mapId);}
  private phase: RoundPhase = "waiting";
  private countdownEndsAt = 0;
  private roundStartedAt = 0;
  private finishedAt = 0;
  private surgeStartY=0;
  private placements?: ReturnType<typeof rankPlayers>;
  private hazardY = HAZARD_START_Y;
  private winnerId?: string;
  private snapshotAccumulator = 0;
  private roundNumber = 0;
  private simulationAccumulator = 0;

  onCreate(options:{mapId?:MapId} = {}): void {
    this.mapId=MAPS.some(m=>m.id===options.mapId)?options.mapId!:'forge';
    this.platforms=levelForMap(this.mapId);this.hazardY=this.world.height-150;
    this.setSimulationInterval((deltaMs) => {
      this.simulationAccumulator += Math.min(deltaMs / 1000, 0.25);
      while (this.simulationAccumulator >= 1 / SERVER_TICK_RATE) {
        this.tick(1 / SERVER_TICK_RATE);
        this.simulationAccumulator -= 1 / SERVER_TICK_RATE;
      }
    }, 1000 / SERVER_TICK_RATE);
    this.onMessage("input", (client, message: InputMessage) => {
      const player = this.players.get(client.sessionId);
      if (!player || player.isBot) return;
      player.input = {
        up:Boolean(message.up),down:Boolean(message.down),
        left: Boolean(message.left), right: Boolean(message.right), jumpHeld: Boolean(message.jumpHeld),
        jumpPressed: Boolean(message.jumpPressed), jumpReleased: Boolean(message.jumpReleased), seq: Number(message.seq) || 0
      };
    });
    this.onMessage("spectate",client=>{const p=this.players.get(client.sessionId);if(p)becomeGhost(p);});
    this.onMessage("restart", () => {
      if (this.phase === "finished") this.beginWaiting();
    });
    this.onMessage("ready",client=>{this.readyPlayers.add(client.sessionId);if(!this.nextJoinAt)this.nextJoinAt=Date.now()+800;});
    this.onMessage("requestLevel", (client) => this.sendLevel(client));
  }

  onJoin(client: Client, options: { name?: string }): void {
    // Colyseus 0.16.4 reuses its encoder buffer. JOINING clients retain queued
    // byte views until their handshake completes; subsequent snapshots overwrite
    // those views. Own the bytes at the queue boundary (also safe under backpressure).
    const enqueue = client.enqueueRaw.bind(client);
    client.enqueueRaw = (bytes, options) => enqueue(Buffer.from(bytes), options);
    const name = safePlayerName(String(options?.name || "Apprentice"));
    this.players.set(client.sessionId, this.createPlayer(client.sessionId, name, false, this.players.size));
    if(this.players.size>MIN_COMPETITORS){const bot=[...this.players.values()].find(p=>p.isBot);if(bot)this.players.delete(bot.id);}
    this.sendLevel(client);
    client.send("welcome", { id: client.sessionId });

  }

  onLeave(client: Client): void {
    this.players.delete(client.sessionId);this.readyPlayers.delete(client.sessionId);
    if(this.phase==='countdown'){this.phase='waiting';this.countdownEndsAt=0;void this.unlock();}
    if (![...this.players.values()].some((p) => !p.isBot)) this.disconnect();

  }

  private sendLevel(client: Client): void {
    client.send("level", { platforms: this.platforms, worldWidth: this.world.width, worldHeight: this.world.height, spawnY: this.world.spawnY });
  }

  private createPlayer(id: string, name: string, isBot: boolean, slot: number): PlayerState {
    const start=spawnLocations(this.platforms,defaultSpawn(this.platforms,this.world.spawnY),MIN_COMPETITORS)[slot%MIN_COMPETITORS];
    return {
      id,name,x:start.x,y:start.y,vx:0,vy:0,
      alive: true, grounded: true, charging: false, charge01: 0, chargeDirection: 0, groundedPlatformId: start.platformId, facing: 0, isBot,
      colorIndex: slot % 8, maxHeight: 0, heightReachedMs:0, eliminatedAt:undefined, crumblingPlatforms:undefined, skill: isBot ? SKILLS[slot % SKILLS.length] : undefined,
      input: { left: false, right: false, jumpHeld: false, seq: 0 },
      bot: isBot ? { holdUntil: 0, cooldownUntil: 0, pattern: slot % 8, jumpCount: 0, initialized: false } : undefined
    };
  }

  private fillBots(limit=1): void {
    while (this.players.size > MIN_COMPETITORS) {
      const botId = [...this.players.values()].find((player) => player.isBot)?.id;
      if (!botId) break;
      this.players.delete(botId);
    }
    let i = 0;
    let added=0;
    while (this.players.size < MIN_COMPETITORS && added<limit) {
      const id = `bot-${this.roundNumber}-${i}`;
      if (!this.players.has(id)) {
        const name = `${BOT_FIRST[i % BOT_FIRST.length]} ${BOT_LAST[(i * 3 + 2) % BOT_LAST.length]}`;
        this.players.set(id, this.createPlayer(id, name, true, this.players.size));added++;
      }
      i++;
    }
  }

  private beginWaiting(): void {
    void this.unlock();
    for(const [id,p] of this.players)if(p.isBot)this.players.delete(id);
    this.nextJoinAt=Date.now()+800;
    this.platforms = levelForMap(this.mapId);
    this.roundNumber++;
    this.phase = "waiting";
    this.countdownEndsAt = 0;
    this.roundStartedAt = 0;
    this.finishedAt = 0; this.placements=undefined;
    this.hazardY = this.world.height-150;
    this.winnerId = undefined;
    let slot = 0;
    for (const player of this.players.values()) {
      const fresh = this.createPlayer(player.id, player.name, player.isBot, slot++);
      Object.assign(player, fresh);player.ghost=false;player.departed=false;
    }
    this.broadcast("roundReset", { round: this.roundNumber });
  }

  private tick(dt: number): void {
    const now = Date.now();
    if(this.phase==='waiting') {
      const humans=[...this.players.values()].filter(p=>!p.isBot);
      const ready=humans.length>0 && humans.every(p=>this.readyPlayers.has(p.id));
      if(ready && now>=this.nextJoinAt){this.fillBots();this.nextJoinAt=now+160;}
      if(ready && this.players.size===MIN_COMPETITORS){
        this.phase='countdown';this.countdownEndsAt=now+COUNTDOWN_SECONDS*1000;void this.lock();
      }
    }
    if (this.phase === "countdown" && now >= this.countdownEndsAt) {
      this.phase = "playing";
      this.roundStartedAt = now;
    }

    if (this.phase === "playing") {
      const elapsed = (now - this.roundStartedAt) / 1000;
      updateMovingPlatforms(this.platforms, now - this.roundStartedAt);
      if (elapsed > this.floodRules.grace) {
        const dangerTime = elapsed - this.floodRules.grace;
        const speed = Math.min(this.floodRules.max, this.floodRules.base + dangerTime * this.floodRules.acceleration);
        this.hazardY -= speed * dt;
      }

      for (const player of this.players.values()) {
        if(!player.alive)continue;
        const previousHeight=Math.floor(player.maxHeight);
        const previousY=player.y;
        if (player.isBot) updateBot(player, this.platforms, now);
        stepPlayer(player, this.platforms, dt,{...this.world,time:(now-this.roundStartedAt)/1000});
        if(Math.floor(player.maxHeight)>previousHeight)player.heightReachedMs=Math.round(now-this.roundStartedAt);
        if (player.alive && (player.y + PLAYER_HEIGHT >= this.hazardY || (this.mapId === "forge" && touchesForgeLava(player,forgeLavaPools(this.platforms),previousY)) || player.y > this.world.height+50)) {
          player.alive = false;
          player.charging = false;
          player.eliminatedAt = now;
          this.broadcast("eliminated", { id: player.id, name: player.name });
        }
      }

      const winner = selectWinner([...this.players.values()], (this.mapId==='mountain'||this.mapId==='forest'||this.mapId==='magical')?0:elapsed);
      if (winner) {
        this.phase = "surge";
        this.surgeStartY=this.hazardY;
        this.placements=rankPlayers(this.players.values(),winner.id);
        prepareWinner(winner,this.platforms);
        this.finishedAt = now;
        this.winnerId = winner.id;
      }
    } else if(this.phase==='surge' || this.phase==='victory') {
      const elapsed=now-this.finishedAt;
      this.hazardY=surgeHeight(this.surgeStartY,elapsed);
      stepFinale(this.players.values(),this.platforms,this.winnerId,this.hazardY,now,dt,p=>this.broadcast('eliminated',{id:p.id,name:p.name}));
      if(elapsed>=SURGE_MS+VICTORY_MS){this.phase='finished';this.finishedAt=now;}
      else if(elapsed>=SURGE_MS)this.phase='victory';
    } else if (this.phase === "finished" && now - this.finishedAt >= ROUND_RESET_SECONDS * 1000) {
      this.beginWaiting();
    }

    stepGhosts(this.players.values(),now,dt,this.world);
    this.snapshotAccumulator += dt;
    if (this.snapshotAccumulator >= 1 / SNAPSHOT_RATE) {
      this.snapshotAccumulator = 0;
      const publicPlayers = [...this.players.values()].map(({ input: _input, bot: _bot, chargeDirection: _chargeDirection, groundedPlatformId: _groundedPlatformId, ...p }) => p);
      this.broadcast("snapshot", {
        serverTime: now, phase: this.phase, countdownEndsAt: this.countdownEndsAt,
        roundStartedAt: this.roundStartedAt, hazardY: this.hazardY, winnerId: this.winnerId,
        players: publicPlayers,
        platforms: this.platforms.filter((platform) => platform.type === "moving").map(({ id, x, y }) => ({ id, x, y })),
        placements: this.placements
      });
    }
  }
}

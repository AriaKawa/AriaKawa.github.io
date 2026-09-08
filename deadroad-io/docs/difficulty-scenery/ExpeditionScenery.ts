import Phaser from "phaser";
import { BATTLE_WORLD_SCALE } from "./camera";
import { SceneryWorld } from "./SceneryWorld";
import { theaterLatLon } from "./AmericasTheater";
import { threatAt } from "./ThreatField";
import type { WarSector } from "./types";

export function sceneryDifficulty(threat: number): 'green' | 'autumn' | 'dead' {
  return threat >= 6.5 ? 'dead' : threat >= 3.3 ? 'autumn' : 'green';
}
export class ExpeditionScenery {
  private sprites = new Map<string, Phaser.GameObjects.Image>();
  private signature = "";
  constructor(private scene: Phaser.Scene) {
    for (const [key, columns] of [['expedition-scenery',4],['scenery-autumn',2],['scenery-dead',2],['scenery-details',2]] as const) {
      if (!scene.textures.exists(key)) continue;
      const texture=scene.textures.get(key), source=texture.getSourceImage();
      for(let i=0;i<columns*columns;i++) {
        const x=Math.round(i%columns*source.width/columns),y=Math.round(Math.floor(i/columns)*source.height/columns);
        if(!texture.has(String(i))) texture.add(i,0,x,y,Math.round((i%columns+1)*source.width/columns)-x,Math.round((Math.floor(i/columns)+1)*source.height/columns)-y);
      }
    }
  }
  update(zoom: number, world: SceneryWorld, sectors: WarSector[] = [], pressureSignature = ''): void {
    if (!this.scene.textures.exists('expedition-scenery')) return;
    if(zoom<.22) {this.sprites.forEach(s=>s.setVisible(false));this.signature='';return;}
    const v=this.scene.cameras.main.worldView,scale=BATTLE_WORLD_SCALE;
    const left=Math.floor(v.left/scale/160)-2,right=Math.ceil(v.right/scale/160)+2;
    const top=Math.floor(v.top/scale/160)-2,bottom=Math.ceil(v.bottom/scale/160)+2;
    const sig=[left,right,top,bottom,pressureSignature].join(':');
    if(sig!==this.signature) {
      this.signature=sig;
      const props=world.query(left*160,top*160,right*160,bottom*160),active=new Set<string>();
      const counts={green:0,autumn:0,dead:0};
      const put=(id:string,x:number,y:number,key:string,frame:number,size:number,depth:number)=>{
        active.add(id);let sprite=this.sprites.get(id);
        if(!sprite){sprite=this.scene.add.image(x*scale,y*scale,key,frame);this.sprites.set(id,sprite);}
        sprite.setOrigin(.5, key === "scenery-autumn" || key === "scenery-dead" ? .58 : .5).setTexture(key,frame).setPosition(x*scale,y*scale).setDisplaySize(size*scale,size*scale).setDepth(depth);
      };
      for(const p of props) {
        const location=theaterLatLon(p), biome=sceneryDifficulty(threatAt(location.lat,location.lon,sectors));
        const vegetation=p.frame<=2||p.frame===15;
        const key=vegetation&&biome!=='green'?`scenery-${biome}`:'expedition-scenery';
        put(p.id,p.x,p.y,key,key==='expedition-scenery'?p.frame:p.frame===15?3:p.frame,p.size,1.35);
        if(!vegetation)continue;
        counts[biome]++;
        // Decals share existing road-cleared vegetation footprints, with no new collision bodies.
        const frame=biome==='green'?0:biome==='autumn'?1:2;
        put(`${p.id}:ground`,p.x,p.y+p.size*.24,'scenery-details',frame,p.size*1.12,.38);
        if(biome==='dead' && p.frame===15) put(`${p.id}:embers`,p.x+p.size*.24,p.y+p.size*.25,'scenery-details',3,p.size*.65,1.36);
      }
      for(const [id,s] of this.sprites)if(!active.has(id)){s.destroy();this.sprites.delete(id);}
      this.scene.game.canvas.dataset.sceneryBiomes=JSON.stringify(counts);
    }
    const opacity=Math.min(1,(zoom-.18)/.2);
    this.sprites.forEach((s,id)=>s.setVisible(true).setAlpha(id.endsWith(':embers')?opacity*(.82+.12*Math.sin(this.scene.time.now*.006+s.x)):opacity));
    this.scene.game.canvas.dataset.expeditionScenery=String(this.sprites.size);
  }
  destroy():void{this.sprites.forEach(s=>s.destroy());this.sprites.clear();this.signature='';}
}


import {labTexture,type LabLook} from './wardrobe2';
import {drawGarment} from './garmentRig';
import {demonTexture} from './demonRig';
import Phaser from "phaser";
import { PLAYER_ANIMATIONS } from "./assetManifest";
import { HEAD_POSES, drawHelmet, drawHairLayer, appendWalkFrames } from "./characterRig";
import { ANIMALS, ANIMAL_HATS, isAnimal, animalTexture } from './animalRig';

export const SLOTS = ["character", "helmet", "shirt", "pants", "hair"] as const;
export type CosmeticSlot = typeof SLOTS[number];
export type Outfit = Record<CosmeticSlot, string> & {animalHat?:'none'|'party';wardrobe2?:LabLook};
export const COSMETICS = {
  character: [{id:"original",name:"Finn"},{id:"puppy",name:"Biscuit · Puppy"},{id:'cat',name:'Mochi · Cat'},{id:'rat',name:'Pip · Rat'},{id:'demon',name:'Ember · Demon Lady'}],
  hair: [{id:"original",name:"Classic Crop"},{id:"waves",name:"Chestnut Waves"},{id:"ponytail",name:"Golden Ponytail"},{id:"braid",name:"Midnight Braid"},{id:"buns",name:"Rose Double Buns"},{id:"bob",name:"Lilac Bob"}],
  helmet: [{id:"none",name:"No Helmet"},{ id: "original", name: "Ivory Helm" }, { id: "steel", name: "Quenched Steel" }, { id: "copper", name: "Copper Visor" }, { id: "tropical", name: "Cooking Pot" }, { id: "maid", name: "Maid Headband" }, {id:"mushroom",name:"Toadstool Cap"}, {id:"diver",name:"Abyssal Dive Helm"}, {id:"mage",name:"Crescent Cap"}],
  shirt: [{ id: "original", name: "Forge Apron" }, { id: "steel", name: "Froststitch Jacket" }, { id: "copper", name: "Cinder Coat" }, { id: "tropical", name: "Hawaiian Shirt" }, { id: "maid", name: "Maid Blouse & Apron" }, {id:"mushroom",name:"Spore Scout Tunic"}, {id:"diver",name:"Deep-Sea Dive Suit"}, {id:"mage",name:"Starfall Tunic"}],
  pants: [{ id: "original", name: "Coal Trousers" }, { id: "steel", name: "Riveted Leather" }, { id: "copper", name: "Ashguard Pants" }, { id: "tropical", name: "Red Speedo" }, { id: "maid", name: "Maid Skirt & Stockings" }, {id:"mushroom",name:"Mosswalker Boots"}, {id:"diver",name:"Anchorweight Boots"}, {id:"mage",name:"Cometstride Pants"}]
} as const;
export const DEFAULT_OUTFIT: Outfit = { character:"original", hair:"original", helmet: "none", shirt: "original", pants: "original" };
const STORAGE_KEY = "forge-outfit-v1";
const ROOT = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/assets/reforged/cosmetics`;
export const pieceKey = (slot: CosmeticSlot, id: string) => `cosmetic-${slot}-${id}`;
export const outfitSlots=(outfit:Outfit):readonly CosmeticSlot[]=>outfit.character==='demon'?['character']:isAnimal(outfit.character)?['character','helmet']:SLOTS;
export const equipmentOptions=(slot:CosmeticSlot,outfit:Outfit):readonly {id:string;name:string}[]=>isAnimal(outfit.character)&&slot==='helmet'?ANIMAL_HATS:COSMETICS[slot];
export const selectedPiece=(slot:CosmeticSlot,outfit:Outfit)=>isAnimal(outfit.character)&&slot==='helmet'?outfit.animalHat??'none':outfit[slot];
export function cosmeticName(slot:CosmeticSlot,id:string,outfit:Outfit):string {
  if(isAnimal(outfit.character)&&slot==='helmet')return ANIMAL_HATS.find(p=>p.id===id)?.name??id;
  return COSMETICS[slot].find(p=>p.id===id)?.name??id;
}

export function sanitizeOutfit(value: unknown): Outfit {
  const source = value && typeof value === "object" ? value as Record<string,unknown> : {};
  const lab=source.wardrobe2 as LabLook|undefined;
  const wardrobe2=lab&&Number.isInteger(lab.variant)&&lab.variant>=0&&lab.variant<3&&Number.isInteger(lab.look)&&lab.look>=0&&lab.look<3?{variant:lab.variant,look:lab.look}:undefined;
  return {wardrobe2,...Object.fromEntries(SLOTS.map(slot => [slot, COSMETICS[slot].some(piece => piece.id === source[slot]) ? source[slot] : "original"])),animalHat:source.animalHat==='party'?'party':'none'} as Outfit;
}
export function loadOutfit(): Outfit {
  try { return sanitizeOutfit(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null")); }
  catch { return { ...DEFAULT_OUTFIT }; }
}
export function saveOutfit(outfit: Outfit): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeOutfit(outfit))); } catch { /* Session selection still works with storage disabled. */ }
}
export function queueCosmetics(scene: Phaser.Scene): void {
  scene.load.image('demon-source',`${ROOT}/demon.png`);
  for(const animal of ANIMALS)scene.load.spritesheet(animal+'-sprites', `${ROOT}/${animal}.png`, {frameWidth:32,frameHeight:32});
  scene.load.image('head-bare-v2', `${ROOT}/head-bare-v2.png`);
  for(const hair of COSMETICS.hair) scene.load.image("hair-"+hair.id, `${ROOT}/hair-${hair.id}.png`);
  for (const slot of ["helmet","shirt","pants"] as const) for (const piece of COSMETICS[slot]) {
    if(piece.id!=="none") scene.load.image(pieceKey(slot,piece.id), `${ROOT}/${slot}-${piece.id}.png`);
  }
}

/** Compose once per selection, then use one ordinary sprite and the original
 * animation timing. All equipment shares the same frame grid and foot origin. */
export function outfitTexture(scene: Phaser.Scene, requested: Outfit): string {
  const outfit = sanitizeOutfit(requested);
  if(outfit.wardrobe2)return labTexture(scene,outfit.wardrobe2);
  if(outfit.character==='demon')return demonTexture(scene);
  if(isAnimal(outfit.character))return animalTexture(scene,outfit.character,outfit.animalHat);
  const key = `outfit-${SLOTS.map(slot => outfit[slot]).join("-")}`;
  if (scene.textures.exists(key)) return key;
  const canvas = document.createElement("canvas"); canvas.width = 320; canvas.height = 32;
  const context = canvas.getContext("2d")!; context.imageSmoothingEnabled = false;
  {
    drawGeneratedHair(scene,context,outfit,true);
    for (const slot of ["pants", "shirt"] as const) {
      drawGarment(context,scene.textures.get(pieceKey(slot,outfit[slot])).getSourceImage() as HTMLImageElement,scene.textures.get(pieceKey(slot,'original')).getSourceImage() as HTMLImageElement);
    }
    for(let frame=0;frame<6;frame++) {
      if(outfit.helmet!=='none') drawHelmet(context,scene.textures.get(pieceKey('helmet',outfit.helmet)).getSourceImage() as HTMLImageElement,frame);
    }
    drawGeneratedHair(scene,context,outfit,false);
    // Every generated hairstyle has a different face opening. Keep the shared
    // rounded face visible rather than letting opaque fringe hide the eyes.
    if(outfit.helmet==='none') for(let frame=0;frame<6;frame++) {
      const pose=HEAD_POSES[frame];
      context.drawImage(scene.textures.get('head-bare-v2').getSourceImage() as HTMLImageElement,frame*32+12+pose.x,pose.y,11,11);
      {
        // Keep the hairline over the skull while leaving the new face readable.
        const hair=scene.textures.get('hair-'+outfit.hair).getSourceImage() as HTMLImageElement;
        context.drawImage(hair,0,0,20,7,frame*32+6+pose.x,pose.y-3,20,7);
      }
    }
  }
  appendWalkFrames(canvas);
  const texture = scene.textures.addCanvas(key,canvas)!;
  for (let frame=0;frame<10;frame++) texture.add(frame,0,frame*32,0,32,32);
  for (const [name,animation] of Object.entries({...PLAYER_ANIMATIONS,walk:{start:6,end:9,frameRate:10,repeat:-1}})) scene.anims.create({
    key: `${key}-${name.replaceAll("_","-")}`,
    frames: scene.anims.generateFrameNumbers(key,{start:animation.start,end:animation.end}),
    frameRate:animation.frameRate,repeat:animation.repeat
  });
  return key;
}

function drawGeneratedHair(scene:Phaser.Scene,c:CanvasRenderingContext2D,o:Outfit,back:boolean):void {
  const image=scene.textures.get('hair-'+o.hair).getSourceImage() as HTMLImageElement;
  for(let f=0;f<6;f++) drawHairLayer(c,image,f,back,o.helmet!=='none');
}

export function botOutfit(id:string):Outfit {
  let hash=0; for(const char of id) hash=(hash*31+char.charCodeAt(0))>>>0;
  const themes=["original","steel","copper","tropical","maid"];
  const hair=["waves","ponytail","braid","buns","bob"];
  return {character:"original",helmet:hash%3?"none":themes[hash%5],shirt:themes[hash%5],pants:themes[Math.floor(hash/3)%5],hair:hair[Math.floor(hash/2)%5]};
}

import {knightCostumeTexture,KNIGHT_COSTUMES} from './knightCostumes';
import {DETAILED_SHEETS,validDetailedId} from './detailedCostumes';
import {costumeFields} from './costumeSets';
import {type LabLook} from './wardrobe2';
import {drawGarment} from './garmentRig';
import {demonTexture} from './demonRig';
import {FANTASY_SHEETS,MAGICAL_HD_SHEETS,isFantasy,fantasyTexture,MAGICAL_HAIR} from './fantasyRig';
import Phaser from "phaser";
import { PLAYER_ANIMATIONS } from "./assetManifest";
import { HEAD_POSES, drawHelmet, appendWalkFrames } from "./characterRig";
import { ANIMALS, ANIMAL_HATS, isAnimal, animalTexture, type AnimalHat } from './animalRig';

export const DEMON_HAIRS=[{id:'original',name:'Midnight Locks'},{id:'buns',name:'Rose Horn Buns'},{id:'braid',name:'Silver Braid'}] as const;
export const SLOTS = ["character", "helmet", "shirt", "pants", "hair"] as const;
export type CosmeticSlot = typeof SLOTS[number];
export type Outfit = Record<CosmeticSlot, string> & {costume?:string;retroCostumes?:string[];detailedCostumes?:string[];magicalCostume?:'classic'|'starlight-16';animalHat?:AnimalHat;wardrobe2?:LabLook};
export const COSMETICS = {
  character: [{id:"original",name:"Finn"},{id:"mushroom",name:"Spore Scout"},{id:"puppy",name:"Biscuit"},{id:'cat',name:'Mochi'},{id:'rat',name:'Pip'},{id:'demon',name:'Ember'},{id:'cerberus',name:'Cerberus'},{id:'magical-girl',name:'Stella'},{id:'skeleton',name:'Rattle'},{id:'neet',name:'Kenji'},{id:'kangaroo',name:'Roo'},{id:'pogo',name:'Pippa'},{id:'aria',name:'Aria'}],
  hair: [{id:"original",name:"Classic Crop"},{id:"waves",name:"Chestnut Waves"},{id:"ponytail",name:"Golden Ponytail"},{id:"braid",name:"Midnight Braid"},{id:"buns",name:"Rose Double Buns"},{id:"bob",name:"Lilac Bob"},{id:"star-buns",name:"Starlight Star Buns"}],
  helmet: [{id:"none",name:"No Helmet"},{ id: "original", name: "Ivory Helm" }, { id: "steel", name: "Quenched Steel" }, { id: "copper", name: "Copper Visor" }, { id: "tropical", name: "Cooking Pot" }, { id: "maid", name: "Maid Headband" }, {id:"mushroom",name:"Toadstool Cap"}, {id:"diver",name:"Abyssal Dive Helm"}, {id:"mage",name:"Crescent Cap"}],
  shirt: [{ id: "original", name: "Forge Apron" }, { id: "steel", name: "Froststitch Jacket" }, { id: "copper", name: "Cinder Coat" }, { id: "tropical", name: "Hawaiian Shirt" }, { id: "maid", name: "Maid Blouse & Apron" }, {id:"mushroom",name:"Spore Scout Tunic"}, {id:"diver",name:"Deep-Sea Dive Suit"}, {id:"mage",name:"Starfall Tunic"}],
  pants: [{ id: "original", name: "Coal Trousers" }, { id: "steel", name: "Riveted Leather" }, { id: "copper", name: "Ashguard Pants" }, { id: "tropical", name: "Red Speedo" }, { id: "maid", name: "Maid Skirt & Stockings" }, {id:"mushroom",name:"Mosswalker Boots"}, {id:"diver",name:"Anchorweight Boots"}, {id:"mage",name:"Cometstride Pants"}]
} as const;
export const DEFAULT_OUTFIT: Outfit = { character:"original", costume:'classic', hair:"original", helmet: "none", shirt: "original", pants: "original" };
const STORAGE_KEY = "forge-outfit-v1";
const ROOT = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/assets/reforged/cosmetics`;
export const pieceKey = (slot: CosmeticSlot, id: string) => `cosmetic-${slot}-${id}`;
export const outfitSlots=(outfit:Outfit):readonly CosmeticSlot[]=>outfit.character==='magical-girl'?['character','hair']:isFantasy(outfit.character)?['character']:outfit.character==='demon'?['character']:isAnimal(outfit.character)?['character','helmet']:SLOTS;
export const equipmentOptions=(slot:CosmeticSlot,outfit:Outfit):readonly {id:string;name:string}[]=>isAnimal(outfit.character)&&slot==='helmet'?ANIMAL_HATS:slot==='hair'&&outfit.character==='magical-girl'?MAGICAL_HAIR:COSMETICS[slot].filter(p=>p.id!=='star-buns');
export const selectedPiece=(slot:CosmeticSlot,outfit:Outfit)=>isAnimal(outfit.character)&&slot==='helmet'?outfit.animalHat??'none':outfit[slot];
export function cosmeticName(slot:CosmeticSlot,id:string,outfit:Outfit):string {
  if(isAnimal(outfit.character)&&slot==='helmet')return ANIMAL_HATS.find(p=>p.id===id)?.name??id;
  return COSMETICS[slot].find(p=>p.id===id)?.name??id;
}

export function sanitizeOutfit(value: unknown): Outfit {
  const source = value && typeof value === "object" ? value as Record<string,unknown> : {};
  const result={retroCostumes:Array.isArray(source.retroCostumes)?[...new Set(source.retroCostumes.filter((id):id is string=>typeof id==='string'&&COSMETICS.character.some(c=>c.id===id)&&!['pogo','aria'].includes(id)))]:[],detailedCostumes:Array.isArray(source.detailedCostumes)?[...new Set(source.detailedCostumes.filter(validDetailedId))]:[],...Object.fromEntries(SLOTS.map(slot => [slot, COSMETICS[slot].some(piece => piece.id === source[slot]) ? source[slot] : "original"])),animalHat:ANIMAL_HATS.some(h=>h.id===source.animalHat)?source.animalHat:'none',magicalCostume:source.magicalCostume==='starlight-16'?'starlight-16':'classic'} as Outfit;
  // Migrate retired looks and the former Spore Scout costume on load and in matches.
  if(result.character==='original'&&(source.costume==='mushroom'||(!source.costume&&source.shirt==='mushroom')))result.character='mushroom';
  const legacy=source.shirt==='original'?(source.helmet==='none'?'classic':'original'):source.shirt;
  Object.assign(result,costumeFields(source.costume==='finn-16'?'classic':typeof source.costume==='string'?source.costume:source.wardrobe2?'classic':String(legacy??'classic')));
  if(result.character==='mushroom')Object.assign(result,{helmet:'mushroom',shirt:'mushroom',pants:'mushroom'});
  result.hair=result.character==='magical-girl'?(source.hair==='star-buns'?'star-buns':'original'):result.character==='demon'&&DEMON_HAIRS.some(h=>h.id===source.hair)?String(source.hair):'original';
  return result;
}
export function loadOutfit(): Outfit {
  try { return sanitizeOutfit(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null")); }
  catch { return { ...DEFAULT_OUTFIT }; }
}
export function saveOutfit(outfit: Outfit): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeOutfit(outfit))); } catch { /* Session selection still works with storage disabled. */ }
}
export function queueCosmetics(scene: Phaser.Scene): void {
  for(const hat of ['party','fedora','unicorn'])scene.load.image('animal-hat-'+hat,`${ROOT}/hat-${hat}-16.png`);
  for(const costume of KNIGHT_COSTUMES)scene.load.spritesheet('fantasy-finn-'+costume+'-16',`${ROOT}/finn-${costume}-16.png`,{frameWidth:64,frameHeight:64});
  scene.load.spritesheet('fantasy-aria-16',`${ROOT}/aria-detail.png`,{frameWidth:128,frameHeight:128});
  scene.load.spritesheet('fantasy-pogo-16',`${ROOT}/pogo-16.png`,{frameWidth:64,frameHeight:64});
  scene.load.spritesheet('fantasy-finn',`${ROOT}/finn-knight.png`,{frameWidth:48,frameHeight:48});
  scene.load.spritesheet('fantasy-finn-16',`${ROOT}/finn-knight-16.png`,{frameWidth:64,frameHeight:64});
  for(const sheet of [...MAGICAL_HD_SHEETS,...DETAILED_SHEETS])scene.load.spritesheet('fantasy-'+sheet,`${ROOT}/${sheet}.png`,{frameWidth:64,frameHeight:64});
  for(const sheet of FANTASY_SHEETS)scene.load.spritesheet('fantasy-'+sheet,`${ROOT}/${sheet}.png`,{frameWidth:32,frameHeight:32});
  scene.load.image('demon-source',`${ROOT}/demon.png`);
  for(const animal of ANIMALS)scene.load.spritesheet(animal+'-sprites', `${ROOT}/${animal}.png`, {frameWidth:32,frameHeight:32});
  scene.load.image('head-bare-v2', `${ROOT}/head-bare-v2.png`);
  for(const hair of COSMETICS.hair) if(hair.id!=='star-buns')scene.load.image("hair-"+hair.id, `${ROOT}/hair-${hair.id}.png`);
  for (const slot of ["helmet","shirt","pants"] as const) for (const piece of COSMETICS[slot]) {
    if(piece.id!=="none") scene.load.image(pieceKey(slot,piece.id), `${ROOT}/${slot}-${piece.id}.png`);
  }
}

/** Compose once per selection, then use one ordinary sprite and the original
 * animation timing. All equipment shares the same frame grid and foot origin. */
export function outfitTexture(scene: Phaser.Scene, requested: Outfit): string {
  const outfit = sanitizeOutfit(requested);
  const retro=outfit.retroCostumes?.includes(outfit.character)??false;
  if(outfit.character==='aria')return fantasyTexture(scene,'aria','original','detailed');
  if(outfit.character==='pogo')return fantasyTexture(scene,'pogo','original','detailed');
  if(outfit.character==='original')return retro?fantasyTexture(scene,'finn','original','classic'):knightCostumeTexture(scene,outfit.costume??'classic');
  if(isAnimal(outfit.character))return animalTexture(scene,outfit.character,outfit.animalHat,!retro);
  if(!retro)return fantasyTexture(scene,outfit.character==='demon'&&outfit.hair!=='original'?'demon-'+outfit.hair:outfit.character+'',outfit.hair,'detailed');
  if(isFantasy(outfit.character))return fantasyTexture(scene,outfit.character,outfit.hair,'classic');
  if(outfit.character==='demon')return demonTexture(scene,outfit.hair);
  const key = `outfit-${SLOTS.map(slot => outfit[slot]).join("-")}`;
  if (scene.textures.exists(key)) return key;
  const canvas = document.createElement("canvas"); canvas.width = 320; canvas.height = 32;
  const context = canvas.getContext("2d")!; context.imageSmoothingEnabled = false;
  {
    for (const slot of ["pants", "shirt"] as const) {
      drawGarment(context,scene.textures.get(pieceKey(slot,outfit[slot])).getSourceImage() as HTMLImageElement,scene.textures.get(pieceKey(slot,'original')).getSourceImage() as HTMLImageElement);
    }
    for(let frame=0;frame<6;frame++) {
      if(outfit.helmet!=='none') drawHelmet(context,scene.textures.get(pieceKey('helmet',outfit.helmet)).getSourceImage() as HTMLImageElement,frame);
    }
    // Finn's uncovered head stays bald in every animation pose.
    if(outfit.helmet==='none') for(let frame=0;frame<6;frame++) {
      const pose=HEAD_POSES[frame];
      context.drawImage(scene.textures.get('head-bare-v2').getSourceImage() as HTMLImageElement,frame*32+12+pose.x,pose.y,11,11);
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

export function botOutfit(id:string):Outfit {
  let hash=0; for(const char of id) hash=(hash*31+char.charCodeAt(0))>>>0;
  const themes=["original","steel","copper","tropical","maid"];
  return {character:'original',...costumeFields(themes[hash%5])};
}

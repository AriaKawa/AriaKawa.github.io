import type Phaser from 'phaser';
import {fantasyTexture} from './fantasyRig';
export const KNIGHT_COSTUMES=['original','steel','copper','tropical','maid','diver','mage'] as const;
/** Every costume uses the same 64px knight rig and twelve animation poses. */
export function knightCostumeTexture(scene:Phaser.Scene,costume:string):string {
 return fantasyTexture(scene,costume==='classic'?'finn':'finn-'+costume,'original','detailed');
}

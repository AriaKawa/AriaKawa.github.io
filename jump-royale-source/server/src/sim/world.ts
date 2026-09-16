import {FOREST_WIDTH,FOREST_HEIGHT,FOREST_SPAWN} from './forest.js';
import { MOUNTAIN_HEIGHT, MOUNTAIN_WIDTH, MOUNTAIN_SPAWN } from './mountain.js';
import { WORLD_WIDTH, WORLD_HEIGHT, SPAWN_Y } from './constants.js';
export const worldForMap=(map:string)=>map==='forest' ? {width:FOREST_WIDTH,height:FOREST_HEIGHT,spawnY:FOREST_SPAWN,left:54,right:FOREST_WIDTH-54,top:0} : map==='mountain'
 ? {width:MOUNTAIN_WIDTH,height:MOUNTAIN_HEIGHT,spawnY:MOUNTAIN_SPAWN,left:54,right:MOUNTAIN_WIDTH-54,top:0}
 : {width:WORLD_WIDTH,height:WORLD_HEIGHT,spawnY:SPAWN_Y,left:54,right:WORLD_WIDTH-54,top:0};
export const floodForMap=(map:string)=>map==='forest' ? {grace:12,base:9,acceleration:.008,max:18} : map==='mountain'
 ? {grace:10,base:7,acceleration:.002,max:12}
 : {grace:9.5,base:28,acceleration:.3,max:80};

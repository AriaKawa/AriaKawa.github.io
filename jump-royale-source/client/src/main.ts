import './game/currencyExchange.css';
import {audio} from './game/audio';
audio.init();
import Phaser from "phaser";
import "./style.css";
import { GAME_HEIGHT, GAME_WIDTH, updateViewport } from "./game/constants";
import { BootScene } from "./scenes/BootScene";
import { GameScene } from "./scenes/GameScene";
import { MenuScene } from "./scenes/MenuScene";
import { ResultsScene } from "./scenes/ResultsScene";
import {claimGoldGift} from './game/economy';
import {handleWardrobeReset} from './game/wardrobeReset';

if(claimGoldGift(location.hash))history.replaceState(null,'',location.pathname+location.search);
handleWardrobeReset();

updateViewport();
const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#0b0b12",
  // Art V2 is authored on 8/16/32px grids. These settings force nearest-neighbor
  // sampling and whole-pixel camera placement so low-resolution sprites stay crisp.
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  scale: { mode: Phaser.Scale.NONE, autoCenter: Phaser.Scale.CENTER_BOTH },
  render: { pixelArt: true, antialias: false, antialiasGL: false, roundPixels: true },
  scene: [BootScene, MenuScene, GameScene, ResultsScene]
});

window.addEventListener("resize", () => { updateViewport(); game.scale.resize(GAME_WIDTH, GAME_HEIGHT); });
if (import.meta.env.DEV) Object.assign(window, { __FORGE_DEV__: game });

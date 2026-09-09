import Phaser from "phaser";
import "./styles.css";
import { BootScene } from "./scenes/BootScene";
import { DeployScene } from "./scenes/DeployScene";
import { GlobeDeployScene } from "./scenes/GlobeDeployScene";
import { MenuScene } from "./scenes/MenuScene";
import { WorldScene } from "./scenes/WorldScene";
import { RoadEditorScene } from "./scenes/RoadEditorScene";
import { GameClient } from "./net/GameClient";
import { setupGameOverlays } from "./ui/GameOverlayController";

const game = new Phaser.Game({
  // The globe owns the page's WebGL context; the tactical theater uses the
  // stable 2D renderer so switching scenes cannot strand a lost GPU context.
  type: Phaser.CANVAS,
  parent: "game",
  backgroundColor: "#11130f",
  pixelArt: true,
  antialias: false,
  scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH, width: window.innerWidth, height: window.innerHeight },
  input: { mouse: { preventDefaultWheel: true } },
  scene: [BootScene, MenuScene, GlobeDeployScene, RoadEditorScene, WorldScene, DeployScene]
});

const network = new GameClient();
game.registry.set("network", network);
setupGameOverlays(game, network);
import "./expedition-theme.css";
import "./campaign.css";

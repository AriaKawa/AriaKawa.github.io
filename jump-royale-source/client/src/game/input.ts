import Phaser from "phaser";
import type { InputMessage } from "./types";

export class ClimbInput {
  private keys: Record<string, Phaser.Input.Keyboard.Key>;
  private previousJump = false;
  private seq = 0;

  private restartQueued = false;
  private flightQueued = false;

  constructor(scene: Phaser.Scene) {
    const keyboard = scene.input.keyboard!;
    this.keys = keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      upW: Phaser.Input.Keyboard.KeyCodes.W,
      downS: Phaser.Input.Keyboard.KeyCodes.S,
      flight: Phaser.Input.Keyboard.KeyCodes.L,
      leftA: Phaser.Input.Keyboard.KeyCodes.A,
      leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
      rightD: Phaser.Input.Keyboard.KeyCodes.D,
      rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      restart: Phaser.Input.Keyboard.KeyCodes.R
    }) as Record<string, Phaser.Input.Keyboard.Key>;
    this.keys.restart.on("down", () => { this.restartQueued = true; });
    this.keys.flight.on("down", (_key: Phaser.Input.Keyboard.Key, event: KeyboardEvent) => { if(!event?.repeat) this.flightQueued = true; });
  }

  snapshot(): InputMessage {
    const jumpHeld = this.keys.jump.isDown;
    const message = {
      up: this.keys.up.isDown || this.keys.upW.isDown, down: this.keys.down.isDown || this.keys.downS.isDown,
      toggleFlight: this.flightQueued,
      left: this.keys.leftA.isDown || this.keys.leftArrow.isDown,
      right: this.keys.rightD.isDown || this.keys.rightArrow.isDown,
      jumpHeld,
      jumpPressed: jumpHeld && !this.previousJump,
      jumpReleased: !jumpHeld && this.previousJump,
      seq: ++this.seq
    };
    this.previousJump = jumpHeld;
    this.flightQueued = false;
    return message;
  }

  restartPressed(): boolean { const pressed = this.restartQueued; this.restartQueued = false; return pressed; }
}

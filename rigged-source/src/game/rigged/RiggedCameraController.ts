import * as THREE from "three";

export type RiggedCameraMode = "chase" | "enemy";

export type RiggedCameraBounds =
  | { kind: "ring"; radius: number }
  | { kind: "capsule"; straightHalfLength: number; outerRadius: number };

export type RiggedCameraFrame = {
  dt: number;
  playerPosition: THREE.Vector3;
  playerHeading: number;
  enemyPosition?: THREE.Vector3;
  enemyAvailable: boolean;
  bounds: RiggedCameraBounds;
  groundHeight: (x: number, z: number) => number;
  shake?: THREE.Vector3;
};

export type RiggedCameraUpdate = {
  mode: RiggedCameraMode;
  fellBackToChase: boolean;
  targetDistance: number | null;
};

export type RiggedCameraToggle = {
  mode: RiggedCameraMode;
  noTarget: boolean;
};

const CHASE_DISTANCE = 11.5;
const CHASE_HEIGHT = 6.3;
const MIN_FLOOR_CLEARANCE = 2.6;
const ARENA_WALL_CLEARANCE = 4.5;

/** Horizon-stabilized chase/target camera anchored to the player's vehicle. */
export class RiggedCameraController {
  mode: RiggedCameraMode = "chase";

  private readonly camera: THREE.PerspectiveCamera;
  private readonly desiredPosition = new THREE.Vector3();
  private readonly desiredLook = new THREE.Vector3();
  private readonly smoothedLook = new THREE.Vector3();
  private readonly forward = new THREE.Vector3();
  private readonly toEnemy = new THREE.Vector3();
  private orbitYaw = 0;
  private followDistance = CHASE_DISTANCE;
  private followHeight = CHASE_HEIGHT;
  private initialized = false;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  toggle(enemyAvailable: boolean): RiggedCameraToggle {
    if (this.mode === "enemy") {
      this.mode = "chase";
      return { mode: this.mode, noTarget: false };
    }
    if (!enemyAvailable) return { mode: this.mode, noTarget: true };
    this.mode = "enemy";
    return { mode: this.mode, noTarget: false };
  }

  snapToChase(playerPosition: THREE.Vector3, playerHeading: number, groundHeight: (x: number, z: number) => number): void {
    this.orbitYaw = playerHeading;
    this.followDistance = CHASE_DISTANCE;
    this.followHeight = CHASE_HEIGHT;
    this.forward.set(Math.sin(playerHeading), 0, Math.cos(playerHeading));
    this.camera.position.copy(playerPosition).addScaledVector(this.forward, -CHASE_DISTANCE);
    this.camera.position.y = Math.max(playerPosition.y + CHASE_HEIGHT, groundHeight(this.camera.position.x, this.camera.position.z) + MIN_FLOOR_CLEARANCE);
    this.smoothedLook.copy(playerPosition).addScaledVector(this.forward, 4);
    this.smoothedLook.y = playerPosition.y + 1.2;
    this.camera.lookAt(this.smoothedLook);
    this.initialized = true;
  }

  update(frame: RiggedCameraFrame): RiggedCameraUpdate {
    const dt = THREE.MathUtils.clamp(frame.dt, 0, 1 / 30);
    let fellBackToChase = false;
    if (this.mode === "enemy" && (!frame.enemyAvailable || !frame.enemyPosition)) {
      this.mode = "chase";
      fellBackToChase = true;
    }

    this.forward.set(Math.sin(frame.playerHeading), 0, Math.cos(frame.playerHeading));
    let targetDistance: number | null = null;

    if (this.mode === "enemy" && frame.enemyPosition) {
      this.toEnemy.copy(frame.enemyPosition).sub(frame.playerPosition);
      this.toEnemy.y = 0;
      targetDistance = this.toEnemy.length();

      // Retain the last orbit direction at point-blank range so overlapping cars
      // cannot send the camera through an arbitrary 180-degree spin.
      if (targetDistance > 0.75) {
        const desiredYaw = Math.atan2(this.toEnemy.x, this.toEnemy.z);
        const yawDelta = Math.atan2(Math.sin(desiredYaw - this.orbitYaw), Math.cos(desiredYaw - this.orbitYaw));
        this.orbitYaw += yawDelta * this.response(5.4, dt);
      }

      const distanceGoal = THREE.MathUtils.clamp(8.9 + targetDistance * 0.105, 9.5, 14.5);
      const heightGoal = THREE.MathUtils.clamp(6.4 + targetDistance * 0.035, 6.4, 9.2);
      this.followDistance = THREE.MathUtils.lerp(this.followDistance, distanceGoal, this.response(4.2, dt));
      this.followHeight = THREE.MathUtils.lerp(this.followHeight, heightGoal, this.response(4.2, dt));

      this.forward.set(Math.sin(this.orbitYaw), 0, Math.cos(this.orbitYaw));
      this.desiredPosition.copy(frame.playerPosition).addScaledVector(this.forward, -this.followDistance);
      this.desiredPosition.y = frame.playerPosition.y + this.followHeight;

      // Bias toward the rival without staring only at it. The player remains the
      // near anchor while the focus shifts farther down the shared sight line.
      const focusBlend = THREE.MathUtils.clamp(0.36 + targetDistance * 0.002, 0.36, 0.54);
      this.desiredLook.lerpVectors(frame.playerPosition, frame.enemyPosition, focusBlend);
      this.desiredLook.y += 1.25;
    } else {
      this.orbitYaw = frame.playerHeading;
      this.followDistance = THREE.MathUtils.lerp(this.followDistance, CHASE_DISTANCE, this.response(4.8, dt));
      this.followHeight = THREE.MathUtils.lerp(this.followHeight, CHASE_HEIGHT, this.response(4.8, dt));
      this.desiredPosition.copy(frame.playerPosition).addScaledVector(this.forward, -this.followDistance);
      this.desiredPosition.y = frame.playerPosition.y + this.followHeight;
      this.desiredLook.copy(frame.playerPosition).addScaledVector(this.forward, 4);
      this.desiredLook.y = frame.playerPosition.y + 1.2;
    }

    if (frame.shake) this.desiredPosition.add(frame.shake);
    this.constrainToArena(this.desiredPosition, frame.bounds);
    this.desiredPosition.y = Math.max(
      this.desiredPosition.y,
      frame.groundHeight(this.desiredPosition.x, this.desiredPosition.z) + MIN_FLOOR_CLEARANCE,
    );

    if (!this.initialized) this.snapToChase(frame.playerPosition, frame.playerHeading, frame.groundHeight);
    this.camera.position.lerp(this.desiredPosition, this.response(6.5, dt));
    this.smoothedLook.lerp(this.desiredLook, this.response(8.5, dt));
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(this.smoothedLook);

    return { mode: this.mode, fellBackToChase, targetDistance };
  }

  get lookAt(): THREE.Vector3 {
    return this.smoothedLook;
  }

  private response(rate: number, dt: number): number {
    return 1 - Math.exp(-rate * dt);
  }

  private constrainToArena(position: THREE.Vector3, bounds: RiggedCameraBounds): void {
    if (bounds.kind === "ring") {
      const limit = Math.max(1, bounds.radius - ARENA_WALL_CLEARANCE);
      const radius = Math.hypot(position.x, position.z);
      if (radius > limit) {
        position.x *= limit / radius;
        position.z *= limit / radius;
      }
      return;
    }

    const anchorZ = THREE.MathUtils.clamp(position.z, -bounds.straightHalfLength, bounds.straightHalfLength);
    const dx = position.x;
    const dz = position.z - anchorZ;
    const distance = Math.hypot(dx, dz);
    const limit = Math.max(1, bounds.outerRadius - ARENA_WALL_CLEARANCE);
    if (distance <= limit) return;
    position.x = dx * limit / distance;
    position.z = anchorZ + dz * limit / distance;
  }
}

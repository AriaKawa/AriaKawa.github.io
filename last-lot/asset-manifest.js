window.LAST_LOT_ASSETS = {
  terrain: {
    ground: "assets/ground.png",
    garbage: "assets/garbage.png",
    building: "assets/building.png",
    brickWall: "assets/brick-wall.png",
    wireFence: "assets/wire-fence.png"
  },
  props: {
    woodWallH: "assets/wood-wall-h.png",
    woodWallV: "assets/wood-wall-v.png",
    destroyedWall: "assets/destroyed-wall.png",
    boardedDoor: "assets/boarded-door.png",
    container: "assets/container.png",
    carRed: "assets/car-red.png",
    carBlueWreck: "assets/car-blue-wreck.png",
    van: "assets/van.png"
  },
  pickups: {
    ammo: "assets/pickup-ammo.png",
    food: "assets/pickup-food.png",
    shotgun: "assets/pickup-shotgun.png"
  },
  ui: { heart: "assets/heart.png", bullet: "assets/pistol-bullet.png" },
  player: {
    pistol: {
      move: { right: "assets/player-pistol-right.png", left: "assets/player-pistol-left.png", down: "assets/player-pistol-down.png", up: "assets/player-pistol-up.png" },
      shoot: { right: "assets/player-pistol-shoot-right.png", left: "assets/player-pistol-shoot-left.png", down: "assets/player-pistol-shoot-down.png", up: "assets/player-pistol-shoot-up.png" },
      moveFrames: 6, shootFrames: 3
    },
    shotgun: {
      move: { right: "assets/player-shotgun-right.png", left: "assets/player-shotgun-left.png", down: "assets/player-shotgun-down.png", up: "assets/player-shotgun-up.png" },
      shoot: { right: "assets/player-shotgun-shoot-right.png", left: "assets/player-shotgun-shoot-left.png", down: "assets/player-shotgun-shoot-down.png", up: "assets/player-shotgun-shoot-up.png" },
      moveFrames: 6, shootFrames: 3
    }
  },
  zombies: {
    small: {
      walk: { right: "assets/zombie-small-right.png", left: "assets/zombie-small-left.png", down: "assets/zombie-small-down.png", up: "assets/zombie-small-up.png" },
      death: { right: "assets/zombie-small-death-right.png", left: "assets/zombie-small-death-left.png" },
      walkFrames: 6, deathFrames: 6
    },
    axe: {
      walk: { right: "assets/zombie-axe-right.png", left: "assets/zombie-axe-left.png", down: "assets/zombie-axe-down.png", up: "assets/zombie-axe-up.png" },
      death: { right: "assets/zombie-axe-death-right.png", left: "assets/zombie-axe-death-left.png" },
      walkFrames: 8, deathFrames: 6
    },
    big: {
      walk: { right: "assets/zombie-big-right.png", left: "assets/zombie-big-left.png", down: "assets/zombie-big-down.png", up: "assets/zombie-big-up.png" },
      death: { right: "assets/zombie-big-death-right.png", left: "assets/zombie-big-death-left.png" },
      walkFrames: 8, deathFrames: 7
    }
  }
};

const SIZE = 4;
const START_RESOLVE = 3;
const BASE_MOVES = 28;
const STORAGE_KEY = "ak-2048-rogue-records";

const floorRules = [
  {
    name: "Awakening chamber",
    description: "A clean board. Learn the tempo.",
    setup: () => {}
  },
  {
    name: "Ashen slide",
    description: "New tiles are more likely to arrive as 4s.",
    fourChance: 0.34,
    setup: () => {}
  },
  {
    name: "Fracture glass",
    description: "One random tile splits after every sixth merge.",
    setup: () => {}
  },
  {
    name: "Thin air",
    description: "Two fewer moves before resolve is tested.",
    movePenalty: 2,
    setup: () => {}
  },
  {
    name: "Deep engine",
    description: "Targets rise faster, but merges pay bonus score.",
    scoreMultiplier: 1.15,
    setup: () => {}
  }
];

const relics = [
  {
    id: "overclock",
    name: "Overclock Sigil",
    description: "+4 moves at the start of every floor.",
    apply: (state) => {
      state.moveBonus += 4;
    }
  },
  {
    id: "mercy",
    name: "Mercy Circuit",
    description: "Restore 1 resolve now, up to 5.",
    apply: (state) => {
      state.resolve = Math.min(5, state.resolve + 1);
    }
  },
  {
    id: "forge",
    name: "Twin Forge",
    description: "The first spawn each floor creates two tiles.",
    apply: (state) => {
      state.flags.twinForge = true;
    }
  },
  {
    id: "cleanser",
    name: "Null Cleanser",
    description: "Every 10 merges removes the smallest tile.",
    apply: (state) => {
      state.flags.cleanser = true;
    }
  },
  {
    id: "interest",
    name: "Golden Ratio",
    description: "Gain 12 bonus score for each empty cell after a move.",
    apply: (state) => {
      state.flags.interest = true;
    }
  },
  {
    id: "anchor",
    name: "Anchor Rune",
    description: "Move clocks cannot start below 24.",
    apply: (state) => {
      state.flags.anchor = true;
    }
  },
  {
    id: "echo",
    name: "Echo Lattice",
    description: "Every seventh merge repeats its score bonus.",
    apply: (state) => {
      state.flags.echo = true;
    }
  },
  {
    id: "spark",
    name: "Spark Seed",
    description: "Floors begin with an extra 8 tile.",
    apply: (state) => {
      state.flags.spark = true;
    }
  }
];

const el = {
  board: document.getElementById("board"),
  floor: document.getElementById("floor"),
  floorRule: document.getElementById("floorRule"),
  score: document.getElementById("score"),
  target: document.getElementById("target"),
  moves: document.getElementById("moves"),
  resolve: document.getElementById("resolve"),
  pressureFill: document.getElementById("pressureFill"),
  status: document.getElementById("status"),
  relics: document.getElementById("relics"),
  relicCount: document.getElementById("relicCount"),
  choices: document.getElementById("choices"),
  choiceOverlay: document.getElementById("choiceOverlay"),
  endOverlay: document.getElementById("endOverlay"),
  endEyebrow: document.getElementById("endEyebrow"),
  endTitle: document.getElementById("endTitle"),
  endBody: document.getElementById("endBody"),
  bestFloor: document.getElementById("bestFloor"),
  bestScore: document.getElementById("bestScore"),
  restart: document.getElementById("restart"),
  again: document.getElementById("again")
};

let state;
let previousValues = [];
let lastMerged = new Set();
let startTouch = null;

function createEmptyBoard() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { bestScore: 0, bestFloor: 1 };
    }

    const parsed = JSON.parse(raw);
    return {
      bestScore: Number.isFinite(parsed.bestScore) ? parsed.bestScore : 0,
      bestFloor: Number.isFinite(parsed.bestFloor) ? parsed.bestFloor : 1
    };
  } catch {
    return { bestScore: 0, bestFloor: 1 };
  }
}

function saveRecords() {
  const records = loadRecords();
  const next = {
    bestScore: Math.max(records.bestScore, state.score),
    bestFloor: Math.max(records.bestFloor, state.floor)
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return;
  }
}

function getRule() {
  return floorRules[(state.floor - 1) % floorRules.length];
}

function getTarget() {
  return Math.min(4096, 128 * 2 ** (state.floor - 1));
}

function getMoveLimit() {
  const rule = getRule();
  const pressure = Math.max(0, state.floor - 1);
  let limit = BASE_MOVES - Math.floor(pressure / 2) - (rule.movePenalty || 0) + state.moveBonus;
  if (state.flags.anchor) {
    limit = Math.max(24, limit);
  }
  return Math.max(18, limit);
}

function newRun() {
  state = {
    board: createEmptyBoard(),
    floor: 1,
    score: 0,
    movesLeft: BASE_MOVES,
    resolve: START_RESOLVE,
    target: 128,
    moveBonus: 0,
    mergeCount: 0,
    floorMergeCount: 0,
    lastCleanseAt: 0,
    lastFractureAt: 0,
    relics: [],
    flags: {},
    locked: false,
    gameOver: false
  };
  startFloor();
  el.choiceOverlay.hidden = true;
  el.endOverlay.hidden = true;
}

function startFloor() {
  state.board = createEmptyBoard();
  state.target = getTarget();
  state.movesLeft = getMoveLimit();
  state.floorMergeCount = 0;
  state.locked = false;
  lastMerged = new Set();
  previousValues = [];
  getRule().setup(state);
  spawnTile();
  spawnTile();
  if (state.flags.spark) {
    spawnTile(8);
  }
  if (state.flags.twinForge) {
    spawnTile();
  }
  setStatus(getRule().description);
  render();
}

function setStatus(message) {
  el.status.textContent = message;
}

function emptyCells() {
  const cells = [];
  state.board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (!value) {
        cells.push({ x, y });
      }
    });
  });
  return cells;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function spawnTile(forcedValue) {
  const cells = emptyCells();
  if (!cells.length) {
    return false;
  }

  const rule = getRule();
  const cell = randomItem(cells);
  const fourChance = rule.fourChance || 0.1;
  state.board[cell.y][cell.x] = forcedValue || (Math.random() < fourChance ? 4 : 2);
  previousValues[cell.y * SIZE + cell.x] = "new";
  return true;
}

function move(direction) {
  if (state.locked || state.gameOver) {
    return;
  }

  previousValues = state.board.flat();
  lastMerged = new Set();
  const before = JSON.stringify(state.board);
  const result = slide(direction);
  const after = JSON.stringify(state.board);

  if (before === after) {
    setStatus("No shift available in that direction.");
    if (!hasMoves()) {
      endRun(false, "No legal moves remain.");
    }
    render();
    return;
  }

  state.movesLeft -= 1;
  if (result.merged) {
    state.mergeCount += result.merged;
    state.floorMergeCount += result.merged;
  }

  if (state.flags.cleanser && state.mergeCount > 0 && state.mergeCount % 10 === 0 && state.lastCleanseAt !== state.mergeCount) {
    state.lastCleanseAt = state.mergeCount;
    removeSmallestTile();
  }

  if (getRule().name === "Fracture glass" && state.floorMergeCount > 0 && state.floorMergeCount % 6 === 0 && state.lastFractureAt !== state.floorMergeCount) {
    state.lastFractureAt = state.floorMergeCount;
    fractureRandomTile();
  }

  if (state.flags.interest) {
    state.score += emptyCells().length * 12;
  }

  spawnTile();

  if (maxTile() >= state.target) {
    state.locked = true;
    saveRecords();
    showChoices();
  } else if (state.movesLeft <= 0) {
    state.resolve -= 1;
    if (state.resolve <= 0) {
      endRun(false, "The move clock shattered your last resolve.");
    } else {
      state.movesLeft = Math.max(10, Math.floor(getMoveLimit() * 0.55));
      setStatus("Resolve absorbed the pressure. You get a shorter clock to finish the floor.");
    }
  } else if (!hasMoves()) {
    endRun(false, "The board locked with no merges left.");
  } else {
    setStatus(result.merged ? "Good merge. Keep building toward the floor target." : "Shifted. The clock tightens.");
  }

  render();
}

function slide(direction) {
  let merged = 0;
  const readLine = (index) => {
    const line = [];
    for (let step = 0; step < SIZE; step += 1) {
      const x = direction === "left" ? step : direction === "right" ? SIZE - 1 - step : index;
      const y = direction === "up" ? step : direction === "down" ? SIZE - 1 - step : index;
      line.push({ x, y, value: state.board[y][x] });
    }
    return line;
  };

  const writeLine = (line, values) => {
    line.forEach((cell, index) => {
      state.board[cell.y][cell.x] = values[index] || 0;
    });
  };

  for (let index = 0; index < SIZE; index += 1) {
    const line = readLine(index);
    const values = line.map((cell) => cell.value).filter(Boolean);
    const next = [];

    for (let i = 0; i < values.length; i += 1) {
      if (values[i] === values[i + 1]) {
        const value = values[i] * 2;
        const multiplier = getRule().scoreMultiplier || 1;
        let gained = Math.round(value * multiplier);
        merged += 1;
        if (state.flags.echo && state.mergeCount > 0 && state.mergeCount % 7 === 6) {
          gained += value;
        }
        state.score += gained;
        next.push(value);
        i += 1;
      } else {
        next.push(values[i]);
      }
    }

    while (next.length < SIZE) {
      next.push(0);
    }

    writeLine(line, next);
    next.forEach((value, nextIndex) => {
      const oldValue = line[nextIndex].value;
      if (value && value !== oldValue && value % 2 === 0) {
        const cell = line[nextIndex];
        if (previousValues.includes(value / 2)) {
          lastMerged.add(cell.y * SIZE + cell.x);
        }
      }
    });
  }

  return { merged };
}

function removeSmallestTile() {
  const cells = [];
  state.board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        cells.push({ value, x, y });
      }
    });
  });

  if (cells.length <= 1) {
    return;
  }

  cells.sort((a, b) => a.value - b.value);
  const cell = cells[0];
  state.board[cell.y][cell.x] = 0;
  setStatus("Null Cleanser erased the smallest tile.");
}

function fractureRandomTile() {
  const cells = [];
  state.board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value >= 8) {
        cells.push({ value, x, y });
      }
    });
  });

  if (!cells.length || !emptyCells().length) {
    return;
  }

  const cell = randomItem(cells);
  state.board[cell.y][cell.x] = cell.value / 2;
  spawnTile(cell.value / 2);
  setStatus("Fracture glass split a larger tile into twin halves.");
}

function maxTile() {
  return Math.max(...state.board.flat());
}

function hasMoves() {
  if (emptyCells().length) {
    return true;
  }

  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const value = state.board[y][x];
      if (state.board[y]?.[x + 1] === value || state.board[y + 1]?.[x] === value) {
        return true;
      }
    }
  }

  return false;
}

function showChoices() {
  const available = relics.filter((relic) => !state.relics.some((owned) => owned.id === relic.id));
  const offered = [];
  while (available.length && offered.length < 3) {
    const index = Math.floor(Math.random() * available.length);
    offered.push(available.splice(index, 1)[0]);
  }

  el.choices.innerHTML = "";
  offered.forEach((relic) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-card";
    button.innerHTML = `<strong>${relic.name}</strong><span>${relic.description}</span>`;
    button.addEventListener("click", () => {
      pickRelic(relic);
    });
    el.choices.appendChild(button);
  });

  if (!offered.length) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-card";
    button.innerHTML = "<strong>Score Cache</strong><span>No new relics remain. Gain 800 score and descend.</span>";
    button.addEventListener("click", () => {
      state.score += 800;
      descend();
    });
    el.choices.appendChild(button);
  }

  el.choiceOverlay.hidden = false;
  render();
}

function pickRelic(relic) {
  state.relics.push(relic);
  relic.apply(state);
  descend();
}

function descend() {
  el.choiceOverlay.hidden = true;
  state.floor += 1;
  saveRecords();
  startFloor();
}

function endRun(victory, reason) {
  state.gameOver = true;
  state.locked = true;
  saveRecords();
  el.endEyebrow.textContent = victory ? "Run complete" : "Run ended";
  el.endTitle.textContent = victory ? "The dungeon folds into a perfect tile." : "The board went quiet.";
  el.endBody.textContent = `${reason} Final score: ${state.score.toLocaleString()}. Highest tile: ${maxTile().toLocaleString()}.`;
  el.endOverlay.hidden = false;
}

function render() {
  el.board.innerHTML = "";
  const flat = state.board.flat();
  flat.forEach((value, index) => {
    const tile = document.createElement("div");
    tile.className = value ? "tile" : "tile is-empty";
    tile.setAttribute("role", "gridcell");
    tile.dataset.value = String(value || 0);
    tile.textContent = value || "";
    if (previousValues[index] === "new") {
      tile.classList.add("is-new");
    }
    if (lastMerged.has(index)) {
      tile.classList.add("is-merged");
    }
    if (getRule().name === "Fracture glass" && value >= 8) {
      tile.classList.add("is-fractured");
    }
    el.board.appendChild(tile);
  });

  const records = loadRecords();
  el.floor.textContent = state.floor.toLocaleString();
  el.floorRule.textContent = getRule().name;
  el.score.textContent = state.score.toLocaleString();
  el.target.textContent = state.target.toLocaleString();
  el.moves.textContent = state.movesLeft.toLocaleString();
  el.resolve.textContent = state.resolve.toLocaleString();
  el.relicCount.textContent = state.relics.length.toLocaleString();
  el.bestFloor.textContent = records.bestFloor.toLocaleString();
  el.bestScore.textContent = records.bestScore.toLocaleString();

  const limit = getMoveLimit();
  const pressure = Math.max(0, Math.min(100, ((limit - state.movesLeft) / limit) * 100));
  el.pressureFill.style.width = `${pressure}%`;

  renderRelics();
}

function renderRelics() {
  el.relics.innerHTML = "";
  if (!state.relics.length) {
    const empty = document.createElement("p");
    empty.textContent = "No relics yet. Clear a floor to draft your first one.";
    el.relics.appendChild(empty);
    return;
  }

  state.relics.forEach((relic) => {
    const item = document.createElement("div");
    item.className = "relic";
    item.innerHTML = `<strong>${relic.name}</strong><span>${relic.description}</span>`;
    el.relics.appendChild(item);
  });
}

function handleKeydown(event) {
  const keyMap = {
    ArrowUp: "up",
    w: "up",
    W: "up",
    ArrowDown: "down",
    s: "down",
    S: "down",
    ArrowLeft: "left",
    a: "left",
    A: "left",
    ArrowRight: "right",
    d: "right",
    D: "right"
  };

  const direction = keyMap[event.key];
  if (!direction) {
    return;
  }

  event.preventDefault();
  move(direction);
}

function setupTouch() {
  el.board.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    startTouch = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });

  el.board.addEventListener("touchend", (event) => {
    if (!startTouch) {
      return;
    }

    const touch = event.changedTouches[0];
    const dx = touch.clientX - startTouch.x;
    const dy = touch.clientY - startTouch.y;
    startTouch = null;

    if (Math.max(Math.abs(dx), Math.abs(dy)) < 28) {
      return;
    }

    move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
  }, { passive: true });
}

document.querySelectorAll("[data-dir]").forEach((button) => {
  button.addEventListener("click", () => {
    move(button.dataset.dir);
  });
});

document.addEventListener("keydown", handleKeydown);
el.restart.addEventListener("click", newRun);
el.again.addEventListener("click", newRun);
setupTouch();
newRun();

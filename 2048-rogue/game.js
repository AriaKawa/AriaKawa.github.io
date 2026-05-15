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
let isAnimating = false;

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
  el.choiceOverlay.hidden = true;
  el.endOverlay.hidden = true;

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
  if (state.locked || state.gameOver || isAnimating) {
    return;
  }

  const cellCenters = measureCellCenters();
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

  const resolvingCells = getResolvingCells(result.moves);
  render(resolvingCells);
  animateTileMoves(result.moves, cellCenters, previousValues, resolvingCells);
}

function slide(direction) {
  let merged = 0;
  const moves = [];
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
    const values = line.filter((cell) => cell.value);
    const next = [];
    const lineMoves = [];

    for (let i = 0; i < values.length; i += 1) {
      if (values[i].value === values[i + 1]?.value) {
        const value = values[i].value * 2;
        const multiplier = getRule().scoreMultiplier || 1;
        let gained = Math.round(value * multiplier);
        merged += 1;
        if (state.flags.echo && state.mergeCount > 0 && state.mergeCount % 7 === 6) {
          gained += value;
        }
        state.score += gained;
        next.push({ value, sources: [values[i], values[i + 1]], merged: true });
        i += 1;
      } else {
        next.push({ value: values[i].value, sources: [values[i]], merged: false });
      }
    }

    while (next.length < SIZE) {
      next.push({ value: 0, sources: [], merged: false });
    }

    writeLine(line, next.map((entry) => entry.value));
    next.forEach((entry, nextIndex) => {
      if (!entry.value || !entry.sources.length) {
        return;
      }

      const to = line[nextIndex];
      entry.sources.forEach((source) => {
        const changedCell = source.x !== to.x || source.y !== to.y;
        if (entry.merged || changedCell) {
          lineMoves.push({ from: source, to, value: source.value });
        }
      });

      if (entry.merged) {
        lastMerged.add(to.y * SIZE + to.x);
      }
    });
    moves.push(...lineMoves);
  }

  return { merged, moves };
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

function render(resolvingCells = new Set()) {
  el.board.innerHTML = "";
  const flat = state.board.flat();
  flat.forEach((value, index) => {
    const tile = document.createElement("div");
    tile.className = value ? "tile" : "tile is-empty";
    tile.setAttribute("role", "gridcell");
    tile.dataset.value = String(value || 0);
    tile.textContent = value || "";
    if (!resolvingCells.has(index) && previousValues[index] === "new") {
      tile.classList.add("is-new");
    }
    if (!resolvingCells.has(index) && lastMerged.has(index)) {
      tile.classList.add("is-merged");
    }
    if (resolvingCells.has(index)) {
      tile.classList.add("is-resolving");
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

function measureCellCenters() {
  const centers = new Map();
  Array.from(el.board.children).forEach((child, index) => {
    const rect = child.getBoundingClientRect();
    centers.set(index, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
  });
  return centers;
}

function getResolvingCells(moves) {
  const cells = new Set();
  moves.forEach((move) => {
    cells.add(move.to.y * SIZE + move.to.x);
  });
  previousValues.forEach((value, index) => {
    if (value === "new") {
      cells.add(index);
    }
  });
  return cells;
}

function animateTileMoves(moves, cellCenters, valuesBeforeMove, resolvingCells) {
  if (!moves.length) {
    return;
  }

  const motionDuration = 260;
  isAnimating = true;
  const boardRect = el.board.getBoundingClientRect();
  const tileRect = el.board.children[0]?.getBoundingClientRect();
  const layer = document.createElement("div");
  layer.className = "tile-motion-layer";
  el.board.appendChild(layer);

  moves.forEach((move, index) => {
    const fromIndex = move.from.y * SIZE + move.from.x;
    const toIndex = move.to.y * SIZE + move.to.x;
    const fromCenter = cellCenters.get(fromIndex);
    const toCenter = cellCenters.get(toIndex);
    const value = move.value || valuesBeforeMove[fromIndex];
    if (!fromCenter || !toCenter || !tileRect || !value) {
      return;
    }

    const clone = document.createElement("div");
    clone.className = "tile tile-motion";
    clone.dataset.value = String(value);
    clone.textContent = value;
    clone.style.width = `${tileRect.width}px`;
    clone.style.height = `${tileRect.height}px`;
    clone.style.left = `${fromCenter.x - boardRect.left - tileRect.width / 2}px`;
    clone.style.top = `${fromCenter.y - boardRect.top - tileRect.height / 2}px`;
    layer.appendChild(clone);

    clone.getBoundingClientRect();
    clone.style.transform = `translate(${toCenter.x - fromCenter.x}px, ${toCenter.y - fromCenter.y}px)`;
  });

  window.setTimeout(() => {
    layer.remove();
    revealResolvedTiles(resolvingCells);
    isAnimating = false;
  }, motionDuration + 35);
}

function revealResolvedTiles(resolvingCells) {
  resolvingCells.forEach((index) => {
    const tile = el.board.children[index];
    if (!tile) {
      return;
    }

    tile.classList.remove("is-resolving");
    if (previousValues[index] === "new") {
      tile.classList.add("is-new");
    }
    if (lastMerged.has(index)) {
      tile.classList.add("is-merged");
    }
  });
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
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return;
  }

  const keyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    s: "down",
    a: "left",
    d: "right"
  };

  const direction = keyMap[event.key] || keyMap[event.key.toLowerCase()];
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

document.addEventListener("keydown", handleKeydown);
el.restart.addEventListener("click", newRun);
el.again.addEventListener("click", newRun);
setupTouch();
newRun();

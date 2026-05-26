const SAVE_KEY = "kana-dungeon-save-v1";
const SAVE_VERSION = 2;
const TAU = Math.PI * 2;

export const KANA_PROMPTS = [
  { kana: "あ", answer: "a", group: "hiragana base", rule: "plain vowel" },
  { kana: "い", answer: "i", group: "hiragana base", rule: "plain vowel" },
  { kana: "う", answer: "u", group: "hiragana base", rule: "plain vowel" },
  { kana: "え", answer: "e", group: "hiragana base", rule: "plain vowel" },
  { kana: "お", answer: "o", group: "hiragana base", rule: "plain vowel" },
  { kana: "か", answer: "ka", group: "hiragana base", rule: "k row" },
  { kana: "き", answer: "ki", group: "hiragana base", rule: "k row" },
  { kana: "く", answer: "ku", group: "hiragana base", rule: "k row" },
  { kana: "け", answer: "ke", group: "hiragana base", rule: "k row" },
  { kana: "こ", answer: "ko", group: "hiragana base", rule: "k row" },
  { kana: "さ", answer: "sa", group: "hiragana base", rule: "s row" },
  { kana: "し", answer: "shi", group: "hiragana base", rule: "strict Hepburn uses shi" },
  { kana: "す", answer: "su", group: "hiragana base", rule: "s row" },
  { kana: "せ", answer: "se", group: "hiragana base", rule: "s row" },
  { kana: "そ", answer: "so", group: "hiragana base", rule: "s row" },
  { kana: "た", answer: "ta", group: "hiragana base", rule: "t row" },
  { kana: "ち", answer: "chi", group: "hiragana base", rule: "strict Hepburn uses chi" },
  { kana: "つ", answer: "tsu", group: "hiragana base", rule: "strict Hepburn uses tsu" },
  { kana: "て", answer: "te", group: "hiragana base", rule: "t row" },
  { kana: "と", answer: "to", group: "hiragana base", rule: "t row" },
  { kana: "は", answer: "ha", group: "hiragana base", rule: "h row" },
  { kana: "ひ", answer: "hi", group: "hiragana base", rule: "h row" },
  { kana: "ふ", answer: "fu", group: "hiragana base", rule: "strict Hepburn uses fu" },
  { kana: "へ", answer: "he", group: "hiragana base", rule: "h row" },
  { kana: "ほ", answer: "ho", group: "hiragana base", rule: "h row" },
  { kana: "ア", answer: "a", group: "katakana base", rule: "plain vowel" },
  { kana: "キ", answer: "ki", group: "katakana base", rule: "k row" },
  { kana: "シ", answer: "shi", group: "katakana base", rule: "strict Hepburn uses shi" },
  { kana: "チ", answer: "chi", group: "katakana base", rule: "strict Hepburn uses chi" },
  { kana: "ツ", answer: "tsu", group: "katakana base", rule: "strict Hepburn uses tsu" },
  { kana: "フ", answer: "fu", group: "katakana base", rule: "strict Hepburn uses fu" },
  { kana: "が", answer: "ga", group: "dakuten", rule: "k row plus dakuten becomes g" },
  { kana: "ぎ", answer: "gi", group: "dakuten", rule: "k row plus dakuten becomes g" },
  { kana: "ぐ", answer: "gu", group: "dakuten", rule: "k row plus dakuten becomes g" },
  { kana: "げ", answer: "ge", group: "dakuten", rule: "k row plus dakuten becomes g" },
  { kana: "ご", answer: "go", group: "dakuten", rule: "k row plus dakuten becomes g" },
  { kana: "ざ", answer: "za", group: "dakuten", rule: "s row plus dakuten becomes z" },
  { kana: "じ", answer: "ji", group: "dakuten", rule: "strict Hepburn uses ji" },
  { kana: "ず", answer: "zu", group: "dakuten", rule: "s row plus dakuten becomes z" },
  { kana: "ぜ", answer: "ze", group: "dakuten", rule: "s row plus dakuten becomes z" },
  { kana: "ぞ", answer: "zo", group: "dakuten", rule: "s row plus dakuten becomes z" },
  { kana: "だ", answer: "da", group: "dakuten", rule: "t row plus dakuten becomes d" },
  { kana: "ぢ", answer: "ji", group: "dakuten", rule: "strict Hepburn uses ji" },
  { kana: "づ", answer: "zu", group: "dakuten", rule: "strict Hepburn uses zu" },
  { kana: "で", answer: "de", group: "dakuten", rule: "t row plus dakuten becomes d" },
  { kana: "ど", answer: "do", group: "dakuten", rule: "t row plus dakuten becomes d" },
  { kana: "ば", answer: "ba", group: "dakuten", rule: "h row plus dakuten becomes b" },
  { kana: "び", answer: "bi", group: "dakuten", rule: "h row plus dakuten becomes b" },
  { kana: "ぶ", answer: "bu", group: "dakuten", rule: "h row plus dakuten becomes b" },
  { kana: "べ", answer: "be", group: "dakuten", rule: "h row plus dakuten becomes b" },
  { kana: "ぼ", answer: "bo", group: "dakuten", rule: "h row plus dakuten becomes b" },
  { kana: "ぱ", answer: "pa", group: "handakuten", rule: "h row plus handakuten becomes p" },
  { kana: "ぴ", answer: "pi", group: "handakuten", rule: "h row plus handakuten becomes p" },
  { kana: "ぷ", answer: "pu", group: "handakuten", rule: "h row plus handakuten becomes p" },
  { kana: "ぺ", answer: "pe", group: "handakuten", rule: "h row plus handakuten becomes p" },
  { kana: "ぽ", answer: "po", group: "handakuten", rule: "h row plus handakuten becomes p" },
  { kana: "きゃ", answer: "kya", group: "yoon", rule: "i sound plus small ya" },
  { kana: "きゅ", answer: "kyu", group: "yoon", rule: "i sound plus small yu" },
  { kana: "きょ", answer: "kyo", group: "yoon", rule: "i sound plus small yo" },
  { kana: "しゃ", answer: "sha", group: "yoon", rule: "strict Hepburn uses sh" },
  { kana: "しゅ", answer: "shu", group: "yoon", rule: "strict Hepburn uses sh" },
  { kana: "しょ", answer: "sho", group: "yoon", rule: "strict Hepburn uses sh" },
  { kana: "ちゃ", answer: "cha", group: "yoon", rule: "strict Hepburn uses ch" },
  { kana: "ちゅ", answer: "chu", group: "yoon", rule: "strict Hepburn uses ch" },
  { kana: "ちょ", answer: "cho", group: "yoon", rule: "strict Hepburn uses ch" },
  { kana: "にゃ", answer: "nya", group: "yoon", rule: "i sound plus small ya" },
  { kana: "ひょ", answer: "hyo", group: "yoon", rule: "i sound plus small yo" },
  { kana: "りゅ", answer: "ryu", group: "yoon", rule: "i sound plus small yu" },
  { kana: "ぎゃ", answer: "gya", group: "dakuten yoon", rule: "g plus small ya" },
  { kana: "じゃ", answer: "ja", group: "dakuten yoon", rule: "strict Hepburn uses j" },
  { kana: "じゅ", answer: "ju", group: "dakuten yoon", rule: "strict Hepburn uses j" },
  { kana: "じょ", answer: "jo", group: "dakuten yoon", rule: "strict Hepburn uses j" },
  { kana: "びゃ", answer: "bya", group: "dakuten yoon", rule: "b plus small ya" },
  { kana: "ぴょ", answer: "pyo", group: "handakuten yoon", rule: "p plus small yo" },
  { kana: "キャ", answer: "kya", group: "katakana yoon", rule: "i sound plus small ya" },
  { kana: "シュ", answer: "shu", group: "katakana yoon", rule: "strict Hepburn uses sh" },
  { kana: "ジョ", answer: "jo", group: "katakana yoon", rule: "strict Hepburn uses j" },
  { kana: "ッカ", answer: "kka", group: "small tsu", rule: "small tsu doubles the next consonant" },
  { kana: "っぷ", answer: "ppu", group: "small tsu", rule: "small tsu doubles the next consonant" },
  { kana: "きって", answer: "kitte", group: "small tsu", rule: "small tsu doubles t" },
  { kana: "ざっし", answer: "zasshi", group: "small tsu", rule: "small tsu doubles s before shi" },
  { kana: "しゅっぱつ", answer: "shuppatsu", group: "small tsu", rule: "small tsu doubles p" },
  { kana: "コーヒー", answer: "kohi", group: "long vowel", rule: "long mark extends the vowel; type the plain Hepburn form here" },
  { kana: "ゲーム", answer: "gemu", group: "long vowel", rule: "long mark extends the vowel; type the plain Hepburn form here" },
  { kana: "メール", answer: "meru", group: "long vowel", rule: "long mark extends the vowel; type the plain Hepburn form here" },
  { kana: "ファ", answer: "fa", group: "small vowel kana", rule: "fu plus small a becomes fa" },
  { kana: "フィ", answer: "fi", group: "small vowel kana", rule: "fu plus small i becomes fi" },
  { kana: "フェ", answer: "fe", group: "small vowel kana", rule: "fu plus small e becomes fe" },
  { kana: "フォ", answer: "fo", group: "small vowel kana", rule: "fu plus small o becomes fo" },
  { kana: "ティ", answer: "ti", group: "small vowel kana", rule: "te plus small i becomes ti" },
  { kana: "ディ", answer: "di", group: "small vowel kana", rule: "de plus small i becomes di" },
  { kana: "チェ", answer: "che", group: "small vowel kana", rule: "chi plus small e becomes che" },
  { kana: "シェ", answer: "she", group: "small vowel kana", rule: "shi plus small e becomes she" },
  { kana: "ジェ", answer: "je", group: "small vowel kana", rule: "ji plus small e becomes je" }
];

const GUIDE_SECTIONS = {
  base: [
    {
      title: "Hiragana base",
      cells: "あ:a い:i う:u え:e お:o か:ka き:ki く:ku け:ke こ:ko さ:sa し:shi す:su せ:se そ:so た:ta ち:chi つ:tsu て:te と:to な:na に:ni ぬ:nu ね:ne の:no は:ha ひ:hi ふ:fu へ:he ほ:ho ま:ma み:mi む:mu め:me も:mo ら:ra り:ri る:ru れ:re ろ:ro や:ya ゆ:yu よ:yo わ:wa を:o ん:n"
    },
    {
      title: "Katakana base",
      cells: "ア:a イ:i ウ:u エ:e オ:o カ:ka キ:ki ク:ku ケ:ke コ:ko サ:sa シ:shi ス:su セ:se ソ:so タ:ta チ:chi ツ:tsu テ:te ト:to ナ:na ニ:ni ヌ:nu ネ:ne ノ:no ハ:ha ヒ:hi フ:fu ヘ:he ホ:ho マ:ma ミ:mi ム:mu メ:me モ:mo ラ:ra リ:ri ル:ru レ:re ロ:ro ヤ:ya ユ:yu ヨ:yo ワ:wa ヲ:o ン:n"
    }
  ],
  marks: [
    {
      title: "Dakuten",
      cells: "が:ga ぎ:gi ぐ:gu げ:ge ご:go ざ:za じ:ji ず:zu ぜ:ze ぞ:zo だ:da ぢ:ji づ:zu で:de ど:do ば:ba び:bi ぶ:bu べ:be ぼ:bo"
    },
    {
      title: "Handakuten",
      cells: "ぱ:pa ぴ:pi ぷ:pu ぺ:pe ぽ:po パ:pa ピ:pi プ:pu ペ:pe ポ:po"
    }
  ],
  combo: [
    {
      title: "Yoon",
      cells: "きゃ:kya きゅ:kyu きょ:kyo しゃ:sha しゅ:shu しょ:sho ちゃ:cha ちゅ:chu ちょ:cho にゃ:nya にゅ:nyu にょ:nyo ひゃ:hya ひゅ:hyu ひょ:hyo みゃ:mya みゅ:myu みょ:myo りゃ:rya りゅ:ryu りょ:ryo"
    },
    {
      title: "Marked yoon",
      cells: "ぎゃ:gya ぎゅ:gyu ぎょ:gyo じゃ:ja じゅ:ju じょ:jo びゃ:bya びゅ:byu びょ:byo ぴゃ:pya ぴゅ:pyu ぴょ:pyo"
    }
  ],
  small: [
    {
      title: "Small tsu",
      cells: "っか:kka っさ:ssa った:tta っぱ:ppa ッカ:kka ッパ:ppa",
      note: "Small tsu doubles the next consonant. Strict answers here use that doubled letter."
    },
    {
      title: "Katakana additions",
      cells: "ファ:fa フィ:fi フェ:fe フォ:fo ティ:ti ディ:di チェ:che シェ:she ジェ:je",
      note: "Small vowels make extra sounds that often show up in katakana."
    },
    {
      title: "Long mark",
      cells: "カー:ka キー:ki クー:ku ケー:ke コー:ko",
      note: "The long mark extends the vowel. This game asks for the plain Hepburn form."
    }
  ]
};

const PARTY = [
  { id: "hero", name: "Sword Adept", sprite: 0, power: 7.4, delay: 0.86, color: "#62f0df", cost: 0 },
  { id: "healer", name: "Lantern Sage", sprite: 1, power: 5.5, delay: 1.12, color: "#ffd36a", cost: 160 },
  { id: "archer", name: "Forest Archer", sprite: 2, power: 9.2, delay: 0.72, color: "#8df1a5", cost: 520 },
  { id: "knight", name: "Rune Knight", sprite: 3, power: 14.8, delay: 1.35, color: "#a987ff", cost: 1500 }
];

const ENEMY_TYPES = [
  { id: "slime", name: "Lantern Slime", sprite: 4, hp: 44, gold: 18, color: "#62f0df" },
  { id: "bat", name: "Echo Bat", sprite: 5, hp: 58, gold: 24, color: "#c06dff" },
  { id: "skeleton", name: "Bone Guard", sprite: 6, hp: 92, gold: 36, color: "#ffd36a" },
  { id: "imp", name: "Crystal Imp", sprite: 7, hp: 126, gold: 52, color: "#ff668f" }
];

const BIOMES = [
  { name: "Lantern Halls", floor: 1, tint: "#62f0df", shadow: "#071625", accent: "#ffd36a" },
  { name: "Echo Vault", floor: 21, tint: "#a987ff", shadow: "#120b25", accent: "#c06dff" },
  { name: "Crystal Steps", floor: 41, tint: "#ff668f", shadow: "#210b18", accent: "#62f0df" },
  { name: "Moon Gate", floor: 61, tint: "#ffd36a", shadow: "#201609", accent: "#ffffff" }
];

const SHOP = [
  { id: "party", name: "Recruit Ally", label: "Party", text: "Add the next guild member to the run." },
  { id: "power", name: "Sharpen Blades", label: "Damage", text: "+18% party damage." },
  { id: "speed", name: "Quick Step", label: "Speed", text: "+10% attack rate." },
  { id: "study", name: "Study Charm", label: "Study", text: "Correct kana answers pay more." },
  { id: "loot", name: "Lucky Satchel", label: "Loot", text: "Better item find chance." },
  { id: "depth", name: "Deep Map", label: "Dungeon", text: "Push deeper and raise monster rewards." }
];

const assets = {
  background: loadImage("assets/dungeon-bg.png"),
  sprites: loadImage("assets/sprite-atlas.png")
};

let canvas;
let ctx;
let width = 0;
let height = 0;
let dpr = 1;
let state;
let lastFrame = 0;
let activeTab = "base";
let hitBursts = [];
let floaters = [];
let coins = [];
let runTime = 0;
let autoSaveTimer = 0;

const ui = {};

export function normalizeAnswer(value) {
  return String(value || "").trim().toLowerCase();
}

export function isAnswerCorrect(input, prompt) {
  return normalizeAnswer(input) === normalizeAnswer(prompt.answer);
}

export function hasKanji(value) {
  return /[\u3400-\u9fff]/u.test(value);
}

function boot() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  Object.assign(ui, {
    floorLabel: document.getElementById("floorLabel"),
    gold: document.getElementById("goldReadout"),
    dps: document.getElementById("dpsReadout"),
    party: document.getElementById("partyReadout"),
    enemyKind: document.getElementById("enemyKind"),
    enemyName: document.getElementById("enemyName"),
    enemyHpFill: document.getElementById("enemyHpFill"),
    enemyHpText: document.getElementById("enemyHpText"),
    lootLog: document.getElementById("lootLog"),
    promptGroup: document.getElementById("promptGroup"),
    kanaPrompt: document.getElementById("kanaPrompt"),
    answerForm: document.getElementById("answerForm"),
    answerInput: document.getElementById("answerInput"),
    feedback: document.getElementById("studyFeedback"),
    promptCard: document.querySelector(".prompt-card"),
    shopButton: document.getElementById("shopButton"),
    guideButton: document.getElementById("guideButton"),
    resetButton: document.getElementById("resetButton"),
    shopDrawer: document.getElementById("shopDrawer"),
    guideDrawer: document.getElementById("guideDrawer"),
    closeShop: document.getElementById("closeShopButton"),
    closeGuide: document.getElementById("closeGuideButton"),
    shopGrid: document.getElementById("shopGrid"),
    guideContent: document.getElementById("guideContent"),
    flash: document.getElementById("screenFlash")
  });

  state = loadGame();
  resize();
  bindEvents();
  renderGuide();
  renderShop();
  updateUI();
  lastFrame = performance.now();
  requestAnimationFrame(loop);
}

function bindEvents() {
  window.addEventListener("resize", resize);
  ui.answerForm.addEventListener("submit", handleAnswer);
  ui.shopButton.addEventListener("click", () => openDrawer(ui.shopDrawer));
  ui.guideButton.addEventListener("click", () => openDrawer(ui.guideDrawer));
  ui.closeShop.addEventListener("click", () => closeDrawer(ui.shopDrawer));
  ui.closeGuide.addEventListener("click", () => closeDrawer(ui.guideDrawer));
  ui.shopDrawer.addEventListener("click", closeFromBackdrop);
  ui.guideDrawer.addEventListener("click", closeFromBackdrop);
  ui.resetButton.addEventListener("click", resetGame);
  document.querySelectorAll("[data-guide-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTab = button.dataset.guideTab;
      document.querySelectorAll("[data-guide-tab]").forEach((tab) => {
        tab.classList.toggle("is-active", tab === button);
      });
      renderGuide();
    });
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDrawer(ui.shopDrawer);
      closeDrawer(ui.guideDrawer);
    }
  });
  window.addEventListener("beforeunload", () => saveGame(state));
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
}

function createInitialState(now = Date.now()) {
  const enemy = spawnEnemy(1, 0);
  return {
    version: SAVE_VERSION,
    gold: 90,
    floor: 1,
    kills: 0,
    totalGold: 0,
    totalCorrect: 0,
    totalWrong: 0,
    streak: 0,
    bestStreak: 0,
    promptIndex: 0,
    party: ["hero"],
    upgrades: { power: 0, speed: 0, study: 0, loot: 0, depth: 0 },
    enemy,
    battle: createBattleState(),
    partyGuard: 100,
    lootLog: ["The guild takes formation."],
    boostTurns: 0,
    lastSavedAt: now
  };
}

function loadGame(now = Date.now()) {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return createInitialState(now);
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== SAVE_VERSION) return createInitialState(now);
    const restored = mergeState(createInitialState(now), parsed);
    const elapsed = Math.max(0, now - (restored.lastSavedAt || now));
    return applyOffline(restored, elapsed, now);
  } catch {
    return createInitialState(now);
  }
}

function mergeState(base, parsed) {
  return {
    ...base,
    ...parsed,
    upgrades: { ...base.upgrades, ...(parsed.upgrades || {}) },
    party: Array.isArray(parsed.party) && parsed.party.length ? parsed.party.filter((id) => PARTY.some((p) => p.id === id)) : base.party,
    lootLog: Array.isArray(parsed.lootLog) ? parsed.lootLog.slice(0, 5) : base.lootLog,
    enemy: parsed.enemy && Number.isFinite(parsed.enemy.hp) ? parsed.enemy : base.enemy,
    battle: parsed.battle && parsed.battle.phase ? parsed.battle : base.battle,
    partyGuard: Number.isFinite(parsed.partyGuard) ? parsed.partyGuard : base.partyGuard,
    boostTurns: Number.isFinite(parsed.boostTurns) ? parsed.boostTurns : parsed.boostUntil > Date.now() ? 2 : base.boostTurns
  };
}

function saveGame(nextState) {
  localStorage.setItem(SAVE_KEY, JSON.stringify({ ...nextState, lastSavedAt: Date.now() }));
}

function resetGame() {
  if (!window.confirm("Reset Kana Dungeon progress?")) return;
  localStorage.removeItem(SAVE_KEY);
  state = createInitialState();
  hitBursts = [];
  floaters = [];
  coins = [];
  updateUI();
}

function applyOffline(next, elapsedMs, now) {
  const seconds = Math.min(Math.max(0, elapsedMs / 1000), 60 * 60 * 4);
  if (seconds < 8) return { ...next, lastSavedAt: now };
  const partyPower = Math.max(1, getBattlePower(next));
  let remaining = seconds;
  let kills = 0;
  let gold = 0;
  while (remaining > 0.5 && kills < 1200) {
    const rounds = Math.max(1, Math.ceil(next.enemy.hp / partyPower));
    const needed = rounds * getRoundSeconds(next);
    if (needed > remaining) {
      const partialRounds = Math.floor(remaining / getRoundSeconds(next));
      next.enemy.hp = Math.max(1, next.enemy.hp - partialRounds * partyPower);
      break;
    }
    remaining -= needed;
    const reward = getEnemyReward(next, next.enemy);
    gold += reward;
    next.gold += reward;
    next.totalGold += reward;
    next.kills += 1;
    kills += 1;
    advanceFloor(next);
    next.enemy = spawnEnemy(next.floor, next.upgrades.depth);
    next.battle = createBattleState();
  }
  if (kills > 0) addLog(next, `Offline: ${kills} fights, +${formatNumber(gold)} gold.`);
  return { ...next, lastSavedAt: now };
}

function loop(now) {
  const dt = Math.min(0.05, Math.max(0, (now - lastFrame) / 1000));
  lastFrame = now;
  runTime += dt;
  tick(dt, now);
  draw(now / 1000);
  requestAnimationFrame(loop);
}

function tick(dt, now) {
  autoSaveTimer += dt;
  state.battle.timer -= dt;
  if (state.battle.timer <= 0) {
    performBattleTurn(now);
  }
  maybeBoostRunes(dt);
  updateParticles(dt);
  if (state.enemy.hp <= 0) defeatEnemy(now);
  updateUI();
  if (autoSaveTimer >= 4) {
    autoSaveTimer = 0;
    saveGame(state);
  }
}

function createBattleState() {
  return {
    phase: "party",
    actorIndex: 0,
    timer: 0.75,
    round: 1,
    message: "Party turn"
  };
}

function performBattleTurn(now) {
  if (state.enemy.hp <= 0) return;
  if (state.battle.phase === "party") {
    const memberId = state.party[state.battle.actorIndex] || state.party[0];
    const member = PARTY.find((entry) => entry.id === memberId) || PARTY[0];
    const damage = Math.round(getMemberPower(member, state) * (state.boostTurns > 0 ? 1.45 : 1));
    state.enemy.hp -= damage;
    state.battle.message = `${member.name} hits for ${damage}.`;
    createHitBurst(member, damage);
    if (state.enemy.hp <= 0) return;
    state.battle.actorIndex += 1;
    if (state.battle.actorIndex >= state.party.length) {
      state.battle.phase = "enemy";
      state.battle.actorIndex = 0;
      state.battle.timer = 0.8;
      state.battle.message = `${state.enemy.name} prepares.`;
    } else {
      state.battle.timer = getTurnDelay(state);
    }
    return;
  }

  const damage = Math.round(getEnemyDamage(state.enemy, state.floor));
  state.partyGuard = Math.max(0, state.partyGuard - damage);
  state.battle.message = `${state.enemy.name} strikes for ${damage}.`;
  createEnemyBurst(damage);
  if (state.partyGuard <= 0) {
    const lost = Math.min(state.gold, Math.max(8, Math.round(state.floor * 3)));
    state.gold -= lost;
    state.partyGuard = 100;
    addLog(state, `Party regroups: -${lost} gold.`);
  }
  if (state.boostTurns > 0) state.boostTurns -= 1;
  state.battle.phase = "party";
  state.battle.actorIndex = 0;
  state.battle.round += 1;
  state.battle.timer = getTurnDelay(state);
}

function createHitBurst(member, damage) {
  const target = getEnemyAnchor();
  hitBursts.push({
    x: target.x + Math.random() * 22 - 11,
    y: target.y - 54 - Math.random() * 56,
    color: member.color,
    age: 0,
    life: 0.45,
    kind: Math.random() > 0.5 ? "slash" : "spark"
  });
  floaters.push({
    text: `${damage}`,
    x: target.x,
    y: target.y - 112,
    color: member.color,
    age: 0,
    life: 0.75
  });
}

function createEnemyBurst(damage) {
  const target = getPartyAnchor();
  hitBursts.push({
    x: target.x,
    y: target.y - 66,
    color: state.enemy.color,
    age: 0,
    life: 0.45,
    kind: "spark"
  });
  floaters.push({
    text: `-${damage}`,
    x: target.x,
    y: target.y - 110,
    color: "#ff5368",
    age: 0,
    life: 0.75
  });
}

function createStudyStrike(prompt) {
  const damage = Math.round(getBattlePower(state) * (1.1 + state.upgrades.study * 0.08));
  state.enemy.hp -= damage;
  state.boostTurns += 2;
  state.battle.message = `${prompt.kana} cast hits for ${damage}.`;
  const target = getEnemyAnchor();
  hitBursts.push({
    x: target.x,
    y: target.y - 92,
    color: "#62f0df",
    age: 0,
    life: 0.62,
    kind: "rune"
  });
  floaters.push({
    text: `${damage}`,
    x: target.x + 28,
    y: target.y - 132,
    color: "#62f0df",
    age: 0,
    life: 0.9
  });
  if (state.enemy.hp <= 0) defeatEnemy(performance.now());
}

function maybeBoostRunes(dt) {
  if (state.boostTurns > 0 && Math.random() < dt * 2.5) {
    hitBursts.push({
      x: width * (0.48 + Math.random() * 0.2),
      y: getLaneY() - 96 - Math.random() * 80,
      color: "#62f0df",
      age: 0,
      life: 0.38,
      kind: "rune"
    });
  }
}

function updateParticles(dt) {
  hitBursts.forEach((burst) => { burst.age += dt; });
  hitBursts = hitBursts.filter((burst) => burst.age < burst.life);
  floaters.forEach((floater) => {
    floater.age += dt;
    floater.y -= dt * 36;
  });
  floaters = floaters.filter((floater) => floater.age < floater.life);
  coins.forEach((coin) => {
    coin.age += dt;
    coin.x += coin.vx * dt;
    coin.y += coin.vy * dt;
    coin.vy += 140 * dt;
  });
  coins = coins.filter((coin) => coin.age < coin.life);
}

function defeatEnemy(now) {
  const reward = getEnemyReward(state, state.enemy);
  state.gold += reward;
  state.totalGold += reward;
  state.kills += 1;
  addLog(state, `${state.enemy.boss ? "Boss" : "Fight"} won: +${reward} gold.`);
  burstCoins(reward);
  maybeFindItem();
  advanceFloor(state);
  state.enemy = spawnEnemy(state.floor, state.upgrades.depth);
  state.battle = createBattleState();
  state.partyGuard = Math.min(100, state.partyGuard + 18);
  if (state.enemy.boss || state.floor % 20 === 1) {
    flashScreen();
  }
  saveGame({ ...state, lastSavedAt: now });
}

function maybeFindItem() {
  const chance = 0.08 + state.upgrades.loot * 0.025;
  if (Math.random() > chance) return;
  const items = ["teal shard", "amber charm", "runner boots", "moon ink", "tiny blade"];
  const item = items[Math.floor(Math.random() * items.length)];
  const bonus = 24 + state.floor * 6 + state.upgrades.loot * 14;
  state.gold += bonus;
  state.totalGold += bonus;
  addLog(state, `Found ${item}: +${bonus} gold.`);
}

function advanceFloor(next) {
  next.floor += 1;
  if (next.floor % 20 === 1) {
    addLog(next, `${getBiome(next.floor).name} opens.`);
  } else if (isBossFloor(next.floor)) {
    addLog(next, `Boss waits on floor ${next.floor}.`);
  } else {
    addLog(next, `Floor ${next.floor} begins.`);
  }
}

function spawnEnemy(floor, depthLevel) {
  const boss = isBossFloor(floor);
  const index = boss ? Math.min(ENEMY_TYPES.length - 1, Math.floor(floor / 10) % ENEMY_TYPES.length) : Math.min(ENEMY_TYPES.length - 1, Math.floor((floor - 1) / 4) % ENEMY_TYPES.length);
  const type = ENEMY_TYPES[index];
  const scale = (1 + (floor - 1) * 0.15 + depthLevel * 0.26) * (boss ? 3.15 : 1);
  const maxHp = Math.round(type.hp * scale);
  return {
    ...type,
    id: boss ? `${type.id}-boss` : type.id,
    name: boss ? bossName(type, floor) : type.name,
    boss,
    maxHp,
    hp: maxHp,
    bornAt: performance?.now ? performance.now() : Date.now()
  };
}

function getEnemyReward(next, enemy) {
  const floorBonus = next.floor * 8 + next.upgrades.depth * 16;
  const bossBonus = enemy.boss ? 4.5 : 1;
  return Math.round((enemy.gold + floorBonus) * bossBonus);
}

function getDps(next) {
  return getBattlePower(next);
}

function getBattlePower(next) {
  return next.party.reduce((sum, id) => {
    const member = PARTY.find((entry) => entry.id === id) || PARTY[0];
    return sum + getMemberPower(member, next);
  }, 0) * (next.boostTurns > 0 ? 1.18 : 1);
}

function getMemberPower(member, next) {
  return member.power * (1 + next.upgrades.power * 0.18);
}

function getAttackRate(next) {
  return 1 + next.upgrades.speed * 0.1;
}

function getTurnDelay(next) {
  return Math.max(0.42, 1.08 / getAttackRate(next));
}

function getRoundSeconds(next) {
  return next.party.length * getTurnDelay(next) + 1.05;
}

function getEnemyDamage(enemy, floor) {
  return (enemy.boss ? 18 : 8) + floor * (enemy.boss ? 1.8 : 0.7);
}

function isBossFloor(floor) {
  return floor > 0 && floor % 10 === 0;
}

function bossName(type, floor) {
  const titles = ["Oathbound", "Gloom", "Crystal", "Moonlit"];
  return `${titles[Math.floor(floor / 10) % titles.length]} ${type.name}`;
}

function handleAnswer(event) {
  event.preventDefault();
  const prompt = getCurrentPrompt();
  const correct = isAnswerCorrect(ui.answerInput.value, prompt);
  if (correct) {
    const reward = getStudyReward(state);
    state.gold += reward;
    state.totalGold += reward;
    state.totalCorrect += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    createStudyStrike(prompt);
    addLog(state, `Kana cast: +${reward} gold, ${state.streak} streak.`);
    ui.feedback.textContent = `Correct. ${prompt.kana} = ${prompt.answer}. Bonus strike fired.`;
    markPrompt("is-correct");
    flashScreen();
  } else {
    state.totalWrong += 1;
    state.streak = 0;
    ui.feedback.textContent = `Answer: ${prompt.answer}. Rule: ${prompt.rule}.`;
    markPrompt("is-wrong");
  }
  state.promptIndex = (state.promptIndex + 1 + Math.floor(Math.random() * 5)) % KANA_PROMPTS.length;
  ui.answerInput.value = "";
  updatePrompt();
  renderShop();
  saveGame(state);
}

function markPrompt(className) {
  ui.promptCard.classList.remove("is-correct", "is-wrong");
  ui.promptCard.classList.add(className);
  window.setTimeout(() => ui.promptCard.classList.remove(className), 520);
}

function getStudyReward(next) {
  const streakBonus = Math.min(3, next.streak * 0.08);
  return Math.round((38 + next.floor * 7) * (1 + next.upgrades.study * 0.22 + streakBonus));
}

function getCurrentPrompt() {
  return KANA_PROMPTS[state.promptIndex % KANA_PROMPTS.length];
}

function renderShop() {
  if (!ui.shopGrid) return;
  ui.shopGrid.innerHTML = "";
  SHOP.forEach((item) => {
    const button = document.createElement("button");
    button.className = "shop-card";
    button.type = "button";
    const cost = getShopCost(item.id, state);
    const disabled = !canBuy(item.id, state, cost);
    button.disabled = disabled;
    button.innerHTML = `
      <div>
        <span>${item.label}</span>
        <strong>${getShopName(item.id, item.name)}</strong>
        <p>${getShopText(item.id, item.text)}</p>
      </div>
      <b>${item.id === "party" && state.party.length >= PARTY.length ? "Max" : `${formatNumber(cost)}g`}</b>
    `;
    button.addEventListener("click", () => buyShopItem(item.id));
    ui.shopGrid.appendChild(button);
  });
}

function getShopName(id, fallback) {
  if (id !== "party") return fallback;
  const nextMember = PARTY[state.party.length];
  return nextMember ? `Recruit ${nextMember.name}` : "Full Party";
}

function getShopText(id, fallback) {
  if (id !== "party") return fallback;
  const nextMember = PARTY[state.party.length];
  return nextMember ? `${nextMember.name} joins the crawl.` : "All four guild members are active.";
}

function getShopCost(id, next) {
  if (id === "party") {
    const member = PARTY[next.party.length];
    return member ? member.cost : Infinity;
  }
  const level = next.upgrades[id] || 0;
  const bases = { power: 95, speed: 120, study: 80, loot: 110, depth: 260 };
  const scales = { power: 1.48, speed: 1.55, study: 1.42, loot: 1.5, depth: 1.9 };
  return Math.floor((bases[id] || 100) * Math.pow(scales[id] || 1.5, level));
}

function canBuy(id, next, cost) {
  if (id === "party" && next.party.length >= PARTY.length) return false;
  return next.gold >= cost;
}

function buyShopItem(id) {
  const cost = getShopCost(id, state);
  if (!canBuy(id, state, cost)) return;
  state.gold -= cost;
  if (id === "party") {
    const member = PARTY[state.party.length];
    if (member) {
      state.party.push(member.id);
      addLog(state, `${member.name} joins the party.`);
    }
  } else {
    state.upgrades[id] = (state.upgrades[id] || 0) + 1;
    addLog(state, `${SHOP.find((entry) => entry.id === id)?.name || "Upgrade"} Lv ${state.upgrades[id]}.`);
  }
  renderShop();
  updateUI();
  saveGame(state);
}

function renderGuide() {
  const sections = GUIDE_SECTIONS[activeTab] || GUIDE_SECTIONS.base;
  ui.guideContent.innerHTML = "";
  sections.forEach((section) => {
    const block = document.createElement("section");
    block.className = "guide-block";
    const cells = section.cells.split(" ").map((entry) => {
      const [kana, romaji] = entry.split(":");
      return `<div class="kana-cell"><b>${kana}</b><small>${romaji}</small></div>`;
    }).join("");
    block.innerHTML = `
      <h3>${section.title}</h3>
      <div class="kana-grid">${cells}</div>
      ${section.note ? `<p>${section.note}</p>` : ""}
    `;
    ui.guideContent.appendChild(block);
  });
}

function updateUI() {
  const biome = getBiome(state.floor);
  ui.floorLabel.textContent = `Floor ${state.floor} - ${biome.name}`;
  ui.gold.textContent = formatNumber(state.gold);
  ui.dps.textContent = getDps(state).toFixed(1);
  ui.party.textContent = `${state.party.length}/4`;
  ui.enemyKind.textContent = `${state.enemy.boss ? "Boss" : "Floor"} ${state.floor} - ${state.battle.phase === "party" ? "Party turn" : "Enemy turn"}`;
  ui.enemyName.textContent = state.enemy.name;
  const hpPct = Math.max(0, Math.min(1, state.enemy.hp / state.enemy.maxHp));
  ui.enemyHpFill.style.width = `${hpPct * 100}%`;
  ui.enemyHpText.textContent = `${Math.max(0, Math.ceil(state.enemy.hp))} / ${state.enemy.maxHp}`;
  ui.lootLog.innerHTML = state.lootLog.map((line) => `<p>${line}</p>`).join("");
  updatePrompt();
}

function updatePrompt() {
  const prompt = getCurrentPrompt();
  ui.promptGroup.textContent = prompt.group;
  ui.kanaPrompt.textContent = prompt.kana;
}

function addLog(next, line) {
  next.lootLog = [line, ...(next.lootLog || [])].slice(0, 5);
}

function openDrawer(drawer) {
  closeDrawer(ui.shopDrawer);
  closeDrawer(ui.guideDrawer);
  drawer.hidden = false;
}

function closeDrawer(drawer) {
  drawer.hidden = true;
}

function closeFromBackdrop(event) {
  if (event.target === event.currentTarget) closeDrawer(event.currentTarget);
}

function flashScreen() {
  ui.flash.classList.remove("is-on");
  void ui.flash.offsetWidth;
  ui.flash.classList.add("is-on");
}

function burstCoins(reward) {
  const count = Math.min(12, 4 + Math.floor(reward / 80));
  for (let i = 0; i < count; i += 1) {
    coins.push({
      x: width * 0.7,
      y: getLaneY() - 80,
      vx: -80 + Math.random() * 160,
      vy: -160 - Math.random() * 80,
      age: 0,
      life: 0.9 + Math.random() * 0.3
    });
  }
}

function draw(time) {
  ctx.clearRect(0, 0, width, height);
  drawBackground(time);
  drawGroundGlow();
  drawParty(time);
  drawEnemy(time);
  drawEffects(time);
  drawBiomeVignette();
}

function drawBackground(time) {
  const image = assets.background;
  const biome = getBiome(state.floor);
  if (!image.complete || !image.naturalWidth) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, biome.shadow);
    gradient.addColorStop(1, "#05070c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    return;
  }
  const laneY = getLaneY();
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawW = image.naturalWidth * scale;
  const drawH = image.naturalHeight * scale;
  const baseY = Math.min(0, laneY - drawH * 0.68);
  ctx.drawImage(image, (width - drawW) / 2, baseY, drawW, drawH);
  ctx.fillStyle = "rgba(2, 4, 10, 0.35)";
  ctx.fillRect(0, 0, width, height);
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = biome.shadow;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
  drawSceneSet(time, biome);
}

function drawGroundGlow() {
  const laneY = getLaneY();
  const gradient = ctx.createLinearGradient(0, laneY - 120, 0, height);
  gradient.addColorStop(0, "rgba(5, 7, 12, 0)");
  gradient.addColorStop(1, "rgba(5, 7, 12, 0.72)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, laneY - 120, width, height - laneY + 120);
  ctx.fillStyle = "rgba(98, 240, 223, 0.12)";
  ctx.fillRect(0, laneY + 5, width, 3);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(width * 0.5 - 2, laneY - 168, 4, 174);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(width * 0.28, laneY - 10, Math.max(90, width * 0.17), 22, 0, 0, TAU);
  ctx.ellipse(width * 0.72, laneY - 10, Math.max(74, width * 0.13), 20, 0, 0, TAU);
  ctx.fill();
}

function drawSceneSet(time, biome) {
  const tier = Math.floor((state.floor - 1) / 20);
  const laneY = getLaneY();
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = biome.accent;
  ctx.lineWidth = 2;
  if (tier % 4 === 0) {
    for (let i = 0; i < 5; i += 1) {
      const x = width * (0.12 + i * 0.19);
      drawCrystalCluster(x, laneY - 24, 22 + i * 3, biome.accent);
    }
  } else if (tier % 4 === 1) {
    for (let i = 0; i < 4; i += 1) {
      const x = width * (0.18 + i * 0.22);
      ctx.beginPath();
      ctx.arc(x, laneY - 190 + Math.sin(time + i) * 4, 18 + i * 2, 0, TAU);
      ctx.stroke();
      drawGlow(x, laneY - 190, 80, biome.accent, 0.1);
    }
  } else if (tier % 4 === 2) {
    for (let i = 0; i < 7; i += 1) {
      const x = width * (i / 6);
      ctx.beginPath();
      ctx.moveTo(x, laneY - 6);
      ctx.lineTo(x + 38, laneY - 110 - (i % 3) * 28);
      ctx.lineTo(x + 70, laneY - 6);
      ctx.stroke();
    }
  } else {
    ctx.beginPath();
    ctx.arc(width * 0.5, laneY - 230, 78 + Math.sin(time) * 5, 0, TAU);
    ctx.stroke();
    drawGlow(width * 0.5, laneY - 230, 180, biome.accent, 0.18);
  }
  ctx.restore();
}

function drawCrystalCluster(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size * 0.38, y);
  ctx.lineTo(x, y + size * 0.3);
  ctx.lineTo(x - size * 0.38, y);
  ctx.closePath();
  ctx.fill();
}

function drawParty(time) {
  const laneY = getLaneY();
  state.party.forEach((id, index) => {
    const member = PARTY.find((entry) => entry.id === id) || PARTY[0];
    const x = width * 0.26 + index * Math.min(70, width * 0.07) + Math.sin(time * 4 + index) * 5;
    const y = laneY + Math.sin(time * 8 + index * 1.7) * 3;
    drawSprite(member.sprite, x, y, getSpriteScale(member.sprite, true), false, time);
    if (state.boostTurns > 0) {
      drawGlow(x, y - 58, 68, member.color, 0.22);
    }
  });
}

function drawEnemy(time) {
  const laneY = getLaneY();
  const enemy = state.enemy;
  const wobble = Math.sin(time * 5) * 5;
  const flash = hitBursts.some((burst) => burst.age < 0.16);
  const x = width * 0.72 + Math.sin(time * 2.4) * 7;
  const y = laneY + wobble * 0.25;
  drawGlow(x, y - 64, 102, enemy.color, flash ? 0.34 : 0.18);
  drawSprite(enemy.sprite, x, y, getSpriteScale(enemy.sprite, false), true, time);
  if (flash) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(x, y - 74, 58, 74, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
}

function drawEffects(time) {
  hitBursts.forEach((burst) => {
    const t = burst.age / burst.life;
    ctx.save();
    ctx.globalAlpha = 1 - t;
    ctx.translate(burst.x, burst.y);
    ctx.rotate((t * 1.8 + burst.x * 0.01) % TAU);
    if (burst.kind === "slash") {
      ctx.strokeStyle = burst.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, 18 + t * 50, -0.7, 0.78);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.72)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 12 + t * 42, -0.6, 0.62);
      ctx.stroke();
    } else if (burst.kind === "rune") {
      ctx.strokeStyle = burst.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 18 + t * 24, 0, TAU);
      ctx.stroke();
      for (let i = 0; i < 5; i += 1) {
        const a = time * 3 + i * TAU / 5;
        ctx.fillStyle = burst.color;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * 30, Math.sin(a) * 30, 3, 0, TAU);
        ctx.fill();
      }
    } else {
      drawGlow(0, 0, 60 + t * 40, burst.color, 0.5);
      ctx.fillStyle = burst.color;
      for (let i = 0; i < 8; i += 1) {
        const a = i * TAU / 8;
        ctx.fillRect(Math.cos(a) * (12 + t * 38), Math.sin(a) * (12 + t * 38), 5, 5);
      }
    }
    ctx.restore();
  });
  coins.forEach((coin) => {
    const alpha = 1 - coin.age / coin.life;
    ctx.save();
    ctx.globalAlpha = alpha;
    drawGlow(coin.x, coin.y, 24, "#ffd36a", 0.35);
    ctx.fillStyle = "#ffd36a";
    ctx.beginPath();
    ctx.ellipse(coin.x, coin.y, 6, 8, time * 6, 0, TAU);
    ctx.fill();
    ctx.restore();
  });
  floaters.forEach((floater) => {
    ctx.save();
    ctx.globalAlpha = 1 - floater.age / floater.life;
    ctx.fillStyle = floater.color;
    ctx.font = "900 18px Segoe UI, system-ui";
    ctx.textAlign = "center";
    ctx.fillText(floater.text, floater.x, floater.y);
    ctx.restore();
  });
}

function drawBiomeVignette() {
  const biome = getBiome(state.floor);
  const shade = ctx.createRadialGradient(width * 0.5, height * 0.52, 120, width * 0.5, height * 0.54, Math.max(width, height) * 0.72);
  shade.addColorStop(0, "rgba(0,0,0,0)");
  shade.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);
  ctx.save();
  ctx.globalAlpha = 0.13;
  ctx.fillStyle = biome.tint;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawSprite(index, x, y, scale, flip, time) {
  const image = assets.sprites;
  if (!image.complete || !image.naturalWidth) {
    drawFallbackSprite(index, x, y, scale);
    return;
  }
  const cols = 4;
  const rows = 2;
  const cellW = image.naturalWidth / cols;
  const cellH = image.naturalHeight / rows;
  const col = index % cols;
  const row = Math.floor(index / cols);
  const bob = Math.sin(time * 8 + index) * 2;
  const targetW = cellW * scale;
  const targetH = cellH * scale;
  ctx.save();
  ctx.translate(x, y + bob);
  if (flip) ctx.scale(-1, 1);
  ctx.drawImage(image, col * cellW, row * cellH, cellW, cellH, -targetW / 2, -targetH, targetW, targetH);
  ctx.restore();
}

function drawFallbackSprite(index, x, y, scale) {
  const colors = ["#62f0df", "#ffd36a", "#8df1a5", "#a987ff", "#62f0df", "#c06dff", "#d8d6c7", "#ff668f"];
  ctx.fillStyle = colors[index] || "#ffffff";
  ctx.beginPath();
  ctx.ellipse(x, y - 48 * scale, 22 * scale, 34 * scale, 0, 0, TAU);
  ctx.fill();
}

function drawGlow(x, y, radius, color, alpha) {
  const glow = ctx.createRadialGradient(x, y, 1, x, y, radius);
  glow.addColorStop(0, color);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function getSpriteScale(index, partyMember) {
  const base = Math.min(width / 900, height / 680);
  if (partyMember) return clamp(base * 0.54, 0.25, 0.48);
  return index === 4 ? clamp(base * 0.46, 0.23, 0.45) : clamp(base * 0.55, 0.28, 0.55);
}

function getLaneY() {
  return Math.min(height - 130, Math.max(390, height * 0.74));
}

function getPartyAnchor() {
  return { x: width * 0.3, y: getLaneY() };
}

function getEnemyAnchor() {
  return { x: width * 0.72, y: getLaneY() };
}

function getBiome(floor) {
  let biome = BIOMES[0];
  BIOMES.forEach((entry) => {
    if (floor >= entry.floor) biome = entry;
  });
  return biome;
}

function loadImage(src) {
  if (typeof Image === "undefined") {
    return { complete: false, naturalWidth: 0, naturalHeight: 0, src };
  }
  const image = new Image();
  image.decoding = "async";
  image.src = src;
  return image;
}

function formatNumber(value) {
  return Math.floor(value).toLocaleString();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

if (typeof document !== "undefined") {
  boot();
}

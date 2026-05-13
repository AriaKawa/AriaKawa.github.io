const els = {
  canvas: document.getElementById("waveform"),
  status: document.getElementById("status"),
  weight: document.getElementById("weight"),
  confidenceBar: document.getElementById("confidenceBar"),
  confidenceLabel: document.getElementById("confidenceLabel"),
  scanButton: document.getElementById("scanButton"),
  demoButton: document.getElementById("demoButton"),
  resetButton: document.getElementById("resetButton"),
  pitchMetric: document.getElementById("pitchMetric"),
  depthMetric: document.getElementById("depthMetric"),
  energyMetric: document.getElementById("energyMetric"),
  stabilityMetric: document.getElementById("stabilityMetric"),
  modePill: document.getElementById("modePill"),
  heightInput: document.getElementById("heightInput"),
  heightValue: document.getElementById("heightValue"),
  frameInput: document.getElementById("frameInput"),
  scoreForm: document.getElementById("scoreForm"),
  nameInput: document.getElementById("nameInput"),
  leaderboard: document.getElementById("leaderboard"),
  leaderboardCount: document.getElementById("leaderboardCount"),
  leaderboardNote: document.getElementById("leaderboardNote"),
};

const ctx = els.canvas.getContext("2d");
const scanSeconds = 5;
const leaderboardKey = "voicescale-leaderboard";
let audioContext;
let analyser;
let microphone;
let animationId;
let scanTimer;
let startedAt = 0;
let mode = "idle";
let samples = [];
let demoPhase = 0;
let lastEstimate = null;

function setMode(nextMode) {
  mode = nextMode;
  els.modePill.textContent = nextMode[0].toUpperCase() + nextMode.slice(1);
}

function formatHeight(inches) {
  return `${Math.floor(inches / 12)}'${inches % 12}"`;
}

function updateHeight() {
  els.heightValue.textContent = formatHeight(Number(els.heightInput.value));
}

async function startMicScan() {
  stopScan();
  setMode("listening");
  els.status.textContent = "Ask me to guess your weight, then keep talking";
  els.scanButton.disabled = true;

  try {
    audioContext = new AudioContext();
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: false,
      },
    });
    microphone = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.72;
    microphone.connect(analyser);
    beginCapture();
  } catch (error) {
    if (audioContext && audioContext.state !== "closed") {
      audioContext.close();
    }
    audioContext = null;
    els.status.textContent = "Microphone blocked. Demo voice is ready.";
    els.scanButton.disabled = false;
    setMode("idle");
  }
}

function startDemoScan() {
  stopScan();
  setMode("demo");
  els.status.textContent = "Synthesizing a sample voice scan";
  beginCapture();
}

function beginCapture() {
  samples = [];
  startedAt = performance.now();
  clearInterval(scanTimer);
  scanTimer = setInterval(updateCountdown, 100);
  drawLoop();
}

function updateCountdown() {
  const elapsed = (performance.now() - startedAt) / 1000;
  const left = Math.max(0, scanSeconds - elapsed);
  if (left > 0) {
    els.status.textContent = `${left.toFixed(1)} seconds left. Keep talking naturally.`;
    return;
  }
  finishScan();
}

function finishScan() {
  clearInterval(scanTimer);
  scanTimer = null;
  cancelAnimationFrame(animationId);
  const estimate = estimateWeight(samples);
  lastEstimate = estimate;
  animateWeight(estimate.weight);
  els.confidenceBar.style.width = `${estimate.confidence}%`;
  els.confidenceLabel.textContent = `Confidence: ${estimate.confidence}% novelty estimate`;
  els.status.textContent = estimate.label;
  els.scanButton.disabled = false;
  els.scoreForm.hidden = false;
  els.nameInput.focus();
  els.leaderboardNote.textContent = "Enter a name to add this scan to the leaderboard.";
  setMode("result");
  stopAudioOnly();
}

function stopScan() {
  clearInterval(scanTimer);
  scanTimer = null;
  cancelAnimationFrame(animationId);
  stopAudioOnly();
  samples = [];
}

function stopAudioOnly() {
  if (microphone?.mediaStream) {
    microphone.mediaStream.getTracks().forEach((track) => track.stop());
  }
  if (audioContext && audioContext.state !== "closed") {
    audioContext.close();
  }
  audioContext = null;
  analyser = null;
  microphone = null;
}

function resetApp() {
  stopScan();
  setMode("idle");
  els.status.textContent = "Ready for a 5 second voice scan";
  els.weight.textContent = "---";
  els.confidenceBar.style.width = "0%";
  els.confidenceLabel.textContent = "Confidence: standby";
  els.pitchMetric.textContent = "-- Hz";
  els.depthMetric.textContent = "--";
  els.energyMetric.textContent = "--%";
  els.stabilityMetric.textContent = "--%";
  els.scanButton.disabled = false;
  els.scoreForm.hidden = true;
  els.nameInput.value = "";
  lastEstimate = null;
  updateLeaderboardNote();
  drawIdle();
}

function drawLoop() {
  const data = getFrame();
  const metrics = analyzeFrame(data);
  samples.push(metrics);
  if (samples.length > 260) samples.shift();
  renderMetrics(metrics);
  drawWave(data, metrics);
  animationId = requestAnimationFrame(drawLoop);
}

function getFrame() {
  const data = new Float32Array(2048);
  if (analyser) {
    analyser.getFloatTimeDomainData(data);
    return data;
  }

  demoPhase += 0.045;
  const pitch = 112 + Math.sin(demoPhase * 0.9) * 11;
  const sampleRate = 44100;
  for (let i = 0; i < data.length; i += 1) {
    const t = (i / sampleRate) * pitch * Math.PI * 2;
    const voice = Math.sin(t) * 0.36 + Math.sin(t * 2.1) * 0.12 + Math.sin(t * 3.8) * 0.05;
    const breath = (Math.random() - 0.5) * 0.04;
    data[i] = voice + breath;
  }
  return data;
}

function analyzeFrame(data) {
  let sum = 0;
  let zeroCrossings = 0;
  let previous = data[0];

  for (let i = 0; i < data.length; i += 1) {
    sum += data[i] * data[i];
    if ((data[i] >= 0 && previous < 0) || (data[i] < 0 && previous >= 0)) zeroCrossings += 1;
    previous = data[i];
  }

  const rms = Math.sqrt(sum / data.length);
  const pitch = detectPitch(data, audioContext?.sampleRate || 44100);
  const energy = clamp(Math.round(rms * 240), 0, 100);
  const brightness = clamp(Math.round((zeroCrossings / data.length) * 1000), 0, 100);
  const depth = clamp(Math.round(100 - (pitch - 75) * 0.62 + rms * 80), 0, 100);
  const recent = samples.slice(-35).filter((item) => item.pitch > 0).map((item) => item.pitch);
  const stability = recent.length < 8 ? 0 : clamp(100 - standardDeviation(recent) * 1.8, 0, 100);

  return { pitch, energy, brightness, depth, stability };
}

function detectPitch(buffer, sampleRate) {
  const minPitch = 75;
  const maxPitch = 280;
  const minLag = Math.floor(sampleRate / maxPitch);
  const maxLag = Math.floor(sampleRate / minPitch);
  let bestLag = -1;
  let bestCorrelation = 0;

  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let correlation = 0;
    for (let i = 0; i < buffer.length - lag; i += 1) {
      correlation += buffer[i] * buffer[i + lag];
    }
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestLag = lag;
    }
  }

  return bestLag > 0 ? Math.round(sampleRate / bestLag) : 0;
}

function estimateWeight(readings) {
  const voiced = readings.filter((item) => item.energy > 3 && item.pitch > 0);
  if (voiced.length < 12) {
    return { weight: 160, confidence: 21, label: "Not enough voice detected. Showing a neutral guess." };
  }

  const avgPitch = average(voiced.map((item) => item.pitch));
  const avgDepth = average(voiced.map((item) => item.depth));
  const avgEnergy = average(voiced.map((item) => item.energy));
  const avgStability = average(voiced.map((item) => item.stability));
  const height = Number(els.heightInput.value);
  const frame = Number(els.frameInput.value);
  const heightBase = 106 + (height - 60) * 5.2;
  const pitchOffset = clamp((145 - avgPitch) * 0.42, -34, 34);
  const signalOffset = (avgDepth - 50) * 0.34 + (avgEnergy - 28) * 0.16;
  const weight = Math.round(clamp(heightBase + frame + pitchOffset + signalOffset, 85, 330));
  const confidence = Math.round(clamp(38 + avgStability * 0.32 + Math.min(voiced.length, 80) * 0.22, 22, 88));

  return {
    weight,
    confidence,
    label: "Scan complete. This is a dramatic voice-based guess.",
  };
}

function renderMetrics(metrics) {
  els.pitchMetric.textContent = metrics.pitch ? `${metrics.pitch} Hz` : "-- Hz";
  els.depthMetric.textContent = `${metrics.depth}`;
  els.energyMetric.textContent = `${metrics.energy}%`;
  els.stabilityMetric.textContent = `${Math.round(metrics.stability)}%`;
}

function animateWeight(target) {
  const start = Number(els.weight.textContent) || 90;
  const duration = 820;
  const startTime = performance.now();

  function tick(now) {
    const pct = clamp((now - startTime) / duration, 0, 1);
    const eased = 1 - (1 - pct) ** 3;
    els.weight.textContent = Math.round(start + (target - start) * eased);
    if (pct < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function drawWave(data, metrics) {
  const width = els.canvas.width;
  const height = els.canvas.height;
  ctx.clearRect(0, 0, width, height);
  drawGrid(width, height);

  ctx.lineWidth = 4;
  ctx.strokeStyle = metrics.energy > 8 ? "#1fb6c9" : "#9aa6b2";
  ctx.beginPath();
  data.forEach((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height / 2 + value * height * 0.45;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "rgba(17, 21, 28, 0.85)";
  ctx.font = "900 18px Inter";
  ctx.fillText(`${mode.toUpperCase()} SIGNAL`, 24, 38);
}

function drawGrid(width, height) {
  ctx.fillStyle = "#fbfefe";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(17, 21, 28, 0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 56) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 52) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawIdle() {
  const data = new Float32Array(2048);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.sin(i * 0.035) * 0.05 + Math.sin(i * 0.011) * 0.03;
  }
  drawWave(data, { energy: 0 });
}

function average(values) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function standardDeviation(values) {
  const avg = average(values);
  const variance = average(values.map((value) => (value - avg) ** 2));
  return Math.sqrt(variance);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function loadLeaderboard() {
  try {
    const parsed = JSON.parse(localStorage.getItem(leaderboardKey) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLeaderboard(entries) {
  localStorage.setItem(leaderboardKey, JSON.stringify(entries));
}

function addScore(event) {
  event.preventDefault();
  if (!lastEstimate) return;

  const name = cleanName(els.nameInput.value);
  if (!name) {
    els.leaderboardNote.textContent = "Add a name before submitting the score.";
    els.nameInput.focus();
    return;
  }

  const entries = loadLeaderboard();
  entries.push({
    id: crypto.randomUUID(),
    name,
    weight: lastEstimate.weight,
    confidence: lastEstimate.confidence,
    date: new Date().toISOString(),
  });
  const sorted = sortLeaderboard(entries).slice(0, 25);
  saveLeaderboard(sorted);

  els.nameInput.value = "";
  els.scoreForm.hidden = true;
  lastEstimate = null;
  els.leaderboardNote.textContent = "Score added. Highest estimates stay on top.";
  renderLeaderboard();
}

function cleanName(value) {
  return value.replace(/\s+/g, " ").trim().slice(0, 18);
}

function sortLeaderboard(entries) {
  return [...entries].sort((a, b) => b.weight - a.weight || new Date(b.date) - new Date(a.date));
}

function renderLeaderboard() {
  const entries = sortLeaderboard(loadLeaderboard());
  els.leaderboard.innerHTML = "";
  els.leaderboardCount.textContent = `${entries.length} ${entries.length === 1 ? "score" : "scores"}`;

  if (!entries.length) {
    updateLeaderboardNote();
    return;
  }

  entries.forEach((entry, index) => {
    const item = document.createElement("li");
    const date = new Date(entry.date);
    item.innerHTML = `
      <span class="rank">${index + 1}</span>
      <span class="score-name"></span>
      <span class="score-weight">${entry.weight} lb</span>
      <span class="score-meta">${entry.confidence}% confidence &middot; ${date.toLocaleDateString()}</span>
    `;
    item.querySelector(".score-name").textContent = entry.name;
    els.leaderboard.appendChild(item);
  });
}

function updateLeaderboardNote() {
  if (loadLeaderboard().length) {
    els.leaderboardNote.textContent = "Scores are sorted highest to lowest on this browser.";
  } else {
    els.leaderboardNote.textContent = "Finish a scan to submit a score. This board saves on this browser until a public database is connected.";
  }
}

els.scanButton.addEventListener("click", startMicScan);
els.demoButton.addEventListener("click", startDemoScan);
els.resetButton.addEventListener("click", resetApp);
els.heightInput.addEventListener("input", updateHeight);
els.scoreForm.addEventListener("submit", addScore);

updateHeight();
renderLeaderboard();
drawIdle();

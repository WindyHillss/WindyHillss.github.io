import { beatMap } from './beatMap.js';

const arrowZone = document.getElementById("arrow-zone");
const targetEls = document.querySelectorAll(".target");
const scoreEl = document.getElementById("score");

let score = 0;
let miss = 0;

// Music button
const music = new Audio("music.mp3");

document.getElementById("start-btn").addEventListener("click", () => {
  music.play().then(() => {
    document.getElementById("start-btn").remove();
    update();
	continuousZoom();
  }).catch(err => {
    console.error("Music error:", err);
  });
});

// Update
let beatIndex = 0;
const NOTE_TRAVEL_TIME = 1.0;

function update() {
  const current = music.currentTime;

  while (beatIndex < beatMap.length && beatMap[beatIndex].time - NOTE_TRAVEL_TIME <= current) {
    const noteData = beatMap[beatIndex];
    spawnNote(noteData.lane, noteData.zoom || false);
    beatIndex++;
  }

  requestAnimationFrame(update);
}

// Spawn note
function getTargetPositions() {
  return Array.from(targetEls).map(el => el.offsetLeft);
}

const lastNoteTimes = {};
const MIN_SPAWN_INTERVAL = 0.01; // 0.01'dan küçükse spawn etme

function spawnNote(laneIndex, zoom = false) {
  const currentTime = music.currentTime;
  const lastTime = lastNoteTimes[laneIndex];

  if (lastTime !== undefined && currentTime - lastTime < MIN_SPAWN_INTERVAL) {
    return;
  }

  const note = document.createElement("div");
  note.classList.add("note", ["right", "up", "down", "left"][laneIndex]);
  note.style.left = getTargetPositions()[laneIndex] + "px";

  if (lastTime !== undefined && currentTime - lastTime <= 0.1) {
    note.classList.add("long");
  }

  lastNoteTimes[laneIndex] = currentTime;
  
  if (zoom) note.dataset.zoom = "true";
  
  arrowZone.appendChild(note);

  setTimeout(() => {
    if (arrowZone.contains(note)) {
      note.remove();
      miss += 1;
      scoreEl.textContent = `Score: ${score} Miss: ${miss}`;
      showMissEffect(laneIndex);
    }
  }, NOTE_TRAVEL_TIME * 1000);
}

function showMissEffect(laneIndex) {
  const fx = document.createElement("img");
  fx.src = "images/miss.png";
  fx.style.width = "100px";
  fx.style.height = "auto";
  fx.style.pointerEvents = "none";
  fx.style.transform = "rotate(0deg)";
  fx.style.opacity = "1";
  fx.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";

  const targetLeft = document.querySelector("div.target.left");
  if (!targetLeft) return;

  targetLeft.insertAdjacentElement("afterend", fx);

  requestAnimationFrame(() => {
    fx.style.opacity = "0";
    fx.style.transform = "rotate(5deg) scale(1.2)";
  });
  
  setTimeout(() => fx.remove(), 500);
}

// Keys
const pressedKeys = new Set();

window.addEventListener("keydown", (e) => {
  pressedKeys.add(e.key);
});

window.addEventListener("keyup", (e) => {
  pressedKeys.delete(e.key);
});

function checkHits() {
  const keyMap = {
    ArrowLeft: 0, a: 0,
    ArrowDown: 1, s: 1,
    ArrowUp: 2, w: 2,
    ArrowRight: 3, d: 3
  };

  const activeLanes = [...pressedKeys].filter(key => key in keyMap).map(key => keyMap[key]);

  if (activeLanes.length > 0) {
    const notes = document.querySelectorAll(".note");

    activeLanes.forEach(expectedLane => {
      let hitNote = null;

      notes.forEach(note => {
        const noteLeft = parseInt(note.style.left);
        const targetLeft = getTargetPositions()[expectedLane];
        const horizontalMatch = Math.abs(noteLeft - targetLeft) <= 10;

        if (horizontalMatch) {
          const noteTop = note.getBoundingClientRect().top;
          const targetTop = arrowZone.getBoundingClientRect().top + 40;
          const diff = Math.abs(noteTop - targetTop);
          if (diff <= 30) hitNote = note;
        }
      });

      if (hitNote) {
		const rect = hitNote.getBoundingClientRect();
		createParticles(rect.left + 25, rect.top + 25);

		if (hitNote.dataset.zoom === "true") {
			bomZoom();
			bomDarkness();
		}

		hitNote.remove();
		score += 10;
	  	scoreEl.textContent = `Score: ${score} Miss: ${miss}`;
	  }
    });
  }

  requestAnimationFrame(checkHits);
}

checkHits();

let activeParticles = 0;
const MAX_PARTICLES = 30;

function createParticles(x, y) {
  if (activeParticles >= MAX_PARTICLES) return;

  const count = Math.min(10, MAX_PARTICLES - activeParticles);

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    document.body.appendChild(p);

    activeParticles++;

    const dx = (Math.random() - 0.5) * 4;
    const dy = (Math.random() - 0.5) * 4;

    p.animate([
      { transform: "translate(0, 0)", opacity: 1 },
      { transform: `translate(${dx * 20}px, ${dy * 20}px)`, opacity: 0 }
    ], {
      duration: 500,
      easing: "ease-out"
    });

    setTimeout(() => {
      p.remove();
      activeParticles--;
    }, 500);
  }
}

// Character
const character = document.getElementById("character");

const keyToGif = {
  ArrowLeft: "left.gif",
  a: "left.gif",

  ArrowDown: "down.gif",
  s: "down.gif",

  ArrowUp: "up.gif",
  w: "up.gif",

  ArrowRight: "right.gif",
  d: "right.gif"
};

let idleTimeout;

window.addEventListener("keydown", (e) => {
  if (e.key in keyToGif) {
    character.style.backgroundImage = `url('images/character/${keyToGif[e.key]}')`;

    clearTimeout(idleTimeout);

    idleTimeout = setTimeout(() => {
      character.style.backgroundImage = "url('images/character/idle.gif')";
    }, 1000);
  }
});

// Zoom
const camera = document.getElementById("camera");

const cont = {
  zoomMin: 1.01,
  zoomMax: 1.04,
  duration: 700,
};

function continuousZoom() {
  const zoomFactor = cont.zoomMin + Math.random() * (cont.zoomMax - cont.zoomMin);

  camera.style.transition = `transform ${cont.duration}ms ease`;
  camera.style.transform = `scale(${zoomFactor})`;

  setTimeout(continuousZoom, cont.duration);
}

function bomZoom() {
  camera.style.transform = "scale(1.5)";

  setTimeout(() => {
    camera.style.transform = "scale(1)";
  }, 100);
}

// Dark bom
function boostDarkness(power = 1) {
  const overlay = document.getElementById('darkness');
  const base = 0.3;
  const max = 0.9;
  const newOpacity = Math.min(base + 0.1 * power, max);
  
  overlay.style.opacity = newOpacity;
}

function bomDarkness() {
  boostDarkness(60);
  setTimeout(() => {
    boostDarkness(1);
  }, 200);
}

// Music bar
const musicBar = document.getElementById("music-bar");

let shakeTriggered = false;
let voidWormShown = false;
let monsterSoundPlayed = false;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let monsterSource = null;

function playMonsterSound(pitch) {
  fetch("sounds/void_worm_idle_0.ogg")
    .then(response => response.arrayBuffer())
    .then(buffer => audioCtx.decodeAudioData(buffer))
    .then(decoded => {
      monsterSource = audioCtx.createBufferSource();
      monsterSource.buffer = decoded;
      monsterSource.playbackRate.value = pitch;
      monsterSource.connect(audioCtx.destination);
      monsterSource.start(0);
    });
}

music.ontimeupdate = () => {
  const current = music.currentTime;
  
  // Bar
  if (music.duration > 0) {
    const progressPercent = (music.currentTime / music.duration) * 100;
    musicBar.style.width = progressPercent + "%";
  }
  
  // Void worm // 0.5 > 3.0 > 3.2
  if (!shakeTriggered && current >= 73.5) {
    shakeTriggered = true;
    smoothShake(8000, 150);
	console.log('SHAKE')
  }
  
  if (!voidWormShown && current >= 76.0) {
    voidWormShown = true;
    const worm = document.getElementById("void-worm");
    worm.style.opacity = "1";
    console.log("Void Worm appeared!");
  }
  
  if (!monsterSoundPlayed && current >= 76.2) {
    monsterSoundPlayed = true;
    playMonsterSound(0.60);
  }
};

function smoothShake(duration, maxAmplitude) {
  const start = performance.now();
  const camera = document.getElementById("camera");

  function animate(time) {
    const elapsed = time - start;
    if (elapsed > duration) {
      camera.style.transform = ""; // sıfırla
      return;
    }

    const progress = elapsed / duration;
    const amplitude = Math.sin(progress * Math.PI) * maxAmplitude;

    const x = (Math.random() * 2 - 1) * amplitude;
    const y = (Math.random() * 2 - 1) * amplitude;

    camera.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// FPS
let fpsCounter = document.getElementById("fpsCounter");
let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;

function updateFPS() {
  const now = performance.now();
  frameCount++;

  if (now - lastFrameTime >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastFrameTime = now;
    fpsCounter.textContent = `FPS: ${fps}`;
  }

  requestAnimationFrame(updateFPS);
}

requestAnimationFrame(updateFPS);

/*
// SAVER
window.addEventListener("keydown", (e) => {
  const lanes = {
    ArrowUp: 0,
    ArrowDown: 1,
    ArrowLeft: 2,
    ArrowRight: 3,
  };

  if (lanes[e.key] !== undefined && !music.paused) {
    const currentTime = music.currentTime.toFixed(2);
    console.log(`{ time: ${currentTime}, lane: ${lanes[e.key]} },`);
  }
});
*/
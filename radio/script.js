const style = document.createElement("style");

style.textContent = `
body {
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  background-image:
    linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0)),
    url('wp.png');
  background-size: cover;
  background-position: center;
  color: #fff;
  font-family: Arial, sans-serif;
}

.radio-box {
  width: 500px;
  background: #171819;
  border-radius: 10px;
  z-index: 2;
  overflow: hidden;
}

.title-bar {
  background-color: #222526;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  height: 32px;
}

.site-license {
  position: fixed;
  bottom: 10px;
  left: 15px;
  font-size: 12px;
  color: #888;
  font-family: 'Poppins', sans-serif;
  opacity: 0.6;
  z-index: 1;
  user-select: none;
}

.site-wp-megalithiccat {
  position: fixed;
  bottom: 10px;
  right: 15px;
  font-size: 12px;
  color: #888;
  font-family: 'Poppins', sans-serif;
  opacity: 0.6;
  z-index: 1;
  user-select: none;
}
  
.site-wp-megalithiccat a {
  color: #888;
  text-decoration: none;
  transition: 0.2s;
}

.site-wp-megalithiccat a:hover {
  color: #fff;
}

.window-buttons {
  display: flex;
  gap: 6px;
}

.window-btn {
  width: 14px;
  height: 14px;
  display: inline-block;
  border-radius: 2px;
  background-color: #404548;
}

.window-btn:hover {
  background-color: #5b6367;
  cursor: default;
}

a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  color: #888;
}

.radio-content {
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 20px;
}

.radio-content img {
  max-width: 120px;
  max-height: 120px;
}

.radio-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-info p {
  margin: 0;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 200px;
  height: 6px;
  background: #fff;
  border-radius: 3px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 15px;
  width: 15px;
  border-radius: 10%;
  background: #404548;
  cursor: pointer;
  margin-top: -4px;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 6px;
  background: #222526;
}
`;
document.head.appendChild(style);

// site-license
const license = document.createElement("div");
license.className = "site-license";
license.innerHTML = "&copy; 2025 WindyHills.";
document.body.appendChild(license);

// WP by megalithiccat
const megalithiccat = document.createElement("div");
megalithiccat.className = "site-wp-megalithiccat";
megalithiccat.innerHTML = `
  <a href="https://www.artstation.com/megalithiccat" target="_blank" rel="noopener noreferrer">
    WP by megalithiccat
  </a>`;
document.body.appendChild(megalithiccat);

// radio-box container
const radioBox = document.createElement('div');
radioBox.className = 'radio-box';

// title-bar
const titleBar = document.createElement('div');
titleBar.className = 'title-bar';

const titleSpan = document.createElement('span');
titleSpan.textContent = ' ';

const windowButtons = document.createElement('div');
windowButtons.className = 'window-buttons';

for(let i=0; i<3; i++) {
  const btn = document.createElement('span');
  btn.className = 'window-btn';
  windowButtons.appendChild(btn);
}

titleBar.appendChild(titleSpan);
titleBar.appendChild(windowButtons);

// Leaf system
const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.left = 0;
canvas.style.top = 0;
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '0';
canvas.style.pointerEvents = 'none';

const ctx = canvas.getContext('2d');

let width, height;

// Resize
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

resize();
window.addEventListener('resize', resize);

const leafImage = new Image();
leafImage.src = 'leaf.png';

const leaves = [];
const totalLeaves = 20;

const centerX = width / 2;
const gap = 300; // Empty area

function getRandomX() {
  let x = Math.random() * (width - gap * 2);
  if (x >= centerX - gap) {
    x += gap * 2;
  }
  return x;
}

for (let i = 0; i < totalLeaves; i++) {
  leaves.push({
    x: getRandomX(),
    y: height / 2 + Math.random() * 60 - 30,
    size: 20 + Math.random() * 20,
    speedY: 0.2 + Math.random() * 0.5,  // Slowness Y
	speedX: (Math.random() * 0.3 - 0.15), // Slowness X
    angle: Math.random() * 2 * Math.PI,
    rotationSpeed: 0.01 + Math.random() * 0.02
  });
}

const getAlphaFromY = (y) => {
  const ratio = y / height;
  return Math.min(0.8 * ratio, 0.8); // Max alpha
};

function animateLeaves() {
  ctx.clearRect(0, 0, width, height);

  for (let leaf of leaves) {
    leaf.y += leaf.speedY;
    leaf.x += leaf.speedX;
    leaf.angle += leaf.rotationSpeed;
    
    if (leaf.y > height + 50 || leaf.x < -50 || leaf.x > width + 50) {
      leaf.y = height / 2 + Math.random() * 60 - 30;
      leaf.x = getRandomX();
	}

    ctx.save();
	ctx.translate(leaf.x, leaf.y);
	ctx.rotate(leaf.angle);

	const alpha = 1 - getAlphaFromY(leaf.y);
	ctx.globalAlpha = alpha;

	ctx.drawImage(leafImage, -leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size);
	ctx.globalAlpha = 1; // Reset
	ctx.restore();
  }

  requestAnimationFrame(animateLeaves);
}

leafImage.onload = animateLeaves;

// radio-content
const radioContent = document.createElement('div');
radioContent.className = 'radio-content';

const radioImg = document.createElement('img');
radioImg.src = 'radio.png';
radioImg.alt = 'Radio';

const radioInfo = document.createElement('div');
radioInfo.className = 'radio-info';

const stationP = document.createElement('p');
stationP.innerHTML = `Currently playing station: <strong><a href="https://ec3.yesstreaming.net:3755/stream" target="_blank" rel="noopener noreferrer">Yesstreaming</a></strong>`;

const timerP = document.createElement('p');
timerP.id = 'timer';
timerP.textContent = 'CLICK';

const volumeInput = document.createElement('input');
volumeInput.type = 'range';
volumeInput.id = 'volume';
volumeInput.min = '0';
volumeInput.max = '1';
volumeInput.step = '0.01';
volumeInput.value = '1';

const audio = document.createElement('audio');
audio.id = 'radio-player';

const source = document.createElement('source');
source.src = 'https://ec3.yesstreaming.net:3755/stream';
source.type = 'audio/mpeg';

audio.appendChild(source);

console.log(source)

radioInfo.appendChild(stationP);
radioInfo.appendChild(timerP);
radioInfo.appendChild(volumeInput);
radioInfo.appendChild(audio);

radioContent.appendChild(radioImg);
radioContent.appendChild(radioInfo);

radioBox.appendChild(titleBar);
radioBox.appendChild(radioContent);

// append everything to body
document.body.appendChild(radioBox);

// --- Script logic ---
let seconds = 0;
let timerStarted = false;
let intervalId;

document.body.addEventListener('click', () => {
  if (!timerStarted) {
    audio.play();
    intervalId = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60);
      timerP.textContent = `Now playing  •  Duration: ${mins}m`;
    }, 1000);
    timerStarted = true;
  }
});

volumeInput.addEventListener('input', () => {
  audio.volume = volumeInput.value;
});

// Sürükleme Sistemi
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Başlangıçta ortala ve position: fixed yap
radioBox.style.position = 'fixed';
radioBox.style.left = `${(window.innerWidth - radioBox.offsetWidth) / 2}px`;
radioBox.style.top = `${(window.innerHeight - radioBox.offsetHeight) / 2}px`;
radioBox.style.margin = '0';

titleBar.addEventListener('mousedown', function(e) {
  isDragging = true;
  dragOffsetX = e.clientX - radioBox.offsetLeft;
  dragOffsetY = e.clientY - radioBox.offsetTop;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', function(e) {
  if (isDragging) {
    let newX = e.clientX - dragOffsetX;
    let newY = e.clientY - dragOffsetY;

    // Kartı ekran dışına çıkmasın diye sınırla
    newX = Math.max(0, Math.min(newX, window.innerWidth - radioBox.offsetWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - radioBox.offsetHeight));

    radioBox.style.left = `${newX}px`;
    radioBox.style.top = `${newY}px`;
  }
});

document.addEventListener('mouseup', function() {
  if (isDragging) {
    isDragging = false;
    document.body.style.userSelect = '';
  }
});

const style = document.createElement("style");

style.textContent = `
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
	background-color: black;
    background-image:
      linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0)),
      url('wp.png');
    background-size: cover;
    background-position: center;
    font-family: Arial, sans-serif;
  }

  .profile-card {
    background-color: #171819;
    padding: 0;
    border-radius: 8px;
    overflow: hidden;
    width: 320px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
    color: #fff;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeUp 1s ease forwards;
    z-index: 10;
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

  .profile-content {
    padding: 20px 30px;
    text-align: center;
  }

  .profile-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto 0px auto; 
  }

  .profile-img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
    z-index: 2;
  }

  .profile-decoration-img {
    position: absolute;
    top: -9px;
    left: -9px;
    width: 118px;
    height: 118px;
    object-fit: cover;
    z-index: 3;
  }

  .role {
    font-weight: bold;
    color: #bbbbbb;
    margin-top: -10px;
  }
  
  .secondary-text {
	font-weight: bold;
    font-size: 12px;
    color: #999;
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
  
  .social-links {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  
  .social-links a img {
    width: 36px;
    height: 36px;
    filter: grayscale(20%);
    transition: filter 0.3s ease;
    cursor: pointer;
  }

  .social-links a:hover img {
    filter: none;
  }
  
  .radio-link {
    color: #e7e7e7;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s, text-decoration 0.3s;
  }

  .radio-link:hover {
    color: #a5a5a6;
    text-decoration: underline;
  }

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Campfire
const campFireImage = document.createElement("img");
campFireImage.id = "background-image";
campFireImage.src = "wp_campfire.png";
campFireImage.alt = "Background";
campFireImage.style.position = "fixed";
campFireImage.style.top = "0";
campFireImage.style.left = "0";
campFireImage.style.width = "100%";
campFireImage.style.height = "100%";
campFireImage.style.objectFit = "cover";
campFireImage.style.zIndex = "9998";
campFireImage.style.pointerEvents = "none";
campFireImage.style.transition = "opacity 1s ease";
campFireImage.style.opacity = "1";
document.body.appendChild(campFireImage);

const gradientOverlay = document.createElement("div");
gradientOverlay.id = "gradient-overlay";
gradientOverlay.style.position = "fixed";
gradientOverlay.style.top = "0";
gradientOverlay.style.left = "0";
gradientOverlay.style.width = "100%";
gradientOverlay.style.height = "100%";
gradientOverlay.style.background = "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))";
gradientOverlay.style.zIndex = "9999";
gradientOverlay.style.pointerEvents = "none";
gradientOverlay.style.transition = "opacity 1s ease";
gradientOverlay.style.opacity = "1";
document.body.appendChild(gradientOverlay);

setTimeout(() => {
  campFireImage.style.opacity = '0';
  gradientOverlay.style.opacity = '0';
}, 100);

// Block
document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('dragstart', e => {
  if (e.target.nodeName === 'IMG') e.preventDefault();
});

document.querySelectorAll('img').forEach(img => {
  img.setAttribute('oncontextmenu', 'return false');
});

// License
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

// Card
const card = document.createElement("div");
card.className = "profile-card";

card.innerHTML = `
  <div class="title-bar">
    <span></span>
    <div class="window-buttons">
      <span class="window-btn"></span>
      <span class="window-btn"></span>
      <span class="window-btn"></span>
    </div>
  </div>
  
  <div class="profile-content">
    <div class="profile-wrapper">
      <img id="avatar" src="invisible.png" class="profile-img">
      <img id="avatar-decoration" src="invisible.png" class="profile-decoration-img">
    </div>
  
    <h2 id="nameText">Loading...</h2>
    <p class="role" id="statusText" style="margin-bottom: 15px;">Loading...</p>
	
    <p class="role secondary-text">Uhm hello, I couldn't find anything to write here.</p>
	<p></p>
	<p class="role secondary-text">
	  And if you want to listen to something good, here is 
	  <a href="https://windyhillss.github.io/radio" class="radio-link">Radio</a>
	</p>
	
  </div>
`;

card.querySelector('.profile-content').innerHTML += `
  <div class="social-links">
    <a href="https://pinterest.com/windhillss" rel="noopener noreferrer">
      <img src="pinterest.png"/>
    </a>
    <a href="https://discord.com/users/607103362558722060" rel="noopener noreferrer">
      <img src="discord.png"/>
    </a>
    <a href="https://open.spotify.com/user/998e57udafdypo007aiz71q37?si=56f7448ea93047c5" rel="noopener noreferrer">
      <img src="spotify.png"/>
    </a>
  </div>
`;

document.body.appendChild(card);

// Canvas
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

// Campfire sound
const campfireAudio = new Audio("campfire.mp3");
campfireAudio.loop = true;
campfireAudio.volume = 1;

let campfireStarted = false;

function startCampfireAudio() {
  if (!campfireStarted) {
    campfireAudio.play().catch(e => console.log("Autoplay error"));
    campfireStarted = true;
  }
}

window.addEventListener("click", startCampfireAudio, { once: true });
window.addEventListener("keydown", startCampfireAudio, { once: true });

// Leaf system
const leafImage = new Image();
leafImage.src = 'leaf.png';

const leaves = [];
const totalLeaves = 20;

const centerX = width / 2;
const gap = 200; // Empty area

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

// Discord system
async function loadStatus() {
  try {
    const res = await fetch("https://api.lanyard.rest/v1/users/607103362558722060");
    const json = await res.json();
    const data = json.data;

    // status
    const statusEl = document.getElementById("statusText");
    statusEl.textContent = data.discord_status;

    // name
    const nameEl = document.getElementById("nameText");
	const rawName = data.discord_user.display_name || data.discord_user.global_name;
	nameEl.textContent = rawName.startsWith("!") ? rawName.slice(1) : rawName;

    // avatar
    const avatarEl = document.getElementById("avatar");
    const avatarHash = data.discord_user.avatar;
    avatarEl.src = `https://cdn.discordapp.com/avatars/607103362558722060/${avatarHash}.png`;

  } catch (err) {
    console.error("Data error:", err);
  }
}

const avatarDecoration = document.getElementById("avatar-decoration");
avatarDecoration.src = `profile_decoration.gif`;

loadStatus();
setInterval(loadStatus, 5000);

// Sürükleme Sistemi
const profileCard = document.querySelector('.profile-card');
const titleBar = profileCard.querySelector('.title-bar');

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Başlangıçta ortala ve position: fixed yap
profileCard.style.position = 'fixed';
profileCard.style.left = `${(window.innerWidth - profileCard.offsetWidth) / 2}px`;
profileCard.style.top = `${(window.innerHeight - profileCard.offsetHeight) / 2}px`;
profileCard.style.margin = '0';

titleBar.addEventListener('mousedown', function(e) {
  isDragging = true;
  dragOffsetX = e.clientX - profileCard.offsetLeft;
  dragOffsetY = e.clientY - profileCard.offsetTop;
  document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', function(e) {
  if (isDragging) {
    let newX = e.clientX - dragOffsetX;
    let newY = e.clientY - dragOffsetY;

    // Kartı ekran dışına çıkmasın diye sınırla
    newX = Math.max(0, Math.min(newX, window.innerWidth - profileCard.offsetWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - profileCard.offsetHeight));

    profileCard.style.left = `${newX}px`;
    profileCard.style.top = `${newY}px`;
  }
});

document.addEventListener('mouseup', function() {
  if (isDragging) {
    isDragging = false;
    document.body.style.userSelect = '';
  }
});

/// ----------------------------------------------------------

let easterSeq = "";
const triggerWord = "gwen";

window.addEventListener('keydown', function(e) {
  easterSeq += e.key.toLowerCase();
  if (easterSeq.length > triggerWord.length) {
    easterSeq = easterSeq.slice(-triggerWord.length);
  }
  if (easterSeq === triggerWord) {
    triggerGwenEasterEgg();
    easterSeq = "";
  }
});

function triggerGwenEasterEgg() {
  if (typeof animateLeaves === 'function' && animateLeaves.frameId) {
    cancelAnimationFrame(animateLeaves.frameId);
  }

  const canvases = document.querySelectorAll('canvas');
  canvases.forEach(canvas => canvas.remove());
  
  if (window.leaves) leaves.length = 0;

  if (window.campfireAudio && typeof window.campfireAudio.pause === 'function') {
    window.campfireAudio.pause();
    window.campfireAudio.currentTime = 0;
    window.campfireAudio.volume = 0;
  }

  console.log("Easteregg burned!");

  if (!document.getElementById('bg-video-gwen')) {
    const bgVideo = document.createElement("video");
    bgVideo.id = "bg-video-gwen";
    bgVideo.src = "wp.mp4";
    bgVideo.autoplay = true;
    bgVideo.loop = true;
    bgVideo.muted = false;
    bgVideo.playsInline = true;
    bgVideo.style.position = "fixed";
    bgVideo.style.left = "0";
    bgVideo.style.top = "0";
    bgVideo.style.width = "100%";
    bgVideo.style.height = "100%";
    bgVideo.style.objectFit = "cover";
    bgVideo.style.zIndex = "-2";
    bgVideo.style.pointerEvents = "none";
    bgVideo.style.margin = "0";
    bgVideo.style.padding = "0";
    bgVideo.style.border = "none";
    document.body.appendChild(bgVideo);
    bgVideo.volume = 1;
    bgVideo.play().catch(()=>{});
  }
}
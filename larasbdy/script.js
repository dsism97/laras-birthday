// ---------- helpers ----------
function show(el){ el.classList.remove('hidden'); }
function hide(el){ el.classList.add('hidden'); }

// ---------- scenes ----------
const sceneStart = document.getElementById('scene-start');
const sceneHouse1 = document.getElementById('scene-house1');
const sceneHouse2 = document.getElementById('scene-house2');
const sceneFinal = document.getElementById('scene-final');
const letterOverlay = document.getElementById('letter-overlay');

const btnStart = document.getElementById('btn-start');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const yesNoRow = document.getElementById('yesno-row');
const btnNext1 = document.getElementById('btn-next-1');
const btnNext2 = document.getElementById('btn-next-2');
const btnCloseLetter = document.getElementById('btn-close-letter');

const bubble1Text = document.getElementById('bubble-1-text');


// ---------- start -> house 1 ----------
btnStart.addEventListener('click', () => {
  hide(sceneStart);
  show(sceneHouse1);
});

// ---------- playful dodging "no" button ----------
function dodgeNo(){
  const rowRect = yesNoRow.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();
  const maxX = Math.max(0, rowRect.width - btnRect.width - 90); // leave room for yes button
  const maxY = 40;
  const randX = (Math.random() * maxX) * (Math.random() > 0.5 ? 1 : -1) * 0.4 + 60;
  const randY = (Math.random() * maxY) - (maxY / 2);
  btnNo.style.transform = `translate(${randX}px, ${randY}px)`;
}
btnNo.addEventListener('mouseenter', dodgeNo);
btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); dodgeNo(); }, { passive:false });

// ---------- yes clicked ----------
let answered = false;
btnYes.addEventListener('click', () => {
  if (answered) return;
  answered = true;
  bubble1Text.textContent = "i heard it's your birthday today!! happy birthday!! 🎉";
  hide(yesNoRow);
  show(btnNext1);
});

// ---------- house1 -> house2 ----------
btnNext1.addEventListener('click', () => {
  hide(sceneHouse1);
  show(sceneHouse2);
});

// ---------- house2 -> letter ----------
btnNext2.addEventListener('click', () => {
  show(letterOverlay);
});

// ---------- close letter -> final scene ----------
btnCloseLetter.addEventListener('click', () => {
  hide(letterOverlay);
  hide(sceneHouse2);
  show(sceneFinal);
  startConfetti();
});

// ---------- confetti ----------
const confettiLayer = document.getElementById('confetti-layer');
const confettiColors = ['#FF8FBF', '#C9B6E4', '#BFF0DB', '#FFD2E6', '#FFC857', '#FFFFFF'];
let confettiInterval = null;

function spawnConfettiPiece(){
  const piece = document.createElement('div');
  piece.className = 'confetti-piece';

  const size = 6 + Math.random() * 8;
  const isCircle = Math.random() > 0.5;
  piece.style.width = size + 'px';
  piece.style.height = (isCircle ? size : size * 1.6) + 'px';
  piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
  if (isCircle) piece.style.borderRadius = '50%';

  const startX = Math.random() * 100;
  piece.style.left = startX + 'vw';

  const duration = 3.2 + Math.random() * 2.8;
  const delay = Math.random() * 0.4;
  piece.style.animationDuration = duration + 's';
  piece.style.animationDelay = delay + 's';

  confettiLayer.appendChild(piece);

  setTimeout(() => {
    piece.remove();
  }, (duration + delay) * 1000 + 200);
}

function startConfetti(){
  if (confettiInterval) return;
  // initial burst
  for (let i = 0; i < 30; i++){
    setTimeout(spawnConfettiPiece, i * 40);
  }
  confettiInterval = setInterval(spawnConfettiPiece, 180);
}

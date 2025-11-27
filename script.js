// DEFAULT name (so it works without URL)
let name = "Samia Rahman";

// If a URL has ?name=XYZ it will override the default:
const params = new URLSearchParams(window.location.search);
if (params.get('name')) name = params.get('name');

// Put the birthday heading
const nameElem = document.getElementById('birthdayName');
if (nameElem) nameElem.textContent = `Happy Birthday ${name}!`;

// Typewriter function (used on message page)
function runTypewriter(message, targetId, delay = 50, startDelay = 800) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.textContent = "";
  let i = 0;
  setTimeout(function step() {
    if (i < message.length) {
      target.textContent += message.charAt(i);
      i++;
      setTimeout(step, delay);
    }
  }, startDelay);
}

// Confetti on load using canvas-confetti library (if available)
function burstConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 220,
      spread: 140,
      origin: { y: 0.6 }
    });
  } else {
    // fallback: create small div confetti for older browsers (not perfect)
    for (let i=0;i<60;i++){
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.left = Math.random()*100 + 'vw';
      c.style.background = `hsl(${Math.floor(Math.random()*360)} 90% 60%)`;
      c.style.animation = `fall ${2 + Math.random()*3}s linear forwards`;
      document.body.appendChild(c);
      setTimeout(()=>c.remove(),5000);
    }
  }
}

// Reveal surprise box
function revealSurprise() {
  const box = document.getElementById('surpriseBox');
  if (!box) return;
  box.style.opacity = '1';
  box.style.transform = 'scale(1)';
  burstConfetti();
}

// Called when message page loads
function startMessage() {
  // Nice longer message for typewriter
  const message = `Dear ${name},\nWishing you a magical birthday filled with joy, laughter, and beautiful moments! 🎉`;
  runTypewriter(message, 'typewriter', 40, 600);
  burstConfetti();
}

// If we are on the message page, start everything
if (document.body.classList.contains('message-page')) {
  // set heading (already done above but ensures it's present)
  if (nameElem) nameElem.textContent = `Happy Birthday ${name}!`;

  // run start after DOM is ready
  window.addEventListener('DOMContentLoaded', startMessage);

  // surprise button
  const btn = document.getElementById('surpriseBtn');
  if (btn) {
    btn.addEventListener('click', revealSurprise);
  }
}

const typingTarget = document.getElementById("typing");
const phrases = [
  "AI & Machine Learning Engineer",
  "Data Scientist",
  "Full-Stack AI Developer"
];

let p = 0;
let c = 0;
let deleting = false;

function typeLoop() {
  if (!typingTarget) return;
  const phrase = phrases[p];
  typingTarget.textContent = phrase.slice(0, c);

  if (!deleting) {
    c++;
    if (c > phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1100);
      return;
    }
  } else {
    c--;
    if (c < 0) {
      deleting = false;
      p = (p + 1) % phrases.length;
      c = 0;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 75);
}

typeLoop();

document.getElementById("year").textContent = new Date().getFullYear();

const links = [...document.querySelectorAll(".dock-item")];
const sections = links
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.remove("active"));
      const active = links.find((l) => l.getAttribute("href") === `#${entry.target.id}`);
      active?.classList.add("active");
    });
  },
  { threshold: 0.5 }
);

sections.forEach((s) => observer.observe(s));

const canvas = document.getElementById("network-canvas");
const ctx = canvas.getContext("2d");
let points = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  points = Array.from({ length: Math.min(80, Math.floor(canvas.width / 20)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  }));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const pt of points) {
    pt.x += pt.vx;
    pt.y += pt.vy;
    if (pt.x < 0 || pt.x > canvas.width) pt.vx *= -1;
    if (pt.y < 0 || pt.y > canvas.height) pt.vy *= -1;

    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 242, 254, 0.7)";
    ctx.fill();
  }

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i];
      const b = points[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        ctx.strokeStyle = `rgba(79, 172, 254, ${1 - d / 120})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
draw();

document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open");
  });
}

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");
let particles = [];

function initParticles() {
  const count = Math.max(40, Math.min(95, Math.floor(window.innerWidth / 18)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.7 + 0.5
  }));
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(194, 255, 90, 0.45)";
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 125) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(77, 226, 255, ${0.35 - d / 380})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
resize();
animate();

// ============================================================
// NEON RUNNER — CINEMATIC INTRO ANIMATION
// ============================================================

const introCanvas  = document.getElementById('introCanvas');
const ictx         = introCanvas.getContext('2d');
const skipBtn      = document.getElementById('skipIntroBtn');

introCanvas.width  = 960;
introCanvas.height = 540;

const introBg  = new Image(); introBg.src  = 'bg.jpg';
const introRun = runFrames; // ninja girl run frames shared from script.js

let introTime   = 0;      // seconds
let introStartT = null;
let introRafId  = null;
let introCharX  = -120;
let introCharFrame = 0;
let introCharTimer = 0;
const INTRO_DURATION = 8.5; // seconds

// Rain particles
const rainDrops = Array.from({ length: 150 }, () => ({
    x: Math.random() * 960,
    y: Math.random() * 540,
    s: 15 + Math.random() * 20, // speed
    l: 10 + Math.random() * 15  // length
}));

// Fog particles
const fogParticles = Array.from({ length: 18 }, () => ({
    x: Math.random() * 960,
    y: 300 + Math.random() * 180,
    r: 80 + Math.random() * 120,
    speed: 0.15 + Math.random() * 0.2,
    alpha: 0.04 + Math.random() * 0.08
}));

// Stars/fireflies
const fireflies = Array.from({ length: 20 }, () => ({
    x: Math.random() * 960,
    y: 60 + Math.random() * 200,
    r: 1 + Math.random() * 2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.03 + Math.random() * 0.04
}));

function drawIntroBg(t) {
    // Parallax scroll yavaş
    const scrollX = -t * 18;
    const bx = ((scrollX % 960) + 960) % 960;

    ictx.drawImage(introBg, bx - 960, 0, 960, 540);
    ictx.drawImage(introBg, bx,       0, 960, 540);
    ictx.drawImage(introBg, bx + 960, 0, 960, 540);
}

function drawFog(t) {
    fogParticles.forEach(p => {
        p.x += p.speed;
        if (p.x - p.r > 960) p.x = -p.r;
        const g = ictx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(200,220,255,${p.alpha})`);
        g.addColorStop(1, 'rgba(200,220,255,0)');
        ictx.fillStyle = g;
        ictx.beginPath();
        ictx.ellipse(p.x, p.y, p.r * 2, p.r * 0.6, 0, 0, Math.PI * 2);
        ictx.fill();
    });
}

function drawFireflies(t) {
    fireflies.forEach(f => {
        f.phase += f.speed;
        const alpha = 0.4 + Math.sin(f.phase) * 0.4;
        const size  = f.r + Math.sin(f.phase) * 0.5;
        ictx.save();
        ictx.shadowColor = '#ffe066';
        ictx.shadowBlur  = 12;
        ictx.fillStyle   = `rgba(255,230,100,${alpha})`;
        ictx.beginPath();
        ictx.arc(f.x, f.y, size, 0, Math.PI * 2);
        ictx.fill();
        ictx.restore();
    });
}

function drawRain(t) {
    ictx.strokeStyle = 'rgba(200, 220, 255, 0.4)';
    ictx.lineWidth = 1;
    ictx.beginPath();
    rainDrops.forEach(r => {
        r.x -= r.s * 0.2; // shamol
        r.y += r.s;
        if (r.y > 540) {
            r.y = -20;
            r.x = Math.random() * 1200;
        }
        ictx.moveTo(r.x, r.y);
        ictx.lineTo(r.x - r.l * 0.2, r.y + r.l);
    });
    ictx.stroke();
}

function drawForegroundTrees(t) {
    // Tez harakatlanuvchi old fon elementlari (chuqurlik effekti)
    if (t < 2) return;
    const scrollX = -t * 120; // Fondan ancha tezroq
    ictx.fillStyle = '#050505'; // Qop-qora siluet

    // 3 ta katta daraxt
    for (let i = 0; i < 3; i++) {
        const bx = ((scrollX + i * 500) % 1500) + 1500;
        if (bx < 1100 && bx > -300) {
            ictx.beginPath();
            ictx.moveTo(bx, 540);
            ictx.lineTo(bx + 40, 100);
            ictx.lineTo(bx + 80, 540);
            ictx.fill();
        }
    }
}

function drawCharacter(t) {
    if (t < 2) return;

    // Karakter kirib yuguradi
    const targetX = 200;
    const speed   = t < 3 ? 4 : (t < 5 ? 6 : 9);
    introCharX   += speed;
    if (introCharX > 800) introCharX = -120;

    // Animatsiya frame
    introCharTimer++;
    if (introCharTimer > 4) { introCharFrame = (introCharFrame + 1) % 10; introCharTimer = 0; }

    const img = introRun[introCharFrame];
    if (img && img.complete && img.naturalWidth > 0) {
        ictx.save();
        if (t > 4) {
            // Xavf paytida titroq
            const shake = Math.sin(t * 40) * 2;
            ictx.translate(shake, 0);
        }
        ictx.drawImage(img, introCharX - 40, 390, 100, 100);
        ictx.restore();
    }

    // Qizil sharf (rasm ustiga chizilgan gorizontal chiziq)
    ictx.save();
    ictx.strokeStyle = 'rgba(220,50,50,0.8)';
    ictx.lineWidth = 3;
    ictx.beginPath();
    const scarfY = 420 + Math.sin(t * 8) * 3;
    ictx.moveTo(introCharX + 20, scarfY);
    ictx.bezierCurveTo(
        introCharX + 40, scarfY - 8,
        introCharX + 55, scarfY + 6,
        introCharX + 70, scarfY - 4
    );
    ictx.stroke();
    ictx.restore();
}

function drawShadow(t) {
    if (t < 4 || t > 6.5) return;
    const shadowAlpha = Math.min((t - 4) / 1.5, 1) * 0.7;

    // Ulkan soya fogdan chiqadi
    ictx.save();
    const sx = 680 + Math.sin(t * 0.5) * 30;
    const sy = 300;
    const g  = ictx.createRadialGradient(sx, sy, 20, sx, sy, 180);
    g.addColorStop(0, `rgba(0,0,0,${shadowAlpha})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ictx.fillStyle = g;
    ictx.ellipse(sx, sy + 80, 90, 140, 0, 0, Math.PI * 2);
    ictx.fill();

    // Ko'z-ko'zlar
    if (t > 4.5) {
        const eyeAlpha = Math.min((t - 4.5) / 0.5, 1);
        ictx.shadowColor = '#ff2200';
        ictx.shadowBlur  = 20;
        ictx.fillStyle   = `rgba(255,30,0,${eyeAlpha * 0.9})`;
        ictx.beginPath(); ictx.arc(sx - 15, sy - 20, 6, 0, Math.PI * 2); ictx.fill();
        ictx.beginPath(); ictx.arc(sx + 15, sy - 20, 6, 0, Math.PI * 2); ictx.fill();
        ictx.shadowBlur = 0;
    }
    ictx.restore();
}

function drawCinematicBars(t) {
    // 21:9 kino formati uchun qora tasmalar
    const barHeight = 60;
    ictx.fillStyle = '#000';
    // Tepasi
    ictx.fillRect(0, 0, 960, barHeight);
    // Pasti
    ictx.fillRect(0, 540 - barHeight, 960, barHeight);
}

function drawDarkOverlay(t) {
    // 6-7s qorayish
    if (t > 5.5 && t < 7) {
        const d = Math.min((t - 5.5) / 1, 1);
        ictx.fillStyle = `rgba(0,0,0,${d * 0.92})`;
        ictx.fillRect(0, 0, 960, 540);
    }
    // Neon flash 6.5-7s
    if (t > 6.3 && t < 7) {
        const flash = Math.sin((t - 6.3) * 15) * 0.5 + 0.5;
        ictx.strokeStyle = `rgba(0,255,255,${flash * 0.6})`;
        ictx.lineWidth   = 3;
        for (let i = 0; i < 5; i++) {
            ictx.beginPath();
            ictx.moveTo(Math.random() * 960, 0);
            ictx.lineTo(Math.random() * 960, 540);
            ictx.stroke();
        }
    }
}

function drawTitle(t) {
    if (t < 7) return;
    const progress = Math.min((t - 7) / 0.8, 1);
    const alpha    = progress;

    ictx.save();
    ictx.globalAlpha = alpha;

    // Qora fon (to'liq qoraygan holda)
    ictx.fillStyle = 'rgba(0,0,0,0.95)';
    ictx.fillRect(0, 0, 960, 540);

    // "NEON RUNNER" asosiy sarlavha
    const titleY = 220 + (1 - progress) * 40;
    ictx.shadowColor = '#00ffff';
    ictx.shadowBlur  = 40 * progress;
    ictx.fillStyle   = '#ffffff';
    ictx.font        = `bold ${Math.floor(60 * progress + 20)}px "Press Start 2P", monospace`;
    ictx.textAlign   = 'center';
    ictx.fillText('NEON RUNNER', 480, titleY);

    // Neon rangli soya versiyasi
    ictx.globalAlpha = alpha * 0.5;
    ictx.shadowColor = '#ff00ff';
    ictx.shadowBlur  = 30;
    ictx.fillStyle   = '#00ffff';
    ictx.fillText('NEON RUNNER', 482, titleY + 2);

    // "PRESS SPACE TO RUN"
    if (progress > 0.6) {
        const sub = (progress - 0.6) / 0.4;
        ictx.globalAlpha = sub * alpha;
        ictx.shadowBlur  = 10;
        ictx.shadowColor = '#00ff00';
        ictx.fillStyle   = '#aaffaa';
        ictx.font        = '14px "Press Start 2P", monospace';

        // Miltillash
        if (Math.sin(t * 6) > -0.3) {
            ictx.fillText('▶  PRESS SPACE TO RUN  ◀', 480, 310);
        }
    }

    // Pastdagi chiziq bezak
    if (progress > 0.5) {
        const lp = (progress - 0.5) / 0.5;
        ictx.globalAlpha = lp * alpha;
        ictx.strokeStyle = '#00ffff';
        ictx.lineWidth   = 2;
        ictx.shadowColor = '#00ffff';
        ictx.shadowBlur  = 15;
        const lw = 300 * lp;
        ictx.beginPath();
        ictx.moveTo(480 - lw, 240);
        ictx.lineTo(480 + lw, 240);
        ictx.stroke();
    }

    ictx.textAlign   = 'left';
    ictx.globalAlpha = 1;
    ictx.restore();
}

function drawGround() {
    // Yer chizig'i
    ictx.strokeStyle = 'rgba(80,180,80,0.5)';
    ictx.lineWidth   = 2;
    ictx.shadowColor = '#0f0';
    ictx.shadowBlur  = 6;
    ictx.beginPath();
    ictx.moveTo(0, 490); ictx.lineTo(960, 490);
    ictx.stroke();
    ictx.shadowBlur = 0;
}

function drawVignette() {
    const g = ictx.createRadialGradient(480, 270, 180, 480, 270, 540);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(0,0,0,0.65)');
    ictx.fillStyle = g;
    ictx.fillRect(0, 0, 960, 540);
}

function introLoop(timestamp) {
    if (!introStartT) introStartT = timestamp;
    const t = (timestamp - introStartT) / 1000;
    introTime = t;

    ictx.clearRect(0, 0, 960, 540);

    if (t < 6.5) {
        // Guldurak (momaqaldiroq miltillashi)
        if (t > 3 && t < 3.2 || t > 5.1 && t < 5.2) {
            ictx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            ictx.fillRect(0, 0, 960, 540);
        }

        drawIntroBg(t);
        drawFog(t);
        drawFireflies(t);
        drawGround();
        drawCharacter(t);
        drawShadow(t);
        drawForegroundTrees(t); // Old fonga qora siluetlar qo'shildi
        drawRain(t);            // Yomg'ir effekti
        drawVignette();
    }

    drawCinematicBars(t); // Qora tasmalar (Letterbox)
    drawDarkOverlay(t);
    drawTitle(t);

    // Skip tugmasi
    if (t > 0.5) skipBtn.classList.remove('hidden');

    if (t < INTRO_DURATION) {
        introRafId = requestAnimationFrame(introLoop);
    } else {
        endIntro();
    }
}

function startIntro() {
    document.getElementById('introOverlay').classList.remove('hidden');
    document.getElementById('startScreen').classList.add('hidden');
    introStartT = null;
    introCharX  = -120;

    introRafId  = requestAnimationFrame(introLoop);
}

function endIntro() {
    cancelAnimationFrame(introRafId);
    document.getElementById('introOverlay').classList.add('hidden');
    skipBtn.classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    updateWalletUI();
}

skipBtn.addEventListener('click', endIntro);
window.addEventListener('keydown', e => {
    if (e.code === 'Space' && !document.getElementById('introOverlay').classList.contains('hidden')) {
        e.preventDefault();
        endIntro();
    }
});

// O'yin yuklangach intro boshlanadi
window.addEventListener('load', () => {
    // Rasmlar yuklangach boshlash
    introBg.onload = () => {
        setTimeout(startIntro, 300);
    };
    if (introBg.complete) setTimeout(startIntro, 300);
});

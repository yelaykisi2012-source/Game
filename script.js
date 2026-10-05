// ============================================================
// 1. CANVAS VA UI ELEMENTLARINI BOG'LASH
// ============================================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const startScreen    = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const pauseScreen    = document.getElementById('pauseScreen');
const shopScreen     = document.getElementById('shopScreen');
const hud            = document.getElementById('hud');

const playBtn      = document.getElementById('playBtn');
const restartBtn   = document.getElementById('restartBtn');
const pauseBtn     = document.getElementById('pauseBtn');
const resumeBtn    = document.getElementById('resumeBtn');
const shopBtn      = document.getElementById('shopBtn');
const shopCloseBtn = document.getElementById('shopCloseBtn');
const goShopBtn    = document.getElementById('goShopBtn');

const scoreText    = document.getElementById('scoreText');
const hiScoreText  = document.getElementById('hiScoreText');
const coinText     = document.getElementById('coinText');
const seasonText   = document.getElementById('seasonText');
const finalScore   = document.getElementById('finalScore');
const finalCoins   = document.getElementById('finalCoins');
const finalWallet  = document.getElementById('finalWallet');
const walletText   = document.getElementById('walletText');
const shopWalletText = document.getElementById('shopWalletText');

// ============================================================
// 2. RASMLARNI YUKLASH
// ============================================================
const springBg = new Image(); springBg.src = 'spring_bg.jpg';
const summerBg = new Image(); summerBg.src = 'bg.jpg';
const autumnBg = new Image(); autumnBg.src = 'autumn_bg.jpg';
const winterBg = new Image(); winterBg.src = 'winter_bg.jpg';

const seasonImages = [springBg, summerBg, autumnBg, winterBg];
let bgImage = springBg;

const playerImg = new Image(); playerImg.src = 'player.jpg';
const coinImg   = new Image(); coinImg.src   = 'coin.jpg';

const runFrames  = [], jumpFrames = [], idleFrames = [], deadFrames = [];
for (let i = 0; i < 10; i++) {
    const r = new Image(); r.src = `player_anim/Run__00${i}.png`;  runFrames.push(r);
    const j = new Image(); j.src = `player_anim/Jump__00${i}.png`; jumpFrames.push(j);
    const d = new Image(); d.src = `player_anim/Idle__00${i}.png`; idleFrames.push(d);
    const x = new Image(); x.src = `player_anim/Dead__00${i}.png`; deadFrames.push(x);
}

// Adventure Girl spritelari  (Run 1-11, Jump 1-16, Idle 1-16, Dead 1-17)
const agRunFrames = [], agJumpFrames = [], agIdleFrames = [], agDeadFrames = [];
for (let i = 1; i <= 11; i++) { const img = new Image(); img.src = `adventure_girl/Run (${i}).png`;  agRunFrames.push(img); }
for (let i = 1; i <= 16; i++) { const img = new Image(); img.src = `adventure_girl/Jump (${i}).png`; agJumpFrames.push(img); }
for (let i = 1; i <= 16; i++) { const img = new Image(); img.src = `adventure_girl/Idle (${i}).png`; agIdleFrames.push(img); }
for (let i = 1; i <= 17; i++) { const img = new Image(); img.src = `adventure_girl/Dead (${i}).png`; agDeadFrames.push(img); }

// Santa spritelari  (Run 1-8, Jump 1-10, Idle 1-10, Dead 1-10)
const stRunFrames = [], stJumpFrames = [], stIdleFrames = [], stDeadFrames = [];
for (let i = 1; i <= 8;  i++) { const img = new Image(); img.src = `santa_anim/Run (${i}).png`;  stRunFrames.push(img); }
for (let i = 1; i <= 10; i++) { const img = new Image(); img.src = `santa_anim/Jump (${i}).png`; stJumpFrames.push(img); }
for (let i = 1; i <= 10; i++) { const img = new Image(); img.src = `santa_anim/Idle (${i}).png`; stIdleFrames.push(img); }
for (let i = 1; i <= 10; i++) { const img = new Image(); img.src = `santa_anim/Dead (${i}).png`; stDeadFrames.push(img); }

// Mushuk spritelari (Run 1-8, Jump 1-8, Idle 1-10, Dead 1-10)
const catRunFrames = [], catJumpFrames = [], catIdleFrames = [], catDeadFrames = [];
for (let i = 1; i <= 8;  i++) { const img = new Image(); img.src = `Animatsiyalar/catndog/png/cat/Run (${i}).png`;  catRunFrames.push(img); }
for (let i = 1; i <= 8;  i++) { const img = new Image(); img.src = `Animatsiyalar/catndog/png/cat/Jump (${i}).png`; catJumpFrames.push(img); }
for (let i = 1; i <= 10; i++) { const img = new Image(); img.src = `Animatsiyalar/catndog/png/cat/Idle (${i}).png`; catIdleFrames.push(img); }
for (let i = 1; i <= 10; i++) { const img = new Image(); img.src = `Animatsiyalar/catndog/png/cat/Dead (${i}).png`; catDeadFrames.push(img); }

// It spritelari (Run 1-8, Jump 1-8, Idle 1-9, Dead=Slide 1-10)
const dogRunFrames = [], dogJumpFrames = [], dogIdleFrames = [], dogDeadFrames = [];
for (let i = 1; i <= 8;  i++) { const img = new Image(); img.src = `Animatsiyalar/catndog/png/dog/Run (${i}).png`;  dogRunFrames.push(img); }
for (let i = 1; i <= 8;  i++) { const img = new Image(); img.src = `Animatsiyalar/catndog/png/dog/Jump (${i}).png`; dogJumpFrames.push(img); }
for (let i = 1; i <= 9;  i++) { const img = new Image(); img.src = `Animatsiyalar/catndog/png/dog/Idle (${i}).png`; dogIdleFrames.push(img); }
for (let i = 1; i <= 10; i++) { const img = new Image(); img.src = `Animatsiyalar/catndog/png/dog/Slide (${i}).png`; dogDeadFrames.push(img); }

// Jack (yigit) spritelari — jackfree
const jackRunFrames = [], jackJumpFrames = [], jackIdleFrames = [], jackDeadFrames = [];
for (let i = 1; i <= 8;  i++) { const img = new Image(); img.src = `Animatsiyalar/jackfree/png/Run (${i}).png`;  jackRunFrames.push(img); }
for (let i = 1; i <= 10; i++) { const img = new Image(); img.src = `Animatsiyalar/jackfree/png/Jump (${i}).png`; jackJumpFrames.push(img); }
for (let i = 1; i <= 10; i++) { const img = new Image(); img.src = `Animatsiyalar/jackfree/png/Idle (${i}).png`; jackIdleFrames.push(img); }
for (let i = 1; i <= 10; i++) { const img = new Image(); img.src = `Animatsiyalar/jackfree/png/Dead (${i}).png`; jackDeadFrames.push(img); }

// Qizil shapkali qiz — redhatfiles
const redRunFrames = [], redJumpFrames = [], redIdleFrames = [], redDeadFrames = [];
for (let i = 1; i <= 8;  i++) { const img = new Image(); img.src = `Animatsiyalar/redhatfiles/png/Run (${i}).png`;  redRunFrames.push(img); }
for (let i = 1; i <= 12; i++) { const img = new Image(); img.src = `Animatsiyalar/redhatfiles/png/Jump (${i}).png`; redJumpFrames.push(img); }
for (let i = 1; i <= 9;  i++) { const img = new Image(); img.src = `Animatsiyalar/redhatfiles/png/Idle (${i}).png`; redIdleFrames.push(img); }
// Lugia / Ajdarho Sprite animasiyasi (demo_lugia-Sheet.png)
const lugiaImg = new Image();
lugiaImg.src = 'Animatsiyalar/demo_lugia/demo_lugia-Sheet.png';

// Lugia sprite sheet aniq kadr koordinatalari (BFS orqali aniqlangan)
const LUGIA_FRAMES = [
    { sx: 66,  sy: 75,  sw: 88, sh: 84 },
    { sx: 275, sy: 74,  sw: 87, sh: 59 },
    { sx: 484, sy: 75,  sw: 86, sh: 46 },
    { sx: 67,  sy: 274, sw: 87, sh: 60 },
    { sx: 273, sy: 266, sw: 89, sh: 69 },
    { sx: 483, sy: 287, sw: 87, sh: 49 },
];

function drawLugiaSprite(targetCtx, destX, destY, destW, destH, frameIndex = 0, flipHorizontal = false) {
    if (!lugiaImg.complete || lugiaImg.naturalWidth === 0) return false;
    const f = LUGIA_FRAMES[Math.abs(frameIndex) % LUGIA_FRAMES.length];

    targetCtx.save();
    targetCtx.shadowColor = '#cc2200';
    targetCtx.shadowBlur  = 18;
    if (flipHorizontal) {
        targetCtx.translate(destX + destW, destY);
        targetCtx.scale(-1, 1);
        targetCtx.drawImage(lugiaImg, f.sx, f.sy, f.sw, f.sh, 0, 0, destW, destH);
    } else {
        targetCtx.drawImage(lugiaImg, f.sx, f.sy, f.sw, f.sh, destX, destY, destW, destH);
    }
    targetCtx.restore();
    return true;
}

// ============================================================
// 3. OVOZ VA FASLLAR MUSIQASI
// ============================================================
const coinSound    = new Audio('freesound_gamestudio-material-gold-394476.mp3');
const gameOverSound= new Audio('tuomas_data-game-over-39-199830.mp3');
const chestSound   = new Audio('kamron-preview.wav');
const milestoneSound = new Audio('kamron-preview (1).wav');
chestSound.volume  = 0.8;
milestoneSound.volume = 1.0;

const springMusic = new Audio('Lokotsiyalar/freesound_community-spring-in-german-woods-73631.mp3');
const summerMusic = new Audio('lucadialessandro-arcade-melody-295434.mp3');
const autumnMusic = new Audio('Lokotsiyalar/wingsoarstudio-outback-midnight-storm-heavy-rain-and-distant-thunder-sound-effect-599673.mp3');
const winterMusic = new Audio('Lokotsiyalar/dragon-studio-winter-landscape-447500.mp3');

[springMusic, summerMusic, autumnMusic, winterMusic].forEach(m => {
    m.loop = true;
    m.volume = 0.4;
});

let currentSeasonIdx = 0;
const seasonsList = ['spring', 'summer', 'autumn', 'winter'];
const seasonMusic = [springMusic, summerMusic, autumnMusic, winterMusic];
let currentMusic = springMusic;

// ============================================================
// 4. PERSONAJLAR TA'RIFI (Do'kon uchun)
// ============================================================
const CHARACTERS = [
    {
        id: 'ninja',
        name: 'NINJA GIRL',
        price: 0,
        color: '#f55',
        // Preview uchun canvas chizish funksiyasi
        drawPreview(c) {
            const ctx2 = c.getContext('2d');
            const img = runFrames[0] || playerImg;
            if (img.complete && img.naturalWidth > 0) {
                ctx2.drawImage(img, 5, 5, 70, 70);
            } else {
                img.onload = () => ctx2.drawImage(img, 5, 5, 70, 70);
                // Placeholder
                ctx2.fillStyle = '#f55';
                ctx2.fillRect(25, 10, 30, 55);
            }
        },
        // O'yinda chizish
        drawInGame(ctx, x, y, frame, state) {
            let frames;
            if      (state === 'dead') frames = deadFrames;
            else if (state === 'jump') frames = jumpFrames;
            else if (state === 'idle') frames = idleFrames;
            else                       frames = runFrames;
            const img = frames[frame] || playerImg;
            ctx.drawImage(img, x - 40, y - 50, 100, 100);
        }
    },
    {   // --- ADVENTURE GIRL ---
        id: 'adventure',
        name: 'ADVENTURE GIRL',
        price: 15,
        color: '#ffaa00',
        drawPreview(c) {
            const ctx2 = c.getContext('2d');
            const img = agIdleFrames[0];
            if (img && img.complete && img.naturalWidth > 0) {
                ctx2.drawImage(img, 0, 0, 80, 80);
            } else if (img) {
                img.onload = () => ctx2.drawImage(img, 0, 0, 80, 80);
            }
        },
        drawInGame(ctx, x, y, frame, state) {
            let pool;
            if      (state === 'dead') pool = agDeadFrames;
            else if (state === 'jump') pool = agJumpFrames;
            else if (state === 'idle') pool = agIdleFrames;
            else                       pool = agRunFrames;
            const img = pool[frame % pool.length];
            if (img && img.complete && img.naturalWidth > 0)
                ctx.drawImage(img, x - 50, y - 60, 120, 120);
        }
    },
    {   // --- SANTA CLAUS ---
        id: 'santa',
        name: 'SANTA CLAUS',
        price: 30,
        color: '#ff3333',
        drawPreview(c) {
            const ctx2 = c.getContext('2d');
            const img = stIdleFrames[0];
            if (img && img.complete && img.naturalWidth > 0) {
                ctx2.drawImage(img, 0, 0, 80, 80);
            } else if (img) {
                img.onload = () => ctx2.drawImage(img, 0, 0, 80, 80);
            }
        },
        drawInGame(ctx, x, y, frame, state) {
            let pool;
            if      (state === 'dead') pool = stDeadFrames;
            else if (state === 'jump') pool = stJumpFrames;
            else if (state === 'idle') pool = stIdleFrames;
            else                       pool = stRunFrames;
            const img = pool[frame % pool.length];
            if (img && img.complete && img.naturalWidth > 0)
                ctx.drawImage(img, x - 50, y - 60, 120, 120);
        }
    },
    {   // --- MUSHUK (CAT) ---
        id: 'cat',
        name: 'MUSHUK',
        price: 40,
        color: '#ff88cc',
        drawPreview(c) {
            const ctx2 = c.getContext('2d');
            const img = catIdleFrames[0];
            if (img && img.complete && img.naturalWidth > 0) {
                ctx2.drawImage(img, 0, 0, 80, 80);
            } else if (img) {
                img.onload = () => ctx2.drawImage(img, 0, 0, 80, 80);
            }
        },
        drawInGame(ctx, x, y, frame, state) {
            let pool;
            if      (state === 'dead') pool = catDeadFrames;
            else if (state === 'jump') pool = catJumpFrames;
            else if (state === 'idle') pool = catIdleFrames;
            else                       pool = catRunFrames;
            const img = pool[frame % pool.length];
            if (img && img.complete && img.naturalWidth > 0)
                ctx.drawImage(img, x - 50, y - 60, 120, 120);
        }
    },
    {   // --- IT (DOG) ---
        id: 'dog',
        name: 'IT',
        price: 40,
        color: '#aaaaff',
        drawPreview(c) {
            const ctx2 = c.getContext('2d');
            const img = dogIdleFrames[0];
            if (img && img.complete && img.naturalWidth > 0) {
                ctx2.drawImage(img, 0, 0, 80, 80);
            } else if (img) {
                img.onload = () => ctx2.drawImage(img, 0, 0, 80, 80);
            }
        },
        drawInGame(ctx, x, y, frame, state) {
            let pool;
            if      (state === 'dead') pool = dogDeadFrames;
            else if (state === 'jump') pool = dogJumpFrames;
            else if (state === 'idle') pool = dogIdleFrames;
            else                       pool = dogRunFrames;
            const img = pool[frame % pool.length];
            if (img && img.complete && img.naturalWidth > 0)
                ctx.drawImage(img, x - 50, y - 60, 120, 120);
        }
    },
    {   // --- JACK ---
        id: 'jack',
        name: 'JACK',
        price: 50,
        color: '#66aaff',
        drawPreview(c) {
            const ctx2 = c.getContext('2d');
            const img = jackIdleFrames[0];
            if (img && img.complete && img.naturalWidth > 0) {
                ctx2.drawImage(img, 0, 0, 80, 80);
            } else if (img) {
                img.onload = () => ctx2.drawImage(img, 0, 0, 80, 80);
            }
        },
        drawInGame(ctx, x, y, frame, state) {
            let pool;
            if      (state === 'dead') pool = jackDeadFrames;
            else if (state === 'jump') pool = jackJumpFrames;
            else if (state === 'idle') pool = jackIdleFrames;
            else                       pool = jackRunFrames;
            const img = pool[frame % pool.length];
            if (img && img.complete && img.naturalWidth > 0)
                ctx.drawImage(img, x - 50, y - 60, 120, 120);
        }
    },
    {   // --- RED HAT GIRL ---
        id: 'redhat',
        name: 'RED HAT GIRL',
        price: 50,
        color: '#ff4444',
        drawPreview(c) {
            const ctx2 = c.getContext('2d');
            const img = redIdleFrames[0];
            if (img && img.complete && img.naturalWidth > 0) {
                ctx2.drawImage(img, 0, 0, 80, 80);
            } else if (img) {
                img.onload = () => ctx2.drawImage(img, 0, 0, 80, 80);
            }
        },
        drawInGame(ctx, x, y, frame, state) {
            let pool;
            if      (state === 'dead') pool = redDeadFrames;
            else if (state === 'jump') pool = redJumpFrames;
            else if (state === 'idle') pool = redIdleFrames;
            else                       pool = redRunFrames;
            const img = pool[frame % pool.length];
            if (img && img.complete && img.naturalWidth > 0)
                ctx.drawImage(img, x - 50, y - 60, 120, 120);
        }
    },
    {   // --- AJDARHO (LUGIA) ---
        id: 'lugia',
        name: 'AJDARHO (LUGIA)',
        price: 100,
        color: '#ff2255',
        drawPreview(c) {
            const ctx2 = c.getContext('2d');
            const drawn = drawLugiaSprite(ctx2, 0, 0, 80, 80, 0, true);
            if (!drawn) {
                lugiaImg.onload = () => drawLugiaSprite(ctx2, 0, 0, 80, 80, 0, true);
            }
        },
        drawInGame(ctx, x, y, frame, state) {
            const animFrame = Math.floor(frames / 3);
            drawLugiaSprite(ctx, x - 40, y - 60, 130, 130, animFrame, true);
        }
    }
];

// ============================================================
// 4b. TRAIL EFFEKTLAR (Sotib olinadigan uchqun izlari)
// ============================================================
const TRAIL_EFFECTS = [
    {
        id: 'none',
        name: 'ODDIY IZ',
        price: 0,
        emoji: '🌫️',
        desc: 'Standart chang va yengil iz',
        colors: [],
        sparkle: false
    },
    {
        id: 'fire',
        name: 'OLOV AURA',
        price: 30,
        emoji: '🔥',
        desc: 'Yurayotganda alangalanuvchi issiq olov izi',
        colors: ['#ff4400', '#ff8800', '#ffcc00', '#ff2200'],
        sparkle: true,
        glowColor: '#ff6600'
    },
    {
        id: 'ice',
        name: 'MUZ KRISTALL',
        price: 35,
        emoji: '❄️',
        desc: 'Sovuq muz va aylanuvchi qor parchalari',
        colors: ['#aaeeff', '#88ddff', '#ffffff', '#ccf4ff'],
        sparkle: true,
        glowColor: '#00ccff'
    },
    {
        id: 'gold',
        name: 'OLTIN YULDUZ',
        price: 50,
        emoji: '✨',
        desc: 'Nurlanuvchi oltin yulduz va brilliantlar',
        colors: ['#ffd700', '#ffec6e', '#fff3a3', '#ffc200'],
        sparkle: true,
        glowColor: '#ffd700'
    },
    {
        id: 'rainbow',
        name: 'KAMALAK SIHR',
        price: 80,
        emoji: '🌈',
        desc: 'Sehrli 7 xil kamalak nurlari',
        colors: ['#ff0066', '#ff9900', '#ffff00', '#00ff88', '#00ccff', '#cc00ff'],
        sparkle: true,
        glowColor: '#ffffff'
    },
    {
        id: 'shadow',
        name: 'SOYA VOID',
        price: 60,
        emoji: '🌑',
        desc: 'Qorong\'u portal va binafsha void tutuni',
        colors: ['#8800ff', '#4400cc', '#220088', '#aa00ff'],
        sparkle: false,
        glowColor: '#6600cc'
    },
    {
        id: 'lightning',
        name: 'ELEKTR ZARBA',
        price: 70,
        emoji: '⚡',
        desc: 'Chaqmoq va kuchli elektr razryadlari',
        colors: ['#00ffff', '#88ffff', '#ffffff', '#0099ff'],
        sparkle: true,
        glowColor: '#00ffff'
    },
    {
        id: 'custom',
        name: 'O\'Z RASMINGIZ',
        price: 0,
        emoji: '🖼️',
        desc: 'O\'z faylingiz yoki rasmingizni yuklang!',
        colors: ['#ffd700', '#ff8800'],
        sparkle: true
    }
];

// ============================================================
// 4c. HAMROHLAR (PETS & COMPANIONS)
// ============================================================
const PETS = [
    {
        id: 'none',
        name: 'HAMROH YO\'Q',
        price: 0,
        emoji: '🚫',
        desc: 'Yolg\'iz yugurish',
        buff: 'Yo\'q'
    },
    {
        id: 'eagle',
        name: '🦅 SHOHONA BURGUT',
        price: 60,
        emoji: '🦅',
        desc: 'Tepada uchadi va tangalarni o\'ziga magnitday tortadi',
        buff: '🧲 Avto-Magnit'
    },
    {
        id: 'wolf',
        name: '🐺 SIHRLI BO\'RI',
        price: 80,
        emoji: '🐺',
        desc: 'Yonida yuguradi va ballarni 1.5x baravar oshiradi',
        buff: '✨ +50% Ballar'
    },
    {
        id: 'dragon',
        name: '🐲 AJDARHOCHA',
        price: 120,
        emoji: '🐲',
        desc: 'Olov purkaydi va 1 marta to\'siqdan qalqon beradi',
        buff: '🛡️ Qalqon Himoyasi'
    },
    {
        id: 'bunny',
        name: '🐇 OLTIN QUYON',
        price: 100,
        emoji: '🐇',
        desc: 'Sakrab yuradi va har bir tangani 2x baravar beradi',
        buff: '🪙 2x Tangalar'
    }
];

// ============================================================
// 4d. DUNYOLAR VA XARITALAR (MULTI-WORLD)
// ============================================================
const WORLDS = [
    {
        id: 'village',
        name: '🏡 QISHLOQ',
        price: 0,
        emoji: '🏡',
        desc: 'Tinch qishloq — Bahor, Yoz, Kuz va Qish fasllari',
        colors: ['#224422', '#77cc77'],
        bgGradient: ['#1a3c10', '#0a1a05'],
        groundColor: '#77cc77'
    },
    {
        id: 'volcano',
        name: '🌋 VOLQON TIZMASI',
        price: 150,
        emoji: '🌋',
        desc: 'Olovli magma daryolari va kul yomg\'iri',
        colors: ['#ff4400', '#ff8800'],
        bgGradient: ['#3a0a00', '#150200'],
        groundColor: '#ff4400'
    },
    {
        id: 'castle',
        name: '🏰 QADIMIY QAL\'A',
        price: 200,
        emoji: '🏰',
        desc: 'Qorong\'u qasr va tosh nayzali to\'siqlar',
        colors: ['#8855ff', '#331166'],
        bgGradient: ['#180f29', '#080410'],
        groundColor: '#8855ff'
    },
    {
        id: 'mystic',
        name: '🌌 SIHRLI O\'RMON',
        price: 250,
        emoji: '🌌',
        desc: 'Sehrli nur sochuvchi neon kristallar',
        colors: ['#00ffff', '#0099ff'],
        bgGradient: ['#002b36', '#00111a'],
        groundColor: '#00ffff'
    }
];

// ============================================================
// 5. SOZLAMALAR TIZIMI
// ============================================================
const settingsScreen   = document.getElementById('settingsScreen');
const settingsBtn      = document.getElementById('settingsBtn');
const settingsCloseBtn = document.getElementById('settingsCloseBtn');
const musicToggle      = document.getElementById('musicToggle');
const sfxToggle        = document.getElementById('sfxToggle');
const musicVolumeEl    = document.getElementById('musicVolume');
const sfxVolumeEl      = document.getElementById('sfxVolume');
const musicVolVal      = document.getElementById('musicVolVal');
const sfxVolVal        = document.getElementById('sfxVolVal');
const fullscreenBtn    = document.getElementById('fullscreenBtn');

// Sozlamalarni localStorage dan yuklash
let settings = JSON.parse(localStorage.getItem('nrSettings') || JSON.stringify({
    musicOn: true, musicVol: 40, sfxOn: true, sfxVol: 80
}));

function applySettings() {
    // Musiqa
    const mv = settings.musicVol / 100;
    [springMusic, summerMusic, autumnMusic, winterMusic].forEach(m => m.volume = settings.musicOn ? mv : 0);

    // SFX
    const sv = settings.sfxVol / 100;
    coinSound.volume    = settings.sfxOn ? sv : 0;
    chestSound.volume   = settings.sfxOn ? sv * 0.8 : 0;
    milestoneSound.volume = settings.sfxOn ? sv : 0;
    gameOverSound.volume  = settings.sfxOn ? sv : 0;

    // Toggle UI
    musicToggle.textContent = settings.musicOn ? 'ON' : 'OFF';
    musicToggle.classList.toggle('on', settings.musicOn);
    sfxToggle.textContent = settings.sfxOn ? 'ON' : 'OFF';
    sfxToggle.classList.toggle('on', settings.sfxOn);

    // Slider UI
    musicVolumeEl.value = settings.musicVol;
    sfxVolumeEl.value   = settings.sfxVol;
    musicVolVal.textContent = settings.musicVol + '%';
    sfxVolVal.textContent   = settings.sfxVol + '%';
}

function saveSettings() {
    localStorage.setItem('nrSettings', JSON.stringify(settings));
    applySettings();
}

// Toggle hodisalari
musicToggle.addEventListener('click', () => {
    settings.musicOn = !settings.musicOn;
    saveSettings();
});
sfxToggle.addEventListener('click', () => {
    settings.sfxOn = !settings.sfxOn;
    saveSettings();
});

// Slider hodisalari
musicVolumeEl.addEventListener('input', () => {
    settings.musicVol = parseInt(musicVolumeEl.value);
    musicVolVal.textContent = settings.musicVol + '%';
    saveSettings();
});
sfxVolumeEl.addEventListener('input', () => {
    settings.sfxVol = parseInt(sfxVolumeEl.value);
    sfxVolVal.textContent = settings.sfxVol + '%';
    saveSettings();
});

// To'liq ekran
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        fullscreenBtn.textContent = 'ON';
        fullscreenBtn.classList.add('on');
    } else {
        document.exitFullscreen().catch(() => {});
        fullscreenBtn.textContent = 'OFF';
        fullscreenBtn.classList.remove('on');
    }
});
document.addEventListener('fullscreenchange', () => {
    const isFs = !!document.fullscreenElement;
    fullscreenBtn.textContent = isFs ? 'ON' : 'OFF';
    fullscreenBtn.classList.toggle('on', isFs);
});

// Sozlamalar ekranini ochish/yopish
let lastScreenBeforeSettings = startScreen;

function openSettings(fromScreen = startScreen) {
    lastScreenBeforeSettings = fromScreen;
    applySettings();
    if (fromScreen) fromScreen.classList.add('hidden');
    settingsScreen.classList.remove('hidden');
}

function closeSettings() {
    settingsScreen.classList.add('hidden');
    if (lastScreenBeforeSettings) {
        lastScreenBeforeSettings.classList.remove('hidden');
    } else {
        startScreen.classList.remove('hidden');
    }
}

if (settingsBtn) {
    settingsBtn.addEventListener('click', () => openSettings(startScreen));
}
if (settingsCloseBtn) {
    settingsCloseBtn.addEventListener('click', closeSettings);
}
const pauseSettingsBtn = document.getElementById('pauseSettingsBtn');
if (pauseSettingsBtn) {
    pauseSettingsBtn.addEventListener('click', () => openSettings(pauseScreen));
}

// Boshlang'ich holat qo'llash
applySettings();

// ============================================================
// 6. DO'KON VA SAQLASH TIZIMI (AUTO-SAVE & BACKUP)
// ============================================================
// 6. DO'KON VA SAQLASH TIZIMI (AUTO-SAVE & BACKUP)
// ============================================================
let wallet          = 0;
let unlockedChars   = ["ninja"];
let selectedChar    = 'ninja';
let unlockedEffects = ["none"];
let selectedEffect  = 'none';
let unlockedPets    = ["none"];
let selectedPet     = 'none';
let unlockedWorlds  = ["village"];
let selectedWorld   = 'village';
let petShieldActive = true;
// Diqqat: highScore loadAllSaveData()/saveShopData() ichida ishlatiladi,
// shuning uchun TDZ (ReferenceError) xatoligini oldini olish uchun undan OLDIN e'lon qilinadi.
let highScore = parseInt(localStorage.getItem('neonRunnerHiScore') || '0');

function loadAllSaveData() {
    try {
        const savedWallet = localStorage.getItem('nrWallet');
        if (savedWallet !== null) wallet = parseInt(savedWallet) || 0;

        const savedChars = localStorage.getItem('nrUnlocked');
        if (savedChars) {
            const parsed = JSON.parse(savedChars);
            if (Array.isArray(parsed) && parsed.length > 0) unlockedChars = parsed;
        }
        if (!unlockedChars.includes("ninja")) unlockedChars.push("ninja");

        const savedSelChar = localStorage.getItem('nrSelectedChar');
        if (savedSelChar) selectedChar = savedSelChar;

        const savedFX = localStorage.getItem('nrUnlockedFX');
        if (savedFX) {
            const parsedFX = JSON.parse(savedFX);
            if (Array.isArray(parsedFX) && parsedFX.length > 0) unlockedEffects = parsedFX;
        }
        if (!unlockedEffects.includes("none")) unlockedEffects.push("none");

        const savedSelFX = localStorage.getItem('nrSelectedFX');
        if (savedSelFX) selectedEffect = savedSelFX;

        const savedPets = localStorage.getItem('nrUnlockedPets');
        if (savedPets) {
            const parsedPets = JSON.parse(savedPets);
            if (Array.isArray(parsedPets) && parsedPets.length > 0) unlockedPets = parsedPets;
        }
        if (!unlockedPets.includes("none")) unlockedPets.push("none");

        const savedSelPet = localStorage.getItem('nrSelectedPet');
        if (savedSelPet) selectedPet = savedSelPet;

        const savedWorlds = localStorage.getItem('nrUnlockedWorlds');
        if (savedWorlds) {
            const parsedWorlds = JSON.parse(savedWorlds);
            if (Array.isArray(parsedWorlds) && parsedWorlds.length > 0) unlockedWorlds = parsedWorlds;
        }
        if (!unlockedWorlds.includes("village")) unlockedWorlds.push("village");

        const savedSelWorld = localStorage.getItem('nrSelectedWorld');
        if (savedSelWorld) selectedWorld = savedSelWorld;

        // Atomik Backup (Zahira saqlash fayli) dan qayta tiklash
        const rawBackup = localStorage.getItem('neonRunnerSaveData_v2');
        if (rawBackup) {
            const data = JSON.parse(rawBackup);
            if (data.wallet !== undefined && data.wallet > wallet) wallet = parseInt(data.wallet);
            if (Array.isArray(data.unlockedChars)) {
                data.unlockedChars.forEach(c => { if (!unlockedChars.includes(c)) unlockedChars.push(c); });
            }
            if (data.selectedChar && unlockedChars.includes(data.selectedChar)) selectedChar = data.selectedChar;
            if (Array.isArray(data.unlockedEffects)) {
                data.unlockedEffects.forEach(f => { if (!unlockedEffects.includes(f)) unlockedEffects.push(f); });
            }
            if (data.selectedEffect && unlockedEffects.includes(data.selectedEffect)) selectedEffect = data.selectedEffect;
            if (Array.isArray(data.unlockedPets)) {
                data.unlockedPets.forEach(p => { if (!unlockedPets.includes(p)) unlockedPets.push(p); });
            }
            if (data.selectedPet && unlockedPets.includes(data.selectedPet)) selectedPet = data.selectedPet;
            if (Array.isArray(data.unlockedWorlds)) {
                data.unlockedWorlds.forEach(w => { if (!unlockedWorlds.includes(w)) unlockedWorlds.push(w); });
            }
            if (data.selectedWorld && unlockedWorlds.includes(data.selectedWorld)) selectedWorld = data.selectedWorld;
            if (data.highScore !== undefined && typeof highScore !== 'undefined' && data.highScore > highScore) {
                highScore = parseInt(data.highScore);
            }
            if (data.customEffectImg && !localStorage.getItem('nrCustomEffectImg')) {
                localStorage.setItem('nrCustomEffectImg', data.customEffectImg);
            }
        }
    } catch(e) {
        console.error("Saqlangan ma'lumotlarni yuklashda xatolik:", e);
    }
}

// Boshlang'ich ma'lumotlarni yuklash
loadAllSaveData();

// Maxsus rasm yuklash holati
let customEffectImg = new Image();
let customEffectImgLoaded = false;

function loadCustomEffectImage(src) {
    if (!src) return;
    customEffectImg = new Image();
    customEffectImg.onload = function() {
        customEffectImgLoaded = true;
    };
    customEffectImg.src = src;
}

const savedCustomImg = localStorage.getItem('nrCustomEffectImg');
if (savedCustomImg) {
    loadCustomEffectImage(savedCustomImg);
}

function saveShopData() {
    try {
        localStorage.setItem('nrWallet', wallet);
        localStorage.setItem('nrUnlocked', JSON.stringify(unlockedChars));
        localStorage.setItem('nrSelectedChar', selectedChar);
        localStorage.setItem('nrUnlockedFX', JSON.stringify(unlockedEffects));
        localStorage.setItem('nrSelectedFX', selectedEffect);
        localStorage.setItem('nrUnlockedPets', JSON.stringify(unlockedPets));
        localStorage.setItem('nrSelectedPet', selectedPet);
        localStorage.setItem('nrUnlockedWorlds', JSON.stringify(unlockedWorlds));
        localStorage.setItem('nrSelectedWorld', selectedWorld);
        if (typeof highScore !== 'undefined') {
            localStorage.setItem('neonRunnerHiScore', highScore);
        }

        // Zaxira saqlash (Atomic backup JSON payload)
        const backupPayload = {
            wallet,
            unlockedChars,
            selectedChar,
            unlockedEffects,
            selectedEffect,
            unlockedPets,
            selectedPet,
            unlockedWorlds,
            selectedWorld,
            highScore: typeof highScore !== 'undefined' ? highScore : 0,
            customEffectImg: localStorage.getItem('nrCustomEffectImg') || ''
        };
        localStorage.setItem('neonRunnerSaveData_v2', JSON.stringify(backupPayload));
    } catch(e) {
        console.error("Ma'lumotlarni saqlashda xatolik:", e);
    }
}

// Har 10 sekunda avtomatik saqlash (Auto-Save loop)
setInterval(saveShopData, 10000);

// Brauzer yopilganda yoki kompyuter o'chirilganda avtomatik saqlash
window.addEventListener('beforeunload', saveShopData);
window.addEventListener('pagehide', saveShopData);

function updateWalletUI() {
    walletText.textContent     = wallet;
    shopWalletText.textContent = wallet;
    const hudW = document.getElementById('hudWallet');
    if (hudW) hudW.textContent = wallet;
}

function buildShopUI() {
    const grid = document.getElementById('charGrid');
    grid.innerHTML = '';
    updateWalletUI();

    CHARACTERS.forEach(char => {
        const isUnlocked = unlockedChars.includes(char.id);
        const isSelected = selectedChar === char.id;

        const card = document.createElement('div');
        card.className = 'char-card' +
            (isUnlocked ? ' unlocked' : '') +
            (isSelected  ? ' selected'  : '');

        const miniCanvas = document.createElement('canvas');
        miniCanvas.width  = 80;
        miniCanvas.height = 80;
        setTimeout(() => char.drawPreview(miniCanvas), 100);
        card.appendChild(miniCanvas);

        const nameEl = document.createElement('div');
        nameEl.className = 'char-name';
        nameEl.textContent = char.name;
        card.appendChild(nameEl);

        const descEl = document.createElement('div');
        descEl.className = 'char-desc';
        descEl.textContent = char.desc || 'Sehrli qahramon';
        card.appendChild(descEl);

        const priceEl = document.createElement('div');
        priceEl.className = 'char-price';
        if (isSelected) {
            priceEl.innerHTML = '✓ TANLANGAN';
            priceEl.style.color = '#00ffff';
        } else if (isUnlocked) {
            priceEl.innerHTML = '✓ SOTIB OLINDI';
            priceEl.style.color = '#68d391';
        } else {
            priceEl.innerHTML = `🪙 ${char.price}`;
        }
        card.appendChild(priceEl);

        if (!isUnlocked) {
            const lock = document.createElement('span');
            lock.className = 'lock-icon';
            lock.textContent = '🔒';
            card.appendChild(lock);
        }

        card.addEventListener('click', () => onCharCardClick(char, card));
        grid.appendChild(card);
    });
}

// Live Canvas Animatsiya do'kon previewlari uchun
let effectPreviewAnimId = null;
let effectPreviewCanvases = [];

function drawStarShape(cCtx, cx, cy, r) {
    cCtx.beginPath();
    cCtx.moveTo(cx, cy - r);
    cCtx.lineTo(cx + r * 0.3, cy - r * 0.3);
    cCtx.lineTo(cx + r, cy);
    cCtx.lineTo(cx + r * 0.3, cy + r * 0.3);
    cCtx.lineTo(cx, cy + r);
    cCtx.lineTo(cx - r * 0.3, cy + r * 0.3);
    cCtx.lineTo(cx - r, cy);
    cCtx.lineTo(cx - r * 0.3, cy - r * 0.3);
    cCtx.closePath();
    cCtx.fill();
}

function startEffectPreviews() {
    if (effectPreviewAnimId) cancelAnimationFrame(effectPreviewAnimId);

    function step() {
        const effectGrid = document.getElementById('effectGrid');
        if (!effectGrid || effectGrid.classList.contains('hidden')) return;

        effectPreviewCanvases.forEach(item => {
            const cCtx = item.ctx;
            const fx = item.fx;
            cCtx.clearRect(0, 0, 80, 80);

            // Markaziy Emoji
            cCtx.font = '22px sans-serif';
            cCtx.textAlign = 'center';
            cCtx.textBaseline = 'middle';
            cCtx.globalAlpha = 0.45;
            cCtx.fillText(fx.emoji, 40, 40);
            cCtx.globalAlpha = 1.0;

            // Uchqun zarralari tug'ilishi
            if (Math.random() < 0.45) {
                if (fx.id === 'custom' && customEffectImgLoaded) {
                    item.particles.push({
                        type: 'image',
                        x: 40 + (Math.random() - 0.5) * 20,
                        y: 52,
                        vx: (Math.random() - 0.5) * 1.2,
                        vy: -Math.random() * 1.8 - 0.5,
                        life: 1.0,
                        size: 20
                    });
                } else if (fx.id === 'fire') {
                    item.particles.push({
                        type: 'fire',
                        x: 40 + (Math.random() - 0.5) * 16,
                        y: 56,
                        vx: (Math.random() - 0.5) * 1,
                        vy: -Math.random() * 2 - 1,
                        life: 1.0,
                        size: Math.random() * 5 + 3
                    });
                } else if (fx.id === 'ice') {
                    const col = fx.colors[Math.floor(Math.random() * fx.colors.length)];
                    item.particles.push({
                        type: 'ice',
                        x: 40 + (Math.random() - 0.5) * 24,
                        y: 58,
                        vx: (Math.random() - 0.5) * 1.2,
                        vy: -Math.random() * 1.5 - 0.5,
                        life: 1.0,
                        color: col,
                        size: Math.random() * 4 + 2
                    });
                } else if (fx.id === 'gold' || fx.id === 'rainbow') {
                    const col = fx.colors[Math.floor(Math.random() * fx.colors.length)];
                    item.particles.push({
                        type: 'star',
                        x: 40 + (Math.random() - 0.5) * 28,
                        y: 58,
                        vx: (Math.random() - 0.5) * 1.5,
                        vy: -Math.random() * 1.8 - 0.5,
                        life: 1.0,
                        color: col,
                        size: Math.random() * 5 + 3
                    });
                } else if (fx.id === 'shadow') {
                    const col = fx.colors[Math.floor(Math.random() * fx.colors.length)];
                    item.particles.push({
                        type: 'shadow',
                        x: 40 + (Math.random() - 0.5) * 15,
                        y: 50,
                        vx: (Math.random() - 0.5) * 1,
                        vy: -Math.random() * 1.2 - 0.3,
                        life: 1.0,
                        color: col,
                        size: Math.random() * 6 + 3
                    });
                } else if (fx.id === 'lightning') {
                    item.particles.push({
                        type: 'ice',
                        x: 40 + (Math.random() - 0.5) * 26,
                        y: 40 + (Math.random() - 0.5) * 26,
                        vx: (Math.random() - 0.5) * 3,
                        vy: (Math.random() - 0.5) * 3,
                        life: 0.6,
                        color: Math.random() > 0.5 ? '#00ffff' : '#ffffff',
                        size: Math.random() * 4 + 2
                    });
                }
            }

            // Zarralarni chizish
            for (let pIdx = 0; pIdx < item.particles.length; pIdx++) {
                const p = item.particles[pIdx];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.04;

                if (p.life <= 0) {
                    item.particles.splice(pIdx, 1);
                    pIdx--;
                    continue;
                }

                cCtx.save();
                cCtx.globalAlpha = Math.max(0, p.life);

                if (p.type === 'image' && customEffectImgLoaded) {
                    const sz = (p.size || 16) * p.life;
                    cCtx.drawImage(customEffectImg, p.x - sz / 2, p.y - sz / 2, sz, sz);
                } else if (p.type === 'fire') {
                    let c = '#ffff00';
                    if (p.life < 0.3) c = '#ff2200';
                    else if (p.life < 0.6) c = '#ff7700';
                    cCtx.fillStyle = c;
                    cCtx.shadowColor = c;
                    cCtx.shadowBlur = 8;
                    cCtx.beginPath();
                    cCtx.arc(p.x, p.y, Math.max(1, p.size * p.life), 0, Math.PI * 2);
                    cCtx.fill();
                } else if (p.type === 'star') {
                    cCtx.fillStyle = p.color;
                    cCtx.shadowColor = p.color;
                    cCtx.shadowBlur = 6;
                    drawStarShape(cCtx, p.x, p.y, Math.max(2, p.size * p.life));
                } else if (p.type === 'shadow') {
                    cCtx.fillStyle = p.color;
                    cCtx.shadowColor = '#aa00ff';
                    cCtx.shadowBlur = 8;
                    cCtx.beginPath();
                    cCtx.arc(p.x, p.y, Math.max(2, p.size * (1.4 - p.life * 0.4)), 0, Math.PI * 2);
                    cCtx.fill();
                } else {
                    cCtx.fillStyle = p.color || '#0ff';
                    cCtx.beginPath();
                    cCtx.rect(p.x - 2, p.y - 2, 4, 4);
                    cCtx.fill();
                }

                cCtx.restore();
            }
        });

        effectPreviewAnimId = requestAnimationFrame(step);
    }

    effectPreviewAnimId = requestAnimationFrame(step);
}

function buildEffectGrid() {
    const grid = document.getElementById('effectGrid');
    grid.innerHTML = '';
    updateWalletUI();

    effectPreviewCanvases = [];

    TRAIL_EFFECTS.forEach(fx => {
        const isUnlocked = unlockedEffects.includes(fx.id);
        const isSelected = selectedEffect === fx.id;

        const card = document.createElement('div');
        card.className = 'char-card' +
            (isUnlocked ? ' unlocked' : '') +
            (isSelected  ? ' selected'  : '');

        const selColor  = fx.colors.length ? fx.colors[0] : '#0ff';

        // Live Animatsiyali Canvas
        const miniCanvas = document.createElement('canvas');
        miniCanvas.width  = 80;
        miniCanvas.height = 80;
        card.appendChild(miniCanvas);

        effectPreviewCanvases.push({
            fx: fx,
            canvas: miniCanvas,
            ctx: miniCanvas.getContext('2d'),
            particles: []
        });

        const nameEl = document.createElement('div');
        nameEl.className = 'char-name';
        nameEl.textContent = fx.name;
        card.appendChild(nameEl);

        const descEl = document.createElement('div');
        descEl.className = 'char-desc';
        descEl.textContent = fx.desc;
        card.appendChild(descEl);

        const priceEl = document.createElement('div');
        priceEl.className = 'char-price';
        if (isSelected) {
            priceEl.innerHTML = '✓ TANLANGAN';
            priceEl.style.color = selColor;
        } else if (isUnlocked) {
            priceEl.innerHTML = '✓ SOTIB OLINDI';
            priceEl.style.color = '#68d391';
        } else {
            priceEl.innerHTML = fx.price === 0 ? 'BEPUL' : `🪙 ${fx.price}`;
        }
        card.appendChild(priceEl);

        if (!isUnlocked && fx.price > 0) {
            const lock = document.createElement('span');
            lock.className = 'lock-icon';
            lock.textContent = '🔒';
            card.appendChild(lock);
        }

        card.addEventListener('click', () => onEffectCardClick(fx));
        grid.appendChild(card);
    });

    startEffectPreviews();
}

// ============================================================
// O'YIN ICHIDAGI MAXSUS MODAL DIALOGLAR (IN-GAME POPUPS)
// ============================================================
const gameModal      = document.getElementById('gameModal');
const modalIcon      = document.getElementById('modalIcon');
const modalTitle     = document.getElementById('modalTitle');
const modalMessage   = document.getElementById('modalMessage');
const modalOkBtn     = document.getElementById('modalOkBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');

function showGameAlert(message, title = 'OGOHLANTIRISH', icon = '⚠️') {
    return new Promise((resolve) => {
        if (!gameModal) { resolve(true); return; }
        modalIcon.textContent    = icon;
        modalTitle.textContent   = title;
        modalMessage.innerHTML   = message;
        modalOkBtn.textContent   = 'TUSHUNDIM';
        modalCancelBtn.classList.add('hidden');
        gameModal.classList.remove('hidden');

        const handleOk = () => {
            gameModal.classList.add('hidden');
            modalOkBtn.removeEventListener('click', handleOk);
            resolve(true);
        };
        modalOkBtn.addEventListener('click', handleOk);
    });
}

function showGameConfirm(message, title = 'TASDIQLASH', icon = '🛒') {
    return new Promise((resolve) => {
        if (!gameModal) { resolve(false); return; }
        modalIcon.textContent    = icon;
        modalTitle.textContent   = title;
        modalMessage.innerHTML   = message;
        modalOkBtn.textContent   = 'HA, SOTIB OLISH';
        modalCancelBtn.textContent = 'BEKOR QILISH';
        modalCancelBtn.classList.remove('hidden');
        gameModal.classList.remove('hidden');

        const handleOk = () => {
            gameModal.classList.add('hidden');
            cleanup();
            resolve(true);
        };

        const handleCancel = () => {
            gameModal.classList.add('hidden');
            cleanup();
            resolve(false);
        };

        function cleanup() {
            modalOkBtn.removeEventListener('click', handleOk);
            modalCancelBtn.removeEventListener('click', handleCancel);
        }

        modalOkBtn.addEventListener('click', handleOk);
        modalCancelBtn.addEventListener('click', handleCancel);
    });
}

async function onCharCardClick(char) {
    const isUnlocked = unlockedChars.includes(char.id);
    if (isUnlocked) {
        selectedChar = char.id;
        saveShopData();
        buildShopUI();
    } else {
        if (wallet >= char.price) {
            const confirmed = await showGameConfirm(
                `<b>${char.name}</b> qahramonini <span style="color:#ff0;">🪙 ${char.price}</span> tanga evaziga sotib olasizmi?`,
                'SOTIB OLISH',
                '👤'
            );
            if (confirmed) {
                wallet -= char.price;
                unlockedChars.push(char.id);
                selectedChar = char.id;
                saveShopData();
                buildShopUI();
            }
        } else {
            showGameAlert(
                `Yetarli tanga yo'q!<br>Sizda: <span style="color:#ff0;">🪙 ${wallet}</span> bor.<br>Kerak: <span style="color:#ff0;">🪙 ${char.price}</span>.`,
                'TANGA YETARLI EMAS',
                '🪙'
            );
        }
    }
}

async function onEffectCardClick(fx) {
    if (fx.id === 'custom' && !customEffectImgLoaded) {
        document.getElementById('customEffectFileInput').click();
        return;
    }
    const isUnlocked = unlockedEffects.includes(fx.id);
    if (isUnlocked) {
        selectedEffect = fx.id;
        saveShopData();
        buildEffectGrid();
    } else if (fx.price === 0) {
        unlockedEffects.push(fx.id);
        selectedEffect = fx.id;
        saveShopData();
        buildEffectGrid();
    } else {
        if (wallet >= fx.price) {
            const confirmed = await showGameConfirm(
                `<b>${fx.name}</b> effektini <span style="color:#ff0;">🪙 ${fx.price}</span> tanga evaziga sotib olasizmi?`,
                'EFFEKTNI SOTIB OLISH',
                fx.emoji || '✨'
            );
            if (confirmed) {
                wallet -= fx.price;
                unlockedEffects.push(fx.id);
                selectedEffect = fx.id;
                saveShopData();
                buildEffectGrid();
            }
        } else {
            showGameAlert(
                `Yetarli tanga yo'q!<br>Sizda: <span style="color:#ff0;">🪙 ${wallet}</span> bor.<br>Kerak: <span style="color:#ff0;">🪙 ${fx.price}</span>.`,
                'TANGA YETARLI EMAS',
                '🪙'
            );
        }
    }
}

function buildPetGrid() {
    const grid = document.getElementById('petGrid');
    if (!grid) return;
    grid.innerHTML = '';
    updateWalletUI();

    PETS.forEach(pet => {
        const isUnlocked = unlockedPets.includes(pet.id);
        const isSelected = selectedPet === pet.id;

        const card = document.createElement('div');
        card.className = 'char-card' +
            (isUnlocked ? ' unlocked' : '') +
            (isSelected  ? ' selected'  : '');

        const emojiEl = document.createElement('div');
        emojiEl.style.cssText = 'font-size:36px; height:50px; line-height:50px; text-align:center; margin-bottom:4px;';
        emojiEl.textContent = pet.emoji;
        card.appendChild(emojiEl);

        const nameEl = document.createElement('div');
        nameEl.className = 'char-name';
        nameEl.textContent = pet.name;
        card.appendChild(nameEl);

        const descEl = document.createElement('div');
        descEl.className = 'char-desc';
        descEl.textContent = pet.desc;
        card.appendChild(descEl);

        const buffEl = document.createElement('div');
        buffEl.style.cssText = 'font-size:6.5px; color:#63b3ed; font-weight:bold; margin-bottom:4px; text-shadow:1px 1px 0 #000;';
        buffEl.textContent = pet.buff;
        card.appendChild(buffEl);

        const priceEl = document.createElement('div');
        priceEl.className = 'char-price';
        if (isSelected) {
            priceEl.innerHTML = '✓ TANLANGAN';
            priceEl.style.color = '#00ffff';
        } else if (isUnlocked) {
            priceEl.innerHTML = '✓ SOTIB OLINDI';
            priceEl.style.color = '#68d391';
        } else {
            priceEl.innerHTML = pet.price === 0 ? 'BEPUL' : `🪙 ${pet.price}`;
        }
        card.appendChild(priceEl);

        if (!isUnlocked && pet.price > 0) {
            const lock = document.createElement('span');
            lock.className = 'lock-icon';
            lock.textContent = '🔒';
            card.appendChild(lock);
        }

        card.addEventListener('click', () => onPetCardClick(pet));
        grid.appendChild(card);
    });
}

function buildWorldGrid() {
    const grid = document.getElementById('worldGrid');
    if (!grid) return;
    grid.innerHTML = '';
    updateWalletUI();

    WORLDS.forEach(world => {
        const isUnlocked = unlockedWorlds.includes(world.id);
        const isSelected = selectedWorld === world.id;

        const card = document.createElement('div');
        card.className = 'char-card' +
            (isUnlocked ? ' unlocked' : '') +
            (isSelected  ? ' selected'  : '');

        const emojiEl = document.createElement('div');
        emojiEl.style.cssText = 'font-size:36px; height:50px; line-height:50px; text-align:center; margin-bottom:4px;';
        emojiEl.textContent = world.emoji;
        card.appendChild(emojiEl);

        const nameEl = document.createElement('div');
        nameEl.className = 'char-name';
        nameEl.textContent = world.name;
        card.appendChild(nameEl);

        const descEl = document.createElement('div');
        descEl.className = 'char-desc';
        descEl.textContent = world.desc;
        card.appendChild(descEl);

        const priceEl = document.createElement('div');
        priceEl.className = 'char-price';
        if (isSelected) {
            priceEl.innerHTML = '✓ TANLANGAN';
            priceEl.style.color = '#00ffff';
        } else if (isUnlocked) {
            priceEl.innerHTML = '✓ SOTIB OLINDI';
            priceEl.style.color = '#68d391';
        } else {
            priceEl.innerHTML = world.price === 0 ? 'BEPUL' : `🪙 ${world.price}`;
        }
        card.appendChild(priceEl);

        if (!isUnlocked && world.price > 0) {
            const lock = document.createElement('span');
            lock.className = 'lock-icon';
            lock.textContent = '🔒';
            card.appendChild(lock);
        }

        card.addEventListener('click', () => onWorldCardClick(world));
        grid.appendChild(card);
    });
}

async function onPetCardClick(pet) {
    const isUnlocked = unlockedPets.includes(pet.id);
    if (isUnlocked) {
        selectedPet = pet.id;
        saveShopData();
        buildPetGrid();
    } else if (pet.price === 0) {
        unlockedPets.push(pet.id);
        selectedPet = pet.id;
        saveShopData();
        buildPetGrid();
    } else {
        if (wallet >= pet.price) {
            const confirmed = await showGameConfirm(
                `<b>${pet.name}</b> hamrohini <span style="color:#ff0;">🪙 ${pet.price}</span> tanga evaziga sotib olasizmi?`,
                'HAMROHNI SOTIB OLISH',
                pet.emoji || '🐾'
            );
            if (confirmed) {
                wallet -= pet.price;
                unlockedPets.push(pet.id);
                selectedPet = pet.id;
                saveShopData();
                buildPetGrid();
            }
        } else {
            showGameAlert(
                `Yetarli tanga yo'q!<br>Sizda: <span style="color:#ff0;">🪙 ${wallet}</span> bor.<br>Kerak: <span style="color:#ff0;">🪙 ${pet.price}</span>.`,
                'TANGA YETARLI EMAS',
                '🪙'
            );
        }
    }
}

async function onWorldCardClick(world) {
    const isUnlocked = unlockedWorlds.includes(world.id);
    if (isUnlocked) {
        selectedWorld = world.id;
        saveShopData();
        buildWorldGrid();
    } else if (world.price === 0) {
        unlockedWorlds.push(world.id);
        selectedWorld = world.id;
        saveShopData();
        buildWorldGrid();
    } else {
        if (wallet >= world.price) {
            const confirmed = await showGameConfirm(
                `<b>${world.name}</b> dunyosini <span style="color:#ff0;">🪙 ${world.price}</span> tanga evaziga sotib olasizmi?`,
                'DUNYONI SOTIB OLISH',
                world.emoji || '🌍'
            );
            if (confirmed) {
                wallet -= world.price;
                unlockedWorlds.push(world.id);
                selectedWorld = world.id;
                saveShopData();
                buildWorldGrid();
            }
        } else {
            showGameAlert(
                `Yetarli tanga yo'q!<br>Sizda: <span style="color:#ff0;">🪙 ${wallet}</span> bor.<br>Kerak: <span style="color:#ff0;">🪙 ${world.price}</span>.`,
                'TANGA YETARLI EMAS',
                '🪙'
            );
        }
    }
}

// Tab switching & Custom file upload listener
const shopTabChars   = document.getElementById('shopTabChars');
const shopTabEffects = document.getElementById('shopTabEffects');
const shopTabPets    = document.getElementById('shopTabPets');
const shopTabWorlds  = document.getElementById('shopTabWorlds');
const uploadEffectBtn = document.getElementById('uploadEffectBtn');
const customEffectFileInput = document.getElementById('customEffectFileInput');

if (uploadEffectBtn && customEffectFileInput) {
    uploadEffectBtn.addEventListener('click', () => {
        customEffectFileInput.click();
    });

    customEffectFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async function(evt) {
                const base64Img = evt.target.result;
                localStorage.setItem('nrCustomEffectImg', base64Img);
                loadCustomEffectImage(base64Img);
                if (!unlockedEffects.includes('custom')) {
                    unlockedEffects.push('custom');
                }
                selectedEffect = 'custom';
                saveShopData();
                buildEffectGrid();
                await showGameAlert("📁 Maxsus rasm effekti muvaffaqiyatli yuklandi!", "MUVAFFAQIYATLI", "✅");
            };
            reader.readAsDataURL(file);
        }
    });
}

function hideAllShopGrids() {
    document.getElementById('charGrid')?.classList.add('hidden');
    document.getElementById('effectGrid')?.classList.add('hidden');
    document.getElementById('petGrid')?.classList.add('hidden');
    document.getElementById('worldGrid')?.classList.add('hidden');
    document.getElementById('customEffectBox')?.classList.add('hidden');
    if (shopTabChars)   shopTabChars.style.opacity   = '0.6';
    if (shopTabEffects) shopTabEffects.style.opacity = '0.6';
    if (shopTabPets)    shopTabPets.style.opacity    = '0.6';
    if (shopTabWorlds)  shopTabWorlds.style.opacity  = '0.6';
}

if (shopTabChars) {
    shopTabChars.addEventListener('click', () => {
        hideAllShopGrids();
        document.getElementById('charGrid').classList.remove('hidden');
        shopTabChars.style.opacity = '1';
    });
}
if (shopTabEffects) {
    shopTabEffects.addEventListener('click', () => {
        hideAllShopGrids();
        document.getElementById('effectGrid').classList.remove('hidden');
        document.getElementById('customEffectBox').classList.remove('hidden');
        buildEffectGrid();
        shopTabEffects.style.opacity = '1';
    });
}
if (shopTabPets) {
    shopTabPets.addEventListener('click', () => {
        hideAllShopGrids();
        document.getElementById('petGrid').classList.remove('hidden');
        buildPetGrid();
        shopTabPets.style.opacity = '1';
    });
}
if (shopTabWorlds) {
    shopTabWorlds.addEventListener('click', () => {
        hideAllShopGrids();
        document.getElementById('worldGrid').classList.remove('hidden');
        buildWorldGrid();
        shopTabWorlds.style.opacity = '1';
    });
}

// Do'kon qaysi ekrandan ochilganini eslab qolamiz (ORQAGA bosganda o'sha ekranga qaytadi)
let shopReturnScreen = null;

function openShop(fromGameOver = false) {
    buildShopUI();
    hideAllShopGrids();
    document.getElementById('charGrid').classList.remove('hidden');
    if (shopTabChars) shopTabChars.style.opacity = '1';
    if (fromGameOver) {
        shopReturnScreen = gameOverScreen;
        gameOverScreen.classList.add('hidden');
    } else {
        shopReturnScreen = startScreen;
        startScreen.classList.add('hidden');
    }
    shopScreen.classList.remove('hidden');
}

function closeShop() {
    shopScreen.classList.add('hidden');
    const back = shopReturnScreen || startScreen;
    shopReturnScreen = null;
    back.classList.remove('hidden');
    updateWalletUI();
}

// ============================================================
// 7. CANVAS O'LCHAMLARI
// ============================================================
let canvasWidth  = 960;
let canvasHeight = 540;
function resizeCanvas() {
    canvasWidth  = canvas.clientWidth  || window.innerWidth;
    canvasHeight = canvas.clientHeight || window.innerHeight;
    canvas.width  = canvasWidth;
    canvas.height = canvasHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ============================================================
// 8. O'YIN O'ZGARUVCHILARI
// ============================================================
let frames = 0, score = 0, coins = 0, gameSpeed = 6;
let isPlaying = false, isPaused = false, hasReached500 = false, animationId;
let obstacleTimer = 100, coinTimer = 50;
// highScore yuqorida (save tizimidan oldin) e'lon qilingan.
hiScoreText.innerText = highScore;
updateWalletUI();

// ============================================================
// 9. QAHRAMON OBYEKTI
// ============================================================
const player = {
    x: 80, y: 150,
    width: 40, height: 60,
    dy: 0, jumpForce: 17, gravity: 0.6,
    grounded: false,
    wasGrounded: true,
    animFrame: 0, animTimer: 0, state: 'idle',

    getCharDef() {
        return CHARACTERS.find(c => c.id === selectedChar) || CHARACTERS[0];
    },

    updateAnim() {
        this.animTimer++;
        if (this.animTimer > 4) {
            this.animFrame = (this.animFrame + 1) % 10;
            if (this.state === 'dead') this.animFrame = Math.min(this.animFrame, 9);
            this.animTimer = 0;
        }
    },

    draw() {
        ctx.save();
        if (!isPlaying && score > 0) this.state = 'dead';
        else if (!isPlaying)         this.state = 'idle';
        else if (!this.grounded)     this.state = 'jump';
        else                         this.state = 'run';

        if (isPlaying || this.state === 'dead') this.updateAnim();

        // Tezlik oqim chiziqlari (Speed motion lines)
        if (isPlaying) {
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.lineWidth = 1.5;
            const t = frames * 0.4;
            ctx.beginPath();
            ctx.moveTo(this.x - 10, this.y + 25 + Math.sin(t) * 4);
            ctx.lineTo(this.x - 30 - gameSpeed * 2, this.y + 25 + Math.sin(t) * 4);
            ctx.moveTo(this.x - 5, this.y + 45 + Math.cos(t) * 4);
            ctx.lineTo(this.x - 22 - gameSpeed * 2, this.y + 45 + Math.cos(t) * 4);
            ctx.stroke();
            ctx.restore();
        }

        this.getCharDef().drawInGame(ctx, this.x, this.y, this.animFrame, this.state);

        // Tanlangan Pet/Hamrohni chizish
        if (selectedPet !== 'none' && isPlaying) {
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (selectedPet === 'eagle') {
                // Burgut - player ustida uchadi
                const px = this.x + this.width / 2;
                const py = this.y - 45 + Math.sin(frames * 0.12) * 10;
                ctx.font = '32px sans-serif';
                ctx.shadowColor = '#ffff00';
                ctx.shadowBlur = 15;
                ctx.fillText('🦅', px, py);
                // Auto-magnit: tangalarni tortish
                for (let i = 0; i < coinsArray.length; i++) {
                    const coin = coinsArray[i];
                    const cdx = (this.x + this.width / 2) - coin.x;
                    const cdy = (this.y + this.height / 2) - coin.y;
                    const dist = Math.sqrt(cdx * cdx + cdy * cdy);
                    if (dist < 200) {
                        coin.x += cdx * 0.09;
                        coin.y += cdy * 0.09;
                    }
                }
            } else if (selectedPet === 'wolf') {
                // Bo'ri - yerda yonida yuguradi
                const px = this.x - 45;
                const py = canvasHeight - 40 - 16;
                ctx.font = '32px sans-serif';
                ctx.shadowColor = '#aa88ff';
                ctx.shadowBlur = 18;
                ctx.fillText('🐺', px, py);
                // +50% score glow chizig'i
                ctx.strokeStyle = 'rgba(170,136,255,0.3)';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(this.x, this.y + this.height / 2);
                ctx.lineTo(px, py);
                ctx.stroke();
                ctx.setLineDash([]);
            } else if (selectedPet === 'dragon') {
                // Mini Ajdarho - player yonida uchadi
                const px = this.x - 50;
                const py = this.y - 20 + Math.sin(frames * 0.1) * 8;
                ctx.shadowColor = '#ff4400';
                ctx.shadowBlur = 20;
                const drawn = drawLugiaSprite(ctx, px, py, 70, 70, Math.floor(frames / 4), true);
                if (!drawn) {
                    ctx.font = '32px sans-serif';
                    ctx.fillText('🐲', px + 35, py + 35);
                }
                // Qalqon rangi
                if (petShieldActive) {
                    ctx.strokeStyle = 'rgba(0,255,255,0.4)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 38, 0, Math.PI * 2);
                    ctx.stroke();
                }
            } else if (selectedPet === 'bunny') {
                // Quyon - yerda sakraydi
                const px = this.x + this.width + 10;
                const bounce = Math.abs(Math.sin(frames * 0.22)) * 22;
                const py = canvasHeight - 40 - 16 - bounce;
                ctx.font = '32px sans-serif';
                ctx.shadowColor = '#ffd700';
                ctx.shadowBlur = 16;
                ctx.fillText('🐇', px, py);
            }
            ctx.restore();
        }

        ctx.restore();
    },

    update() {
        this.dy += this.gravity;
        this.y  += this.dy;
        const groundY = canvasHeight - 40;

        if (this.y + this.height >= groundY) {
            this.y = groundY - this.height;
            this.dy = 0;
            if (!this.grounded && !this.wasGrounded && isPlaying) {
                this.spawnLandingEffect();
            }
            this.grounded = true;
        } else {
            this.grounded = false;
        }
        this.wasGrounded = this.grounded;

        if (isPlaying) {
            this.spawnTrailEffects();
        }

        this.draw();
    },

    jump() {
        if (this.grounded) {
            this.dy = -this.jumpForce;
            this.grounded = false;
            this.spawnJumpEffect();
            initAudio();
            playJumpSound();
        }
    },

    spawnJumpEffect() {
        const charDef = this.getCharDef();
        const color = charDef.color || '#00ffff';
        const px = this.x + this.width / 2;
        const py = canvasHeight - 40;
        for (let i = 0; i < 12; i++) {
            const angle = Math.PI + (Math.random() - 0.5) * 1.6;
            const spd = Math.random() * 5 + 2;
            particles.push({
                x: px, y: py,
                vx: Math.cos(angle) * spd - gameSpeed * 0.2,
                vy: Math.sin(angle) * spd,
                life: 1.0,
                color: Math.random() > 0.4 ? color : '#ffffff',
                size: Math.random() * 5 + 2.5,
                isSparkle: Math.random() > 0.3
            });
        }
    },

    spawnLandingEffect() {
        const px = this.x + this.width / 2;
        const py = canvasHeight - 40;
        const season = seasonsList[currentSeasonIdx];
        const dustColor = season === 'winter' ? '#ffffff' : (season === 'autumn' ? '#c8a882' : '#77cc77');
        for (let i = 0; i < 10; i++) {
            const vx = (Math.random() - 0.5) * 7 - 2;
            particles.push({
                x: px, y: py - 2,
                vx: vx,
                vy: -Math.random() * 2.5 - 0.5,
                life: 0.7,
                color: dustColor,
                size: Math.random() * 6 + 2.5
            });
        }
    },

    spawnTrailEffects() {
        const charDef = this.getCharDef();
        const charColor = charDef.color || '#00ffff';
        const season = seasonsList[currentSeasonIdx];

        // 1. Erdan chang/qor to'zishi (doim)
        if (this.grounded && frames % 3 === 0) {
            const dustColor = season === 'winter' ? 'rgba(255,255,255,0.7)' :
                             (season === 'autumn' ? 'rgba(180,140,90,0.6)' :
                             (season === 'spring' ? 'rgba(100,200,100,0.6)' : 'rgba(220,200,150,0.6)'));
            particles.push({
                x: this.x + 5,
                y: this.y + this.height - 2,
                vx: -Math.random() * 3 - 1,
                vy: -Math.random() * 1.5,
                life: 0.6,
                color: dustColor,
                size: Math.random() * 4 + 2
            });
        }

        // 2. Tanlangan Trail Effekti
        const fxDef = TRAIL_EFFECTS.find(f => f.id === selectedEffect) || TRAIL_EFFECTS[0];

        if (fxDef.id === 'custom' && customEffectImgLoaded) {
            if (frames % 2 === 0) {
                particles.push({
                    type: 'image',
                    x: this.x + Math.random() * 10,
                    y: this.y + 10 + Math.random() * 40,
                    vx: -Math.random() * 2 - gameSpeed * 0.3,
                    vy: (Math.random() - 0.5) * 1.5,
                    life: 0.8,
                    size: 24,
                    rot: (Math.random() - 0.5) * 0.5,
                    color: '#ffd700'
                });
            }
        } else if (fxDef.id === 'fire') {
            if (frames % 1 === 0) {
                particles.push({
                    type: 'fire',
                    x: this.x + Math.random() * 15,
                    y: this.y + 20 + Math.random() * 35,
                    vx: -Math.random() * 2 - 1,
                    vy: -Math.random() * 2 - 0.5,
                    life: 0.8,
                    size: Math.random() * 6 + 4
                });
            }
        } else if (fxDef.id === 'ice') {
            if (frames % 2 === 0) {
                const col = fxDef.colors[Math.floor(Math.random() * fxDef.colors.length)];
                particles.push({
                    type: 'ice',
                    x: this.x + Math.random() * 15,
                    y: this.y + 10 + Math.random() * 45,
                    vx: -Math.random() * 3 - 1,
                    vy: (Math.random() - 0.5) * 1.5,
                    life: 0.7,
                    color: col,
                    size: Math.random() * 5 + 3
                });
            }
        } else if (fxDef.id === 'gold' || fxDef.id === 'rainbow') {
            if (frames % 2 === 0) {
                const col = fxDef.colors[Math.floor(Math.random() * fxDef.colors.length)];
                particles.push({
                    type: 'star',
                    x: this.x + Math.random() * 20,
                    y: this.y + 5 + Math.random() * 50,
                    vx: -Math.random() * 3 - gameSpeed * 0.2,
                    vy: (Math.random() - 0.5) * 2,
                    life: 0.8,
                    color: col,
                    size: Math.random() * 6 + 3
                });
            }
        } else if (fxDef.id === 'shadow') {
            if (frames % 2 === 0) {
                const col = fxDef.colors[Math.floor(Math.random() * fxDef.colors.length)];
                particles.push({
                    type: 'shadow',
                    x: this.x + Math.random() * 15,
                    y: this.y + 15 + Math.random() * 35,
                    vx: -Math.random() * 2 - 0.5,
                    vy: -Math.random() * 1.5,
                    life: 0.7,
                    color: col,
                    size: Math.random() * 8 + 4
                });
            }
        } else if (fxDef.id === 'lightning') {
            if (frames % 2 === 0) {
                particles.push({
                    type: 'ice',
                    x: this.x + Math.random() * 20,
                    y: this.y + Math.random() * 50,
                    vx: -Math.random() * 4 - 2,
                    vy: (Math.random() - 0.5) * 4,
                    life: 0.5,
                    color: Math.random() > 0.5 ? '#00ffff' : '#ffffff',
                    size: Math.random() * 6 + 2,
                    glowColor: '#00ffff'
                });
            }
        } else {
            // Oddiy iz
            if (frames % 2 === 0) {
                particles.push({
                    x: this.x + Math.random() * 15,
                    y: this.y + 10 + Math.random() * 40,
                    vx: -Math.random() * 2 - gameSpeed * 0.2,
                    vy: (Math.random() - 0.5) * 1.5,
                    life: 0.7,
                    color: Math.random() > 0.4 ? charColor : '#ffffff',
                    size: Math.random() * 4.5 + 1.5,
                    isSparkle: true
                });
            }
        }
    }
};

// ============================================================
// 10. TO'SIQLAR VA TANGALAR
// ============================================================
let obstacles  = [];
let coinsArray = [];
let chestArray = [];
let chestTimer = 400; // Kesiy birinchi marta 400 frame'dan keyin chiqadi

class Obstacle {
    constructor() {
        const numPosts  = Math.floor(Math.random() * 2) + 2;
        this.numPosts = numPosts;
        this.postW    = 16;
        this.gap      = 6;
        this.width    = numPosts * (this.postW + this.gap) - this.gap;
        this.height   = Math.random() * 20 + 65;
        this.x        = canvasWidth;
        this.y        = canvasHeight - 40 - this.height;
    }

    draw() {
        const { x, y, height: h, postW: pw, gap, numPosts } = this;
        for (let i = 0; i < numPosts; i++) {
            const px = x + i * (pw + gap);
            // Soya
            ctx.fillStyle = '#1a0a00';
            ctx.fillRect(px + 3, y + 3, pw, h);
            // Tana
            const g = ctx.createLinearGradient(px, 0, px + pw, 0);
            g.addColorStop(0, '#6b3a1f'); g.addColorStop(0.4, '#a0521a'); g.addColorStop(1, '#4a2008');
            ctx.fillStyle = g;
            ctx.fillRect(px, y + 18, pw, h - 18);
            // Uch (nayza)
            ctx.fillStyle = '#5c2e0a';
            ctx.beginPath();
            ctx.moveTo(px + pw / 2, y);
            ctx.lineTo(px, y + 18);
            ctx.lineTo(px + pw, y + 18);
            ctx.closePath();
            ctx.fill();
            // Uch yaltirashi
            ctx.fillStyle = '#c8762a';
            ctx.beginPath();
            ctx.moveTo(px + pw / 2, y + 2);
            ctx.lineTo(px + 3, y + 18);
            ctx.lineTo(px + pw / 2 + 2, y + 18);
            ctx.closePath();
            ctx.fill();
        }
        // Ko'ndalang taxtalar
        const totalW = this.width;
        [y + h * 0.35, y + h * 0.65].forEach(by => {
            ctx.fillStyle = 'rgba(0,0,0,0.35)';
            ctx.fillRect(x + 2, by + 2, totalW, 9);
            const bg = ctx.createLinearGradient(0, by, 0, by + 9);
            bg.addColorStop(0, '#8b4513'); bg.addColorStop(1, '#5c2e0a');
            ctx.fillStyle = bg;
            ctx.fillRect(x, by, totalW, 9);
        });
    }

    update() { this.x -= gameSpeed; this.draw(); }
}

class Coin {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.radius = 16;
        this.pulse  = Math.random() * Math.PI * 2;
    }

    draw() {
        this.pulse += 0.1;
        const scale = 1 + Math.sin(this.pulse) * 0.15;
        const size  = this.radius * 2 * scale;
        ctx.globalCompositeOperation = 'lighter';
        ctx.drawImage(coinImg, this.x - size, this.y - size, size * 2, size * 2);
        ctx.drawImage(coinImg, this.x - size, this.y - size, size * 2, size * 2);
        ctx.globalCompositeOperation = 'source-over';
    }

    update() { this.x -= gameSpeed; this.draw(); }
}

// ============================================================
// KESIY (SANDIQ) CLASSI — 3 xil: bronze, silver, gold
// ============================================================
const CHEST_TYPES = [
    { name: 'BRONZE',  coins: 3,  score: 150, color1: '#cd7f32', color2: '#a0522d', glow: '#ff8c00', chance: 0.60 },
    { name: 'SILVER',  coins: 8,  score: 400, color1: '#c0c0c0', color2: '#808080', glow: '#e0e0ff', chance: 0.30 },
    { name: 'GOLD',    coins: 20, score: 1000,color1: '#ffd700', color2: '#b8860b', glow: '#ffff00', chance: 0.10 },
];

function pickChestType() {
    const r = Math.random();
    if (r < 0.10) return CHEST_TYPES[2]; // Gold 10%
    if (r < 0.40) return CHEST_TYPES[1]; // Silver 30%
    return CHEST_TYPES[0];               // Bronze 60%
}

class Chest {
    constructor() {
        this.type   = pickChestType();
        this.w      = 44;
        this.h      = 36;
        this.x      = canvasWidth;
        this.y      = canvasHeight - 40 - this.h;
        this.pulse  = Math.random() * Math.PI * 2;
        this.bob    = 0;
    }

    draw() {
        this.pulse += 0.08;
        this.bob   = Math.sin(this.pulse) * 4;
        const { x, y, w, h, type } = this;
        const dy = y + this.bob;

        ctx.save();

        // Porlash (glow)
        ctx.shadowColor = type.glow;
        ctx.shadowBlur  = 18 + Math.sin(this.pulse) * 8;

        // Sandiq asosi
        const g = ctx.createLinearGradient(x, dy + 14, x, dy + h);
        g.addColorStop(0, type.color1);
        g.addColorStop(1, type.color2);
        ctx.fillStyle = g;
        ctx.fillRect(x, dy + 14, w, h - 14);

        // Sandiq qopqog'i
        const gTop = ctx.createLinearGradient(x, dy, x, dy + 16);
        gTop.addColorStop(0, type.color1);
        gTop.addColorStop(1, type.color2);
        ctx.fillStyle = gTop;
        ctx.fillRect(x - 2, dy, w + 4, 16);

        // Qulf (markazda)
        ctx.fillStyle = '#333';
        ctx.fillRect(x + w/2 - 5, dy + 10, 10, 10);
        ctx.fillStyle = type.glow;
        ctx.beginPath();
        ctx.arc(x + w/2, dy + 12, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Chiziqlar (taxta ko'rinishi)
        ctx.strokeStyle = 'rgba(0,0,0,0.4)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, dy + 14, w, h - 14);
        ctx.strokeRect(x - 2, dy, w + 4, 16);

        // Tashqaridagi yulduzlar (Gold uchun)
        if (type.name === 'GOLD') {
            ctx.fillStyle = '#fff700';
            ctx.font = '10px serif';
            ctx.fillText('★', x - 10, dy + 5);
            ctx.fillText('★', x + w + 2, dy + 20);
        }

        // Nom yorlig'i
        ctx.shadowBlur = 0;
        ctx.fillStyle  = type.glow;
        ctx.font       = 'bold 7px "Press Start 2P", monospace';
        ctx.textAlign  = 'center';
        ctx.fillText(type.name, x + w/2, dy - 6);
        ctx.textAlign = 'left';

        ctx.restore();
    }

    update() { this.x -= gameSpeed; this.draw(); }
}

// ============================================================
// ZARRACHALAR (PARTICLES) — yig'ilganda portlash effekti
// ============================================================
let particles = [];
function spawnParticles(x, y, color) {
    for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const speed = Math.random() * 5 + 2;
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 3,
            life: 1.0,
            color,
            size: Math.random() * 6 + 3
        });
    }
}
function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.type === 'fire') {
            p.vy -= 0.08; // Flames float upwards
            p.vx *= 0.96;
            p.life -= 0.04;
        } else if (p.type === 'ice') {
            p.vx *= 0.95;
            p.life -= 0.03;
        } else if (p.type === 'shadow') {
            p.vy -= 0.04;
            p.life -= 0.03;
        } else if (p.type === 'image') {
            p.vx *= 0.96;
            p.life -= 0.03;
        } else {
            p.vy   += p.isSparkle ? 0.04 : 0.15;
            p.life -= p.isSparkle ? 0.035 : 0.04;
        }

        if (p.life <= 0) { particles.splice(i, 1); i--; continue; }
        
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life));

        if (p.type === 'image' && customEffectImgLoaded) {
            const sz = (p.size || 20) * (0.6 + p.life * 0.4);
            ctx.shadowColor = p.color || '#ff0';
            ctx.shadowBlur = 8;
            ctx.translate(p.x, p.y);
            if (p.rot) ctx.rotate(p.rot);
            ctx.drawImage(customEffectImg, -sz / 2, -sz / 2, sz, sz);
        } else if (p.type === 'fire') {
            let c = '#ffff00';
            if (p.life < 0.3) c = '#ff2200';
            else if (p.life < 0.6) c = '#ff7700';
            ctx.fillStyle = c;
            ctx.shadowColor = c;
            ctx.shadowBlur = 12;
            const sz = Math.max(1, p.size * (0.5 + p.life * 0.8));
            ctx.beginPath();
            ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
            ctx.fill();
        } else if (p.type === 'star') {
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            const sz = Math.max(2, p.size * p.life);
            drawStarShape(ctx, p.x, p.y, sz);
        } else if (p.type === 'shadow') {
            ctx.fillStyle = p.color;
            ctx.shadowColor = '#aa00ff';
            ctx.shadowBlur = 12;
            const sz = Math.max(2, p.size * (1.5 - p.life * 0.5));
            ctx.beginPath();
            ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
            ctx.fill();
        } else if (p.type === 'ice') {
            ctx.fillStyle = p.color;
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 8;
            const sz = Math.max(1, p.size * p.life);
            ctx.beginPath();
            ctx.rect(p.x - sz/2, p.y - sz/2, sz, sz);
            ctx.fill();
        } else {
            ctx.fillStyle   = p.color;
            ctx.shadowColor = p.glowColor || p.color;
            ctx.shadowBlur  = p.isSparkle ? 10 : 4;
            ctx.beginPath();
            if (p.isSparkle) {
                const sz = Math.max(1, p.size * p.life);
                ctx.rect(p.x - sz/2, p.y - sz/2, sz, sz);
            } else {
                ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.life), 0, Math.PI * 2);
            }
            ctx.fill();
        }
        ctx.restore();
    }
}

// ============================================================
// EKRAN POPUP — "🪙+20" ko'rinishidagi matn
// ============================================================
let popups = [];
function spawnPopup(x, y, text, color) {
    popups.push({ x, y, text, color, life: 1.0, vy: -2 });
}
function updatePopups() {
    for (let i = 0; i < popups.length; i++) {
        const p = popups[i];
        p.y    += p.vy;
        p.life -= 0.022;
        if (p.life <= 0) { popups.splice(i, 1); i--; continue; }
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle   = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = 10;
        ctx.font        = 'bold 14px "Press Start 2P", monospace';
        ctx.textAlign   = 'center';
        ctx.fillText(p.text, p.x, p.y);
        ctx.textAlign   = 'left';
        ctx.restore();
    }
}

// ============================================================
// 11. YOMG'IR VA QOR ZARRACHALARI
// ============================================================
const weatherParticles = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    s: 5 + Math.random() * 15,
    w: Math.random() * 2
}));

function drawWeather(season) {
    if (season === 'autumn') {
        // Yomg'ir
        ctx.strokeStyle = 'rgba(200, 220, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        weatherParticles.forEach(p => {
            p.x -= p.s * 0.2;
            p.y += p.s;
            if (p.y > canvasHeight) { p.y = -20; p.x = Math.random() * (canvasWidth + 200); }
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - 3, p.y + p.s);
        });
        ctx.stroke();
    } else if (season === 'winter') {
        // Qor
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        weatherParticles.forEach(p => {
            p.x -= Math.random() * 1;
            p.y += p.s * 0.3;
            if (p.y > canvasHeight) { p.y = -10; p.x = Math.random() * canvasWidth; }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.w + 1, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

// ============================================================
// 12. FON VA DUNYOLAR
// ============================================================
let bgX = 0;
function drawBackground() {
    bgX -= gameSpeed * 0.3;
    if (bgX <= -canvasWidth) bgX = 0;
    
    const wDef = WORLDS.find(w => w.id === selectedWorld) || WORLDS[0];

    ctx.drawImage(bgImage, bgX, 0, canvasWidth, canvasHeight);
    ctx.drawImage(bgImage, bgX + canvasWidth, 0, canvasWidth, canvasHeight);
    
    if (wDef.id === 'volcano') {
        ctx.fillStyle = 'rgba(180, 30, 0, 0.25)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#ff6600';
        for (let i = 0; i < 6; i++) {
            ctx.fillRect(Math.random() * canvasWidth, Math.random() * canvasHeight, 2, 2);
        }
    } else if (wDef.id === 'castle') {
        ctx.fillStyle = 'rgba(40, 20, 80, 0.3)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    } else if (wDef.id === 'mystic') {
        ctx.fillStyle = 'rgba(0, 100, 150, 0.2)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    } else {
        const season = seasonsList[currentSeasonIdx];
        if (season === 'spring') {
            ctx.fillStyle = 'rgba(50, 200, 50, 0.05)';
        } else if (season === 'summer') {
            ctx.fillStyle = 'rgba(255, 200, 0, 0.1)';
        } else if (season === 'autumn') {
            ctx.fillStyle = 'rgba(50, 50, 80, 0.2)';
        } else if (season === 'winter') {
            ctx.fillStyle = 'rgba(200, 220, 255, 0.15)';
        }
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    const grColor = wDef.groundColor || '#77cc77';
    ctx.strokeStyle = grColor;
    ctx.lineWidth   = 2;
    ctx.shadowColor = grColor;
    ctx.shadowBlur  = 8;
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight - 40);
    ctx.lineTo(canvasWidth, canvasHeight - 40);
    ctx.stroke();
    ctx.shadowBlur = 0;

    if (wDef.id === 'village') {
        drawWeather(seasonsList[currentSeasonIdx]);
    }
}

// ============================================================
// BOSS FIGHT OBYEKTI VA JANG TIZIMI
// ============================================================
let lastBossScore = 0;

const boss = {
    active: false,
    x: 1000,
    y: 60,
    w: 120,
    h: 110,
    timer: 20,
    attackTimer: 0,
    projectiles: [],
    
    spawn() {
        this.active = true;
        this.x = canvasWidth + 50;
        this.y = 60;
        this.timer = 20;
        this.projectiles = [];
        this.attackTimer = 0;
        const banner = document.getElementById('bossBanner');
        if (banner) banner.classList.remove('hidden');
        const fill = document.getElementById('bossTimerFill');
        if (fill) fill.style.width = '100%';

        const container = document.querySelector('.game-container');
        if (container) {
            container.classList.add('shake-screen');
            setTimeout(() => container.classList.remove('shake-screen'), 500);
        }
        spawnPopup(canvasWidth / 2, canvasHeight / 2 - 60, "⚠️ GIGANT BOSS PAYDO BO'LDI! 🐉", "#ff2200");
        initAudio();
        playBossAlarmSound();
    },

    // O'yin qayta boshlanganda / tugaganda bossni butunlay tozalash
    reset() {
        this.active = false;
        this.projectiles = [];
        this.attackTimer = 0;
        this.timer = 20;
        lastBossScore = 0;
        const banner = document.getElementById('bossBanner');
        if (banner) banner.classList.add('hidden');
    },

    update() {
        if (!this.active) return;
        
        if (this.x > canvasWidth - 170) {
            this.x -= 3;
        }

        this.y = 60 + Math.sin(frames * 0.06) * 15;

        if (frames % 60 === 0 && this.timer > 0) {
            this.timer--;
            const fill = document.getElementById('bossTimerFill');
            if (fill) fill.style.width = `${(this.timer / 20) * 100}%`;
        }

        if (this.timer <= 0) {
            this.retreat();
            return;
        }

        this.attackTimer++;
        if (this.attackTimer % 90 === 0) {
            // Olov to'pi o'yinchi tomon yuboriladi (aks holda yuqorida uchib o'tib ketardi)
            // Biroz tarqalish (spread) qo'shiladi — o'yinchi sakrab o'tib o'zini saqlay oladi
            const sx = this.x + 20;
            const sy = this.y + 40;
            const targetX = player.x + player.width  / 2 + (Math.random() - 0.5) * 30;
            const targetY = player.y + player.height / 2 + (Math.random() - 0.5) * 24;
            const dx = targetX - sx;
            const dy = targetY - sy;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const speed = 7 + Math.random() * 2;
            this.projectiles.push({
                x: sx,
                y: sy,
                vx: (dx / dist) * speed,
                vy: (dy / dist) * speed,
                r: 14,
                color: '#ff4400'
            });
        }

        for (let i = 0; i < this.projectiles.length; i++) {
            const p = this.projectiles[i];
            p.x += p.vx;
            p.y += p.vy;

            ctx.save();
            ctx.fillStyle = p.color;
            ctx.shadowColor = '#ffaa00';
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffff00';
            ctx.beginPath();
            ctx.arc(p.x + (Math.random() - 0.5) * 10, p.y + (Math.random() - 0.5) * 10, p.r * 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Olov to'pi bilan o'yinchi to'qnashuvi (ko'rinadigan sprite o'lchamiga moslashtirilgan)
            const hitL = player.x - 20;
            const hitR = player.x + player.width + 20;
            const hitT = player.y - 48;
            const hitB = player.y + player.height + 6;
            const nearX = Math.max(hitL, Math.min(p.x, hitR));
            const nearY = Math.max(hitT, Math.min(p.y, hitB));
            const distFire = Math.sqrt((p.x - nearX) ** 2 + (p.y - nearY) ** 2);
            if (distFire < p.r) {
                if (selectedPet === 'dragon' && petShieldActive) {
                    petShieldActive = false;
                    spawnParticles(p.x, p.y, '#00ffff');
                    spawnPopup(p.x, p.y - 20, '🛡️ QALQON HIMOYA QILDI!', '#00ffff');
                    this.projectiles.splice(i, 1);
                    i--;
                    continue;
                } else {
                    gameOver();
                    return;
                }
            }

            if (p.x < -30) {
                this.projectiles.splice(i, 1);
                i--;
            }
        }

        this.draw();
    },

    retreat() {
        this.active = false;
        const banner = document.getElementById('bossBanner');
        if (banner) banner.classList.add('hidden');
        
        const bonusCoins = 100;
        wallet += bonusCoins;
        score += 500;
        saveShopData();
        updateWalletUI();
        spawnParticles(canvasWidth / 2, canvasHeight / 2, '#ffd700');
        spawnPopup(canvasWidth / 2, canvasHeight / 2 - 40, '🏆 BOSS YENGILDI! +🪙100', '#ffd700');
    },

    draw() {
        ctx.save();
        ctx.shadowColor = '#ff2200';
        ctx.shadowBlur = 25;

        const animFrame = Math.floor(frames / 3);
        const drawn = drawLugiaSprite(ctx, this.x - 30, this.y - 30, 180, 180, animFrame, false);
        if (!drawn) {
            ctx.fillStyle = '#880000';
            ctx.beginPath();
            ctx.ellipse(this.x + 60, this.y + 60, 45, 30, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
};

// ============================================================
// 13. TO'QNASHUV
// ============================================================
function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        if (player.x + 10     < obs.x + obs.width - 5 &&
            player.x + player.width - 10 > obs.x + 5 &&
            player.y + 10     < obs.y + obs.height &&
            player.y + player.height > obs.y + 10) {
            
            if (selectedPet === 'dragon' && petShieldActive) {
                petShieldActive = false;
                spawnParticles(obs.x + obs.width/2, obs.y + obs.height/2, '#00ffff');
                spawnPopup(obs.x + obs.width/2, obs.y - 20, '🛡️ TO\'SIQ PORTLATILDI!', '#00ffff');
                playShieldSound();
                obstacles.splice(i, 1);
                i--;
                continue;
            } else {
                playHitSound();
                gameOver(); return;
            }
        }
    }
    for (let i = 0; i < coinsArray.length; i++) {
        const coin = coinsArray[i];
        const dx   = coin.x - (player.x + player.width  / 2);
        const dy   = coin.y - (player.y + player.height / 2);
        if (Math.sqrt(dx * dx + dy * dy) < coin.radius + 20) {
            coinSound.currentTime = 0;
            coinSound.play().catch(() => {});
            playCoinSound();
            
            const coinMult = selectedPet === 'bunny' ? 2 : 1;
            coins  += coinMult;
            wallet += coinMult;
            score  += 50;

            coinText.innerText = `${coins}  (+🪙${wallet})`;
            // Har tanga uchun sinxron localStorage yozish kerak emas:
            // 10 soniyalik avto-save, gameOver va beforeunload/pagehide allaqachon saqlaydi.
            updateWalletUI();
            coinsArray.splice(i, 1);
            i--;
        }
    }
    // KESIY to'qnashuvi
    for (let i = 0; i < chestArray.length; i++) {
        const ch = chestArray[i];
        const px = player.x + player.width  / 2;
        const py = player.y + player.height / 2;
        if (px > ch.x - 10 && px < ch.x + ch.w + 10 &&
            py > ch.y - 10 && py < ch.y + ch.h + 30) {
            const bonus = ch.type.coins * (selectedPet === 'bunny' ? 2 : 1);
            const bonusScore = ch.type.score;
            wallet += bonus;
            coins  += bonus;
            score  += bonusScore;
            saveShopData();
            updateWalletUI();
            coinText.innerText = `${coins}  (+🪙${wallet})`;
            spawnParticles(ch.x + ch.w/2, ch.y + ch.h/2, ch.type.glow);
            spawnParticles(ch.x + ch.w/2, ch.y + ch.h/2, '#ffffff');
            spawnPopup(ch.x + ch.w/2, ch.y - 10, `🪙+${bonus}  +${bonusScore}pts`, ch.type.glow);
            chestSound.currentTime = 0;
            chestSound.play().catch(() => {});
            chestArray.splice(i, 1);
            i--;
        }
    }
}

// ============================================================
// 13. ASOSIY LOOP
// ============================================================
function update() {
    if (!isPlaying) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground();
    player.update();

    // Boss Spawning check (every 1000 score)
    const currentMilestone = Math.floor(score / 1000) * 1000;
    if (currentMilestone >= 1000 && currentMilestone > lastBossScore && !boss.active) {
        lastBossScore = currentMilestone;
        boss.spawn();
    }
    if (boss.active) {
        boss.update();
    }

    obstacleTimer--;
    if (obstacleTimer <= 0) {
        obstacles.push(new Obstacle());
        obstacleTimer = Math.floor(Math.random() * 60 + 80 + gameSpeed * 5);
    }

    coinTimer--;
    if (coinTimer <= 0) {
        const h = Math.random() > 0.5 ? 220 : 120;
        coinsArray.push(new Coin(canvasWidth, canvasHeight - 40 - h));
        coinTimer = Math.floor(Math.random() * 80 + 100);
    }

    chestTimer--;
    if (chestTimer <= 0) {
        chestArray.push(new Chest());
        chestTimer = Math.floor(Math.random() * 250 + 350);
    }

    for (let i = 0; i < obstacles.length;  i++) {
        obstacles[i].update();
        if (obstacles[i].x + obstacles[i].width < 0) { obstacles.splice(i, 1); i--; }
    }
    for (let i = 0; i < coinsArray.length; i++) {
        coinsArray[i].update();
        if (coinsArray[i].x < 0) { coinsArray.splice(i, 1); i--; }
    }
    for (let i = 0; i < chestArray.length; i++) {
        chestArray[i].update();
        if (chestArray[i].x + chestArray[i].w < 0) { chestArray.splice(i, 1); i--; }
    }

    checkCollision();
    updateParticles();
    updatePopups();

    const scoreMult = selectedPet === 'wolf' ? 1.5 : 1.0;
    score += 0.1 * scoreMult;
    scoreText.innerText = Math.floor(score);

    if (score >= 500 && !hasReached500) {
        hasReached500 = true;
        milestoneSound.currentTime = 0;
        milestoneSound.play().catch(() => {});
        spawnPopup(canvasWidth / 2, canvasHeight / 2 - 50, "500 METR!", "#00ffff");
    }

    const newSeasonIdx = Math.floor(score / 1000) % 4;
    if (newSeasonIdx !== currentSeasonIdx) {
        currentSeasonIdx = newSeasonIdx;
        
        currentMusic.pause();
        currentMusic = seasonMusic[currentSeasonIdx];
        currentMusic.currentTime = 0;
        currentMusic.play().catch(() => {});
        
        bgImage = seasonImages[currentSeasonIdx];

        const names = ['BAHOR', 'YOZ', 'KUZ', 'QISH'];
        seasonText.innerText = names[currentSeasonIdx];
        spawnPopup(canvasWidth / 2, canvasHeight / 2 - 80, `YANGI FASL: ${names[currentSeasonIdx]}!`, "#ff00ff");
    }

    if (frames % 500 === 0 && gameSpeed < 16) gameSpeed += 0.5;
    frames++;
    animationId = requestAnimationFrame(update);
}

// ============================================================
// 14. BOSHQARUV HODISALARI
// ============================================================
function handleJump(e) {
    if (e && e.type === 'keydown' && (e.code === 'Space' || e.code === 'ArrowUp')) {
        e.preventDefault();
        if (isPlaying) {
            player.jump();
            return;
        }
        // Pauza holatida Space — o'yinni DAVOM ETTIRADI (yangi o'yin boshlashmasin)
        if (isPaused) {
            resumeGame();
            return;
        }
        if (shopScreen.classList.contains('hidden') && settingsScreen.classList.contains('hidden')) {
            const introOverlay = document.getElementById('introOverlay');
            if (introOverlay && !introOverlay.classList.contains('hidden')) return;
            // O'yin ichidagi modal ochiq bo'lsa yangi o'yin boshlatilmaydi
            if (gameModal && !gameModal.classList.contains('hidden')) return;
            startGame();
        }
    }
}

window.addEventListener('keydown', e => {
    if (e.code === 'KeyP' || e.code === 'Escape') {
        if (isPlaying && !isPaused)  pauseGame();
        else if (isPaused)           resumeGame();
        return;
    }
    handleJump(e);
});

function isUiTarget(e) {
    // e.target har doim Element emas (masalan document/body) — .closest mavjudligini tekshiramiz
    const t = e && e.target;
    if (!t || typeof t.closest !== 'function') return true;
    return !!t.closest('button, input, .screen');
}

window.addEventListener('mousedown', e => {
    if (isUiTarget(e)) return;
    if (isPlaying) player.jump();
});

window.addEventListener('touchstart', e => {
    if (isUiTarget(e)) return;
    if (isPlaying) player.jump();
}, { passive: false });

playBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', () => isPaused ? resumeGame() : pauseGame());
resumeBtn.addEventListener('click', resumeGame);
shopBtn.addEventListener('click', () => openShop(false));
shopCloseBtn.addEventListener('click', closeShop);
goShopBtn.addEventListener('click', () => openShop(true));

const exitToMenuBtn   = document.getElementById('exitToMenuBtn');
const gameOverExitBtn = document.getElementById('gameOverExitBtn');
if (exitToMenuBtn)   exitToMenuBtn.addEventListener('click', exitToMainMenu);
if (gameOverExitBtn) gameOverExitBtn.addEventListener('click', exitToMainMenu);

// ============================================================
// 15. O'YIN BOSHQARUVI
// ============================================================
function startGame() {
    player.y = canvasHeight - 40 - player.height;
    player.dy = 0;
    player.animFrame = 0;
    player.state = 'run';
    obstacles  = [];
    coinsArray = [];
    chestArray = [];
    particles  = [];
    popups     = [];
    frames     = 0;
    score      = 0;
    coins      = 0;
    gameSpeed  = 6;
    obstacleTimer = 100;
    coinTimer     = 50;
    isPaused        = false;
    hasReached500   = false;
    petShieldActive = true;
    chestTimer      = 400;
    bgX             = 0;
    boss.reset();

    scoreText.innerText = '0';
    coinText.innerText  = '0';

    currentSeasonIdx = 0;
    currentMusic.pause();
    currentMusic = seasonMusic[0];
    bgImage = seasonImages[0];
    seasonText.innerText = 'BAHOR';

    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    pauseScreen.classList.add('hidden');
    shopScreen.classList.add('hidden');
    hud.classList.remove('hidden');
    pauseBtn.textContent = '⏸';

    currentMusic.currentTime = 0;
    currentMusic.play().catch(() => {});

    isPlaying = true;
    cancelAnimationFrame(animationId);
    update();
}

function pauseGame() {
    isPaused  = true;
    isPlaying = false;
    cancelAnimationFrame(animationId);
    currentMusic.pause();
    pauseScreen.classList.remove('hidden');
    pauseBtn.textContent = '▶';
}

function resumeGame() {
    isPaused  = false;
    isPlaying = true;
    pauseScreen.classList.add('hidden');
    pauseBtn.textContent = '⏸';
    currentMusic.play().catch(() => {});
    update();
}

function exitToMainMenu() {
    isPlaying = false;
    isPaused  = false;
    boss.reset();
    cancelAnimationFrame(animationId);
    currentMusic.pause();

    saveShopData();

    hud.classList.add('hidden');
    pauseScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    settingsScreen.classList.add('hidden');
    shopScreen.classList.add('hidden');

    startScreen.classList.remove('hidden');
    updateWalletUI();
}

function gameOver() {
    isPlaying = false;
    boss.reset();
    currentMusic.pause();
    gameOverSound.currentTime = 0;
    gameOverSound.play().catch(() => {});

    if (score > highScore) {
        highScore = Math.floor(score);
        hiScoreText.innerText = highScore;
    }

    finalScore.innerText  = Math.floor(score);
    finalCoins.innerText  = coins;
    finalWallet.innerText = wallet;
    
    // Zudlik bilan barcha ma'lumotlarni saqlash
    saveShopData();
    updateWalletUI();

    hud.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
}

// ============================================================
// 16. WEB AUDIO API SYNTHESIZER & SOZLAMALAR LOGIKASI
// ============================================================
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function getSfxVol() {
    if (typeof settings !== 'undefined' && settings) {
        return (settings.sfxVol || 80) / 100;
    }
    return 0.8;
}

function isSfxEnabled() {
    if (typeof settings !== 'undefined' && settings) {
        return settings.sfxOn !== false;
    }
    return true;
}

function playJumpSound() {
    if (!isSfxEnabled() || !audioCtx) return;
    try {
        const vol = getSfxVol();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(160, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(580, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(vol * 0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    } catch(e){}
}

function playCoinSound() {
    if (!isSfxEnabled() || !audioCtx) return;
    try {
        const vol = getSfxVol();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, audioCtx.currentTime);
        osc.frequency.setValueAtTime(1318.51, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(vol * 0.35, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.22);
    } catch(e){}
}

function playHitSound() {
    if (!isSfxEnabled() || !audioCtx) return;
    try {
        const vol = getSfxVol();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(vol * 0.5, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    } catch(e){}
}

function playShieldSound() {
    if (!isSfxEnabled() || !audioCtx) return;
    try {
        const vol = getSfxVol();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(vol * 0.4, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    } catch(e){}
}

function playBossAlarmSound() {
    if (!isSfxEnabled() || !audioCtx) return;
    try {
        const vol = getSfxVol();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.2);
        osc.frequency.linearRampToValueAtTime(300, audioCtx.currentTime + 0.4);
        gain.gain.setValueAtTime(vol * 0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
    } catch(e){}
}

// ============================================================
// 17. BOSHLANG'ICH HOLATNI KO'RSATISH
// ============================================================
updateWalletUI();

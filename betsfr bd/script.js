/*
  Friend Birthday Quest (18+) 
  One-page app: all screens exist in index.html; navigation is done here.
*/

(() => {
  'use strict';

  // -----------------------------
  // CONFIG (easy to customize)
  // -----------------------------
  const CONFIG = {
    credentials: {
      login: 'legend',
      password: '1802',
    },

    bootLines: [
      'Initializing system…',
      'Loading memories…',
      'Decrypting friendship archive…',
      'Access level required.',
    ],

    secretFileText: [
      'Official document confirms',
      'you are the best friend ever.',
    ].join('\n'),

    finalMessageText: [
      '>>> SECURE CHANNEL: OPEN',
      '>>> ENCRYPTION: ON',
      '',
      '============================================================',
      '                 HAPPY 18 // BRO UPGRADE',
      '============================================================',
      '',
      '18 лет, бро, я вообще не верю на самом деле…',
      'Будто вчера тебе экскурсию по школе в первый твой день проводил ахах.',
      '',
      'Я невероятно благодарен тебе за всё, что ты делал для меня.',
      'Безумно ценю дружбу с тобой и ни на что её не променяю.',
      '',
      'Буквально ничто в мире — даже если сложить все богатства, статусы,',
      'привилегии и многое-многое другое, за что люди борются всю свою жизнь,',
      'отдавая самый ценный их ресурс — время, — так вот, ничто не заменит',
      'даже малой части от того громадного периода, что мы с тобой знакомы.',
      '',
      'Казалось бы, куда ещё — мы уже и так столько всего прожили вместе.',
      'Но нет: люди живут аж до 80–100 лет, а мы не прожили даже четверти.',
      '',
      'Верю, что в будущем мы будем только расти и добиваться того, о чём',
      'обычно говорят «невозможно»… общими силами.',
      'Верю, что мы останемся такими же близкими друзьями — вернее, я бы уже',
      'сказал братьями.',
      '',
      '------------------------------------------------------------',
      'LOG ENTRY // 14 FEB // 02:46',
      '------------------------------------------------------------',
      'Я пишу этот текст 14 февраля в 2:46, сидя за компьютером,',
      'с перерывами на тёплые воспоминания о наших с тобой приключениях,',
      'которые всплывают у меня в голове.',
      '',
      'Мне не хотелось писать пустые пожелания — потому что они у меня',
      'всегда получаются какие-то бесчувственные что ли.',
      'А этот текст — поток сознания, и он кажется мне намного более',
      'искренним и правильным.',
      '',
      'Думаю, ты найдёшь своё место в жизни, когда придёт время.',
      'Да впрочем, кому не похер вообще — я тут не гадалка с тт,',
      'чтобы предугадывать что-то или обещать.',
      '',
      'Мы с тобой будем просто плыть по течению и делать то, что считаем',
      'нужным в моменте. Мне кажется, это единственный верный путь',
      'к счастливой жизни.',
      '',
      'Пока глобальных планов не строю, но надеюсь, что погулять',
      'в ближайшее время мы всё-таки сходим.',
      '',
      'Ещё раз поздравляю тебя с 18-летием.',
      'Тоже там не зазнавайся — так-то всего полгода осталось,',
      'знаешь, как они пролетят…',
      '',
      '--',
      'С уважением и братской любовью,',
      'Дмитрий "Шеф"',
    ].join('\n'),

    scanSequence: [
      { delayMs: 300, label: 'Scanning personality…', log: '' },
      { delayMs: 900, label: 'Analyzing…', log: '✔ Humor level: 100%' },
      { delayMs: 900, label: 'Verifying…', log: '✔ Loyalty: MAX' },
      { delayMs: 900, label: 'Finalizing…', log: '✔ Legend status: CONFIRMED' },
    ],

    // Memories archive (no external deps; placeholders are inline SVG data URIs)
    memories: {
      photo: [
        { title: 'Photo #1', img: 'images/IMG_4768.jpg', portrait: true },
        { title: 'Photo #2', img: 'images/kenti.jpg' },
        { title: 'Photo #3', img: 'images/babka.jpg', portrait: true },
        { title: 'Photo #4', img: 'images/camphoto_1804928587.jpg' },
        { title: 'Photo #5', img: 'images/photo_12_2026-02-14_11-16-44.jpg', portrait: true },
        { title: 'Photo #6', img: 'images/photo_1_2026-02-14_11-27-45.jpg' },
        { title: 'Photo #7', img: 'images/photo_2026-02-14_12-08-30.jpg' },
        { title: 'Photo #8', img: 'images/photo_4_2026-02-14_11-16-44.jpg', portrait: true },
        { title: 'Photo #9', img: 'images/photo_5_2026-02-14_11-16-44.jpg', portrait: true },
        { title: 'Photo #10', img: 'images/Новый проект.jpg' },
      ],
      video: [
        { title: 'Video #1', video: 'videos/video_2026-02-14_11-37-10.mp4', poster: makePlaceholderDataUri('VIDEO 01') },
        { title: 'Video #2', video: 'videos/video_2026-02-14_11-39-06.mp4', poster: makePlaceholderDataUri('VIDEO 02') },
        { title: 'Video #3', video: 'videos/мне страшно.mp4', poster: makePlaceholderDataUri('VIDEO 03') },
        { title: 'Video #4', video: 'videos/Поздравление С ДНЁМ РОЖДЕНИЯ Музыкальная видео-открытка.mp4', poster: makePlaceholderDataUri('BIRTHDAY') },
        { title: 'Video #5', video: 'videos/2630344958933315331.mp4', poster: makePlaceholderDataUri('FINAL'), portrait: true },
      ],
    },

    easterEgg: {
      clicksRequired: 5,
      text: 'Hidden message: если ты это нашёл — значит ты реально внимательный. Уважение +999.',
    },

    typing: {
      charDelayMs: 18,
      lineDelayMs: 260,
    },

    sound: {
      enabledByDefault: true,
    },
  };

  // -----------------------------
  // DOM helpers
  // -----------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const dom = {
    app: $('#app'),
    stage: $('#stage'),
    statusPill: $('#statusPill'),

    screens: $$('[data-screen]'),

    bootOutput: $('#bootOutput'),

    loginForm: $('#loginForm'),
    loginInput: $('#loginInput'),
    passwordInput: $('#passwordInput'),
    loginAlert: $('#loginAlert'),
    loginClear: $('#loginClear'),

    scanLabel: $('#scanLabel'),
    scanBar: $('#scanBar'),
    scanLog: $('#scanLog'),

    galleryImg: $('#galleryImg'),
    galleryVideo: $('#galleryVideo'),
    galleryFrame: $('#galleryFrame'),
    galleryCaption: $('#galleryCaption'),
    galleryPrev: $('#galleryPrev'),
    galleryNext: $('#galleryNext'),

    openSecret: $('#openSecret'),
    secretContent: $('#secretContent'),
    secretText: $('#secretText'),

    revealMessage: $('#revealMessage'),
    messageContent: $('#messageContent'),
    messageText: $('#messageText'),

    exitOutput: $('#exitOutput'),

    toast: $('#toast'),

    soundToggle: $('#soundToggle'),
    soundLabel: $('#soundLabel'),

    easterEggTarget: $('#easterEggTarget'),
    easter: $('#easter'),
    easterText: $('#easterText'),
    closeEaster: $('#closeEaster'),

    togglePhoto: $('#togglePhoto'),
    toggleVideo: $('#toggleVideo'),
    memoriesToggle: $('.toggle'),

    faceIdStatus: $('#faceIdStatus'),
    faceIdLog: $('#faceIdLog'),
    faceIdRing: $('#faceIdRing'),
    faceIdImage: $('#faceIdImage'),

    countdown: $('#countdown'),
    countdownTime: $('#countdownTime'),
    countdownMark: $('#countdownMark'),
  };

  // -----------------------------
  // State
  // -----------------------------
  const state = {
    activeScreen: 'boot',
    typingAbort: null,
    memoriesMode: 'photo',
    galleryIndex: 0,
    easterClicks: 0,
    soundEnabled: CONFIG.sound.enabledByDefault,
    audio: createTypingAudioEngine(),
    countdownIntervalId: null,
    videoPosterCache: new Map(),
    imageCache: new Set(),
    videoMetaCache: new Set(),
  };

  // -----------------------------
  // Navigation & transitions
  // -----------------------------
  function getScreenEl(name) {
    return dom.screens.find((s) => s.dataset.screen === name);
  }

  async function showScreen(name, { glitch = true } = {}) {
    if (name === state.activeScreen) return;

    const next = getScreenEl(name);
    const prev = getScreenEl(state.activeScreen);
    if (!next || !prev) return;

    state.typingAbort?.abort();

    if (glitch) triggerGlitch();

    prev.classList.add('is-leaving');
    await wait(220);

    prev.hidden = true;
    prev.classList.remove('is-leaving');

    next.hidden = false;
    state.activeScreen = name;
    if (dom.statusPill) dom.statusPill.textContent = name.toUpperCase();

    // Screen entry hooks
    if (name === 'login') {
      dom.loginInput.focus();
    }
    if (name === 'memories') {
      // Ensure toggle UI is in sync whenever the user re-enters the archive.
      setMemoriesMode(state.memoriesMode);
      renderGallery();
    }
  }

  function triggerGlitch() {
    dom.stage.classList.add('is-glitching');
    window.setTimeout(() => dom.stage.classList.remove('is-glitching'), 220);
  }

  // -----------------------------
  // Typing effect (supports abort)
  // -----------------------------
  async function typeLines(targetEl, lines, { clear = true, charDelayMs, lineDelayMs } = {}) {
    const controller = new AbortController();
    state.typingAbort = controller;

    const charDelay = charDelayMs ?? CONFIG.typing.charDelayMs;
    const lineDelay = lineDelayMs ?? CONFIG.typing.lineDelayMs;

    if (clear) targetEl.textContent = '';

    for (const line of lines) {
      if (controller.signal.aborted) return;
      await typeText(targetEl, line + '\n', { charDelayMs: charDelay, signal: controller.signal });
      await wait(lineDelay);
    }
  }

  async function typeText(targetEl, text, { charDelayMs = 16, signal } = {}) {
    for (const ch of text) {
      if (signal?.aborted) return;
      targetEl.textContent += ch;
      if (state.soundEnabled) state.audio.tick();
      await wait(charDelayMs);
    }
  }

  // -----------------------------
  // Boot flow
  // -----------------------------
  async function runBoot() {
    if (dom.statusPill) dom.statusPill.textContent = 'BOOT';
    if (dom.bootOutput) {
      await typeLines(dom.bootOutput, CONFIG.bootLines, { clear: true });
    }

    // Requirement: transition to login after 3 seconds
    await wait(3000);
    await showScreen('login');
  }

  // -----------------------------
  // Login flow
  // -----------------------------
  function setLoginAlert(text, kind) {
    if (!dom.loginAlert) return;
    dom.loginAlert.hidden = !text;
    dom.loginAlert.textContent = text || '';
    dom.loginAlert.style.borderColor = kind === 'danger' ? 'rgba(255,59,59,.35)' : 'rgba(57,255,20,.22)';
    dom.loginAlert.style.background = kind === 'danger' ? 'rgba(255,59,59,.08)' : 'rgba(57,255,20,.08)';
    dom.loginAlert.style.color = kind === 'danger' ? '#ffd3d3' : 'rgba(215,255,231,.92)';
  }

  function validateCredentials(login, password) {
    // Login is case-insensitive, password is exact.
    return login.toLowerCase() === CONFIG.credentials.login.toLowerCase() && password === CONFIG.credentials.password;
  }

  async function onLoginSubmit(e) {
    e.preventDefault();

    const login = dom.loginInput.value.trim();
    const password = dom.passwordInput.value;

    if (!validateCredentials(login, password)) {
      setLoginAlert('ACCESS DENIED. You are not him.', 'danger');
      triggerGlitch();
      return;
    }

    setLoginAlert('ACCESS GRANTED.', 'ok');
    await wait(450);

    // Face ID confirmation step before the scan/menu.
    await showScreen('faceid');
    await runFaceId();
    await showScreen('scan');
    await runScan();
  }

  function onLoginClear() {
    dom.loginInput.value = '';
    dom.passwordInput.value = '';
    setLoginAlert('', 'ok');
    dom.loginInput.focus();
  }

  // -----------------------------
  // Scan flow
  // -----------------------------
  async function runScan() {
    dom.scanBar.style.width = '0%';
    dom.scanLog.textContent = '';

    const total = CONFIG.scanSequence.length;

    for (let i = 0; i < total; i++) {
      const step = CONFIG.scanSequence[i];
      dom.scanLabel.textContent = step.label;

      await wait(step.delayMs);

      const progress = Math.round(((i + 1) / total) * 100);
      dom.scanBar.style.width = progress + '%';

      if (step.log) {
        dom.scanLog.textContent += (dom.scanLog.textContent ? '\n' : '') + step.log;
        if (state.soundEnabled) state.audio.tick(2);
      }
    }

    await wait(600);
    await showScreen('menu');
  }

  // -----------------------------
  // Menu navigation (buttons with data-nav)
  // -----------------------------
  async function onNavClick(e) {
    const btn = e.target.closest('[data-nav]');
    if (!btn) return;

    const to = btn.dataset.nav;

    if (to === 'exit') {
      await showScreen('exit');
      await runExit();
      return;
    }

    await showScreen(to);
  }

  // -----------------------------
  // Gallery
  // -----------------------------
  async function renderGallery() {
    const items = getMemoriesList();
    const item = items[state.galleryIndex];
    if (!item) return;

    dom.galleryFrame?.classList.toggle('is-portrait', Boolean(item.portrait));

    setGalleryLoading(true);

    const isVideo = state.memoriesMode === 'video';
    if (dom.galleryVideo) {
      dom.galleryVideo.hidden = !isVideo;
      if (!isVideo) {
        dom.galleryVideo.pause();
        dom.galleryVideo.removeAttribute('src');
        dom.galleryVideo.load();
      }
    }

    dom.galleryImg.hidden = isVideo;

    if (isVideo) {
      // For videos we show the video player. Use `video` for the file and optional `poster`.
      if (dom.galleryVideo) {
        const src = toAssetUrl(item.video);
        dom.galleryVideo.src = src;
        // Show first frame as preview instead of a placeholder banner.
        dom.galleryVideo.removeAttribute('poster');
        if (item.poster) dom.galleryVideo.poster = toAssetUrl(item.poster);
        dom.galleryVideo.load();
        void ensureVideoPoster(dom.galleryVideo);

        await waitForVideoReady(dom.galleryVideo);
        state.videoMetaCache.add(src);
      }
    } else {
      const src = toAssetUrl(item.img);
      await setImageSrcWithDecode(dom.galleryImg, src);
      state.imageCache.add(src);
    }

    dom.galleryCaption.textContent = item.title;

    setGalleryLoading(false);
    void prefetchNeighbors();
  }

  function galleryPrev() {
    const items = getMemoriesList();
    state.galleryIndex = (state.galleryIndex - 1 + items.length) % items.length;
    void renderGallery();
    triggerGlitch();
  }

  function galleryNext() {
    const items = getMemoriesList();
    state.galleryIndex = (state.galleryIndex + 1) % items.length;
    void renderGallery();
    triggerGlitch();
  }

  function setMemoriesMode(mode) {
    if (mode !== 'photo' && mode !== 'video') return;

    const changed = state.memoriesMode !== mode;
    state.memoriesMode = mode;
    if (changed) state.galleryIndex = 0;

    dom.togglePhoto?.classList.toggle('is-active', mode === 'photo');
    dom.togglePhoto?.setAttribute('aria-selected', String(mode === 'photo'));
    dom.toggleVideo?.classList.toggle('is-active', mode === 'video');
    dom.toggleVideo?.setAttribute('aria-selected', String(mode === 'video'));

    dom.memoriesToggle?.classList.toggle('is-video', mode === 'video');
    void renderGallery();
    triggerGlitch();
  }

  function setGalleryLoading(isLoading) {
    dom.galleryFrame?.classList.toggle('is-loading', Boolean(isLoading));
  }

  function waitForVideoReady(videoEl) {
    return new Promise((resolve) => {
      if (!videoEl) return resolve();
      if (videoEl.readyState >= 2) return resolve();

      const done = () => resolve();
      videoEl.addEventListener('loadeddata', done, { once: true });
      videoEl.addEventListener('canplay', done, { once: true });
      videoEl.addEventListener('error', done, { once: true });

      window.setTimeout(done, 1200);
    });
  }

  async function setImageSrcWithDecode(imgEl, src) {
    if (!imgEl) return;
    if (!src) {
      imgEl.removeAttribute('src');
      return;
    }

    if (imgEl.src === src) return;

    try {
      const pre = new Image();
      pre.decoding = 'async';
      pre.src = src;
      if (pre.decode) {
        await pre.decode();
      } else {
        await new Promise((resolve) => {
          pre.onload = resolve;
          pre.onerror = resolve;
        });
      }
    } catch {
      // ignore
    }

    imgEl.src = src;
  }

  async function prefetchNeighbors() {
    const items = getMemoriesList();
    if (!items.length) return;

    const prev = items[(state.galleryIndex - 1 + items.length) % items.length];
    const next = items[(state.galleryIndex + 1) % items.length];
    const targets = [prev, next].filter(Boolean);

    for (const t of targets) {
      if (state.memoriesMode === 'photo') {
        const src = toAssetUrl(t.img);
        if (!src || state.imageCache.has(src)) continue;
        try {
          const pre = new Image();
          pre.decoding = 'async';
          pre.src = src;
          if (pre.decode) await pre.decode();
        } catch {
          // ignore
        }
        state.imageCache.add(src);
      } else {
        const src = toAssetUrl(t.video);
        if (!src || state.videoMetaCache.has(src)) continue;
        try {
          const v = document.createElement('video');
          v.preload = 'metadata';
          v.muted = true;
          v.playsInline = true;
          v.src = src;
          v.load();
          await waitForVideoReady(v);
          state.videoMetaCache.add(src);
        } catch {
          // ignore
        }
      }
    }
  }

  function getMemoriesList() {
    return state.memoriesMode === 'video' ? CONFIG.memories.video : CONFIG.memories.photo;
  }

  // -----------------------------
  // Face ID flow
  // -----------------------------
  async function runFaceId() {
    if (!dom.faceIdStatus || !dom.faceIdLog || !dom.faceIdRing) return;

    dom.faceIdRing.classList.remove('is-success');
    dom.faceIdRing.classList.add('is-animating');
    dom.faceIdStatus.textContent = 'Align face…';
    dom.faceIdLog.textContent = '';

    const steps = [
      { ms: 600, status: 'Capturing…', line: '✔ Image acquired' },
      { ms: 800, status: 'Matching…', line: '✔ Biometric hash verified' },
      { ms: 700, status: 'Confirming…', line: '✔ Identity: LEGEND' },
      { ms: 600, status: 'Approved.', line: '✔ ACCESS CONFIRMED' },
    ];

    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      dom.faceIdStatus.textContent = s.status;
      await wait(s.ms);
      dom.faceIdLog.textContent += (dom.faceIdLog.textContent ? '\n' : '') + s.line;
      if (state.soundEnabled) state.audio.tick(2);
    }

    dom.faceIdRing.classList.remove('is-animating');
    dom.faceIdRing.classList.add('is-success');

    await wait(450);
  }

  // -----------------------------
  // Secret file
  // -----------------------------
  async function openSecret() {
    dom.secretContent.hidden = false;
    dom.secretText.textContent = '';

    await typeText(dom.secretText, CONFIG.secretFileText, { charDelayMs: 14 });
  }

  // -----------------------------
  // Final message
  // -----------------------------
  async function revealMessage() {
    dom.messageContent.hidden = false;
    dom.messageText.textContent = '';

    await typeText(dom.messageText, CONFIG.finalMessageText, { charDelayMs: 12 });
  }

  // -----------------------------
  // Exit flow
  // -----------------------------
  async function runExit() {
    const lines = [
      'Saving session…',
      'Closing modules…',
      'Powering off…',
      'Goodbye.',
    ];

    await typeLines(dom.exitOutput, lines, { clear: true, charDelayMs: 16, lineDelayMs: 220 });
    await wait(900);

    // Return to login
    dom.exitOutput.textContent = '';
    dom.passwordInput.value = '';
    await showScreen('login');
  }

  // -----------------------------
  // Toast
  // -----------------------------
  function toast(text, ms = 1400) {
    dom.toast.hidden = false;
    dom.toast.textContent = text;
    window.clearTimeout(toast._t);
    toast._t = window.setTimeout(() => {
      dom.toast.hidden = true;
    }, ms);
  }

  // -----------------------------
  // Easter egg (5 clicks on header)
  // -----------------------------
  function onEasterClick() {
    state.easterClicks += 1;
    const left = Math.max(CONFIG.easterEgg.clicksRequired - state.easterClicks, 0);

    if (left > 0) {
      toast(`Signal detected… (${left})`);
      return;
    }

    state.easterClicks = 0;
    dom.easterText.textContent = CONFIG.easterEgg.text;
    dom.easter.classList.add('is-open');
    triggerGlitch();
  }

  function closeEaster() {
    dom.easter.classList.remove('is-open');
  }

  // -----------------------------
  // Sound toggle + audio engine
  // -----------------------------
  function onSoundToggle() {
    state.soundEnabled = !state.soundEnabled;
    dom.soundLabel.textContent = `SOUND: ${state.soundEnabled ? 'ON' : 'OFF'}`;

    if (state.soundEnabled) {
      state.audio.resume();
      toast('Audio armed');
    } else {
      toast('Audio muted');
    }
  }

  // Minimal typing sound using WebAudio (no external files).
  function createTypingAudioEngine() {
    let ctx = null;

    function ensure() {
      if (ctx) return ctx;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      ctx = new AudioContext();
      return ctx;
    }

    function resume() {
      const c = ensure();
      if (!c) return;
      if (c.state === 'suspended') c.resume();
    }

    function tick(mult = 1) {
      const c = ensure();
      if (!c) return;
      if (c.state === 'suspended') return;

      const t0 = c.currentTime;
      const gain = c.createGain();
      gain.gain.setValueAtTime(0.0001, t0);

      // Short “click” made by filtered noise.
      const bufferSize = 2 * c.sampleRate;
      const noiseBuffer = c.createBuffer(1, bufferSize, c.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = (Math.random() * 2 - 1);

      const noise = c.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = c.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1400 + Math.random() * 800;

      const amp = 0.018 * mult;
      gain.gain.exponentialRampToValueAtTime(amp, t0 + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.03);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);

      noise.start(t0);
      noise.stop(t0 + 0.04);
    }

    return { tick, resume };
  }

  // -----------------------------
  // Utils
  // -----------------------------
  function wait(ms) {
    return new Promise((r) => window.setTimeout(r, ms));
  }

  function makePlaceholderDataUri(label) {
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#061010"/>
      <stop offset="1" stop-color="#020404"/>
    </linearGradient>
    <radialGradient id="r" cx="30%" cy="25%" r="75%">
      <stop offset="0" stop-color="rgba(57,255,20,0.25)"/>
      <stop offset="1" stop-color="rgba(57,255,20,0)"/>
    </radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#g)"/>
  <rect width="1280" height="720" fill="url(#r)"/>
  <g opacity="0.35" stroke="#39ff14" stroke-width="2">
    <path d="M0 560 C 240 520, 360 600, 640 560 S 1040 520, 1280 560" fill="none"/>
    <path d="M0 610 C 260 580, 420 650, 640 610 S 980 580, 1280 610" fill="none"/>
  </g>
  <g font-family="JetBrains Mono, monospace" fill="#d7ffe7">
    <text x="64" y="96" font-size="24" opacity="0.8">FRIENDSHIP ARCHIVE</text>
    <text x="64" y="140" font-size="14" opacity="0.65">placeholder image • replace in CONFIG.memories</text>
    <text x="64" y="670" font-size="44" fill="#39ff14" opacity="0.9">${escapeXml(label)}</text>
  </g>
</svg>`.trim();

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function escapeXml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;');
  }

  // -----------------------------
  // Wire up events
  // -----------------------------
  function bindEvents() {
    dom.loginForm.addEventListener('submit', onLoginSubmit);
    dom.loginClear.addEventListener('click', onLoginClear);

    dom.stage.addEventListener('click', onNavClick);

    dom.galleryPrev.addEventListener('click', galleryPrev);
    dom.galleryNext.addEventListener('click', galleryNext);

    dom.togglePhoto?.addEventListener('click', () => setMemoriesMode('photo'));
    dom.toggleVideo?.addEventListener('click', () => setMemoriesMode('video'));

    dom.openSecret.addEventListener('click', openSecret);
    dom.revealMessage.addEventListener('click', revealMessage);

    dom.easterEggTarget.addEventListener('click', onEasterClick);
    dom.closeEaster.addEventListener('click', closeEaster);
    dom.easter.addEventListener('click', (e) => {
      if (e.target === dom.easter) closeEaster();
    });

    dom.soundToggle.addEventListener('click', onSoundToggle);

    // Arm audio on first user gesture if allowed
    window.addEventListener('pointerdown', () => {
      if (state.soundEnabled) state.audio.resume();
    }, { once: true });
  }

  // -----------------------------
  // Init
  // -----------------------------
  function init() {
    bindEvents();

    // Make sure overlays are closed on first paint.
    closeEaster();

    // Ensure only boot is visible
    dom.screens.forEach((s) => {
      s.hidden = s.dataset.screen !== 'boot';
    });

    if (dom.faceIdImage) {
      dom.faceIdImage.src = toAssetUrl('images/IMG_0082.JPG');
    }

    dom.soundLabel.textContent = `SOUND: ${state.soundEnabled ? 'ON' : 'OFF'}`;

    startCountdown();

    runBoot();
  }

  function toAssetUrl(value) {
    if (!value) return '';
    if (typeof value !== 'string') return '';
    // Keep data: URIs intact.
    if (value.startsWith('data:')) return value;
    return encodeURI(value);
  }

  async function ensureVideoPoster(videoEl) {
    try {
      const src = videoEl.currentSrc || videoEl.src;
      if (!src) return;
      if (state.videoPosterCache.has(src)) {
        videoEl.poster = state.videoPosterCache.get(src);
        return;
      }

      const posterDataUrl = await captureFirstFramePoster(videoEl);
      if (!posterDataUrl) return;
      state.videoPosterCache.set(src, posterDataUrl);
      videoEl.poster = posterDataUrl;
    } catch {
      // ignore
    }
  }

  function captureFirstFramePoster(videoEl) {
    return new Promise((resolve) => {
      let finished = false;

      const finish = (value) => {
        if (finished) return;
        finished = true;
        resolve(value);
      };

      const onError = () => finish('');

      const onSeeked = () => {
        try {
          const w = videoEl.videoWidth;
          const h = videoEl.videoHeight;
          if (!w || !h) return finish('');

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (!ctx) return finish('');
          ctx.drawImage(videoEl, 0, 0, w, h);
          finish(canvas.toDataURL('image/jpeg', 0.82));
        } catch {
          finish('');
        }
      };

      const onLoadedMetadata = () => {
        try {
          // Seek a tiny bit to make sure frame is drawable.
          const t = Math.min(0.12, Math.max(0, (videoEl.duration || 1) * 0.02));
          videoEl.muted = true;
          videoEl.pause();
          videoEl.currentTime = t;
        } catch {
          finish('');
        }
      };

      videoEl.addEventListener('error', onError, { once: true });
      videoEl.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
      videoEl.addEventListener('seeked', onSeeked, { once: true });

      if (videoEl.readyState >= 1) onLoadedMetadata();

      // Safety timeout
      window.setTimeout(() => finish(''), 1200);
    });
  }

  // -----------------------------
  // Global countdown (Feb 15 00:00)
  // -----------------------------
  function startCountdown() {
    if (!dom.countdown || !dom.countdownTime) return;

    if (state.countdownIntervalId) return;

    const target = getTargetDate();
    let done = false;

    const tick = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        if (!done) {
          done = true;
          dom.countdown.classList.add('is-done');
          dom.countdownTime.textContent = '00:00:00';
        }
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      dom.countdownTime.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    tick();
    state.countdownIntervalId = window.setInterval(tick, 1000);
  }

  function getTargetDate() {
    // Fixed one-time date: Feb 15, 2026 00:00 (local time).
    return new Date(2026, 1, 15, 0, 0, 0);
  }

  init();
})();

(() => {
  const records = new Map();
  const actions = new Set(['idle', 'wave', 'walk', 'thinking', 'happy', 'jump', 'turn', 'profile', 'sidewalk']);
  const outfits = ['casual', 'professional', 'creative', 'graduate'];
  const sheets = Object.fromEntries(outfits.map(outfit => [outfit, `assets/character-${outfit}.png`]));
  let paused = false;
  let pausedAt = 0;
  let frameRequest = null;

  function draw(record, frame) {
    if (record.frame === frame) return;
    record.frame = frame;
    record.el.dataset.frame = String(frame);
    record.sprite.style.backgroundPosition = `${(frame % 4) * 100 / 3}% ${frame < 4 ? 0 : 100}%`;
  }

  function attach(el) {
    if (records.has(el)) return records.get(el);
    const sprite = document.createElement('span');
    sprite.className = 'avatar-frames';
    sprite.setAttribute('aria-hidden', 'true');
    el.replaceChildren(sprite);
    el.classList.remove('waving');
    const now = performance.now();
    const record = { el, sprite, frame: -1, action: 'idle', startedAt: now, endsAt: Infinity, blinkUntil: 0, nextBlink: now + 1800 + Math.random() * 2500 };
    records.set(el, record);
    el.dataset.action = 'idle';
    el.dataset.paused = String(paused);
    draw(record, 0);
    schedule();
    return record;
  }

  function visible(el) {
    return el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
  }

  function tick(now) {
    frameRequest = null;
    if (paused || document.hidden) return;
    for (const record of records.values()) {
      if (!visible(record.el)) continue;
      if (now >= record.endsAt) {
        record.action = 'idle';
        record.el.dataset.action = 'idle';
        record.endsAt = Infinity;
        record.nextBlink = now + 1600 + Math.random() * 2800;
      }
      const elapsed = now - record.startedAt;
      let frame = 0;
      if (record.el.hasAttribute('data-hero')) {
        if (record.action === 'wave') frame = 2;
        else if (record.action === 'thinking') frame = 3;
        else if (record.action === 'turn') frame = 4;
        else if (record.action === 'profile') frame = 5;
        else if (record.action === 'sidewalk') frame = 6 + Math.floor(elapsed / 235) % 2;
        else {
          if (now >= record.nextBlink) {
            record.blinkUntil = now + 150;
            record.nextBlink = now + 2700 + Math.random() * 3500;
          }
          frame = now < record.blinkUntil ? 1 : 0;
        }
      }
      else if (record.action === 'wave') frame = 2 + Math.floor(elapsed / 180) % 2;
      else if (record.action === 'walk') frame = 4 + Math.floor(elapsed / 150) % 2;
      else if (record.action === 'thinking') frame = 6;
      else if (record.action === 'happy' || record.action === 'jump') frame = 7;
      else {
        if (now >= record.nextBlink) {
          record.blinkUntil = now + 150;
          record.nextBlink = now + 2700 + Math.random() * 3500;
        }
        frame = now < record.blinkUntil ? 1 : 0;
      }
      draw(record, frame);
    }
    schedule();
  }

  function schedule() {
    if (frameRequest === null && !paused && !document.hidden && records.size) frameRequest = requestAnimationFrame(tick);
  }

  function play(el, action = 'idle', duration = 1600) {
    if (!el || !actions.has(action)) return;
    const record = attach(el);
    record.action = action;
    record.startedAt = performance.now();
    record.endsAt = action === 'idle' ? Infinity : record.startedAt + duration;
    el.dataset.action = action;
    const initial = el.hasAttribute('data-hero') ? {wave:2,thinking:3,turn:4,profile:5,sidewalk:6} : {wave:2,walk:4,thinking:6,happy:7,jump:7};
    draw(record, paused ? 0 : (initial[action] || 0));
    schedule();
  }

  function outfit(el, name) {
    if (!el || !outfits.includes(name)) return;
    attach(el);
    el.classList.remove(...outfits);
    el.classList.add(name);
    el.dataset.outfit = name;
  }

  function setPaused(value) {
    value = Boolean(value);
    if (value === paused) return;
    const now = performance.now();
    if (value) {
      pausedAt = now;
      if (frameRequest !== null) cancelAnimationFrame(frameRequest);
      frameRequest = null;
    } else {
      const duration = now - pausedAt;
      for (const record of records.values()) {
        record.startedAt += duration;
        record.endsAt += duration;
        record.nextBlink += duration;
        record.blinkUntil += duration;
      }
    }
    paused = value;
    for (const record of records.values()) record.el.dataset.paused = String(paused);
    schedule();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && frameRequest !== null) {
      cancelAnimationFrame(frameRequest);
      frameRequest = null;
    } else schedule();
  });

  for (const path of Object.values(sheets)) {
    const image = new Image();
    image.src = path;
  }
  window.YingCharacter = { attach, outfit, play, setPaused };
})();

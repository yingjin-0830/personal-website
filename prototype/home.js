import { tileGeometry, magnification, ARC } from './components/arc-model.mjs?v=10.4-presentation-art';
import { typewriter, reducedMotion } from './components/typewriter.js';

const ns = 'http://www.w3.org/2000/svg';
const artRoot = 'assets/illustrations/cover-approved';
export const HOME_TILES = [
  { name: 'real-estate', title: 'Real Estate', zh: '房地产', subtitle: 'Marketing analysis · New York', subtitleZh: '市场分析 · 纽约', href: '#work/real-estate' },
  { name: 'sales-marketing', art: 'sales-marketing-presentation', title: 'Sales & Marketing', zh: '销售与市场', subtitle: 'Sunlight Development', subtitleZh: 'Sunlight Development', href: '#work/sales-marketing' },
  { name: 'data-analytics', title: 'Data & Analytics', zh: '数据分析', subtitle: 'SQL · Python · Tableau', subtitleZh: 'SQL · Python · Tableau', href: '#work/data-analytics' },
  { name: 'education', title: 'Education', zh: '教育', subtitle: 'Duke Fuqua · MSQM', subtitleZh: '杜克大学福库商学院 · MSQM', href: '#work/education' },
  { name: 'coffee', title: 'Coffee', zh: '咖啡', subtitle: 'A ritual, a little curiosity', subtitleZh: '日常仪式与好奇心', href: '#life/coffee' },
  { name: 'cooking', title: 'Cooking', zh: '烹饪', subtitle: 'A little room to experiment', subtitleZh: '在厨房里，留一点实验的空间', href: '#life/cooking' },
  { name: 'photography', art: 'photography-seated', title: 'Photography', zh: '摄影', subtitle: 'Light, streets & everyday details', subtitleZh: '光影、街道与日常细节', href: '#life/photography' },
  { name: 'travel', title: 'Travel', zh: '旅行', subtitle: 'The world, one place at a time', subtitleZh: '一点一点，解锁世界', href: '#life/travel' }
];
const make = (tag, attributes = {}) => { const el = document.createElementNS(ns, tag); for (const [key, value] of Object.entries(attributes)) el.setAttribute(key, value); return el; };

export function renderHome(language = 'en') {
  const zh = language === 'zh';
  return `<section class="home-stage" id="home-stage" data-side="none" aria-labelledby="home-title"><h1 id="home-title" class="sr-only">Ying Jin.</h1><div class="mobile-corners" aria-hidden="true"><div class="mobile-pro"><span class="kicker">${zh ? '职业篇章' : 'Professional'}</span><strong>${zh ? '← 我的工作' : '← What I do'}</strong></div><div class="mobile-per"><span class="kicker">${zh ? '生活篇章' : 'Personal'}</span><strong>${zh ? '我的生活 →' : 'Who I am →'}</strong></div></div><div class="arc-wrap"><svg class="home-svg" viewBox="0 0 1200 840" role="group" aria-label="${zh ? '左边是职业，右边是生活。选择一个篇章。' : 'Professional on the left, personal on the right. Choose a chapter.'}"><defs id="arc-clips"></defs><g class="arc-label arc-label-pro" aria-hidden="true"><text class="arc-kicker" x="24" y="78">${zh ? '职业篇章' : 'PROFESSIONAL'}</text><text class="arc-label-title" x="22" y="122">${zh ? '← 我的工作' : '← What I do'}</text></g><g class="arc-label arc-label-per" aria-hidden="true"><text class="arc-kicker" x="1176" y="78" text-anchor="end">${zh ? '生活篇章' : 'PERSONAL'}</text><text class="arc-label-title" x="1178" y="122" text-anchor="end">${zh ? '我的生活 →' : 'Who I am →'}</text></g><text class="home-greeting" x="600" y="262" text-anchor="middle" id="home-greeting"></text><g aria-hidden="true"><text class="home-name" x="600" y="392" text-anchor="middle">YING</text><text class="home-name" x="600" y="520" text-anchor="middle">JIN<tspan class="accent-period">.</tspan></text></g><g id="arc-tiles"></g><g id="arc-figures" aria-hidden="true" pointer-events="none"></g></svg><div class="arc-tooltip" role="tooltip" id="arc-tooltip" hidden></div></div></section>`;
}

export function mountHome(root, language = 'en') {
  const stage = root.querySelector('#home-stage'), svg = root.querySelector('.home-svg');
  const defs = root.querySelector('#arc-clips'), tiles = root.querySelector('#arc-tiles'), figures = root.querySelector('#arc-figures'), tooltip = root.querySelector('#arc-tooltip');
  const cleanup = [], entries = [];
  const listen = (el, name, fn, options) => { el.addEventListener(name, fn, options); cleanup.push(() => el.removeEventListener(name, fn, options)); };
  const zh = language === 'zh';
  HOME_TILES.forEach((tile, index) => {
    const geometry = tileGeometry(index), frame = geometry.image, art = tile.art || tile.name;
    const clip = make('clipPath', { id: `arc-clip-${index}` }); clip.append(make('path', { d: geometry.d })); defs.append(clip);
    const label = zh ? tile.zh : tile.title, subtitle = zh ? tile.subtitleZh : tile.subtitle;
    const link = make('a', { class: 'arc-tile', href: tile.href, tabindex: '0', role: 'link', 'aria-label': `${label} — ${subtitle}`, 'data-side': geometry.side, 'data-tile': tile.name });
    link.append(make('image', { href: `${artRoot}/${art}_full.webp`, ...frame, preserveAspectRatio: 'xMidYMid slice', 'clip-path': `url(#arc-clip-${index})` }), make('path', { d: geometry.d, class: 'arc-edge' }));
    const pop = make('g', { class: 'arc-pop', 'data-side': geometry.side });
    pop.append(make('image', { href: `${artRoot}/${art}_cut.webp`, ...frame, preserveAspectRatio: 'xMidYMid slice' }));
    // Transform both layers around the same reference canvas, never its visible alpha bounds.
    const left = Math.min(frame.x, geometry.box.x), right = Math.max(frame.x + frame.width, geometry.box.x + geometry.box.width);
    const top = Math.min(frame.y, geometry.box.y), bottom = Math.max(frame.y + frame.height, geometry.box.y + geometry.box.height);
    const origin = `${(left + right) / 2}px ${(top + bottom) / 2}px`;
    link.style.transformOrigin = pop.style.transformOrigin = origin;
    tiles.append(link); figures.append(pop);
    entries.push({ tile, geometry, link, pop, label, subtitle });
  });
  let locked = null, pointer = null, frameRequest = 0, focused = null;
  const setSide = side => { stage.dataset.side = side || 'none'; };
  const toSVG = event => {
    const matrix = svg.getScreenCTM();
    if (!matrix) return null;
    return new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
  };
  function dock(point) {
    const promoted = [];
    for (const entry of entries) {
      const active = !reducedMotion() && point && entry.geometry.side === stage.dataset.side;
      const distance = point ? Math.hypot(entry.geometry.center[0] - point.x, entry.geometry.center[1] - point.y) : Infinity;
      const scale = magnification(distance, Boolean(active));
      entry.link.style.transform = entry.pop.style.transform = `scale(${scale})`;
      if (scale > 1.12) promoted.push({ entry, scale });
    }
    promoted.sort((a, b) => a.scale - b.scale);
    // Preserve anchor focus; the decorative figures can always be restacked.
    if (!focused) promoted.forEach(({ entry }) => tiles.append(entry.link));
    const raised = new Set(promoted.map(({ entry }) => entry));
    const order = ARC.figureOrder.map(index => entries[index]).filter(entry => !raised.has(entry));
    order.push(...promoted.map(({ entry }) => entry));
    order.forEach((entry, index) => {
      if (figures.children[index] !== entry.pop) figures.insertBefore(entry.pop, figures.children[index] || null);
    });
  }
  dock(null);
  function hideTip() { tooltip.hidden = true; tooltip.classList.remove('is-visible'); }
  function showTip(entry) {
    tooltip.replaceChildren();
    const title = document.createElement('strong'), subtitle = document.createElement('span');
    title.textContent = entry.label; subtitle.textContent = entry.subtitle; tooltip.append(title, subtitle);
    tooltip.hidden = false; tooltip.classList.add('is-visible');
    const wrap = tooltip.parentElement.getBoundingClientRect(), bounds = entry.link.getBoundingClientRect();
    const half = tooltip.offsetWidth / 2;
    tooltip.style.left = `${Math.max(half, Math.min(wrap.width - half, bounds.x + bounds.width / 2 - wrap.x))}px`;
    tooltip.style.top = `${Math.max(tooltip.offsetHeight, bounds.y - wrap.y - 8)}px`;
    entry.link.setAttribute('aria-describedby', 'arc-tooltip');
  }
  listen(stage, 'pointermove', event => {
    if (event.pointerType === 'touch') return;
    pointer = toSVG(event); if (!pointer) return;
    setSide(locked || (pointer.x < ARC.cx ? 'pro' : 'per'));
    if (!frameRequest) frameRequest = requestAnimationFrame(() => { frameRequest = 0; dock(pointer); });
  });
  listen(stage, 'pointerleave', () => { pointer = null; if (!focused) setSide(locked); dock(null); hideTip(); });
  listen(stage, 'click', event => {
    if (event.target.closest('a,button')) return;
    const point = toSVG(event); if (!point) return;
    const side = point.x < ARC.cx ? 'pro' : 'per';
    locked = locked === side ? null : side; setSide(locked); dock(point);
    stage.dataset.locked = locked || 'none';
  });
  for (const entry of entries) {
    listen(entry.link, 'pointerenter', event => { if (event.pointerType !== 'touch') showTip(entry); });
    listen(entry.link, 'pointerleave', () => { entry.link.removeAttribute('aria-describedby'); hideTip(); });
    listen(entry.link, 'focus', () => {
      focused = entry; setSide(entry.geometry.side); dock({ x: entry.geometry.center[0], y: entry.geometry.center[1] }); showTip(entry);
    });
    listen(entry.link, 'blur', () => { focused = null; setSide(locked); dock(null); hideTip(); entry.link.removeAttribute('aria-describedby'); });
    listen(entry.link, 'keydown', event => {
      if (event.key === ' ') { event.preventDefault(); location.hash = entry.tile.href.slice(1); }
      else if (event.key === 'Escape') { locked = null; setSide(null); dock(null); hideTip(); }
    });
  }
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  listen(preference, 'change', () => dock(null));
  cleanup.push(typewriter(root.querySelector('#home-greeting'), zh ? '你好，我是' : "Hi, I'm"));
  return () => { cancelAnimationFrame(frameRequest); cleanup.forEach(fn => fn()); };
}

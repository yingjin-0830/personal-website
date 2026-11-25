const ns = 'http://www.w3.org/2000/svg';
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export function typewriter(element, text) {
  const svg = element.namespaceURI === ns;
  const timers = new Set();
  const later = (fn, delay) => { const id = setTimeout(() => { timers.delete(id); fn(); }, delay); timers.add(id); };
  const finish = () => { timers.forEach(clearTimeout); timers.clear(); element.textContent = text; };
  if (svg) { element.setAttribute('role', 'img'); element.setAttribute('aria-label', text); }
  element.textContent = '';
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) { finish(); return () => {}; }
  const css = getComputedStyle(document.documentElement);
  const timing = name => parseFloat(css.getPropertyValue(name));
  const caret = svg ? document.createElementNS(ns, 'tspan') : document.createElement('span');
  caret.classList.add('typing-caret'); caret.setAttribute('aria-hidden', 'true'); caret.textContent = '|';
  let run = element;
  if (!svg) {
    const readable = document.createElement('span');
    readable.className = 'sr-only'; readable.textContent = text;
    const reserve = document.createElement('span');
    reserve.className = 'typing-reserve'; reserve.setAttribute('aria-hidden', 'true'); reserve.textContent = text;
    run = document.createElement('span'); run.className = 'typing-run'; run.setAttribute('aria-hidden', 'true');
    element.append(readable, reserve, run);
  }
  run.append(caret);
  let index = 0;
  function step() {
    if (index < text.length) {
      const letter = svg ? document.createElementNS(ns, 'tspan') : document.createElement('span');
      letter.classList.add('typing-letter'); letter.setAttribute('aria-hidden', 'true');
      letter.textContent = text[index++] === ' ' ? '\u00a0' : text[index - 1];
      run.insertBefore(letter, caret);
      later(step, timing('--typewriter-letter'));
    } else later(() => caret.remove(), timing('--typewriter-caret-hold'));
  }
  const changed = () => { if (preference.matches) finish(); };
  preference.addEventListener('change', changed);
  later(step, timing('--typewriter-start'));
  return () => { timers.forEach(clearTimeout); preference.removeEventListener('change', changed); };
}

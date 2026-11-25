import './editorial-content.js';
import './i18n.js';
import './magnet-art.js';
import { renderHome, mountHome } from './home.js?v=10.4-presentation-art';
import { renderWork } from './components/work.js?v=10.5-inner-art';
import { renderLife, renderTravelCollection } from './components/life.js?v=10.5-inner-art';
import { renderHeader, renderFooter, syncModeLabel } from './components/site-chrome.js';
import { typewriter, reducedMotion } from './components/typewriter.js';
import { parseRoute, routeKey } from './components/routes.mjs?v=10.5-inner-art';

const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let language = 'en';
try { language = window.YingI18n.normalizeLocale(localStorage.getItem('ying-language')); } catch {}
const copy = (en, zh) => language === 'zh' ? zh : en;
const t = (key, variables) => window.YingI18n.translate(key, language, variables);
const localize = value => window.YingI18n.localize(value, language);
let current = null, dispose = () => {}, previousFocus = null;
const main = $('#main'), dialog = $('#detail');

function updateChrome(home) {
  $('#site-header').innerHTML = renderHeader(language, home);
  $('#site-footer').innerHTML = renderFooter(language);
  syncModeLabel(language);
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  $('.skip-link').textContent = copy('Skip to content','跳至正文');
  $('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
}
function pageHeading(page) {
  const work = page === 'work';
  return `<header class="page-header"><p class="kicker">${work ? copy('Professional','职业篇章') : copy('Personal','生活篇章')}</p><h1 class="page-title">${work ? 'WORK' : 'LIFE'}<span class="accent-period">.</span></h1><p class="accent-line" data-typewriter>${work ? copy('A practical mind. A curious perspective.','以务实的思考，保留好奇的视角。') : copy('A life, in all its little details.','生活，藏在每一个小小的细节里。')}</p></header>`;
}
function goToAnchor(anchor, { instant = false } = {}) {
  if (!anchor) { window.scrollTo({ top: 0, behavior: 'instant' }); return; }
  const target = document.getElementById(anchor);
  target?.scrollIntoView({ block: 'start', behavior: instant || reducedMotion() ? 'instant' : 'smooth' });
}
function renderRoute({ force = false, focus = false } = {}) {
  const next = parseRoute(location.hash);
  const changed = !current || routeKey(next) !== routeKey(current) || force;
  if (changed) {
    dispose(); dispose = () => {};
    if (dialog.open) dialog.close();
    updateChrome(next.page === 'home');
    document.body.dataset.page = next.page;
    if (next.page === 'home') {
      main.innerHTML = renderHome(language);
      dispose = mountHome(main, language);
    } else {
      main.innerHTML = `<div class="page content-frame">${pageHeading(next.page)}${next.page === 'work' ? renderWork(language) : next.collection ? renderTravelCollection(language) : renderLife(language)}</div>`;
      const line = main.querySelector('[data-typewriter]');
      dispose = typewriter(line, line.textContent);
    }
    main.classList.remove('page-enter'); void main.offsetWidth; main.classList.add('page-enter');
    if (focus) main.focus({ preventScroll: true });
  }
  current = next;
  document.title = `Ying Jin — ${next.page === 'home' ? 'Work & Life' : next.collection ? copy('The Travel Collection','旅行收藏') : next.page === 'work' ? copy('Work','职业篇章') : copy('Life','生活篇章')}`;
  requestAnimationFrame(() => { if (next.collection) window.scrollTo({ top: 0, behavior: 'instant' }); else goToAnchor(next.anchor, { instant: changed }); });
  $('#status').textContent = copy(`Opened ${next.page === 'home' ? 'home' : next.page}`, `已打开${next.page === 'home' ? '封面' : next.page === 'work' ? '职业篇章' : '生活篇章'}`);
}
function experienceBody(id) {
  const item = localize(window.YingContent.experiences[id]);
  return `<p class="kicker">${escapeHTML(item.organization)}</p><h2 id="detail-title">${escapeHTML(item.title)}<span class="accent-period">.</span></h2><p class="detail-meta">${escapeHTML([item.dates,item.location].filter(Boolean).join(' · '))}</p><p>${escapeHTML(item.lead)}</p><div class="detail-chips">${item.chips.map(c=>`<span>${escapeHTML(c)}</span>`).join('')}</div>${item.stats ? `<div class="detail-stats">${item.stats.map(s=>`<div><strong>${escapeHTML(s.value)}</strong><span>${escapeHTML(s.label)}</span></div>`).join('')}</div>` : ''}${item.sections.map(s=>`<section><h3>${escapeHTML(s.title)}</h3>${s.text?`<p>${escapeHTML(s.text)}</p>`:''}${s.items?`<ul>${s.items.map(i=>`<li>${escapeHTML(i)}</li>`).join('')}</ul>`:''}</section>`).join('')}${item.website?`<a class="text-link" href="${escapeHTML(item.website)}" target="_blank" rel="noopener noreferrer">${t('companyWebsite')}</a>`:''}`;
}
function placeBody(id) {
  const place = localize(window.YingContent.places[id]);
  return `<article class="place-detail"><div class="place-detail-art" aria-hidden="true">${window.YingMagnets.svg(id)}</div><div><p class="kicker">${escapeHTML(place.region)}</p><h2 id="detail-title">${escapeHTML(place.title)}<span class="accent-period">.</span></h2><p>${escapeHTML(place.line)}</p><p>${escapeHTML(place.description)}</p>${place.locked?'':`<p class="muted">${t('topicContentNote')}</p>`}</div></article>`;
}
function openDialog(kind, id, trigger) {
  previousFocus = trigger; dialog.dataset.kind = kind;
  $('#resume-save').hidden = kind !== 'resume';
  $('#resume-save').textContent = copy('Download','下载');
  $('[data-close-detail]').textContent = copy('Close','关闭');
  $('#detail-kicker').textContent = kind === 'resume' ? copy('Resume','简历') : kind === 'place' ? copy('Travel collection','旅行收藏') : copy('Selected work','职业篇章');
  $('#detail-content').innerHTML = kind === 'resume' ? `<h2 id="detail-title" class="sr-only">${t('resumePreview')}</h2><a class="resume-document" href="assets/docs/Ying-Jin-Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="${t('resumeOpen')}"><img src="assets/docs/Ying-Jin-Resume-preview.webp" width="1323" height="1871" alt="${t('resumePreview')}"></a>` : kind === 'place' ? placeBody(id) : experienceBody(id);
  if (!dialog.open) dialog.showModal();
  $('[data-close-detail]').focus({ preventScroll: true });
  $('.dialog-shell').classList.remove('page-enter'); void $('.dialog-shell').offsetWidth; $('.dialog-shell').classList.add('page-enter');
}
function toggleMode() {
  const next = document.documentElement.dataset.mode === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.mode = next;
  try { localStorage.setItem('yj-mode',next); } catch {}
  syncModeLabel(language);
  $('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
}
document.addEventListener('click', event => {
  const target = event.target.closest('a,button'); if (!target) return;
  if (target.matches('.skip-link')) { event.preventDefault(); main.focus({preventScroll:true}); main.scrollIntoView({block:'start',behavior:'instant'}); }
  else if (target.matches('[data-mode-toggle]')) toggleMode();
  else if (target.matches('[data-language-toggle]')) {
    const scroll = window.scrollY;
    language = language === 'en' ? 'zh' : 'en';
    try { localStorage.setItem('ying-language',language); } catch {}
    renderRoute({ force: true });
    requestAnimationFrame(() => window.scrollTo({ top: scroll, behavior:'instant' }));
  } else if (target.matches('[data-resume]')) { event.preventDefault(); openDialog('resume', null, target); }
  else if (target.matches('[data-close-detail]')) dialog.close();
  else if (target.matches('[data-experience]')) openDialog('experience',target.dataset.experience,target);
  else if (target.matches('[data-place]')) openDialog('place',target.dataset.place,target);
});
dialog.addEventListener('close', () => { previousFocus?.isConnected && previousFocus.focus({ preventScroll:true }); });
dialog.addEventListener('click', event => { const box = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close(); });
window.addEventListener('hashchange', () => renderRoute({ focus: true }));
window.addEventListener('storage', event => { if (event.key === 'yj-mode' && ['dark','light'].includes(event.newValue)) { document.documentElement.dataset.mode = event.newValue; syncModeLabel(language); } });
renderRoute();

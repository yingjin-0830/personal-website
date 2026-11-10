(()=>{
 const e=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function messages(language){return {t:(key,vars)=>window.YingI18n.translate(key,language,vars),l:value=>window.YingI18n.localize(value,language)};}
 function topicCards(language){
  const {t,l}=messages(language);
  return Object.entries(window.YingContent.topics).map(([id,value],i)=>{const topic=l(value);return `<button class="floating-topic" data-topic="${id}" style="--order:${i}" aria-label="${e(t('chooseMagnet',{place:topic.title}))}"><span class="floating-topic-inner"><span class="object-art" aria-hidden="true"></span><span class="object-label">${e(topic.title)}</span><span class="object-caption">${e(topic.caption)}</span></span></button>`;}).join('');
 }
 function album(t,kind='travel'){
  return `<section class="travel-album"><h3 class="micro">${t(kind==='travel'?'travelPhotos':'topicPhotos')}</h3><div class="album-space"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 7h28v26H6Z M10 27l8-10 6 6 3-4 7 8"/><circle cx="27" cy="14" r="3"/></svg><p>${t(kind==='travel'?'travelPhotosSoon':'chapterBeginning')}</p></div><p>${t(kind==='travel'?'travelNote':'topicContentNote')}</p></section>`;
 }
 function topicBody(id,language){
  const {t,l}=messages(language),topic=l(window.YingContent.topics[id]);
  const portrait=`<div class="themed-portrait" data-theme="${id}" role="img" aria-label="${e(t('topicPortrait',{topic:topic.title}))}"><span class="theme-pose theme-pose-calm"></span><span class="theme-pose theme-pose-active"></span><span class="portrait-caption" aria-hidden="true">YING / ${e(topic.title.toUpperCase())}</span></div>`;
  return `<div class="place-story topic-story">${portrait}<div class="topic-prose"><p class="micro">${e(topic.label)}</p><h2 id="detail-title">${e(topic.title)}</h2><p class="detail-lead">${e(topic.lead)}</p><div class="place-notes">${topic.sections.map(section=>`<h3>${e(section.title)}</h3><p>${e(section.text)}</p>`).join('')}</div>${id==='travel'?`<button class="travel-collection-action" data-travel-collection>${t('viewTravel')} <span aria-hidden="true">+</span></button>`:''}</div></div>${album(t,'topic')}`;
 }
 function placeBody(id,language){
  const {t,l}=messages(language),p=l(window.YingContent.places[id]);
  return `<div class="place-story"><div class="place-art">${window.YingMagnets.svg(id)}</div><div><h2 id="detail-title">${e(p.title)}</h2><p class="detail-lead">${e(p.line)}</p><div class="place-notes"><h3>${t(p.locked?'explorationKicker':'placeLocation')}</h3><p>${e(p.region)}</p><h3>${t(p.locked?'explorationNote':'magnetDescription')}</h3><p>${e(p.description)}</p></div></div></div>${p.locked?'':album(t)}`;
 }
 function contactBody(language){
  const {t}=messages(language),email=window.YingContent.profile.email;
  return `<div class="contact-body"><h2 id="detail-title">${t('contactTitle')}</h2><p class="detail-lead">${t('contactLead')}</p><p class="micro contact-email-label">${t('contactEmailLabel')}</p><a class="contact-email" href="mailto:${e(email)}">${e(email)}</a><div class="contact-actions"><a href="mailto:${e(email)}">${t('sendEmail')}</a><button data-copy-email>${t('copyEmail')}</button></div><p id="copy-status" class="copy-status" role="status" aria-live="polite"></p></div>`;
 }
 window.YingPersonalView={topicCards,topicBody,placeBody,contactBody};
})();

(()=>{
 const e=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function messages(language){return {t:(key,vars)=>window.YingI18n.translate(key,language,vars),l:value=>window.YingI18n.localize(value,language)};}
 function topicCards(language){
  const {t,l}=messages(language);
  return Object.entries(window.YingContent.topics).map(([id,value],i)=>{const topic=l(value);return `<button class="topic-card" data-topic="${id}" aria-label="${e(t('chooseMagnet',{place:topic.title}))}"><div class="topic-cover">${window.YingPersonalArt.svg(id).replace('<svg ','<svg preserveAspectRatio="xMidYMid slice" ')}</div><div class="topic-caption"><span class="topic-index">${String(i+1).padStart(2,'0')} / ${e(topic.label)}</span><h3>${e(topic.title)}</h3><p>${e(topic.caption)}</p>${id==='travel'?`<span class="topic-travel-count">${t('collectionCount')}</span>`:''}</div></button>`;}).join('');
 }
 function album(t,kind='travel'){
  return `<section class="travel-album"><h3 class="micro">${t(kind==='travel'?'travelPhotos':'topicPhotos')}</h3><div class="album-space"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 7h28v26H6Z M10 27l8-10 6 6 3-4 7 8"/><circle cx="27" cy="14" r="3"/></svg><p>${t(kind==='travel'?'travelPhotosSoon':'chapterBeginning')}</p></div><p>${t(kind==='travel'?'travelNote':'topicContentNote')}</p></section>`;
 }
 function topicBody(id,language){
  const {t,l}=messages(language),topic=l(window.YingContent.topics[id]);
  return `<div class="place-story topic-story"><div class="place-art topic-art">${window.YingPersonalArt.svg(id)}</div><div><h2 id="detail-title">${e(topic.title)}</h2><p class="detail-lead">${e(topic.lead)}</p><div class="place-notes">${topic.sections.map(section=>`<h3>${e(section.title)}</h3><p>${e(section.text)}</p>`).join('')}</div></div></div>${album(t,'topic')}`;
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

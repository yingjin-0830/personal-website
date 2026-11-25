const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const choose = (language, en, zh) => language === 'zh' ? zh : en;

function topicData(language) {
  const localize = value => window.YingI18n.localize(value, language);
  const topics = window.YingContent.topics;
  return [
    ['fitness','wellness','inner-approved/wellness'], ['cooking','cooking','cover-approved/cooking'],
    ['travel','travel','cover-approved/travel'], ['coffee','coffee','cover-approved/coffee'],
    ['music','music','inner-approved/music'], ['photography','photography','cover-approved/photography-seated']
  ].map(([key,id,image]) => {
    const topic = localize(topics[key]);
    return {id,image,title:topic.title,label:topic.label,lead:topic.lead,text:topic.sections.map(section => section.text).join(' ')};
  });
}

function illustration(topic, language) {
  const alt = choose(language, `Ying — ${topic.title.toLowerCase()} illustration`, `Ying 的${topic.title}主题插画`);
  const hd = topic.image.startsWith('cover-approved/') || topic.image.startsWith('inner-approved/');
  const width = hd ? 1024 : 900, height = hd ? 1536 : 1200, cutFormat = hd ? 'webp' : 'png';
  // Each full/cut pair shares its intrinsic canvas; only the scene is clipped.
  return `<figure class="life-illustration"><img class="life-scene-full" src="assets/illustrations/${topic.image}_full.webp" width="${width}" height="${height}" alt="" loading="lazy" decoding="async"><span class="life-scene-edge" aria-hidden="true"></span><img class="life-scene-cut" src="assets/illustrations/${topic.image}_cut.${cutFormat}" width="${width}" height="${height}" alt="${escape(alt)}" loading="lazy" decoding="async"></figure>`;
}

export function renderLife(language = 'en') {
  const topics = topicData(language);
  return `<nav class="life-index" aria-label="${choose(language,'Life chapters','生活篇章')}">${topics.map(topic => `<a href="#life/${topic.id}">${escape(topic.title)}</a>`).join('')}</nav>
    <div class="life-list focus-group">${topics.map((topic,index) => `<section class="life-block focus-item" id="${topic.id}" aria-labelledby="life-${topic.id}-title">
      ${illustration(topic,language)}
      <div class="life-copy"><p class="kicker">${String(index+1).padStart(2,'0')} / ${escape(topic.label)}</p><h2 id="life-${topic.id}-title" class="section-title">${escape(topic.title)}<span class="accent-period">.</span></h2><p class="life-lead">${escape(topic.lead)}</p><p>${escape(topic.text)}</p>${topic.id==='travel'?`<a class="text-link" href="#life/travel/collection">${choose(language,'Open the magnet collection','打开冰箱贴收藏')}</a>`:''}</div>
    </section>`).join('')}</div>`;
}

export function renderTravelCollection(language = 'en') {
  const {translate,localize} = window.YingI18n;
  const t = (key,vars) => translate(key,language,vars);
  const entries = Object.entries(window.YingContent.places);
  const magnets = entries.map(([id,place]) => {
    const item = localize(place,language), name = place.locked ? t('unwritten') : item.title;
    const label = place.locked ? `${name} — ${t('chooseSecret')}` : t('chooseMagnet',{place:name});
    return `<button type="button" class="magnet${place.locked?' magnet-locked':''}" data-place="${escape(id)}" aria-label="${escape(label)}"><img src="assets/magnets/${escape(id)}.svg" alt="" aria-hidden="true" loading="lazy" decoding="async"><span class="magnet-tooltip">${escape(name)}</span></button>`;
  }).join('');
  const index = entries.map(([id,place],position) => {
    const item = localize(place,language), name = place.locked ? t('unwritten') : item.title;
    return `<button type="button" data-place="${escape(id)}"><span class="magnet-index-number" aria-hidden="true">${String(position+1).padStart(2,'0')}</span><span class="place-name">${escape(name)}</span><span aria-hidden="true">+</span></button>`;
  }).join('');
  return `<div class="travel-collection"><a class="text-link collection-back" href="#life/travel">${choose(language,'Back to Life','返回生活篇章')}</a><div class="collection-heading"><p class="kicker">${choose(language,'THE MAGNET COLLECTION','冰箱贴收藏')}</p><h2 class="section-title">${choose(language,'Places, kept','把走过的地方留下')}<span class="accent-period">.</span></h2></div><div class="collection-layout expanded-collection"><div class="collection-display"><div class="magnet-frame" role="group" aria-label="${escape(t('boardLabel'))}"><div class="magnet-surface" id="magnet-board">${magnets}</div></div><p class="collection-imprint">${escape(t('collectionCount'))}</p></div><aside class="collection-index"><h3 class="kicker">${escape(t('collectionKicker'))}</h3><div class="magnet-index" id="place-index">${index}</div></aside></div></div>`;
}

export function mountTravelCollection(root, language = 'en') {
  root.innerHTML = renderTravelCollection(language);
}

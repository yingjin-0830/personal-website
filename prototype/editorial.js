const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const {experiences,places,topics,profile}=window.YingContent;
const {translate,localize,normalizeLocale}=window.YingI18n;
let language='en',activePlace=null,activeTopic=null,personalArea='overview',detailOrigin=null,detailMotionVersion=0;
try{language=normalizeLocale(localStorage.getItem('ying-language'));}catch{}
const t=(key,variables)=>translate(key,language,variables),localized=value=>localize(value,language);
let route='home',routeBusy=false,opening=false,closing=false;
let chapter='work',sceneIndex=0,desiredScene=0,sceneChanging=false,scrollFrame=0,sceneToken=0,lastFocused=null,activityStep=0,navigationVersion=0;
const chapterIds=['work','projects','education'],indices={work:0,projects:0,education:0};
const hero=$('#cover-character'),actor=$('#case-person'),dialog=$('#detail'),scroller=$('#chapter-scroll'),stage=$('.editorial-stage');
const coverPhoto=$('#case-photo'),ghost=$('#case-ghost');
ghost.innerHTML=$('#case-card').innerHTML;$$('[id]',ghost).forEach(el=>el.removeAttribute('id'));
let ghostId=null;
coverPhoto.addEventListener('error',()=>{if(coverPhoto.getAttribute('src'))$('.case-cover').classList.add('photo-error');});
coverPhoto.addEventListener('load',()=>$('.case-cover').classList.remove('photo-error'));
const chapters={
 work:{kicker:'01 / EXPERIENCE',title:'Work,<br>in <em>focus.</em>',intro:'Sales analytics, market intelligence<br>and smarter business operations.',tools:['SQL','Python','Tableau','AI workflows'],items:['sunlight','kuaishou','deloitte','accenture']},
 projects:{kicker:'02 / SELECTED PROJECTS',title:'Curiosity,<br><em>applied.</em>',intro:'Questions worth asking.<br>Ideas worth putting to work.',tools:['R','Python','Tableau','Risk analysis'],items:['household','vision','horses','walmart']},
 education:{kicker:'03 / FOUNDATIONS',title:'Always<br><em>learning.</em>',intro:'The foundations.<br>And an appetite to keep going.',tools:['Business analytics','Economics'],items:['duke','uibe']}
};
const {createJourney,chapterProgress,topForChapterScene}=window.YingJourney;
const scenes=createJourney(chapterIds,chapters);
$('.chapter-track').style.height=`${100+(scenes.length-1)*110}%`;
$('#journey-progress').setAttribute('aria-valuemax',scenes.length);
const covers={
 "sunlight": {
  "category": "WORK / NEW YORK",
  "display": "Sales, seen<br>clearly.",
  "subject": "6 PROJECTS · NEARLY 1,000 UNITS",
  "company": "Sunlight Development",
  "title": "Marketing Analyst",
  "color": "#d5dac9",
  "ink": "#354333",
  "photo": {
   "src": "assets/covers/sunlight.jpg",
   "alt": "Illustrative New York skyline",
   "position": "50% 50%",
   "credit": "Pexels",
   "source": "https://www.pexels.com/photo/stunning-new-york-city-skyline-from-hudson-river-35990797/",
   "license": "Pexels License",
   "licenseURL": "https://www.pexels.com/license/",
   "illustrative": true
  }
 },
 "kuaishou": {
  "category": "WORK / BEIJING",
  "display": "Commerce,<br>in motion.",
  "subject": "LIVE-COMMERCE · MERCHANT ANALYTICS",
  "company": "Kuaishou Technology",
  "title": "Industry Analyst Intern",
  "color": "#e5ceb7",
  "ink": "#53412e",
  "photo": {
   "src": "assets/covers/kuaishou.jpg",
   "alt": "Illustrative automotive showroom",
   "position": "50% 55%",
   "credit": "Pexels",
   "source": "https://www.pexels.com/photo/a-white-car-in-a-showroom-10358213/",
   "license": "Pexels License",
   "licenseURL": "https://www.pexels.com/license/",
   "illustrative": true
  }
 },
 "deloitte": {
  "category": "WORK / BEIJING",
  "display": "From insight<br>to rollout.",
  "subject": "RETAIL ANALYTICS · PRODUCT TESTING",
  "company": "Deloitte",
  "title": "Business Analyst Intern",
  "color": "#d5decf",
  "ink": "#2d4032",
  "photo": {
   "src": "assets/covers/deloitte.jpg",
   "alt": "Illustrative workspace and laptop",
   "position": "50% 50%",
   "credit": "Pexels",
   "source": "https://www.pexels.com/photo/modern-workspace-with-laptop-and-books-on-desk-36123565/",
   "license": "Pexels License",
   "licenseURL": "https://www.pexels.com/license/",
   "illustrative": true
  }
 },
 "accenture": {
  "category": "WORK / BEIJING",
  "display": "Data that<br>moves work.",
  "subject": "1.5M+ RECORDS · SQL SERVER · TABLEAU",
  "company": "Accenture",
  "title": "Project Data Associate Intern",
  "color": "#d9d2e6",
  "ink": "#493b59",
  "photo": {
   "src": "assets/covers/accenture.jpg",
   "alt": "Illustrative desk and laptop",
   "position": "50% 55%",
   "credit": "Pexels",
   "source": "https://www.pexels.com/photo/laptop-lying-on-a-desk-standing-in-front-of-windows-6372950/",
   "license": "Pexels License",
   "licenseURL": "https://www.pexels.com/license/",
   "illustrative": true
  }
 },
 "household": {
  "category": "ECONOMETRICS / R",
  "display": "Behind the<br>household.",
  "subject": "INCOME · CAUSAL INFERENCE",
  "company": "Econometric modeling",
  "title": "Household income",
  "color": "#be7056",
  "ink": "#fff0df",
  "photo": {
   "src": "assets/covers/household.jpg",
   "alt": "Illustrative family in a kitchen",
   "position": "50% 45%",
   "credit": "Pexels",
   "source": "https://www.pexels.com/photo/a-low-angle-shot-of-a-family-preparing-food-in-the-kitchen-8507649/",
   "license": "Pexels License",
   "licenseURL": "https://www.pexels.com/license/",
   "illustrative": true
  }
 },
 "vision": {
  "category": "MACHINE LEARNING / PYTHON",
  "display": "A fresh<br>perspective.",
  "subject": "COMPUTER VISION · CLASSIFICATION",
  "company": "Vegetable recognition",
  "title": "Teaching machines to see",
  "color": "#293e41",
  "ink": "#f2edda",
  "photo": {
   "src": "assets/covers/vision.jpg",
   "alt": "Illustrative fresh vegetables at a market",
   "position": "50% 50%",
   "credit": "Pexels",
   "source": "https://www.pexels.com/photo/assorted-fresh-ripe-vegetables-in-market-stall-3873912/",
   "license": "Pexels License",
   "licenseURL": "https://www.pexels.com/license/",
   "illustrative": true
  }
 },
 "horses": {
  "category": "DATA SCIENCE / R + TABLEAU",
  "display": "Better data.<br>Better care.",
  "subject": "HEALTH · PREDICTION · DECISIONS",
  "company": "Horse health analysis",
  "title": "Decisions that matter",
  "color": "#d7cbb7",
  "ink": "#3a4436",
  "photo": {
   "src": "assets/covers/horses.jpg",
   "alt": "Illustrative horse in a pasture",
   "position": "50% 40%",
   "credit": "Pexels",
   "source": "https://www.pexels.com/photo/horse-on-pasture-15815286/",
   "license": "Pexels License",
   "licenseURL": "https://www.pexels.com/license/",
   "illustrative": true
  }
 },
 "walmart": {
  "category": "RISK MANAGEMENT / PESTEL + ERM",
  "display": "Retail risk,<br>in view.",
  "subject": "FINANCIAL SERVICES · RISK INDICATORS",
  "company": "Walmart risk analysis",
  "title": "A framework for better decisions",
  "color": "#cdd8de",
  "ink": "#344652",
  "photo": {
   "src": "assets/covers/walmart.jpg",
   "alt": "Illustrative supermarket shelves",
   "position": "50% 50%",
   "credit": "Pexels",
   "source": "https://www.pexels.com/photo/products-displayed-inside-a-supermarket-12081286/",
   "license": "Pexels License",
   "licenseURL": "https://www.pexels.com/license/",
   "illustrative": true
  }
 },
 "duke": {
  "category": "DUKE UNIVERSITY / MAY 2024",
  "display": "Connecting<br>the dots.",
  "subject": "THE FUQUA SCHOOL OF BUSINESS",
  "company": "Duke University",
  "title": "M.S. Quantitative Management",
  "color": "#35465e",
  "ink": "#f2edda",
  "photo": {
   "src": "assets/covers/duke.jpg",
   "alt": "Duke Chapel near sunset at Duke University",
   "position": "50% 43%",
   "credit": "Brian Carlson",
   "source": "https://commons.wikimedia.org/wiki/File:Duke_Chapel_near_sunset_(351114700).jpg",
   "license": "CC BY-SA 2.0",
   "licenseURL": "https://creativecommons.org/licenses/by-sa/2.0/",
   "illustrative": false
  }
 },
 "uibe": {
  "category": "UIBE / JUN 2023",
  "display": "A foundation<br>in economics.",
  "subject": "UNIVERSITY OF INTERNATIONAL BUSINESS AND ECONOMICS",
  "company": "University of International Business and Economics",
  "title": "B.A. Economics",
  "color": "#c9cdbd",
  "ink": "#414b38",
  "photo": {
   "src": "assets/covers/uibe.jpg",
   "alt": "Illustrative library books, not the UIBE campus",
   "position": "50% 50%",
   "credit": "Pexels",
   "source": "https://www.pexels.com/photo/books-in-library-3747531/",
   "license": "Pexels License",
   "licenseURL": "https://www.pexels.com/license/",
   "illustrative": true
  }
 }
};
function draw(el,frame){
 el.dataset.frame=frame;
 const outfit=el.dataset.kind==='hero'?'hero':el.dataset.outfit||'work';
 const sprite=$('.sprite',el);
 if(outfit==='hero'){sprite.style.backgroundImage="url('assets/living-edition/hero-fashion.webp')";sprite.style.backgroundSize='200% 200%';sprite.style.backgroundPosition=`${frame%2*100}% ${Math.floor(frame/2)*100}%`;return;}
 sprite.style.backgroundImage=`url('assets/editorial-hd/${outfit}-${Math.floor(frame/2)}.webp')`;
 sprite.style.backgroundPosition=`${frame%2*100}% 0`;
}
function pose(el,name='stand'){
 const heroKind=el.dataset.kind==='hero';
 const map=heroKind?{stand:0,blink:1,wave:2,think:3}:{stand:0,lean:1,laptop:2,blink:3,think:7,books:8,read:9};
 el.dataset.pose=name;draw(el,map[name]??0);
}
const animate=window.YingMotion.animate;
hero.addEventListener('click',()=>{if(!routeBusy){pose(hero,'think');$('#status').textContent=t('thinking');}});
async function navigate(next,{instant=false,section=chapter,entry,focus=true}={}){
 if(!['home','professional','personal'].includes(next)||routeBusy)return;
 if(next===route&&!instant){if(next==='professional'&&(section!==chapter||entry))goScene(resolveScene(section,entry));else if(next==='personal')await changePersonalArea(section==='travel'?'travel':'overview');return;}
 routeBusy=true;journeyCoordinator.cancel();navigationVersion++;sceneToken++;sceneChanging=false;stage.classList.remove('changing','changing-chapter');stage.setAttribute('aria-busy','false');
 if(dialog.open){detailMotionVersion++;window.YingMotion.cancel($('#detail-content'));window.YingMotion.cancel($('.detail-paper'));window.YingMotion.cancel(actor);dialog.close();}
 const previous=$(`#${route}`),changed=next!==route;
 const swap=()=>{
  pose(hero,'stand');
  $$('.view').forEach(el=>el.hidden=el.id!==next);route=next;document.body.dataset.view=route;
  $$('.masthead [data-route]').forEach(el=>{el.classList.toggle('active',el.dataset.route===route);el.setAttribute('aria-current',el.dataset.route===route?'page':'false');});
  window.scrollTo({top:0,behavior:'instant'});
  if(route==='professional'){
   section=chapterIds.includes(section)?section:'work';const target=resolveScene(section,entry);showScene(target,true);
   scroller.scrollTo({top:topForChapterScene(target,scrollRange(),chapters),behavior:'instant'});updateJourneyProgress();
  }else if(route==='personal')showPersonalArea(section==='travel'?'travel':'overview');
  else history.replaceState(null,'',`#${route}`);
  updateDocumentTitle();
 };
 try{
  if(!instant&&changed&&document.startViewTransition){
   document.body.dataset.transitionEngine='native';
   const transition=document.startViewTransition(swap);
   await transition.finished.catch(()=>{});
  }else if(!instant&&changed){
   document.body.dataset.transitionEngine='crossfade';
   previous.style.setProperty('--outgoing-height',`${previous.offsetHeight}px`);
   previous.style.setProperty('--outgoing-top',`${-window.scrollY}px`);
   previous.classList.add('route-outgoing');swap();previous.hidden=false;
   try{await Promise.all([
    animate(previous,[{opacity:1},{opacity:0}],420),
    animate($(`#${route}`),[{opacity:0},{opacity:1}],420)
   ]);}finally{previous.hidden=true;previous.classList.remove('route-outgoing');previous.style.removeProperty('--outgoing-height');previous.style.removeProperty('--outgoing-top');}
  }else swap();
 }finally{routeBusy=false;}
 if(focus)(route==='professional'?scroller:$('#main')).focus({preventScroll:true});
 $('#status').textContent=t('opened',{page:t(route==='home'?'navCover':route==='professional'?'navProfessional':'navPersonal')});
 if(route==='home')window.YingBook.enterHome();
}
function scenePoses(){return chapter==='education'?['books','read','lean','laptop','think']:['lean','laptop','think'];}
function renderCase(id,root){
 const c=localized(covers[id]),item=localized(experiences[id]),cover=$('.case-cover',root),photo=$('.case-photo',root);
 cover.classList.toggle('has-photo',Boolean(c.photo));cover.classList.remove('photo-error');
 photo.hidden=!c.photo;if(c.photo){photo.src=c.photo.src;photo.alt=c.photo.alt;photo.style.objectPosition=c.photo.position;}else{photo.removeAttribute('src');photo.alt='';}
 cover.style.setProperty('--cover',c.color);cover.style.setProperty('--cover-ink',c.ink);
 $('.case-category',root).textContent=c.category;$('.case-display',root).innerHTML=c.display;$('.case-subject',root).textContent=c.subject;
 $('.case-company',root).textContent=c.company;$('.case-title',root).textContent=c.title;
 $('.case-meta',root).textContent=[item.dates,item.location].filter(Boolean).join(' · ');
 const logo=$('.case-logo',root);logo.hidden=!item.logo;logo.dataset.surface=item.logo?.surface||'light';if(item.logo){logo.src=item.logo.src;logo.alt=`${item.logo.name} ${t('logo')}`;}else{logo.removeAttribute('src');logo.alt='';}
 $('.case-explore',root).textContent=t('readStory');
 if(root===ghost)return;
 root.setAttribute('aria-label',`${t('read')} ${c.company}: ${c.title}`);
}
function renderCard(){
 const group=chapters[chapter],id=group.items[indices[chapter]];
 renderCase(id,$('#case-card'));ghostId=null;
 $('#case-count').textContent=`${String(indices[chapter]+1).padStart(2,'0')} / ${String(group.items.length).padStart(2,'0')}`;
 actor.dataset.outfit=chapter;const poses=scenePoses();activityStep=indices[chapter]%poses.length;pose(actor,poses[activityStep]);
}
function scrollRange(){return Math.max(0,scroller.scrollHeight-scroller.clientHeight);}
function resolveScene(section,entry){
 const index=scenes.findIndex(s=>s.chapter===section&&(entry?s.id===entry:s.index===indices[section]));
 return index<0?Math.max(0,scenes.findIndex(s=>s.chapter===section)):index;
}
function updateJourneyProgress(){
 const range=scrollRange(),progress=range?Math.max(0,Math.min(1,scroller.scrollTop/range)):0;
 stage.style.setProperty('--journey-progress',`${progress*100}%`);
 const state=chapterProgress(scroller.scrollTop,range,chapters);
 if(state.sceneIndex!==sceneIndex)showScene(state.sceneIndex,true);
 $('#case-card').style.transform=`translateX(${state.offset*100}%)`;
 ghost.hidden=state.neighborIndex===null;
 if(state.neighborIndex!==null){
  const id=scenes[state.neighborIndex].id;
  if(ghostId!==id){renderCase(id,ghost);ghostId=id;}
  ghost.style.transform=`translateX(${state.neighborOffset*100}%)`;
 }
 stage.style.setProperty('--chapter-opacity',Math.max(0,1-Math.abs(state.chapterOffset)*2));
 stage.style.setProperty('--chapter-rise',`${state.chapterOffset*-70}px`);
 stage.style.setProperty('--actor-opacity',Math.max(0,1-Math.abs(state.offset)*2));
 stage.style.setProperty('--actor-shift',`${state.offset*110}px`);
 $$('.chapter-nav [data-chapter]').forEach((button,index)=>{
  const distance=index-state.chapterPosition;
  button.style.setProperty('--rail-position',distance);
  button.style.setProperty('--rail-scale',Math.max(.68,1-Math.abs(distance)*.21));
  button.style.setProperty('--rail-opacity',Math.max(.13,1-Math.abs(distance)*.66));
 });
}
function showScene(index){
 sceneIndex=Math.max(0,Math.min(scenes.length-1,index));desiredScene=sceneIndex;sceneChanging=false;
 const scene=scenes[sceneIndex];chapter=scene.chapter;indices[chapter]=scene.index;
 const i=chapterIds.indexOf(chapter),c=localized(chapters[chapter]);
 $('#chapter-kicker').textContent=c.kicker;$('#chapter-title').innerHTML=c.title;$('#chapter-intro').innerHTML=c.intro;
 $('#stage-skills').innerHTML=c.tools.map(x=>`<span>${x}</span>`).join('');$('.chapter-number').textContent=String(i+1).padStart(2,'0');
 $$('.chapter-nav [data-chapter]').forEach(b=>{b.classList.toggle('active',b.dataset.chapter===chapter);b.setAttribute('aria-current',b.dataset.chapter===chapter?'location':'false');});
 $$('.stage-progress i').forEach((el,index)=>el.classList.toggle('active',index===i));
 const next=scenes[sceneIndex+1];
 $('#scroll-next').textContent=!next?t('scrollEnd'):next.chapter!==chapter?`${t('keepScrolling')} / ${t(next.chapter).toUpperCase()}`:t('scrollNext');
 $('#journey-count').textContent=`${String(sceneIndex+1).padStart(2,'0')} / ${String(scenes.length).padStart(2,'0')}`;
 $('#journey-progress').setAttribute('aria-valuenow',sceneIndex+1);
 renderCard();stage.dataset.scene=scene.id;stage.dataset.sceneIndex=sceneIndex;
 stage.classList.remove('changing','changing-chapter');stage.setAttribute('aria-busy','false');
 if(route==='professional')history.replaceState(null,'',`#professional/${chapter}/${scene.id}`);
 $('#status').textContent=`${c.kicker}: ${t(covers[scene.id].company)}. ${t('storyCount',{index:sceneIndex+1,total:scenes.length})}`;
}
function goScene(index,behavior='smooth'){
 scroller.scrollTo({top:topForChapterScene(index,scrollRange(),chapters),behavior});
 if(behavior==='instant')updateJourneyProgress();
}
function goChapter(id){const index=scenes.findIndex(s=>s.chapter===id);if(index>=0)goScene(index);}
const journeyCoordinator=window.YingJourney.createScrollCoordinator({
 requestFrame:fn=>requestAnimationFrame(fn),cancelFrame:id=>cancelAnimationFrame(id),readIndex:()=>sceneIndex,
 render:updateJourneyProgress,restoreIndex:target=>{if(route==='professional'){showScene(target,true);goScene(target,'instant');}}
});
scroller.addEventListener('scroll',()=>{
 if(route!=='professional'||opening||dialog.open)return;
 journeyCoordinator.scroll();
},{passive:true});
scroller.addEventListener('keydown',e=>{
 if(e.target!==scroller&&!['PageDown','PageUp','Home','End'].includes(e.key))return;
 const delta=['ArrowDown','PageDown'].includes(e.key)?1:['ArrowUp','PageUp'].includes(e.key)?-1:e.key===' '?(e.shiftKey?-1:1):0;
 if(delta){e.preventDefault();goScene(desiredScene+delta);}else if(e.key==='Home'||e.key==='End'){e.preventDefault();goScene(e.key==='Home'?0:scenes.length-1);}
});
window.addEventListener('resize',()=>{
 if(route!=='professional')return;
 journeyCoordinator.resize();
});
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function professionalBody(item){
 item=localized(item);
 const e=escapeHTML;
 const photo=covers[scenes[sceneIndex].id].photo;
 const imageCredit=photo?`<p class="source-note photo-credit">${t(photo.illustrative?'photoCreditIllustrative':'photoCreditCampus')}: <a href="${e(photo.source)}" target="_blank" rel="noopener noreferrer">${e(photo.credit)}</a>${photo.license.startsWith('CC ')?` · <a href="${e(photo.licenseURL)}" target="_blank" rel="noopener noreferrer">${e(photo.license)}</a> · ${t('photoCrop')}`:''}</p>`:'';
 const identity=`<div class="detail-identity">${item.logo?`<img class="detail-logo" data-surface="${e(item.logo.surface||'light')}" src="${e(item.logo.src)}" alt="${e(item.logo.name)} ${t('logo')}">`:''}<p>${e(item.organization)}</p></div>`;
 const meta=[item.dates,item.location].filter(Boolean).map(e).join(' · ');
 const stats=item.stats?`<div class="detail-stats">${item.stats.map(s=>`<div><strong>${e(s.value)}</strong><span>${e(s.label)}</span></div>`).join('')}</div>`:'';
 const sections=item.sections.map(s=>`<section><h3>${e(s.title)}</h3>${s.text?`<p>${e(s.text)}</p>`:''}${s.items?`<ul>${s.items.map(x=>`<li>${e(x)}</li>`).join('')}</ul>`:''}</section>`).join('');
 const source=item.source==='linkedin'?`<p class="source-note">${t('academicProject')} · <a href="https://www.linkedin.com/in/yingjin08/" target="_blank" rel="noopener noreferrer">${t('linkedinSource')}</a></p>`:item.logo?.url.includes('kuaishou.com')?`<p class="source-note">${t('logoSource')}: <a href="${e(item.logo.url)}" target="_blank" rel="noopener noreferrer">kuaishou.com</a></p>`:'';
 return `${identity}<h2 id="detail-title">${e(item.title)}</h2>${meta?`<p class="detail-meta">${meta}</p>`:''}<p class="detail-lead">${e(item.lead)}</p><div class="detail-chips">${item.chips.map(x=>`<span>${e(x)}</span>`).join('')}</div>${stats}<div class="detail-sections">${sections}</div>${source}${imageCredit}`;
}
async function openExperience(){
 if(opening||dialog.open||sceneChanging)return;opening=true;const motionVersion=++detailMotionVersion;goScene(sceneIndex,'instant');lastFocused=$('#case-card');const expected=route,version=navigationVersion;
 await animate($('.case-cover'),[{opacity:1,translate:'0 0'},{opacity:.5,translate:'6px 0'}],190);
 if(route!==expected||version!==navigationVersion){opening=false;return;}
 activePlace=null;activeTopic=null;dialog.dataset.kind='experience';const item=experiences[chapters[chapter].items[indices[chapter]]];$('#detail-kicker').textContent=t(item.kicker);$('#detail-content').innerHTML=professionalBody(item);updateDialogChrome();
 $('#detail-person-slot').hidden=false;$('#detail-person-slot').append(actor);pose(actor,scenePoses()[0]);dialog.showModal();$('#close-detail').focus({preventScroll:true});
 await Promise.all([animate($('.detail-paper'),[{opacity:0,translate:'0 10px'},{opacity:1,translate:'0 0'}],350),animate(actor,[{opacity:0},{opacity:1}],380)]);if(motionVersion===detailMotionVersion)opening=false;
}
$('#case-card').addEventListener('click',openExperience);
function zoomTopic(trigger){
 const paper=$('#detail-content'),to=paper.getBoundingClientRect(),from=trigger.getBoundingClientRect(),version=++detailMotionVersion;
 detailOrigin={x:from.left+from.width/2-to.left-to.width/2,y:from.top+from.height/2-to.top-to.height/2};
 opening=true;
 const frames=window.YingBook.reduced()?[{opacity:0},{opacity:1}]:[{opacity:0,transform:`translate(${detailOrigin.x}px,${detailOrigin.y}px) scale(.16)`},{opacity:1,transform:'translate(0,0) scale(1)'}];
 animate($('.detail-paper'),[{opacity:0},{opacity:1}],160);
 animate(paper,frames,window.YingBook.reduced()?160:620).finally(()=>{if(version===detailMotionVersion)opening=false;});
}
async function closeDetail(){
 if(closing||!dialog.open)return;closing=true;
 detailMotionVersion++;opening=false;window.YingMotion.cancel($('#detail-content'));window.YingMotion.cancel($('.detail-paper'));window.YingMotion.cancel(actor);
 if(dialog.dataset.kind==='topic'&&detailOrigin&&!window.YingBook.reduced())await animate($('#detail-content'),[{opacity:1,transform:'scale(1)'},{opacity:0,transform:`translate(${detailOrigin.x}px,${detailOrigin.y}px) scale(.35)`}],260);
 else await animate($('.detail-shell'),[{opacity:1},{opacity:0}],170);
 dialog.close();closing=false;detailOrigin=null;
}
$('#close-detail').addEventListener('click',closeDetail);$('#close-detail-bottom').addEventListener('click',closeDetail);
dialog.addEventListener('cancel',e=>{e.preventDefault();closeDetail();});
dialog.addEventListener('close',()=>{detailMotionVersion++;window.YingMotion.cancel($('#detail-content'));window.YingMotion.cancel($('.detail-paper'));if(actor.parentElement===$('#detail-person-slot')){$('#stage-person-slot').append(actor);activityStep=0;pose(actor,scenePoses()[0]);animate(actor,[{opacity:0},{opacity:1}],300);}if(lastFocused?.isConnected)lastFocused.focus({preventScroll:true});activePlace=null;activeTopic=null;opening=false;closing=false;});
dialog.addEventListener('click',e=>{const b=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))closeDetail();});
function renderCollection(){
 if(!$('#magnet-board').children.length){
  $('#magnet-board').innerHTML=Object.entries(places).map(([id,p])=>`<button class="magnet${p.locked?' magnet-locked':''}" data-place="${id}">${window.YingMagnets.svg(id)}<span class="magnet-tooltip"></span></button>`).join('');
  $('#place-index').innerHTML=Object.entries(places).map(([id,p],i)=>`<button data-place="${id}"><span>${String(i+1).padStart(2,'0')}</span><span class="place-name"></span><b aria-hidden="true">+</b></button>`).join('');
 }
 for(const [id,p] of Object.entries(places))for(const button of $$(`[data-place="${id}"]`)){
  button.setAttribute('aria-label',p.locked?t('chooseSecret'):t('chooseMagnet',{place:t(p.title)}));
  $('.magnet-tooltip,.place-name',button).textContent=p.locked?t('unwritten'):t(p.title);
 }
}
function placeBody(id){
 return window.YingPersonalView.placeBody(id,language);
}
function updateDialogChrome(){
 const kind=dialog.dataset.kind;
 $('#close-detail-bottom').textContent=t(kind==='contact'?'contactBack':kind==='topic'?'personalDetailsBack':activePlace?'detailBackPlaces':'detailBackWork');
 $('.detail-paper>footer>span').textContent=t(kind==='contact'?'contactFooter':'detailFooter');
}
function openPlace(id,trigger){
 if(!places[id]||dialog.open||routeBusy)return;
 activePlace=id;activeTopic=null;lastFocused=trigger;dialog.dataset.kind='place';$('#detail-person-slot').hidden=true;
 $('#detail-kicker').textContent=t(places[id].locked?'explorationKicker':'placeKicker');$('#detail-content').innerHTML=placeBody(id);updateDialogChrome();
 dialog.showModal();$('#close-detail').focus({preventScroll:true});animate($('.detail-paper'),[{opacity:0,translate:'0 10px'},{opacity:1,translate:'0 0'}],300);
}
function renderTopics(){
 $('#topic-grid').innerHTML=window.YingPersonalView.topicCards(language);
 if(activeTopic&&dialog.open)lastFocused=$(`#topic-grid [data-topic="${activeTopic}"]`);
}
function openTopic(id,trigger){
 if(!topics[id]||dialog.open||routeBusy)return;
 activeTopic=id;activePlace=null;lastFocused=trigger;dialog.dataset.kind='topic';$('#detail-person-slot').hidden=true;
 $('#detail-kicker').textContent=`${t('topicKicker')} / ${t(topics[id].title)}`;$('#detail-content').innerHTML=window.YingPersonalView.topicBody(id,language);updateDialogChrome();
 dialog.showModal();$('#close-detail').focus({preventScroll:true});zoomTopic(trigger);
}
function openContact(trigger){
 if(dialog.open||routeBusy)return;
 activeTopic=null;activePlace=null;lastFocused=trigger;dialog.dataset.kind='contact';$('#detail-person-slot').hidden=true;
 $('#detail-kicker').textContent=t('contactKicker');$('#detail-content').innerHTML=window.YingPersonalView.contactBody(language);updateDialogChrome();
 dialog.showModal();$('#close-detail').focus({preventScroll:true});animate($('.detail-paper'),[{opacity:0},{opacity:1}],240);
}
async function copyEmail(){try{await navigator.clipboard.writeText(profile.email);$('#copy-status').textContent=t('emailCopied');}catch{$('#copy-status').textContent=t('emailCopyFailed');}}
function showPersonalArea(area,historyMode='replace'){
 personalArea=area==='travel'?'travel':'overview';$('#personal-overview').hidden=personalArea!=='overview';$('#personal-travel').hidden=personalArea!=='travel';
 if(route==='personal')history[historyMode==='push'?'pushState':'replaceState'](null,'',personalArea==='travel'?'#personal/travel':'#personal');
 updateDocumentTitle();
 if(personalArea==='overview')window.YingBook.open($('#book-scene'));
}
async function changePersonalArea(area){
 if(area===personalArea)return;
 routeBusy=true;
 try{await animate($(`#personal-${personalArea}`),[{opacity:1},{opacity:0}],130);showPersonalArea(area,'push');window.scrollTo({top:0,behavior:'instant'});await animate($(`#personal-${personalArea}`),[{opacity:0},{opacity:1}],220);}
 finally{routeBusy=false;}
 $('#main').focus({preventScroll:true});
}
function updateDocumentTitle(){document.title=`Ying Jin — ${t(route==='home'?'documentHome':route==='professional'?'documentWork':personalArea==='travel'?'documentTravel':'documentPersonal')}`;}
function applyLanguage(){
 document.documentElement.lang=language==='zh'?'zh-CN':'en';
 $('meta[name=description]').content=t('description');
 $$('[data-i18n]').forEach(el=>el.innerHTML=t(el.dataset.i18n));
 $$('[data-i18n-label]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nLabel)));
 $$('[data-i18n-title]').forEach(el=>el.title=t(el.dataset.i18nTitle));
 $$('[data-language-switch]').forEach(button=>{button.textContent=language==='en'?'中文':'EN';button.lang=language==='en'?'zh-CN':'en';button.setAttribute('aria-label',language==='en'?'切换到中文':'Switch to English');});
 updateDocumentTitle();renderCollection();renderTopics();updateDialogChrome();
 $('#status').textContent=t('opened',{page:t(route==='home'?'navCover':route==='professional'?'navProfessional':'navPersonal')});
 if(route==='professional'){showScene(sceneChanging?desiredScene:sceneIndex,true);updateJourneyProgress();}
 window.YingBook.prepareHome();
 if(dialog.open){
  if(dialog.dataset.kind==='contact'){$('#detail-kicker').textContent=t('contactKicker');$('#detail-content').innerHTML=window.YingPersonalView.contactBody(language);}
  else if(activeTopic){$('#detail-kicker').textContent=`${t('topicKicker')} / ${t(topics[activeTopic].title)}`;$('#detail-content').innerHTML=window.YingPersonalView.topicBody(activeTopic,language);}
  else if(activePlace){$('#detail-kicker').textContent=t(places[activePlace].locked?'explorationKicker':'placeKicker');$('#detail-content').innerHTML=placeBody(activePlace);}
  else{const item=experiences[scenes[sceneIndex].id];$('#detail-kicker').textContent=t(item.kicker);$('#detail-content').innerHTML=professionalBody(item);}
 }
}
function toggleLanguage(){
 if(routeBusy||opening||closing)return;
 language=language==='en'?'zh':'en';try{localStorage.setItem('ying-language',language);}catch{}
 applyLanguage();if(route==='home')window.YingBook.enterHome();
}
document.addEventListener('click',e=>{const r=e.target.closest('button[data-route]'),c=e.target.closest('button[data-chapter]'),p=e.target.closest('button[data-place]'),lang=e.target.closest('[data-language-switch]'),topic=e.target.closest('[data-topic]'),contact=e.target.closest('[data-contact]');if(e.target.closest('[data-open-book]'))window.YingBook.open($('#book-scene'));else if(e.target.closest('[data-travel-collection]'))closeDetail().then(()=>navigate('personal',{section:'travel'}));else if(lang)toggleLanguage();else if(contact)openContact(contact);else if(e.target.closest('[data-copy-email]'))copyEmail();else if(e.target.closest('[data-personal-overview]'))navigate('personal',{section:'overview'});else if(topic)openTopic(topic.dataset.topic,topic);else if(r)navigate(r.dataset.route);else if(c)goChapter(c.dataset.chapter);else if(p)openPlace(p.dataset.place,p);});
setInterval(async()=>{if(document.hidden||routeBusy||route!=='professional'||opening||dialog.open||stage.classList.contains('changing'))return;await animate(actor,[{opacity:1},{opacity:0}],180);if(routeBusy||route!=='professional'||dialog.open||opening||sceneChanging)return;const poses=scenePoses();activityStep=(activityStep+1)%poses.length;pose(actor,poses[activityStep]);animate(actor,[{opacity:0},{opacity:1}],260);},7400);
setInterval(()=>{if(document.hidden)return;const el=route==='home'?hero:route==='professional'?actor:null;if(!el||el.dataset.pose!=='stand')return;draw(el,el===hero?1:3);setTimeout(()=>{if(el.dataset.pose==='stand')draw(el,0);},155);},4300);
window.addEventListener('hashchange',()=>{const [r,c,id]=location.hash.slice(1).split('/');navigate(r||'home',{instant:true,section:c,entry:id,focus:false});});
applyLanguage();const [initialRoute,initialChapter,initialEntry]=location.hash.slice(1).split('/');pose(hero);pose(actor,'lean');navigate(initialRoute||'home',{instant:true,section:initialChapter,entry:initialEntry,focus:false});
for(const name of ['work','projects','education'])for(let pair=0;pair<(name==='education'?5:4);pair++){const image=new Image();image.decoding='async';image.src=`assets/editorial-hd/${name}-${pair}.webp`;}

for(const item of Object.values(experiences))if(item.logo){const image=new Image();image.decoding='async';image.src=item.logo.src;}

for(const cover of Object.values(covers))if(cover.photo){const image=new Image();image.decoding='async';image.fetchPriority='low';image.src=cover.photo.src;}

for(const name of ['hero-fashion','objects','personal-a','personal-b']){const image=new Image();image.decoding='async';image.src=`assets/living-edition/${name}.webp`;}

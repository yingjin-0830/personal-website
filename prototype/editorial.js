const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const {experiences,places}=window.YingContent;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let manualPause=false,motion=!reduce.matches,route='home',routeBusy=false,opening=false,closing=false;
let chapter='work',desiredChapter='work',sceneToken=0,lastFocused=null,activityStep=0,navigationVersion=0;
const chapterIds=['work','projects','education'],indices={work:0,projects:0,education:0};
const hero=$('#cover-character'),actor=$('#case-person'),dialog=$('#detail'),scroller=$('#chapter-scroll'),stage=$('.editorial-stage');
const records=new Map(),effects=new Set();
const chapters={
 work:{kicker:'01 / EXPERIENCE',title:'Work,<br>in <em>focus.</em>',intro:'The work behind the way I think.<br>Experience, context and perspective.',items:['sunlight']},
 projects:{kicker:'02 / SELECTED PROJECTS',title:'Curiosity,<br><em>applied.</em>',intro:'Questions worth asking.<br>Ideas worth putting to work.',items:['household','vision','horses']},
 education:{kicker:'03 / FOUNDATIONS',title:'Always<br><em>learning.</em>',intro:'The foundations.<br>And an appetite to keep going.',items:['duke']}
};
const covers={
 sunlight:{category:'WORK / NEW YORK',display:'Making sense<br>of what’s next.',subject:'SUNLIGHT DEVELOPMENT',company:'Sunlight Development',title:'Data into perspective',color:'#d5dac9',ink:'#354333'},
 household:{category:'ECONOMETRICS / R',display:'Behind the<br>household.',subject:'INCOME · CAUSAL INFERENCE',company:'Econometric modeling',title:'Household income',color:'#be7056',ink:'#fff0df'},
 vision:{category:'MACHINE LEARNING / PYTHON',display:'A fresh<br>perspective.',subject:'COMPUTER VISION · CLASSIFICATION',company:'Vegetable recognition',title:'Teaching machines to see',color:'#293e41',ink:'#f2edda'},
 horses:{category:'DATA SCIENCE / R + TABLEAU',display:'Better data.<br>Better care.',subject:'HEALTH · PREDICTION · DECISIONS',company:'Horse health analysis',title:'Decisions that matter',color:'#d7cbb7',ink:'#3a4436'},
 duke:{category:'DUKE UNIVERSITY / 2023–2024',display:'Connecting<br>the dots.',subject:'THE FUQUA SCHOOL OF BUSINESS',company:'Duke University',title:'Master of Quantitative Management',color:'#35465e',ink:'#f2edda'}
};
function draw(el,frame){el.dataset.frame=frame;$('.sprite',el).style.backgroundPosition=`${frame%4*100/3}% ${frame<4?0:100}%`;}
function pose(el,name='stand'){
 const old=records.get(el);clearInterval(old?.timer);
 const heroKind=el.dataset.kind==='hero';
 const map=heroKind?{stand:0,blink:1,wave:2,think:3,turn:4,profile:5,walk:6}:{stand:0,lean:1,laptop:2,blink:3,walk:4,profile:6,think:7};
 el.dataset.pose=name;draw(el,map[name]??0);
 const rec={pose:name,timer:null};records.set(el,rec);
 if(name==='walk'&&motion){let n=0;rec.timer=setInterval(()=>{if(motion)draw(el,(heroKind?6:4)+(++n%2));},260);}
}
async function animate(el,frames,duration=300,extra={}){
 if(!motion)return;
 const a=el.animate(frames,{duration,easing:'cubic-bezier(.2,.65,.3,1)',fill:'forwards',...extra});effects.add(a);
 await a.finished.catch(()=>{});effects.delete(a);a.cancel();
}
function updateMotion(){
 motion=!manualPause&&!reduce.matches;document.body.dataset.motion=motion?'on':'off';
 const b=$('#motion');b.setAttribute('aria-pressed',String(!motion));b.setAttribute('aria-label',motion?'Pause character animation':'Resume character animation');b.disabled=reduce.matches;
 $('.motion-label').textContent=motion?'Motion on':'Motion off';b.firstElementChild.textContent=motion?'Ⅱ':'▷';
 if(!motion){for(const e of effects)e.finish();for(const rec of records.values())clearInterval(rec.timer);}
 else for(const [el,rec]of [...records])pose(el,rec.pose);
}
$('#motion').addEventListener('click',()=>{manualPause=!manualPause;updateMotion();});reduce.addEventListener('change',updateMotion);
function attention(target){if(route!=='home'||routeBusy)return;hero.dataset.facing=target==='personal'?'right':'left';pose(hero,target?'turn':'stand');}
for(const entry of $$('.entry')){
 entry.addEventListener('pointerenter',()=>attention(entry.dataset.route));entry.addEventListener('pointerleave',()=>{if(document.activeElement!==entry)attention(null);});
 entry.addEventListener('focus',()=>attention(entry.dataset.route));entry.addEventListener('blur',()=>attention(null));
}
hero.addEventListener('click',()=>{if(!routeBusy){pose(hero,'think');$('#status').textContent='Ying is thinking.';}});
async function navigate(next,{instant=false,section=chapter,focus=true}={}){
 if(!['home','professional','personal'].includes(next)||routeBusy)return;
 if(dialog.open)dialog.close();
 routeBusy=true;navigationVersion++;const previous=$(`#${route}`);
 if(!instant&&next!==route){
  if(route==='home'&&motion){
   const direction=next==='professional'?-1:1;hero.dataset.facing=direction===1?'right':'left';pose(hero,'profile');
   await animate(hero,[{translate:'0 0'},{translate:`${direction*8}px 0`}],180);
   pose(hero,'walk');const b=hero.getBoundingClientRect();const distance=direction<0?b.right+30:innerWidth-b.left+30;
   await animate(hero,[{translate:`${direction*8}px 0`,opacity:1},{translate:`${direction*distance}px 0`,opacity:0}],Math.min(2800,Math.max(1900,distance*3.5)),{easing:'cubic-bezier(.25,.1,.55,1)'});
  }
  await animate(previous,[{opacity:1,translate:'0 0'},{opacity:0,translate:'0 -8px'}],220);
 }
 pose(hero,'stand');hero.dataset.facing='left';
 $$('.view').forEach(el=>el.hidden=el.id!==next);route=next;document.body.dataset.view=route;
 $$('.masthead [data-route]').forEach(el=>{el.classList.toggle('active',el.dataset.route===route);el.setAttribute('aria-current',el.dataset.route===route?'page':'false');});
 window.scrollTo({top:0,behavior:'instant'});
 if(route==='professional'){
  section=chapterIds.includes(section)?section:'work';showChapter(section,true);
  scroller.scrollTo({top:(scroller.scrollHeight-scroller.clientHeight)*chapterIds.indexOf(section)/2,behavior:'instant'});
 }else history.replaceState(null,'',`#${route}`);
 document.title=`Ying Jin — ${route==='home'?'The Editorial Edition':route==='professional'?'Selected Work':'The Personal Edition'}`;
 if(focus)(route==='professional'?scroller:$('#main')).focus({preventScroll:true});
 routeBusy=false;$('#status').textContent=`Opened ${route}`;
 if(!instant)animate($(`#${route}`),[{opacity:0,translate:'0 8px'},{opacity:1,translate:'0 0'}],360);
 if(route==='home'&&motion)animate($('.cover-title'),[{opacity:0,translate:'0 16px'},{opacity:1,translate:'0 0'}],700);
}
function renderCard(){
 const group=chapters[chapter],id=group.items[indices[chapter]],c=covers[id];
 $('.case-cover').style.setProperty('--cover',c.color);$('.case-cover').style.setProperty('--cover-ink',c.ink);
 $('.case-category').textContent=c.category;$('.case-display').innerHTML=c.display;$('.case-subject').textContent=c.subject;
 $('.case-company').textContent=c.company;$('.case-title').textContent=c.title;
 $('#case-card').setAttribute('aria-label',`Read ${c.company}: ${c.title}`);
 $('#case-count').textContent=`${String(indices[chapter]+1).padStart(2,'0')} / ${String(group.items.length).padStart(2,'0')}`;
 $('#previous-case').disabled=indices[chapter]===0;$('#next-case').disabled=indices[chapter]===group.items.length-1;
 actor.dataset.outfit=chapter;activityStep=indices[chapter]%3;pose(actor,['lean','laptop','think'][activityStep]);
}
async function showChapter(id,instant=false){
 desiredChapter=id;const token=++sceneToken;
 if(!instant&&motion){stage.classList.add('changing');await new Promise(resolve=>setTimeout(resolve,250));if(token!==sceneToken)return;}
 chapter=id;const i=chapterIds.indexOf(id),c=chapters[id];
 $('#chapter-kicker').textContent=c.kicker;$('#chapter-title').innerHTML=c.title;$('#chapter-intro').innerHTML=c.intro;$('.chapter-number').textContent=String(i+1).padStart(2,'0');
 $$('.chapter-nav button').forEach(b=>{b.classList.toggle('active',b.dataset.chapter===id);b.setAttribute('aria-current',b.dataset.chapter===id?'location':'false');});
 $$('.stage-progress i').forEach((el,index)=>el.classList.toggle('active',index===i));
 $('#next-chapter span').textContent=i<2?`NEXT CHAPTER / ${chapterIds[i+1].toUpperCase()}`:'NEXT / THE PERSONAL EDITION';
 renderCard();stage.classList.remove('changing');
 if(route==='professional')history.replaceState(null,'',`#professional/${id}`);
}
function goChapter(id){const i=chapterIds.indexOf(id);if(i<0)return;scroller.scrollTo({top:(scroller.scrollHeight-scroller.clientHeight)*i/2,behavior:motion?'smooth':'instant'});if(!motion)showChapter(id,true);}
scroller.addEventListener('scroll',()=>{if(route!=='professional'||opening||dialog.open)return;const range=scroller.scrollHeight-scroller.clientHeight;const index=Math.max(0,Math.min(2,Math.round(scroller.scrollTop/range*2)));if(chapterIds[index]!==desiredChapter)showChapter(chapterIds[index]);},{passive:true});
scroller.addEventListener('keydown',e=>{if(e.target!==scroller)return;const i=chapterIds.indexOf(chapter),d=['ArrowDown','PageDown',' '].includes(e.key)?1:['ArrowUp','PageUp'].includes(e.key)?-1:0;if(d){e.preventDefault();goChapter(chapterIds[Math.max(0,Math.min(2,i+d))]);}else if(e.key==='Home'||e.key==='End'){e.preventDefault();goChapter(e.key==='Home'?'work':'education');}});
$('#next-chapter').addEventListener('click',()=>{const i=chapterIds.indexOf(chapter);i<2?goChapter(chapterIds[i+1]):navigate('personal');});
async function changeCase(delta){
 if(opening||dialog.open)return;opening=true;
 await Promise.all([animate($('.case-area'),[{opacity:1,translate:'0 0'},{opacity:0,translate:`${delta*-12}px 0`}],180),animate(actor,[{opacity:1},{opacity:0}],180)]);
 indices[chapter]=Math.max(0,Math.min(chapters[chapter].items.length-1,indices[chapter]+delta));renderCard();
 await Promise.all([animate($('.case-area'),[{opacity:0,translate:`${delta*12}px 0`},{opacity:1,translate:'0 0'}],300),animate(actor,[{opacity:0},{opacity:1}],300)]);opening=false;
}
$('#previous-case').addEventListener('click',()=>changeCase(-1));$('#next-case').addEventListener('click',()=>changeCase(1));
function professionalBody(item){return `<h2 id="detail-title">${item.title}</h2><p class="detail-lead">${item.lead}</p><div class="detail-chips">${item.chips.map(x=>`<span>${x}</span>`).join('')}</div><div class="detail-sections"><section><h3>The context</h3><p>${item.overview}</p></section><section><h3>The approach</h3><ul>${item.approach.map(x=>`<li>${x}</li>`).join('')}</ul></section></div><div class="detail-sections"><section><h3>The outcome</h3><p>${item.outcome}</p></section><section><h3>The next layer</h3><p>项目截图、你的贡献、可量化成果和作品链接将在核实后补充。</p></section></div><p class="draft-note">内容草稿：依据 <a href="https://www.linkedin.com/in/yingjin08/" target="_blank" rel="noopener noreferrer">LinkedIn 公开索引</a>整理，具体信息待核实。</p>`;}
async function openExperience(){
 if(opening||dialog.open)return;opening=true;lastFocused=$('#case-card');const expected=route,version=navigationVersion;
 await animate($('.case-cover'),[{opacity:1,translate:'0 0'},{opacity:.5,translate:'6px 0'}],190);
 if(route!==expected||version!==navigationVersion){opening=false;return;}
 const item=experiences[chapters[chapter].items[indices[chapter]]];$('#detail-kicker').textContent=item.kicker;$('#detail-content').innerHTML=professionalBody(item);
 $('#detail-person-slot').hidden=false;$('#detail-person-slot').append(actor);pose(actor,'lean');dialog.showModal();$('#close-detail').focus({preventScroll:true});
 await Promise.all([animate($('.detail-paper'),[{opacity:0,translate:'0 10px'},{opacity:1,translate:'0 0'}],350),animate(actor,[{opacity:0},{opacity:1}],380)]);opening=false;
}
$('#case-card').addEventListener('click',openExperience);
async function closeDetail(){if(closing||!dialog.open)return;closing=true;await animate($('.detail-shell'),[{opacity:1},{opacity:0}],170);dialog.close();closing=false;}
$('#close-detail').addEventListener('click',closeDetail);$('#close-detail-bottom').addEventListener('click',closeDetail);
dialog.addEventListener('cancel',e=>{e.preventDefault();closeDetail();});
dialog.addEventListener('close',()=>{if(actor.parentElement===$('#detail-person-slot')){$('#stage-person-slot').append(actor);pose(actor,'lean');animate(actor,[{opacity:0},{opacity:1}],300);}if(lastFocused?.isConnected)lastFocused.focus({preventScroll:true});opening=false;closing=false;});
dialog.addEventListener('click',e=>{const b=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))closeDetail();});
$('#place-index').innerHTML=Object.entries(places).map(([id,p],i)=>`<button data-place="${id}"><span>${String(i+1).padStart(2,'0')}</span>${p.title}<b aria-hidden="true">↗</b></button>`).join('');
function openPlace(id,trigger){const p=places[id];if(!p||dialog.open)return;lastFocused=trigger;$('#detail-person-slot').hidden=true;$('#detail-kicker').textContent=p.label;$('#detail-content').innerHTML=`<h2 id="detail-title">${p.title}</h2><p class="detail-lead">${p.line}</p><div class="travel-detail"><img src="assets/magnet-board.jpeg" alt="Ying's original magnet collection" style="object-position:${p.position}"></div><p class="draft-note">这张图片来自你的真实冰箱贴收藏。${p.title} 的旅行照片、日期与亲身故事待补充。</p>`;dialog.showModal();$('#close-detail').focus({preventScroll:true});animate($('.detail-paper'),[{opacity:0,translate:'0 10px'},{opacity:1,translate:'0 0'}],300);}
document.addEventListener('click',e=>{const r=e.target.closest('button[data-route]'),c=e.target.closest('button[data-chapter]'),p=e.target.closest('button[data-place]');if(r)navigate(r.dataset.route);else if(c)goChapter(c.dataset.chapter);else if(p)openPlace(p.dataset.place,p);});
setInterval(async()=>{if(!motion||document.hidden||route!=='professional'||opening||dialog.open||stage.classList.contains('changing'))return;await animate(actor,[{opacity:1},{opacity:0}],180);if(route!=='professional'||dialog.open||opening)return;activityStep=(activityStep+1)%3;pose(actor,['lean','laptop','think'][activityStep]);animate(actor,[{opacity:0},{opacity:1}],260);},7400);
setInterval(()=>{if(!motion||document.hidden)return;const el=route==='home'?hero:route==='professional'?actor:null;if(!el||el.dataset.pose!=='stand')return;draw(el,el===hero?1:3);setTimeout(()=>{if(el.dataset.pose==='stand')draw(el,0);},155);},4300);
window.addEventListener('hashchange',()=>{const [r,c]=location.hash.slice(1).split('/');navigate(r||'home',{instant:true,section:c,focus:false});});
const [initialRoute,initialChapter]=location.hash.slice(1).split('/');pose(hero);pose(actor,'lean');updateMotion();navigate(initialRoute||'home',{instant:true,section:initialChapter,focus:false});
for(const name of ['hero','work','projects','education']){const image=new Image();image.src=`assets/editorial-${name}.png`;}

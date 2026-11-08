const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let manuallyPaused = false;
let motion = !reducedMotion.matches;
const state = { route: 'home', chapter: 'work', navigating: false, selectedCard: null };
const dialog = $('#detail-dialog');
const guide = $('#guide');
const chapterScroller = $('#chapter-scroll');
let lastFocused = null;
let openTimer;
let guideFlight;
let portalFlight;
let guideArrival = null;
const characters = window.YingCharacter;
const avatars = { hero: $('.avatar', $('.hero-character')), guide: $('.avatar', guide), portal: $('.avatar', $('#portal')) };
Object.values(avatars).forEach(el => characters.attach(el));
characters.setPaused(!motion);
const outfits = { work: 'professional', projects: 'creative', education: 'graduate' };
const chapterSpeech = { work: 'Let’s start with what I do.', projects: 'A few things I’ve worked on.', education: 'A new outfit. A familiar curiosity.' };
const professionalStory = window.createYingProfessional({ root: $('#professional'), scroll: chapterScroller, dialog, onChapter: setChapter, motionEnabled: () => motion });
const homeStage = window.createYingHome({root:$('#home'),character:avatars.hero,characters,motionEnabled:()=>motion,isActive:()=>state.route==='home'});

const experiences = {
  sunlight: { title: 'Sunlight Development', kicker: 'WORK / NEW YORK', lead: 'From data to decisions.', chips: ['Work experience', 'Data analysis', '待核实'], overview: 'LinkedIn 的公开搜索索引显示了 Sunlight Development 这段经历。完整的职位名称、起止日期和职责尚未获取，因此这里先用来演示详情展开方式。', approach: ['你的角色和职责', '最有代表性的工作挑战', '使用的方法、工具和协作过程'], outcome: '下一版加入 2–3 条具体成果，以及适合公开展示的截图或作品。' },
  household: { title: 'Behind the household', kicker: 'PROJECT / ECONOMETRIC MODELING', lead: 'Understanding how the role of a housewife relates to household income.', chips: ['R', 'Econometrics', 'Causal inference'], overview: 'LinkedIn 项目摘要提到：探索家庭收入与家庭内外因素的关系，并比较多种计量经济模型。', approach: ['Exploratory data analysis', 'Matching, OLS and regression adjustment', 'Instrumental variables and simultaneous systems'], outcome: '这里将展示研究结论、你独立完成的部分与图表。公开索引中的数字和项目措辞会在你确认后再采用。' },
  vision: { title: 'A fresh perspective', kicker: 'PROJECT / MACHINE LEARNING', lead: 'Comparing image classification models for vegetable recognition.', chips: ['Python', 'Computer vision', 'MLP', 'CNN', 'VGG16', 'ResNet'], overview: 'LinkedIn 项目摘要列出了 MLP、卷积神经网络、VGG16 和 ResNet 等模型，并提到商业应用与风险分析。', approach: ['Prepare and explore an image dataset', 'Compare classification models', 'Evaluate performance and practical applications'], outcome: '项目详情最终可包含模型对比图、误分类样例与代码链接。准确率、数据划分和评估方法待核实。' },
  horses: { title: 'Better data. Better care.', kicker: 'PROJECT / R + TABLEAU', lead: 'Using health data to inform treatment decisions.', chips: ['R', 'Tableau', 'Classification', 'Risk analysis'], overview: 'LinkedIn 项目摘要提到：分析马匹健康与死亡记录，制作 Tableau 仪表盘，并比较多种预测模型。', approach: ['Exploratory analysis and visualization', 'Logistic regression, random forest, CART and SVM', 'Cost-benefit and treatment strategy analysis'], outcome: '下一步确认项目目标、模型预测对象、评估指标，以及可以公开分享的可视化。' },
  duke: { title: 'Duke University', kicker: 'EDUCATION / 2023–2024', lead: 'The Fuqua School of Business', chips: ['Master of Quantitative Management', '2023–2024', '待确认'], overview: 'LinkedIn 的公开索引列出了 Duke University — The Fuqua School of Business（2023–2024），个人简介提到 Duke MQM。', approach: ['学位正式名称与方向', '与你目标岗位最相关的课程', '代表性校园项目或活动'], outcome: '本科院校和其他教育经历尚待补充。这一页先验证学士服换装和教育经历卡片。' }
};
const places = {
  seattle: { title: 'Seattle', line: 'A little piece of the Pacific Northwest.', label: 'SEATTLE / THE MAGNET COLLECTION', position: '25% 25%' },
  boston: { title: 'Boston', line: 'A city, kept in miniature.', label: 'BOSTON / THE MAGNET COLLECTION', position: '45% 27%' },
  newyork: { title: 'New York', line: 'A city with a thousand little stories.', label: 'NEW YORK / THE MAGNET COLLECTION', position: '33% 47%' },
  shenzhen: { title: 'Shenzhen', line: 'A memory, close to home.', label: 'SHENZHEN / THE MAGNET COLLECTION', position: '57% 44%' },
  chicago: { title: 'Chicago', line: 'Art, architecture, and a little keepsake.', label: 'CHICAGO / THE MAGNET COLLECTION', position: '58% 75%' },
  florida: { title: 'Florida', line: 'A little sunshine to take home.', label: 'FLORIDA / THE MAGNET COLLECTION', position: '55% 93%' }
};

function avatarOutfit(outfit) {
  characters.outfit(avatars.guide, outfit);
  characters.play(avatars.guide, outfit === 'graduate' ? 'happy' : outfit === 'creative' ? 'thinking' : 'wave', 1500);
}
function updateMotion() {
  motion = !reducedMotion.matches && !manuallyPaused;
  characters.setPaused(!motion);
  document.body.dataset.charactersPaused = String(!motion);
  const button = $('#motion-toggle');
  button.textContent = reducedMotion.matches ? 'Off' : manuallyPaused ? 'Play' : 'Pause';
  button.disabled = reducedMotion.matches;
  button.setAttribute('aria-pressed', String(!motion));
  button.setAttribute('aria-label', reducedMotion.matches ? 'Character animation disabled by your reduced-motion preference' : manuallyPaused ? 'Resume character animation' : 'Pause character animation');
  if (!motion) {
    const reveal = guideArrival;
    guideArrival = null;
    clearTimeout(openTimer);
    guideFlight?.cancel();
    guideFlight = null;
    portalFlight?.cancel();
    reveal?.();
  }
  professionalStory.setMotion(motion);
  homeStage.setMotion(motion);
}
function setChapter(id, updateHash = true) {
  if (!outfits[id]) return;
  state.chapter = id;
  $$('[data-chapter]', $('.chapter-nav')).forEach(el => {
    const active = el.dataset.chapter === id;
    el.classList.toggle('active', active);
    el.setAttribute('aria-current', active ? 'location' : 'false');
  });
  $('#guide-speech').textContent = chapterSpeech[id];
  if (updateHash && state.route === 'professional') history.replaceState(null, '', `#professional/${id}`);
}
function navigate(route, options = {}) {
  if (!['home', 'professional', 'personal'].includes(route) || state.navigating) return;
  if (dialog.open) dialog.close();
  if (state.route === 'professional' && route !== 'professional') professionalStory.leave();
  clearTimeout(openTimer);
  guideArrival = null;
  guideFlight?.cancel();
  characters.play(avatars.guide, 'idle');
  const changing = route !== state.route;
  const show = () => {
    if (state.route === 'home' && route !== 'home') homeStage.leave();
    $$('.view').forEach(el => el.hidden = el.id !== route);
    state.route = route;
    document.body.dataset.view = route;
    $$('[data-route]', $('.main-nav')).forEach(el => {
      const active = el.dataset.route === route;
      el.classList.toggle('active', active);
      el.setAttribute('aria-current', active ? 'page' : 'false');
    });
    guide.hidden = route !== 'personal';
    guide.classList.toggle('personal-guide', route === 'personal');
    guide.style.opacity = '';
    if (route === 'professional') {
      professionalStory.enter(options.chapter || state.chapter);
    } else if (route === 'personal') {
      avatarOutfit('casual');
      $('#guide-speech').textContent = 'Pick a magnet. Every one has a story.';
    } else {
      homeStage.enter();
    }
    history.replaceState(null, '', route === 'professional' ? `#professional/${state.chapter}` : `#${route}`);
    if (changing) window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `Ying Jin — ${route === 'home' ? 'A little of both' : route === 'professional' ? 'The professional side' : 'The personal side'}`;
    $('#status').textContent = `Opened ${route}`;
    if (options.focus) (route === 'professional' ? chapterScroller : $('#main')).focus({ preventScroll: true });
  };
  if (changing && state.route === 'home' && route !== 'home' && motion && !options.instant) {
    state.navigating = true;
    homeStage.depart(route, () => { show(); state.navigating = false; });
  } else if (changing && motion && !options.instant) {
    state.navigating = true;
    portalFlight?.cancel();
    portalFlight = $(`#${state.route}`).animate([
      {opacity:1,transform:'translateY(0)'},
      {opacity:0,transform:'translateY(-8px)'}
    ],{duration:240,easing:'ease-in-out',fill:'forwards'});
    portalFlight.finished.catch(()=>{}).then(()=>{
      show(); portalFlight?.cancel(); portalFlight=null; state.navigating=false;
    });
  } else show();
}
function jumpToChapter(id) {
  if (state.route !== 'professional') { navigate('professional', { chapter: id, instant: true }); return; }
  professionalStory.goTo(id);
}
function openDetail(kicker, body, trigger) {
  clearTimeout(openTimer);
  guideArrival = null;
  guideFlight?.cancel();
  guideFlight = null;
  lastFocused = trigger || document.activeElement;
  $('#detail-kicker').textContent = kicker;
  $('#detail-body').innerHTML = body;
  guide.style.opacity = '0';
  const professionalCard = state.route === 'professional' && trigger?.dataset.detail;
  if (professionalCard) professionalStory.prepareDetail();
  dialog.showModal();
  $('#close-detail').focus({ preventScroll: true });
  if (professionalCard) professionalStory.detailOpened();
}
function approachGuide(trigger, action, render) {
  clearTimeout(openTimer);
  guideArrival = null;
  guideFlight?.cancel();
  if (!motion || guide.hidden) { render(); return; }
  guideArrival = render;
  const from = guide.getBoundingClientRect();
  const target = trigger.getBoundingClientRect();
  const dx = Math.max(5, Math.min(innerWidth - from.width - 5, target.left + target.width * .68)) - from.left;
  const dy = Math.max(80, Math.min(innerHeight - from.height - 5, target.top - from.height * .55)) - from.top;
  characters.play(avatars.guide, action, 1800);
  const jumping = action === 'jump';
  const path = jumping ? [
    { transform: 'translate(0,0) scale(1)' },
    { transform: 'translate(0,5px) scale(1.05,.94)', offset: .12 },
    { transform: `translate(${dx * .52}px,${dy - 80}px) rotate(-7deg)`, offset: .52 },
    { transform: `translate(${dx}px,${dy}px) scale(.98,1.02)`, offset: .88 },
    { transform: `translate(${dx}px,${dy}px) scale(1)` }
  ] : [
    { transform: 'translate(0,0)' },
    { transform: `translate(${dx}px,${dy}px)` }
  ];
  const flight = guide.animate(path, {
    duration: jumping ? 680 : Math.min(1000, Math.max(620, Math.hypot(dx, dy) * 1.15)),
    easing: jumping ? 'cubic-bezier(.2,.65,.3,1)' : 'linear', fill: 'forwards'
  });
  guideFlight = flight;
  flight.finished.then(() => {
    if (guideFlight !== flight) return;
    characters.play(avatars.guide, 'happy', 450);
    openTimer = window.setTimeout(() => {
      if (guideFlight !== flight || guideArrival !== render) return;
      guideArrival = null;
      render();
      flight.cancel();
      guideFlight = null;
    }, 160);
  }).catch(() => {});
}
function openExperience(id, trigger) {
  const item = experiences[id];
  if (!item) return;
  const render = () => openDetail(item.kicker, `
    <h2 id="detail-title">${item.title}</h2><p class="detail-lead">${item.lead}</p>
    <div class="detail-chips">${item.chips.map(chip => `<span>${chip}</span>`).join('')}</div>
    <div class="detail-sections"><section><h3>The context</h3><p>${item.overview}</p></section><section><h3>The approach</h3><ul>${item.approach.map(text => `<li>${text}</li>`).join('')}</ul></section></div>
    <div class="detail-sections"><section><h3>The outcome</h3><p>${item.outcome}</p></section><section><h3>The next layer</h3><p>后续可放入项目截图、案例分析、你的贡献、可量化成果，以及代码或演示链接。</p></section></div>
    <p class="draft-note">内容草稿：依据 <a href="https://www.linkedin.com/in/yingjin08/" target="_blank" rel="noopener noreferrer">LinkedIn 公开搜索索引</a>整理，未核实内容不会作为正式履历发布。</p>`, trigger);
  $('#guide-speech').textContent = 'Let’s open this one.';
  if (state.route === 'professional') professionalStory.openCard(trigger, render);
  else approachGuide(trigger, 'jump', render);
}
function openPlace(id, trigger) {
  const item = places[id];
  if (!item) return;
  $('#guide-speech').textContent = `Let’s visit ${item.title}.`;
  approachGuide(trigger, 'walk', () => openDetail(item.label, `<div class="travel-detail"><div><img class="travel-photo" src="assets/magnet-board.jpeg" alt="Ying's original magnet collection photo" style="object-position:${item.position}"><p class="photo-caption">你的真实冰箱贴照片 · 旅行照片待补充</p></div><div><p class="eyebrow">A SOUVENIR, A STORY</p><h2 id="detail-title">${item.title}<span class="orange-period">.</span></h2><p class="detail-lead">${item.line}</p><div class="detail-chips"><span>Travel notes</span><span>Photo album</span><span>待补充</span></div><p>这里将放你在 ${item.title} 的旅行照片和亲身故事。现在用原始展示框照片预览相册的位置。</p><p>可以记录：哪一年去的、最喜欢的一刻、为什么带回这枚冰箱贴，以及一件只有你记得的小事。</p></div></div><p class="draft-note">这是详情布局示意。地点来自照片上可识别的冰箱贴；英文小标题是设计文案，不代表已确认的旅行经历。</p>`, trigger));
}
function openNotes(trigger) {
  openDetail('CONCEPT 01 / NOTES FOR OUR NEXT CONVERSATION', `<h2 id="detail-title">A little of both.<br>A first conversation.</h2><p class="detail-lead">这一版用于确认结构与交互。最终角色、内容与视觉细节仍由我们一起完善。</p><ol class="notes-list"><li><strong>角色风格：</strong>保留长棕卷发与贴纸画风，日常装改为蓝色阔腿牛仔裤，默认不佩戴墨镜。四套服装分别有睁眼、眨眼、挥手、迈步、思考与开心等姿态。</li><li><strong>动效节奏：</strong>主页人物点击后会托腮思考，选择入口后以较慢的侧身步伐离场。Professional 保留坐姿、思考和电脑工作；章节、详情之间使用轻移和淡入淡出，不再起跳。点击卡片时仍会掀开封面，进入详情后坐在详情卡片上。</li><li><strong>招聘方的路径：</strong>保留直接导航和可分享的章节链接，让访客随时进入内容。之后增加已确认的简历与联系方式。</li><li><strong>章节滚动：</strong>Work、Projects、Education 使用固定舞台和滚动进度过渡，屏幕每次只显示一个章节；Projects 内可左右浏览不同项目。</li><li><strong>专业内容：</strong>确认目标岗位、工作与实习日期、你的贡献和成果、项目截图、代码链接，以及完整教育信息。</li><li><strong>个人内容：</strong>这张真实照片用于验证可点击冰箱贴。后续可以把每枚冰箱贴单独抠出、自由摆放，并补齐旅行照片与故事。</li><li><strong>语言和设备：</strong>当前采用英文导航、中文草稿说明。需确定英文版或中英双语；手机卡片采用单列布局，减少动画偏好下会关闭动效。</li><li><strong>正式上线：</strong>最终目标是公开 GitHub Pages 网站。这一版本地预览，未创建仓库或部署。</li></ol><p class="draft-note">素材：角色以你指定的账户头像为参考，由内置 ImageGen 延展；冰箱贴照片由你提供。经历参考 LinkedIn 搜索索引，具体字段均需核实。</p>`, trigger);
}

document.addEventListener('click', event => {
  const route = event.target.closest('[data-route]');
  const chapter = event.target.closest('button[data-chapter]');
  const detail = event.target.closest('[data-detail]');
  const place = event.target.closest('[data-place]');
  if (route) navigate(route.dataset.route, { focus: true });
  else if (chapter) jumpToChapter(chapter.dataset.chapter);
  else if (detail) openExperience(detail.dataset.detail, detail);
  else if (place) openPlace(place.dataset.place, place);
});
$('#about-trigger').addEventListener('click', event => openNotes(event.currentTarget));
$('#motion-toggle').addEventListener('click', () => { manuallyPaused = !manuallyPaused; updateMotion(); });
reducedMotion.addEventListener('change', updateMotion);
$('#greet-trigger').addEventListener('click', () => {
  characters.play(avatars.hero, 'thinking', 2600);
  $('#status').textContent = 'Ying is thinking.';
});
document.addEventListener('pointerover', event => {
  if (!motion || state.navigating || dialog.open) return;
  const target = event.target.closest('[data-detail], [data-place], .path-choice');
  if (!target || target.contains(event.relatedTarget)) return;
  if (target.dataset.detail && state.route === 'professional') return;
  if (target.dataset.detail) {
    characters.play(avatars.guide, 'thinking', 1300);
    $('#guide-speech').textContent = 'Curious? Let’s take a closer look.';
  } else if (target.dataset.place) {
    characters.play(avatars.guide, 'happy', 1200);
    $('#guide-speech').textContent = `${places[target.dataset.place].title} has a little story.`;
  }
});
function closeDetail() {
  if (professionalStory.hasDetail()) professionalStory.closeDetail(() => dialog.close());
  else dialog.close();
}
$('#close-detail').addEventListener('click', closeDetail);
$('#close-bottom').addEventListener('click', closeDetail);
dialog.addEventListener('cancel', event => {
  if (professionalStory.hasDetail()) { event.preventDefault(); closeDetail(); }
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeDetail();
});
dialog.addEventListener('close', () => {
  professionalStory.detailClosed();
  guide.style.opacity = '';
  $('#guide-speech').textContent = state.route === 'personal' ? 'Where shall we go next?' : chapterSpeech[state.chapter];
  characters.play(avatars.guide, 'wave', 1100);
  if (lastFocused?.isConnected) lastFocused.focus({ preventScroll: true });
});
window.addEventListener('hashchange', () => {
  const [route, chapter] = location.hash.slice(1).split('/');
  navigate(route || 'home', { chapter: outfits[chapter] ? chapter : undefined, instant: true });
});
const [initialRoute, initialChapter] = location.hash.slice(1).split('/');
navigate(['home', 'professional', 'personal'].includes(initialRoute) ? initialRoute : 'home', { chapter: outfits[initialChapter] ? initialChapter : undefined, instant: true });
updateMotion();
window.addEventListener('pageshow', () => window.scrollTo({ top: 0, behavior: 'instant' }));

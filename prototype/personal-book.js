/* Finite entrances; hidden objects become interactive after their arrival. */
(()=>{
 let letterAnimations=[],entranceTimer=0,entranceVersion=0,activeScene=null;
 const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function letters(element){
  if(!element||element.querySelector('.hero-letter'))return;
  const readable=element.textContent;
  const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT),nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  let index=0;
  for(const node of nodes){
   const fragment=document.createDocumentFragment();
   for(const character of Array.from(node.textContent)){
    if(/\s/.test(character)){fragment.append(document.createTextNode(character));continue;}
    const span=document.createElement('span');span.className='hero-letter';span.textContent=character;span.setAttribute('aria-hidden','true');span.style.setProperty('--letter-index',index++);fragment.append(span);
   }
   node.replaceWith(fragment);
  }
  if(element.tagName==='P'){const text=document.createElement('span');text.className='sr-only';text.textContent=readable;element.append(text);}
 }
 function prepareHome(){letters(document.querySelector('.cover-title h1'));letters(document.querySelector('.cover-title p'));}
 function enterHome(){
  prepareHome();letterAnimations.forEach(a=>a.cancel());
  const nodes=[...document.querySelectorAll('.cover-title p .hero-letter'),...document.querySelectorAll('.cover-title h1 .hero-letter')];
  letterAnimations=nodes.map((node,index)=>node.animate(reduced()?[{opacity:.3},{opacity:1}]:[{opacity:0,transform:'translateY(13px)'},{opacity:1,transform:'translateY(0)'}],{duration:reduced()?180:950,delay:reduced()?0:index*100,easing:'cubic-bezier(.22,.61,.36,1)',fill:'backwards'}));
 }
 function cancel(){
  entranceVersion++;clearTimeout(entranceTimer);entranceTimer=0;
  activeScene?.getAnimations?.({subtree:true}).filter(a=>a.id==='book-entrance').forEach(a=>a.cancel());
  activeScene?.querySelectorAll('[data-topic]').forEach(button=>button.disabled=false);
 }
 function open(scene){
  if(!scene||scene.closest('[hidden]'))return;
  cancel();activeScene=scene;const version=entranceVersion;
  scene.classList.add('book-reset');scene.classList.remove('book-ready');
  const book=scene.querySelector('.storybook');book.setAttribute('aria-expanded','false');
  const bookBox=book.getBoundingClientRect(),cx=bookBox.left+bookBox.width*.75,cy=bookBox.top+bookBox.height*.5;
  scene.querySelectorAll('[data-topic]').forEach((object,index)=>{
   object.disabled=true;
   const box=object.getBoundingClientRect(),dx=cx-box.left-box.width/2,dy=cy-box.top-box.height/2;
   const animation=object.animate(reduced()?[{opacity:0},{opacity:1}]:[{opacity:0,transform:`translate(${dx}px,${dy}px) scale(.08) rotate(-8deg)`},{opacity:1,transform:'translate(0,0) scale(1) rotate(0deg)'}],{duration:reduced()?160:1150,delay:reduced()?200:2450+index*95,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
   animation.id='book-entrance';
   animation.finished.then(()=>{if(version===entranceVersion)object.disabled=false;}).catch(()=>{});
  });
  requestAnimationFrame(()=>{if(version===entranceVersion)scene.classList.remove('book-reset');});
  entranceTimer=setTimeout(()=>{
   if(version!==entranceVersion||scene.closest('[hidden]'))return;
   scene.classList.add('book-ready');book.setAttribute('aria-expanded','true');
  },reduced()?0:550);
 }
 window.YingBook={open,cancel,prepareHome,enterHome,reduced};
})();

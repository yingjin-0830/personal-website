window.createYingHome = ({root, character, characters, motionEnabled, isActive}) => {
  const button = root.querySelector('.hero-character');
  const title = root.querySelector('.hero-title');
  const choices = [...root.querySelectorAll('.path-choice')];
  const letters = [...title.querySelectorAll('.name-word>span')];
  let effects = [], departure = null, departing = false;
  const enabled = () => motionEnabled() && !document.hidden;
  function clearEffects() { effects.forEach(effect => effect.cancel()); effects = []; }
  function look(route) {
    if (!isActive() || departing) return;
    choices.forEach(choice => choice.dataset.looking = String(choice.dataset.route === route));
    button.dataset.facing = route === 'personal' ? 'right' : 'left';
    characters.play(character, route ? 'turn' : 'idle', Infinity);
  }
  for (const choice of choices) {
    choice.addEventListener('pointerenter', () => look(choice.dataset.route));
    choice.addEventListener('pointerleave', () => { if (document.activeElement !== choice) look(null); });
    choice.addEventListener('focus', () => look(choice.dataset.route));
    choice.addEventListener('blur', () => look(null));
  }
  function enter() {
    clearEffects(); departing = false; root.dataset.departing = 'false';
    button.style.translate = ''; button.style.opacity = ''; button.dataset.facing = 'left';
    choices.forEach(choice => choice.dataset.looking = 'false');
    characters.play(character, 'wave', 1500);
    if (!enabled()) return;
    letters.forEach((letter,i) => effects.push(letter.animate([
      {opacity:0,transform:'translateY(25px) rotate(5deg)',filter:'blur(3px)'},
      {opacity:1,transform:'translateY(-3px) rotate(-1deg)',filter:'blur(0)'},
      {opacity:1,transform:'translateY(0) rotate(0)',filter:'blur(0)'}
    ], {duration:700,delay:100+i*65,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'})));
    effects.push(root.querySelector('.name-stroke').animate([{transform:'scaleX(0)',opacity:0},{transform:'scaleX(1)',opacity:.75}],{duration:650,delay:650,easing:'ease-out',fill:'backwards'}));
  }
  function finishDeparture() {
    if (!departure) return;
    const done = departure; departure = null;
    effects.forEach(effect => effect.finish());
    done();
  }
  async function depart(route, done) {
    clearEffects(); departing = true; departure = done; root.dataset.departing = 'true';
    const direction = route === 'professional' ? -1 : 1;
    button.dataset.facing = direction === 1 ? 'right' : 'left';
    characters.play(character, 'profile', Infinity);
    if (!enabled()) { finishDeparture(); return; }
    const turn = button.animate([{translate:'0 0'},{translate:`${direction*10}px 0`}],{duration:150,fill:'forwards',easing:'ease-out'});
    effects.push(turn);
    await turn.finished.catch(()=>{});
    if (!departure) return;
    characters.play(character,'sidewalk',Infinity);
    const box = button.getBoundingClientRect();
    const distance = direction === -1 ? box.right + 30 : root.clientWidth - box.left + 30;
    const walk = button.animate([
      {translate:`${direction*10}px 0`,opacity:1},
      {translate:`${direction*distance*.83}px 0`,opacity:1,offset:.83},
      {translate:`${direction*distance}px 0`,opacity:0}
    ],{duration:Math.min(2600,Math.max(1750,distance*3.7)),fill:'forwards',easing:'cubic-bezier(.25,.1,.55,1)'});
    effects.push(walk);
    await walk.finished.catch(()=>{});
    if (!departure) return;
    const fade=root.animate([{opacity:1},{opacity:0}],{duration:180,fill:'forwards',easing:'ease-out'});
    effects.push(fade);
    await fade.finished.catch(()=>{});
    finishDeparture();
  }
  function leave() { clearEffects(); departing = false; root.dataset.departing = 'false'; }
  function setMotion(value) { if (!value) { if (departure) finishDeparture(); else clearEffects(); } }
  return {enter,leave,depart,setMotion};
};

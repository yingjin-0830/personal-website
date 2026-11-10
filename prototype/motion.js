/* Each element owns one finite UI transition; replacement and close cancel it. */
(()=>{
 const active=new WeakMap();
 function cancel(element){const animation=active.get(element);if(animation){active.delete(element);animation.cancel();}}
 async function animate(element,frames,duration=300,extra={}){
  cancel(element);
  const animation=element.animate(frames,{duration,easing:'cubic-bezier(.2,.65,.3,1)',fill:'forwards',...extra});
  active.set(element,animation);
  try{await animation.finished;}catch{}
  if(active.get(element)===animation){active.delete(element);animation.cancel();}
 }
 window.YingMotion={animate,cancel};
})();

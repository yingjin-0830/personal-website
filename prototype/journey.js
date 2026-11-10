(()=>{
 const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
 function createJourney(order,chapters){return order.flatMap(chapter=>chapters[chapter].items.map((id,index)=>({chapter,id,index})));}
 function indexForScroll(top,range,count){return range>0&&count>1?clamp(Math.round(top/range*(count-1)),0,count-1):0;}
 function topForIndex(index,range,count){return range>0&&count>1?clamp(index,0,count-1)/(count-1)*range:0;}
 function chapterProgress(top,range,chapters){
  const order=Object.keys(chapters),scenes=createJourney(order,chapters);
  const position=range>0?clamp(top/range,0,1)*Math.max(0,scenes.length-1):0;
  const lower=Math.floor(position),upper=Math.min(lower+1,scenes.length-1),fraction=position-lower;
  const raw=clamp((fraction-.2)/.6,0,1),phase=raw*raw*(3-2*raw);
  const sceneIndex=fraction<.5?lower:upper,scene=scenes[sceneIndex]||{chapter:order[0],index:0};
  const chapterIndex=order.indexOf(scene.chapter),crossing=scenes[lower]?.chapter!==scenes[upper]?.chapter;
  const moving=lower!==upper&&!crossing;
  const neighborIndex=moving?(sceneIndex===lower?upper:lower):null;
  return {chapter:scene.chapter,chapterIndex,itemIndex:scene.index,sceneIndex,
   offset:moving?sceneIndex-lower-phase:0,
   neighborIndex,neighborOffset:neighborIndex===null?0:neighborIndex-lower-phase,
   chapterOffset:crossing?phase-(sceneIndex===upper?1:0):0,
   chapterPosition:crossing?order.indexOf(scenes[lower].chapter)+phase:chapterIndex};
 }
 function topForChapterScene(index,range,chapters){return topForIndex(index,range,createJourney(Object.keys(chapters),chapters).length);}
 function createScrollCoordinator({requestFrame,cancelFrame,readIndex,render,restoreIndex}){
  let scrollFrame=0,resizeFrame=0,settleFrame=0,restore=null;
  function cancel(){[scrollFrame,resizeFrame,settleFrame].forEach(cancelFrame);scrollFrame=resizeFrame=settleFrame=0;restore=null;}
  function scroll(){
   if(restore!==null)return;
   cancelFrame(scrollFrame);scrollFrame=requestFrame(()=>{scrollFrame=0;if(restore===null)render();});
  }
  function resize(){
   if(restore===null)restore=readIndex();
   [scrollFrame,resizeFrame,settleFrame].forEach(cancelFrame);scrollFrame=0;
   resizeFrame=requestFrame(()=>{resizeFrame=0;restoreIndex(restore);settleFrame=requestFrame(()=>{settleFrame=0;restore=null;});});
  }
  return {scroll,resize,cancel};
 }
 window.YingJourney={createJourney,indexForScroll,topForIndex,chapterProgress,topForChapterScene,createScrollCoordinator};
})();

(()=>{
 const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
 function createJourney(order,chapters){return order.flatMap(chapter=>chapters[chapter].items.map((id,index)=>({chapter,id,index})));}
 function indexForScroll(top,range,count){return range>0&&count>1?clamp(Math.round(top/range*(count-1)),0,count-1):0;}
 function topForIndex(index,range,count){return range>0&&count>1?clamp(index,0,count-1)/(count-1)*range:0;}
 window.YingJourney={createJourney,indexForScroll,topForIndex};
})();

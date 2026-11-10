const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const window={};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../journey.js'),'utf8'),{window});
const {createJourney,indexForScroll,topForIndex}=window.YingJourney;
const chapters={work:{items:['sunlight','kuaishou','deloitte','accenture']},projects:{items:['household','vision','horses','walmart']},education:{items:['duke','uibe']}};
const order=['work','projects','education'];
test('a single journey includes every experience before projects and both schools',()=>{
 const scenes=createJourney(order,chapters);
 assert.deepEqual(Array.from(scenes,s=>s.id),['sunlight','kuaishou','deloitte','accenture','household','vision','horses','walmart','duke','uibe']);
 assert.deepEqual(Array.from(scenes,s=>s.chapter),['work','work','work','work','projects','projects','projects','projects','education','education']);
 assert.equal(scenes[9].index,1);
});
test('forward scrolling crosses chapter boundaries after the final entry',()=>{
 const ids=createJourney(order,chapters);
 const result=[0,1100,2200,3300,4400,7700,8800,9900].map(y=>ids[indexForScroll(y,9900,10)]?.id);
 assert.deepEqual(result,['sunlight','kuaishou','deloitte','accenture','household','walmart','duke','uibe']);
});
test('reverse scrolling returns through the same entries',()=>{
 const ids=createJourney(order,chapters);
 assert.deepEqual([9900,8800,7700,4400,3300,0].map(y=>ids[indexForScroll(y,9900,10)]?.id),['uibe','duke','walmart','household','accenture','sunlight']);
});
test('entry anchors preserve the selected record when the viewport is resized',()=>{
 assert.equal(topForIndex(4,9900,10),4400);
 assert.equal(topForIndex(4,5940,10),2640);
 assert.equal(indexForScroll(2640,5940,10),4);
 assert.equal(topForIndex(9,5940,10),5940);
});
test('overscroll and zero-height ranges never select a missing entry',()=>{
 assert.equal(indexForScroll(-200,9900,10),0);
 assert.equal(indexForScroll(12000,9900,10),9);
 assert.equal(indexForScroll(42,0,10),0);
 assert.equal(topForIndex(-5,9900,10),0);
 assert.equal(topForIndex(20,9900,10),9900);
});
test('horizontal chapter motion holds each story before handing off to its neighbor',()=>{
 const progress=window.YingJourney.chapterProgress;
 assert.equal(typeof progress,'function');
 const start=progress(0,9000,chapters);
 assert.equal(start.chapter,'work');assert.equal(start.sceneIndex,0);assert.equal(start.offset,0);
 assert.equal(progress(200,9000,chapters).offset,0);
 const middle=progress(500,9000,chapters);
 assert.equal(middle.sceneIndex,1);assert.equal(middle.neighborIndex,0);
 assert.equal(middle.offset,.5);assert.equal(middle.neighborOffset,-.5);
 assert.equal(progress(800,9000,chapters).offset,0);
});
test('chapter boundaries roll the rail vertically without mixing horizontal cards from different chapters',()=>{
 const progress=window.YingJourney.chapterProgress;
 assert.equal(typeof progress,'function');
 const before=progress(3200,9000,chapters);
 assert.equal(before.chapter,'work');assert.equal(before.offset,0);assert.equal(before.neighborIndex,null);
 const boundary=progress(3500,9000,chapters);
 assert.equal(boundary.chapter,'projects');assert.equal(boundary.chapterPosition,.5);
 assert.equal(boundary.chapterOffset,-.5);assert.equal(boundary.neighborIndex,null);
 assert.equal(progress(4000,9000,chapters).chapterPosition,1);
 assert.equal(progress(7500,9000,chapters).chapterPosition,1.5);
});
test('scrubbing in either direction and large deltas always resolve the correct chapter and story',()=>{
 const progress=window.YingJourney.chapterProgress;
 assert.equal(typeof progress,'function');
 assert.deepEqual([9000,8000,7000,4000,3000,0].map(y=>progress(y,9000,chapters).sceneIndex),[9,8,7,4,3,0]);
 assert.equal(progress(-500,9000,chapters).sceneIndex,0);
 assert.equal(progress(99999,9000,chapters).sceneIndex,9);
 assert.equal(progress(3500,0,chapters).sceneIndex,0);
});
test('chapter scene anchors preserve the selected item after resizing',()=>{
 const anchor=window.YingJourney.topForChapterScene,progress=window.YingJourney.chapterProgress;
 assert.equal(typeof anchor,'function');assert.equal(typeof progress,'function');
 for(const [index,range,want] of [[0,9000,0],[4,9000,4000],[8,5400,4800],[9,5400,5400]]){
  assert.equal(anchor(index,range,chapters),want);
  assert.equal(progress(want,range,chapters).sceneIndex,index);
  assert.equal(progress(want,range,chapters).offset,0);
 }
});
test('a layout-induced scroll cannot replace the selected story during viewport restoration',()=>{
 const create=window.YingJourney.createScrollCoordinator;
 assert.equal(typeof create,'function');
 let selected=7,sequence=0;const frames=new Map();
 const request=fn=>{frames.set(++sequence,fn);return sequence;},cancel=id=>frames.delete(id);
 const flush=()=>{for(const [id,fn] of [...frames])if(frames.delete(id))fn();};
 const coordinator=create({requestFrame:request,cancelFrame:cancel,readIndex:()=>selected,render:()=>selected=8,restoreIndex:index=>selected=index});
 coordinator.scroll();coordinator.resize();coordinator.scroll();flush();coordinator.scroll();flush();
 assert.equal(selected,7,'the same Walmart story survives the change in scroll range');
 coordinator.scroll();flush();assert.equal(selected,8,'normal scrolling resumes after restoration');
});
test('repeated viewport changes retain the first selected story until the layout settles',()=>{
 const create=window.YingJourney.createScrollCoordinator;
 assert.equal(typeof create,'function');
 let selected=4,sequence=0;const frames=new Map();
 const request=fn=>{frames.set(++sequence,fn);return sequence;},cancel=id=>frames.delete(id);
 const flush=()=>{for(const [id,fn] of [...frames])if(frames.delete(id))fn();};
 const coordinator=create({requestFrame:request,cancelFrame:cancel,readIndex:()=>selected,render:()=>selected=0,restoreIndex:index=>selected=index});
 coordinator.resize();selected=6;coordinator.resize();coordinator.scroll();flush();flush();
 assert.equal(selected,4);
 coordinator.cancel();coordinator.scroll();flush();assert.equal(selected,0);
});

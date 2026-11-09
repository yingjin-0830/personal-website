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

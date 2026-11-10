const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const window={},file=path.join(__dirname,'../motion.js');
if(fs.existsSync(file))vm.runInNewContext(fs.readFileSync(file,'utf8'),{window});
function element(){
 const animations=[];
 return {animations,animate(){
  let finish,reject;const animation={state:'running',finished:new Promise((resolve,no)=>{finish=resolve;reject=no;}),finish(){this.state='finished';finish();},cancel(){this.state='cancelled';reject(new Error('cancelled'));}};
  animations.push(animation);return animation;
 }};
}
test('a new motion cancels its predecessor without letting the old completion cancel the replacement',async()=>{
 assert.equal(typeof window.YingMotion?.animate,'function');
 const el=element();
 const first=window.YingMotion.animate(el,[{opacity:0},{opacity:1}],620);
 const next=window.YingMotion.animate(el,[{opacity:1},{opacity:0}],260);
 assert.equal(el.animations[0].state,'cancelled');
 await first;assert.equal(el.animations[1].state,'running');
 el.animations[1].finish();await next;
});
test('closing can cancel an opening motion before the same dialog is reused',async()=>{
 assert.equal(typeof window.YingMotion?.cancel,'function');
 const el=element();const opening=window.YingMotion.animate(el,[{transform:'scale(.2)'},{transform:'scale(1)'}],620);
 window.YingMotion.cancel(el);await opening;
 assert.equal(el.animations[0].state,'cancelled');
 const contact=window.YingMotion.animate(el,[{opacity:0},{opacity:1}],240);
 assert.equal(el.animations[1].state,'running');el.animations[1].finish();await contact;
});

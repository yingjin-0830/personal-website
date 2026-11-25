const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const window={};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../journey.js'),'utf8'),{window});

test('chapter wheel loops in both directions without placing a label a whole turn away',()=>{
 const {cyclicIndex,railDistance}=window.YingJourney;
 assert.equal(typeof cyclicIndex,'function');
 assert.deepEqual([-2,-1,0,1,2,3,4].map(n=>cyclicIndex(n,3)),[1,2,0,1,2,0,1]);
 assert.equal(railDistance(0,2.75,3),.25);
 assert.equal(railDistance(2,-.75,3),-.25);
 assert.equal(railDistance(1,1,3),0);
});

test('a trackpad burst advances once, then later gestures can loop and reverse',()=>{
 const create=window.YingJourney.createChapterWheel;
 assert.equal(typeof create,'function');
 const positions=[];const wheel=create({readPosition:()=>positions.at(-1)||0,onTarget:p=>positions.push(p)});
 wheel.wheel(20,0);wheel.wheel(25,10);wheel.wheel(100,30);wheel.wheel(40,120);
 assert.deepEqual(positions,[1]);
 wheel.wheel(50,700);wheel.wheel(50,1400);wheel.wheel(-50,2100);
 assert.deepEqual(positions,[1,2,3,2]);
 wheel.reset();wheel.wheel(0,2800);assert.equal(positions.length,4);
});

function harness(top=0,range=1000){
 let seq=0;const frames=new Map(),writes=[];
 const smoother=window.YingJourney.createWheelSmoother({
  requestFrame:fn=>{frames.set(++seq,fn);return seq;},cancelFrame:id=>frames.delete(id),
  readTop:()=>top,readRange:()=>range,writeTop:value=>{top=value;writes.push(value);}
 });
 return {smoother,writes,top:()=>top,frame:time=>{for(const [id,fn] of [...frames])if(frames.delete(id))fn(time);},pending:()=>frames.size};
}

test('mouse wheel motion approaches its destination smoothly and respects the scroll bounds',()=>{
 assert.equal(typeof window.YingJourney.createWheelSmoother,'function');
 const h=harness();h.smoother.wheel(400);h.frame(0);
 assert.ok(h.top()>0&&h.top()<400,'first frame does not jump to the destination');
 for(let t=16;t<1200;t+=16)h.frame(t);
 assert.equal(h.top(),400);assert.equal(h.pending(),0);
 assert.ok(h.writes.every((v,i)=>!i||v>=h.writes[i-1]));
 h.smoother.wheel(2000);for(let t=1200;t<2600;t+=16)h.frame(t);
 assert.equal(h.top(),1000);
 h.smoother.wheel(-3000);for(let t=2600;t<4000;t+=16)h.frame(t);
 assert.equal(h.top(),0);
});

test('wheel reversal changes direction and cancellation leaves keyboard or route changes in control',()=>{
 assert.equal(typeof window.YingJourney.createWheelSmoother,'function');
 const h=harness(500);h.smoother.wheel(400);h.frame(0);const first=h.top();
 h.smoother.wheel(-700);h.frame(16);assert.ok(h.top()<first);
 h.smoother.cancel();const count=h.writes.length;h.frame(32);
 assert.equal(h.writes.length,count);assert.equal(h.pending(),0);
});

test('wheel easing settles when a browser rounds scroll positions to whole pixels',()=>{
 let top=0,seq=0;const frames=new Map();
 const smoother=window.YingJourney.createWheelSmoother({requestFrame:fn=>{frames.set(++seq,fn);return seq;},cancelFrame:id=>frames.delete(id),readTop:()=>top,readRange:()=>1000,writeTop:value=>top=Math.round(value)});
 smoother.wheel(400);
 for(let t=0;t<2000;t+=16)for(const [id,fn] of [...frames])if(frames.delete(id))fn(t);
 assert.equal(top,400);
 assert.equal(frames.size,0,'the animation stops after reaching the target');
});

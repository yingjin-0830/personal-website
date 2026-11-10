const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const window={};
for(const file of ['editorial-content.js','i18n.js','topic-art.js','magnet-art.js','personal-renderers.js'])vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../'+file),'utf8'),{window});
test('the map opens a travel story with an explicit route to the existing magnet collection',()=>{
 for(const lang of ['en','zh']){
  const body=window.YingPersonalView.topicBody('travel',lang);
  assert.match(body,/data-travel-collection/);
  assert.ok(body.includes(window.YingI18n.translate('viewTravel',lang)));
  assert.ok(body.includes(lang==='zh'?'读万卷书':'read ten thousand books'));
 }
});
test('Personal renders six accessible interactive objects including music',()=>{
 for(const lang of ['en','zh']){
  const html=window.YingPersonalView.topicCards(lang);
  assert.equal((html.match(/data-topic=/g)||[]).length,6);
  assert.match(html,/data-topic="music"/);
  assert.equal((html.match(/aria-label=/g)||[]).length,6);
 }
});
test('personal stories escape supplied text while keeping controls usable',()=>{
 const topic=window.YingContent.topics.coffee,old=topic.title;
 try{
  topic.title='<img src=x onerror=alert(1)>';
  const body=window.YingPersonalView.topicBody('coffee','en');
  assert.ok(body.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(!body.includes('<img src=x'));
 }finally{topic.title=old;}
});

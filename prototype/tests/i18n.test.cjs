const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const window={};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../editorial-content.js'),'utf8'),{window});
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../i18n.js'),'utf8'),{window});
const {translate,localize,normalizeLocale}=window.YingI18n;
test('locale preferences accept only the two supported site languages',()=>{
 assert.equal(normalizeLocale('zh'),'zh');
 assert.equal(normalizeLocale('en'),'en');
 for(const value of [null,undefined,'fr','<script>'])assert.equal(normalizeLocale(value),'en');
});
test('both editions have complete UI messages and technical terms remain intact',()=>{
 assert.equal(translate('navProfessional','en'),'Professional');
 assert.equal(translate('navProfessional','zh'),'职业经历');
 assert.equal(translate('SQL','zh'),'SQL');
 assert.equal(translate('https://example.com/photo.jpg','zh'),'https://example.com/photo.jpg');
 for(const [key,pair] of Object.entries(window.YingI18n.ui)){
  assert.equal(pair.length,2,key);
  assert.ok(pair.every(value=>typeof value==='string'&&value.trim()),key);
 }
});
test('Chinese experience details cover every narrative without mutating English',()=>{
 const source=window.YingContent.experiences;
 const before=JSON.stringify(source);
 for(const [id,entry] of Object.entries(source)){
  const zh=localize(entry,'zh');
  assert.match(zh.title,/[\u3400-\u9fff]/u,id+' title');
  assert.match(zh.lead,/[\u3400-\u9fff]/u,id+' lead');
  for(const section of zh.sections){
   assert.match(section.title,/[\u3400-\u9fff]/u,id+' section');
   if(section.text)assert.match(section.text,/[\u3400-\u9fff]/u,id+' narrative');
   for(const item of section.items||[])assert.match(item,/[\u3400-\u9fff]/u,id+' bullet');
  }
  if(entry.logo)assert.equal(zh.logo.src,entry.logo.src);
 }
 assert.equal(JSON.stringify(source),before);
 assert.equal(localize(source.sunlight,'en').title,'Marketing Analyst');
});
test('translations retain the resume metrics in long-form responsibilities',()=>{
 const source=window.YingContent.experiences;
 for(const id of ['sunlight','kuaishou','deloitte','accenture']){
  const en=source[id],zh=localize(en,'zh');
  assert.deepEqual(Array.from(zh.stats,s=>s.value),Array.from(en.stats,s=>s.value));
  en.sections.forEach((section,i)=>(section.items||[]).forEach((item,j)=>{
   for(const number of item.match(/\d[\d,.]*[%+]?/g)||[])assert.ok(zh.sections[i].items[j].includes(number),`${id}: ${number}`);
  }));
 }
});
test('all six personal interests have complete Chinese narrative content',()=>{
 const topics=window.YingContent.topics;
 assert.ok(topics,'personal chapters exist');
 assert.equal(Object.keys(topics).length,6);
 assert.deepEqual(Object.keys(topics).sort(),['coffee','cooking','fitness','music','photography','travel']);
 for(const [id,topic] of Object.entries(topics)){
  const zh=localize(topic,'zh');
  assert.match(zh.title,/[\u3400-\u9fff]/u,id+' title');
  assert.match(zh.lead,/[\u3400-\u9fff]/u,id+' lead');
  for(const section of zh.sections||[]){
   assert.match(section.title,/[\u3400-\u9fff]/u,id+' heading');
   assert.match(section.text,/[\u3400-\u9fff]/u,id+' body');
  }
 }
});
test('the collection includes eleven named places and one exploration state',()=>{
 const places=window.YingContent.places;
 for(const id of ['beijing','northcarolina','sandiego','sanfrancisco','losangeles'])assert.ok(places[id],id);
 assert.equal(Object.values(places).filter(place=>!place.locked).length,11);
 assert.equal(Object.values(places).filter(place=>place.locked).length,1);
 for(const place of Object.values(places)){
  const zh=localize(place,'zh');
  assert.match(zh.title,/[\u3400-\u9fff]/u);
  assert.match(zh.line,/[\u3400-\u9fff]/u);
  assert.match(zh.description,/[\u3400-\u9fff]/u);
 }
});

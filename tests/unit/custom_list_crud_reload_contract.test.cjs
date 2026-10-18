'use strict';
// Executes exact AMQ/EMQ list functions extracted from production source with isolated storage.
// Browser-origin reload and UI wiring are covered by the separate Playwright harness.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const amq = fs.readFileSync(path.join(root, 'src/scripts/script_025.htmlpart'), 'utf8');
const emq = fs.readFileSync(path.join(root, 'src/scripts/script_040.htmlpart'), 'utf8');
const emqModule = fs.readFileSync(path.join(root, 'src/modules/emq_list_membership.htmlpart'), 'utf8');
const amqValidationModule = fs.readFileSync(path.join(root, 'src/modules/amq_custom_list_validation.htmlpart'), 'utf8');
const passed = [];
function test(name, fn) {
  try { fn(); passed.push(name); console.log('PASS ' + name); }
  catch (e) { console.error('FAIL ' + name + '\n' + e.stack); process.exitCode = 1; }
}
function extractFunction(source, name) {
  const start = source.indexOf('function ' + name + '(');
  assert.ok(start >= 0, 'function exists: ' + name);
  const open = source.indexOf('{', start);
  let depth = 0, quote = null, escaped = false, line = false, block = false;
  for (let i = open; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (line) { if (c === '\n') line = false; continue; }
    if (block) { if (c === '*' && n === '/') { block = false; i++; } continue; }
    if (quote) { if (escaped) { escaped = false; continue; } if (c === '\\') { escaped = true; continue; } if (c === quote) quote = null; continue; }
    if (c === '/' && n === '/') { line = true; i++; continue; }
    if (c === '/' && n === '*') { block = true; i++; continue; }
    if (c === "'" || c === '"' || c.charCodeAt(0) === 96) { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error('unclosed function: ' + name);
}
function extractStatement(source, token) {
  const start = source.indexOf(token);
  assert.ok(start >= 0, 'statement exists: ' + token);
  let quote = null, escaped = false, line = false, block = false, paren = 0, brace = 0, bracket = 0;
  for (let i = start; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (line) { if (c === '\n') line = false; continue; }
    if (block) { if (c === '*' && n === '/') { block = false; i++; } continue; }
    if (quote) { if (escaped) { escaped = false; continue; } if (c === '\\') { escaped = true; continue; } if (c === quote) quote = null; continue; }
    if (c === '/' && n === '/') { line = true; i++; continue; }
    if (c === '/' && n === '*') { block = true; i++; continue; }
    if (c === "'" || c === '"' || c.charCodeAt(0) === 96) { quote = c; continue; }
    if (c === '(') paren++; else if (c === ')') paren--;
    else if (c === '{') brace++; else if (c === '}') brace--;
    else if (c === '[') bracket++; else if (c === ']') bracket--;
    else if (c === ';' && paren === 0 && brace === 0 && bracket === 0) return source.slice(start, i + 1);
  }
  throw new Error('unclosed statement: ' + token);
}
function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial).map(([k,v]) => [k, String(v)]));
  return { data, getItem:k=>data.has(String(k))?data.get(String(k)):null,
    setItem:(k,v)=>data.set(String(k),String(v)), removeItem:k=>data.delete(String(k)),
    key:i=>[...data.keys()][i]??null, get length(){return data.size} };
}
function buildAmqContext(storage = memoryStorage()) {
  const code = [
    extractStatement(amq, 'const KEYS='),
    extractStatement(amq, 'const RECOVERY_KEYS='),
    extractStatement(amq, 'const blockedWrites='),
    extractStatement(amq, 'const safeRead='),
    extractStatement(amq, 'const write='),
    'const notify=()=>{};',
    'const anime=[]; const songs=[];',
    extractStatement(amq, 'const getAnimeById='),
    extractStatement(amqValidationModule, 'const validIdArray='),
    extractStatement(amqValidationModule, 'const validListRow='),
    extractStatement(amqValidationModule, 'const validListPayload='),
    extractStatement(amq, 'const readListData='),
    'let listData=readListData(); let currentListId=""; let currentListFilter="";',
    extractStatement(amq, 'const persistLists='),
    extractStatement(amq, 'const customListById='),
    extractStatement(amq, 'const makeId='),
    extractFunction(amq, 'createList'),
    extractFunction(amq, 'mutateAnimeList'),
    'const syncListSelectors=()=>{}; const renderCustomLists=()=>{}; const renderManageModalIfOpen=()=>{};',
    'globalThis.testHarness={createList,mutateAnimeList,customListById,readListData,get data(){return listData}};'
  ].join('\n');
  const context = {localStorage:storage,window:{},Date,Math,Set,Map,Array,String,Number,Object,JSON,RegExp,console,anime:[],songs:[],document:{querySelector:()=>null,querySelectorAll:()=>[]}};
  vm.createContext(context); vm.runInContext(code,context,{timeout:1500});
  return {storage,api:context.testHarness};
}
function buildEmqContext(storage = memoryStorage()) {
  const rows=[[900001,910001,1,0,'Song A','Artist A'],[900001,910002,2,0,'Song B','Artist B'],[900002,910003,1,0,'Song C','Artist C']];
  const works=new Map([['900001',{i:900001,vndbId:'v123',t:'Work A'}],['900002',{i:900002,vndbId:'v456',t:'Work B'}]]);
  const byVn=new Map([['v123',works.get('900001')],['v456',works.get('900002')]]);
  const meta=new Map([['910001',{vndbId:'v123'}],['910002',{vndbId:'v123'}],['910003',{vndbId:'v456'}]]);
  const context={localStorage:storage,window:{__aniEmqAPI:{ready:true,getRows:()=>rows,getMeta:id=>meta.get(String(id))||null,getWork:id=>works.get(String(id))||null,getWorkByVndbId:id=>byVn.get(String(id))||null}},Date,Math,Set,Map,Array,String,Number,Object,JSON,RegExp,console,alert:()=>{},renderManager:()=>{},refreshBatchSelectors:()=>{},renderQuizPicker:()=>{}};
  const code=[
    "const KEY='aniEmqWorkListsV8254';",extractFunction(emq,'unique'),extractFunction(emq,'loadDb'),extractFunction(emq,'saveDb'),extractFunction(emq,'api'),
    'let db=loadDb(); let managerListId="";',extractFunction(emq,'makeId'),extractFunction(emq,'createList'),extractFunction(emq,'addMembers'),extractFunction(emq,'removeMembers'),extractFunction(emqModule,'listWorkIds'),extractFunction(emqModule,'listSongIds'),
    'globalThis.testHarness={createList,addMembers,removeMembers,listWorkIds,listSongIds,loadDb,get data(){return db}};'
  ].join('\n');
  vm.createContext(context);vm.runInContext(code,context,{timeout:1500});
  return {storage,api:context.testHarness};
}
test('AMQ create normalizes names and persists stable identity',()=>{
  const h=buildAmqContext();assert.equal(h.api.createList('  My   AMQ List  '),true);
  assert.equal(h.api.data.lists[0].name,'My AMQ List');assert.match(h.api.data.lists[0].id,/^cpl-/);
  assert.equal(JSON.parse(h.storage.getItem('aniCustomPracticeListsV1')).lists[0].id,h.api.data.lists[0].id);
});
test('AMQ duplicate names are rejected case-insensitively without mutation',()=>{
  const h=buildAmqContext();h.api.createList('Daily Practice');const before=h.storage.getItem('aniCustomPracticeListsV1');
  assert.equal(h.api.createList('daily practice'),false);assert.equal(h.storage.getItem('aniCustomPracticeListsV1'),before);
});
test('AMQ member add/remove deduplicates IDs and preserves other lists',()=>{
  const h=buildAmqContext();h.api.createList('One');h.api.createList('Two');const [one,two]=h.api.data.lists.map(x=>x.id);
  assert.equal(h.api.mutateAnimeList(one,42,true),true);assert.equal(h.api.mutateAnimeList(one,'42',true),true);
  assert.deepEqual(Array.from(h.api.data.lists[0].animeIds),['42']);assert.equal(h.api.mutateAnimeList(one,42,false),true);
  assert.deepEqual(Array.from(h.api.data.lists[0].animeIds),[]);assert.equal(h.api.data.lists[1].id,two);
});
test('AMQ identity and membership survive database reload',()=>{
  const h=buildAmqContext();h.api.createList('Reload me');const id=h.api.data.lists[0].id;h.api.mutateAnimeList(id,123,true);
  const after=buildAmqContext(h.storage);assert.equal(after.api.data.lists[0].id,id);assert.equal(after.api.data.lists[0].name,'Reload me');
  assert.deepEqual(Array.from(after.api.data.lists[0].animeIds),['123']);
});
test('AMQ UI source retains rename/delete confirmation and selected-list cleanup',()=>{
  assert.match(amq,/\[data-cl-rename\]/);assert.match(amq,/\[data-cl-delete\]/);
  assert.match(amq,/if\(persistLists\(next\)\)\{setCustomScopeInvalidV8265\(false\)/);assert.match(amq,/customListIds:nextIds/);
});
test('EMQ create normalizes names and rejects case-insensitive duplicates',()=>{
  const h=buildEmqContext();const id=h.api.createList('  VN   soundtrack set ');assert.match(id,/^emql-/);
  assert.equal(h.api.data.lists[0].name,'VN soundtrack set');assert.equal(h.api.createList('vn SOUNDTRACK set'),'');assert.equal(h.api.data.lists.length,1);
});
test('EMQ work membership maps to songs without conflating ID domains',()=>{
  const h=buildEmqContext();const id=h.api.createList('Mapped');assert.equal(h.api.addMembers(id,['900001','900001'],[]),true);
  const list=h.api.data.lists[0];assert.deepEqual(Array.from(list.workIds),['900001']);assert.deepEqual(Array.from(list.vndbIds),['v123']);
  assert.deepEqual(Array.from(h.api.listSongIds(list)).sort(),['910001','910002']);
  assert.deepEqual(Array.from(h.api.listSongIds({workIds:['910001'],vndbIds:[],songIds:[]})),[]);
});
test('EMQ VNDB membership resolves the linked work and direct song IDs stay distinct',()=>{
  const h=buildEmqContext();const id=h.api.createList('VN mapping');assert.equal(h.api.addMembers(id,[],['v456']),true);
  const list=h.api.data.lists[0];assert.deepEqual(Array.from(list.workIds),['900002']);assert.deepEqual(Array.from(h.api.listSongIds(list)),['910003']);
  assert.deepEqual(Array.from(h.api.listSongIds({workIds:[],vndbIds:[],songIds:['910002']})),['910002']);
});
test('EMQ removal persists the target-list change across reload',()=>{
  const h=buildEmqContext();const id=h.api.createList('Remove');const other=h.api.createList('Keep');
  h.api.addMembers(id,['900001'],['v456']);assert.equal(h.api.removeMembers(id,['900001'],[]),true);
  assert.deepEqual(Array.from(h.api.data.lists[0].workIds),['900002']);assert.equal(h.api.data.lists[1].id,other);
  const after=buildEmqContext(h.storage);assert.equal(after.api.data.lists[0].id,id);assert.equal(after.api.data.lists[0].name,'Remove');
  assert.deepEqual(Array.from(after.api.data.lists[0].workIds),['900002']);assert.deepEqual(Array.from(after.api.data.lists[0].vndbIds),['v456']);
});
test('EMQ UI source retains rename/delete and selected-list cleanup paths',()=>{
  assert.match(emq,/data-emq-list-rename/);assert.match(emq,/data-emq-list-delete/);
  assert.match(emq,/localStorage\.setItem\(SELECTED_KEY,JSON\.stringify\(getSelectedIds\(\)\.filter\(x=>x!==l\.id\)\)\)/);
  assert.match(emq,/localStorage\.removeItem\(INVALID_SCOPE_KEY_V8265\)/);
});
console.log('RESULT '+passed.length+' passed, '+(process.exitCode?'failed':'0 failed'));

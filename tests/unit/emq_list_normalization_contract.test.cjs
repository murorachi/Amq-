'use strict';
// Exact-source contracts for EMQ list normalization and the extracted pure helper.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
const multiplayerSource=fs.readFileSync(path.join(root,'src/scripts/script_028.htmlpart'),'utf8');
const emqSource=fs.readFileSync(path.join(root,'src/scripts/script_040.htmlpart'),'utf8');
const moduleSource=fs.readFileSync(path.join(root,'src/modules/emq_list_normalization.htmlpart'),'utf8');
function extractFunction(source,name){
 const start=source.indexOf('function '+name+'(');assert.ok(start>=0,'exact function exists: '+name);
 const open=source.indexOf('{',start);let depth=0,quote=null,escaped=false,lineComment=false,blockComment=false;
 for(let i=open;i<source.length;i++){const c=source[i],n=source[i+1];
  if(lineComment){if(c==='\n')lineComment=false;continue}
  if(blockComment){if(c==='*'&&n==='/'){blockComment=false;i++}continue}
  if(quote){if(escaped){escaped=false;continue}if(c==='\\'){escaped=true;continue}if(c===quote)quote=null;continue}
  if(c==='/'&&n==='/'){lineComment=true;i++;continue}if(c==='/'&&n==='*'){blockComment=true;i++;continue}
  if(c==="'"||c==='"'||c==='`'){quote=c;continue}
  if(c==='{')depth++;if(c==='}'&&--depth===0)return source.slice(start,i+1)
 }throw Error('unclosed function: '+name)
}
let payload;const ctx={Array,String,Set,readJson(key,fallback){assert.equal(key,'aniEmqWorkListsV8254');return payload===undefined?fallback:payload}};
vm.createContext(ctx);vm.runInContext(extractFunction(multiplayerSource,'readEmqLists')+'\nglobalThis.__readEmqLists=readEmqLists;',ctx);
const emqTests=[
['legacy array payload remains supported',()=>{payload=[{id:'old',name:'Old list',workIds:['1'],songIds:['10']}];assert.deepEqual(JSON.parse(JSON.stringify(ctx.__readEmqLists())),[{id:'old',name:'Old list',workIds:['1'],vndbIds:[],songIds:['10']}])}],
['object payload with lists remains supported',()=>{payload={version:1,lists:[{id:'x',workIds:['w']}]};assert.deepEqual(JSON.parse(JSON.stringify(ctx.__readEmqLists())),[{id:'x',name:'未命名 EMQ 清單',workIds:['w'],vndbIds:[],songIds:[]}])}],
['missing IDs use stable row-index fallback',()=>{payload={lists:[{workIds:[]},{id:null,name:'B',workIds:[]}]};assert.deepEqual(JSON.parse(JSON.stringify(ctx.__readEmqLists())),[{id:'emq-0',name:'未命名 EMQ 清單',workIds:[],vndbIds:[],songIds:[]},{id:'emq-1',name:'B',workIds:[],vndbIds:[],songIds:[]}])}],
['numeric IDs and membership IDs are stringified',()=>{payload=[{id:7,name:'N',workIds:[1],vndbIds:[2],songIds:[3]}];assert.deepEqual(JSON.parse(JSON.stringify(ctx.__readEmqLists())),[{id:'7',name:'N',workIds:['1'],vndbIds:['2'],songIds:['3']}])}],
['duplicate IDs removed preserving first occurrence per domain',()=>{payload=[{workIds:['4',4,'5'],vndbIds:['v1','v1'],songIds:[9,'9','10']}];assert.deepEqual(JSON.parse(JSON.stringify(ctx.__readEmqLists())),[{id:'emq-0',name:'未命名 EMQ 清單',workIds:['4','5'],vndbIds:['v1'],songIds:['9','10']}])}],
['null, primitive and non-object rows ignored',()=>{payload=[null,false,'bad',0,{workIds:['ok']}];assert.deepEqual(JSON.parse(JSON.stringify(ctx.__readEmqLists())),[{id:'emq-0',name:'未命名 EMQ 清單',workIds:['ok'],vndbIds:[],songIds:[]}])}],
['non-array membership fields normalize to empty arrays',()=>{payload=[{workIds:'w',vndbIds:null,songIds:{}}];assert.deepEqual(JSON.parse(JSON.stringify(ctx.__readEmqLists())),[{id:'emq-0',name:'未命名 EMQ 清單',workIds:[],vndbIds:[],songIds:[]}])}],
['malformed object payload yields empty list',()=>{payload={items:[{workIds:['not-read']}]};assert.deepEqual(JSON.parse(JSON.stringify(ctx.__readEmqLists())),[])}],
['missing storage payload uses existing empty fallback',()=>{payload=undefined;assert.deepEqual(JSON.parse(JSON.stringify(ctx.__readEmqLists())),[])}]
];
const expected="function unique(v){return [...new Set((Array.isArray(v)?v:[]).map(x=>String(x??'').trim()).filter(Boolean))]}",pure={Array,Set,String};vm.createContext(pure);
assert.equal(moduleSource,expected,'extracted helper remains byte-identical to original source');
assert.ok(emqSource.includes('<!-- AMQ_SPLIT_MODULE:emq_list_normalization -->'),'source fragment retains module marker');
vm.runInContext(moduleSource+'\nglobalThis.__unique=unique;',pure);
const pureTests=[
['trims strings and removes blanks',()=>assert.deepEqual(Array.from(pure.__unique([' a ','','  ','b'])),['a','b'])],
['stringifies numbers and deduplicates across types',()=>assert.deepEqual(Array.from(pure.__unique([1,'1',2])),['1','2'])],
['null and undefined normalize to empty and are filtered',()=>assert.deepEqual(Array.from(pure.__unique([null,undefined,'x'])),['x'])],
['preserves first-seen order and case',()=>assert.deepEqual(Array.from(pure.__unique(['B','a','B','A'])),['B','a','A'])],
['non-array input normalizes to empty list',()=>assert.deepEqual(Array.from(pure.__unique({values:[1]})),[])]
];
let passed=0,failed=0;for(const [name,run] of [...emqTests,...pureTests]){try{run();passed++;console.log('PASS '+name)}catch(e){failed++;console.error('FAIL '+name+'\n'+e.stack)}}
console.log('RESULT '+passed+' passed, '+failed+' failed');if(failed)process.exitCode=1;

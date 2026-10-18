'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
const source=fs.readFileSync(path.join(root,'src/scripts/script_040.htmlpart'),'utf8');
const moduleSource=fs.readFileSync(path.join(root,'src/modules/emq_list_normalization.htmlpart'),'utf8');
function extractFunction(source,name){const start=source.indexOf('function '+name+'(');assert.ok(start>=0);const open=source.indexOf('{',start);let depth=0,q=null,escaped=false;for(let i=open;i<source.length;i++){const c=source[i];if(q){if(escaped){escaped=false;continue}if(c==='\\'){escaped=true;continue}if(c===q)q=null;continue}if(c==='\''||c==='"'||c==='`'){q=c;continue}if(c==='{')depth++;if(c==='}'&&--depth===0)return source.slice(start,i+1)}throw Error('unclosed function '+name)}
const exact=extractFunction(source,'getSelectedIds');
assert.equal(exact,"function getSelectedIds(){const picker=$('emqWorkListOptionsV8254');let ids=[];if(picker)ids=[...picker.querySelectorAll('[data-emq-work-list-id]:checked')].map(x=>String(x.value));else{try{ids=JSON.parse(localStorage.getItem(SELECTED_KEY)||'[]').map(String)}catch{ids=[]}}return unique(ids).filter(id=>db.lists.some(l=>l.id===id))}");
function harness({picker=null,stored='[]',storageThrows=false,lists=['a','b','7']}={}){const storage={getItem(key){assert.equal(key,'aniEmqWorkListsSelectedV8254');if(storageThrows)throw Error('blocked');return stored}};const document={getElementById(id){assert.equal(id,'emqWorkListOptionsV8254');return picker}};const ctx={Array,Set,String,SELECTED_KEY:'aniEmqWorkListsSelectedV8254',localStorage:storage,document,db:{lists:lists.map(id=>({id}))}};vm.createContext(ctx);vm.runInContext(moduleSource+'\nconst $=id=>document.getElementById(id);\n'+exact+'\nglobalThis.readSelected=getSelectedIds;',ctx);return ()=>Array.from(ctx.readSelected())}
const tests=[
['DOM selection takes precedence over stored IDs',()=>assert.deepEqual(harness({picker:{querySelectorAll(){return [{value:'b'},{value:'a'}]}},stored:'["7"]'})(),['b','a'])],
['duplicates removed preserving first occurrence',()=>assert.deepEqual(harness({picker:{querySelectorAll(){return [{value:'a'},{value:'a'},{value:7},{value:'7'}]}}})(),['a','7'])],
['stale IDs filtered against current database',()=>assert.deepEqual(harness({picker:{querySelectorAll(){return [{value:'missing'},{value:'a'}]}}})(),['a'])],
['present but empty picker does not fall back to storage',()=>assert.deepEqual(harness({picker:{querySelectorAll(){return []}},stored:'["a"]'})(),[])],
['stored selection used when picker absent',()=>assert.deepEqual(harness({stored:'["b","a","b",7,"missing"]'})(),['b','a','7'])],
['malformed stored JSON becomes empty selection',()=>assert.deepEqual(harness({stored:'{broken'})(),[])],
['non-array stored JSON becomes empty selection',()=>assert.deepEqual(harness({stored:'{"ids":["a"]}'})(),[])],
['blocked storage becomes empty selection',()=>assert.deepEqual(harness({storageThrows:true})(),[])]
];let passed=0,failed=0;for(const [name,run] of tests){try{run();passed++;console.log('PASS '+name)}catch(e){failed++;console.error('FAIL '+name+'\n'+e.stack)}}console.log('RESULT '+passed+' passed, '+failed+' failed');if(failed)process.exitCode=1;

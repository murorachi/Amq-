#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),zlib=require('node:zlib'),assert=require('node:assert/strict');
function extractLoader(htmlPath){
 const html=fs.readFileSync(htmlPath,'utf8');
 const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)].map(m=>m[1]);
 const source=scripts.find(s=>s.includes('async function loadData()')&&s.includes('function makeWorkRow(w)'));
 if(!source)throw new Error(`EMQ loader IIFE not found in ${htmlPath}`);
 return source;
}
function pack(data){return zlib.gzipSync(Buffer.from(JSON.stringify(data))).toString('base64')}
async function runCase(source,name,payload,opts={}){
 const errors=[],events=[],storage=new Map();
 const ctx={console:{error:(...x)=>errors.push(x.map(String).join(' ')),warn(){},log(){}},
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v))},
 document:{getElementById(id){if(id==='emqLibraryGzipBase64V8248')return opts.packed===undefined?(payload===null?null:{textContent:pack(payload)}):{textContent:opts.packed};return null;},
 dispatchEvent(e){events.push(e);return true},createElement(){return {classList:{toggle(){}},setAttribute(){},addEventListener(){},insertAdjacentElement(){},querySelector(){return null}}}},
 CustomEvent:function(type,options){this.type=type;this.detail=options?.detail},anime:opts.anime||[],songs:opts.songs||[],
 atob:s=>Buffer.from(s,'base64').toString('binary'),Blob,Response,DecompressionStream,Uint8Array,Map,Set,Number,String,Array,JSON,
 Math:Object.create(Math),setTimeout,clearTimeout};
 ctx.window=ctx;if(payload!==null)ctx.__EMQ_PACKED_B64=pack(payload);
 vm.createContext(ctx);vm.runInContext(source,ctx,{timeout:5000});await new Promise(r=>setTimeout(r,30));
 return {name,api:ctx.__aniEmqAPI,errors,events,ctx};
}
async function suite(htmlPath){
 const source=extractLoader(htmlPath);
 const valid={version:1,works:[{i:100,t:'Work',n:'Work',y:2020}],songs:[{i:200,w:100,t:'Song',a:'Artist',v:['https://example.com/a.mp3'],k:1,y:2020}]};
 const results=[];
 async function check(name,payload,opts,assertions){try{const t=await runCase(source,name,payload,opts);for(const fn of assertions)fn(t);results.push({name,status:'PASS'});}catch(e){results.push({name,status:'FAIL',error:String(e.message||e)});}}
 await check('valid payload accepted',valid,{},[t=>assert.equal(t.api.ready,true),t=>assert.equal(t.api.count,1),t=>assert.equal(t.api.workCount,1)]);
 const bad=[['missing packed payload',null,{}],['unsupported version',{...valid,version:2},{}],['duplicate EMQ work ID',{...valid,works:[valid.works[0],valid.works[0]]},{}],['AMQ work ID collision',valid,{anime:[[100,'AMQ Work']]}],['AMQ song ID collision',valid,{songs:[[1,200,1,1,'AMQ song','Artist',null,null,null,'x.mp3']]}],['broken work association',{...valid,songs:[{...valid.songs[0],w:999}]},{}],['malformed song record',{...valid,songs:[null]},{}]];
 for(const [name,payload,opts] of bad)await check(name,payload,opts,[t=>assert.equal(t.api.ready,false,'must remain not-ready'),t=>assert.equal(t.api.count,0,'must expose no songs'),t=>assert.equal(t.api.workCount,0,'must expose no works before ready'),t=>assert.equal(t.events.length,0,'must not dispatch ready event')]);
 await check('invalid audio URL yields ready-empty pool',{...valid,songs:[{...valid.songs[0],v:['http://example.com/a.mp3']}]},{},[t=>assert.equal(t.api.ready,true),t=>assert.equal(t.api.count,0),t=>assert.equal(t.api.workCount,1)]);
 return {file:htmlPath,total:results.length,passed:results.filter(x=>x.status==='PASS').length,failed:results.filter(x=>x.status==='FAIL').length,results};
}
(async()=>{const candidates=process.argv.slice(2);if(!candidates.length){console.error('Usage: node stage6_emq_loader_regression_tests.cjs <candidate.html> [candidate.html ...]');process.exit(2)}const reports=[];for(const file of candidates)reports.push(await suite(file));console.log(JSON.stringify({reportVersion:1,purpose:'candidate HTML-derived EMQ loader regression tests using synthetic payloads; not real-catalog/browser E2E',reports},null,2));if(reports.some(r=>r.failed))process.exitCode=1;})().catch(e=>{console.error(e.stack||e);process.exit(1)});

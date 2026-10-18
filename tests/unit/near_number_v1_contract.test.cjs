'use strict';
// Exact-source and behavioral contract for the extracted pure numeric-tolerance helper.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
const source=fs.readFileSync(path.join(root,'src/scripts/script_001.htmlpart'),'utf8');
const moduleSource=fs.readFileSync(path.join(root,'src/modules/near_number_v1.htmlpart'),'utf8');
const expected="function nearNumberV1(a,b){return Number.isFinite(Number(a))&&Number.isFinite(Number(b))&&Math.abs(Number(a)-Number(b))<=Math.max(1e-7,Math.abs(Number(b))*1e-9)}";
assert.equal(moduleSource,expected,'module is byte-identical to the original helper');
assert.ok(source.includes('<!-- AMQ_SPLIT_MODULE:near_number_v1 -->'),'original execution point retains the module marker');
const context={Number,Math};vm.createContext(context);
vm.runInContext(moduleSource+'\nglobalThis.compare=nearNumberV1;',context);
const tests=[
['equal integers are near',()=>assert.equal(context.compare(42,42),true)],
['numeric strings are coerced',()=>assert.equal(context.compare('2.5',2.5),true)],
['absolute tolerance handles values near zero',()=>assert.equal(context.compare(0,5e-8),true)],
['absolute tolerance rejects values beyond threshold',()=>assert.equal(context.compare(0,2e-7),false)],
['relative tolerance scales for large values',()=>assert.equal(context.compare(1e9,1e9+0.5),true)],
['relative tolerance rejects excessive large-value delta',()=>assert.equal(context.compare(1e9,1e9+2),false)],
['non-numeric input is false',()=>assert.equal(context.compare('not-a-number',1),false)],
['infinite values are false, including equal infinities',()=>{assert.equal(context.compare(Infinity,Infinity),false);assert.equal(context.compare(Infinity,1),false)}],
['null retains Number coercion behavior',()=>assert.equal(context.compare(null,0),true)]
];let passed=0,failed=0;for(const [name,run] of tests){try{run();passed++;console.log('PASS '+name)}catch(e){failed++;console.error('FAIL '+name+'\n'+e.stack)}}console.log('RESULT '+passed+' passed, '+failed+' failed');if(failed)process.exitCode=1;

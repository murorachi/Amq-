'use strict';
// Exact-source contract for VNDB cover batching, failure cleanup and retry behavior.
// All requests are mocked; no live VNDB calls are made.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_039.htmlpart'), 'utf8');

function extractFunction(name) {
  let start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `function exists: ${name}`);
  if (source.slice(Math.max(0, start - 6), start) === 'async ') start -= 6;
  const open = source.indexOf('{', start);
  assert.ok(open > start, `function body exists: ${name}`);
  let depth = 0, quote = null, escaped = false, lineComment = false, blockComment = false;
  for (let i = open; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (lineComment) { if (c === '\n') lineComment = false; continue; }
    if (blockComment) { if (c === '*' && n === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '/' && n === '/') { lineComment = true; i++; continue; }
    if (c === '/' && n === '*') { blockComment = true; i++; continue; }
    if (c === '/' && (() => { let p = i - 1; while (p >= start && /\\s/.test(source[p])) p--; return p < start || '([{:;,=!?&|+-*%^~<>'.includes(source[p]); })()) {
      let inClass = false, regexEscaped = false, closed = false;
      for (i++; i < source.length; i++) {
        const r = source[i];
        if (regexEscaped) { regexEscaped = false; continue; }
        if (r === '\\\\') { regexEscaped = true; continue; }
        if (r === '[') { inClass = true; continue; }
        if (r === ']') { inClass = false; continue; }
        if (r === '/' && !inClass) { closed = true; while (/[a-z]/i.test(source[i + 1] || '')) i++; break; }
      }
      if (!closed) throw new Error(`unterminated regex while extracting ${name}`);
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`unterminated function: ${name}`);
}
const declarations = [extractFunction('ensureCoverDetails'), extractFunction('retryVisibleCovers')].join('\n');

function makeContext(fetchImpl) {
  const state = {
    vnDetails: new Map(), coverLoading: new Set(), coverFailed: new Set(), covers: {},
    workId: '', artist: '', renderLimit: 100, search: '', year: 'all',
    busy: false, vnList: [], coversCacheSaved: 0
  };
  const calls = { requests: [], renders: 0, selectedRenders: 0, statuses: [] };
  const rootStatus = {}, retryButton = { hidden: true }, view = { hidden: true };
  const sandbox = {
    API: 'https://mock.invalid/kana', state, calls, Date, String, Number, Math, Promise, Map, Set, Object, Array, Error, JSON,
    fetch: async (url, options) => { calls.requests.push({url, options}); return fetchImpl(url, options, state, calls); },
    $: id => id === 'vn49CatalogStatus' ? rootStatus : id === 'vn49RetryCovers' ? retryButton : id === 'vnCatalogView' ? view : null,
    api: () => ({ getWork: () => null }),
    filteredWorks: () => [], saveCoverCache: () => { state.coversCacheSaved++; },
    renderVnCatalog: () => { calls.renders++; }, renderSelectedSongPanel: () => { calls.selectedRenders++; },
    status: (el, message, type) => calls.statuses.push({message, type}),
    console: { error() {}, warn() {}, info() {} }
  };
  vm.createContext(sandbox);
  vm.runInContext(declarations, sandbox);
  return {sandbox, state, calls, retryButton};
}
function run(label, fn) { return Promise.resolve().then(fn).then(() => console.log('PASS ' + label)); }
let assertions = 0;
function equal(actual, expected, label) { assertions++; assert.equal(actual, expected, label); }
function ok(value, label) { assertions++; assert.ok(value, label); }
function works(ids) { return ids.map(id => ({vndbId:id, t:'Work '+id})); }
function requestedIds(options) {
  const body = JSON.parse(options.body), filters = body.filters;
  return filters[0] === 'or' ? filters.slice(1).map(x => x[2]) : [filters[2]];
}

(async () => {
  await run('cover details are requested in batches of at most thirty', async () => {
    const {sandbox, state, calls} = makeContext(async (url, options) => {
      const ids = requestedIds(options);
      return {ok:true, json:async()=>({results:ids.map(id=>({id,image:{thumbnail:'https://img.invalid/'+id}}))})};
    });
    await vm.runInContext('ensureCoverDetails(targetWorks)', Object.assign(sandbox, {targetWorks:works(Array.from({length:65},(_,i)=>'v'+(i+1)))}));
    equal(calls.requests.length, 3, 'request count');
    equal(requestedIds(calls.requests[0].options).length, 30, 'first batch size');
    equal(requestedIds(calls.requests[1].options).length, 30, 'second batch size');
    equal(requestedIds(calls.requests[2].options).length, 5, 'last batch size');
    equal(state.vnDetails.size, 65, 'all details recorded');
    equal(state.coverLoading.size, 0, 'loading set cleared');
    equal(state.coverFailed.size, 0, 'no failed IDs');
    equal(state.coversCacheSaved, 1, 'cache saved once after batches');
  });
  await run('missing records become explicit no-image details, not stuck loading IDs', async () => {
    const {sandbox, state, calls} = makeContext(async () => ({ok:true,json:async()=>({results:[{id:'v1',image:{thumbnail:'https://img.invalid/v1'}}]})}));
    await vm.runInContext('ensureCoverDetails(targetWorks)', Object.assign(sandbox,{targetWorks:works(['v1','v2'])}));
    equal(state.vnDetails.get('v2').id,'v2','missing ID placeholder');
    equal(state.vnDetails.get('v2').image,null,'missing image state');
    equal(state.coverLoading.size,0,'loading set cleared');
    equal(state.coverFailed.size,0,'missing record is not network failure');
    equal(calls.requests.length,1,'one request');
  });
  await run('request failures mark only current batch failed and always clear loading', async () => {
    const {sandbox,state,retryButton,calls} = makeContext(async () => ({ok:false,status:503,json:async()=>({})}));
    await vm.runInContext('ensureCoverDetails(targetWorks)', Object.assign(sandbox,{targetWorks:works(['v1','v2'])}));
    equal(state.coverFailed.size,2,'failed IDs recorded');
    ok(state.coverFailed.has('v1')&&state.coverFailed.has('v2'),'all batch IDs failed');
    equal(state.coverLoading.size,0,'loading set cleared in finally');
    equal(retryButton.hidden,false,'retry button shown');
    ok(calls.statuses.some(x=>x.type==='error'),'failure status shown');
  });
  await run('already loaded, loading and failed IDs are not re-requested', async () => {
    const {sandbox,state,calls} = makeContext(async () => ({ok:true,json:async()=>({results:[]})}));
    state.vnDetails.set('loaded',{id:'loaded'});
    state.coverLoading.add('loading');
    state.coverFailed.add('failed');
    await vm.runInContext('ensureCoverDetails(targetWorks)', Object.assign(sandbox,{targetWorks:works(['loaded','loading','failed'])}));
    equal(calls.requests.length,0,'no duplicate requests');
    equal(state.coverLoading.has('loading'),true,'existing in-flight marker untouched');
    equal(state.coverFailed.has('failed'),true,'failed marker requires explicit retry');
  });
  await run('retry clears failed/cache state before fetching again', async () => {
    const {sandbox,state,calls} = makeContext(async (url,options) => {
      const ids=requestedIds(options);
      return {ok:true,json:async()=>({results:ids.map(id=>({id,image:{thumbnail:'https://img.invalid/'+id}}))})};
    });
    state.workId='';
    state.coverFailed.add('v1');
    state.vnDetails.set('v1',{id:'v1',image:null});
    state.covers.v1='old-cover';
    sandbox.filteredWorks=()=>works(['v1']);
    sandbox.state.renderLimit=10;
    await vm.runInContext('retryVisibleCovers()',sandbox);
    equal(state.coverFailed.has('v1'),false,'failed marker cleared');
    equal(state.vnDetails.get('v1').image.thumbnail,'https://img.invalid/v1','fresh detail loaded');
    equal(state.covers.v1,'https://img.invalid/v1','cover cache replaced');
    equal(calls.requests.length,1,'retry makes one request');
    equal(state.coversCacheSaved,2,'cache saved on reset and refreshed fetch');
  });
  console.log(`PASS ${assertions} VNDB cover lifecycle assertions`);
})().catch(error=>{console.error(error);process.exitCode=1});

'use strict';
// Exact-source contract for Chinese-title IndexedDB cache versioning and failure behavior.
// IndexedDB is stubbed at the cache boundary; no browser data is touched.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_031.htmlpart'), 'utf8');

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
const declarations = [extractFunction('readCache'), extractFunction('writeCache')].join('\n');
function makeContext(idbRequest) {
  const sandbox = {
    VERSION: 'v8237-anilist-763fcd7e-bangumi-bae940f6',
    CACHE_KEY: 'merged-map', idbRequest, Promise, Object, Array, String, Number, Error
  };
  vm.createContext(sandbox);
  vm.runInContext(declarations, sandbox);
  return sandbox;
}
function run(label, fn) { return Promise.resolve().then(fn).then(() => console.log('PASS ' + label)); }
let assertions = 0;
function equal(actual, expected, label) { assertions++; assert.equal(actual, expected, label); }
function ok(value, label) { assertions++; assert.ok(value, label); }

(async () => {
  await run('valid versioned cache returns records', async () => {
    const records = { 'song-1': {titleZhTW:'繁體標題',aliases:['繁體標題']} };
    const ctx = makeContext(async (mode, op) => { equal(mode,'readonly','read mode'); return {version:ctx.VERSION,records}; });
    const got = await vm.runInContext('readCache()',ctx);
    equal(got['song-1'].titleZhTW,'繁體標題','record returned');
  });
  await run('stale or malformed cache is rejected', async () => {
    for (const item of [
      {version:'old',records:{x:{titleZhTW:'舊資料'}}},
      {version:'v8237-anilist-763fcd7e-bangumi-bae940f6',records:null},
      null
    ]) {
      const ctx = makeContext(async () => item);
      equal(await vm.runInContext('readCache()',ctx),null,'invalid cache rejected');
    }
  });
  await run('current cache guard accepts arrays as object records', async () => {
    const ctx = makeContext(async () => ({version:ctx.VERSION,records:[]}));
    const got = await vm.runInContext('readCache()',ctx);
    equal(Array.isArray(got),true,'array passes current typeof-object guard');
  });
  await run('cache read failure degrades to cache miss', async () => {
    const ctx = makeContext(async () => { throw new Error('IndexedDB unavailable'); });
    equal(await vm.runInContext('readCache()',ctx),null,'read failure returns null');
  });
  await run('cache write uses current version and stable key', async () => {
    const writes = [];
    const records = {'song-1':{titleZhTW:'標題',aliases:['標題']}};
    const ctx = makeContext(async (mode, op) => { equal(mode,'readwrite','write mode'); return op({put(record,key){writes.push({record,key});return {result:1};}}); });
    equal(await vm.runInContext('writeCache(records)',Object.assign(ctx,{records})),true,'write success');
    equal(writes.length,1,'one write');
    equal(writes[0].key,'merged-map','cache key');
    equal(writes[0].record.version,ctx.VERSION,'cache version');
    equal(writes[0].record.records['song-1'].titleZhTW,'標題','records payload');
  });
  await run('cache write failure is reported as false without throwing', async () => {
    const ctx = makeContext(async () => { throw new Error('quota exceeded'); });
    equal(await vm.runInContext('writeCache({x:{}})',ctx),false,'write failure result');
  });
  console.log(`PASS ${assertions} Chinese-title cache version assertions`);
})().catch(error=>{console.error(error);process.exitCode=1});

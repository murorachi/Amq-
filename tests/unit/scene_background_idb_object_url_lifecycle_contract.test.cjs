'use strict';
// Exact-source characterization of IndexedDB transaction and object-URL ownership.
// Uses fake IndexedDB transaction objects and synthetic Blob URLs; no browser data is touched.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_036.htmlpart'), 'utf8');

function extractFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `function exists: ${name}`);
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
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`unterminated function: ${name}`);
}

const declarations = [
  extractFunction('openDb'),
  extractFunction('tx'),
  extractFunction('getAll'),
  extractFunction('revokeUrl'),
  extractFunction('makeUrl'),
  extractFunction('resetTemp')
].join('\n');

function makeContext() {
  const calls = { revoked: [], created: [], objectStores: [], transactions: [], records: [] };
  const state = { db: null, urls: new Map(), tempBlob: null, tempName: '', tempUrl: 'blob:temp', busy: false };
  const fakeURL = {
    createObjectURL(blob) { const url = 'blob:generated-' + (calls.created.length + 1); calls.created.push({ blob, url }); return url; },
    revokeObjectURL(url) { calls.revoked.push(url); }
  };
  const sandbox = {
    DB_NAME: 'AniSongSceneBackgroundsV1', DB_VERSION: 1, STORE: 'sceneBackgrounds',
    MAX_FILE_BYTES: 12 * 1024 * 1024, MAX_DIMENSION: 8192, MAX_PIXELS: 40000000,
    state, calls, URL: fakeURL, Blob, Date, Promise, Error, Map, Set, Object, Array, String,
    window: {}, fileInput: { value: 'chosen-file.png' }, console: { error() {}, info() {} },
    localStorage: new Map()
  };
  vm.createContext(sandbox);
  vm.runInContext(declarations, sandbox);
  return { sandbox, state, calls };
}
function run(label, fn) { return Promise.resolve().then(fn).then(() => console.log('PASS ' + label)); }
let assertions = 0;
function equal(actual, expected, label) { assertions++; assert.equal(actual, expected, label); }
function ok(value, label) { assertions++; assert.ok(value, label); }

(async () => {
  await run('transaction rejects when database is not initialized', async () => {
    const { sandbox } = makeContext();
    await assert.rejects(vm.runInContext("tx('readonly',s=>s.get('x'))", sandbox), /尚未準備好/);
    assertions++;
  });
  await run('transaction resolves only after completion and returns request result', async () => {
    const { sandbox, state, calls } = makeContext();
    let txObject;
    const request = { result: { value: 7 } };
    state.db = { transaction(storeName, mode) {
      calls.transactions.push({ storeName, mode });
      const t = { objectStore(name) { return { get() { return request; } }; } };
      txObject = t; return t;
    }};
    const promise = vm.runInContext("tx('readonly',s=>s.get('key'))", sandbox);
    ok(typeof txObject.oncomplete === 'function', 'completion handler installed');
    txObject.oncomplete();
    equal(await promise, request.result, 'request result returned after commit');
    equal(calls.transactions[0].storeName, 'sceneBackgrounds', 'store name');
    equal(calls.transactions[0].mode, 'readonly', 'transaction mode');
  });
  await run('transaction rejects on abort and error', async () => {
    for (const event of ['onabort', 'onerror']) {
      const { sandbox, state } = makeContext();
      let txObject;
      state.db = { transaction() { txObject = { error: new Error(event), objectStore() { return { get() { return {}; } }; } }; return txObject; } };
      const promise = vm.runInContext("tx('readwrite',s=>s.get('x'))", sandbox);
      txObject[event]();
      await assert.rejects(promise, new RegExp(event));
      assertions++;
    }
  });
  await run('synchronous work error rejects transaction helper', async () => {
    const { sandbox, state } = makeContext();
    state.db = { transaction() { return { objectStore() { return {}; } }; } };
    await assert.rejects(vm.runInContext("tx('readwrite',()=>{throw new Error('work failed')})", sandbox), /work failed/);
    assertions++;
  });
  await run('openDb rejects when IndexedDB is unavailable', async () => {
    const { sandbox } = makeContext();
    sandbox.window.indexedDB = null;
    await assert.rejects(vm.runInContext('openDb()', sandbox), /不支援 IndexedDB/);
    assertions++;
  });
  await run('openDb creates store on upgrade and resolves successful connection', async () => {
    const { sandbox, calls } = makeContext();
    const db = { objectStoreNames: { contains: name => calls.objectStores.includes(name) }, createObjectStore(name, options) { calls.objectStores.push(name); calls.records.push({ name, options }); } };
    sandbox.window.indexedDB = {};
    sandbox.indexedDB = { open(name, version) { equal(name, 'AniSongSceneBackgroundsV1', 'database name'); equal(version, 1, 'database version'); const req = { result: db }; queueMicrotask(() => { req.onupgradeneeded(); req.onsuccess(); }); return req; } };
    equal(await vm.runInContext('openDb()', sandbox), db, 'database connection');
    equal(calls.objectStores.length, 1, 'created store once');
    equal(calls.records[0].options.keyPath, 'scene', 'scene key path');
  });
  await run('replacing a scene URL revokes the previous URL first', () => {
    const { sandbox, state, calls } = makeContext();
    state.urls.set('home', 'blob:old-home');
    const blob = new Blob(['new image'], { type: 'image/png' });
    const url = vm.runInContext("makeUrl('home', blob)", Object.assign(sandbox, { blob }));
    equal(calls.revoked[0], 'blob:old-home', 'old scene URL revoked');
    equal(url, 'blob:generated-1', 'new URL returned');
    equal(state.urls.get('home'), url, 'new URL stored');
  });
  await run('invalid non-Blob scene payload revokes old URL without creating one', () => {
    const { sandbox, state, calls } = makeContext();
    state.urls.set('detail', 'blob:old-detail');
    const url = vm.runInContext("makeUrl('detail', {not:'a blob'})", sandbox);
    equal(url, '', 'empty URL for invalid payload');
    equal(calls.revoked[0], 'blob:old-detail', 'old URL revoked');
    equal(state.urls.has('detail'), false, 'old mapping removed');
    equal(calls.created.length, 0, 'no URL created');
  });
  await run('revokeUrl is idempotent for absent mappings', () => {
    const { sandbox, state, calls } = makeContext();
    vm.runInContext("revokeUrl('missing')", sandbox);
    equal(calls.revoked.length, 0, 'nothing revoked');
    state.urls.set('quiz', 'blob:quiz');
    vm.runInContext("revokeUrl('quiz')", sandbox);
    vm.runInContext("revokeUrl('quiz')", sandbox);
    equal(calls.revoked.length, 1, 'URL revoked once');
    equal(state.urls.has('quiz'), false, 'mapping removed');
  });
  await run('resetTemp revokes temporary URL and clears temporary file state', () => {
    const { sandbox, state, calls } = makeContext();
    state.tempBlob = new Blob(['temporary']);
    state.tempName = 'temp.png';
    state.tempUrl = 'blob:temporary-preview';
    vm.runInContext('resetTemp()', sandbox);
    equal(state.tempBlob, null, 'temporary blob cleared');
    equal(state.tempName, '', 'temporary name cleared');
    equal(state.tempUrl, '', 'temporary URL cleared');
    equal(calls.revoked[0], 'blob:temporary-preview', 'temporary URL revoked');
    equal(sandbox.fileInput.value, '', 'file input cleared');
  });
  console.log(`PASS ${assertions} scene-background lifecycle assertions`);
})().catch(error => { console.error(error); process.exitCode = 1; });

'use strict';
// Exact-source lifecycle characterization for the scene-background storage boundary.
// All IndexedDB, URL and image-decoder dependencies are synthetic; no real user data is accessed.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_036.htmlpart'), 'utf8');
function exactBetween(start, end, label) {
  const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
  assert.ok(a >= 0 && b > a, 'exact source boundaries exist for ' + label);
  return source.slice(a, b).trim();
}
const fragments = [
  exactBetween('function openDb()', 'function tx(', 'database open'),
  exactBetween('function tx(', 'function getAll(', 'transaction wrapper'),
  exactBetween('function getAll()', 'function revokeUrl(', 'read-all request'),
  exactBetween('function revokeUrl(', 'function makeUrl(', 'object URL revocation'),
  exactBetween('function makeUrl(', 'function currentView(', 'object URL creation'),
  exactBetween('function safeDim(', 'function safeFit(', 'safe dimming'),
  exactBetween('function safeFit(', 'function safePos(', 'safe image fit'),
  exactBetween('function safePos(', 'function cssUrl(', 'safe image position'),
  exactBetween('function resetTemp()', 'function fillSettings(', 'temporary preview cleanup'),
  exactBetween('async function readSceneFile(', 'async function applySelected(', 'image validation'),
];
const revoked = [], created = [];
let bitmapFactoryCalls = 0, bitmap = { width: 640, height: 480, closed: 0, close() { this.closed++; } };
const context = {
  window: { indexedDB: null }, indexedDB: null,
  state: { db: null, urls: new Map(), tempBlob: null, tempName: '', tempUrl: '' },
  STORE: 'sceneBackgrounds', DB_NAME: 'AniSongSceneBackgroundsV1', DB_VERSION: 1,
  MAX_FILE_BYTES: 12 * 1024 * 1024, MAX_DIMENSION: 8192, MAX_PIXELS: 40000000,
  Blob, Promise, Date, Math, Number, String, Object, Array, Map, Set, Error, RegExp,
  URL: {
    createObjectURL(blob) { const url = 'blob:test/' + (created.length + 1); created.push({ url, blob }); return url; },
    revokeObjectURL(url) { revoked.push(url); },
  },
  fileInput: { value: '' },
  createImageBitmap: async () => { bitmapFactoryCalls++; return bitmap; },
};
vm.createContext(context);
vm.runInContext(fragments.join('\n'), context, { timeout: 1000, filename: 'exact-scene-background-functions.js' });

let passed = 0;
async function test(name, fn) {
  try { await fn(); passed++; console.log('PASS ' + name); }
  catch (error) { console.error('FAIL ' + name + '\n' + error.stack); process.exitCode = 1; }
}
function fakeDb(transactionFactory) {
  return { transaction(storeName, mode) { return transactionFactory(storeName, mode); } };
}

(async () => {
await test('database open rejects cleanly when IndexedDB is unavailable', async () => {
  context.window.indexedDB = null;
  await assert.rejects(context.openDb(), /不支援 IndexedDB/);
});

await test('database open creates the versioned store and resolves the database', async () => {
  const calls = [];
  const db = { objectStoreNames: { contains: name => { calls.push(['contains', name]); return false; } },
    createObjectStore: (name, options) => calls.push(['create', name, options.keyPath]) };
  const request = { result: db };
  context.indexedDB = { open: (name, version) => { calls.push(['open', name, version]); return request; } };
  context.window.indexedDB = context.indexedDB;
  const promise = context.openDb();
  request.onupgradeneeded();
  request.onsuccess();
  assert.equal(await promise, db);
  assert.deepEqual(calls, [
    ['open', 'AniSongSceneBackgroundsV1', 1],
    ['contains', 'sceneBackgrounds'],
    ['create', 'sceneBackgrounds', 'scene'],
  ]);
});

await test('database open propagates an IndexedDB open error', async () => {
  const request = { error: new Error('open failed') };
  context.indexedDB = { open: () => request };
  context.window.indexedDB = context.indexedDB;
  const promise = context.openDb();
  request.onerror();
  await assert.rejects(promise, /open failed/);
});

await test('transaction wrapper rejects when database is not ready', async () => {
  context.state.db = null;
  await assert.rejects(context.tx('readwrite', () => true), /尚未準備好/);
});

await test('transaction wrapper resolves a request result only after transaction completion', async () => {
  const calls = [];
  const transaction = { objectStore: name => { calls.push(['objectStore', name]); return { put: value => { calls.push(['put', value]); return { result: 7 }; } }; } };
  context.state.db = fakeDb((name, mode) => { calls.push(['transaction', name, mode]); return transaction; });
  const promise = context.tx('readwrite', store => store.put('record'));
  assert.equal(typeof transaction.oncomplete, 'function');
  transaction.oncomplete();
  assert.equal(await promise, 7);
  assert.deepEqual(calls, [['transaction', 'sceneBackgrounds', 'readwrite'], ['objectStore', 'sceneBackgrounds'], ['put', 'record']]);
});

await test('transaction wrapper propagates transaction error and abort', async () => {
  const failed = { error: new Error('write failed'), objectStore: () => ({ put() { return { result: 1 }; } }) };
  context.state.db = fakeDb(() => failed);
  const errorPromise = context.tx('readwrite', store => store.put('x'));
  failed.onerror();
  await assert.rejects(errorPromise, /write failed/);
  const aborted = { error: new Error('write aborted'), objectStore: () => ({ clear() { return { result: 1 }; } }) };
  context.state.db = fakeDb(() => aborted);
  const abortPromise = context.tx('readwrite', store => store.clear());
  aborted.onabort();
  await assert.rejects(abortPromise, /write aborted/);
});

await test('transaction wrapper rejects synchronous work errors', async () => {
  const transaction = { objectStore: () => ({}) };
  context.state.db = fakeDb(() => transaction);
  await assert.rejects(context.tx('readwrite', () => { throw new Error('bad operation'); }), /bad operation/);
});

await test('getAll resolves records on request success', async () => {
  const request = { result: [{ scene: 'home' }] };
  const store = { getAll: () => request };
  context.state.db = fakeDb((name, mode) => ({ objectStore: () => store }));
  const promise = context.getAll();
  request.onsuccess();
  assert.deepEqual(await promise, [{ scene: 'home' }]);
});

await test('getAll rejects request errors', async () => {
  const request = { error: new Error('read failed') };
  context.state.db = fakeDb(() => ({ objectStore: () => ({ getAll: () => request }) }));
  const promise = context.getAll();
  request.onerror();
  await assert.rejects(promise, /read failed/);
});

await test('replacing an object URL revokes the prior URL before creating a new one', async () => {
  context.state.urls.clear(); revoked.length = 0; created.length = 0;
  const first = new Blob(['one'], { type: 'image/png' });
  const second = new Blob(['two'], { type: 'image/png' });
  const url1 = context.makeUrl('home', first);
  const url2 = context.makeUrl('home', second);
  assert.equal(url1, 'blob:test/1');
  assert.equal(url2, 'blob:test/2');
  assert.deepEqual(revoked, [url1]);
  assert.equal(context.state.urls.get('home'), url2);
});

await test('URL revocation clears the map even when browser revocation throws', async () => {
  context.state.urls.set('home', 'blob:test/stale');
  const original = context.URL.revokeObjectURL;
  context.URL.revokeObjectURL = () => { throw new Error('already revoked'); };
  context.revokeUrl('home');
  context.URL.revokeObjectURL = original;
  assert.equal(context.state.urls.has('home'), false);
});

await test('temporary preview reset clears blob/name/input and revokes preview URL', async () => {
  revoked.length = 0;
  context.state.tempBlob = new Blob(['preview']);
  context.state.tempName = 'preview.png';
  context.state.tempUrl = 'blob:test/preview';
  context.fileInput.value = 'chosen';
  context.resetTemp();
  assert.equal(context.state.tempBlob, null);
  assert.equal(context.state.tempName, '');
  assert.equal(context.state.tempUrl, '');
  assert.equal(context.fileInput.value, '');
  assert.deepEqual(revoked, ['blob:test/preview']);
});

await test('safe image settings clamp opacity and reject unsupported fit/position values', async () => {
  assert.equal(context.safeDim(-1), 0);
  assert.equal(context.safeDim(0.5), 0.5);
  assert.equal(context.safeDim(2), 0.8);
  assert.equal(context.safeDim('not-a-number'), 0.28);
  assert.equal(context.safeFit('contain'), 'contain');
  assert.equal(context.safeFit('stretch'), 'cover');
  assert.equal(context.safePos('right center'), 'right center');
  assert.equal(context.safePos('bottom right'), 'center center');
});

await test('image validation rejects missing, unsupported, empty and oversized files before decoding', async () => {
  const before = bitmapFactoryCalls;
  await assert.rejects(context.readSceneFile(null), /請先選擇/);
  await assert.rejects(context.readSceneFile({ type: 'image/svg+xml', size: 100 }), /只接受/);
  await assert.rejects(context.readSceneFile({ type: 'image/png', size: 0 }), /不可超過 12 MB/);
  await assert.rejects(context.readSceneFile({ type: 'image/png', size: 12 * 1024 * 1024 + 1 }), /不可超過 12 MB/);
  assert.equal(bitmapFactoryCalls, before);
});

await test('image validation closes decoded bitmap and rejects maximum-dimension violations', async () => {
  bitmapFactoryCalls = 0;
  bitmap = { width: 8193, height: 1, closed: 0, close() { this.closed++; } };
  await assert.rejects(context.readSceneFile({ type: 'image/png', size: 100 }), /8192 px/);
  assert.equal(bitmapFactoryCalls, 1);
  assert.equal(bitmap.closed, 1);
});

await test('image validation enforces total pixel count even within each dimension limit', async () => {
  bitmap = { width: 7000, height: 6000, closed: 0, close() { this.closed++; } };
  await assert.rejects(context.readSceneFile({ type: 'image/jpeg', size: 100 }), /4000 萬/);
  assert.equal(bitmap.closed, 1);
});

await test('valid image passes through after bitmap resource is closed', async () => {
  bitmap = { width: 8000, height: 5000, closed: 0, close() { this.closed++; } };
  const file = { type: 'image/webp', size: 12 * 1024 * 1024, name: 'valid.webp' };
  assert.equal(await context.readSceneFile(file), file);
  assert.equal(bitmap.closed, 1);
});

await test('backup restore source retains aggregate-size, unique-scene and transaction guards', async () => {
  assert.ok(source.includes('if(totalBytes>60*1024*1024)'));
  assert.ok(source.includes('seen.has(r.scene)'));
  assert.ok(source.includes('await tx(\'readwrite\',store=>{store.clear();'));
  assert.ok(source.includes('for(const key of state.configs.keys())revokeUrl(key)'));
  assert.ok(source.includes('MAX_FILE_BYTES=12*1024*1024,MAX_DIMENSION=8192,MAX_PIXELS=40000000'));
});

console.log('Scene-background lifecycle contract: ' + passed + ' tests passed.');
})();

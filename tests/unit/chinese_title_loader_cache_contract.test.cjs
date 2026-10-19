'use strict';
// Exact-source contracts for the Chinese title loader. All network/IDB responses are synthetic.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_031.htmlpart'), 'utf8');
function exactBetween(start, end, label) {
  const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
  assert.ok(a >= 0 && b > a, 'exact source boundaries exist for ' + label);
  return source.slice(a, b).trim();
}
const fragments = [
  exactBetween('function fetchJSON(', 'function idbRequest(', 'external JSON fetch'),
  exactBetween('function idbRequest(', 'async function readCache(', 'IndexedDB cache request'),
  exactBetween('async function readCache(', 'async function writeCache(', 'cache read'),
  exactBetween('async function writeCache(', 'function normal(', 'cache write'),
  exactBetween('function normal(', 'function asList(', 'title normalization'),
  exactBetween('function asList(', 'function noJapaneseKana(', 'alias list parsing'),
  exactBetween('function noJapaneseKana(', 'function firstHanTitle(', 'Japanese kana filter'),
  exactBetween('function firstHanTitle(', 'function sourceCandidates(', 'first Han title'),
  exactBetween('function sourceCandidates(', 'function makeRecords(', 'identifier resolution'),
  exactBetween('function makeRecords()', 'function ensureRecord(', 'record initialization'),
  exactBetween('function ensureRecord(', 'function addCandidate(', 'record defaults'),
  exactBetween('function addCandidate(', 'async function buildMap(', 'candidate precedence'),
  exactBetween('async function buildMap(', 'function applyRecords(', 'source merge'),
  exactBetween('function applyRecords(', 'function attachStatus(', 'record application'),
  exactBetween('async function loadTitles(', 'api.ensureLoaded=', 'loader readiness'),
];

const VERSION = 'v8237-anilist-763fcd7e-bangumi-bae940f6';
const timers = new Map();
let timerId = 0;
const statusNode = { textContent: '', dataset: {}, title: '' };
const retryNode = { style: { display: 'none' } };
const idMapNode = { textContent: JSON.stringify({ '10': 'al-100', '11': 'al-200' }) };
const readyEvents = [], statusEvents = [];
const context = {
  window: { indexedDB: null }, document: { getElementById(id) {
    if (id === 'aniAnilistIdMapV8237') return idMapNode;
    if (id === 'aniChineseTitleStatusV8237') return statusNode;
    if (id === 'aniChineseTitleRetryV8237') return retryNode;
    return null;
  }, createElement: () => ({}) },
  VERSION, CACHE_DB: 'aniChineseTitleMapV8237', CACHE_STORE: 'maps', CACHE_KEY: 'merged-map',
  URLS: {
    anilist: 'https://example.test/anilist-chinese.json',
    bangumi: 'https://example.test/bangumi-data.json',
    opencc: 'https://example.test/opencc.js',
  },
  HAN: /[\u3400-\u4dbf\u4e00-\u9fff]/u, KANA: /[\u3040-\u30ff\uff65-\uff9f]/u,
  api: { version: VERSION, status: 'loading', ready: false, sourceStatus: {}, records: Object.create(null) },
  anime: [[10, '', '', '', '', '', 'mal-10'], [11, '', '', '', '', '', 'mal-11']],
  Promise, Map, Set, Object, Array, String, Number, Math, JSON, Error, RegExp,
  console: { warn() {}, info() {} },
  setTimeout(fn, delay) { const id = ++timerId; timers.set(id, { fn, delay }); return id; },
  clearTimeout(id) { timers.delete(id); },
  AbortController: class FakeAbortController {
    constructor() { this.signal = { aborted: false, addEventListener: (type, fn) => { this.onAbort = fn; } }; this.aborted = false; }
    abort() { this.aborted = true; this.signal.aborted = true; this.onAbort?.(); }
  },
  $: id => id === 'aniAnilistIdMapV8237' ? idMapNode : id === 'aniChineseTitleStatusV8237' ? statusNode : id === 'aniChineseTitleRetryV8237' ? retryNode : null,
  fetch: async () => ({ ok: true, status: 200, json: async () => ({}) }),
  attachStatus() {},
  setStatus(message, state = 'loading') { statusEvents.push({ message, state }); context.api.status = state; statusNode.textContent = message; statusNode.dataset.state = state; },
  fireReady(source, message = '', state = 'ready') { readyEvents.push({ source, message, state }); context.api.ready = true; context.api.status = state; },
  loadOpenCC: async () => value => value,
  readCache: async () => null,
  writeCache: async () => true,
  loadingPromise: null,
  fetchJSON: null,
  indexedDB: null,
};
vm.createContext(context);
vm.runInContext(fragments.join('\n'), context, { timeout: 1000, filename: 'exact-chinese-title-loader.js' });

const originalRecords = () => ({
  '10': { titleZhTW: '繁體標題', aliases: ['繁體標題', '別名甲'], sources: ['test'] },
});
function setFetchResponses({ anilist = [], bangumi = { items: [] } } = {}) {
  context.fetch = async url => {
    if (url.includes('anilist-chinese')) {
      if (anilist instanceof Error) throw anilist;
      if (anilist && anilist.httpStatus) return { ok: false, status: anilist.httpStatus, json: async () => ({}) };
      return { ok: true, status: 200, json: async () => anilist };
    }
    if (url.includes('bangumi-data')) {
      if (bangumi instanceof Error) throw bangumi;
      if (bangumi && bangumi.httpStatus) return { ok: false, status: bangumi.httpStatus, json: async () => ({}) };
      return { ok: true, status: 200, json: async () => bangumi };
    }
    throw new Error('Unexpected external URL: ' + url);
  };
}
function validBangumi() {
  return { items: [{
    title: 'Anime Native Title',
    sites: [{ site: 'myanimelist', id: 'mal-10' }, { site: 'anilist', id: 'al-100' }],
    titleTranslate: { 'zh-Hant': ['繁體標題'], 'zh-Hans': ['简体标题'] },
  }] };
}
function validAniList() {
  return [{ id: 'al-100', title: '來源中文標題', synonyms: ['別名甲', 'カタカナ名', '別名乙'] }];
}

let passed = 0;
async function test(name, fn) {
  try { await fn(); passed++; console.log('PASS ' + name); }
  catch (error) { console.error('FAIL ' + name + '\n' + error.stack); process.exitCode = 1; }
}
function resetLoader() {
  context.api = { version: VERSION, status: 'loading', ready: false, sourceStatus: {}, records: Object.create(null) };
  context.loadingPromise = null;
  readyEvents.length = 0; statusEvents.length = 0; timers.clear();
  context.attachStatus = () => {};
  context.setStatus = (message, state = 'loading') => { statusEvents.push({ message, state }); context.api.status = state; };
  context.fireReady = (source, message = '', state = 'ready') => { readyEvents.push({ source, message, state }); context.api.ready = true; context.api.status = state; };
  context.loadOpenCC = async () => value => value === '简体标题' ? '簡體標題' : value;
}

(async () => {
await test('normalization and list helpers preserve the intended alias filtering inputs', async () => {
  assert.equal(context.normal(' ＡＢＣ，测试！ '), 'abc测试');
  assert.deepEqual(Array.from(context.asList('單一標題')), ['單一標題']);
  assert.deepEqual(Array.from(context.asList(['甲', 1, '乙'])), ['甲', '乙']);
  assert.deepEqual(Array.from(context.asList({ title: 'ignored' })), []);
  assert.equal(context.noJapaneseKana('繁體標題'), true);
  assert.equal(context.noJapaneseKana('アニメ標題'), false);
  assert.equal(context.firstHanTitle(['カタカナ', '純文字', '繁體標題']), '純文字');
});

await test('identifier resolution rejects ambiguous AniList/MAL mappings', async () => {
  const rows = [[10, '', '', '', '', '', 'mal-10'], [11, '', '', '', '', '', 'mal-10']];
  const idx = context.sourceCandidates(rows, { '10': 'al-100', '11': 'al-100' });
  assert.equal(idx.resolve('mal-10', 'al-100'), null);
  assert.deepEqual(Array.from(idx.byAL.get('al-100')), ['10', '11']);
});

await test('candidate merge prefers higher-priority Traditional Chinese and filters Kana aliases', async () => {
  resetLoader();
  setFetchResponses({ anilist: validAniList(), bangumi: validBangumi() });
  const converter = value => value === '简体标题' ? '簡體標題' : value;
  const built = await context.buildMap(converter);
  const record = built.records['10'];
  assert.ok(record);
  assert.equal(record.titleZhTW, '繁體標題');
  assert.ok(record.aliases.includes('簡體標題'));
  assert.ok(record.aliases.includes('來源中文標題'));
  assert.ok(!record.aliases.some(value => /[\u3040-\u30ff\uff65-\uff9f]/u.test(value)));
  assert.ok(record.aliases.length <= 20);
  assert.ok(record.sources.includes('bangumi-data:zh-Hant'));
  assert.ok(record.sources.includes('anilist-chinese:title'));
  assert.equal(built.stats.anilistOk, true);
  assert.equal(built.stats.bangumiOk, true);
  assert.equal(built.stats.converter, true);
});

await test('Bangumi data remains useful when AniList source fails', async () => {
  resetLoader();
  setFetchResponses({ anilist: new Error('AniList offline'), bangumi: validBangumi() });
  const built = await context.buildMap(value => value);
  assert.ok(built.records['10']);
  assert.equal(built.stats.anilistOk, false);
  assert.equal(built.stats.bangumiOk, true);
  assert.equal(context.api.sourceStatus.anilist, 'rejected');
  assert.equal(context.api.sourceStatus.bangumi, 'fulfilled');
});

await test('AniList data remains useful when Bangumi source fails', async () => {
  resetLoader();
  setFetchResponses({ anilist: validAniList(), bangumi: new Error('Bangumi offline') });
  const built = await context.buildMap(value => value);
  assert.ok(built.records['10']);
  assert.equal(built.stats.anilistOk, true);
  assert.equal(built.stats.bangumiOk, false);
});

await test('both source failures produce an empty map without throwing', async () => {
  resetLoader();
  setFetchResponses({ anilist: new Error('AniList offline'), bangumi: new Error('Bangumi offline') });
  const built = await context.buildMap(null);
  assert.deepEqual(Object.keys(built.records), []);
  assert.equal(built.stats.anilistOk, false);
  assert.equal(built.stats.bangumiOk, false);
});

await test('native title and Japanese-kana aliases are not emitted as Chinese candidates', async () => {
  resetLoader();
  setFetchResponses({
    anilist: [{ id: 'al-100', title: 'アニメ標題', synonyms: ['カタカナ', '繁體別名'] }],
    bangumi: { items: [{ title: '原生中文', sites: [{ site: 'mal', id: 'mal-10' }, { site: 'anilist', id: 'al-100' }], titleTranslate: { 'zh-Hant': ['原生中文'], 'zh-Hans': ['簡體別名'] } }] },
  });
  const built = await context.buildMap(value => value);
  const record = built.records['10'];
  assert.ok(record);
  assert.ok(!record.aliases.includes('アニメ標題'));
  assert.ok(!record.aliases.includes('カタカナ'));
  assert.ok(!record.aliases.includes('原生中文'));
});

await test('fetchJSON clears its timeout after successful JSON response', async () => {
  resetLoader();
  context.fetch = async (url, options) => {
    assert.equal(options.method, 'GET');
    assert.equal(options.mode, 'cors');
    assert.equal(options.credentials, 'omit');
    assert.equal(options.cache, 'force-cache');
    return { ok: true, json: async () => ({ value: 42 }) };
  };
  const before = timers.size;
  assert.deepEqual(await context.fetchJSON('https://example.test/data', 'test source'), { value: 42 });
  assert.equal(timers.size, before);
});

await test('fetchJSON rejects non-OK HTTP responses and clears timeout', async () => {
  resetLoader();
  context.fetch = async () => ({ ok: false, status: 503, json: async () => ({}) });
  await assert.rejects(context.fetchJSON('https://example.test/data', 'test source'), /test source HTTP 503/);
  assert.equal(timers.size, 0);
});

await test('fetchJSON aborts a stalled request at the configured timeout', async () => {
  resetLoader();
  let signal;
  context.fetch = (_url, options) => {
    signal = options.signal;
    return new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted by signal')));
  };
  const promise = context.fetchJSON('https://example.test/stalled', 'stalled source');
  const timer = [...timers.values()].find(t => t.delay === 20000);
  assert.ok(timer, '20-second timeout is registered');
  timer.fn();
  await assert.rejects(promise, /aborted by signal/);
  assert.equal(signal.aborted, true);
  assert.equal(timers.size, 0);
});

await test('IndexedDB cache request rejects when IndexedDB is absent', async () => {
  resetLoader();
  delete context.window.indexedDB;
  await assert.rejects(context.idbRequest('readonly', () => null), /IndexedDB unavailable/);
});

function installIdb({ result = null, openError = null, requestError = null } = {}) {
  let lastRequest = null, lastTx = null, closed = 0, written = null;
  const store = {
    get(key) { lastRequest = { result, onsuccess: undefined, onerror: undefined, key }; return lastRequest; },
    put(value, key) { written = { value, key }; lastRequest = { result: 1, onsuccess: undefined, onerror: undefined }; return lastRequest; },
  };
  const db = {
    objectStoreNames: { contains: name => name === 'maps' },
    createObjectStore() {},
    transaction(name, mode) {
      lastTx = { name, mode, listeners: {}, objectStore: () => store, addEventListener(type, fn) { this.listeners[type] = fn; } };
      return lastTx;
    },
    close() { closed++; },
  };
  const openReq = { result: db, error: openError, onsuccess: undefined, onerror: undefined, onupgradeneeded: undefined };
  context.indexedDB = { open: () => openReq };
  context.window.indexedDB = context.indexedDB;
  return {
    openReq, db,
    get request() { return lastRequest; },
    get tx() { return lastTx; },
    get closed() { return closed; },
    get written() { return written; },
    set requestError(value) { requestError = value; if (lastRequest) lastRequest.error = value; },
    triggerOpen() { if (openError) openReq.onerror(); else openReq.onsuccess(); },
    triggerRequestSuccess() { lastRequest.onsuccess(); },
    triggerRequestError() { lastRequest.error = requestError || new Error('request failed'); lastRequest.onerror(); },
    triggerTx(type = 'complete') { lastTx.listeners[type]?.(); },
  };
}

await test('IndexedDB cache read accepts only the matching version and record object', async () => {
  resetLoader();
  const idb = installIdb({ result: { version: VERSION, records: originalRecords() } });
  const promise = context.readCache();
  idb.triggerOpen(); idb.triggerRequestSuccess(); idb.triggerTx('complete');
  assert.deepEqual(JSON.parse(JSON.stringify(await promise)), originalRecords());
  const wrong = installIdb({ result: { version: 'old-version', records: originalRecords() } });
  const wrongPromise = context.readCache();
  wrong.triggerOpen(); wrong.triggerRequestSuccess(); wrong.triggerTx('complete');
  assert.equal(await wrongPromise, null);
});

await test('IndexedDB cache read fails soft on request error', async () => {
  resetLoader();
  const idb = installIdb({ result: null, requestError: new Error('cache read failed') });
  const promise = context.readCache();
  idb.triggerOpen(); idb.triggerRequestError(); idb.triggerTx('complete');
  assert.equal(await promise, null);
});

await test('IndexedDB cache write uses the fixed key and current source version', async () => {
  resetLoader();
  const records = originalRecords();
  const idb = installIdb();
  const promise = context.writeCache(records);
  idb.triggerOpen(); idb.triggerRequestSuccess(); idb.triggerTx('complete');
  assert.equal(await promise, true);
  assert.equal(idb.written.key, 'merged-map');
  assert.equal(idb.written.value.version, VERSION);
  assert.deepEqual(JSON.parse(JSON.stringify(idb.written.value.records)), records);
});

await test('loader applies a valid cache and skips downloads', async () => {
  resetLoader();
  let fetchCalls = 0;
  context.fetch = async () => { fetchCalls++; throw new Error('must not fetch'); };
  context.readCache = async () => originalRecords();
  await context.loadTitles(false);
  assert.equal(context.api.ready, true);
  assert.equal(context.api.status, 'ready');
  assert.deepEqual(readyEvents.map(x => x.source), ['indexeddb-cache']);
  assert.equal(context.api.sourceStatus.fromCache, true);
  assert.equal(fetchCalls, 0);
});

await test('loader writes cache only when both sources and converter are ready', async () => {
  resetLoader();
  context.readCache = async () => null;
  context.loadOpenCC = async () => value => value;
  context.buildMap = async () => ({ records: originalRecords(), stats: { animeCount: 1, anilistOk: true, bangumiOk: true, converter: true } });
  let writes = 0;
  context.writeCache = async records => { writes++; assert.deepEqual(JSON.parse(JSON.stringify(records)), originalRecords()); return true; };
  await context.loadTitles(false);
  assert.equal(writes, 1);
  assert.equal(context.api.ready, true);
  assert.equal(context.api.status, 'ready');
});

await test('loader exposes partial readiness without caching incomplete source results', async () => {
  resetLoader();
  context.readCache = async () => null;
  context.buildMap = async () => ({ records: originalRecords(), stats: { animeCount: 1, anilistOk: false, bangumiOk: true, converter: false } });
  let writes = 0;
  context.writeCache = async () => { writes++; return true; };
  await context.loadTitles(false);
  assert.equal(writes, 0);
  assert.equal(context.api.ready, true);
  assert.equal(context.api.status, 'partial');
  assert.equal(readyEvents[0].state, 'partial');
});

await test('loader leaves ready false and exposes retry when all sources produce no records', async () => {
  resetLoader();
  context.readCache = async () => null;
  context.buildMap = async () => ({ records: {}, stats: { animeCount: 0, anilistOk: false, bangumiOk: false, converter: false } });
  await context.loadTitles(false);
  assert.equal(context.api.ready, false);
  assert.equal(context.api.status, 'error');
  assert.equal(retryNode.style.display, 'inline-block');
});

await test('loader fails soft when map construction throws', async () => {
  resetLoader();
  context.readCache = async () => null;
  context.buildMap = async () => { throw new Error('malformed source'); };
  await context.loadTitles(false);
  assert.equal(context.api.ready, false);
  assert.equal(context.api.status, 'error');
  assert.equal(retryNode.style.display, 'inline-block');
});

await test('forced reload bypasses cache and concurrent requests share one promise', async () => {
  resetLoader();
  let cacheCalls = 0, buildCalls = 0, resolveBuild;
  context.readCache = async () => { cacheCalls++; return originalRecords(); };
  context.buildMap = () => { buildCalls++; return new Promise(resolve => { resolveBuild = resolve; }); };
  const first = context.loadTitles(true);
  const second = context.loadTitles(false);
  assert.equal(first, second);
  assert.equal(cacheCalls, 0);
  assert.equal(buildCalls, 1);
  resolveBuild({ records: originalRecords(), stats: { animeCount: 1, anilistOk: true, bangumiOk: true, converter: true } });
  await first;
});

console.log('Chinese-title loader/cache contract: ' + passed + ' tests passed.');
})();

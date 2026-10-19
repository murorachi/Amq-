'use strict';
// Exact-source characterization for EMQ Chinese-title cache precedence and fallback.
// All network, storage and script-loading dependencies are synthetic.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_041.htmlpart'), 'utf8');
function exactBetween(start, end, label) {
  const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
  assert.ok(a >= 0 && b > a, 'exact source boundaries exist for ' + label);
  return source.slice(a, b).trim();
}
const fragments = [
  exactBetween('function api()', 'function work(', 'EMQ API bridge'),
  exactBetween('function work(', 'function vndbIdForWork(', 'work lookup'),
  exactBetween('function vndbIdForWork(', 'function normalize(', 'VNDB identifier validation'),
  exactBetween('function normalize(', 'function cleanTitle(', 'title normalization'),
  exactBetween('function cleanTitle(', 'function save(', 'title filtering'),
  exactBetween('function save()', 'async function getConverter(', 'cache persistence'),
  exactBetween('async function getConverter()', 'async function traditional(', 'OpenCC loading'),
  exactBetween('async function traditional(', 'function aliasesFor(', 'Traditional conversion fallback'),
  exactBetween('function aliasesFor(', 'function titleFor(', 'cached aliases'),
  exactBetween('function titleFor(', 'function serverAliasMap(', 'cached title'),
  exactBetween('function serverAliasMap(', 'function cacheRecord(', 'server alias export'),
  exactBetween('function cacheRecord(', 'async function fetchVndbBatch(', 'cache record normalization'),
  exactBetween('async function fetchVndbBatch(', 'async function recordFromVndb(', 'VNDB request batching'),
  exactBetween('async function recordFromVndb(', 'async function queryBangumiExact(', 'VNDB title priority'),
  exactBetween('async function queryBangumiExact(', 'async function ensureWorkTitle(', 'Bangumi exact fallback'),
  exactBetween('async function ensureWorkTitle(', 'async function ensureTitlesForWorkIds(', 'per-work cache precedence'),
  exactBetween('async function ensureTitlesForWorkIds(', 'function allKnownAliases(', 'batch work enrichment'),
  exactBetween('function allKnownAliases()', 'window.__aniEmqChineseTitleAPIv8259=', 'known alias export'),
];

const storage = new Map();
const timers = new Map();
let nextTimer = 0;
const scripts = [], events = [], warnings = [];
const workData = {
  '900001': { vndbId: 'v123', t: 'Original Work', n: 'Work Alias', title: 'Original Work', name: 'Original Work' },
  '900002': { vndb_id: 'v456', t: 'Second Work', n: 'Second Alias' },
  '900003': { t: 'No VNDB ID' },
};
const context = {
  CACHE_KEY: 'aniEmqChineseTitleCacheV8259',
  VNDB: 'https://api.vndb.org/kana',
  BANGUMI: 'https://api.bgm.tv/v0/search/subjects',
  HAN: /[\u3400-\u9fff]/u, KANA: /[\u3040-\u30ff\uff65-\uff9f]/u,
  cache: {}, converter: null, converterPromise: null,
  workMap: new Map(), busy: new Map(),
  window: { __aniEmqAPI: {
    getWork: id => workData[String(id)] || null,
    getWorkSummary: id => workData[String(id)] || null,
  } },
  document: {
    createElement: tag => ({ tagName: tag, async: false, src: '', onload: null, onerror: null }),
    head: { appendChild: node => scripts.push(node) },
    dispatchEvent: event => { events.push(event); return true; },
  },
  localStorage: {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
  },
  fetch: async () => ({ ok: true, status: 200, json: async () => ({ results: [] }) }),
  setTimeout(fn, delay) { const id = ++nextTimer; timers.set(id, { fn, delay }); return id; },
  clearTimeout(id) { timers.delete(id); },
  console: { warn: (...args) => warnings.push(args), debug() {} },
  Promise, Map, Set, Object, Array, String, Number, Math, JSON, Error, RegExp, Date,
  CustomEvent: class CustomEvent { constructor(type, init = {}) { this.type = type; this.detail = init.detail; } },
};
vm.createContext(context);
vm.runInContext(fragments.join('\n'), context, { timeout: 1000, filename: 'exact-emq-chinese-title-functions.js' });

let passed = 0;
async function test(name, fn) {
  try { await fn(); passed++; console.log('PASS ' + name); }
  catch (error) { console.error('FAIL ' + name + '\n' + error.stack); process.exitCode = 1; }
}
function reset() {
  context.cache = {}; context.converter = null; context.converterPromise = null;
  context.workMap = new Map(); context.busy = new Map();
  context.window.OpenCC = undefined;
  context.localStorage = {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
  };
  context.fetch = async () => ({ ok: true, status: 200, json: async () => ({ results: [] }) });
  timers.clear(); scripts.length = 0; events.length = 0; warnings.length = 0;
}
function installOpenCC(convert = value => value) {
  context.window.OpenCC = { Converter: () => convert };
}
function setFetch(handler) { context.fetch = handler; }
function vndbRecord(id = 'v123') {
  return { id, title: 'English Native Title', titles: [
    { lang: 'zh-Hans', title: '简体名稱', official: true },
    { lang: 'zh-Hant', title: '繁體名稱', official: true },
    { lang: 'zh-Hant', title: '繁體別名', official: false },
  ], aliases: ['額外別名', 'カタカナ'] };
}

(async () => {
await test('normalization and title filter handle Unicode and reject Kana/missing Han', async () => {
  assert.equal(context.normalize(' ＡＢＣ，測試！ '), 'abc測試');
  assert.equal(context.cleanTitle(' 繁體標題 '), '繁體標題');
  assert.equal(context.cleanTitle('カタカナ標題'), '');
  assert.equal(context.cleanTitle('Latin title'), '');
  assert.equal(context.cleanTitle('甲'.repeat(161)), '');
});

await test('VNDB ID is accepted only in v-number form', async () => {
  assert.equal(context.vndbIdForWork('900001'), 'v123');
  assert.equal(context.vndbIdForWork('900002'), 'v456');
  workData['900001'].vndbId = '123';
  assert.equal(context.vndbIdForWork('900001'), '');
  workData['900001'].vndbId = 'v123';
});

await test('cache persistence writes the stable key and fails softly on storage error', async () => {
  reset();
  context.cache = { v123: { title: '繁體標題', aliases: ['繁體標題'] } };
  context.save();
  assert.ok(storage.has('aniEmqChineseTitleCacheV8259'));
  assert.deepEqual(JSON.parse(storage.get('aniEmqChineseTitleCacheV8259')), context.cache);
  context.localStorage.setItem = () => { throw new Error('quota'); };
  assert.doesNotThrow(() => context.save());
  assert.equal(warnings.length, 1);
});

await test('existing OpenCC converter is reused without loading a script', async () => {
  reset(); installOpenCC(value => 'TW:' + value);
  assert.equal(await context.getConverter()('word'), 'TW:word');
  assert.equal(await context.getConverter()('next'), 'TW:next');
  assert.equal(scripts.length, 0);
});

await test('OpenCC script load success and failure resolve safely and clear timeout', async () => {
  reset();
  const pending = context.getConverter();
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, 'https://cdn.jsdelivr.net/npm/opencc-js@1.4.2/dist/umd/full.js');
  assert.equal(scripts[0].async, true);
  installOpenCC(value => 'converted:' + value);
  scripts[0].onload();
  assert.equal(await pending('詞'), 'converted:詞');
  assert.equal(timers.size, 0);

  reset();
  const failed = context.getConverter();
  scripts[0].onerror();
  assert.equal(await failed, null);
  assert.equal(timers.size, 0);
});

await test('OpenCC timeout resolves null and concurrent requests share one script load', async () => {
  reset();
  const first = context.getConverter(), second = context.getConverter();
  assert.equal(scripts.length, 1);
  const timeout = [...timers.values()].find(t => t.delay === 6000);
  assert.ok(timeout);
  timeout.fn();
  assert.equal(await first, null);
  assert.equal(await second, null);
  assert.equal(timers.size, 0);
});

await test('traditional conversion keeps input when converter is unavailable', async () => {
  reset();
  assert.equal(await context.traditional('  '), '');
  assert.equal(await context.traditional('Latin Title'), 'Latin Title');
  const pending = context.traditional('繁體原文');
  assert.equal(scripts.length, 1);
  scripts[0].onerror();
  assert.equal(await pending, '繁體原文');
});

await test('cached title and aliases are resolved only through valid work IDs', async () => {
  reset();
  context.cache.v123 = { title: '繁體標題', aliases: ['別名甲'] };
  assert.equal(context.titleFor('900001'), '繁體標題');
  assert.deepEqual(Array.from(context.aliasesFor('900001')), ['別名甲']);
  assert.equal(context.titleFor('900003'), '');
  assert.deepEqual(Array.from(context.aliasesFor('900003')), []);
});

await test('server alias map normalizes, deduplicates and caps aliases at eight', async () => {
  reset();
  context.workMap.set('v123', '900001');
  context.cache.v123 = { title: '繁體標題', aliases: ['繁體標題', '別名甲', '別名乙', '別名丙', '別名丁', '別名戊', '別名己', '別名庚', '別名辛', 'カタカナ'] };
  const result = context.serverAliasMap(['900001']);
  assert.equal(result['900001'].length, 8);
  assert.equal(new Set(result['900001'].map(context.normalize)).size, result['900001'].length);
  assert.ok(!result['900001'].some(x => /[\u3040-\u30ff\uff65-\uff9f]/u.test(x)));
  assert.deepEqual(JSON.parse(JSON.stringify(context.serverAliasMap(['other']))), {});
});

await test('cacheRecord filters aliases, deduplicates normalized values and caps at eight', async () => {
  reset();
  context.cacheRecord('v123', { title: ' 繁體標題 ', aliases: ['繁體標題', '繁體-標題', '別名甲', 'カタカナ', ...Array.from({ length: 12 }, (_, i) => '別名' + i)] });
  assert.equal(context.cache.v123.title, '繁體標題');
  assert.equal(context.cache.v123.aliases.length, 8);
  assert.ok(context.cache.v123.checked);
  assert.ok(!context.cache.v123.aliases.some(x => /[\u3040-\u30ff\uff65-\uff9f]/u.test(x)));
  assert.ok(storage.has('aniEmqChineseTitleCacheV8259'));
});

await test('VNDB batch request uses correct ID filter, fields and rejects HTTP errors', async () => {
  reset();
  let request;
  setFetch(async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ results: [{ id: 'v123' }] }) };
  });
  assert.deepEqual(await context.fetchVndbBatch(['v123']), [{ id: 'v123' }]);
  assert.equal(request.url, 'https://api.vndb.org/kana/vn');
  assert.equal(request.options.method, 'POST');
  const body = JSON.parse(request.options.body);
  assert.deepEqual(body.filters, ['id', '=', 'v123']);
  assert.ok(body.fields.includes('titles'));
  assert.equal(body.results, 1);

  setFetch(async () => ({ ok: false, status: 429, json: async () => ({}) }));
  await assert.rejects(context.fetchVndbBatch(['v123', 'v456']), /VNDB API HTTP 429/);
});

await test('VNDB title extraction prefers Hant, converts Hans and filters Kana', async () => {
  reset(); installOpenCC(value => value === '简体名稱' ? '簡體名稱' : value);
  const record = await context.recordFromVndb(vndbRecord());
  assert.equal(record.title, '繁體名稱');
  assert.ok(record.aliases.includes('簡體名稱'));
  assert.ok(record.aliases.includes('繁體別名'));
  assert.ok(!record.aliases.some(x => /[\u3040-\u30ff\uff65-\uff9f]/u.test(x)));
  assert.equal(record.source, 'vndb');
});

await test('Bangumi fallback accepts exact normalized work-name matches only', async () => {
  reset(); installOpenCC(value => value);
  context.cache.v123 = { originalTitle: 'Original Work', aliases: [] };
  setFetch(async (url, options) => {
    const body = JSON.parse(options.body);
    assert.equal(url, 'https://api.bgm.tv/v0/search/subjects');
    assert.equal(body.keyword, 'Original Work');
    return { ok: true, json: async () => ({ data: [
      { name: 'Unrelated Work', name_cn: '錯誤中文標題' },
      { name: 'Original Work', name_cn: '繁體標題' },
    ] }) };
  });
  const record = await context.queryBangumiExact('900001');
  assert.equal(record.title, '繁體標題');
  assert.equal(record.source, 'bangumi');
});

await test('checked non-empty cache wins and avoids a network refresh', async () => {
  reset();
  context.cache.v123 = { title: '已快取標題', aliases: ['已快取標題'], checked: true, source: 'vndb' };
  let calls = 0;
  setFetch(async () => { calls++; throw new Error('should not fetch'); });
  const record = await context.ensureWorkTitle('900001');
  assert.equal(record.title, '已快取標題');
  assert.equal(calls, 0);
});

await test('VNDB success populates normalized cache, work mapping and ready event', async () => {
  reset(); installOpenCC(value => value === '简体名稱' ? '簡體名稱' : value);
  setFetch(async (url, options) => {
    assert.equal(url, 'https://api.vndb.org/kana/vn');
    assert.equal(options.method, 'POST');
    return { ok: true, json: async () => ({ results: [vndbRecord()] }) };
  });
  const record = await context.ensureWorkTitle('900001');
  assert.equal(record.title, '繁體名稱');
  assert.equal(record.checked, true);
  assert.equal(record.source, 'vndb');
  assert.equal(record.workId, '900001');
  assert.equal(context.workMap.get('v123'), '900001');
  assert.ok(storage.has('aniEmqChineseTitleCacheV8259'));
  assert.ok(events.some(e => e.type === 'ani-emq-chinese-titles-ready'));
});

await test('empty VNDB result tries Bangumi once and records fallback provenance', async () => {
  reset(); installOpenCC(value => value);
  let vndbCalls = 0, bangumiCalls = 0;
  setFetch(async (url, options) => {
    if (url.includes('/vn')) { vndbCalls++; return { ok: true, json: async () => ({ results: [] }) }; }
    bangumiCalls++;
    return { ok: true, json: async () => ({ data: [{ name: 'Original Work', name_cn: '繁體標題' }] }) };
  });
  const record = await context.ensureWorkTitle('900001');
  assert.equal(record.title, '繁體標題');
  assert.equal(record.source, 'vndb+bangumi');
  assert.equal(record.bangumiChecked, true);
  assert.equal(vndbCalls, 1);
  assert.equal(bangumiCalls, 1);
  await context.ensureWorkTitle('900001');
  assert.equal(vndbCalls, 1);
  assert.equal(bangumiCalls, 1);
});

await test('VNDB network failure returns null without poisoning cache and clears busy state', async () => {
  reset();
  setFetch(async () => { throw new Error('network offline'); });
  const record = await context.ensureWorkTitle('900001');
  assert.equal(record, null);
  assert.equal(context.cache.v123, undefined);
  assert.equal(context.busy.has('v123'), false);
  assert.ok(warnings.length > 0);
});

await test('batch ensure deduplicates IDs and skips works without VNDB identifiers', async () => {
  reset();
  const visited = [];
  context.ensureWorkTitle = async id => { visited.push(String(id)); return { workId: String(id) }; };
  const result = await context.ensureTitlesForWorkIds(['900001', '900001', '900003', '900002']);
  assert.deepEqual(visited, ['900001', '900002']);
  assert.equal(result.length, 2);
  assert.equal(context.workMap.get('v123'), '900001');
  assert.equal(context.workMap.get('v456'), '900002');
});

await test('known aliases use normalized uniqueness and keep work ID mapping', async () => {
  reset();
  context.workMap.set('v123', '900001');
  context.cache.v123 = { title: '繁體標題', aliases: ['繁體標題', '繁體-標題', '別名甲', 'カタカナ'] };
  const out = context.allKnownAliases();
  assert.deepEqual(Object.keys(out), ['900001']);
  assert.deepEqual(Array.from(out['900001']), ['繁體標題', '別名甲']);
});

console.log('EMQ Chinese-title cache contract: ' + passed + ' tests passed.');
})();

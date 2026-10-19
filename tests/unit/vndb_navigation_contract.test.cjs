'use strict';
// Exact-source VNDB navigation/cover/list-import characterization. No live API or user storage.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_039.htmlpart'), 'utf8');
function exactBetween(start, end, label) {
  const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
  assert.ok(a >= 0 && b > a, 'exact source boundaries exist for ' + label);
  return source.slice(a, b).trim();
}
const fragments = [
  exactBetween('function api()', 'function works()', 'EMQ API bridge'),
  exactBetween('function works()', 'function songRows()', 'VNDB-linked works'),
  exactBetween('function titleOfWork(', 'function aliasesOfWork(', 'work title precedence'),
  exactBetween('function aliasesOfWork(', 'function coverFor(', 'work alias collection'),
  exactBetween('function coverFor(', 'function saveCoverCache(', 'cover URL precedence'),
  exactBetween('function saveCoverCache()', 'function status(', 'bounded cover cache'),
  exactBetween('function filteredWorks()', 'async function ensureCoverDetails(', 'work search/year filtering'),
  exactBetween('async function ensureCoverDetails(', 'window.__aniVnCoverAPIv857=', 'cover detail batching'),
  exactBetween('async function retryVisibleCovers()', 'function handleVnCoverImageError(', 'visible cover retry'),
  exactBetween('function handleVnCoverImageError(', 'function renderVnCatalog(', 'image fallback lifecycle'),
  exactBetween('function renderVnCatalog(', 'function storedVnList(', 'catalog render limit'),
  exactBetween('function storedVnList()', 'function normalizedListStatus(', 'local VN list load'),
  exactBetween('function normalizedListStatus(', 'function listStatusName(', 'VN list status normalization'),
  exactBetween('function listStatusName(', 'function renderVnList(', 'VN status labels'),
  exactBetween('async function importVnList()', 'function applyModeSelection(', 'VNDB list import'),
];

const storage = new Map();
const nodes = new Map();
const fetchCalls = [], statusCalls = [], replaced = [];
const document = {
  createElement(tag) {
    return { tagName: tag, className: '', textContent: '', children: [], append(...children) { this.children.push(...children); } };
  },
  dispatchEvent() { return true; },
};
const context = {
  API: 'https://api.vndb.org/kana', SOURCE_KEY: 'aniQuizSettingsV14',
  VN_LIST_KEY: 'aniVNWatchlistV1', COVER_KEY: 'aniVNDBCoversV8249',
  state: { catalogKind: 'vn', listKind: 'vn', homeGroup: '', workId: '', artist: '', search: '', year: 'all', renderLimit: 72, vnListSearch: '', vnListStatus: 'all', vnList: [], vnDetails: new Map(), covers: {}, coverLoading: new Set(), coverFailed: new Set(), busy: false },
  window: { __aniEmqAPI: null },
  document,
  localStorage: { getItem: key => storage.has(key) ? storage.get(key) : null, setItem: (key, value) => storage.set(key, String(value)) },
  fetch: async (...args) => { fetchCalls.push(args); return { ok: true, status: 200, json: async () => ({}) }; },
  $: id => nodes.get(id) || null,
  safe: value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])),
  status(root, message, kind = '') { statusCalls.push({ root, message, kind }); if (root) { root.textContent = message; root.kind = kind; } },
  emqReady: () => true,
  workSongs: () => [],
  coverMarkup: () => '<div class="mock-cover"></div>',
  renderSelectedSongPanel() {},
  renderVnList() {},
  confirm: () => true,
  console: { warn() {}, debug() {} },
  HTMLImageElement: class HTMLImageElement {
    constructor() { this.dataset = {}; this.currentSrc = ''; this.src = ''; this.alt = ''; }
    matches(selector) { return selector === 'img[data-vn49-cover]'; }
    replaceWith(node) { replaced.push({ image: this, node }); }
  },
  Promise, Map, Set, Object, Array, String, Number, Math, JSON, Error, RegExp, Date, URL, encodeURIComponent,
};
vm.createContext(context);
vm.runInContext(fragments.join('\n'), context, { timeout: 1000, filename: 'exact-vndb-navigation-functions.js' });

const workData = [];
function setWorks(count = 0) {
  workData.length = 0;
  for (let i = 1; i <= count; i++) workData.push({ i: 900000 + i, vndbId: 'v' + i, t: '作品 ' + String(i).padStart(3, '0'), n: '別名 ' + i, y: 2020 });
  context.window.__aniEmqAPI = {
    getWorks: () => workData,
    getRows: () => [],
    getWork: id => workData.find(w => String(w.i) === String(id)) || null,
    getWorkByVndbId: id => workData.find(w => String(w.vndbId) === String(id)) || null,
    getSongsForWork: () => [],
    ready: true,
  };
}
function node(id, props = {}) {
  const value = { id, hidden: false, textContent: '', innerHTML: '', value: '', disabled: false, style: {}, dataset: {}, classList: { toggle() {} }, ...props };
  nodes.set(id, value);
  return value;
}
function reset() {
  storage.clear(); nodes.clear(); fetchCalls.length = 0; statusCalls.length = 0; replaced.length = 0;
  context.state = { catalogKind: 'vn', listKind: 'vn', homeGroup: '', workId: '', artist: '', search: '', year: 'all', renderLimit: 72, vnListSearch: '', vnListStatus: 'all', vnList: [], vnDetails: new Map(), covers: {}, coverLoading: new Set(), coverFailed: new Set(), busy: false };
  context.localStorage = { getItem: key => storage.has(key) ? storage.get(key) : null, setItem: (key, value) => storage.set(key, String(value)) };
  context.fetch = async (...args) => { fetchCalls.push(args); return { ok: true, status: 200, json: async () => ({}) }; };
  context.window.__aniEmqAPI = null;
  setWorks(0);
  node('vnCatalogView', { hidden: true });
  node('vn49CatalogStatus');
  node('vn49RetryCovers', { hidden: true });
  node('vn49Grid');
  node('vn49More', { hidden: true });
  node('vn49Count');
  node('vn49SongPanel', { hidden: true });
  node('vn49ImportStatus');
  node('vn49User', { value: 'tester' });
  node('vn49Token', { value: 'secret-token' });
  node('vn49Import', { disabled: false });
  node('vnListView', { hidden: false });
  node('vn49ListSearch');
  node('vn49ListStatus', { value: 'all' });
  node('vn49ListCount');
  node('vn49ListGrid');
}

let passed = 0;
async function test(name, fn) {
  try { await fn(); passed++; console.log('PASS ' + name); }
  catch (error) { console.error('FAIL ' + name + '\n' + error.stack); process.exitCode = 1; }
}

(async () => {
await test('work inventory includes only records linked to a VNDB ID', async () => {
  reset();
  context.window.__aniEmqAPI.getWorks = () => [{ i: 1, t: 'linked', vndbId: 'v1' }, { i: 2, t: 'unlinked' }];
  assert.deepEqual(JSON.parse(JSON.stringify(context.works())), [{ i: 1, t: 'linked', vndbId: 'v1' }]);
});

await test('cover URL prefers current detail thumbnail, then detail image, then saved cache', async () => {
  reset();
  const w = { i: 900001, vndbId: 'v1' };
  context.state.covers.v1 = 'https://cached.test/cover.jpg';
  assert.equal(context.coverFor(w), 'https://cached.test/cover.jpg');
  context.state.vnDetails.set('v1', { image: { url: 'https://full.test/cover.jpg' } });
  assert.equal(context.coverFor(w), 'https://full.test/cover.jpg');
  context.state.vnDetails.set('v1', { image: { thumbnail: 'https://thumb.test/cover.jpg', url: 'https://full.test/cover.jpg' } });
  assert.equal(context.coverFor(w), 'https://thumb.test/cover.jpg');
});

await test('cover cache trims to the newest 1800 entries and fails softly on storage errors', async () => {
  reset();
  for (let i = 0; i < 1810; i++) context.state.covers['v' + i] = 'url' + i;
  context.saveCoverCache();
  assert.equal(Object.keys(context.state.covers).length, 1800);
  assert.ok(context.state.covers.v1809);
  assert.equal(context.state.covers.v0, undefined);
  context.localStorage.setItem = () => { throw new Error('quota'); };
  assert.doesNotThrow(() => context.saveCoverCache());
});

await test('cover details request is batched in groups of at most 30', async () => {
  reset();
  const items = Array.from({ length: 31 }, (_, i) => ({ i: i + 1, vndbId: 'v' + (i + 1) }));
  context.fetch = async (url, options) => {
    fetchCalls.push({ url, options });
    const body = JSON.parse(options.body);
    const ids = body.filters[0] === 'or' ? body.filters.slice(1).map(x => x[2]) : [body.filters[2]];
    return { ok: true, json: async () => ({ results: ids.map(id => ({ id, title: 'Title ' + id, image: { thumbnail: 'https://img.test/' + id } })) }) };
  };
  await context.ensureCoverDetails(items);
  assert.equal(fetchCalls.length, 2);
  assert.equal(JSON.parse(fetchCalls[0].options.body).results, 30);
  assert.equal(JSON.parse(fetchCalls[1].options.body).results, 1);
  assert.equal(context.state.vnDetails.size, 31);
  assert.equal(context.state.coverLoading.size, 0);
  assert.equal(context.state.covers.v31, 'https://img.test/v31');
});

await test('cover request failure marks retryable IDs and clears loading state', async () => {
  reset();
  context.fetch = async () => { throw new Error('network offline'); };
  await context.ensureCoverDetails([{ i: 1, vndbId: 'v1' }, { i: 2, vndbId: 'v2' }]);
  assert.deepEqual([...context.state.coverFailed].sort(), ['v1', 'v2']);
  assert.equal(context.state.coverLoading.size, 0);
  assert.equal(node('vn49RetryCovers').hidden, false);
  assert.ok(statusCalls.some(x => x.kind === 'error' && /封面查詢失敗/.test(x.message)));
});

await test('missing VNDB records are marked resolved so the same IDs are not re-requested', async () => {
  reset();
  let calls = 0;
  context.fetch = async () => { calls++; return { ok: true, json: async () => ({ results: [] }) }; };
  const items = [{ i: 1, vndbId: 'v1' }];
  await context.ensureCoverDetails(items);
  assert.equal(context.state.vnDetails.get('v1').image, null);
  await context.ensureCoverDetails(items);
  assert.equal(calls, 1);
});

await test('retry clears failed/detail/cache state before re-fetching visible covers', async () => {
  reset();
  setWorks(2);
  context.state.coverFailed.add('v1');
  context.state.vnDetails.set('v1', { id: 'v1', title: 'old' });
  context.state.covers.v1 = 'old-url';
  context.fetch = async (_url, options) => {
    const body = JSON.parse(options.body);
    const ids = body.filters[0] === 'or' ? body.filters.slice(1).map(x => x[2]) : [body.filters[2]];
    return { ok: true, json: async () => ({ results: ids.map(id => ({ id, title: 'fresh', image: { thumbnail: 'fresh-' + id } })) }) };
  };
  await context.retryVisibleCovers();
  assert.equal(context.state.coverFailed.has('v1'), false);
  assert.equal(context.state.vnDetails.get('v1').title, 'fresh');
  assert.equal(context.state.covers.v1, 'fresh-v1');
  assert.equal(node('vn49RetryCovers').hidden, true);
});

await test('image error tries the original URL once before replacing with a fallback', async () => {
  reset();
  const img = new context.HTMLImageElement();
  img.dataset = { vn49Cover: '', vn49Id: 'v1', vn49Title: '作品標題' };
  img.src = 'https://img.test/thumb.jpg'; img.currentSrc = img.src; img.alt = '作品標題 封面';
  context.state.vnDetails.set('v1', { image: { url: 'https://img.test/full.jpg' } });
  context.state.covers.v1 = 'https://img.test/thumb.jpg';
  context.handleVnCoverImageError({ target: img });
  assert.equal(img.src, 'https://img.test/full.jpg');
  assert.equal(img.dataset.vn49TriedFull, '1');
  assert.equal(replaced.length, 0);
  img.currentSrc = img.src;
  context.handleVnCoverImageError({ target: img });
  assert.equal(replaced.length, 1);
  assert.equal(replaced[0].node.className, 'vn49CoverFallback');
  assert.equal(context.state.coverFailed.has('v1'), true);
  assert.equal(context.state.covers.v1, undefined);
  assert.equal(node('vn49RetryCovers').hidden, false);
});

await test('image error ignores non-image and unrelated image elements', async () => {
  reset();
  context.handleVnCoverImageError({ target: { matches: () => true } });
  const img = new context.HTMLImageElement(); img.matches = () => false;
  context.handleVnCoverImageError({ target: img });
  assert.equal(replaced.length, 0);
});

await test('filtered works applies search and year filters and returns deterministic ordering', async () => {
  reset();
  setWorks(4);
  context.state.vnDetails.set('v1', { aliases: ['Blue Alias'], released: '1999-01-01' });
  context.state.vnDetails.set('v2', { released: '2005-01-01' });
  context.state.vnDetails.set('v3', { released: '2015-01-01' });
  context.state.vnDetails.set('v4', { released: '2022-01-01' });
  context.state.search = 'blue alias';
  assert.deepEqual(Array.from(context.filteredWorks(), w => w.vndbId), ['v1']);
  context.state.search = ''; context.state.year = 'old';
  assert.deepEqual(context.filteredWorks().map(w => w.vndbId), ['v1']);
  context.state.year = '2000';
  assert.deepEqual(Array.from(context.filteredWorks(), w => w.vndbId), ['v2']);
  context.state.year = '2010';
  assert.deepEqual(Array.from(context.filteredWorks(), w => w.vndbId), ['v3']);
  context.state.year = '2020';
  assert.deepEqual(Array.from(context.filteredWorks(), w => w.vndbId), ['v4']);
});

await test('catalog renders at the current page limit and exposes more-results state', async () => {
  reset();
  setWorks(80);
  node('vnCatalogView', { hidden: false });
  context.state.renderLimit = 72;
  context.renderVnCatalog(false);
  assert.equal((node('vn49Grid').innerHTML.match(/class="vn49Card"/g) || []).length, 72);
  assert.equal(node('vn49More').hidden, false);
  assert.match(node('vn49Count').textContent, /72 \/ 80/);
  context.state.renderLimit = 80;
  context.renderVnCatalog(false);
  assert.equal((node('vn49Grid').innerHTML.match(/class="vn49Card"/g) || []).length, 80);
  assert.equal(node('vn49More').hidden, true);
});

await test('stored VN list rejects malformed storage and normalized status maps known labels', async () => {
  reset();
  storage.set('aniVNWatchlistV1', '{broken');
  assert.deepEqual(context.storedVnList(), []);
  const cases = [
    [[{ label: 'Playing' }], 'playing'],
    [[{ label: '已完成' }], 'finished'],
    [[{ label: 'Wishlist' }], 'wishlist'],
    [[{ label: 'Stalled' }], 'stalled'],
    [[{ label: 'Dropped' }], 'dropped'],
    [[], 'other'],
  ];
  for (const [labels, expected] of cases) assert.equal(context.normalizedListStatus({ labels }), expected);
});

await test('VNDB list import preserves VNDB ID domain and does not persist API token', async () => {
  reset();
  node('vn49User', { value: 'tester' });
  node('vn49Token', { value: 'private-token' });
  node('vn49Import', { disabled: false });
  context.fetch = async (url, options = {}) => {
    fetchCalls.push({ url, options });
    if (url.includes('/user?')) return { ok: true, json: async () => ({ u123: { id: 'u123', username: 'tester' } }) };
    return { ok: true, json: async () => ({ results: [{ id: 'v123', vn: { id: 'v123', title: 'Game', image: { thumbnail: 'cover-url' } }, labels: [{ label: 'Playing' }] }], more: false }) };
  };
  await context.importVnList();
  const saved = JSON.parse(storage.get('aniVNWatchlistV1'));
  assert.equal(saved.userId, 'u123');
  assert.equal(saved.items[0].vndbId, 'v123');
  assert.equal(saved.items[0].id, 'v123');
  assert.equal(saved.items[0].vn.id, 'v123');
  assert.equal(node('vn49Token').value, '');
  assert.ok(![...storage.values()].some(value => String(value).includes('private-token')));
  assert.equal(context.state.busy, false);
  assert.equal(node('vn49Import').disabled, false);
});

await test('private-list authorization failure is reported and busy state resets', async () => {
  reset();
  node('vn49User', { value: 'tester' });
  node('vn49Token', { value: 'secret' });
  node('vn49Import', { disabled: false });
  context.fetch = async url => url.includes('/user?')
    ? { ok: true, json: async () => ({ u123: { id: 'u123', username: 'tester' } }) }
    : { ok: false, status: 401, json: async () => ({}) };
  await context.importVnList();
  assert.ok(statusCalls.some(x => x.kind === 'error' && /listread/.test(x.message)));
  assert.equal(context.state.busy, false);
  assert.equal(node('vn49Import').disabled, false);
  assert.equal(storage.has('aniVNWatchlistV1'), false);
});

await test('VNDB list import stops at 100 pages and reports the 10000-item safety limit', async () => {
  reset();
  node('vn49User', { value: 'tester' });
  node('vn49Token', { value: '' });
  node('vn49Import', { disabled: false });
  let pages = 0;
  context.fetch = async (url, options = {}) => {
    if (url.includes('/user?')) return { ok: true, json: async () => ({ u123: { id: 'u123', username: 'tester' } }) };
    pages++;
    const page = JSON.parse(options.body).page;
    return { ok: true, json: async () => ({ results: Array.from({ length: 100 }, (_, i) => ({ id: 'v' + ((page - 1) * 100 + i + 1) })), more: true }) };
  };
  await context.importVnList();
  const saved = JSON.parse(storage.get('aniVNWatchlistV1'));
  assert.equal(pages, 100);
  assert.equal(saved.items.length, 10000);
  assert.ok(statusCalls.some(x => /10,000 筆安全上限/.test(x.message)));
});

console.log('VNDB navigation contract: ' + passed + ' tests passed.');
})();

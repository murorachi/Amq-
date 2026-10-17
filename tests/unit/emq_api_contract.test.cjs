'use strict';
// Executes the exact V82.65 candidate policy and V82.48 EMQ API fragment with a compressed fixture.
// No live user storage, external network, or production data is accessed.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const zlib = require('node:zlib');
const root = path.resolve(__dirname, '../..');
const script4 = fs.readFileSync(path.join(root, 'src/scripts/script_004.htmlpart'), 'utf8');
const script38 = fs.readFileSync(path.join(root, 'src/scripts/script_038.htmlpart'), 'utf8');
const script25 = fs.readFileSync(path.join(root, 'src/scripts/script_025.htmlpart'), 'utf8');
const p0 = script4.indexOf('/* V82.65_POOL_POLICY_BEGIN: shared candidate-pool decisions for solo and multiplayer UI. */');
const p1 = script4.indexOf('/* V82.65_POOL_POLICY_END */', p0);
assert.ok(p0 >= 0 && p1 > p0, 'candidate policy sentinels exist');
const policySource = script4.slice(p0, p1 + '/* V82.65_POOL_POLICY_END */'.length);
const emqSource = script38.slice(script38.indexOf('<script id="emq-toggle-v8248-script">') + '<script id="emq-toggle-v8248-script">'.length, script38.lastIndexOf('</script>'));
assert.ok(emqSource.includes('function combinePool(') && emqSource.includes('window.__aniEmqAPI='), 'real EMQ API contract exists');
const scopeStart = script25.indexOf('window.__aniApplyQuizCustomListScopeV8265=function(basePool,isFocusMode=false){');
const scopeEnd = script25.indexOf('\n };', scopeStart);
assert.ok(scopeStart >= 0 && scopeEnd > scopeStart, 'real custom-list scope adapter exists');
const scopeSource = script25.slice(scopeStart, scopeEnd + 3);

let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('PASS ' + name); }
  catch (e) { console.error('FAIL ' + name + '\n' + e.stack); process.exitCode = 1; }
}
const amqWorks = [[10, 'AMQ Work', 'AMQ Alt', 'Spring 2020', 'TV', 2020, 'mal-amq']];
const amqSongs = [[10, 1001, 1, 1, 'AMQ Song', 'AMQ Artist', 20, 100, 1, 'amq.mp3', '', '']];
const payload = {
  version: 1,
  works: [
    { i: 900001, t: 'EMQ Work One', n: 'EMQ Work Alias', y: 2018, vndbId: 'v123' },
    { i: 900002, t: 'EMQ Work Two', n: 'EMQ Work Two Alt', y: 2022, vndbId: 'v456' }
  ],
  songs: [
    { i: 910001, w: 900001, k: 1, t: 'EMQ Song One', a: 'EMQ Artist One', y: 2018, v: ['https://audio.example/one.mp3'], wt: 'EMQ Work One', wn: 'EMQ Work Alias', ta: ['EMQ Song One', 'Song One Alias'], wa: ['Work Alias'], aa: ['Artist Alias'] },
    { i: 910002, w: 900002, k: 2, t: 'EMQ Song Two', a: 'EMQ Artist Two', y: 2022, v: ['https://audio.example/two.mp3'], wt: 'EMQ Work Two', wn: 'EMQ Work Two Alt', ta: ['EMQ Song Two'], wa: [], aa: [] },
    { i: 910003, w: 900002, k: 3, t: 'No Audio', a: 'EMQ Artist Three', y: 2022, v: [], wt: 'EMQ Work Two', wn: 'EMQ Work Two Alt', ta: [], wa: [], aa: [] }
  ]
};
const packed = zlib.gzipSync(Buffer.from(JSON.stringify(payload))).toString('base64');

async function makeEnv(overrides = {}) {
  const listeners = new Map();
  const nodes = new Map();
  const status = { textContent: '', classList: { toggle() {} } };
  const quick = { value: 'all', closest: () => ({ insertAdjacentElement() {} }) };
  const checkbox = { checked: false, disabled: false, addEventListener() {}, title: '' };
  const toggleLabel = { title: '', querySelector: () => ({ textContent: '' }), insertAdjacentElement() {} };
  const packedNode = { textContent: Buffer.from(JSON.stringify(overrides.payload || payload)).length ? (overrides.packed || packed) : packed };
  nodes.set('emqLibraryGzipBase64V8248', packedNode);
  nodes.set('quizPool', quick);
  nodes.set('emqSourceStatusV8248', status);
  nodes.set('qsEmqEnabled', checkbox);
  nodes.set('qsEmqToggleLabelV8248', toggleLabel);
  const document = {
    getElementById: id => nodes.get(id) || null,
    createElement: tag => ({ tagName: tag, className: '', id: '', innerHTML: '', title: '', insertAdjacentElement() {}, querySelector: () => ({ textContent: '' }) }),
    dispatchEvent: event => { for (const fn of listeners.get(event.type) || []) fn(event); return true; },
    addEventListener: (type, fn) => { if (!listeners.has(type)) listeners.set(type, []); listeners.get(type).push(fn); }
  };
  const window = {
    __aniHistoryAPIv51: { isBlacklisted: id => (overrides.blacklistedIds || []).map(String).includes(String(id)), getStatus: () => 0, getSongTag: () => '' },
    __aniCandidatePoolPolicyV8265: null
  };
  const storage = new Map();
  const context = {
    window, document, localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) },
    anime: overrides.anime || amqWorks, songs: overrides.songs || amqSongs,
    console: { error() {} }, atob: global.atob, Blob: global.Blob, Response: global.Response,
    DecompressionStream: global.DecompressionStream, Uint8Array, Map, Set, Array, String, Number, Math, JSON, Promise,
    CustomEvent: class CustomEvent { constructor(type, init = {}) { this.type = type; this.detail = init.detail; } },
  };
  vm.createContext(context);
  vm.runInContext(policySource, context, { timeout: 1000, filename: 'exact-candidate-policy.js' });
  const ready = new Promise(resolve => document.addEventListener('ani-emq-library-ready-v8248', resolve));
  vm.runInContext(emqSource, context, { timeout: 1000, filename: 'exact-emq-api.js' });
  if (!overrides.skipReady) await ready;
  return { context, api: window.__aniEmqAPI, status, quick, packedNode };
}

function makeCustomScopeAdapter(api, initialSettings = {}, initialInvalid = false) {
  const storage = new Map();
  if (initialInvalid) storage.set('aniQuizCustomListScopeInvalidV8265', '1');
  const status = { textContent: '' };
  const listMap = new Map([
    ['amq-list-a', { id: 'amq-list-a', animeIds: ['10'] }],
    ['amq-list-empty', { id: 'amq-list-empty', animeIds: [] }]
  ]);
  const window = {
    __aniEmqAPI: api,
    __aniQuizPlanV1: { getSettings: () => initialSettings }
  };
  const context = {
    window,
    document: {},
    localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,String(v)), removeItem: k => storage.delete(k) },
    $: selector => selector === '#quizStatus' ? status : null,
    customListById: id => listMap.get(String(id)) || null,
    validAnimeIds: ids => ids.filter(id => String(id) === '10'),
    customScopeInvalidV8265: () => storage.get('aniQuizCustomListScopeInvalidV8265') === '1',
    setCustomScopeInvalidV8265: value => value ? storage.set('aniQuizCustomListScopeInvalidV8265','1') : storage.delete('aniQuizCustomListScopeInvalidV8265'),
    Set, Map, Array, String, Object
  };
  vm.createContext(context);
  vm.runInContext(scopeSource, context, { timeout: 1000, filename: 'exact-custom-list-scope-adapter.js' });
  return { adapter: window.__aniApplyQuizCustomListScopeV8265, status, storage };
}

function settings(overrides = {}) {
  return { emqMode: 'mixed', statuses: [0,1,2,3], songTypes: [1,2,3,4,5], yearMin: 1900, yearMax: 2100, unknownYear: true, seasons: ['Winter','Spring','Summer','Fall'], animeTypes: ['TV','OVA','Movie','Special','ONA','Other'], diffMin: 0, diffMax: 100, noRepeat: false, tagsOnly: false, tagText: '', ...overrides };
}
(async () => {
  const env = await makeEnv();
  const blackEnv = await makeEnv({ blacklistedIds: ['910001'] });
  test('real API reaches ready state and exposes expected contract', () => {
    assert.equal(env.api.ready, true);
    assert.equal(env.api.count, 2, 'rows without audio are deliberately excluded at load time');
    assert.equal(env.api.workCount, 2);
    assert.equal(typeof env.api.combinePool, 'function');
    assert.equal(typeof env.api.chooseQuestion, 'function');
  });
  test('EMQ song and work IDs remain isolated from AMQ IDs', () => {
    assert.equal(env.api.isSong(910001), true);
    assert.equal(env.api.isSong(1001), false);
    assert.equal(env.api.getRow(910001)[0], 900001);
    assert.equal(env.api.getWorkSummary(900001)[1], 'EMQ Work One');
    assert.equal(env.context.anime.length, 1, 'EMQ works are not inserted into AMQ anime');
    assert.equal(env.context.songs.length, 1, 'EMQ rows are not inserted into AMQ songs');
  });
  test('Mixed mode appends valid EMQ rows and deduplicates by song ID', () => {
    const result = env.api.combinePool([amqSongs[0], amqSongs[0]], settings(), false, new Set(), null, [], null);
    assert.deepEqual(Array.from(result, row => row[1]), [1001, 910001, 910002]);
  });
  test('EMQ-only mode excludes AMQ rows and keeps EMQ song order', () => {
    const result = env.api.combinePool([amqSongs[0]], settings({ emqMode: 'emq' }), false, new Set(), null, [], null);
    assert.deepEqual(Array.from(result, row => row[1]), [910001, 910002]);
  });
  test('AMQ mode leaves base pool unchanged and does not append EMQ', () => {
    const result = env.api.combinePool([amqSongs[0]], settings({ emqMode: 'amq' }), false, new Set(), null, [], null);
    assert.deepEqual(Array.from(result, row => row[1]), [1001]);
  });
  test('EMQ metadata resolves from EMQ work map, not AMQ anime map', () => {
    const row = env.api.getRow(910001), work = env.api.getWorkSummary(row[0]), meta = env.api.getMeta(row[1]);
    assert.equal(work[1], 'EMQ Work One');
    assert.equal(work[6], null);
    assert.equal(meta.year, 2018);
    assert.equal(meta.vndbId, 'v123');
    assert.equal(env.context.anime.find(work => work[0] === 10)[1], 'AMQ Work');
  });
  test('song aliases and audio URL candidates stay attached to the EMQ ID', () => {
    assert.deepEqual(Array.from(env.api.getAliases(910001).title), ['EMQ Song One', 'Song One Alias']);
    assert.deepEqual(Array.from(env.api.getAliases(910001).artist), ['Artist Alias', 'EMQ Artist One']);
    assert.deepEqual(Array.from(env.api.getAudioUrls(910001)), ['https://audio.example/one.mp3']);
  });
  test('AMQ-only hard restrictions suppress EMQ in Mixed mode', () => {
    const result = env.api.combinePool([amqSongs[0]], settings({ emqMode: 'mixed', diffMin: 20 }), false, new Set(), null, [], null);
    assert.deepEqual(Array.from(result, row => row[1]), [1001]);
  });
  test('focus scope combines explicit AMQ and EMQ focus IDs without duplicate song IDs', () => {
    const result = env.api.combinePool([amqSongs[0], amqSongs[0]], settings({ emqMode: 'amq' }), true, new Set(), null, [910001], null);
    assert.deepEqual(Array.from(result, row => row[1]), [1001, 910001]);
  });
  test('question chooser respects EMQ-only source mode', () => {
    const pool = [amqSongs[0], env.api.getRow(910001)];
    assert.equal(env.api.chooseQuestion(pool, settings({ emqMode: 'emq' }), false)[1], 910001);
  });
  test('selected EMQ song Set is an explicit dedicated scope and still honors blacklist/repeat', () => {
    const selected = env.api.combinePool([amqSongs[0]], settings({ emqMode: 'mixed', statuses: [], yearMin: 2025, yearMax: 2026, songTypes: [], tagsOnly: true, tagText: 'does-not-match' }), false, new Set(), null, [], new Set(['910002']));
    assert.deepEqual(Array.from(selected, row => row[1]), [1001, 910002], 'selected list overrides ordinary status/year/type/tag filters');
    const seen = env.api.combinePool([amqSongs[0]], settings({ emqMode: 'emq', noRepeat: true }), false, new Set(['910002']), null, [], new Set(['910002']));
    assert.deepEqual(Array.from(seen, row => row[1]), [], 'selected-list scope does not override repeat protection in EMQ-only mode');
    const blocked = blackEnv.api.combinePool([], settings({ emqMode: 'emq' }), false, new Set(), null, [], new Set(['910001']));
    assert.deepEqual(Array.from(blocked, row => row[1]), [], 'blacklist remains active for selected-list candidates');
  });
  test('selected EMQ song Set with no matching IDs never broadens the EMQ pool', () => {
    const result = env.api.combinePool([amqSongs[0]], settings({ emqMode: 'emq' }), false, new Set(), null, [], new Set());
    assert.deepEqual(Array.from(result, row => row[1]), []);
  });
  test('malformed EMQ year bounds fail closed instead of widening the candidate pool', () => {
    const result = env.api.combinePool([amqSongs[0]], settings({ emqMode: 'emq', yearMin: 'not-a-year', yearMax: 2100 }), false, new Set(), null, [], null);
    assert.deepEqual(Array.from(result, row => row[1]), []);
  });
  test('custom-list adapter scopes AMQ rows but preserves independently filtered EMQ rows', () => {
    const scope = makeCustomScopeAdapter(env.api, { customListIds: ['amq-list-a'] });
    const mixed = [amqSongs[0], env.api.getRow(910001), env.api.getRow(910002)];
    assert.deepEqual(Array.from(scope.adapter(mixed, false), row => row[1]), [1001, 910001, 910002]);
  });
  test('empty custom-list settings are unrestricted and focus mode bypasses list scope', () => {
    const scope = makeCustomScopeAdapter(env.api, {});
    const mixed = [amqSongs[0], env.api.getRow(910001)];
    assert.deepEqual(Array.from(scope.adapter(mixed, false), row => row[1]), [1001, 910001]);
    const focus = makeCustomScopeAdapter(env.api, { customListIds: ['missing-list'] });
    assert.deepEqual(Array.from(focus.adapter(mixed, true), row => row[1]), [1001, 910001]);
  });
  test('malformed plural customListIds fails closed for AMQ while retaining EMQ rows', () => {
    const scope = makeCustomScopeAdapter(env.api, { customListIds: 'amq-list-a' });
    const mixed = [amqSongs[0], env.api.getRow(910001)];
    assert.deepEqual(Array.from(scope.adapter(mixed, false), row => row[1]), [910001]);
    assert.equal(scope.storage.get('aniQuizCustomListScopeInvalidV8265'), '1');
    assert.match(scope.status.textContent, /AMQ 自訂清單範圍失效/);
  });
  test('stale persistent custom-list invalid flag cannot silently restore AMQ candidates', () => {
    const scope = makeCustomScopeAdapter(env.api, {}, true);
    const mixed = [amqSongs[0], env.api.getRow(910002)];
    assert.deepEqual(Array.from(scope.adapter(mixed, false), row => row[1]), [910002]);
  });

  const collisionPayload = { version: 1, works: [{ i: 10, t: 'collision', n: 'collision', y: 2020 }], songs: [] };
  const collisionPacked = zlib.gzipSync(Buffer.from(JSON.stringify(collisionPayload))).toString('base64');
  const collisionEnv = await makeEnv({ packed: collisionPacked, skipReady: true });
  await new Promise(resolve => setTimeout(resolve, 20));
  test('AMQ/EMQ work ID collision fails closed before ready', () => {
    assert.equal(collisionEnv.api.ready, false);
    assert.match(collisionEnv.status.textContent, /AMQ／EMQ 作品 ID 衝突/);
    assert.equal(collisionEnv.api.getRows().length, 0);
  });
  const missingWorkPayload = {
    version: 1,
    works: [{ i: 900001, t: 'Known EMQ Work', n: 'Known Alias', y: 2020 }],
    songs: [{ i: 910009, w: 900099, k: 1, t: 'Orphan EMQ Song', a: 'Fixture Artist', y: 2020, v: ['https://audio.example/orphan.mp3'] }]
  };
  const missingWorkPacked = zlib.gzipSync(Buffer.from(JSON.stringify(missingWorkPayload))).toString('base64');
  const missingWorkEnv = await makeEnv({ packed: missingWorkPacked, skipReady: true });
  await new Promise(resolve => setTimeout(resolve, 20));
  test('EMQ song with missing work mapping fails closed before ready', () => {
    assert.equal(missingWorkEnv.api.ready, false);
    assert.match(missingWorkEnv.status.textContent, /找不到對應作品 900099/);
    assert.equal(missingWorkEnv.api.getRows().length, 0);
    assert.equal(missingWorkEnv.context.anime.length, 1, 'failed EMQ load does not mutate AMQ anime');
    assert.equal(missingWorkEnv.context.songs.length, 1, 'failed EMQ load does not mutate AMQ songs');
  });
  console.log(`RESULT \${passed} passed, \${process.exitCode ? 1 : 0} failed`);
})().catch(e => { console.error(e.stack || e); process.exitCode = 1; });

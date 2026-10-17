'use strict';
// Exact-source tests for V82.65 history bridge and V82.48 EMQ status/tag lookups.
// Uses isolated in-memory state only; no live browser storage or production HTML is modified.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const script1 = fs.readFileSync(path.join(root, 'src/scripts/script_001.htmlpart'), 'utf8');
const script4 = fs.readFileSync(path.join(root, 'src/scripts/script_004.htmlpart'), 'utf8');
const script38 = fs.readFileSync(path.join(root, 'src/scripts/script_038.htmlpart'), 'utf8');

const policyStart = script4.indexOf('/* V82.65_POOL_POLICY_BEGIN: shared candidate-pool decisions for solo and multiplayer UI. */');
const policyEnd = script4.indexOf('/* V82.65_POOL_POLICY_END */', policyStart);
assert.ok(policyStart >= 0 && policyEnd > policyStart, 'candidate policy sentinels exist');
const policySource = script4.slice(policyStart, policyEnd + '/* V82.65_POOL_POLICY_END */'.length);
const statusSource = script38.split('\n').find(line => line.startsWith('function storedStatus('));
const tagSource = script38.split('\n').find(line => line.startsWith('function storedTag('));
assert.ok(statusSource && tagSource, 'exact storedStatus/storedTag source functions exist');
const recordSource = script1.split('\n').find(line => line.startsWith('function recordQuizHistoryV51('));
const familiaritySource = script1.split('\n').find(line => line.startsWith('function st(id)'));
assert.ok(recordSource && familiaritySource, 'exact history record and familiarity source functions exist');
const bridgeStart = script1.indexOf('window.__aniHistoryAPIv51={');
const bridgeEnd = script1.indexOf('\n};', bridgeStart);
assert.ok(bridgeStart >= 0 && bridgeEnd > bridgeStart, 'exact history bridge source exists');
const bridgeSource = script1.slice(bridgeStart, bridgeEnd + 3);

let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('PASS ' + name); }
  catch (error) { console.error('FAIL ' + name + '\n' + error.stack); process.exitCode = 1; }
}
function makeEnv() {
  const storage = new Map();
  const events = [];
  const status = Object.create(null);
  const songTags = Object.create(null);
  const history = [];
  const anime = [[10, 'AMQ Work', 'AMQ Alt', 'Spring 2020', 'TV', 2020, 'mal-amq']];
  const songs = [[10, 1001, 1, 1, 'AMQ Song', 'AMQ Artist', 20, 100, 1, 'amq.mp3', '', '']];
  const emqRows = new Map([
    ['910001', [900001, 910001, 1, 0, 'EMQ Song One', 'EMQ Artist One']],
    ['910002', [900002, 910002, 2, 0, 'EMQ Song Two', 'EMQ Artist Two']]
  ]);
  const emqWorks = new Map([
    ['900001', [900001, 'EMQ Work One', 'EMQ Work Alias']],
    ['900002', [900002, 'EMQ Work Two', 'EMQ Work Two Alt']]
  ]);
  const window = {
    __aniEmqAPI: {
      isSong: id => emqRows.has(String(id)),
      getRow: id => emqRows.get(String(id)) || null,
      getWorkSummary: id => emqWorks.get(String(id)) || null,
      getAliases: id => ({ work: String(id) === '910001' ? ['Work Alias'] : [] }),
      getRows: () => [...emqRows.values()],
      getWorks: () => [...emqWorks.values()].map(w => ({ i: w[0], t: w[1], n: w[2] }))
    },
    __aniSuppressPersistenceForRestoreV828: false
  };
  const document = { dispatchEvent: event => { events.push(event); return true; } };
  const localStorage = {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
  };
  const context = {
    window, document, localStorage, status, songTags, anime, songs,
    byAnime: new Map(anime.map(row => [row[0], row])),
    quizHistoryV51: history, quizHistorySummaryV1: { bySong: {} }, quizTargetSummaryV80: {},
    quizHistoryCurrentRoundV51: '', quizHistoryRoundSerialV51: 0,
    QUIZ_HISTORY_DETAIL_LIMIT_V1: 1000,
    saveQuizHistoryV51(entry) { history.push(entry); },
    save() {}, updateStats() {}, render() {},
    addQuizHistorySummaryEntryV1() { return false; }, scheduleQuizHistorySummarySaveV1() {},
    addQuizTargetSummaryEntryV80() { return false; }, scheduleQuizTargetSummarySaveV80() {},
    isBlacklistedSongV51() { return false; }, setBlacklistedSongV51() { return false; },
    flushQuizTargetSummaryV80() { return true; },
    asId: id => String(id ?? ''),
    Date, Math, Number, String, Object, Array, Set, Map, JSON, RegExp, console,
    CustomEvent: class CustomEvent { constructor(type, init = {}) { this.type = type; this.detail = init.detail; } }
  };
  vm.createContext(context);
  context.beginQuizHistoryRoundV51 = () => { context.quizHistoryRoundSerialV51++; context.quizHistoryCurrentRoundV51 = 'test-round-' + context.quizHistoryRoundSerialV51; };
  vm.runInContext(policySource, context, { timeout: 1000, filename: 'exact-candidate-policy.js' });
  vm.runInContext(familiaritySource, context, { timeout: 1000, filename: 'exact-familiarity.js' });
  vm.runInContext(recordSource, context, { timeout: 1000, filename: 'exact-history-record.js' });
  vm.runInContext(bridgeSource, context, { timeout: 1000, filename: 'exact-history-bridge.js' });
  vm.runInContext(statusSource + '\n' + tagSource, context, { timeout: 1000, filename: 'exact-emq-status-tag.js' });
  return { context, storage, events, status, songTags, history, anime, songs, window, api: window.__aniHistoryAPIv51 };
}

const env = makeEnv();
test('EMQ history records resolve source and work metadata from EMQ song/work IDs', () => {
  env.api.record(env.window.__aniEmqAPI.getRow(910001), true, 'EMQ Work One', 1.2, 'correct', 'anime');
  const entry = env.history.at(-1);
  assert.equal(entry.songId, '910001');
  assert.equal(entry.animeId, '900001');
  assert.equal(entry.source, 'emq');
  assert.equal(entry.workKind, 'visual_novel_game');
  assert.equal(entry.workTitle, 'EMQ Work One');
  assert.deepEqual(Array.from(entry.workAliases), ['Work Alias']);
});
test('AMQ history records retain AMQ metadata and do not become EMQ records', () => {
  env.api.record(env.songs[0], false, 'wrong', 8, 'wrong', 'title');
  const entry = env.history.at(-1);
  assert.equal(entry.songId, '1001');
  assert.equal(entry.animeId, '10');
  assert.equal(entry.source, 'amq');
  assert.equal(entry.workKind, 'anime');
  assert.equal(entry.workTitle, 'AMQ Work');
  assert.deepEqual(Array.from(env.api.getAnimeRecords().filter(x => x.source === 'amq').map(x => x.id)), ['10']);
  assert.deepEqual(Array.from(env.api.getSongRecords().filter(x => x.source === 'amq').map(x => x.id)), ['1001']);
});
test('familiarity and tags are keyed by song ID, not work ID', () => {
  env.api.setStatus('910001', 3);
  assert.equal(env.api.getStatus('910001'), 3);
  assert.equal(env.api.getStatus('900001'), 0, 'work ID does not alias the song status');
  assert.equal(env.api.setSongTag('910001', 'visual-novel').ok, true);
  assert.equal(env.api.getSongTag('910001'), 'visual-novel');
  assert.equal(env.api.getSongTag('900001'), '');
  assert.equal(JSON.parse(env.storage.get('aniSongTags_v1'))['910001'], 'visual-novel');
});
test('tag bridge rejects unknown IDs and preserves existing tag when storage fails', () => {
  assert.deepEqual(JSON.parse(JSON.stringify(env.api.setSongTag('999999', 'bad'))), { ok: false, reason: 'missing' });
  env.api.setSongTag('910002', 'keep-me');
  env.context.localStorage.setItem = () => { throw new Error('quota'); };
  assert.deepEqual(JSON.parse(JSON.stringify(env.api.setSongTag('910002', 'replace'))), { ok: false, reason: 'storage' });
  assert.equal(env.api.getSongTag('910002'), 'keep-me');
});
test('storedStatus uses song ID, local-storage fallback, and rejects invalid values', () => {
  env.storage.set('aniCollection_v2', JSON.stringify({ '910001': 2, '900001': 3, '910002': 7 }));
  env.window.__aniHistoryAPIv51.getStatus = () => undefined;
  assert.equal(env.context.storedStatus('910001'), 2);
  assert.equal(env.context.storedStatus('900001'), 3, 'raw lookup is keyed by the exact requested ID, no work-to-song translation occurs');
  assert.equal(env.context.storedStatus('910002'), null, 'out-of-range familiarity is invalid');
  env.window.__aniHistoryAPIv51.getStatus = () => 'invalid';
  assert.equal(env.context.storedStatus('910001'), null, 'invalid bridge value fails closed instead of falling back to storage');
});
test('storedTag reads only the requested song ID and handles malformed storage safely', () => {
  env.window.__aniHistoryAPIv51.getSongTag = () => undefined;
  env.storage.set('aniSongTags_v1', JSON.stringify({ '910001': 'song-tag', '900001': 'work-tag' }));
  assert.equal(env.context.storedTag('910001'), 'song-tag');
  assert.equal(env.context.storedTag('900001'), 'work-tag');
  env.storage.set('aniSongTags_v1', '{malformed');
  assert.equal(env.context.storedTag('910001'), '');
});
test('unified snapshots keep EMQ rows separate from AMQ source arrays', () => {
  const animeRecords = env.api.getAnimeRecords();
  const songRecords = env.api.getSongRecords();
  assert.equal(env.anime.length, 1);
  assert.equal(env.songs.length, 1);
  assert.equal(animeRecords.filter(x => x.source === 'emq').length, 2);
  assert.equal(songRecords.filter(x => x.source === 'emq').length, 2);
  assert.equal(animeRecords.find(x => x.source === 'emq').workKind, 'visual_novel_game');
  assert.equal(songRecords.find(x => x.source === 'emq').workKind, 'visual_novel_game');
});
console.log(\`RESULT \${passed} passed, \${process.exitCode ? 1 : 0} failed\`);

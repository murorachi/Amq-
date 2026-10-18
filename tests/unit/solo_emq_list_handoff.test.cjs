'use strict';
// Exact-source handoff test with synthetic catalog/storage and no real browser profile.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const s4 = fs.readFileSync(path.join(root, 'src/scripts/script_004.htmlpart'), 'utf8');
const s40 = fs.readFileSync(path.join(root, 'src/scripts/script_040.htmlpart'), 'utf8');
const uniqueModule = fs.readFileSync(path.join(root, 'src/modules/emq_list_normalization.htmlpart'), 'utf8');
const membershipModule = fs.readFileSync(path.join(root, 'src/modules/emq_list_membership.htmlpart'), 'utf8');
assert.equal((s40.match(/<!-- AMQ_SPLIT_MODULE:emq_list_normalization -->/g) || []).length, 1, 'exactly one EMQ normalization module marker');
assert.equal((s40.match(/<!-- AMQ_SPLIT_MODULE:emq_list_membership -->/g) || []).length, 1, 'exactly one EMQ membership module marker');
const line = (src, prefix) => {
  const value = src.split('\n').find(x => x.startsWith(prefix));
  assert.ok(value, 'exact source line: ' + prefix);
  return value;
};
const unique = line(uniqueModule, 'function unique(');
const selected = line(s40, 'function getSelectedIds()');
const workIds = line(membershipModule, 'function listWorkIds(');
const songIds = line(membershipModule, 'function listSongIds(');
const start = s40.indexOf('function installApi(){');
const end = s40.indexOf('\nfunction mountAudioTools()', start);
assert.ok(start >= 0 && end > start, 'exact installApi source boundaries');
const install = s40.slice(start, end);
const wrapper = line(s4, 'const __aniEmqGetQuizPoolBaseV8248=getQuizPool;getQuizPool=function(){');

function env(selection, invalid) {
  const store = new Map([['aniEmqWorkListsSelectedV8254', JSON.stringify(selection)]]);
  if (invalid) store.set('aniEmqListScopeInvalidV8254', '1');
  const amq = [10, 1001, 1, 1, 'AMQ Song', 'AMQ Artist', 20, 100, 1, 'amq.mp3', '', ''];
  const e1 = [900001, 910001, 1, 0, 'EMQ Song One', 'EMQ Artist One', null, 0, 0, 'emq1.mp3', '', '', '', '', 'EMQ'];
  const e2 = [900002, 910002, 1, 0, 'EMQ Song Two', 'EMQ Artist Two', null, 0, 0, 'emq2.mp3', '', '', '', '', 'EMQ'];
  const rows = [e1, e2], calls = [], order = [];
  const lists = [
    { id: 'L1', songIds: ['910001'], workIds: ['900001'], vndbIds: [] },
    { id: 'L2', songIds: ['910002'], workIds: ['900002'], vndbIds: [] }
  ];
  const api = {
    ready: true,
    getAudioUrls: id => ['audio-' + id + '.mp3'],
    getMultiplayerManifest: () => [],
    getRows: () => rows,
    getMeta: id => ({ id: Number(id), workId: Number(id) === 910001 ? 900001 : 900002 }),
    getWorkByVndbId: () => null,
    combinePool(base, settings, focus, seen, last, focusIds, selectedSet) {
      calls.push({ selectedSet, focus }); order.push('combine');
      if (focus) return [...base, ...rows.filter(r => (focusIds || []).map(String).includes(String(r[1])))];
      if (settings.emqMode === 'amq') return base;
      return [...base, ...rows.filter(r => !(selectedSet instanceof Set) || selectedSet.has(String(r[1])))];
    }
  };
  const ctx = {
    window: { __aniEmqAPI: api, __aniAudioHealthV857: { eligible(song) { order.push('audio:' + song[1]); return true; } } },
    document: { getElementById: id => id === 'quizStatus' ? { textContent: '' } : null },
    localStorage: { getItem: k => store.has(k) ? store.get(k) : null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) },
    api: () => api, apiPatched: false, originalCombine: null, db: { lists }, getOverrides: () => ({}),
    INVALID_SCOPE_KEY_V8265: 'aniEmqListScopeInvalidV8254', SELECTED_KEY: 'aniEmqWorkListsSelectedV8254', $: () => null,
    activeFocusModeV72: false, activeFocusSongIdsV72: [], quizRoundSeen: new Set(), lastQuestionId: null,
    quizSettings: { emqMode: 'mixed', includeEmq: true, noRepeat: false }, getQuizPool: () => [amq],
    console, Set, Map, Array, String, Number, Object, JSON, Math, calls, order
  };
  vm.createContext(ctx);
  vm.runInContext([unique, selected, workIds, songIds, install].join('\n'), ctx, { timeout: 1000, filename: 'exact-emq-list-adapter.js' });
  ctx.installApi();
  ctx.window.__aniApplyQuizCustomListScopeV8265 = pool => { order.push('scope'); return pool; };
  vm.runInContext(wrapper, ctx, { timeout: 1000, filename: 'exact-getQuizPool-wrapper.js' });
  return { ctx, pool: ctx.getQuizPool(), calls, order };
}

let passed = 0;
function test(name, fn) { try { fn(); passed++; console.log('PASS ' + name); } catch (e) { console.error('FAIL ' + name + '\n' + e.stack); process.exitCode = 1; } }
test('selected list becomes a song-ID Set passed to the original combiner', () => {
  const e = env(['L1'], false), set = e.calls.at(-1).selectedSet;
  assert.ok(set instanceof Set); assert.deepEqual(Array.from(set), ['910001']);
  assert.deepEqual(Array.from(e.pool, r => String(r[1])), ['1001', '910001']);
});
test('no selected list passes null and leaves EMQ membership unrestricted', () => {
  const e = env([], false);
  assert.equal(e.calls.at(-1).selectedSet, null);
  assert.deepEqual(Array.from(e.pool, r => String(r[1])), ['1001', '910001', '910002']);
});
test('invalid persisted scope passes an empty Set and fails closed for EMQ rows', () => {
  const e = env([], true), set = e.calls.at(-1).selectedSet;
  assert.ok(set instanceof Set); assert.equal(set.size, 0);
  assert.deepEqual(Array.from(e.pool, r => String(r[1])), ['1001']);
});
test('pool composition precedes audio eligibility and final custom-list adapter', () => {
  const e = env(['L1'], false), combine = e.order.indexOf('combine'), audio = e.order.findIndex(x => x.startsWith('audio:')), scope = e.order.lastIndexOf('scope');
  assert.ok(combine >= 0 && audio > combine && scope > audio, e.order.join(' -> '));
});
console.log('RESULT ' + passed + ' passed, ' + (process.exitCode ? 1 : 0) + ' failed');

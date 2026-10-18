'use strict';
// Exact-source contracts for AMQ/EMQ list identity, membership, and backup round-trip.
// All data is synthetic; no real browser profile or service is touched.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const emqListSource = fs.readFileSync(path.join(root, 'src/scripts/script_040.htmlpart'), 'utf8');
const emqNormalizationSource = fs.readFileSync(path.join(root, 'src/modules/emq_list_id_normalization.js'), 'utf8');
const emqApiSource = fs.readFileSync(path.join(root, 'src/scripts/script_038.htmlpart'), 'utf8');
const backupSource = fs.readFileSync(path.join(root, 'src/scripts/script_023.htmlpart'), 'utf8');

function extractFunction(source, name) {
  const start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `function exists: ${name}`);
  const open = source.indexOf('{', start);
  let depth = 0, quote = null, escaped = false, line = false, block = false;
  for (let i = open; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (line) { if (c === '\n') line = false; continue; }
    if (block) { if (c === '*' && n === '/') { block = false; i++; } continue; }
    if (quote) { if (escaped) { escaped = false; continue; } if (c === '\\') { escaped = true; continue; } if (c === quote) quote = null; continue; }
    if (c === '/' && n === '/') { line = true; i++; continue; }
    if (c === '/' && n === '*') { block = true; i++; continue; }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`unclosed function: ${name}`);
}
function extractInitializer(source, startText, endText) {
  const start = source.indexOf(startText); assert.ok(start >= 0, `initializer exists: ${startText}`);
  const end = source.indexOf(endText, start); assert.ok(end > start, `initializer ends: ${endText}`);
  return source.slice(start, end + endText.length);
}
const declarations = [
  extractInitializer(backupSource, 'const APP_STORAGE_KEYS=new Set([', ']);'),
  extractInitializer(backupSource, 'const APP_STORAGE_KEY_PATTERNS=[', '];'),
  "const STORAGE_EXCLUDES=new Set(['aniCoverCacheV12']);",
  extractFunction(backupSource, 'isAppStorageKey'),
  extractFunction(backupSource, 'validateFullBackupStorageSnapshot')
].join('\n');
const backupContext = { Set, Array, Object, Number, JSON, Error, RegExp };
vm.createContext(backupContext);
vm.runInContext(declarations, backupContext);
let passed = 0;
function test(name, fn) { try { fn(); passed++; console.log('PASS ' + name); } catch (e) { console.error('FAIL ' + name + '\n' + e.stack); process.exitCode = 1; } }
function backup(storage, keys = Object.keys(storage)) { return {format:'ani-collection-workspace',version:10,storage,storageManifest:{schemaVersion:1,keyCount:keys.length,keys}}; }

const listStorage = new Map();
const sampleList = {
  id: 'emql-stable-01', name: 'VN soundtrack set',
  workIds: ['900001', '900001'], vndbIds: ['v123', 'v123'], songIds: ['910002', '910002'],
  createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-02T00:00:00.000Z'
};
const rawListDb = JSON.stringify({version:1,lists:[sampleList]});
const rows = [[900001,910001,1,0,'Song A','Artist A'],[900001,910002,2,0,'Song B','Artist B'],[900002,910003,1,0,'Song C','Artist C']];
const workByVndb = new Map([['v123',{i:900001}],['v456',{i:900002}]]);
const meta = new Map([['910001',{vndbId:'v123',year:2020}],['910002',{vndbId:'v123',year:2021}],['910003',{vndbId:'v456',year:2022}]]);
const listContext = {
  Set, Map, Array, String, Object, Number, Date, JSON,
  localStorage: {getItem:k=>listStorage.has(k)?listStorage.get(k):null,setItem:(k,v)=>listStorage.set(k,String(v))},
  window: {__aniEmqAPI:{getRows:()=>rows,getMeta:id=>meta.get(String(id))||null,getWorkByVndbId:id=>workByVndb.get(String(id))||null}}
};
vm.createContext(listContext);
vm.runInContext([
  "const KEY='aniEmqWorkListsV8254';",
  extractFunction(emqNormalizationSource,'unique'),
  extractFunction(emqListSource,'loadDb'),
  extractFunction(emqListSource,'api'),
  extractFunction(emqListSource,'listWorkIds'),
  extractFunction(emqListSource,'listSongIds')
].join('\n'),listContext,{timeout:1000});

const listKeys = ['aniEmqWorkListsV8254','aniEmqWorkListsSelectedV8254','aniEmqAudioOverridesV8254'];
test('EMQ invalid-selection marker is defined and uses the allowlisted fail-closed storage key', () => {
  assert.match(emqListSource, /const INVALID_SCOPE_KEY_V8265=['\"]aniQuizCustomListScopeInvalidV8265['\"]/);
  assert.match(emqListSource, /localStorage\.setItem\(INVALID_SCOPE_KEY_V8265,\s*['\"]1['\"]\)/);
});
test('EMQ list, selected-list, and audio-override keys are included in full-backup allowlist', () => {
  for (const key of listKeys) assert.equal(backupContext.isAppStorageKey(key), true, key);
  assert.equal(backupContext.isAppStorageKey('aniEmqWorkListsInjected'), false);
});
test('full-backup manifest round-trips list IDs, work IDs, VNDB IDs, song IDs, and timestamps exactly', () => {
  const storage = {
    aniEmqWorkListsV8254: rawListDb,
    aniEmqWorkListsSelectedV8254: JSON.stringify(['emql-stable-01']),
    aniEmqAudioOverridesV8254: JSON.stringify({'910002':['https://audio.example/song-b.mp3']}),
    aniQuizSettingsV14: JSON.stringify({emqMode:'mixed',customListIds:['amq-list-7']})
  };
  const input = backup(storage);
  const restored = backupContext.validateFullBackupStorageSnapshot(input);
  assert.deepEqual(JSON.parse(JSON.stringify(restored)), storage);
  assert.deepEqual(JSON.parse(restored.aniEmqWorkListsV8254).lists[0].workIds, ['900001','900001']);
  assert.deepEqual(JSON.parse(restored.aniEmqWorkListsV8254).lists[0].vndbIds, ['v123','v123']);
  assert.deepEqual(JSON.parse(restored.aniEmqWorkListsV8254).lists[0].songIds, ['910002','910002']);
});
test('backup import rejects missing or altered key manifest before restoring custom lists', () => {
  const input = backup({aniEmqWorkListsV8254:rawListDb});
  assert.throws(()=>backupContext.validateFullBackupStorageSnapshot({...input,storageManifest:{...input.storageManifest,keys:[]}}),/manifest is missing or inconsistent|keys do not match/);
  assert.throws(()=>backupContext.validateFullBackupStorageSnapshot(backup({aniEmqWorkListsV8254:rawListDb},['aniEmqWorkListsSelectedV8254'])),/keys do not match/);
});
test('custom-list database normalization retains identity and deduplicates member ID arrays', () => {
  listStorage.set('aniEmqWorkListsV8254',rawListDb);
  const db = listContext.loadDb();
  assert.equal(db.version,1);
  assert.equal(db.lists[0].id,'emql-stable-01');
  assert.deepEqual(Array.from(db.lists[0].workIds),['900001']);
  assert.deepEqual(Array.from(db.lists[0].vndbIds),['v123']);
  assert.deepEqual(Array.from(db.lists[0].songIds),['910002']);
});
test('membership is the union of explicit work IDs, VNDB-linked works, and explicit song IDs', () => {
  const list = {workIds:['900001'],vndbIds:['v456'],songIds:['910002']};
  const actual = Array.from(listContext.listSongIds(list)).sort();
  assert.deepEqual(actual,['910001','910002','910003']);
});
test('EMQ song ID and work ID remain distinct in membership mapping', () => {
  const list = {workIds:['910001'],vndbIds:[],songIds:[]};
  assert.deepEqual(Array.from(listContext.listSongIds(list)),[],'a song ID must not accidentally match the work-ID set');
  assert.match(emqApiSource,/amqWorkIds=new Set/);
  assert.match(emqApiSource,/amqSongIds=new Set/);
  assert.match(emqApiSource,/AMQ／EMQ 歌曲 ID 衝突/);
  assert.match(emqApiSource,/找不到對應作品/);
});
test('invalid full-backup application keys are not admitted merely for sharing the EMQ prefix', () => {
  assert.throws(()=>backupContext.validateFullBackupStorageSnapshot(backup({aniEmqWorkListsInjected:'[]'})),/invalid application storage entry/);
});

console.log(`RESULT ${passed} passed, ${process.exitCode ? 1 : 0} failed`);

'use strict';
// Exact production-source contract for backup export/import and rollback.
// This uses a deterministic storage adapter in Node; native-origin acceptance remains separate.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_023.htmlpart'), 'utf8');
function extractFunction(name) {
  const match = new RegExp(`(?:async\\s+)?function\\s+${name}\\s*\\(`).exec(source);
  assert.ok(match, `function exists: ${name}`);
  const start = match.index;
  const open = source.indexOf('{', start);
  let depth = 0, quote = null, escaped = false, lineComment = false, blockComment = false;
  for (let i = open; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (lineComment) { if (c === '\n') lineComment = false; continue; }
    if (blockComment) { if (c === '*' && n === '/') { blockComment = false; i++; } continue; }
    if (quote) { if (escaped) { escaped = false; continue; } if (c === '\\') { escaped = true; continue; } if (c === quote) quote = null; continue; }
    if (c === '/' && n === '/') { lineComment = true; i++; continue; }
    if (c === '/' && n === '*') { blockComment = true; i++; continue; }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`unclosed function: ${name}`);
}
function extractInitializer(startText, endText) {
  const start = source.indexOf(startText); assert.ok(start >= 0, `initializer exists: ${startText}`);
  const end = source.indexOf(endText, start); assert.ok(end > start, `initializer ends: ${endText}`);
  return source.slice(start, end + endText.length);
}
const declarations = [
  extractInitializer('const APP_STORAGE_KEYS=new Set([', ']);'),
  extractInitializer('const APP_STORAGE_KEY_PATTERNS=[', '];'),
  "const STORAGE_EXCLUDES=new Set(['aniCoverCacheV12']);",
  extractFunction('isAppStorageKey'),
  extractFunction('validateFullBackupStorageSnapshot'),
  extractFunction('exportFullBackup'),
  extractFunction('fullRestore'),
].join('\n');
const values = new Map();
let failKey = null, failOnce = false, exportedBlob = null, reloads = 0, timers = 0, notifications = [];
const localStorage = {
  get length() { return values.size; },
  key(i) { return [...values.keys()][i] ?? null; },
  getItem(k) { return values.has(String(k)) ? values.get(String(k)) : null; },
  setItem(k, v) { k = String(k); if (failOnce && k === failKey) { failOnce = false; throw new Error('synthetic quota/write failure'); } values.set(k, String(v)); },
  removeItem(k) { values.delete(String(k)); },
};
const bodyChildren = [];
const context = {
  localStorage, window: {}, console, Blob,
  JSON, Object, Array, Number, String, Set, Map, RegExp, Error, Date, Math,
  confirm: () => true,
  notify: msg => notifications.push(String(msg)),
  setTimeout: () => { timers++; return 0; },
  location: { reload: () => { reloads++; } },
  URL: { createObjectURL: blob => { exportedBlob = blob; return 'blob:backup-test'; }, revokeObjectURL: () => {} },
  document: { body: { appendChild: x => bodyChildren.push(x) }, createElement: () => ({ click() {}, remove() {} }) },
  flushQuizHistorySummaryV1: () => {}, flushQuizTargetSummaryV80: () => {},
  __unused: null,
  quizHistoryV51: [], quizHistorySummaryV1: null, quizHistorySummaryRecoveryRawV1: null,
  quizHistorySummaryPersistenceBlockedV1: false, quizHistorySummarySaveFailedV1: false,
  quizHistorySummaryPendingV1: 0, QUIZ_HISTORY_SUMMARY_KEY_V1: 'aniQuizHistorySummaryV1',
  quizTargetSummaryV80: null, quizTargetSummaryRecoveryRawV80: null,
  library: () => ({ anime: [], songs: [] }),
};
vm.runInNewContext(declarations, context);
context.getAppStorage = () => Object.fromEntries([...values.entries()].filter(([k]) => context.isAppStorageKey(k)));
let passed = 0;
async function test(name, fn) { try { await fn(); passed++; console.log('PASS ' + name); } catch (e) { console.error('FAIL ' + name + '\n' + e.stack); process.exitCode = 1; } }
(async () => {
  await test('export writes a v10 backup with a consistent sorted storage manifest', async () => {
    values.set('aniCatalogModeV6', 'grid');
    values.set('aniQuizSettingsV14', '{"count":12}');
    values.set('unrelated-user-key', 'untouched');
    context.window.__aniSceneBackgroundsV1 = { exportBackup: async () => ({ schemaVersion: 1, assets: [], scenes: [] }), prepareBackupRestore: async data => data.scenes, restoreBackup: async () => true };
    await context.exportFullBackup();
    assert.ok(exportedBlob, 'export created a Blob');
    const data = JSON.parse(await exportedBlob.text());
    assert.equal(data.version, 10);
    assert.equal(data.backupType, 'full-user-data-and-scene-backgrounds');
    assert.deepEqual([...data.storageManifest.keys], ['aniCatalogModeV6', 'aniQuizHistory_v1', 'aniQuizSettingsV14']);
    assert.equal(data.storageManifest.keyCount, 3);
    assert.equal(data.storage['aniCatalogModeV6'], 'grid');
    assert.equal(data.storage['aniQuizHistory_v1'], '[]');
    assert.equal(values.get('unrelated-user-key'), 'untouched');
    context.lastExport = data;
  });
  await test('valid exported backup restores application keys and preserves unrelated keys', async () => {
    values.set('aniCatalogModeV6', 'list');
    values.set('aniQuizSettingsV14', '{"count":2}');
    const beforeTimers = timers;
    await context.fullRestore(context.lastExport);
    assert.equal(values.get('aniCatalogModeV6'), 'grid');
    assert.equal(values.get('aniQuizSettingsV14'), '{"count":12}');
    assert.equal(values.get('unrelated-user-key'), 'untouched');
    assert.equal(timers, beforeTimers + 1, 'reload is scheduled after successful restore');
  });
  await test('corrupt or inconsistent backup is rejected before any storage mutation', async () => {
    values.set('aniCatalogModeV6', 'keep-me');
    const before = JSON.stringify([...values.entries()].sort());
    const bad = structuredClone(context.lastExport);
    bad.storageManifest.keys.push('aniQuizSettingsV14');
    assert.throws(() => context.validateFullBackupStorageSnapshot(bad), /manifest is missing or inconsistent|keys do not match/);
    assert.equal(JSON.stringify([...values.entries()].sort()), before);
  });
  await test('write failure during restore rolls application storage back to its exact prior snapshot', async () => {
    values.clear();
    values.set('aniCatalogModeV6', 'prior-grid');
    values.set('aniQuizSettingsV14', '{"count":3}');
    values.set('unrelated-user-key', 'untouched');
    const before = JSON.stringify([...values.entries()].sort());
    failKey = 'aniQuizSettingsV14'; failOnce = true;
    await assert.rejects(context.fullRestore(context.lastExport), /完整還原失敗：synthetic quota\/write failure/);
    assert.equal(JSON.stringify([...values.entries()].sort()), before);
    assert.equal(context.window.__aniSuppressPersistenceForRestoreV828, false, 'restore suppression flag is cleared');
  });
  console.log(`RESULT ${passed} passed, ${process.exitCode ? '1+' : '0'} failed`);
})();

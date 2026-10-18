'use strict';
// Exact-source tests for the full-backup storage allowlist/manifest validator.
// Fixtures are synthetic; no browser profile or user data is accessed.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_023.htmlpart'), 'utf8');
function extractFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `exact function exists: ${name}`);
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
  extractFunction('validateFullBackupStorageSnapshot')
].join('\n');
const context = { Set, Array, Object, Number, JSON, Error, RegExp };
vm.runInNewContext(declarations, context);
let passed = 0, failed = 0;
function test(name, fn) { try { fn(); passed++; console.log('PASS ' + name); } catch (e) { failed++; console.error('FAIL ' + name + '\n' + e.stack); } }
function backup(storage, version = 10, keys = Object.keys(storage)) { return { version, storage, storageManifest: { schemaVersion: 1, keyCount: keys.length, keys } }; }
test('application storage allowlist excludes arbitrary ani-prefixed keys and cover cache', () => {
  assert.equal(context.isAppStorageKey('aniQuizSettingsV14'), true);
  assert.equal(context.isAppStorageKey('aniQuizHistorySummaryRecoveryV1_123_ab'), true);
  assert.equal(context.isAppStorageKey('aniUnregisteredSecret'), false);
  assert.equal(context.isAppStorageKey('aniCoverCacheV12'), false);
});
test('valid v10 manifest accepts only known application keys with raw string values', () => {
  const data = backup({ aniQuizSettingsV14: '{"count":10}', aniCatalogModeV6: 'grid' });
  assert.equal(JSON.stringify(context.validateFullBackupStorageSnapshot(data)), JSON.stringify(data.storage));
});
test('missing or inconsistent manifest is rejected before restore', () => {
  const good = backup({ aniQuizSettingsV14: '{}' });
  assert.throws(() => context.validateFullBackupStorageSnapshot({ version: 10, storage: good.storage }), /manifest is missing or inconsistent/);
  assert.throws(() => context.validateFullBackupStorageSnapshot(backup(good.storage, 10, [])), /manifest is missing or inconsistent/);
  assert.throws(() => context.validateFullBackupStorageSnapshot(backup(good.storage, 10, ['aniQuizSettingsV14', 'aniQuizSettingsV14'])), /manifest is missing or inconsistent|keys do not match/);
  assert.throws(() => context.validateFullBackupStorageSnapshot(backup(good.storage, 10, ['aniCatalogModeV6'])), /keys do not match/);
});
test('v10 rejects unknown keys and non-string storage values', () => {
  assert.throws(() => context.validateFullBackupStorageSnapshot(backup({ aniUnknownThing: 'x' })), /invalid application storage entry/);
  assert.throws(() => context.validateFullBackupStorageSnapshot(backup({ aniQuizSettingsV14: { count: 10 } })), /invalid application storage entry/);
});
test('empty or entirely non-application snapshots are rejected', () => {
  assert.throws(() => context.validateFullBackupStorageSnapshot(backup({})), /empty/);
  assert.throws(() => context.validateFullBackupStorageSnapshot({ version: 8, storage: { random: 'x' } }), /no valid application storage entries/);
});
test('legacy v8 snapshots retain only allowlisted string entries', () => {
  const data = { version: 8, storage: { aniQuizSettingsV14: '{"count":10}', unknown: 'ignored', aniCatalogModeV6: 7 } };
  assert.equal(JSON.stringify(context.validateFullBackupStorageSnapshot(data)), JSON.stringify({ aniQuizSettingsV14: '{"count":10}' }));
});
console.log(`RESULT ${passed} passed, ${failed} failed`);
if (failed) process.exitCode = 1;

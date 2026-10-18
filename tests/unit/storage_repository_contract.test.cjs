'use strict';
// Exact-source tests for the V82.30 storage repository. Uses synthetic in-memory
// storage only; never reads, clears, or migrates a real user profile.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/modules/storage_repository.htmlpart'), 'utf8');
assert.ok(source.startsWith('<script id="v82-30-storage-repository-v1">'), 'exact original storage repository script is present');
assert.ok(source.endsWith('</script>'), 'storage repository script wrapper is preserved');
const body = source.replace(/^<script[^>]*>/, '').replace(/<\/script>\s*$/, '');
const backing = new Map();
const localStorage = {
  get length() { return backing.size; },
  key(i) { return [...backing.keys()][i] ?? null; },
  getItem(k) { return backing.has(String(k)) ? backing.get(String(k)) : null; },
  setItem(k, v) { backing.set(String(k), String(v)); },
  removeItem(k) { backing.delete(String(k)); },
  clear() { backing.clear(); }
};
const window = {};
vm.runInNewContext(body, { window, localStorage, TextEncoder, JSON, Object, Array, String, Map, Set, TypeError, Error, RegExp });
const repo = window.__aniStorageRepositoryV1;
assert.ok(repo, 'repository API is exposed');
let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('PASS ' + name); }
  catch (error) { console.error('FAIL ' + name + '\n' + error.stack); process.exitCode = 1; }
}
async function testAsync(name, fn) {
  try { await fn(); passed++; console.log('PASS ' + name); }
  catch (error) { console.error('FAIL ' + name + '\n' + error.stack); process.exitCode = 1; }
}
(async () => {
  await testAsync('namespace key encodes user ID and rejects invalid IDs/keys', async () => {
    await assert.rejects(repo.forUser('').get('x'), /valid userId/);
    await assert.rejects(repo.forUser('bad\nuser').get('x'), /valid userId/);
    await assert.rejects(repo.forUser('u1').set('bad\0key', 1), /valid storage key/);
  });
  await testAsync('user namespaces isolate identical keys', async () => {
    const a = repo.forUser('alice'), b = repo.forUser('bob');
    await a.set('settings', { volume: 25 });
    assert.equal(JSON.stringify(await a.get('settings')), JSON.stringify({ volume: 25 }));
    assert.equal(await b.get('settings'), null);
    assert.equal(JSON.stringify(await a.keys()), JSON.stringify(['settings']));
    assert.equal(JSON.stringify(await b.keys()), JSON.stringify([]));
  });
  await testAsync('snapshot preserves raw serialized values and selected keys', async () => {
    const a = repo.forUser('snapshot-user');
    await a.set('one', { n: 1 }); await a.set('two', [2]);
    const snap = await a.snapshot(['two', 'missing', 'one', 'two']);
    assert.equal(snap.version, 1); assert.equal(snap.userId, 'snapshot-user');
    assert.equal(JSON.stringify(Object.keys(snap.values).sort()), JSON.stringify(['one', 'two']));
    assert.equal(snap.values.one, '{"n":1}');
  });
  await testAsync('transaction applies set and delete atomically on success', async () => {
    const a = repo.forUser('transaction-user');
    await a.set('keep', 1); await a.set('remove', 2);
    const result = await a.transaction({ keep: 3, add: { ok: true }, remove: undefined });
    assert.equal(JSON.stringify(result), JSON.stringify({ ok: true, changed: 3 }));
    assert.equal(await a.get('keep'), 3); assert.deepEqual(await a.get('add'), { ok: true });
    assert.equal(await a.get('remove'), null);
  });
  await testAsync('transaction rolls back earlier writes when adapter fails once', async () => {
    const values = new Map(); let fail = true;
    const adapter = {
      async getItem(k) { return values.has(k) ? values.get(k) : null; },
      async setItem(k, v) { if (k.endsWith(':second') && fail) { fail = false; throw new Error('synthetic write failure'); } values.set(k, String(v)); },
      async removeItem(k) { values.delete(k); },
      async keys() { return [...values.keys()]; }
    };
    repo.registerAdapter('test-fail-once', adapter);
    const a = repo.forUser('rollback-user', 'test-fail-once');
    await a.set('first', 'before');
    const result = await a.transaction({ first: 'after', second: 'never' });
    assert.equal(result.ok, false); assert.equal(result.rollbackComplete, true);
    assert.match(result.error, /synthetic write failure/);
    assert.equal(await a.get('first'), 'before'); assert.equal(await a.get('second'), null);
  });
  await testAsync('legacy import is allowlisted, validates first and preserves originals', async () => {
    localStorage.setItem('aniCatalogModeV6', 'grid');
    localStorage.setItem('aniQuizSettingsV14', JSON.stringify({ count: 10 }));
    localStorage.setItem('unrelated-secret', 'leave-me-alone');
    const preview = await repo.previewLegacyImport();
    assert.equal(preview.canImport, true);
    const imported = await repo.importLegacyData('migration-user');
    assert.equal(imported.count, 2);
    assert.equal(localStorage.getItem('aniCatalogModeV6'), 'grid');
    assert.equal(localStorage.getItem('unrelated-secret'), 'leave-me-alone');
    const user = repo.forUser('migration-user');
    assert.equal(await user.get('aniCatalogModeV6'), 'grid');
    assert.equal(JSON.stringify(await user.get('aniQuizSettingsV14')), JSON.stringify({ count: 10 }));
  });
  await testAsync('legacy import refuses non-allowlisted keys and non-empty target scope', async () => {
    await assert.rejects(repo.importLegacyData('migration-user', ['unrelated-secret']), /not allowlisted/);
    await assert.rejects(repo.importLegacyData('migration-user'), /not empty/);
  });
  await testAsync('invalid legacy JSON blocks import before any namespaced write', async () => {
    localStorage.setItem('aniSongTags_v1', '{broken');
    const preview = await repo.previewLegacyImport();
    assert.equal(preview.canImport, false);
    await assert.rejects(repo.importLegacyData('invalid-migration-user'), /Invalid legacy storage value/);
    assert.equal(JSON.stringify(await repo.forUser('invalid-migration-user').keys()), JSON.stringify([]));
  });
  await testAsync('registered adapter must implement all required methods', async () => {
    assert.throws(() => repo.registerAdapter('bad-adapter', { getItem() {} }), /missing method/);
    assert.throws(() => repo.registerAdapter('localStorage', {}), /Invalid or reserved/);
    assert.throws(() => repo.setDefaultAdapter('does-not-exist'), /Unknown storage adapter/);
    assert.equal(repo.getDefaultAdapter(), 'localStorage');
  });
  console.log(`RESULT ${passed} passed, ${process.exitCode ? '1+' : '0'} failed`);
})();

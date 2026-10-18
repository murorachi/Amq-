'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '../..');
const modulePath = path.join(root, 'src/modules/amq_valid_anime_ids.htmlpart');
const hostPath = path.join(root, 'src/scripts/script_025.htmlpart');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'reports/FRAGMENT_MANIFEST.json'), 'utf8'));
const entry = manifest.modules.find(x => x.path === 'src/modules/amq_valid_anime_ids.htmlpart');
assert.ok(entry, 'module is registered in the manifest');
const source = fs.readFileSync(modulePath);
assert.equal(source.length, entry.byte_length, 'module byte length matches manifest');
assert.equal(crypto.createHash('sha256').update(source).digest('hex'), entry.sha256, 'module SHA-256 matches manifest');
const host = fs.readFileSync(hostPath, 'utf8');
assert.equal((host.match(/<!-- AMQ_SPLIT_MODULE:amq_valid_anime_ids -->/g) || []).length, 1,
  'host fragment contains exactly one original insertion marker');

const catalog = new Set(['0', '1', '2', 'true', 'null']);
const context = {
  getAnimeById(id) {
    return catalog.has(String(id)) ? { id: String(id) } : null;
  }
};
vm.createContext(context);
vm.runInContext(source.toString('utf8') + '\n;globalThis.__validAnimeIdsContract = validAnimeIds;', context);
const validAnimeIds = ids => Array.from(context.__validAnimeIdsContract(ids));
const cases = [
  ['stringifies numeric IDs and deduplicates numeric/string aliases', () =>
    assert.deepEqual(validAnimeIds([1, '1', 2, '2']), ['1', '2'])],
  ['filters IDs absent from the anime catalog', () =>
    assert.deepEqual(validAnimeIds([1, 999, 2, 'missing']), ['1', '2'])],
  ['preserves first-seen order after deduplication', () =>
    assert.deepEqual(validAnimeIds([2, 1, 2, '1', 0]), ['2', '1', '0'])],
  ['stringifies before deduplication for non-string IDs', () =>
    assert.deepEqual(validAnimeIds([true, 'true', null, 'null']), ['true', 'null'])],
  ['empty array returns an empty array', () =>
    assert.deepEqual(validAnimeIds([]), [])],
  ['rejects null input by throwing rather than silently changing contract', () =>
    assert.throws(() => validAnimeIds(null), /map/)],
  ['rejects non-array object input by throwing rather than silently changing contract', () =>
    assert.throws(() => validAnimeIds({ ids: [1] }), /map/)]
];
for (const [name, run] of cases) {
  run();
  console.log('PASS: ' + name);
}
console.log('PASS amq_valid_anime_ids module contract');
console.log('assertions=' + (cases.length + 4));

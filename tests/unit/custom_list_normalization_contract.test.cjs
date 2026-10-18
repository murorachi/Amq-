'use strict';
// Exact-source contract tests for the existing AMQ custom-list reader.
// This deliberately does not alter production code: V82.82 output must remain byte-identical.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_028.htmlpart'), 'utf8');

function extractFunction(name) {
  const start = source.indexOf('function ' + name + '(');
  assert.ok(start >= 0, 'exact function exists: ' + name);
  const open = source.indexOf('{', start);
  let depth = 0, quote = null, escaped = false, lineComment = false, blockComment = false;
  for (let i = open; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (lineComment) { if (c === '\n') lineComment = false; continue; }
    if (blockComment) { if (c === '*' && n === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (c === '\\') { escaped = true; continue; }
      if (c === quote) quote = null;
      continue;
    }
    if (c === '/' && n === '/') { lineComment = true; i++; continue; }
    if (c === '/' && n === '*') { blockComment = true; i++; continue; }
    if (c === "'" || c === '"' || c === '\`') { quote = c; continue; }
    if (c === '{') depth++;
    if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error('unclosed function: ' + name);
}

let payload;
const context = {
  Array, String, Set,
  readJson(key, fallback) {
    assert.equal(key, 'aniCustomPracticeListsV1');
    return payload === undefined ? fallback : payload;
  }
};
vm.createContext(context);
vm.runInContext(extractFunction('readCustomLists') + '\nglobalThis.__readCustomLists = readCustomLists;', context);

const tests = [
  ['legacy array payload remains supported', () => {
    payload = [{ id: 'legacy', name: 'Old', animeIds: ['12', 13] }];
    assert.deepEqual(JSON.parse(JSON.stringify(context.__readCustomLists())), [
      { id: 'legacy', name: 'Old', animeIds: ['12', '13'] }
    ]);
  }],
  ['object payload with lists remains supported', () => {
    payload = { version: 1, lists: [{ id: 'x', animeIds: ['a'] }] };
    assert.deepEqual(JSON.parse(JSON.stringify(context.__readCustomLists())), [
      { id: 'x', name: '自訂清單', animeIds: ['a'] }
    ]);
  }],
  ['missing IDs use stable row-index fallback', () => {
    payload = { lists: [{ animeIds: [] }, { id: null, name: 'B', animeIds: [] }] };
    assert.deepEqual(JSON.parse(JSON.stringify(context.__readCustomLists())), [
      { id: '0', name: '自訂清單', animeIds: [] },
      { id: '1', name: 'B', animeIds: [] }
    ]);
  }],
  ['numeric IDs and anime IDs are stringified', () => {
    payload = [{ id: 7, name: 'N', animeIds: [1, 2] }];
    assert.deepEqual(JSON.parse(JSON.stringify(context.__readCustomLists())), [
      { id: '7', name: 'N', animeIds: ['1', '2'] }
    ]);
  }],
  ['duplicate anime IDs are removed while preserving first occurrence', () => {
    payload = [{ animeIds: ['4', 4, '5', '4', 5] }];
    assert.deepEqual(JSON.parse(JSON.stringify(context.__readCustomLists())), [
      { id: '0', name: '自訂清單', animeIds: ['4', '5'] }
    ]);
  }],
  ['rows without an animeIds array are ignored', () => {
    payload = [null, false, 'bad', {}, { animeIds: '1' }, { animeIds: null }, { animeIds: ['ok'] }];
    assert.deepEqual(JSON.parse(JSON.stringify(context.__readCustomLists())), [
      { id: '0', name: '自訂清單', animeIds: ['ok'] }
    ]);
  }],
  ['malformed object payload yields empty list', () => {
    payload = { items: [{ animeIds: ['not-read'] }] };
    assert.deepEqual(JSON.parse(JSON.stringify(context.__readCustomLists())), []);
  }],
  ['missing storage payload uses the existing empty fallback', () => {
    payload = undefined;
    assert.deepEqual(JSON.parse(JSON.stringify(context.__readCustomLists())), []);
  }]
];

let passed = 0, failed = 0;
for (const [name, run] of tests) {
  try { run(); passed++; console.log('PASS ' + name); }
  catch (error) { failed++; console.error('FAIL ' + name + '\n' + error.stack); }
}
console.log('RESULT ' + passed + ' passed, ' + failed + ' failed');
if (failed) process.exitCode = 1;

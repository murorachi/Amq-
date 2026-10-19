'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const zlib = require('node:zlib');

const source = fs.readFileSync('src/scripts/script_037.htmlpart', 'utf8');
const openTag = '<script type="application/octet-stream" id="emqLibraryGzipBase64V8248">';
const closeTag = '</script>';
assert.equal(source.split(openTag).length - 1, 1,
  'embedded EMQ payload has exactly one expected wrapper');
const start = source.indexOf(openTag) + openTag.length;
const end = source.indexOf(closeTag, start);
assert.ok(end > start, 'embedded EMQ payload has a closing script tag');
const base64 = source.slice(start, end).trim();
assert.match(base64, /^[A-Za-z0-9+/]+={0,2}$/,
  'embedded payload contains base64 only');
assert.ok(base64.startsWith('H4sI'),
  'embedded base64 decodes from the expected gzip stream format');

const jsonBytes = zlib.gunzipSync(Buffer.from(base64, 'base64'));
const payload = JSON.parse(jsonBytes.toString('utf8'));
assert.equal(payload.version, 1, 'embedded catalogue schema version is supported');
assert.ok(Array.isArray(payload.works) && payload.works.length > 0,
  'embedded catalogue has work records');
assert.ok(Array.isArray(payload.songs) && payload.songs.length > 0,
  'embedded catalogue has song records');

const workIds = new Set();
for (const work of payload.works) {
  const id = Number(work && work.i);
  assert.ok(Number.isSafeInteger(id) && id > 0,
    'every embedded work has a positive safe integer ID');
  assert.ok(!workIds.has(String(id)),
    'embedded work IDs are unique');
  workIds.add(String(id));
}

const songIds = new Set();
for (const song of payload.songs) {
  const id = Number(song && song.i);
  const workId = Number(song && song.w);
  assert.ok(Number.isSafeInteger(id) && id > 0,
    'every embedded song has a positive safe integer ID');
  assert.ok(!songIds.has(String(id)),
    'embedded song IDs are unique');
  songIds.add(String(id));
  assert.ok(Number.isSafeInteger(workId) && workIds.has(String(workId)),
    'every embedded song references an existing work');
}

console.log('PASS embedded EMQ payload integrity: ' +
  'works=' + payload.works.length +
  ' songs=' + payload.songs.length +
  ' compressedBase64Chars=' + base64.length +
  ' decompressedBytes=' + jsonBytes.length);

'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '../..');
const fragmentPath = path.join(root, 'src/scripts/script_001.htmlpart');
const modulePath = path.join(root, 'src/modules/anime_song_database.htmlpart');
const manifestPath = path.join(root, 'reports/FRAGMENT_MANIFEST.json');
const sha256 = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');
const fragment = fs.readFileSync(fragmentPath);
const moduleBytes = fs.readFileSync(modulePath);
const marker = Buffer.from('<!-- AMQ_SPLIT_MODULE:anime_song_database -->');
const originalFragmentBytes = 5078176;
const originalFragmentSha256 = 'f838aea1ca5b263cf932edecf1345aad6c15e9578098c58b724f9e2c9e679af7';
const originalModuleBytes = 4975240;
const originalModuleSha256 = '2fe9bbcc2c0710e4a109faf95b0703655bbf05eb65c5be180ac1f296e0f5845a';

assert.equal(fragment.toString('utf8').split(marker.toString()).length - 1, 1, 'exactly one module marker');
assert.equal(moduleBytes.length, originalModuleBytes, 'module byte length preserved');
assert.equal(sha256(moduleBytes), originalModuleSha256, 'module bytes match the captured initializer fingerprint');
assert.ok(moduleBytes.subarray(0, 7).equals(Buffer.from('let DB=')), 'classic-script let binding retained');
assert.equal(moduleBytes.subarray(-3).toString('utf8'), ']};', 'initializer terminator retained');

const markerIndex = fragment.indexOf(marker);
assert.ok(markerIndex > 0, 'marker occurs inside script_001');
const rebuiltFragment = Buffer.concat([
  fragment.subarray(0, markerIndex),
  moduleBytes,
  fragment.subarray(markerIndex + marker.length),
]);
assert.equal(rebuiltFragment.length, originalFragmentBytes, 'reconstructed script_001 byte length matches pre-extraction source');
assert.equal(sha256(rebuiltFragment), originalFragmentSha256, 'reconstructed script_001 is byte-identical to pre-extraction source');

const consumerText = 'let anime=DB.anime,songs=DB.songs,byAnime=new Map(),songMap=new Map();';
const consumerIndex = rebuiltFragment.indexOf(Buffer.from(consumerText));
assert.ok(consumerIndex > markerIndex + moduleBytes.length, 'DB consumers remain after initializer');
assert.ok(rebuiltFragment.subarray(0, markerIndex).toString('utf8').includes('<script>'), 'initializer remains in original classic script block');

const shape = vm.runInNewContext(`${moduleBytes.toString('utf8')}\n;({keys:Object.keys(DB).sort(), animeCount:DB.anime.length, songCount:DB.songs.length, animeLengths:[...new Set(DB.anime.map(row=>row.length))], songLengths:[...new Set(DB.songs.map(row=>row.length))], animeFirst:DB.anime[0][0], animeLast:DB.anime.at(-1)[0], songFirst:DB.songs[0][0], songLast:DB.songs.at(-1)[0]})`, { console }, { timeout: 30000 });
assert.deepEqual(Array.from(shape.keys), ['anime', 'songs'], 'DB top-level object shape');
assert.equal(shape.animeCount, 9516, 'anime row count');
assert.equal(shape.songCount, 38821, 'song row count');
assert.deepEqual(Array.from(shape.animeLengths), [7], 'all anime rows preserve seven-field schema');
assert.deepEqual(Array.from(shape.songLengths), [12], 'all song rows preserve twelve-field schema');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const moduleRecord = manifest.modules.find((item) => item.name === 'anime_song_database');
assert.ok(moduleRecord, 'manifest includes the extracted data module');
assert.equal(moduleRecord.byte_length, moduleBytes.length, 'manifest module byte length');
assert.equal(moduleRecord.sha256, sha256(moduleBytes), 'manifest module SHA-256');
assert.equal(manifest.module_count, manifest.modules.length, 'manifest module count');

console.log('PASS anime/song DB initializer extraction contract');
console.log('assertions=19 anime_rows=9516 song_rows=38821 original_script_001_bytes=5078176');

'use strict';
// Exact-source contract and behavioral characterization for the small, cohesive
// answer-metadata helpers moved out of script_004. Runtime scope is intentionally
// unchanged: these functions still resolve the same IIFE bindings at their old position.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const fragmentPath = path.join(root, 'src/scripts/script_004.htmlpart');
const modulePath = path.join(root, 'src/modules/quiz_answer_metadata.htmlpart');
const manifestPath = path.join(root, 'reports/FRAGMENT_MANIFEST.json');
const fragment = fs.readFileSync(fragmentPath);
const moduleBytes = fs.readFileSync(modulePath);
const source = moduleBytes.toString('utf8');
const sha256 = b => crypto.createHash('sha256').update(b).digest('hex');
const markerText = '<!-- AMQ_SPLIT_MODULE:quiz_answer_metadata -->';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const record = manifest.modules.find(x => x.name === 'quiz_answer_metadata');
let assertions = 0;
function check(name, condition) { assert.ok(condition, name); assertions++; console.log('PASS ' + name); }
check('module manifest record exists', !!record);
check('module bytes and SHA-256 match manifest', record.byte_length === moduleBytes.length && record.sha256 === sha256(moduleBytes));
check('marker appears exactly once', fragment.toString('utf8').split(markerText).length - 1 === 1);
let reconstructed = fragment;
const marker = Buffer.from(markerText);
const at = reconstructed.indexOf(marker);
check('marker exists in script_004', at >= 0);
reconstructed = Buffer.concat([reconstructed.subarray(0, at), moduleBytes, reconstructed.subarray(at + marker.length)]);
check('restored script_004 equals pre-extraction V82.78 fingerprint', reconstructed.length === 96064 && sha256(reconstructed) === '0238143578f96dc2a7a3b2dea34acd214f4ad922c11a5ba4a087708fe69f5ac7');
check('module contains exactly the three intended declarations', ['uniqueQuizNamesV8239','getQuizAnimeNameBundleV8239','quizSongRoleLabelV8239'].every(n => (source.match(new RegExp('function ' + n + '\\(', 'g')) || []).length === 1));
check('module adds no import/export or wrapper', !/\b(?:import|export)\b/.test(source) && !source.startsWith('(()=>'));

const anime = [12, 'Example Anime', 'Example Romaji', 'Spring 2020', 'TV', 2020, 'mal12'];
const context = vm.createContext({
  byAnime: new Map([[12, anime]]),
  window: { __aniChineseTitleAPIv8237: { getTitle: id => String(id) === '12' ? '範例動畫' : '', getAliases: id => String(id) === '12' ? ['Example Anime', 'EXAMPLE ROMAJI', '例子'] : [] } },
  String, Number, Set, Array, Object, Map, Math, RegExp
});
vm.runInContext(source + '\nglobalThis.api={uniqueQuizNamesV8239,getQuizAnimeNameBundleV8239,quizSongRoleLabelV8239};', context, { timeout: 1000 });
const api = context.api;
check('name deduplication normalizes NFKC and case but preserves first display value', JSON.stringify(Array.from(api.uniqueQuizNamesV8239([' ＡＢＣ ', 'abc', 'Alpha', 'ALPHA', '', null]))) === JSON.stringify(['ＡＢＣ', 'Alpha']));
check('name bundle maps anime row and Chinese title', api.getQuizAnimeNameBundleV8239(12).english === 'Example Anime' && api.getQuizAnimeNameBundleV8239(12).chinese === '範例動畫');
check('name bundle deduplicates aliases using normalized keys', JSON.stringify(Array.from(api.getQuizAnimeNameBundleV8239(12).aliases)) === JSON.stringify(['Example Anime', 'Example Romaji', '範例動畫', '例子']));
check('unknown anime bundle remains safe and empty', api.getQuizAnimeNameBundleV8239(999).row === undefined && api.getQuizAnimeNameBundleV8239(999).english === '');
check('opening and ending song role labels include positive track number', api.quizSongRoleLabelV8239([1,2,1,3]) === 'OP 3' && api.quizSongRoleLabelV8239([1,2,2,2]) === 'ED 2');
check('non-opening roles do not append track number', api.quizSongRoleLabelV8239([1,2,3,4]) === '插入歌' && api.quizSongRoleLabelV8239([1,2,5,0]) === '其他');
check('invalid role maps to unlabelled fallback', api.quizSongRoleLabelV8239([1,2,99,1]) === '未標示');
console.log(`RESULT ${assertions} assertions passed; module_bytes=${moduleBytes.length} module_sha256=${sha256(moduleBytes)}`);

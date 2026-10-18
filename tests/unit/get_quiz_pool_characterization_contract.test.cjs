'use strict';
// Source layout contract for the pure candidate calculation and thin DOM adapter.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const fragmentPath = path.join(root, 'src/scripts/script_004.htmlpart');
const modulePath = path.join(root, 'src/modules/get_quiz_pool.htmlpart');
const fixturePath = path.join(root, 'tests/fixtures/get_quiz_pool_v82_79.js');
const manifestPath = path.join(root, 'reports/FRAGMENT_MANIFEST.json');
const fragment = fs.readFileSync(fragmentPath);
const moduleBytes = fs.readFileSync(modulePath);
const originalBytes = fs.readFileSync(fixturePath);
const marker = Buffer.from('<!-- AMQ_SPLIT_MODULE:get_quiz_pool -->');
const sha256 = b => crypto.createHash('sha256').update(b).digest('hex');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
let assertions = 0;
function check(name, condition) { assert.ok(condition, name); assertions++; console.log('PASS ' + name); }
function ordered(name, tokens, source = moduleBytes.toString('utf8')) {
  let cursor = -1;
  for (const token of tokens) { const at = source.indexOf(token, cursor + 1); assert.ok(at > cursor, `${name}: ${token}`); cursor = at; }
  assertions++; console.log('PASS ' + name);
}
const record = manifest.modules.find(x => x.name === 'get_quiz_pool');
const metadata = manifest.modules.find(x => x.name === 'quiz_answer_metadata');
check('module manifest record exists', !!record);
check('module byte length and SHA-256 match manifest', record.byte_length === moduleBytes.length && record.sha256 === sha256(moduleBytes));
check('original V82.79 characterization fixture has captured fingerprint', originalBytes.length === 2824 && sha256(originalBytes) === '2f1508935bb6c6c8622baf015a156334b4a2bff3572d8f1f5adab6f6637b11bf');
check('module marker appears exactly once', fragment.toString('utf8').split(marker.toString()).length - 1 === 1);
let reconstructed = fragment;
const metadataMarker = Buffer.from(metadata.marker);
const metadataBytes = fs.readFileSync(path.join(root, metadata.path));
const metadataIndex = reconstructed.indexOf(metadataMarker);
check('metadata marker exists for layered reconstruction', metadataIndex >= 0);
reconstructed = Buffer.concat([reconstructed.subarray(0, metadataIndex), metadataBytes, reconstructed.subarray(metadataIndex + metadataMarker.length)]);
check('restoring metadata reconstructs V82.78 fragment size', reconstructed.length === 96064);
check('restoring metadata reconstructs V82.78 fragment fingerprint', sha256(reconstructed) === '0238143578f96dc2a7a3b2dea34acd214f4ad922c11a5ba4a087708fe69f5ac7');
const poolIndex = reconstructed.indexOf(marker);
check('getQuizPool insertion marker remains', poolIndex >= 0);
reconstructed = Buffer.concat([reconstructed.subarray(0, poolIndex), originalBytes, reconstructed.subarray(poolIndex + marker.length)]);
check('fixture restores historical V82.77 fragment size', reconstructed.length === 98849);
check('fixture restores historical V82.77 fragment fingerprint', sha256(reconstructed) === '23dacccdc25538416c4ddba91f4e044df7c4491924d1099d8cdf0a60fb4f4bdc');
const fn = moduleBytes.toString('utf8');
check('module has one pure calculator and one wrapper', (fn.match(/function calculateQuizPoolCandidatesV8280\(ctx\)\{/g) || []).length === 1 && (fn.match(/function getQuizPool\(\)\{/g) || []).length === 1);
check('pure calculator receives explicit dependency context', fn.startsWith('function calculateQuizPoolCandidatesV8280(ctx){') && fn.includes('const {songs,anime,byAnime,quizSettings,chosenPool'));
check('pure calculator does not access DOM, window, or storage', !/\b(document|window|localStorage|sessionStorage|indexedDB)\b/.test(fn.slice(0, fn.indexOf('function getQuizPool'))));
check('empty focus scope returns empty candidates and diagnostic value', fn.includes('if(activeFocusMode){') && fn.includes('return {pool:[],diagnostic:'));
check('normal filter order remains fixed', ['quickPoolAllowed(', 'statusAllowed(', 'const a=byAnime.get(s[0]);if(!a)return false', 'watchStatusAllowed(', 'metadataAllowed(', 'tagAllowed(', 'watchlistAllowed(', 'repeatAllowed(s[1],!!quizSettings.noRepeat,roundSeen,lastQuestionId)'].every(x => fn.indexOf(x) >= 0) && fn.indexOf('quickPoolAllowed(') < fn.indexOf('statusAllowed(') && fn.indexOf('statusAllowed(') < fn.indexOf('metadataAllowed('));
ordered('filter pipeline order is explicitly represented', ['quickPoolAllowed(', 'statusAllowed(', 'watchStatusAllowed(', 'metadataAllowed(', 'tagAllowed(', 'watchlistAllowed(', 'repeatAllowed(']);
check('metadata mapping retains AMQ source and original tuple indices', fn.includes("metadataAllowed({source:'amq',year:a[5],season:a[3],animeType:a[4],songType:s[2],difficulty:s[6]},quizSettings)"));
check('watchlist membership checks anime ID and alternate key', fn.includes("const keys=[String(a[0]),String(a[6]||'')].filter(Boolean)"));
check('empty pool diagnostic never broadens filters', fn.includes('系統不會自動放寬範圍'));
check('DOM status writes are confined to wrapper', fn.slice(fn.indexOf('function getQuizPool')).includes("document.getElementById('quizStatus').textContent=result.diagnostic"));
check('wrapper passes policy and shared state through explicit context', fn.includes('policy:window.__aniCandidatePoolPolicyV8265') && fn.includes('activeFocusMode:activeFocusModeV72'));
check('classic-script scope is preserved without imports or exports', !/\b(?:import|export)\b/.test(fn) && !fn.startsWith('(()=>'));
check('manifest module count is consistent', manifest.module_count === manifest.modules.length);
console.log(`RESULT ${assertions} assertions passed; module_bytes=${moduleBytes.length} module_sha256=${sha256(moduleBytes)} historical_fragment_bytes=${reconstructed.length}`);

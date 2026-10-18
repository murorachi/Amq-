'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const fragment = fs.readFileSync(path.join(root, 'src/scripts/script_004.htmlpart'));
const moduleBytes = fs.readFileSync(path.join(root, 'src/modules/quiz_suggestion_controller.js'));
const marker = Buffer.from('<!-- AMQ_SPLIT_MODULE:quiz_suggestion_controller -->');
const sha256 = (b) => crypto.createHash('sha256').update(b).digest('hex');
const expectedModuleBytes = 2790;
const expectedModuleSha256 = '70f84947c115d4f787c15b0a867c2f1a79f2a4d017334b4069321dca17744aaf';
assert.equal(fragment.toString('utf8').split(marker.toString()).length - 1, 1, 'exactly one controller module marker');
assert.equal(moduleBytes.length, expectedModuleBytes, 'controller module byte length matches captured source');
assert.equal(sha256(moduleBytes), expectedModuleSha256, 'controller module fingerprint matches captured source');
assert.equal(fragment.toString('utf8').split(marker.toString()).length - 1, 1, 'controller marker occurs exactly once inside script_004');
const getQuizPoolMarker = '<!-- AMQ_SPLIT_MODULE:get_quiz_pool -->';
assert.equal(fragment.toString('utf8').split(getQuizPoolMarker).length - 1, 1, 'getQuizPool marker remains uniquely placed');
const source = moduleBytes.toString('utf8');
for (const [needle, label] of [
 ['function answerField()', 'answer target resolution remains in controller'],
 ['function targetOptions()', 'AMQ/EMQ target catalog remains in controller'],
 ['let optionCache={}', 'suggestion catalog cache remains in controller'],
 ["function closeQuizSuggestions()", 'list close and ARIA reset remain in controller'],
 ['function selectQuizSuggestionV8272(value,source)', 'shared selection contract remains in controller'],
 ["input.dispatchEvent(new Event('input',{bubbles:true}))", 'selection dispatches the legacy bubbling input event'],
 ["input.dataset.imeComposing==='1'", 'selection refuses IME composition'],
 ['window.__aniSelectQuizSuggestionV8272=selectQuizSuggestionV8272', 'selection bridge remains exported for the legacy click handler']
]) assert.ok(source.includes(needle), label);
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'reports/FRAGMENT_MANIFEST.json'), 'utf8'));
const rec = manifest.modules.find((x) => x.name === 'quiz_suggestion_controller');
assert.ok(rec, 'manifest registers controller module');
assert.equal(rec.byte_length, moduleBytes.length, 'manifest byte length matches controller module');
assert.equal(rec.sha256, sha256(moduleBytes), 'manifest SHA-256 matches controller module');
assert.equal(manifest.module_count, manifest.modules.length, 'manifest module count is consistent');
console.log('PASS quiz suggestion controller extraction contract');
console.log(`assertions=15 module_bytes=${moduleBytes.length} script_004_bytes=${fragment.length}`);

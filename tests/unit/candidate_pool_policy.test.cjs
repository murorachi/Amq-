'use strict';
// Tests the exact V82.65 policy block extracted from the preserved source fragment.
// No browser or product-code rewrite is involved; window is a minimal VM host.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const sourcePath = path.resolve(__dirname, '../../src/modules/candidate_pool_policy.js');
const source = fs.readFileSync(sourcePath, 'utf8');
const begin = '/* V82.65_POOL_POLICY_BEGIN: shared candidate-pool decisions for solo and multiplayer UI. */';
const end = '/* V82.65_POOL_POLICY_END */';
const a = source.indexOf(begin), b = source.indexOf(end, a);
assert.ok(a >= 0 && b > a, 'candidate policy sentinels exist in source');
const policySource = source.slice(a, b + end.length);
const context = { window: {} };
vm.runInNewContext(policySource, context, { timeout: 1000, filename: 'candidate-pool-policy.js' });
const p = context.window.__aniCandidatePoolPolicyV8265;
assert.ok(p && Object.isFrozen(p), 'policy is installed and frozen');
let passed = 0;
function test(name, fn) { fn(); passed++; console.log(`PASS ${name}`); }
function eq(name, actual, expected) { test(name, () => assert.equal(actual, expected)); }
function yes(name, actual) { eq(name, actual, true); }
function no(name, actual) { eq(name, actual, false); }

eq('unknown source mode fails closed to AMQ', p.normalizeSourceMode('bogus'), 'amq');

eq('mixed mode admits AMQ', p.sourceAllowed('mixed', 'amq'), true);

eq('mixed mode admits EMQ', p.sourceAllowed('mixed', 'emq'), true);

eq('AMQ mode rejects EMQ', p.sourceAllowed('amq', 'emq'), false);

eq('EMQ mode rejects AMQ', p.sourceAllowed('emq', 'amq'), false);

eq('unknown source rejected', p.sourceAllowed('mixed', 'other'), false);

eq('numeric primitive accepted', p.candidateNumber(12), 12);

eq('decimal string accepted', p.candidateNumber(' 1.25 '), 1.25);

eq('scientific notation accepted', p.candidateNumber('1e2'), 100);

eq('empty string is missing, not numeric', p.candidateNumber(''), null);

eq('boolean is not numeric', p.candidateNumber(true), null);

eq('array is not numeric', p.candidateNumber([]), null);

eq('infinity is rejected', p.candidateNumber('Infinity'), null);

eq('NaN is rejected', p.candidateNumber(NaN), null);

eq('missing song type maps to type 5', p.songTypeAllowed(null, [5]), true);

eq('song type zero maps to type 5', p.songTypeAllowed(0, [5]), true);

eq('malformed song type rejected', p.songTypeAllowed(true, [1,2,3,4,5]), false);

eq('fractional song type rejected', p.songTypeAllowed(2.5), false);

eq('missing setting uses fallback', p.settingNumber(undefined, 7), 7);

eq('malformed setting rejected', p.settingNumber('oops', 7), null);

eq('undefined lower bound uses default', p.rangeBound(undefined, 0), 0);

eq('malformed lower bound rejected', p.rangeBound('oops', 0), null);

eq('missing difficulty allowed as unknown', p.difficultyAllowed(null, 0, 100), true);

eq('negative difficulty rejected', p.difficultyAllowed(-1, 0, 100), false);

eq('zero difficulty treated as unknown/allowed', p.difficultyAllowed(0, 50, 60), true);

eq('difficulty in range allowed', p.difficultyAllowed(50, 20, 60), true);

eq('difficulty out of range rejected', p.difficultyAllowed(70, 20, 60), false);

eq('invalid difficulty range rejected', p.difficultyAllowed(50, 70, 20), false);

eq('hard difficulty upper boundary included', p.hardDifficultyAllowed(20, 0, 20), true);

eq('hard difficulty above boundary rejected', p.hardDifficultyAllowed(20.1, 0, 20), false);

eq('unknown year included by default', p.yearAllowed(null, 1990, 2000), true);

eq('unknown year excluded when requested', p.yearAllowed(null, 1990, 2000, false), false);

eq('year zero follows unknown policy', p.yearAllowed(0, 1990, 2000, false), false);

eq('year boundary included', p.yearAllowed(2000, 1990, 2000, false), true);

eq('fractional year rejected', p.yearAllowed(1999.5, 1990, 2000), false);

eq('malformed year rejected', p.yearAllowed('2000x', 1990, 2000), false);

eq('unknown season allowed by default list', p.seasonAllowed(null, ['Winter']), true);

eq('season prefix parsed', p.seasonAllowed('Spring 2001', ['Spring']), true);

eq('season mismatch rejected', p.seasonAllowed('Fall 2001', ['Spring']), false);

eq('known anime type retained', p.animeTypeAllowed('OVA', ['OVA']), true);

eq('unknown anime type maps to Other', p.animeTypeAllowed('Web special', ['Other']), true);

eq('invalid status rejected', p.statusAllowed(4), false);

eq('status zero accepted', p.statusAllowed('0', [0]), true);

eq('quick pool all accepts status zero', p.quickPoolAllowed(0, '', 50, 'all', 'amq'), true);

eq('quick pool unmarked requires status zero', p.quickPoolAllowed(1, '', 50, 'unmarked', 'amq'), false);

eq('quick pool heard accepts status one', p.quickPoolAllowed(1, '', 50, 'heard', 'amq'), true);

eq('quick pool tagged requires tag', p.quickPoolAllowed(0, 'tag-a', 50, 'tagged', 'amq'), true);

eq('quick pool tagged rejects blank tag', p.quickPoolAllowed(0, '  ', 50, 'tagged', 'amq'), false);

eq('hard quick pool AMQ requires unmarked and difficulty <=20', p.quickPoolAllowed(0, '', 20, 'hard', 'amq'), true);

eq('hard quick pool AMQ rejects marked song', p.quickPoolAllowed(1, '', 10, 'hard', 'amq'), false);

eq('hard quick pool EMQ does not apply AMQ status/difficulty restriction', p.quickPoolAllowed(2, '', 90, 'hard', 'emq'), true);

eq('unknown quick pool rejected', p.quickPoolAllowed(0, '', 1, 'unknown', 'amq'), false);

eq('required tag rejects blank', p.tagAllowed('', true, ''), false);

eq('tag query is case-insensitive', p.tagAllowed('StudyTag', false, 'studytag'), true);

eq('disabled watchlist filter does not constrain', p.watchStatusAllowed(null, false, []), true);

eq('enabled watchlist requires exact selected status', p.watchStatusAllowed('watching', true, ['watching']), true);

eq('enabled watchlist rejects empty selection', p.watchStatusAllowed('watching', true, []), false);

eq('watchlist membership only when enabled', p.watchlistAllowed(false, false), true);

eq('enabled watchlist requires member', p.watchlistAllowed(true, true), true);

eq('blacklist rejects blocked item', p.blacklistAllowed(true), false);

eq('repeat filter rejects previously seen ID', p.repeatAllowed(12, true, new Set(['12']), null), false);

eq('repeat filter rejects immediate repeat', p.repeatAllowed(12, true, new Set(), '12'), false);

eq('repeat filter accepts unseen ID', p.repeatAllowed(13, true, new Set(['12']), '12'), true);

eq('repeat filter rejects empty ID when enabled', p.repeatAllowed('', true, new Set(), null), false);

eq('metadata rejects arrays', p.metadataAllowed([]), false);

eq('metadata rejects invalid source', p.metadataAllowed({source:'unknown'}), false);

eq('metadata defaults source to AMQ', p.metadataAllowed({songType:1,year:2000,difficulty:50,season:'Spring 2000',animeType:'TV'}), true);

eq('EMQ metadata skips AMQ-specific difficulty/season/type checks', p.metadataAllowed({source:'emq',songType:1,year:2000,difficulty:-1,season:123,animeType:123}), true);

eq('AMQ-specific restriction detected for hard pool', p.hasAmqSpecificRestriction({}, 'hard'), true);

eq('no AMQ-specific restriction for defaults', p.hasAmqSpecificRestriction({}, 'all'), false);
console.log(`RESULT ${passed} passed, 0 failed`);

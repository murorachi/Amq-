'use strict';
// Static characterization of the exact production getQuizPool() boundary.
// Behavioral cases live in candidate_pool_integration.test.cjs; this contract locks the
// production branch/filter ordering and shared-state dependencies before extraction.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const file = path.resolve(__dirname, '../../src/scripts/script_004.htmlpart');
const source = fs.readFileSync(file, 'utf8');
const start = source.indexOf('function getQuizPool(){');
const end = source.indexOf('\nfunction updateQuizCounts()', start);
assert.ok(start >= 0 && end > start, 'exact getQuizPool function boundary exists');
const fn = source.slice(start, end);
let assertions = 0;
function check(name, condition) { assert.ok(condition, name); assertions++; console.log('PASS ' + name); }
function ordered(name, tokens) {
  let cursor = -1;
  for (const token of tokens) {
    const at = fn.indexOf(token, cursor + 1);
    assert.ok(at > cursor, `${name}: expected token in order: ${token}`);
    cursor = at;
  }
  assertions++;
  console.log('PASS ' + name);
}
check('initial source pool rejects blank titles before policy filtering', fn.includes("songs.filter(s=>String(s[4]||'').trim()&&window.__aniCandidatePoolPolicyV8265.blacklistAllowed"));
check('focus mode empty list returns empty instead of broadening', fn.includes("if(activeFocusModeV72){if(!activeFocusSongIdsV72.length") && fn.includes("return []}const focusSet=new Set(activeFocusSongIdsV72.map(String))"));
check('focus mode restricts candidate IDs and applies repeat policy only when enabled', fn.includes('pool=pool.filter(s=>focusSet.has(String(s[1])))') && fn.includes('if(quizSettings.noRepeat)pool=pool.filter(s=>window.__aniCandidatePoolPolicyV8265.repeatAllowed'));
ordered('normal candidate filter composition order is stable', [
  "pool=pool.filter(s=>window.__aniCandidatePoolPolicyV8265.quickPoolAllowed",
  "pool=pool.filter(s=>window.__aniCandidatePoolPolicyV8265.statusAllowed",
  "const a=byAnime.get(s[0]);if(!a)return false",
  'watchStatusAllowed(',
  'metadataAllowed(',
  'tagAllowed(',
  'watchlistAllowed(',
  'repeatAllowed(s[1],!!quizSettings.noRepeat,quizRoundSeen,lastQuestionId)'
]);
check('metadata input retains AMQ source and song/anime metadata mapping', fn.includes("metadataAllowed({source:'amq',year:a[5],season:a[3],animeType:a[4],songType:s[2],difficulty:s[6]},quizSettings)"));
check('watchlist membership checks both anime ID and alternate list key', fn.includes("const keys=[String(a[0]),String(a[6]||'')].filter(Boolean)"));
check('empty pool reports a distinct watchlist-state diagnostic and never broadens filters', fn.includes("!inListCount?'你的「我的清單」目前沒有可辨識的看番狀態") && fn.includes('系統不會自動放寬範圍'));
check('immediate-repeat final guard only removes previous question when alternatives exist', fn.includes('if(quizSettings.noRepeat&&lastQuestionId!==null&&pool.length>1)pool=pool.filter(s=>String(s[1])!==String(lastQuestionId))'));
check('source remains a single exact function with no module/export rewrite', !fn.includes('export ') && !fn.includes('module.exports'));
console.log(`RESULT ${assertions} assertions passed; function_bytes=${Buffer.byteLength(fn)} sha256=${crypto.createHash('sha256').update(fn).digest('hex')}`);

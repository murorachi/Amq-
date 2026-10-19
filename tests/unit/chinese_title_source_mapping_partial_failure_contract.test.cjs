'use strict';
// Exact-source contract for Chinese-title source mapping and partial-source failure behavior.
// Uses fixture rows and mocked source responses; no external network requests are made.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_031.htmlpart'), 'utf8');

function extractFunction(name) {
  let start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `function exists: ${name}`);
  if (source.slice(Math.max(0, start - 6), start) === 'async ') start -= 6;
  const open = source.indexOf('{', start);
  assert.ok(open > start, `function body exists: ${name}`);
  let depth = 0, quote = null, escaped = false, lineComment = false, blockComment = false;
  for (let i = open; i < source.length; i++) {
    const c = source[i], n = source[i + 1];
    if (lineComment) { if (c === '\n') lineComment = false; continue; }
    if (blockComment) { if (c === '*' && n === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '/' && n === '/') { lineComment = true; i++; continue; }
    if (c === '/' && n === '*') { blockComment = true; i++; continue; }
    if (c === '/' && (() => { let p = i - 1; while (p >= start && /\\s/.test(source[p])) p--; return p < start || '([{:;,=!?&|+-*%^~<>'.includes(source[p]); })()) {
      let inClass = false, regexEscaped = false, closed = false;
      for (i++; i < source.length; i++) {
        const r = source[i];
        if (regexEscaped) { regexEscaped = false; continue; }
        if (r === '\\\\') { regexEscaped = true; continue; }
        if (r === '[') { inClass = true; continue; }
        if (r === ']') { inClass = false; continue; }
        if (r === '/' && !inClass) { closed = true; while (/[a-z]/i.test(source[i + 1] || '')) i++; break; }
      }
      if (!closed) throw new Error(`unterminated regex while extracting ${name}`);
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`unterminated function: ${name}`);
}

const declarations = [
  extractFunction('asList'), extractFunction('normal'), extractFunction('noJapaneseKana'),
  extractFunction('firstHanTitle'), extractFunction('makeRecords'), extractFunction('ensureRecord'),
  extractFunction('sourceCandidates'), extractFunction('addCandidate'), extractFunction('buildMap')
].join('\n');

function makeContext(outcomes = {}) {
  const sandbox = {
    VERSION: 'test-version',
    URLS: { anilist: 'mock://anilist', bangumi: 'mock://bangumi' },
    HAN: /[\u3400-\u4dbf\u4e00-\u9fff]/u, KANA: /[\u3040-\u30ff\uff65-\uff9f]/u,
    anime: [['song-1', null, null, null, null, null, '100'], ['song-2', null, null, null, null, null, '200']],
    api: { sourceStatus: {}, records: Object.create(null) },
    $: id => ({ textContent: JSON.stringify({ 'song-1': '200', 'song-2': '300' }) }),
    fetchJSON: async (url, label) => {
      const item = outcomes[label];
      if (item instanceof Error) throw item;
      if (item === undefined) throw new Error('mock source unavailable: ' + label);
      return item;
    },
    Promise, Map, Set, Object, Array, String, Number, Math, RegExp, Error
  };
  vm.createContext(sandbox);
  vm.runInContext(declarations, sandbox);
  return sandbox;
}
function run(label, fn) { return Promise.resolve().then(fn).then(() => console.log('PASS ' + label)); }
let assertions = 0;
function equal(actual, expected, label) { assertions++; assert.equal(actual, expected, label); }
function ok(value, label) { assertions++; assert.ok(value, label); }

const bgmData = { items: [
  { title: 'Anime native title', sites: [{ site: 'mal', id: '100' }, { site: 'anilist', id: '200' }], titleTranslate: { 'zh-Hant': ['繁體標題'], 'zh-Hans': ['简体标题'] } },
  { title: 'Other native title', sites: [{ site: 'mal', id: '200' }, { site: 'anilist', id: '200' }], titleTranslate: { 'zh-Hant': ['另一作品'] } }
] };
const aniData = [{ id: '200', title: '中文標題', synonyms: ['中文別名', '日本語タイトル'] }];

(async () => {
  await run('source ID mapping resolves unique AniList and MAL matches', () => {
    const ctx = makeContext();
    const result = vm.runInContext("sourceCandidates(anime, {'song-1':'200','song-2':'300'})", ctx);
    equal(result.resolve('100', '200'), 'song-1', 'matching MAL/AniList ID');
    equal(result.resolve('', '200'), 'song-1', 'unique AniList ID');
    equal(result.resolve('200', ''), 'song-2', 'unique MAL ID');
    equal(result.resolve('missing', 'missing'), null, 'unknown IDs fail closed');
  });
  await run('ambiguous conflicting source IDs fail closed', () => {
    const ctx = makeContext();
    const result = vm.runInContext("sourceCandidates([['song-a',null,null,null,null,null,'7'],['song-b',null,null,null,null,null,'7']], {'song-a':'99','song-b':'99'})", ctx);
    equal(result.resolve('7', '99'), null, 'conflicting candidates rejected');
    const overlap = vm.runInContext("sourceCandidates([['song-a',null,null,null,null,null,'7'],['song-b',null,null,null,null,null,'7']], {'song-a':'99'})", ctx);
    equal(overlap.resolve('7', '99'), 'song-a', 'unique AniList candidate matching MAL ambiguity');
  });
  await run('Bangumi-only data still produces a partial usable map', async () => {
    const ctx = makeContext({ 'AniList 中文資料': new Error('AniList offline'), 'bangumi-data': bgmData });
    const result = await vm.runInContext('buildMap(null)', ctx);
    ok(result.records['song-1'], 'mapped work record exists');
    equal(result.records['song-1'].titleZhTW, '繁體標題', 'Traditional title retained');
    equal(result.stats.anilistOk, false, 'AniList failure reported');
    equal(result.stats.bangumiOk, true, 'Bangumi success reported');
    equal(result.stats.animeCount, 1, 'only uniquely resolved record included');
  });
  await run('AniList-only data still produces a partial usable map', async () => {
    const ctx = makeContext({ 'AniList 中文資料': aniData, 'bangumi-data': new Error('Bangumi offline') });
    const result = await vm.runInContext('buildMap(x => x)', Object.assign(ctx, {}));
    ok(result.records['song-1'], 'AniList work record exists');
    equal(result.records['song-1'].titleZhTW, '中文標題', 'AniList title retained');
    equal(result.stats.anilistOk, true, 'AniList success reported');
    equal(result.stats.bangumiOk, false, 'Bangumi failure reported');
    ok(!result.records['song-1'].aliases.includes('日本語タイトル'), 'kana alias filtered');
  });
  await run('both external sources failing returns an empty map without throwing', async () => {
    const ctx = makeContext({ 'AniList 中文資料': new Error('AniList offline'), 'bangumi-data': new Error('Bangumi offline') });
    const result = await vm.runInContext('buildMap(null)', ctx);
    equal(Object.keys(result.records).length, 0, 'empty records');
    equal(result.stats.anilistOk, false, 'AniList failure reported');
    equal(result.stats.bangumiOk, false, 'Bangumi failure reported');
  });
  console.log(`PASS ${assertions} Chinese-title source mapping assertions`);
})().catch(error => { console.error(error); process.exitCode = 1; });

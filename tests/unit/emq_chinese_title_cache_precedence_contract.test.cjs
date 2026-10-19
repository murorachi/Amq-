'use strict';
// Deterministic exact-source contracts for EMQ Chinese-title filtering and cache precedence.
// No VNDB/Bangumi/OpenCC network requests are made.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_041.htmlpart'), 'utf8');

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
  extractFunction('normalize'), extractFunction('cleanTitle'), extractFunction('save'),
  extractFunction('traditional'), extractFunction('recordFromVndb'), extractFunction('cacheRecord'),
  extractFunction('serverAliasMap'), extractFunction('allKnownAliases')
].join('\n');

function makeContext() {
  const saved = new Map();
  const sandbox = {
    HAN: /[\u3400-\u9fff]/u, KANA: /[\u3040-\u30ff\uff65-\uff9f]/u,
    CACHE_KEY: 'aniEmqChineseTitleCacheV8259', cache: {}, converter: null, converterPromise: null,
    workMap: new Map(), saved, Date, Promise, String, Number, Boolean, Object, Array, Map, Set, RegExp,
    localStorage: { setItem(k, v) { saved.set(k, String(v)); } },
    console: { warn() {}, debug() {} },
    getConverter: async () => x => ({'简体标题':'繁體標題','中文別名':'中文別名（繁體）'}[x] || x)
  };
  vm.createContext(sandbox);
  vm.runInContext(declarations, sandbox);
  return { sandbox, saved };
}
function run(label, fn) { return Promise.resolve().then(fn).then(() => console.log('PASS ' + label)); }
let assertions = 0;
function equal(actual, expected, label) { assertions++; assert.equal(actual, expected, label); }
function ok(value, label) { assertions++; assert.ok(value, label); }

(async () => {
  await run('title normalization removes spacing and punctuation but retains CJK text', () => {
    const { sandbox } = makeContext();
    equal(vm.runInContext("normalize('繁體 標題！')", sandbox), vm.runInContext("normalize('繁體標題')", sandbox), 'normalized equality');
    equal(vm.runInContext("cleanTitle('  繁體標題  ')", sandbox), '繁體標題', 'trimmed Han title accepted');
    equal(vm.runInContext("cleanTitle('Japanese タイトル')", sandbox), '', 'kana-containing title rejected');
    equal(vm.runInContext("cleanTitle('English Only')", sandbox), '', 'non-Han title rejected');
    equal(vm.runInContext("cleanTitle('繁體標題'.repeat(30))", sandbox), '', 'overlong title rejected');
  });
  await run('VNDB Traditional Chinese title is preferred before simplified aliases', async () => {
    const { sandbox } = makeContext();
    const record = await vm.runInContext("recordFromVndb({id:'v1',titles:[{lang:'zh-Hans',title:'简体标题',official:true},{lang:'zh-Hant',title:'繁體標題',official:false}],aliases:['中文別名','English Alias','日本語タイトル']})", sandbox);
    equal(record.title, '繁體標題', 'preferred title');
    ok(record.aliases.includes('简体标题'), 'simplified source retained as alias');
    ok(record.aliases.includes('中文別名'), 'Han alias retained');
    ok(!record.aliases.includes('English Alias'), 'English alias filtered');
    ok(!record.aliases.includes('日本語タイトル'), 'kana alias filtered');
    equal(record.source, 'vndb', 'source provenance');
  });
  await run('cacheRecord deduplicates normalized aliases and caps records at eight', () => {
    const { sandbox, saved } = makeContext();
    vm.runInContext("cacheRecord('v1',{title:'繁體標題',aliases:['繁體 標題','中文別名','中文別名','English Alias','日本語タイトル','甲','乙','丙','丁','戊','己','庚','辛'],source:'bangumi'})", sandbox);
    const record = sandbox.cache.v1;
    equal(record.title, '繁體標題', 'cache primary title');
    equal(record.aliases.length, 8, 'alias limit');
    equal(record.aliases[0], '繁體標題', 'primary title is first alias');
    equal(record.aliases.filter(x => vm.runInContext('normalize('+JSON.stringify(x)+')', sandbox) === vm.runInContext("normalize('繁體標題')", sandbox)).length, 1, 'normalized duplicate removed');
    ok(!record.aliases.includes('English Alias'), 'English alias omitted');
    ok(!record.aliases.includes('日本語タイトル'), 'kana alias omitted');
    equal(record.source, 'bangumi', 'source retained');
    equal(record.checked, true, 'record marked checked');
    equal(saved.has('aniEmqChineseTitleCacheV8259'), true, 'cache persisted');
  });
  await run('server alias map scopes to requested work IDs and deduplicates aliases', () => {
    const { sandbox } = makeContext();
    vm.runInContext("workMap.set('v1','work-a');workMap.set('v2','work-b');cache.v1={title:'繁體標題',aliases:['繁體 標題','另一個名稱']};cache.v2={title:'另一作品',aliases:['另一作品']}", sandbox);
    const all = vm.runInContext('serverAliasMap()', sandbox);
    const selected = vm.runInContext("serverAliasMap(['work-b'])", sandbox);
    equal(Object.keys(all).length, 2, 'all mapped works included');
    equal(all['work-a'].length, 2, 'normalized duplicate removed');
    equal(Object.keys(selected).length, 1, 'selected work scope');
    equal(selected['work-b'][0], '另一作品', 'selected title');
    equal(vm.runInContext('allKnownAliases()["work-a"].length', sandbox), 2, 'shared alias map follows work mapping');
  });
  console.log(`PASS ${assertions} EMQ Chinese-title cache assertions`);
})().catch(error => { console.error(error); process.exitCode = 1; });

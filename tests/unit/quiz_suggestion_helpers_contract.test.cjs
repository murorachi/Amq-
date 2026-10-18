'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const globalNodeModules = execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim();
const ts = require(path.join(globalNodeModules, 'typescript', 'lib', 'typescript.js'));
const ROOT = path.resolve(__dirname, '../..');
const sourcePath = path.join(ROOT, 'src/scripts/script_004.htmlpart');
const raw = fs.readFileSync(sourcePath, 'utf8');
const source = raw.replace(/^\s*<script\b[^>]*>/i, '').replace(/<\/script>\s*$/i, '').replace(/<!--\s*(AMQ_SPLIT_MODULE:[\w-]+)\s*-->/g, '// $1');
const sf = ts.createSourceFile('script_004.htmlpart', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
const moduleSource = fs.readFileSync(path.join(ROOT, 'src/modules/quiz_suggestion_text.js'), 'utf8');
const moduleSf = ts.createSourceFile('quiz_suggestion_text.js', moduleSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
const rendererSource = fs.readFileSync(path.join(ROOT, 'src/modules/quiz_suggestion_renderer.js'), 'utf8');
const rendererSf = ts.createSourceFile('quiz_suggestion_renderer.js', rendererSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
assert.equal(sf.parseDiagnostics.length, 0, 'production script_004 parses after module extraction');
assert.equal(moduleSf.parseDiagnostics.length, 0, 'extracted text module parses');
assert.equal(rendererSf.parseDiagnostics.length, 0, 'extracted renderer module parses');
const wantedFunctions = new Set(['normalizeQuizSuggestionTextV824', 'mapQuizSuggestionTextV824', 'quizSuggestionHighlightRangesV824']);
const snippets = [];
let compareStatement = null;
function walkModule(node) {
  if (ts.isVariableStatement(node)) {
    for (const d of node.declarationList.declarations) {
      if (ts.isIdentifier(d.name) && d.name.text === 'QUIZ_SUGGESTION_SPECIAL_SPACE_CHARS_V824') snippets.push(node.getText(moduleSf));
    }
  }
  if (ts.isFunctionDeclaration(node) && node.name && wantedFunctions.has(node.name.text)) snippets.push(node.getText(moduleSf));
  ts.forEachChild(node, walkModule);
}
function walkScript(node, sourceFile) {
  if (ts.isVariableStatement(node)) for (const d of node.declarationList.declarations) {
    if (ts.isIdentifier(d.name) && d.name.text === 'compareSuggestions' && d.initializer && ts.isArrowFunction(d.initializer)) compareStatement = node.getText(sourceFile);
  }
  ts.forEachChild(node, child => walkScript(child, sourceFile));
}
walkModule(moduleSf); walkScript(sf, sf); walkScript(rendererSf, rendererSf);
assert.equal(snippets.filter(s => s.includes('QUIZ_SUGGESTION_SPECIAL_SPACE_CHARS_V824') && s.includes('new Set(Array.from')).length, 1, 'special-symbol policy extracted once from the module');
for (const name of wantedFunctions) assert.ok(snippets.some(s => s.startsWith(`function ${name}(`)), `production function ${name} extracted`);
assert.ok(compareStatement, 'production compareSuggestions comparator found inside the renderer module');
const context = vm.createContext({console, Intl, Date, Math, JSON, Object, Array, Set, Map, Number, String, Boolean, RegExp, Error});
vm.runInContext(`${snippets.join('\n')}\n${compareStatement}\nglobalThis.__api={normalizeQuizSuggestionTextV824,mapQuizSuggestionTextV824,quizSuggestionHighlightRangesV824,compareSuggestions};`, context, {timeout: 10000});
const api = context.__api;
let passed = 0;
function check(name, fn) { try { fn(); passed++; console.log('PASS ' + name); } catch (e) { console.error('FAIL ' + name + '\n' + (e.stack || e)); process.exitCode = 1; } }
check('NFKC full-width Latin normalizes to lowercase ASCII', () => assert.equal(api.normalizeQuizSuggestionTextV824('ＡＢＣ'), 'abc'));
check('ligature normalization expansion is preserved', () => assert.equal(api.normalizeQuizSuggestionTextV824('ﬃ'), 'ffi'));
check('configured uncommon symbols normalize as optional spaces', () => assert.equal(api.normalizeQuizSuggestionTextV824('Koi☆no★Hime'), 'koi no hime'));
check('nullish values normalize safely to empty string', () => { assert.equal(api.normalizeQuizSuggestionTextV824(null), ''); assert.equal(api.normalizeQuizSuggestionTextV824(undefined), ''); });
check('mapping preserves original label and normalized search text', () => { const x=api.mapQuizSuggestionTextV824('ＡＢＣ☆Song'); assert.equal(x.label,'ＡＢＣ☆Song'); assert.equal(x.searchText,'abc song'); assert.equal(x.rawKey,'abc☆song'.normalize('NFKC')); });
check('mapping tracks UTF-16 source offsets for NFKC expansion', () => { const x=api.mapQuizSuggestionTextV824('ﬃX'); assert.equal(x.searchText,'ffix'); assert.deepEqual(Array.from(x.sourceStarts),[0,0,0,1]); assert.deepEqual(Array.from(x.sourceEnds),[1,1,1,2]); });
check('mapping tracks astral Unicode source offsets in UTF-16 units', () => { const x=api.mapQuizSuggestionTextV824('A😀B'); assert.deepEqual(Array.from(x.sourceStarts),[0,1,1,3]); assert.deepEqual(Array.from(x.sourceEnds),[1,3,3,4]); });
check('compact key removes whitespace and records search positions', () => { const x=api.mapQuizSuggestionTextV824('Koi no Hime'); assert.equal(x.compactKey,'koinohime'); assert.deepEqual(Array.from(x.compactPositions),[0,1,2,4,5,7,8,9,10]); });
check('title length counts Unicode code points rather than UTF-16 units', () => assert.equal(api.mapQuizSuggestionTextV824('A😀B').titleLength,3));
check('raw highlight skips normalized separators and maps original offsets', () => { const x=api.mapQuizSuggestionTextV824('A☆B'); const ranges=api.quizSuggestionHighlightRangesV824(x,'a b','ab',null,true,false,false); assert.deepEqual(JSON.parse(JSON.stringify(ranges)),[{start:0,end:1},{start:2,end:3}]); });
check('compact highlight maps back to original label positions', () => { const x=api.mapQuizSuggestionTextV824('Koi no Hime'); const ranges=api.quizSuggestionHighlightRangesV824(x,'koinohime','koinohime',null,false,true,false); assert.deepEqual(JSON.parse(JSON.stringify(ranges)),[{start:0,end:3},{start:4,end:6},{start:7,end:11}]); });
check('highlight ranges omit slash and hyphen separators', () => { const x=api.mapQuizSuggestionTextV824('A-B/C'); const ranges=api.quizSuggestionHighlightRangesV824(x,'a-b/c','abc',null,true,false,false); assert.deepEqual(JSON.parse(JSON.stringify(ranges)),[{start:0,end:1},{start:2,end:3},{start:4,end:5}]); });
check('overlapping highlight ranges merge deterministically', () => { const x=api.mapQuizSuggestionTextV824('ABC'); const ranges=api.quizSuggestionHighlightRangesV824(x,'abc','abc',null,true,true,false); assert.deepEqual(JSON.parse(JSON.stringify(ranges)),[{start:0,end:3}]); });
check('suggestion comparator prioritizes shorter Unicode title length', () => { const a=api.mapQuizSuggestionTextV824('Longer title'),b=api.mapQuizSuggestionTextV824('A'); assert.ok(api.compareSuggestions(b,a)<0); });
check('suggestion comparator breaks ties by normalized raw key then label', () => { const a=api.mapQuizSuggestionTextV824('Beta'),b=api.mapQuizSuggestionTextV824('Alfa'); assert.ok(api.compareSuggestions(b,a)<0); });
check('suggestion comparator is stable for identical label records', () => { const a=api.mapQuizSuggestionTextV824('Same'),b=api.mapQuizSuggestionTextV824('Same'); assert.equal(api.compareSuggestions(a,b),0); });
console.log(`RESULT ${passed} passed, ${16-passed} failed`);
if (passed !== 16) process.exitCode = 1;

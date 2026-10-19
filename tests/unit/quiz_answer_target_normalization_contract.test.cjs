'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(ROOT, 'src/scripts/script_004.htmlpart'), 'utf8');
const moduleSource = fs.readFileSync(path.join(ROOT, 'src/modules/quiz_answer_target_normalization.htmlpart'), 'utf8');
const marker = '<!-- AMQ_SPLIT_MODULE:quiz_answer_target_normalization -->';
const expected = "const normalize=x=>String(x??'').normalize('NFKC').toLocaleLowerCase().replace(/[\\s\\p{C}]/gu,'');";
assert.equal(moduleSource, expected, 'module is the exact original pure helper source');
assert.equal(source.split(marker).length - 1, 1, 'module marker occurs exactly once');
const start = source.indexOf('function evaluateQuizTargetAnswerV857(');
const end = source.indexOf('function submitQuizAllV857(', start);
assert.ok(start >= 0 && end > start, 'answer evaluator source boundaries exist');
const evaluator = source.slice(start, end);
assert.ok(evaluator.includes(marker), 'marker stays inside evaluateQuizTargetAnswerV857');
assert.ok(!evaluator.includes('const normalize='), 'helper declaration is extracted from the source fragment');
assert.ok(evaluator.includes('normalize(input)'), 'submitted answer normalization call remains');
assert.ok(evaluator.includes('values.map(normalize)'), 'alias normalization call remains');
assert.ok(evaluator.includes('normalize(row[4])===title&&normalize(row[5])===artist'), 'related-song title/artist matching remains');
assert.ok(evaluator.includes('some(v=>normalize(v)===candidate)'), 'related anime alias matching remains');
assert.ok(evaluator.includes('candidate.length>=Math.ceil(alias.length*.55)'), 'partial-answer threshold remains unchanged');
const normalize = vm.runInNewContext(moduleSource + '\nnormalize', {String});
const cases = [
 ['NFKC converts full-width Latin', 'ＡＢＣ', 'abc'],
 ['NFKC preserves compatibility expansion', 'ﬃ', 'ffi'],
 ['case folding and whitespace removal', 'MiXeD Case', 'mixedcase'],
 ['tabs/newlines/spaces are ignored', ' Koi\t no\nHime ', 'koinohime'],
 ['Unicode control/format characters are ignored', 'A\u200bB\u0000C', 'abc'],
 ['null input is safe', null, ''],
 ['undefined input is safe', undefined, ''],
 ['ordinary punctuation is retained', 'A-B/C', 'a-b/c'],
 ['astral Unicode remains valid content', 'A😀B', 'a😀b'],
];
for (const [name, input, expectedValue] of cases) { assert.equal(normalize(input), expectedValue, name); console.log('PASS ' + name); }
console.log('PASS exact-source normalization boundary and evaluator call-site contract');
console.log('assertions=' + (cases.length + 9));

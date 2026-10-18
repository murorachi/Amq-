'use strict';
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '../..');
const hostPath = path.join(root, 'src/scripts/script_020.htmlpart');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'reports/FRAGMENT_MANIFEST.json'), 'utf8'));
const host = fs.readFileSync(hostPath, 'utf8');
const record = manifest.modules.find(item => item.name === 'srs_schedule_validation');
let validatorSource;
if (record) {
  const modulePath = path.join(root, record.path);
  const bytes = fs.readFileSync(modulePath);
  assert.equal(bytes.length, record.byte_length, 'SRS validation module byte length matches manifest');
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), record.sha256, 'SRS validation module SHA-256 matches manifest');
  assert.equal((host.match(/<!-- AMQ_SPLIT_MODULE:srs_schedule_validation -->/g) || []).length, 1,
    'script_020 contains exactly one SRS validation module marker');
  validatorSource = bytes.toString('utf8');
} else {
  const start = host.indexOf('function isValidSchedule(');
  const end = host.indexOf('\n function quarantine(', start);
  assert.ok(start >= 0 && end > start, 'current SRS schedule validator source boundaries');
  validatorSource = host.slice(start, end).trim();
}

const context = { validStates: new Set(['new', 'learning', 'review', 'suspended']) };
vm.createContext(context);
vm.runInContext(validatorSource + '\n;globalThis.__isValidSchedule = isValidSchedule;', context, {
  timeout: 1000, filename: 'srs-schedule-validation-contract.js'
});
const valid = value => context.__isValidSchedule(value);
const base = () => ({
  schemaVersion: 1,
  settings: { dailyNew: 30, batchSize: 25, desiredRetention: 0.9 },
  cards: {}
});
const card = (overrides = {}) => ({
  songId: '42', state: 'new', dueAt: 0, reps: 0, lapses: 0,
  stability: null, difficulty: null, reviewLog: [], ...overrides
});
const cases = [
  ['valid empty schedule', base(), true],
  ['valid schedule with a card', {...base(), cards: {'42': card()}}, true],
  ['valid numeric strings preserve current coercion', {...base(), settings:{dailyNew:'30',batchSize:'25',desiredRetention:'0.9'},cards:{'42':card({dueAt:'0',reps:'1',lapses:'0',stability:'1.2',difficulty:'5'})}}, true],
  ['zero daily-new setting is valid', {...base(), settings:{...base().settings,dailyNew:0}}, true],
  ['daily-new upper bound is valid', {...base(), settings:{...base().settings,dailyNew:500}}, true],
  ['batch-size lower bound is valid', {...base(), settings:{...base().settings,batchSize:1}}, true],
  ['batch-size upper bound is valid', {...base(), settings:{...base().settings,batchSize:500}}, true],
  ['retention lower bound is valid', {...base(), settings:{...base().settings,desiredRetention:0.7}}, true],
  ['retention upper bound is valid', {...base(), settings:{...base().settings,desiredRetention:0.97}}, true],
  ['null schedule rejected', null, false],
  ['array schedule rejected', [], false],
  ['wrong schema version rejected', {...base(),schemaVersion:2}, false],
  ['array cards rejected', {...base(),cards:[]}, false],
  ['array settings rejected', {...base(),settings:[]}, false],
  ['negative daily-new rejected', {...base(),settings:{...base().settings,dailyNew:-1}}, false],
  ['daily-new over 500 rejected', {...base(),settings:{...base().settings,dailyNew:501}}, false],
  ['zero batch size rejected', {...base(),settings:{...base().settings,batchSize:0}}, false],
  ['batch size over 500 rejected', {...base(),settings:{...base().settings,batchSize:501}}, false],
  ['retention below 0.7 rejected', {...base(),settings:{...base().settings,desiredRetention:0.699}}, false],
  ['retention above 0.97 rejected', {...base(),settings:{...base().settings,desiredRetention:0.971}}, false],
  ['card ID mismatch rejected', {...base(),cards:{'42':card({songId:'43'})}}, false],
  ['unknown card state rejected', {...base(),cards:{'42':card({state:'unknown'})}}, false],
  ['non-finite due time rejected', {...base(),cards:{'42':card({dueAt:NaN})}}, false],
  ['negative repetitions rejected', {...base(),cards:{'42':card({reps:-1})}}, false],
  ['negative lapses rejected', {...base(),cards:{'42':card({lapses:-1})}}, false],
  ['negative stability rejected', {...base(),cards:{'42':card({stability:-1})}}, false],
  ['difficulty above 10 rejected', {...base(),cards:{'42':card({difficulty:10.1})}}, false],
  ['non-array review log rejected', {...base(),cards:{'42':card({reviewLog:{}})}}, false]
];
for (const [name, value, expected] of cases) {
  assert.equal(valid(value), expected, name);
  console.log('PASS: ' + name);
}
console.log('PASS SRS schedule validation contract');
console.log('cases=' + cases.length + ' source=' + (record ? 'module' : 'script_020'));

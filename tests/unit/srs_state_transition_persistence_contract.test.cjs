'use strict';
// Deterministic characterization tests for the existing SRS schedule contract.
// Functions are extracted from the real source; production code and formulas are not changed.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_020.htmlpart'), 'utf8');

function extractFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `function exists: ${name}`);
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
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`unterminated function: ${name}`);
}

const declarations = [
  extractFunction('emptyStore'),
  extractFunction('isValidSchedule'),
  extractFunction('quarantine'),
  extractFunction('loadStore'),
  extractFunction('persist'),
  extractFunction('initDifficulty'),
  extractFunction('initMemory'),
  extractFunction('updateMemory'),
  extractFunction('intervalDays'),
  extractFunction('addReviewLog'),
  extractFunction('applyRatingToCard')
].join('\n');

function makeContext(options = {}) {
  const local = new Map();
  if (options.initialRaw !== undefined) local.set('aniSrsScheduleV1', options.initialRaw);
  const storage = {
    getItem(key) { if (options.getThrows) throw new Error('storage read blocked'); return local.has(key) ? local.get(key) : null; },
    setItem(key, value) { if (options.setThrows) throw new Error('storage write blocked'); local.set(key, String(value)); },
    removeItem(key) { if (options.removeThrows) throw new Error('storage remove blocked'); local.delete(key); },
    _data: local
  };
  const sandbox = {
    STORE_KEY: 'aniSrsScheduleV1',
    RECOVERY_PREFIX: 'aniSrsScheduleRecoveryV1_',
    DAY: 86400000,
    MINUTE: 60000,
    FSRS_VERSION: 'FSRS-6-default+song-learning-steps-v1',
    W: [0.212,1.2931,2.3065,8.2956,6.4133,0.8334,3.0194,0.001,1.8722,0.1666,0.796,1.4835,0.0614,0.2629,1.6483,0.6014,1.8729,0.5425,0.0912,0.0658,0.1542],
    FACTOR: Math.pow(0.9, -1 / 0.1542) - 1,
    validStates: new Set(['new','learning','review','suspended']),
    localStorage: storage,
    window: {},
    console: { error() {}, info() {} },
    Date,
    Math,
    Number,
    JSON,
    Object,
    Array,
    String,
    Set,
    Map,
    Error,
    persistenceBlocked: false,
    recoveryRaw: null,
    store: null,
    notify() {},
    clone: x => JSON.parse(JSON.stringify(x)),
    clamp: (x, min, max) => Math.min(max, Math.max(min, x))
  };
  vm.createContext(sandbox);
  vm.runInContext(declarations, sandbox);
  vm.runInContext('store = emptyStore()', sandbox);
  return { sandbox, storage };
}

function run(label, fn) {
  fn();
  console.log('PASS ' + label);
}
let assertions = 0;
function equal(actual, expected, label) { assertions++; assert.equal(actual, expected, label); }
function ok(value, label) { assertions++; assert.ok(value, label); }

run('new card Again enters first learning step', () => {
  const { sandbox } = makeContext();
  const c = vm.runInContext("applyRatingToCard({songId:'a',state:'new',dueAt:0,reps:0,lapses:0,reviewLog:[]},1,1000000)", sandbox);
  equal(c.state, 'learning', 'state');
  equal(c.learningStep, 0, 'learning step');
  equal(c.dueAt, 1000000 + 60000, 'one-minute first step');
  equal(c.lastRating, 1, 'stored rating');
  equal(c.reps, 1, 'review count');
});
run('new card Hard enters first step with hard delay', () => {
  const { sandbox } = makeContext();
  const c = vm.runInContext("applyRatingToCard({songId:'b',state:'new',dueAt:0,reps:0,lapses:0,reviewLog:[]},2,2000000)", sandbox);
  equal(c.state, 'learning', 'state');
  equal(c.learningStep, 0, 'learning step');
  equal(c.dueAt, 2000000 + 5 * 60000, 'hard-step delay');
});
run('new card Good advances to second learning step', () => {
  const { sandbox } = makeContext();
  const c = vm.runInContext("applyRatingToCard({songId:'c',state:'new',dueAt:0,reps:0,lapses:0,reviewLog:[]},3,3000000)", sandbox);
  equal(c.state, 'learning', 'state');
  equal(c.learningStep, 1, 'learning step');
  equal(c.dueAt, 3000000 + 10 * 60000, 'second learning delay');
});
run('new card Easy graduates to review', () => {
  const { sandbox } = makeContext();
  const c = vm.runInContext("applyRatingToCard({songId:'d',state:'new',dueAt:0,reps:0,lapses:0,reviewLog:[]},4,4000000)", sandbox);
  equal(c.state, 'review', 'state');
  equal(c.learningStep, 0, 'learning step reset');
  equal(c.dueAt, 4000000 + 4 * 86400000, 'easy graduation delay');
});
run('review Again enters relearning and increments lapse', () => {
  const { sandbox } = makeContext();
  const c = vm.runInContext("applyRatingToCard({songId:'e',state:'review',dueAt:0,reps:4,lapses:2,stability:8,difficulty:5,lastReviewedAt:1000,reviewLog:[]},1,86401000)", sandbox);
  equal(c.state, 'learning', 'state');
  equal(c.relearning, true, 'relearning flag');
  equal(c.lapses, 3, 'lapse count');
  equal(c.dueAt, 86401000 + 10 * 60000, 'relearning delay');
});
run('learning Good advances step zero, then graduates at step one', () => {
  const { sandbox } = makeContext();
  const first = vm.runInContext("applyRatingToCard({songId:'f',state:'learning',learningStep:0,relearning:false,dueAt:0,reps:1,lapses:0,stability:2,difficulty:5,lastReviewedAt:1000,reviewLog:[]},3,86401000)", sandbox);
  equal(first.state, 'learning', 'first state');
  equal(first.learningStep, 1, 'first step');
  const second = vm.runInContext("applyRatingToCard("+JSON.stringify(first)+",3,172801000)", sandbox);
  equal(second.state, 'review', 'graduated state');
  equal(second.learningStep, 0, 'graduated step reset');
});
run('invalid rating throws without producing a card', () => {
  const { sandbox } = makeContext();
  const result = vm.runInContext("(()=>{try{applyRatingToCard({songId:'x',state:'new',dueAt:0},5,0);return false}catch(e){return /Invalid FSRS rating/.test(e.message)}})()", sandbox);
  equal(result, true, 'invalid rating rejected');
});
run('interval is bounded and responds to maximum interval', () => {
  const { sandbox } = makeContext();
  vm.runInContext("store.settings.maxIntervalDays=3", sandbox);
  equal(vm.runInContext("intervalDays({stability:100})", sandbox), 3, 'maximum interval clamp');
  vm.runInContext("store.settings.maxIntervalDays=36500", sandbox);
  const low = vm.runInContext("intervalDays({stability:2})", sandbox);
  const high = vm.runInContext("intervalDays({stability:20})", sandbox);
  ok(low >= 1, 'minimum interval');
  ok(high > low, 'higher stability gives longer interval at same retention');
});
run('schedule validator rejects malformed schema and accepts default store', () => {
  const { sandbox } = makeContext();
  equal(vm.runInContext("isValidSchedule(emptyStore())", sandbox), true, 'default store valid');
  equal(vm.runInContext("isValidSchedule({schemaVersion:99,cards:{},settings:{dailyNew:30,batchSize:25,desiredRetention:.9}})", sandbox), false, 'unsupported schema rejected');
});
run('valid persisted schedule is loaded without losing card data', () => {
  const raw = JSON.stringify({schemaVersion:1,algorithm:'test',createdAt:'2026-01-01T00:00:00.000Z',settings:{dailyNew:7,batchSize:9,desiredRetention:.9},cards:{abc:{songId:'abc',state:'review',dueAt:123,reps:3,lapses:1,stability:4,difficulty:5,reviewLog:[]}}});
  const { sandbox } = makeContext({ initialRaw: raw });
  const loaded = vm.runInContext('loadStore()', sandbox);
  equal(loaded.settings.dailyNew, 7, 'settings retained');
  equal(loaded.cards.abc.dueAt, 123, 'card due time retained');
  equal(loaded.cards.abc.reps, 3, 'review count retained');
});
run('invalid persisted schedule is copied to recovery before primary removal', () => {
  const raw = '{"broken":';
  const { sandbox, storage } = makeContext({ initialRaw: raw });
  const loaded = vm.runInContext('loadStore()', sandbox);
  equal(loaded.cards && Object.keys(loaded.cards).length, 0, 'empty fallback store');
  equal(storage._data.get('aniSrsScheduleV1'), undefined, 'invalid primary removed after recovery');
  const copies = [...storage._data.entries()].filter(([k]) => k.startsWith('aniSrsScheduleRecoveryV1_'));
  equal(copies.length, 1, 'one recovery copy');
  equal(copies[0][1], raw, 'recovery bytes preserved');
});
run('failed quarantine blocks future writes and preserves original key', () => {
  const raw = '{"broken":';
  const { sandbox, storage } = makeContext({ initialRaw: raw, setThrows: true });
  vm.runInContext('loadStore()', sandbox);
  equal(sandbox.persistenceBlocked, true, 'persistence blocked');
  equal(storage._data.get('aniSrsScheduleV1'), raw, 'original raw retained');
  equal(vm.runInContext('persist(emptyStore())', sandbox), false, 'writes refused');
});
run('failed storage read blocks persistence rather than overwriting', () => {
  const { sandbox, storage } = makeContext({ getThrows: true });
  vm.runInContext('loadStore()', sandbox);
  equal(sandbox.persistenceBlocked, true, 'persistence blocked');
  equal(vm.runInContext('persist(emptyStore())', sandbox), false, 'writes refused');
  equal(storage._data.has('aniSrsScheduleV1'), false, 'no replacement write');
});

console.log(`PASS ${assertions} SRS characterization assertions`);

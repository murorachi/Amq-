'use strict';
// Exact-source SRS characterization. This intentionally tests the current algorithm
// and persistence boundary without changing production scheduling behavior.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'src/scripts/script_020.htmlpart'), 'utf8');
function exactBetween(start, end, label) {
  const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
  assert.ok(a >= 0 && b > a, 'exact source boundaries exist for ' + label);
  return source.slice(a, b).trim();
}
const fragments = [
  exactBetween('function emptyStore()', 'function isValidSchedule(', 'empty schedule'),
  exactBetween('function isValidSchedule(', 'function quarantine(', 'schedule validator'),
  exactBetween('function quarantine(', 'function loadStore(', 'invalid-data quarantine'),
  exactBetween('function loadStore()', 'store=loadStore();', 'schedule load'),
  exactBetween('function persist(', 'function api()', 'schedule persistence'),
  exactBetween('function getCard(', 'function makeCard(', 'card lookup'),
  exactBetween('function makeCard(', 'function enrollOne(', 'new card'),
  exactBetween('function initDifficulty(', 'function initMemory(', 'initial difficulty'),
  exactBetween('function initMemory(', 'function updateMemory(', 'initial memory'),
  exactBetween('function updateMemory(', 'function intervalDays(', 'memory update'),
  exactBetween('function intervalDays(', 'function addReviewLog(', 'interval calculation'),
  exactBetween('function addReviewLog(', 'function applyRatingToCard(', 'review log'),
  exactBetween('function applyRatingToCard(', 'function rate(', 'rating state transition'),
  exactBetween('function rate(', 'function preview(', 'persisted rating'),
];

const initialStorage = new Map();
const storage = {
  getItem(key) { return initialStorage.has(key) ? initialStorage.get(key) : null; },
  setItem(key, value) { initialStorage.set(key, String(value)); },
  removeItem(key) { initialStorage.delete(key); },
};
const window = {};
const context = {
  window, localStorage: storage, console: { error() {}, info() {} },
  Date, Math, Number, String, Object, Array, Set, Map, JSON, Promise, Error,
  DAY: 86400000, MINUTE: 60000,
  FSRS_VERSION: 'FSRS-6-default+song-learning-steps-v1',
  W: [0.212,1.2931,2.3065,8.2956,6.4133,0.8334,3.0194,0.001,1.8722,0.1666,0.796,1.4835,0.0614,0.2629,1.6483,0.6014,1.8729,0.5425,0.0912,0.0658,0.1542],
  STORE_KEY: 'aniSrsScheduleV1', RECOVERY_PREFIX: 'aniSrsScheduleRecoveryV1_',
  FACTOR: Math.pow(0.9, -1 / 0.1542) - 1,
  persistenceBlocked: false, recoveryRaw: null, store: null,
  notify() {},
  clone: x => JSON.parse(JSON.stringify(x)),
  clamp: (x, min, max) => Math.min(max, Math.max(min, x)),
  validStates: new Set(['new', 'learning', 'review', 'suspended']),
};
vm.createContext(context);
vm.runInContext(fragments.join('\n'), context, { timeout: 1000, filename: 'exact-srs-functions.js' });

let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('PASS ' + name); }
  catch (error) { console.error('FAIL ' + name + '\n' + error.stack); process.exitCode = 1; }
}
function freshStore() { return context.emptyStore(); }
function card(state, now, overrides = {}) {
  return {
    ...context.makeCard('song-1', now - 2 * context.DAY),
    state, dueAt: now - 1, lastReviewedAt: now - 2 * context.DAY,
    stability: 3, difficulty: 5, reps: 2, lapses: 0,
    learningStep: 0, relearning: false, reviewLog: [], ...overrides,
  };
}
function dueFor(grade, now, overrides = {}) {
  context.store = freshStore();
  return context.applyRatingToCard(
    { ...context.makeCard('song-1', now), ...overrides }, grade, now
  );
}

test('default schedule has stable schema and bounded settings', () => {
  const s = freshStore();
  assert.equal(s.schemaVersion, 1);
  assert.equal(s.algorithm, 'FSRS-6-default+song-learning-steps-v1');
  assert.deepEqual(JSON.parse(JSON.stringify(s.settings.learningStepsMinutes)), [1, 10]);
  assert.equal(context.isValidSchedule(s), true);
});

test('validator rejects invalid schema, settings, state, IDs and review logs', () => {
  const valid = freshStore();
  assert.equal(context.isValidSchedule({ ...valid, schemaVersion: 2 }), false);
  assert.equal(context.isValidSchedule({ ...valid, settings: { ...valid.settings, desiredRetention: 0.2 } }), false);
  assert.equal(context.isValidSchedule({ ...valid, cards: { x: { ...context.makeCard('y', 1) } } }), false);
  assert.equal(context.isValidSchedule({ ...valid, cards: { x: { ...context.makeCard('x', 1), state: 'unknown' } } }), false);
  assert.equal(context.isValidSchedule({ ...valid, cards: { x: { ...context.makeCard('x', 1), reviewLog: {} } } }), false);
});

test('invalid JSON is quarantined before an empty schedule is returned', () => {
  const raw = '{broken schedule';
  initialStorage.clear();
  initialStorage.set('aniSrsScheduleV1', raw);
  context.persistenceBlocked = false;
  context.recoveryRaw = null;
  const loaded = context.loadStore();
  const recovery = [...initialStorage.entries()].find(([key]) => key.startsWith('aniSrsScheduleRecoveryV1_'));
  assert.ok(recovery, 'a recovery copy is stored');
  assert.equal(recovery[1], raw);
  assert.equal(initialStorage.has('aniSrsScheduleV1'), false);
  assert.equal(context.recoveryRaw, raw);
  assert.equal(loaded.schemaVersion, 1);
  assert.equal(Object.keys(loaded.cards).length, 0);
});

test('quarantine failure blocks future writes and preserves original raw value', () => {
  const raw = '{"schemaVersion":99}';
  initialStorage.clear();
  initialStorage.set('aniSrsScheduleV1', raw);
  const original = storage.setItem;
  storage.setItem = () => { throw new Error('quota'); };
  context.persistenceBlocked = false;
  context.recoveryRaw = null;
  const loaded = context.loadStore();
  storage.setItem = original;
  assert.equal(loaded.schemaVersion, 1);
  assert.equal(context.persistenceBlocked, true);
  assert.equal(initialStorage.get('aniSrsScheduleV1'), raw);
  assert.equal(context.recoveryRaw, raw);
});

test('new-card Again enters first learning step for one minute', () => {
  const now = 1700000000000, original = context.makeCard('song-1', now);
  context.store = freshStore();
  const rated = context.applyRatingToCard(original, 1, now);
  assert.equal(rated.state, 'learning');
  assert.equal(rated.learningStep, 0);
  assert.equal(rated.dueAt, now + 60000);
  assert.equal(rated.reps, 1);
  assert.equal(original.state, 'new');
  assert.equal(original.reps, 0);
});

test('new-card Hard uses hard-step delay and Good advances to the second learning step', () => {
  const now = 1700000000000;
  const hard = dueFor(2, now);
  assert.equal(hard.state, 'learning');
  assert.equal(hard.learningStep, 0);
  assert.equal(hard.dueAt, now + 5 * 60000);
  const good = dueFor(3, now);
  assert.equal(good.state, 'learning');
  assert.equal(good.learningStep, 1);
  assert.equal(good.dueAt, now + 10 * 60000);
});

test('new-card Easy graduates directly with configured day delay', () => {
  const now = 1700000000000;
  const easy = dueFor(4, now);
  assert.equal(easy.state, 'review');
  assert.equal(easy.learningStep, 0);
  assert.equal(easy.dueAt, now + 4 * context.DAY);
});

test('learning Again restarts first step and learning Hard uses step-specific delay', () => {
  const now = 1700000000000;
  const again = dueFor(1, now, { state: 'learning', learningStep: 1, stability: 2, difficulty: 5 });
  assert.equal(again.state, 'learning');
  assert.equal(again.learningStep, 0);
  assert.equal(again.dueAt, now + 60000);
  const hardAtStepZero = dueFor(2, now, { state: 'learning', learningStep: 0, stability: 2, difficulty: 5 });
  assert.equal(hardAtStepZero.dueAt, now + 5 * 60000);
  const hardAtStepOne = dueFor(2, now, { state: 'learning', learningStep: 1, stability: 2, difficulty: 5 });
  assert.equal(hardAtStepOne.dueAt, now + 20 * 60000);
});

test('learning Good advances once then graduates on the next Good', () => {
  const now = 1700000000000;
  const stepOne = dueFor(3, now, { state: 'learning', learningStep: 0, stability: 2, difficulty: 5 });
  assert.equal(stepOne.state, 'learning');
  assert.equal(stepOne.learningStep, 1);
  assert.equal(stepOne.dueAt, now + 10 * 60000);
  const graduated = dueFor(3, now, { state: 'learning', learningStep: 1, stability: 2, difficulty: 5 });
  assert.equal(graduated.state, 'review');
  assert.equal(graduated.learningStep, 0);
  assert.equal(graduated.dueAt, now + graduated.lastIntervalDays * context.DAY);
});

test('learning Easy graduates and respects configured minimum graduating days', () => {
  const now = 1700000000000;
  const easy = dueFor(4, now, { state: 'learning', learningStep: 1, stability: 2, difficulty: 5 });
  assert.equal(easy.state, 'review');
  assert.equal(easy.relearning, false);
  assert.ok(easy.lastIntervalDays >= 4);
  assert.equal(easy.dueAt, now + easy.lastIntervalDays * context.DAY);
});

test('review Again enters relearning and increments lapses', () => {
  const now = 1700000000000;
  const rated = dueFor(1, now, { state: 'review', stability: 3, difficulty: 5, lapses: 2 });
  assert.equal(rated.state, 'learning');
  assert.equal(rated.relearning, true);
  assert.equal(rated.learningStep, 0);
  assert.equal(rated.lapses, 3);
  assert.equal(rated.dueAt, now + 10 * 60000);
});

test('review Hard/Good/Easy stay in review and use interval calculation', () => {
  const now = 1700000000000;
  for (const grade of [2, 3, 4]) {
    const rated = dueFor(grade, now, { state: 'review', stability: 3, difficulty: 5, lapses: 1 });
    assert.equal(rated.state, 'review');
    assert.equal(rated.relearning, false);
    assert.equal(rated.lapses, 1);
    assert.equal(rated.dueAt, now + rated.lastIntervalDays * context.DAY);
    assert.ok(rated.lastIntervalDays >= 1 && rated.lastIntervalDays <= 36500);
  }
});

test('relearning Hard uses relearn delay while Good graduates back to review', () => {
  const now = 1700000000000;
  const hard = dueFor(2, now, { state: 'learning', learningStep: 0, relearning: true, stability: 2, difficulty: 5 });
  assert.equal(hard.state, 'learning');
  assert.equal(hard.dueAt, now + 10 * 60000);
  const good = dueFor(3, now, { state: 'learning', learningStep: 0, relearning: true, stability: 2, difficulty: 5 });
  assert.equal(good.state, 'review');
  assert.equal(good.relearning, false);
  assert.equal(good.dueAt, now + good.lastIntervalDays * context.DAY);
});

test('interval rounding is bounded by configured maximum and minimum one day', () => {
  context.store = freshStore();
  assert.equal(context.intervalDays({ stability: 0.0001 }), 1);
  context.store.settings.maxIntervalDays = 2;
  assert.equal(context.intervalDays({ stability: 36500 }), 2);
});

test('review log is capped at twenty entries and records post-transition state', () => {
  const now = 1700000000000;
  const c = context.makeCard('song-1', now);
  for (let i = 0; i < 25; i++) context.addReviewLog(c, 3, now + i, i * 1000);
  assert.equal(c.reviewLog.length, 20);
  assert.equal(c.reviewLog[0].at, now + 5);
  assert.equal(c.reviewLog[19].intervalMs, 24 * 1000);
});

test('invalid grade is rejected without mutating the original card', () => {
  const now = 1700000000000;
  context.store = freshStore();
  const original = { ...context.makeCard('song-1', now), state: 'review', stability: 3, difficulty: 5 };
  const before = JSON.stringify(original);
  assert.throws(() => context.applyRatingToCard(original, 5, now), /Invalid FSRS rating/);
  assert.equal(JSON.stringify(original), before);
});

test('failed persistence leaves the saved schedule and in-memory schedule unchanged', () => {
  const now = 1700000000000;
  const original = context.makeCard('song-1', now);
  context.store = freshStore();
  context.store.cards['song-1'] = original;
  initialStorage.clear();
  initialStorage.set('aniSrsScheduleV1', JSON.stringify(context.store));
  const priorStore = JSON.stringify(context.store);
  const originalSet = storage.setItem;
  storage.setItem = () => { throw new Error('quota'); };
  const result = context.rate('song-1', 1, now);
  storage.setItem = originalSet;
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'storage');
  assert.equal(JSON.stringify(context.store), priorStore);
  assert.equal(initialStorage.get('aniSrsScheduleV1'), JSON.stringify(context.store));
});

console.log('SRS transition/persistence contract: ' + passed + ' tests passed.');

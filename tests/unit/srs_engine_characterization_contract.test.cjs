'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('src/scripts/script_020.htmlpart', 'utf8')
  .replace(/^<script[^>]*>/, '')
  .replace(/<\/script>\s*$/, '');
let assertions = 0;
function equal(actual, expected, message) {
  assertions++;
  assert.equal(actual, expected, message);
}
function ok(value, message) {
  assertions++;
  assert.ok(value, message);
}

const DAY = 86400000;
const MINUTE = 60000;
const STORE_KEY = 'aniSrsScheduleV1';
const RECOVERY_PREFIX = 'aniSrsScheduleRecoveryV1_';
const SETTINGS = {
  dailyNew: 30, batchSize: 25, desiredRetention: 0.9,
  learningStepsMinutes: [1, 10], hardStepMinutes: 5, relearnMinutes: 10,
  easyGraduatingDays: 4, maxIntervalDays: 36500
};

function makeCard(id, state = 'new', now = 1700000000000, extra = {}) {
  return {
    songId: String(id), state, resumeState: state, createdAt: now, dueAt: now,
    firstReviewedAt: null, lastReviewedAt: null, lastRating: null,
    lastIntervalDays: 0, reps: 0, lapses: 0, learningStep: 0,
    relearning: false, stability: null, difficulty: null, reviewLog: [],
    ...extra
  };
}
function makeStore(cards = {}, settings = {}) {
  return JSON.stringify({
    schemaVersion: 1, algorithm: 'FSRS-6-default+song-learning-steps-v1',
    createdAt: new Date(0).toISOString(),
    settings: { ...SETTINGS, ...settings }, cards
  });
}
function boot(raw = null, { failWrites = false } = {}) {
  const values = new Map();
  if (raw !== null) values.set(STORE_KEY, raw);
  const localStorage = {
    getItem(key) { return values.has(String(key)) ? values.get(String(key)) : null; },
    setItem(key, value) {
      if (failWrites) throw new Error('synthetic quota/write failure');
      values.set(String(key), String(value));
    },
    removeItem(key) { values.delete(String(key)); },
    key(index) { return [...values.keys()][index] ?? null; },
    get length() { return values.size; },
    _values: values
  };
  const document = { readyState: 'loading', addEventListener() {} };
  const window = {
    __aniSuppressPersistenceForRestoreV828: false,
    __aniHistoryAPIv51: {
      getSong(id) { return id === 'missing' ? null : [null, String(id)]; },
      isBlacklisted(id) { return String(id) === 'blacklisted'; },
      getSongTag() { return ''; },
      setSongTag() { return { ok: true, tag: '' }; }
    },
    toast() {},
    showToast() {}
  };
  const context = {
    window, document, localStorage,
    console: { error() {}, warn() {}, info() {}, log() {} },
    setTimeout() { return 1; }, clearTimeout() {},
    setInterval() { return 1; }, clearInterval() {},
    MutationObserver: class { observe() {} disconnect() {} }
  };
  vm.runInNewContext(source, context, { filename: 'script_020.htmlpart' });
  return { api: window.__aniSRSAPI, localStorage, window };
}

const now = 1700000000000;
const blank = boot();
ok(!!blank.api, 'SRS API is exported before DOMContentLoaded');
equal(blank.api.version, 'FSRS-6-default+song-learning-steps-v1',
  'FSRS algorithm version is explicit');
ok(blank.api.isValidSchedule(JSON.parse(makeStore())),
  'valid empty schedule passes validation');
const invalidSettings = JSON.parse(makeStore({}, { desiredRetention: 0.99 }));
equal(blank.api.isValidSchedule(invalidSettings), false,
  'out-of-range desired retention is rejected');

const previews = [
  { grade: 1, state: 'learning', delay: MINUTE },
  { grade: 2, state: 'learning', delay: 5 * MINUTE },
  { grade: 3, state: 'learning', delay: 10 * MINUTE },
  { grade: 4, state: 'review', delay: 4 * DAY }
];
for (const item of previews) {
  const preview = blank.api.preview('preview-' + item.grade, item.grade, now);
  equal(preview.state, item.state, 'new-card grade ' + item.grade + ' selects expected state');
  equal(preview.dueAt, now + item.delay, 'new-card grade ' + item.grade + ' selects expected delay');
  equal(preview.intervalMs, item.delay, 'new-card grade ' + item.grade + ' reports expected interval');
}

const learningSeed = makeStore({ '101': makeCard('101') });
const learning = boot(learningSeed);
const ratedLearning = learning.api.rate('101', 3, now);
equal(ratedLearning.ok, true, 'rating an enrolled new card succeeds');
equal(ratedLearning.card.state, 'learning', 'Good on new card enters learning');
equal(ratedLearning.card.learningStep, 1, 'Good advances to second learning step');
equal(ratedLearning.card.dueAt, now + 10 * MINUTE, 'second learning step uses ten-minute delay');
equal(ratedLearning.card.reps, 1, 'rating increments repetition count');
equal(ratedLearning.card.reviewLog.length, 1, 'rating appends review log');
const persistedAfterGood = learning.localStorage.getItem(STORE_KEY);
const invalidGrade = learning.api.rate('101', 5, now + MINUTE);
equal(invalidGrade.ok, false, 'invalid rating is rejected');
equal(invalidGrade.reason, 'algorithm', 'invalid rating reports algorithm failure');
equal(learning.localStorage.getItem(STORE_KEY), persistedAfterGood,
  'invalid rating does not write schedule changes');

const reviewSeedCard = makeCard('201', 'review', now - 3 * DAY, {
  resumeState: 'review', stability: 10, difficulty: 5,
  firstReviewedAt: now - 10 * DAY, lastReviewedAt: now - 2 * DAY,
  dueAt: now - 1, reps: 4, lapses: 2,
  reviewLog: Array.from({ length: 20 }, (_, i) => ({ at: i, grade: 3 }))
});
const review = boot(makeStore({ '201': reviewSeedCard }));
const lapse = review.api.rate('201', 1, now);
equal(lapse.ok, true, 'Again on a review card succeeds');
equal(lapse.card.state, 'learning', 'Again on a review card enters relearning');
equal(lapse.card.relearning, true, 'review lapse marks relearning mode');
equal(lapse.card.lapses, 3, 'review lapse increments lapse count');
equal(lapse.card.dueAt, now + 10 * MINUTE, 'review lapse uses configured relearning delay');
equal(lapse.card.reviewLog.length, 20, 'review log remains capped at twenty records');

const quotaSeed = makeStore({ '301': makeCard('301') });
const quota = boot(quotaSeed, { failWrites: true });
const quotaResult = quota.api.rate('301', 4, now);
equal(quotaResult.ok, false, 'storage failure rejects rating');
equal(quotaResult.reason, 'storage', 'storage failure is reported');
equal(quota.api.snapshot().cards['301'].state, 'new',
  'storage failure does not mutate in-memory card');
equal(quota.localStorage.getItem(STORE_KEY), quotaSeed,
  'storage failure leaves original persisted bytes unchanged');

const invalidRaw = '{"schemaVersion":1,"settings":{},"cards":[]}';
const quarantined = boot(invalidRaw);
equal(quarantined.localStorage.getItem(STORE_KEY), null,
  'invalid schedule is removed from active key after quarantine');
const recovery = [...quarantined.localStorage._values.entries()]
  .find(([key]) => key.startsWith(RECOVERY_PREFIX));
ok(!!recovery, 'invalid schedule is copied to a recovery key');
equal(recovery[1], invalidRaw, 'recovery copy preserves original raw bytes');
equal(Object.keys(quarantined.api.snapshot().cards).length, 0,
  'invalid schedule starts with an empty active schedule');

const quarantineBlocked = boot(invalidRaw, { failWrites: true });
equal(quarantineBlocked.localStorage.getItem(STORE_KEY), invalidRaw,
  'failed quarantine keeps original invalid bytes in place');
equal(quarantineBlocked.api.setSetting('dailyNew', 12), false,
  'persistence remains blocked when recovery copy cannot be written');
equal(quarantineBlocked.localStorage.getItem(STORE_KEY), invalidRaw,
  'blocked persistence does not overwrite original data');

const due = makeCard('401', 'review', now - DAY, {
  resumeState: 'review', stability: 10, difficulty: 5,
  lastReviewedAt: now - 2 * DAY, dueAt: now - 1, reps: 2
});
const fresh = makeCard('402', 'new', now, { dueAt: now });
const session = boot(makeStore({ '401': due, '402': fresh }, { batchSize: 1, dailyNew: 30 }));
const chosen = session.api.chooseSession(now, []);
equal(chosen.ids.length, 1, 'batch size caps selected session');
equal(chosen.ids[0], '401', 'due review card is selected before new card');
const excluded = session.api.chooseSession(now, ['401']);
equal(excluded.ids.includes('401'), false, 'explicitly excluded song is not selected');

console.log('PASS SRS engine characterization contract: ' + assertions + ' assertions');

#!/usr/bin/env node
'use strict';

// Contract for post-reload localStorage snapshots in V82.85.3.
// A fresh page may persist the SRS module's default empty schedule during
// pagehide. That one app-owned initialization key is not data loss. Every
// pre-existing key/value must still survive byte-for-byte, and no other
// new key is allowed.

const assert = require('node:assert/strict');

const SRS_KEY = 'aniSrsScheduleV1';
const SRS_ALGORITHM = 'FSRS-6-default+song-learning-steps-v1';
const DEFAULT_SETTINGS = {
  dailyNew: 30,
  batchSize: 25,
  desiredRetention: 0.9,
  learningStepsMinutes: [1, 10],
  hardStepMinutes: 5,
  relearnMinutes: 10,
  easyGraduatingDays: 4,
  maxIntervalDays: 36500,
};

function isValidDefaultEmptySchedule(raw) {
  let value;
  try {
    value = typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    return false;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  if (value.schemaVersion !== 1 || value.algorithm !== SRS_ALGORITHM) return false;
  if (typeof value.createdAt !== 'string' || !Number.isFinite(Date.parse(value.createdAt))) return false;
  if (!value.settings || typeof value.settings !== 'object' || Array.isArray(value.settings)) return false;
  if (!value.cards || typeof value.cards !== 'object' || Array.isArray(value.cards)) return false;
  if (Object.keys(value.cards).length !== 0) return false;
  if (Object.keys(value).sort().join(',') !== 'algorithm, cards, createdAt, schemaVersion, settings') return false;
  if (JSON.stringify(value.settings) !== JSON.stringify(DEFAULT_SETTINGS)) return false;
  return true;
}

function validateReloadSnapshot(before, after) {
  for (const [key, value] of Object.entries(before)) {
    if (!Object.hasOwn(after, key)) return { ok: false, reason: `pre-existing key removed: ${key}` };
    if (after[key] !== value) return { ok: false, reason: `pre-existing value changed: ${key}` };
  }

  const added = Object.keys(after).filter(key => !Object.hasOwn(before, key));
  if (added.length === 0) return { ok: true, reason: 'all existing values preserved; no new keys' };
  if (added.length !== 1 || added[0] !== SRS_KEY) {
    return { ok: false, reason: `unexpected new keys: ${added.join(', ')}` };
  }
  if (!isValidDefaultEmptySchedule(after[SRS_KEY])) {
    return { ok: false, reason: 'new SRS key is not the valid default empty schedule' };
  }
  return { ok: true, reason: 'all existing values preserved; valid default empty SRS schedule initialized' };
}

const emptySchedule = JSON.stringify({
  schemaVersion: 1,
  algorithm: SRS_ALGORITHM,
  createdAt: '2026-10-18T06:55:28.795Z',
  settings: DEFAULT_SETTINGS,
  cards: {},
});

function expectPass(name, before, after) {
  const result = validateReloadSnapshot(before, after);
  assert.equal(result.ok, true, `${name}: ${result.reason}`);
  console.log(`PASS ${name}`);
}
function expectFail(name, before, after) {
  const result = validateReloadSnapshot(before, after);
  assert.equal(result.ok, false, `${name}: unexpected pass`);
  console.log(`PASS ${name} (rejected: ${result.reason})`);
}

expectPass('existing keys and values survive with no new keys', { a: '1' }, { a: '1' });
expectPass('valid default empty SRS schedule may initialize on reload', { a: '1' }, { a: '1', [SRS_KEY]: emptySchedule });
expectPass('existing SRS schedule remains byte-identical', { [SRS_KEY]: emptySchedule, a: '1' }, { [SRS_KEY]: emptySchedule, a: '1' });
expectFail('changed pre-existing value is rejected', { a: '1' }, { a: '2', [SRS_KEY]: emptySchedule });
expectFail('unrelated new key is rejected', { a: '1' }, { a: '1', unexpected: 'x' });
expectFail('non-empty or malformed new SRS schedule is rejected', { a: '1' }, { a: '1', [SRS_KEY]: JSON.stringify({ ...JSON.parse(emptySchedule), cards: { song1: { state: 'new' } } }) });
expectFail('deleted pre-existing key is rejected', { a: '1', b: '2' }, { a: '1' });

console.log('Result: 7/7 snapshot contract cases passed.');

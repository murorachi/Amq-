#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('src/scripts/script_028.htmlpart', 'utf8');
const declaration = 'function validateRoomPoolBounds(';
assert.equal(source.split(declaration).length - 1, 1,
  'one shared room pool bounds validator remains');
assert.equal((source.match(/validateRoomPoolBounds\(/g) || []).length, 3,
  'the shared validator has exactly two consumers');
for (const message of [
  '年份範圍包含空白或非法值，請填入 1900–2100 的整數。',
  '難度範圍包含空白或非法值，請填入 0–100 的數值。',
  '年份下限不能大於上限。',
  '難度下限不能大於上限。'
]) {
  assert.equal(source.split(message).length - 1, 1,
    'validation message is defined only by the shared helper: ' + message);
}

const start = source.indexOf(declaration);
const end = source.indexOf('\n function strictPoolList(', start);
assert.notEqual(start, -1, 'shared validator declaration exists');
assert.notEqual(end, -1, 'shared validator extraction boundary exists');
const helperSource = source.slice(start, end).trim();
const validate = vm.runInNewContext('(' + helperSource + ')');

assert.equal(validate(1900, 2100, 0, 100), undefined,
  'inclusive valid bounds are accepted');
assert.throws(() => validate(null, 2100, 0, 100),
  /年份範圍包含空白或非法值/, 'missing year bound is rejected');
assert.throws(() => validate(1900, 2100, null, 100),
  /難度範圍包含空白或非法值/, 'missing difficulty bound is rejected');
assert.throws(() => validate(2101, 2100, 0, 100),
  /年份下限不能大於上限/, 'inverted year bounds are rejected');
assert.throws(() => validate(1900, 2100, 101, 100),
  /難度下限不能大於上限/, 'inverted difficulty bounds are rejected');
assert.throws(() => validate(null, 2100, null, 100),
  /年份範圍包含空白或非法值/, 'year validation retains precedence');
assert.throws(() => validate(2101, 1900, 101, 0),
  /年份下限不能大於上限/, 'year inversion retains precedence over difficulty inversion');

console.log('PASS multiplayer room pool bounds validation dedup contract: 14 assertions');

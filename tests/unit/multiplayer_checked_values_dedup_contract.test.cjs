#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('src/scripts/script_028.htmlpart', 'utf8');
const helper = "const checked=selector=>[...view.querySelectorAll(selector+':checked')].map(el=>selector.includes('song-type')?Number(el.value):el.value);";
assert.equal(source.split(helper).length - 1, 1, 'one shared checked helper remains');
assert.equal((source.match(/function readRoomFiltersFromUi\(/g) || []).length, 1);
assert.equal((source.match(/function createSettings\(/g) || []).length, 1);
assert.equal((source.match(/async function configureFromUi\(/g) || []).length, 1);
assert.equal((source.match(/const checked=selector=>/g) || []).length, 1, 'no local duplicates remain');
const selected = {
  '[data-create-song-type]:checked': [{value:'2'}, {value:'3'}],
  '[data-create-season]:checked': [{value:'Spring'}, {value:'Fall'}]
};
const view = { querySelectorAll(selector) { return selected[selector] || []; } };
const fn = vm.runInNewContext('(' + helper.slice('const checked='.length, -1) + ')', {view});
assert.deepEqual(Array.from(fn('[data-create-song-type]')), [2, 3]);
assert.deepEqual(Array.from(fn('[data-create-season]')), ['Spring', 'Fall']);
assert.deepEqual(Array.from(fn('[data-create-anime-type]')), []);
console.log('PASS multiplayer checked-value helper deduplication: 7 assertions');

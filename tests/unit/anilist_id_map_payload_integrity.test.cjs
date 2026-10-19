'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('src/scripts/script_030.htmlpart', 'utf8');
const manifest = JSON.parse(fs.readFileSync('reports/FRAGMENT_MANIFEST.json', 'utf8'));
const openTag = '<script type="application/json" id="aniAnilistIdMapV8237">';
const closeTag = '</script>';
assert.equal(source.split(openTag).length - 1, 1,
  'AniList ID mapping has exactly one expected wrapper');
const start = source.indexOf(openTag) + openTag.length;
const end = source.indexOf(closeTag, start);
assert.ok(end > start, 'AniList ID mapping has a closing script tag');
const mapping = JSON.parse(source.slice(start, end));
const entries = Object.entries(mapping);
assert.ok(entries.length > 0, 'mapping contains ID pairs');

for (const [sourceId, targetId] of entries) {
  assert.match(sourceId, /^\d+$/,
    'each source ID is a numeric string');
  assert.ok(Number.isSafeInteger(Number(sourceId)) && Number(sourceId) > 0,
    'each source ID is a positive safe integer');
  assert.ok(Number.isSafeInteger(targetId) && targetId > 0,
    'each target AniList ID is a positive safe integer');
}

const manifestEntry = manifest.fragments.find(x => x.path === 'src/scripts/script_030.htmlpart');
assert.ok(manifestEntry, 'manifest registers the mapping payload');
assert.equal(manifestEntry.script_type, 'application/json',
  'mapping is declared as JSON rather than executable JavaScript');
assert.equal(manifestEntry.role, 'json-id-mapping-payload',
  'manifest identifies the mapping payload role');
assert.equal(manifestEntry.executable_heuristic, false,
  'mapping is not classified as executable code');

console.log('PASS AniList ID mapping integrity: entries=' + entries.length +
  ' uniqueTargetIds=' + new Set(entries.map(([, value]) => value)).size);

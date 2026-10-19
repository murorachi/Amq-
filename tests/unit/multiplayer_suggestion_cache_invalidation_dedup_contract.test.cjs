#!/usr/bin/env node
'use strict';

// Protect the single source of truth for anime suggestion cache invalidation.
const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('src/scripts/script_028.htmlpart', 'utf8');
const invalidation = "for(const k of Object.keys(suggestionCache))if(k.startsWith('anime|'))delete suggestionCache[k]";
assert.equal(source.split(invalidation).length - 1, 1,
  'anime suggestion cache invalidation loop exists exactly once');

const refreshStart = source.indexOf('window.__aniRefreshChineseSuggestionsV8237=()=>{');
assert.notEqual(refreshStart, -1, 'refresh function exists');
const refreshEnd = source.indexOf('};', refreshStart);
assert.notEqual(refreshEnd, -1, 'refresh function has a terminator');
const refreshBody = source.slice(refreshStart, refreshEnd + 2);
assert.ok(refreshBody.includes(invalidation),
  'refresh function owns anime cache invalidation');
assert.ok(refreshBody.includes("for(const field of ['anime','artist','title'])"),
  'refresh function still refreshes all suggestion fields');

const languageChangeStart = source.indexOf("$('mpNameLanguage')?.addEventListener('change',");
assert.notEqual(languageChangeStart, -1, 'display-language change listener exists');
const languageChangeEnd = source.indexOf("window.__aniMultiplayerUIV82=", languageChangeStart);
assert.notEqual(languageChangeEnd, -1, 'language listener section has a boundary');
const languageChange = source.slice(languageChangeStart, languageChangeEnd);
assert.ok(languageChange.includes('window.__aniRefreshChineseSuggestionsV8237?.();'),
  'language change delegates cache invalidation and refresh to the shared function');
assert.ok(!languageChange.includes(invalidation),
  'language change does not repeat the cache invalidation loop');

console.log('PASS suggestion cache invalidation dedup contract: 9 assertions');

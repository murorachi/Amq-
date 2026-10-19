#!/usr/bin/env node
'use strict';

// Contract tests for the two intentionally duplicated audio-failure callbacks.
// They currently share a body but capture different lexical state. This test
// proves the existing branches before any future helper extraction.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('src/scripts/script_028.htmlpart', 'utf8');
const callbacks = [];
const marker = /const failed=\(\)=>\{/g;
let match;
while ((match = marker.exec(source))) {
  const open = source.indexOf('{', match.index + match[0].length - 1);
  let depth = 0;
  let quote = '';
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  let end = -1;
  for (let i = open; i < source.length; i++) {
    const c = source[i], next = source[i + 1];
    if (lineComment) { if (c === '\n') lineComment = false; continue; }
    if (blockComment) { if (c === '*' && next === '/') { blockComment = false; i++; } continue; }
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (c === '\\') { escaped = true; continue; }
      if (c === quote) quote = '';
      continue;
    }
    if (c === '/' && next === '/') { lineComment = true; i++; continue; }
    if (c === '/' && next === '*') { blockComment = true; i++; continue; }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue; }
    if (c === '{') depth++;
    if (c === '}' && --depth === 0) { end = i; break; }
  }
  assert.notEqual(end, -1, 'failed callback has balanced braces');
  callbacks.push(source.slice(open + 1, end));
  marker.lastIndex = end + 1;
}
assert.equal(callbacks.length, 2, 'exactly two audio failed callbacks are under audit');
assert.equal(callbacks[0].replace(/\s+/g, ' ').trim(), callbacks[1].replace(/\s+/g, ' ').trim(),
  'the callbacks remain byte-equivalent after whitespace normalization');

async function runCallback(body, scenario) {
  const calls = [];
  const state = {
    nextAudioSongId: scenario.nextAudioSongId ?? 'song-1',
    nextAudioLoadingFor: scenario.nextAudioLoadingFor ?? 'song-1',
    audio: scenario.active ? scenario.media : {},
    audioSongId: scenario.audioSongId ?? (scenario.active ? 'song-1' : ''),
  };
  let watchdogClears = 0;
  const sandbox = {
    watchdog: 42,
    id: 'song-1',
    a: scenario.media,
    state,
    clearTimeout(value) { assert.equal(value, 42); watchdogClears++; },
    tryNextAudio: async () => { calls.push('tryNextAudio'); },
    setStatus: (...args) => calls.push(['setStatus', ...args]),
    advanceActiveAudioV8261: async (...args) => { calls.push(['advanceActiveAudioV8261', ...args]); },
  };
  vm.runInNewContext('(async function(){' + body + '\n})()', sandbox);
  // Callback code only awaits mocked async work through catch handlers.
  await new Promise(resolve => setImmediate(resolve));
  return { calls, watchdogClears, state };
}

(async () => {
  let assertions = 2;
  for (const [index, body] of callbacks.entries()) {
    const media = { name: 'next-audio' };

    const pending = await runCallback(body, { media });
    assert.equal(pending.watchdogClears, 1, `callback ${index + 1}: clears watchdog on pending failure`);
    assert.deepEqual(pending.calls, ['tryNextAudio'], `callback ${index + 1}: advances pending candidate`);
    assertions += 2;

    const active = await runCallback(body, { media, active: true, audioSongId: 'song-1',
      nextAudioSongId: 'different-song', nextAudioLoadingFor: '' });
    assert.equal(active.watchdogClears, 1, `callback ${index + 1}: clears watchdog on active failure`);
    assert.equal(active.calls.length, 1, `callback ${index + 1}: enters active fallback exactly once`);
    assert.equal(active.calls[0][0], 'advanceActiveAudioV8261');
    assert.equal(active.calls[0][1], 'song-1');
    assert.equal(active.calls[0][2], media);
    assertions += 4;

    const stale = await runCallback(body, { media, nextAudioSongId: 'new-song',
      nextAudioLoadingFor: 'new-song', active: false });
    assert.equal(stale.watchdogClears, 1, `callback ${index + 1}: clears watchdog for stale event`);
    assert.deepEqual(stale.calls, [], `callback ${index + 1}: stale event does not change current audio`);
    assert.equal(stale.state.nextAudioLoadingFor, 'new-song');
    assertions += 3;
  }
  console.log(`PASS multiplayer audio failure callback contract: ${assertions} assertions across ${callbacks.length} callbacks`);
})().catch(error => { console.error(error); process.exitCode = 1; });

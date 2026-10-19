#!/usr/bin/env node
'use strict';

// Contract for the shared multiplayer audio failure handler and both call sites.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('src/scripts/script_028.htmlpart', 'utf8');
const handlerMarker = /function handleAudioFailure\(id,a,watchdog\)\{/g;
const match = handlerMarker.exec(source);
assert.ok(match, 'shared audio failure handler exists');
assert.equal(handlerMarker.exec(source), null, 'exactly one shared handler is defined');

const open = source.indexOf('{', match.index + match[0].length - 1);
let depth = 0, quote = '', escaped = false, lineComment = false, blockComment = false, end = -1;
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
assert.notEqual(end, -1, 'shared handler has balanced braces');
const body = source.slice(open + 1, end);
const callSite = 'const failed=()=>handleAudioFailure(id,a,watchdog);';
assert.equal(source.split(callSite).length - 1, 2, 'both audio flows delegate to the shared handler');

async function runHandler(scenario) {
  const calls = [];
  const media = scenario.media;
  const state = {
    nextAudioSongId: scenario.nextAudioSongId ?? 'song-1',
    nextAudioLoadingFor: scenario.nextAudioLoadingFor ?? 'song-1',
    audio: scenario.active ? media : {},
    audioSongId: scenario.audioSongId ?? (scenario.active ? 'song-1' : ''),
  };
  let watchdogClears = 0;
  const sandbox = {
    state,
    clearTimeout(value) { assert.equal(value, 42); watchdogClears++; },
    tryNextAudio: async () => { calls.push('tryNextAudio'); },
    setStatus: (...args) => calls.push(['setStatus', ...args]),
    advanceActiveAudioV8261: async (...args) => { calls.push(['advanceActiveAudioV8261', ...args]); },
  };
  vm.runInNewContext('(function(id,a,watchdog){' + body + '\\n})("song-1", media, 42)', { ...sandbox, media });
  await new Promise(resolve => setImmediate(resolve));
  return { calls, watchdogClears, state };
}

(async () => {
  let assertions = 4;
  const media = { name: 'next-audio' };

  const pending = await runHandler({ media });
  assert.equal(pending.watchdogClears, 1, 'pending failure clears its watchdog');
  assert.deepEqual(pending.calls, ['tryNextAudio'], 'pending failure advances to the next candidate');
  assertions += 2;

  const active = await runHandler({ media, active: true, audioSongId: 'song-1',
    nextAudioSongId: 'different-song', nextAudioLoadingFor: '' });
  assert.equal(active.watchdogClears, 1, 'active failure clears its watchdog');
  assert.equal(active.calls.length, 1, 'active fallback runs exactly once');
  assert.equal(active.calls[0][0], 'advanceActiveAudioV8261');
  assert.equal(active.calls[0][1], 'song-1');
  assert.equal(active.calls[0][2], media);
  assertions += 5;

  const stale = await runHandler({ media, nextAudioSongId: 'new-song',
    nextAudioLoadingFor: 'new-song', active: false });
  assert.equal(stale.watchdogClears, 1, 'stale event clears its own watchdog');
  assert.deepEqual(stale.calls, [], 'stale event does not alter the newer pending song');
  assert.equal(stale.state.nextAudioLoadingFor, 'new-song');
  assertions += 3;

  console.log('PASS multiplayer audio failure handler contract: ' + assertions + ' assertions');
})().catch(error => { console.error(error); process.exitCode = 1; });

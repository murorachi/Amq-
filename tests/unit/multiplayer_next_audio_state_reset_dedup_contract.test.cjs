#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('src/scripts/script_028.htmlpart', 'utf8');
const declaration = 'function resetNextAudioState(){';
assert.equal(source.split(declaration).length - 1, 1,
  'next-audio state reset has one shared owner');
const resetBlock = "state.nextAudio=null;state.nextAudioCandidates=[];state.nextAudioCandidateIndex=0;state.nextAudioSongId='';state.nextAudioLoadedFor='';state.nextAudioLoadingFor='';state.nextAudioReadyReportedFor=''";
assert.equal(source.split(resetBlock).length - 1, 1,
  'next-audio reset assignments exist only in the helper');
assert.equal((source.match(/resetNextAudioState\(\)/g) || []).length, 4,
  'the helper is used by stopAudio, clearNextAudio and activateNextAudio');

const start = source.indexOf(declaration);
const end = source.indexOf('\n function clearNextAudio(', start);
assert.notEqual(start, -1, 'reset helper declaration exists');
assert.notEqual(end, -1, 'reset helper boundary exists');
const helper = source.slice(start, end).trim();
const context = {state: {
  nextAudio: {}, nextAudioCandidates: ['a'], nextAudioCandidateIndex: 2,
  nextAudioSongId: 'song', nextAudioLoadedFor: 'song',
  nextAudioLoadingFor: 'song', nextAudioReadyReportedFor: 'song'
}};
vm.runInNewContext(helper, context);
context.resetNextAudioState();
assert.equal(context.state.nextAudio, null, 'audio element reference is cleared');
assert.deepEqual(Array.from(context.state.nextAudioCandidates), [],
  'candidate list is cleared');
assert.equal(context.state.nextAudioCandidateIndex, 0, 'candidate index is reset');
assert.equal(context.state.nextAudioSongId, '', 'song ID is cleared');
assert.equal(context.state.nextAudioLoadedFor, '', 'loaded marker is cleared');
assert.equal(context.state.nextAudioLoadingFor, '', 'loading marker is cleared');
assert.equal(context.state.nextAudioReadyReportedFor, '', 'ready marker is cleared');

console.log('PASS multiplayer next-audio state reset dedup contract: 12 assertions');

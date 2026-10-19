#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const sourcePath = path.join(__dirname, '..', '..', 'src', 'scripts', 'script_014.htmlpart');
const wrappedSource = fs.readFileSync(sourcePath, 'utf8')
  .replace(/^<script[^>]*>/, '')
  .replace(/<\/script>\s*$/, '');

function runVolumeInitialization(savedPreference) {
  const values = new Map();
  if (savedPreference !== undefined) values.set('aniQuizVolume', String(savedPreference));

  const slider = {
    value: '70',
    listeners: {},
    addEventListener(name, handler) { this.listeners[name] = handler; }
  };
  const output = { textContent: '70%' };
  const player = {
    volume: 1,
    muted: false,
    listeners: {},
    addEventListener(name, handler) { this.listeners[name] = handler; }
  };
  const root = {
    querySelector() { return null; },
    insertAdjacentElement() {}
  };
  const wrapper = { id: '', className: '', innerHTML: '' };
  const document = {
    documentElement: {},
    getElementById(id) {
      return ({
        quizView: root,
        v44VolumeControl: null,
        v44Volume: slider,
        v44VolumeValue: output,
        audioPlayer: player,
        quizSettingsToggle: null,
        quizAnswer: null
      })[id] ?? null;
    },
    createElement() { return wrapper; }
  };
  const localStorage = {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); }
  };
  class MutationObserver {
    constructor(callback) { this.callback = callback; }
    observe() {}
  }

  vm.runInNewContext(wrappedSource, {
    document,
    localStorage,
    MutationObserver,
    window: {},
    Number,
    String,
    Object,
    Math
  }, { filename: sourcePath });

  return { slider, output, player, values };
}

{
  const state = runVolumeInitialization(undefined);
  assert.equal(state.slider.value, '70', 'missing preference keeps the documented 70% default');
  assert.equal(state.player.volume, 0.7, 'missing preference applies audible 70% volume');
  assert.equal(state.player.muted, false, 'missing preference does not mute the player');
  assert.equal(state.values.get('aniQuizVolume'), '70', 'default is persisted after initialization');
}
console.log('PASS missing quiz volume preference defaults to audible 70% (4 assertions)');

{
  const state = runVolumeInitialization(0);
  assert.equal(state.slider.value, '0', 'explicitly saved zero remains zero');
  assert.equal(state.player.volume, 0, 'explicitly saved zero applies zero volume');
  assert.equal(state.player.muted, true, 'explicitly saved zero remains muted');
}
console.log('PASS explicitly saved zero volume remains respected (3 assertions)');

{
  const state = runVolumeInitialization(35);
  assert.equal(state.slider.value, '35', 'saved nonzero preference is restored');
  assert.equal(state.player.volume, 0.35, 'saved nonzero preference is applied');
  assert.equal(state.player.muted, false, 'saved nonzero preference is not muted');
}
console.log('PASS saved nonzero quiz volume is restored (3 assertions)');
console.log('RESULT 10 assertions passed');

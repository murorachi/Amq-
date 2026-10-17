'use strict';
// Exact-source answer-flow contract tests. All DOM, audio state, history and familiarity
// dependencies are synthetic; no real browser profile, LocalStorage, IndexedDB or server is touched.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const script4 = fs.readFileSync(path.join(root, 'src/scripts/script_004.htmlpart'), 'utf8');
const script1 = fs.readFileSync(path.join(root, 'src/scripts/script_001.htmlpart'), 'utf8');
function exactBetween(source, start, end, label) {
  const a = source.indexOf(start), b = source.indexOf(end, a + start.length);
  assert.ok(a >= 0 && b > a, 'exact-source boundaries found for ' + label);
  return source.slice(a, b).trim();
}
const skipSource = exactBetween(script4, 'function skipUnplayedQuizQuestionV80(', '\nfunction classifyQuiz(', 'unplayed path');
const classifySource = exactBetween(script4, 'function classifyQuiz(', '\nfunction submitQuiz(', 'answer classification');
const submitSource = exactBetween(script4, 'function submitQuiz(', '\nfunction updateQuizAllAnswersV857(', 'answer submission');
const recordLine = script1.split('\n').find(line => line.startsWith('function recordQuizHistoryV51('));
assert.ok(recordLine, 'exact history-record source exists');

let passed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('PASS ' + name); }
  catch (error) { console.error('FAIL ' + name + '\n' + error.stack); process.exitCode = 1; }
}
function makeEnv({ audioStarted = false, target = 'anime', song = null, answer = 'Work', familiarity = 0 } = {}) {
  const events = [], records = [], nodes = new Map();
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, {
      id, value: id === 'quizAnswer' ? answer : '', textContent: '', innerHTML: '', disabled: false,
      classList: { add() {}, remove() {}, toggle() {} }, style: {},
      setAttribute() {}, removeAttribute() {}, querySelectorAll() { return []; }
    });
    return nodes.get(id);
  };
  const work = [10, 'Work', 'Work Alt', 'Spring 2020', 'TV', 2020, 'mal10'];
  const amqSong = [10, 1001, 1, 1, 'Song', 'Artist', 20, 100, 1, 'song.mp3', '', ''];
  const emqSong = [900001, 910001, 1, 0, 'EMQ Song', 'EMQ Artist', null, 0, 0, 'emq.mp3', '', '', '', '', 'EMQ'];
  const quizSong = song || (target === 'emq' ? emqSong : amqSong);
  const status = Object.create(null);
  if (familiarity > 0) status[String(quizSong[1])] = familiarity;
  const window = {
    __aniEmqAPI: {
      isSong: value => ['910001', '910001'].includes(String(Array.isArray(value) ? value[1] : value)),
      getWorkSummary: id => String(id) === '900001' ? [900001, 'EMQ Work', 'EMQ Work Alt'] : null,
      getAliases: id => String(id) === '910001' ? { work: ['EMQ Work'], title: ['EMQ Song'], artist: ['EMQ Artist'] } : {},
    },
    __aniHistoryAPIv51: { record(...args) { records.push({ args, finishedAtRecord: ctx.quizFinished, audioAtRecord: ctx.quizAudioStarted }); } },
    __aniQuizPlanV1: { removeFocusSong() {} },
  };
  const document = {
    body: { classList: { contains: () => false } },
    getElementById: node,
    dispatchEvent: event => { events.push(event); return true; },
  };
  const ctx = {
    window, document, console: { error() {}, warn() {}, debug() {} },
    performance: { now: () => 2500 }, Date, Math, Number, String, Object, Array, Set, Map, JSON, RegExp,
    CustomEvent: class CustomEvent { constructor(type, init = {}) { this.type = type; this.detail = init.detail; } },
    clearTimeout() {},
    quizSong, quizStartedAt: 1000, quizFinished: false, quizAudioStarted: audioStarted,
    quizClipTimer: null, quizAnswerStopAt: 0, quizRound: 0,
    quizSettings: { instantSec: 2, keepHigher: false, acceptPartial: false, emqMode: target === 'emq' ? 'emq' : 'amq' },
    currentQuestionTarget: target === 'emq' ? 'anime' : target,
    activeFocusModeV72: false, activeFocusSongIdsV72: [], quizRoundSeen: new Set(), lastQuestionId: null,
    status, songTags: {}, byAnime: new Map([[10, work]]), songs: [amqSong],
    answerField: () => target === 'emq' ? 'anime' : target,
    st: id => status[String(id)] === undefined ? 0 : status[String(id)],
    save() {}, updateStats() {}, updateQuizCounts() {}, render() {},
    revealAnswer() {}, clearQuizPlaybackV30() {},
    beginQuizHistoryRoundV51() {},
    records, events, nodes,
  };
  vm.createContext(ctx);
  vm.runInContext([
    'var quizSong, quizStartedAt, quizFinished, quizAudioStarted, quizClipTimer, quizAnswerStopAt, quizRound, quizSettings, currentQuestionTarget, activeFocusModeV72, activeFocusSongIdsV72, quizRoundSeen, lastQuestionId, status, songTags, byAnime, songs;',
    'var quizAnswerStopAt=0;',
    'function updateQuizCounts(){} function save(){} function updateStats(){} function render(){}',
    'function revealAnswer(){} function clearQuizPlaybackV30(){} function answerField(){return currentQuestionTarget}',
    'function st(id){return status[String(id)]===undefined?0:status[String(id)]}',
  ].join('\n'), ctx, { timeout: 1000, filename: 'answer-flow-test-harness.js' });
  // Execute the production functions verbatim. The only substitutions are dependency stubs above.
  vm.runInContext([skipSource, classifySource, submitSource].join('\n'), ctx, { timeout: 1000, filename: 'exact-answer-flow.js' });
  return { ctx, events, records, status, nodes, quizSong };
}

test('ordinary answer before successful audio playback is not submitted or recorded', () => {
  const e = makeEnv({ audioStarted: false, target: 'anime', answer: 'Work' });
  e.ctx.submitQuiz(false);
  assert.equal(e.records.length, 0);
  assert.equal(e.status['1001'] || 0, 0);
  assert.equal(e.events.some(x => x.type === 'ani-quiz-answer-submitted'), false);
  assert.match(e.nodes.get('quizStatus').textContent, /音訊尚未成功播放/);
});
test('timer expiry before playback follows unplayed path without history or familiarity mutation', () => {
  const e = makeEnv({ audioStarted: false, target: 'anime' });
  e.ctx.submitQuiz(true);
  assert.equal(e.records.length, 0);
  assert.equal(e.status['1001'] || 0, 0);
  assert.equal(e.ctx.quizFinished, true);
  assert.equal(e.events.filter(x => x.type === 'ani-quiz-unplayed').length, 1);
  assert.equal(e.events.some(x => x.type === 'ani-quiz-answer-submitted'), false);
});
test('played, correct anime answer records once and updates familiarity by song ID', () => {
  const e = makeEnv({ audioStarted: true, target: 'anime', answer: 'Work' });
  e.ctx.submitQuiz(false);
  assert.equal(e.records.length, 1);
  assert.equal(e.records[0].args[0][1], 1001);
  assert.equal(e.records[0].args[1], true);
  assert.equal(e.records[0].finishedAtRecord, true);
  assert.equal(e.records[0].audioAtRecord, true);
  assert.equal(e.status['1001'], 3);
  assert.equal(e.status['10'], undefined, 'work/anime ID must not be used as song familiarity key');
  const result = e.events.find(x => x.type === 'quiz-v35-answered');
  assert.equal(result.detail.songId, '1001');
  assert.equal(result.detail.validAudio, true);
  assert.equal(result.detail.familiarityUpdated, true);
});
test('title/artist support answer records history without changing work-recognition familiarity', () => {
  const e = makeEnv({ audioStarted: true, target: 'title', answer: 'Song', familiarity: 2 });
  e.ctx.submitQuiz(false);
  assert.equal(e.records.length, 1);
  assert.equal(e.records[0].args[5], 'title');
  assert.equal(e.status['1001'], 2);
  const result = e.events.find(x => x.type === 'quiz-v35-answered');
  assert.equal(result.detail.familiarityUpdated, false);
});
test('EMQ answer retains its song ID and EMQ target/source path in history handoff', () => {
  const e = makeEnv({ audioStarted: true, target: 'emq', answer: 'EMQ Work' });
  e.ctx.submitQuiz(false);
  assert.equal(e.records.length, 1);
  assert.equal(e.records[0].args[0][1], 910001);
  assert.equal(e.records[0].args[0][0], 900001);
  assert.equal(e.records[0].args[5], 'anime');
  assert.equal(e.status['910001'], 3, 'EMQ familiarity uses the EMQ song ID');
  assert.equal(e.status['900001'], undefined, 'EMQ work ID is not a familiarity key');
});
test('a finished question cannot be recorded twice', () => {
  const e = makeEnv({ audioStarted: true, target: 'anime', answer: 'Work' });
  e.ctx.submitQuiz(false);
  e.ctx.submitQuiz(false);
  assert.equal(e.records.length, 1);
});
test('played wrong answer records incorrect result and lowers familiarity to heard', () => {
  const e = makeEnv({ audioStarted: true, target: 'anime', answer: 'Definitely not the work', familiarity: 3 });
  e.ctx.submitQuiz(false);
  assert.equal(e.records.length, 1);
  assert.equal(e.records[0].args[1], false);
  assert.equal(e.status['1001'], 1);
  assert.equal(e.status['10'], undefined);
});
test('manual skip after audio starts records one valid-audio incorrect/skip result', () => {
  const e = makeEnv({ audioStarted: true, target: 'anime', answer: '' });
  e.ctx.classifyQuiz(false, '');
  assert.equal(e.records.length, 1);
  assert.equal(e.records[0].args[1], false);
  assert.equal(e.records[0].args[4].includes('答錯／跳過'), true);
  assert.equal(e.status['1001'], 1);
  assert.equal(e.events.find(x => x.type === 'quiz-v35-answered').detail.validAudio, true);
});

console.log('RESULT ' + passed + ' passed, ' + (process.exitCode ? 1 : 0) + ' failed');

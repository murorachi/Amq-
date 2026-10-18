'use strict';
// Ensures the high-risk lifecycle map stays tied to current production source names.
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const s1=read('src/scripts/script_001.htmlpart'),s4=read('src/scripts/script_004.htmlpart'),s25=read('src/scripts/script_025.htmlpart'),s28=read('src/scripts/script_028.htmlpart'),s38=read('src/scripts/script_038.htmlpart'),s40=read('src/scripts/script_040.htmlpart'),s23=read('src/scripts/script_023.htmlpart');
const csv=read('reports/ANSWER_PLAYBACK_MULTIPLAYER_BOUNDARY_V82_81.csv');
const tests=[];function test(name,fn){try{fn();tests.push(name);console.log('PASS '+name)}catch(e){console.error('FAIL '+name+'\n'+e.stack);process.exitCode=1}}
test('boundary map covers all seven high-risk domains',()=>{for(const n of ['answer submission','audio playback lifecycle','history and SRS persistence','AMQ custom practice lists','EMQ custom lists and metadata','multiplayer session and shared question','CSS view and shared primitives'])assert.ok(csv.includes(n),n)});
test('answer lifecycle retains played-audio and duplicate-submit guards',()=>{assert.match(s4,/function submitQuiz\(/);assert.match(s4,/quizAudioStarted/);assert.match(s4,/quizFinished/);assert.match(s1,/function recordQuizHistoryV51\(/)});
test('playback lifecycle owns media events and timer cleanup',()=>{assert.match(s4,/clearQuizPlaybackV30/);assert.match(s4,/quizClipTimer/);assert.match(s28,/canplay|loadeddata/);assert.match(s28,/state\.liveSocket/)});
test('history and SRS boundaries retain storage and recovery APIs',()=>{assert.match(s1,/indexedDB\.open/);assert.match(s1,/aniQuizHistory_v1/);assert.match(s25,/__aniSRSAPI/);assert.match(s23,/function fullRestore\(/)});
test('AMQ list scope preserves separate work/song identifiers and fail-closed flags',()=>{assert.match(s25,/customListIds/);assert.match(s25,/aniQuizCustomListScopeInvalidV8265/);assert.match(s25,/animeSongs\(l\.animeIds\)/)});
test('EMQ list membership maps work IDs, VNDB IDs and direct song IDs',()=>{assert.match(s40,/function listWorkIds\(/);assert.match(s40,/function listSongIds\(/);assert.match(s40,/workIds:\[\],vndbIds:\[\],songIds:\[\]/);assert.match(s38,/AMQ／EMQ 歌曲 ID 衝突/)});
test('multiplayer source and cleanup hooks remain explicit',()=>{assert.match(s28,/function startPoll\(/);assert.match(s28,/function stopPoll\(/);assert.match(s28,/function stopLive\(/);assert.match(s28,/ani-app-navigation/)});
console.log('RESULT '+tests.length+' passed, '+(process.exitCode?1:0)+' failed');

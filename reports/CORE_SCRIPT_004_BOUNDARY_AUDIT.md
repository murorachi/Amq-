# Core script_004 dependency boundary audit (V82.76)

- Source: `src/scripts/script_004.htmlpart`
- Source bytes: 95160
- Source SHA-256: 8f9d41977463d0e1c211948f9c615f116309ec96c556013954c29f5f0222ec9e
- Parser: TypeScript parser; syntax diagnostics: 0
- AST input: manifest modules targeting script_004 are reinserted at their original markers before analysis.
- Scope: static evidence only. This report is not a complete lexical resolver or runtime call graph and makes no source changes.
- The outer IIFE closure contains shared state and helpers. Moving code across this boundary can alter initialization order and closure access even when the HTML output can be rebuilt.

## Shared closure state candidates

The table lists direct declarations in the outer IIFE that are referenced from multiple function owners or assigned at least once. Reads/writes are heuristic identifier-reference counts, not a fully resolved data-flow graph.

| Symbol | Kind | Decl. line | Reads | Writes | Function owners |
|---|---|---:|---:|---:|---:|
| `quizSettings` | variable | 40 | 125 | 4 | 32 |
| `quizSong` | variable | 29 | 113 | 6 | 30 |
| `quizFinished` | variable | 29 | 15 | 9 | 19 |
| `quizActive` | variable | 29 | 9 | 5 | 14 |
| `lastQuestionId` | variable | 29 | 7 | 5 | 11 |
| `quizAudioStarted` | variable | 29 | 6 | 6 | 10 |
| `quizStartedAt` | variable | 29 | 8 | 7 | 9 |
| `readQuizSettingsUI` | function | 41 | 9 | 0 | 9 |
| `activeFocusSongIdsV72` | variable | 40 | 7 | 5 | 8 |
| `currentQuestionTarget` | variable | 29 | 9 | 4 | 8 |
| `nextQuiz` | function | 129 | 11 | 1 | 8 |
| `quizRoundSeen` | variable | 40 | 9 | 0 | 8 |
| `quizRound` | variable | 40 | 9 | 7 | 7 |
| `quizAutoNextPausedV30` | variable | 360 | 6 | 4 | 7 |
| `quizAutoNextRemainingMsV30` | variable | 360 | 4 | 4 | 7 |
| `activeFocusModeV72` | variable | 40 | 7 | 2 | 7 |
| `clearQuizAutoNextV30` | function | 412 | 9 | 0 | 7 |
| `clearQuizPlaybackV30` | function | 432 | 13 | 0 | 7 |
| `quizRootV30` | variable | 350 | 11 | 0 | 7 |
| `updateQuizPlaybackV30` | function | 433 | 9 | 0 | 7 |
| `quizAnswerStopAt` | variable | 40 | 5 | 5 | 6 |
| `quizAutoNextDeadlineV30` | variable | 360 | 7 | 4 | 6 |
| `quizRoundTarget` | variable | 40 | 1 | 6 | 5 |
| `quizClipDeadlineV30` | variable | 359 | 8 | 3 | 5 |
| `quizPracticeMetaV8239` | variable | 462 | 4 | 1 | 5 |
| `countdownV30` | variable | 399 | 14 | 0 | 5 |
| `updateQuizCounts` | function | 126 | 5 | 0 | 5 |
| `optionCache` | variable | 134 | 2 | 3 | 4 |
| `quizPauseClockStartedAtV82` | variable | 434 | 5 | 3 | 4 |
| `quizPausedElapsedV82` | variable | 434 | 3 | 3 | 4 |
| `quizClipTimer` | variable | 40 | 8 | 1 | 4 |
| `submitQuiz` | function | 261 | 7 | 1 | 4 |
| `classifyQuiz` | function | 237 | 4 | 0 | 4 |
| `clearQuizAutoNextTimersV30` | function | 404 | 4 | 0 | 4 |
| `closeQuizSuggestions` | function | 135 | 4 | 0 | 4 |

Full list: `reports/CORE_SCRIPT_004_SHARED_STATE.csv`.

## DOM / browser API call sites

| API | Calls | Function owners | First line |
|---|---:|---:|---:|
| `document.getElementById` | 205 | 43 | 35 |
| `document.createElement` | 19 | 8 | 5 |
| `document.body.classList.contains` | 15 | 14 | 129 |
| `localStorage.setItem` | 14 | 9 | 41 |
| `localStorage.getItem` | 12 | 6 | 42 |
| `performance.now` | 12 | 10 | 244 |
| `document.addEventListener` | 10 | 2 | 134 |
| `window.__aniEmqAPI?.isSong` | 9 | 8 | 227 |
| `window.__aniEmqAPI?.getWorkSummary` | 8 | 7 | 34 |
| `console.error` | 8 | 6 | 36 |
| `document.querySelectorAll` | 6 | 2 | 41 |
| `window.__aniChineseTitleAPIv8237?.getAliases` | 6 | 4 | 133 |
| `document.dispatchEvent` | 5 | 5 | 129 |
| `window.__aniCandidatePoolPolicyV8265.settingNumber` | 4 | 1 | 41 |
| `document.body.classList.remove` | 3 | 3 | 35 |
| `window.__aniSelectedCustomListIdsV825` | 3 | 1 | 41 |
| `document.getElementById('quizSuggestions').classList.remove` | 3 | 3 | 128 |
| `window.__aniEmqAPI?.getAliases` | 3 | 3 | 279 |
| `document.body.appendChild` | 3 | 3 | 369 |
| `window.matchMedia` | 3 | 3 | 458 |
| `document.querySelector` | 2 | 2 | 3 |
| `window.__aniNavigateApp` | 2 | 2 | 38 |
| `window.__aniEmqAPI?.getRows` | 2 | 2 | 126 |
| `window.__aniQuizPauseClockV82?.reset` | 2 | 2 | 129 |
| `window.__aniEmqChineseTitleAPIv8259?.getAliases` | 2 | 2 | 133 |
| `document.createTextNode` | 2 | 1 | 181 |
| `document.getElementById('quizNext')?.removeAttribute` | 2 | 2 | 234 |
| `window.__aniHistoryAPIv51?.record` | 2 | 2 | 253 |
| `window.__aniQuizPlanV1?.clearFocus` | 2 | 2 | 332 |
| `window.__aniHistoryAPIv51?.beginRound` | 2 | 2 | 334 |

Full list: `reports/CORE_SCRIPT_004_API_TOUCHPOINTS.csv`. API coverage is syntactic and only includes recognized property-call prefixes; computed properties and indirect wrappers may be missed.

## Global exports

- L37: `window.__aniEnterQuizV82` (<anonymous@2>)
- L37: `window.__aniDeactivateQuizV82` (<anonymous@2>)
- L47: `window.__aniCandidatePoolPolicyV8265` (<anonymous@2>)
- L127: `window.__aniEmqToggleChangedV1` (<anonymous@2>)
- L130: `window.mediaFiles` (playQuizAudio)
- L130: `window.mediaFiles` (playQuizAudio)
- L136: `window.__aniSelectQuizSuggestionV8272` (<anonymous@2>)
- L306: `window.__aniQuizHandleAudioFailureV857` (<anonymous@2>)
- L309: `window.__aniQuizSubmitV47` (<anonymous@2>)
- L310: `window.__aniQuizClassifyV47` (<anonymous@2>)
- L311: `window.__aniQuizNextV47` (<anonymous@2>)
- L312: `window.__aniQuizStopStateV82` (<anonymous@2>)
- L336: `window.mediaFiles` (<anonymous@2>)
- L431: `window.__aniQuizAutoNextV30` (<anonymous@2>)
- L436: `window.__aniQuizPauseClockV82` (<anonymous@2>)
- L479: `window.__aniSongPracticeMetaAPIv8239` (<anonymous@2>)
- L601: `window.__aniQuizPlanV1` (<anonymous@2>)

## Listener ownership candidates

- L134 (<anonymous@2>): `document.addEventListener('ani-emq-chinese-titles-ready',()=>{optionCache={};const input=document.getElementById('quizAnswer');if(input&&input.value.trim())buildSuggestions()})`
- L332 (<anonymous@2>): `document.addEventListener('click',e=>{if(e.target.closest?.('#blindNextBtn')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();window.__aniNavigateApp?.('quiz');return}if(e.target.closest?.('#quizExit')){e.preventDefault();e.stopPropagation(`
- L333 (<anonymous@2>): `document.addEventListener('ani-app-navigation',e=>{if(e.detail?.view!=='quiz')window.__aniQuizPlanV1?.clearFocus()})`
- L334 (<anonymous@2>): `document.addEventListener('click',e=>{const button=e.target?.closest?.('#quizManualPlayV8262');if(!button)return;if(document.body.classList.contains('quiz-round-paused')){const status=document.getElementById('quizStatus');if(status)status.textContent='本輪已暫停，請先`
- L334 (<anonymous@2>): `document.getElementById('quizAnswer').addEventListener('input',buildSuggestions)`
- L334 (<anonymous@2>): `document.addEventListener('click',e=>{if(!e.target.closest('.quizSuggest'))document.getElementById('quizSuggestions').classList.remove('open')})`
- L339 (<anonymous@2>): `document.getElementById('themeToggle')?.addEventListener('click',()=>applyTheme(!document.body.classList.contains('dark-theme')))`
- L339 (<anonymous@2>): `document.getElementById('quizThemeToggle')?.addEventListener('click',()=>applyTheme(!document.body.classList.contains('dark-theme')))`
- L377 (<anonymous@2>): `document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!settingsOverlayV30.classList.contains('hidden')){settingsOverlayV30.classList.add('hidden');setTimeout(()=>quizSettingsToggleV30?.focus({preventScroll:true}),0)}})`
- L467 (<anonymous@2>): `document.addEventListener('ani-quiz-new-question',()=>{quizQuestionTokenV8239++})`
- L475 (<anonymous@2>): `document.addEventListener('ani-quiz-answer-submitted',event=>{
 const state=window.__aniQuizStateV45||{},id=String(state.quizSong?.[1]??'');if(!id)return;
 const old=getQuizPracticeMetaV8239(id)||{};quizPracticeMetaV8239[id]={...old,lastAnswer:String(event.det`
- L520 (createQuizFloatingDetailV8239): `document.addEventListener('keydown',event=>{if(event.key==='Escape'&&quizFloatingDetailV8239&&!quizFloatingDetailV8239.panel.hidden)quizFloatingDetailV8239.panel.hidden=true})`
- L598 (<anonymous@2>): `document.getElementById(id)?.addEventListener('change',()=>{readQuizSettingsUI();applyQuizDisplaySettingsV30()})`
- L599 (<anonymous@2>): `document.addEventListener('ani-familiarity-updated-v51',()=>{try{updateQuizCounts()}catch(e){}})`

## Timer / animation scheduling candidates

- L129 (nextQuiz): `clearTimeout(quizClipTimer)`
- L230 (skipUnplayedQuizQuestionV80): `clearTimeout(quizClipTimer)`
- L242 (classifyQuiz): `clearTimeout(quizClipTimer)`
- L306 (<anonymous@306>): `setTimeout(()=>{if(quizActive&&quizSong&&String(quizSong[1])===id&&quizFinished&&!document.body.classList.contains('quiz-round-paused'))nextQuiz()},350)`
- L314 (<anonymous@312>): `clearTimeout(quizClipTimer)`
- L334 (<anonymous@334>): `setTimeout(()=>{if(document.activeElement===quizAnswerInput)buildSuggestions()},0)`
- L342 (<anonymous@342>): `setTimeout(()=>document.getElementById('quizSettingsCloseV30')?.focus({preventScroll:true}),0)`
- L375 (<anonymous@375>): `setTimeout(()=>quizSettingsToggleV30?.focus({preventScroll:true}),0)`
- L376 (<anonymous@376>): `setTimeout(()=>quizSettingsToggleV30?.focus({preventScroll:true}),0)`
- L377 (<anonymous@377>): `setTimeout(()=>quizSettingsToggleV30?.focus({preventScroll:true}),0)`
- L404 (clearQuizAutoNextTimersV30): `clearTimeout(quizAutoNextTimerV30)`
- L404 (clearQuizAutoNextTimersV30): `clearInterval(quizAutoNextTickV30)`
- L416 (startQuizAutoNextV30): `setInterval(renderQuizAutoNextV30,150)`
- L417 (startQuizAutoNextV30): `setTimeout(()=>{
  clearQuizAutoNextTimersV30();quizAutoNextDeadlineV30=0;quizAutoNextRemainingMsV30=null;quizAutoNextPausedV30=false;
  if(countdownV30){countdownV30.classList.add('hidden');countdownV30.textContent=''}
  if(!document.body.classList.contains('`
- L432 (clearQuizPlaybackV30): `clearInterval(quizPlaybackTickerV30)`
- L432 (clearQuizPlaybackV30): `clearTimeout(quizStopTimerV30)`
- L508 (<anonymous@508>): `setTimeout(hide,7000)`
- L583 (startQuizPlaybackTickerV30): `setInterval(()=>{
   if(document.body.classList.contains('quiz-round-paused'))return;
   /* V82.1: freeze the clip timer while the pause control is active. */
   if(!quizActive||!quizSong||quizFinished){clearQuizPlaybackV30();return}
   const left=Math.max(0,(`

## Extracted-module constraints

- Existing suggestion text, controller and renderer blocks remain inserted at their original classic-script positions.
- The outer IIFE shares local bindings with quiz settings, candidate-pool assembly, playback state, answer submission, history and event listeners. This audit does not justify extracting those regions yet.
- Next safe step: create a per-responsibility call/DOM/state contract for one bounded region, then add production-source regression assertions before moving it.

## Known limitations

1. Name matching does not resolve shadowing or lexical scopes fully; same-named locals can affect counts.
2. Read/write classification handles simple assignment and increment/decrement patterns, not destructuring, reflective writes, aliases or mutation through object properties.
3. Listener registration through aliases, delegated frameworks, and listeners in later compatibility scripts is outside this fragment's scope.
4. No real-origin, audio, IndexedDB, or multiplayer acceptance is inferred from static analysis.

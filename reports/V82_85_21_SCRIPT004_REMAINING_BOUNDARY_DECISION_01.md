# V82.85.21 Script 004 Remaining Boundary Decision

Date: 2026-10-18
Parent accepted checkpoint: V82.85.20 module contract CI coverage, commit `f3f132762c62f3d26d5bcd1334f35694640a38ae`.
Scope: dependency-boundary decision and CI enforcement only. No product source/module/CSS/manifest/HTML changes.

## Decision

**Do not extract another helper from `src/scripts/script_004.htmlpart) in this checkpoint.** The remaining top-level functions are quiz lifecycle, settings/display, storage/history metadata, API integration, or timer/listener ownership. No remaining non-trivial helper was evidenced as both pure and meaningfully reusable. The tiny local normalization functions inside answer evaluation and tooltip construction are not worthwhile standalone modules.

This is an explicit hold based on dependency evidence, not an assertion that script_004 is fully modularized.

## Evidence reviewed

- `reports/CORE_SCRIPT_004_BOUNDARY_AUDIT.md`: TypeScript parse diagnostics 0; assembled source is 95,160 bytes; outer IIFE closure and lifecycle constraints documented.
- `reports/CORE_SCRIPT_004_SHARED_STATE.csv`: `quizSettings` is referenced across 32 function owners; `quizSong` across 30; `quizFinished` across 19; `quizActive` across 14; `lastQuestionId` across 11. Counts are heuristic and do not fully resolve shadowing or object-property mutation.
- `reports/CORE_SCRIPT_004_API_TOUCHPOINTS.csv`: 205 direct `document.getElementById` call sites, plus localStorage, direct window exports, DOM mutations, listener registrations, and timer/interval/animation calls.
- Six source modules already target this host: `candidate_pool_policy`, `quiz_suggestion_text`, `quiz_suggestion_renderer`, `quiz_suggestion_controller`, `get_quiz_pool`, and `quiz_answer_metadata`.
- The module contract runner now passes all 16 unique Node test files; browser CI passes suggestion integration and answer/playback lifecycle.

## Function-family decisions

| Family | Examples | Decision |
|---|---|---|
| Quiz lifecycle and answer settlement | `enterSpecial`, `nextQuiz`, `classifyQuiz`, `submitQuiz`, `submitQuizAllV857` | Keep coupled until shared-state and settlement-order invariants have an explicit adapter contract. |
| Candidate assembly and answer evaluation | `getQuizPool`, `evaluateQuizTargetAnswerV857` | Keep existing extracted candidate module; evaluator still reads mutable `quizSong`, EMQ APIs, aliases and catalog state. |
| Playback / auto-next | `playQuizAudio`, `startQuizAutoNextV30`, `clearQuizPlaybackV30`, `startQuizPlaybackTickerV30` | Keep together; timer cancellation, pause/resume deadlines and audio events form one lifecycle. |
| Settings / display / reveal | `readQuizSettingsUI`, `loadQuizSettings`, `applyTheme`, `resetQuizRevealInfoV30`, `applyQuizDisplaySettingsV30` | Keep in host; DOM reads/writes and mutable settings are mixed. |
| Practice metadata / history | `saveQuizPracticeMetaV8239`, `getQuizPracticeMetaV8239` and event handlers | Keep until storage adapter, event ordering, and failure/reload contracts are explicit. |
| Tooltips / floating detail | `quizAnswerAliasTooltipTextV8239`, `createQuizFloatingDetailV8239`, `wireQuizInfoDetailActionsV8239` | Keep together; reads current song/API data and owns DOM/listener lifecycle. |

## Changes

- Added the existing `script004_boundary_audit_contract.test.cjs` to the recurring engineering CI workflow, using the portable, pinned TypeScript loader introduced in V82.85.20.
- No extraction was made because no sufficiently safe, non-trivial boundary was demonstrated.

## Validation (ACCEPTED)

- GitHub Actions run 39141674475 passed both source-and-unit and browser-native-origin jobs: https://github.com/murorachi/Amq-/actions/runs/39141674475.
- The script_004 boundary audit contract passed as part of the main workflow, alongside all 16 module contracts, package/matrix contracts and deterministic V82.82 build.
- All browser-native-origin acceptance steps passed.
- Local execution: not run in this environment; acceptance ran in GitHub Actions.

## Open limitations

The static audit is not a full lexical resolver or runtime call graph. It does not fully resolve shadowing, aliases, reflective writes, computed property calls, listeners registered through other fragments, or live service timing. No claim is made for Firefox, real audio-provider playback, live two-client multiplayer, or production-domain storage behavior.

## Rollback

Revert the V82.85.21 boundary decision/workflow commit or return to parent commit `f3f132762c62f3d26d5bcd1334f35694640a38ae`.

## Next task

Audit the remaining large history/SRS fragments (`script_020` and `script_023`) for one meaningful, testable boundary. Do not extract persistence/UI/state logic into a module solely to increase the module count.

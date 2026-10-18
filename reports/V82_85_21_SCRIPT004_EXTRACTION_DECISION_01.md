# V82.85.21 script_004 extraction decision

Date: 2026-10-18
Parent accepted checkpoint: V82.85.20 module contract CI coverage, commit `5ca9e292c17a62990fc7f2d944a0874b2ae37d11`.
Parent acceptance run: https://github.com/murorachi/Amq-/actions/runs/39141098175.
Scope: dependency-boundary decision and documentation only. No production source, manifest, CSS or product HTML change.

## Evidence rechecked

- Locked source: `src/scripts/script_004.htmlpart`, 95,160 bytes, SHA-256 `8f9d41977463d0e1c211948f9c615f116309ec96c556013954c29f5f0222ec9e`.
- The existing TypeScript AST report reconstructs the six modules inserted into this host at their original positions before auditing the outer IIFE.
- The report records cross-function shared state such as `quizSettings` (32 function owners), `quizSong` (30), `quizFinished` (19), `quizActive` (14), and `quizAudioStarted` (10).
- It records 205 `document.getElementById` calls across 43 owners, localStorage access across multiple owners, listener registration, direct window exports and timer/animation sites.
- The current CI run already executes 16 unique Node contracts for all 13 source modules; source/build/package/matrix and browser acceptance passed in run 39141098175.

## Candidate dispositions

| Candidate | Evidence | Decision |
|---|---|---|
| `renderQuizAutoNextV30` | Reads shared `countdownV30`, `quizAutoNextPausedV30`, and remaining-time state; writes DOM visibility/text. | Reject as a pure extraction. |
| `clearQuizAutoNextV30` | Resets several closure variables, calls timer cleanup, and updates the countdown element. | Reject: lifecycle and mutable-state owner. |
| `pauseQuizAutoNextV30` / `resumeQuizAutoNextV30` | Depend on the deadline, remaining duration, pause state, `performance.now()`, and timer-start/cleanup functions. | Keep the lifecycle state machine together. |
| `getQuizPracticeMetaV8239` | Reads a mutable closure-owned object; it is a one-line lookup with no meaningful reuse boundary. | Do not create a module just to increase the module count. |
| `quizAnswerAliasTooltipTextV8239` | Reads current `quizSong` and calls the live EMQ API / summary and alias APIs. | Reject: source identity and external API coupling. |
| Playback, answer settlement, `nextQuiz`, settings and focus-mode flows | Shared quiz state, DOM writes, storage, window exports, timers and event dispatch are interleaved. | Keep in the legacy IIFE until dedicated lifecycle contracts and real-origin/audio acceptance exist. |

This is a bounded candidate review, not a claim that the current static inventory is a complete JavaScript call graph. The existing AST report explicitly documents that limitation.

## Decision

**No additional production extraction is justified from the current evidence.** The remaining apparently low-API timer functions are not pure: they close over mutable state and DOM references. The tiny practice-metadata getter has insufficient architectural value to justify another module. The alias-tooltip helper depends on live application identity and APIs. Moving any of these would add module/build/test surface without establishing a safer boundary.

This does **not** mean the entire application has completed semantic modularization. The source split and selected 13 source modules are in place, and all module-specific contracts are now continuously tested. The closeout matrix still classifies many other script fragments as physical splits whose semantic ownership/dependency audit remains incomplete. CSS is physically split with cascade order locked; semantic CSS refactoring remains intentionally held.

## Validation

- Parent acceptance run 39141098175: source-and-unit PASS; browser-native-origin PASS.
- Matrix-driven module runner: 16/16 unique Node contracts passed.
- Checkpoint package completeness/reproducibility: PASS.
- Closeout matrix: all 91 fragment rows and 13 module rows reconcile with the source manifest.
- This decision checkpoint adds documentation only; local execution is not applicable and no new runtime test was added.
- Product baseline remains V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 remains immutable.

## Rollback

Return to parent commit `b5136764305ab9d47c69023ec72b83d266af445f` or revert the report and documentation commit. No product runtime changes are involved.

## Next task

Do not force another extraction from `script_004`. The next useful step is a closeout-level review of the existing 91-fragment / 13-module matrix: separate (1) required source/build modularization acceptance from (2) optional future semantic decomposition of legacy fragments, and mark each remaining item as accepted-as-legacy, audit-needed, or blocked by an external environment gate. This will produce a truthful end-state instead of treating every physical file split as a completed module.

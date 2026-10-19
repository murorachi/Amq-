# AMQ historical-code technical-debt inventory (bounded closeout)

- Date: 2026-10-19
- Branch: `v82.85.13-real-audio-acceptance-gate-01`
- Audited head before this report: `5121837c4b6d926b01122b062aaef615871a3e84`
- Product source modified: **No**
- Purpose: identify the few risks most likely to slow future feature work; this is deliberately not a complete cleanup project.

## Method and limits

Read the current branch checkpoint, status/baseline/task notes, architecture and dependency map, existing parser/semantic inventories, core `script_004` boundary report, test runner, and current source fragments for `script_001`, `script_004`, `script_027`, and `script_028`. Compared source sizes and SHA/blob identities against the available reports.

This is a bounded static review, not a fresh execution of the entire test suite or a complete runtime data-flow audit. Existing AST/regex inventories are historical snapshots from earlier stages; where their source sizes differ from the current branch, they are used only as leads, not current measurements. Duplicate-name counts alone do not prove redundant behavior. Dynamic dispatch, property calls, browser behavior, and all mutation paths are not exhaustively resolved.

## Ranked findings

| Rank | Finding and evidence | Impact / risk | Existing coverage | Decision |
|---|---|---|---|---|
| 1 | **Quiz core remains highly coupled.** Current `src/scripts/script_004.htmlpart` is 88,549 bytes and is one application IIFE. The existing boundary audit (V82.76 snapshot, older source fingerprint) identifies shared closure state such as `quizSettings`, `quizSong`, `quizFinished`, `quizActive`, `nextQuiz`, playback deadlines, and answer settlement shared across many function owners. Existing extractions cover isolated helpers, not the lifecycle as a whole. | Highest likelihood of making quiz changes cause regressions across candidate selection, answer settlement, suggestions, audio and timers. Moving code across the IIFE can break lexical scope or initialization order. | Production-source contracts exist for candidate pool, answer flow, target normalization/value, suggestion components and playback lifecycle; browser acceptance covers quiz input/suggestion/playback paths. | **Do not refactor broadly now.** For a future quiz feature, add a focused characterization test around the exact behavior being changed; only refactor the directly blocking boundary. |
| 2 | **Multiplayer script is large and owns many concerns.** Current `src/scripts/script_028.htmlpart` is 132,402 bytes and the historical AST snapshot counted 139 function definitions in this fragment. The visible source includes preference compatibility/migration, local persistence, room/session/reconnect and game-media settings. | High maintenance surface; a future multiplayer change may touch preferences, reconnect and UI behavior together. Broad splitting risks session semantics and event order. | Multiplayer session contract plus latest room/phase/live-draft/reconnect acceptance passed in run [39189657895](https://github.com/murorachi/Amq-/actions/runs/39189657895). | **Defer.** Split only around a concrete upcoming multiplayer change, with a specific contract first. |
| 3 | **Compatibility and duplicate-name inventory contains investigation leads, not safe deletion targets.** The prior semantic inventory found 31 names with multiple detected definitions and 89 explicit `window.*` assignments across the then-scanned fragments. The parser map also flags ambiguous `normalize`/`save`/`esc` references. The reports predate some extractions and are not a verified current duplicate list. | Removing a later assignment or similarly named helper can change intentional override behavior or resolve to a different global. Blind deduplication has a high regression-to-benefit ratio. | Multiple production-source contracts and full deterministic build checks exist, but they do not prove every legacy branch is dead. | **No bulk deduplication.** Only remove a branch after a direct call-site/data-flow check and a test that proves the retained behavior. |
| 4 | **Storage/history state has several compatibility boundaries.** `script_001` now references the extracted DB module and still contains runtime collection/history behavior; `script_028` owns multiplayer persistence; the storage repository module is injected at the original script position. Existing docs explicitly treat settings keys and fail-closed custom-list markers as compatibility contracts. | Persistence bugs can lose user state or accidentally widen candidate scope; this is more consequential than cosmetic code duplication. | Storage repository, native storage/custom-list, history/status isolation and backup/restore round-trip contracts passed in the latest source/unit job. | **Preserve interfaces.** Do not rename keys or consolidate write paths as generic cleanup. Touch only when a concrete persistence defect or feature requires it. |
| 5 | **Some engineering inventory artifacts are stale by design.** The AST/dependency reports cite V82.69/V82.76 snapshots, while the current branch has later extracted modules and different fragment sizes. | Treating old counts/fingerprints as current evidence could lead to incorrect edits. | Current build/contracts check registered module reconstruction and source fingerprints; the latest run passed source/unit checks. | **No expensive regeneration project.** Update only the inventory relevant to a real refactor; label older reports as historical evidence. |

## Practical conclusion

The source is not debt-free, but the current evidence does **not** justify a large cleanup before feature development. The most important risk is the coupled quiz lifecycle; the next is the broad multiplayer closure. Neither is a reason to stop product work.

Recommended operating rule for upcoming feature work:
1. Start from the verified branch and immutable V82.82 baseline.
2. Identify the smallest behavior boundary affected by the feature.
3. Add or reuse one focused regression test before changing it.
4. Keep the change scoped; run the relevant contract/browser checks and the deterministic build checks.
5. Record other technical debt without expanding the current task.

## Test and acceptance status

- Static inspection of the files listed in “Method and limits”: **completed**.
- Existing source/unit, build, Firefox/Chromium and multiplayer results: **PASS as recorded** in run [39189657895](https://github.com/murorachi/Amq-/actions/runs/39189657895); this inventory did not rerun those jobs.
- CI real-browser PCM output capture: **FAIL / deferred**, peak=0 and RMS=0.0 despite non-silent PulseAudio self-test and successful browser playback lifecycle. Do not lower the threshold or interpret this alone as proof of real-device playback failure.
- Fresh full test suite during this read-only inventory: **NOT RUN**.
- Product HTML/source logic changed: **No**.
- Formal baseline V82.82 unchanged: 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Candidate V82.85.12 unchanged: 8,787,574 bytes, SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.

## Rollback

This inventory changes documentation only. Revert the documentation commit if needed; no product source or candidate HTML needs rollback. Never overwrite V82.82.

## Exit criterion

This bounded inventory is sufficient to resume feature development. Do not create a second audit phase just to chase every duplicate, stale compatibility branch, or theoretical cleanup.

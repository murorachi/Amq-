# Next task

Current engineering checkpoint: **V82.86.01 structural issue inventory (audit-only)**.  
Branch: `v82.86.01-structural-issue-inventory-01`.  
Parent: `v82.85.22-closeout-disposition-matrix-01` at `b42ddee31db8becae02b9822dd44bdcb0c4f9cee`.

## Confirmed baseline
- Parent CI run [39141992306](https://github.com/murorachi/Amq-/actions/runs/39141992306) passed both `source-and-unit` and `browser-native-origin`.
- Product baseline remains V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable.
- This checkpoint does not modify product source or generated HTML.

## Issue inventory
- Report: `reports/V82_86_01_STRUCTURAL_ISSUE_INVENTORY_01.md`.
- Row tracker: `reports/STRUCTURAL_ISSUE_INVENTORY.csv`.
- Initial register has 20 items covering shared quiz state, DOM ownership, listener/timer lifecycle, mixed data/runtime, cross-fragment and unresolved calls, overlapping suggestion handlers, storage, multiplayer, audio, CSS cascade, override layers, module decoupling, payload preservation, test gaps, dead-code evidence, readability and performance.
- Risk findings are not automatically confirmed defects. No code deletion or performance claim is permitted without evidence and appropriate regression tests.

## Next execution step
Audit AMQ-STR-001 through AMQ-STR-003 as one bounded quiz-lifecycle ownership pass:
1. Trace reads/writes of `quizSettings`, `quizSong`, `quizFinished`, `quizActive`, and `quizAudioStarted`.
2. Inventory listener/timer/animation registration and teardown sites, including repeated quiz entry/exit.
3. Compare each transition against existing browser lifecycle contracts and record uncovered assertions.
4. Add missing tests before any production refactor. Do not change `script_004` merely to reduce line count or increase module count.

## External gates still open
Firefox/CSS cascade comparison; real audio-provider playback; production-domain storage policy and full IndexedDB failure modes; live two-client multiplayer reconnect.

## Rollback
Return to parent commit `b42ddee31db8becae02b9822dd44bdcb0c4f9cee` or revert the documentation-only checkpoint. Product rollback is not required.

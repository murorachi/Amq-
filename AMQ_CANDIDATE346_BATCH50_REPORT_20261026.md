# AMQ Candidate346 Batch50：移除五個未使用的局部 helper／常數

- Parent Candidate345 SHA-256: `de4b96d355763015e747b72d25f3feabd40e6b2edfec69d2a4a19469bd9414f3`.
- Candidate346: `amq_learning_tool_v82_86_57_candidate346_batch50_remove_orphaned_local_helpers_20261026.html`, 1,625,225 bytes; SHA-256 `dfef81df1572219d2b96b5f8eeeb50696acfe99a0fced53b6c83371f930c99ca`.
- Formal baseline Candidate302 and rollback checkpoint Candidate320 remain unchanged.

## Changes
- `v60-player-quiz-cleanup`: removed unreferenced local helper `norm`.
- `learning-system-v72-script`: removed unreferenced `getPlanMeta`, `setPlanMeta`, `seasonOrder`, and `seasonLabels`.
- Only these two script bodies changed. Playback source-mode and learning-history logic remain.

## Tests
- PASS: parent hash verified.
- PASS: all five identifiers had declaration-only occurrence counts; zero references remain after removal.
- PASS: only the two target script bodies changed; representative active functions remain.
- PASS: 65 executable inline JS blocks passed `node --check`, 0 syntax errors.
- PASS: delivery ZIP integrity.
- BLOCKED: browser interaction; prior environment returned `ERR_BLOCKED_BY_ADMINISTRATOR` on file:// and localhost.
- NOT RUN: full AMQ/EMQ/MIX regression.
- NOT RUN: Candidate346 HTML upload and remote SHA-256 readback.

## Rollback
Candidate345 SHA-256 `de4b96d355763015e747b72d25f3feabd40e6b2edfec69d2a4a19469bd9414f3`.

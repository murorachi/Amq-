# NEXT_TASK.md — Batch 3 route/storage/lifecycle verification

## Current baseline
Candidate302 is the formal baseline by explicit user authorization and reported local verification:
- `amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html`
- 1,720,249 bytes; SHA-256 `f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd`.
- Candidate295 rollback: SHA-256 `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`.

## Batch 2 completed
- Added static dependency report and evidence index; 10/10 source-evidence assertions PASS.
- Identified route interception side-effect boundaries, AMQ custom-list canonical store/fallback readers, backup/restore compatibility, and distinct EMQ schema.
- No application source edits/deletions. Browser runtime checks remain NOT RUN.

## Next actions, in order
1. Resolve the remote artifact gap: Candidate302 HTML returns NOT_FOUND on `amq-stage6-static-audit-regression-20261025`; make the exact artifact available and verify remote SHA-256 if tooling/permissions permit.
2. Build a route state-transition matrix for home/catalog/watchlist/quiz/song-select/workspace, including activeView, body/html classes, data attributes, navigation-event dispatch, home-menu close, and workspace panel state.
3. Trace all `aniCustomPracticeListsV1` readers/writers and recovery keys, including import, full backup, legacy backup, restore rollback and fallback consumers. Do not alter user data.
4. Create lifecycle registries for route/grid/modal/dock observers and timers; verify rebind/disconnect/clear paths in an isolated browser session.
5. Compare high-impact repeated CSS selectors against actual DOM/computed style and media/route contexts. Do not delete based on counts.
6. Only after runtime evidence, define a minimal consolidation plan and deletion ledger.
7. Update status, baseline, changelog, tests and deliverable hashes; attempt GitHub upload and verify remote files.

## Definition of done
All six cleanup goals remain incomplete until the full inventory, dependency map, canonical implementation map, deletion ledger, regression matrix and final single-file HTML with verified remote SHA-256 are available.

## Known limits
- Browser automation timed out in this environment; no Batch 2 browser E2E was run.
- Candidate302 local verification is user-reported; case-by-case evidence is not recorded.
- 495 AMQ songs lack media values in extractor slots 9/10/11; do not modify without upstream schema evidence.
- Never overwrite Candidate302 or Candidate295. Any implementation candidate must have a unique filename and verified source/hash.

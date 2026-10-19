# V82.85.35 historical code debt and deduplication checkpoint

- Branch: `v82.85.35-selected-list-validation-dedup-01`
- Parent: `v82.85.34-vndb-navigation-contract-01`
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product source changes in this checkpoint: none. This is an acceptance and scope-control checkpoint, not a new runtime refactor.

## Completed focused deduplication work carried forward

1. V82.85.26: removed a redundant anime suggestion-cache invalidation loop because the existing shared refresh function already invalidates and refreshes the same caches.
2. V82.85.27: centralized repeated year/difficulty bound comparisons in `validateRoomPoolBounds()`, keeping input collection at each caller.
3. V82.85.28: centralized identical next-audio state assignments in `resetNextAudioState()`, while leaving media cleanup and active-audio transfer with their owners.
4. Earlier multiplayer checked-value and audio-failure callback deduplication contracts remain registered in CI.
5. V82.85.34: added 15 exact-source VNDB navigation/cover/list-import contract cases; runtime behavior was intentionally unchanged.

## Scope decision for the remaining list-rendering similarity

`renderCustomListChoices()` and `renderEmqCustomListChoices()` share a small amount of structure, but their source lists, display summaries, invalid-setting flags and persistent fault keys are different. Extracting a generic renderer now would add indirection for only a few shared expressions and risks blending AMQ/EMQ-specific failure semantics. Defer that refactor unless a focused test demonstrates a maintainability or correctness benefit. Do not treat similar markup as proof of equivalent behavior.

## Acceptance checklist

- Source/unit workflow: pending this branch's run.
- VNDB navigation contract: 15 cases registered; current branch execution not yet verified.
- Package completeness and deterministic package reproducibility: pending this branch's run.
- Deterministic standalone build and source fingerprint verifier: pending this branch's run.
- Firefox responsive browser acceptance: pending this branch's run.
- Chromium native-origin browser acceptance: report all steps separately; the known final audio-monitor capture failure (peak=0, RMS=0) is a CI environment limitation only if preceding checks pass. Actual playback has been user-confirmed previously; do not claim the current run passes before inspecting it.
- Manual interactive acceptance: not performed in this checkpoint.

## Exit criteria

Close this bounded historical-debt/deduplication phase when the current CI confirms source/unit, the 15-case VNDB contract, package completeness/reproducibility, deterministic build and Firefox responsive acceptance, with no new unrelated regression. Keep the known audio-monitor limitation explicitly recorded. Do not require a zero-debt claim or perform a broad rewrite.

## Rollback

This checkpoint does not change product runtime source. Revert this report and the accompanying status-document updates to return to the parent checkpoint. All earlier deduplication commits remain independently revertible; V82.82 remains immutable.

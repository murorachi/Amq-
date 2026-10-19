# Current status: Song Impostor independent workstream

- Work branch: `multiplayer-song-impostor-spec-01`.
- Parent engineering checkpoint: `v82.85.35-selected-list-validation-dedup-01`.
- Purpose: develop a separate AMQ multiplayer social-deduction mode without interfering with ongoing UI work.
- Current stage: gameplay and pair-scoring design only.
- Added:
  - `docs/multiplayer/song-impostor-gameplay-spec-v0.1.md`
  - `docs/multiplayer/song-impostor-pair-scoring-plan-v0.1.md`
- Product/runtime source: unchanged.
- Standalone HTML: unchanged; no new HTML candidate generated.
- Tests: design-document review only. No executable selector or automated tests have been implemented or run yet.
- GitHub CI: not yet verified for this branch.
- Parent checkpoint note: V82.85.35's historical acceptance was pending in its own status record. This separate workstream does not claim to close or replace that acceptance.
- Product baseline carried forward: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Scope guard

Do not modify existing quiz/UI/runtime source in this workstream until the actual song schema and multiplayer authority model have been inspected and the pure selector has focused tests. Keep this branch independent from UI reconstruction.

## Rollback

Revert the three status documents and the two `docs/multiplayer/` files on this branch, or close the branch without merging. No product rollback is needed because runtime source and HTML are unchanged.

# Baseline: Song Impostor design checkpoint

- Work branch: `multiplayer-song-impostor-spec-01`.
- Parent: `v82.85.35-selected-list-validation-dedup-01`.
- Checkpoint type: documentation-only, independent multiplayer feature design.
- Product/runtime baseline remains immutable V82.82 standalone HTML: 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- No HTML was regenerated, and no runtime files were modified.
- New specification artifacts:
  - `docs/multiplayer/song-impostor-gameplay-spec-v0.1.md`
  - `docs/multiplayer/song-impostor-pair-scoring-plan-v0.1.md`
- Proposed implementation sequence: inspect actual song schema and multiplayer authority model; implement a pure pair selector; add deterministic unit contracts; run synthetic robustness simulations; only then design runtime/UI integration.
- Validation boundary: docs are committed, but selector behavior, CI and human playability are not yet tested.
- The parent V82.85.35 branch's acceptance status is independent and remains whatever its own CI/status record says.

## Rollback

Close or revert this work branch. The immutable V82.82 product baseline is untouched.

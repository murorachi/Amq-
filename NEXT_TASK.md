# Next task: implement isolated Song Impostor selector

Current branch: `multiplayer-song-impostor-spec-01`.

## Completed in this checkpoint
1. Created the MVP gameplay specification.
2. Created the pair-scoring and simulation plan.
3. Kept product/runtime source and standalone HTML unchanged.

## Next steps, in order
1. Inspect repository file inventory and current song record schema; identify trustworthy fields and missing-data rates.
2. Inspect existing multiplayer session/room authority and current lifecycle contracts. Do not assume client-hidden state is secret.
3. Record a field-to-feature mapping and an explicit no-go list for unsupported metadata.
4. Implement a pure, DOM/network/audio-independent pair eligibility/scoring module with injected seeded RNG.
5. Add focused unit tests for invalid pools, missing metadata, hard bounds, determinism, role-direction balance, repeat avoidance, and no-valid-pair behavior.
6. Run the relevant focused tests and existing source/build checks available to this branch. Report commands and actual assertions.
7. Add a synthetic simulation report, clearly separating synthetic robustness results from human playability evidence.
8. Only after selector contracts pass, decide how the mode should integrate with multiplayer lifecycle and UI. Do not change the current UI branch.

## Acceptance boundaries
- No production HTML or existing mode changes in the selector stage.
- No invented song metadata or unvalidated popularity assumptions.
- No claims of human balance based only on synthetic simulation.
- Parent V82.85.35 CI acceptance is a separate workstream and must not be reported as passed by this branch.

## Rollback
Revert this branch's feature docs and selector/test files together, or close the branch. Existing product HTML remains unchanged.

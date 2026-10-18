# Candidate policy architecture decision — checkpoint 07

## Decision

Keep the candidate policy as a clearly delimited pure-policy block in the source fragment for this checkpoint. Do not change the production JavaScript layout yet.

## Evidence

- The existing policy is already isolated by stable begin/end sentinels and is executed directly by unit tests.
- Candidate policy and pool integration now cover exact candidate IDs/order, selected familiarity and song-type boundaries, missing/default settings, null/empty/malformed selections, focus mode, audio eligibility, and custom-list fail-closed behavior.
- The standalone HTML must remain byte-identical to the verified V82.65 baseline in this engineering checkpoint. A source-module extraction would require adding and validating a build-time include mechanism and updating every exact-source consumer. That work can be justified later, but it is not needed to establish current policy behavior.
- There is no evidence in the present test results that moving the block alone would fix a runtime defect or materially reduce maintenance risk.

## Revisit criteria

Reconsider a source-module extraction only after the answer-flow and personal-filter boundaries remain stable, and only if the build can inline the module deterministically while preserving exact output bytes. Any such change must update the build manifest, test imports, integrity verifier, and rollback evidence in one checkpoint.

## Current boundary

This is an architecture decision, not a claim that the entire candidate-pool architecture is complete. Candidate policy, source adapters, pipeline orchestration, UI bindings, answer/session lifecycle, persistence, audio health, and multiplayer contracts remain distinct future responsibilities.

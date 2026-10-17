# Candidate policy architecture decision — checkpoint 07

## Decision
Keep the candidate policy as a clearly delimited pure-policy block in the source fragment for this checkpoint. Do not change the production JavaScript layout yet.

## Evidence
- The policy is already isolated by stable begin/end sentinels and executed directly by unit tests.
- Candidate policy and pool integration cover exact candidate IDs/order, familiarity and song-type boundaries, missing/default/null/empty/malformed selections, focus scope, audio eligibility, and custom-list fail-closed behavior.
- The standalone HTML must remain byte-identical to the verified V82.65 baseline. A source-module extraction would require a build-time include mechanism and updates to all exact-source consumers.
- No test result currently shows a runtime defect that a source-only move would fix.

## Revisit criteria
Reconsider extraction only after answer-flow and personal-filter boundaries remain stable, and only if the build can inline the module deterministically while preserving exact output bytes. This is an architecture decision, not a claim that the whole candidate-pool architecture is complete.

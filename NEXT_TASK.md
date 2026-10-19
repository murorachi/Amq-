# Next task: continue bounded historical technical-debt review

Branch: `v82.85.22-historical-debt-dedup-01`.

## Completed checkpoint

V82.85.22 helper deduplication is source/unit and deterministic-build verified:
- Candidate: 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- Verifier: 132 passed, 0 failed.
- Dedup contract: 7 assertions passed.
- Package reproducibility: two archives of 14,640,473 bytes, identical SHA-256 `65174354609f5eec49e41bda558c4dee093611f60c29a710b2628899db6368e3`.
- Firefox responsive: passed.
- Native-origin storage, custom-list, IndexedDB/input, suggestion, quiz lifecycle and multiplayer lifecycle steps: passed.
- Required real-audio output assertion remains failed (`peak=0, rms=0.0)); do not weaken it.

## Next bounded debt task

Refresh the current parser-backed duplicate/function inventory from the pinned V82.85.22 source, compare only exact helper bodies and lexical dependencies, then pick one next candidate with meaningful maintenance value. Do not merge `script_004` normalization helpers with different punctuation/whitespace behavior. Do not move CSS rules or broad lifecycle code.

Separately, continue diagnosing why Chromium creates no PulseAudio sink input in CI; current debug output did not prove the root cause.

## Rollback

Restore the three original helper declarations and original manifest row, release pin, package names and workflow paths. Keep V82.82 immutable.

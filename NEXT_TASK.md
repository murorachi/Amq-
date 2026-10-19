# Next task: continue bounded historical technical-debt review

Branch: `v82.85.22-historical-debt-dedup-01`.

## Completed checkpoint

V82.85.22 helper deduplication is source/unit and deterministic-build verified:
- Candidate: 8,787,300 bytes / SHA-256 `69909839f922b702635eec217fcbb836c388502f83d40b11021cd194de20cdc2`.
- Verifier: 132 passed, 0 failed.
- Dedup contract: 7 assertions passed.
- Package reproducibility: two independent builds matched; exact archive checksum is recorded in CI output, not embedded in the package contents.
- Firefox responsive: passed.
- Native-origin storage, custom-list, IndexedDB/input, suggestion, quiz lifecycle and multiplayer lifecycle steps: passed.
- Required real-audio output assertion remains failed (`peak=0, rms=0.0)); do not weaken it.

## Next bounded debt task

Refresh the current parser-backed duplicate/function inventory from the pinned V82.85.22 source, compare only exact helper bodies and lexical dependencies, then pick one next candidate with meaningful maintenance value. Do not merge `script_004` normalization helpers with different punctuation/whitespace behavior. Do not move CSS rules or broad lifecycle code.

Separately, continue diagnosing why Chromium creates no PulseAudio sink input in CI; current debug output did not prove the root cause.

## Rollback

Restore the three original helper declarations and original manifest row, release pin, package names and workflow paths. Keep V82.82 immutable.

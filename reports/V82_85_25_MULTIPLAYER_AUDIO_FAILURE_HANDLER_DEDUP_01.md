# V82.85.25 multiplayer audio failure handler deduplication

## Scope

Extracted the identical audio failure logic from two multiplayer audio-loading flows into one `handleAudioFailure(id, a, watchdog)` helper. Both call sites pass their own song ID, media element, and watchdog value; the helper preserves the pending-candidate path and active-media fallback path.

## Behavior preserved

- Clear the watchdog when it exists.
- If the failed audio belongs to the current pending song and load, clear the pending-loading marker and advance to the next candidate.
- Otherwise, only route to active-media fallback when both the media object and song ID still match the active audio.
- A stale event does not mutate a newer pending song.
- Keep the two original async flows and their lexical ownership intact; no global state or new timer ownership was introduced.

## Verification

- Added/updated `tests/unit/multiplayer_audio_failure_callback_contract.test.cjs` to assert there is one shared helper and exactly two call sites, then exercise pending, active, and stale-event branches.
- The callback contract passed before extraction in CI. The first post-refactor verifier run confirmed the fragment fingerprint and deterministic output dimensions, but stopped on the intentionally stale release hash; the manifest is now pinned to the observed build output. A subsequent CI run must pass the full verifier and focused contract before acceptance.
- Local test execution was not available in this environment.
- Browser-native-origin real-audio output gate is a known CI-environment mismatch reported by the user: the actual current app was manually confirmed audible. This is not treated as a blocker for this source-only dedup refactor, and the gate itself is not weakened or changed.
- Changed fragment: 139,759 bytes / SHA-256 `1112d964951abde8cfcb8e389aa4b601709f90cd049778b4d8423472d0347297`.
- V82.85.25 candidate: 8,787,104 bytes / SHA-256 `075068b01a6429629315157a4e412a0c28c8d58c920313dada607584234c71c1`.
- Production source change is limited to `src/scripts/script_028.htmlpart`; no audio behavior feature was added.

## Rollback

Revert the helper extraction and restore the two original callback bodies, revert the contract test/workflow and fingerprint changes, then rebuild the candidate. V82.82 remains immutable.

## Next task

Continue the historical technical-debt inventory and select the next genuinely equivalent duplicate with meaningful maintenance value. Do not resume deep investigation of the known CI audio-output mismatch unless actual product playback regresses.

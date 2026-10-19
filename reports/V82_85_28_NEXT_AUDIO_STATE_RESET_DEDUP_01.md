# V82.85.28 next-audio state reset deduplication

## Scope

- Parent checkpoint: `v82.85.27-room-pool-validation-dedup-01`.
- Immutable product baseline remains V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Extracted the identical next-audio state reset assignments in `stopAudio()`, `clearNextAudio()`, and `activateNextAudio()` into `resetNextAudioState()`.
- Media teardown remains caller-owned: `stopAudio()` and `clearNextAudio()` still pause/unload media before reset; `activateNextAudio()` still transfers the prepared element into the active audio slot before reset.
- No audio selection, playback, UI, room protocol, storage schema, or candidate ordering changes are intended.

## Focused test

Added `tests/unit/multiplayer_next_audio_state_reset_dedup_contract.test.cjs` (12 assertions). It verifies one reset owner, three consumers, and clearing of the next-audio element, candidates, index, song ID, and lifecycle markers.

## Verification

- Source/unit job: **PASS**, verifier 132/132; focused contract: **PASS**, 12 assertions; deterministic standalone candidate and package reproducibility: **PASS**; Firefox responsive: **PASS** in [run 39229842012](https://github.com/murorachi/Amq-/actions/runs/39229842012).
- Modified fragment: 139,202 bytes / SHA-256 `24d805495ba443bd8e927d3b3ae37dcd581cb2b1d9c7ab872e223234849e1a50`.
- Candidate V82.85.28: 8,786,547 bytes / SHA-256 `7284c4ca5625886d913f55ab19a0076d1a5be46a88504dd8de724ae8f5bd274d`.
- Chromium native-origin acceptance is still running; do not mark it passed until the job completes.
- CI real-browser audio-output capture has previously failed despite user-confirmed actual playback. This change only centralizes existing state assignments; it does not alter media output logic.
- Manual interactive acceptance is not performed.

## Rollback

Revert the V82.85.28 source helper, focused contract, workflow/package versioning, source manifest fingerprint, and checkpoint documentation as one stage. Do not overwrite V82.85.27 or the immutable V82.82 baseline.

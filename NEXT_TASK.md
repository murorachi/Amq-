# Current task: verify final V82.85.30 artifacts and branch checkpoint

Current branch: `v82.85.30-chinese-title-cache-shape-guard-01`.

## Acceptance evidence

- Source/unit: PASS, verifier 132/132 and all unit tests.
- Firefox responsive: PASS.
- Browser-native: native storage/custom-list, IndexedDB/quiz input, quiz suggestions, quiz answer/playback lifecycle and multiplayer lifecycle passed. Only the final non-silent audio output capture assertion failed (`peak=0, rms=0.0`); PulseAudio self-test passed. Treat this as the known capture mismatch, not a proven product regression.
- Run: [39252741670](https://github.com/murorachi/Amq-/actions/runs/39252741670).
- Standalone candidate: 8,786,577 bytes / SHA-256 `e76c4a35a406b20b055e91278e3c917832f9a9cb662280ea3d7d3211a69b8bb5`.
- Source package was built reproducibly and uploaded. Check the newest workflow run after final documentation commits for authoritative artifact metadata and confirm all required report/test files are included.

## After verification

Close V82.85.30 as accepted with the audio-capture limitation explicitly recorded. Do not reopen the known audio mismatch unless actual playback regresses. Next worthwhile code task should be selected from a concrete remaining risk, not from a desire to make the audit list reach zero.

## Rollback

Restore the previous cache guard, manifest release pin, workflow candidate/artifact names and checkpoint package name. Immutable V82.82 remains unchanged.

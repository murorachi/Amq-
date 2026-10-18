# Next task

Current engineering branch: `v82.85.13-real-audio-acceptance-gate-01` (real-audio acceptance gate implementation; CI result pending).

1. Inspect the first CI run for `tests/browser/real_audio_output_acceptance.py`. The test must prove native Chromium decode plus non-silent PulseAudio monitor output, not merely synthetic media events. Fix any harness failures and rerun until the complete workflow is green.
2. Keep the real-audio gate distinct from the deterministic HTMLMediaElement mock tests. It currently uses a deterministic PCM WAV payload routed through the real app's mirror fallback code; it does not validate live production audio availability or licensing.
3. Identify a permitted browser environment and origin for production-like storage policy checks. Keep local-origin IndexedDB acceptance separate from production-domain storage acceptance.
4. Preserve V82.82 unchanged: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. The V82.85.12 standalone candidate remains 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.

Rollback to `v82.85.12-multiplayer-leave-poll-race-fix-01`; this checkpoint changes test/workflow/reporting files only.


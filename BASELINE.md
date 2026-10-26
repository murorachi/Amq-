# BASELINE.md

Updated: 2026-10-26 (Candidate366, Song Select cleanup converged)

## Formal baseline (immutable)
- Candidate302: amq_learning_tool_v82_86_13_candidate302_emq_loader_state_validation_20261025.html
- Recorded size: 1,720,249 bytes
- Recorded SHA-256: f718a744057be0a33d371306f1742aaeede90e84f33d9e62ab45f5e6db488abd
- Source file is not available locally for fresh hashing. Do not overwrite or promote a candidate automatically.

## Latest experimental candidate (not baseline)
- Candidate366: amq_learning_tool_v82_86_77_candidate366_finalize_songselect_song_only_view_20261026.html
- Size: 1,608,200 bytes
- SHA-256: 38e345a12a396cbd8bcaeaa55e6e903c591517a1fab5aaa8cc99ed8b4d17859d
- Parent Candidate365 SHA-256: fb8cc890b0b166bd174e8b6cf66157e58555d2ee67dc3a648df543297c20e6c8
- Candidate365 was rejected after the fixture browser test found “view is not defined”; Candidate366 removes the last stale guard and passes the same probe.
- Status: static PASS; fixture browser probe 16/16 PASS; real-data/audio E2E NOT RUN; not promoted.

## Known-good rollback
- Candidate364: amq_learning_tool_v82_86_75_candidate364_refine_songselect_filter_row_20261026.html
- Size: 1,609,811 bytes
- SHA-256: 88fd4422dcf8ed1782e2090da89a67b9802ec216aa853f5a5e4b7c24570be449
- Candidate364 passed the fixture-backed browser probe before the retired work-view branch was removed. Use this rather than Candidate365 if rollback is needed.

## Candidate chain note
- Candidate361 was an abandoned diagnostic variant, not part of the Candidate362→366 chain.
- Candidate362 removed the unreachable legacy workspace-dock handler.
- Candidate363/364 corrected the mobile rail and search/filter layout; Candidate364 is the last known passing rollback.
- Candidate365 removed the retired work-view branch but retained one stale view reference; Candidate366 removes that guard.

## Release gates
- Real data.js/catalog integration, real audio playback and persistent real storage: NOT RUN.
- GitHub lookup of the exact Candidate366 HTML path returned 404; HTML upload and remote SHA-256 verification are pending.
- Candidate302 remains the sole formal baseline until release gates pass.

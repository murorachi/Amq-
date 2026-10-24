# NEXT_TASK — Continue AMQ cleanup after Candidate216

1. Treat Candidate216 as a minimal experimental checkpoint only; do not call the architecture cleanup complete.
2. Build a call/ownership map for all 70 original Candidate212 script blocks and 57 observer constructor sites, including route/DOM lifecycle and storage interactions.
3. Prioritize Song Select workspace mount duplication and old workspace/route interceptors; prove ownership and behavior before moving code.
4. Resolve duplicate implementation candidates `v44VolumeControl`, `watchModeTab`/`customModeTab`, `amqSongSelectRankingPlaceholder`; check dynamic templates and event binding.
5. Add isolated browser-context tests for custom-list CRUD/reload, four workspace open/switch/close/Back/Escape, and duplicate DOM/listeners.
6. Test real AMQ/EMQ/MIX audio and seek, cover/API failure recovery, IndexedDB Blob save/restore, and reference pixel geometry when environment allows.
7. After each proven integration, remove the old implementation, create a unique candidate, run static and runtime regressions, and preserve rollback points.
8. Attempt byte-preserving HTML upload only when available; verify remote version, size and SHA-256. Never claim upload without readback.

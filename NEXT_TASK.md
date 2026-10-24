# NEXT_TASK — AMQ cleanup after Candidate212 audit

1. Map all 70 script blocks to initialization order, globals, calls, listeners, timers, observers, routes, storage reads/writes, and dynamic templates.
2. Resolve repeated mount owners first: v44VolumeControl, watchModeTab/customModeTab, amqSongSelectRankingPlaceholder.
3. Add deterministic independent-browser-context tests for all four workspaces, Back/Escape, overlay cleanup, and route transitions.
4. Audit all 51 MutationObserver constructors for self-mutating callbacks, duplicate registration, target scope, and disconnect lifecycle.
5. Test custom-list create/add/remove/filter/reload persistence and compare storage snapshots; do not change storage schema or keys.
6. Verify AMQ/EMQ/MIX behavior, real audio and seek after metadata, cover loading, AniList/MAL/VNDB error recovery, and IndexedDB Blob persistence.
7. Only after proof, move required capabilities to one formal owner module and delete old implementations in a uniquely named new candidate.
8. Re-run syntax/CSS/browser/native-file/storage tests and pixel comparison; mark each PASS/FAIL/NOT RUN/BLOCKED accurately.
9. Attempt binary HTML upload only with a byte-preserving route; verify remote version, size, and SHA-256 before claiming success.

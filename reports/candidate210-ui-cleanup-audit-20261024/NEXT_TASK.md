# Candidate 210 Cleanup — Next Task

1. Restore authorized access to the original Candidate210 HTML bytes; do not use the incomplete text export as a source.
2. Recompute SHA-256 and size, compare against the recorded values, and preserve the untouched original.
3. Generate exact-source inventories: DOM IDs and owners, scripts/modules, CSS selectors and duplicate declarations, initialization order, routes, listeners, timers, observers, storage keys/IndexedDB stores, API paths, build inputs and tests.
4. Trace the existing Candidate210 validation defects and map each to exact source locations.
5. Finish the complete KEEP / INTEGRATE / DELETE / NEEDS CONFIRMATION ledger with caller/dependency evidence and test requirements.
6. Only then apply narrow, reversible code changes in a new uniquely named candidate, preserving Candidate210's UI and keeping data keys/schema stable.
7. Run syntax/static checks, focused browser acceptance, route/CRUD/persistence regression, audio/API checks where the environment permits, and screenshot comparison against the pinned osu!stable reference.
8. Update root BASELINE.md, CURRENT_STATUS.md and NEXT_TASK.md after each verified stage. Upload the HTML only through a supported byte-preserving route and verify the remote file hash.

Do not promote the candidate while any required P0 test is BLOCKED or NOT RUN. Distinguish static inspection, mock tests, synthetic media hooks, and real-browser/network validation.

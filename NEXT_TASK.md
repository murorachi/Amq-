# NEXT_TASK — AMQ cleanup continuation

Working baseline: Candidate212 (preserved); Candidate218 is an experimental event-binding fix, not an accepted release.

Latest evidence: `reports/candidate212-volume-control-dependency-audit-20261024/DEPENDENCY_AUDIT.md` was committed and read back from GitHub. It confirms the two volume-control builders differ in mute and observer behavior; do not blindly delete either path.

1. Continue with the volume-control integration only after determining whether the V82.35 fallback is reachable under real initialization/recovery conditions.
2. Prefer one shared idempotent factory/initializer if it preserves `aniQuizVolume`, mute-at-zero behavior, reapplication to replaced audio elements, and toolbar placement. Otherwise retain a documented fallback with behavior made consistent.
3. Create a unique candidate from Candidate212, verify exact diff, SHA-256, and inline JavaScript syntax. Never overwrite Candidate212.
4. Run browser lifecycle tests when an available browser permits them: repeated init/click count, custom-list CRUD/filter/reload, four-workspace switching/back, audio modes, and IndexedDB persistence. Label unrun tests NOT RUN and environmental blockers BLOCKED.
5. Continue dependency-led cleanup of script blocks, event listeners, observers, timers, route hooks, duplicate UI builders, storage, and dead feature code. Classify each Keep / Integrate / Delete / Needs confirmation; never remove code based on name similarity alone.
6. Preserve all data keys/schema, learning history, custom lists, and rollback checkpoints.
7. Update CURRENT_STATUS.md, BASELINE.md, NEXT_TASK.md, test report and change log for each accepted checkpoint.
8. Attempt GitHub upload of the exact HTML artifact only if a byte-preserving path is available; read back and verify version, byte size, and SHA-256. Do not claim upload otherwise.

Known limitations: browser runtime acceptance and upload of the 9+ MB HTML artifact have not been completed. Candidate218 static checks passed; browser checks remain NOT RUN/BLOCKED as recorded in its report.

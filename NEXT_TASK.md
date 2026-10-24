# NEXT_TASK — AMQ cleanup continuation

Working baseline: Candidate212 (preserved); Candidate218 is an experimental event-binding fix, not an accepted release.

1. Inspect both `v44VolumeControl` construction paths and their full script/init order. Do not delete the fallback until runtime ownership is proven.
2. Consolidate the volume control through one idempotent helper only if initialization order and fallback behavior remain intact; otherwise document the dependency and choose a smaller safe fix.
3. Create a unique candidate from Candidate212, verify its exact diff, SHA-256, and all inline JavaScript syntax.
4. Run browser lifecycle tests when an available browser permits them: repeated init/click count, custom-list CRUD/filter/reload, four-workspace switching/back, audio modes, and IndexedDB persistence. Label unrun tests NOT RUN and environmental blockers BLOCKED.
5. Continue dependency-led cleanup of script blocks, event listeners, observers, timers, route hooks, duplicate UI builders, storage, and dead feature code. Classify each Keep / Integrate / Delete / Needs confirmation; never remove code based on name similarity alone.
6. Preserve all data keys/schema, learning history, custom lists, and rollback checkpoints. Never overwrite Candidate212.
7. Update CURRENT_STATUS.md, BASELINE.md, NEXT_TASK.md, test report and change log for each accepted checkpoint.
8. Attempt GitHub upload of the exact HTML artifact only if a byte-preserving path is available; read back and verify version, byte size, and SHA-256. Do not claim upload otherwise.

Current known limitation: browser runtime acceptance and upload of the 9+ MB HTML artifact have not been completed. Candidate218 static checks passed; browser checks remain NOT RUN/BLOCKED as recorded in its report.

# Current task: inspect external-source/cache boundaries

Current branch: `v82.85.29-source-audit-matrix-01`.

## Completed characterization

- SRS state-transition/persistence: 41 assertions passed in [run 39248332291](https://github.com/murorachi/Amq-/actions/runs/39248332291).
- Scene-background IndexedDB/object-URL lifecycle: 29 assertions passed in [run 39248616623](https://github.com/murorachi/Amq-/actions/runs/39248616623).
- In run 39248616623, source/unit (132/132 verifier checks and all unit steps) and Firefox responsive passed. Chromium native-origin was still in progress at last check.
- Reports: `reports/V82_85_29_SRS_STATE_TRANSITION_PERSISTENCE_CONTRACT.md` and `reports/V82_85_29_SCENE_BACKGROUND_IDB_OBJECT_URL_LIFECYCLE_CONTRACT.md`.
- Production source unchanged in both stages.

## Next bounded work

1. Inspect `script_031`, `script_039` and `script_041` external-source, cache, timeout and stale-response behavior alongside existing contracts.
2. Add only the most valuable missing deterministic contract. Do not duplicate already-covered cases or contact live services in unit tests.
3. If no concrete gap remains, document that finding and move on without adding code.
4. CSS visual comparison remains deferred unless a concrete style change is proposed.

## Rollback

Revert only new characterization tests, workflow steps and report/status references. No production source or immutable V82.82 baseline rollback is required.

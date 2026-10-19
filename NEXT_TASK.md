# Next task: resume requested feature development

Current branch: `v82.85.13-real-audio-acceptance-gate-01`.

## Previous stage closeout

The bounded historical technical-debt inventory is complete:
- Report: `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md`.
- Main risks: coupled quiz lifecycle in `src/scripts/script_004.htmlpart`; broad multiplayer closure in `src/scripts/script_028.htmlpart`; duplicate-name and compatibility entries need evidence before deletion.
- Decision: no broad cleanup prerequisite. When a concrete feature touches a risky boundary, add a focused regression test and change the smallest necessary area.

## Latest bounded cleanup

- Report: `reports/ACCEPTANCE_RUNNER_ARTIFACT_TARGET_CLEANUP_2026-10-19.md`.
- Fixed current-version test target and candidate artifact output in `tools/run_all_checks.py`.
- The runner no longer writes V82.85.12 output to the V82.82-named path.
- Historical V82.80/V82.81 CSS geometry check remains available but is not in default current acceptance.
- Added a runner configuration contract; it passed in CI.
- Latest run: https://github.com/murorachi/Amq-/actions/runs/39191769254
- PASS: source/unit and deterministic build verification, Firefox responsive, quiz suggestion/input integration, multiplayer lifecycle.
- FAIL/deferred: known CI real-browser audio PCM output capture issue only.
- Full `tools/run_all_checks.py` list: **NOT RUN end-to-end**.
- Product HTML and product logic were not changed.

## Working rule

Continue cleaning when the benefit is concrete; do not require every historical patch or duplicate to be resolved before moving forward. For each change, use scoped tests and preserve immutable baseline V82.82. Keep unrelated findings in the backlog instead of expanding the current task.

## Baseline constraints

- Immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.85.12 candidate: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
- Keep producing a single-file HTML through the reproducible build when product code changes.
- Distinguish static checks, automated tests and browser acceptance.

## Rollback

Revert the runner/config-contract/workflow commits together if needed. Never overwrite immutable V82.82.

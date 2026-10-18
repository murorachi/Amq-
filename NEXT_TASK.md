# Next task

Current checkpoint: **V82.85.17 checkpoint package audit (CI pending)**.
Branch: `v82.85.17-checkpoint-package-audit-01`.

## Completed immediately before this task
- V82.85.16 source inventory gate: CI run https://github.com/murorachi/Amq-/actions/runs/39137967441 passed both source/unit and browser-native-origin jobs.

## Current acceptance gate
- Validate package completeness and reproducibility in CI.
- Verify required source, module, build, test, workflow and status files are present in the ZIP.
- Verify two package builds have identical SHA-256, sidecars match, ZIP CRC passes, entries are unique/exact, and embedded manifest digests match packed files.
- Product lock: V82.82 standalone HTML, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.

## Next highest-value task after package acceptance
Build a modularization closeout matrix from `reports/FRAGMENT_MANIFEST.json`, dependency inventories, extraction contracts and boundary-audit reports. Categorize each remaining fragment as extracted, intentionally coupled, safe extraction candidate, or blocked by environment coverage. Reconcile every manifest entry before deciding whether modularization can be closed.

## Known acceptance limits
Firefox/cascade behavior, real audio-provider playback, production-domain storage policy, and live multi-client multiplayer reconnect are not established by the current Chromium/mock lifecycle suite.

Rollback: revert the V82.85.17 package audit commit or return to parent commit `e2c0fddd9d144cafbb5cb4691b00bc6c1e6ea149`.

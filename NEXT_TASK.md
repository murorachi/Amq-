# Next task

Current checkpoint: **V82.85.17 checkpoint package audit (ACCEPTED)**.
Branch: `v82.85.17-checkpoint-package-audit-01`.
Acceptance run: https://github.com/murorachi/Amq-/actions/runs/39138953742.

## Accepted gates
- V82.85.16 source inventory completeness gate: source/unit and browser-native-origin passed.
- V82.85.17 package audit: source/unit and browser-native-origin passed; deterministic package hash, inventory, sidecars, ZIP CRC and embedded SHA-256 checks passed.
- Product lock remains V82.82 standalone HTML, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.

## Next highest-value task
Build a modularization closeout matrix from `reports/FRAGMENT_MANIFEST.json`, dependency inventories, extraction contracts and boundary-audit reports. Categorize every script/data fragment and CSS fragment as extracted, intentionally coupled, safe extraction candidate, or blocked by missing environment coverage. Reconcile the 13 current source modules against older progress reports that still describe the earlier 8-module state. Do not claim full modularization completion until the inventory and remaining decisions are reconciled.

## Known acceptance limits
Firefox/cascade behavior, real audio-provider playback, production-domain storage policy, and live multi-client multiplayer reconnect are not established by the current Chromium/mock lifecycle suite.

Rollback: revert the V82.85.17 package audit commit or return to parent commit `e2c0fddd9d144cafbb5cb4691b00bc6c1e6ea149`.

# Next task

Current checkpoint: **V82.85.22 closeout disposition matrix (CI pending)**.
Branch: `v82.85.22-closeout-disposition-matrix-01`.

## Acceptance gate
- Run the new disposition contract and verify the generated CSV matches the source matrix and manifest.
- Confirm the expected category counts: 50 CSS cascade gates, 4 evidence-backed keep-coupled decisions, 3 partial extraction reviews, 26 semantic audits pending, 4 high-risk state/storage/identity audits, 1 live multiplayer gate, 2 data payload preservation rows, 1 IndexedDB gate, and 13 module-contract-covered but not fully decoupled modules.
- Confirm all 16 module Node contracts, deterministic V82.82 build, package reproducibility, source inventory, matrix contract and browser-native-origin suite pass.

## Next after acceptance
Use the row-level dispositions to choose one semantic-audit-pending fragment with a clear payoff. Avoid another broad inventory. Do not change CSS ordering, data payload bytes, storage schema, or high-risk multiplayer/IndexedDB lifecycle without dedicated acceptance.

External acceptance limits remain Firefox/CSS cascade comparison, real audio-provider playback, live two-client multiplayer reconnect, and production-domain storage policy/full IndexedDB failure cases.

Product lock: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
Rollback: return to parent commit `113f9fef0942cb0ad4044f3472bd5638339cc874`.

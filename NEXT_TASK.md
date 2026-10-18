# Next task

Current checkpoint: **V82.85.21 script_004 boundary decision (CI pending)**.
Branch: `v82.85.21-script004-boundary-decision-01`.

## Acceptance gate
- Run `script004_boundary_audit_contract.test.cjs` in the main engineering workflow.
- Keep the full 16-test module contract suite, package/matrix tests, deterministic product build and browser-native-origin tests green.
- Confirm no product fingerprint change.

## Next highest-value task after acceptance
Audit `src/scripts/script_020.htmlpart` and `src/scripts/script_023.htmlpart` for a meaningful, testable boundary in history/SRS/familiarity persistence. Preserve storage keys, migration behavior, reload semantics and failure handling; do not extract until a direct contract can be written.

External acceptance limits: Firefox/CSS cascade, real audio-provider playback, live server plus two independent multiplayer clients/reconnect failures, and production-domain storage policy/full IndexedDB Blob failure cases.

Product lock: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
Rollback: return to parent commit `f3f132762c62f3d26d5bcd1334f35694640a38ae`.

# Next task

Current checkpoint: **V82.85.22 history/SRS boundary audit (CI pending)**.
Branch: `v82.85.22-history-srs-boundary-audit-01`.

## Acceptance gate
- Run the new SRS schedule validation contract in CI.
- Keep all module contracts, script_004 boundary audit, package/matrix tests, deterministic product build and browser-native-origin suite passing.
- Confirm product fingerprint remains exactly V82.82.

## Next after acceptance
Extract only `isValidSchedule(x)` from `script_020` into a source module at its original position. Preserve the function body byte-for-byte and retain the surrounding `validStates` closure. Add its module record and verify the assembled product remains byte-identical. Do not combine this with storage recovery or FSRS state-machine changes.

Known environment gates remain Firefox/CSS cascade, real audio-provider playback, live two-client multiplayer reconnect, and production-domain storage policy/full IndexedDB failure cases.

Product lock: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
Rollback: return to parent commit `678cb6d0d2b40fa4536740047e657ae2edc746ac`.

# Next task

Current checkpoint: **V82.85.20 module contract CI coverage (CI pending)**.
Branch: `v82.85.20-module-contracts-ci-coverage-01`.

## Acceptance gate
- Confirm the matrix-driven runner finds all 13 module rows, resolves every unit-test path, and executes all unique Node contracts.
- Inspect each test's actual output; any failure must be fixed or documented before acceptance.
- Confirm source/build verification and the full browser-native-origin job pass.

## Next after acceptance
Review the `script_004` dependency ownership report for any safe, meaningful remaining extraction candidate. The report already documents shared closure state, API/DOM calls, listener registrations and timers; do not repeat that inventory without identifying a concrete evidence gap.

Known external acceptance limits remain Firefox/CSS cascade, real audio-provider playback, live two-client multiplayer reconnect, and production-domain storage policy/full IndexedDB failure cases.

Product lock: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.

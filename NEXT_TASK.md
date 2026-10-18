# Next task

Current checkpoint: **V82.85.19 AMQ valid-anime-ID module contract (CI pending)**.
Branch: `v82.85.19-amq-valid-anime-ids-contract-01`.

## Acceptance gate
- Run the new `validAnimeIds` source contract in the main engineering workflow.
- Ensure the closeout matrix test rejects missing referenced test files.
- Confirm both source/unit and browser-native-origin jobs pass.

## Next after acceptance
Continue module-by-module test evidence reconciliation, then review `script_004` remaining lifecycle/global/DOM dependencies. Do not extract more core quiz code until the dependency boundary and tests are strong enough.

Known external acceptance limits remain Firefox/CSS cascade, real audio-provider playback, live two-client multiplayer reconnect, and production-domain storage policy/full IndexedDB failure cases.

Product lock: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
Rollback: return to parent commit `56809fd619c99eca7073db88a4aba6493e5d0dfd`.

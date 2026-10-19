# V82.85.22 multiplayer helper deduplication

## Baseline

- Branch: `v82.85.22-historical-debt-dedup-01`
- Base commit: `7af202f0c7dbe8e28b71b92ba8afd718543383a1`
- Immutable V82.82 product: 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Previous pinned candidate: V82.85.12, 8,787,574 bytes, SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.

## Why this candidate

Three exact declarations in `src/scripts/script_028.htmlpart` performed the same operation. They occur in `readRoomFiltersFromUi`, `createSettings`, and `configureFromUi`, and all close over the same IIFE-level `view` element. They do not depend on distinct local state.

## Change

Moved one copy to shared IIFE scope immediately after `view` initialization and removed the other two local declarations. All `checked(selector)` call sites remain unchanged. No storage keys, UI markup, filter order, numeric conversion, room protocol or audio behavior was intentionally changed.

Added a focused Node contract and CI step. Improved failed fragment/module fingerprint diagnostics in `tools/verify.py`.

## Acceptance

The changed fragment fingerprint and release fingerprint must be taken from CI output and pinned in the manifest before acceptance. Source/unit, deterministic build and browser results will be recorded separately. The known real-audio capture failure is separate and remains open.

## Rollback

Restore the three local declarations and original `script_028` manifest row, remove the contract test/workflow step and revert the verifier/report/status updates. Keep V82.82 immutable.

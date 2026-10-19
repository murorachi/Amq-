# Baseline checkpoint: V82.85.22 historical debt and dedup

- Branch: `v82.85.22-historical-debt-dedup-01`.
- Base commit: `7af202f0c7dbe8e28b71b92ba8afd718543383a1`.
- Immutable V82.82 product: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Previous pinned V82.85.12 candidate: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
- This checkpoint consolidates three identical `checked(selector)` helpers in `script_028` into one shared declaration. Focused contract added; final acceptance pending.
- `tools/verify.py` now prints actual byte length and SHA-256 when a fragment/module fingerprint mismatches.
- Historical debt ranking and limitations: `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md`.
- Prior audio-output acceptance failure remains open; this refactor does not address it.

## Scope rule

Do not deduplicate by name alone. Require identical behavior, the same dependency scope, and meaningful maintenance benefit. Keep the immutable baseline and pin the generated candidate using actual byte count and SHA-256.

## Rollback

Restore the three local helpers and original manifest row, remove the test/workflow step and revert diagnostics/report/status updates. Never modify or replace V82.82.

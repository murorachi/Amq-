# Baseline checkpoint: V82.85.35 historical debt / deduplication review

- Branch: `v82.85.35-selected-list-validation-dedup-01`.
- Parent checkpoint: `v82.85.34-vndb-navigation-contract-01`.
- Immutable product baseline: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Product source: unchanged in this checkpoint. No new standalone product HTML is generated here.
- Carried-forward dedup stages: V82.85.26 suggestion cache invalidation, V82.85.27 room-pool bounds validation, V82.85.28 next-audio state reset; previous checked-value/audio-failure callback dedup contracts remain part of CI.
- VNDB contract: `tests/unit/vndb_navigation_contract.test.cjs`, 15 exact-source cases, registered in `.github/workflows/v82-85-4-engineering-acceptance.yml`.
- Stage report: `reports/V82_85_35_HISTORICAL_DEBT_DEDUP_CHECKPOINT_01.md`.
- CI acceptance for this branch: pending; inspect source/unit, package reproducibility, deterministic build, Firefox responsive and Chromium native-origin separately.
- Rollback: revert the new report and status-document updates. No product-source rollback is required; V82.82 remains immutable.

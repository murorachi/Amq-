# Baseline lock and current engineering backlog

## V82.86.02
- Parent branch: `v82.86.01-structural-issue-inventory-01`.
- Parent commit: `7bbbd8eb883db6b97822fac5e32a2a2ff903bde9`.
- Current branch: `v82.86.02-engineering-backlog-01`.
- Report: `reports/V82_86_02_ENGINEERING_BACKLOG_01.md`.
- Tracker: `reports/ENGINEERING_BACKLOG.csv`, 34 rows.
- Contract: `tests/unit/engineering_backlog_contract.py`, wired into source/unit CI.
- Product lock: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.65 remains immutable.
- Engineering-only checkpoint; no product source, CSS, manifest or generated HTML changes.
- CI for this checkpoint is pending until the new workflow run completes.

## Execution rules
1. Work P0 -> P1 -> P2 -> P3 and respect dependencies.
2. Keep risks, confirmed defects and external gates distinct.
3. Never delete compatibility code or move CSS based only on static counts.
4. Do not close tasks without test cases/results, limitations, product fingerprint impact and rollback evidence.

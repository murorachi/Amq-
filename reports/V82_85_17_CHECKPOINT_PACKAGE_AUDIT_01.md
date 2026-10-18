# V82.85.17 Checkpoint Package Audit

Date: 2026-10-18
Parent checkpoint: V82.85.16 source inventory completeness gate, branch `v82.85.16-source-inventory-gate-01`, latest parent commit `e2c0fddd9d144cafbb5cb4691b00bc6c1e6ea149`.

## Scope

Audit the source checkpoint ZIP builder only. The standalone product remains locked to V82.82; V82.65 remains immutable. This task must not modify product HTML, CSS, runtime fragments, or the fragment manifest.

## Findings and changes

- The package builder's default output name still identified the older V82.84 source-sync audit, which could mislabel a newer package.
- The ZIP payload inventory was computed inline in `main()`, making it difficult for a test to assert completeness without reproducing its exclusion logic.
- Updated the default package name to `AMQ_V82_85_17_SOURCE_PACKAGE_AUDIT_01.zip`.
- Exposed the existing payload selection as `package_files()`; inclusion/exclusion behavior is otherwise unchanged.
- Added `tests/unit/package_checkpoint_contract.py` and wired it into the engineering acceptance workflow. The test checks required build/source/test/status files and all manifest-listed fragments/modules, excludes generated `dist/` output, builds two ZIPs, compares their SHA-256, verifies sidecars and CRC, checks unique/exact entries, and validates every embedded SHA-256 manifest entry.

## Validation status at report creation

- Static review: complete.
- GitHub Actions: pending; do not treat the package test as passed until its step is green.
- Local execution: not run in this environment.
- Product HTML/runtime/CSS: unchanged by this task.

## Risks and limits

- Deterministic ZIP comparison covers the same clean CI checkout and Python runtime; it does not prove reproducibility across every OS/Python version.
- The package audit does not replace Firefox, real audio-provider, production-domain storage, or live multi-client multiplayer acceptance.
- The embedded checksum manifest deliberately excludes itself and historical checksum/report artifacts listed in the package builder's exclusion sets.

## Rollback

Revert the V82.85.17 checkpoint package audit commit, or return to parent commit `e2c0fddd9d144cafbb5cb4691b00bc6c1e6ea149`. No product output was changed.

## Next task

Create a final modularization closeout matrix from the source manifest, dependency inventories, extraction contracts, and boundary reports. Classify each remaining large script/style fragment as extracted, intentionally coupled, low-risk candidate, or blocked by missing environment coverage. Do not claim full modularization completion until the inventory is reconciled and all remaining decisions have evidence.

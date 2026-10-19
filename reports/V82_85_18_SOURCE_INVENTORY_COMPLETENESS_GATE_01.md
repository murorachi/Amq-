# V82.85.18 source inventory completeness gate

- Date: 2026-10-19
- Base checkpoint: user-designated commit `715e7a6d734a487a21f8c866093431edd2f4938d`
- Working branch: `v82.85.18-source-inventory-gate-01`
- Scope: engineering verification only; no product HTML, runtime logic, CSS, manifest, or baseline changes.

## Problem

The verifier checked every source fragment and module listed in `reports/FRAGMENT_MANIFEST.json`, but did not check whether all source files on disk were listed. An extra or renamed fragment could therefore be silently omitted from the generated standalone HTML while the existing listed-file fingerprint checks still passed.

## Changes

1. Added `inventory_delta(manifest_paths, disk_paths)` to `tools/verify.py`.
2. Added reverse inventory checks requiring all top-level `src/styles/*.htmlpart` and `src/scripts/*.htmlpart` files to match manifest fragment paths exactly.
3. Added a matching check for files directly under `src/modules/`, consistent with the current flat module layout.
4. Added `tests/unit/source_inventory_completeness_contract.py` with four cases: matching inventories, unlisted disk file, stale manifest entry, and simultaneous mismatches with deterministic sorting.
5. Wired the focused contract into the source-and-unit CI job.

## Stop conditions

- The two source inventories match their manifest entries.
- The four pure helper contract cases pass.
- Existing deterministic build/fingerprint checks pass.
- Product HTML and product behavior remain unchanged.

Do not expand this stage into a complete dependency or duplicate-code audit.

## Test status

- Static review: completed.
- Local Python test execution: not run in this environment.
- GitHub Actions source/unit, browser-native-origin and Firefox jobs: pending remote confirmation at report creation.
- Product HTML build and runtime behavior: not modified.
- The existing known CI audio PCM capture issue remains separate and is not changed by this work.

## Risk and rollback

The module inventory check covers files directly inside `src/modules/`; nested module directories are outside the current manifest convention. If needed, revert the verifier, contract test, workflow and this report together. The immutable V82.82 product baseline remains unchanged.

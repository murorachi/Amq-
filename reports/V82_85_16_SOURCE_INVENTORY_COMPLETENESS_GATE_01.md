# V82.85.16 Source Inventory Completeness Gate

Date: 2026-10-18
Parent checkpoint: V82.85.15 audit-only checkpoint, commit `0c5596603bbeafd90e104e928faa263a0bae5be6`.
Change commit: `97a13a75b4e935a44d5b32b379c077336d16a751`.

## Problem

`tools/verify.py` validated every fragment/module named by `reports/FRAGMENT_MANIFEST.json`, but did not verify the reverse direction: a new `src/styles/*.htmlpart`, `src/scripts/*.htmlpart`, or `src/modules/*` file could exist on disk without being listed in the manifest. The builder would silently omit such a file while existing per-entry fingerprint checks still passed.

## Change

Added two integrity assertions to `tools/verify.py`:
1. The complete set of `src/styles/*.htmlpart` and `src/scripts/*.htmlpart` files must exactly match fragment paths in the manifest.
2. The complete set of files directly under `src/modules/` must exactly match module paths in the manifest.

Failures print missing-from-manifest and stale-manifest paths. Existing per-file hashes, marker placement, deterministic double-build and expected-release fingerprint checks remain unchanged. No product code, manifest, HTML, CSS or runtime behavior changed.

## Validation

- Static review: completed; change is limited to integrity checks in `tools/verify.py`.
- GitHub Actions source-and-unit job: triggered by the change; final result pending at report creation.
- GitHub Actions browser-native-origin job: triggered by the change; final result pending at report creation.
- Local execution: not run in this environment.
- Product baseline: V82.82 standalone HTML, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. V82.65 remains immutable.

## Risks / scope

This detects unlisted files within the defined source directories. It does not prove browser behavior, and it does not cover nested directories under `src/modules/`; current module inventory is flat. Browser acceptance remains dependent on the separate browser-native-origin workflow.

## Rollback

Revert commit `97a13a75b4e935a44d5b32b379c077336d16a751` or return to parent commit `0c5596603bbeafd90e104e928faa263a0bae5be6`. No product output was changed.

## Next task

After CI is confirmed, apply the same inventory-completeness principle to checkpoint packaging: verify that the source package includes the expected build, test and status files, and ensure package naming is not hard-coded to an earlier V82.84 checkpoint.

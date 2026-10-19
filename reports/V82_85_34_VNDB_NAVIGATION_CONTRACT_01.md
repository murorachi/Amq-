# V82.85.34 VNDB navigation, cover retry and list-import contract

- Branch: `v82.85.34-vndb-navigation-contract-01`
- Parent checkpoint: `v82.85.33-emq-title-cache-contract-01`
- Product source baseline: V82.85.28; `src/scripts/script_039.htmlpart` unchanged (blob `5044121904e20eb1ee6e66546213dcc8f02260ac`).
- Immutable V82.82 product baseline remains 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Scope: exact-source characterization only. No VNDB request format, work/song ID mapping, cover retry behavior, render limit, personal-list schema or UI changed.

## Why this stage exists

The VNDB library combines a paged user-list import, a cover cache, retry state and work IDs that must remain distinct from VNDB IDs. This stage protects those boundaries and the existing fail-soft behavior without claiming live VNDB availability.

## Test design

Added `tests/unit/vndb_navigation_contract.test.cjs`. It extracts exact production functions from `src/scripts/script_039.htmlpart` and runs them with synthetic DOM, storage and network responses.

The 15 named cases cover:
1. VNDB-linked work selection and cover URL precedence.
2. Cover-cache cap (1,800 entries) and storage failure safety.
3. VNDB cover request batching (30 IDs), missing records and request failure cleanup.
4. Retry clearing stale failure/detail/cache state.
5. Thumbnail-to-full-image fallback once, then failure placeholder and retry state.
6. Search/year filters and deterministic catalog render limit.
7. Malformed personal-list storage and normalized list statuses.
8. Paged VNDB list import preserving VNDB IDs, not substituting EMQ work IDs.
9. API token use only for the current request, never persisted.
10. Private-list authorization failure cleanup and the 10,000-item import safety limit.

The synthetic tests do not establish current VNDB API availability, cross-origin behavior in every browser, or the validity of real account tokens.

## Acceptance

- Static source-boundary inspection: PASS; exact function bodies come from the registered source fragment.
- Local execution in this authoring environment: NOT RUN; GitHub Actions is the execution authority.
- CI source/unit, package reproducibility, Firefox responsive and Chromium native-origin: pending this branch's workflow run.
- The known Chromium audio monitor capture mismatch is tracked separately; do not interpret it as a VNDB/navigation regression unless actual playback regresses.

## Rollback and next work

Rollback by reverting this test, workflow/package registration, report and status references. No product source rollback is required. After CI acceptance, revisit only concrete failures; otherwise continue with the next uncovered fragment rather than broad UI refactoring.

# V82.77 GET-QUIZ-POOL-CONTRACT-01

Date: 2026-10-18

## Scope and baseline

This is a source-characterization checkpoint only. The production `getQuizPool()` body and adjacent source-combiner/audio/custom-list wrapper were not edited. The immutable V82.65 HTML baseline remains 8,786,930 bytes with SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`. Current standalone output remains V82.72, 8,787,018 bytes, SHA-256 `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`.

Production fragment `src/scripts/script_004.htmlpart`: 98,849 bytes, SHA-256 `23dacccdc25538416c4ddba91f4e044df7c4491924d1099d8cdf0a60fb4f4bdc`. The base function is at UTF-16 source offsets 19,384–21,914 and occupies 2,824 UTF-8 bytes. These offsets are informational and may change when the source changes.

## Changes

- Added `tests/unit/get_quiz_pool_characterization_contract.test.cjs`.
- Registered the contract in `tools/run_all_checks.py`.
- Updated package naming and checksum exclusions for this checkpoint.
- No production module, script fragment, build marker, manifest runtime insertion, or standalone HTML output was changed.

## Characterized behavior and dependencies

The contract checks the exact source declaration and adjacent wrapper for title/blacklist filtering, focus-mode early return, focus ID restriction, AMQ quick-pool source mode, familiarity status, anime lookup/orphan rejection, watch status, metadata, tags, watchlist-only, repeat prevention, empty-pool handling, no-auto-broadening, final last-question guard, source combiner fallback, audio eligibility and custom-list fail-closed behavior.

Existing `tests/unit/candidate_pool_integration.test.cjs` is the behavioral golden fixture and executes the exact production function and adjacent wrapper with only browser/data adapters stubbed. It covers exact candidate ID/order, blank title/orphan rejection, filter composition, repeat rules, focus scope, combiner ordering/fallback, audio eligibility, custom-list scope/fail-closed, and empty-pool behavior. The new contract intentionally avoids cloning those fixtures.

## Validation status

- Static production-source contract: 40 assertions passed, 0 failed.
- Existing candidate-pool integration: 27 assertions passed, 0 failed.
- Full runner: 19 commands passed, 0 failed.
- Core Node behavior suites: 173 assertions passed; extraction contracts: 49; boundary audit contract: 15; new characterization contract: 40; constrained Chromium suggestion integration: 29. Combined reported assertions: 306 passed, 0 failed. See the full log for each suite.
- Integrity verifier: 112 checks passed, 0 failed. Two independent builds match the V82.72 SHA-256 `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`.

## Acceptance boundaries

This is static characterization plus fixture-backed behavior testing, not full runtime acceptance. Real-origin browser acceptance, real localStorage/IndexedDB, live audio/network, Firefox and multiplayer multi-client reconnect remain unverified due previously documented environment constraints.

## Decision

The characterization contract passed against unchanged production source. This provides a safe precondition to evaluate a minimal extraction in a separate checkpoint. It does not itself prove that an extraction is behaviorally safe, and no extraction was performed here. The smallest plausible next boundary is the base `getQuizPool()` declaration plus its adjacent `__aniEmqGetQuizPoolBaseV8248` wrapper, kept at the same point inside the existing IIFE/classic script. UI settings, playback, answer settlement, history and multiplayer stay out of scope.

## Rollback

Restore the V82.76 engineering ZIP or revert only the V82.77 test/docs/runner/package-script changes. Since production source and product output are unchanged, no runtime rollback is required. Preserve V82.65, V82.70 and V82.72 artifacts.

## GitHub publication status

This is a report-only publication on branch `v82.69-architecture-storage-multiplayer-01`. It does not constitute a complete coherent source/build/test release.
# Chinese-title source mapping and partial-source failure contract — V82.85.29

## Scope

- Production file: `src/scripts/script_031.htmlpart`.
- Test: `tests/unit/chinese_title_source_mapping_partial_failure_contract.test.cjs`.
- CI step: `Test Chinese-title source mapping and partial-source failure`.
- Production source, source URLs, cache version and IndexedDB schema are unchanged.

## Deterministic scenarios

1. Resolve unique AniList and MAL mappings and reject unknown identifiers.
2. Fail closed when source IDs point to conflicting anime rows, while permitting a unique AniList candidate that overlaps an ambiguous MAL group.
3. Keep a usable partial title map when Bangumi succeeds but AniList fails.
4. Keep a usable partial title map when AniList succeeds but Bangumi fails.
5. Return an empty map without throwing when both sources fail.

The test extracts production functions and supplies synthetic anime rows and mocked fetch results. No live CDN/API calls are made.

## Acceptance status

- Static review: tests exercise the real `sourceCandidates`, `addCandidate` and `buildMap` implementations with deterministic dependencies.
- Automated execution: **PASS, 19 assertions** in run [39250170041](https://github.com/murorachi/Amq-/actions/runs/39250170041). The focused source-mapping step passed; the source/unit job had passed the 132/132 verifier and both new title-contract tests. Firefox responsive and Chromium native-origin were still running at the last check.
- Not covered: IndexedDB upgrade/cache expiry behavior, external resource freshness/licensing, OpenCC script delivery in a real browser, or live-source schema drift.

## Rollback

Remove this test and its workflow step, then revert this report/status reference. No production source or immutable baseline rollback is needed.

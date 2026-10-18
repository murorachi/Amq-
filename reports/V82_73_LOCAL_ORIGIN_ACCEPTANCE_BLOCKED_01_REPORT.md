# V82.73 Local-Origin Acceptance Attempt 01

Date: 2026-10-18  
Scope: attempt native localStorage/IndexedDB persistence and real embedded-database suggestion selection using the V82.72 standalone HTML over a temporary localhost HTTP origin. No production HTML or production source fragment changed.

## Baseline and product identity

- Immutable baseline: V82.65, 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Current product retained: `dist/amq_learning_tool_v82_72.html`, 8,787,018 bytes, SHA-256 `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`.

## Test added

`tests/browser/real_origin_acceptance_localhost.py` starts a temporary localhost HTTP server and launches an isolated Chromium context without localStorage or IndexedDB shims. If navigation is permitted, it checks native localStorage and IndexedDB round trips across reload, real embedded song database suggestions, click selection, ARIA/list closure, focus and caret. It uses a dedicated temporary IndexedDB database and namespaced localStorage key and removes them in cleanup.

## Actual result

- **Blocked before application navigation.** Chromium returned `net::ERR_BLOCKED_BY_ADMINISTRATOR` for `http://127.0.0.1:<ephemeral-port>/amq_learning_tool_v82_72.html`.
- The first check (standalone HTML exists) passed. No origin-dependent behavior assertion ran. This is an environment restriction, not a product test pass or a demonstrated product defect.
- Because the page never loaded, no acceptance localStorage key or IndexedDB database was created. No real user data was read, changed or cleared.
- The test was intentionally not added to `tools/run_all_checks.py`, because this environment blocks it and a mandatory failing command would make the deterministic suite non-reproducible here. It is retained as a runnable test for a permitted environment.

## Existing deterministic verification

The existing full runner was executed before the localhost attempt:

- 14 commands passed, 0 failed.
- Browser integration: 29 behavior assertions passed, 0 failed, using `about:blank` and fixture-backed candidate enumeration.
- Unit/contract suites: 173 assertions passed, 0 failed.
- Integrity verifier: 106 checks passed, 0 failed.
- Two independent builds matched the V82.72 fingerprint.

These checks do not replace the blocked real-origin attempt.

## GitHub publication

This report will be uploaded and read back for content/blob verification. The remote branch still does not contain the complete matching source fragments, manifest, build tools and test tree as a reproducible source release. No complete release publication is claimed.

## Remaining limits and next task

Real-origin localStorage/IndexedDB, production-domain policy, audio/network, Firefox and multiplayer multi-client reconnect remain unverified. Next: run this test in an environment where localhost HTTP is permitted; then complete a coherent GitHub source release and verify each remote file's blob SHA against the packaged source tree.

## Rollback

No product source/output changed. Continue using V82.72. Remove the test/report files to revert this engineering-only checkpoint; V82.65 remains immutable.

# Browser UI smoke report: V82.67 checkpoint 08

## Result
- Automated browser UI smoke: PASS, 19 assertions.
- Product/runtime change: none; standalone HTML remains byte-identical to the locked V82.65 baseline.
- Full end-to-end product acceptance remains PARTIAL / OPEN.

## Baseline reconciliation
- File: tests/unit/candidate_pool_integration.test.cjs
- Local Git blob SHA and GitHub branch v82.66-source-split-02 blob SHA: c7313fe743157b5c6cde86e252983049be87ff5a.
- Result: exact match; no source reconciliation edit was required.

## Environment
- Chromium 144.0.7559.96 on Debian GNU/Linux 13; Python Playwright available.
- Direct file:// navigation and http://127.0.0.1 navigation failed with net::ERR_BLOCKED_BY_ADMINISTRATOR.
- The test therefore injects an in-memory localStorage/sessionStorage shim and loads HTML using page.set_content() under opaque about:blank origin. IndexedDB is intentionally unavailable and HTTP(S) network requests are blocked.

## Assertions
1. HTML file exists.
2. HTML has a head element for the test shim.
3. App document initializes with title AMQ學習工具.
4. Home is initial view.
5. Practice controls exist.
6. Navigation bridge initializes.
7. Practice navigation works.
8. Practice workbench mounts.
9. Single-player quiz navigation works.
10. Starting a round selects a question.
11. Answer input stays disabled before successful audio playback.
12. Skip before playback uses unplayed-question path.
13. Unplayed question settles.
14. Unplayed skip does not add history.
15. Next question advances to another song ID.
16. Solo EMQ handoff opens list view.
17. EMQ list mode is selected.
18. Embedded EMQ API is ready.
19. No uncaught browser page errors.

## Not tested
- Opening the delivered HTML via file:// or a trusted HTTP origin.
- Real localStorage persistence across reload/restart.
- IndexedDB transaction, save, restore, upgrade, and failure behavior.
- Actual audio/network playback, playback-start timing, failed-source recovery, or Firefox.
- Multiplayer room/player isolation, reconnect, older-client compatibility, or full manual regression.

No production runtime behavior was changed to work around the execution policy. Reproduce with:
python tests/browser/browser_ui_smoke_opaque_origin.py
python tools/run_all_checks.py

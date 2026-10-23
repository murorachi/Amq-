# Testing

Run `python3 run_candidate139_tests.py` and `python3 compute_visual_metrics.py`.

Browser tests use system Chromium + Playwright `page.set_content` and a test-only in-memory Storage shim. They inspect actual DOM, row selection, geometry, hover, keyboard, search and EMQ filtering at 1648×928, 1440×900 and 1280×720.

Static checks use Node.js `--check` for executable inline JavaScript and tinycss2 for CSS. Non-executable embedded data blocks are excluded.

Direct file loading and durable persistence are not tested because file:// and localhost navigation are blocked.
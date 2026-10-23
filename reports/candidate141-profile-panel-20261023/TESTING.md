# Testing

Run `python3 run_candidate141_tests.py` and `python3 compute_visual_metrics.py`.

Browser tests use Chromium + Playwright `page.set_content` with a test-only in-memory Storage shim. They check profile relocation/restoration, duplicate IDs, rail/catalog non-overlap, workspace panel, list geometry, keyboard, hover, search, EMQ mode and three viewport sizes.

This does not prove direct file-origin loading or durable persistence; those remain BLOCKED/NOT RUN.
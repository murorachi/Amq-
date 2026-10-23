# Testing

Run `python3 run_candidate140_tests.py` and `python3 compute_visual_metrics.py`.

Browser tests use Chromium + Playwright `page.set_content` and a test-only in-memory Storage shim. They verify transparent placeholder geometry, workspace sidebar visibility/interactivity, Song Select list, keyboard, search, EMQ mode and three desktop viewports.

They do not prove file-origin navigation or durable storage; those remain BLOCKED/NOT RUN.
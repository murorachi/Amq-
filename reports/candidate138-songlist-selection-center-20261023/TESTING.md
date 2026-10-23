# Testing

Run the automated browser checks:
```bash
python3 run_candidate138_tests.py
```

The test opens the HTML through Playwright `page.set_content` in system Chromium and uses a test-only in-memory Storage shim. It tests DOM/rendered state, initial selected row, row geometry, keyboard, hover, search and EMQ filtering at 1648×928, 1440×900 and 1280×720.

It does not prove direct-file loading, durable persistence, real audio or live API success. The test does not count a browser process launch as a render pass; it waits for the actual Song Select tracklist.
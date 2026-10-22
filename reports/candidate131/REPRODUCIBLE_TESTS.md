# Reproducible checks — Candidate 131

## Requirements
- Python 3
- Playwright for Python
- Chromium executable available to Playwright (this run used `/usr/bin/chromium`)
- `tinycss2`, BeautifulSoup, Pillow, scikit-image and NumPy for static checks and pixel metrics

## Browser route
The test opens the exact HTML via `page.set_content`, waits for initialization, clicks the central home icon, then clicks the Song Select menu item. It checks the no-image fallback, the transparent Song Select stage, the unaffected home route, and that adding the existing scene-image class suppresses the fallback. It saves screenshots at 1648×928, 1440×900 and 1280×720 at DPR 1.

This is real DOM/CSS rendering, but the document has an opaque origin. It cannot validate `file://` opening or persistent localStorage/IndexedDB. Those remain BLOCKED/NOT RUN.

## Static checks
`CANDIDATE131_STATIC_REPORT.json` records the exact candidate hash, inline JavaScript parse result, CSS parser result, duplicate-ID check, browser assertions and pixel metrics.

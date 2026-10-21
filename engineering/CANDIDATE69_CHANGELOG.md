# Candidate 69 Changelog

- Parent: Candidate 68 (`c43c5d67069db076321834415cfc3431fc7a06b16c80b94844750b2cad39b209`).
- Fixes desktop Song Select page-level vertical overflow at 1440×900 and 1280×720.
- Root cause: inherited workspace active bottom padding (82px) reserved space for a non-visible sidebar/dock plus wrapper min-height of 100vh despite a 22px top margin.
- Scoped change on desktop Song Select only: body bottom padding becomes 0 and wrapper min-height becomes `calc(100vh - 22px)`. Mobile dock spacing rules are unchanged.
- No change to catalog width, work/song selection, metadata auto-selection, scene background fallback, or routes.
- Static tests 13/13 PASS; browser tests 15/15 PASS; viewport checks 3/3 PASS; console/page errors 0.
- `file://`, real IndexedDB/audio, remote HTML hash, and pixel-perfect installed-client visual acceptance remain blocked/not run.

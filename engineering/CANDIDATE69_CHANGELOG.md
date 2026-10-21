# Candidate 69 Changelog

- Parent: Candidate 68 (`c43c5d67069db076321834415cfc3431fc7a06b16c80b94844750b2cad39b209`).
- Fixes desktop Song Select page-level vertical overflow at 1440×900 and 1280×720.
- Root cause: inherited workspace active bottom padding (82px) plus wrapper min-height of 100vh despite a 22px top margin.
- Scoped change on desktop Song Select only: body bottom padding becomes 0 and wrapper min-height becomes `calc(100vh - 22px)`. Mobile dock spacing rules unchanged.
- No change to catalog width, work/song selection, metadata auto-selection after opening a work, scene background fallback, or routes.
- Static tests 13/13 PASS; browser tests 15/15 PASS; viewport checks 3/3 PASS; console/page errors 0.
- Direct `file://` and localhost navigation both BLOCKED by environment policy; IndexedDB save/audio playback not verified.
- Screenshot review against official osu!stable guide confirms material visual gaps remain; pixel-level acceptance not achieved.
- GitHub HTML body upload and remote hash verification remain incomplete.

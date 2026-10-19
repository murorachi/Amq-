# First-pass audit: script_041 EMQ Chinese title enrichment

Baseline V82.85.28. File src/scripts/script_041.htmlpart. Source blob 0c5de62e62f36d35647b67825494a92b759a7c9f.

Disposition: first-pass review complete; no product source change.

Responsibilities: resolves EMQ work metadata and VNDB IDs, normalizes titles, loads OpenCC, caches translated titles/aliases, fetches VNDB records in batches, queries Bangumi as fallback, and exposes aliases for quiz and multiplayer use.

Risks:
- External requests and conversion are asynchronous; preserve fail-soft behavior and avoid blocking quiz startup.
- Work IDs, VNDB IDs and song IDs are distinct domains; keep the title cache keyed by the intended work ID.
- Cached translations and source aliases have different provenance; avoid replacing valid titles with empty or lower-quality fallbacks.
- Deduplication and Traditional Chinese/Kana filtering affect answer matching and alias sharing.

Evidence gaps: script_038 supplies the EMQ work map and script_031 handles the general title map. No dedicated exact-source test was found for this fragment's request batching, cache merge precedence or alias filtering. External API throttling and live freshness remain unverified.

| ID | Risk | Disposition |
|---|---|---|
| EMT-01 | Async enrichment crosses external services and shared quiz state. | High: preserve fail-soft behavior. |
| EMT-02 | Cache precedence affects title/alias quality. | High: characterize before changing precedence. |
| EMT-03 | Identifier mapping is a data-integrity boundary. | High: keep work/VNDB/song IDs separate. |

Rollback by reverting this report and matrix reference. Product source is unchanged.

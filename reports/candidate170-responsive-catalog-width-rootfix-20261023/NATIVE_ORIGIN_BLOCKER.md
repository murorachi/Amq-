# Candidate 170 Native-Origin Acceptance Attempt (2026-10-23)

## Candidate
- HTML: `dist/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_170_responsive_catalog_width_rootfix.html`
- SHA-256: `089d8cb9f6e63178a9726dbfce9485c8691e81d3600ce5669458a26c7a9d5662`

## Attempted checks
- Attempted Chromium navigation to the actual local `file://` URL.
- Attempted serving the same file over a local HTTP server and navigating to its `http://127.0.0.1` URL.
- Both attempts were blocked before document navigation by the execution environment with `net::ERR_BLOCKED_BY_ADMINISTRATOR`. Therefore, no claim is made about native-origin page initialization or persistence.

## Results
- BLOCKED: native `file://` startup in this execution environment.
- BLOCKED: local HTTP-origin browser startup in this execution environment.
- NOT RUN: native-origin localStorage persistence and reload verification, custom-list CRUD persistence, live APIs/audio, pixel-diff against official osu!stable image.

## Reference image
The pinned upstream URL is `https://raw.githubusercontent.com/ppy/osu-wiki/8c585eea35455a4bd255f93b5d59ccaf807e6bdd/wiki/Client/Interface/img/song-selection.jpg`. A direct retrieval attempt failed with DNS name-resolution failure for `raw.githubusercontent.com`. Pixel-diff remains BLOCKED; do not replace the pinned reference with a different image without recording the provenance.

## Status
Candidate 170 remains experimental. Existing opaque-origin Playwright checks are still valid for the tested behaviors, but do not establish native file launch or durable storage. Rollback checkpoint Candidate 169 SHA-256: `5913ad864a8841b144de7c72c4deeede765ec5675117667c13f9eb5fe89a7d66f`.

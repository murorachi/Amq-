# Candidate 82 Test Report

## Artifact
- File: `amq_learning_tool_v82_85_32_workspace_proto30_function-first_82.html`
- Size: 9,125,987 bytes
- SHA-256: `50c7a1a131f49d718fe3a29af51b557d9f155daa76ba841630141e61fc2a3540`

## Static checks
- 53 inline executable JavaScript blocks checked with `node --check`: pass, 0 syntax failures.
- 2 embedded non-JavaScript payload blocks skipped.
- 78 CSS blocks parsed with `tinycss2`: pass, 0 parser errors.

## Browser interaction tests
- Four workspace action lists discovered with counts 6, 9, 7, 6, total 28.
- 28/28 action entries: panel opened, Escape closed it, and active app route remained unchanged. This validates the shell/navigation contract, not every underlying data mutation.
- DOM restoration: 3/3 cases (`vn-list`, `watchlist-watch`, `batch-visible`) restored original parent, hidden class/attribute, and inline display after close.
- Batch safety: 3/3 (`batch-apply-target`, `batch-watch-target`, `batch-create-list`) did not trigger any apply/watch/create click; all counters remained zero.
- Browser page errors with test-only storage shim: 0.
- Some external CDN/API requests returned `ERR_NAME_NOT_RESOLVED`; those resources are not validated.

## Not run / not verified
- Real-origin browser persistence using actual browser localStorage.
- Audio playback, cover/API loading, and remote VNDB interactions.
- End-to-end create/rename/delete of custom lists and full watch-state data mutations.
- Complete functional assertions for every control inside every panel.
- Screenshot pixel comparison against a running osu!stable client.
- GitHub remote HTML binary presence/hash verification.

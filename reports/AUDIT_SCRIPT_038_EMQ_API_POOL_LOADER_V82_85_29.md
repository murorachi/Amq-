# First-pass audit: script_038 EMQ API and candidate pool

Baseline V82.85.28. File src/scripts/script_038.htmlpart. Source blob 9a4644745745137b32191ff25eccdc00564cbe19.

Disposition: first-pass review complete; no production source change.

## Profile and responsibilities
- 14,105 characters, 124 lines, 28 named functions detected by conservative pattern.
- Loads the compressed catalogue from script_037, builds EMQ work/song/meta/alias maps, exports window.__aniEmqAPI, persists the source toggle, and composes AMQ/Mixed/EMQ candidate pools.
- Provides work/song/VNDB lookups, audio URL candidates, aliases, source-specific status/tag lookup, deterministic deduplication and question selection.

## High-risk boundaries
- Loader fails closed for unsupported compression, invalid schema, duplicate/invalid IDs, AMQ/EMQ collisions and missing work mapping. Keep readiness false on failure.
- EMQ work IDs and song IDs must remain distinct from AMQ identifiers and from VNDB IDs.
- Mixed/EMQ pool behavior has different hard-filter and selected-list semantics; do not merge branches based on similar output shapes.
- Audio URLs and aliases belong to EMQ song IDs, while work metadata belongs to work IDs.

## Evidence
- tests/unit/emq_api_contract.test.cjs executes the exact loader/API with synthetic compressed fixtures and covers ID separation, pool modes, metadata, aliases/audio URLs, selected scopes and fail-closed collisions.
- tests/unit/embedded_emq_payload_integrity.test.cjs now decodes the actual embedded gzip catalogue: 6,645 works, 16,839 songs, 8,383,856 decompressed bytes; IDs and work references validated.
- Run 39232821248: source/unit 132/132 and Firefox responsive passed; browser-native failed only at the known audio monitor capture assertion. Manual upstream-network acceptance was not performed.

## Findings
| ID | Risk | Disposition |
|---|---|---|
| EMQAPI-01 | Catalogue initialization and ID validation are a data-safety gate. | Critical: preserve fail-closed readiness and collision checks. |
| EMQAPI-02 | Pool mode and hard-filter semantics differ by source. | High: retain existing exact-source pool contracts. |
| EMQAPI-03 | Aliases, metadata and audio candidates use different identifier domains. | High: no generic map/key consolidation. |

Coverage gaps: actual upstream catalogue freshness and every external audio URL are not established by local tests. Rollback by reverting this report and matrix references; product source is unchanged.

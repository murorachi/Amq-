# V82.85.29 first-pass source audit summary

## Baseline and scope

- Audit branch: v82.85.29-source-audit-matrix-01.
- Product/source parent: v82.85.28-next-audio-state-reset-dedup-01.
- Immutable product baseline remains V82.82, 8,787,490 bytes, SHA-256 227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b.
- Manifest registers 91 fragments: 41 script fragments and 50 style fragments; 15 extracted modules.

## Audit completion count

| Measure | Result |
|---|---:|
| Registered fragments in manifest | 91 |
| Script fragments receiving first-pass review | 41 / 41 |
| Style fragments receiving first-pass static selector review | 50 / 50 |
| First-pass ledger entries complete | 91 / 91 |
| Awaiting initial per-fragment review | 0 |
| Production source/CSS changes in this audit stage | 0 |

“First-pass complete” means each fragment has an identified role, initial risk/disposition and a linked audit note or grouped note. It does not mean every possible bug was excluded. For CSS, the review is static selector/cascade inventory only; full pixel-diff and computed-style equivalence across all states were not performed.

## New data-integrity checks

- Corrected manifest classification for script_037 from a generic inline script/data payload to compressed-data-payload, because its MIME type is application/octet-stream and its body is Base64 gzip.
- Added tests/unit/embedded_emq_payload_integrity.test.cjs to decode the actual embedded catalogue, not a synthetic fixture. It verified schema v1, 6,645 works, 16,839 songs, 8,383,856 decompressed bytes, unique positive IDs and valid work references.
- Corrected script_030 manifest role to json-id-mapping-payload.
- Added tests/unit/anilist_id_map_payload_integrity.test.cjs. It verified 9,400 mapping entries with positive numeric IDs and 9,364 unique target IDs. Repeated target values remain intact because the mapping may be many-to-one.
- These are test/manifest changes only; product payload bytes and runtime behavior were not changed.

## Highest-risk findings retained

1. script_004: answer settlement, audio-start guards, multiple timers, settings migration and suggestion UI share mutable quiz state.
2. script_028: room/session, REST polling, WebSocket reconnect, ID scopes, persistence and audio/video lifecycle are coupled.
3. script_001: quiz history summaries, target summaries, IndexedDB catalogue snapshots, media fallback and familiarity state share one fragment.
4. script_020: SRS/FSRS state transitions and recovery have no dedicated formula/transition contract in the reviewed unit inventory.
5. script_023: full backup restore mutates multiple persistence domains; rollback order is critical.
6. script_025/script_040: AMQ/EMQ selected-list scope must preserve work/song/VNDB identifier separation and fail closed.
7. script_036: scene-background IndexedDB, image validation and Blob URL cleanup lack a dedicated transaction/resource-lifecycle contract.
8. script_031/script_039/script_041: external title/VNDB sources, caching, partial failures and alias precedence need focused contracts before logic changes.
9. CSS style_001/style_031 and late override fragments: repeated selectors and !important declarations are cascade evidence, not automatic cleanup targets.

## Validation evidence

Run [39232821248](https://github.com/murorachi/Amq-/actions/runs/39232821248):
- Source/unit verifier: PASS, 132/132.
- Actual embedded EMQ payload integrity: PASS, 6,645 works / 16,839 songs.
- AniList mapping integrity: PASS, 9,400 entries.
- Deterministic V82.85.28 standalone candidate: PASS, 8,786,547 bytes / SHA-256 7284c4ca5625886d913f55ab19a0076d1a5be46a88504dd8de724ae8f5bd274d.
- Firefox responsive: PASS.
- Chromium native-origin job: failed only at final non-silent audio output capture (peak=0, rms=0.0). Quiz and multiplayer lifecycle assertions before that step passed. User-confirmed product playback remains the reference; manual interactive acceptance was not performed.

Newer audit-only commits are triggering another workflow run; its final status must be recorded separately before this checkpoint is considered fully CI-verified.

## Next highest-value work

Do not start a broad refactor. Add focused characterization only where it materially improves safety:
1. SRS rating/interval/quarantine contract.
2. Scene-background IndexedDB transaction and object-URL cleanup contract.
3. VNDB/Chinese-title cache precedence and fail-soft request contract.
4. Visual comparison for a concrete proposed CSS change, not a blanket rewrite of all 50 style fragments.

## Rollback

Revert this summary, matrix/audit reports, the two data integrity tests and workflow/package registration, and the two manifest role corrections. No product source or CSS rollback is needed. Keep V82.85.28 and immutable V82.82 unchanged.

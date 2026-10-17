# V82.66 SOURCE-SPLIT-02 Delivery Report

Date: 2026-10-18 (Asia/Taipei)
Status: PARTIAL; byte-preserving source split and deterministic build verified. No business logic refactor was performed.

## Baseline

- HTML: `amq_learning_tool_v82_65_candidate_pool_cleanup.html`
- Bytes: 8,786,930
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- The source HTML's actual bytes were rehashed in this run and matched the documented V82.65 candidate fingerprint.
- The full V82.65 delivery ZIP (expected 124,658,780 bytes, SHA-256 `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`) was not present in the current workspace/Library, so its outer hash, CRC and full internal manifest were not independently recomputed in this run. No substitute historical product version was used.

## Changes

- Separated 50 inline CSS blocks and 41 inline script/data blocks into byte-preserved fragments.
- Created a source template with 91 unique markers, a fragment map, a machine-readable SHA-256 manifest, a Python standard-library build tool, a verifier, baseline metadata and handoff documents.
- No product behavior, UI, runtime loading strategy, storage keys, data schema, song ID, work ID, or catalog content was intentionally changed.
- Original V82.65 HTML is preserved under `baseline/`; the generated single-file HTML remains directly openable locally.

## Artifacts

- Archive: `AMQ_V82_66_SOURCE_SPLIT_02.zip`
- Bytes: 13,136,827
- SHA-256: `a6dc6977866b542749d8bb742696bc88585d45a25d98dc39eb3a2f3458b3d545`
- ZIP CRC: PASS
- Unique ZIP entries: 112
- Internal manifest: 111/111 SHA-256 and byte-length checks PASS
- Standalone HTML output: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`

## Tests actually executed

1. Source fragment integrity and manifest checks: PASS.
2. Two independent builds: PASS; both output hashes identical.
3. Byte-for-byte baseline comparison by output length and SHA-256: PASS.
4. Node syntax check on 39 classic JavaScript blocks: 39/39 PASS. The application/json and application/octet-stream script payloads were excluded from JS syntax checking.
5. ZIP CRC, unique path, internal hash and byte-length checks: PASS.
6. Final verifier summary: 98 passed, 0 failed.

Not executed: Firefox manual operation, external audio/API, real IndexedDB Blob backup/restore round trip, multi-device LAN/WebSocket/reconnect, complete product regression suite, server/catalog ZIP-level baseline verification.

## GitHub upload

The report and text handoff are committed to branch `v82.66-source-split-02`. The 13 MB ZIP binary and HTML binary are not uploaded to GitHub by this commit because the available connector supports text-file operations but does not provide bulk local-directory/binary upload. Do not interpret this report commit as binary artifact publication.

## Rollback

No product HTML was modified. To roll back this checkpoint, use the original V82.65 HTML fingerprint above and ignore/remove the separate SOURCE-SPLIT-02 directory and archive. Do not overwrite V82.65.

## Next

1. Obtain and independently verify the exact V82.65 delivery ZIP.
2. Publish the binary source tree through an available artifact upload path and verify the downloaded bytes against the archive SHA-256.
3. Continue semantic dependency analysis and focused candidate-pool contract tests before any business-logic refactor.

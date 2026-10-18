# Refactor plan

## Stage 1: no-loss physical split (this checkpoint)
- Split style/script blocks as whole byte ranges.
- Preserve document order and all source bytes.
- Verify two deterministic builds and baseline fingerprint.

## Stage 2: semantic inventories
- Resolve executable scripts versus JSON/template payloads using actual MIME/type and content.
- Map globals, definitions/overrides, call sites, event listeners, timers, DOM writer/reader relations and storage reads/writes.
- Establish focused tests before moving business logic.

## Stage 3: responsibility modules
- Candidate pool and filtering first, after contracts/tests.
- Then quiz lifecycle/audio/timer ownership.
- Then learning records, familiarity, lists, review scheduling and backup/restore.
- Keep AMQ/EMQ identities distinct and avoid storage migrations unless separately verified.

## Acceptance for this stage
- Every extracted block matches recorded bytes/hash.
- Two builds produce identical hashes.
- Build output is byte-identical to V82.65 HTML fingerprint.
- No product behavior or user data format changed.


## Checkpoint 07 architecture decision
- The exact-source answer-flow contract and additional candidate-pool cross-product tests are now in place.
- The candidate-policy block remains delimited and directly testable, so it is not being moved into a separate runtime module in this checkpoint. The architecture review found no concrete defect or maintenance benefit that justifies adding a build-time include mechanism now.
- Revisit policy-module extraction only after browser/persistence acceptance and only with a deterministic build that preserves the locked standalone HTML output unless a separately approved product change is intended. See `reports/CANDIDATE_POLICY_REFACTOR_DECISION_07.md`.


## Execution record — V82.68 CANDIDATE-POLICY-MODULE-01

- Extracted the pure candidate-policy block to `src/modules/candidate_pool_policy.js`; the build expands its marker at the original position inside `script_004`, so runtime remains one classic script and the generated HTML is byte-identical to V82.65.
- The earlier Checkpoint 07 decision above is historical; this extraction was performed only after the deterministic include mechanism and golden tests were in place.
- `tools/semantic_inventory.py` now scans the 41 script/data fragments plus the extracted module; the updated regex inventory reports 42 source files, 817 named function/arrow definitions, 31 duplicate-name groups, 89 explicit window assignments, and 391 literal DOM ID references. These are navigation aids, not a full AST/call graph.
- Latest tests: 8/8 runner commands passed; 135 Node tests passed; integrity verifier 101/101; generated HTML byte-identical to the locked baseline.
- Browser smoke rerun timed out / EPIPE after 11 preliminary assertions and remains unverified.

Next: review remaining pure policy/adapter boundaries and golden tests before touching core candidate-pipeline behavior. Storage, audio and multiplayer integration remain later phases.


## Execution record — V82.69 ARCHITECTURE-STORAGE-MULTIPLAYER-01
- Completed a second exact-byte module extraction: `src/modules/storage_repository.htmlpart` replaces `script_027` content with a single build marker; generated HTML reinserts the exact original script bytes at the same position.
- Build/verifier now support module markers in their declared insertion fragment rather than assuming all modules live in `script_004`.
- Added isolated tests for namespace isolation, storage key validation, snapshots, transactional writes/rollback, legacy allowlist/validation/preservation, full-backup manifest/allowlist validation, adapter validation, multiplayer session/reconnect behavior and poll/live-channel fallback contracts.
- Existing candidate pipeline composition tests continue to cover base pool -> EMQ/Mixed combine -> audio eligibility -> custom-list scope ordering.
- Browser UI smoke passed 19 assertions this run. Direct file navigation remains blocked; storage/IndexedDB/audio/multiplayer network acceptance is not yet complete.

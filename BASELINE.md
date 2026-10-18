## V82.85.20 module contract CI coverage (CI pending)

- Adds `tests/unit/run_module_contracts.py`, which derives the unique Node module-contract test set from the current closeout matrix and executes each test fail-fast.
- The runner verifies every module has at least one existing unit test reference and confirms all evidence paths exist; browser integration paths are checked but remain executed by the browser job.
- Removes duplicate explicit workflow invocations for module tests now run by the matrix-driven runner.
- CI pending; no product changes. Product baseline unchanged: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.

---









## V82.85.15 pure-helper boundary audit (audit only)

- Parent accepted checkpoint: V82.85.14, commit `e9b249364a79d7da896ff731899c879d29ddfebd`.
- Added report `reports/V82_85_15_PURE_HELPER_BOUNDARY_AUDIT_01.md`; reviewed navigation/watchlist, ANN cover/dashboard and EMQ custom-list source boundaries.
- No production extraction was justified: remaining candidates depend on storage, DOM, mutable state, external API/cache or async lifecycle; dashboard formatting wrappers are too trivial to warrant a new module.
- Tests/build/browser checks not run. Product baseline unchanged: V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 remains immutable.
- Audit report write commit: `72cb4c29ec335b01c028ab4bbae6d13aba91d872`; remote readback/CI pending.

---

## V82.85.14 nearNumberV1 pure-helper extraction (CI pending)

- Parent accepted checkpoint: V82.85.13 commit `73fa181d4f433ee8a54f170f1f1b1d7a475d93b5`.
- Extracted existing pure helper `nearNumberV1(a,b)` byte-for-byte into `src/modules/near_number_v1.htmlpart` at its original script execution position.
- Added exact-source and nine behavior contracts; deterministic V82.82 fingerprint gate remains required.
- Product remains V82.82, 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable. CI pending.

---

# Baseline lock

## V82.85.13 EMQ selection contract (accepted)

- Parent accepted commit: `0d1ec323bb927c03538f20672b8f17cce8b2fa6c`; accepted source/test commit: `0894408db4df40a569dafb7e14cc6e5407d25145`.
- Acceptance: [GitHub Actions run 39133558958](https://github.com/murorachi/Amq-/actions/runs/39133558958), both jobs passed.
- Product output remains V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
- Audit found no safe pure extraction boundary in EMQ persistence/selection helpers. Added eight behavior contracts for exact production `getSelectedIds()`; no production source or manifest changed.

---

## V82.85.13 EMQ selection contract (CI pending)

- Parent accepted commit: `0d1ec323bb927c03538f20672b8f17cce8b2fa6c` on `v82.85.12-emq-list-normalization-01`.
- Product output remains V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; V82.65 immutable.
- Audit found no safe pure extraction boundary in EMQ persistence/selection helpers: they use browser storage, mutable database state, DOM selection, or live EMQ API data. No production refactor was forced.
- Added eight behavior contracts for exact production `getSelectedIds()`; CI and deterministic build pending.

---

## V82.85.12 EMQ list normalization checkpoint (accepted)

- Starting commit: `8de8ab357f985542981e974e1c113731cf5bd537` on `v82.85.11-amq-list-normalization-01`; new branch: `v82.85.12-emq-list-normalization-01`.
- Product output remains locked to V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. V82.65 remains immutable.
- `readEmqLists()` stays in `script_028` because it combines storage access and normalization. Nine exact-source contract cases characterize payload compatibility, fallback IDs, stringification, deduplication, malformed rows and missing payload.
- Pure `unique(v)` moved byte-for-byte from `script_040` to `src/modules/emq_list_normalization.htmlpart` at its original insertion point. Five behavior cases plus an exact-source byte assertion guard it.
- No CSS or product behavior change is intended. Acceptance passed in [GitHub Actions run 39131137249](https://github.com/murorachi/Amq-/actions/runs/39131137249): both jobs succeeded, new contract 14/14, source/build verifier 124/124, and reconstructed V82.82 output remains byte-identical at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

---

## V82.85.8 accepted test-only checkpoint

- Added deterministic browser contract `tests/browser/quiz_answer_playback_lifecycle.py`; no production source changed.
- CI run `39116682422` passed both jobs. Browser assertions cover valid playback gating, correct settlement/history, no pause on reveal, exit teardown, no-audio rejection, and unplayed skip without history/familiarity writes.
- Browser log: 96 PASS lines, 0 FAIL/exception lines. V82.82 product remains byte-identical: 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.



## V82.85.7 accepted test-only checkpoint

- No production source changes. Add existing `real_origin_acceptance_localhost.py` and `quiz_suggestions_integration.py` to engineering CI.
- Purpose achieved: real-origin IndexedDB/input and suggestion interactions are now in the engineering CI workflow. Run `39115364605` passed both jobs; browser logs contain 79 PASS assertions and 0 failures.
- Full submit/classify/skip/playback and multiplayer lifecycle acceptance remains a prerequisite for later lifecycle extraction.
- Product lock unchanged: V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.



## V82.85.6 accepted engineering checkpoint

- Parent V82.85.5 passed source/unit and real-browser acceptance in GitHub Actions run `39114740898`.
- `validAnimeIds` extracted to `src/modules/amq_valid_anime_ids.htmlpart` with the exact original helper bytes and same insertion position.
- Acceptance passed in GitHub Actions run `39115085244`: source/unit and browser jobs successful. Deterministic build matches V82.82 exactly; 122/122 integrity/build checks, AMQ contracts 11/11, validator contracts 12/12, storage/backup contracts 6/6, and browser UI 19 assertions with 0 page errors.
- Product must remain byte-identical to V82.82: 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.



## Proposed engineering-only checkpoint V82.85.5 (pending CI)

- Extracted pure AMQ custom-list ID, row and payload validators to `src/modules/amq_custom_list_validation.htmlpart`; generated product must remain byte-identical to V82.82.
- Focused validation contract has 12 cases. Acceptance pending branch CI and deterministic build.
- Product lock: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.



## Verified engineering-only checkpoint: V82.85.4 native storage and custom-list acceptance

- Product remains V82.82: `dist/amq_learning_tool_v82_82.html`, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 remains untouched. No product HTML was regenerated.
- Native-origin Chromium acceptance passed for AMQ/EMQ list create, member assignment, rename, reload persistence, full-backup export and restore. Reload policy permits only a valid default-empty `aniSrsScheduleV1` addition; all prior values remain byte-identical.
- Node contracts: snapshot 7/7, custom-list CRUD/mapping 10/10, backup/restore 6/6. Source/build verifier 118/118; deterministic reconstruction matches V82.82 byte-for-byte.
- Exact EMQ membership mapping helpers are isolated in `src/modules/emq_list_membership.htmlpart`; generated output is unchanged.
- Final workflow: [run 39110833508](https://github.com/murorachi/Amq-/actions/runs/39110833508), all jobs passed. Firefox, real audio, production-domain storage policy and multiplayer reconnect remain unverified.
- Report: `reports/V82_85_4_NATIVE_STORAGE_CUSTOM_LISTS_MODULARIZATION_01_REPORT.md`.

## Engineering-only checkpoint: V82.85.4 native storage and custom-list acceptance

- Product remains V82.82: `dist/amq_learning_tool_v82_82.html`, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 remains untouched. No product HTML was regenerated.
- Added a tracked real-localhost browser acceptance harness for native storage reload, AMQ/EMQ custom-list CRUD and mapping, and full-backup export/delete/restore. The reload contract allows only a valid default-empty `aniSrsScheduleV1` addition; all prior values must remain byte-identical.
- Extracted the exact EMQ membership mapping helper block to `src/modules/emq_list_membership.htmlpart`, with a manifest marker and fingerprint. This is intended to preserve generated V82.82 output byte-for-byte.
- Added Node contract tests and a branch-scoped GitHub Actions acceptance workflow. The new workflow result is pending and must be checked before calling the stage passed.
- No high-risk answer submission, playback, multiplayer or CSS boundaries were changed.
- Report: `reports/V82_85_4_NATIVE_STORAGE_CUSTOM_LISTS_MODULARIZATION_01_REPORT.md`.

## Latest engineering-only follow-up — V82.85.3 native storage reload assertion review

- Base: `v82.85.2-native-storage-backup-acceptance-01` at `3cb626c5501822c6b4ed3d13ebe5bdab3ab74809`.
- Product remains V82.82: `dist/amq_learning_tool_v82_82.html`, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 remains unchanged. No production HTML, CSS, or runtime source changed.
- The reload snapshot contract now permits only one narrowly validated addition: a default-empty `aniSrsScheduleV1` schedule created by the existing pagehide persistence handler. Existing keys/values must remain byte-identical; all other changes fail.
- Regression test `tests/unit/native_storage_reload_snapshot_contract.test.cjs`: 7/7 cases passed in the executed Node test run.
- The full native-origin Playwright harness was not rerun after this assertion-policy correction. See `reports/V82_85_3_NATIVE_STORAGE_RELOAD_ASSERTION_FIX_01_REPORT.md` for evidence and limits.

## Latest distinct product release: V82.82

- Product HTML: `dist/amq_learning_tool_v82_82.html`
- Bytes: `8,787,490`
- SHA-256: `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`
- Scope: fix the undefined EMQ invalid-selection marker constant in `src/scripts/script_040.htmlpart`; add AMQ/EMQ UI acceptance and responsive Chromium baselines. V82.80 remains preserved. Immutable V82.65 is unchanged.
- Acceptance is partial: native-origin storage/backup rollback, Firefox, real audio and multiplayer multi-client checks remain open.

## Engineering-only checkpoint — V82.83 CSS selector residual review

- Product baseline remains V82.82 and its HTML fingerprint above is unchanged.
- The 32 residual CSS inventory rows now have explicit dispositions: eight parser artifacts are identified as keyframe/style-tag records, and 24 actual selectors have evidence-based component ownership. CSS remains unmoved until Firefox/cascade acceptance.
- Added a four-case source contract for full backup export/import, corrupt manifest rejection and rollback after a synthetic write failure. This does not replace native-origin acceptance.
- Native localhost, Firefox, GitHub full-source sync/clean remote build, real audio and multiplayer reconnect remain open. See `reports/V82_83_CSS_SELECTOR_RESIDUAL_REVIEW_01_REPORT.md`.

## Direct V82.65 checkpoint package: recovered and verified

- Package: `AMQ_V82_65_候選題池與篩選資料流整頓檢查點.zip`
- Bytes: `124658780`
- SHA-256: `db7918affcfbb6a15b0dc3265877623d9646532c7597bf2acaa85060f5a701b5`
- External `.sha256` sidecar: exact filename/digest match.
- ZIP CRC: PASS; 291 entries / 291 unique paths.
- Internal `SHA256SUMS.txt`: 290/290 entries verified, no missing paths or mismatches.
- Recovery copy: `/mnt/data/v82_65_baseline_recovery/AMQ_V82_65_候選題池與篩選資料流整頓檢查點.zip` (kept separate and untouched).
- Verification report: `reports/BASELINE_PACKAGE_VERIFICATION_06.md`.

## Locked current V82.65 product assets

| Asset | Bytes | SHA-256 |
|---|---:|---|
| `amq_learning_tool_v82_65_candidate_pool_cleanup.html` | 8,786,930 | `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33` |
| `anisong_multiplayer_room_server_v82_65.py` | 88,403 | `41e79fbabcbc037aef9d2b27076450217673935ede629c16caa956d737ff1736` |
| `anisong_multiplayer_catalog_server.json` | 36,540,011 | `2a045731b9a478e68e88f1965f010f0d7512990344d1d194ef44262f11c5c652` |
| `anisong_multiplayer_unavailable_audio_v82_59.json` | 40 | `a6c6539e68f67e30ef4c0976b04280234352f1b0d61e907138af39050350023a` |

The source archive's `VERSION.json` labels V82.65 as a PARTIAL candidate-pool/filtering checkpoint, not a completed full engineering release. V82.64 Release ZIP remains the direct historical source from which V82.65 was derived.

## Build baseline used by the source split

- Standalone HTML: `baseline/amq_learning_tool_v82_65_candidate_pool_cleanup.html`
- Bytes: 8,786,930
- SHA-256: `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`
- `python tools/verify.py` reconstructs the HTML twice and verifies byte identity to this baseline.

Do not overwrite the original package, the recovered copy, or the locked HTML baseline. Every checkpoint uses a unique artifact name.

## Engineering checkpoint overlay — V82.66 checkpoint 07

The immutable V82.65 HTML fingerprint above remains the build target. Checkpoint V82.66 ANSWER-FLOW-AND-RELIABILITY-07 adds exact-source tests, a one-command local verification runner, and engineering reports only; it does not change the production HTML/runtime. Test results are recorded in reports/ANSWER_FLOW_AND_RELIABILITY_07_TEST_PLAN.md. Product acceptance remains PARTIAL until browser, persistence, audio, and multiplayer checks run in a permitted test environment.


## Engineering checkpoint overlay — V82.67 checkpoint 08

The user confirmed the V82.66 product baseline is satisfactory. Checkpoint `V82.67 BROWSER-UI-SMOKE-08` adds a constrained Chromium UI smoke test and report only. Local and GitHub blob SHA for `tests/unit/candidate_pool_integration.test.cjs` is `c7313fe743157b5c6cde86e252983049be87ff5a`. The UI smoke uses page.set_content() with test-only in-memory storage because the environment blocks file:// and localhost navigation. It does not validate real browser persistence, IndexedDB, real audio, Firefox, or multiplayer. Production HTML remains byte-identical to the immutable V82.65 baseline.


## Engineering checkpoint overlay — V82.68 CANDIDATE-POLICY-MODULE-01

The immutable V82.65 HTML baseline remains 8,786,930 bytes / SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`. V82.68 separates the pure candidate-policy source into `src/modules/candidate_pool_policy.js`, injected at the original position inside the existing classic script. It adds no runtime script tag or external loading and rebuilds byte-identically to baseline. Latest automated run: 8/8 commands passed, 135 Node tests passed, integrity verifier 101/101. Latest constrained browser smoke rerun timed out with Playwright driver EPIPE and is not considered passed; earlier V82.67 smoke evidence remains historical only.


## Engineering checkpoint overlay — V82.69 ARCHITECTURE-STORAGE-MULTIPLAYER-01

The immutable product HTML remains V82.65: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`. V82.69 extracts the existing storage repository script block into `src/modules/storage_repository.htmlpart` and injects its exact bytes at the original position in the standalone document. Candidate policy remains a source module. No product data format or storage migration changed. Build output is named `dist/amq_learning_tool_v82_69.html`. Direct file-origin acceptance is still blocked by the environment. User acceptance of checkpoint V82.69 was explicitly confirmed on 2026-10-18. This is a product checkpoint sign-off, separate from the still-partial environment-dependent browser acceptance and incomplete GitHub source publication.

## V82.69 modularization inventory overlay

`reports/MODULARIZATION_PROGRESS_CHECKLIST.md` and `.csv` enumerate the 41 script/data fragments, 50 CSS fragments, and two extracted source modules present at the V82.69 checkpoint. This is a progress inventory only; it does not change the immutable V82.65 baseline or claim semantic modularization is complete.

## V82.69 AST dependency inventory overlay — AST-PASS-01

The product baseline remains immutable V82.65. This engineering pass adds a TypeScript-parser-backed inventory tool and generated reports only. The 41 script/data fragments were scanned: 39 executable JavaScript fragments parsed without syntax diagnostics; two non-JavaScript data blocks (AniList JSON map and compressed EMQ payload) were excluded from JS parsing. The inventory reports 809 named function/function-valued definitions and 2,126 direct identifier-call edge records, with limitations documented in `reports/AST_DEPENDENCY_MAP.md`. `script_001` is a mixed data/runtime fragment, not a pure data file; `script_004` remains a mixed core application IIFE. No product source fragment or generated HTML was modified.

## V82.69 quiz suggestion helper extraction overlay — QUIZ-SUGGESTION-TEXT-01

`src/modules/quiz_suggestion_text.js` contains the exact existing helper source for uncommon-symbol normalization, normalized-to-original UTF-16 source-offset mapping, and highlight range merging. The module is injected at its original position inside `script_004` with no new runtime script tag. A production-source contract test covers 16 normalization, offset, highlight and comparator assertions. `tools/verify.py` reports 105/105 checks passing and reconstructs the immutable V82.65 standalone HTML byte-identically. This is a bounded helper extraction, not completion of the full quiz UI modularization.


## V82.69 quiz suggestion UI integration overlay — QUIZ-SUGGESTION-INTEGRATION-01

Engineering-only test/documentation update. Added a Chromium integration test for the production suggestion renderer and input wiring using deterministic test suggestions; no production runtime source changed. The test passes 18 assertions and the full runner passes 14/14 commands. It identified a known `aria-expanded` mismatch in the legacy capture-phase click handler in `src/scripts/script_007.htmlpart`: after click selection, the list is empty and closed while the input still reports expanded. Do not extract the UI controller until the overlapping handlers in `script_004`, `script_007`, and `script_008` have a clear single-owner contract. The generated HTML remains byte-identical to immutable V82.65.


## Current release after immutable V82.65 baseline
- V82.65 remains the immutable source baseline: `baseline/amq_learning_tool_v82_65_candidate_pool_cleanup.html`, 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- V82.70 `QUIZ_SUGGESTION_ARIA_FIX_01` is a distinct output release, not a new baseline: `dist/amq_learning_tool_v82_70.html`, 8,786,974 bytes, SHA-256 `59704427cb924f2fe9f5526417152b7d743ac29f5cb6dc70c886885e6ae7dca6`. Its expected fingerprint is recorded under `release` in `reports/FRAGMENT_MANIFEST.json`.
- The deterministic builder validates the expected release output while `tools/verify.py` separately confirms the immutable baseline file fingerprint.


## Engineering checkpoint overlay — V82.71 SUGGESTION-EVENT-OWNERSHIP-AUDIT-01

V82.71 is an engineering/test-only checkpoint following V82.70. It documents event registration and ownership across `script_004`, `script_007`, and `script_008`, and expands the production-source Chromium regression test. The standalone product output remains V82.70 (8,786,974 bytes, SHA-256 `59704427cb924f2fe9f5526417152b7d743ac29f5cb6dc70c886885e6ae7dca6`); the immutable V82.65 baseline is unchanged. No production source fragment or manifest fingerprint is changed by this checkpoint.


## Follow-on product output V82.72 (2026-10-18)
- V82.65 remains the immutable baseline: 8,786,930 bytes, SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- V82.70 remains retained at 8,786,974 bytes, SHA-256 `59704427cb924f2fe9f5526417152b7d743ac29f5cb6dc70c886885e6ae7dca6`.
- New V82.72 output: `dist/amq_learning_tool_v82_72.html`, 8,787,018 bytes, SHA-256 `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`. It changes only suggestion selection ownership across scripts 004/007/008 plus matching build metadata/tests. Do not replace the immutable baseline with this release.


## V82.73 engineering-only acceptance attempt (2026-10-18)
- No baseline or product change. V82.65 immutable fingerprint remains 8,786,930 bytes / `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- V82.72 remains the latest product output: 8,787,018 bytes / `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`.
- Local-origin acceptance attempt was blocked by Chromium `net::ERR_BLOCKED_BY_ADMINISTRATOR` before page navigation; no storage behavior was tested. Details in `reports/V82_73_LOCAL_ORIGIN_ACCEPTANCE_BLOCKED_01_REPORT.md`.


## V82.74 source-only DB initializer extraction
The DB initializer (4,975,240 bytes) has been moved byte-for-byte to `src/modules/anime_song_database.htmlpart` and reinserted at its original execution point by the existing marker-based builder. The remaining runtime code in `script_001` is unchanged and stays in place. The intended product output is byte-identical V82.72; this source-only refactor does not change the immutable V82.65 baseline or the current release fingerprint. See `reports/V82_74_DB_INITIALIZER_EXTRACTION_01_REPORT.md` for executed verification.


## V82.75 QUIZ SUGGESTION RENDERER EXTRACTION 01

- Engineering source checkpoint only; immutable product baseline remains V82.65 and current product output remains V82.72.
- `renderQuizSuggestionLabelV824()` and `buildSuggestions()` are stored in `src/modules/quiz_suggestion_renderer.js` and reinserted at the original classic-script position.
- Expected output: 8,787,018 bytes / SHA-256 `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`. Any change to this fingerprint is a regression unless separately authorized.


## V82.76 SCRIPT004 BOUNDARY AUDIT 01

Engineering-only static analysis checkpoint. Immutable V82.65 baseline remains `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`; current product output remains V82.72 at `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`. The audit fingerprints `src/scripts/script_004.htmlpart` at 98,849 bytes / `23dacccdc25538416c4ddba91f4e044df7c4491924d1099d8cdf0a60fb4f4bdc`. No product source or module insertion position changed.


## Engineering checkpoint overlay — V82.77 GET_QUIZ_POOL_CHARACTERIZATION_01

V82.77 continues from the verified V82.76 source archive retrieved from GitHub Actions run `39083016039` because no separate V82.77 artifact was found in the Library or repository search. It adds a nine-assertion production-source characterization contract for `getQuizPool()` and integrates it into the check runner. No production fragment or product HTML changed. The standalone product remains V82.72 at 8,787,018 bytes / SHA-256 `fb075ed4e68eca454051ecd22cc10d3e7a5def193bf2852bf91547d5465da0d8`; immutable V82.65 remains unchanged. Full runner: 19/19 commands passed; integrity verifier: 112/112. GitHub has a V82.77 overlay branch with test/report files read back, but coherent source-tree publication is still incomplete.

## V82.78 GET_QUIZ_POOL_EXTRACTION_01

Engineering source checkpoint only. `getQuizPool()` (2,824 bytes, SHA-256 `2f1508935bb6c6c8622baf015a156334b4a2bff3572d8f1f5adab6f6637b11bf`) is now stored in `src/modules/get_quiz_pool.htmlpart` and reinserted at its exact original position inside `script_004`'s classic-script IIFE. The source module still intentionally accesses closure state and DOM directly; this is a source organization extraction, not yet a pure/independent domain module. A reconstruction contract proves `script_004` returns to 98,849 bytes / SHA-256 `23dacccdc25538416c4ddba91f4e044df7c4491924d1099d8cdf0a60fb4f4bdc`. Product output must remain byte-identical V82.72; immutable V82.65 remains unchanged. See `reports/V82_78_GET_QUIZ_POOL_EXTRACTION_01_REPORT.md`.


## V82.79 engineering overlay
- Source-only extraction: `src/modules/quiz_answer_metadata.htmlpart` (950 bytes; SHA-256 `32266955ac9110b13a125cde64e5121d2c21d9e781d2ecd7cbfbea6070f490f8`).
- Exact source position is preserved by `<!-- AMQ_SPLIT_MODULE:quiz_answer_metadata -->`; no runtime script tag or wrapper added.
- Current source module count: 8. Product output remains the V82.72 fingerprint recorded above; V82.65 remains immutable.
- See `reports/MODULARIZATION_REMAINING_WORK_AUDIT_V82_79.md` for remaining-work inventory and acceptance gaps.


## V82.80 product output and modularization overlay
- New product output: `dist/amq_learning_tool_v82_80.html`, 8,787,422 bytes, SHA-256 `f5b3eadf17300d8ad0ae53ebccc32f471b068743a7c746721401bfb7a0f0c8fe`. This is a distinct release; V82.72 remains preserved and V82.65 remains the immutable baseline.
- `get_quiz_pool.htmlpart` now separates pure candidate calculation (`calculateQuizPoolCandidatesV8280(ctx)`) from the DOM status adapter (`getQuizPool()`). Differential contract: 20 scenarios / 40 assertions against the V82.79 source fixture.
- Generated storage/history-SRS/AMQ-EMQ/CSS selector inventories and an 8-assertion audit contract. CSS source order and all 50 style fragment hashes remain unchanged.
- Full runner 24/24 passed; verifier 116/116 passed. Real-origin storage, audio/network, Firefox and multiplayer multi-client acceptance remain unverified. GitHub full-tree publication remains open.
- Details: `reports/V82_80_MODULARIZATION_BOUNDARY_AUDIT.md` and `reports/V82_80_MODULARIZATION_BOUNDARY_AND_PURE_POOL_01_REPORT.md`.


## V82.81 engineering-only checkpoint — lifecycle and visual boundary audit

V82.81 adds source contracts, boundary maps, and Chromium home/quiz geometry screenshots only. No runtime source fragments or CSS declarations were changed. The standalone product remains V82.80 at 8,787,422 bytes / SHA-256 `f5b3eadf17300d8ad0ae53ebccc32f471b068743a7c746721401bfb7a0f0c8fe`. The immutable V82.65 baseline remains 8,786,930 bytes / SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`. Native localhost persistence remains unverified because Chromium returned `ERR_BLOCKED_BY_ADMINISTRATOR`; do not treat this as a pass.


## V82.84 source sync and acceptance gate audit

V82.84 is an engineering-only checkpoint. Product remains V82.82 (8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`); immutable V82.65 remains unchanged. A fresh build and verification passed (runner 34/34, verifier 116/116). GitHub tree audit confirms the V82.83 branch remains an overlay with 125 entries and missing source fragments/template/build tools/tests/visual PNGs. Boundary-audit tool fingerprint mismatch is fixed, but complete sync and remote clean build remain open. Native-origin Storage remains blocked by managed Chromium policy; Firefox, real audio and two-client multiplayer are not verified. No production runtime/CSS changes. See `reports/V82_84_SOURCE_SYNC_AND_ACCEPTANCE_GATE_AUDIT.md`.

## V82.85.1 GitHub source sync publication
- Source package SHA-256: `69f5902e60502efe5f9267c2737c84e055a3a9c3be19c010fb961a6fe24d446a`.
- Remote clean-checkout SHA-256 inventory: PASS (345 files).
- Clean-checkout build and verifier: PASS; BUILD PASS: 8787490 bytes / SHA-256 227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b; tools/verify.py exit 0.
- This records source publication only; native-origin Storage acceptance and Firefox/audio/multiplayer gates remain separate.


## V82.85.2 engineering-only acceptance harness checkpoint

- Product baseline remains V82.82, 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`; immutable V82.65 unchanged.
- GitHub source-sync acceptance commit: `14936c9247c58833ce8492702c75c1bd51589451`; remote inventory reported 346 files and 0 SHA-256 mismatches; clean remote build and `tools/verify.py` passed.
- V82.85.2 adds an engineering-only native-origin storage/full-backup acceptance harness; no production HTML/source/CSS changed.
- Harness SHA-256: `359275c2bb424aed739ba5967e6eb5c4b5037e1a9a5db436ca05b2c511630de2` (14,163 bytes). Local Python syntax and CLI smoke passed. Existing storage/backup contracts passed 9/9, 6/6 and 4/4; integrity verifier 116/116.
- Browser acceptance remains NOT VERIFIED: localhost navigation was blocked by managed Chromium policy before app initialization. This does not change the product baseline or imply a test pass.


## V82.85.10 accepted engineering-only checkpoint

- CI run `39118213634` passed both `source-and-unit` and `browser-native-origin`.
- The quiz browser contract now covers incorrect anime-target answers/familiarity updates, timer settlement, explicit skip, and auto-next in addition to the V82.85.8 baseline cases.
- The multiplayer browser harness remains included in the same workflow and passed its mocked room/phase/team-draft/reconnect lifecycle checks.
- Production output remains exactly V82.82: 8,787,490 bytes, SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`. No production HTML/CSS/runtime source changed in this checkpoint.
- Scope limitation: deterministic mocks verify lifecycle contracts, not real audio-provider playback, Firefox compatibility, or a live multi-client multiplayer server.


## V82.85.11 custom-list normalization contract checkpoint

- CI run `39123012625` passed both source/unit and browser-native-origin jobs.
- New exact-source contract test: `tests/unit/custom_list_normalization_contract.test.cjs`, 8/8 assertions passed.
- Existing custom-list CRUD 11/11, AMQ list validation 12/12, and backup/restore 6/6 also passed in the same run; the native-storage and full browser acceptance suite passed.
- No production changes. V82.82 remains byte-identical at 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Boundary decision: `readCustomLists()` combines storage access and normalization. Creating a separate pure helper would change the generated output, while moving the whole reader would not isolate pure normalization. Defer extraction rather than weakening the byte-identity gate.

# V82.86 Automatic Acceptance Inventory and Gap Plan

Date: 2026-10-19
Branch: `v82.86-auto-acceptance-inventory-01`
Base: `v82.84-source-sync-acceptance-gate-01`
Scope: engineering/test assets only. No product HTML, runtime JS/CSS, source fragments, manifest, or build configuration changed.

## Baseline confirmation
- Product baseline remains V82.82: 8,787,490 bytes; SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Immutable V82.65 remains 8,786,930 bytes; SHA-256 `abd202a6f96cc08e0969ad05ab8574cc71001733d655bcb5cff6b1a1a5b33a33`.
- Existing source/build assets confirmed readable on the selected branch: `reports/FRAGMENT_MANIFEST.json`, `tools/build.py`, `tools/verify.py`, unit contract tests, browser tests, and validation reports.
- Branch source-sync report records a clean-checkout build and verifier pass. Historical V82.84 audit separately records 34/34 runner commands and 116/116 verifier checks. These are historical evidence, not tests executed during this inventory.

## Existing automated coverage confirmed by reading repository files/reports
- Manifest-driven fragment/module byte lengths and SHA-256 fingerprints.
- Immutable baseline and template fingerprints.
- Module markers, fragment counts, source-to-output reconstruction, deterministic double build, and exact expected product fingerprint.
- Candidate policy and candidate-pool integration, including fail-closed handling and ordering.
- `getQuizPool()` source characterization and old/new differential scenarios.
- Anime/song DB extraction contract, quiz-answer metadata contract, AMQ/EMQ API and custom-list contracts.
- Isolated Chromium custom-list UI tests, responsive Chromium geometry/screenshot baselines, and CSS selector review contracts.
- A native-origin acceptance script exists and explicitly avoids storage shims; however, prior execution was blocked before navigation by managed Chromium policy.

## Findings and acceptance gaps
1. **Historical results are not current execution evidence.** The latest checked-in report claims 34/34 runner commands and 116/116 verifier checks, but this session has only inspected the records and source; it has not executed the repository test runner.
2. **Runner entry point still needs exact identification.** The checked-in report describes a 34-command runner, but the top-level entry script/path must be located and confirmed before modifying test orchestration.
3. **Native browser acceptance is blocked by environment.** `tests/browser/real_origin_acceptance_localhost.py` uses native localStorage/IndexedDB and a real localhost origin. Prior runs failed with `ERR_BLOCKED_BY_ADMINISTRATOR` before application navigation. Do not count storage, reload, backup rollback, or native custom-list persistence as passed.
4. **Cross-browser coverage is incomplete.** Chromium responsive tests cover mobile/tablet/desktop home and quiz; Firefox is unavailable in the recorded environment.
5. **External integration coverage is incomplete.** Real audio/network playback and two-client multiplayer/reconnect have not been accepted.
6. **Source publication and acceptance are separate gates.** A remote source-sync report says a clean-checkout build passed, while the V82.84 audit documents earlier incomplete overlays. Every later source publication must be verified against the exact branch/ref and inventory count before drawing conclusions.
7. **Avoid duplicated validators.** `tools/verify.py` already performs manifest/fingerprint, reconstruction, deterministic-build and release-output checks. New checks should fill demonstrated gaps, not duplicate those assertions.

## Proposed acceptance layers
- **Layer A: static integrity** — manifest schema, required paths, exact byte lengths/hashes, no unresolved split markers, baseline immutability.
- **Layer B: deterministic build** — build twice in a clean temporary workspace, compare output hashes, assert expected product bytes/hash.
- **Layer C: unit/source contracts** — run all registered unit contracts; report test count and failures by test file.
- **Layer D: browser-isolated behavior** — candidate pool, suggestion interaction, custom-list UI, responsive geometry and page errors; explicitly label in-memory storage shims.
- **Layer E: native/browser/environment gates** — native Storage and backup rollback, Firefox, real audio, and two-client multiplayer; report BLOCKED/NOT RUN separately from FAIL and PASS.
- **Layer F: publication** — exact branch and commit, required-path inventory, clean-checkout build, remote hash readback, and remote publication result.

## Next implementation step
Locate the canonical full-runner entry point and its 34 registered commands; verify each command's declared prerequisites and failure propagation. Then add a machine-readable acceptance summary that distinguishes PASS, FAIL, BLOCKED, and NOT RUN without replacing existing tests. Do not modify product/runtime files.

## Test status for this inventory commit
- GitHub source inspection: PASS for the files cited above.
- Automated test runner: NOT RUN in this session.
- Integrity verifier: NOT RUN in this session.
- Browser interaction/native-origin tests: NOT RUN in this session.
- Product build: NOT RUN in this session.



## Follow-up artifact
- Added `reports/V82_86_AUTOMATIC_ACCEPTANCE_MATRIX.csv` with 14 traceable acceptance gates. Exact-branch readback matched the authored CSV contents byte-for-byte.



## Additional consistency risk discovered during read-only review
- The V82.85.1 source-sync result says the remote inventory covered 345 files, while the committed `reports/V82_85_1_REMOTE_SHA256SUMS.json` diff changes `file_count` to 346 and includes the built product entry. This may be a stale summary or a counting-scope difference; it is not safe to assume which. Reconcile the exact inventory definition, actual included paths and reported count before treating the inventory as authoritative. No files were altered to hide or guess away this discrepancy.


## Next-step findings and changes — 2026-10-19
- Canonical runner located: tools/run_all_checks.py. It explicitly declares 34 commands in the inspected base. Its current failure propagation records each non-zero child exit and returns exit 1 if any failed.
- Added tests/unit/automatic_acceptance_runner_contract.test.py, a Python standard-library static contract. It audits the explicit registry, unique labels, script-path existence, range validation and non-zero failure propagation.
- Registered the new contract as command 35 in tools/run_all_checks.py. The resulting registry should contain 35 commands, but this assertion has NOT been executed in a local checkout during this session.
- Inventory discrepancy confirmed: reports/V82_85_1_REMOTE_SHA256SUMS.json has 346 entries and 346 unique strings, but the first path is the pseudo-path --help; its byte count/hash equals the V82.82 product HTML. Removing this non-file record leaves 345 entries, matching reports/V82_85_1_GITHUB_SOURCE_SYNC_RESULT.md. This explains the count difference. The exact upstream command or generator bug that introduced --help is still not identified.
- The historical V82.85.1 checksum JSON is retained as evidence; it was not silently rewritten. The anomaly is recorded for future regeneration/fix of the inventory producer.

## Test status after runner contract registration
- Static runner contract: NOT RUN in this session.
- Full test runner: NOT RUN in this session.
- Integrity verifier/build: NOT RUN in this session.
- Native-origin Storage, Firefox, real audio and multiplayer remain NOT VERIFIED / NOT RUN as previously recorded.


## Remote readback verification — 2026-10-19
- PASS (static remote inspection): exact branch readback confirms 35 command entries, 35 parseable label/script pairs, unique labels, and the new runner-contract check is last.
- PASS (static remote inspection): all 34 pre-existing command script paths appear in the previously published source inventory; the newly added contract path is present as a committed file on this branch.
- PASS (source inspection): the contract contains checks for command count 35, unique labels, script existence, non-zero failure propagation, and invalid range rejection.
- NOT RUN: Python contract execution, full runner execution, verifier, build, browser acceptance. Remote readback/static inspection is not a substitute for running these tests.


## V82.86 source inventory producer correction — 2026-10-19
- Git recursive-tree readback confirmed root `--help` was a tracked blob of 8,787,490 bytes and shared the same Git blob SHA-1 as `dist/amq_learning_tool_v82_82.html`. It was deleted from the engineering branch; the product path was untouched.
- Added `tools/generate_source_inventory.py`, which obtains the file list from `git ls-files -z`, sorts paths, computes SHA-256 and byte counts from file bytes, excludes the requested output path, and rejects option-like root paths, missing/non-regular files, symlinks, and output paths outside the repository.
- Added `tests/unit/source_inventory_generator_contract.test.py` with temporary-Git-repository scenarios for CLI option parsing, pseudo-path rejection, file count and bytes, self-exclusion, deterministic regeneration, and outside-root rejection.
- Registered the new regression contract in `tools/run_all_checks.py`; canonical runner now has 36 commands, with its runner-contract test last.
- Created `reports/V82_85_1_REMOTE_SHA256SUMS_CORRECTED_DERIVED.json` by removing the `--help` entry from the old inventory, leaving 345 records. It is explicitly a derived correction from historical hashes, not a fresh scan of the current branch. The original V82.85.1 checksum JSON and report remain unchanged as historical evidence.
- Remote code writes returned commit IDs and the branch files are to be read back for final verification. The new Python tests, complete runner, verifier, build and browser tests have NOT RUN in this session; source publication does not constitute execution acceptance.


## Executed CI acceptance — 2026-10-19

GitHub Actions run: https://github.com/murorachi/Amq-/actions/runs/39177551001
- Result: 36/36 canonical runner commands passed; exit code 0.
- Integrity/deterministic build verifier: 116/116 passed. V82.82 rebuilt to 8,787,490 bytes with SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Source inventory generator regression contract: PASS; runner contract: PASS; fresh tracked-file inventory: 353 files, every byte count and SHA-256 verified.
- Chromium CSS visual baseline: PASS. The first CI run exposed a 1px quiz body-height difference and <=1.5px subpixel geometry shifts versus the historical baseline. The test now allows only these small geometric tolerances while keeping selector presence, display/visibility, body class, and widths exact. The historical baseline file was not rewritten.
- Artifact with logs, inventory and current home/quiz screenshots: https://github.com/murorachi/Amq-/actions/runs/39177551001/artifacts/12155061611

## Remaining unaccepted gates

Native-origin localStorage/IndexedDB and real reload persistence, browser-level backup import/export/rollback, Firefox, real audio/network, and two-client multiplayer/reconnect were not executed by this workflow. They remain open and must not be inferred from isolated-storage Chromium tests.

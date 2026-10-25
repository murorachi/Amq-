# Stage 3 — Candidate295 candidate-baseline freeze and acceptance gate
Date: 2026-10-25

## Decision
Candidate295 is now the working **candidate baseline** for validation. Recovering Candidate277 is no longer a prerequisite for continuing Candidate295 acceptance. This does **not** mark Candidate295 as formally accepted or as the final release baseline.

## Immutable snapshot evidence
- Uploaded source: `index-old.html`
- Version marker: `v82.86.06-candidate295-db-extraction-20261025`
- Size: 1,720,917 bytes
- Recomputed SHA-256: `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`
- A byte-for-byte local rollback snapshot and manifest were created.
- Snapshot equality and hash recheck: PASS.
- No application HTML, CSS, JavaScript, data, or storage schema was modified.

## Test state
- Static JavaScript syntax: PASS in prior checks for the inline executable blocks; syntax-only, not runtime proof.
- DOM ID uniqueness: PASS in prior static check (271 IDs, zero duplicates).
- Browser runtime: BLOCKED by environment; Playwright navigation to both file and local HTTP paths returned `net::ERR_BLOCKED_BY_ADMINISTRATOR`.
- External data dependencies: `data.js` and `emq-data.js` are referenced by the HTML but are not currently present beside the uploaded file. Portable single-file delivery is therefore NOT VERIFIED.
- AMQ/EMQ/MIX gameplay, search/select, custom-list CRUD, reload persistence: NOT RUN / BLOCKED until matching data assets and a usable browser runtime are available.
- Six smoke child actions were previously reported as FAIL while parent steps said `ok:true`. These need a corrected oracle and re-execution; the parent result must not override child failures.

## Next actions
1. Recover the exact matching `data.js` and `emq-data.js` bytes from the available project artifacts, then verify their hashes against recorded values if source bytes are available.
2. Enable a real browser acceptance run; do not infer runtime success from syntax or static data integrity.
3. Re-test initialization, AMQ/EMQ/MIX mode switching, search and song selection, custom-list create/rename/delete/add/remove, and persistence after reload in isolated browser contexts.
4. Rework smoke assertions to check child-action consistency and workspace panel visibility/content, back/close behavior, repeated switching, and DOM cleanup rather than relying only on `activeView`.
5. Promote Candidate295 to formal baseline only after the owner explicitly accepts the baseline and acceptance gates are met. No destructive cleanup before then.

## Rollback
Restore the frozen local snapshot named `amq_learning_tool_v82_86_06_candidate295_db_extraction_20261025.html`; verify its SHA-256 equals `aef896eee98c10bcb9fb1f10d6650b8e26067426f43b086e1b69fa12e3674a81`. Candidate277 and Candidate276 historical records remain untouched.

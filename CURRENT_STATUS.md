# Current Status

## Latest verified functional checkpoint

- Verified candidate: Proto45 / Song Select candidate 21.
- Source commit tested: `e1ced6d32dba444415069778dd1f686789058375`.
- Candidate HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_21.html`.
- Size: 8,968,944 bytes.
- SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Browser acceptance: **PASS**; page/console errors: 0 / 0.
- Visual evidence generation: **PASS**.
- Visual design acceptance: **NOT ACCEPTED**. Normalized MAE 0.280775 and changed-pixel ratio 0.881249 are diagnostics, not similarity percentages.

## Active work

- Active branch: `v82.85.30-proto35-song-select-visual-correction-01`.
- Immutable baseline inherited from Proto25; no prior candidate or baseline overwritten.
- Candidate 25 browser acceptance: **FAIL** on an invalid hover-test assumption; the test selected the first row even when it already had the selected class.
- Candidate 26 static/build assertions: **PASS**; HTML SHA-256 `f6b8f6c94a1b83472428fe9ad17609695111efb76e0ffbd1010ceebb67b7c1f3`. Browser acceptance did not execute because the test script contained a literal newline escape and raised a Python SyntaxError. This was a test-harness failure, not a functional test result. Candidate 26 was not promoted.
- Candidate 27/28 are superseded by the correction below; their runs were cancelled while candidate filenames and tests were being aligned.
- Candidate 29 fixes the test-script newline, chooses an actually unselected song row for the hover assertion, and tests that scene artwork stays within its scene at 1000×562. It also uses auto dimensions for the absolute inset scene layers to avoid over-constrained sizing.
- Candidate 29 workflow: https://github.com/murorachi/Amq-/actions/runs/39633715502 — queued/pending at last check.
- Latest source changes are not yet functionally or visually accepted.

## Reference and immutable baseline

- Official osu! Wiki release label: `20260924.1`; exact matching Stable client source commit: **NOT VERIFIED**.
- Pinned reference Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select reference image Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.

## Test state

- Candidate 21 static/build assertions: **PASS**.
- Candidate 21 Playwright acceptance: **PASS**.
- Candidate 21 visual evidence generation: **PASS**; visual design acceptance: **NOT ACCEPTED**.
- Candidate 25 static/build assertions: **PASS**; Playwright: **FAIL**.
- Candidate 26 static/build assertions: **PASS**; Playwright: **NOT RUN** due test script SyntaxError.
- Candidate 29 static/browser/visual acceptance: **IN PROGRESS / PENDING**.

## Rollback

- Candidate 21 verified functional checkpoint SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Candidate 10 rollback SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Never overwrite prior candidates or the immutable baseline.

# Current Status

## Latest verified functional checkpoint

- Candidate: Song Select candidate 31.
- Source commit tested: `a09ba9fb9fdc443d8100042569d920f5dc1313df`.
- Generated artifact/report commit: `46db5f2bc21b39fbe3fbcf6084da13ad08d3ae0d`.
- GitHub Actions: https://github.com/murorachi/Amq-/actions/runs/39634395693 — **SUCCESS**.
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_31.html`.
- Size: 8,987,561 bytes.
- SHA-256: `c7041795ed3be10993dc9785bb97a86c794ff7861df8c7212a89ea4bac5b529d`.
- Artifact: https://github.com/murorachi/Amq-/actions/runs/39634395693/artifacts/12359524431.
- Artifact ZIP SHA-256: `e82909846742e5faad821b5baaa1cb7ec4a197f91eb907b969e30d6b2afc92bb`.
- Static/build assertions: **PASS**.
- Playwright browser acceptance: **PASS**. Page/console errors: 0 / 0.
- Visual evidence generation: **PASS**.
- Visual design acceptance: **NOT ACCEPTED**. Normalized MAE 0.275356; changed-pixel ratio 0.838122. These are diagnostics, not similarity percentages.

## Verified changes in candidate 31

- Corrected the hover test to move the pointer away before measuring the initial song-row position. Debug output confirms an unselected hovered row has transform matrix X = -3px; selected-state displacement remains a separate stronger rule.
- Corrected constrained-width scene artwork sizing. At 1000×562, scene and scene-image bounds now both measure x=282..1000; the previous image bounds x=269..1013 are resolved.
- Added an explicit Playwright assertion that scene artwork remains within the Song Select scene at 1000×562.
- Existing four-workspace switching, source-mode switching, EMQ work selection/detail drawer, song history data, keyboard dismissal, responsive overflow and page/console error checks pass.
- Browser diagnostics show real external cover images load (natural dimensions available) and cover fallback/decorative overlay states are applied. However, the captured Song Select screenshot still visually renders the right-side cover thumbnails as overly muted/placeholder-like. Computed opacity/overlay layering needs a focused visual investigation before changing CSS.

## Active branch and immutable baseline

- Active branch: `v82.85.30-proto35-song-select-visual-correction-01`.
- Latest generated report commit: `46db5f2bc21b39fbe3fbcf6084da13ad08d3ae0d`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Candidate 21 remains the previous verified functional rollback: SHA-256 `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.

## Reference

- Official osu! Wiki release label: `20260924.1`; exact matching osu!Stable client source commit: **NOT VERIFIED**.
- Pinned Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select reference image Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.

## Test state

- Candidate 21 static/browser acceptance: **PASS**; visual design acceptance: **NOT ACCEPTED**.
- Candidate 25 browser acceptance: **FAIL** due to a hover test that began from an already-hovered state.
- Candidate 26 browser acceptance: **NOT RUN** because the test harness contained a Python syntax error.
- Candidate 29 browser acceptance: **FAIL**; the hover test setup still had the initial pointer-state problem, and artwork was still scaled beyond scene bounds.
- Candidate 31 static/build assertions: **PASS**.
- Candidate 31 Playwright browser acceptance: **PASS**.
- Candidate 31 matched-viewport visual evidence generation: **PASS**.
- Candidate 31 visual design acceptance: **NOT ACCEPTED**.

## Rollback

- Candidate 31 functional checkpoint SHA-256: `c7041795ed3be10993dc9785bb97a86c794ff7861df8c7212a89ea4bac5b529d`.
- Candidate 21 functional checkpoint SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Candidate 10 rollback SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Never overwrite prior candidates or the immutable baseline.

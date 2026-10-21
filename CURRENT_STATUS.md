# Current Status

## Latest verified functional checkpoint

- Verified candidate: Proto45 / Song Select candidate 21.
- Source commit tested: `e1ced6d32dba444415069778dd1f686789058375`.
- Candidate HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_21.html`.
- Size: 8,968,944 bytes.
- SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Browser acceptance: **PASS**; page/console errors: 0 / 0.
- Visual evidence generated: **PASS**.
- Visual design acceptance: **NOT ACCEPTED**. Normalized MAE 0.280775 and changed-pixel ratio 0.881249 are diagnostics, not similarity percentages.
- Run/artifact history: branch workflow commits around 2026-10-21 15:02 UTC; latest accepted output is candidate 21, not the current builder target.

## Active work

- Active branch: `v82.85.30-proto35-song-select-visual-correction-01`.
- Immutable base inherited from `v82.85.30-proto34-song-select-catalog-density-01`, whose source had advanced beyond the last generated/verified candidate.
- Current builder target: candidate 26.
- Candidate 25 test build SHA-256: `1ed232a0bf7a005f2189cf7f9d785a7ab267acb489bcb3c86f3e8bc54cb23ee0`; **not promoted** because browser acceptance failed.
- Candidate 25 failure: hover assertion picked `.songrows.first` even though the first row may already be selected. Browser test now explicitly selects an unselected row before testing hover displacement.
- Candidate 25 also exposed scene artwork bounds outside the Song Select scene at 1000×562. Candidate 26 changes the absolute scene and artwork layers to auto-sized inset geometry and adds a bounding-box assertion.
- Candidate 26 workflow: https://github.com/murorachi/Amq-/actions/runs/39633186103 — **IN PROGRESS / result pending at last update**.
- Latest workflow commit: `c88cf9b9e407420a63b86f4751eb067f3124d7c0`.
- Candidate 26 has not been promoted or visually accepted yet.

## Reference and immutable baseline

- Official osu! Wiki release label: `20260924.1`; this is not a client source commit.
- Pinned reference Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select reference image Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Exact osu!Stable client source commit matching that release label: **NOT VERIFIED**.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.

## Test state

- Candidate 21 static/build assertions: **PASS**.
- Candidate 21 Playwright acceptance: **PASS**.
- Candidate 21 visual evidence generation: **PASS**.
- Candidate 21 visual design acceptance: **NOT ACCEPTED**.
- Candidate 25 static/build assertions: **PASS**.
- Candidate 25 Playwright acceptance: **FAIL** on hover displacement assertion; visual comparison step was skipped.
- Candidate 26 static/build assertions: **PASS** in the current workflow.
- Candidate 26 browser and visual tests: **NOT RUN / IN PROGRESS** at last update.

## Rollback

- Candidate 21 verified functional checkpoint SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Candidate 10 rollback SHA-256: `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
- Immutable Proto25 baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Never overwrite prior candidates or the immutable baseline.

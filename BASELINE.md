# Baseline and rollback record

## Latest verified functional candidate

- Candidate: Song Select candidate 44.
- Tested source commit: `1bd01bbd0820f5f4a5c61c46aa3eed75bac5016e`.
- Generated report/artifact commit: `c64b35cf9aa2f1b6cbd7667d35c8379ab7603b4e`.
- Run: https://github.com/murorachi/Amq-/actions/runs/39638583685 — **SUCCESS**.
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_44.html`.
- Size: 8,989,055 bytes.
- SHA-256: `787332a554e40d52a7b0f0e0c9ba490cbf14bb16da1c9e0e56148afb469f432c`.
- Remote Git blob SHA: `473b087541bcb9eb80b1d6771e8277f18ea72530`.
- Static/build assertions: **PASS**.
- Playwright browser acceptance: **PASS**; page/console errors 0 / 0.
- Visual evidence generation: **PASS**.
- Visual design acceptance: **NOT ACCEPTED**; normalized MAE 0.275356 and changed-pixel ratio 83.81% are diagnostics only.
- Artifact ZIP SHA-256: `102f000aec43ffaf5774b8339f220198a1fba6491f72cc86d39ec07821033feb`.

## Immutable AMQ baseline

- Branch: `v82.85.30-proto25-ui-refactor-stage-24`.
- HTML: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`.
- Source commit: `3aea33e7137b7e3e3105c76ed896a515a335c2a3`.
- Size: 8,926,248 bytes.
- SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
- Read-only. Never overwrite this file or branch.

## Previous verified functional candidate

- Candidate 21 SHA-256: `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
- Browser acceptance passed; visual design acceptance was not accepted.

## Official osu!Stable reference

- Wiki release label: `20260924.1`; this is not a source-control commit.
- Official Wiki commit: `ae2c6443a4264e5429ea7bcd2f3503be8a518a50`.
- Song Select screenshot Git blob SHA: `1e927a00a1984a5ba20fa5efec639410f349607a`.
- Exact osu!Stable client source commit matching that release: **NOT VERIFIED**.
- Do not substitute current `ppy/osu` source, which is the successor client (lazer).

## Rollback

1. Candidate 44: SHA-256 `787332a554e40d52a7b0f0e0c9ba490cbf14bb16da1c9e0e56148afb469f432c`.
2. Candidate 21: SHA-256 `5a89a1f27b1ce25984e6076ff16531397e48c319fd02d602ee87d984486d2293`.
3. Candidate 10: SHA-256 `21a608f1357f020b6e56e8d1dec6735ef2da9bcccb4b34fcf5541c4f535f2421`.
4. Candidate 09: SHA-256 `37d5055e91688e7604007d052041aa0f846c04c29793fced2312592f282ea01d`.
5. Immutable Proto25 baseline: SHA-256 `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f`.
6. Never overwrite prior candidates or merge an unaccepted visual candidate into the baseline.

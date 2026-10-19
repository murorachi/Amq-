# Baseline checkpoint: acceptance runner target cleanup verified

- Branch: `v82.85.13-real-audio-acceptance-gate-01`.
- Latest full acceptance run: [39191769254](https://github.com/murorachi/Amq-/actions/runs/39191769254), source checkpoint `1e153a1b8b51d04a532ffcd26103bb28f4c86379`.
- Source/unit, deterministic build verification and acceptance-runner configuration contract: **PASS**.
- Firefox responsive, quiz suggestion/input integration against V82.85.12, and multiplayer lifecycle acceptance: **PASS**.
- Deferred failure: real-browser audio PCM output capture remains **FAIL** at the final output assertion only. Do not lower its threshold.
- Runner fix report: `reports/ACCEPTANCE_RUNNER_ARTIFACT_TARGET_CLEANUP_2026-10-19.md`.
- `run_all_checks.py` builds the V82.85.12 candidate to its own versioned path and does not write that candidate to the V82.82-named path. The old V82.80/V82.81 CSS geometry baseline is no longer in the default current acceptance list.
- Entire `run_all_checks.py` command list was **NOT RUN end-to-end** during this task.
- Product HTML and product logic unchanged.
- Candidate V82.85.12: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
- Immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- Next: resume feature development; perform additional cleanup opportunistically when a concrete defect or maintenance cost is evidenced. Never overwrite V82.82.

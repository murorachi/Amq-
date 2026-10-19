# Next task: resume requested feature development

Current branch: `v82.85.13-real-audio-acceptance-gate-01`.

## Previous stage closeout

The bounded historical technical-debt inventory is complete:
- Report: `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md`.
- Product source and product HTML changed: **No**.
- Main evidence-backed risks: tightly coupled quiz lifecycle in `src/scripts/script_004.htmlpart`; broad multiplayer closure in `src/scripts/script_028.htmlpart`; duplicate-name/compatibility inventory entries require proof before deletion.
- Decision: do not perform broad cleanup just to achieve theoretical completeness. Start feature work. When a concrete feature touches a risky boundary, add a focused regression test and change only the smallest necessary area.
- Existing full acceptance run: https://github.com/murorachi/Amq-/actions/runs/39189657895. Source/unit, Firefox responsive, Chromium storage/custom-list/quiz/playback and multiplayer checks passed. The only failed gate remains CI audio PCM capture (peak=0 / RMS=0.0), explicitly deferred; do not lower its threshold.
- Fresh full suite during inventory: **NOT RUN**.

## Baseline constraints

- Immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.
- V82.85.12 candidate: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`.
- Never overwrite the formal baseline.
- Continue to produce a single-file HTML through the reproducible build when product changes require a deliverable.
- Run the checks relevant to the changed boundary; distinguish static checks, automated tests and browser acceptance.

## Explicit stop condition

Do not continue routine helper extraction or open another exhaustive audit phase. Keep unrelated debt as a backlog item. The next work should advance the user's requested product functionality.

## Rollback

Inventory is documentation-only and can be reverted independently. V82.85.17 extraction commit `96f949b43a9168c499d8f8600ffec8efcadd78e8` is independently reversible. Never overwrite immutable V82.82.

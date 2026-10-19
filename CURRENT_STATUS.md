# Current engineering checkpoint: V82.85.17 acceptance complete; bounded technical-debt inventory closed

- Latest full acceptance run: [39189657895](https://github.com/murorachi/Amq-/actions/runs/39189657895), source commit `4652a97c6e358710bbe9584cdc2147764e06d5a7`.
- `source-and-unit`: PASS. Source fingerprints, deterministic V82.82 build, V82.85.12 candidate build, registered extraction contracts and native storage/custom-list/backup contracts passed.
- `browser-firefox-responsive`: PASS.
- Chromium native-origin storage/custom-list, isolated custom-list UI regression, IndexedDB/quiz input, quiz suggestion integration, and answer/playback lifecycle: PASS.
- Multiplayer room/phase/live-draft/reconnect acceptance: PASS.
- Real-browser audio output capture: FAIL at the final non-silent PCM assertion only. PulseAudio self-test is non-silent; browser decode/playing/timeline/pause/resume/answer reveal/exit cleanup pass, but monitor capture remains peak=0 / RMS=0.0. Deferred CI output-routing/capture issue; threshold unchanged. This does not prove real-device playback is broken.
- V82.85.17 extracted `quizAnswerAliasTooltipTextV8239()` to `src/modules/quiz_answer_alias_tooltip_text.htmlpart`; production-source contract is registered in the runner and CI.
- Candidate V82.85.12: 8,787,574 bytes / SHA-256 `b804fd66eecfef277d79d86611f589139025097313be937cf96d067cc201e067`. Immutable V82.82: 8,787,490 bytes / SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`.

## Technical-debt inventory closeout

- Bounded static inventory: `reports/HISTORICAL_TECHNICAL_DEBT_INVENTORY_2026-10-19.md`.
- Product source and product HTML changed: **No**.
- Main risks: tightly coupled quiz lifecycle (`script_004`), broad multiplayer closure (`script_028`), and unsafe assumptions when treating duplicate names/legacy compatibility code as dead code.
- Decision: do not delay feature work for a broad cleanup. Refactor only when a concrete feature is blocked, with a focused regression test first. Historical inventories are leads, not current proof where source fingerprints differ.
- Fresh full test suite during the inventory: **NOT RUN**. Existing acceptance status remains as recorded above; no new pass is claimed.

## Direction

The bounded inventory is sufficient. Resume requested feature development rather than starting another audit or continuing helper-by-helper extraction. Preserve current interfaces and immutable baseline; record unrelated debt for later.

## Rollback

This inventory stage changes documentation only. Revert the inventory/report documentation commit if necessary. Revert V82.85.17 extraction commit `96f949b43a9168c499d8f8600ffec8efcadd78e8` only if that extraction itself needs rollback. Never overwrite V82.82.

# CURRENT_STATUS — Candidate218 cleanup checkpoint (2026-10-24)

- Working baseline Candidate212 remains unchanged: 9,352,632 bytes; SHA-256 `52376c693c5c0701d77e80a6076620623ef9ef5decadd11265d6b57bcf6c6952`.
- Candidate216 remains an earlier minimal experimental candidate, unchanged.
- New Candidate218: `amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_218_idempotent_watch_mode_binding.html`; 9,352,817 bytes; SHA-256 `5e1bd34e1bc49fe606fc8b9989cfaab26d00f2eee5e12ca0541d16a5ae63099c`.
- Root cause fixed in Candidate218: `updateWatchModes()` could be called twice during initialization and attach duplicate click listeners to the same existing watch/custom tabs. The two handlers now use idempotent `onclick` assignment. No other bytes differ from Candidate212 beyond this exact function replacement.
- PASS: exact source/output comparison; 68 inline JavaScript blocks pass Node syntax checks; 2 embedded payload blocks excluded; old duplicate listener binding removed.
- NOT RUN: real browser repeated-init/click-count, custom-list CRUD/reload persistence, four workspace route lifecycle, AMQ/EMQ/MIX playback, IndexedDB persistence, pixel comparison.
- BLOCKED: current browser environment blocks `file://` and localhost navigation; external DNS/network unavailable.
- Candidate218 is experimental, not accepted. No storage keys, schemas, custom-list data, learning records, or IndexedDB structure changed. Candidate212 remains rollback baseline.
- Validation report: `reports/candidate218-idempotent-watch-mode-binding-20261024/VALIDATION_REPORT.md`. HTML itself has not been uploaded or remotely SHA-verified.

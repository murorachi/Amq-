# Candidate213 Cleanup Checklist

- [x] Verify uploaded Candidate212 size and SHA-256 against recorded baseline.
- [x] Create byte-identical Candidate212 rollback HTML.
- [x] Inspect target branch and existing baseline/status/next-task reports.
- [x] Run static Candidate212 JavaScript syntax checks: 68/68 PASS.
- [x] Parse Candidate212 CSS: 108 blocks, zero parser errors.
- [x] Remove no-reader Candidate105 marker.
- [x] Remove Candidate84 relabel-only “資料品質” script; preserve Learning Analysis as a required domain.
- [x] Generate uniquely named Candidate213 HTML and calculate SHA-256.
- [x] Re-run static JavaScript/CSS checks on Candidate213: 66/66 executable JS blocks PASS, 108 CSS blocks with zero parser errors.
- [x] Preserve parent file and a byte-identical rollback copy.
- [x] Create isolated GitHub checkpoint branch and update BASELINE.md, CURRENT_STATUS.md, NEXT_TASK.md.
- [ ] Upload Candidate213 HTML to GitHub and read back the remote file.
- [ ] Browser runtime acceptance; current environment blocks file:// and localhost navigation.
- [ ] Native persistence, audio, IndexedDB Blob backup/restore, live API and pixel-comparison tests.

## Deferred until dependency evidence is complete
- Batch organizer: keep its unique operations temporarily; integrate them into list management before removing the separate entry/handlers.
- Anime catalog / “圖鑑”: KEEP as the core catalogue; do not delete merely because the label sounds broad.
- “資料品質”: DELETE the relabel-only script; any real import validation belongs in the import workflow.
- Duplicate route/event/observer/timer/storage code: do not bulk-delete based on text scan alone.

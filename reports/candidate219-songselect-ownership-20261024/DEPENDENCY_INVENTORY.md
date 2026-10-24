# Candidate219 static dependency inventory (summary)

This is a text-scan map, not a complete AST call graph. Do not use it alone to justify deletion.

- Candidate219: 9,352,752 bytes; SHA-256 4a20b0eee8ecaa4b8d7ac5b55e1fc602c4335c9ad892ef901dc672ac719b40ea.
- 68 script elements; 66 executable JavaScript blocks checked with Node syntax validation, both payload blocks excluded.
- 108 CSS style blocks; zero parser errors.
- Runtime-proven keyboard duplication: Candidate210 behavior script had a list-level ArrowUp/ArrowDown/Enter handler while Proto26 integration had a delegated document-level handler. One ArrowDown moved index 0→2 before the fix; after removing the duplicate list-level handler it moves 0→1.
- Batch selection had one Set inside installSharedImportAndBatchWorkspaces() while the row factory lived outside that scope. Candidate214 reproduced selected-is-not-defined; Candidate215 moved the Set to the owning IIFE. Candidate219 keeps that fix and renders checkbox state from the Set.
- Candidate84 only relabelled the analysis workspace as “資料品質”; no independent data-quality workflow was found in that script. Candidate105 only set document.documentElement.dataset.candidate='105'; no reader was found.

## Disposition
- KEEP: Song Select core catalog, learning analysis, custom-list data, learning records, import sources, settings, persistence, audio and scene backgrounds.
- INTEGRATE: batch operations into list management after unique operations are mapped; common importer validation/deduplication; duplicate initialization/event owners.
- DELETE: Candidate84 relabel-only script, Candidate105 no-reader marker, duplicate list-level keyboard handler.
- DEFER: broad CSS/DOM/observer/timer/storage cleanup until each owner, caller, dynamic reference and data compatibility path is proven.

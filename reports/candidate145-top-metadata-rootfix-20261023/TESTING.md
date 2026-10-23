# Testing — Candidate 145

PASS: 22 Playwright assertions; 7.5 rows at three viewports; keyboard selection, hover −3px, search fallback, EMQ filtering, profile relocation/restore, no duplicate IDs, workspace panel, 100px dock and visible real AMQ metadata.

PASS: 63 executable inline JS blocks syntax-checked, 0 errors (2 data blocks skipped); 93 CSS blocks parsed, 0 errors.

BLOCKED: direct `file://` (`ERR_BLOCKED_BY_ADMINISTRATOR`); scene image blob rendering and IndexedDB save/export/clear/restore in opaque `page.set_content` origin.

NOT RUN: durable storage across reload/restart, real audio, live APIs, full custom-list CRUD, cross-workspace regression. Visual acceptance NOT ACCEPTED.
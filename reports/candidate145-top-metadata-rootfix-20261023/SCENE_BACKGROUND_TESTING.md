# Scene background test — Candidate 145

PASS: scene API initializes, empty-store fallback exists, and selecting a valid PNG updates the preview status.

BLOCKED: image rendering uses `blob:null/...` in the opaque `page.set_content` origin, so Chromium computes the background image as `none`. Saving reports that the IndexedDB store is not ready. Export, clear and restore could not be tested in this environment.

No real scene artwork was added. The synthetic PNG is a test fixture only. Direct-file / localhost runtime and browser-profile persistence remain unverified.
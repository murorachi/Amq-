# Next Task

1. Open Candidate 72 in a normal browser by double-clicking the HTML and inspect the Home frame proportions, enlarged central icon, and Play submenu.
2. Navigate to Song Select, then test each of the four lower-left workspace controls. Confirm their content appears inside the left-middle frame below song metadata and no stray panel appears in the bottom-left.
3. Confirm the curved black Song Select frame matches the intended osu!stable geometry at desktop and mobile widths; adjust only after comparing actual reference screenshots.
4. Verify the full quiz page has no global top header and test Escape on Home Settings without changing the existing quiz Escape behavior.
5. Re-run end-to-end tests in a real-origin browser context, including localStorage/IndexedDB, saved background reload, VNDB cover loading, and audio playback.
6. Upload the HTML bytes to GitHub using a route that supports binary/local-file content; verify remote size and SHA-256 separately from test results.

# Current Status

- Current candidate: Candidate 76, `amq_learning_tool_v82_85_30_workspace_proto28_song_select_76-workspace-panel-shell.html`.
- SHA-256: `2586036ce96d4c3fc0be6df2fb482a280936465e0ec51f45ed97c7a7475e136d`; size 9,105,137 bytes.
- Parent Candidate 75 SHA-256: `4ad5a0d50bb072f36c936640c14b3744bf2a91c50b79b653392880ce8084a6dd`.
- Existing Candidate 76 scope: stabilize the Back + four-button dock as a single non-wrapping row; place the workspace popup beside the left-middle frame; set popup background to black at 88% opacity; add close button and Escape-to-close; keep the current Song Select route.
- Static tests previously reported: 51/51 executable inline JS blocks pass `node --check`; 76/76 CSS blocks parse without parser errors; 0 duplicate IDs across 245 IDs; 6/6 targeted source assertions pass.
- Browser tests previously used Chromium + Playwright `page.set_content`: at 1440x900, all four workspace modes set the correct title/state, popup starts 8px after frame, popup right edge (757px) is before catalog left edge (864px), buttons remain on one row, Escape closes popup and leaves Song Select active. Clicking the active button again also closes.
- Mobile 390x844 test previously reported all four buttons remain on one row; popup is constrained to the viewport and same height as the left-middle frame; catalog is temporarily hidden while the workspace is open and restored on close. This is a narrow-screen fallback, not a side-by-side mobile layout.
- Known browser limitations: two `localStorage` access errors occur because `page.set_content` uses an opaque origin. Direct `file://` and local HTTP navigation were blocked in the previous test environment.
- **2026-10-22 old-style audit:** see `engineering/CANDIDATE76_OLD_STYLE_AUDIT.md`. Confirmed the left-middle frame is currently decorative (`aria-hidden`, non-interactive), the dock is a separate bottom-fixed element, and multiple later CSS/runtime layers compete over dock/panel state. No HTML source changed during the audit.
- **Critical design mismatch:** Candidate 76 positions the action panel beside the left-middle frame but leaves the workspace buttons in a separate bottom-left dock. This does not implement the intended frame -> buttons -> right-side popup hierarchy.
- Important incomplete scope: workspace actions have not all been audited/migrated; some may navigate to legacy views or lack a useful result. Do not claim full feature completion.
- GitHub branch: `amq-candidate76-workspace-panel-shell`. Engineering audit and status docs are being tracked here. HTML binary is not uploaded; remote HTML size/hash is not verified.

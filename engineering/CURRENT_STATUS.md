# Current Status

- Current candidate: Candidate 76, `amq_learning_tool_v82_85_30_workspace_proto28_song_select_76-workspace-panel-shell.html`.
- SHA-256: `2586036ce96d4c3fc0be6df2fb482a280936465e0ec51f45ed97c7a7475e136d`; size 9,105,137 bytes.
- Parent Candidate 75 SHA-256: `4ad5a0d50bb072f36c936640c14b3744bf2a91c50b79b653392880ce8084a6dd`.
- Scope: stabilize the Back + four-button dock as a single non-wrapping row; place the workspace popup beside the left-middle frame; set popup background to black at 88% opacity; add close button and Escape-to-close; keep the current Song Select route.
- Static tests: 51/51 executable inline JS blocks pass `node --check`; 76/76 CSS blocks parse without parser errors; 0 duplicate IDs across 245 IDs; 6/6 targeted source assertions pass.
- Browser tests with Chromium + Playwright `page.set_content`: at 1440x900, all four workspace modes set the correct title/state, popup starts 8px after frame, popup right edge (757px) is before catalog left edge (864px), buttons remain on one row, Escape closes popup and leaves Song Select active. Clicking the active button again also closes.
- Mobile 390x844: all four buttons remain on one row; popup is constrained to the viewport and same height as the left-middle frame; catalog is temporarily hidden while popup is open to avoid overlaying song cards, then restored on close. This is an explicit narrow-screen fallback, not a side-by-side mobile layout.
- Browser errors: two `localStorage` access errors occur because `page.set_content` uses an opaque origin. Direct `file://` and local HTTP navigation remain blocked in this environment.
- Screenshots: desktop/mobile expanded and desktop collapsed captured locally. Browser tests exercise workspace mode switching, not every individual action inside the workspace.
- Important incomplete scope: the popup still uses the existing action menu for modes; multiple actions may navigate to legacy views or lack a useful result. The actual old interfaces/functions have not yet all been migrated into this popup. No claim of full feature completion.
- GitHub branch: `amq-candidate76-workspace-panel-shell`. Engineering documents upload/remote verification pending. HTML binary is not uploaded; remote HTML size/hash is not verified.

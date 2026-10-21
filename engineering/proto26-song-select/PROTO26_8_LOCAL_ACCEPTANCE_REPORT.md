# Proto26.8 Local Acceptance Report

Date UTC: 2026-10-21
Scope: Four Song Select workspace panels switched in place, plus representative legacy actions and EMQ catalog smoke tests.

## Baseline and local artifact

- Immutable baseline: `dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html`
- Baseline SHA-256: `5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f` — PASS; builder rejected mismatches and confirmed the baseline was unchanged.
- Local generated verification snapshot: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_06.html`
- Local snapshot size: 8,942,307 bytes.
- Local snapshot SHA-256: `e71fdc60b18a08b660608077c84a5da5daca90798306f8f8573f72ca29196b8f`.
- Important limitation: this hash is for the local verification snapshot. A matching GitHub Actions build and remote artifact/hash confirmation have not run, so it is not yet the official remote candidate fingerprint.

## Static acceptance

Result: PASS.

Assertions:
- Existing catalog tab selector is present.
- Known malformed declaration is absent.
- AMQ, EMQ, MIX and Singer mode controls exist.
- EMQ detail rendering reuses the existing song API and song-row renderer.
- Asynchronous EMQ readiness is handled.
- Persistent desktop details pane and mobile drawer rules remain.
- Workspace dock maps to the existing watchlist, learning-plan, dashboard and catalog panels.
- Workspace visibility CSS is scoped to the selected internal mode.
- Immutable baseline exists and its SHA-256 remains unchanged.
- Builder creates a uniquely named standalone HTML, injects the integration exactly once, and places it after the legacy trailing scripts/styles.

## Local Playwright browser acceptance

Result: PASS for the tested workspace behavior; localStorage-origin test limitation noted below.

Assertions passed:
- Proto26 integration initializes and reports ready.
- Each of the four dock buttons updates the existing workspace title.
- Each selected workspace keeps `window.__aniGetActiveViewV82() === 'catalog'`.
- Each workspace shows its existing content panel in place.
- Unrelated catalog grid is hidden in lists, learning and analysis modes.
- Custom-list action stays in Song Select and exposes the existing list panel/tab.
- Batch-selection action toggles the real selection mode; test restores it afterward.
- Learning plan panel is visible in learning mode.
- Dashboard action stays in Song Select and shows the existing dashboard panel.
- EMQ API initializes and renders real work cards.
- No other uncaught application errors were observed.

Environment limitation:
- The local browser runner used Playwright `page.set_content()` because this execution environment blocks navigation to both `file://` and localhost URLs.
- Two browser errors reported that `localStorage` access was denied for the `about:blank` document. These are environment-origin errors, not counted as application errors. Native-origin storage persistence was NOT RUN in this local test.
- This local run is not a substitute for the repository's GitHub Actions run on the intended standalone file origin.

## Not run / not verified

- GitHub Actions acceptance for PR #11: NOT RUN. The existing Proto26 workflow triggers on PRs targeting the immutable Proto25 branch and hardcodes checkout of the original integration branch; PR #11 currently targets the integration branch, so the configured workflow did not start for this branch.
- Remote standalone artifact upload and remote SHA-256 comparison: NOT VERIFIED.
- Same-viewport osu!stable screenshot overlay / pixel difference: NOT RUN.
- Real audio output acceptance: NOT RUN.
- Full keyboard Enter / duplicate activation and playback lifecycle: NOT RUN.
- Exact osu!stable client source Commit matching Stable `20260924.1`: NOT VERIFIED.

## Interpretation

The local tests support the specific claim that the four workspace dock modes now display the existing panels in place while the app route remains Song Select. They do not establish final UI completion, 90% visual similarity, full data-action correctness, native storage persistence, or official GitHub CI acceptance.


## Remote GitHub Actions follow-up (2026-10-21)

- Workflow run: [39563090398](https://github.com/murorachi/Amq-/actions/runs/39563090398) — **PASS**.
- Static acceptance: PASS.
- Playwright Chromium acceptance: PASS, including all four in-place workspace modes, existing custom-list and batch-selection actions, explicit practice entry, dashboard action, EMQ initialization, AMQ/EMQ/MIX/Singer mode checks, desktop layout checks and mobile drawer checks.
- Generated artifact: `dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_06.html`.
- Size: 8,942,305 bytes.
- SHA-256 from CI report and downloaded artifact: `abaf342050f0d73c0450544114b124e1f95be9cb109956f25189532e770e52ca`.
- Git blob SHA from committed candidate: `d953acd9fdcf5a5211ab95c996603325a1b9dd22`; it matches the downloaded artifact bytes.
- Artifact/report package: workflow artifact ID `12328707758`, expires 2026-11-20.

The local-origin storage limitation above does not apply to the GitHub Actions browser run, which reported no uncaught page errors and no console errors. Visual pixel-diff against osu!stable, real audio output and exact stable client source Commit verification remain separate outstanding gates.

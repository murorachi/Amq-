# Candidate212 Song Select Keyboard Interaction Acceptance

Date: 2026-10-24
Browser: Chromium / Playwright, 1920×1080
Source: readable reconstructed Candidate212; all proposed changes tested in a disposable fixture. No Candidate HTML modified.

## Baseline defect reproduced

The final Song Select list has classes `amq-inline-song-list amq-songselect-tracklist`. A legacy document-level key handler intended for inline work-song lists also matches the main tracklist. A separate `installCenteredSelection()` function attaches a direct keydown listener to whichever `#amqSongSelectTracklist` element exists when it runs, but later rendering can replace that node; the new node may have no `data-candidate210Bound` marker.

The result is timing-dependent:
- When the direct list handler is attached, both it and the document-level handler process the same ArrowDown/Enter event. The measured probe moved selection two rows on a single ArrowDown and recorded three playback requests on Enter.
- When the list is replaced after direct binding, the new list has no direct keydown listener. The document-level fallback can move selection, but Enter's row click does not reliably invoke playback because the compact row does not contain the legacy play button.
- Static DOM inspection confirms the main list and inline work lists share the `.amq-inline-song-list` class, which causes the global handler to conflate two different navigation owners.

This is an event ownership / dynamic DOM lifecycle defect, not a CSS issue.

## Disposable single-owner keyboard prototype

The prototype uses the stable `#amqSongSelectStage` as the sole keyboard event owner for the main tracklist. It excludes the main tracklist from the legacy inline-list document handler and makes the old direct list handler a no-op for the main tracklist. Arrow navigation updates the selected row once. Enter resolves the selected song record and invokes `window.listenSong(song, {autoPlay:true})` once. The prototype uses `window.__aniSongDataAPI.getSongRecords()` with `window.getSong()` fallback, matching the existing Candidate210 record lookup contract.

Results:
- PASS: starting at selected row index 3, one ArrowDown moves to index 4 exactly once.
- PASS: Enter invokes the selected song playback function exactly once, with the selected row's song ID/title and `autoPlay: true`.
- PASS: zero uncaught page errors.

## Required production implementation

After byte-preserving Candidate212 source access is restored:
1. Choose one stable keyboard event owner for the main tracklist.
2. Keep inline work-song list keyboard behavior separate from the main Song Select tracklist.
3. Ensure dynamic list replacement cannot silently lose the keyboard handler.
4. Prevent duplicate playback requests and test ArrowUp/ArrowDown boundary behavior, Enter, row focus, route changes, and repeated mount/unmount cycles.
5. Re-test click selection, right-side details, actual audio start/failure recovery, and AMQ/EMQ/MIX mode switching.

## Scope limits

The prototype verifies event routing and selected-song playback invocation, not real audio output. Native persistent-origin and external audio/network tests remain blocked. The source reconstruction is 26 bytes shorter than the recorded Candidate212 baseline; no release source was changed.
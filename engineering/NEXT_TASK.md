# Next Task

1. Resolve first-entry selection behavior: stable Song Select opens with a selected beatmap; current Candidate 69 initially shows `尚未選取歌曲` until a work/song is selected. Make a minimal change that avoids unexpectedly opening the legacy detail drawer.
2. Continue visual refactor against an actual osu!stable screenshot/client. Current scene/catalog layout is structurally useful but not pixel-faithful; compare carousel dimensions, selected/hovered states, beatmap metadata, and bottom toolbox.
3. Transfer exact Candidate 69 HTML bytes to the isolated GitHub branch through a supported binary/artifact route, then download and verify remote SHA-256. Current connector does not expose local-path/binary upload for this ~9 MB artifact.
4. Run direct double-click / `file://` acceptance in an environment where local HTML navigation is permitted.
5. Test real IndexedDB custom-background persistence and audio playback in a permitted browser origin.

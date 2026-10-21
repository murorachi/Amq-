# Next Task

1. Upload the exact Candidate 65 HTML bytes to the isolated GitHub candidate branch using a supported artifact-transfer path, then fetch the remote artifact and verify SHA-256. The available connector actions expose text-content writes but no local-path/binary upload action for this generated 9 MB HTML artifact; direct container network access is unavailable.
2. Run direct double-click / `file://` acceptance in an environment where local HTML navigation is permitted.
3. Compare 1440×900, 1280×720, and 390×844 screenshots against verified osu!stable references: https://osu.ppy.sh/wiki/en/Client/Interface.
4. Validate real IndexedDB background persistence, song audio/video playback, keyboard controls, search, filters, grouping/sorting, mode switching, catalog scrolling, and all four workspace modes.
5. Do not mark the UI visually accepted until human comparison confirms the target fidelity.

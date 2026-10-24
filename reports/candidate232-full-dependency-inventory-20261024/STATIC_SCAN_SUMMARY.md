# Candidate231 靜態盤點數字與熱點

基準 SHA-256: `74607e5344e0b993fb1e8d40c081285287071c236c9c92bac86cac98c5c9fecf`

- HTML: 9,367,325 bytes
- Initial DOM: 292 IDs, 292 unique
- Scripts: 69 total; 67 executable inline JS, 2 payload blocks
- Styles: 109 blocks; zero stylesheet/declaration parser errors
- CSS: 3,570 qualified rules including supported nested conditions; 2,162 selector strings; 654 repeated selector strings; 1,408 extra repeated occurrences
- Observer mentions: MutationObserver 52; ResizeObserver 3; IntersectionObserver 5
- Timer mentions: setTimeout 141; setInterval 10; clearTimeout 38; clearInterval 9
- Event literal mentions: addEventListener 489; removeEventListener 4. Not equivalent to live listener instances.
- Storage/API: 28 literal keys; IndexedDB 6; fetch 19.

## Largest executable/data blocks

1. Main inline script: 5,082,319 bytes.
2. EMQ gzip/base64 data payload: 2,684,238 bytes (not executable JS).
3. Multiplayer UI: about 139 KB.
4. AniList ID map JSON: 125,726 bytes (data payload).
5. Secondary core inline script: about 116 KB.
6. Workspace custom-list/practice hub: about 59 KB.
7. Learning system: about 44 KB.
8. Candidate210 song-selection behavior: about 34 KB.

## CSS hotspot selector counts

| Selector | Occurrences | Reason to inspect |
|---|---:|---|
| `body.amq-songselect-route-active #amqSongSelectStage .p32-catalog` | 23 | bottom/top/height/width variants |
| `body.amq-songselect-route-active #audioDock` | 22 | geometry, display, grid, padding and z-index conflicts |
| `body.ui-home-menu #homeMenu .amqHomeTopFrame` | 16 | homepage layout generations |
| `body.amq-songselect-route-active #amqSongSelectStage .p32-info` | 16 | metadata geometry/overflow/background |
| `body.ui-home-menu #homeMenu .amqHomeLandingAction` | 16 | action card state/style |
| `#quizView .quizMystery` | 15 | quiz style generations |
| `body.amq-songselect-route-active #amqWorkspaceDock` | 15 | dock geometry and display |
| `#amqWorkspaceDock` | 13 | general dock layout generations |

These are integration hotspots, not automatic deletion targets. Source order, media conditions, selector specificity, runtime inline styles and interaction states must be tested before consolidation.

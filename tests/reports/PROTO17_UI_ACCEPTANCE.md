# Proto17 UI Acceptance Report

- Run time UTC: 2026-10-20T09:19:06Z
- Baseline: v82.85.30 / Proto17
- Tested HTML size: 8832874 bytes
- Tested HTML SHA-256: c2e27b8e820a81f714439d02352a575db0c139f4326c50755161f26e6dc250fe
- Result: PASS (12 passed, 0 failed)

| Result | Case | Details |
|---|---|---|
| PASS | Embedded JavaScript syntax | checked 40 inline scripts |
| PASS | Full page initializes on normal HTTP origin | {'ready': 'complete', 'workspace': True, 'returnHome': True, 'homeActions': 7, 'scopeTarget': True} |
| PASS | Native localStorage read/write | {'localStorage': True, 'indexedDB': True} |
| PASS | Native IndexedDB open/write/read | {'localStorage': True, 'indexedDB': True} |
| PASS | Event loop remains responsive after initialization | 100 ms timer completed in 100.2 ms |
| PASS | Seven homepage entries navigate to expected views | quiz->quiz; practiceExplore->practice; practiceWeak->practice; catalog->catalog; watchlist->watchlist; learningPlan->learningPlan; dashboard->dashboard |
| PASS | Four workspace sections render their action lists | lists:清單管理:6; batch:批次整理:9; learning:學習中心:7; analysis:學習分析:6 |
| PASS | Learning workspace shortcuts select the correct practice mode | practiceExplore->explore:selected; practiceWeak->weak:selected; practice-self->self:selected; practice-srs->srs:selected |
| PASS | Learning Center shortcut opens the existing menu group | 學習中心 |
| PASS | Learning Analysis shortcut opens the dashboard | active view = dashboard |
| PASS | Return-home control restores the independent homepage | active view = home; workspace hidden |
| PASS | No uncaught non-network JavaScript exceptions | 0 network-only errors filtered |

## Scope and limitations

- Loaded through a local HTTP origin; not file:// or opaque about:blank.
- Native localStorage and IndexedDB were tested with real browser APIs.
- External requests were blocked for deterministic acceptance; remote covers, third-party APIs, and real audio playback were not tested.
- This is functional acceptance, not a pixel-diff visual review.

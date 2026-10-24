# Stage 06: List Management / Batch Organizer ownership

Date: 2026-10-24

## Baseline and artifact
- Parent Candidate219: 9,352,752 bytes; SHA-256 4a20b0eee8ecaa4b8d7ac5b55e1fc602c4335c9ad892ef901dc672ac719b40ea.
- Candidate220 local: 9,353,264 bytes; SHA-256 d36160782d785c9f23adb5d217aefe1fa4c1d80c1dd309bf54670753e5a9d80a.
- Candidate219 remains untouched; byte-identical rollback saved locally.

## Ownership map
| Capability | Current owner | Evidence / dependency | Disposition |
|---|---|---|---|
| Song-row selection state | Candidate210 behavior runtime | data-amq-batch-select, shared selected Set, delegated change handler | Keep as sole owner |
| Song familiarity batch update | Candidate210 applyStatus | existing status map, save/stats/detail updates and ani-song-status-updated-v210 event | Keep; expose through List Management |
| Song tags | Candidate210 + aniSongTags_v1 | existing tag save/event path | Keep; expose through List Management |
| Song blacklist | Candidate210 + V51 blacklist helper | existing song-ID blacklist API | Keep; expose through List Management |
| Song selection to custom list | Candidate210 saveSelection | aniCustomPracticeListsV1; membership stored by work/anime ID | Keep; warn that sibling songs of a selected work are affected |
| Work-level watch status and filtered selection | quicktools and legacy bulk handlers | selectVisibleBtn, selectFilteredBtn, bulkWatchStatus, applyBulkWatchBtn | Defer deletion; distinct work-level scope |
| Work-level list/weakness/blacklist/SRS bridge | Proto15 wsBatchListAdder + bulkPracticeAction | list target mirror, observer sync and explicit apply button | Defer until parity matrix and migration are tested |
| C99 VNDB rail label | Candidate210 apply override | action key remains vndb, but text was rewritten to 批次整理 | Candidate220 removes misleading relabel |

## Candidate220 changes
1. Added 歌曲維護 → 歌曲批次整理 to the official List Management workspace, calling the existing window.__amqCandidate210OpenBatchWorkspace API instead of copying business logic.
2. Removed the Candidate210 UI text override that renamed the C99 vndb action to 批次整理. Its underlying action identity and VNDB handling remain unchanged.
3. Did not remove quicktools or wsBatchListAdder: those act on selected works and include capabilities not proven equivalent to song-row operations.

## Validation
- PASS: 65/65 executable inline JS blocks pass node --check; three embedded data/payload blocks excluded.
- PASS: 108 CSS blocks parse with zero parser errors.
- PASS: static assertions confirm the new action definition, handler, canonical Candidate210 API, and removal of the VNDB relabel override.
- NOT RUN: full Chromium click flow; Playwright Chromium launch timed out in the current runtime. Native file://, durable storage reload, real audio, live APIs, multiplayer lifecycle and osu!stable pixel comparison remain NOT RUN/BLOCKED.
- GitHub branch contains documentation only. Local HTML upload and remote SHA verification remain BLOCKED.

## Next stage
Build and test a capability matrix for work-level quicktools, workspace list bridge, and song-level batch operations. Migrate unique capabilities before deleting old UI/runtime/event/observer/timer/CSS owners.

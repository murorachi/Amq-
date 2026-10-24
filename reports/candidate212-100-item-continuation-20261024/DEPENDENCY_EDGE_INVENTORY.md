# Candidate212 Static Dependency Edge Inventory

- Source: `candidate212_reconstructed.html` (analysis-only readable reconstruction; not byte-identical to the recorded baseline).
- Source size: 9352606 bytes.
- Source SHA-256: `07f2d2428b308d6449e561b9d68cc890932d36089694cdecbff561d092b11636`.
- Script blocks: 70.
- Heuristic window API edges: 268.

> **Limit:** this is a static text-scan dependency hint, not a complete AST call graph. It may include comments/string references and can miss indirect/dynamic calls. It must not be used alone to justify deletion.

## Script ownership and dependency hints

| # | Script / ID | Bytes | Function declarations | Window API references | Storage keys | Registered events | Dispatched custom events |
|---:|---|---:|---:|---|---|---|---|
| 1 | `inline-script-01` | 5082319 | 98 | `__amqPageSizeV71`, `__amqSongSelectInitialSelectionSetV70`, `__aniAudioHealthV857`, `__aniChineseTitleAPIv8237`, `__aniEmqAPI`, `__aniHistoryAPIv51`, `__aniIsAnimeWorkBlacklistedV825`, `__aniOpenPracticeManagerV825` … | `aniBlacklistedSongs_v1`, `aniCatalogModeV6`, `aniCollection_v2`, `aniCoverCacheV12`, `aniFavorites_v1`, `aniPlayHistory_v1` … | `DOMContentLoaded`, `ani-app-navigation`, `canplay`, `change`, `click`, `ended` … | `amq-inline-song-selected`, `ani-audio-unavailable-v857`, `ani-blacklist-changed-v51`, `ani-familiarity-updated-v51`, `ani-quiz-history-updated-v51` … |
| 2 | `inline-script-02` | 6021 | 2 | `__aniDeactivateQuizV82`, `__aniEnterQuizV82`, `__aniGetActiveViewV82`, `__aniNavigateApp`, `__aniRenderLearningInsightsV82`, `__aniRenderPracticeHubV825` | — | `change`, `click`, `input` | `ani-app-navigation` |
| 3 | `inline-script-03` | 8109 | 4 | — | — | `click` | — |
| 4 | `inline-script-04` | 115713 | 53 | `__aniApplyQuizCustomListScopeV8265`, `__aniAudioHealthV857`, `__aniCandidatePoolPolicyV8265`, `__aniChineseTitleAPIv8237`, `__aniClearCustomListPickerV825`, `__aniDeactivateQuizV82`, `__aniEmqAPI`, `__aniEmqChineseTitleAPIv8259` … | `aniChineseAnswerSuggestionsEnabledV8239`, `aniCollectionThemeV18`, `aniQuizCustomListScopeInvalidV8265`, `aniQuizPlanBackupSettingsV72`, `aniQuizSettingsV14` | `ani-app-navigation`, `ani-emq-chinese-titles-ready`, `ani-familiarity-updated-v51`, `ani-quiz-answer-submitted`, `ani-quiz-new-question`, `blur` … | `ani-quiz-answer-submitted`, `ani-quiz-new-question`, `ani-quiz-round-stopped-v82`, `ani-quiz-unplayed`, `quiz-v35-answered` |
| 5 | `v33-player-cover-and-view-isolation-script` | 1074 | 0 | — | — | `click` | — |
| 6 | `v34-quiz-fixes` | 1728 | 0 | `__aniQuizStateV45` | `aniQuizSettingsV14` | `ani-app-navigation`, `change`, `input`, `pause` | — |
| 7 | `v36-quiz-fixes` | 4454 | 1 | `__aniQuizStateV45`, `__aniSelectQuizSuggestionV8272` | `aniQuizSettingsV14`, `aniQuizVndbCharacterV36` | `ani-quiz-new-question`, `click`, `loadedmetadata` | — |
| 8 | `v37-answer-and-layout-fixes` | 5408 | 0 | `__aniChineseTitleAPIv8237`, `__aniEmqAPI`, `__aniQuizNextV47`, `__aniQuizStateV45`, `__aniQuizSubmitV47`, `__aniSelectQuizSuggestionV8272` | — | `ani-quiz-new-question`, `click`, `input`, `keydown`, `quiz-v35-answered` | — |
| 9 | `v39-enter-and-avatar-fix` | 1951 | 0 | — | — | `ani-quiz-answer-submitted`, `ani-quiz-new-question`, `input` | — |
| 10 | `v40-buffer-setting-and-avatar-alignment` | 1923 | 0 | — | `aniQuizSettingsV14` | — | — |
| 11 | `v41-classification-diagnostic` | 259 | 0 | `__aniQuizStateV45`, `__v41LastClassifiedSong` | — | `ani-quiz-answer-submitted` | — |
| 12 | `v42-quiz-controls-and-random-sample` | 7884 | 0 | `__aniQuizAutoNextV30`, `__aniQuizPauseClockV82`, `__aniQuizStateV45`, `__aniQuizStopStateV82`, `__aniQuizSubmitV47` | `aniQuizSettingsV14` | `ani-app-navigation`, `ani-quiz-new-question`, `ani-quiz-round-stopped-v82`, `click`, `loadedmetadata`, `play` | — |
| 13 | `v43-submit-and-dock-final-fix` | 681 | 0 | — | — | — | — |
| 14 | `v44-submit-pipeline-and-volume` | 2748 | 0 | `__aniQuizStateV45`, `__v45SubmitWrapped` | `aniQuizVolume` | `input` | — |
| 15 | `v51-history-blacklist-ui` | 6825 | 2 | `__aniChineseTitleAPIv8237`, `__aniHistoryAPIv51` | — | `ani-blacklist-changed-v51`, `ani-quiz-history-updated-v51`, `ani-quiz-new-question`, `change`, `click`, `keydown` | `ani-quiz-history-updated-v51` |
| 16 | `v60-player-quiz-cleanup` | 11129 | 10 | `__aniCandidatePoolPolicyV8265`, `__aniEmqAPI`, `__aniHistoryAPIv51` | `aniAnimeAliases_v1`, `aniCustomPracticeListsV1`, `aniDockCustomListIdV99`, `aniDockMutedV57`, `aniDockVolumeV57`, `aniRandomSourceModeV857:dock` | `ani-quiz-answer-submitted`, `ani-quiz-new-question`, `change`, `click`, `input`, `volumechange` | — |
| 17 | `v61-buffer-answer-feedback` | 896 | 0 | — | — | `ani-quiz-answer-submitted`, `ani-quiz-new-question` | — |
| 18 | `v63-soft-answer-glow` | 1416 | 0 | — | `aniQuizSettingsV14` | `ani-quiz-answer-submitted`, `ani-quiz-new-question`, `change` | — |
| 19 | `home-menu-navigation-v82-22` | 2860 | 0 | `__aniNavigateApp`, `__aniSetHomeMenuOpenV846`, `__aniSetLearningCenterMenuV846`, `__aniSetPracticeModeV825` | — | `click`, `input` | — |
| 20 | `v77-interval-repetition` | 38982 | 55 | `__aniHistoryAPIv51`, `__aniNavigateApp`, `__aniQuizAutoNextV30`, `__aniQuizPlanV1`, `__aniQuizStateV45`, `__aniSRSAPI`, `__aniSuppressPersistenceForRestoreV828` | — | `DOMContentLoaded`, `ani-app-navigation`, `ani-quiz-history-updated-v51`, `ani-quiz-new-question`, `ani-quiz-unplayed`, `change` … | — |
| 21 | `v32-quiet-quiz-flow-script` | 708 | 0 | — | — | `ended`, `pause`, `playing` | — |
| 22 | `v65-answer-glow-fix-script` | 1318 | 0 | — | — | `ani-quiz-answer-submitted`, `ani-quiz-new-question` | — |
| 23 | `learning-system-v72-script` | 44447 | 23 | `__aniGetActiveViewV82`, `__aniHistoryAPIv51`, `__aniLearningAPIv825`, `__aniLearningAPIv828`, `__aniNavigateApp`, `__aniQuizPlanV1`, `__aniRenderLearningInsightsV82`, `__aniRenderLearningPlanV82` … | `aniQuizPlanBackupSettingsV72` | `DOMContentLoaded`, `ani-app-navigation`, `ani-blacklist-changed-v51`, `ani-familiarity-updated-v51`, `ani-quiz-history-updated-v51`, `click` … | — |
| 24 | `v82-known-audit-fixes` | 3845 | 0 | `__aniQuizPauseClockV82`, `__aniQuizPlanV1`, `__aniQuizStateV45`, `__aniSRSAPI` | — | `ani-quiz-answer-submitted`, `ani-quiz-new-question`, `ani-quiz-round-stopped-v82`, `ani-quiz-unplayed`, `click`, `quiz-v35-answered` | — |
| 25 | `v82-25-custom-lists-and-practice-hub` | 54120 | 25 | `__aniApplyQuizCustomListScopeV8265`, `__aniChineseTitleAPIv8237`, `__aniClearCustomListPickerV825`, `__aniCustomListMembershipV1`, `__aniEmqAPI`, `__aniGetActiveViewV82`, `__aniHistoryAPIv51`, `__aniIsAnimeWorkBlacklistedV825` … | — | `DOMContentLoaded`, `ani-app-navigation`, `ani-blacklist-changed-v51`, `ani-quiz-history-updated-v51`, `ani-srs-updated-v77`, `change` … | `ani-blacklist-changed-v51` |
| 26 | `amq-v826-home-profile-pp-mobile` | 35978 | 27 | `__aniAMQProfileV826`, `__aniAMQProfileV828`, `__aniGetActiveViewV82`, `__aniHistoryAPIv51`, `__aniMobileAnswerV828`, `__aniSetHomeMenuOpenV846`, `__aniSetLearningCenterMenuV846`, `__aniSuppressPersistenceForRestoreV828` | — | `DOMContentLoaded`, `ani-app-navigation`, `ani-quiz-answer-submitted`, `ani-quiz-history-updated-v51`, `ani-quiz-new-question`, `ani-quiz-round-stopped-v82` … | — |
| 27 | `v82-30-storage-repository-v1` | 8643 | 4 | `__aniStorageRepositoryV1` | — | — | — |
| 28 | `v82-34-multiplayer-ui` | 139154 | 120 | `__aniCandidatePoolPolicyV8265`, `__aniChineseTitleAPIv8237`, `__aniEmqAPI`, `__aniEmqChineseTitleAPIv8259`, `__aniHistoryAPIv51`, `__aniIsAnimeWorkBlacklistedV825`, `__aniMultiplayerUIV82`, `__aniNavigateApp` … | `aniAmqProfileV1`, `aniAnimeWatch_v1`, `aniEmqWorkListsSelectedV8254`, `aniQuizVndbCharacterV36`, `aniVNWatchlistV1` | `ani-app-navigation`, `ani-blacklist-changed-v51`, `ani-chinese-title-map-ready`, `ani-familiarity-updated-v51`, `ani-song-tag-updated-v80`, `canplay` … | `ani-multiplayer-state-rendered-v8258`, `quiz-v35-answered` |
| 29 | `v82-35-single-player-reveal-video` | 8317 | 8 | `__aniHistoryAPIv51`, `__aniQuizStateV45` | `aniQuizVolume` | `ani-app-navigation`, `ani-quiz-answer-submitted`, `ani-quiz-new-question`, `ani-quiz-round-stopped-v82`, `ani-quiz-unplayed`, `change` … | — |
| 30 | `aniAnilistIdMapV8237` | 125726 | 0 | — | — | — | — |
| 31 | `ani-chinese-title-system-v8237` | 13759 | 21 | `__aniChineseTitleAPIv8237`, `__aniRefreshChineseSuggestionsV8237` | — | `ani-chinese-title-map-ready`, `click` | `ani-chinese-title-map-ready` |
| 32 | `v82-39-quiz-ui-polish-script` | 1256 | 0 | — | — | — | — |
| 33 | `v82-40-watchlist-and-solo-quiz-layout-script` | 4217 | 0 | `__aniClearCurrentWatchlistV8240` | `aniAnimeWatch_v1` | `ani-app-navigation`, `ani-quiz-new-question`, `click`, `resize` | — |
| 34 | `v8243-player-detail-watchlist-patch` | 8212 | 1 | `__aniAudioDockCollapseV843`, `__aniGetActiveViewV82`, `__aniMyListBatchToolsV843`, `__aniUpdateSelectionHintV843` | `aniAudioDockCollapsed_v843` | `ani-app-navigation`, `change`, `click` | — |
| 35 | `v82-44-ux-intuition-cleanup-runtime` | 4326 | 0 | — | — | `DOMContentLoaded`, `ani-app-navigation`, `change`, `click`, `ended`, `pause` … | — |
| 36 | `v82-45-scene-background-settings` | 21358 | 29 | `__aniGetActiveViewV82`, `__aniSceneBackgroundsV1` | — | `ani-app-navigation`, `change`, `click`, `input`, `keydown` | — |
| 37 | `emqLibraryGzipBase64V8248` | 2684238 | 0 | — | — | — | — |
| 38 | `emq-toggle-v8248-script` | 15231 | 28 | `__aniCandidatePoolPolicyV8265`, `__aniEmqAPI`, `__aniEmqToggleChangedV1`, `__aniHistoryAPIv51` | `aniCollection_v2`, `aniSongTags_v1` | `change` | `ani-emq-library-ready-v8248` |
| 39 | `v82-49-vn-library-navigation-script` | 34921 | 41 | `__aniEmqAPI`, `__aniEmqToggleChangedV1`, `__aniGetActiveViewV82`, `__aniMultiplayerUIV82`, `__aniNavigateApp`, `__aniQuizStateV45`, `__aniSetHomeMenuOpenV846`, `__aniVnCoverAPIv857` … | — | `DOMContentLoaded`, `ani-app-navigation`, `ani-emq-library-ready-v8248`, `ani-multiplayer-state-rendered-v8258`, `ani-quiz-new-question`, `change` … | — |
| 40 | `v82-54-emq-audio-lists-batch` | 32873 | 41 | `__aniEmqAPI`, `__aniNavigateApp`, `__aniQuizStateV45`, `__aniVnLibraryV8249` | — | `DOMContentLoaded`, `ani-app-navigation`, `ani-emq-library-ready-v8248`, `ani-quiz-new-question`, `change`, `click` … | — |
| 41 | `ani-emq-chinese-titles-v8259` | 9694 | 18 | `__aniEmqAPI`, `__aniEmqChineseTitleAPIv8259`, `__aniMultiplayerUIV82`, `__aniRefreshChineseSuggestionsV8237` | `aniQuizSettingsV14` | `ani-emq-chinese-titles-ready`, `ani-quiz-new-question` | `ani-emq-chinese-titles-ready` |
| 42 | `amq-workspace-prototype-15-script` | 22357 | 11 | `__amqSetWorkspacePanel`, `__amqWorkspaceContentClose`, `__amqWorkspaceContentOpen`, `__aniGetActiveViewV82`, `__aniNavigateApp`, `__aniSetHomeMenuOpenV846`, `__aniVnLibraryV8249` | `amqWorkspacePrototype15` | `ani-app-navigation`, `change`, `click`, `hashchange`, `input`, `popstate` | — |
| 43 | `candidate61-mobile-options-heading-visibility` | 621 | 0 | — | — | `resize` | — |
| 44 | `candidate70-osu-songselect-corrections-script` | 2850 | 0 | `__aniNavigateApp`, `__aniSetHomeMenuOpenV846` | — | `click`, `keydown` | — |
| 45 | `candidate76-workspace-panel-shell-runtime` | 4030 | 3 | — | — | `ani-app-navigation`, `click`, `keydown`, `resize` | — |
| 46 | `candidate77-frame-owned-workspace-runtime` | 3310 | 0 | `__amqSetWorkspacePanel`, `__amqWorkspaceContentClose` | — | `ani-app-navigation`, `click`, `resize` | — |
| 47 | `candidate82-three-stage-workbench-runtime` | 12108 | 8 | `__amqSongSelectRouteGuardInstalled`, `__amqWorkspaceContentClose`, `__amqWorkspaceContentOpen`, `__aniNavigateApp`, `__aniRenderLearningInsightsV82`, `__aniRenderPracticeHubV825` | — | `click`, `keydown`, `resize` | `amq-workspace-route-intercepted` |
| 48 | `amq-workspace-prototype-16-custom-list-workflow-script` | 11250 | 12 | `__aniCustomListMembershipV1`, `__aniNavigateApp` | — | `click` | — |
| 49 | `candidate87-independent-import-and-diagnostics` | 7218 | 7 | `__amqSetWorkspacePanel`, `__amqWorkspaceContentClose`, `__amqWorkspaceContentOpen` | — | `click` | — |
| 50 | `candidate103-songselect-layout-owner` | 2170 | 0 | — | — | — | — |
| 51 | `candidate105-marker` | 49 | 0 | — | — | — | — |
| 52 | `candidate106-final-songselect-layout-owner` | 5732 | 0 | — | — | `ani-app-navigation`, `resize` | — |
| 53 | `candidate114-player-layout-isolation` | 3441 | 3 | `__aniGetActiveViewV82` | — | `DOMContentLoaded`, `ani-app-navigation` | — |
| 54 | `candidate115-song-row-artwork` | 1926 | 2 | — | — | `DOMContentLoaded`, `ani-app-navigation`, `click` | — |
| 55 | `candidate137-song-list-runtime` | 12418 | 11 | `__amqCategoryV71`, `__amqProto26SongSelect`, `__aniHistoryAPIv51` | — | `DOMContentLoaded`, `ani-app-navigation`, `ani-song-tag-updated-v80`, `click`, `resize`, `scroll` | `amq-inline-song-selected` |
| 56 | `candidate158-runtime-filter-clip-fix` | 726 | 0 | — | — | `ani-app-navigation`, `resize` | — |
| 57 | `candidate185-modal-lifecycle-guard` | 6283 | 1 | `__amqCandidate185` | — | `amq-inline-song-selected`, `click`, `keydown`, `resize` | — |
| 58 | `candidate210-songselect-behavior-rebuild` | 23834 | 10 | `__amqCandidate210OpenBatchWorkspace`, `__amqCandidate210OpenImportWorkspace`, `__amqProto26SongSelect`, `__amqWorkspaceContentClose`, `__amqWorkspaceContentOpen`, `__aniEmqAPI`, `__aniHistoryAPIv51`, `__aniSongDataAPI` … | `aniCustomPracticeListsV1` | `DOMContentLoaded`, `ani-app-navigation`, `ani-song-playback-selected-v210`, `change`, `click`, `error` … | `amq-inline-song-selected`, `ani-custom-list-updated-v210`, `ani-song-playback-selected-v210`, `ani-song-status-updated-v210`, `ani-song-tag-updated-v80` |
| 59 | `inline-script-59` | 69969 | 7 | `__amqCandidate185`, `__amqCategoryV71`, `__amqPageSizeV71`, `__amqProto26SongSelect`, `__amqSetSongSelectWorkspaceMode`, `__amqSetWorkspacePanel`, `__aniEmqAPI`, `__aniGetActiveViewV82` … | — | `amq-inline-song-selected`, `ani-app-navigation`, `ani-song-playback-recorded-v80`, `click`, `hashchange`, `input` … | `amq-inline-song-selected` |
| 60 | `proto25-stable-play-menu` | 2405 | 0 | `__aniNavigateApp`, `__aniSetHomeMenuOpenV846` | — | `click`, `keydown` | — |
| 61 | `inline-script-61` | 2196 | 0 | `__amqWorkspaceRouteGuardReady`, `__aniNavigateApp` | — | `click` | — |
| 62 | `candidate71-user-feedback-runtime` | 11897 | 1 | `__amqCategoryV71`, `__amqPageSizeV71`, `__amqProto26SongSelect`, `__amqVnPageSizeV71`, `__aniVnCoverAPIv857` | — | `ani-app-navigation`, `change`, `click`, `resize` | — |
| 63 | `candidate72-home-songselect-runtime` | 2346 | 0 | — | — | `ani-app-navigation`, `click`, `keydown` | — |
| 64 | `candidate72-ranking-frame-bootstrap` | 1049 | 0 | — | — | `click` | — |
| 65 | `candidate72-layer-order-runtime` | 798 | 0 | — | — | `resize` | — |
| 66 | `candidate72-smooth-songselect-arc-runtime` | 432 | 0 | — | — | — | — |
| 67 | `candidate84-workspace-merge-dashboard` | 419 | 0 | — | — | — | — |
| 68 | `candidate99-osu-stable-songselect-ui-runtime` | 22797 | 11 | `__amqWorkspaceContentOpen`, `__aniNavigateApp`, `__aniVnLibraryV8249` | `aniCustomPracticeListsV1`, `aniDockCustomListIdV99`, `aniDockMutedV57`, `aniDockVolumeV57`, `aniRandomSourceModeV857:dock` | `DOMContentLoaded`, `ani-app-navigation`, `change`, `click`, `input`, `wheel` | — |
| 69 | `candidate186-cover-recovery-runtime` | 3792 | 0 | `__aniEmqAPI`, `__aniVnCoverAPIv857` | — | `click`, `keydown` | — |
| 70 | `candidate193-final-route-guard` | 1091 | 0 | `__amqSongSelectFinalRouteGuardInstalled`, `__amqWorkspaceContentOpen`, `__aniNavigateApp`, `__aniSetHomeMenuOpenV846` | — | — | `amq-workspace-route-intercepted` |

## High-priority dependency clusters

- **Volume:** `v44-submit-pipeline-and-volume` and `v82-35-single-player-reveal-video` both reference `v44VolumeControl`, `v44Volume`, and `aniQuizVolume`; runtime testing confirms their fallback behavior diverges. Consolidate through one shared controller, not by deleting the fallback.
- **Custom lists / practice:** `v82-25-custom-lists-and-practice-hub`, `amq-workspace-prototype-16-custom-list-workflow-script`, `v82-54-emq-audio-lists-batch`, and `candidate210-songselect-behavior-rebuild` must be cross-checked for shared storage keys and public adapters before any deletion.
- **Workspace shell / Song Select:** `amq-workspace-prototype-15-script`, `candidate76-workspace-panel-shell-runtime`, `candidate77-frame-owned-workspace-runtime`, `candidate82-three-stage-workbench-runtime`, `candidate103-songselect-layout-owner`, `candidate106-final-songselect-layout-owner`, `candidate210-songselect-behavior-rebuild`, `candidate99-osu-stable-songselect-ui-runtime`, and `candidate193-final-route-guard` overlap on route/frame/layout ownership. Verify actual creator and teardown order before merging.
- **Multiplayer:** `v82-34-multiplayer-ui` includes phase-template UI and storage/API contracts; repeated IDs in mutually exclusive templates are not automatically duplicates in live DOM.
- **Storage/data:** preserve `aniCustomPracticeListsV1`, learning records, IndexedDB scene background/Blob data, AMQ/EMQ/MIX source state, and all existing data contracts until explicit migration tests exist.

## Required next validation

1. Replace heuristic edges with AST-level caller/callee data when an appropriate parser is available.
2. Trace each high-priority API to its actual assignment owner and runtime consumer.
3. Instrument observer/timer/listener counts over repeated mount/unmount cycles.
4. Only then classify a candidate as Keep, Integrate then delete, Delete, or Needs confirmation.
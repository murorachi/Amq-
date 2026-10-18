# V82.86.03 測驗生命週期所有權盤點

基準：`v82.86.02-engineering-backlog-01` / `5ed5249c7f6f3865a2ab518c87a55d8ffb4ff793`。產品基準維持 V82.82，8,787,490 bytes，SHA-256 `227e89d80fa58db8e8f79c59f1203f06f8bc0663d11228d0986fe6e30f81e91b`。

## 結論
本階段只盤點及補測試，不改產品 JS/CSS、manifest 或生成 HTML。共享測驗狀態有明確 closure owner 與只讀快照橋接，但多個功能仍直接讀寫同一組變數。這是已證實的耦合，不是已證實的使用者可見 bug。

`window.__aniQuizStopStateV82` 集中清除 clip timer、播放 ticker/stop timer、自動切題 timer/tick，暫停媒體、停用輸入並清空目前歌曲。兩個 audio `playing` listener 責任不同：一個開始答題計時/解鎖輸入，另一個啟動播放進度 ticker，不應只因事件名稱相同而合併。

自動切題及播放 ticker 有成對清理函式。音訊失敗後 350ms timeout 沒保存 handle，但 callback 重新檢查 active、song ID、finished、paused；列為可取消性候選，不宣稱是已確認缺陷。壓縮長行讓純文字搜尋無法完整證明所有動態 listener 關係，本報告不宣稱完成 AST 控制流或 heap leak 分析。

## 1. 共享狀態所有權

| 狀態 | 寫入/生命週期 owner | 消費者與驗收 |
|---|---|---|
| `quizActive` | enter/deactivate、`nextQuiz`、stop bridge | auto-next、audio failure、ticker；新增 exit/re-entry |
| `quizSong` | `nextQuiz` 選題；空候選/回合結束/stop 清空 | 判題、提示、音訊、歷史、揭曉；既有 lifecycle tests |
| `quizFinished` | `hideAnswer` 重置；分類/提交/跳過/stop 設定 | duplicate-submit guard、suggestion renderer、audio/ticker |
| `quizAudioStarted` / `quizStartedAt` | audio playing listener 開始；新題/stop 重置 | 解鎖、計時、熟悉度、未播放 fail-closed |
| `currentQuestionTarget` | `nextQuiz` 由 UI/settings 設定；all-target 暫時切換後還原 | suggestion、答案歷史與分類 |
| `quizSettings` | load/read settings、reset、planner bridge | 候選池、AMQ/EMQ、答案、播放時長、auto-next、揭曉 |

`window.__aniQuizStateV45` 是只讀快照，不是 setter，也不代表模組已解耦。

## 2. DOM 所有權

| DOM | 主要寫入者 | teardown/重置 |
|---|---|---|
| `#quizAnswer`、submit/skip | `hideAnswer`、playing handler、submit/stop bridge、input/keydown handlers | 新題清空停用；播放成功才解鎖；停止時清空停用 |
| `#quizSuggestions`、`aria-expanded` | suggestion controller close/select、renderer build、script_004 keyboard path | close 清空 children、關閉 open、設 false；選取後恢復 focus/caret |
| `#quizResult` | 分類/提交/揭曉流程 | 新題隱藏並清空 |
| `#quizAudioState` | 播放成功/失敗、新題流程 | 新題重設狀態 |
| playback fill/remaining/state | playback ticker/update | 清除 ticker，stop bridge 清理 timer |
| `#quizCountdownV30` | auto-next render/clear | clear 時隱藏並清空文字 |
| `#quizView`、body quiz classes | enter/deactivate/stop bridge | stop 時隱藏 view、移除 quiz/paused classes |

## 3. Timer/listener 判定

| 機制 | cleanup/防護 | 判定 |
|---|---|---|
| `quizClipTimer` | 新題、分類、stop 清除並歸零 | 有 cleanup |
| auto-next timeout + interval | `clearQuizAutoNextTimersV30` 同時清除；stop bridge 呼叫 clear | 有配對 cleanup |
| playback ticker + stop timer | `clearQuizPlaybackV30` 清 ticker/stop timer 並重置 deadline | 有配對 cleanup |
| audio failure 350ms timeout | callback 再核對 active、song ID、finished、paused | 有 guard，無主動取消 handle |
| app-level document/audio listeners | IIFE 初始化時註冊，單頁 app 生命週期持續存在 | singleton 假設；新測試驗證退出/重入 |
| 動態 tooltip/cover/floating panel listeners | 元素移除/替換時失去 DOM 引用；部分 panel 保留 | 尚未做 heap/leak profiling |

## 4. Suggestion 現有測試證據
`tests/browser/quiz_suggestions_integration.py` 斷言候選上限 25、穩定排序、IME guard、ArrowDown/Enter、click/pointerdown、click/keyboard 恰好一個 bubbling input event、focus/caret、清單關閉、`aria-expanded=false` 及不提交答案。IME 測試用 dataset/事件狀態隔離 composing guard，不是 OS 級輸入法測試；Firefox 尚未納入。

## 5. 新增驗收
- `tests/unit/quiz_lifecycle_ownership_contract.test.cjs` 鎖定狀態快照、stop bridge、timer 清理、suggestion IME/input/focus/caret/ARIA。
- `tests/browser/quiz_answer_playback_lifecycle.py` 加入揭曉後倒數期間離開：確認 auto-next 已排程、退出時取消、原倒數過期不抽新題、重新進入可開始新題。
- browser case 使用隔離 storage/media shim，不代表真實音訊 provider 驗收。
- 本報告建立時新測試尚待 CI，未提前標 PASS。

## 新測試第一次失敗的處置

第一次新 browser run 的 exit/countdown assertions 全部通過，但重新開始新題時 Playwright 回報開始按鈕被 `#amqRoundFeedback` 攔截。追查 `src/scripts/script_026.htmlpart` 確認這是預期的「本輪練習已結束」modal：停止事件會顯示它，使用者需按「繼續」或點擊遮罩才能關閉。這不是已確認的產品缺陷；測試前置條件不完整。測試已改成驗證 modal 出現、按「繼續」可關閉，再測重新進入。修正版仍需重新跑 CI。

## 結果、限制與回滾
確認的是共享狀態與 teardown 結構，沒有在本階段宣稱已確認產品 bug。真實音訊 provider、Firefox、正式網域 storage、live multiplayer 仍是外部門檻。產品 HTML 未修改，仍須 CI build verifier 確認指紋。

回滾只需 revert 本階段報告、測試、workflow 及狀態文件，不需產品回滾。CI 通過後再將 AMQ-TODO-001、002、004 更新為完成；AMQ-TODO-003 要等 exit/countdown/re-entry 測試通過才結案。

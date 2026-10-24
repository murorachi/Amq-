# Candidate212 Batch Selection State Acceptance

Date: 2026-10-24
Browser: Chromium / Playwright, 1920×1080
Source: Candidate212 readable reconstructed export, 26 bytes shorter than the recorded baseline. All proposed changes were tested in a disposable fixture; no Candidate HTML was modified.

## Baseline reproduction

1. Open Song Select and open `批次整理`.
2. Click `選取目前載入歌曲`.
3. Assert 180 visible song-row batch checkboxes are checked and the panel counter says `已選取 180 首歌曲`.
4. Click `批次標記聽過`.
5. Inspect the storage payload, panel counter, and live checkbox state.
6. Click `批次標記有印象` again to determine whether the selection set survived the rerender.

Results:
- PASS: 180 songs were selected and all 180 were written as familiarity status 1 after the first action.
- FAIL: after the action, the live row checkboxes dropped to 0 checked while the panel counter still said `已選取 180 首歌曲`.
- PASS: a second action still modified the same 180 songs to status 2, proving the internal selection Set persisted even though the UI no longer showed it.
- PASS: no uncaught page errors.

## Root cause

In `candidate210-songselect-behavior-rebuild`, the `selected` Set is local to `installSharedImportAndBatchWorkspaces()`, while `installCompactRowFactory()` constructs song rows outside that function. The row factory always emits an unchecked `data-amq-batch-select` checkbox. After `applyStatus()` dispatches an `input` event to the search control, the song list rerenders and recreates all rows with unchecked boxes. The Set still contains the 180 IDs, and the panel counter still reads its size, so visible selection state and actual batch scope diverge.

This is not a data-write failure. It is a selection-state rendering defect that can make repeated batch actions look as if nothing remains selected while they continue modifying the same hidden selection.

## Disposable prototype fix

- Move the single `selected` Set to the outer scope of the Candidate210 IIFE so both the row factory and batch controller use the same selection state.
- Render each row checkbox with `checked` when `selected.has(String(song[1]))` is true.
- Remove the nested `selected` declaration to avoid creating a second state owner.
- Do not clear selection after an operation; multiple batch actions on the same explicit selection remain supported.

Prototype test results:
- PASS: initial selection counter and checked-checkbox count both equal 180.
- PASS: after `批次標記聽過`, 180 checkboxes remain checked, the counter remains 180, and all 180 stored values equal 1.
- PASS: after `批次標記有印象`, 180 checkboxes remain checked, the counter remains 180, and all 180 stored values equal 2.
- PASS: zero uncaught page errors.

## Acceptance limits and next step

This fix is validated only in a disposable in-memory fixture. The original Candidate212 bytes are not available for byte-preserving modification, so no source candidate was created. After restoring byte-identical source access, apply the same single-owner state change, then test checkbox click add/remove, clear selection, filtering, list membership add/remove, familiarity/tag/blacklist actions, and route close/reopen. Keep the selection set and visible checkboxes consistent after every rerender.
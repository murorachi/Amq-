# Candidate 80 Workspace Action Audit

Date: 2026-10-22

## Scope

Audited the four action definitions and the complete `runAction(a)` dispatcher in Candidate 80. This is source-level classification, not a claim that every action was exercised in a normal-origin browser.

## Summary

There are 28 menu actions across the four workspaces. The controls are rendered inside the right-side popup, but most actions still activate existing legacy views or locate controls elsewhere in the application. Candidate 80 corrects the shell hierarchy; it does not yet migrate the old feature interfaces into the popup.

| Workspace | Actions | Current behavior class | Notes |
|---|---:|---|---|
| 清單管理 | 6 | Legacy view navigation / locating existing controls | Custom list, watch-state list, catalog, VN list are existing views; create-custom-list opens an existing form but does not submit it. |
| 批次整理 | 9 | Existing catalog navigation; four selection actions; four locator actions | Four selection actions click existing catalog controls. Four locator actions navigate to catalog and locate controls; apply actions do not click apply buttons. |
| 學習中心 | 7 | Practice-route navigation / existing mode clicks | Explore, weak-point, self-list, and SRS navigate to the existing practice view and click an existing mode control; general quiz uses the existing quiz entry; learning plan/center use existing views. |
| 學習分析 | 6 | Legacy view navigation / existing view shortcuts | Dashboard, catalog, watchlist, SRS, learning plan, and learning center still use existing routes/entries. |

## Detailed action classification

### 清單管理

- `watchlist-custom`: opens existing watchlist view and clicks `customModeTab` when available.
- `create-custom-list`: opens existing watchlist view, switches to custom list tab, and focuses the existing name input. It does not create a list automatically.
- `watchlist`: opens existing watchlist view.
- `catalog`: opens the existing catalog view.
- `vn-list`: opens watchlist and attempts to locate the existing VN list/catalog view; result depends on which view is available.
- `watchlist-watch`: opens existing watchlist view and clicks `watchModeTab` when available.

### 批次整理

- `catalog`: opens the existing catalog/search view.
- `batch-select`: clicks the existing `selectModeBtn`.
- `batch-visible`: clicks the existing `selectVisibleBtn`; selection only, no data apply.
- `batch-filtered`: clicks the existing `selectFilteredBtn`; selection only, no data apply.
- `batch-clear`: clicks the existing `clearSelectionBtn`.
- `batch-tools`: opens catalog and scrolls to existing `quicktools`.
- `batch-apply-target`: opens catalog and focuses `applyBulkPracticeAction`; it does not apply changes.
- `batch-watch-target`: opens catalog and focuses `applyBulkWatchBtn`; it does not apply changes.
- `batch-create-list`: opens catalog and focuses `createListFromCatalog`; it does not create a list.

### 學習中心

- `practiceExplore`: opens existing practice route and clicks visible `data-practice-mode="explore"`.
- `practiceWeak`: opens existing practice route and clicks visible `data-practice-mode="weak"`.
- `practice-self`: opens existing practice route and clicks visible `data-practice-mode="self"`; does not auto-start a session.
- `quiz`: uses the existing quiz entry.
- `practice-srs`: opens existing practice route and clicks visible `data-practice-mode="srs"`.
- `learningPlan`: uses the existing learning-plan entry/view.
- `learningCenter`: uses the existing learning-center entry/view.

### 學習分析

- `dashboard`: uses the existing dashboard entry/view.
- `catalog`: uses the existing catalog entry/view.
- `watchlist`: uses the existing watchlist entry/view.
- `practice-srs`: opens the existing SRS practice mode.
- `learningPlan`: uses the existing learning-plan entry/view.
- `learningCenter`: uses the existing learning-center entry/view.

## Risks and migration order

1. Confirmed architecture gap: most actions still leave Song Select or depend on legacy views; the popup is a shell/launcher, not yet the final migrated workbench.
2. Selection actions operate existing catalog state. Their route changes to catalog, so the user does not remain in Song Select during these actions.
3. Apply-target actions are deliberately non-destructive: they locate/focus existing apply buttons but do not click them. Preserve this safety property unless explicitly requested otherwise.
4. Migrate one domain at a time and reuse existing renderers/stores. Do not clone custom-list, watch-status, practice scheduling, or dashboard logic.
5. Recommended order: read-only analysis views and custom-list entry shell; list browsing and watch-state UI; batch selection state; batch apply confirmations; learning/practice modes. Each migration needs route, state, and data-safety regression checks.

## Test status

- Source-level action mapping: completed for all 28 actions.
- Runtime click tests for every action: not run.
- Normal-origin storage and data-mutation regression: not run.

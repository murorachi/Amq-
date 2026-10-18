#!/usr/bin/env python3
"""Evidence-backed contracts for high-risk cross-fragment dependency boundaries."""
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def source(path):
    return (ROOT / path).read_text(encoding="utf-8")


def main():
    quiz = source("src/scripts/script_004.htmlpart")
    catalog = source("src/scripts/script_001.htmlpart")
    amq_lists = source("src/scripts/script_025.htmlpart")
    emq_lists = source("src/scripts/script_040.htmlpart")
    emq_membership = source("src/modules/emq_list_membership.htmlpart")
    storage = source("src/modules/storage_repository.htmlpart")

    # Quiz state is private to its IIFE, with explicitly named cross-fragment bridges.
    assert "Object.defineProperty(window,'__aniQuizStateV45'" in quiz
    assert "window.__aniQuizStopStateV82=" in quiz
    assert "window.__aniQuizSubmitV47=" in quiz
    assert "listenSong(quizSong,{autoPlay:quizSettings?.autoPlay!==false})" in quiz
    assert "const original=mediaFiles;window.mediaFiles=function(s)" in quiz
    assert "window.mediaFiles=original" in quiz

    # Quiz answer settlement depends on classic-script globals from the earlier catalog fragment.
    for name in ("st", "save", "updateStats", "render"):
        assert f"function {name}(" in catalog, f"catalog global definition missing: {name}"
        assert f"{name}(" in quiz, f"quiz consumer missing: {name}"
    assert "window.__aniEmqAPI?.combinePool?.(base,quizSettings,activeFocusModeV72,quizRoundSeen,lastQuestionId,activeFocusSongIdsV72)" in quiz

    # AMQ lists use anime/work IDs and connect to the private quiz pool through a fail-closed adapter.
    assert "'aniCustomPracticeListsV1'" in amq_lists
    assert "window.__aniApplyQuizCustomListScopeV8265=function(basePool,isFocusMode=false)" in amq_lists
    assert "if(isFocusMode)return rows" in amq_lists
    assert "window.__aniApplyQuizCustomListScopeV8265" in quiz
    assert "Custom-list candidate scope failed closed" in quiz
    assert "scoped=[]" in quiz
    assert "const validAnimeIds=" in source("src/modules/amq_valid_anime_ids.htmlpart")

    # EMQ work, VNDB and song IDs remain distinct through membership and pool combination.
    for key in ("aniEmqWorkListsV8254", "aniEmqWorkListsSelectedV8254", "aniEmqAudioOverridesV8254"):
        assert key in emq_lists, f"EMQ storage key missing: {key}"
    assert "originalCombine=a.combinePool?.bind(a)" in emq_lists
    assert "a.combinePool=(base,settings,focusMode,roundSeen,lastId,focusIds)=>" in emq_lists
    assert "function listWorkIds(" in emq_membership
    assert "function listSongIds(" in emq_membership
    assert "getWorkByVndbId" in emq_membership
    assert "list.workIds" in emq_membership and "list.vndbIds" in emq_membership and "list.songIds" in emq_membership

    # The repository adapter exists, but current list flows still use direct localStorage.
    assert "window.__aniStorageRepositoryV1=Object.freeze(" in storage
    for api in ("registerAdapter(name,adapter)", "setDefaultAdapter(name)", "previewLegacyImport", "importLegacyData"):
        assert api in storage, f"storage repository API missing: {api}"
    assert "localStorage.getItem(KEY)" in emq_lists
    assert "localStorage.setItem(KEY,JSON.stringify(clean))" in emq_lists
    assert "localStorage" in amq_lists and "'aniCustomPracticeListsV1'" in amq_lists

    # Partial progress is explicit: this stage does not claim all graph edges or all list gates are done.
    with (ROOT / "reports" / "ENGINEERING_BACKLOG.csv").open(encoding="utf-8-sig", newline="") as stream:
        rows = {row["id"]: row for row in csv.DictReader(stream)}
    assert rows["AMQ-TODO-007"]["status"] == "In Progress"
    assert rows["AMQ-TODO-008"]["status"] == "In Progress"
    assert rows["AMQ-TODO-010"]["status"] == "In Progress"
    print("PASS critical cross-fragment dependency ownership contracts (quiz, AMQ/EMQ lists, storage, backlog)")


if __name__ == "__main__":
    main()

# Candidate212 Custom-list Isolation Acceptance

Date: 2026-10-24
Browser: Chromium / Playwright, 1920×1080
Source: readable reconstructed Candidate212 with in-memory storage; no HTML source modified.

## Executed actions and assertions

1. Opened the catalog and existing custom-list manager.
2. Created `AMQ List A` and `AMQ List B` through the existing form submission path.
3. Verified the two generated list IDs differ.
4. Added work ID `1` to List A twice and to List B once.
5. Verified duplicate additions to List A are deduplicated.
6. Removed work ID `1` from List A and verified List B still contains it.
7. Renamed List A and verified its stable ID did not change.
8. Deleted List A and verified List B and its membership remained intact in the persisted mock payload.

## Results

- PASS: two lists have unique IDs.
- PASS: duplicate membership is deduplicated.
- PASS: removing a member from one list does not remove it from another list.
- PASS: rename preserves the list ID and members contract.
- PASS: deleting one list preserves the other list and its membership.
- PASS: zero uncaught page errors.

## Scope limits

The test uses an in-memory storage mock and therefore does not prove persistence after native page reload, browser restart, or IndexedDB interactions. Native `file://`/localhost acceptance remains blocked, and the source export differs from the recorded Candidate212 baseline by 26 bytes. No source change or release candidate was produced.
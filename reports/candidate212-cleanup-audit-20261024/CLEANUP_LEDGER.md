Candidate212 cleanup ledger

KEEP: custom-list CRUD/storage keys; learning records/history/blacklist; IndexedDB scene background/Blob data; AMQ/EMQ/MIX pool/audio; Song Select route/list/covers/player. These have shared dependencies or user data; validate persistence and runtime before changes.

INTEGRATE THEN DELETE (candidates only): repeated init/save/api/createList/setStatus names; v44VolumeControl creation at multiple sites; watchModeTab/customModeTab in markup and template; mpPause/mpLobby IDs in game phase templates. Must verify scope, mount order, DOM uniqueness and event lifecycle first.

DIRECT DELETE: none proven unreachable in this pass.

NEEDS CONFIRMATION: three guarded amqSongSelectRankingPlaceholder creation points; remaining MutationObserver lifecycles; 194 TODO/FIXME/XXX matches; duplicate CSS rules. Verify actual owner/callback/disconnect/runtime coverage before deletion.

No code was deleted and no new HTML candidate was created because the dependency map and browser regression are incomplete. This is explicitly an audit checkpoint, not a completed source cleanup.

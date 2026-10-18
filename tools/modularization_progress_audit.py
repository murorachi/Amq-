#!/usr/bin/env python3
"""Generate an evidence-based remaining-work inventory without inventing a completion percentage."""
from pathlib import Path
import csv, json, hashlib
ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'reports/FRAGMENT_MANIFEST.json'
FUNCTIONS = ROOT / 'reports/AST_FUNCTION_DEFINITIONS.csv'
REPORT = ROOT / 'reports/MODULARIZATION_REMAINING_WORK_AUDIT_V82_80.md'
SCRIPT_CSV = ROOT / 'reports/MODULARIZATION_REMAINING_SCRIPT_INVENTORY_V82_80.csv'
MODULE_CSV = ROOT / 'reports/MODULARIZATION_REMAINING_MODULE_MATRIX_V82_80.csv'

def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

def main():
    m = json.loads(MANIFEST.read_text(encoding='utf-8'))
    functions = list(csv.DictReader(FUNCTIONS.open(encoding='utf-8-sig', newline='')))
    script_functions = [f for f in functions if f['fragment'].startswith('script_')]
    module_functions = [f for f in functions if not f['fragment'].startswith('script_')]
    scripts = [r for r in m['fragments'] if r['kind'] == 'script']
    styles = [r for r in m['fragments'] if r['kind'] == 'style']
    modules = m.get('modules', [])
    by_fragment = {}
    for f in functions:
        by_fragment[f['fragment']] = by_fragment.get(f['fragment'], 0) + 1
    script_rows = []
    for r in scripts:
        p = ROOT / r['path']
        script_rows.append({
            'fragment': r['path'], 'bytes': r['byte_length'], 'sha256': r['sha256'],
            'ast_function_definitions_remaining': by_fragment.get(Path(r['path']).name, 0),
            'extracted_module_count': sum(1 for x in modules if x.get('insertion_fragment') == r['path']),
            'role': r.get('role', ''),
        })
    script_rows.sort(key=lambda x: (-int(x['bytes']), x['fragment']))
    with SCRIPT_CSV.open('w', encoding='utf-8', newline='') as f:
        w = csv.DictWriter(f, fieldnames=['fragment','bytes','sha256','ast_function_definitions_remaining','extracted_module_count','role'])
        w.writeheader(); w.writerows(script_rows)
    with MODULE_CSV.open('w', encoding='utf-8', newline='') as f:
        w = csv.DictWriter(f, fieldnames=['name','path','insertion_fragment','byte_length','sha256','purpose','runtime_contract'])
        w.writeheader()
        for x in modules:
            w.writerow({k: x.get(k, '') for k in w.fieldnames})
    top_functions = sorted(functions, key=lambda x: int(x.get('body_bytes_utf8') or 0), reverse=True)[:20]
    module_lines = '\n'.join(f"| `{x['name']}` | `{x['path']}` | `{x.get('insertion_fragment','not recorded')}` | {x['byte_length']:,} | {x.get('purpose','').replace('|','\\|')} |" for x in modules)
    largest_lines = '\n'.join(f"| `{Path(x['fragment']).name}` | {int(x['bytes']):,} | {x['ast_function_definitions_remaining']} | {x['extracted_module_count']} | {x['role']} |" for x in script_rows[:15])
    function_lines = '\n'.join(f"| `{x['function']}` | `{x['fragment']}` | {x['line']} | {int(x['body_bytes_utf8'] or 0):,} |" for x in top_functions)
    total_script_bytes = sum(int(r['byte_length']) for r in scripts)
    total_style_bytes = sum(int(r['byte_length']) for r in styles)
    module_bytes = sum(int(x['byte_length']) for x in modules)
    module_targets = {x.get('insertion_fragment') for x in modules if x.get('insertion_fragment')}
    untouched_script_fragments = len(scripts) - len(module_targets)
    release = m.get('release', {})
    baseline = m.get('baseline', {})
    report = f'''# Modularization remaining-work audit — V82.80

Date: 2026-10-18  
Purpose: evidence-based status inventory for the AMQ modularization project. This is an engineering audit, not a claim of completion.

## Executive summary

- Product output remains **{release.get('version','unknown')}**: {int(release.get('bytes',0)):,} bytes, SHA-256 `{release.get('sha256','unknown')}`.
- Immutable baseline remains **{baseline.get('version','V82.65')}**; baseline artifacts must not be overwritten.
- Physical source layout: **{len(scripts)} script/data fragments** and **{len(styles)} CSS fragments**.
- Source-module insertion markers currently target **{len(module_targets)} of {len(scripts)} script/data fragments**; **{untouched_script_fragments} fragments have no extracted module insertion point**. Some are data payloads or compatibility patches and do not automatically need extraction.
- Extracted source modules: **{len(modules)}**, total {module_bytes:,} bytes; these remain inserted at their original locations by the deterministic builder.
- Parser-inventoried function definitions remaining in the 41 script/data fragments: **{len(script_functions)}**; function definitions inventoried in extracted modules: **{len(module_functions)}**; total inventory: **{len(functions)}**. This is a static count, not a count of independent business modules.
- **Fully decoupled modules with complete end-to-end acceptance: 0 confirmed by current evidence.** Module count cannot be converted to a defensible percentage because module size, coupling and risk vary widely.
- Script fragment bytes currently remaining in `src/scripts`: {total_script_bytes:,}; style fragment bytes: {total_style_bytes:,}. These totals include large embedded data payloads and therefore are not a meaningful measure of unfinished business logic.

## What is complete

| Area | Evidence-backed status |
|---|---|
| Single-file build | Manifest-driven deterministic builder reinserts source fragments and modules without runtime imports; product fingerprint is checked by `tools/verify.py`. |
| Physical source split | {len(scripts)} script/data fragments and {len(styles)} style fragments are tracked in the manifest with byte length and SHA-256. |
| Candidate policy | `candidate_pool_policy.js` has direct policy tests and candidate-pool integration tests. |
| Storage repository | Source module and synthetic storage/backup contracts exist; real-origin persistence and IndexedDB browser acceptance remain open. |
| Quiz suggestion | Text policy, renderer, controller and shared selection contracts exist; constrained Chromium integration exercises UI behavior with fixture-backed catalog data. |
| Candidate pool assembly | `calculateQuizPoolCandidatesV8280(ctx)` is a side-effect-free candidate calculation with explicit dependencies; `getQuizPool()` is a thin DOM diagnostic adapter. Twenty differential scenarios (40 assertions) match V82.79 behavior. |
| Answer metadata helpers | `quiz_answer_metadata.htmlpart` was exact-source extracted in V82.79; its 14 direct assertions and layered restoration checks remain passing. |

## Extracted module inventory

| Module | Source file | Insertion fragment | Bytes | Scope |
|---|---|---|---:|---|
{module_lines}

## Largest remaining script/data fragments

This ranking is by raw fragment bytes, not risk or unfinished logic. Data payloads are intentionally identified rather than treated as ordinary executable modules.

| Fragment | Bytes | AST function definitions | Extracted modules targeting fragment | Manifest role |
|---|---:|---:|---:|---|
{largest_lines}

Machine-readable full list: `reports/MODULARIZATION_REMAINING_SCRIPT_INVENTORY_V82_80.csv`.

## Largest parser-inventoried function bodies

These are useful review starting points, not automatic extraction candidates. Large functions may depend on shared state, DOM, audio, timers, storage, or initialization order.

| Function | Fragment | Line | Body bytes |
|---|---|---:|---:|
{function_lines}

## Remaining work, grouped by engineering risk

| Priority | Work area | Remaining work and completion evidence |
|---|---|---|
| P0 | Core `script_004` | Pure candidate calculation and DOM diagnostic adapter are now separated and differential-tested. Remaining work is a full call-site/shared-state map for settings, playback, answer submission and answer lifecycle. |
| P0 | Reproducible publication | Publish a coherent full source tree, manifest, tests, tools and reports to GitHub; read back exact paths and verify hashes. Current overlay-only branch is not a complete source release. |
| P1 | Storage / user data | Static direct-storage/key inventory is complete. Real-origin localStorage, IndexedDB Blob round-trip, migration, quota/error and rollback browser acceptance remains blocked/unverified. |
| P1 | SRS and history | Static candidate-function/key inventory is complete; state ownership, data migration and real-origin persistence contracts remain before extraction. |
| P1 | Custom playlists / AMQ-EMQ | Static API/source-mode boundary inventory is complete. Source-specific song IDs, import/export and membership contracts remain before extraction. |
| P1 | Multiplayer | Separate UI, session protocol and server contracts only with real service plus two-client acceptance; mock tests do not count as end-to-end proof. |
| P2 | Remaining script patches | Group late compatibility fragments by the behavior they override; do not merge/delete duplicate-looking patches without proof of precedence and regression tests. |
| P2 | CSS semantics | Heuristic selector-to-view/component map is generated for review; visual baselines and browser screenshot regression remain before any CSS movement. |
| P2 | Browser coverage | Real-origin persistence, audio/network, Firefox and multiplayer multi-client remain unverified; record blocked tests separately from passed tests. |

## Current limitations

- The AST inventory is parser-backed but does not resolve every lexical binding, reflective property access, indirect call, dynamic selector, or cross-fragment runtime interaction.
- The 50 CSS fragments have not been proven to map cleanly to independent components. Repeated selectors and later override layers may be intentional.
- The V82.80 getQuizPool semantic refactor changes the output bytes; 20 differential scenarios match the V82.79 function's candidate IDs and diagnostic text. This is strong unit evidence, not a substitute for real browser acceptance.
- Full GitHub source-tree publication and remote archive/hash verification are not yet complete.

## Recommended order

1. Close coherent GitHub publication: current remote branch still lacks the complete source tree and manifest.
2. Run real-origin localStorage/IndexedDB acceptance in a permitted browser environment before changing history/SRS storage code.
3. Add source-ID/metadata contracts for custom playlists and AMQ/EMQ membership before extracting list functions.
4. Build screenshot baselines for the generated CSS selector map; do not reorder CSS without visual regression.
5. Only then split further answer/playback/multiplayer boundaries behind explicit contracts.

## Reproducibility

Generated by `tools/modularization_progress_audit.py` from `reports/FRAGMENT_MANIFEST.json` and `reports/AST_FUNCTION_DEFINITIONS.csv`. Re-run after the parser-backed inventory step to refresh the report and CSVs.
'''
    REPORT.write_text(report, encoding='utf-8', newline='\n')
    print(f'PASS modularization audit: scripts={len(scripts)} styles={len(styles)} modules={len(modules)} functions={len(functions)}')
    print(f'PASS report={REPORT.relative_to(ROOT)}')
    print(f'PASS script_inventory={SCRIPT_CSV.relative_to(ROOT)} rows={len(script_rows)}')
    print(f'PASS module_matrix={MODULE_CSV.relative_to(ROOT)} rows={len(modules)}')
    if len(scripts) != 41 or len(styles) != 50 or len(modules) != m.get('module_count'):
        raise SystemExit('ERROR: manifest counts do not match expected physical fragment/module inventory')
if __name__ == '__main__':
    main()

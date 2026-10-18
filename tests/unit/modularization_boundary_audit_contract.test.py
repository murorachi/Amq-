#!/usr/bin/env python3
"""Contract tests for the static storage/source/CSS boundary inventories."""
import csv, json, re, hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
REPORTS=ROOT/'reports'
def read(name):
    with (REPORTS/name).open(encoding='utf-8-sig',newline='') as f: return list(csv.DictReader(f))
def check(name, condition):
    if not condition: raise AssertionError(name)
    print('PASS '+name)
def main():
    m=json.loads((REPORTS/'FRAGMENT_MANIFEST.json').read_text(encoding='utf-8'))
    storage=read('STORAGE_ACCESS_BOUNDARY_V82_81.csv')
    source=read('AMQ_EMQ_SOURCE_BOUNDARY_V82_81.csv')
    history=read('HISTORY_SRS_BOUNDARY_V82_81.csv')
    css=read('CSS_SELECTOR_COMPONENT_MAP_V82_81.csv')
    check('storage inventory covers every script/data fragment',len(storage)==m['script_count'] and len({x['fragment'] for x in storage})==m['script_count'])
    check('storage scan identifies direct accesses without claiming runtime reachability',sum(x['direct_storage_present']=='True' for x in storage)>0 and all('Static text scan' in x['notes'] for x in storage))
    check('history/SRS inventory includes history and learning keys',any('aniQuizHistory' in x['key_refs'] or 'aniSrs' in x['key_refs'] or 'aniLearningPlan' in x['key_refs'] for x in history))
    check('AMQ/EMQ boundary inventory includes both source modes',any(x['boundary_class']=='AMQ/EMQ shared adapter' for x in source) and any(x['boundary_class']=='EMQ-specific' for x in source))
    check('CSS selector map covers all 50 style fragments',len({x['style_fragment'] for x in css})==m['style_count'])
    check('CSS map labels heuristic mappings as requiring manual review',all('manual review required' in x['review_status'] for x in css) and any(x['component_guess']=='unmapped' for x in css) and any(x['component_guess']=='global controls' for x in css) and any(x['component_guess']=='shared UI primitives' for x in css))
    check('CSS cascade order remains source-order indexed',all(x['source_order'].isdigit() for x in css))
    check('no production style fragment hash was changed by inventory generation',all(hashlib.sha256((ROOT/x['path']).read_bytes()).hexdigest()==x['sha256'] for x in m['fragments'] if x['kind']=='style'))
    print(f'RESULT 8 assertions passed; storage_rows={len(storage)} history_srs_rows={len(history)} source_rows={len(source)} css_selectors={len(css)}')
if __name__=='__main__': main()

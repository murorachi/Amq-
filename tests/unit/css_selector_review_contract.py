#!/usr/bin/env python3
"""Guard the selector-review queue and confirm CSS was not changed."""
import csv, hashlib, json
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
REPORTS=ROOT/'reports'
def check(label, ok):
    if not ok: raise AssertionError(label)
    print('PASS '+label)
def main():
    with (REPORTS/'CSS_SELECTOR_COMPONENT_MAP_V82_81.csv').open(encoding='utf-8-sig',newline='') as f: original=list(csv.DictReader(f))
    with (REPORTS/'CSS_SELECTOR_REVIEW_V82_82.csv').open(encoding='utf-8-sig',newline='') as f: reviewed=list(csv.DictReader(f))
    check('review queue includes every formerly unmapped selector exactly once',len(reviewed)==sum(r['component_guess']=='unmapped' for r in original) and Counter((r['style_fragment'],r['selector']) for r in reviewed)==Counter((r['style_fragment'],r['selector']) for r in original if r['component_guess']=='unmapped'))
    check('every reviewed selector has a decision and a reason',all(r['review_component'] and r['review_basis'] and r['move_decision'].startswith('DO NOT MOVE') and r['review_status'] for r in reviewed))
    check('unresolved selector cases remain explicit instead of being guessed',any(r['review_component']=='manual ownership unresolved' for r in reviewed))
    m=json.loads((REPORTS/'FRAGMENT_MANIFEST.json').read_text(encoding='utf-8'))
    check('all CSS source fragment fingerprints still match manifest',all(hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()==r['sha256'] for r in m['fragments'] if r['kind']=='style'))
    baseline=json.loads((REPORTS/'V82_82_RESPONSIVE_VISUAL_BASELINE.json').read_text(encoding='utf-8'))
    check('responsive baseline covers mobile/tablet/desktop home and quiz',set(baseline['viewports'])=={'mobile','tablet','desktop'} and all(set(v['pages'])=={'home','quiz'} for v in baseline['viewports'].values()))
    print(f'RESULT 5 assertions passed; reviewed={len(reviewed)} unresolved={sum(r["review_component"]=="manual ownership unresolved" for r in reviewed)}; CSS unchanged')
if __name__=='__main__':main()

#!/usr/bin/env python3
"""Contract for the V82.83 manual review of V82.82's 32 residual CSS rows."""
from pathlib import Path
import csv
ROOT = Path(__file__).resolve().parents[2]
review = ROOT / 'reports' / 'CSS_SELECTOR_RESIDUAL_REVIEW_V82_83.csv'
with review.open(encoding='utf-8-sig', newline='') as f:
    rows = list(csv.DictReader(f))
assert len(rows) == 32, f'expected 32 residual rows, got {len(rows)}'
assert [int(r['residual_index']) for r in rows] == list(range(1, 33)), 'every source occurrence, including duplicate selectors, must retain a stable row index'
assert all(r['css_changed'] == 'NO' for r in rows), 'review must not mutate CSS'
assert all(r['cross_browser_gate'].startswith('OPEN: Firefox unavailable') for r in rows), 'Firefox gate must remain explicit'
assert sum(r['resolution_component'] == 'not a component selector' for r in rows) == 8, 'keyframe/style-tag parser artifacts must be excluded from component ownership'
assert not any(r['resolution_component'] == 'manual ownership unresolved' for r in rows), 'all actual residuals must receive an evidence-based disposition'
for token in ['learning / progress dashboard', 'AMQ custom lists / batch selection', 'audio / song row actions', 'home / global scene background', 'source mode controls']:
    assert any(r['resolution_component'] == token for r in rows), f'missing reviewed component family: {token}'
print('PASS V82.83 residual review contract: 32 rows dispositioned; 8 parser artifacts excluded; no CSS changed; Firefox gate remains open')

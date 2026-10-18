#!/usr/bin/env python3
"""Resolve V82.82's 32 residual CSS inventory rows without moving CSS."""
from pathlib import Path
import csv

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'reports' / 'CSS_SELECTOR_REVIEW_V82_82.csv'
OUTPUT = ROOT / 'reports' / 'CSS_SELECTOR_RESIDUAL_REVIEW_V82_83.csv'

KEYFRAME_STEPS = {'from', 'to', '0%', '45%', '100%'}

def classify(row):
    selector = row['selector'].strip()
    low = selector.lower()
    fragment = row['style_fragment']

    # These were emitted by a naive brace parser, but are keyframe steps, not selectors.
    if selector in KEYFRAME_STEPS and fragment in {'style_007.htmlpart', 'style_025.htmlpart', 'style_043.htmlpart'}:
        return ('not a component selector', 'CSS @keyframes step', 'Exclude from component ownership counts; preserve animation and source order.')
    if low.startswith('<style id='):
        return ('not a component selector', 'HTML style-tag boundary leaked into selector preamble', 'Parser artifact caused by an inline style tag; the following real selector is reviewed separately.')

    if 'lstable' in low or selector == '.lsTableWrap':
        return ('learning / progress dashboard', 'LS table component naming and adjacent .lsIntro/.lsSection rules in style_030', 'Component ownership is clear; do not move until Firefox and cascade gates pass.')
    if '#detailwatchtools' in low:
        return ('detail panel / watchlist tools', 'Explicit detail-watch tool ID', 'Ownership is clear from the ID; do not move until Firefox and cascade gates pass.')
    if 'mylistbatchpickv843' in low:
        return ('AMQ custom lists / batch selection', 'Explicit My List batch-picker class', 'Ownership is clear from the class name; do not move until Firefox and cascade gates pass.')
    if 'batchscopesummaryv844' in low:
        return ('AMQ custom lists / scope summary', 'Explicit batch scope summary class', 'Ownership is clear from the class name; do not move until Firefox and cascade gates pass.')
    if 'songmoremenuv844' in low:
        return ('audio / song row actions', 'Song more-menu details/summary controls and adjacent song action styles', 'Ownership is clear from song-action component family; preserve native details/summary behavior and cascade order.')
    if any(token in low for token in ('amqscenebackgroundlayer', 'amqscenebgshade', 'scenebackgroundopen')):
        return ('home / global scene background', 'Explicit AMQ scene background/shade/open identifiers in style_042', 'Global fixed layers can affect every view; keep in original cascade position until cross-browser gate passes.')
    if 'sourcemodecontrolv857' in low:
        return ('source mode controls', 'Explicit source-mode control class and nearby responsive rules', 'Ownership is clear; do not move until Firefox and cascade gates pass.')

    return ('manual ownership unresolved', 'No deterministic residual rule matched', 'DO NOT MOVE; keep the selector in the original stylesheet and investigate before extraction.')

def main():
    with SOURCE.open(encoding='utf-8-sig', newline='') as f:
        rows = list(csv.DictReader(f))
    residuals = [r for r in rows if r['review_component'] == 'manual ownership unresolved']
    reviewed = []
    for residual_index, row in enumerate(residuals, start=1):
        component, basis, decision = classify(row)
        reviewed.append({
            'residual_index': residual_index,
            'style_fragment': row['style_fragment'],
            'selector': row['selector'],
            'source_order': row['source_order'],
            'resolution_component': component,
            'resolution_basis': basis,
            'decision': decision,
            'css_changed': 'NO',
            'cross_browser_gate': 'OPEN: Firefox unavailable; Chromium responsive baseline only',
        })
    fields = ['residual_index', 'style_fragment', 'selector', 'source_order', 'resolution_component', 'resolution_basis', 'decision', 'css_changed', 'cross_browser_gate']
    with OUTPUT.open('w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(reviewed)
    unresolved = [r for r in reviewed if r['resolution_component'] == 'manual ownership unresolved']
    nonselectors = [r for r in reviewed if r['resolution_component'] == 'not a component selector']
    print(f'PASS residual selector review: input={len(residuals)} resolved={len(reviewed)-len(unresolved)} unresolved={len(unresolved)} non_selector_artifacts={len(nonselectors)} css_changed=0')
    if len(residuals) != 32 or unresolved:
        raise SystemExit(1)

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""Repeatable AMQ Song Select Chromium observation.

Uses Playwright page.set_content and a test-only in-memory Storage shim because
this environment blocks file:// and localhost navigation. This does not test
file-origin loading or durable reload persistence.
"""
import argparse, hashlib, json
from pathlib import Path
from playwright.sync_api import sync_playwright

VIEWPORTS = [(1648, 928), (1440, 900), (1280, 720)]
SHIM = r'''<script id="test-only-storage-shim">(()=>{const mk=()=>{const m=new Map();return{getItem:k=>m.has(String(k))?m.get(String(k)):null,setItem:(k,v)=>m.set(String(k),String(v)),removeItem:k=>m.delete(String(k)),clear:()=>m.clear(),key:i=>Array.from(m.keys())[i]??null,get length(){return m.size}}};Object.defineProperty(window,'localStorage',{configurable:true,value:mk()});Object.defineProperty(window,'sessionStorage',{configurable:true,value:mk()})})();</script>'''

def sha256(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

def rect(el):
    return el.evaluate("e=>{const r=e.getBoundingClientRect();return{x:+r.x.toFixed(2),y:+r.y.toFixed(2),width:+r.width.toFixed(2),height:+r.height.toFixed(2),right:+r.right.toFixed(2),bottom:+r.bottom.toFixed(2)}}")

def run(path, outdir):
    raw = path.read_text(encoding='utf-8')
    if '<head>' not in raw:
        raise RuntimeError('No <head> tag found')
    html = raw.replace('<head>', '<head>' + SHIM, 1)
    outdir.mkdir(parents=True, exist_ok=True)
    report = {
        'candidate_file': str(path), 'size_bytes': path.stat().st_size,
        'sha256': sha256(path), 'browser': 'system Chromium via Playwright',
        'navigation_mode': 'page.set_content + test-only in-memory Storage shim',
        'limits': ['file:// navigation BLOCKED_BY_ADMINISTRATOR',
                   'localhost navigation BLOCKED_BY_ADMINISTRATOR',
                   'durable storage/reload persistence NOT RUN'],
        'viewports': []
    }
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, executable_path='/usr/bin/chromium',
                                    args=['--no-sandbox', '--disable-web-security'])
        for width, height in VIEWPORTS:
            page = browser.new_page(viewport={'width': width, 'height': height},
                                    device_scale_factor=1)
            errors = []
            page.on('pageerror', lambda e: errors.append('pageerror: ' + str(e)))
            page.on('console', lambda m: errors.append('console error: ' + m.text)
                    if m.type == 'error' else None)
            page.set_content(html, wait_until='domcontentloaded', timeout=30000)
            page.wait_for_timeout(800)
            ready = page.evaluate('document.readyState')
            # Dispatch the real route control even though the menu is collapsed.
            page.locator('[data-home-action="catalog"]').first.evaluate('(e)=>e.click()')
            page.wait_for_timeout(1200)
            cards = page.locator('#amqSongSelectStage .p32-catalog .card')
            visible = cards.evaluate_all(
                'es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0}).length')
            baseline = outdir / f'{path.stem}_{width}x{height}_baseline.png'
            page.screenshot(path=str(baseline))
            hover = None
            if cards.count() > 1:
                card = cards.nth(1)
                before = card.evaluate('e=>getComputedStyle(e).transform')
                card.hover(force=True)
                page.wait_for_timeout(150)
                hover = {'before': before,
                         'after': card.evaluate('e=>getComputedStyle(e).transform'),
                         'rect': rect(card)}
                page.screenshot(path=str(outdir / f'{path.stem}_{width}x{height}_hover.png'))
            cards.nth(0).evaluate('(e)=>e.click()')
            page.wait_for_timeout(300)
            rows = page.locator('#amqSongSelectStage .songrow')
            selected = page.locator('#amqSongSelectStage .songrow.proto26-song-selected')
            selected_info = None
            if selected.count():
                selected_info = {
                    'text': selected.first.inner_text()[:120],
                    'rect': rect(selected.first),
                    'transform': selected.first.evaluate('e=>getComputedStyle(e).transform'),
                    'opacity': selected.first.evaluate('e=>getComputedStyle(e).opacity')
                }
            dom = page.evaluate("""()=>({
                duplicateIds:(()=>{const a=[...document.querySelectorAll('[id]')].map(e=>e.id);
                    return [...new Set(a.filter((x,i)=>a.indexOf(x)!==i))]})(),
                stageCount:document.querySelectorAll('#amqSongSelectStage').length,
                mountCount:document.querySelectorAll('#p32Mount').length,
                documentWidth:document.documentElement.scrollWidth,
                documentHeight:document.documentElement.scrollHeight,
                viewportWidth:innerWidth,viewportHeight:innerHeight
            })""")
            page.screenshot(path=str(outdir / f'{path.stem}_{width}x{height}_selected.png'))
            report['viewports'].append({
                'viewport':[width,height], 'dpr':1, 'ready_state':ready,
                'body_class':page.locator('body').get_attribute('class'),
                'catalog_card_count':cards.count(), 'visible_card_count':visible,
                'first_card_rect':rect(cards.nth(0)) if cards.count() else None,
                'hover':hover,
                'after_click':{'inline_list_count':page.locator(
                    '#amqSongSelectStage .amq-inline-song-list').count(),
                    'song_row_count':rows.count(), 'selected_row':selected_info},
                'dom_checks':dom, 'console_or_page_errors':errors,
                'screenshots':{'baseline':str(baseline),
                    'hover':str(outdir/f'{path.stem}_{width}x{height}_hover.png'),
                    'selected':str(outdir/f'{path.stem}_{width}x{height}_selected.png')}
            })
            page.close()
        browser.close()
    dest = outdir / f'{path.stem}_OBSERVATION_REPORT.json'
    dest.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'report':str(dest),'sha256':report['sha256'],
        'viewports':[{'viewport':v['viewport'],'cards':v['catalog_card_count'],
        'visible':v['visible_card_count'],'inline':v['after_click']['inline_list_count'],
        'rows':v['after_click']['song_row_count'],'errors':len(v['console_or_page_errors']),
        'duplicate_ids':len(v['dom_checks']['duplicateIds'])} for v in report['viewports']]},
        ensure_ascii=False, indent=2))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('html', type=Path)
    parser.add_argument('--outdir', type=Path, default=Path('observations'))
    args = parser.parse_args()
    run(args.html, args.outdir)

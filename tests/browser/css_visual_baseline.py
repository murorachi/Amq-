#!/usr/bin/env python3
"""Capture a repeatable Chromium visual/geometry baseline without touching user storage.

This uses the production HTML with isolated in-memory storage and blocks external network.
Screenshots are reference artifacts; automated assertions cover viewport overflow and core
view geometry, not pixel-perfect cross-browser equality.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
SHIM = r"""<script>(() => {
 const values = new Map();
 const storage = {get length(){return values.size}, key:i=>[...values.keys()][i]??null,
 getItem:k=>values.has(String(k))?values.get(String(k)):null,
 setItem:(k,v)=>values.set(String(k),String(v)),removeItem:k=>values.delete(String(k)),clear:()=>values.clear()};
 Object.defineProperty(window,'localStorage',{configurable:true,value:storage});
 Object.defineProperty(window,'sessionStorage',{configurable:true,value:storage});
 Object.defineProperty(window,'indexedDB',{configurable:true,value:{open(){throw new Error('IndexedDB disabled in visual-only harness')}}});
 window.__AMQ_TEST_STORAGE__=values;
})();</script>"""

def rect(page, selector):
    node = page.locator(selector).first
    if node.count() == 0:
        return None
    return node.evaluate("e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),width:+r.width.toFixed(2),height:+r.height.toFixed(2),display:s.display,visibility:s.visibility}}")

def capture(page, name, output_dir):
    body = page.locator('body').evaluate("e=>({className:e.className,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight})")
    data = {
      'viewport': page.evaluate('({width:innerWidth,height:innerHeight,devicePixelRatio})'),
      'body': body,
      'elements': {s: rect(page,s) for s in ['#quizView','#quizAnswer','#quizSuggestions','#quizStatus','#quizStart','#homeView','#watchlistView','#multiplayerView']}
    }
    if body['scrollWidth'] > body['clientWidth'] + 2:
        raise AssertionError(f'{name}: horizontal overflow {body["scrollWidth"]}>{body["clientWidth"]}')
    if name == 'quiz':
        if not data['elements']['#quizView'] or data['elements']['#quizView']['width'] <= 0:
            raise AssertionError('quiz view is not laid out')
        if not data['elements']['#quizAnswer'] or data['elements']['#quizAnswer']['width'] <= 0:
            raise AssertionError('quiz answer input is not laid out')
    shot = output_dir / f'v82_82_{name}.png'
    page.screenshot(path=str(shot), full_page=False, animations='disabled')
    data['screenshot'] = {'path': str(shot.relative_to(ROOT)), 'bytes': shot.stat().st_size, 'sha256': hashlib.sha256(shot.read_bytes()).hexdigest()}
    return data

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--html', type=Path, default=ROOT/'dist'/'amq_learning_tool_v82_82.html')
    parser.add_argument('--chromium', default='/usr/bin/chromium')
    parser.add_argument('--update-baseline', action='store_true')
    args = parser.parse_args()
    html_path = args.html.resolve()
    if not html_path.is_file(): raise SystemExit(f'Missing standalone HTML: {html_path}')
    html = html_path.read_text(encoding='utf-8')
    i = html.lower().find('<head>')
    if i < 0: raise SystemExit('Missing HTML head')
    i += len('<head>')
    html = html[:i] + SHIM + html[i:]
    out = ROOT/'reports'/'visual-baselines'
    out.mkdir(parents=True, exist_ok=True)
    errors = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True, executable_path=args.chromium, args=['--no-sandbox','--disable-dev-shm-usage'])
        context = browser.new_context(viewport={'width':1440,'height':1200}, device_scale_factor=1, color_scheme='dark', reduced_motion='reduce')
        page = context.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.route('http://**/*', lambda route: route.abort())
        page.route('https://**/*', lambda route: route.abort())
        page.set_content(html, wait_until='domcontentloaded', timeout=60000)
        page.wait_for_timeout(900)
        if page.title() != 'AMQ學習工具': raise AssertionError('production app did not initialize')
        home = capture(page, 'home', out)
        page.evaluate("window.__aniNavigateApp?.('quiz')")
        page.wait_for_timeout(250)
        quiz = capture(page, 'quiz', out)
        context.close(); browser.close()
    if errors: raise AssertionError('uncaught page errors: ' + ' | '.join(errors[:5]))
    result = {'schemaVersion':1,'product':'V82.82','browser':'Chromium headless','viewport':{'width':1440,'height':1200,'deviceScaleFactor':1,'colorScheme':'dark','reducedMotion':'reduce'},'storage':'isolated in-memory shim; no user data','network':'external HTTP/HTTPS blocked','pages':{'home':home,'quiz':quiz},'pageErrors':errors}
    baseline = out/'V82_81_VISUAL_BASELINE.json'
    if args.update_baseline:
        baseline.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        print('BASELINE UPDATED ' + str(baseline))
    else:
        if not baseline.is_file(): raise SystemExit('Baseline missing; run once with --update-baseline')
        expected = json.loads(baseline.read_text(encoding='utf-8'))
        for name in ['home','quiz']:
            actual_body = result['pages'][name]['body']
            expected_body = expected['pages'][name]['body']
            # Permit only a one-CSS-pixel height rounding difference across Chromium builds.
            # Class, width and all measured element geometry remain exact.
            for field in ['className', 'scrollWidth', 'clientWidth']:
                if actual_body[field] != expected_body[field]:
                    raise AssertionError(
                        f'{name} body {field} differs from baseline; '
                        f'actual={actual_body[field]!r} expected={expected_body[field]!r}'
                    )
            for field in ['scrollHeight', 'clientHeight']:
                if abs(actual_body[field] - expected_body[field]) > 1:
                    raise AssertionError(
                        f'{name} body {field} differs by more than 1 CSS pixel; '
                        f'actual={actual_body[field]!r} expected={expected_body[field]!r}'
                    )
            actual_elements = result['pages'][name]['elements']
            expected_elements = expected['pages'][name]['elements']
            if actual_elements != expected_elements:
                raise AssertionError(
                    f'{name} elements differ from baseline; inspect screenshots and update deliberately if intended; '
                    f'actual={json.dumps(actual_elements, ensure_ascii=False, sort_keys=True)} '
                    f'expected={json.dumps(expected_elements, ensure_ascii=False, sort_keys=True)}'
                )
        print('PASS geometry baseline matches home and quiz')
    print('PASS production HTML initializes; home and quiz screenshots captured; no horizontal overflow; no uncaught page errors')
    for name, data in result['pages'].items(): print(f"{name}: {data['screenshot']['bytes']} bytes sha256={data['screenshot']['sha256']}")
    print('LIMITATION: Chromium-only, isolated-storage visual baseline; not a Firefox or production-origin test.')
    return 0

if __name__ == '__main__': raise SystemExit(main())

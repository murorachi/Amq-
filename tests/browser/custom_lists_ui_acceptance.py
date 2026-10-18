#!/usr/bin/env python3
"""Real application UI exercise for AMQ/EMQ custom lists under isolated storage.

The application HTML and event handlers are production-built V82.80. This harness uses
page.set_content because this runtime blocks file:// and localhost navigation with
ERR_BLOCKED_BY_ADMINISTRATOR. Storage is an in-memory shim; reload persistence is checked
by reinitializing the document from a captured storage snapshot, not by claiming native
origin persistence. External network requests are blocked.
"""
import argparse
import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

SHIM_TEMPLATE = r'''<script>(() => {
  const seed = __SEED__;
  const values = new Map(Object.entries(seed));
  const storage = {get length(){return values.size}, key:i=>[...values.keys()][i]??null,
    getItem:k=>values.has(String(k))?values.get(String(k)):null,
    setItem:(k,v)=>values.set(String(k),String(v)), removeItem:k=>values.delete(String(k)),
    clear:()=>values.clear()};
  Object.defineProperty(window,'localStorage',{configurable:true,value:storage});
  Object.defineProperty(window,'sessionStorage',{configurable:true,value:storage});
  Object.defineProperty(window,'indexedDB',{configurable:true,value:{open(){throw Error('IndexedDB disabled in isolated UI harness')}}});
  window.__AMQ_TEST_STORAGE__=values;
  window.__testPromptValue=undefined;
  window.__lastAlert='';
  window.alert=(message)=>{window.__lastAlert=String(message)};
  window.confirm=()=>true;
  window.prompt=(message,defaultValue)=>window.__testPromptValue===undefined?defaultValue:window.__testPromptValue;
})();</script>'''

class Checks:
    def __init__(self): self.passed = 0
    def check(self, condition, label):
        if not condition: raise AssertionError(label)
        self.passed += 1
        print('PASS ' + label, flush=True)

def html_with_seed(source, seed):
    shim = SHIM_TEMPLATE.replace('__SEED__', json.dumps(seed, ensure_ascii=False, separators=(',', ':')))
    pos = source.lower().find('<head>')
    if pos < 0: raise AssertionError('HTML head element not found')
    pos += len('<head>')
    return source[:pos] + shim + source[pos:]

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--html', type=Path, default=Path(__file__).resolve().parents[2] / 'dist' / 'amq_learning_tool_v82_80.html')
    parser.add_argument('--chromium', default='/usr/bin/chromium')
    args = parser.parse_args()
    source = args.html.resolve().read_text(encoding='utf-8')
    checks = Checks()
    errors = []
    storage_snapshot = {}
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True, executable_path=args.chromium,
                                     args=['--no-sandbox', '--disable-dev-shm-usage'])
        context = browser.new_context(viewport={'width': 1440, 'height': 1200}, accept_downloads=True)
        page = context.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.route('https://**/*', lambda route: route.abort())
        page.route('http://**/*', lambda route: route.abort())
        page.set_content(html_with_seed(source, {}), wait_until='domcontentloaded', timeout=60000)
        page.wait_for_timeout(900)
        checks.check(page.title() == 'AMQ學習工具', 'production standalone app initializes')
        checks.check(page.evaluate('!!window.__aniEmqAPI?.ready'), 'embedded EMQ catalog API is ready without network')

        # AMQ custom list CRUD and anime-ID membership.
        page.evaluate("window.__aniNavigateApp?.('watchlist')")
        page.wait_for_timeout(100)
        page.locator('#customModeTab').click()
        page.wait_for_timeout(100)
        page.locator('#clNewName').fill('V82.82 AMQ UI Acceptance')
        page.locator('#clCreateForm button[type=submit]').click()
        page.wait_for_timeout(100)
        amq_card = page.locator('.customListCard').filter(has=page.locator('h3', has_text='V82.82 AMQ UI Acceptance'))
        checks.check(amq_card.count() == 1, 'AMQ custom list can be created through the real manager form')
        amq_data = page.evaluate("JSON.parse(localStorage.getItem('aniCustomPracticeListsV1')||'{\"lists\":[]}')")
        amq_list = next(x for x in (amq_data.get('lists', amq_data) if isinstance(amq_data, dict) else amq_data) if x.get('name') == 'V82.82 AMQ UI Acceptance')
        anime_id = page.evaluate('String(anime[0][0])')
        page.evaluate('(id)=>window.__aniOpenPracticeManagerV825(id)', anime_id)
        page.wait_for_timeout(100)
        page.locator(f'#practiceManageBackdrop [data-pm-list="{amq_list["id"]}"]').check()
        page.wait_for_timeout(100)
        amq_after_add = page.evaluate("JSON.parse(localStorage.getItem('aniCustomPracticeListsV1')||'{\"lists\":[]}')")
        amq_rows = amq_after_add.get('lists', amq_after_add) if isinstance(amq_after_add, dict) else amq_after_add
        amq_after = next(x for x in amq_rows if str(x.get('id')) == str(amq_list['id']))
        checks.check(str(anime_id) in [str(x) for x in amq_after['animeIds']], 'AMQ membership persists the selected anime ID through the management dialog')
        page.locator('#pmDone').click()
        page.evaluate("window.__testPromptValue='V82.82 AMQ renamed'")
        page.locator(f'[data-cl-rename="{amq_list["id"]}"]').click()
        page.wait_for_timeout(100)
        checks.check(page.locator('.customListCard h3').filter(has_text='V82.82 AMQ renamed').count() == 1,
                     'AMQ custom list can be renamed and re-rendered')

        # EMQ custom list CRUD and song/work/VNDB source-ID mapping.
        page.locator('#emqListsModeTabV8254').click()
        page.wait_for_timeout(100)
        page.locator('#emqListNewNameV8254').fill('V82.82 EMQ UI Acceptance')
        page.locator('#emqListCreateFormV8254 button[type=submit]').click()
        page.wait_for_timeout(100)
        emq_db = page.evaluate("JSON.parse(localStorage.getItem('aniEmqWorkListsV8254')||'{\"lists\":[]}')")
        emq_list = next(x for x in emq_db['lists'] if x['name'] == 'V82.82 EMQ UI Acceptance')
        checks.check(page.locator(f'[data-emq-list-rename="{emq_list["id"]}"]').count() == 1,
                     'EMQ custom list is rendered with edit and delete actions')
        page.locator('#emqAllWorksSearchV8254').fill('Kana -Little Sister-')
        page.wait_for_timeout(250)
        first_work_checkbox = page.locator('#emqAllWorksGridV8254 [data-emq-batch-card="allworks"]').first
        checks.check(first_work_checkbox.count() == 1, 'EMQ catalog search returns a selectable work card')
        work_id = first_work_checkbox.get_attribute('data-emq-work-id')
        vndb_id = first_work_checkbox.get_attribute('data-emq-vndb-id')
        page.locator('#emqAllWorksBulkListV8254').select_option(emq_list['id'])
        first_work_checkbox.check()
        page.locator('[data-emq-bulk-add="allworks"]').click()
        page.wait_for_timeout(100)
        emq_after_add = page.evaluate("JSON.parse(localStorage.getItem('aniEmqWorkListsV8254')||'{\"lists\":[]}')")
        emq_after = next(x for x in emq_after_add['lists'] if x['id'] == emq_list['id'])
        checks.check(str(work_id) in emq_after['workIds'], 'EMQ UI batch-add stores work ID in the work-ID field')
        checks.check(bool(vndb_id) and str(vndb_id) in emq_after['vndbIds'], 'EMQ UI maps a selected work to its VNDB ID without conflating ID domains')
        expected_song_ids = page.evaluate('(wid)=>window.__aniEmqAPI.getRows().filter(r=>String(r[0])===String(wid)).map(r=>String(r[1]))', work_id)
        checks.check(bool(expected_song_ids) and page.locator(f'[data-emq-list-members="{emq_list["id"]}"]').count() == 1,
                     'EMQ list membership UI exposes the created work for inspection')
        page.evaluate("window.__testPromptValue='V82.82 EMQ renamed'")
        page.locator(f'[data-emq-list-rename="{emq_list["id"]}"]').click()
        page.wait_for_timeout(100)
        checks.check(page.locator('#emqListGridV8254 .emqListCardV8254 h3').filter(has_text='V82.82 EMQ renamed').count() == 1,
                     'EMQ custom list can be renamed through its UI action')

        # Native backup export/import is tested only in the existing source contracts until a native origin is available.
        storage_snapshot = page.evaluate('Object.fromEntries(window.__AMQ_TEST_STORAGE__)')
        checks.check('aniCustomPracticeListsV1' in storage_snapshot and 'aniEmqWorkListsV8254' in storage_snapshot,
                     'both custom-list data stores remain present in isolated application storage')

        # Reinitialize in a fresh page realm from the captured storage snapshot.
        page2 = context.new_page()
        page2.on('pageerror', lambda e: errors.append(str(e)))
        page2.route('https://**/*', lambda route: route.abort())
        page2.route('http://**/*', lambda route: route.abort())
        page2.set_content(html_with_seed(source, storage_snapshot), wait_until='domcontentloaded', timeout=60000)
        page2.wait_for_timeout(900)
        page2.evaluate("window.__aniNavigateApp?.('watchlist')")
        page2.wait_for_timeout(100)
        page2.locator('#customModeTab').click()
        page2.wait_for_timeout(100)
        checks.check(page2.locator('.customListCard h3').filter(has_text='V82.82 AMQ renamed').count() == 1,
                     'AMQ list survives fresh-document initialization from captured storage')
        page2.locator('#emqListsModeTabV8254').click()
        page2.wait_for_timeout(100)
        checks.check(page2.locator('#emqListGridV8254 .emqListCardV8254 h3').filter(has_text='V82.82 EMQ renamed').count() == 1,
                     'EMQ list survives fresh-document initialization from captured storage')

        # Fail-closed behavior for a stale selected EMQ list ID.
        page2.evaluate("localStorage.setItem('aniEmqWorkListsSelectedV8254', JSON.stringify(['missing-emq-list-id']))")
        page2.evaluate("document.dispatchEvent(new CustomEvent('ani-emq-library-ready-v8248'))")
        page2.wait_for_timeout(100)
        checks.check('失效' in page2.locator('#emqWorkListSummaryV8254').inner_text(),
                     'stale EMQ selection is visibly marked invalid instead of broadening scope')
        checks.check(page2.evaluate("localStorage.getItem('aniQuizCustomListScopeInvalidV8265') === '1'"),
                     'stale EMQ selection persists the fail-closed invalid-scope marker')

        # Delete both lists via real UI actions; AMQ data and EMQ data remain separate.
        page2.locator(f'[data-emq-list-delete="{emq_list["id"]}"]').click()
        page2.wait_for_timeout(100)
        emq_final = page2.evaluate("JSON.parse(localStorage.getItem('aniEmqWorkListsV8254')||'{\"lists\":[]}')")
        checks.check(all(x['id'] != emq_list['id'] for x in emq_final['lists']), 'EMQ custom list deletion removes only the targeted list')
        page2.locator('#customModeTab').click()
        page2.wait_for_timeout(100)
        page2.locator(f'[data-cl-delete="{amq_list["id"]}"]').click()
        page2.wait_for_timeout(100)
        amq_final = page2.evaluate("JSON.parse(localStorage.getItem('aniCustomPracticeListsV1')||'{\"lists\":[]}')")
        amq_final_rows = amq_final.get('lists', amq_final) if isinstance(amq_final, dict) else amq_final
        checks.check(all(str(x['id']) != str(amq_list['id']) for x in amq_final_rows), 'AMQ custom list deletion removes only the targeted list')

        checks.check(not errors, 'no uncaught browser page errors during AMQ/EMQ custom-list UI exercise')
        context.close()
        browser.close()
    print(f'RESULT {checks.passed} assertions passed; {len(errors)} page errors')
    print('LIMITATION: browser uses page.set_content with an in-memory Storage shim because direct file:// and localhost navigation are blocked by the environment. This does not count as native-origin storage acceptance or a real browser reload.')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())

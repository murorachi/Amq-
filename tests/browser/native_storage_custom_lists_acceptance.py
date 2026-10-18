#!/usr/bin/env python3
"""Native localhost storage/reload and AMQ/EMQ custom-list backup acceptance."""
import argparse, json, tempfile, threading
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from playwright.sync_api import sync_playwright

SRS_KEY = "aniSrsScheduleV1"
SRS_ALGORITHM = "FSRS-6-default+song-learning-steps-v1"
SRS_SETTINGS = {"dailyNew":30,"batchSize":25,"desiredRetention":0.9,"learningStepsMinutes":[1,10],"hardStepMinutes":5,"relearnMinutes":10,"easyGraduatingDays":4,"maxIntervalDays":36500}

def check(ok, label):
    if not ok: raise AssertionError(label)
    print("PASS " + label, flush=True)

def snapshot(page):
    return page.evaluate("""() => Object.fromEntries(Array.from({length:localStorage.length},(_,i)=>{const k=localStorage.key(i);return [k,localStorage.getItem(k)]}))""")

def valid_empty_srs(raw):
    try: x=json.loads(raw)
    except Exception: return False
    if not isinstance(x,dict) or set(x)!={"schemaVersion","algorithm","createdAt","settings","cards"}: return False
    try: datetime.fromisoformat(x["createdAt"].replace("Z","+00:00"))
    except Exception: return False
    return x["schemaVersion"]==1 and x["algorithm"]==SRS_ALGORITHM and x["settings"]==SRS_SETTINGS and x["cards"]=={}

def reload_contract(before, after):
    for k,v in before.items():
        if k not in after: return False,"pre-existing key removed: "+k
        if after[k]!=v: return False,"pre-existing value changed: "+k
    added=set(after)-set(before)
    if not added: return True,"all pre-existing values preserved; no new keys"
    if added!={SRS_KEY} or not valid_empty_srs(after[SRS_KEY]):
        return False,"unexpected new key or invalid default SRS value: "+", ".join(sorted(added))
    return True,"all pre-existing values preserved; only valid default-empty SRS initialized"

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--html",type=Path,default=Path(__file__).resolve().parents[2]/"dist"/"amq_learning_tool_v82_82.html")
    p.add_argument("--chromium",default=None)
    a=p.parse_args(); html=a.html.resolve()
    check(html.is_file(),"V82.82 standalone HTML exists")
    server=ThreadingHTTPServer(("127.0.0.1",0),lambda *x,**y:QuietHandler(*x,directory=str(html.parent),**y))
    th=threading.Thread(target=server.serve_forever,daemon=True); th.start()
    errors=[]; prompt={"value":None}
    try:
        with sync_playwright() as pw:
            opts={"headless":True,"args":["--no-sandbox","--disable-dev-shm-usage"]}
            if a.chromium: opts["executable_path"]=a.chromium
            browser=pw.chromium.launch(**opts); ctx=browser.new_context(accept_downloads=True)
            page=ctx.new_page(); page.on("pageerror",lambda e:errors.append(str(e)))
            def dialog(d):
                if d.type=="prompt": d.accept(prompt["value"] or "")
                else: d.accept()
            page.on("dialog",dialog)
            port=server.server_port
            page.route("**/*",lambda route:route.continue_() if route.request.url.startswith(f"http://127.0.0.1:{port}/") else route.abort())
            response=page.goto(f"http://127.0.0.1:{port}/{html.name}",wait_until="domcontentloaded",timeout=60000)
            check(response is not None and response.status==200,"app loads on real localhost HTTP origin")
            page.wait_for_timeout(900)
            check(page.title()=="AMQ學習工具" and page.evaluate("!!window.__aniEmqAPI?.ready"),"app and embedded EMQ catalog initialize without storage shims")

            page.evaluate("window.__aniNavigateApp?.('watchlist')"); page.wait_for_timeout(100); page.locator("#customModeTab").click()
            page.locator("#clNewName").fill("Native AMQ acceptance"); page.locator("#clCreateForm button[type=submit]").click(); page.wait_for_timeout(100)
            amq=json.loads(page.evaluate("localStorage.getItem('aniCustomPracticeListsV1')"))
            amq_rows=amq.get("lists",amq) if isinstance(amq,dict) else amq
            amq_row=next(x for x in amq_rows if x.get("name")=="Native AMQ acceptance")
            aid=page.evaluate("String(anime[0][0])"); page.evaluate("(id)=>window.__aniOpenPracticeManagerV825(id)",aid)
            page.locator(f'#practiceManageBackdrop [data-pm-list="{amq_row["id"]}"]').check(); page.locator("#pmDone").click()
            prompt["value"]="Native AMQ renamed"; page.locator(f'[data-cl-rename="{amq_row["id"]}"]').click(); page.wait_for_timeout(100)
            check(page.locator(".customListCard h3").filter(has_text="Native AMQ renamed").count()==1,"AMQ create, member add and rename work through native-origin UI")

            page.locator("#emqListsModeTabV8254").click(); page.locator("#emqListNewNameV8254").fill("Native EMQ acceptance")
            page.locator("#emqListCreateFormV8254 button[type=submit]").click(); page.wait_for_timeout(100)
            edb=json.loads(page.evaluate("localStorage.getItem('aniEmqWorkListsV8254')"))
            erow=next(x for x in edb["lists"] if x["name"]=="Native EMQ acceptance")
            page.locator("#emqAllWorksSearchV8254").fill("Kana -Little Sister-"); page.wait_for_timeout(250)
            work=page.locator('#emqAllWorksGridV8254 [data-emq-batch-card="allworks"]').first
            check(work.count()==1,"EMQ catalog yields a selectable work")
            wid=work.get_attribute("data-emq-work-id"); vnid=work.get_attribute("data-emq-vndb-id")
            page.locator("#emqAllWorksBulkListV8254").select_option(erow["id"]); work.check(); page.locator('[data-emq-bulk-add="allworks"]').click()
            page.wait_for_timeout(100); edb=json.loads(page.evaluate("localStorage.getItem('aniEmqWorkListsV8254')")); erow=next(x for x in edb["lists"] if x["id"]==erow["id"])
            check(str(wid) in erow["workIds"] and vnid and str(vnid) in erow["vndbIds"],"EMQ membership stores work and VNDB IDs separately")
            prompt["value"]="Native EMQ renamed"; page.locator(f'[data-emq-list-rename="{erow["id"]}"]').click(); page.wait_for_timeout(100)
            check(page.locator("#emqListGridV8254 .emqListCardV8254 h3").filter(has_text="Native EMQ renamed").count()==1,"EMQ list rename works through native-origin UI")

            before=snapshot(page); check("aniCustomPracticeListsV1" in before and "aniEmqWorkListsV8254" in before,"both custom-list stores are in native localStorage")
            page.reload(wait_until="domcontentloaded",timeout=60000); page.wait_for_timeout(900)
            ok,why=reload_contract(before,snapshot(page)); check(ok,"real document reload snapshot: "+why)
            page.evaluate("window.__aniNavigateApp?.('watchlist')"); page.wait_for_timeout(100); page.locator("#customModeTab").click()
            check(page.locator(".customListCard h3").filter(has_text="Native AMQ renamed").count()==1,"AMQ list survives real document reload")
            page.locator("#emqListsModeTabV8254").click()
            check(page.locator("#emqListGridV8254 .emqListCardV8254 h3").filter(has_text="Native EMQ renamed").count()==1,"EMQ list survives real document reload")

            with page.expect_download(timeout=30000) as dl:
                page.locator("#exportBtn").click()
            with tempfile.TemporaryDirectory() as td:
                backup_path=Path(td)/"backup.json"; dl.value.save_as(str(backup_path))
                backup=json.loads(backup_path.read_text(encoding="utf-8")); storage=backup.get("storage",{})
                check("aniCustomPracticeListsV1" in storage and "aniEmqWorkListsV8254" in storage and isinstance(backup.get("storageManifest"),dict),"full backup contains both custom lists and a storage manifest")
                # Malformed JSON must be rejected before any localStorage mutation.
                before_corrupt=snapshot(page)
                corrupt_path=Path(td)/"corrupt-backup.json"
                corrupt_path.write_text('{"format": "ani-collection-workspace", broken',encoding="utf-8")
                page.locator("#importFile").set_input_files(str(corrupt_path)); page.wait_for_timeout(350)
                check(snapshot(page)==before_corrupt,"corrupt backup is rejected before mutating existing storage")

                page.locator(f'[data-emq-list-delete="{erow["id"]}"]').click(); page.wait_for_timeout(120)
                page.locator("#customModeTab").click(); page.locator(f'[data-cl-delete="{amq_row["id"]}"]').click(); page.wait_for_timeout(120)
                page.locator("#importFile").set_input_files(str(backup_path)); page.wait_for_timeout(1000)
                ra=json.loads(page.evaluate("localStorage.getItem('aniCustomPracticeListsV1')||'{\"lists\":[]}'"))
                ra=ra.get("lists",ra) if isinstance(ra,dict) else ra
                re=json.loads(page.evaluate("localStorage.getItem('aniEmqWorkListsV8254')||'{\"lists\":[]}'"))
                check(any(x.get("id")==amq_row["id"] and x.get("name")=="Native AMQ renamed" for x in ra),"backup restore recovers AMQ list")
                check(any(x.get("id")==erow["id"] and x.get("name")=="Native EMQ renamed" for x in re.get("lists",[])),"backup restore recovers EMQ list and ID mapping")

                # Assert restored data survives a fresh document load, not just the current JS heap.
                page.reload(wait_until="domcontentloaded",timeout=60000); page.wait_for_timeout(900)
                restored_amq=json.loads(page.evaluate("localStorage.getItem('aniCustomPracticeListsV1')||'[]'"))
                restored_amq=restored_amq.get("lists",restored_amq) if isinstance(restored_amq,dict) else restored_amq
                restored_emq=json.loads(page.evaluate("localStorage.getItem('aniEmqWorkListsV8254')||'{}'"))
                restored_amq_row=next((x for x in restored_amq if x.get("id")==amq_row["id"]),None)
                restored_emq_row=next((x for x in restored_emq.get("lists",[]) if x.get("id")==erow["id"]),None)
                check(bool(restored_amq_row) and restored_amq_row.get("name")=="Native AMQ renamed","AMQ backup identity survives restore and fresh reload")
                check(bool(restored_emq_row) and restored_emq_row.get("name")=="Native EMQ renamed","EMQ backup identity survives restore and fresh reload")
                check(str(wid) in restored_emq_row.get("workIds",[]) and str(vnid) in restored_emq_row.get("vndbIds",[]),"EMQ work/VNDB memberships survive restore and fresh reload")
            check(not errors,"no uncaught browser errors during native storage acceptance")
            ctx.close(); browser.close()
    finally:
        server.shutdown(); server.server_close(); th.join(timeout=2)
    print("LIMITATION: Chromium localhost only; Firefox, real audio and multiplayer reconnect remain separate acceptance gates.")
    print("CLEANUP: test data lived only in the isolated browser context.")
    return 0

if __name__=="__main__": raise SystemExit(main())

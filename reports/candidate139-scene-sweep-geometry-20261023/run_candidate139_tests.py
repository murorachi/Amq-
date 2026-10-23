#!/usr/bin/env python3
from pathlib import Path
from playwright.sync_api import sync_playwright
import hashlib,json
SRC=Path("/mnt/data/amq_learning_tool_v82_85_46_workspace_proto44-osu-songselect-ui_139_scene_sweep_geometry.html")
raw=SRC.read_text(encoding="utf-8")
shim='''<script>(()=>{const mk=()=>{const m=new Map();return{getItem:k=>m.get(String(k))??null,setItem:(k,v)=>m.set(String(k),String(v)),removeItem:k=>m.delete(String(k)),clear:()=>m.clear(),key:i=>[...m.keys()][i]??null,get length(){return m.size}}};Object.defineProperty(window,"localStorage",{configurable:true,value:mk()});Object.defineProperty(window,"sessionStorage",{configurable:true,value:mk()})})();</script>'''
raw=raw.replace("<head>","<head>"+shim,1)
out={"candidate":SRC.name,"bytes":SRC.stat().st_size,"sha256":hashlib.sha256(SRC.read_bytes()).hexdigest(),"tests":[],"limits":["file:// and localhost navigation blocked","durable persistence not run"]}
def check(n,ok,d):out["tests"].append({"name":n,"status":"PASS" if ok else "FAIL","detail":d})
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path="/usr/bin/chromium",args=["--no-sandbox","--disable-web-security"])
 for w,h in [(1648,928),(1440,900),(1280,720)]:
  pg=b.new_page(viewport={"width":w,"height":h},device_scale_factor=1);errs=[];pg.on("pageerror",lambda e:errs.append(str(e)));pg.set_content(raw,wait_until="domcontentloaded",timeout=30000);pg.wait_for_timeout(800);pg.locator('[data-home-action="catalog"]').first.evaluate("(e)=>e.click()");pg.wait_for_function("document.querySelector('#amqSongSelectTracklist')&&!document.querySelector('#amqSongSelectTracklist').classList.contains('hidden')")
  v=pg.evaluate("""()=>{const l=document.querySelector('#amqSongSelectTracklist'),r=[...l.querySelectorAll('.songrow')],i=r.findIndex(x=>x.classList.contains('proto26-song-selected')),f=r[0],c=document.querySelector('#amqSongSelectCurvedFrame'),q=c.getBoundingClientRect();return{selectedIndex:i,rows:r.length,rowHeight:f.getBoundingClientRect().height,visibleRows:l.clientHeight/f.getBoundingClientRect().height,doc:[document.documentElement.scrollWidth,document.documentElement.scrollHeight],viewport:[innerWidth,innerHeight],curve:{x:q.x,y:q.y,width:q.width,height:q.height,bottom:q.bottom,border:getComputedStyle(c).borderBottomColor}}}""")
  check(f"{w}x{h} selected center row",v["selectedIndex"]==3,v);check(f"{w}x{h} 7.5 rows and no overflow",abs(v["visibleRows"]-7.5)<.03 and v["doc"]==[w,h],v);check(f"{w}x{h} no page errors",not errs,errs)
  if w==1648:
   check("curve aligns with reference boundary",abs(v["curve"]["y"]-95)<2 and abs(v["curve"]["bottom"]-178)<2 and abs(v["curve"]["width"]-478)<3 and v["curve"]["border"]=="rgb(57, 115, 255)",v["curve"])
   pg.screenshot(path="/mnt/data/amq_songselect_work/candidate139_delivery/candidate139_1648x928.png")
   before=pg.locator("#amqSongSelectTracklist .songrow.proto26-song-selected").get_attribute("data-id");pg.keyboard.press("ArrowDown");pg.wait_for_timeout(80);after=pg.locator("#amqSongSelectTracklist .songrow.proto26-song-selected").get_attribute("data-id");check("ArrowDown changes selection",before!=after,{"before":before,"after":after})
   pg.keyboard.press("ArrowUp");pg.wait_for_timeout(80);back=pg.locator("#amqSongSelectTracklist .songrow.proto26-song-selected").get_attribute("data-id");check("ArrowUp restores selection",back==before,{"expected":before,"actual":back})
   row=pg.locator("#amqSongSelectTracklist .songrow").first;row.hover(force=True);pg.wait_for_timeout(80);tr=row.evaluate("e=>getComputedStyle(e).transform");check("hover shifts -3px",tr=="matrix(1, 0, 0, 1, -3, 0)",{"transform":tr})
   pg.locator("#amqSongSelectStage #search").fill("Usagi");pg.wait_for_timeout(300);n=pg.locator("#amqSongSelectTracklist .songrow").count();sel=pg.locator("#amqSongSelectTracklist .songrow.proto26-song-selected");title=sel.locator(".songname").first.inner_text() if sel.count() else "";check("search fallback",0<n<180 and sel.count()==1 and "Usagi" in title,{"rows":n,"selected":title})
   pg.locator("#amqSongSelectStage #search").fill("");pg.wait_for_timeout(250);pg.locator("#proto26SongModes [data-p26-mode='emq']").evaluate("(e)=>e.click()");pg.wait_for_timeout(350);sources=pg.locator("#amqSongSelectTracklist .songrow").evaluate_all("(rs)=>[...new Set(rs.map(r=>r.dataset.source))]");check("EMQ filter",sources==["emq"],{"sources":sources})
  pg.close()
 b.close()
out["pass"]=sum(t["status"]=="PASS" for t in out["tests"]);out["fail"]=sum(t["status"]=="FAIL" for t in out["tests"]);print(json.dumps(out,ensure_ascii=False,indent=2))

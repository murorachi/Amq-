from pathlib import Path
p=Path("candidate.html")
s=p.read_text(encoding="utf-8")
needle='''    <button class="amqHomeLandingAction" type="button" data-menu-number="03" data-home-action="practiceWeak">
      <span class="amqHomeLandingActionTag">03 / REVIEW</span><strong>弱點補強</strong><small>針對不熟悉的歌曲練習</small><span class="amqHomeLandingArrow" aria-hidden="true">↗</span>
    </button>'''
replacement=needle+'''
    <button class="amqHomeLandingAction amqHomeLandingMultiplayer" type="button" data-menu-number="04" data-home-action="multiplayer">
      <span class="amqHomeLandingActionTag">04 / MULTIPLAYER</span><strong>多人連線</strong><small>建立房間或加入其他玩家</small><span class="amqHomeLandingArrow" aria-hidden="true">↗</span>
    </button>'''
assert s.count(needle)==1, "homepage primary action anchor mismatch"
s=s.replace(needle,replacement,1)
needle2="function runAction(a){\n"
replacement2="function runAction(a){\n if(a==='multiplayer'){const entry=document.querySelector('#quizMultiplayerOpen');if(entry){entry.click();setStatus('已開啟既有多人連線入口；連線、建房與加入房間仍由原本多人流程處理。','success')}else{setStatus('找不到既有多人連線入口；未修改任何房間或連線設定。','error')}return}\n"
assert s.count(needle2)==1, "workspace action dispatcher anchor mismatch"
s=s.replace(needle2,replacement2,1)
s=s.replace('\\\\n<style id="amq-home-legacy-sections-guard-v851">','<style id="amq-home-legacy-sections-guard-v851">')
route = """\n<script id="amq-home-multiplayer-entry-v20">document.addEventListener('click',e=>{const b=e.target.closest?.('[data-home-action="multiplayer"]');if(!b)return;e.preventDefault();e.stopPropagation();const entry=document.querySelector('#quizMultiplayerOpen');if(entry)entry.click();},true);</script>\n"""
assert "amq-home-multiplayer-entry-v20" not in s
s += route
css=Path("engineering/ui-v20.css").read_text(encoding="utf-8")
assert "amq-osu-home-redesign-v20" in css
assert "amq-osu-home-redesign-v20" not in s
s += "\n"+css+"\n"
p.write_text(s,encoding="utf-8")
print("Proto20 candidate patched")

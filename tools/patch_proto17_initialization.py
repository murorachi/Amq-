#!/usr/bin/env python3
"""Apply the scoped Proto17 observer-loop and workspace-route repair."""
from pathlib import Path
import hashlib

HTML = Path("amq_learning_tool_v82_85_30_workspace_proto17.html")
BASELINE_SHA256 = "3dd33bacf8b4482034150d2a858daa70c9bfc61914a36f7124a50204970c3864"
OLD_SCOPE = "function refreshBatchScope(){const source=$('#batchScopeSummaryV844'),target=$('#wsBatchScopeText');if(!target)return;target.textContent=source?.textContent?.trim()||'尚未取得選取範圍。請先在圖鑑選取作品。'}"
NEW_SCOPE = "function refreshBatchScope(){const source=$('#batchScopeSummaryV844'),target=$('#wsBatchScopeText');if(!target)return;const text=source?.textContent?.trim()||'尚未取得選取範圍。請先在圖鑑選取作品。';if(target.textContent!==text)target.textContent=text}"
START = "if(a==='practiceExplore'||a==='practiceWeak'){"
END = "if(a==='batch-create-list'){"
NEW_ROUTES = """if(['practiceExplore','practiceWeak','practice-self','practice-srs'].includes(a)){
    const modes={'practiceExplore':'explore','practiceWeak':'weak','practice-self':'self','practice-srs':'srs'};
    const mode=modes[a];
    window.__aniSetHomeMenuOpenV846?.(false);
    window.__aniNavigateApp?.('practice');
    window.__aniSetPracticeModeV825?.(mode);
    let button=null;const started=Date.now();
    while(Date.now()-started<2000){button=[...document.querySelectorAll('[data-practice-mode="'+mode+'"]')].find(el=>el.getClientRects().length&&getComputedStyle(el).visibility!=='hidden');if(button)break;await new Promise(resolve=>setTimeout(resolve,50))}
    if(button){if(button.getAttribute('aria-pressed')!=='true')button.click();button.scrollIntoView({behavior:'smooth',block:'center'});const messages={explore:'已開啟探索新歌模式；候選範圍沿用現有學習規則。',weak:'已開啟弱點補強模式；系統弱點與手動補強仍依原有規則分開計算。',self:'已開啟自選練習模式。請自行勾選一份或多份自訂清單，再確認題數與答題目標；不會自動開始練習。',srs:'已開啟間隔複習模式。到期歌曲與每日新卡仍由既有排程管理。'};setStatus(messages[mode],'success')}
    else setStatus('已開啟練習工作台，但未找到可見的 '+({explore:'探索新歌',weak:'弱點補強',self:'自選練習',srs:'間隔複習'}[mode])+' 控制項；未開始練習。','error');
    return
  }
  if(a==='learningCenter'){
    window.__aniNavigateApp?.('home');
    window.__aniSetHomeMenuOpenV846?.(true);
    const group=$('#amqHomePrimaryNav [data-vn49-action="group"][data-group="learning"]');
    if(group){group.click();setStatus('已開啟學習中心選單。','success')}
    else setStatus('找不到既有的學習中心選單入口；未修改任何資料。','error');
    return
  }
  """

def main():
    if not HTML.is_file():
        raise SystemExit(f"FAIL: baseline file missing: {HTML}")
    raw = HTML.read_bytes()
    digest = hashlib.sha256(raw).hexdigest()
    text = raw.decode("utf-8-sig")
    if "<!DOCTYPE html>" not in text[:256] or "AMQ Workspace UI Proto15" not in text:
        raise SystemExit("FAIL: HTML does not match pinned Proto17 baseline")
    already = NEW_SCOPE in text and "if(['practiceExplore','practiceWeak','practice-self','practice-srs'].includes(a))" in text and "if(a==='learningCenter')" in text
    if not already:
        if digest != BASELINE_SHA256:
            raise SystemExit(f"FAIL: baseline SHA-256 mismatch: {digest}")
        if OLD_SCOPE not in text:
            raise SystemExit("FAIL: refreshBatchScope baseline signature changed")
        start = text.index(START)
        end = text.index(END, start)
        text = text.replace(OLD_SCOPE, NEW_SCOPE, 1)
        text = text[:start] + NEW_ROUTES + text[end:]
        HTML.write_text(text, encoding="utf-8")
        print("PASS: observer equality guard and workspace route repair applied")
    else:
        print("PASS: observer and workspace route fixes already present")
    print(f"HTML bytes: {HTML.stat().st_size}")
    print(f"HTML SHA-256: {hashlib.sha256(HTML.read_bytes()).hexdigest()}")

if __name__ == "__main__":
    main()

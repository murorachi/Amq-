from pathlib import Path
import hashlib
import sys

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "dist/amq_learning_tool_v82_85_30_workspace_proto25_stage24.html"
JS = ROOT / "engineering/proto26-song-select/song-select-integration.js"
OUTPUT = ROOT / "dist/amq_learning_tool_v82_85_30_workspace_proto26_song_select_40.html"
EXPECTED_SOURCE_SHA256 = "5a0f18f47fb059427b385484086c66dd14716a03843fcba37f9eb5fe89a7d66f"

def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def main() -> int:
    if not SOURCE.is_file() or not JS.is_file():
        print("FAIL: required source or integration JS is missing")
        return 2
    raw = SOURCE.read_bytes()
    source_hash = sha256(raw)
    if source_hash != EXPECTED_SOURCE_SHA256:
        print(f"FAIL: baseline SHA-256 conflict: {source_hash}")
        return 3
    html = raw.decode("utf-8")
    js = JS.read_text(encoding="utf-8")
    if "const grid = $('#grid'), tabs = ," in js:
        print("FAIL: known malformed tabs declaration still present")
        return 4
    if html.count("</body>") < 1 or "</html>" not in html:
        print("FAIL: source document boundary not found")
        return 5
    marker = '<!-- Proto26 Song Select integration: generated from engineering/proto26-song-select/song-select-integration.js -->'
    if marker in html:
        print("FAIL: integration marker already exists; refusing duplicate injection")
        return 6
    injection = "\n" + marker + "\n<script>\n" + js + "\n</script>\n"
    # The legacy HTML has styles/scripts after its first </body>. Inject at the final
    # document boundary so Proto26 runs after those overrides and event handlers.
    closing_html = html.rfind("</html>")
    if closing_html < 0:
        print("FAIL: final HTML boundary not found")
        return 7
    html = html[:closing_html] + injection + html[closing_html:]
    output_bytes = html.encode("utf-8")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_bytes(output_bytes)
    print(f"BASELINE_SHA256={source_hash}")
    print(f"OUTPUT={OUTPUT.relative_to(ROOT)}")
    print(f"OUTPUT_BYTES={len(output_bytes)}")
    print(f"OUTPUT_SHA256={sha256(output_bytes)}")
    print("BUILD=PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())

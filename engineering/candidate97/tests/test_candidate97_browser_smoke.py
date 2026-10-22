#!/usr/bin/env python3
"""Browser smoke test for the Candidate 97 standalone HTML."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[3]
HTML = ROOT / "amq_learning_tool_v82_85_46_workspace_proto44-list-removal-catalog_97_release.html"

async def main():
    if not HTML.is_file():
        raise SystemExit(f"Candidate HTML missing: {HTML}")
    errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=["--no-sandbox", "--disable-web-security", "--allow-file-access-from-files"],
        )
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        page.on("pageerror", lambda error: errors.append(str(error)))
        await page.goto(HTML.resolve().as_uri(), wait_until="domcontentloaded", timeout=60000)
        await page.wait_for_timeout(1500)
        assert await page.locator("#amqWorkspaceDock [data-ws]").count() == 4
        assert await page.locator("#aniListRemoveImportedBtn").count() == 1
        assert await page.locator("#malRemoveImportedBtn").count() == 1
        assert await page.locator("#vn49RemoveLocalList").count() == 1
        assert await page.locator("#quicktools").evaluate("(e) => getComputedStyle(e).display === 'none'")
        for route in ["catalog", "watchlist", "practice", "home", "catalog"]:
            await page.evaluate("(name) => window.__aniNavigateApp(name)", route)
            await page.wait_for_timeout(100)
            assert await page.locator("#dashboardPanel").count() == 1
            assert await page.locator("#amqWorkspaceDock [data-ws]").count() == 4
        await browser.close()
    if errors:
        raise SystemExit("Uncaught page errors: " + " | ".join(errors))
    print("PASS: Candidate 97 browser smoke test")

if __name__ == "__main__":
    asyncio.run(main())

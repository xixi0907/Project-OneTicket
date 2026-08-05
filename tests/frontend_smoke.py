from pathlib import Path
from playwright.sync_api import sync_playwright


BASE_URL = "http://127.0.0.1:5173"
SCREENSHOT_DIR = Path(r"C:\Users\Joe\Documents\Codex\2026-08-05\xia\work\frontend_qa")
SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)


def assert_no_console_errors(errors):
    relevant = [message for message in errors if "favicon" not in message.lower()]
    assert not relevant, "Browser console errors: " + " | ".join(relevant)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        headless=True,
        executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    )
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    console_errors = []
    page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
    page.on("pageerror", lambda error: console_errors.append(str(error)))

    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    assert page.get_by_role("heading", name="一票入场", exact=True).is_visible()
    assert page.get_by_role("link", name="开始舞台漫游").is_visible()
    page.screenshot(path=SCREENSHOT_DIR / "home-desktop.png", full_page=True)

    page.get_by_role("link", name="开始舞台漫游").click()
    page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="绛雪 热爱舞台的追光者").click()
    page.get_by_role("button", name="确认形象，领取戏票").click()
    page.wait_for_url("**/lobby")
    assert page.get_by_role("heading", name="今晚，领哪一张戏票？").is_visible()
    page.get_by_role("link", name="持票入场").click()
    page.wait_for_url("**/tickets/*")
    assert page.get_by_text("加入舞台护照").or_(page.get_by_text("已加入舞台护照")).is_visible()

    page.goto(f"{BASE_URL}/tickets/1726")
    page.wait_for_load_state("networkidle")
    assert page.get_by_text("当前暂未检出可确认关联").first.is_visible()
    assert page.get_by_text("以上为基于戏单字段的推荐").is_visible()

    page.goto(f"{BASE_URL}/tickets/1954")
    page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="查看证据").click()
    assert page.get_by_role("heading", name="已审核文化关系").is_visible()
    page.locator(".drawer-close").click()

    page.goto(f"{BASE_URL}/people")
    page.wait_for_load_state("networkidle")
    assert page.get_by_role("heading", name="灯亮之前，他们在这里").is_visible()
    page.locator(".person-card").first.click()
    page.wait_for_url("**/people/*")
    assert page.get_by_text("人物戏单时间线").is_visible()

    page.goto(f"{BASE_URL}/shanghai")
    page.wait_for_load_state("networkidle")
    assert page.get_by_role("heading", name="虚拟上海").is_visible()
    assert page.get_by_role("button", name="兰心大戏院").is_visible()

    page.goto(f"{BASE_URL}/passport")
    page.wait_for_load_state("networkidle")
    assert page.get_by_role("heading", name="我的舞台护照").is_visible()
    assert page.get_by_text("绛雪").is_visible()

    mobile = browser.new_page(viewport={"width": 390, "height": 844})
    mobile.goto(BASE_URL)
    mobile.wait_for_load_state("networkidle")
    mobile.screenshot(path=SCREENSHOT_DIR / "home-mobile.png", full_page=True)
    assert mobile.get_by_role("button", name="打开导航").is_visible()
    mobile.get_by_role("button", name="打开导航").click()
    assert mobile.get_by_role("link", name="全部戏单", exact=True).is_visible()

    assert_no_console_errors(console_errors)
    mobile.close()
    browser.close()

print("Frontend smoke tests passed")

import { chromium } from "playwright";
import path from "node:path";

const shotDir = "C:/Users/acer/AppData/Local/Temp/claude/c--Users-acer-Documents-GitHub-boutique-en-ligne/f9e3e055-aafc-4019-ad0d-de21b91c2f7a/scratchpad/shots";
const base = "http://localhost:3000";
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();

const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(`[console] ${m.text()}`); });
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`));
page.on("requestfailed", (r) => errors.push(`[requestfailed] ${r.url()}`));

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.screenshot({ path: path.join(shotDir, "dark-01-hero.png") });

await page.mouse.wheel(0, 1050);
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(shotDir, "dark-02-promo-categories.png") });

await page.mouse.wheel(0, 1100);
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(shotDir, "dark-03-collection.png") });

await page.goto(`${base}/boutique/hoodie-oversize-essential-noir`, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(shotDir, "dark-04-detail.png") });

await page.goto(`${base}/admin/login`, { waitUntil: "networkidle" });
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(shotDir, "dark-05-admin-login.png") });

console.log("Errors:", errors.length);
errors.forEach((e) => console.log(e));
await browser.close();

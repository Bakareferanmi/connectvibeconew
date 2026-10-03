import { chromium } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";

const browser = await chromium.launch({
  executablePath:
    "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell",
  args: ["--no-sandbox", "--disable-gpu"],
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto("file:///workspace/.grok/og-card.html", { waitUntil: "load" });
await page.locator("#card").screenshot({ path: "/workspace/.grok/card-raw.png" });

const svg = readFileSync("/workspace/.grok/favicon.svg.tmp", "utf8");
const fav = `<!DOCTYPE html>
<html><body style="margin:0;background:#bbb">
  <div id="wrap" style="display:flex;align-items:end;gap:20px;padding:20px;background:#9aa">
    <div id="i16" style="width:16px;height:16px">${svg}</div>
    <div id="i32" style="width:32px;height:32px">${svg}</div>
    <div id="i64" style="width:64px;height:64px">${svg}</div>
    <div id="i128" style="width:128px;height:128px">${svg}</div>
  </div>
  <style>
    #wrap svg { width: 100%; height: 100%; display: block; }
  </style>
</body></html>`;
writeFileSync("/workspace/.grok/favicon-preview.html", fav);
await page.setViewportSize({ width: 500, height: 220 });
await page.goto("file:///workspace/.grok/favicon-preview.html", { waitUntil: "load" });
await page.locator("#wrap").screenshot({ path: "/workspace/.grok/favicon-preview.png" });
await page.locator("#i16").screenshot({ path: "/workspace/.grok/favicon-16.png" });
await page.locator("#i64").screenshot({ path: "/workspace/.grok/favicon-64.png" });
await browser.close();
console.log("rendered");

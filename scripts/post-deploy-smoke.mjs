#!/usr/bin/env node
/**
 * scripts/post-deploy-smoke.mjs — the 10th non-negotiable gate.
 *
 * Usage:  node scripts/post-deploy-smoke.mjs <deployed-url>
 *
 * What it does (against a REAL deployed preview, not dev server):
 *   1. Opens the URL in headless chromium via Playwright.
 *   2. Waits for 'networkidle' (full hydration).
 *   3. Asserts document.body.innerText.length > 100.
 *   4. Asserts the browser console had ZERO errors of severity 'error'
 *      (and no uncaught page errors).
 *   5. Takes a full-page screenshot into .smoke/<commit-sha>.png.
 *
 * Fails with non-zero exit on any assertion. This is the gate that would
 * have caught the task 057 white-on-white silent failure.
 */
import { chromium } from 'playwright';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = process.argv[2];
if (!url) {
  console.error('[post-deploy-smoke] missing <deployed-url> argument');
  console.error('  usage: node scripts/post-deploy-smoke.mjs https://<preview>.vercel.app');
  process.exit(2);
}

let sha = 'local';
try {
  sha = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
} catch {
  // not a git context — fall back to 'local'
}

const smokeDir = resolve(__dirname, '..', '.smoke');
mkdirSync(smokeDir, { recursive: true });
const screenshotPath = resolve(smokeDir, `${sha}.png`);

const consoleErrors = [];
const pageErrors = [];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => pageErrors.push(err.message));

let response;
try {
  response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
} catch (err) {
  console.error(`[post-deploy-smoke] navigation failed: ${err.message}`);
  await browser.close();
  process.exit(1);
}

if (!response || !response.ok()) {
  console.error(
    `[post-deploy-smoke] non-2xx response: ${response ? response.status() : 'no response'}`,
  );
  await browser.close();
  process.exit(1);
}

const bodyTextLength = await page.evaluate(() => document.body.innerText.length);
await page.screenshot({ path: screenshotPath, fullPage: true });

await browser.close();

let failed = false;
if (bodyTextLength <= 100) {
  console.error(
    `[post-deploy-smoke] FAIL: document.body.innerText.length = ${bodyTextLength} (expected > 100)`,
  );
  failed = true;
}
if (consoleErrors.length > 0) {
  console.error('[post-deploy-smoke] FAIL: console errors detected:');
  for (const e of consoleErrors) console.error(`  - ${e}`);
  failed = true;
}
if (pageErrors.length > 0) {
  console.error('[post-deploy-smoke] FAIL: uncaught page errors detected:');
  for (const e of pageErrors) console.error(`  - ${e}`);
  failed = true;
}

if (failed) {
  console.error(`[post-deploy-smoke] screenshot saved to ${screenshotPath}`);
  process.exit(1);
}

console.log(
  `[post-deploy-smoke] OK — bodyTextLength=${bodyTextLength}, console clean, screenshot=${screenshotPath}`,
);

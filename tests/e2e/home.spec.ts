import { test, expect } from '@playwright/test';

test('home page renders foundation-green placeholder', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');
  await expect(page.locator('h1')).toContainText('blueprint-sequel rep 1 — foundation green');
  expect(errors).toEqual([]);
});

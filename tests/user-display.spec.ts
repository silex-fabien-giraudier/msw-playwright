import { expect, test } from '@playwright/test';

test('displays user data from mocked API', async ({ page }) => {
  await page.addInitScript(() => {
    (window as any).PLAYWRIGHT = true;
  });

  await page.goto('/');

  await expect(page.locator('text=Loading user data...')).toBeHidden({ timeout: 10000 });

  await expect(page.locator('text=Alice')).toBeVisible();

  await expect(page.locator('text=admin')).toBeVisible();
  await expect(page.locator('h2:has-text("User Information")')).toBeVisible();
  await expect(page.locator('text=Name:')).toBeVisible();
  await expect(page.locator('text=Role:')).toBeVisible();
}); 
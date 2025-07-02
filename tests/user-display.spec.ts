import { expect, test } from '@playwright/test';

test('displays user data from mocked API', async ({ page }) => {
  // Set the PLAYWRIGHT flag before navigation
  await page.addInitScript(() => {
    (window as any).PLAYWRIGHT = true;
  });

  // Navigate to the app
  await page.goto('/');

  // Wait for the loading state to disappear
  await expect(page.locator('text=Loading user data...')).toBeHidden({ timeout: 10000 });

  // Assert that Alice's name is visible
  await expect(page.locator('text=Alice')).toBeVisible();

  // Additional assertions for completeness
  await expect(page.locator('text=admin')).toBeVisible();
  await expect(page.locator('h2:has-text("User Information")')).toBeVisible();
  await expect(page.locator('text=Name:')).toBeVisible();
  await expect(page.locator('text=Role:')).toBeVisible();
}); 
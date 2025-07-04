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

test('displays correct page title and static content', async ({ page }) => {
  await page.addInitScript(() => {
    (window as any).PLAYWRIGHT = true;
  });

  await page.goto('/');

  // Vérifier le titre de la page
  await expect(page.locator('h1:has-text("MSW + Playwright Demo")')).toBeVisible();
  
  // Vérifier le contenu statique
  await expect(page.locator('text=This is a demo application with MSW')).toBeVisible();
  await expect(page.locator('text=Mock Service Worker')).toBeVisible();
  await expect(page.locator('text=Playwright testing')).toBeVisible();
});

import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('http://localhost:3001/login');
});

test.describe('Login user', () => {
  test('should not be logged in', async () => {
    await page.locator('#email').fill('barry@gmail.com');
    await page.locator('#password').fill('azeertt');
    await page.click('button[type="submit"]');
    await page.waitForSelector('[class="go2072408551"]');
    const msgSuccess = await page.$eval('[class="go2072408551"]', (element) => element.textContent);

    expect(msgSuccess).toContain('Erreur de connexion. Vérifiez vos identifiants.');
  });

  test('should be logged in', async () => {
    await page.locator('#email').fill('barry@gmail.com');
    await page.locator('#password').fill('@RamatouBah52#');
    await page.click('button[type="submit"]');
  });
});

import type { Page } from '@playwright/test';
import { test } from '@playwright/test';

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('http://localhost:3001/login');
});

test.describe('Logout user', () => {
  test('should be logged in', async () => {
    await page.locator('#email').fill('barry@gmail.com');
    await page.locator('#password').fill('@RamatouBah52#');
    await page.click('button[type="submit"]');
  });
  test('should be logout in', async () => {
    const menuLink = page.locator('#menu_user');
    await menuLink.click();
    const logoutLink = page.locator('#logout');
    await logoutLink.click();
  });
});

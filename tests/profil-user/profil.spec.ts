import type { Page } from '@playwright/test';
import { test } from '@playwright/test';

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('http://localhost:3001/login');
});

//Test profil user
test.describe('Profil user', () => {
  test('should be logged in', async () => {
    await page.locator('#email').fill('barry@gmail.com');
    await page.locator('#password').fill('@RamatouBah52#');
    await page.click('button[type="submit"]');
  });

  test('should be profil user in', async () => {
    const menuLink = page.locator('#menu_user');
    await menuLink.click();
    const logoutLink = page.locator('#profil_link');
    await logoutLink.click();
  });
});

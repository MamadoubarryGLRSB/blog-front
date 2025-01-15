import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
let page: Page;

//lance l'application
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('http://localhost:3001');
});

//Test navigation
test.describe('Navigation (E2E)', () => {
  test('should go to about page', async () => {
    const aboutLink = page.locator('#nav_about');

    await aboutLink.click();

    await expect(page).toHaveURL('http://localhost:3001/about');
  });
  test('should go to contact page', async () => {
    const contactLink = page.locator('#nav_contact');

    await contactLink.click();

    await expect(page).toHaveURL('http://localhost:3001/contact');
  });
  test('should go to article page', async () => {
    const articleLink = page.locator('#nav_article');

    await articleLink.click();

    await expect(page).toHaveURL('http://localhost:3001/articles');
  });
  test('should go to menu user ', async () => {
    const menuLink = page.locator('#menu_user');

    await menuLink.click();
  });
});

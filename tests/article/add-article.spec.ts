import { test } from '@playwright/test';

test('should login and create a new article', async ({ page }) => {
  // Connexion initiale
  await page.goto('http://localhost:3001/login');
  await page.locator('#email').fill('barry@gmail.com');
  await page.locator('#password').fill('@RamatouBah52#');
  await page.click('button[type="submit"]');

  // Attendre que l'authentification soit complète
  await page.waitForFunction(() => {
    const auth = localStorage.getItem('auth');
    return auth !== null && JSON.parse(auth).accessToken !== '';
  });

  // Aller à la page des articles
  await page.goto('http://localhost:3001/articles');

  // Cliquer sur le bouton pour ajouter un article (en utilisant le texte du bouton)
  await page.click('text=Ajouter un article');

  // Attendre que le formulaire soit chargé
  await page.waitForSelector('form', { state: 'visible' });

  // Remplir le formulaire
  await page.fill('#title', 'Test Article Title');
  await page.fill('#content', 'This is a test article content created by Playwright');

  // Sélectionner quelques tags (en supposant qu'il y en a)
  const firstTagCheckbox = await page.locator('input[name="tagIds"]').first();
  if (await firstTagCheckbox.isVisible()) {
    await firstTagCheckbox.click();
  }

  // Cocher la case "Publier"
  await page.check('#published');

  // Soumettre le formulaire
  await page.click('button[type="submit"]');

  // Attendre que la toast de succès apparaisse
  await page.waitForFunction(() => {
    return document.body.textContent?.includes('Article créé avec succès');
  });

  // Attendre la redirection vers la page des articles
  await page.waitForURL('http://localhost:3001/articles');

  // Vérifier que nous sommes bien sur la page des articles
  await page.waitForFunction(() => {
    return window.location.pathname === '/articles';
  });
});

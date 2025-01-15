import { test } from '@playwright/test';

test('should login, like/unlike and comment on an article', async ({ page }) => {
  // Connexion initiale
  await page.goto('http://localhost:3001/login');
  await page.locator('#email').fill('barry@gmail.com');
  await page.locator('#password').fill('@RamatouBah52#');
  await page.click('button[type="submit"]');

  // Attendre que l'authentification soit complète et stockée dans localStorage
  await page.waitForFunction(() => {
    const auth = localStorage.getItem('auth');
    return auth !== null && JSON.parse(auth).accessToken !== '';
  });

  // Aller à la page des articles et ouvrir le modal
  await page.goto('http://localhost:3001/articles');

  // Attendre que la page des articles soit chargée
  await page.waitForFunction(() => {
    return document.querySelector('#detail-article') !== null;
  });

  await page.click('#detail-article');

  // S'assurer que le modal est chargé avant d'interagir
  await page.waitForFunction(() => {
    return document.querySelector('#like-button') !== null && document.querySelector('#comment-input') !== null;
  });

  // Actions sur l'article
  await page.click('#like-button');
  await page.waitForTimeout(2000); // Augmenté le temps d'attente

  await page.click('#unlike-button');
  await page.waitForTimeout(2000);

  // S'assurer que le champ de commentaire est bien visible et interactif
  await page.waitForSelector('#comment-input', { state: 'visible' });
  await page.fill('#comment-input', 'Ceci est un commentaire de test');

  // S'assurer que le bouton submit est cliquable
  await page.waitForSelector('#submit-comment', { state: 'visible' });
  await page.click('#submit-comment');
  await page.waitForTimeout(2000); // Attendre que le commentaire soit soumis

  // Fermer la modal pour terminer proprement
  await page.click('#close-modal');
  await page.waitForTimeout(1000);
});

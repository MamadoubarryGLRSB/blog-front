import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    baseURL: 'http://localhost:3001', // Mis à jour pour utiliser le port 3001
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  webServer: {
    command: 'npm run start',
    port: 3001,
    reuseExistingServer: !process.env.CI
  }
});

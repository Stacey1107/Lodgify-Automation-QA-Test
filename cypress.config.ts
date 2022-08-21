import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    slowTestThreshold: 15000,
  },
  retries: {
    runMode: 3,
  },
});

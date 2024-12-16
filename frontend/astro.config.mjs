// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4322,
    host: true
  },
  site: 'https://starter-astro.ddev.site',
});

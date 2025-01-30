// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321,
    host: true
  },
  site: 'https://starter-astro.ddev.site',
  integrations: [vue()],
  output: 'server'
});

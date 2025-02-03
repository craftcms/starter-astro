// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321,
    host: true
  },
  integrations: [vue()],
  output: 'server',
  vite: {
    server: {
      hmr: {
        protocol: 'ws'  // Use WebSocket protocol
      },
      host: '0.0.0.0',
      strictPort: true,
      cors: true,
      origin: 'https://starter-astro.ddev.site',
      allowedHosts: ['starter-astro.ddev.site', '.ddev.site']
    }
  }
});

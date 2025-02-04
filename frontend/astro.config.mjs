// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  vite: {
    server: {
      hmr: {
        protocol: 'wss',
        host: 'starter-astro.ddev.site',
        clientPort: 443,
      },
      host: '0.0.0.0',
    },
  },
});

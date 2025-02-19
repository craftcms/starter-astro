// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    vue(),
  ],
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        protocol: 'wss',
        host: 'starter-astro.ddev.site',
        clientPort: 443,
      },
      host: '0.0.0.0'
    },
  },
});

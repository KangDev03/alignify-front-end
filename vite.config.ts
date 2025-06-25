import path from 'path';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

import { host } from './src/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      process: 'process/browser',
      buffer: 'buffer',
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api/v1': {
        target: host,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

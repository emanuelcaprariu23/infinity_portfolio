import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // depending on your application, base can also be "/"
  base: './',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    port: 3000,
    //   headers: {
    //   'Content-Security-Policy': [
    //     "default-src 'self'",
    //     "script-src 'self' 'unsafe-eval'",       // unsafe-eval needed for Vite HMR in dev
    //     "style-src 'self' 'unsafe-inline'",
    //     "img-src 'self' data: blob: https:",
    //     "connect-src 'self' ws://localhost:*",    // Vite websocket HMR
    //     "font-src 'self'",
    //   ].join('; '),
    // },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
});

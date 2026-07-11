import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./app/__tests__/setup.ts'],
    css: true,
    exclude: ['**/node_modules/**', '**/app/e2e/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
  // Ensure the Next.js compiler runs during tests so React 19/Compiler code
  // is transformed consistently with the production build.
  esbuild: {
    jsx: 'automatic',
  },
});

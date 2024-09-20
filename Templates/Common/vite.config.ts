import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(), svgr()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'common-components',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router-dom',
        'zustand',
        '@tanstack/react-query',
        '@tonconnect/ui-react',
        'stripe',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          zustand: 'Zustand',
          '@tanstack/react-query': 'TanstackReactQuery',
          '@tonconnect/ui-react': 'TonConnectUI',
          stripe: 'Stripe',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});

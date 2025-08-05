import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import open from 'vite-plugin-open';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';

  return {
    server: {
      open: false, // disable default open
      port: 3000,
      host: true
    },
    plugins: [
      react(),
      jsconfigPaths(),
      open({ path: '/login' }) // open directly to /login
    ],
    define: {
      global: 'window'
    },
    base: isProduction ? './' : '/'
  };
});

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';

  return {
    server: {
      open: true,
      port: 3000,
      host: true
    },
    preview: {
      open: true,
      host: true
    },
    define: {
      global: 'window'
    },
    base: isProduction ? './' : '/', // ✅ important
    plugins: [react(), jsconfigPaths()]
  };
});

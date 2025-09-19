import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_APP_BASE_NAME || '/';
  const PORT = 3000;

  return {
    base,
    server: {
      open: true,
      port: PORT,
      host: true,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3001', // Your API server
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port: PORT,
      host: true,
      strictPort: true,
    },
    define: {
      'process.env': { ...env, BASE_URL: JSON.stringify(base) },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [react(), jsconfigPaths()],
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  };
});

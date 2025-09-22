import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/datas/',
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // FIX: Replace `path.resolve(__dirname, '.')` with `path.resolve('.')` to avoid using `__dirname`,
          // which is not defined in an ES module context and causes a "Cannot find name" error.
          // This correctly resolves to the project root when running Vite.
          '@': path.resolve('.'),
        }
      }
    };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/patrol-tracker/', // Make sure this matches your repository name
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});

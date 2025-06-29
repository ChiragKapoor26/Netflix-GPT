import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Use absolute paths for Firebase Hosting
  build: {
    outDir: 'dist', // Ensure output to dist
  },
});
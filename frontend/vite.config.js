import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Explicitly set the root to the project directory (where index.html is)
  publicDir: 'public', // Explicitly set the public directory for static assets
  build: {
    outDir: 'dist', // Ensure build output goes to dist/
    rollupOptions: {
      input: 'index.html', // Use root-level index.html as the entry point
    },
  },
  server: {
    host: '0.0.0.0', // Allows access from other devices on the network
    port: 4002,
    strictPort: true, // Ensures the server runs on the specified port
  },
});
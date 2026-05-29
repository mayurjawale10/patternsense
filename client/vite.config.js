import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    cssMinify: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Vite 8 / Rolldown requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/@monaco-editor') || id.includes('node_modules/monaco-editor')) {
            return 'vendor-monaco';
          }
          if (id.includes('node_modules/firebase')) {
            return 'vendor-firebase';
          }
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3')) {
            return 'vendor-charts';
          }
          if (id.includes('node_modules/konva') || id.includes('node_modules/react-konva')) {
            return 'vendor-canvas';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/zustand') || id.includes('node_modules/axios')) {
            return 'vendor-state';
          }
        },
      },
    },
  },
});

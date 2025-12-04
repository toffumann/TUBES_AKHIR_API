// vite.config.js - Manual config
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  
  // Penting untuk AdonisJS
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'localhost',
      protocol: 'ws'
    }
  },
  
  build: {
    manifest: true,
    rollupOptions: {
      input: 'resources/js/app.tsx'
    }
  },
  
  resolve: {
    alias: {
      '~': '/resources/js',
      '@': '/resources/js'
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: '/mood-tracker/', // Base path for GitHub Pages
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      '5173-iqjpdrk2puhcov0gttf3z-8b020ca9.manusvm.computer',
      'localhost',
      '127.0.0.1'
    ]
  }
})


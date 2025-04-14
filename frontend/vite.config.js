import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    watch: {
      usePolling: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Use local backend during development
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // Add another proxy rule for production if needed
      '/prod-api': {
        target: 'https://my-shops-with-react-backend.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/prod-api/, '')
      }
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    // Get rid of the CORS error
    proxy: {
      '/v1': {
        target: 'https://posivibes-v2.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

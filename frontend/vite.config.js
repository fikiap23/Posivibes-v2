import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { apiUrl } from './src/utils/baseURL'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    // Get rid of the CORS error
    proxy: {
      '/v1': {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

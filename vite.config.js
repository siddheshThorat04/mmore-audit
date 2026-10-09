import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  // local dev: forward /api to Frappe so there is no CORS problem
  server: { proxy: { '/api': { target: 'https://app.mmore.works', changeOrigin: true } } }
})

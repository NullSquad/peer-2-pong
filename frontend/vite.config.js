import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

const { BACKEND_PORT, FRONTEND_PORT } = process.env

export default defineConfig({
  plugins: [preact()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: `http://backend:${BACKEND_PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: parseInt(FRONTEND_PORT, 10) || 3000,
  },
})
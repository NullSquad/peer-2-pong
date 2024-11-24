import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

const { BACKEND_PORT, PORT } = process.env

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
    port: parseInt(PORT, 10) || 3000,
  },
})
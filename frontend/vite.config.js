import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: `http://backend:${process.env.BACKEND_PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: parseInt(process.env.FRONTEND_PORT, 10) || 3000,
  },
})
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

const { API_URI = "", PORT = 3000 } = process.env

export default defineConfig({
  plugins: [preact()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: API_URI,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: parseInt(PORT, 10),
  },
})

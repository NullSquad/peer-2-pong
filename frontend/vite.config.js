import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  plugins: [preact()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: parseInt(process.env.FRONTEND_PORT, 10) || 3000
  }
})
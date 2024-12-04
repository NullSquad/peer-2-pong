import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

const { VITE_API_URI = "", PORT = 3000 } = process.env;

export default defineConfig({
  plugins: [preact()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/auth": {
        target: API_URI,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, "/auth"),
      },
    },
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: parseInt(PORT, 10),
  },
});

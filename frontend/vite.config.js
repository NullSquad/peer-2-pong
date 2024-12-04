import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

const { PORT = 3000 } = process.env;

export default defineConfig({
  plugins: [preact()],
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: parseInt(PORT, 10),
  },
});

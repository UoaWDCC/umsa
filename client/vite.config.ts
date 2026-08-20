import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // stamps the seed so a new build discards a visitor's cached copy
  define: { __SEED_VERSION__: JSON.stringify(String(Date.now())) },
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:5050",
    },
  },
});

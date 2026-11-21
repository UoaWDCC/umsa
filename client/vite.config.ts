import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const serverDir = fileURLToPath(new URL("../server/", import.meta.url));
  const rootDir = fileURLToPath(new URL("../", import.meta.url));
  const envDir = existsSync(`${serverDir}.env`) ? serverDir : rootDir;
  const port = process.env.PORT || loadEnv(mode, envDir, "PORT").PORT || "5050";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": process.env.API_PROXY_TARGET || `http://localhost:${port}`,
      },
    },
  };
});

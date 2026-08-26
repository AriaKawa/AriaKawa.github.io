import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "../scraproad",
    emptyOutDir: true,
    sourcemap: false,
  },
});

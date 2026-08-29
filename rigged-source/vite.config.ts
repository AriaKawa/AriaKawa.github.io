import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "../rigged",
    emptyOutDir: true,
    sourcemap: false,
  },
});

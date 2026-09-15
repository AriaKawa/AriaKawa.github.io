import { defineConfig } from "vite";

export default defineConfig({
  // The 0.16 Colyseus ESM graph is already browser-native. Skipping dev-time
  // prebundling also avoids Windows sandbox traversal outside this workspace.
  optimizeDeps: {
    noDiscovery: true,
    include: ["phaser"]
  },
  server: { fs: { allow: [".."] } }
});

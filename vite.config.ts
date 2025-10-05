import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // <- Alias für src/
    },
  },
  server: {
    port: 8080,
    strictPort: true,
  },
});

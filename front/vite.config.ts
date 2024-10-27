import { defineConfig } from "vite";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
});

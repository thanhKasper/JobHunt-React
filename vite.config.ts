import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
    },
  },
  plugins: [react(), tailwindcss()],
});

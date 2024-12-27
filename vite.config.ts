import styleX from "vite-plugin-stylex";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [styleX(), TanStackRouterVite(), react()],
});

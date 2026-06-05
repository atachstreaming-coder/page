import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Esto es lo que se había borrado
  nitro: {
    preset: "vercel",
  },
});
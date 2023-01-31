import { defineConfig } from "vite";

export default defineConfig({
  test: {
    watch: false,
    setupFiles: ["./vitest.setup.ts"],
  },
});

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./app/__tests__/setup.ts"],
    css: true,
    exclude: ["**/node_modules/**", "**/app/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "test-results/coverage",
    },
  },
  // Ensure the Next.js compiler runs during tests so React 19/Compiler code
  // is transformed consistently with the production build.
  esbuild: {
    jsx: "automatic",
  },
});

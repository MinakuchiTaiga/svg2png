import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    passWithNoTests: true,
    exclude: ["e2e/**", "node_modules/**", "dist/**"],
    coverage: {
      provider: "v8",
      include: [
        "src/convert/**/*.ts",
        "src/download/**/*.ts",
        "src/ui/dom.ts",
        "src/ui/view.ts",
        "src/utils/**/*.ts",
      ],
      exclude: ["**/*.test.ts"],
      thresholds: {
        lines: 85,
        statements: 85,
        functions: 85,
        branches: 85,
      },
    },
  },
});

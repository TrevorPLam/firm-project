import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import zodPlugin from "eslint-plugin-zod";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  zodPlugin.configs.recommended,
  prettierConfig,
  {
    rules: {
      // Keep the rule active but allow quotes/apostrophes in static marketing copy.
      // Forbid only characters that are genuinely risky in JSX text.
      "react/no-unescaped-entities": ["error", { forbid: [">", "}", "]"] }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

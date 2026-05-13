import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

const eslintConfig = defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "node_modules/**"]),
  {
    files: ["**/*.{js,jsx,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // Amb React 17+ no cal importar React a cada fitxer
      "react/react-in-jsx-scope": "off",
      // Next gestiona els links amb el seu component
      "react/no-unescaped-entities": "off",
      // No exigir prop-types (no fem servir TypeScript però tampoc PropTypes)
      "react/prop-types": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
]);

export default eslintConfig;

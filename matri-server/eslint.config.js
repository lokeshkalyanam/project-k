import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * Dynamically import the eslint-plugin-import to handle ES module resolution.
 * @type {import("eslint-plugin-import")}
 */
const importPlugin = await import("eslint-plugin-import");

/**
 * ESLint configuration array.
 * 
 * - Includes recommended rules for both JavaScript and TypeScript.
 * - Configures ESLint to ignore common build and dependency folders.
 * - Sets up ESLint to work with modern TypeScript settings.
 * - Adds plugin and rules for handling import statements more effectively.
 * 
 * @type {import("eslint").Linter.FlatConfig[]}
 */
export default [
  // Use ESLint's base recommended JavaScript rules
  js.configs.recommended,

  // Apply TypeScript-specific recommended rules
  ...tseslint.configs.recommended,

  {
    /**
     * Files/directories to be ignored by the linter.
     */
    ignores: ["dist", "node_modules"],

    /**
     * ESLint plugins used in this configuration.
     * Here we use eslint-plugin-import for handling import-related rules.
     */
    plugins: {
      import: importPlugin.default,
    },

    /**
     * Parser options for TypeScript.
     * - project: points to the tsconfig file.
     * - sourceType: defines the type of module system.
     */
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },

    /**
     * Custom linting rules.
     * - no-console: warn when console logs are used.
     * - no-unused-vars: warn on unused variables, ignore `_` prefixed args.
     * - import/no-duplicates: error on duplicate imports.
     */
    rules: {
      "no-console": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "import/no-duplicates": "error",
    },
  },
];

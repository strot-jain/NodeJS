import js from "@eslint/js";
import globals from "globals";
import eslintPluginImport from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
       "semi": ["error", "always"],
    },
  },
];

import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
  {
    //extends: ['eslint:recommended', '@electron-toolkit', '@electron-toolkit/eslint-config-prettier'],
    plugins: {
      "@stylistic/js": stylisticJs
    },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-unused-vars": "warn",
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/quotes": ["warn", "double"],
      "@stylistic/js/semi": ["error", "always"],
      "@stylistic/js/keyword-spacing": ["warn", {
        "overrides": {
          "if": { "after": false },
          "for": { "after": false },
          "while": { "after": false },
        }
      }]
    }

  }
];
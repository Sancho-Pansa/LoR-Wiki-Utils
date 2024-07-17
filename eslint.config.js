import pluginVue from "eslint-plugin-vue";

export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
  {
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      "no-unused-vars": "warn",
      "indent": ["error", 2],
      "quotes": ["warn", "double"],
      "semi": ["error", "always"],
      "keyword-spacing": ["warn", {
        "overrides": {
          "if": { "after": false },
          "for": { "after": false },
          "while": { "after": false },
          "catch": { "after": false }
        }
      }],
      "newline-per-chained-call": [
        "warn", { "ignoreChainWithDepth": 3 }
      ],
      "vue/max-attributes-per-line": [
        "warn", {
          "singleline": {
            "max": 3
          }
        }
      ]
    }
  }
];
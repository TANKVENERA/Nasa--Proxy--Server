const security = require("eslint-plugin-security");
const promise = require("eslint-plugin-promise");
const configPrettier = require("eslint-config-prettier");

module.exports = [
  {
    plugins: {
      security,
      promise,
    },
    rules: {
      //* Semicolons
      "semi-spacing": "error",
      semi: "warn",
      //* Best Practices
      "no-invalid-this": "error",
      "no-return-assign": "error",
      "no-unused-expressions": ["error", { allowTernary: true }],
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "no-constant-condition": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "req|res|next|__" }],
      //* Enhance Readability
      indent: ["error", 2, { SwitchCase: 1 }],
      "no-mixed-spaces-and-tabs": "warn",
      "space-before-blocks": "error",
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      quotes: ["error", "single"],
      //* Security plugin
      "security/detect-bidi-characters": "warn",
      "security/detect-eval-with-expression": "warn",
      "security/detect-non-literal-require": "warn",
      //* Promise plugin
      "promise/prefer-await-to-then": "warn",
    },
  },
  configPrettier,
];

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier",
    "simple-import-sort",
    "jsx-a11y",
  ],
  rules: {
    "simple-import-sort/exports": "error",
    "import/prefer-default-export": "off",

    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "react/jsx-no-useless-fragment": "off",
    "import/extensions": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "warn",
    "react/button-has-type": "warn",
    "react/require-default-props": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-indent": ["error", 2, { "checkAttributes": true, "indentLogicalExpressions": true }],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-max-props-per-line": ["error", { "maximum": { "single": 2, "multi": 1 } }],
    "react/jsx-first-prop-new-line": ["error", "multiline"],

    "no-trailing-spaces": ["error", { "skipBlankLines": false, "ignoreComments": false }],
    "semi": ["error", "always"],
    "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
    "jsx-quotes": ["error", "prefer-double"],
    "comma-dangle": ["error", "only-multiline"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {}
    },
  },
};

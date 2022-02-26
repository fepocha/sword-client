module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    "prettier",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    "prettier",
    "simple-import-sort",
  ],
  rules: {
    "simple-import-sort/exports": "error",

    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/no-array-index-key": "warn",
    "react/button-has-type": "warn",
    "react/require-default-props": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    "no-trailing-spaces": ["error", { "skipBlankLines": false, "ignoreComments": false }]
  },
};

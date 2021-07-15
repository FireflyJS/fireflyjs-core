module.exports = {
  extends: ["airbnb-typescript/base", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    quotes: "off",
    "@typescript-eslint/quotes": [
      "error",
      "double",
      { allowTemplateLiterals: true },
    ],
    "no-console": "off",
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
    "no-useless-escape": "off",
    "no-control-regex": "off",
  },
};

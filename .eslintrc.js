module.exports = {
  extends: ["airbnb-typescript/base", "prettier"],
  parserOptions: {
    project: `./tsconfig.json`,
  },
  rules: {
    quotes: "off",
    "@typescript-eslint/quotes": [
      "error",
      "double",
      { allowTemplateLiterals: true },
    ],
    "no-console": "off",
  },
};

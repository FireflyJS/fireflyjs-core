module.exports = {
  extends: ["airbnb-typescript/base", "plugin:prettier/recommended"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["prettier"],
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
    "import/no-cycle": "off",
    "max-classes-per-file": "off",
  },
};

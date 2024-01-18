/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/vercel-next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};

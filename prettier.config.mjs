module.exports = {
  useTabs: true,
  singleQuote: true,
  trailingComma: "none",
  printWidth: 100,
  plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  pluginSearchDirs: ["."],
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
      },
    },
  ],
  semi: false,
  bracketSameLine: true,
  tabWidth: 2,
  bracketSpacing: false,
  arrowParens: "always",
  singleAttributePerLine: true,
};

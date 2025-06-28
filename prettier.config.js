/** @type {import("prettier").Config} */
export default {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',

  overrides: [
    {
      files: ['*.js', '*.jsx'],
      options: { parser: 'babel' },
    },
    {
      files: ['*.md', '*.mdx'],
      options: { parser: 'markdown', proseWrap: 'always' },
    },
    {
      files: ['*.json', '.prettierrc'],
      options: { parser: 'json', printWidth: 80 },
    },
    {
      files: ['*.yaml', '*.yml'],
      options: { parser: 'yaml', singleQuote: false },
    },
    {
      files: ['*.css', '*.scss', '*.less'],
      options: { parser: 'css' },
    },
    {
      files: ['*.html', '*.svg'],
      options: { parser: 'html' },
    },
  ],
};

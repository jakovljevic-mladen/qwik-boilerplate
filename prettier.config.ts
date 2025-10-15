import { Config } from "prettier";

const config: Config = {
  plugins: ['prettier-plugin-tailwindcss'],
  tabWidth: 2,
  printWidth: 100,
  singleQuote: true,
  endOfLine: 'auto',
  trailingComma: 'all',
  bracketSameLine: true,
  arrowParens: 'avoid'
};

export default config;

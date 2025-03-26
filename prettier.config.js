import orgImport from 'prettier-plugin-organize-imports';
import packageJson from 'prettier-plugin-packagejson';
import sortJson from 'prettier-plugin-sort-json';

const config = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  requirePragma: false,
  insertPragma: false,
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  experimentalOperatorPosition: 'start',
  experimentalTernaries: false,
  bracketSameLine: false,
  tabWidth: 2,
  printWidth: 100,
  proseWrap: 'always',
  useTabs: false,
  overrides: [],
  plugins: [packageJson, orgImport, sortJson],
  arrowParens: 'always',
  vueIndentScriptAndStyle: true
};

export default config;

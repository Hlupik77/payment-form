import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });
const tsReactConfigs = tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);

const googleCompat = compat.extends('google').map((cfg) => {
  if (cfg && cfg.rules) {
    const { rules } = cfg;
    delete rules['valid-jsdoc'];
    delete rules['require-jsdoc'];
  }
  return cfg;
});

export default [
  ...googleCompat,
  ...tsReactConfigs,
  { rules: { 'spaced-comment': ['error', 'always', { markers: ['/'] }] } },
  ...compat.extends('prettier'),
];

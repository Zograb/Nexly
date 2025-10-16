import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import { config as baseConfig } from './base.js'

/**
 * A custom ESLint configuration for Node.js/NestJS applications.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nodeConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
];


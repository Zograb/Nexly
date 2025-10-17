import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import reactRefresh from 'eslint-plugin-react-refresh'
import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for libraries that use Vite.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const viteConfig = [
  ...baseConfig,
  pluginReactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  reactX.configs['recommended-typescript'],
  reactDom.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    }
  }
];

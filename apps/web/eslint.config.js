import globals from 'globals'

import { viteConfig } from '@nexly/eslint-config/vite'

export default [
  ...viteConfig,
  {
    ignores: ['**/routeTree.gen.ts'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.app.json'],
        },
        node: true,
      },
    },
  },
]

import { nodeConfig } from '@smart-notes/eslint-config/node'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nodeConfig,
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
  },
]

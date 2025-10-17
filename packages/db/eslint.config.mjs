import { nodeConfig } from '@nexly/eslint-config/node'

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


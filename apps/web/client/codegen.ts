import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // schema: '../api/graphql/schema.gql',
  schema: 'http://localhost:3001/graphql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      plugins: [],
      config: {
        useTypeImports: true,
        withHooks: false,
      },
    },
    './src/graphql/generated/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
}

export default config

import { ApolloProvider } from '@apollo/client/react'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { apolloClient } from 'src/graphql/apollo'

import { router } from './lib/router'
import './index.css'

const rootElement = document.getElementById('root')!

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(rootElement).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
)

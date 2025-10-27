import { ApolloProvider } from '@apollo/client/react'
import { ClerkProvider } from '@clerk/clerk-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { apolloClient } from 'src/graphql/apollo'

import 'src/styles/index.css'
import { App } from './App'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </ClerkProvider>
  </StrictMode>,
)

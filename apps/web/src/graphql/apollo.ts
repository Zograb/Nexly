import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import { API_URL } from 'src/lib/constants'

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${API_URL}/graphql`,
  }),
  cache: new InMemoryCache(),
})

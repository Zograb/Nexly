import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'

import { API_URL } from 'src/lib/constants'
import { getClerkToken } from 'src/utils/helpers/getClerkToken'

const link = ApolloLink.from([
  new SetContextLink(async (prevContext) => {
    const token = await getClerkToken()
    return {
      headers: {
        ...prevContext.headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  }),
  new HttpLink({
    uri: `${API_URL}/graphql`,
  }),
])

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Note: {
        keyFields: ['id'],
      },
    },
  }),
})

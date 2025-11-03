import { useQuery } from '@apollo/client/react'

import { graphql } from 'src/graphql/generated/gql'
import type { CurrentUserQuery } from 'src/graphql/generated/graphql'

const GET_CURRENT_USER = graphql(`
  query CurrentUser {
    currentUser {
      id
      email
      preferredName
      folders {
        id
        name
        notes {
          id
          title
          content
        }
      }
    }
  }
`)

export type User = CurrentUserQuery['currentUser']

export interface UseCurrentUserResult {
  user: CurrentUserQuery['currentUser'] | null
  loading: boolean
}

export function useCurrentUser(options?: useQuery.Options<CurrentUserQuery>): UseCurrentUserResult {
  const { data, loading } = useQuery<CurrentUserQuery>(GET_CURRENT_USER, options)

  return {
    user: data?.currentUser || null,
    loading,
  }
}

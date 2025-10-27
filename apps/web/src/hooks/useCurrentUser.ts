import type { User } from '@nexly/db/prisma'

import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

export interface UseCurrentUserResult {
  user: User | null
  loading: boolean
}

export function useCurrentUser(): UseCurrentUserResult {
  const { data, loading } = useQuery<{ currentUser: User }>(gql`
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

  return {
    user: data?.currentUser || null,
    loading,
  }
}

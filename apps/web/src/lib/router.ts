import type { User } from 'src/hooks/useCurrentUser'

import { createRouter } from '@tanstack/react-router'

import { routeTree } from 'src/routeTree.gen'

export interface RouterContext {
  auth: {
    isSignedIn: boolean
    currentUser: User | null
  }
}

export const router = createRouter({
  routeTree,
  context: {
    auth: {
      isSignedIn: false,
      currentUser: null,
    },
  } satisfies RouterContext,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
})

import { createRouter } from '@tanstack/react-router'

import { routeTree } from 'src/routeTree.gen'

export interface RouterContext {
  auth: {
    isSignedIn: boolean
  }
}

export const router = createRouter({
  routeTree,
  context: {
    auth: {
      isSignedIn: false,
    },
  } satisfies RouterContext,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
})

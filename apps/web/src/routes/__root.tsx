import type { RouterContext } from 'src/lib/router'

import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}

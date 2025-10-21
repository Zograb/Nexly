import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { ScrollArea } from '@nexly/ui/components/ScrollArea/ScrollArea'
import { ScrollBar } from '@nexly/ui/components/ScrollArea/ScrollBar'
import { Sidebar } from 'src/components/layout/Sidebar'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />
        <ScrollArea className="flex-1 bg-background">
          <div className="min-h-screen">
            <Outlet />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}

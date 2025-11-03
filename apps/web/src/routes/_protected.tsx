import {
  createFileRoute,
  Outlet,
  redirect,
  useRouteContext,
} from '@tanstack/react-router'

import { ScrollArea } from '@nexly/ui/components/ScrollArea/ScrollArea'
import { ScrollBar } from '@nexly/ui/components/ScrollArea/ScrollBar'
import { Sidebar } from 'src/components/layout/Sidebar'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isSignedIn) {
      throw redirect({ to: '/login', replace: true })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = useRouteContext({ from: '/_protected' })

  return (
    <div className="flex h-screen">
      <Sidebar user={auth.currentUser!} />
      <ScrollArea className="flex-1 bg-background">
        <div className="min-h-screen">
          <Outlet />
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}

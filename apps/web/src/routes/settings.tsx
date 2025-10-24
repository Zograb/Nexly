import { createFileRoute } from '@tanstack/react-router'

import { Tabs } from '@nexly/ui/components/Tabs/Tabs'
import { TabsContent } from '@nexly/ui/components/Tabs/TabsContent'
import { TabsList } from '@nexly/ui/components/Tabs/TabsList'
import { TabsTrigger } from '@nexly/ui/components/Tabs/TabsTrigger'

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="py-10 px-5 container mx-auto">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account" >Account</TabsTrigger>
          <TabsTrigger value="security">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div>Account</div>
        </TabsContent>
        <TabsContent value="preferences">
          <div>Preferences</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

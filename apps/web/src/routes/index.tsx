import { createFileRoute } from '@tanstack/react-router'

import { Editor } from '@nexly/ui/components/Editor'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="text-2xl py-10">
      <Editor />
    </div>
  )
}

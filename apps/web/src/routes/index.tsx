import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="py-10 h-full text-center text-foreground-primary text-3xl">
      Home Page
    </div>
  )
}

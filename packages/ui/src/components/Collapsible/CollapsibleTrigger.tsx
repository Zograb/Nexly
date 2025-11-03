import type { ComponentPropsWithoutRef } from 'react'

import { CollapsibleTrigger as RadixCollapsibleTrigger } from '@radix-ui/react-collapsible'

export const CollapsibleTrigger = ({
  ...props
}: ComponentPropsWithoutRef<typeof RadixCollapsibleTrigger>) => {
  return <RadixCollapsibleTrigger data-slot="collapsible-trigger" {...props} />
}

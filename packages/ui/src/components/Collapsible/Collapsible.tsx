import type { ComponentPropsWithoutRef } from 'react'

import { Root } from '@radix-ui/react-collapsible'

export const Collapsible = ({
  ...props
}: ComponentPropsWithoutRef<typeof Root>) => {
  return <Root data-slot="collapsible" {...props} />
}

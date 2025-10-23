import type { ComponentPropsWithoutRef } from 'react'

import { Trigger } from '@radix-ui/react-dropdown-menu'

export const DropdownMenuTrigger = ({
  ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => {
  return (
    <Trigger
      data-slot="dropdown-menu-trigger"
      className="outline-none"
      {...props}
    />
  )
}

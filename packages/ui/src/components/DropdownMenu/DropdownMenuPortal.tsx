import type { ComponentPropsWithoutRef } from 'react'

import { Portal } from '@radix-ui/react-dropdown-menu'

export const DropdownMenuPortal = ({
  ...props
}: ComponentPropsWithoutRef<typeof Portal>) => {
  return <Portal data-slot="dropdown-menu-portal" {...props} />
}

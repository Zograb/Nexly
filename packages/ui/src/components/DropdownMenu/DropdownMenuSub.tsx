import type { ComponentPropsWithoutRef } from 'react'

import { Sub } from '@radix-ui/react-dropdown-menu'

export const DropdownMenuSub = ({
  ...props
}: ComponentPropsWithoutRef<typeof Sub>) => {
  return <Sub data-slot="dropdown-menu-sub" {...props} />
}

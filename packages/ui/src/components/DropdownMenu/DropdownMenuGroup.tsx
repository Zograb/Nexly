import type { ComponentPropsWithRef } from 'react'

import { Group } from '@radix-ui/react-dropdown-menu'

export const DropdownMenuGroup = ({
  ...props
}: ComponentPropsWithRef<typeof Group>) => {
  return <Group data-slot="dropdown-menu-group" {...props} />
}

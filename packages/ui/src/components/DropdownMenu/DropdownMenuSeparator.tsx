import type { ComponentPropsWithoutRef } from 'react'

import { Separator } from '@radix-ui/react-dropdown-menu'

import { cn } from '../../utils'

export const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Separator>) => {
  return (
    <Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-foreground-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

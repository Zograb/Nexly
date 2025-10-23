import type { ComponentPropsWithRef } from 'react'

import { SubTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronRightIcon } from 'lucide-react'

import { cn } from '../../utils'

export interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithRef<typeof SubTrigger> {
  inset?: boolean
}

export const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) => {
  return (
    <SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        '[&_svg:not([class*="text-"])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5',
        'text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none',
        '[&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </SubTrigger>
  )
}

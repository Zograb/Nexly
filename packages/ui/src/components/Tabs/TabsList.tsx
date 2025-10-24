import type { ComponentPropsWithoutRef } from 'react'

import { List } from '@radix-ui/react-tabs'

import { cn } from '../../utils'

export const TabsList = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof List>) => (
  <List
    data-slot="tabs-list"
    className={cn(
      'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
      className,
    )}
    {...props}
  />
)

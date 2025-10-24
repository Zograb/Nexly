import type { ComponentPropsWithoutRef } from 'react'

import { Root } from '@radix-ui/react-tabs'

import { cn } from '../../utils'

export const Tabs = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Root>) => (
  <Root
    data-slot="tabs"
    className={cn('flex flex-col gap-2', className)}
    {...props}
  />
)

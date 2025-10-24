import type { ComponentPropsWithoutRef } from 'react'

import { Content } from '@radix-ui/react-tabs'

import { cn } from '../../utils'

export const TabsContent = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Content>) => (
  <Content
    data-slot="tabs-content"
    className={cn('flex-1 outline-none', className)}
    {...props}
  />
)

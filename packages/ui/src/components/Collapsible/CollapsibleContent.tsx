import type { ComponentPropsWithoutRef } from 'react'

import { CollapsibleContent as RadixCollapsibleContent } from '@radix-ui/react-collapsible'

import { cn } from '../../utils'

import { collapsibleContentBase } from './Collapsible.css'

export const CollapsibleContent = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixCollapsibleContent>) => {
  return (
    <RadixCollapsibleContent
      data-slot="collapsible-content"
      className={cn(collapsibleContentBase, className)}
      {...props}
    />
  )
}

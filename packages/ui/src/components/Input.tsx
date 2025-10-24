import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '../utils'

export const Input = ({
  className,
  type,
  ...props
}: ComponentPropsWithoutRef<'input'>) => (
  <input
    type={type}
    data-slot="input"
    className={cn(
      'bg-transparent text-foreground-primary placeholder:text-foreground-secondary outline-none',
      'border-foreground-border h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base transition-[color,box-shadow]',
      'outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      'ring-xs ring-foreground-primary/50 focus-visible:ring-2',
      className,
    )}
    {...props}
  />
)

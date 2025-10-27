import type { ComponentPropsWithRef } from 'react'

import { Loader2Icon } from 'lucide-react'

import { cn } from '../utils'

export const Spinner = ({
  className,
  ...props
}: ComponentPropsWithRef<'svg'>) => {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

import type { ComponentPropsWithoutRef } from 'react'

import { Trigger } from '@radix-ui/react-popover'

export const PopoverTrigger = ({
  ...props
}: ComponentPropsWithoutRef<typeof Trigger>) => {
  return <Trigger data-slot="popover-trigger" {...props} />
}

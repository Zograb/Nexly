import type { ComponentPropsWithoutRef } from 'react'

import { Anchor } from '@radix-ui/react-popover'

export const PopoverAnchor = ({
  ...props
}: ComponentPropsWithoutRef<typeof Anchor>) => {
  return <Anchor data-slot="popover-anchor" {...props} />
}

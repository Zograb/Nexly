import type { ComponentPropsWithoutRef } from 'react'

import { Root } from '@radix-ui/react-popover'

export const Popover = (props: ComponentPropsWithoutRef<typeof Root>) => {
  return <Root data-slot="popover" {...props} />
}

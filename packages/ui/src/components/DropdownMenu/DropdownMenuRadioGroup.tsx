import type { ComponentPropsWithoutRef } from 'react'

import { RadioGroup } from '@radix-ui/react-dropdown-menu'

export const DropdownMenuRadioGroup = ({
  ...props
}: ComponentPropsWithoutRef<typeof RadioGroup>) => {
  return <RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

import { FolderClosed, FolderOpen } from 'lucide-react'
import { type PropsWithChildren, useState } from 'react'

import { Collapsible } from '@nexly/ui/components/Collapsible/Collapsible'
import { CollapsibleContent } from '@nexly/ui/components/Collapsible/CollapsibleContent'
import { CollapsibleTrigger } from '@nexly/ui/components/Collapsible/CollapsibleTrigger'

import { NavLink } from './NavLink'

export interface FolderProps extends PropsWithChildren {
  name: string
}

export const Folder = ({ name, children }: FolderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <NavLink
          icon={isOpen ? <FolderOpen size={16} /> : <FolderClosed size={16} />}
        >
          {name}
        </NavLink>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  )
}

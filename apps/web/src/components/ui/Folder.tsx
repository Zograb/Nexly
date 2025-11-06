import { FolderClosed, FolderOpen, Plus } from 'lucide-react'
import {
  type MouseEvent,
  type PropsWithChildren,
  useCallback,
  useState,
} from 'react'

import { Button } from '@nexly/ui/components/Button'
import { Collapsible } from '@nexly/ui/components/Collapsible/Collapsible'
import { CollapsibleContent } from '@nexly/ui/components/Collapsible/CollapsibleContent'
import { CollapsibleTrigger } from '@nexly/ui/components/Collapsible/CollapsibleTrigger'
import { cn } from '@nexly/ui/utils'

import { NavLink } from './NavLink'

export interface FolderProps extends PropsWithChildren {
  onAdd?: () => void
  name: string
}

export const Folder = ({ name, children, onAdd }: FolderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAdd = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onAdd?.()
    },
    [onAdd],
  )

  return (
    <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className="relative group">
          <NavLink
            icon={
              isOpen ? <FolderOpen size={16} /> : <FolderClosed size={16} />
            }
          >
            <span className="text-ellipsis overflow-hidden whitespace-nowrap group-hover:pr-12">
              {name}
            </span>
          </NavLink>
          <div
            className={cn(
              'absolute h-full right-0 top-0 gap-0.5',
              'hidden group-hover:flex items-center justify-center p-1',
            )}
          >
            <Button variant="secondary" size="icon" onClick={handleAdd}>
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  )
}

import type { Editor } from '@tiptap/react'
import type { ReactNode } from 'react'

import { cn } from '../../../utils'
import { Button } from '../../Button'

export interface SlashCommandsListItem {
  title: string
  icon?: ReactNode
  run: () => void
}

export interface SlashCommandsListProps {
  editor: Editor
  query: string
  items: SlashCommandsListItem[]
  onClose: () => void
}

export const SlashCommandsList = ({ items }: SlashCommandsListProps) => {
  return (
    <div
      className={cn(
        'animate-in duration-300 slide-in-from-top-5 fade-in-0 zoom-in-80',
        'bg-foreground text-foreground-primary py-2 rounded-md flex flex-col w-52 gap-1',
      )}
    >
      <div className="pl-5 py-1.5 text-sm font-medium text-foreground-secondary">
        Basic blocks
      </div>
      <hr className="border-foreground-border" />
      {items.map((item) => (
        <div key={item.title} className="px-1">
          <Button
            onClick={item.run}
            icon={item.icon}
            variant="secondary"
            className="w-full text-left text-sm justify-start"
          >
            {item.title}
          </Button>
        </div>
      ))}
    </div>
  )
}

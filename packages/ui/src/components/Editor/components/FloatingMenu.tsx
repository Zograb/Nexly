import type { Editor } from '@tiptap/react'

import { FloatingMenu as TiptapFloatingMenu } from '@tiptap/react/menus'
import { Plus } from 'lucide-react'
import { useCallback } from 'react'

import { Button } from '../../Button'

export interface FloatingMenuProps {
  editor: Editor
}

export const FloatingMenu = ({ editor }: FloatingMenuProps) => {
  const openDropdown = useCallback(() => {
    const { from } = editor.state.selection
    const textBefore = editor.state.doc.textBetween(Math.max(0, from - 1), from)
    if (textBefore !== '/') {
      editor.chain().focus().insertContent('/').run()
    }
  }, [editor])

  return (
    <TiptapFloatingMenu
      editor={editor}
      options={{ placement: 'left', strategy: 'absolute' }}
    >
      <div className="flex items-center gap-1">
        <Button
          variant="secondary"
          size="icon"
          className="text-foreground-secondary h-7"
          onClick={openDropdown}
        >
          <Plus className="size-5" />
        </Button>
      </div>
    </TiptapFloatingMenu>
  )
}

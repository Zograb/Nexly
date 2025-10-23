import type { PropsWithChildren } from 'react'

import { type Editor, useEditorState } from '@tiptap/react'
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus'
import {
  Trash,
  Quote,
  Code,
  AlignLeft,
  AlignRight,
  AlignCenter,
} from 'lucide-react'

import { cn } from '../../../../utils'
import { Button } from '../../../Button'

import { ColorPicker } from './ColorPicker'

export interface BubbleMenuProps {
  editor: Editor
}

interface BubbleMenuButtonProps {
  onClick: () => void
  isActive: boolean
}

const BubbleMenuButton = ({
  isActive,
  children,
  onClick,
}: PropsWithChildren<BubbleMenuButtonProps>) => {
  return (
    <Button
      size="icon"
      className={cn(
        'h-7 bg-primary text-foreground-primary',
        isActive && 'bg-accent',
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export const BubbleMenu = ({ editor }: BubbleMenuProps) => {
  const editorState = useEditorState({
    editor,
    selector: ({ editor: editorInstance }: { editor: Editor }) => ({
      isHeading1: editorInstance.isActive('heading', { level: 1 }),
      isHeading2: editorInstance.isActive('heading', { level: 2 }),
      isBold: editorInstance.isActive('bold'),
      isItalic: editorInstance.isActive('italic'),
      isUnderline: editorInstance.isActive('underline'),
      isStrikethrough: editorInstance.isActive('strike'),
      isBlockquote: editorInstance.isActive('blockquote'),
      isBulletList: editorInstance.isActive('bulletList'),
      isOrderedList: editorInstance.isActive('orderedList'),
      isCode: editorInstance.isActive('code'),
      isTextAlignLeft: editorInstance.isActive({ textAlign: 'left' }),
      isTextAlignCenter: editorInstance.isActive({
        textAlign: 'center',
      }),
      isTextAlignRight: editorInstance.isActive({
        textAlign: 'right',
      }),
    }),
  })

  return (
    <TiptapBubbleMenu editor={editor}>
      <div className="flex justify-between items-center gap-1 bg-foreground px-2 py-1 rounded-md">
        <BubbleMenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editorState.isHeading1}
        >
          h1
        </BubbleMenuButton>
        <BubbleMenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editorState.isHeading2}
        >
          h2
        </BubbleMenuButton>
        <span className="text-foreground-border">|</span>
        <BubbleMenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editorState.isBold}
        >
          <span className="font-bold">B</span>
        </BubbleMenuButton>
        <BubbleMenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editorState.isItalic}
        >
          <span className="italic font-serif">I</span>
        </BubbleMenuButton>
        <BubbleMenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editorState.isUnderline}
        >
          <span className="underline">U</span>
        </BubbleMenuButton>
        <BubbleMenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editorState.isStrikethrough}
        >
          <span className="line-through">S</span>
        </BubbleMenuButton>
        <BubbleMenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editorState.isBlockquote}
        >
          <Quote />
        </BubbleMenuButton>
        <BubbleMenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editorState.isCode}
        >
          <Code />
        </BubbleMenuButton>
        <ColorPicker editor={editor} />
        <span className="text-foreground-border">|</span>
        <BubbleMenuButton
          onClick={() => editor.chain().focus().toggleTextAlign('left').run()}
          isActive={editorState.isTextAlignLeft}
        >
          <AlignLeft />
        </BubbleMenuButton>
        <BubbleMenuButton
          onClick={() => editor.chain().focus().toggleTextAlign('center').run()}
          isActive={editorState.isTextAlignCenter}
        >
          <AlignCenter />
        </BubbleMenuButton>
        <BubbleMenuButton
          onClick={() => editor.chain().focus().toggleTextAlign('right').run()}
          isActive={editorState.isTextAlignRight}
        >
          <AlignRight />
        </BubbleMenuButton>
        <span className="text-foreground-border">|</span>
        <Button
          size="icon"
          className="h-7 text-error"
          onClick={() => editor.chain().focus().deleteSelection().run()}
        >
          <Trash className="size-4" />
        </Button>
      </div>
    </TiptapBubbleMenu>
  )
}

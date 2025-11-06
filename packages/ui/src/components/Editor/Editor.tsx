import { Color } from '@tiptap/extension-color'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Placeholder } from '@tiptap/extensions'
import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useMemo, memo } from 'react'

import { BubbleMenu } from './components/BubbleMenu/BubbleMenu'
import { FloatingMenu } from './components/FloatingMenu'
import { editorBase } from './Editor.css'
import { SlashCommands } from './extensions/SlashCommands'

export interface EditorProps {
  onChange?: (html: string) => void
  initialContent?: string
}

export const Editor = memo(({ onChange, initialContent }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      TextStyle,
      Color,
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Placeholder.configure({
        placeholder: 'Write your note here...',
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      SlashCommands,
    ],
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    content: initialContent ?? '',
  })

  const providerValue = useMemo(() => ({ editor }), [editor])

  useEffect(() => {
    editor.commands.setContent(initialContent ?? '')
  }, [initialContent, editor])

  return (
    <EditorContext.Provider value={providerValue}>
      <EditorContent className={editorBase} editor={editor} />
      <FloatingMenu editor={editor} />
      <BubbleMenu editor={editor} />
    </EditorContext.Provider>
  )
})
Editor.displayName = 'Editor'

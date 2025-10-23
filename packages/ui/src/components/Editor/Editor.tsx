import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useMemo } from 'react'

import { Button } from '../Button'

import { BubbleMenu } from './components/BubbleMenu/BubbleMenu'
import { FloatingMenu } from './components/FloatingMenu'
import { editorBase } from './Editor.css'
import { SlashCommands } from './extensions/SlashCommands'

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      SlashCommands,
    ],
    content: '',
  })

  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <div className="max-w-[800px] h-full mx-auto">
      <Button onClick={() => console.log(editor.getHTML())}>Get HTML</Button>
      <EditorContext.Provider value={providerValue}>
        <EditorContent className={editorBase} editor={editor} />
        <FloatingMenu editor={editor} />
        <BubbleMenu editor={editor} />
      </EditorContext.Provider>
    </div>
  )
}

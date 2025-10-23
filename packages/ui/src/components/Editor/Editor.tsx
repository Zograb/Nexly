import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useMemo } from 'react'

import { Button } from '../Button'

import { editorBase } from './Editor.css'

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
    ],
    content: '',
  })

  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <div className="max-w-[800px] h-full mx-auto">
      <Button onClick={() => console.log(editor.getHTML())}>Get HTML</Button>
      <EditorContext.Provider value={providerValue}>
        <EditorContent className={editorBase} editor={editor} />
      </EditorContext.Provider>
    </div>
  )
}

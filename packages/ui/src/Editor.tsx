'use client'

import { useEffect, useRef } from 'react'
import EditorJS, { type API, type OutputData } from '@editorjs/editorjs'

export interface EditorProps {
  data?: OutputData
  onChange?: (data: OutputData) => void
}

export const Editor = ({ data, onChange }: EditorProps) => {
  const editorRef = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        onChange: async (api: API) => {
          const data = await api.saver.save()
          onChange?.(data)
        },
        data,
      })
      editorRef.current = editor
    }
  }, [data, onChange])

  return <div id="editorjs" />
}

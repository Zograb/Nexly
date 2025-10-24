import { createFileRoute } from '@tanstack/react-router'
import { type ChangeEvent, useEffect, useState } from 'react'

import { Editor } from '@nexly/ui/components/Editor/Editor'
import { Input } from '@nexly/ui/components/Input'
import { useDebounce } from 'src/hooks/useDebounce'

export const Route = createFileRoute('/note/$noteId')({
  component: RouteComponent,
})

function RouteComponent() {
  const [documentName, setDocumentName] = useState('New Note 1')
  const [documentContent, setDocumentContent] = useState('')

  const debouncedDocumentContent = useDebounce(documentContent, 1000)

  useEffect(() => {
    console.log('DOCUMENT CONTENT ===>', debouncedDocumentContent)
  }, [debouncedDocumentContent])

  return (
    <div className="py-10 h-full">
      <div className="max-w-[800px] flex flex-col h-full mx-auto">
        <Input
          className="text-center text-4xl h-auto border-none ring-0 focus-visible:ring-0"
          value={documentName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDocumentName(e.target.value)
          }
        />
        <Editor initialContent="" onChange={setDocumentContent} />
      </div>
    </div>
  )
}

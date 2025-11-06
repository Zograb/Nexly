import type { UpdateNoteMutation } from 'src/graphql/generated/graphql'

import { useMutation } from '@apollo/client/react'
import { createFileRoute, useParams } from '@tanstack/react-router'
import {
  type ChangeEvent,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { useDebounceCallback } from 'usehooks-ts'

import { Editor } from '@nexly/ui/components/Editor/Editor'
import { Input } from '@nexly/ui/components/Input'
import { graphql } from 'src/graphql/generated'
import { useCurrentUser } from 'src/hooks/useCurrentUser'

export const Route = createFileRoute('/_protected/note/$noteId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { noteId } = useParams({ from: '/_protected/note/$noteId' })

  const { user } = useCurrentUser()

  const [noteTitle, setNoteTitle] = useState('New Note 1')

  const [updateNote] = useMutation<UpdateNoteMutation>(
    graphql(`
      mutation UpdateNote($noteId: String!, $note: NoteUpdateInput!) {
        updateNote(noteId: $noteId, note: $note) {
          id
          title
          content
        }
      }
    `),
  )

  const note = useMemo(() => {
    return user?.folders
      ?.flatMap((folder) => folder.notes)
      .find((note) => note?.id === noteId)
  }, [user, noteId])

  const handleUpdateNote = useCallback(
    (noteId: string, title: string, content: string) => {
      updateNote({
        variables: {
          noteId,
          note: {
            title: {
              set: title,
            },
            content: {
              set: content,
            },
          },
        },
        optimisticResponse: {
          updateNote: {
            id: noteId,
            title: title,
            content: content,
          },
        },
        update: (cache, { data }) => {
          const updatedNote = data?.updateNote
          if (!updatedNote) return

          cache.modify({
            id: cache.identify({ __typename: 'Note', id: updatedNote.id }),
            fields: {
              content() {
                return updatedNote.content
              },
              title() {
                return updatedNote.title
              },
            },
          })
        },
      })
    },
    [updateNote],
  )

  const onContentChange = useCallback(
    (content: string) => {
      if (!note?.id) return
      handleUpdateNote(note.id, note.title, content)
    },
    [note?.id, note?.title, handleUpdateNote],
  )

  const updateNoteTitle = useCallback(
    (title: string) => {
      if (!note?.id) return
      handleUpdateNote(note.id, title, note.content)
    },
    [note?.id, note?.content, handleUpdateNote],
  )

  const debouncedOnContentChange = useDebounceCallback(onContentChange, 500)
  const debouncedOnTitleChange = useDebounceCallback(updateNoteTitle, 500)

  const onTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value

      setNoteTitle(title)

      debouncedOnTitleChange(title)
    },
    [debouncedOnTitleChange],
  )

  useEffect(() => {
    if (note) {
      setNoteTitle(note.title)
    }
  }, [note])

  return (
    <div className="py-10 h-full">
      <div className="max-w-[800px] flex flex-col h-full mx-auto">
        <Input
          className="text-center text-5xl h-auto border-none ring-0 focus-visible:ring-0 placeholder:text-foreground-primary placeholder:opacity-20"
          value={noteTitle}
          onChange={onTitleChange}
          placeholder="New Note"
        />
        <Editor
          initialContent={note?.content ?? ''}
          onChange={debouncedOnContentChange}
        />
      </div>
    </div>
  )
}

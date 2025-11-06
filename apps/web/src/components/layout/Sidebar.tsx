import type {
  CreateNoteMutation,
  DeleteNoteMutation,
} from 'src/graphql/generated/graphql'

import { useMutation } from '@apollo/client/react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'
import { FileText, House, LogOut, Search, Settings, Trash } from 'lucide-react'
import { useCallback } from 'react'

import { Button } from '@nexly/ui/components/Button'
import { Folder } from 'src/components/ui/Folder'
import { NavLink } from 'src/components/ui/NavLink'
import { graphql } from 'src/graphql/generated'
import { useCurrentUser } from 'src/hooks/useCurrentUser'
import { getUserInitials } from 'src/utils/helpers/getUserInitials'

export const Sidebar = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const { user } = useCurrentUser()

  const [createNote] = useMutation<CreateNoteMutation>(
    graphql(`
      mutation CreateNote($note: NoteCreateInput!) {
        createNote(note: $note) {
          id
          title
          content
        }
      }
    `),
  )
  const [deleteNote] = useMutation<DeleteNoteMutation>(
    graphql(`
      mutation DeleteNote($noteId: String!) {
        deleteNote(noteId: $noteId)
      }
    `),
  )

  const folders = user?.folders || []

  const logout = useCallback(async () => {
    await signOut()

    navigate({
      to: '/login',
    })
  }, [signOut, navigate])

  const addNewNote = useCallback(
    async (folderId: string) => {
      const result = await createNote({
        variables: {
          note: {
            title: 'New Note',
            content: '',
            folder: {
              connect: {
                id: folderId,
              },
            },
            user: {
              connect: {
                id: user?.id,
              },
            },
          },
        },
        update: (cache, { data }) => {
          const newNote = data?.createNote

          if (!newNote) return

          // Get a reference to the newly created note in the cache
          const newNoteRef = cache.identify({
            __typename: 'Note',
            id: newNote.id,
          })

          // Add the reference to the folder's notes array
          cache.modify({
            id: cache.identify({ __typename: 'Folder', id: folderId }),
            fields: {
              notes(existingNotes = []) {
                return [...existingNotes, { __ref: newNoteRef }]
              },
            },
          })
        },
      })

      const note = result.data?.createNote

      if (note?.id) {
        navigate({
          to: `/note/$noteId`,
          params: { noteId: note.id },
        })
      }
    },
    [user?.id, navigate, createNote],
  )

  const handleDeleteNote = useCallback(
    (noteId: string) => {
      deleteNote({
        variables: { noteId },
        optimisticResponse: {
          deleteNote: true,
        },
        update: (cache, { data }) => {
          const deletedNote = data?.deleteNote
          if (!deletedNote) return

          cache.evict({
            id: cache.identify({ __typename: 'Note', id: noteId }),
          })
          cache.gc()
        },
      })
    },
    [deleteNote],
  )

  return (
    <div className="w-[260px] bg-foreground h-screen border-r border-foreground-border py-4 px-2">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-center gap-3 px-2">
            <div
              className={clsx(
                'rounded-full w-10 h-10',
                'flex justify-center items-center',
                'bg-primary text-foreground-primary text-sm',
              )}
            >
              {getUserInitials(user?.preferredName || '')}
            </div>
            <span className="text-foreground-primary">
              {user?.preferredName}
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-8">
            <NavLink icon={<House size={16} />} to="/">
              Home
            </NavLink>
            <NavLink icon={<Search size={16} />}>Search</NavLink>
          </div>
          <div className="flex flex-col gap-2 mt-14">
            {folders.map((folder) => (
              <Folder
                key={folder.id}
                name={folder.name}
                onAdd={() => addNewNote(folder.id)}
              >
                <div className="w-full flex flex-col gap-1 py-1">
                  {folder.notes?.map((note) => (
                    <div key={note.id} className="relative group">
                      <NavLink
                        to={`/note/$noteId`}
                        params={{ noteId: note.id }}
                        icon={<FileText size={16} />}
                        className="pl-4 pr-4 text-xs"
                      >
                        {note.title}
                      </NavLink>
                      <div className="absolute right-0 top-0 h-full p-1 hidden group-hover:flex">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <Trash className="text-error" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Folder>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <NavLink icon={<Settings size={16} />} to="/settings">
            Settings
          </NavLink>
          <NavLink icon={<LogOut size={16} />} onClick={logout}>
            Log Out
          </NavLink>
        </div>
      </div>
    </div>
  )
}

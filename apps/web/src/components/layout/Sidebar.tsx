import type { User } from 'src/hooks/useCurrentUser'

import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from '@tanstack/react-router'
import clsx from 'clsx'
import { FileText, House, LogOut, Search, Settings } from 'lucide-react'

import { Folder } from 'src/components/ui/Folder'
import { NavLink } from 'src/components/ui/NavLink'
import { getUserInitials } from 'src/utils/helpers/getUserInitials'

export interface SidebarProps {
  user: User
}

export const Sidebar = ({ user }: SidebarProps) => {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const folders = user?.folders || []

  const logout = async () => {
    await signOut()

    navigate({
      to: '/login',
    })
  }

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
              <Folder key={folder.id} name={folder.name}>
                <div className="w-full flex flex-col gap-1 py-1">
                  {folder.notes?.map((note) => (
                    <NavLink
                      key={note.id}
                      to={`/note/$noteId`}
                      params={{ noteId: note.id }}
                      icon={<FileText size={16} />}
                      className="pl-4 pr-4 text-xs"
                    >
                      {note.title}
                    </NavLink>
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

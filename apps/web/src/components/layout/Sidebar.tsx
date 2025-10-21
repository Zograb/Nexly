import clsx from 'clsx'
import { House, LogOut, Search, Settings } from 'lucide-react'

import { NavLink } from 'src/components/ui/NavLink'

export const Sidebar = () => {
  return (
    <div className="w-[260px] bg-foreground h-screen border-r border-foreground-border py-4 px-2">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-center gap-3 px-2">
            <div
              className={clsx(
                'rounded-full w-10 h-10',
                'flex justify-center items-center',
                'bg-primary text-foreground-primary text-xs',
              )}
            >
              ZM
            </div>
            <span className="text-foreground-primary">Zograb Mkrtchyan</span>
          </div>
          <div className="flex flex-col gap-1 mt-8">
            <NavLink icon={<House size={16} />} to="/">
              Home
            </NavLink>
            <NavLink icon={<Search size={16} />}>Search</NavLink>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <NavLink icon={<Settings size={16} />} to="/settings">
            Settings
          </NavLink>
          <NavLink icon={<LogOut size={16} />}>Log Out</NavLink>
        </div>
      </div>
    </div>
  )
}

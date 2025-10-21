import { type LinkProps, Link } from '@tanstack/react-router'

import { type ButtonProps, Button } from '@nexly/ui/components/Button'
import { cn } from '@nexly/ui/utils'

export interface NavLinkProps extends ButtonProps {
  to?: LinkProps['to']
}

export const NavLink = ({ to, className, ...otherProps }: NavLinkProps) => {
  if (to) {
    return (
      <Link to={to}>
        {({ isActive }) => (
          <Button
            className={cn(
              'w-full text-foreground-secondary',
              isActive && 'bg-primary text-foreground-primary',
              className,
            )}
            size="md"
            variant="secondary"
            {...otherProps}
          />
        )}
      </Link>
    )
  }
  return (
    <Button
      className={cn('w-full text-foreground-secondary', className)}
      size="md"
      variant="secondary"
      {...otherProps}
    />
  )
}

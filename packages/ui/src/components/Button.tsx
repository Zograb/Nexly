import type { ReactNode } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

import { cn } from '../utils'

const buttonVariants = cva(
  clsx(
    'inline-flex items-center justify-center',
    'box-border cursor-pointer gap-2 whitespace-nowrap',
    'rounded-sm text-sm text-neutral-400 font-medium transition-all',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4',
  ),
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-foreground-primary hover:opacity-80 active:scale-70',
        secondary:
          'bg-transparent text-foreground-primary hover:bg-primary active:opacity-80',
        destructive:
          'text-foreground-primary bg-error hover:opacity-80 active:scale-95',
        'destructive-secondary': 'text-error bg-transparent active:scale-95',
        success:
          'text-foreground-primary bg-success hover:opacity-80 active:scale-95',
        'success-secondary': 'text-success bg-transparent active:scale-95',
        ghost:
          'bg-transparent text-foreground-primary hover:opacity-80 active:scale-95',
        outline:
          'border border-primary text-foreground-primary hover:opacity-80 active:scale-95',
      },
      size: {
        sm: 'h-6 px-2 text-xs',
        md: 'h-8 px-4 text-sm',
        lg: 'h-10 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: ReactNode
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  children,
  icon,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        icon && 'justify-start gap-3',
      )}
      {...props}
    >
      {icon && (
        <div className="flex items-center justify-center h-full min-w-6">
          {icon}
        </div>
      )}
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }

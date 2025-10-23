import {
  type Placement,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom'
import {
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { cn } from '../../../../utils'

export interface FloatingPopupProps extends PropsWithChildren {
  placement?: Placement
  trigger: ReactNode
  className?: string
  onPopupStateChange?: (isOpen: boolean) => void
}

export const FloatingPopup = ({
  children,
  placement = 'bottom-start',
  className = '',
  trigger,
  onPopupStateChange,
}: FloatingPopupProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen)
    onPopupStateChange?.(!isOpen)
  }, [isOpen, onPopupStateChange])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    onPopupStateChange?.(false)
  }, [onPopupStateChange])

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !popupRef.current) return

    const triggerElement = triggerRef.current
    const popupElement = popupRef.current

    const updatePosition = async () => {
      const { x, y } = await computePosition(triggerElement, popupElement, {
        placement,
        strategy: 'absolute',
        middleware: [offset(6), flip(), shift({ padding: 8 })],
      })

      Object.assign(popupElement.style, {
        position: 'absolute',
        left: `${Math.round(x)}px`,
        top: `${Math.round(y)}px`,
      })
    }

    const cleanup = autoUpdate(triggerElement, popupElement, updatePosition)

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (!popupElement.contains(target) && !triggerElement.contains(target)) {
        handleClose()
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside, true)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      cleanup()
      document.removeEventListener('mousedown', handleClickOutside, true)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, placement, handleClose])

  return (
    <div>
      <div
        ref={triggerRef}
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleToggle}
        className="inline-block"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={popupRef}
          className={cn(
            'absolute rounded-lg bg-foreground border border-foreground-border p-2',
            'transition-all animate-in duration-300 slide-in-from-top-5 fade-in-0 zoom-in-90',
            className,
          )}
          role="dialog"
          aria-modal="false"
        >
          {children}
        </div>
      )}
    </div>
  )
}

import type { Editor } from '@tiptap/react'

import { Brush } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { cn } from '../../../../utils'
import { Button } from '../../../Button'
import { FloatingPopup } from '../common/FloatingPopup'

const COLORS = [
  '#374151', // Dark Gray
  '#6B7280', // Medium Gray
  '#9CA3AF', // Light Gray
  '#FFFFFF', // White
  '#F43F5E', // Rose
  '#EF4444', // Red
  '#F97316', // Orange
  '#F59E0B', // Amber
  '#EAB308', // Yellow
  '#84CC16', // Lime
  '#22C55E', // Green
  '#10B981', // Emerald
  '#14B8A6', // Teal
  '#06B6D4', // Cyan
  '#0EA5E9', // Sky Blue
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Violet
  '#A855F7', // Purple
  '#D946EF', // Fuchsia
  '#EC4899', // Pink
]

export interface ColorPickerProps {
  editor: Editor
}

export const ColorPicker = ({ editor }: ColorPickerProps) => {
  const [color, setColor] = useState('')

  const [isOpen, setIsOpen] = useState(false)

  const activeColor = useMemo(
    () => (editor.getAttributes('textStyle')?.color as string) || '',
    [editor],
  )

  useEffect(() => {
    if (color !== '') {
      editor.chain().focus().setColor(color).run()
    }
  }, [editor, color])

  useEffect(() => {
    setColor(activeColor)
  }, [activeColor])

  return (
    <FloatingPopup
      trigger={
        <Button
          type="button"
          size="icon"
          className={cn('h-7', isOpen ? 'bg-accent' : '')}
        >
          <Brush className="size-4" />
        </Button>
      }
      onPopupStateChange={setIsOpen}
    >
      <div className="flex flex-wrap justify-start gap-1 w-48">
        {COLORS.map((color) => (
          <div
            key={color}
            className="h-6 w-6 rounded-sm"
            style={{ backgroundColor: color }}
            onClick={() => setColor(color)}
          />
        ))}
      </div>
    </FloatingPopup>
  )
}

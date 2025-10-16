'use client'

import dynamic from 'next/dynamic'

export const NoteEditor = dynamic(
  () =>
    import('@smart-notes/ui/Editor').then((mod) => ({ default: mod.Editor })),
  { ssr: false },
)

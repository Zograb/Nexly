import { globalStyle, style } from '@vanilla-extract/css'

export const editorBase = style({
  height: '100%',
  marginTop: 32,
})

globalStyle(`${editorBase} .tiptap`, {
  height: '100%',
  minHeight: 'calc(100vh - 100px)',
  color: 'var(--color-foreground-primary)',
})

globalStyle(`${editorBase} .ProseMirror-focused:focus-visible`, {
  outline: 'none',
})

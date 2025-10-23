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

globalStyle(`${editorBase} .tiptap .suggestion`, {
  backgroundColor: 'var(--color-primary)',
  borderRadius: 6,
  padding: '4px 8px',
})

globalStyle(`${editorBase} .tiptap::selection`, {
  backgroundColor: 'var(--color-primary)',
})

globalStyle(`${editorBase} .tiptap p`, {
  fontSize: 16,
})

globalStyle(`${editorBase} .tiptap h1`, {
  fontSize: 40,
})

globalStyle(`${editorBase} .tiptap h2`, {
  fontSize: 28,
})

globalStyle(`${editorBase} .tiptap ul`, {
  listStyleType: 'disc',
  paddingLeft: 25,
})

globalStyle(`${editorBase} .tiptap ul[data-type="taskList"]`, {
  listStyleType: 'none',
  paddingLeft: 25,
})

globalStyle(`${editorBase} .tiptap ul[data-type="taskList"] li`, {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 12,
})

globalStyle(
  `${editorBase} .tiptap ul[data-type="taskList"] li input[type="checkbox"]`,
  {
    position: 'relative',
    top: '2px',
    width: 16,
    height: 16,
  },
)

globalStyle(`${editorBase} .tiptap ol`, {
  listStyleType: 'decimal',
  paddingLeft: 25,
})

globalStyle(`${editorBase} .tiptap blockquote`, {
  borderLeft: '4px solid var(--color-foreground-border)',
  paddingLeft: 16,
})

globalStyle(`${editorBase} .tiptap pre`, {
  background: 'var(--color-foreground)',
  padding: '4px 8px',
  borderRadius: 6,
})

globalStyle(`${editorBase} .tiptap code`, {
  background: 'var(--color-foreground)',
  padding: '4px 8px',
  borderRadius: 6,
})

globalStyle(`${editorBase} .tiptap hr`, {
  border: '1px solid var(--color-foreground-border)',
})

import { globalStyle, keyframes, style } from '@vanilla-extract/css'

const slideDown = keyframes({
  from: {
    height: 0,
  },
  to: {
    height: 'var(--radix-collapsible-content-height)',
  },
})

const slideUp = keyframes({
  from: {
    height: 'var(--radix-collapsible-content-height)',
  },
  to: {
    height: 0,
  },
})

export const collapsibleContentBase = style({
  overflow: 'hidden',
})

globalStyle(`${collapsibleContentBase}[data-state="open"]`, {
  animation: `${slideDown} 100ms ease-out`,
})

globalStyle(`${collapsibleContentBase}[data-state="closed"]`, {
  animation: `${slideUp} 100ms ease-out`,
})

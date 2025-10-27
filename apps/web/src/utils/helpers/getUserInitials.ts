export function getUserInitials(name: string): string {
  if (!name || !name.trim()) {
    return ''
  }

  const words = name.trim().split(/\s+/)

  if (words.length === 1) {
    return words[0]?.charAt(0).toUpperCase() || ''
  }

  const firstInitial = words[0]?.charAt(0)
  const lastInitial = words[words.length - 1]?.charAt(0)

  return `${firstInitial || ''}${lastInitial || ''}`.toUpperCase()
}

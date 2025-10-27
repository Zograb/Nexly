export const getClerkToken = async (): Promise<string | null> => {
  try {
    // Check if Clerk is loaded
    if (!window.Clerk) {
      console.warn('Clerk is not loaded')
      return null
    }

    // Check if there's an active session
    if (!window.Clerk.session) {
      return null
    }

    const token = await window.Clerk.session.getToken()
    return token || null
  } catch (error) {
    console.error('Error getting Clerk token:', error)
    return null
  }
}

// Utility functions for authentication handling

export const handleAuthError = (error) => {
  // Check if it's an authentication error
  if (error.message && (
    error.message.includes('Access denied') || 
    error.message.includes('Invalid or expired token') ||
    error.message.includes('Access token required') ||
    error.message.includes('super_admin,admin role required')
  )) {
    // Clear token and redirect to login
    localStorage.removeItem('admin_token')
    window.location.href = '/login'
    return true
  }
  return false
}

export const isAuthError = (error) => {
  return error.message && (
    error.message.includes('Access denied') || 
    error.message.includes('Invalid or expired token') ||
    error.message.includes('Access token required') ||
    error.message.includes('super_admin,admin role required')
  )
}
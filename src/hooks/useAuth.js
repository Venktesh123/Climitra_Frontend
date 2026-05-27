import API from '../api/axios'

const useAuth = () => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const isAuthenticated = !!token

  const logout = async () => {
    try {
      // Tell the server to blocklist this token
      await API.post('/auth/logout')
    } catch (error) {
      // Even if the API call fails, clear local storage and redirect
      console.log('Logout API error:', error.message)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
  }

  return { token, user, isAuthenticated, logout }
}

export default useAuth
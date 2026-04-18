import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved auth on mount
    const savedUser = localStorage.getItem('auth_user')
    const savedToken = localStorage.getItem('auth_token')
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    
    // Mock login - in real app, this would call an API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo credentials: admin@campusprint.com / admin123
        if (email === 'admin@campusprint.com' && password === 'admin123') {
          const userData = {
            id: 'admin_001',
            name: 'Admin User',
            email: email,
            role: 'admin'
          }
          const token = 'mock_jwt_token_' + Date.now()
          
          setUser(userData)
          setIsAuthenticated(true)
          localStorage.setItem('auth_user', JSON.stringify(userData))
          localStorage.setItem('auth_token', token)
          
          toast.success('Login successful!')
          resolve(userData)
        } else {
          toast.error('Invalid credentials')
          reject(new Error('Invalid credentials'))
        }
        setLoading(false)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    toast.success('Logged out successfully')
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      isAdmin: isAdmin()
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
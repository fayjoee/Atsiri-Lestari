import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'atsiri-lestari-user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [redirectPath, setRedirectPath] = useState(null)

  const login = (email, roleType = 'buyer') => {
    let mockUser = {
      email,
      name: email.split('@')[0],
      role: roleType === 'seller' ? 'Petani / Penyuling Mitra' : 'Mitra Industri / Konsumen',
      type: roleType, // 'buyer' or 'seller'
      avatar: 'U'
    }
    
    // Customize name if common email
    if (email.includes('budi')) {
      mockUser.name = 'Budi Santoso'
      mockUser.role = 'Petani Sereh, Kuningan'
      mockUser.type = 'seller'
    } else if (email.includes('hendra')) {
      mockUser.name = 'Hendra Wijaya'
      mockUser.role = 'Mitra Industri, CV Aroma'
      mockUser.type = 'buyer'
    }

    setUser(mockUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
    setShowLoginModal(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const openLogin = (path = null) => {
    setRedirectPath(path)
    setShowLoginModal(true)
  }

  const closeLogin = () => {
    setShowLoginModal(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      showLoginModal,
      redirectPath,
      login,
      logout,
      openLogin,
      closeLogin,
      setRedirectPath
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

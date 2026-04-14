import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const nome = localStorage.getItem('nome')
    if (token && nome) {
      setUsuario({ token, nome })
    }
    setCarregando(false)
  }, [])

  const login = (token, nome) => {
    localStorage.setItem('token', token)
    localStorage.setItem('nome', nome)
    setUsuario({ token, nome })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('nome')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
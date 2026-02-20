import { createContext, useState, useEffect } from "react"
import api from "../api/axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // 🔥 RESTORE USER ON PAGE LOAD
  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role) {
      setUser({ role })
    }
  }, [])

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password })

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("role", res.data.role)

    setUser({ role: res.data.role })
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
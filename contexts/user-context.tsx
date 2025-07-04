"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  username: string
  email?: string
}

interface UserContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isLoggedIn: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in from localStorage
    if (typeof window !== 'undefined') {
      const isAdmin = localStorage.getItem('isAdmin')
      const storedUsername = localStorage.getItem('username')
      
      if (isAdmin === 'true') {
        setUser({
          id: '1',
          username: storedUsername || 'Admin',
          email: 'admin@cmmc.com'
        })
      }
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('isAdmin', 'true')
    localStorage.setItem('username', userData.username)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('username')
    router.push('/login')
  }

  const isLoggedIn = user !== null

  return (
    <UserContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
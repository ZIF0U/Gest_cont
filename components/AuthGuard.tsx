"use client"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Allow /login without auth
      if (pathname === "/login") {
        setChecked(true)
        return
      }
      const isAdmin = localStorage.getItem("isAdmin")
      if (isAdmin !== "true") {
        router.replace("/login")
      } else {
        setChecked(true)
      }
    }
  }, [router, pathname])

  if (!checked) return null
  return <>{children}</>
} 
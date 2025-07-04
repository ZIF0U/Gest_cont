"use client"
import { useRouter, usePathname } from "next/navigation"

export default function HeaderBar() {
  const router = useRouter()
  const pathname = usePathname()

  // Don't show header on login page
  if (pathname === "/login") return null

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    router.replace("/login")
  }

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, background: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
      <span>Connecté en tant que <b>admin</b></span>
      <button onClick={handleLogout} style={{ padding: "6px 16px", background: "#e53e3e", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>
        Se déconnecter
      </button>
    </header>
  )
} 
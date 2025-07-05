import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "@/contexts/user-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gestionnaire des Contrats",
  description: "Application de gestion des contrats d'employés",
}

import AuthGuard from "@/components/AuthGuard"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <UserProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  )
}

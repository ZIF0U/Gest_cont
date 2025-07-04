import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gestionnaire des Contrats",
  description: "Application de gestion des contrats d'employés",
}

import AuthGuard from "@/components/AuthGuard"
import HeaderBar from "@/components/HeaderBar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthGuard>
          <HeaderBar />
          {children}
        </AuthGuard>
        <Toaster />
      </body>
    </html>
  )
}

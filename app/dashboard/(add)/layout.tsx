import type React from "react"
import { AddHeader } from "@/components/add-header"

export default function AddLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AddHeader />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

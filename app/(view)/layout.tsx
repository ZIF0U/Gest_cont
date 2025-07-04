import type React from "react"
import { ViewSidebar } from "@/components/view-sidebar"
import { ViewHeader } from "@/components/view-header"

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar: always visible */}
      <div className="h-full">
        <ViewSidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ViewHeader />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

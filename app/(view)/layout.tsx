import type React from "react"
import { useState } from "react"
import { ViewSidebar } from "@/components/view-sidebar"
import { ViewHeader } from "@/components/view-header"

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Sidebar is always open on desktop, togglable on mobile
  // We'll use Tailwind's md:block to always show on md+, and control with state on mobile
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar: show on desktop, togglable on mobile */}
      <div className="hidden md:block h-full">
        <ViewSidebar open={true} />
      </div>
      <div className="block md:hidden h-full">
        <ViewSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ViewHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}

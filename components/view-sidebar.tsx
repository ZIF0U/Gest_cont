"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, AlertTriangle, Search, BarChart3, Building2, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const navigation = [
  {
    name: "Tous les Contrats",
    href: "/view/contracts",
    icon: FileText,
    description: "Liste complète",
  },
  {
    name: "Contrats Expirés",
    href: "/view/expired",
    icon: AlertTriangle,
    description: "Nécessitent attention",
  },
  {
    name: "Recherche Avancée",
    href: "/view/search",
    icon: Search,
    description: "Filtres et recherche",
  },
  {
    name: "Statistiques",
    href: "/view/stats",
    icon: BarChart3,
    description: "Aperçu général",
  },
]

export function ViewSidebar({ open = true, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname()
  // Collapsed state for desktop
  const [collapsed, setCollapsed] = useState(false)

  if (!open) return null

  return (
    <div className={cn(
      "bg-white shadow-sm border-r relative transition-all duration-200",
      collapsed ? "w-16" : "w-80"
    )}>
      {/* Collapse/Expand arrow for desktop */}
      <button
        className="absolute top-2 -right-4 z-10 hidden md:flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full shadow hover:bg-gray-100 transition"
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? "Développer le menu" : "Réduire le menu"}
        style={{ right: collapsed ? "-1.5rem" : "-1.5rem" }}
      >
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>
      {/* Close button for mobile */}
      {onClose && (
        <button
          className="absolute top-2 right-2 p-2 rounded hover:bg-gray-200 md:hidden"
          onClick={onClose}
          aria-label="Fermer le menu"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <div className={cn("p-6 border-b", collapsed && "px-2 py-4")}> 
        <div className="flex items-center space-x-2 mb-2 justify-center md:justify-start">
          <Building2 className="h-6 w-6 text-blue-600" />
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Gestionnaire des Contrats</h2>
              <div className="text-xs text-gray-600 leading-tight">
                <div>SARL GROUPE CMMC</div>
                <div>Z.I OULED SALAH EMIR ABDELKADER W. JIJEL</div>
              </div>
            </div>
          )}
        </div>
        {!collapsed && <p className="text-sm text-gray-600">Consultez et gérez vos contrats</p>}
      </div>

      <nav className={cn("p-4 space-y-2", collapsed && "p-2")}> 
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-start space-x-3 px-4 py-3 rounded-lg text-sm transition-colors group",
                isActive
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                collapsed && "justify-center px-2 py-2"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 mt-0.5 flex-shrink-0",
                  isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600",
                )}
              />
              {!collapsed && (
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className={cn("text-xs mt-0.5", isActive ? "text-blue-600" : "text-gray-500")}>{item.description}</div>
                </div>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

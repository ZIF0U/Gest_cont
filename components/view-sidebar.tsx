"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, AlertTriangle, Search, BarChart3, Building2 } from "lucide-react"

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

export function ViewSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-80 bg-white shadow-sm border-r">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2 mb-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Gestion des Contrats</h2>
            <div className="text-xs text-gray-600 leading-tight">
              <div>SARL GROUPE CMMCZ</div>
              <div>I OULED SALAH EMIR ABDELKADER W. JIJEL</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600">Consultez et gérez vos contrats</p>
      </div>

      <nav className="p-4 space-y-2">
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
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 mt-0.5 flex-shrink-0",
                  isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600",
                )}
              />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className={cn("text-xs mt-0.5", isActive ? "text-blue-600" : "text-gray-500")}>
                  {item.description}
                </div>
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

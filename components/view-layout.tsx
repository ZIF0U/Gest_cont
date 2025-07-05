"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, FileText, AlertTriangle, Search, BarChart3, LogOut, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContractsList } from "@/components/contracts-list"
import { ExpiredContractsList } from "@/components/expired-contracts-list"
import { SearchContracts } from "@/components/search-contracts"
import { StatsOverview } from "@/components/stats-overview"
import { StatsCards } from "@/components/stats-cards"
import { useUser } from "@/contexts/user-context"

interface ViewLayoutProps {
  onSwitchToAdd: () => void
}

const navigation = [
  {
    name: "Tous les Contrats",
    id: "contracts",
    icon: FileText,
    description: "Liste complète",
  },
  {
    name: "Contrats Expirés",
    id: "expired",
    icon: AlertTriangle,
    description: "Nécessitent attention",
  },
  {
    name: "Recherche Avancée",
    id: "search",
    icon: Search,
    description: "Filtres et recherche",
  },
  {
    name: "Statistiques",
    id: "stats",
    icon: BarChart3,
    description: "Aperçu général",
  },
]

export function ViewLayout({ onSwitchToAdd }: ViewLayoutProps) {
  const [activeTab, setActiveTab] = useState("contracts")
  const { user, logout } = useUser()

  const handleLogout = () => {
    logout()
    // You can add redirect logic here if needed
  }

  const renderContent = () => {
    switch (activeTab) {
      case "contracts":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestionnaire des Contrats</h1>
              <p className="text-gray-600">Vue d'ensemble de tous vos contrats d'employés</p>
            </div>
            <StatsCards />
            <ContractsList />
          </div>
        )
      case "expired":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h1 className="text-2xl font-bold text-gray-900">Contrats Expirés</h1>
              </div>
              <p className="text-gray-600">Contrats nécessitant une attention immédiate</p>
            </div>
            <ExpiredContractsList />
          </div>
        )
      case "search":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Recherche Avancée</h1>
              <p className="text-gray-600">Trouvez rapidement les contrats que vous cherchez</p>
            </div>
            <SearchContracts />
          </div>
        )
      case "stats":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
              <p className="text-gray-600">Aperçu général de vos contrats d'employés</p>
            </div>
            <StatsOverview />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header - now above sidebar and main */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <span className="text-lg text-black font-bold">Gestionnaire des Contrats</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button onClick={onSwitchToAdd}>
                <Plus className="h-4 w-4 mr-2" />
                NOUVEAU CONTRAT
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                SE DÉCONNECTER
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Below header: sidebar + main content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-sm border-r flex flex-col">
          <nav className="p-4 space-y-2 flex-1">
            {navigation.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-start space-x-3 px-4 py-3 rounded-lg text-sm transition-colors group text-left",
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
                </button>
              )
            })}
          </nav>

          {/* Company info at bottom */}
          <div className="p-4 border-t bg-gray-50">
            <div className="text-xs text-gray-600 leading-tight mb-3">
              <h3 className="font-bold text-sm text-gray-900 mb-1">SARL GROUPE CMMC</h3>
              <div>Z.I OULED SALAH EMIR ABDELKADER W. JIJEL</div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {user?.username || 'Utilisateur'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content */}
          <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}

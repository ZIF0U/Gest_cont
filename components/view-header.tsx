"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Building2, LogOut } from "lucide-react"

export function ViewHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    router.replace("/login")
  }

  return (
    <header className="bg-white shadow-sm border-b w-full">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Gestionnaire des Contrats</h1>
                <div className="text-xs text-gray-600 leading-tight">
                  <div>SARL GROUPE CMMC</div>
                  <div>Z.I OULED SALAH EMIR ABDELKADER W. JIJEL</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/add">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                NOUVEAU CONTRAT
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              SE DÉCONNECTER
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

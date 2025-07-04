"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Building2 } from "lucide-react"

export function ViewHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Gestion des Contrats</h1>
                <div className="text-xs text-gray-600 leading-tight">
                  <div>SARL GROUPE CMMCZ</div>
                  <div>I OULED SALAH EMIR ABDELKADER W. JIJEL</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-gray-500">Mode Consultation</span>
            </div>
          </div>

          <Link href="/add">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Contrat
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

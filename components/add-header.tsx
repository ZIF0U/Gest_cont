"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2, Eye } from "lucide-react"

export function AddHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestionnaire des Contrats</h1>
                <div className="text-xs text-gray-600 leading-tight">
                  <div>SARL GROUPE CMMCZ</div>
                  <div>I OULED SALAH EMIR ABDELKADER W. JIJEL</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-gray-500">Mode Ajout</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/view/contracts">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Voir les Contrats
              </Button>
            </Link>
            <Link href="/view/contracts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

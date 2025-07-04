"use client"

import { ContractForm } from "@/components/contract-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, ArrowLeft, Building2, Eye } from "lucide-react"

interface AddLayoutProps {
  onSwitchToView: () => void
}

export function AddLayout({ onSwitchToView }: AddLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Contrat Manager</h1>
              </div>
              <div className="hidden md:block">
                <span className="text-sm text-gray-500">Mode Ajout</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={onSwitchToView}>
                <Eye className="h-4 w-4 mr-2" />
                Voir les Contrats
              </Button>
              <Button variant="ghost" size="sm" onClick={onSwitchToView}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nouveau Contrat d'Employé</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Remplissez les informations ci-dessous pour créer un nouveau contrat d'employé. Les champs marqués d'un
              astérisque (*) sont obligatoires.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-gray-900">Informations du Contrat</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <ContractForm onSuccess={onSwitchToView} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

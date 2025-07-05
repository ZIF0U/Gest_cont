"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, MapPin, User, FileText, DollarSign, Shield, RefreshCw } from "lucide-react"

interface Contract {
  id: number
  carte_nationale: string
  nom_prenom: string
  date_naissance: string
  lieu_naissance?: string
  adresse?: string
  fonction: string
  date_recrutement?: string
  debut_contrat: string
  fin_contrat: string
  salaire_base?: number
  num_assurance_sociale?: string
  renewal_count?: number
  original_contract_id?: number
  is_renewal?: boolean
}

interface ContractDetailsModalProps {
  contract: Contract | null
  onClose: () => void
}

export function ContractDetailsModal({ contract, onClose }: ContractDetailsModalProps) {
  const [renewalHistory, setRenewalHistory] = useState<Contract[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (contract) {
      loadRenewalHistory()
    }
  }, [contract])

  const loadRenewalHistory = async () => {
    if (!contract) return
    
    setLoading(true)
    try {
      // Get all contracts from localStorage to find renewal history
      const stored = localStorage.getItem("contracts_data")
      const allContracts: Contract[] = stored ? JSON.parse(stored) : []
      
      // Find all contracts related to this one (original and renewals)
      const originalId = contract.original_contract_id || contract.id
      const relatedContracts = allContracts.filter(
        (c) => c.id === originalId || c.original_contract_id === originalId
      ).sort((a, b) => new Date(a.debut_contrat).getTime() - new Date(b.debut_contrat).getTime())
      
      setRenewalHistory(relatedContracts)
    } catch (error) {
      console.error("Error loading renewal history:", error)
    } finally {
      setLoading(false)
    }
  }

  const isExpired = (finContrat: string) => {
    return new Date() > new Date(finContrat)
  }

  const getContractStatus = (contract: Contract) => {
    if (contract.is_replaced) return "Remplacé"
    if (isExpired(contract.fin_contrat)) return "Expiré"
    return "Actif"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif": return "default"
      case "Expiré": return "destructive"
      case "Remplacé": return "secondary"
      default: return "outline"
    }
  }

  if (!contract) return null

  return (
    <Dialog open={!!contract} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
            Détails du Contrat - {contract.nom_prenom}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Employee Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations de l'Employé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-500">Nom et Prénom</p>
                  <p className="text-lg font-semibold">{contract.nom_prenom}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Carte Nationale</p>
                  <p className="text-lg">{contract.carte_nationale}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Date de Naissance</p>
                  <p>{format(new Date(contract.date_naissance), "dd/MM/yyyy", { locale: fr })}</p>
                </div>
                {contract.lieu_naissance && (
                  <div>
                    <p className="font-medium text-gray-500">Lieu de Naissance</p>
                    <p>{contract.lieu_naissance}</p>
                  </div>
                )}
                {contract.adresse && (
                  <div className="md:col-span-2">
                    <p className="font-medium text-gray-500">Adresse</p>
                    <p>{contract.adresse}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contract Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informations du Contrat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-500">Fonction</p>
                  <p className="text-lg font-semibold">{contract.fonction}</p>
                </div>
                {contract.date_recrutement && (
                  <div>
                    <p className="font-medium text-gray-500">Date de Recrutement</p>
                    <p>{format(new Date(contract.date_recrutement), "dd/MM/yyyy", { locale: fr })}</p>
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-500">Début de Contrat</p>
                  <p className="text-lg">{format(new Date(contract.debut_contrat), "dd/MM/yyyy", { locale: fr })}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Fin de Contrat</p>
                  <p className="text-lg">{format(new Date(contract.fin_contrat), "dd/MM/yyyy", { locale: fr })}</p>
                </div>
                {contract.salaire_base && (
                  <div>
                    <p className="font-medium text-gray-500">Salaire de Base</p>
                    <p className="text-lg font-semibold text-green-600">
                      {contract.salaire_base.toLocaleString()} DA
                    </p>
                  </div>
                )}
                {contract.num_assurance_sociale && (
                  <div>
                    <p className="font-medium text-gray-500">Numéro d'Assurance Sociale</p>
                    <p>{contract.num_assurance_sociale}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Renewal History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Historique des Renouvellements
                {renewalHistory.length > 1 && (
                  <Badge variant="secondary" className="ml-2">
                    {renewalHistory.length} versions
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Chargement de l'historique...</div>
              ) : renewalHistory.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  Aucun historique de renouvellement disponible
                </div>
              ) : (
                <div className="space-y-4">
                  {renewalHistory.map((contractVersion, index) => (
                    <div key={contractVersion.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(getContractStatus(contractVersion))}>
                            {getContractStatus(contractVersion)}
                          </Badge>
                          {contractVersion.is_renewal && (
                            <Badge variant="outline">Renouvellement {index + 1}</Badge>
                          )}
                          {index === 0 && (
                            <Badge variant="default">Contrat Original</Badge>
                          )}
                        </div>
                        {contractVersion.id === contract.id && (
                          <Badge variant="default">Version Actuelle</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-500">Début</p>
                          <p className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(contractVersion.debut_contrat), "dd/MM/yyyy", { locale: fr })}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-500">Fin</p>
                          <p className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(contractVersion.fin_contrat), "dd/MM/yyyy", { locale: fr })}
                          </p>
                        </div>
                        {contractVersion.salaire_base && (
                          <div>
                            <p className="font-medium text-gray-500">Salaire</p>
                            <p className="flex items-center gap-1 text-green-600">
                              <DollarSign className="h-3 w-3" />
                              {contractVersion.salaire_base.toLocaleString()} DA
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {contractVersion.renewal_count && contractVersion.renewal_count > 0 && (
                        <div className="mt-2 text-xs text-blue-600">
                          Nombre de renouvellements: {contractVersion.renewal_count}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
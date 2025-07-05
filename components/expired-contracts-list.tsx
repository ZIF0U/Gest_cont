"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, RefreshCw } from "lucide-react"
import { getExpiredContracts, deleteContract, renewContract } from "@/lib/database"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { RenewContractDialog } from "./renew-contract-dialog"
import { EditContractModal } from "./edit-contract-modal"

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

export function ExpiredContractsList() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [renewingContract, setRenewingContract] = useState<Contract | null>(null)
  const [editingContract, setEditingContract] = useState<Contract | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadExpiredContracts()
  }, [])

  const loadExpiredContracts = async () => {
    try {
      const data = await getExpiredContracts()
      setContracts(data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les contrats expirés",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contrat ?")) {
      try {
        await deleteContract(id)
        await loadExpiredContracts()
        toast({
          title: "Succès",
          description: "Contrat supprimé avec succès",
        })
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le contrat",
          variant: "destructive",
        })
      }
    }
  }

  const handleRenewContract = async (renewalData: {
    salaire_base?: number | null
    debut_contrat: string
    fin_contrat: string
  }) => {
    if (!renewingContract) return

    try {
      await renewContract(renewingContract.id, renewalData)
      await loadExpiredContracts()
      setRenewingContract(null)
      toast({
        title: "Succès",
        description: "Contrat renouvelé avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de renouveler le contrat",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>
  }

  if (contracts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-500">Aucun contrat expiré trouvé</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {contracts.map((contract) => (
          <Card key={contract.id} className="border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-red-800">{contract.nom_prenom}</CardTitle>
                  <p className="text-sm text-red-600">{contract.fonction}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Expiré</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-500">Carte Nationale</p>
                  <p>{contract.carte_nationale}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Début de Contrat</p>
                  <p>{format(new Date(contract.debut_contrat), "dd/MM/yyyy", { locale: fr })}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Fin de Contrat</p>
                  <p className="text-red-600 font-medium">
                    {format(new Date(contract.fin_contrat), "dd/MM/yyyy", { locale: fr })}
                  </p>
                </div>
                {contract.salaire_base && (
                  <div>
                    <p className="font-medium text-gray-500">Salaire de Base</p>
                    <p>{contract.salaire_base.toLocaleString()} DA</p>
                  </div>
                )}
              </div>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Voir
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditingContract(contract)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRenewingContract(contract)}
                  className="text-green-600 hover:text-green-700"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Renouveler
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(contract.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Supprimer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {renewingContract && (
        <RenewContractDialog
          contract={renewingContract}
          onRenew={handleRenewContract}
          onClose={() => setRenewingContract(null)}
        />
      )}

      <EditContractModal
        contract={editingContract}
        onClose={() => setEditingContract(null)}
        onSuccess={loadExpiredContracts}
      />
    </>
  )
}

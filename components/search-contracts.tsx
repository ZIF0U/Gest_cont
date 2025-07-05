"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { searchContracts } from "@/lib/database"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { fr } from "date-fns/locale"


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

export function SearchContracts() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("all")
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un terme de recherche",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const data = await searchContracts(searchTerm)
      setContracts(data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'effectuer la recherche",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }



  const isExpired = (finContrat: string) => {
    return new Date() > new Date(finContrat)
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recherche de Contrats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="searchTerm">Terme de recherche</Label>
              <Input
                id="searchTerm"
                placeholder="Nom, fonction, carte nationale..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="searchType">Type de recherche</Label>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les champs</SelectItem>
                  <SelectItem value="name">Nom uniquement</SelectItem>
                  <SelectItem value="function">Fonction uniquement</SelectItem>
                  <SelectItem value="card">Carte nationale uniquement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={loading} className="w-full">
                <Search className="h-4 w-4 mr-2" />
                {loading ? "Recherche..." : "Rechercher"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {contracts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Résultats de la recherche ({contracts.length} contrat{contracts.length > 1 ? "s" : ""})
          </h3>
          {contracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{contract.nom_prenom}</CardTitle>
                    <p className="text-sm text-gray-600">{contract.fonction}</p>
                    {contract.renewal_count && contract.renewal_count > 0 && (
                      <p className="text-xs text-blue-600 mt-1">Renouvelé: {contract.renewal_count} fois</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isExpired(contract.fin_contrat) ? "destructive" : "default"}>
                      {isExpired(contract.fin_contrat) ? "Expiré" : "Actif"}
                    </Badge>
                    {contract.is_renewal && (
                      <Badge variant="secondary" className="text-xs">
                        Renouvelé
                      </Badge>
                    )}
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
                    <p>{format(new Date(contract.fin_contrat), "dd/MM/yyyy", { locale: fr })}</p>
                  </div>
                  {contract.salaire_base && (
                    <div>
                      <p className="font-medium text-gray-500">Salaire de Base</p>
                      <p>{contract.salaire_base.toLocaleString()} DA</p>
                    </div>
                  )}
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </>
  )
}

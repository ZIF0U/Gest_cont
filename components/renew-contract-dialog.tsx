"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw, X } from "lucide-react"

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

interface RenewContractDialogProps {
  contract: Contract
  onRenew: (renewalData: {
    salaire_base?: number | null
    debut_contrat: string
    fin_contrat: string
  }) => void
  onClose: () => void
}

export function RenewContractDialog({ contract, onRenew, onClose }: RenewContractDialogProps) {
  const [formData, setFormData] = useState({
    salaire_base: contract.salaire_base?.toString() || "",
    debut_contrat: "",
    fin_contrat: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.debut_contrat || !formData.fin_contrat) {
      alert("Veuillez remplir les dates de début et fin de contrat")
      return
    }

    onRenew({
      salaire_base: formData.salaire_base ? Number.parseFloat(formData.salaire_base) : null,
      debut_contrat: formData.debut_contrat,
      fin_contrat: formData.fin_contrat,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-green-600" />
            Renouveler le Contrat
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Contract Info Display */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Informations du Contrat</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Employé:</span> {contract.nom_prenom}
              </p>
              <p>
                <span className="font-medium">Fonction:</span> {contract.fonction}
              </p>
              <p>
                <span className="font-medium">Carte Nationale:</span> {contract.carte_nationale}
              </p>
              {contract.renewal_count && contract.renewal_count > 0 && (
                <p>
                  <span className="font-medium">Renouvelé:</span> {contract.renewal_count} fois
                </p>
              )}
            </div>
          </div>

          {/* Renewal Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="salaire_base" className="text-sm font-medium">
                Nouveau Salaire de Base (DA)
              </Label>
              <Input
                id="salaire_base"
                name="salaire_base"
                type="number"
                step="0.01"
                value={formData.salaire_base}
                onChange={handleChange}
                placeholder="Ex: 45000.00"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="debut_contrat" className="text-sm font-medium">
                Nouveau Début de Contrat *
              </Label>
              <Input
                id="debut_contrat"
                name="debut_contrat"
                type="date"
                value={formData.debut_contrat}
                onChange={handleChange}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fin_contrat" className="text-sm font-medium">
                Nouvelle Fin de Contrat *
              </Label>
              <Input
                id="fin_contrat"
                name="fin_contrat"
                type="date"
                value={formData.fin_contrat}
                onChange={handleChange}
                className="h-10"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Renouveler
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

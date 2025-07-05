"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { createContract, updateContract } from "@/lib/database"
import { Save, X } from "lucide-react"

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
  salaire_base?: number | null
  num_assurance_sociale?: string
}

interface ContractFormProps {
  onSuccess: () => void
  contract?: Contract | null
  isEditing?: boolean
}

export function ContractForm({ onSuccess, contract, isEditing = false }: ContractFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    carte_nationale: contract?.carte_nationale || "",
    nom_prenom: contract?.nom_prenom || "",
    date_naissance: contract?.date_naissance || "",
    lieu_naissance: contract?.lieu_naissance || "",
    adresse: contract?.adresse || "",
    fonction: contract?.fonction || "",
    date_recrutement: contract?.date_recrutement || "",
    debut_contrat: contract?.debut_contrat || "",
    fin_contrat: contract?.fin_contrat || "",
    salaire_base: contract?.salaire_base?.toString() || "",
    num_assurance_sociale: contract?.num_assurance_sociale || "",
  })

  // Update form data when contract prop changes
  useEffect(() => {
    if (contract) {
      setFormData({
        carte_nationale: contract.carte_nationale || "",
        nom_prenom: contract.nom_prenom || "",
        date_naissance: contract.date_naissance || "",
        lieu_naissance: contract.lieu_naissance || "",
        adresse: contract.adresse || "",
        fonction: contract.fonction || "",
        date_recrutement: contract.date_recrutement || "",
        debut_contrat: contract.debut_contrat || "",
        fin_contrat: contract.fin_contrat || "",
        salaire_base: contract.salaire_base?.toString() || "",
        num_assurance_sociale: contract.num_assurance_sociale || "",
      })
    }
  }, [contract])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validation des champs obligatoires
    const requiredFields = [
      "carte_nationale",
      "nom_prenom",
      "date_naissance",
      "fonction",
      "debut_contrat",
      "fin_contrat",
    ]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      if (isEditing && contract) {
        await updateContract(contract.id, {
          ...formData,
          salaire_base: formData.salaire_base ? Number.parseFloat(formData.salaire_base) : null,
        })

        toast({
          title: "Succès",
          description: "Contrat modifié avec succès",
        })
      } else {
        await createContract({
          ...formData,
          salaire_base: formData.salaire_base ? Number.parseFloat(formData.salaire_base) : null,
        })

        toast({
          title: "Succès",
          description: "Contrat enregistré avec succès",
        })
      }

      onSuccess()
    } catch (error) {
      toast({
        title: "Erreur",
        description: isEditing ? "Impossible de modifier le contrat" : "Impossible d'enregistrer le contrat",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section Informations Personnelles */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Informations Personnelles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="carte_nationale" className="text-sm font-medium">
              N° Carte Nationale *
            </Label>
            <Input
              id="carte_nationale"
              name="carte_nationale"
              value={formData.carte_nationale}
              onChange={handleChange}
              placeholder="Ex: AB123456"
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nom_prenom" className="text-sm font-medium">
              Nom & Prénom *
            </Label>
            <Input
              id="nom_prenom"
              name="nom_prenom"
              value={formData.nom_prenom}
              onChange={handleChange}
              placeholder="Ex: Martin Dubois"
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_naissance" className="text-sm font-medium">
              Date de Naissance *
            </Label>
            <Input
              id="date_naissance"
              name="date_naissance"
              type="date"
              value={formData.date_naissance}
              onChange={handleChange}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lieu_naissance" className="text-sm font-medium">
              Lieu de Naissance
            </Label>
            <Input
              id="lieu_naissance"
              name="lieu_naissance"
              value={formData.lieu_naissance}
              onChange={handleChange}
              placeholder="Ex: Paris"
              className="h-11"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="adresse" className="text-sm font-medium">
              Adresse
            </Label>
            <Input
              id="adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              placeholder="Ex: 123 Rue de la Paix, Paris"
              className="h-11"
            />
          </div>
        </div>
      </div>

      {/* Section Informations Professionnelles */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Informations Professionnelles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fonction" className="text-sm font-medium">
              Fonction *
            </Label>
            <Input
              id="fonction"
              name="fonction"
              value={formData.fonction}
              onChange={handleChange}
              placeholder="Ex: Développeur Senior"
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date_recrutement" className="text-sm font-medium">
              Date de Recrutement
            </Label>
            <Input
              id="date_recrutement"
              name="date_recrutement"
              type="date"
              value={formData.date_recrutement}
              onChange={handleChange}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salaire_base" className="text-sm font-medium">
              Salaire de Base (DA)
            </Label>
            <Input
              id="salaire_base"
              name="salaire_base"
              type="number"
              step="0.01"
              value={formData.salaire_base}
              onChange={handleChange}
              placeholder="Ex: 45000.00"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="num_assurance_sociale" className="text-sm font-medium">
              N° Assurance Sociale
            </Label>
            <Input
              id="num_assurance_sociale"
              name="num_assurance_sociale"
              value={formData.num_assurance_sociale}
              onChange={handleChange}
              placeholder="Ex: SS123456789"
              className="h-11"
            />
          </div>
        </div>
      </div>

      {/* Section Contrat */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Informations du Contrat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="debut_contrat" className="text-sm font-medium">
              Début de Contrat *
            </Label>
            <Input
              id="debut_contrat"
              name="debut_contrat"
              type="date"
              value={formData.debut_contrat}
              onChange={handleChange}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fin_contrat" className="text-sm font-medium">
              Fin de Contrat *
            </Label>
            <Input
              id="fin_contrat"
              name="fin_contrat"
              type="date"
              value={formData.fin_contrat}
              onChange={handleChange}
              className="h-11"
              required
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onSuccess} className="px-6 bg-transparent">
          <X className="h-4 w-4 mr-2" />
          Annuler
        </Button>
        <Button type="submit" disabled={loading} className="px-6">
          <Save className="h-4 w-4 mr-2" />
          {loading 
            ? (isEditing ? "Modification..." : "Enregistrement...") 
            : (isEditing ? "Modifier le Contrat" : "Enregistrer le Contrat")
          }
        </Button>
      </div>
    </form>
  )
}

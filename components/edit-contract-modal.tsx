"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ContractForm } from "./contract-form"
import { Edit } from "lucide-react"

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

interface EditContractModalProps {
  contract: Contract | null
  onClose: () => void
  onSuccess: () => void
}

export function EditContractModal({ contract, onClose, onSuccess }: EditContractModalProps) {
  const handleSuccess = () => {
    onSuccess()
    onClose()
  }

  return (
    <Dialog open={!!contract} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Edit className="h-6 w-6" />
            Modifier le Contrat - {contract?.nom_prenom}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          <ContractForm 
            contract={contract} 
            isEditing={true} 
            onSuccess={handleSuccess} 
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 
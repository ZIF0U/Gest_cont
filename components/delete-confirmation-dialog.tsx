"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2, AlertTriangle } from "lucide-react"

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  contractName?: string
}

export function DeleteConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  contractName 
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmer la suppression
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-gray-700 mb-4">
            Êtes-vous sûr de vouloir supprimer ce contrat ?
            {contractName && (
              <span className="font-semibold block mt-1">
                {contractName}
              </span>
            )}
          </p>
          <p className="text-sm text-gray-500">
            Cette action est irréversible et supprimera définitivement le contrat.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Confirmer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
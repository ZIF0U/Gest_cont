import { ContractForm } from "@/components/contract-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus } from "lucide-react"

export default function AddContractPage() {
  return (
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
          <ContractForm />
        </CardContent>
      </Card>
    </div>
  )
}

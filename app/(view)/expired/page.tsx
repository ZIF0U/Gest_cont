import { ExpiredContractsList } from "@/components/expired-contracts-list"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function ExpiredContractsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900">Contrats Expirés</h1>
        </div>
        <p className="text-gray-600">Contrats nécessitant une attention immédiate</p>
      </div>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-800">
              <strong>Attention:</strong> Ces contrats ont dépassé leur date de fin. Veuillez prendre les mesures
              nécessaires.
            </p>
          </div>
        </CardContent>
      </Card>

      <ExpiredContractsList />
    </div>
  )
}

import { ContractsList } from "@/components/contracts-list"
import { StatsCards } from "@/components/stats-cards"

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Contrats</h1>
        <p className="text-gray-600">Vue d'ensemble de tous vos contrats d'employés</p>
      </div>

      <StatsCards />
      <ContractsList />
    </div>
  )
}

import { StatsOverview } from "@/components/stats-overview"

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
        <p className="text-gray-600">Aperçu général de vos contrats d'employés</p>
      </div>

      <StatsOverview />
    </div>
  )
}

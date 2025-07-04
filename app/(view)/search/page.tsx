import { SearchContracts } from "@/components/search-contracts"

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recherche Avancée</h1>
        <p className="text-gray-600">Trouvez rapidement les contrats que vous cherchez</p>
      </div>

      <SearchContracts />
    </div>
  )
}

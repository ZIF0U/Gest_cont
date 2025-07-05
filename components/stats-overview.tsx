"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getContracts } from "@/lib/database"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export function StatsOverview() {
  const [data, setData] = useState({
    totalContracts: 0,
    activeContracts: 0,
    expiredContracts: 0,
    expiringSoon: 0,
    functionStats: [] as { fonction: string; count: number }[],
    recentContracts: [] as any[],
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const contracts = await getContracts()
      const today = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(today.getDate() + 30)

      const active = contracts.filter((c) => new Date(c.fin_contrat) > today)
      const expired = contracts.filter((c) => new Date(c.fin_contrat) <= today)
      const expiringSoon = contracts.filter((c) => {
        const endDate = new Date(c.fin_contrat)
        return endDate > today && endDate <= thirtyDaysFromNow
      })

      // Statistiques par fonction
      const functionCounts = contracts.reduce(
        (acc, contract) => {
          acc[contract.fonction] = (acc[contract.fonction] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const functionStats = Object.entries(functionCounts)
        .map(([fonction, count]) => ({ fonction, count }))
        .sort((a, b) => b.count - a.count)

      // Contrats récents (only active contracts)
      const recentContracts = active
        .sort((a, b) => new Date(a.fin_contrat).getTime() - new Date(b.fin_contrat).getTime())
        .slice(0, 5)

      setData({
        totalContracts: contracts.length,
        activeContracts: active.length,
        expiredContracts: expired.length,
        expiringSoon: expiringSoon.length,
        functionStats,
        recentContracts,
      })
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Contrats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Contrats Actifs</span>
              <span>
                {data.activeContracts}/{data.totalContracts}
              </span>
            </div>
            <Progress
              value={data.totalContracts > 0 ? (data.activeContracts / data.totalContracts) * 100 : 0}
              className="h-2"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Contrats Expirés</span>
              <span>
                {data.expiredContracts}/{data.totalContracts}
              </span>
            </div>
            <Progress
              value={data.totalContracts > 0 ? (data.expiredContracts / data.totalContracts) * 100 : 0}
              className="h-2"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Expirent Bientôt (30j)</span>
              <span>
                {data.expiringSoon}/{data.totalContracts}
              </span>
            </div>
            <Progress
              value={data.totalContracts > 0 ? (data.expiringSoon / data.totalContracts) * 100 : 0}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Répartition par Fonction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.functionStats.slice(0, 6).map((stat) => (
              <div key={stat.fonction} className="flex justify-between items-center">
                <span className="text-sm font-medium">{stat.fonction}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${data.totalContracts > 0 ? (stat.count / data.totalContracts) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{stat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Contrats Récents (Actifs)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.recentContracts.map((contract) => (
              <div key={contract.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{contract.nom_prenom}</p>
                  <p className="text-sm text-gray-600">{contract.fonction}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {format(new Date(contract.fin_contrat), "dd/MM/yyyy", { locale: fr })}
                  </p>
                  <p className="text-xs text-gray-500">Fin de contrat</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

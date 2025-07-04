"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getContracts } from "@/lib/database"
import { Users, FileText, AlertTriangle, Clock } from "lucide-react"

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

export function StatsCards() {
  const [stats, setStats] = useState({
    totalContracts: 0,
    activeContracts: 0,
    expiredContracts: 0,
    expiringSoon: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
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

      setStats({
        totalContracts: contracts.length,
        activeContracts: active.length,
        expiredContracts: expired.length,
        expiringSoon: expiringSoon.length,
      })
    } catch (error) {
      console.error("Error loading stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: "Total des Contrats",
      value: stats.totalContracts,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Contrats Actifs",
      value: stats.activeContracts,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Contrats Expirés",
      value: stats.expiredContracts,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Expirent Bientôt",
      value: stats.expiringSoon,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "Dans les 30 prochains jours",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={`p-2 rounded-full ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            {card.description && <p className="text-xs text-muted-foreground">{card.description}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

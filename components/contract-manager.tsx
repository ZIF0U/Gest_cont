"use client"

import { useState } from "react"
import { AddLayout } from "@/components/add-layout"
import { ViewLayout } from "@/components/view-layout"

export function ContractManager() {
  const [currentView, setCurrentView] = useState<"view" | "add">("view")

  if (currentView === "add") {
    return <AddLayout onSwitchToView={() => setCurrentView("view")} />
  }

  return <ViewLayout onSwitchToAdd={() => setCurrentView("add")} />
}

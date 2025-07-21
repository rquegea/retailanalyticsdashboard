"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Eye, ShoppingCart, Euro, Percent } from "lucide-react"

interface KPIOverviewProps {
  selectedChain: string
  selectedBrand: string
  dataMode: string
}

export function KPIOverview({ selectedChain, selectedBrand, dataMode }: KPIOverviewProps) {
  const kpis = [
    {
      title: "Shelf Share",
      value: "24.3%",
      change: "+2.1%",
      trend: "up",
      icon: Eye,
      color: "blue",
    },
    {
      title: "Avg. Facings",
      value: "3.2",
      change: "-0.3",
      trend: "down",
      icon: ShoppingCart,
      color: "orange",
    },
    {
      title: "Avg. Price",
      value: "€2.89",
      change: "+€0.15",
      trend: "up",
      icon: Euro,
      color: "green",
    },
    {
      title: "Promotion Presence",
      value: "67%",
      change: "+12%",
      trend: "up",
      icon: Percent,
      color: "purple",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card
            key={index}
            className="relative overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-200 group"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{kpi.title}</CardTitle>
              <Icon
                className={`h-4 w-4 text-${kpi.color}-500 group-hover:scale-110 transition-transform duration-200`}
              />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{kpi.value}</div>
                <Badge
                  variant={kpi.trend === "up" ? "default" : "destructive"}
                  className={`flex items-center space-x-1 ${
                    kpi.trend === "up"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 hover:scale-105"
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 hover:scale-105"
                  } transition-transform duration-200`}
                >
                  <TrendIcon className={`h-3 w-3 ${kpi.trend === "up" ? "animate-bounce" : "animate-pulse"}`} />
                  <span>{kpi.change}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

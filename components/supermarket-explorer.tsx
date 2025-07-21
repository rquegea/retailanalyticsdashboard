"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, TrendingUp, TrendingDown } from "lucide-react"

interface SupermarketExplorerProps {
  selectedChain: string
  setSelectedChain: (chain: string) => void
}

export function SupermarketExplorer({ selectedChain, setSelectedChain }: SupermarketExplorerProps) {
  const supermarkets = [
    {
      name: "Carrefour",
      stores: 245,
      change: "+5.2%",
      trend: "up",
      locations: ["Madrid", "Barcelona", "Valencia"],
      color: "blue",
    },
    {
      name: "Mercadona",
      stores: 189,
      change: "+3.8%",
      trend: "up",
      locations: ["Valencia", "Alicante", "Murcia"],
      color: "green",
    },
    {
      name: "Día",
      stores: 156,
      change: "-2.1%",
      trend: "down",
      locations: ["Madrid", "Sevilla", "Bilbao"],
      color: "red",
    },
    {
      name: "Lidl",
      stores: 134,
      change: "+7.3%",
      trend: "up",
      locations: ["Barcelona", "Zaragoza", "Palma"],
      color: "yellow",
    },
    {
      name: "El Corte Inglés",
      stores: 67,
      change: "+1.9%",
      trend: "up",
      locations: ["Madrid", "Barcelona", "Sevilla"],
      color: "purple",
    },
  ]

  return (
    <Card className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="h-5 w-5 text-blue-500" />
          <span>Supermarket Explorer</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {supermarkets.map((supermarket, index) => {
            const TrendIcon = supermarket.trend === "up" ? TrendingUp : TrendingDown

            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${
                  selectedChain === supermarket.name.toLowerCase()
                    ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
                onClick={() => setSelectedChain(supermarket.name.toLowerCase())}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{supermarket.name}</h3>
                    <Badge
                      variant={supermarket.trend === "up" ? "default" : "destructive"}
                      className={`${
                        supermarket.trend === "up"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 hover:scale-105"
                          : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 hover:scale-105"
                      } transition-transform duration-200`}
                    >
                      <TrendIcon
                        className={`h-3 w-3 mr-1 ${supermarket.trend === "up" ? "animate-bounce" : "animate-pulse"}`}
                      />
                      {supermarket.change}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{supermarket.stores} stores</span>
                  </div>

                  <div className="space-y-1">
                    {supermarket.locations.map((location, locationIndex) => (
                      <div key={locationIndex} className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span className="text-xs text-slate-500 dark:text-slate-400">{location}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
